// pages/api/store/photo.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

const LOCATION_MAP = {
  batticaloa: 'Batticaloa, Sri Lanka',
  matale: 'Matale, Sri Lanka',
  colombo: 'Colombo, Sri Lanka',
  kandy: 'Kandy, Sri Lanka',
  galle: 'Galle, Sri Lanka',
  negombo: 'Negombo, Sri Lanka',
  trincomalee: 'Trincomalee, Sri Lanka',
  ella: 'Ella, Sri Lanka',
  sigiriya: 'Sigiriya, Sri Lanka',
}

function cleanUrl(u) {
  const s = String(u || '')
  const v = s.replace(/\s+/g, '')
  return v || null
}

function fmtExposure(t) {
  const n = Number(t)
  if (!n || n <= 0) return null
  if (n >= 1) return `${n}s`
  const inv = Math.round(1 / n)
  return `1/${inv}s`
}

function fmtIso(iso) {
  const n = Number(iso)
  if (!n || n <= 0) return null
  return `ISO ${n}`
}

function fmtFNumber(f) {
  const n = Number(f)
  if (!n || n <= 0) return null
  return `f/${n}`
}

function fmtFocal(mm) {
  const n = Number(mm)
  if (!n || n <= 0) return null
  return `${n}mm`
}

function deriveLocation(tags = []) {
  if (!Array.isArray(tags)) return 'Sri Lanka'
  for (const t of tags) {
    const key = String(t || '').toLowerCase()
    if (LOCATION_MAP[key]) return LOCATION_MAP[key]
  }
  return 'Sri Lanka'
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const id = String(req.query.id || '').trim()
  if (!id) {
    return res.status(400).json({ ok: false, error: 'Missing id' })
  }

  try {
    const { data: row, error } = await supabaseAdmin
      .from('photos')
      .select(
        'id, title, description, tags, preview_url, thumb_url, created_at, original_key, original_filename, exif_json, exif_make, exif_model, exif_taken_at'
      )
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (error || !row) {
      return res.status(404).json({ ok: false, error: 'Photo not found' })
    }

    const exif = row.exif_json || null

    const settingsLine = exif
      ? [
          fmtIso(exif.iso),
          fmtExposure(exif.exposureTime),
          fmtFNumber(exif.fNumber),
          fmtFocal(exif.focalLength),
        ]
          .filter(Boolean)
          .join(' • ')
      : null

    const location = deriveLocation(row.tags)

    const out = {
      id: row.id,
      title: row.title,
      description: row.description,
      tags: row.tags || [],
      thumb_url: cleanUrl(row.thumb_url),
      preview_url: cleanUrl(row.preview_url),
      created_at: row.created_at,
      original_key: row.original_key,
      original_filename: row.original_filename,
      location,
      exif: exif
        ? {
            ...exif,
            settingsLine,
            make: row.exif_make || exif.make || null,
            model: row.exif_model || exif.model || null,
            takenAt: row.exif_taken_at || exif.dateTimeOriginal || null,
          }
        : null,
    }

    return res.status(200).json({ ok: true, photo: out })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
