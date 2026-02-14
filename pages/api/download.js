import { verifyDownloadToken } from '@/lib/secureDownload'
import { getObjectStream } from '@/lib/r2'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const token = String(req.query.token || '')
    if (!token) return res.status(400).json({ error: 'Missing token' })

    const payload = verifyDownloadToken(token)

    const objectKey = payload?.objectKey
    if (!objectKey) return res.status(400).json({ error: 'Invalid token payload' })

    const r2obj = await getObjectStream(objectKey)

    const contentType = r2obj.ContentType || 'application/octet-stream'
    const filename = payload?.filename || objectKey.split('/').pop() || 'download'

    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    if (r2obj.ContentLength) res.setHeader('Content-Length', String(r2obj.ContentLength))
    res.setHeader('Cache-Control', 'no-store')

    const body = r2obj.Body
    if (body?.pipe) {
      body.pipe(res)
      return
    }

    const chunks = []
    for await (const chunk of body) chunks.push(chunk)
    res.send(Buffer.concat(chunks))
  } catch (e) {
    console.error('download error:', e)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
