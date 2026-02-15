// pages/api/store/recommended.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  try {
    const excludeId =
      typeof req.query.excludeId === 'string' ? req.query.excludeId : null

    const similarIds =
      typeof req.query.similarIds === 'string'
        ? req.query.similarIds.split(',').map((s) => s.trim()).filter(Boolean)
        : []

    const limit = Math.min(Number(req.query.limit) || 6, 24)

    // Build exclusion set
    const excludeSet = new Set([excludeId, ...similarIds].filter(Boolean))

    // Pull extra rows, filter in JS (avoids PostgREST not.in parsing issues)
    const fetchCount = Math.min(limit + excludeSet.size + 20, 60)

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, title, tags, thumb_url, created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(fetchCount)

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    const filtered = (data || []).filter((p) => !excludeSet.has(p.id)).slice(0, limit)

    return res.status(200).json({ ok: true, photos: filtered })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
