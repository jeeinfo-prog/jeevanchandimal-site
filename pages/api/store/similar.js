import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  try {
    const id = req.query.id
    if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

    // get current photo tags
    const { data: current } = await supabaseAdmin
      .from('photos')
      .select('tags')
      .eq('id', id)
      .single()

    const tags = Array.isArray(current?.tags) ? current.tags : []

    let photos = []

    // 1️⃣ try tag overlap
    if (tags.length) {
      const { data } = await supabaseAdmin
        .from('photos')
        .select('id,title,tags,thumb_url')
        .neq('id', id)
        .eq('status', 'published')
        .overlaps('tags', tags)
        .limit(6)

      photos = data || []
    }

    // 2️⃣ fallback → latest published photos (excluding current)
    if (!photos.length) {
      const { data } = await supabaseAdmin
        .from('photos')
        .select('id,title,tags,thumb_url')
        .neq('id', id)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(6)

      photos = data || []
    }

    return res.status(200).json({ ok: true, photos })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
