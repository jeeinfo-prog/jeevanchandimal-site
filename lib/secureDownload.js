// lib/secureDownload.js
import jwt from 'jsonwebtoken'

function getSecret() {
  const s = process.env.DOWNLOAD_TOKEN_SECRET
  if (!s) throw new Error('Missing DOWNLOAD_TOKEN_SECRET')
  return s
}

function normalizePayload(p) {
  const payload = p && typeof p === 'object' ? { ...p } : {}
  // Enforce jti for one-time tokens
  if (!payload.jti) throw new Error('Missing jti in token payload')
  if (!payload.objectKey) throw new Error('Missing objectKey in token payload')
  // orderId is optional now (membership can be null)
  return payload
}

/**
 * Create an expiring download token.
 * REQUIRED: { jti, objectKey }
 * Recommended: { orderId?, photoId, format, guestEmail, filename, license }
 */
export function createDownloadToken(payload, expiresIn = '10m') {
  const SECRET = getSecret()
  const normalized = normalizePayload(payload)
  return jwt.sign(normalized, SECRET, { expiresIn })
}

/**
 * Verify token and return payload.
 * Throws if invalid/expired.
 */
export function verifyDownloadToken(token) {
  const SECRET = getSecret()
  const p = jwt.verify(token, SECRET)
  return normalizePayload(p)
}