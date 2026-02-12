import { createClient } from '@supabase/supabase-js'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import jwt from 'jsonwebtoken'

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
  if (typeof body.pipe === 'function') {
    body.pipe(res)
  } else {
    res.end(Buffer.from(body))
  }
}

function getToken(req) {
  const q = req.query?.token
  if (q && typeof q === 'string') return q
  const auth = req.headers.authorization || ''
  if (auth.startsWith('Bearer ')) return auth.slice(7)
  return null
}

function verifyDownloadToken(token) {
  // Expected payload example:
  // { photoId: "...", scope: "original", exp: ... }
  return jwt.verify(token, process.env.DOWNLOAD_TOKEN_SECRET)
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    if (!id) return res.status(400).json({ error: 'Missing id' })

    const token = getToken(req)
    if (!token) return res.status(401).json({ error: 'Missing token' })

    let payload
    try {
      payload = verifyDownloadToken(token)
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    // Require token to match this photo
    if (!payload?.photoId || payload.photoId !== id) {
      return res.status(403).json({ error: 'Token does not match photo' })
    }

    // Optional scope check (if you include it in your token)
    if (payload?.scope && payload.scope !== 'original') {
      return res.status(403).json({ error: 'Token scope not allowed' })
    }

    // Load original key from DB
    const { data: photo, error } = await supabase
      .from('photos')
      .select('id, original_jpg_key, original_raw_key')
      .eq('id', id)
      .single()

    if (error || !photo) return res.status(404).json({ error: 'Not found' })

    const key = photo.original_jpg_key || photo.original_raw_key
    if (!key) return res.status(404).json({ error: 'No original found' })

    const obj = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
      })
    )

    // Protected: don’t cache
    res.setHeader('Cache-Control', 'private, no-store')
    res.setHeader('Content-Type', obj.ContentType || 'image/jpeg')
    if (obj.ContentLength) res.setHeader('Content-Length', String(obj.ContentLength))

    return sendStream(res, obj.Body)
  } catch (err) {
    console.error('original error:', err)
    return res.status(500).json({ error: 'Original download failed', detail: err?.message || String(err) })
  }
}
