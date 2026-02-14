import { verifyDownloadToken } from '@/lib/secureDownload'
import { getObjectStream } from '@/lib/r2'

export default async function downloadHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const token = String(req.query.token || '')
    if (!token) {
      return res.status(400).json({ error: 'Missing token' })
    }

    // 🔐 Verify JWT download token
    let payload
    try {
      payload = verifyDownloadToken(token)
    } catch (err) {
      console.error('Token verify failed:', err?.message || err)
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    const { objectKey, filename } = payload || {}

    if (!objectKey) {
      return res.status(400).json({ error: 'Invalid token payload' })
    }

    // 📦 Fetch file stream from R2
    const r2obj = await getObjectStream(objectKey)

    if (!r2obj || !r2obj.Body) {
      return res.status(404).json({ error: 'File not found' })
    }

    const contentType = r2obj.ContentType || 'application/octet-stream'
    const safeName =
      filename ||
      objectKey.split('/').pop() ||
      'download'

    // 🧾 Headers
    res.setHeader('Content-Type', contentType)
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${safeName}"`
    )
    if (r2obj.ContentLength) {
      res.setHeader('Content-Length', String(r2obj.ContentLength))
    }

    // 🔒 Prevent caching of secure downloads
    res.setHeader('Cache-Control', 'no-store')

    const body = r2obj.Body

    // 🚀 Stream to client
    if (body.pipe) {
      body.pipe(res)
      return
    }

    // Fallback (rare)
    const chunks = []
    for await (const chunk of body) chunks.push(chunk)
    res.send(Buffer.concat(chunks))
  } catch (err) {
    console.error('Download handler error:', err)
    return res.status(500).json({ error: 'Download failed' })
  }
}
