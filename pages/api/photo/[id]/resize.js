import { createClient } from '@supabase/supabase-js'
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3'
import sharp from 'sharp'

// ✅ Use your existing token verifier
// (You already used this in pages/api/download.js earlier)
import { verifyDownloadToken } from '../../../../lib/secureDownload'

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

async function getOriginalKey(photoId) {
  // Prefer photo_assets (your create-upload saves original_key there)
  const { data: asset, error: assetErr } = await supabase
    .from('photo_assets')
    .select('original_key')
    .eq('photo_id', photoId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!assetErr && asset?.original_key) return asset.original_key

  // Fallback: photos table (if you store original_jpg_key/original_raw_key there)
  const { data: photo, error: photoErr } = await supabase
    .from('photos')
    .select('original_jpg_key, original_raw_key')
    .eq('id', photoId)
    .maybeSingle()

  if (!photoErr) return photo?.original_jpg_key || photo?.original_raw_key || null

  return null
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    if (!id) return res.status(400).json({ error: 'Missing id' })

    const src = typeof req.query.src === 'string' ? req.query.src : 'preview'
    const variant = typeof req.query.variant === 'string' ? req.query.variant : 'standard'

    // size
    const w = clampInt(req.query.w, 50, 3000, 1200)
    const h = req.query.h ? clampInt(req.query.h, 50, 3000, undefined) : undefined

    // output
    const format = (typeof req.query.format === 'string' ? req.query.format : 'jpg').toLowerCase()
    const q = clampInt(req.query.q, 50, 90, 82)

    const isWebp = format === 'webp'
    const outExt = isWebp ? 'webp' : 'jpg'
    const outType = isWebp ? 'image/webp' : 'image/jpeg'

    // ✅ decide if this response should be public-cacheable
    const isProtected = src === 'original'

    // ---------- TOKEN CHECK FOR ORIGINAL ----------
    if (isProtected) {
      const token = typeof req.query.token === 'string' ? req.query.token : null
      if (!token) return res.status(401).json({ error: 'Missing token' })

      const payload = verifyDownloadToken(token) // uses DOWNLOAD_TOKEN_SECRET internally in your lib
      if (!payload) return res.status(401).json({ error: 'Invalid token' })

      // Require token photoId match
      const tokenPhotoId = payload.photoId || payload.id
      if (tokenPhotoId !== id) {
        return res.status(403).json({ error: 'Token does not match photoId' })
      }

      // Optional: enforce scope/type if you include it in token payload
      // if (payload.scope && payload.scope !== 'original') {
      //   return res.status(403).json({ error: 'Token scope not allowed' })
      // }
    }

    // ---------- SOURCE KEY ----------
    let sourceKey
    if (src === 'thumb') {
      sourceKey = `photos/thumb/${id}.jpg`
    } else if (src === 'preview') {
      sourceKey =
        variant === 'strong'
          ? `photos/preview_wm-strong/${id}.jpg`
          : variant === 'corner'
            ? `photos/preview_wm-corner/${id}.jpg`
            : `photos/preview/${id}.jpg`
    } else if (src === 'original') {
      const originalKey = await getOriginalKey(id)
      if (!originalKey) return res.status(404).json({ error: 'Original not found' })
      sourceKey = originalKey
    } else {
      return res.status(400).json({ error: 'Invalid src (use thumb|preview|original)' })
    }

    // ---------- DERIVED KEY (R2 cache) ----------
    const derivedPrefix = isProtected ? 'photos/derived_protected' : 'photos/derived'
    const derivedKey = `${derivedPrefix}/${id}/${src}-${variant}/w${w}${h ? `_h${h}` : ''}_q${q}.${outExt}`

    // ---------- FAST PATH (already generated) ----------
    try {
      const head = await s3.send(
        new HeadObjectCommand({ Bucket: process.env.R2_BUCKET, Key: derivedKey })
      )

      res.setHeader('Content-Type', outType)
      res.setHeader(
        'Cache-Control',
        isProtected
          ? 'private, max-age=86400'
          : 'public, max-age=31536000, immutable'
      )
      if (head.ETag) res.setHeader('ETag', head.ETag)

      if (req.method === 'HEAD') return res.status(200).end()

      const obj = await s3.send(
        new GetObjectCommand({ Bucket: process.env.R2_BUCKET, Key: derivedKey })
      )
      obj.Body.pipe(res)
      return
    } catch {
      // not found -> generate
    }

    // ---------- FETCH SOURCE ----------
    const srcObj = await s3.send(
      new GetObjectCommand({ Bucket: process.env.R2_BUCKET, Key: sourceKey })
    )
    const srcBuf = await streamToBuffer(srcObj.Body)

    // ---------- RESIZE ----------
    const pipeline = sharp(srcBuf)
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

    // ---------- STORE DERIVED ----------
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: derivedKey,
        Body: outBuf,
        ContentType: outType,
        CacheControl: isProtected
          ? 'private, max-age=86400'
          : 'public, max-age=31536000, immutable',
      })
    )

    // ---------- RESPOND ----------
    res.setHeader('Content-Type', outType)
    res.setHeader(
      'Cache-Control',
      isProtected
        ? 'private, max-age=86400'
        : 'public, max-age=31536000, immutable'
    )

    if (req.method === 'HEAD') return res.status(200).end()
    return res.status(200).send(outBuf)
  } catch (err) {
    console.error('resize error:', err)
    return res.status(500).json({ error: 'Resize failed', detail: err?.message || String(err) })
  }
}
