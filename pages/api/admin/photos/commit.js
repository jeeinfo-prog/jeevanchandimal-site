import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { headObject } from '../../../../lib/r2'

async function requireAdmin(req) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return { ok: false, status: 401, error: 'Missing token' }

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) return { ok: false, status: 401, error: 'Invalid token' }

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single()

  if (!profile || profile.role !== 'admin') return { ok: false, status: 403, error: 'Not admin' }
  return { ok: true }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error })

  try {
    const { photoId, objectKey } = req.body || {}
    if (!photoId || !objectKey) {
      return res.status(400).json({ error: 'photoId + objectKey required' })
    }

    const meta = await headObject(objectKey)

    await supabaseAdmin
      .from('photo_assets')
      .update({
        original_key: objectKey,
        original_mime: meta.ContentType || null,
        original_size: meta.ContentLength || null,
        original_etag: meta.ETag || null,
        updated_at: new Date().toISOString(),
      })
      .eq('photo_id', photoId)

    await supabaseAdmin
      .from('photos')
      .update({ status: 'processing', updated_at: new Date().toISOString() })
      .eq('id', photoId)

    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Commit failed' })
  }
}
