// pages/api/download.js
// ✅ Secure download with:
// - JWT verify
// - Enforce per-order download limits (download_count / download_limit)
// - R2 original-key fallback + folder scan to find real filename
// - Streams file to client

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

    // ✅ throws if invalid/expired
    const payload = verifyDownloadToken(token)

    const orderId = payload?.orderId
    const objectKey = payload?.objectKey
    if (!orderId) return res.status(400).json({ error: 'Invalid token payload (missing orderId)' })
    if (!objectKey) return res.status(400).json({ error: 'Invalid token payload (missing objectKey)' })

    // ==============================
    // ✅ Enforce download limit
    // ==============================
    const { data: order, error: oErr } = await supabaseAdmin
      .from('orders')
      .select('id,status,download_count,download_limit')
      .eq('id', String(orderId))
      .single()

    if (oErr || !order) return res.status(404).json({ error: 'Order not found' })
    if (order.status !== 'PAID') return res.status(403).json({ error: 'Order not paid' })

    const used = Number(order.download_count || 0)
    const limit = Number(order.download_limit || 0) // 0 = unlimited (if you want)
    if (limit > 0 && used >= limit) {
      return res.status(403).json({ error: 'Download limit reached' })
    }

    // ==============================
    // ✅ Resolve the real R2 key
    // ==============================
    let finalKey = objectKey
    let r2obj

    // Try token key first
    try {
      r2obj = await getObjectStream(finalKey)
    } catch (err) {
      if (!isNoSuchKey(err)) throw err

      // Derive photoId from "photos/original/<photoId>.jpg"
      const last = objectKey.split('/').pop() || ''
      const photoId = removeExt(last)

      // Common guessed fallbacks (optional)
      const fallbacks = [
        `photos/original/${photoId}/original.jpg`,
        `photos/original/${photoId}/${photoId}.jpg`,
        `photos/original/${photoId}/original.jpeg`,
        `photos/original/${photoId}/${photoId}.jpeg`,
      ]

      let found = null
      for (const altKey of fallbacks) {
        try {
          found = await getObjectStream(altKey)
          finalKey = altKey
          break
        } catch (e2) {
          if (!isNoSuchKey(e2)) throw e2
        }
      }

      // ✅ Your real structure: photos/original/<photoId>/<originalFilename>.jpg
      if (!found) {
        const prefix = `photos/original/${photoId}/`
        const scannedKey = await findFirstFileUnderPrefix(prefix)
        if (!scannedKey) {
          return res.status(404).json({ error: 'File not found in storage' })
        }

        finalKey = scannedKey
        found = await getObjectStream(scannedKey)
      }

      r2obj = found
    }

    const { body, contentType, contentLength } = r2obj
    if (!body) return res.status(404).json({ error: 'File not found' })

    // ==============================
    // ✅ Increment download count (best-effort)
    // ==============================
    try {
      await supabaseAdmin
        .from('orders')
        .update({ download_count: used + 1 })
        .eq('id', String(orderId))
    } catch (e) {
      // Don't block the download if logging fails
      console.warn('download_count update failed:', e?.message || e)
    }

    // ==============================
    // ✅ Headers + stream
    // ==============================
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
    // JWT verify errors end up here too
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
