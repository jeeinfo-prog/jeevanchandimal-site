import jwt from 'jsonwebtoken'

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET

if (!SECRET) {
  // This throws only on server start if missing, which is good (fail fast)
  throw new Error('Missing DOWNLOAD_TOKEN_SECRET in .env.local')
}

/**
 * Create an expiring download token.
 * payload example:
 * { orderId, photoId, format: 'jpg'|'raw', objectKey, userId?, guestEmail? }
 */
export function createDownloadToken(payload, expiresIn = '10m') {
  // Keep payload minimal (no price, no personal data unless needed)
  return jwt.sign(payload, SECRET, { expiresIn })
}

/**
 * Verify token and return payload.
 * Throws if invalid/expired.
 */
export function verifyDownloadToken(token) {
  return jwt.verify(token, SECRET)
}
