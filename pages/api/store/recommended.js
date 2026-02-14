// pages/api/store/recommended.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const excludeId = typeof req.query.excludeId === 'string' ? req.query.excludeId : ''
    const limit = Math.min(parseInt(req.query.limit || '6', 10) || 6, 24)

    let q = supabaseAdmin
      .from('photos')
      .select('id,title,tags,thumb_url,preview_url,created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (excludeId) q = q.neq('id', excludeId)

    const { data, error } = await q
    if (error) return res.status(500).json({ ok: false, error: error.message })

    return res.status(200).json({ ok: true, photos: data || [] })
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
