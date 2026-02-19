// pages/api/raw-download.js
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { createClient } from '@supabase/supabase-js'
import { verifyDownloadToken } from '../../lib/secureDownload'

export const config = {
  api: { bodyParser: false },
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

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

/**
 * Supports BOTH styles of secureDownload:
 * 1) verifyDownloadToken(token) -> payload OR throws
 * 2) verifyDownloadToken(token) -> { ok, payload, error }
 * 3) verifyDownloadToken(token, secret)
 */
function verifyTokenCompat(token) {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET

  try {
    if (secret) {
      const out = verifyDownloadToken(token, secret)
      if (out && typeof out === 'object' && 'ok' in out) {
        if (!out.ok) return { ok: false, error: out.error || 'Invalid token' }
        return { ok: true, payload: out.payload }
      }
      return { ok: true, payload: out }
    }
  } catch {}

  try {
    const out = verifyDownloadToken(token)
    if (out && typeof out === 'object' && 'ok' in out) {
      if (!out.ok) return { ok: false, error: out.error || 'Invalid token' }
      return { ok: true, payload: out.payload }
    }
    return { ok: true, payload: out }
  } catch (e) {
    return { ok: false, error: e?.message || 'Invalid token' }
  }
}

function safeFilename(name) {
  const s = String(name || '').trim()
  if (!s) return 'download.zip'
  // remove weird chars
  const cleaned = s.replace(/[^\w.\- ()]+/g, '_')
  return cleaned.toLowerCase().endsWith('.zip') ? cleaned : `${cleaned}.zip`
}

export default async function handler(req, res) {
  // Hard no-cache (protected download)
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const token = typeof req.query.token === 'string' ? req.query.token : null
    if (!token) return res.status(401).json({ error: 'Missing token' })

    if (!process.env.DOWNLOAD_TOKEN_SECRET) {
      return res.status(500).json({ error: 'DOWNLOAD_TOKEN_SECRET not configured' })
    }

    const v = verifyTokenCompat(token)
    if (!v.ok) return res.status(401).json({ error: v.error || 'Invalid token' })

    const p = v.payload || {}

    // ✅ Require RAW intent (recommended)
    // If you prefer, you can remove this check and rely only on objectKey lookup.
    if (p.format && String(p.format).toLowerCase() !== 'raw') {
      return res.status(403).json({ error: 'Token is not for RAW' })
    }

    // ✅ Require scope original (recommended)
    if (p.scope && p.scope !== 'original') {
      return res.status(403).json({ error: 'Invalid token scope' })
    }

    const photoId = String(p.photoId || '').trim()
    if (!photoId) return res.status(400).json({ error: 'Missing photoId in token' })

    // ✅ Decide the R2 key to stream
    // Prefer objectKey from token if you include it; otherwise fetch from DB.
    let objectKey = String(p.objectKey || '').trim()

    if (!objectKey) {
      const { data: photo, error: photoErr } = await supabase
        .from('photos')
        .select('id, original_raw_key')
        .eq('id', photoId)
        .single()

      if (photoErr || !photo) return res.status(404).json({ error: 'Photo not found' })

      objectKey = String(photo.original_raw_key || '').trim()
    }

    if (!objectKey) {
      return res.status(400).json({ error: 'Missing original_raw_key' })
    }

    // ✅ Stream from R2
    const obj = await s3.send(
      new GetObjectCommand({
        Bucket: R2_BUCKET,
        Key: objectKey,
      })
    )

    if (!obj?.Body) return res.status(404).json({ error: 'RAW file missing' })

    const filename = safeFilename(p.filename || `${photoId}.zip`)

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    if (obj.ContentLength) res.setHeader('Content-Length', String(obj.ContentLength))

    // Stream it out
    obj.Body.pipe(res)
  } catch (err) {
    console.error('raw-download error:', err)
    return res.status(500).json({ error: 'RAW download failed', detail: err?.message || String(err) })
  }
}
