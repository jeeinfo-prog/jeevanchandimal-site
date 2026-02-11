import { createClient } from '@supabase/supabase-js'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

export const config = {
  api: { bodyParser: { sizeLimit: '2mb' } },
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
  // ✅ Always respond JSON for non-POST (proves route is being hit)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // ✅ Import sharp only when needed (avoids crashing before handler)
    const sharp = (await import('sharp')).default

    const { photoId } = req.body || {}
    if (!photoId) return res.status(400).json({ error: 'photoId required' })

    // 0) Basic env sanity checks (helps debugging)
    const requiredEnv = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY',
      'R2_ENDPOINT',
      'R2_BUCKET',
      'R2_ACCESS_KEY_ID',
      'R2_SECRET_ACCESS_KEY',
      'NEXT_PUBLIC_SITE_URL',
    ]
    const missing = requiredEnv.filter((k) => !process.env[k])
    if (missing.length) {
      return res.status(500).json({
        error: 'Missing environment variables',
        missing,
      })
    }

    // 1) Fetch photo row
    const { data: photo, error: photoErr } = await supabase
      .from('photos')
      .select('id, original_jpg_key, original_raw_key, status')
      .eq('id', photoId)
      .single()

    if (photoErr) return res.status(400).json({ error: photoErr.message })

    const originalKey = photo.original_jpg_key || photo.original_raw_key
    if (!originalKey) {
      return res.status(400).json({ error: 'No original key found in photos row' })
    }

    // 2) Download original from R2
    const getObj = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: originalKey,
      })
    )

    if (!getObj?.Body) {
      return res.status(500).json({ error: 'R2 GetObject returned empty Body' })
    }

    const originalBuffer = await streamToBuffer(getObj.Body)

    // 3) Process with Sharp
    // thumb: smaller, no watermark
    const thumbBuffer = await sharp(originalBuffer)
      .rotate()
      .resize({ width: 600, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer()

    // preview: larger + watermark
    const watermarkSvg = Buffer.from(`
      <svg width="800" height="140" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.35"/>
          </filter>
        </defs>
        <rect x="0" y="0" width="800" height="140" fill="none"/>
        <text x="50%" y="55%"
              font-family="Arial, Helvetica, sans-serif"
              font-size="64"
              fill="white"
              text-anchor="middle"
              filter="url(#shadow)"
              opacity="0.42">
          jeevanchandimal.com
        </text>
      </svg>
    `)

    const previewBase = sharp(originalBuffer)
      .rotate()
      .resize({ width: 2000, withoutEnlargement: true })

    const previewMeta = await previewBase.metadata()

    const previewBuffer = await previewBase
      .composite([{ input: watermarkSvg, gravity: 'south' }])
      .jpeg({ quality: 84 })
      .toBuffer()

    // 4) Upload processed images back to R2
    const previewKey = `photos/preview/${photoId}.jpg`
    const thumbKey = `photos/thumb/${photoId}.jpg`

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: previewKey,
        Body: previewBuffer,
        ContentType: 'image/jpeg',
        CacheControl: 'public, max-age=31536000, immutable',
      })
    )

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: thumbKey,
        Body: thumbBuffer,
        ContentType: 'image/jpeg',
        CacheControl: 'public, max-age=31536000, immutable',
      })
    )

    // 5) Update DB
    const base = process.env.NEXT_PUBLIC_SITE_URL
    const previewUrl = `${base}/api/photo/${photoId}/preview`
    const thumbUrl = `${base}/api/photo/${photoId}/thumb`

    const { error: updateErr } = await supabase
      .from('photos')
      .update({
        preview_url: previewUrl,
        thumb_url: thumbUrl,
        status: 'published',
      })
      .eq('id', photoId)

    if (updateErr) return res.status(400).json({ error: updateErr.message })

    return res.status(200).json({
      ok: true,
      photoId,
      originalKey,
      previewKey,
      thumbKey,
      meta: { width: previewMeta.width, height: previewMeta.height },
    })
  } catch (err) {
    console.error('commit error:', {
      name: err?.name,
      message: err?.message,
      stack: err?.stack,
      cause: err?.cause,
    })

    return res.status(500).json({
      error: 'Commit failed',
      detail: err?.message || String(err),
    })
  }
}
