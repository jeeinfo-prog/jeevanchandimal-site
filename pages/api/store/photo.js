// pages/api/store/photo.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function cleanUrl(u) {
  const s = String(u || '')
  const v = s.replace(/\s+/g, '')
  return v || null
}

async function fetchPhoto(id, withExtras) {
  // withExtras = true => try location + raw_available (if columns exist)
  // withExtras = false => minimal safe select
  const selectWithExtras = `
    id,
    title,
    description,
    tags,
    preview_url,
    thumb_url,
    created_at,
    exif,
    location,
    raw_available
  `

  const selectMinimal = `
    id,
    title,
    description,
    tags,
    preview_url,
    thumb_url,
    created_at,
    exif
  `

  const sel = withExtras ? selectWithExtras : selectMinimal

  return supabaseAdmin
    .from('photos')
    .select(sel)
    .eq('id', id)
    .eq('status', 'published')
    .maybeSingle()
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

    // ✅ Try with extras first
    let data, error
    ;({ data, error } = await fetchPhoto(id, true))

    // ✅ If columns don't exist, retry with minimal select
    if (error && /column .* does not exist/i.test(error.message || '')) {
      ;({ data, error } = await fetchPhoto(id, false))
    }

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

    // Ensure EXIF is always an object (never null) for UI safety
    const exif = data.exif && typeof data.exif === 'object' ? data.exif : {}

    const photo = {
      id: data.id,
      title: data.title || 'Untitled',
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      preview_url: preview,
      thumb_url: thumb,
      created_at: data.created_at,

      // ✅ safe defaults if columns not present
      location: typeof data.location === 'string' && data.location.trim() ? data.location : 'Sri Lanka',
      exif,
      raw_available: typeof data.raw_available === 'boolean' ? data.raw_available : true,
    }

    return res.status(200).json({ ok: true, photo })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
