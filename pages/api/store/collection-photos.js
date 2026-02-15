// pages/api/store/collection-photos.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const tag = typeof req.query.tag === 'string' ? req.query.tag.trim() : ''
    const limit = Math.min(Number(req.query.limit) || 48, 96)

    if (!tag) return res.status(400).json({ ok: false, error: 'Missing tag' })

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, title, tags, preview_url, thumb_url, created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .contains('tags', [tag]) // tag must be present in tags array
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) return res.status(500).json({ ok: false, error: error.message })

    return res.status(200).json({ ok: true, photos: data || [] })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
