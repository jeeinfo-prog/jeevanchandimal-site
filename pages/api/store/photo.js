// pages/api/store/photo.js
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
    const id = String(req.query?.id || '').trim()

    if (!id) {
      return res.status(400).json({ ok: false, error: 'Missing photo id' })
    }

    // ✅ IMPORTANT: do NOT select columns that may not exist (like location)
    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, title, description, tags, preview_url, thumb_url, created_at, exif')
      .eq('id', id)
      .eq('status', 'published')
      .maybeSingle()

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    if (!data) {
      return res.status(404).json({ ok: false, error: 'Photo not found' })
    }

    const preview = cleanUrl(data.preview_url)
    const thumb = cleanUrl(data.thumb_url)

    if (!preview || !thumb) {
      return res.status(404).json({ ok: false, error: 'Preview not ready' })
    }

    const exif = data.exif && typeof data.exif === 'object' ? data.exif : {}

    const photo = {
      id: data.id,
      title: data.title || 'Untitled',
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      preview_url: preview,
      thumb_url: thumb,
      created_at: data.created_at,

      // ✅ Keep shape for UI compatibility
      exif,

      // ✅ Defaults (since DB column doesn't exist)
      location: 'Sri Lanka',
      raw_available: true,
    }

    return res.status(200).json({ ok: true, photo })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
