// pages/api/photo/[id]/preview.js
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

export const config = {
  api: { responseLimit: false },
}

const R2_BUCKET = process.env.R2_BUCKET
if (!R2_BUCKET) throw new Error('Missing R2_BUCKET')

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

function sendStream(res, body) {
  if (!body) return res.end()
  if (typeof body.pipe === 'function') body.pipe(res)
  else res.end(Buffer.from(body))
}

async function streamToBuffer(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (c) => chunks.push(c))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

function getVariant(q) {
  const v = Array.isArray(q) ? q[0] : q
  if (v === 'strong' || v === 'corner' || v === 'standard') return v
  return 'standard'
}

function keyFor(id, variant) {
  if (variant === 'strong') return `photos/preview_wm-strong/${id}.jpg`
  if (variant === 'corner') return `photos/preview_wm-corner/${id}.jpg`
  return `photos/preview/${id}.jpg`
}

async function getObjectOrNull(key) {
  try {
    return await s3.send(new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }))
  } catch (err) {
    const code = err?.Code || err?.name || ''
    if (code === 'NoSuchKey' || code === 'NotFound') return null
    return null
  }
}

async function ensureStandardPreviewExists(photoId) {
  const previewKey = `photos/preview/${photoId}.jpg`

  // 1) Already exists?
  const existing = await getObjectOrNull(previewKey)
  if (existing?.Body) return { key: previewKey, obj: existing }

  // 2) Read DB row + published check
  const { data: photo, error } = await supabaseAdmin
    .from('photos')
    .select('id, status, original_jpg_key')
    .eq('id', photoId)
    .single()

  if (error || !photo || photo.status !== 'published') return null
  if (!photo.original_jpg_key) return null

  // 3) Download original
  const originalObj = await s3.send(
    new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: photo.original_jpg_key,
    })
  )
  if (!originalObj?.Body) return null
  const input = await streamToBuffer(originalObj.Body)

  // 4) Generate preview
  const sharp = (await import('sharp')).default
  const out = await sharp(input)
    .rotate()
    .resize({ width: 2000, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toBuffer()

  // 5) Save
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: previewKey,
      Body: out,
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800',
    })
  )

  return {
    key: previewKey,
    obj: { Body: out, ContentType: 'image/jpeg', ContentLength: out.length },
  }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    if (!id) return res.status(400).json({ error: 'Missing id' })

    const variant = getVariant(req.query.variant)

    // Fast check: do not serve non-published publicly
    const { data: photo } = await supabaseAdmin
      .from('photos')
      .select('id')
      .eq('id', id)
      .eq('status', 'published')
      .maybeSingle()

    if (!photo) return res.status(404).json({ error: 'Not found' })

    const wantedKey = keyFor(id, variant)

    // 1) Try requested key
    let obj = await getObjectOrNull(wantedKey)

    // 2) If watermark variant missing, fallback to standard (and generate if needed)
    if (!obj?.Body && (variant === 'strong' || variant === 'corner')) {
      const ensured = await ensureStandardPreviewExists(id)
      obj = ensured?.obj || null
    }

    // 3) Standard missing -> generate
    if (!obj?.Body && variant === 'standard') {
      const ensured = await ensureStandardPreviewExists(id)
      obj = ensured?.obj || null
    }

    if (!obj?.Body) return res.status(404).json({ error: 'Preview not found' })

    res.setHeader(
      'Cache-Control',
      'public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800'
    )
    res.setHeader('Content-Type', obj.ContentType || 'image/jpeg')
    if (obj.ETag) res.setHeader('ETag', obj.ETag)
    if (obj.ContentLength != null) res.setHeader('Content-Length', String(obj.ContentLength))

    if (req.method === 'HEAD') return res.status(200).end()

    if (Buffer.isBuffer(obj.Body)) return res.status(200).send(obj.Body)
    return sendStream(res, obj.Body)
  } catch (err) {
    console.error('preview error:', err)
    return res.status(500).json({ error: 'Preview failed', detail: err?.message || String(err) })
  }
}