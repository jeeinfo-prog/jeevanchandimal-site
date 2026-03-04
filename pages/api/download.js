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
/* helpers */
/* ---------------------------------------------------- */

function safeFilename(name) {
  return (
    String(name || '')
      .replace(/[\r\n"]/g, '')
      .replace(/[\\/]/g, '-')
      .trim() || 'download'
  )
}

function extractPhotoIdFromKey(key) {
  const m = String(key || '').match(/photos\/original\/([^/]+)\//i)
  return m?.[1] || ''
}

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

function cleanLower(v) {
  return String(v || '').trim().toLowerCase()
}

function isExpired(date) {
  if (!date) return false
  const t = new Date(date).getTime()
  if (!Number.isFinite(t)) return false
  return t < Date.now()
}

async function findFirstFileUnderPrefix(prefix) {
  const Bucket = process.env.R2_BUCKET
  if (!Bucket) throw new Error('Missing R2_BUCKET')

  const res = await r2.send(
    new ListObjectsV2Command({
      Bucket,
      Prefix: prefix.endsWith('/') ? prefix : `${prefix}/`,
      MaxKeys: 50,
    })
  )

  const items = res?.Contents || []
  const file = items.find((x) => x?.Key && !String(x.Key).endsWith('/'))

  return file?.Key || null
}

/* ---------------------------------------------------- */
/* membership token consumption */
/* ---------------------------------------------------- */

async function consumeTokenRow(jti) {
  const { data, error } = await supabaseAdmin
    .from('download_tokens')
    .select('jti, expires_at')
    .eq('jti', String(jti))
    .maybeSingle()

  if (error) throw new Error(error.message)

  if (!data) {
    return { ok: false, code: 'TOKEN_USED_OR_EXPIRED', message: 'Token used or expired' }
  }

  if (data.expires_at && isExpired(data.expires_at)) {
    await supabaseAdmin.from('download_tokens').delete().eq('jti', String(jti))

    return { ok: false, code: 'TOKEN_USED_OR_EXPIRED', message: 'Token used or expired' }
  }

  const del = await supabaseAdmin
    .from('download_tokens')
    .delete()
    .eq('jti', String(jti))

  if (del.error) throw new Error(del.error.message)

  return { ok: true }
}

/* ---------------------------------------------------- */
/* membership validation */
/* ---------------------------------------------------- */

async function checkAndConsumeMembership({ email }) {
  const e = normalizeEmail(email)

  if (!e) return { ok: false, code: 'DENIED', message: 'Denied' }

  const { data: m, error } = await supabaseAdmin
    .from('memberships')
    .select(`
      email,
      status,
      plan,
      billing_cycle,
      end_date,
      billing_cycle_end,
      monthly_download_limit,
      monthly_download_used
    `)
    .eq('email', e)
    .maybeSingle()

  if (error) throw new Error(error.message)

  if (!m) return { ok: false, code: 'NOT_MEMBER', message: 'Not a member' }

  if (cleanLower(m.status) !== 'active')
    return { ok: false, code: 'NOT_MEMBER', message: 'Not a member' }

  const endsAt = m.billing_cycle_end || m.end_date || null

  if (endsAt && isExpired(endsAt))
    return { ok: false, code: 'MEMBERSHIP_EXPIRED', message: 'Membership expired' }

  const limit = Number(m.monthly_download_limit ?? 0)
  const used = Number(m.monthly_download_used ?? 0)

  if (limit !== 0 && used >= limit)
    return { ok: false, code: 'LIMIT_REACHED', message: 'Monthly download limit reached' }

  if (limit !== 0) {
    const { data: updated, error: upErr } = await supabaseAdmin
      .from('memberships')
      .update({ monthly_download_used: used + 1 })
      .eq('email', e)
      .eq('monthly_download_used', used)
      .select('email')
      .maybeSingle()

    if (upErr) throw new Error(upErr.message)

    if (!updated)
      return { ok: false, code: 'RETRY', message: 'Please retry' }
  }

  return { ok: true }
}

/* ---------------------------------------------------- */
/* API handler */
/* ---------------------------------------------------- */

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method not allowed' })

  try {
    const Bucket = process.env.R2_BUCKET
    if (!Bucket) throw new Error('Missing R2_BUCKET')

    const token = typeof req.query.token === 'string' ? req.query.token : ''
    if (!token) return res.status(400).json({ error: 'Missing token' })

    const payload = verifyDownloadToken(token)

    if (!payload) return res.status(401).json({ error: 'Invalid token' })

    const { orderId, objectKey, jti } = payload

    if (!objectKey || !jti)
      return res.status(400).json({ error: 'Invalid token payload' })

    const isMembership =
      cleanLower(payload?.license) === 'membership' || Boolean(payload?.membership)

    /* ---------------------------------------------------- */
    /* membership downloads */
    /* ---------------------------------------------------- */

    if (isMembership) {
      const email = normalizeEmail(payload?.guestEmail)

      if (!email) return res.status(401).json({ error: 'Denied' })

      const consumed = await consumeTokenRow(jti)

      if (!consumed.ok) {
        const status = consumed.code === 'TOKEN_USED_OR_EXPIRED' ? 401 : 403
        return res.status(status).json({ error: consumed.message })
      }

      const mem = await checkAndConsumeMembership({ email })

      if (!mem.ok) {
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
    }

    /* ---------------------------------------------------- */
    /* order downloads */
    /* ---------------------------------------------------- */

    else {
      if (!orderId)
        return res.status(400).json({ error: 'Invalid token payload' })

      const { data: rpc, error } = await supabaseAdmin.rpc(
        'consume_download_token',
        {
          p_order_id: String(orderId),
          p_jti: String(jti),
        }
      )

      if (error) {
        console.error('consume_download_token error:', error)
        return res.status(500).json({ error: 'Server error' })
      }

      const r = Array.isArray(rpc) ? rpc[0] : rpc

      if (!r?.ok) {
        const code = r?.code || 'DENIED'

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

        return res.status(status).json({ error: r?.message || 'Denied' })
      }
    }

    /* ---------------------------------------------------- */
    /* resolve real R2 key */
    /* ---------------------------------------------------- */

    let finalKey = String(objectKey)

    const photoId = String(
      payload?.photoId || extractPhotoIdFromKey(objectKey) || ''
    ).trim()

    const isFolderKey = /photos\/original\/[^/]+\//i.test(finalKey)

    if (!isFolderKey && photoId) {
      const prefix = `photos/original/${photoId}/`
      const scannedKey = await findFirstFileUnderPrefix(prefix)

      if (scannedKey) finalKey = scannedKey
    }

    const filename = safeFilename(
      payload?.filename || finalKey.split('/').pop() || 'download'
    )

    const signedUrl = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket,
        Key: finalKey,
        ResponseContentDisposition: `attachment; filename="${filename}"`,
      }),
      { expiresIn: 60 }
    )

    res.setHeader('Cache-Control', 'no-store')

    return res.redirect(302, signedUrl)
  } catch (err) {
    console.error('download error:', err?.name, err?.message)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}