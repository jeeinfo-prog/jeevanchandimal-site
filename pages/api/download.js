// pages/api/download.js

import { verifyDownloadToken } from '@/lib/secureDownload'
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
  // Pick first real object (ignore "directory" placeholders ending with "/")
  const file = items.find((x) => x?.Key && !String(x.Key).endsWith('/'))
  return file?.Key || null
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const token = typeof req.query.token === 'string' ? req.query.token : ''
    if (!token) return res.status(400).json({ error: 'Missing token' })

    const payload = verifyDownloadToken(token)

    const objectKey = payload?.objectKey
    if (!objectKey) return res.status(400).json({ error: 'Invalid token payload' })

    let finalKey = objectKey
    const tried = [objectKey]

    // 1) Try token key
    let r2obj
    try {
      r2obj = await getObjectStream(finalKey)
    } catch (err) {
      if (!isNoSuchKey(err)) throw err

      // Derive photoId from token key if possible (works for your current orders)
      const last = objectKey.split('/').pop() || ''
      const photoId = removeExt(last)

      // 2) Common guessed fallbacks
      const fallbacks = [
        `photos/original/${photoId}/original.jpg`,
        `photos/original/${photoId}/${photoId}.jpg`,
        `photos/original/${photoId}/original.jpeg`,
        `photos/original/${photoId}/${photoId}.jpeg`,
      ]

      let found = null
      for (const altKey of fallbacks) {
        tried.push(altKey)
        try {
          found = await getObjectStream(altKey)
          finalKey = altKey
          break
        } catch (e2) {
          if (!isNoSuchKey(e2)) throw e2
        }
      }

      // 3) Dynamic folder scan (THIS fixes your real structure)
      if (!found) {
        const prefix = `photos/original/${photoId}/`
        const scannedKey = await findFirstFileUnderPrefix(prefix)
        if (!scannedKey) {
          return res.status(404).json({
            error: 'File not found in storage',
            tried,
            scannedPrefix: prefix,
          })
        }

        tried.push(scannedKey)
        finalKey = scannedKey
        found = await getObjectStream(scannedKey)
      }

      r2obj = found
    }

    const { body, contentType, contentLength } = r2obj

    // Prefer filename from token; otherwise use the actual key name we ended up using
    const filename = safeFilename(payload?.filename || finalKey.split('/').pop() || 'download')

    res.setHeader('Content-Type', contentType || 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    if (contentLength) res.setHeader('Content-Length', String(contentLength))
    res.setHeader('Cache-Control', 'no-store')

    if (!body) return res.status(404).json({ error: 'File not found' })

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
