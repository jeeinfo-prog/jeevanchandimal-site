// pages/api/store/photo.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const id = typeof req.query.id === 'string' ? req.query.id : ''
    if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id,title,description,tags,thumb_url,preview_url,created_at')
      .eq('id', id)
      .single()

    if (error || !data) {
      return res.status(404).json({ ok: false, error: 'Photo not found' })
    }

    return res.status(200).json({ ok: true, photo: data })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
