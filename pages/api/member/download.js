// pages/api/member/download.js
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'

const SESSION_SECRET = process.env.MEMBER_SESSION_SECRET || process.env.DOWNLOAD_TOKEN_SECRET

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}
function cleanLower(v) {
  return String(v || '').trim().toLowerCase()
}
function normalizeFormat(v) {
  return String(v || '').trim().toLowerCase() === 'raw' ? 'raw' : 'jpg'
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
  if (!token) return { ok: false, code: 'NO_SESSION', error: 'Please sign in to continue.' }

  if (!SESSION_SECRET) {
    return { ok: false, code: 'SERVER_MISCONFIG', error: 'Missing MEMBER_SESSION_SECRET' }
  }

  try {
    const payload = jwt.verify(token, SESSION_SECRET)
    return { ok: true, payload, token }
  } catch {
    return {
      ok: false,
      code: 'SESSION_INVALID',
      error: 'Session expired. Please sign in again.',
      cinematic: cinematicKickMessage(),
    }
  }
}

async function ensureActiveSession(email, deviceId) {
  const { data, error } = await supabaseAdmin
    .from('member_sessions')
    .select('sid')
    .eq('email', email)
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

  if (['basic', 'pro', 'elite'].includes(planRaw)) {
    const end = memberRow?.end_date || null
    if (!end) return { tier: planRaw, term: 'monthly' }

    const diffDays = Math.round((new Date(end).getTime() - Date.now()) / 86400000)
    if (diffDays > 3000) return { tier: planRaw, term: 'lifetime' }
    if (diffDays > 300) return { tier: planRaw, term: 'yearly' }
    return { tier: planRaw, term: 'monthly' }
  }

  return { tier: 'pro', term: 'monthly' }
}

function limitForTier(tier) {
  const t = cleanLower(tier)
  if (t === 'basic') return 20
  if (t === 'pro') return 75
  if (t === 'elite') return 200
  return 75
}

function cycleKey(term, now = new Date()) {
  const t = cleanLower(term)
  const yyyy = now.getUTCFullYear()
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  if (t === 'yearly') return `${yyyy}`
  if (t === 'lifetime') return `LIFE`
  return `${yyyy}-${mm}`
}

async function resolveObjectKeyFromPhotos(photoId, format) {
  const pid = String(photoId || '').trim()
  if (!pid) return null

  const fmt = normalizeFormat(format)

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id,original_key,original_raw_key,original_jpg_key')
    .eq('id', pid)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) return null

  if (fmt === 'raw') return p.original_raw_key ? String(p.original_raw_key) : null
  return p.original_jpg_key || p.original_key ? String(p.original_jpg_key || p.original_key) : null
}

async function safeInsertOrder(payload) {
  const attempt = async (obj) => supabaseAdmin.from('orders').insert(obj).select('*').maybeSingle()

  let r = await attempt(payload)
  if (!r.error) return r.data

  const msg = String(r.error.message || '').toLowerCase()
  if (msg.includes('does not exist') && msg.includes('column')) {
    const ultra = {
      id: payload.id,
      code: payload.code,
      email: payload.email,
      status: payload.status,
      paid_at: payload.paid_at,
      amount: payload.amount,
      currency: payload.currency,
      order_kind: payload.order_kind,
      photo_id: payload.photo_id,
    }
    const r2 = await attempt(ultra)
    if (!r2.error) return r2.data
    throw new Error(r2.error.message)
  }

  throw new Error(r.error.message)
}

async function ensureMemberOrder(email, tier, term) {
  const code = `MEMBER_${cycleKey(term)}_${email}`
  const existing = await supabaseAdmin.from('orders').select('*').eq('code', code).maybeSingle()
  if (!existing.error && existing.data) return existing.data

  const id = crypto.randomUUID()
  const payload = {
    id,
    code,
    email,
    status: 'PAID',
    paid_at: new Date().toISOString(),
    amount: 0,
    currency: 'LKR',
    order_kind: 'membership',
    photo_id: 'membership',
    delivery_object_key: 'membership',
    license: cleanLower(tier),
    format: cleanLower(term),
    download_limit: limitForTier(tier),
    download_count: 0,
  }
  return await safeInsertOrder(payload)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const photoId = String(req.body?.photoId || '').trim()
    const email = normalizeEmail(req.body?.email)
    const requestedFormat = normalizeFormat(req.body?.format)

    if (!photoId || !email) return res.status(400).json({ ok: false, error: 'Missing photoId or email' })
    if (!isValidEmail(email)) return res.status(400).json({ ok: false, error: 'Invalid email' })

    const sess = verifySessionFromReq(req)
    if (!sess.ok) return res.status(401).json(sess)

    const tokenEmail = normalizeEmail(sess.payload?.email)
    const deviceId = String(sess.payload?.deviceId || '').trim()
    if (!tokenEmail || tokenEmail !== email || !deviceId) {
      return res.status(401).json({
        ok: false,
        code: 'SESSION_MISMATCH',
        error: 'Session mismatch. Please sign in again.',
        cinematic: cinematicKickMessage(),
      })
    }

    const activeSession = await ensureActiveSession(email, deviceId)
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
      .select('plan,status,end_date,created_at')
      .eq('email', email)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (mErr) return res.status(500).json({ ok: false, error: mErr.message })
    if (!member) return res.status(403).json({ ok: false, error: 'Not a member' })

    const endDate = member.end_date || null
    if (endDate && new Date(endDate) < new Date()) {
      return res.status(403).json({ ok: false, error: 'Membership expired' })
    }

    const { tier, term } = resolveTierTermFromMembershipRow(member)

    const canRaw = cleanLower(tier) === 'elite'
    const format = requestedFormat === 'raw' && canRaw ? 'raw' : 'jpg'
    const ext = format === 'raw' ? 'zip' : 'jpg'

    const objectKey = await resolveObjectKeyFromPhotos(photoId, format)
    if (!objectKey) return res.status(404).json({ ok: false, error: 'File not found' })

    const memberOrder = await ensureMemberOrder(email, tier, term)

    const used = Number(memberOrder?.download_count ?? 0)
    const limit = Number(memberOrder?.download_limit ?? limitForTier(tier))
    const remaining = Math.max(0, limit - used)

    if (remaining <= 0) {
      return res.status(403).json({
        ok: false,
        error: 'Monthly download limit reached.',
        tier,
        term,
        used,
        limit,
        remaining: 0,
      })
    }

    const jti = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    const insTok = await supabaseAdmin.from('download_tokens').insert({
      jti,
      order_id: memberOrder.id,
      expires_at: expiresAt.toISOString(),
    })

    if (insTok.error) {
      console.error('download_tokens insert failed:', insTok.error.message)
      return res.status(500).json({ ok: false, error: insTok.error.message })
    }

    const token = createDownloadToken(
      {
        jti,
        orderId: memberOrder.id,
        photoId,
        format,
        objectKey,
        guestEmail: email,
        filename: `${photoId}.${ext}`,
        license: 'membership',
      },
      '1h'
    )

    return res.status(200).json({
      ok: true,
      tier,
      term,
      type: format,
      used,
      limit,
      remaining,
      url: `/api/download?token=${encodeURIComponent(token)}`,
    })
  } catch (e) {
    console.error('member/download error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}