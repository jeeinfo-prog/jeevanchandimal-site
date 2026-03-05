// pages/api/member/download.js
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '@/lib/secureDownload'

const SESSION_SECRET =
  process.env.MEMBER_SESSION_SECRET || process.env.DOWNLOAD_TOKEN_SECRET

/* ---------------- security: best-effort rate limit ---------------- */

const RL_WINDOW_MS = 60_000
const RL_MAX = 30

const rl = globalThis.__jc_rl_member_download || new Map()
globalThis.__jc_rl_member_download = rl

function getIp(req) {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim()
  return (
    String(req.headers['x-real-ip'] || '').trim() ||
    String(req.socket?.remoteAddress || '').trim() ||
    'unknown'
  )
}

function rateLimit(req, res) {
  const ip = getIp(req)
  const now = Date.now()
  const key = `md:${ip}`

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
    res.status(429).json({ ok: false, error: 'Too many requests' })
    return false
  }
  return true
}

/* ---------------- helpers ---------------- */

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}
function clean(v) {
  return String(v || '').trim()
}
function cleanLower(v) {
  return String(v || '').trim().toLowerCase()
}
function normalizeFormat(v) {
  return String(v || '').trim().toLowerCase() === 'raw' ? 'raw' : 'jpg'
}

function isExpired(date) {
  if (!date) return false
  const t = new Date(date).getTime()
  if (!Number.isFinite(t)) return false
  return t < Date.now()
}

function cinematicKickMessage() {
  return {
    title: 'Session closed',
    body:
      'This membership is active on another device.\n\nFor protection, your session has been closed here. Please sign in again to continue.',
    hint: 'Max 2 devices • No sharing',
  }
}

function verifySessionFromReq(req) {
  const auth = String(req.headers.authorization || '')
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token) {
    return { ok: false, code: 'NO_SESSION', error: 'Please sign in to continue.' }
  }

  if (!SESSION_SECRET) {
    return {
      ok: false,
      code: 'SERVER_MISCONFIG',
      error: 'Missing MEMBER_SESSION_SECRET',
    }
  }

  try {
    const payload = jwt.verify(token, SESSION_SECRET)
    return { ok: true, payload }
  } catch {
    return {
      ok: false,
      code: 'SESSION_INVALID',
      error: 'Session expired. Please sign in again.',
      cinematic: cinematicKickMessage(),
    }
  }
}

async function ensureActiveSession(userId, deviceId) {
  const { data, error } = await supabaseAdmin
    .from('member_sessions')
    .select('id')
    .eq('user_id', userId)
    .eq('device_id', deviceId)
    .is('revoked_at', null)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return !!data
}

function resolveTierTermFromMembershipRow(memberRow) {
  const planRaw = cleanLower(memberRow?.plan)
  if (planRaw === 'monthly') return { tier: 'basic', term: 'monthly' }
  if (planRaw === 'yearly') return { tier: 'pro', term: 'yearly' }
  if (planRaw === 'lifetime') return { tier: 'elite', term: 'lifetime' }
  if (['basic', 'pro', 'elite'].includes(planRaw)) return { tier: planRaw, term: 'monthly' }
  return { tier: 'pro', term: 'monthly' }
}

async function resolveObjectKeyFromPhotos(photoId, format) {
  const pid = clean(photoId)
  if (!pid) return null

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id,original_jpg_key,original_raw_key,original_key,original_filename')
    .eq('id', pid)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) return null

  const fmt = normalizeFormat(format)
  if (fmt === 'raw') return p.original_raw_key ? String(p.original_raw_key) : null
  return String(p.original_jpg_key || p.original_key || '')
}

async function incrementMonthlyUsedCAS(memberRow) {
  const id = memberRow.id
  const used = Number(memberRow.monthly_download_used ?? 0)
  const limit = Number(memberRow.monthly_download_limit ?? 0)

  if (limit > 0 && used >= limit) return { ok: false, used, limit, remaining: 0 }

  const nextUsed = used + 1

  const { data, error } = await supabaseAdmin
    .from('memberships')
    .update({ monthly_download_used: nextUsed })
    .eq('id', id)
    .eq('monthly_download_used', used) // CAS
    .select('monthly_download_used,monthly_download_limit,billing_cycle_end')
    .maybeSingle()

  if (error) throw new Error(error.message)

  if (!data) {
    const { data: fresh, error: fErr } = await supabaseAdmin
      .from('memberships')
      .select('id,monthly_download_used,monthly_download_limit,billing_cycle_end')
      .eq('id', id)
      .maybeSingle()
    if (fErr) throw new Error(fErr.message)
    return await incrementMonthlyUsedCAS({ ...memberRow, ...fresh })
  }

  const finalUsed = Number(data.monthly_download_used ?? nextUsed)
  const finalLimit = Number(data.monthly_download_limit ?? limit)
  const remaining = finalLimit === 0 ? 0 : Math.max(0, finalLimit - finalUsed)

  return {
    ok: true,
    used: finalUsed,
    limit: finalLimit,
    remaining,
    reset_at: data.billing_cycle_end || null,
  }
}

async function ensureMemberOrder(email, tier, term, memberRow, quotaUsed) {
  const cycle = memberRow?.billing_cycle_end
    ? `CYC_${String(memberRow.billing_cycle_end).slice(0, 10)}`
    : `CYC_${new Date().toISOString().slice(0, 7)}`

  const code = `MEMBER_${cycle}_${email}`.slice(0, 180)

  const existing = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('code', code)
    .maybeSingle()

  if (!existing.error && existing.data) return existing.data

  const id = `ORD_${Date.now()}_${crypto.randomBytes(10).toString('hex')}`

  const payload = {
    id,
    code,
    status: 'PAID',
    email,
    currency: 'LKR',
    amount: '0',
    photo_id: 'membership',
    license: cleanLower(tier),
    format: cleanLower(term),
    created_at: new Date().toISOString(),
    paid_at: new Date().toISOString(),
    order_kind: 'membership',
    download_count: Number(quotaUsed ?? memberRow?.monthly_download_used ?? 0),
    download_limit: Number(memberRow?.monthly_download_limit ?? 0),
    items: [], // ✅ JSONB array (not a string)
  }

  const ins = await supabaseAdmin.from('orders').insert(payload).select('*').maybeSingle()
  if (ins.error) throw new Error(ins.error.message)
  return ins.data
}

export default async function handler(req, res) {
  // ✅ rate limit first
  if (!rateLimit(req, res)) return

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const photoId = clean(req.body?.photoId)
    const email = normalizeEmail(req.body?.email)
    const requestedFormat = normalizeFormat(req.body?.format)

    if (!photoId || !email) {
      return res.status(400).json({ ok: false, error: 'Missing photoId or email' })
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }

    const sess = verifySessionFromReq(req)
    if (!sess.ok) return res.status(401).json(sess)

    const tokenEmail = normalizeEmail(sess.payload?.email)
    const deviceId = clean(sess.payload?.deviceId)
    const userId = clean(sess.payload?.userId)

    if (!tokenEmail || tokenEmail !== email || !deviceId || !userId) {
      return res.status(401).json({
        ok: false,
        code: 'SESSION_MISMATCH',
        error: 'Session mismatch. Please sign in again.',
        cinematic: cinematicKickMessage(),
      })
    }

    const activeSession = await ensureActiveSession(userId, deviceId)
    if (!activeSession) {
      return res.status(401).json({
        ok: false,
        code: 'SESSION_REVOKED',
        error: 'Session closed.',
        cinematic: cinematicKickMessage(),
      })
    }

    const { data: member, error: mErr } = await supabaseAdmin
      .from('memberships')
      .select(
        'id,email,user_id,plan,status,end_date,created_at,monthly_download_limit,monthly_download_used,billing_cycle_end'
      )
      .eq('email', email)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (mErr) return res.status(500).json({ ok: false, error: mErr.message })
    if (!member) return res.status(403).json({ ok: false, error: 'Not a member' })
    if (!member.user_id) return res.status(500).json({ ok: false, error: 'Membership missing user_id' })

    // ✅ consistent expiry logic: billing_cycle_end OR end_date
    const endsAt = member.billing_cycle_end || member.end_date || null
    if (endsAt && isExpired(endsAt)) {
      return res.status(403).json({ ok: false, error: 'Membership expired' })
    }

    const { tier, term } = resolveTierTermFromMembershipRow(member)

    const canRaw = cleanLower(tier) === 'elite'
    const format = requestedFormat === 'raw' && canRaw ? 'raw' : 'jpg'
    const ext = format === 'raw' ? 'zip' : 'jpg'

    const objectKey = await resolveObjectKeyFromPhotos(photoId, format)
    if (!objectKey) return res.status(404).json({ ok: false, error: 'File not found' })

    // ✅ quota update (CAS)
    const quota = await incrementMonthlyUsedCAS(member)
    if (!quota.ok) {
      return res.status(403).json({
        ok: false,
        error: 'Monthly download limit reached.',
        tier,
        term,
        used: quota.used,
        limit: quota.limit,
        remaining: 0,
        reset_at: member.billing_cycle_end || null,
      })
    }

    // ✅ Create/ensure an ORD_* order
    const order = await ensureMemberOrder(email, tier, term, member, quota.used)
    const orderIdText = String(order?.id || '')
    if (!orderIdText) return res.status(500).json({ ok: false, error: 'Could not create member order' })

    // ✅ Record token
    const jti = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // ✅ shorter TTL

    const insTok = await supabaseAdmin.from('download_tokens').insert({
      jti,
      order_id: orderIdText,
      expires_at: expiresAt.toISOString(),
    })
    if (insTok.error) return res.status(500).json({ ok: false, error: insTok.error.message })

    const token = createDownloadToken(
      {
        jti,
        orderId: orderIdText,
        photoId,
        format,
        objectKey,
        guestEmail: email,
        filename: `${photoId}.${ext}`,
        license: 'membership',
        membership: true, // ✅ explicit
      },
      '30m'
    )

    return res.status(200).json({
      ok: true,
      tier,
      term,
      type: format,
      used: quota.used,
      limit: quota.limit,
      remaining: quota.remaining,
      reset_at: quota.reset_at || member.billing_cycle_end || null,
      url: `/api/download?token=${encodeURIComponent(token)}`,
    })
  } catch (e) {
    console.error('member/download error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}