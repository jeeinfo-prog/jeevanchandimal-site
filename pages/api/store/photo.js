// pages/api/store/photo.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  try {
    const id = typeof req.query.id === 'string' ? req.query.id : ''
    if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('*') // 🔧 safe: avoids missing column errors
      .eq('id', id)
      .single()

    if (error || !data) {
      return res.status(404).json({ ok: false, error: error?.message || 'Photo not found' })
    }

    return res.status(200).json({ ok: true, photo: data })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
