// pages/api/member/status.js
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

function clean(v) {
  return String(v || '').trim()
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

function resolveTierTermFromMembershipRow(memberRow) {
  const planRaw = cleanLower(memberRow?.plan)

  // ✅ current live mapping
  if (planRaw === 'monthly') return { tier: 'pro', term: 'monthly' }

  // legacy / alternate mappings
  if (planRaw === 'yearly') return { tier: 'pro', term: 'yearly' }
  if (planRaw === 'lifetime') return { tier: 'elite', term: 'lifetime' }

  if (['basic', 'pro', 'elite'].includes(planRaw)) {
    return { tier: planRaw, term: 'monthly' }
  }

  return { tier: 'pro', term: 'monthly' }
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

async function countActiveSessions(userId) {
  const { count, error } = await supabaseAdmin
    .from('member_sessions')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .is('revoked_at', null)

  if (error) throw new Error(error.message)
  return Number(count || 0)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const email = normalizeEmail(req.query?.email)
    if (!email || !isValidEmail(email)) {
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

    const { data: member, error } = await supabaseAdmin
      .from('memberships')
      .select(
        'email,user_id,plan,status,end_date,created_at,monthly_download_limit,monthly_download_used,billing_cycle_end'
      )
      .eq('email', email)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    if (!member) {
      return res.status(200).json({ ok: true, member: false })
    }

    const endsAt = member.billing_cycle_end || member.end_date || null
    if (endsAt && new Date(endsAt) < new Date()) {
      return res.status(200).json({ ok: true, member: false })
    }

    const { tier, term } = resolveTierTermFromMembershipRow(member)

    const used = Number(member.monthly_download_used ?? 0)
    const limit = Number(member.monthly_download_limit ?? 0)
    const remaining = limit === 0 ? 0 : Math.max(0, limit - used)
    const activeDevices = await countActiveSessions(userId)

    return res.status(200).json({
      ok: true,
      member: true,
      tier,
      term,
      used,
      limit,
      remaining,
      ends_at: member.end_date || null,
      reset_at: member.billing_cycle_end || null,
      devices: { active: activeDevices, max: MAX_DEVICES },
    })
  } catch (e) {
    console.error('member/status error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}