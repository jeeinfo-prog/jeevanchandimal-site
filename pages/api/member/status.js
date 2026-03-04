// pages/api/member/status.js
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

const MAX_DEVICES = 2
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

function resolveTierTermFromMembershipRow(memberRow) {
  const planRaw = cleanLower(memberRow?.plan)

  if (planRaw === 'monthly') return { tier: 'basic', term: 'monthly' }
  if (planRaw === 'yearly') return { tier: 'pro', term: 'yearly' }
  if (planRaw === 'lifetime') return { tier: 'elite', term: 'lifetime' }

  if (['basic', 'pro', 'elite'].includes(planRaw)) {
    const end = memberRow?.end_date || null
    if (!end) return { tier: planRaw, term: 'monthly' }

    const now = Date.now()
    const diffDays = Math.round((new Date(end).getTime() - now) / 86400000)
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

async function countActiveSessions(email) {
  const { count, error } = await supabaseAdmin
    .from('member_sessions')
    .select('sid', { count: 'exact', head: true })
    .eq('email', email)
    .is('revoked_at', null)

  if (error) throw new Error(error.message)
  return Number(count || 0)
}

async function getOrCreateMemberOrder(email, tier, term) {
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

  const ins = await supabaseAdmin.from('orders').insert(payload).select('*').maybeSingle()
  if (ins.error) throw new Error(ins.error.message)
  return ins.data
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const email = normalizeEmail(req.query?.email)
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }

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

    const { data: member, error } = await supabaseAdmin
      .from('memberships')
      .select('plan,status,end_date,created_at')
      .eq('email', email)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) return res.status(500).json({ ok: false, error: error.message })
    if (!member) return res.status(200).json({ ok: true, member: false })

    const endDate = member.end_date || null
    if (endDate && new Date(endDate) < new Date()) {
      return res.status(200).json({ ok: true, member: false })
    }

    const { tier, term } = resolveTierTermFromMembershipRow(member)
    const order = await getOrCreateMemberOrder(email, tier, term)

    const used = Number(order?.download_count ?? 0)
    const limit = Number(order?.download_limit ?? limitForTier(tier))
    const remaining = Math.max(0, limit - used)

    const activeDevices = await countActiveSessions(email)

    return res.status(200).json({
      ok: true,
      member: true,
      tier,
      term,
      used,
      limit,
      remaining,
      ends_at: endDate,

      devices: { active: activeDevices, max: MAX_DEVICES },
    })
  } catch (e) {
    console.error('member/status error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}