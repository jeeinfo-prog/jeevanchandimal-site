// pages/api/member/session.js
import crypto from 'crypto'
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

async function getActiveMembership(email) {
  const { data, error } = await supabaseAdmin
    .from('memberships')
    .select('plan,status,end_date,created_at')
    .eq('email', email)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!data) return null

  if (data.end_date && new Date(data.end_date) < new Date()) return null
  return data
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

async function findSession(email, deviceId) {
  const { data, error } = await supabaseAdmin
    .from('member_sessions')
    .select('*')
    .eq('email', email)
    .eq('device_id', deviceId)
    .is('revoked_at', null)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data || null
}

async function upsertSession({ email, deviceId, ua }) {
  const existing = await findSession(email, deviceId)
  if (existing) {
    const up = await supabaseAdmin
      .from('member_sessions')
      .update({ last_seen_at: nowIso(), user_agent: ua || existing.user_agent || null })
      .eq('sid', existing.sid)

    if (up.error) throw new Error(up.error.message)
    return { sid: existing.sid }
  }

  const active = await countActiveSessions(email)
  if (active >= MAX_DEVICES) {
    return { denied: true, code: 'DEVICE_LIMIT' }
  }

  const sid = crypto.randomUUID()
  const ins = await supabaseAdmin.from('member_sessions').insert({
    sid,
    email,
    device_id: deviceId,
    user_agent: ua || null,
    created_at: nowIso(),
    last_seen_at: nowIso(),
    revoked_at: null,
  })

  if (ins.error) throw new Error(ins.error.message)
  return { sid }
}

async function revokeOtherSessions(email, keepDeviceId) {
  const up = await supabaseAdmin
    .from('member_sessions')
    .update({ revoked_at: nowIso() })
    .eq('email', email)
    .is('revoked_at', null)
    .neq('device_id', keepDeviceId)

  if (up.error) throw new Error(up.error.message)

  const active = await countActiveSessions(email)
  return active
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  try {
    // ---------------- GET: session info (requires token)
    if (req.method === 'GET') {
      const auth = String(req.headers.authorization || '')
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
      if (!token) return res.status(401).json({ ok: false, code: 'NO_SESSION', error: 'No session' })

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
      if (!email || !deviceId) {
        return res.status(401).json({ ok: false, code: 'SESSION_INVALID', error: 'Invalid session' })
      }

      // ensure still active in DB
      const session = await findSession(email, deviceId)
      if (!session) {
        return res.status(401).json({
          ok: false,
          code: 'SESSION_REVOKED',
          error: 'Session closed.',
          cinematic: cinematicKickMessage(),
        })
      }

      // touch last seen
      await supabaseAdmin
        .from('member_sessions')
        .update({ last_seen_at: nowIso() })
        .eq('sid', session.sid)

      const active = await countActiveSessions(email)
      return res.status(200).json({ ok: true, email, active, max: MAX_DEVICES })
    }

    // ---------------- POST: start/revoke
    if (req.method !== 'POST') {
      return res.status(405).json({ ok: false, error: 'Method not allowed' })
    }

    const action = String(req.body?.action || 'start').trim().toLowerCase()

    // revoke others requires auth
    if (action === 'revoke_others') {
      const auth = String(req.headers.authorization || '')
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
      if (!token) return res.status(401).json({ ok: false, code: 'NO_SESSION', error: 'No session' })

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
      if (!email || !deviceId) return res.status(401).json({ ok: false, error: 'Invalid session' })

      const session = await findSession(email, deviceId)
      if (!session) {
        return res.status(401).json({
          ok: false,
          code: 'SESSION_REVOKED',
          error: 'Session closed.',
          cinematic: cinematicKickMessage(),
        })
      }

      const active = await revokeOtherSessions(email, deviceId)
      return res.status(200).json({ ok: true, active, max: MAX_DEVICES })
    }

    // start session
    const email = normalizeEmail(req.body?.email)
    const deviceId = clean(req.body?.deviceId)
    const ua = clean(req.body?.ua || req.headers['user-agent'] || '')

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }
    if (!deviceId || deviceId.length < 8) {
      return res.status(400).json({ ok: false, error: 'Missing deviceId' })
    }

    // must be a valid member
    const member = await getActiveMembership(email)
    if (!member) {
      return res.status(403).json({
        ok: false,
        code: 'NOT_MEMBER',
        error: 'No active membership found.',
      })
    }

    const up = await upsertSession({ email, deviceId, ua })
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

    const active = await countActiveSessions(email)

    const token = signSession({
      email,
      deviceId,
      sid: up.sid,
      v: 1,
    })

    return res.status(200).json({
      ok: true,
      token,
      email,
      active,
      max: MAX_DEVICES,
    })
  } catch (e) {
    console.error('member/session error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}