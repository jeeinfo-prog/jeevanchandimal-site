// pages/api/gallery/random.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ images: [] })
  }

  try {
    const limit = Math.max(4, Math.min(40, Number(req.query.limit || 12)))

    // 🔹 Adjust this query to match your schema
    // If you have a "published" or "is_public" column, uncomment the filter
    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, delivery_url, public_url, title')
      // .eq('is_public', true) // ← use if you have it
      .limit(200)

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ images: [] })
    }

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(200).json({ images: [] })
    }

    // 🔹 pick best URL per row
    const urls = data
      .map((r) => r.delivery_url || r.public_url)
      .filter(Boolean)

    if (urls.length === 0) {
      return res.status(200).json({ images: [] })
    }

    // 🔹 Fisher–Yates shuffle
    for (let i = urls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[urls[i], urls[j]] = [urls[j], urls[i]]
    }

    const picked = urls.slice(0, limit)

    // 🔹 Cache for 60s on Vercel edge/CDN
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