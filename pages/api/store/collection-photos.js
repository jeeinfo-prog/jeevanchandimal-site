import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function normalize(tag) {
  return String(tag || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '') // "fine art" -> "fineart"
}

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const rawTag = typeof req.query.tag === 'string' ? req.query.tag : ''
    const limit = Math.min(Number(req.query.limit) || 48, 96)

    if (!rawTag) {
      return res.status(400).json({ ok: false, error: 'Missing tag' })
    }

    const target = normalize(rawTag)

    // ✅ Fetch recent published photos safely (no JSON filters)
    const fetchCount = Math.min(limit + 80, 150)

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, title, tags, preview_url, thumb_url, created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(fetchCount)

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    const photos = (data || [])
      .filter((p) => {
        const arr = Array.isArray(p.tags) ? p.tags : []

        return arr.some((t) => normalize(t) === target)
      })
      .slice(0, limit)

    return res.status(200).json({ ok: true, photos })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
