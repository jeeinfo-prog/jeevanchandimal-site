// pages/api/store/photos.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function cleanUrl(u) {
  const s = String(u || '')
  const v = s.replace(/\s+/g, '')
  return v || null
}

function clampInt(v, min, max, fallback) {
  const n = Number.parseInt(String(v ?? ''), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, n))
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    // optional: /api/store/photos?limit=200
    const limit = clampInt(req.query?.limit, 1, 2000, 2000)

    // ✅ IMPORTANT: do NOT select columns that aren't in your table (e.g. location)
    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id,title,description,tags,preview_url,thumb_url,created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('store/photos error:', error.message)
      return res.status(500).json({ ok: false, error: error.message })
    }

    const photos = (data || []).map((row) => ({
      id: row.id,
      title: row.title || 'Untitled',
      description: row.description || '',
      tags: Array.isArray(row.tags) ? row.tags : [],
      preview_url: cleanUrl(row.preview_url),
      thumb_url: cleanUrl(row.thumb_url),
      created_at: row.created_at,
    }))

    return res.status(200).json({ ok: true, photos })
  } catch (e) {
    console.error('store/photos fatal:', e)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}