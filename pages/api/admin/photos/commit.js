// pages/api/admin/photos/commit.js

import { createClient } from '@supabase/supabase-js'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import exifReader from 'exif-reader'

export const config = {
  api: { bodyParser: { sizeLimit: '2mb' } },
}

function must(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

async function streamToBuffer(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

async function requireAdmin(req, supabaseAdmin) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return { ok: false, status: 401, error: 'Missing token' }

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) return { ok: false, status: 401, error: 'Invalid token' }

  const { data: profile, error: profErr } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single()

  if (profErr || !profile) return { ok: false, status: 403, error: 'No profile' }
  if (profile.role !== 'admin') return { ok: false, status: 403, error: 'Not admin' }

  return { ok: true, user: userData.user }
}

function makeWatermarkSvg({ w, h, text, fontSize, opacity, align = 'center' }) {
  const x = align === 'right' ? '96%' : align === 'left' ? '4%' : '50%'
  const anchor = align === 'right' ? 'end' : align === 'left' ? 'start' : 'middle'
  const y = '92%'

  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .wm {
          fill: white;
          opacity: ${opacity};
          font-family: Arial, sans-serif;
          font-weight: 700;
          letter-spacing: 1px;
        }
      </style>
      <text x="${x}" y="${y}" text-anchor="${anchor}" class="wm" font-size="${fontSize}">
        ${text}
      </text>
    </svg>`,
    'utf-8'
  )
}

// GPS helper (EXIF usually gives [deg, min, sec] + ref)
function dmsToDecimal(dms, ref) {
  if (!Array.isArray(dms) || dms.length < 3) return null
  const [deg, min, sec] = dms
  const dec = Number(deg) + Number(min) / 60 + Number(sec) / 3600
  if (!Number.isFinite(dec)) return null
  const sign = ref === 'S' || ref === 'W' ? -1 : 1
  return dec * sign
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
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
    if (missing.length) return res.status(500).json({ ok: false, error: 'Missing env vars', missing })

    const supabaseAdmin = createClient(must('NEXT_PUBLIC_SUPABASE_URL'), must('SUPABASE_SERVICE_ROLE_KEY'))

    // ✅ Protect commit endpoint
    const admin = await requireAdmin(req, supabaseAdmin)
    if (!admin.ok) return res.status(admin.status).json({ ok: false, error: admin.error })

    const s3 = new S3Client({
      region: 'auto',
      endpoint: must('R2_ENDPOINT'),
      credentials: {
        accessKeyId: must('R2_ACCESS_KEY_ID'),
        secretAccessKey: must('R2_SECRET_ACCESS_KEY'),
      },
    })

    const sharp = (await import('sharp')).default
    sharp.cache(false)

    const { photoId } = req.body || {}
    if (!photoId) return res.status(400).json({ ok: false, error: 'photoId required' })

    const { data: photo, error: photoErr } = await supabaseAdmin
      .from('photos')
      .select('id, original_jpg_key, original_raw_key')
      .eq('id', photoId)
      .single()

    if (photoErr || !photo) return res.status(400).json({ ok: false, error: photoErr?.message || 'Photo not found' })

    const originalKey = photo.original_jpg_key || photo.original_raw_key
    if (!originalKey) return res.status(400).json({ ok: false, error: 'No original key found' })

    // Download
    const getObj = await s3.send(new GetObjectCommand({ Bucket: must('R2_BUCKET'), Key: originalKey }))
    if (!getObj?.Body) return res.status(500).json({ ok: false, error: 'R2 GetObject empty body' })
    const originalBuffer = await streamToBuffer(getObj.Body)

    // ✅ Extract EXIF (best-effort)
    let exif = null
    let exifPatch = {}
    try {
      const meta0 = await sharp(originalBuffer, { failOn: 'none' }).metadata()
      if (meta0?.exif) {
        exif = exifReader(meta0.exif)
        const make = exif?.image?.Make
        const model = exif?.image?.Model
        const lens = exif?.exif?.LensModel || exif?.exif?.LensMake
        const iso = exif?.exif?.ISOSpeedRatings
        const fnum = exif?.exif?.FNumber
        const shutter = exif?.exif?.ExposureTime
        const focal = exif?.exif?.FocalLength
        const dt = exif?.exif?.DateTimeOriginal

        // GPS
        const lat = dmsToDecimal(exif?.gps?.GPSLatitude, exif?.gps?.GPSLatitudeRef)
        const lng = dmsToDecimal(exif?.gps?.GPSLongitude, exif?.gps?.GPSLongitudeRef)

        exifPatch = {
          exif_json: exif,
          camera_make: make || null,
          camera_model: model || null,
          lens_model: lens || null,
          iso: typeof iso === 'number' ? iso : Array.isArray(iso) ? iso[0] : null,
          aperture_f: typeof fnum === 'number' ? fnum : null,
          shutter: shutter ? String(shutter) : null,
          focal_length_mm: typeof focal === 'number' ? focal : null,
          taken_at: dt ? new Date(dt).toISOString() : null,
          gps_lat: typeof lat === 'number' ? lat : null,
          gps_lng: typeof lng === 'number' ? lng : null,
          country: 'Sri Lanka', // ✅ safe default for your catalog
        }
      }
    } catch {
      // ignore EXIF errors
      exifPatch = { country: 'Sri Lanka' }
    }

    // Thumb
    const thumbBuffer = await sharp(originalBuffer, { failOn: 'none' })
      .rotate()
      .resize(600, 450, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()

    // Preview base
    const basePreviewBuffer = await sharp(originalBuffer, { failOn: 'none' })
      .rotate()
      .resize({ width: 2000, withoutEnlargement: true })
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer()

    const meta = await sharp(basePreviewBuffer).metadata()
    const W = meta.width
    const H = meta.height
    if (!W || !H) return res.status(400).json({ ok: false, error: 'Invalid preview metadata' })

    // Watermarks
    const text = 'jeevanchandimal.com'
    const fontStandard = Math.max(28, Math.round(W * 0.04))
    const fontStrong = Math.max(34, Math.round(W * 0.05))
    const fontCorner = Math.max(22, Math.round(W * 0.032))

    const wmStandard = makeWatermarkSvg({ w: W, h: H, text, fontSize: fontStandard, opacity: 0.35, align: 'center' })
    const wmStrong = makeWatermarkSvg({ w: W, h: H, text, fontSize: fontStrong, opacity: 0.5, align: 'center' })
    const wmCorner = makeWatermarkSvg({ w: W, h: H, text, fontSize: fontCorner, opacity: 0.35, align: 'right' })

    const previewStandard = await sharp(basePreviewBuffer)
      .composite([{ input: wmStandard, top: 0, left: 0 }])
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer()

    const previewStrong = await sharp(basePreviewBuffer)
      .composite([{ input: wmStrong, top: 0, left: 0 }])
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer()

    const previewCorner = await sharp(basePreviewBuffer)
      .composite([{ input: wmCorner, top: 0, left: 0 }])
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer()

    // Keys
    const thumbKey = `photos/thumb/${photoId}.jpg`
    const previewKey = `photos/preview/${photoId}.jpg`
    const previewStrongKey = `photos/preview_wm-strong/${photoId}.jpg`
    const previewCornerKey = `photos/preview_wm-corner/${photoId}.jpg`

    // Upload
    const uploads = [
      { key: thumbKey, body: thumbBuffer },
      { key: previewKey, body: previewStandard },
      { key: previewStrongKey, body: previewStrong },
      { key: previewCornerKey, body: previewCorner },
    ]

    for (const file of uploads) {
      await s3.send(
        new PutObjectCommand({
          Bucket: must('R2_BUCKET'),
          Key: file.key,
          Body: file.body,
          ContentType: 'image/jpeg',
          CacheControl: 'public, max-age=31536000, immutable',
        })
      )
    }

    // Update DB (don’t overwrite title/tags/description)
    const base = must('NEXT_PUBLIC_SITE_URL').replace(/\/$/, '')
    const thumb_url = `${base}/api/photo/${photoId}/thumb`
    const preview_url = `${base}/api/photo/${photoId}/preview`

    const { error: updateErr } = await supabaseAdmin
      .from('photos')
      .update({
        preview_url,
        thumb_url,
        status: 'published',
        ...exifPatch, // ✅ store EXIF + gps + country
      })
      .eq('id', photoId)

    if (updateErr) return res.status(400).json({ ok: false, error: updateErr.message })

    return res.status(200).json({
      ok: true,
      photoId,
      status: 'published',
      thumb_url,
      preview_url,
      thumbUrl: thumb_url,
      previewUrl: preview_url,
      keys: { thumbKey, previewKey, previewStrongKey, previewCornerKey },
      meta: { width: W, height: H },
      exifStored: !!exif,
    })
  } catch (err) {
    console.error('commit error:', err)
    return res.status(500).json({ ok: false, error: 'Commit failed', detail: err?.message || String(err) })
  }
}
