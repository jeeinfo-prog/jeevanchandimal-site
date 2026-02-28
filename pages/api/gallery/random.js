// pages/api/gallery/random.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ images: [] })
  }

  try {
    const limit = Math.max(4, Math.min(40, Number(req.query.limit || 12)))

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, title, status, thumb_url, preview_url')
      .eq('status', 'published')
      .limit(200)

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ images: [] })
    }

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(200).json({ images: [] })
    }

    // Prefer thumb for speed, fallback to preview
    const urls = data
      .map((r) => r.thumb_url || r.preview_url)
      .filter(Boolean)

    if (urls.length === 0) {
      return res.status(200).json({ images: [] })
    }

    // Fisher–Yates shuffle
    for (let i = urls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[urls[i], urls[j]] = [urls[j], urls[i]]
    }

    const picked = urls.slice(0, limit)

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300'
    )

    return res.status(200).json({ images: picked })
  } catch (e) {
    console.error('Gallery random API error:', e)
    return res.status(500).json({ images: [] })
  }
}