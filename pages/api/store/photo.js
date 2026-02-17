// pages/api/store/photos.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function cleanUrl(u) {
  const s = String(u || '')
  const v = s.replace(/\s+/g, '')
  return v || null
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, title, tags, preview_url, thumb_url, created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(2000)

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    const photos = (data || []).map((row) => ({
      id: row.id,
      title: row.title || 'Untitled',
      tags: Array.isArray(row.tags) ? row.tags : [],
      preview_url: cleanUrl(row.preview_url),
      thumb_url: cleanUrl(row.thumb_url),
      created_at: row.created_at,
    }))

    return res.status(200).json({
      ok: true,
      photos,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
