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

    // ✅ Keep rows (so we can return href/id), but only rows with an image URL
    const rows = data
      .map((r) => ({
        id: r.id,
        title: r.title || '',
        src: r.thumb_url || r.preview_url || '',
      }))
      .filter((r) => Boolean(r.src) && Boolean(r.id))

    if (rows.length === 0) {
      return res.status(200).json({ images: [] })
    }

    // ✅ Fisher–Yates shuffle (rows)
    for (let i = rows.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[rows[i], rows[j]] = [rows[j], rows[i]]
    }

    const picked = rows.slice(0, limit)

    // ✅ Cache for 60s on Vercel edge/CDN
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300'
    )

    // ✅ Return objects so frontend can link to /store/[id]
    return res.status(200).json({
      images: picked.map((r, idx) => ({
        src: r.src,
        href: `/store/${r.id}`,
        alt: r.title || `Photo ${idx + 1}`,
      })),
    })
  } catch (e) {
    console.error('Gallery random API error:', e)
    return res.status(500).json({ images: [] })
  }
}