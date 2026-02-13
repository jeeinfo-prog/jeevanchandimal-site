// pages/api/store/photos.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, title, tags, preview_url, thumb_url, created_at')
      .eq('status', 'published')
      // ✅ ONLY show photos that actually have generated derivatives
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    return res.status(200).json({
      ok: true,
      photos: data || [],
    })
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch store photos',
      detail: e?.message || String(e),
    })
  }
}
