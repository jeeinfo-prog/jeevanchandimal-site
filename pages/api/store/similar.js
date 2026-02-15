import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  try {
    const id = req.query.id
    const limit = Math.min(Number(req.query.limit) || 6, 24)
    if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

    const { data: current } = await supabaseAdmin
      .from('photos')
      .select('tags')
      .eq('id', id)
      .single()

    const tags = Array.isArray(current?.tags) ? current.tags : []
    let photos = []

    if (tags.length) {
      const { data } = await supabaseAdmin
        .from('photos')
        .select('id,title,tags,thumb_url')
        .neq('id', id)
        .eq('status', 'published')
        .not('thumb_url', 'is', null)
        .overlaps('tags', tags)
        .limit(limit)

      photos = data || []
    }

    if (!photos.length) {
      const { data } = await supabaseAdmin
        .from('photos')
        .select('id,title,tags,thumb_url')
        .neq('id', id)
        .eq('status', 'published')
        .not('thumb_url', 'is', null)
        .order('created_at', { ascending: false })
        .limit(limit)

      photos = data || []
    }

    return res.status(200).json({ ok: true, photos })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
