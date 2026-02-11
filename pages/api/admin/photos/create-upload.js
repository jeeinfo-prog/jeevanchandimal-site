import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { getPresignedPutUrl } from '../../../../lib/r2'

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

function sanitizeFilename(filename) {
  // keep letters/numbers/._- only
  return String(filename).replace(/[^\w.\-]+/g, '_')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error })

  try {
    const body = req.body || {}
    const filename = body.filename
    const contentType = body.contentType

    if (!filename || !contentType) {
      return res.status(400).json({ error: 'filename + contentType required' })
    }

    const safeName = sanitizeFilename(filename)

    // 1) Create photo row (requires public.photos.status)
    const { data: photo, error: photoErr } = await supabaseAdmin
      .from('photos')
      .insert([{ status: 'draft' }])
      .select('id')
      .single()

    if (photoErr) {
      console.error('photos insert error:', photoErr)
      return res.status(500).json({
        error: 'DB error inserting into photos',
        code: photoErr.code || null,
        hint: photoErr.hint || null,
        details: photoErr.details || null,
        message: photoErr.message || null,
      })
    }

    // 2) Create object key
    const objectKey = `photos/original/${photo.id}/${safeName}`

    // 3) Create presigned PUT URL (R2)
    const uploadUrl = await getPresignedPutUrl({
      key: objectKey,
      contentType,
    })

    // 4) Save asset row (requires public.photo_assets.photo_id + original_key)
    const { error: assetErr } = await supabaseAdmin
      .from('photo_assets')
      .insert([{ photo_id: photo.id, original_key: objectKey }])

    if (assetErr) {
      console.error('photo_assets insert error:', assetErr)
      return res.status(500).json({
        error: 'DB error inserting into photo_assets',
        code: assetErr.code || null,
        hint: assetErr.hint || null,
        details: assetErr.details || null,
        message: assetErr.message || null,
      })
    }

    return res.status(200).json({
      photoId: photo.id,
      objectKey,
      uploadUrl,
    })
  } catch (e) {
    console.error('create-upload fatal error:', e)
    return res.status(500).json({
      error: e?.message || 'Server error',
      code: e?.code || null,
      hint: e?.hint || null,
      details: e?.details || null,
    })
  }
}
