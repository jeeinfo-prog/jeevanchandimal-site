// pages/api/photo/[id]/preview.js
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'

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

/* ---------------- watermark helpers ---------------- */

const WM_PATH = path.join(process.cwd(), 'public', 'JC', 'jclogo05.png')
let WM_BUF = null

function getWatermarkBuffer() {
  if (WM_BUF) return WM_BUF
  WM_BUF = fs.readFileSync(WM_PATH)
  return WM_BUF
}

function pickDimsFromSharpMeta(meta) {
  const w = Number(meta?.width) || null
  const h = Number(meta?.height) || null
  return { w, h }
}

async function generateWatermarkedJpg(inputJpg, variant) {
  const sharp = (await import('sharp')).default

  // decode once to get dimensions
  const base = sharp(inputJpg, { failOn: 'none' }).rotate()
  const meta = await base.metadata()
  const { w, h } = pickDimsFromSharpMeta(meta)

  // fallback if missing meta
  const outW = w || 2000
  const outH = h || 1400

  const wmBuf = getWatermarkBuffer()

  // watermark sizing
  const baseSize = Math.round(Math.min(outW, outH) * (variant === 'corner' ? 0.22 : 0.26))
  const strongSize = Math.round(Math.min(outW, outH) * 0.28)

  const cornerMark = await sharp(wmBuf).resize(baseSize, baseSize, { fit: 'inside' }).png().toBuffer()
  const strongMark = await sharp(wmBuf)
    .resize(strongSize, strongSize, { fit: 'inside' })
    .png()
    .toBuffer()

  // Compose strategy:
  // - corner: one mark bottom-right (and tiny top-left)
  // - strong: center + 4 corners + mid edges (harder to crop)
  let composites = []

  if (variant === 'corner') {
    composites = [
      { input: cornerMark, gravity: 'southeast', blend: 'over', opacity: 0.22 },
      { input: cornerMark, gravity: 'northwest', blend: 'over', opacity: 0.08 },
    ]
  } else if (variant === 'strong') {
    composites = [
      { input: strongMark, gravity: 'center', blend: 'over', opacity: 0.22 },

      { input: cornerMark, gravity: 'northwest', blend: 'over', opacity: 0.12 },
      { input: cornerMark, gravity: 'northeast', blend: 'over', opacity: 0.12 },
      { input: cornerMark, gravity: 'southwest', blend: 'over', opacity: 0.12 },
      { input: cornerMark, gravity: 'southeast', blend: 'over', opacity: 0.12 },

      { input: cornerMark, gravity: 'north', blend: 'over', opacity: 0.09 },
      { input: cornerMark, gravity: 'south', blend: 'over', opacity: 0.09 },
      { input: cornerMark, gravity: 'east', blend: 'over', opacity: 0.09 },
      { input: cornerMark, gravity: 'west', blend: 'over', opacity: 0.09 },
    ]
  } else {
    // standard preview has no baked watermark (kept as-is)
    return inputJpg
  }

  const out = await sharp(inputJpg, { failOn: 'none' })
    .rotate()
    .composite(composites)
    .jpeg({ quality: 82 })
    .toBuffer()

  return out
}

/* ---------------- preview generation ---------------- */

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

async function ensureWatermarkedPreviewExists(photoId, variant) {
  if (variant !== 'strong' && variant !== 'corner') return null

  const wmKey = keyFor(photoId, variant)

  // 1) Already exists?
  const existing = await getObjectOrNull(wmKey)
  if (existing?.Body) return { key: wmKey, obj: existing }

  // 2) Ensure standard exists (source)
  const ensuredStd = await ensureStandardPreviewExists(photoId)
  const stdObj = ensuredStd?.obj
  if (!stdObj?.Body) return null

  const stdBuf = Buffer.isBuffer(stdObj.Body) ? stdObj.Body : await streamToBuffer(stdObj.Body)

  // 3) Create watermarked preview
  const out = await generateWatermarkedJpg(stdBuf, variant)
  if (!out || !Buffer.isBuffer(out) || out.length === 0) return null

  // 4) Save to R2
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: wmKey,
      Body: out,
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800',
    })
  )

  return {
    key: wmKey,
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

    // 2) If watermark variant missing, generate + save, fallback to standard if generation fails
    if (!obj?.Body && (variant === 'strong' || variant === 'corner')) {
      const ensuredWm = await ensureWatermarkedPreviewExists(id, variant)
      obj = ensuredWm?.obj || null

      if (!obj?.Body) {
        const ensuredStd = await ensureStandardPreviewExists(id)
        obj = ensuredStd?.obj || null
      }
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