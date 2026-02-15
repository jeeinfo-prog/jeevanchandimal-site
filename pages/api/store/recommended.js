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

    const excludeList = Array.from(new Set([excludeId, ...similarIds].filter(Boolean)))

    let query = supabaseAdmin
      .from('photos')
      .select('id, title, tags, thumb_url, created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (excludeList.length > 0) {
      // Postgres array literal with quoted UUIDs
      const arr = `{${excludeList.map((x) => `"${x}"`).join(',')}}`
      query = query.not('id', 'in', arr)
    }

    const { data, error } = await query
    if (error) return res.status(500).json({ ok: false, error: error.message })

    return res.status(200).json({ ok: true, photos: data || [] })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
