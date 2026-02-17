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

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select(`
        id,
        title,
        description,
        tags,
        preview_url,
        thumb_url,
        created_at,
        location,
        exif,
        raw_available
      `)
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

    // Ensure EXIF is an object (never null) for UI safety
    const exif = data.exif && typeof data.exif === 'object' ? data.exif : {}

    const photo = {
      id: data.id,
      title: data.title || 'Untitled',
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      preview_url: preview,
      thumb_url: thumb,
      created_at: data.created_at,
      location: data.location || 'Sri Lanka',
      exif, // ✅ now contains width/height if stored
      raw_available: Boolean(data.raw_available),
    }

    return res.status(200).json({
      ok: true,
      photo,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
