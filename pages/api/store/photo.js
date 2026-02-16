// pages/api/store/photo.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function isUnknownColumn(err) {
  const msg = String(err?.message || '').toLowerCase()
  return err?.code === '42703' || msg.includes('does not exist') || msg.includes('schema cache')
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const id = typeof req.query.id === 'string' ? req.query.id : ''
    if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

    // Avoid caching stale details in browsers / bots
    res.setHeader('Cache-Control', 'no-store, max-age=0')

    // 1) Try to fetch enriched fields (exif/location) if they exist in schema
    // NOTE: If your table doesn't have these yet, we fall back gracefully.
    const selectEnriched =
      'id,title,description,tags,thumb_url,preview_url,created_at,status,exif,location_name,location_city,location_region,location_country,location_lat,location_lng'

    let row = null

    const enriched = await supabaseAdmin
      .from('photos')
      .select(selectEnriched)
      .eq('id', id)
      .single()

    if (enriched.error) {
      if (!isUnknownColumn(enriched.error)) {
        return res.status(404).json({ ok: false, error: enriched.error.message })
      }

      // 2) Fallback if columns aren't present yet
      const fallback = await supabaseAdmin
        .from('photos')
        .select('id,title,description,tags,thumb_url,preview_url,created_at,status')
        .eq('id', id)
        .single()

      if (fallback.error || !fallback.data) {
        return res.status(404).json({ ok: false, error: fallback.error?.message || 'Photo not found' })
      }
      row = fallback.data
    } else {
      row = enriched.data
    }

    // Optional: only show published photos publicly
    if (row?.status && row.status !== 'published') {
      return res.status(404).json({ ok: false, error: 'Photo not found' })
    }

    // Shape location into one object for your JSON-LD
    const location =
      row?.location_lat != null && row?.location_lng != null
        ? {
            name: row.location_name || undefined,
            city: row.location_city || undefined,
            region: row.location_region || undefined,
            country: row.location_country || 'Sri Lanka',
            lat: Number(row.location_lat),
            lng: Number(row.location_lng),
          }
        : row?.location_name || row?.location_city || row?.location_region || row?.location_country
          ? {
              name: row.location_name || undefined,
              city: row.location_city || undefined,
              region: row.location_region || undefined,
              country: row.location_country || 'Sri Lanka',
            }
          : null

    // Final safe response
    return res.status(200).json({
      ok: true,
      photo: {
        id: row.id,
        title: row.title || '',
        description: row.description || '',
        tags: Array.isArray(row.tags) ? row.tags : [],
        thumb_url: row.thumb_url || null,
        preview_url: row.preview_url || null,
        created_at: row.created_at || null,

        // ✅ Optional (only present if columns exist)
        exif: row.exif || null,
        location,
      },
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
