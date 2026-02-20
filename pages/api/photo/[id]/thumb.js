// pages/api/photo/[id]/thumb.js
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
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
  if (typeof body.pipe === 'function') return body.pipe(res)
  return res.end(Buffer.from(body))
}

async function streamToBuffer(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (c) => chunks.push(c))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
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

async function ensureThumbExists(photoId) {
  const thumbKey = `photos/thumb/${photoId}.jpg`

  // 1) Already exists?
  const existing = await getObjectOrNull(thumbKey)
  if (existing?.Body) return { key: thumbKey, obj: existing }

  // 2) Read DB row + published check
  const { data: photo, error } = await supabaseAdmin
    .from('photos')
    .select('id, status, original_jpg_key')
    .eq('id', photoId)
    .single()

  if (error || !photo || photo.status !== 'published') return null
  if (!photo.original_jpg_key) return null

  // 3) Download original JPG from R2
  const originalObj = await s3.send(
    new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: photo.original_jpg_key,
    })
  )
  if (!originalObj?.Body) return null
  const input = await streamToBuffer(originalObj.Body)

  // 4) Generate thumb
  const sharp = (await import('sharp')).default
  const out = await sharp(input)
    .rotate()
    .resize({ width: 600, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toBuffer()

  // 5) Save to canonical thumb key
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: thumbKey,
      Body: out,
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000, immutable',
    })
  )

  // Return as buffer response object (no stream)
  return {
    key: thumbKey,
    obj: { Body: out, ContentType: 'image/jpeg', ContentLength: out.length },
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

    const ensured = await ensureThumbExists(id)
    if (!ensured?.obj) return res.status(404).json({ ok: false, error: 'Thumb not found' })

    const obj = ensured.obj
    res.setHeader('Content-Type', obj.ContentType || 'image/jpeg')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    if (obj.ETag) res.setHeader('ETag', obj.ETag)
    if (obj.ContentLength != null) res.setHeader('Content-Length', String(obj.ContentLength))

    if (req.method === 'HEAD') return res.status(200).end()

    if (Buffer.isBuffer(obj.Body)) return res.status(200).send(obj.Body)
    return sendStream(res, obj.Body)
  } catch (err) {
    console.error('thumb error:', err)
    return res.status(500).json({
      ok: false,
      error: 'Thumb failed',
      detail: err?.message || String(err),
    })
  }
}