import sharp from 'sharp'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { getObjectBuffer, putObject } from '../../../../lib/r2'

async function requireAdmin(req) {
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

  if (profErr || !profile) return { ok: false, status: 403, error: `No profile: ${profErr?.message || ''}` }
  if (profile.role !== 'admin') return { ok: false, status: 403, error: 'Not admin' }

  return { ok: true, user: userData.user }
}

function safeName(name) {
  return String(name || 'photo').replace(/[^\w.\-]+/g, '_')
}

// Basic watermark (text) – you can upgrade later to image watermark
async function applyWatermark(imageBuffer, text = 'jeevanchandimal.com') {
  const img = sharp(imageBuffer)
  const meta = await img.metadata()

  const width = meta.width || 2000
  const height = meta.height || 1500

  const fontSize = Math.max(18, Math.floor(Math.min(width, height) * 0.02))
  const padding = Math.floor(fontSize * 0.8)

  const svg = Buffer.from(`
    <svg width="${width}" height="${height}">
      <style>
        .wm {
          font-family: Inter, Arial, sans-serif;
          font-size: ${fontSize}px;
          fill: rgba(255,255,255,0.55);
        }
      </style>
      <text x="${width - padding}" y="${height - padding}"
            text-anchor="end" class="wm">${text}</text>
    </svg>
  `)

  return img
    .composite([{ input: svg, top: 0, left: 0 }])
    .jpeg({ quality: 82 })
    .toBuffer()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error })

  try {
    const { photoId, objectKey } = req.body || {}
    if (!photoId || !objectKey) return res.status(400).json({ error: 'photoId + objectKey required' })

    // 1) Fetch original from R2
    const originalBuf = await getObjectBuffer(objectKey)
    if (!originalBuf || !originalBuf.length) {
      return res.status(400).json({ error: 'Original file not found in R2' })
    }

    // 2) Generate thumbnail + preview
    const thumbBuf = await sharp(originalBuf)
      .rotate()
      .resize({ width: 480, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer()

    const previewBuf = await sharp(originalBuf)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer()

    // 3) Watermarked image (for customer preview)
    const watermarkedBuf = await applyWatermark(previewBuf, 'jeevanchandimal.com')

    const baseName = safeName(objectKey.split('/').pop())
    const thumbKey = `photos/thumb/${photoId}/${baseName}.jpg`
    const previewKey = `photos/preview/${photoId}/${baseName}.jpg`
    const wmKey = `photos/watermark/${photoId}/${baseName}.jpg`

    // 4) Upload generated files to R2
    await putObject(thumbKey, thumbBuf, 'image/jpeg')
    await putObject(previewKey, previewBuf, 'image/jpeg')
    await putObject(wmKey, watermarkedBuf, 'image/jpeg')

    // 5) Update DB (photos + photo_assets)
    // photos table columns in your screenshot:
    // - original_jpg_key, preview_url, thumb_url, status, title...
    const { error: photosErr } = await supabaseAdmin
      .from('photos')
      .update({
        original_jpg_key: objectKey,
        preview_url: previewKey,
        thumb_url: thumbKey,
        status: 'published',
      })
      .eq('id', photoId)

    if (photosErr) {
      return res.status(500).json({
        error: 'DB error updating photos',
        details: photosErr,
      })
    }

    const { error: assetsErr } = await supabaseAdmin
      .from('photo_assets')
      .upsert(
        {
          photo_id: photoId,
          original_key: objectKey,
          preview_key: previewKey,
          thumb_key: thumbKey,
          watermark_key: wmKey,
        },
        { onConflict: 'photo_id' }
      )

    if (assetsErr) {
      return res.status(500).json({
        error: 'DB error updating photo_assets',
        details: assetsErr,
      })
    }

    return res.status(200).json({
      ok: true,
      photoId,
      objectKey,
      thumbKey,
      previewKey,
      watermarkKey: wmKey,
    })
  } catch (e) {
    console.error('COMMIT_ERROR', e)
    return res.status(500).json({
      error: 'Commit failed',
      message: e?.message || String(e),
      stack: e?.stack || null,
    })
  }
}
