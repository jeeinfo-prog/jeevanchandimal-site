// pages/api/member/download.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

function normalizeTier(v) {
  const x = String(v || '').trim().toLowerCase()
  return ['basic', 'pro', 'elite'].includes(x) ? x : 'pro'
}

function normalizeFormatForTier(tier) {
  // basic/pro => jpg, elite => raw
  return tier === 'elite' ? 'raw' : 'jpg'
}

// Resolve correct R2 key from photos table
async function resolveObjectKeyFromPhotos(photoId, format) {
  const pid = String(photoId || '').trim()
  if (!pid) return null

  const fmt = String(format || '').toLowerCase() === 'raw' ? 'raw' : 'jpg'

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

// Ensure a “member order” exists so /api/download can use orderId + RPC
async function ensureMemberOrder(email) {
  const code = `MEMBER_${email}`

  const existing = await supabaseAdmin.from('orders').select('*').eq('code', code).maybeSingle()
  if (!existing.error && existing.data) return existing.data

  const ins = await supabaseAdmin
    .from('orders')
    .insert({
      code,
      email,
      status: 'PAID',
      paid_at: new Date().toISOString(),
      amount: 0,
      currency: 'LKR',
      license: 'membership',
      format: 'membership',
      download_limit: 0, // 0 == unlimited in your system
    })
    .select('*')
    .maybeSingle()

  if (ins.error) throw new Error(ins.error.message)
  return ins.data
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

    if (!photoId || !email) return res.status(400).json({ ok: false, error: 'Missing photoId or email' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ ok: false, error: 'Invalid email' })

    // ✅ Prefer new membership table (from notify.js upsert)
    let tier = null

    const { data: m1, error: e1 } = await supabaseAdmin
      .from('members')
      .select('plan,status,expires_at,updated_at')
      .eq('email', email)
      .eq('status', 'active')
      .maybeSingle()

    if (e1) {
      // don’t fail yet; fallback to older table
      console.error('members lookup error:', e1.message)
    }

    if (m1) {
      if (m1.expires_at && new Date(m1.expires_at) < new Date()) {
        return res.status(403).json({ ok: false, error: 'Membership expired' })
      }
      tier = normalizeTier(m1.plan)
    } else {
      // ✅ Fallback: older memberships table (your previous implementation)
      const { data: m2, error: e2 } = await supabaseAdmin
        .from('memberships')
        .select('plan,status,end_date,created_at')
        .eq('email', email)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (e2) return res.status(500).json({ ok: false, error: e2.message })
      if (!m2) return res.status(403).json({ ok: false, error: 'Not a member' })
      if (m2.end_date && new Date(m2.end_date) < new Date()) {
        return res.status(403).json({ ok: false, error: 'Membership expired' })
      }

      const rawPlan = String(m2.plan || '').toLowerCase()
      // legacy mapping
      if (rawPlan === 'monthly') tier = 'basic'
      else if (rawPlan === 'yearly') tier = 'pro'
      else if (rawPlan === 'lifetime') tier = 'elite'
      else tier = normalizeTier(rawPlan)
    }

    if (!tier) return res.status(403).json({ ok: false, error: 'Invalid plan' })

    const format = normalizeFormatForTier(tier)
    const ext = format === 'raw' ? 'zip' : 'jpg'

    const objectKey = await resolveObjectKeyFromPhotos(photoId, format)
    if (!objectKey) return res.status(404).json({ ok: false, error: 'File not found' })

    // ✅ Ensure an order row exists for this member (so /api/download RPC can work)
    const memberOrder = await ensureMemberOrder(email)

    // ✅ One-time token row
    const jti = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    const insTok = await supabaseAdmin.from('download_tokens').insert({
      jti,
      order_id: memberOrder.id,
      expires_at: expiresAt.toISOString(),
    })

    if (insTok.error) {
      console.error('download_tokens insert failed:', insTok.error.message)
      return res.status(500).json({ ok: false, error: 'Server error' })
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
      type: format,
      url: `/api/download?token=${encodeURIComponent(token)}`,
    })
  } catch (e) {
    console.error('member/download error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}