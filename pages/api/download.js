// pages/api/download.js

import { verifyDownloadToken } from '../../lib/secureDownload'
import { supabaseAdmin } from '../../lib/supabaseAdmin'
import { r2 } from '../../lib/r2'

import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const config = {
  api: { responseLimit: false },
}

/* ---------------------------------------------------- */
/* security: tiny best-effort rate limit (serverless-safe-ish) */
/* ---------------------------------------------------- */

const RL_WINDOW_MS = 60_000
const RL_MAX = 60

const rl = globalThis.__jc_rl_download || new Map()
globalThis.__jc_rl_download = rl

function clean(v) {
  return String(v || '').trim()
}

function getIp(req) {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim()
  return clean(req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown')
}

function applySecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, private, max-age=0, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'no-referrer')
}

function rateLimit(req, res) {
  const ip = getIp(req)
  const now = Date.now()
  const key = `dl:${ip}`

  const cur = rl.get(key) || { n: 0, resetAt: now + RL_WINDOW_MS }
  if (now > cur.resetAt) {
    cur.n = 0
    cur.resetAt = now + RL_WINDOW_MS
  }

  cur.n += 1
  rl.set(key, cur)

  res.setHeader('X-RateLimit-Limit', String(RL_MAX))
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, RL_MAX - cur.n)))
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(cur.resetAt / 1000)))

  if (cur.n > RL_MAX) {
    res.status(429).json({ error: 'Too many requests' })
    return false
  }

  return true
}

/* ---------------------------------------------------- */
/* helpers */
/* ---------------------------------------------------- */

function safeFilename(name) {
  return (
    clean(name)
      .replace(/[\r\n"]/g, '')
      .replace(/[\\/]/g, '-') || 'download'
  )
}

function normalizeEmail(v) {
  return clean(v).toLowerCase()
}

function cleanLower(v) {
  return clean(v).toLowerCase()
}

function isExpired(date) {
  if (!date) return false
  const t = new Date(date).getTime()
  if (!Number.isFinite(t)) return false
  return t < Date.now()
}

function isSafeR2Key(key) {
  const k = clean(key)
  if (!k) return false
  if (k.includes('..') || k.includes('\\')) return false
  if (!k.startsWith('photos/')) return false
  return true
}

function isPrefixKey(key) {
  return clean(key).endsWith('/')
}

function looksLikeTokenError(message) {
  const msg = clean(message).toLowerCase()
  return (
    msg.includes('jwt') ||
    msg.includes('token') ||
    msg.includes('expired') ||
    msg.includes('invalid signature') ||
    msg.includes('malformed')
  )
}

function looksLikeMembershipPayload(payload) {
  const license = cleanLower(payload?.license)
  const membershipPlans = new Set(['membership', 'basic', 'pro', 'elite'])

  return (
    payload?.membership === true ||
    membershipPlans.has(license) ||
    (!payload?.orderId && !!normalizeEmail(payload?.guestEmail))
  )
}

async function findFirstFileUnderPrefix(prefix) {
  const Bucket = process.env.R2_BUCKET
  if (!Bucket) throw new Error('Missing R2_BUCKET')

  const pref = clean(prefix).endsWith('/') ? clean(prefix) : `${clean(prefix)}/`

  const result = await r2.send(
    new ListObjectsV2Command({
      Bucket,
      Prefix: pref,
      MaxKeys: 50,
    })
  )

  const items = Array.isArray(result?.Contents) ? result.Contents : []
  const file = items.find((x) => x?.Key && !String(x.Key).endsWith('/'))
  return file?.Key || null
}

/* ---------------------------------------------------- */
/* token row consume */
/* ---------------------------------------------------- */

async function consumeTokenRow(jti) {
  const { data, error } = await supabaseAdmin
    .from('download_tokens')
    .select('jti, expires_at')
    .eq('jti', clean(jti))
    .maybeSingle()

  if (error) throw new Error(error.message)

  if (!data) {
    return { ok: false, code: 'TOKEN_USED_OR_EXPIRED', message: 'Token used or expired' }
  }

  if (data.expires_at && isExpired(data.expires_at)) {
    await supabaseAdmin.from('download_tokens').delete().eq('jti', clean(jti))
    return { ok: false, code: 'TOKEN_USED_OR_EXPIRED', message: 'Token used or expired' }
  }

  const del = await supabaseAdmin.from('download_tokens').delete().eq('jti', clean(jti))
  if (del.error) throw new Error(del.error.message)

  return { ok: true }
}

/* ---------------------------------------------------- */
/* membership validation + quota consume */
/* ---------------------------------------------------- */

async function checkAndConsumeMembership({ email }) {
  const e = normalizeEmail(email)
  if (!e) return { ok: false, code: 'DENIED', message: 'Denied' }

  const { data: membership, error } = await supabaseAdmin
    .from('memberships')
    .select(
      `
      id,
      email,
      status,
      plan,
      billing_cycle,
      end_date,
      billing_cycle_end,
      monthly_download_limit,
      monthly_download_used,
      created_at
    `
    )
    .eq('email', e)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(error.message)

  if (!membership) return { ok: false, code: 'NOT_MEMBER', message: 'Not a member' }
  if (cleanLower(membership.status) !== 'active') {
    return { ok: false, code: 'NOT_MEMBER', message: 'Not a member' }
  }

  const endsAt = membership.billing_cycle_end || membership.end_date || null
  if (endsAt && isExpired(endsAt)) {
    return { ok: false, code: 'MEMBERSHIP_EXPIRED', message: 'Membership expired' }
  }

  const limit = Number(membership.monthly_download_limit ?? 0)
  const used = Number(membership.monthly_download_used ?? 0)

  if (limit !== 0 && used >= limit) {
    return { ok: false, code: 'LIMIT_REACHED', message: 'Monthly download limit reached' }
  }

  if (limit !== 0) {
    const { data: updated, error: upErr } = await supabaseAdmin
      .from('memberships')
      .update({ monthly_download_used: used + 1 })
      .eq('id', membership.id)
      .eq('monthly_download_used', used)
      .select('id')
      .maybeSingle()

    if (upErr) throw new Error(upErr.message)
    if (!updated) return { ok: false, code: 'RETRY', message: 'Please retry' }
  }

  return { ok: true }
}

/* ---------------------------------------------------- */
/* API handler */
/* ---------------------------------------------------- */

export default async function handler(req, res) {
  applySecurityHeaders(res)

  if (!rateLimit(req, res)) return

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const Bucket = process.env.R2_BUCKET
    if (!Bucket) throw new Error('Missing R2_BUCKET')

    const token = typeof req.query.token === 'string' ? req.query.token : ''
    if (!token) return res.status(400).json({ error: 'Missing token' })

    const payload = verifyDownloadToken(token)
    if (!payload) return res.status(401).json({ error: 'Invalid token' })

    const orderId = clean(payload?.orderId)
    const objectKey = clean(payload?.objectKey)
    const jti = clean(payload?.jti)

    console.log('download request:', {
      orderId: orderId || null,
      hasObjectKey: !!objectKey,
      jti: jti || null,
      membershipLike: looksLikeMembershipPayload(payload),
    })

    if (!objectKey || !jti) {
      return res.status(400).json({ error: 'Invalid token payload' })
    }

    if (!isSafeR2Key(objectKey)) {
      return res.status(400).json({ error: 'Invalid object key' })
    }

    const isMembership = looksLikeMembershipPayload(payload)

    /* ---------------------------------------------------- */
    /* membership downloads */
    /* ---------------------------------------------------- */
    if (isMembership) {
      const email = normalizeEmail(payload?.guestEmail)
      if (!email) return res.status(401).json({ error: 'Denied' })

      const mem = await checkAndConsumeMembership({ email })
      if (!mem.ok) {
        console.error('download membership denied:', { email, code: mem.code })

        const status =
          mem.code === 'LIMIT_REACHED'
            ? 403
            : mem.code === 'MEMBERSHIP_EXPIRED'
              ? 403
              : mem.code === 'NOT_MEMBER'
                ? 403
                : mem.code === 'RETRY'
                  ? 429
                  : 401

        return res.status(status).json({ error: mem.message })
      }

      const consumed = await consumeTokenRow(jti)
      if (!consumed.ok) {
        const status = consumed.code === 'TOKEN_USED_OR_EXPIRED' ? 401 : 403
        return res.status(status).json({ error: consumed.message })
      }
    }

    /* ---------------------------------------------------- */
    /* order downloads */
    /* ---------------------------------------------------- */
    else {
      if (!orderId) return res.status(400).json({ error: 'Invalid token payload' })

      const { data: rpc, error } = await supabaseAdmin.rpc('consume_download_token', {
        p_order_id: orderId,
        p_jti: jti,
      })

      if (error) {
        console.error('consume_download_token error:', error)
        return res.status(500).json({ error: 'Server error' })
      }

      const result = Array.isArray(rpc) ? rpc[0] : rpc

      if (!result?.ok) {
        const code = result?.code || 'DENIED'
        console.error('download denied:', {
          orderId,
          jti,
          code,
          message: result?.message || 'Denied',
        })

        const status =
          code === 'TOKEN_USED_OR_EXPIRED'
            ? 401
            : code === 'LIMIT_REACHED'
              ? 403
              : code === 'ORDER_NOT_PAID'
                ? 403
                : code === 'ORDER_NOT_FOUND'
                  ? 404
                  : 401

        return res.status(status).json({ error: result?.message || 'Denied' })
      }
    }

    /* ---------------------------------------------------- */
    /* resolve real R2 key */
    /* ---------------------------------------------------- */

    let finalKey = objectKey

    if (isPrefixKey(finalKey)) {
      const scannedKey = await findFirstFileUnderPrefix(finalKey)
      if (!scannedKey) return res.status(404).json({ error: 'File not found' })
      finalKey = scannedKey
    }

    if (!finalKey || !isSafeR2Key(finalKey)) {
      return res.status(400).json({ error: 'Invalid object key' })
    }

    const filename = safeFilename(payload?.filename || finalKey.split('/').pop() || 'download')

    const signedUrl = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket,
        Key: finalKey,
        ResponseContentDisposition: `attachment; filename="${filename}"`,
      }),
      { expiresIn: 60 }
    )

    return res.redirect(302, signedUrl)
  } catch (err) {
    console.error('download error:', err?.name, err?.message)

    if (looksLikeTokenError(err?.message)) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    return res.status(500).json({ error: 'Server error' })
  }
}