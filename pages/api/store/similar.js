// pages/api/store/similar.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const id = typeof req.query.id === 'string' ? req.query.id : ''
    const limit = Math.min(parseInt(req.query.limit || '6', 10) || 6, 24)

    if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

    // 1) read current photo tags
    const { data: current, error: curErr } = await supabaseAdmin
      .from('photos')
      .select('id,tags')
      .eq('id', id)
      .single()

    if (curErr || !current) return res.status(404).json({ ok: false, error: 'Photo not found' })

    const tags = Array.isArray(current.tags) ? current.tags.filter(Boolean) : []

    // 2) similar by tag overlap
    let similar = []
    if (tags.length) {
      const { data, error } = await supabaseAdmin
        .from('photos')
        .select('id,title,tags,thumb_url,preview_url,created_at')
        .eq('status', 'published')
        .not('thumb_url', 'is', null)
        .not('preview_url', 'is', null)
        .neq('id', id)
        .overlaps('tags', tags) // ✅ Postgres array overlap
        .order('created_at', { ascending: false })
        .limit(limit)

      if (!error && data) similar = data
    }

    // 3) fallback to latest if not enough
    if (similar.length < limit) {
      const { data: fallback } = await supabaseAdmin
        .from('photos')
        .select('id,title,tags,thumb_url,preview_url,created_at')
        .eq('status', 'published')
        .not('thumb_url', 'is', null)
        .not('preview_url', 'is', null)
        .neq('id', id)
        .order('created_at', { ascending: false })
        .limit(limit * 2)

      const seen = new Set(similar.map((x) => x.id))
      for (const row of fallback || []) {
        if (similar.length >= limit) break
        if (!seen.has(row.id)) {
          seen.add(row.id)
          similar.push(row)
        }
      }
    }

    return res.status(200).json({ ok: true, photos: similar })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
