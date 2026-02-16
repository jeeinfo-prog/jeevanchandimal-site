import { r2GetObjectBuffer } from '../../../../lib/r2'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { extractExifFromJpeg } from '../../../../lib/exif-lite'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const id = String(req.query.id || '').trim()
  if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

  const shouldSave = String(req.query.save || '') === '1'

  try {
    // 1) Get original_key from DB
    const { data: row, error } = await supabaseAdmin
      .from('photos')
      .select('id, original_key')
      .eq('id', id)
      .single()

    if (error || !row?.original_key) {
      return res.status(404).json({
        ok: false,
        error: 'original_key missing in DB',
        hint: 'Store original_key during upload commit',
      })
    }

    const key = row.original_key

    // 2) Fetch original file from R2
    const buf = await r2GetObjectBuffer(key)
    if (!buf) {
      return res.status(404).json({ ok: false, error: 'Original not found in R2', key })
    }

    // 3) Extract EXIF
    const exif = extractExifFromJpeg(buf) || null

    // 4) Optional save
    if (shouldSave) {
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
        .eq('id', id)
    }

    return res.status(200).json({
      ok: true,
      id,
      key,
      saved: shouldSave,
      exif,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'EXIF failed' })
  }
}
