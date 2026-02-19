// pages/api/photo/[id]/resize.js

import { createClient } from '@supabase/supabase-js'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { verifyDownloadToken } from '../../../../lib/secureDownload'

export const config = {
  api: { bodyParser: false },
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const R2_BUCKET = process.env.R2_BUCKET
if (!R2_BUCKET) throw new Error('Missing R2_BUCKET')

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

function clampInt(n, min, max) {
  const x = parseInt(String(n ?? ''), 10)
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

/**
 * Supports BOTH styles of secureDownload:
 * 1) verifyDownloadToken(token) -> payload OR throws
 * 2) verifyDownloadToken(token) -> { ok, payload, error }
 * 3) verifyDownloadToken(token, secret) in case your helper expects secret explicitly
 */
function verifyTokenCompat(token) {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET

  // Some builds keep secret inside lib/secureDownload; others want it passed in.
  // Try the safest path(s) without breaking.
  try {
    // First: try (token, secret) ONLY if secret exists
    if (secret) {
      const out = verifyDownloadToken(token, secret)
      if (out && typeof out === 'object' && 'ok' in out) {
        if (!out.ok) return { ok: false, error: out.error || 'Invalid token' }
        return { ok: true, payload: out.payload }
      }
      // Assume payload
      return { ok: true, payload: out }
    }
  } catch (e) {
    // fall through to token-only attempt
  }

  try {
    const out = verifyDownloadToken(token)
    if (out && typeof out === 'object' && 'ok' in out) {
      if (!out.ok) return { ok: false, error: out.error || 'Invalid token' }
      return { ok: true, payload: out.payload }
    }
    return { ok: true, payload: out }
  } catch (e) {
    return { ok: false, error: e?.message || 'Invalid token' }
  }
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

      if (!process.env.DOWNLOAD_TOKEN_SECRET) {
        return res.status(500).json({ error: 'DOWNLOAD_TOKEN_SECRET not configured' })
      }

      const v = verifyTokenCompat(token)
      if (!v.ok) return res.status(401).json({ error: v.error || 'Invalid token' })

      tokenPayload = v.payload

      if (tokenPayload?.photoId !== id) {
        return res.status(403).json({ error: 'Token mismatch' })
      }

      if (tokenPayload?.scope && tokenPayload.scope !== 'original') {
        return res.status(403).json({ error: 'Invalid token scope' })
      }

      // Optional: lock width in token
      if (tokenPayload?.w && Number(tokenPayload.w) !== Number(width)) {
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
      // ✅ IMPORTANT FIX:
      // This resize endpoint uses sharp() and therefore must ONLY process real image files.
      // RAW is usually a .zip, so NEVER fall back to original_raw_key here.
      sourceKey = photo.original_jpg_key
    } else {
      return res.status(400).json({ error: 'Invalid src (thumb|preview|original)' })
    }

    if (!sourceKey) {
      return res.status(400).json({
        error:
          src === 'original'
            ? 'Missing original_jpg_key (RAW zip cannot be resized here)'
            : 'Missing source key',
      })
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
          Bucket: R2_BUCKET,
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
        Bucket: R2_BUCKET,
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
        Bucket: R2_BUCKET,
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
