// lib/exif-lite.js
// Minimal EXIF parser (JPEG APP1 Exif). No external modules.
// Supports common tags + GPS. Returns null if no EXIF.

function readAscii(buf, start, len) {
  const s = buf.slice(start, start + len).toString('ascii')
  return s.replace(/\0+$/, '').trim()
}

function readUInt16(buf, off, le) {
  return le ? buf.readUInt16LE(off) : buf.readUInt16BE(off)
}
function readUInt32(buf, off, le) {
  return le ? buf.readUInt32LE(off) : buf.readUInt32BE(off)
}

function readRational(buf, off, le, signed = false) {
  const num = signed
    ? (le ? buf.readInt32LE(off) : buf.readInt32BE(off))
    : (le ? buf.readUInt32LE(off) : buf.readUInt32BE(off))
  const den = le ? buf.readUInt32LE(off + 4) : buf.readUInt32BE(off + 4)
  if (!den) return null
  return num / den
}

function getTypeSize(type) {
  // TIFF types
  switch (type) {
    case 1: return 1 // BYTE
    case 2: return 1 // ASCII
    case 3: return 2 // SHORT
    case 4: return 4 // LONG
    case 5: return 8 // RATIONAL
    case 7: return 1 // UNDEFINED
    case 9: return 4 // SLONG
    case 10: return 8 // SRATIONAL
    default: return 0
  }
}

function readValue(buf, tiffStart, le, type, count, valueOffset) {
  const size = getTypeSize(type) * count
  const valuePos = size <= 4 ? valueOffset : (tiffStart + valueOffset)

  // ASCII
  if (type === 2) {
    return readAscii(buf, valuePos, count)
  }

  // SHORT
  if (type === 3) {
    if (count === 1) return readUInt16(buf, valuePos, le)
    const arr = []
    for (let i = 0; i < count; i++) arr.push(readUInt16(buf, valuePos + i * 2, le))
    return arr
  }

  // LONG
  if (type === 4) {
    if (count === 1) return readUInt32(buf, valuePos, le)
    const arr = []
    for (let i = 0; i < count; i++) arr.push(readUInt32(buf, valuePos + i * 4, le))
    return arr
  }

  // RATIONAL / SRATIONAL
  if (type === 5 || type === 10) {
    const signed = type === 10
    if (count === 1) return readRational(buf, valuePos, le, signed)
    const arr = []
    for (let i = 0; i < count; i++) arr.push(readRational(buf, valuePos + i * 8, le, signed))
    return arr
  }

  // BYTE / UNDEFINED
  if (type === 1 || type === 7) {
    const out = buf.slice(valuePos, valuePos + count)
    return out
  }

  // SLONG
  if (type === 9) {
    if (count === 1) return le ? buf.readInt32LE(valuePos) : buf.readInt32BE(valuePos)
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push(le ? buf.readInt32LE(valuePos + i * 4) : buf.readInt32BE(valuePos + i * 4))
    }
    return arr
  }

  return null
}

function parseIFD(buf, tiffStart, ifdOffset, le) {
  const dirStart = tiffStart + ifdOffset
  if (dirStart + 2 > buf.length) return { tags: {}, nextIfd: 0 }

  const numEntries = readUInt16(buf, dirStart, le)
  const tags = {}

  for (let i = 0; i < numEntries; i++) {
    const entry = dirStart + 2 + i * 12
    if (entry + 12 > buf.length) break

    const tag = readUInt16(buf, entry, le)
    const type = readUInt16(buf, entry + 2, le)
    const count = readUInt32(buf, entry + 4, le)
    const valueOffset = readUInt32(buf, entry + 8, le)

    tags[tag] = { type, count, valueOffset }
  }

  const nextIfd = readUInt32(buf, dirStart + 2 + numEntries * 12, le)
  return { tags, nextIfd }
}

function dmsToDecimal(dms, ref) {
  if (!Array.isArray(dms) || dms.length < 3) return null
  const deg = Number(dms[0] || 0)
  const min = Number(dms[1] || 0)
  const sec = Number(dms[2] || 0)
  let val = deg + min / 60 + sec / 3600
  if (ref === 'S' || ref === 'W') val = -val
  return val
}

export function extractExifFromJpeg(buffer) {
  try {
    const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer)

    // JPEG SOI
    if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null

    let offset = 2
    while (offset + 4 < buf.length) {
      if (buf[offset] !== 0xff) break
      const marker = buf[offset + 1]
      offset += 2

      // EOI or SOS ends metadata scanning
      if (marker === 0xd9 || marker === 0xda) break

      const size = buf.readUInt16BE(offset)
      if (size < 2) break

      const segmentStart = offset + 2
      const segmentEnd = segmentStart + size - 2

      // APP1
      if (marker === 0xe1 && segmentEnd <= buf.length) {
        const header = buf.slice(segmentStart, segmentStart + 6).toString('ascii')
        if (header === 'Exif\0\0') {
          const tiffStart = segmentStart + 6

          const byteOrder = buf.slice(tiffStart, tiffStart + 2).toString('ascii')
          const le = byteOrder === 'II'
          if (!le && byteOrder !== 'MM') return null

          const magic = readUInt16(buf, tiffStart + 2, le)
          if (magic !== 0x002a) return null

          const ifd0Offset = readUInt32(buf, tiffStart + 4, le)
          const ifd0 = parseIFD(buf, tiffStart, ifd0Offset, le)

          // Tag IDs we care about
          const TAG_MAKE = 0x010f
          const TAG_MODEL = 0x0110
          const TAG_EXIF_IFD = 0x8769
          const TAG_GPS_IFD = 0x8825

          const result = {}

          // IFD0 values
          if (ifd0.tags[TAG_MAKE]) {
            const t = ifd0.tags[TAG_MAKE]
            result.make = readValue(buf, tiffStart, le, t.type, t.count, t.valueOffset)
          }
          if (ifd0.tags[TAG_MODEL]) {
            const t = ifd0.tags[TAG_MODEL]
            result.model = readValue(buf, tiffStart, le, t.type, t.count, t.valueOffset)
          }

          // EXIF SubIFD
          let exif = null
          if (ifd0.tags[TAG_EXIF_IFD]) {
            const t = ifd0.tags[TAG_EXIF_IFD]
            const subOffset = t.valueOffset
            exif = parseIFD(buf, tiffStart, subOffset, le)
          }

          // EXIF tags
          const TAG_DateTimeOriginal = 0x9003
          const TAG_ISO = 0x8827
          const TAG_FNumber = 0x829d
          const TAG_ExposureTime = 0x829a
          const TAG_FocalLength = 0x920a
          const TAG_LensModel = 0xa434

          if (exif?.tags?.[TAG_DateTimeOriginal]) {
            const t = exif.tags[TAG_DateTimeOriginal]
            result.dateTimeOriginal = readValue(buf, tiffStart, le, t.type, t.count, t.valueOffset)
          }
          if (exif?.tags?.[TAG_ISO]) {
            const t = exif.tags[TAG_ISO]
            result.iso = readValue(buf, tiffStart, le, t.type, t.count, t.valueOffset)
          }
          if (exif?.tags?.[TAG_FNumber]) {
            const t = exif.tags[TAG_FNumber]
            result.fNumber = readValue(buf, tiffStart, le, t.type, t.count, t.valueOffset)
          }
          if (exif?.tags?.[TAG_ExposureTime]) {
            const t = exif.tags[TAG_ExposureTime]
            result.exposureTime = readValue(buf, tiffStart, le, t.type, t.count, t.valueOffset)
          }
          if (exif?.tags?.[TAG_FocalLength]) {
            const t = exif.tags[TAG_FocalLength]
            result.focalLength = readValue(buf, tiffStart, le, t.type, t.count, t.valueOffset)
          }
          if (exif?.tags?.[TAG_LensModel]) {
            const t = exif.tags[TAG_LensModel]
            result.lensModel = readValue(buf, tiffStart, le, t.type, t.count, t.valueOffset)
          }

          // GPS IFD
          let gps = null
          if (ifd0.tags[TAG_GPS_IFD]) {
            const t = ifd0.tags[TAG_GPS_IFD]
            gps = parseIFD(buf, tiffStart, t.valueOffset, le)
          }

          const TAG_GPSLatRef = 0x0001
          const TAG_GPSLat = 0x0002
          const TAG_GPSLngRef = 0x0003
          const TAG_GPSLng = 0x0004

          if (gps?.tags?.[TAG_GPSLat] && gps?.tags?.[TAG_GPSLatRef]) {
            const latRef = readValue(
              buf,
              tiffStart,
              le,
              gps.tags[TAG_GPSLatRef].type,
              gps.tags[TAG_GPSLatRef].count,
              gps.tags[TAG_GPSLatRef].valueOffset
            )
            const latDms = readValue(
              buf,
              tiffStart,
              le,
              gps.tags[TAG_GPSLat].type,
              gps.tags[TAG_GPSLat].count,
              gps.tags[TAG_GPSLat].valueOffset
            )
            result.lat = dmsToDecimal(latDms, String(latRef || '').trim())
          }

          if (gps?.tags?.[TAG_GPSLng] && gps?.tags?.[TAG_GPSLngRef]) {
            const lngRef = readValue(
              buf,
              tiffStart,
              le,
              gps.tags[TAG_GPSLngRef].type,
              gps.tags[TAG_GPSLngRef].count,
              gps.tags[TAG_GPSLngRef].valueOffset
            )
            const lngDms = readValue(
              buf,
              tiffStart,
              le,
              gps.tags[TAG_GPSLng].type,
              gps.tags[TAG_GPSLng].count,
              gps.tags[TAG_GPSLng].valueOffset
            )
            result.lng = dmsToDecimal(latDms ? lngDms : lngDms, String(lngRef || '').trim())
          }

          // If we found nothing meaningful, return null
          const hasAny =
            result.make ||
            result.model ||
            result.dateTimeOriginal ||
            result.iso ||
            result.fNumber ||
            result.exposureTime ||
            result.focalLength ||
            result.lensModel ||
            typeof result.lat === 'number' ||
            typeof result.lng === 'number'

          return hasAny ? result : null
        }
      }

      offset = segmentEnd
    }

    return null
  } catch {
    return null
  }
}
