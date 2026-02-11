import sharp from 'sharp'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { getObjectBuffer, putObjectBuffer } from '../../../../lib/r2'

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

  if (profErr || !profile) return { ok: false, status: 403, error: 'No profile' }
  if (profile.role !== 'admin') return { ok: false, status: 403, error: 'Not admin' }

  return { ok: true, user: userData.user }
}

function safeBaseName(objectKey) {
  const last = String(objectKey).split('/').pop() || 'image.jpg'
  return last.replace(/\.[^.]+$/, '').replace(/[^\w.\-]+/g, '_')
}

function makeWatermarkSvg(text, width, height) {
  const fontSize = Math.max(24, Math.floor(Math.min(width, height) * 0.06))
  const opacity = 0.18
  return Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(${width / 2} ${height / 2}) rotate(-20)">
    <text
      x="0" y="0"
      text-anchor="middle"
      dominant-baseline="middle"
      font-family="Inter, Arial, sans-serif"
      font-size="${fontSize}"
      fill="white"
      fill-opacity="${opacity}"
      letter-spacing="2"
    >${text}</text>
  </g>
</svg>`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error })

  let step = 'start'
  try {
    const { photoId, objectKey } = req.body || {}
    if (!photoId || !objectKey) return res.status(400).json({ error: 'photoId + objectKey required' })

    step = 'r2:getObject'
    const originalBuf = await getObjectBuffer(objectKey)

    step = 'sharp:metadata'
    const meta = await sharp(originalBuf, { failOn: 'none' }).metadata()
    if (!meta?.width || !meta?.height) {
      // Not a format sharp can read (e.g. RAW/ZIP) — skip derivative generation
      step = 'db:update(skip)'
      await supabaseAdmin
        .from('photos')
        .update({ original_key: objectKey, status: 'published' })
        .eq('id', photoId)

      return res.status(200).json({ ok: true, skipped: true, reason: 'sharp-cannot-read', original_key: objectKey })
    }

    const base = safeBaseName(objectKey)
    const thumbKey = `photos/thumb/${photoId}/${base}.jpg`
    const previewKey = `photos/preview/${photoId}/${base}.jpg`

    step = 'sharp:thumb'
    const thumbBuf = await sharp(originalBuf, { failOn: 'none' })
      .rotate()
      .resize({ width: 700, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer()

    step = 'sharp:preview'
    const previewBase = sharp(originalBuf, { failOn: 'none' })
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })

    const previewMeta = await previewBase.metadata()
    const wmText = process.env.WATERMARK_TEXT || 'JeevanChandimal.com'
    const wmSvg = makeWatermarkSvg(wmText, previewMeta.width || 1600, previewMeta.height || 900)

    const previewBuf = await previewBase.composite([{ input: wmSvg }]).toBuffer()

    step = 'r2:put(thumb)'
    await putObjectBuffer({ key: thumbKey, buffer: thumbBuf, contentType: 'image/jpeg' })

    step = 'r2:put(preview)'
    await putObjectBuffer({ key: previewKey, buffer: previewBuf, contentType: 'image/jpeg' })

    // NOTE: URLs are optional. If you don’t have a public domain yet, keep them null.
    const publicBase = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL || null
    const thumbUrl = publicBase ? `${publicBase.replace(/\/$/, '')}/${thumbKey}` : null
    const previewUrl = publicBase ? `${publicBase.replace(/\/$/, '')}/${previewKey}` : null

    step = 'db:update(published)'
    const { error: upErr } = await supabaseAdmin
      .from('photos')
      .update({
        status: 'published',
        original_key: objectKey,
        thumb_key: thumbKey,
        preview_key: previewKey,
        thumb_url: thumbUrl,
        preview_url: previewUrl,
      })
      .eq('id', photoId)

    if (upErr) throw upErr

    return res.status(200).json({
      ok: true,
      photoId,
      originalKey: objectKey,
      thumbKey,
      previewKey,
      thumbUrl,
      previewUrl,
    })
  } catch (e) {
    console.error('COMMIT_ERROR', { step, message: e?.message, stack: e?.stack })
    return res.status(500).json({
      error: 'Commit failed',
      step,
      message: e?.message || String(e),
      stack: e?.stack || null,
    })
  }
}
