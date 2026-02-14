import { verifyDownloadToken } from '@/lib/secureDownload'
import { getObjectStream } from '@/lib/r2'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pipe = promisify(pipeline)

function safeFilename(name) {
  return (
    String(name || '')
      .replace(/[\r\n"]/g, '')
      .replace(/[\\/]/g, '-') // avoid path tricks
      .trim() || 'download'
  )
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

    // ✅ throws if invalid/expired
    const payload = verifyDownloadToken(token)

    const objectKey = payload?.objectKey
    if (!objectKey) {
      return res.status(400).json({ error: 'Invalid token payload' })
    }

    const { body, contentType, contentLength } = await getObjectStream(objectKey)

    const filename = safeFilename(payload?.filename || objectKey.split('/').pop() || 'download')

    res.setHeader('Content-Type', contentType || 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    if (contentLength) res.setHeader('Content-Length', String(contentLength))
    res.setHeader('Cache-Control', 'no-store')

    if (!body) {
      return res.status(404).json({ error: 'File not found' })
    }

    // Best: stream to client
    if (typeof body.pipe === 'function') {
      await pipe(body, res)
      return
    }

    // Fallback for async-iterable bodies
    const chunks = []
    for await (const chunk of body) chunks.push(chunk)
    return res.status(200).send(Buffer.concat(chunks))
  } catch (err) {
    // ✅ THIS is what will tell us the real cause in Vercel logs
    console.error('download token verify failed:', err?.name, err?.message)

    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
