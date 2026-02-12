import { createClient } from '@supabase/supabase-js'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { verifyDownloadToken } from '../../../../lib/secureDownload'

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

async function streamToBuffer(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const sharp = (await import('sharp')).default

    const { id } = req.query
    const src = req.query.src || 'preview'
    const width = parseInt(req.query.w || '0', 10)
    const format = req.query.format === 'webp' ? 'webp' : 'jpeg'
    const quality = parseInt(req.query.q || '82', 10)
    const variant = req.query.variant || null
    const token = typeof req.query.token === 'string' ? req.query.token : null

    if (!id) return res.status(400).json({ error: 'Missing id' })

    if (!width || width < 50 || width > 6000) {
      return res.status(400).json({ error: 'Invalid width' })
    }

    // ==============================
    // 🔐 PROTECT ORIGINAL
    // ==============================
    if (src === 'original') {
      if (!token) {
        return res.status(401).json({ error: 'Missing token' })
      }

      let payload = null
      try {
        payload = verifyDownloadToken(token)
      } catch {
        payload = null
      }

      if (!payload) {
        return res.status(401).json({ error: 'Invalid token' })
      }

      if (payload.photoId !== id) {
        return res.status(403).json({ error: 'Token mismatch' })
      }

      if (payload.scope && payload.scope !== 'original') {
        return res.status(403).json({ error: 'Invalid token scope' })
      }
    }

    // ==============================
    // 🔎 FETCH PHOTO KEYS
    // ==============================
    const { data: photo, error } = await supabase
      .from('photos')
      .select(
        `
        id,
        original_jpg_key,
        original_raw_key
      `
      )
      .eq('id', id)
      .single()

    if (error || !photo) {
      return res.status(404).json({ error: 'Photo not found' })
    }

    let sourceKey = null

    if (src === 'thumb') {
      sourceKey = `photos/thumb/${id}.jpg`
    } else if (src === 'preview') {
      if (variant === 'strong') {
        sourceKey = `photos/preview_wm-strong/${id}.jpg`
      } else if (variant === 'corner') {
        sourceKey = `photos/preview_wm-corner/${id}.jpg`
      } else {
        sourceKey = `photos/preview/${id}.jpg`
      }
    } else if (src === 'original') {
      sourceKey = photo.original_jpg_key || photo.original_raw_key
    }

    if (!sourceKey) {
      return res.status(400).json({ error: 'Invalid src' })
    }

    // ==============================
    // 📦 DERIVATIVE CACHE KEY
    // ==============================
    const derivativeKey =
      src === 'original'
        ? `photos/protected/original/${id}_${width}.${format}`
        : `photos/derived/${id}_${src}_${variant || 'none'}_${width}.${format}`

    // ==============================
    // 🧠 TRY CACHE FIRST
    // ==============================
    try {
      const cached = await s3.send(
        new GetObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: derivativeKey,
        })
      )

      if (cached?.Body) {
        const buffer = await streamToBuffer(cached.Body)

        res.setHeader(
          'Cache-Control',
          src === 'original'
            ? 'private, max-age=86400'
            : 'public, max-age=31536000, immutable'
        )
        res.setHeader(
          'Content-Type',
          format === 'webp' ? 'image/webp' : 'image/jpeg'
        )

        return res.status(200).send(buffer)
      }
    } catch {
      // Not cached yet — continue
    }

    // ==============================
    // 📥 DOWNLOAD SOURCE
    // ==============================
    const originalObj = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: sourceKey,
      })
    )

    if (!originalObj?.Body) {
      return res.status(500).json({ error: 'Source image missing' })
    }

    const originalBuffer = await streamToBuffer(originalObj.Body)

    // ==============================
    // 🖼 RESIZE
    // ==============================
    let image = sharp(originalBuffer).rotate().resize({
      width,
      withoutEnlargement: true,
    })

    if (format === 'webp') {
      image = image.webp({ quality })
    } else {
      image = image.jpeg({ quality })
    }

    const outputBuffer = await image.toBuffer()

    // ==============================
    // 💾 SAVE DERIVATIVE
    // ==============================
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: derivativeKey,
        Body: outputBuffer,
        ContentType:
          format === 'webp' ? 'image/webp' : 'image/jpeg',
        CacheControl:
          src === 'original'
            ? 'private, max-age=86400'
            : 'public, max-age=31536000, immutable',
      })
    )

    // ==============================
    // 📤 RESPONSE
    // ==============================
    res.setHeader(
      'Cache-Control',
      src === 'original'
        ? 'private, max-age=86400'
        : 'public, max-age=31536000, immutable'
    )

    res.setHeader(
      'Content-Type',
      format === 'webp' ? 'image/webp' : 'image/jpeg'
    )

    return res.status(200).send(outputBuffer)
  } catch (err) {
    console.error('resize error:', err)
    return res.status(500).json({
      error: 'Resize failed',
      detail: err?.message || String(err),
    })
  }
}
