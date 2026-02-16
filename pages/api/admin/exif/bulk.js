// pages/api/admin/exif/bulk.js
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { r2GetObjectBuffer } from '../../../../lib/r2'
import { extractExifFromJpeg } from '../../../../lib/exif-lite'

const BATCH_SIZE = 10

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { data: rows, error } = await supabaseAdmin
      .from('photos')
      .select('id, original_key')
      .not('original_key', 'is', null)
      .is('exif_json', null)
      .limit(BATCH_SIZE)

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    let processed = 0
    let updated = 0

    for (const row of rows || []) {
      processed++

      try {
        const buf = await r2GetObjectBuffer(row.original_key)

        if (!buf || buf.length < 4) continue

        const isJpeg = buf[0] === 0xff && buf[1] === 0xd8
        if (!isJpeg) continue

        const exif = extractExifFromJpeg(buf)
        if (!exif) continue

        await supabaseAdmin
          .from('photos')
          .update({
            exif_json: exif,
            exif_make: exif?.make || null,
            exif_model: exif?.model || null,
            exif_taken_at: exif?.dateTimeOriginal || null,
            exif_lat: typeof exif?.lat === 'number' ? exif.lat : null,
            exif_lng: typeof exif?.lng === 'number' ? exif.lng : null,
          })
          .eq('id', row.id)

        updated++
      } catch (e) {
        console.warn('EXIF failed for', row.id)
      }
    }

    return res.status(200).json({
      ok: true,
      processed,
      updated,
      remaining: rows.length === BATCH_SIZE,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Bulk EXIF failed' })
  }
}
