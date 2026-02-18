// pages/api/photo/[id]/exif.js
import { r2GetObjectBuffer } from '../../../../lib/r2'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { extractExifFromJpeg } from '../../../../lib/exif-lite'

// ✅ Read width/height from JPEG header (SOF marker) when EXIF doesn't include dims
function getJpegDimensions(buf) {
  if (!buf || buf.length < 4) return { width: null, height: null }
  // JPEG starts with FF D8
  if (!(buf[0] === 0xff && buf[1] === 0xd8)) return { width: null, height: null }

  let i = 2
  while (i < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1
      continue
    }

    const marker = buf[i + 1]
    // Standalone markers
    if (marker === 0xd8 || marker === 0xd9) {
      i += 2
      continue
    }

    if (i + 3 >= buf.length) break
    const length = buf.readUInt16BE(i + 2)
    if (!length || i + 2 + length > buf.length) break

    // SOF markers that contain dimensions
    // SOF0 (C0), SOF1 (C1), SOF2 (C2), SOF3 (C3)
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2 || marker === 0xc3) {
      // Layout: FF Cx [len hi] [len lo] [precision] [H hi] [H lo] [W hi] [W lo] ...
      if (i + 7 < buf.length) {
        const height = buf.readUInt16BE(i + 5)
        const width = buf.readUInt16BE(i + 7)
        return { width: width || null, height: height || null }
      }
      break
    }

    i += 2 + length
  }

  return { width: null, height: null }
}

function normalizeDims(exif) {
  if (!exif || typeof exif !== 'object') return exif

  const width =
    Number(
      exif.width ||
        exif.ImageWidth ||
        exif.imageWidth ||
        exif.PixelXDimension ||
        exif.ExifImageWidth
    ) || null

  const height =
    Number(
      exif.height ||
        exif.ImageHeight ||
        exif.imageHeight ||
        exif.PixelYDimension ||
        exif.ExifImageHeight
    ) || null

  return {
    ...exif,
    width: exif.width ?? width,
    height: exif.height ?? height,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const id = String(req.query.id || '').trim()
  if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

  const forcedKey = req.query.key ? String(req.query.key).trim() : ''
  const shouldSave = String(req.query.save || '') === '1'

  try {
    // ✅ Priority 1: use ?key=... if provided
    let key = forcedKey

    // ✅ Priority 2: fallback to DB (supports original_jpg_key + exif_json)
    if (!key) {
      const { data: row, error } = await supabaseAdmin
        .from('photos')
        .select('id, original_key, original_jpg_key, exif_json')
        .eq('id', id)
        .single()

      if (error) {
        return res.status(500).json({ ok: false, error: error.message })
      }

      // ✅ If original_key missing, use original_jpg_key
      key = row?.original_key || row?.original_jpg_key || ''

      // ✅ If still no key, but exif_json exists, return cached exif_json
      if (!key) {
        const cachedExif =
          row?.exif_json && typeof row.exif_json === 'object' ? row.exif_json : null

        if (cachedExif) {
          return res.status(200).json({
            ok: true,
            id,
            key: null,
            source: 'db_exif_json',
            size: null,
            isJpeg: null,
            exif: normalizeDims(cachedExif),
            exifError: null,
            saved: false,
          })
        }

        return res.status(404).json({
          ok: false,
          error: 'No original key found',
          hint: 'Need original_key or original_jpg_key in DB (or exif_json saved)',
        })
      }
    }

    // 2) Fetch from R2
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
      return res.status(500).json({ ok: false, error: 'Empty file buffer', key })
    }

    // 3) Signature check (JPEG = FF D8)
    const isJpeg = buf[0] === 0xff && buf[1] === 0xd8

    // 4) Extract EXIF
    let exif = null
    let exifError = null

    if (isJpeg) {
      try {
        exif = extractExifFromJpeg(buf) || null
      } catch (e) {
        exifError = String(e?.message || e)
      }
    }

    // Normalize width/height from EXIF keys
    exif = normalizeDims(exif)

    // ✅ Fallback: read dims from JPEG header if EXIF doesn't provide them
    if (isJpeg && (!exif?.width || !exif?.height)) {
      const dims = getJpegDimensions(buf)
      if (dims.width && dims.height) {
        exif = {
          ...(exif || {}),
          width: exif?.width || dims.width,
          height: exif?.height || dims.height,
        }
      }
    }

    // 5) Optional save (stores correct EXIF back to DB)
    if (shouldSave) {
      await supabaseAdmin
        .from('photos')
        .update({
          // ✅ store usable key if original_key was missing before
          original_key: forcedKey ? key : undefined,
          exif_json: exif,
          exif_make: exif?.make || exif?.Make || null,
          exif_model: exif?.model || exif?.Model || null,
          exif_taken_at: exif?.dateTimeOriginal || exif?.DateTimeOriginal || null,
          exif_lat: typeof exif?.lat === 'number' ? exif.lat : null,
          exif_lng: typeof exif?.lng === 'number' ? exif.lng : null,
        })
        .eq('id', id)
    }

    return res.status(200).json({
      ok: true,
      id,
      key,
      source: 'r2_original',
      size: buf.length,
      isJpeg,
      exif,
      exifError,
      saved: shouldSave,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'EXIF failed' })
  }
}
