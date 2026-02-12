import { S3Client, GetObjectCommand, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

async function streamToBuffer(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (c) => chunks.push(c))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

function clampInt(v, min, max, fallback) {
  const n = parseInt(v, 10)
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, n))
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    if (!id) return res.status(400).json({ error: 'Missing id' })

    const src = typeof req.query.src === 'string' ? req.query.src : 'preview' // preview|thumb
    const variant = typeof req.query.variant === 'string' ? req.query.variant : 'standard' // standard|strong|corner

    const w = clampInt(req.query.w, 50, 2400, 1200)
    const h = req.query.h ? clampInt(req.query.h, 50, 2400, undefined) : undefined

    const format = (typeof req.query.format === 'string' ? req.query.format : 'jpg').toLowerCase()
    const q = clampInt(req.query.q, 50, 90, 82)

    const isWebp = format === 'webp'
    const outExt = isWebp ? 'webp' : 'jpg'
    const outType = isWebp ? 'image/webp' : 'image/jpeg'

    // Source key
    let sourceKey
    if (src === 'thumb') {
      sourceKey = `photos/thumb/${id}.jpg`
    } else {
      sourceKey =
        variant === 'strong'
          ? `photos/preview_wm-strong/${id}.jpg`
          : variant === 'corner'
            ? `photos/preview_wm-corner/${id}.jpg`
            : `photos/preview/${id}.jpg`
    }

    // Derived cache key (stored in R2 once generated)
    const derivedKey = `photos/derived/${id}/${src}-${variant}/w${w}${h ? `_h${h}` : ''}_q${q}.${outExt}`

    // Fast path: already generated
    try {
      const head = await s3.send(new HeadObjectCommand({ Bucket: process.env.R2_BUCKET, Key: derivedKey }))
      res.setHeader('Content-Type', outType)
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      if (head.ETag) res.setHeader('ETag', head.ETag)

      if (req.method === 'HEAD') return res.status(200).end()

      const obj = await s3.send(new GetObjectCommand({ Bucket: process.env.R2_BUCKET, Key: derivedKey }))
      obj.Body.pipe(res)
      return
    } catch {
      // not found -> generate
    }

    // Fetch source
    const srcObj = await s3.send(new GetObjectCommand({ Bucket: process.env.R2_BUCKET, Key: sourceKey }))
    const srcBuf = await streamToBuffer(srcObj.Body)

    // Resize
    let pipeline = sharp(srcBuf)
      .rotate()
      .resize({
        width: w,
        height: h,
        fit: 'inside',
        withoutEnlargement: true,
      })

    const outBuf = isWebp
      ? await pipeline.webp({ quality: q }).toBuffer()
      : await pipeline.jpeg({ quality: q }).toBuffer()

    // Store derived in R2
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: derivedKey,
        Body: outBuf,
        ContentType: outType,
        CacheControl: 'public, max-age=31536000, immutable',
      })
    )

    // Respond
    res.setHeader('Content-Type', outType)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    if (req.method === 'HEAD') return res.status(200).end()
    return res.status(200).send(outBuf)
  } catch (err) {
    console.error('resize error:', err)
    return res.status(500).json({ error: 'Resize failed', detail: err?.message || String(err) })
  }
}
