// pages/api/raw-download.js
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { verifyDownloadToken } from '../../lib/secureDownload'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export const config = {
  api: { bodyParser: false },
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

function cleanLower(v) {
  return String(v || '').trim().toLowerCase()
}

function isExpired(iso) {
  if (!iso) return false
  const t = new Date(iso).getTime()
  if (!Number.isFinite(t)) return false
  return t < Date.now()
}

function safeFilename(name) {
  const s = String(name || '').trim()
  if (!s) return 'download.zip'
  const cleaned = s.replace(/[^\w.\- ()]+/g, '_')
  return cleaned.toLowerCase().endsWith('.zip') ? cleaned : `${cleaned}.zip`
}

/**
 * ✅ Consume token row one-time
 */
async function consumeTokenRow(jti) {
  const { data: tok, error: tokErr } = await supabaseAdmin
    .from('download_tokens')
    .select('jti, expires_at')
    .eq('jti', String(jti))
    .maybeSingle()

  if (tokErr) throw new Error(tokErr.message)
  if (!tok) return { ok: false, code: 'TOKEN_USED_OR_EXPIRED', message: 'Token used or expired' }

  if (tok.expires_at && isExpired(tok.expires_at)) {
    await supabaseAdmin.from('download_tokens').delete().eq('jti', String(jti))
    return { ok: false, code: 'TOKEN_USED_OR_EXPIRED', message: 'Token used or expired' }
  }

  const del = await supabaseAdmin.from('download_tokens').delete().eq('jti', String(jti))
  if (del.error) throw new Error(del.error.message)

  return { ok: true }
}

export default async function handler(req, res) {
  // Hard no-cache
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const token = typeof req.query.token === 'string' ? req.query.token : ''
    if (!token) return res.status(401).json({ error: 'Missing token' })

    // Your verifyDownloadToken already uses the configured secret internally
    const p = verifyDownloadToken(token)

    const jti = String(p?.jti || '').trim()
    if (!jti) return res.status(401).json({ error: 'Invalid token' })

    // ✅ Require RAW intent
    if (p?.format && cleanLower(p.format) !== 'raw') {
      return res.status(403).json({ error: 'Token is not for RAW' })
    }

    // ✅ Optional scope check (keep if you use it)
    if (p?.scope && p.scope !== 'original') {
      return res.status(403).json({ error: 'Invalid token scope' })
    }

    const photoId = String(p?.photoId || '').trim()
    if (!photoId) return res.status(400).json({ error: 'Missing photoId in token' })

    // ✅ Consume token one-time
    const consumed = await consumeTokenRow(jti)
    if (!consumed.ok) {
      return res.status(401).json({ error: consumed.message })
    }

    // ✅ Decide R2 key to stream
    let objectKey = String(p?.objectKey || '').trim()

    if (!objectKey) {
      const { data: photo, error: photoErr } = await supabaseAdmin
        .from('photos')
        .select('id, original_raw_key')
        .eq('id', photoId)
        .maybeSingle()

      if (photoErr) return res.status(500).json({ error: photoErr.message })
      if (!photo) return res.status(404).json({ error: 'Photo not found' })

      objectKey = String(photo.original_raw_key || '').trim()
    }

    if (!objectKey) return res.status(400).json({ error: 'Missing original_raw_key' })

    // ✅ Stream from R2
    const obj = await s3.send(
      new GetObjectCommand({
        Bucket: R2_BUCKET,
        Key: objectKey,
      })
    )

    if (!obj?.Body) return res.status(404).json({ error: 'RAW file missing' })

    const filename = safeFilename(p?.filename || `${photoId}.zip`)

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    if (obj.ContentLength) res.setHeader('Content-Length', String(obj.ContentLength))

    obj.Body.pipe(res)
  } catch (err) {
    console.error('raw-download error:', err)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}