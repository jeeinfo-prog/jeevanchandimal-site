// pages/api/gallery/random.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function clampInt(v, min, max, fallback) {
  const n = Number.parseInt(String(v ?? ''), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, n))
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ images: [] })
  }

  try {
    const limit = clampInt(req.query?.limit, 4, 40, 12)

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, title, status, thumb_url, preview_url, created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(400)

    if (error) {
      console.error('Gallery random supabase error:', error.message)
      return res.status(500).json({ images: [] })
    }

    const rows = (data || [])
      .map((r) => ({
        id: r.id,
        title: r.title || '',
        src: String(r.thumb_url || r.preview_url || '').trim(),
      }))
      .filter((r) => r.id && r.src)

    if (rows.length === 0) return res.status(200).json({ images: [] })

    // ✅ Fisher–Yates shuffle
    for (let i = rows.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[rows[i], rows[j]] = [rows[j], rows[i]]
    }

    const picked = rows.slice(0, limit)

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')

    return res.status(200).json({
      images: picked.map((r, idx) => ({
        src: r.src,
        href: `/store/${r.id}`,
        alt: r.title || `Photo ${idx + 1}`,
      })),
    })
  } catch (e) {
    console.error('Gallery random API fatal:', e)
    return res.status(500).json({ images: [] })
  }
}