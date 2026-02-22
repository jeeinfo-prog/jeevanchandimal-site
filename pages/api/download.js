// pages/api/download.js
import { verifyDownloadToken } from '@/lib/secureDownload'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { r2 } from '@/lib/r2'
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const config = {
  api: { responseLimit: false }, // we redirect anyway, but keep safe
}

function safeFilename(name) {
  return (
    String(name || '')
      .replace(/[\r\n"]/g, '')
      .replace(/[\\/]/g, '-')
      .trim() || 'download'
  )
}

function removeExt(filename) {
  return String(filename || '').replace(/\.[^.]+$/, '')
}

async function findFirstFileUnderPrefix(prefix) {
  const Bucket = process.env.R2_BUCKET
  if (!Bucket) throw new Error('Missing R2_BUCKET')

  const out = await r2.send(
    new ListObjectsV2Command({
      Bucket,
      Prefix: prefix.endsWith('/') ? prefix : `${prefix}/`,
      MaxKeys: 50,
    })
  )

  const items = out?.Contents || []
  const file = items.find((x) => x?.Key && !String(x.Key).endsWith('/'))
  return file?.Key || null
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const Bucket = process.env.R2_BUCKET
    if (!Bucket) throw new Error('Missing R2_BUCKET')

    const token = typeof req.query.token === 'string' ? req.query.token : ''
    if (!token) return res.status(400).json({ error: 'Missing token' })

    const payload = verifyDownloadToken(token)

    const { orderId, objectKey, jti } = payload || {}
    if (!orderId || !objectKey || !jti) {
      return res.status(400).json({ error: 'Invalid token payload' })
    }

    // ✅ Atomic: one-time token + limit + increment count
    const { data: rpc, error: rpcErr } = await supabaseAdmin.rpc('consume_download_token', {
      p_order_id: String(orderId),
      p_jti: String(jti),
    })

    if (rpcErr) {
      console.error('consume_download_token error:', rpcErr)
      return res.status(500).json({ error: 'Server error' })
    }

    const r = Array.isArray(rpc) ? rpc[0] : rpc
    if (!r?.ok) {
      const code = r?.code || 'DENIED'
      const message = r?.message || 'Denied'
      const status =
        code === 'TOKEN_USED_OR_EXPIRED'
          ? 401
          : code === 'LIMIT_REACHED'
            ? 403
            : code === 'ORDER_NOT_PAID'
              ? 403
              : code === 'ORDER_NOT_FOUND'
                ? 404
                : 401

      return res.status(status).json({ error: message })
    }

    // ✅ Resolve the real R2 key (handles folder-based originals)
    let finalKey = objectKey

    // If objectKey points to a file that doesn't exist (older tokens / different layout),
    // scan: photos/original/<photoId>/ and pick first file.
    // We don't "GetObject" here (no streaming). We'll just resolve the right Key.
    const last = objectKey.split('/').pop() || ''
    const photoId = removeExt(last)

    // If your new layout is always folder-based, you can always scan.
    // To keep behavior safe, we only scan when objectKey looks like a "flat" jpg.
    // (You can simplify later.)
    if (!objectKey.includes(`/photos/original/${photoId}/`)) {
      const prefix = `photos/original/${photoId}/`
      const scannedKey = await findFirstFileUnderPrefix(prefix)
      if (scannedKey) finalKey = scannedKey
    }

    const filename = safeFilename(payload?.filename || finalKey.split('/').pop() || 'download')

    // ✅ Signed URL (download directly from R2)
    const signedUrl = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket,
        Key: finalKey,
        ResponseContentDisposition: `attachment; filename="${filename}"`,
      }),
      { expiresIn: 60 } // 60s is enough
    )

    res.setHeader('Cache-Control', 'no-store')
    return res.redirect(302, signedUrl)
  } catch (err) {
    console.error('download error:', err?.name, err?.message)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}