import { verifyDownloadToken } from '@/lib/secureDownload'
import { getObjectStream } from '@/lib/r2'

function safeFilename(name) {
  return String(name || '')
    .replace(/[\r\n"]/g, '')
    .trim() || 'download'
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const token = typeof req.query.token === 'string' ? req.query.token : ''
    if (!token) {
      return res.status(400).json({ error: 'Missing token' })
    }

    // ✅ Your helper throws if invalid/expired
    const payload = verifyDownloadToken(token)

    const objectKey = payload?.objectKey
    if (!objectKey) {
      return res.status(400).json({ error: 'Invalid token payload' })
    }

    const { body, contentType, contentLength } = await getObjectStream(objectKey)

    const filename = safeFilename(
      payload?.filename || objectKey.split('/').pop() || 'download'
    )

    res.setHeader('Content-Type', contentType || 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    if (contentLength) {
      res.setHeader('Content-Length', String(contentLength))
    }

    // 🔐 never cache secure downloads
    res.setHeader('Cache-Control', 'no-store')

    // Stream if possible
    if (body && typeof body.pipe === 'function') {
      body.pipe(res)
      return
    }

    // Fallback for async iterable bodies
    const chunks = []
    for await (const chunk of body) chunks.push(chunk)
    return res.status(200).send(Buffer.concat(chunks))
  } catch (err) {
    console.error('download error:', err)

    // jwt.verify throws on invalid/expired → treat as 401
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
