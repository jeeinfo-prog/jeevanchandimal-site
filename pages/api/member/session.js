// pages/api/member/session.js
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

const MAX_DEVICES = 2
const SESSION_TTL_DAYS = 30
const SESSION_SECRET =
  process.env.MEMBER_SESSION_SECRET || process.env.DOWNLOAD_TOKEN_SECRET

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

function isUuid(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(v || '').trim()
  )
}

function nowIso() {
  return new Date().toISOString()
}

function isExpired(value) {
  if (!value) return false
  const ms = new Date(value).getTime()
  if (!Number.isFinite(ms)) return false
  return ms < Date.now()
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
  if (!SESSION_SECRET) {
    throw new Error('Missing MEMBER_SESSION_SECRET (or DOWNLOAD_TOKEN_SECRET)')
  }
  return jwt.sign(payload, SESSION_SECRET, { expiresIn })
}

function verifySessionToken(token) {
  if (!SESSION_SECRET) {
    throw new Error('Missing MEMBER_SESSION_SECRET (or DOWNLOAD_TOKEN_SECRET)')
  }
  return jwt.verify(token, SESSION_SECRET)
}

async function getActiveMembershipByEmail(email) {
  const { data, error } = await supabaseAdmin
    .from('memberships')
    .select('id,email,user_id,plan,status,end_date,created_at')
    .eq('email', email)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!data) return null

  // membership validity depends only on end_date
  if (isExpired(data.end_date)) return null

  return data
}

async function getAllActiveSessions(userId) {
  if (!isUuid(userId)) return []

  const { data, error } = await supabaseAdmin
    .from('member_sessions')
    .select('id,user_id,device_id,created_at,last_seen,revoked_at')
    .eq('user_id', userId)
    .is('revoked_at', null)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return Array.isArray(data) ? data : []
}

async function countActiveDevices(userId) {
  if (!isUuid(userId)) return 0
  const rows = await getAllActiveSessions(userId)
  const unique = new Set(rows.map((r) => clean(r.device_id)).filter(Boolean))
  return unique.size
}

async function revokeSessionsByIds(ids) {
  const cleanIds = Array.isArray(ids)
    ? ids.map((x) => clean(x)).filter(isUuid)
    : []

  if (!cleanIds.length) return

  const stamp = nowIso()

  const up = await supabaseAdmin
    .from('member_sessions')
    .update({ revoked_at: stamp, last_seen: stamp })
    .in('id', cleanIds)

  if (up.error) throw new Error(up.error.message)
}

async function cleanupDuplicateDeviceSessions(userId, deviceId) {
  if (!isUuid(userId) || !deviceId) return null

  const { data, error } = await supabaseAdmin
    .from('member_sessions')
    .select('id,user_id,device_id,created_at,last_seen,revoked_at')
    .eq('user_id', userId)
    .eq('device_id', deviceId)
    .is('revoked_at', null)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  const rows = Array.isArray(data) ? data : []
  if (rows.length <= 1) return rows[0] || null

  const keep = rows[0]

  const revokeIds = rows
    .slice(1)
    .map((r) => r.id)
    .filter(isUuid)

  if (revokeIds.length) {
    await revokeSessionsByIds(revokeIds)
  }

  return keep
}

async function touchSession(sessionId) {
  const id = clean(sessionId)
  if (!isUuid(id)) return

  const up = await supabaseAdmin
    .from('member_sessions')
    .update({ last_seen: nowIso() })
    .eq('id', id)

  if (up.error) throw new Error(up.error.message)
}

async function createSession({ userId, deviceId }) {
  const stamp = nowIso()

  const ins = await supabaseAdmin
    .from('member_sessions')
    .insert({
      user_id: userId,
      device_id: deviceId,
      created_at: stamp,
      last_seen: stamp,
      revoked_at: null,
    })
    .select('id')
    .maybeSingle()

  if (ins.error) throw new Error(ins.error.message)

  return { id: ins.data?.id, reused: false }
}

async function upsertSession({ userId, deviceId }) {
  const existing = await cleanupDuplicateDeviceSessions(userId, deviceId)

  if (existing) {
    await touchSession(existing.id)
    return { id: existing.id, reused: true }
  }

  const activeDevices = await countActiveDevices(userId)

  if (activeDevices >= MAX_DEVICES) {
    return { denied: true }
  }

  return await createSession({ userId, deviceId })
}

async function revokeOtherSessions(userId, keepDeviceId) {
  const rows = await getAllActiveSessions(userId)

  const ids = rows
    .filter((r) => clean(r.device_id) !== clean(keepDeviceId))
    .map((r) => r.id)
    .filter(isUuid)

  if (ids.length) {
    await revokeSessionsByIds(ids)
  }

  return await countActiveDevices(userId)
}

async function revokeCurrentSession(userId, deviceId) {
  const stamp = nowIso()

  const up = await supabaseAdmin
    .from('member_sessions')
    .update({ revoked_at: stamp, last_seen: stamp })
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
        return res.status(401).json({ ok:false, code:'NO_SESSION', error:'No session'})
      }

      let payload

      try {
        payload = verifySessionToken(token)
      } catch {
        return res.status(401).json({
          ok:false,
          code:'SESSION_INVALID',
          error:'Session expired. Please sign in again.',
          cinematic: cinematicKickMessage(),
        })
      }

      const email = normalizeEmail(payload?.email)
      const deviceId = clean(payload?.deviceId)
      const userId = clean(payload?.userId)

      const session = await cleanupDuplicateDeviceSessions(userId, deviceId)

      if (!session) {
        return res.status(401).json({
          ok:false,
          code:'SESSION_REVOKED',
          error:'Session closed.',
          cinematic: cinematicKickMessage(),
        })
      }

      const member = await getActiveMembershipByEmail(email)

      if (!member || clean(member.user_id) !== userId) {
        await revokeCurrentSession(userId, deviceId)
        return res.status(403).json({
          ok:false,
          code:'NOT_MEMBER',
          error:'No active membership found.',
        })
      }

      await touchSession(session.id)

      const active = await countActiveDevices(userId)

      return res.status(200).json({
        ok:true,
        email,
        active,
        max:MAX_DEVICES,
      })
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ ok:false, error:'Method not allowed'})
    }

    const action = cleanLower(req.body?.action || 'start')

    if (action === 'logout') {

      const auth = String(req.headers.authorization || '')
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''

      try {
        const payload = verifySessionToken(token)
        await revokeCurrentSession(clean(payload.userId), clean(payload.deviceId))
      } catch {}

      return res.status(200).json({ ok:true })
    }

    if (action === 'revoke_others') {

      const auth = String(req.headers.authorization || '')
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''

      const payload = verifySessionToken(token)

      const userId = clean(payload.userId)
      const deviceId = clean(payload.deviceId)

      const active = await revokeOtherSessions(userId, deviceId)

      return res.status(200).json({
        ok:true,
        active,
        max:MAX_DEVICES,
      })
    }

    const email = normalizeEmail(req.body?.email)
    const deviceId = clean(req.body?.deviceId)

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ ok:false, error:'Invalid email'})
    }

    if (!deviceId || deviceId.length < 8) {
      return res.status(400).json({ ok:false, error:'Missing deviceId'})
    }

    const member = await getActiveMembershipByEmail(email)

    if (!member) {
      return res.status(403).json({
        ok:false,
        code:'NOT_MEMBER',
        error:'No active membership found.',
      })
    }

    const userId = clean(member.user_id)

    const up = await upsertSession({ userId, deviceId })

    if (up?.denied) {
      return res.status(403).json({
        ok:false,
        code:'DEVICE_LIMIT',
        error:`Device limit reached. Maximum ${MAX_DEVICES} devices.`,
      })
    }

    const token = signSession({
      v:1,
      email,
      userId,
      deviceId,
      sessionId: up.id,
    })

    const active = await countActiveDevices(userId)

    return res.status(200).json({
      ok:true,
      token,
      email,
      active,
      max:MAX_DEVICES,
      reused: !!up?.reused,
    })
  }
  catch(e){
    console.error('member/session error:', e)
    return res.status(500).json({ ok:false, error:e?.message || 'Server error'})
  }
}