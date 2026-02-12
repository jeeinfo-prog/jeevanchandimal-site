import { createClient } from '@supabase/supabase-js'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

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

export default async function handler(req, res) {
  // allow GET + HEAD (so curl -I works)
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    if (!id) return res.status(400).json({ error: 'Missing id' })

    const variant = typeof req.query.variant === 'string' ? req.query.variant : 'standard'
    const key =
      variant === 'strong'
        ? `photos/preview_wm-strong/${id}.jpg`
        : variant === 'corner'
          ? `photos/preview_wm-corner/${id}.jpg`
          : `photos/preview/${id}.jpg`

    // optional: confirm exists in DB
    const { data: photo, error } = await supabase
      .from('photos')
      .select('id')
      .eq('id', id)
      .single()

    if (error || !photo) return res.status(404).json({ error: 'Not found' })

    const obj = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
      })
    )

    res.setHeader('Content-Type', obj.ContentType || 'image/jpeg')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    if (obj.ETag) res.setHeader('ETag', obj.ETag)
    if (obj.ContentLength) res.setHeader('Content-Length', String(obj.ContentLength))

    if (req.method === 'HEAD') return res.status(200).end()
    return sendStream(res, obj.Body)
  } catch (err) {
    console.error('preview error:', err)
    return res.status(500).json({ error: 'Preview failed', detail: err?.message || String(err) })
  }
}
