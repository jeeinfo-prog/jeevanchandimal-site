// pages/api/photo/[id]/thumb.js

import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

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

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    if (!id) return res.status(400).json({ ok: false, error: 'Missing id' })

    // ✅ Only allow published photos publicly
    const { data: photo, error: dbErr } = await supabaseAdmin
      .from('photos')
      .select('id, status')
      .eq('id', id)
      .single()

    if (dbErr || !photo || photo.status !== 'published') {
      return res.status(404).json({ ok: false, error: 'Not found' })
    }

    const key = `photos/thumb/${id}.jpg`

    let obj
    try {
      obj = await s3.send(
        new GetObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: key,
        })
      )
    } catch (err) {
      const code = err?.Code || err?.name || ''
      if (code === 'NoSuchKey' || code === 'NotFound') {
        // ✅ Missing derivative should be a 404, not a 500
        return res.status(404).json({ ok: false, error: 'Thumb not found' })
      }
      throw err
    }

    res.setHeader('Content-Type', obj.ContentType || 'image/jpeg')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    if (obj.ETag) res.setHeader('ETag', obj.ETag)
    if (obj.ContentLength) res.setHeader('Content-Length', String(obj.ContentLength))

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
