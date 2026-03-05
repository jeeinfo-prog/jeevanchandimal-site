// pages/api/gallery/random.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function clampInt(v, min, max, fallback) {
  const n = Number.parseInt(String(v ?? ''), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, n))
}

function cleanUrl(v) {
  const s = String(v || '').trim()
  if (!s) return ''
  // avoid accidental whitespace/newlines in urls
  return s.replace(/[\r\n\t]/g, '')
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ images: [] })
  }

  try {
    const limit = clampInt(req.query?.limit, 4, 40, 12)

    // Optional: allow controlled caching if you want it later:
    // /api/gallery/random?limit=12&cache=60
    const cacheSeconds = clampInt(req.query?.cache, 0, 3600, 0)

    // ✅ IMPORTANT: random endpoint should be fresh by default
    // If cacheSeconds === 0 -> no-store (best for instant updates)
    if (cacheSeconds > 0) {
      res.setHeader(
        'Cache-Control',
        `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${Math.min(
          cacheSeconds * 5,
          600
        )}`
      )
    } else {
      res.setHeader(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
      )
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      // helps proxies/CDNs not mix responses
      res.setHeader('Vary', 'Accept, Cookie')
    }

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
      .map((r) => {
        const src = cleanUrl(r.thumb_url || r.preview_url)
        return {
          id: r.id,
          title: r.title || '',
          src,
        }
      })
      .filter((r) => r.id && r.src)

    if (rows.length === 0) return res.status(200).json({ images: [] })

    // ✅ Fisher–Yates shuffle
    for (let i = rows.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[rows[i], rows[j]] = [rows[j], rows[i]]
    }

    const picked = rows.slice(0, limit)

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