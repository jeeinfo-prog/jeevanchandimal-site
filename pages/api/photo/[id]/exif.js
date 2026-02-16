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
    // 1️⃣ Get original_key from DB
    const { data: row, error } = await supabaseAdmin
      .from('photos')
      .select('id, original_key')
      .eq('id', id)
      .single()

    if (error || !row?.original_key) {
      return res.status(404).json({
        ok: false,
        error: 'original_key missing in DB',
      })
    }

    const key = row.original_key

    // 2️⃣ Fetch from R2
    let buf
    try {
      buf = await r2GetObjectBuffer(key)
    } catch (e) {
      return res.status(500).json({
        ok: false,
        error: 'R2 fetch failed',
        key,
        message: String(e?.message || e),
      })
    }

    if (!buf || !buf.length) {
      return res.status(500).json({
        ok: false,
        error: 'Empty file buffer',
        key,
      })
    }

    // 3️⃣ Check file signature (JPEG should start with FF D8)
    const isJpeg = buf[0] === 0xff && buf[1] === 0xd8

    // 4️⃣ Extract EXIF safely
    let exif = null
    let exifError = null

    if (isJpeg) {
      try {
        exif = extractExifFromJpeg(buf) || null
      } catch (e) {
        exifError = String(e?.message || e)
      }
    }

    // 5️⃣ Optional save
    if (shouldSave && exif) {
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
      key,
      size: buf.length,
      isJpeg,
      exif,
      exifError,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'EXIF failed hard' })
  }
}
