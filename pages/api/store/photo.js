// pages/api/store/photo.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function fmtExposure(t) {
  const n = Number(t)
  if (!n || n <= 0) return null
  if (n >= 1) return `${n}s`
  const inv = Math.round(1 / n)
  return inv > 0 ? `1/${inv}s` : null
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

function pickLocationFromTags(tags) {
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
    lagoon: 'Sri Lanka',
    sri: 'Sri Lanka',
    lanka: 'Sri Lanka',
  }

  const list = Array.isArray(tags) ? tags : []
  for (const t of list) {
    const key = String(t || '').toLowerCase().trim()
    if (LOCATION_MAP[key]) return LOCATION_MAP[key]
  }
  return 'Sri Lanka'
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const id = String(req.query.id || '').trim()
    if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

    const { data: row, error } = await supabaseAdmin
      .from('photos')
      .select(
        [
          'id',
          'title',
          'description',
          'tags',
          'preview_url',
          'thumb_url',
          'created_at',
          'original_key',
          'original_filename',
          'exif_json',
          'exif_make',
          'exif_model',
          'exif_taken_at',
          'exif_lat',
          'exif_lng',
        ].join(', ')
      )
      .eq('id', id)
      .single()

    if (error || !row) {
      return res.status(404).json({ ok: false, error: error?.message || 'Not found' })
    }

    const tags = Array.isArray(row.tags) ? row.tags : []
    const locationName = pickLocationFromTags(tags)

    const exifJson = row.exif_json && typeof row.exif_json === 'object' ? row.exif_json : null

    const exif = exifJson
      ? {
          ...exifJson,
          make: exifJson.make || row.exif_make || null,
          model: exifJson.model || row.exif_model || null,
          dateTimeOriginal: exifJson.dateTimeOriginal || row.exif_taken_at || null,
          lat: typeof row.exif_lat === 'number' ? row.exif_lat : exifJson.lat,
          lng: typeof row.exif_lng === 'number' ? row.exif_lng : exifJson.lng,
        }
      : row.exif_make || row.exif_model || row.exif_taken_at || typeof row.exif_lat === 'number' || typeof row.exif_lng === 'number'
      ? {
          make: row.exif_make || null,
          model: row.exif_model || null,
          dateTimeOriginal: row.exif_taken_at || null,
          lat: typeof row.exif_lat === 'number' ? row.exif_lat : null,
          lng: typeof row.exif_lng === 'number' ? row.exif_lng : null,
        }
      : null

    const settingsLine = exif
      ? [
          fmtIso(exif.iso),
          fmtExposure(exif.exposureTime),
          fmtFNumber(exif.fNumber),
          fmtFocal(exif.focalLength),
        ]
          .filter(Boolean)
          .join(' • ')
      : ''

    const out = {
      id: row.id,
      title: row.title || 'Untitled',
      description: row.description || '',
      tags,
      thumb_url: row.thumb_url,
      preview_url: row.preview_url,
      created_at: row.created_at,
      original_key: row.original_key || null,
      original_filename: row.original_filename || null,
      location: locationName,
      exif: exif ? { ...exif, settingsLine } : null,
    }

    return res.status(200).json({ ok: true, photo: out })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Failed to load photo' })
  }
}
