// lib/secureDownload.js
import jwt from 'jsonwebtoken'

const DOWNLOAD_TOKEN_ISSUER = 'jeevanchandimal.com'

function getSecret() {
  const s = process.env.DOWNLOAD_TOKEN_SECRET
  if (!s) throw new Error('Missing DOWNLOAD_TOKEN_SECRET')
  return s
}

function normalizePayload(p) {
  const payload = p && typeof p === 'object' ? { ...p } : {}

  // required for one-time token consumption
  if (!payload.jti) throw new Error('Missing jti in token payload')
  if (!payload.objectKey) throw new Error('Missing objectKey in token payload')

  // orderId can be absent for membership-style downloads
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

  return jwt.sign(normalized, SECRET, {
    expiresIn,
    issuer: DOWNLOAD_TOKEN_ISSUER,
  })
}

/**
 * Verify token and return payload.
 * Throws if invalid/expired.
 */
export function verifyDownloadToken(token) {
  const SECRET = getSecret()

  const verified = jwt.verify(token, SECRET, {
    issuer: DOWNLOAD_TOKEN_ISSUER,
  })

  return normalizePayload(verified)
}