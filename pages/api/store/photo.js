// pages/api/store/photo.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function cleanUrl(u) {
  const s = String(u || '')
  const v = s.replace(/\s+/g, '')
  return v || null
}

function cleanText(v) {
  const s = String(v || '').trim()
  return s || ''
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

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select(
        'id, title, description, tags, preview_url, thumb_url, created_at, location_name, city, country, exif_json, original_raw_key'
      )
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

    const exif = data.exif_json && typeof data.exif_json === 'object' ? data.exif_json : null

    const locName = cleanText(data.location_name)
    const city = cleanText(data.city)
    const country = cleanText(data.country)

    const fallbackLoc = [city, country].filter(Boolean).join(', ')
    const location = locName || fallbackLoc || 'Sri Lanka'

    const rawAvailable = Boolean(cleanText(data.original_raw_key))

    const photo = {
      id: data.id,
      title: data.title || 'Untitled',
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      created_at: data.created_at,

      // ✅ provide both shapes (safer for different UI code paths)
      preview_url: preview,
      thumb_url: thumb,
      previewUrl: preview,
      thumbUrl: thumb,

      // ✅ original EXIF (already saved by /api/photo/[id]/exif?save=1)
      exif,

      // ✅ location string
      location,

      // ✅ RAW availability
      raw_available: rawAvailable,
      original_raw_key: rawAvailable ? data.original_raw_key : null,
    }

    return res.status(200).json({ ok: true, photo })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
