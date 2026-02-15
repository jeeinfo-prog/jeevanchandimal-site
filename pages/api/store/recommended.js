import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  try {
    const excludeId =
      typeof req.query.excludeId === 'string' ? req.query.excludeId : null

    const similarIds =
      typeof req.query.similarIds === 'string'
        ? req.query.similarIds.split(',').filter(Boolean)
        : []

    const limit = Number(req.query.limit) || 6

    // Build exclusion list
    const excludeList = [excludeId, ...similarIds].filter(Boolean)

    let query = supabaseAdmin
      .from('photos')
      .select('id, title, tags, thumb_url, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit + excludeList.length) // fetch extra in case we filter

    if (excludeList.length > 0) {
      query = query.not('id', 'in', `(${excludeList.join(',')})`)
    }

    const { data, error } = await query

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    // Ensure final limit after filtering
    const photos = (data || []).slice(0, limit)

    return res.status(200).json({ ok: true, photos })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
