// pages/api/member/session.js
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

const MAX_DEVICES = 2
const SESSION_TTL_DAYS = 30
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

function nowIso() {
  return new Date().toISOString()
}

function cinematicKickMessage() {
  return {
    title: 'Access paused',
    body:
      'This membership is now active on another device.\n\nFor protection, your session has been closed here. Please sign in again to continue.',
    hint: 'Tip: You can use up to 2 devices at once.',
  }
}

function signSession(payload, expiresIn = `${SESSION_TTL_DAYS}d`) {
  if (!SESSION_SECRET) throw new Error('Missing MEMBER_SESSION_SECRET (or DOWNLOAD_TOKEN_SECRET)')
  return jwt.sign(payload, SESSION_SECRET, { expiresIn })
}

function verifySessionToken(token) {
  if (!SESSION_SECRET) throw new Error('Missing MEMBER_SESSION_SECRET (or DOWNLOAD_TOKEN_SECRET)')
  return jwt.verify(token, SESSION_SECRET)
}

async function getActiveMembershipByEmail(email) {
  const { data, error } = await supabaseAdmin
    .from('memberships')
    .select('id,email,user_id,plan,status,end_date,billing_cycle_end,created_at')
    .eq('email', email)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!data) return null

  const endsAt = data.billing_cycle_end || data.end_date || null
  if (endsAt && new Date(endsAt) < new Date()) return null

  if (!data.user_id) {
    throw new Error('memberships.user_id is NULL for this member (required).')
  }

  return data
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

async function findSession(userId, deviceId) {
  const { data, error } = await supabaseAdmin
    .from('member_sessions')
    .select('id,user_id,device_id,revoked_at')
    .eq('user_id', userId)
    .eq('device_id', deviceId)
    .is('revoked_at', null)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data || null
}

async function touchSession(sessionId) {
  const up = await supabaseAdmin
    .from('member_sessions')
    .update({ last_seen: nowIso() })
    .eq('id', sessionId)

  if (up.error) throw new Error(up.error.message)
}

async function createSession({ userId, deviceId }) {
  const ins = await supabaseAdmin
    .from('member_sessions')
    .insert({
      user_id: userId,
      device_id: deviceId,
      created_at: nowIso(),
      last_seen: nowIso(),
      revoked_at: null,
    })
    .select('id')
    .maybeSingle()

  if (ins.error) throw new Error(ins.error.message)
  return { id: ins.data?.id }
}

async function upsertSession({ userId, deviceId }) {
  const existing = await findSession(userId, deviceId)
  if (existing) {
    await touchSession(existing.id)
    return { id: existing.id, reused: true }
  }

  const active = await countActiveSessions(userId)
  if (active >= MAX_DEVICES) return { denied: true }

  return await createSession({ userId, deviceId })
}

async function revokeOtherSessions(userId, keepDeviceId) {
  const up = await supabaseAdmin
    .from('member_sessions')
    .update({ revoked_at: nowIso() })
    .eq('user_id', userId)
    .is('revoked_at', null)
    .neq('device_id', keepDeviceId)

  if (up.error) throw new Error(up.error.message)
  return await countActiveSessions(userId)
}

async function revokeCurrentSession(userId, deviceId) {
  const up = await supabaseAdmin
    .from('member_sessions')
    .update({ revoked_at: nowIso() })
    .eq('user_id', userId)
    .eq('device_id', deviceId)
    .is('revoked_at', null)

  if (up.error) throw new Error(up.error.message)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  try {
    if (req.method === 'GET') {
      const auth = String(req.headers.authorization || '')
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
      if (!token) {
        return res.status(401).json({ ok: false, code: 'NO_SESSION', error: 'No session' })
      }

      let payload
      try {
        payload = verifySessionToken(token)
      } catch {
        return res.status(401).json({
          ok: false,
          code: 'SESSION_INVALID',
          error: 'Session expired. Please sign in again.',
          cinematic: cinematicKickMessage(),
        })
      }

      const email = normalizeEmail(payload?.email)
      const deviceId = clean(payload?.deviceId)
      const userId = clean(payload?.userId)

      if (!email || !deviceId || !userId) {
        return res.status(401).json({
          ok: false,
          code: 'SESSION_INVALID',
          error: 'Invalid session',
        })
      }

      const session = await findSession(userId, deviceId)
      if (!session) {
        return res.status(401).json({
          ok: false,
          code: 'SESSION_REVOKED',
          error: 'Session closed.',
          cinematic: cinematicKickMessage(),
        })
      }

      await touchSession(session.id)

      const active = await countActiveSessions(userId)
      return res.status(200).json({ ok: true, email, active, max: MAX_DEVICES })
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ ok: false, error: 'Method not allowed' })
    }

    const action = String(req.body?.action || 'start').trim().toLowerCase()

    if (action === 'logout') {
      const auth = String(req.headers.authorization || '')
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
      if (!token) {
        return res.status(401).json({ ok: false, code: 'NO_SESSION', error: 'No session' })
      }

      let payload
      try {
        payload = verifySessionToken(token)
      } catch {
        return res.status(200).json({ ok: true })
      }

      const userId = clean(payload?.userId)
      const deviceId = clean(payload?.deviceId)

      if (userId && deviceId) {
        await revokeCurrentSession(userId, deviceId)
      }

      return res.status(200).json({ ok: true })
    }

    if (action === 'revoke_others') {
      const auth = String(req.headers.authorization || '')
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
      if (!token) {
        return res.status(401).json({ ok: false, code: 'NO_SESSION', error: 'No session' })
      }

      let payload
      try {
        payload = verifySessionToken(token)
      } catch {
        return res.status(401).json({
          ok: false,
          code: 'SESSION_INVALID',
          error: 'Session expired. Please sign in again.',
          cinematic: cinematicKickMessage(),
        })
      }

      const userId = clean(payload?.userId)
      const deviceId = clean(payload?.deviceId)

      if (!userId || !deviceId) {
        return res.status(401).json({ ok: false, error: 'Invalid session' })
      }

      const session = await findSession(userId, deviceId)
      if (!session) {
        return res.status(401).json({
          ok: false,
          code: 'SESSION_REVOKED',
          error: 'Session closed.',
          cinematic: cinematicKickMessage(),
        })
      }

      const active = await revokeOtherSessions(userId, deviceId)
      return res.status(200).json({ ok: true, active, max: MAX_DEVICES })
    }

    const email = normalizeEmail(req.body?.email)
    const deviceId = clean(req.body?.deviceId)

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }

    if (!deviceId || deviceId.length < 8) {
      return res.status(400).json({ ok: false, error: 'Missing deviceId' })
    }

    const member = await getActiveMembershipByEmail(email)
    if (!member) {
      return res.status(403).json({
        ok: false,
        code: 'NOT_MEMBER',
        error: 'No active membership found.',
      })
    }

    const up = await upsertSession({ userId: member.user_id, deviceId })
    if (up?.denied) {
      return res.status(403).json({
        ok: false,
        code: 'DEVICE_LIMIT',
        error: `Device limit reached. Maximum ${MAX_DEVICES} devices.`,
        cinematic: {
          title: 'Two devices already active',
          body:
            'For protection, memberships can be used on up to 2 devices at once.\n\nTo continue, sign out one device (or use “Sign out other devices” on a device that’s already signed in).',
          hint: 'This keeps your membership private — no sharing.',
        },
      })
    }

    const active = await countActiveSessions(member.user_id)

    const token = signSession({
      v: 1,
      email,
      userId: member.user_id,
      deviceId,
      sessionId: up.id,
    })

    return res.status(200).json({ ok: true, token, email, active, max: MAX_DEVICES })
  } catch (e) {
    console.error('member/session error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}