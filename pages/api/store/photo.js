// pages/api/store/photo.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const id = String(req.query?.id || '').trim()

    // ✅ Require id
    if (!id) {
      return res.status(400).json({ ok: false, error: 'Missing photo id' })
    }

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select(
        'id, title, description, tags, preview_url, thumb_url, created_at, location, exif'
      )
      .eq('id', id)
      .eq('status', 'published')
      .maybeSingle()

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    if (!data) {
      return res.status(404).json({ ok: false, error: 'Photo not found' })
    }

    // ✅ Ensure derivatives exist (optional but matches your list behavior)
    if (!data.thumb_url || !data.preview_url) {
      return res.status(404).json({ ok: false, error: 'Preview not ready' })
    }

    return res.status(200).json({ ok: true, photo: data })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
