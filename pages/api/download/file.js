// pages/api/download/file.js
import jwt from 'jsonwebtoken'

export default function handler(req, res) {
  const { token } = req.query
  if (!token) return res.status(400).send('Missing token')

  try {
    const secret = process.env.DOWNLOAD_TOKEN_SECRET
    const payload = jwt.verify(String(token), secret)

    const filename = `${payload.photoId}.${payload.format === 'raw' ? 'raw' : 'jpg'}`
    const content = `Protected download\nOrder: ${payload.orderId}\nPhoto: ${payload.photoId}\nLicense: ${payload.license}\nFormat: ${payload.format}\n`
    const buf = Buffer.from(content, 'utf8')

    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    return res.status(200).send(buf)
  } catch (e) {
    return res.status(403).send('Invalid or expired token')
  }
}
