// pages/api/admin/photos/commit.js

import { createClient } from '@supabase/supabase-js'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

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

function basenameFromKey(key) {
  const s = String(key || '').replace(/\\/g, '/')
  const base = s.split('/').pop() || s
  return base
}

function stripExt(name) {
  const n = String(name || '')
  const i = n.lastIndexOf('.')
  return i > 0 ? n.slice(0, i) : n
}

function extractLocationFromFilenameLike(filenameLike) {
  // filenameLike might be "history-cave-temple-dambulla-sri-lanka__JC000108.jpeg"
  const base = stripExt(basenameFromKey(filenameLike))
    .replace(/__.+$/, '') // remove __JC000123 etc
    .toLowerCase()

  const tokens = base
    .replace(/[_]+/g, '-') // underscores to hyphen
    .split(/[-\s]+/g)
    .filter(Boolean)

  // Sri Lanka normalization
  const hasSri = tokens.includes('sri')
  const hasLanka = tokens.includes('lanka') || tokens.includes('srilanka')
  const country = hasSri && hasLanka ? 'Sri Lanka' : tokens.includes('srilanka') ? 'Sri Lanka' : null

  // Add your common city/area list here (expand anytime)
  const cities = [
    'colombo',
    'kandy',
    'galle',
    'dambulla',
    'sigiriya',
    'yala',
    'wilpattu',
    'ampara',
    'wellawaya',
    'hatton',
    'batticaloa',
    'koslanda',
    'kalupahana',
    'rangiri',
    'senanayaka',
    'samudraya',
    'buduruwagala',
  ]

  const cityToken = cities.find((c) => tokens.includes(c)) || null
  const city = cityToken ? cityToken[0].toUpperCase() + cityToken.slice(1) : null

  return {
    location_country: country,
    location_city: city,
    location_name: country && city ? `${city}, ${country}` : country || city || null,
  }
}

function isUnknownColumn(err) {
  const msg = (err?.message || '').toLowerCase()
  return err?.code === '42703' || msg.includes('does not exist') || msg.includes('schema cache')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
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
    if (missing.length) return res.status(500).json({ ok: false, error: 'Missing environment variables', missing })

    const supabaseAdmin = createClient(must('NEXT_PUBLIC_SUPABASE_URL'), must('SUPABASE_SERVICE_ROLE_KEY'))

    // ✅ Admin check
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

    // ---------- FETCH PHOTO ----------
    const { data: photo, error: photoErr } = await supabaseAdmin
      .from('photos')
      .select('id, original_jpg_key, original_raw_key')
      .eq('id', photoId)
      .single()

    if (photoErr || !photo) return res.status(400).json({ ok: false, error: photoErr?.message || 'Photo not found' })

    const originalKey = photo.original_jpg_key || photo.original_raw_key
    if (!originalKey) return res.status(400).json({ ok: false, error: 'No original key found in photos row' })

    // ---------- DOWNLOAD ORIGINAL ----------
    const getObj = await s3.send(new GetObjectCommand({ Bucket: must('R2_BUCKET'), Key: originalKey }))
    if (!getObj?.Body) return res.status(500).json({ ok: false, error: 'R2 GetObject returned empty Body' })
    const originalBuffer = await streamToBuffer(getObj.Body)

    // ---------- THUMB ----------
    const thumbBuffer = await sharp(originalBuffer, { failOn: 'none' })
      .rotate()
      .resize(600, 450, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()

    // ---------- PREVIEW BASE ----------
    const basePreviewBuffer = await sharp(originalBuffer, { failOn: 'none' })
      .rotate()
      .resize({ width: 2000, withoutEnlargement: true })
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer()

    const meta = await sharp(basePreviewBuffer).metadata()
    const W = meta.width
    const H = meta.height
    if (!W || !H) return res.status(400).json({ ok: false, error: 'Invalid preview metadata after resize' })

    // ---------- EXIF ----------
    // 1) store raw exif as base64 (always works if present)
    const exif_base64 = meta?.exif ? Buffer.from(meta.exif).toString('base64') : null

    // 2) best-effort parsed exif (only if exif-reader is installed)
    let exif_parsed = null
    if (meta?.exif) {
      try {
        const exifReaderMod = await import('exif-reader')
        const exifReader = exifReaderMod?.default || exifReaderMod
        const parsed = exifReader(meta.exif)

        // Keep it small + safe (don’t store huge nested blobs)
        exif_parsed = {
          Make: parsed?.image?.Make || null,
          Model: parsed?.image?.Model || null,
          LensModel: parsed?.exif?.LensModel || null,
          DateTimeOriginal: parsed?.exif?.DateTimeOriginal || null,
          ISO: parsed?.exif?.ISO || null,
          FNumber: parsed?.exif?.FNumber || null,
          ExposureTime: parsed?.exif?.ExposureTime || null,
          FocalLength: parsed?.exif?.FocalLength || null,
        }
      } catch {
        // exif-reader not installed OR parse failed → still ok
        exif_parsed = null
      }
    }

    const exifData = exif_base64 || exif_parsed
      ? {
          exif_base64,
          exif: exif_parsed,
          image: {
            width: W,
            height: H,
            format: meta.format || null,
          },
        }
      : null

    // ---------- WATERMARKS ----------
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

    // ---------- R2 KEYS ----------
    const thumbKey = `photos/thumb/${photoId}.jpg`
    const previewKey = `photos/preview/${photoId}.jpg`
    const previewStrongKey = `photos/preview_wm-strong/${photoId}.jpg`
    const previewCornerKey = `photos/preview_wm-corner/${photoId}.jpg`

    // ---------- UPLOAD ----------
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

    // ---------- URLS ----------
    const base = must('NEXT_PUBLIC_SITE_URL').replace(/\/$/, '')
    const thumb_url = `${base}/api/photo/${photoId}/thumb`
    const preview_url = `${base}/api/photo/${photoId}/preview`

    // ---------- LOCATION from originalKey filename ----------
    const loc = extractLocationFromFilenameLike(originalKey)

    // ---------- UPDATE DB (safe: won't overwrite title/tags/description) ----------
    const updatePayload = {
      preview_url,
      thumb_url,
      status: 'published',
    }

    // Only add if columns exist in your DB
    if (exifData) updatePayload.exif = exifData
    if (loc?.location_country) updatePayload.location_country = loc.location_country
    if (loc?.location_city) updatePayload.location_city = loc.location_city
    if (loc?.location_name) updatePayload.location_name = loc.location_name

    const up = await supabaseAdmin.from('photos').update(updatePayload).eq('id', photoId)

    if (up.error) {
      // If your table doesn't have exif/location columns yet, fallback to minimal update
      if (isUnknownColumn(up.error)) {
        const fallback = await supabaseAdmin
          .from('photos')
          .update({ preview_url, thumb_url, status: 'published' })
          .eq('id', photoId)

        if (fallback.error) return res.status(400).json({ ok: false, error: fallback.error.message })
      } else {
        return res.status(400).json({ ok: false, error: up.error.message })
      }
    }

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
      exif: exifData ? { hasExif: !!meta?.exif } : { hasExif: false },
      location: loc,
    })
  } catch (err) {
    console.error('commit error:', err)
    return res.status(500).json({ ok: false, error: 'Commit failed', detail: err?.message || String(err) })
  }
}
