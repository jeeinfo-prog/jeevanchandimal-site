// pages/api/photo/[id]/preview.js

import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

export const config = {
  api: { responseLimit: false },
}

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

function getVariant(q) {
  const v = Array.isArray(q) ? q[0] : q
  if (v === 'strong' || v === 'corner' || v === 'standard') return v
  return 'standard'
}

function getKeyFor(id, variant) {
  if (variant === 'strong') return `photos/preview_wm-strong/${id}.jpg`
  if (variant === 'corner') return `photos/preview_wm-corner/${id}.jpg`
  return `photos/preview/${id}.jpg`
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

    // ✅ Ensure the photo exists + is published
    const { data: photo } = await supabaseAdmin
      .from('photos')
      .select('id')
      .eq('id', id)
      .eq('status', 'published')
      .maybeSingle()

    if (!photo) return res.status(404).json({ error: 'Not found' })

    const key = getKeyFor(id, variant)

    let obj
    try {
      obj = await s3.send(
        new GetObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: key,
        })
      )
    } catch {
      return res.status(404).json({ error: 'Preview not found' })
    }

    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800')
    res.setHeader('Content-Type', obj.ContentType || 'image/jpeg')
    if (obj.ETag) res.setHeader('ETag', obj.ETag)
    if (obj.ContentLength != null) res.setHeader('Content-Length', String(obj.ContentLength))

    if (req.method === 'HEAD') return res.status(200).end()
    return sendStream(res, obj.Body)
  } catch (err) {
    console.error('preview error:', err)
    return res.status(500).json({ error: 'Preview failed', detail: err?.message || String(err) })
  }
}
