import { verifyDownloadToken } from '@/lib/secureDownload'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getObjectStream, r2 } from '@/lib/r2'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pipe = promisify(pipeline)

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

function isNoSuchKey(err) {
  return (
    err?.name === 'NoSuchKey' ||
    err?.Code === 'NoSuchKey' ||
    err?.$metadata?.httpStatusCode === 404
  )
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
    const token = typeof req.query.token === 'string' ? req.query.token : ''
    if (!token) return res.status(400).json({ error: 'Missing token' })

    const payload = verifyDownloadToken(token)

    const { orderId, objectKey, jti } = payload || {}
    if (!orderId || !objectKey || !jti) {
      return res.status(400).json({ error: 'Invalid token payload' })
    }

    // ✅ Atomic: one-time token + limit + increment count
    const { data: rpc, error: rpcErr } = await supabaseAdmin
      .rpc('consume_download_token', { p_order_id: String(orderId), p_jti: String(jti) })

    if (rpcErr) {
      console.error('consume_download_token error:', rpcErr)
      return res.status(500).json({ error: 'Server error' })
    }

    const r = Array.isArray(rpc) ? rpc[0] : rpc
    if (!r?.ok) {
      const code = r?.code || 'DENIED'
      const message = r?.message || 'Denied'
      const status =
        code === 'TOKEN_USED_OR_EXPIRED' ? 401 :
        code === 'LIMIT_REACHED' ? 403 :
        code === 'ORDER_NOT_PAID' ? 403 :
        code === 'ORDER_NOT_FOUND' ? 404 :
        401

      return res.status(status).json({ error: message })
    }

    // ✅ Resolve the real R2 key (your folder-based originals)
    let finalKey = objectKey
    let r2obj

    try {
      r2obj = await getObjectStream(finalKey)
    } catch (err) {
      if (!isNoSuchKey(err)) throw err

      const last = objectKey.split('/').pop() || ''
      const photoId = removeExt(last)

      // scan actual folder
      const prefix = `photos/original/${photoId}/`
      const scannedKey = await findFirstFileUnderPrefix(prefix)
      if (!scannedKey) return res.status(404).json({ error: 'File not found in storage' })

      finalKey = scannedKey
      r2obj = await getObjectStream(scannedKey)
    }

    const { body, contentType, contentLength } = r2obj
    if (!body) return res.status(404).json({ error: 'File not found' })

    const filename = safeFilename(payload?.filename || finalKey.split('/').pop() || 'download')

    res.setHeader('Content-Type', contentType || 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    if (contentLength) res.setHeader('Content-Length', String(contentLength))
    res.setHeader('Cache-Control', 'no-store')

    if (typeof body.pipe === 'function') {
      await pipe(body, res)
      return
    }

    const chunks = []
    for await (const chunk of body) chunks.push(chunk)
    return res.status(200).send(Buffer.concat(chunks))
  } catch (err) {
    console.error('download error:', err?.name, err?.message)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
