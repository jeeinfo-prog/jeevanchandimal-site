import { verifyDownloadToken } from '@/lib/secureDownload'
import { getObjectStream } from '@/lib/r2'

function safeFilename(name) {
  const s = String(name || '')
  // avoid header injection / weird characters
  return s.replace(/[\r\n"]/g, '').trim() || 'download'
}

function verifyTokenCompat(token) {
  // supports:
  // 1) verifyDownloadToken(token) -> payload OR throws
  // 2) verifyDownloadToken(token) -> { ok, payload, error }
  const out = verifyDownloadToken(token)
  if (out && typeof out === 'object' && 'ok' in out) {
    if (!out.ok) {
      const err = new Error(out.error || 'Invalid token')
      err.statusCode = 401
      throw err
    }
    return out.payload
  }
  return out
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const token = typeof req.query.token === 'string' ? req.query.token : ''
    if (!token) return res.status(400).json({ error: 'Missing token' })

    const payload = verifyTokenCompat(token)

    const objectKey = payload?.objectKey
    if (!objectKey) return res.status(400).json({ error: 'Invalid token payload' })

    const { body, contentType, contentLength } = await getObjectStream(objectKey)

    const filename = safeFilename(payload?.filename || objectKey.split('/').pop() || 'download')

    res.setHeader('Content-Type', contentType || 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    if (contentLength) res.setHeader('Content-Length', String(contentLength))
    res.setHeader('Cache-Control', 'no-store')

    // Stream to client if possible
    if (body && typeof body.pipe === 'function') {
      body.pipe(res)
      return
    }

    // Fallback: async-iterate the stream/body
    const chunks = []
    for await (const chunk of body) chunks.push(chunk)
    return res.status(200).send(Buffer.concat(chunks))
  } catch (e) {
    console.error('download error:', e)
    const msg = e?.message || 'Invalid or expired token'
    // if token invalid → 401, otherwise keep generic
    return res.status(401).json({ error: msg.includes('token') ? msg : 'Invalid or expired token' })
  }
}
