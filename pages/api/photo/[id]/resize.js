// pages/api/photo/[id]/resize.js

import { createClient } from '@supabase/supabase-js'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { verifyDownloadToken } from '../../../../lib/download-token'

export const config = {
  api: { bodyParser: false },
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

function clampInt(n, min, max) {
  const x = parseInt(String(n || ''), 10)
  if (Number.isNaN(x)) return null
  return Math.max(min, Math.min(max, x))
}

async function streamToBuffer(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

function cacheControlFor(src) {
  // original is protected: keep private and short
  if (src === 'original') return 'private, max-age=86400' // 1 day
  // public assets can be cached aggressively
  return 'public, max-age=31536000, immutable' // 1 year
}

function contentTypeFor(format) {
  return format === 'webp' ? 'image/webp' : 'image/jpeg'
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const sharp = (await import('sharp')).default

    const { id } = req.query
    const src = String(req.query.src || 'preview') // thumb | preview | original
    const variant = req.query.variant ? String(req.query.variant) : null // for preview: strong | corner | null

    const width = clampInt(req.query.w, 50, 6000)
    const quality = clampInt(req.query.q, 40, 95) ?? 82
    const format = req.query.format === 'webp' ? 'webp' : 'jpeg'
    const token = typeof req.query.token === 'string' ? req.query.token : null

    if (!id) return res.status(400).json({ error: 'Missing id' })
    if (!width) return res.status(400).json({ error: 'Invalid width (50..6000)' })

    // ==============================
    // 🔐 PROTECT ORIGINAL
    // ==============================
    let tokenPayload = null
    if (src === 'original') {
      if (!token) return res.status(401).json({ error: 'Missing token' })

      const secret = process.env.DOWNLOAD_TOKEN_SECRET
      if (!secret) return res.status(500).json({ error: 'DOWNLOAD_TOKEN_SECRET not configured' })

      const v = verifyDownloadToken(token, secret)
      if (!v.ok) return res.status(401).json({ error: v.error || 'Invalid token' })

      tokenPayload = v.payload

      if (tokenPayload.photoId !== id) {
        return res.status(403).json({ error: 'Token mismatch' })
      }

      if (tokenPayload.scope && tokenPayload.scope !== 'original') {
        return res.status(403).json({ error: 'Invalid token scope' })
      }

      // Optional: lock width in token
      if (tokenPayload.w && Number(tokenPayload.w) !== Number(width)) {
        return res.status(403).json({ error: 'Token width mismatch' })
      }
    }

    // ==============================
    // 🔎 FETCH PHOTO ROW (for original key)
    // ==============================
    const { data: photo, error: photoErr } = await supabase
      .from('photos')
      .select('id, original_jpg_key, original_raw_key')
      .eq('id', id)
      .single()

    if (photoErr || !photo) return res.status(404).json({ error: 'Photo not found' })

    // ==============================
    // 🧭 SOURCE KEY
    // ==============================
    let sourceKey = null

    if (src === 'thumb') {
      sourceKey = `photos/thumb/${id}.jpg`
    } else if (src === 'preview') {
      if (variant === 'strong') sourceKey = `photos/preview_wm-strong/${id}.jpg`
      else if (variant === 'corner') sourceKey = `photos/preview_wm-corner/${id}.jpg`
      else sourceKey = `photos/preview/${id}.jpg`
    } else if (src === 'original') {
      sourceKey = photo.original_jpg_key || photo.original_raw_key
    } else {
      return res.status(400).json({ error: 'Invalid src (thumb|preview|original)' })
    }

    if (!sourceKey) {
      return res.status(400).json({ error: 'Missing source key' })
    }

    // ==============================
    // 🗃 DERIVATIVE CACHE KEY (R2)
    // ==============================
    // IMPORTANT: do NOT include token in key; for original we keep it under protected path
    const derivativeKey =
      src === 'original'
        ? `photos/protected/original/${id}_${width}_q${quality}.${format}`
        : `photos/derived/${id}_${src}_${variant || 'none'}_${width}_q${quality}.${format}`

    // ==============================
    // 🧠 TRY DERIVATIVE CACHE FIRST
    // ==============================
    try {
      const cached = await s3.send(
        new GetObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: derivativeKey,
        })
      )

      if (cached?.Body) {
        const buf = await streamToBuffer(cached.Body)
        res.setHeader('Cache-Control', cacheControlFor(src))
        res.setHeader('Content-Type', contentTypeFor(format))
        if (cached.ContentLength) res.setHeader('Content-Length', String(cached.ContentLength))
        return res.status(200).send(buf)
      }
    } catch (e) {
      // not cached
    }

    // ==============================
    // 📥 DOWNLOAD SOURCE
    // ==============================
    const obj = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: sourceKey,
      })
    )

    if (!obj?.Body) return res.status(404).json({ error: 'Source image missing' })
    const inputBuffer = await streamToBuffer(obj.Body)

    // ==============================
    // 🖼 RESIZE + ENCODE
    // ==============================
    let pipeline = sharp(inputBuffer)
      .rotate()
      .resize({
        width,
        withoutEnlargement: true,
      })

    if (format === 'webp') {
      pipeline = pipeline.webp({ quality })
    } else {
      pipeline = pipeline.jpeg({ quality })
    }

    const outBuffer = await pipeline.toBuffer()

    // ==============================
    // 💾 SAVE DERIVATIVE TO R2
    // ==============================
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: derivativeKey,
        Body: outBuffer,
        ContentType: contentTypeFor(format),
        CacheControl: cacheControlFor(src),
      })
    )

    // ==============================
    // 📤 RESPONSE
    // ==============================
    res.setHeader('Cache-Control', cacheControlFor(src))
    res.setHeader('Content-Type', contentTypeFor(format))
    res.setHeader('Content-Length', String(outBuffer.length))

    return res.status(200).send(outBuffer)
  } catch (err) {
    console.error('resize error:', err)
    return res.status(500).json({
      error: 'Resize failed',
      detail: err?.message || String(err),
    })
  }
}
