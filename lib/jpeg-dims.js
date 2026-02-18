export function getJpegDimensions(buf) {
  if (!buf || buf.length < 4) return { width: null, height: null }

  let i = 2 // skip FF D8
  while (i < buf.length) {
    if (buf[i] !== 0xff) {
      i++
      continue
    }

    const marker = buf[i + 1]
    const length = buf.readUInt16BE(i + 2)

    // SOF0, SOF2 etc. contain dimensions
    if (
      marker === 0xc0 ||
      marker === 0xc2 ||
      marker === 0xc1 ||
      marker === 0xc3
    ) {
      const height = buf.readUInt16BE(i + 5)
      const width = buf.readUInt16BE(i + 7)
      return { width, height }
    }

    i += 2 + length
  }

  return { width: null, height: null }
}
