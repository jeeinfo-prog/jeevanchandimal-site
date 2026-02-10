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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error })

  try {
    const { filename, contentType } = req.body || {}
    if (!filename || !contentType) {
      return res.status(400).json({ error: 'filename + contentType required' })
    }

    const { data: photo, error: photoErr } = await supabaseAdmin
      .from('photos')
      .insert([{ status: 'draft' }])
      .select('id')
      .single()

    if (photoErr) throw photoErr

    const safeName = String(filename).replace(/[^\w.\-]+/g, '_')
    const objectKey = `photos/original/${photo.id}/${safeName}`

    const uploadUrl = await getPresignedPutUrl({ key: objectKey, contentType })

    const { error: assetErr } = await supabaseAdmin
      .from('photo_assets')
      .insert([{ photo_id: photo.id, original_key: objectKey }])

    if (assetErr) throw assetErr

    return res.status(200).json({ photoId: photo.id, objectKey, uploadUrl })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Server error' })
  }
}
