// pages/api/store/similar.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false })

  try {
    const id = typeof req.query.id === 'string' ? req.query.id : ''
    const limit = Math.min(parseInt(req.query.limit || '6', 10) || 6, 24)

    if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

    const { data: current } = await supabaseAdmin
      .from('photos')
      .select('id,tags')
      .eq('id', id)
      .single()

    const tags = Array.isArray(current?.tags) ? current.tags.filter(Boolean) : []

    if (!tags.length) {
      // no tags → no similar
      return res.status(200).json({ ok: true, photos: [] })
    }

    const { data } = await supabaseAdmin
      .from('photos')
      .select('id,title,tags,thumb_url,preview_url,created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .neq('id', id)
      .overlaps('tags', tags)
      .order('created_at', { ascending: false })
      .limit(limit)

    return res.status(200).json({ ok: true, photos: data || [] })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
