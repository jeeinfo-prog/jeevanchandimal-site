// pages/api/store/recommended.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false })

  try {
    const excludeId = typeof req.query.excludeId === 'string' ? req.query.excludeId : ''
    const similarIds = (req.query.similarIds || '').split(',').filter(Boolean)
    const limit = Math.min(parseInt(req.query.limit || '6', 10) || 6, 24)

    let q = supabaseAdmin
      .from('photos')
      .select('id,title,tags,thumb_url,preview_url,created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(limit * 3)

    if (excludeId) q = q.neq('id', excludeId)

    const { data } = await q

    const filtered = (data || []).filter((p) => !similarIds.includes(p.id)).slice(0, limit)

    return res.status(200).json({ ok: true, photos: filtered })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
