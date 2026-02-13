import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const id = typeof req.query.id === 'string' ? req.query.id : ''
  if (!id) {
    return res.status(400).json({ ok: false, error: 'Missing id' })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, title, tags, preview_url, thumb_url, created_at')
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      return res.status(404).json({ ok: false, error: 'Photo not found' })
    }

    return res.status(200).json({ ok: true, photo: data })
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch photo',
      detail: e?.message || String(e),
    })
  }
}
