import { createClient } from '@supabase/supabase-js'
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 🔥 Dynamic sharp import (Vercel safe)
    const sharp = (await import('sharp')).default

    const { photoId } = req.body || {}
    if (!photoId) {
      return res.status(400).json({ error: 'photoId required' })
    }

    // ---------- ENV CHECK ----------
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

    // ---------- FETCH PHOTO ----------
    const { data: photo, error: photoErr } = await supabase
      .from('photos')
      .select('id, original_jpg_key, original_raw_key')
      .eq('id', photoId)
      .single()

    if (photoErr) {
      return res.status(400).json({ error: photoErr.message })
    }

    const originalKey = photo.original_jpg_key || photo.original_raw_key
    if (!originalKey) {
      return res.status(400).json({
        error: 'No original key found in photos row',
      })
    }

    // ---------- DOWNLOAD ORIGINAL ----------
    const getObj = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: originalKey,
      })
    )

    if (!getObj?.Body) {
      return res.status(500).json({
        error: 'R2 GetObject returned empty Body',
      })
    }

    const originalBuffer = await streamToBuffer(getObj.Body)

    // ---------- THUMB ----------
    const thumbBuffer = await sharp(originalBuffer)
      .rotate()
      .resize({ width: 600, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer()

    // ---------- PREVIEW BASE ----------
    const previewBase = sharp(originalBuffer)
      .rotate()
      .resize({ width: 2000, withoutEnlargement: true })

    const previewMeta = await previewBase.metadata()

    // ---------- WATERMARK SVGs ----------

    const watermarkStandard = Buffer.from(`
      <svg width="1200" height="180" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="60%"
              font-family="Arial"
              font-size="72"
              fill="white"
              text-anchor="middle"
              opacity="0.35">
          jeevanchandimal.com
        </text>
      </svg>
    `)

    const watermarkStrong = Buffer.from(`
      <svg width="1400" height="220" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="60%"
              font-family="Arial"
              font-size="92"
              fill="white"
              text-anchor="middle"
              opacity="0.5">
          jeevanchandimal.com
        </text>
      </svg>
    `)

    const watermarkCorner = Buffer.from(`
      <svg width="600" height="120" xmlns="http://www.w3.org/2000/svg">
        <text x="95%" y="70%"
              font-family="Arial"
              font-size="56"
              fill="white"
              text-anchor="end"
              opacity="0.35">
          jeevanchandimal.com
        </text>
      </svg>
    `)

    // ---------- GENERATE VARIANTS ----------
    const previewStandard = await previewBase
      .clone()
      .composite([{ input: watermarkStandard, gravity: 'south' }])
      .jpeg({ quality: 84 })
      .toBuffer()

    const previewStrong = await previewBase
      .clone()
      .composite([{ input: watermarkStrong, gravity: 'south' }])
      .jpeg({ quality: 84 })
      .toBuffer()

    const previewCorner = await previewBase
      .clone()
      .composite([{ input: watermarkCorner, gravity: 'southeast' }])
      .jpeg({ quality: 84 })
      .toBuffer()

    // ---------- R2 KEYS ----------
    const thumbKey = `photos/thumb/${photoId}.jpg`
    const previewKey = `photos/preview/${photoId}.jpg`
    const previewStrongKey = `photos/preview_wm-strong/${photoId}.jpg`
    const previewCornerKey = `photos/preview_wm-corner/${photoId}.jpg`

    // ---------- UPLOAD TO R2 ----------
    const uploads = [
      { key: thumbKey, body: thumbBuffer },
      { key: previewKey, body: previewStandard },
      { key: previewStrongKey, body: previewStrong },
      { key: previewCornerKey, body: previewCorner },
    ]

    for (const file of uploads) {
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: file.key,
          Body: file.body,
          ContentType: 'image/jpeg',
          CacheControl: 'public, max-age=31536000, immutable',
        })
      )
    }

    // ---------- UPDATE DB ----------
    const base = process.env.NEXT_PUBLIC_SITE_URL

    const { error: updateErr } = await supabase
      .from('photos')
      .update({
        preview_url: `${base}/api/photo/${photoId}/preview`,
        thumb_url: `${base}/api/photo/${photoId}/thumb`,
        status: 'published',
      })
      .eq('id', photoId)

    if (updateErr) {
      return res.status(400).json({ error: updateErr.message })
    }

    // ---------- SUCCESS ----------
    return res.status(200).json({
      ok: true,
      photoId,
      originalKey,
      thumbKey,
      previewKey,
      previewStrongKey,
      previewCornerKey,
      meta: {
        width: previewMeta.width,
        height: previewMeta.height,
      },
    })
  } catch (err) {
    console.error('commit error:', {
      name: err?.name,
      message: err?.message,
      stack: err?.stack,
    })

    return res.status(500).json({
      error: 'Commit failed',
      detail: err?.message || String(err),
    })
  }
}
