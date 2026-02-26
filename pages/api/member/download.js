// pages/api/member/download.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

/**
 * ✅ Final tiers + limits (your chosen numbers)
 * Basic: 20 JPG / month
 * Pro: 75 JPG / month
 * Elite: 200 downloads / month + RAW access
 */
const LIMITS = {
  basic: 20,
  pro: 75,
  elite: 200,
}

function resolveTierFromMembershipPlan(plan) {
  const raw = String(plan || '').trim().toLowerCase()

  // legacy mapping (your memberships.plan currently stores monthly/yearly/lifetime)
  // ✅ You said: Pro monthly cap => monthly should be PRO
  if (raw === 'monthly') return 'pro'
  if (raw === 'yearly') return 'pro'
  if (raw === 'lifetime') return 'elite'

  // if already a tier
  if (['basic', 'pro', 'elite'].includes(raw)) return raw

  return null
}

function safeRequestedFormat(v) {
  const f = String(v || '').trim().toLowerCase()
  return f === 'raw' ? 'raw' : 'jpg'
}

function allowedFormatForTier(tier, requested) {
  // BASIC/PRO => JPG only
  if (tier === 'elite') return requested === 'raw' ? 'raw' : 'jpg'
  return 'jpg'
}

// ✅ Resolve correct R2 key from photos table
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

/**
 * ✅ Create/reuse a "membership order" row in orders table for tracking usage.
 * We use:
 * - code = MEMBER_email
 * - download_count = used this month
 * - paid_at = billing cycle start (we reset it every 30 days)
 */
async function ensureMemberOrder(email, tier) {
  const code = `MEMBER_${email}`

  const existing = await supabaseAdmin.from('orders').select('*').eq('code', code).maybeSingle()
  if (!existing.error && existing.data) return existing.data

  const id = crypto.randomUUID()
  const nowIso = new Date().toISOString()

  const payload = {
    id,
    code,
    email,
    status: 'PAID',

    // ✅ use paid_at as "cycle start"
    paid_at: nowIso,

    amount: 0,
    currency: 'USD',

    // ✅ critical: prevents "photo_id required" check constraint (your earlier logic)
    order_kind: 'membership',

    // store tier/term in existing fields (optional but helpful)
    license: tier, // basic/pro/elite
    format: 'monthly',

    // usage counters
    download_limit: Number(LIMITS[tier] ?? 0),
    download_count: 0,

    // placeholders for legacy NOT NULL columns (safe)
    photo_id: 'membership',
    delivery_object_key: 'membership',
  }

  const ins = await supabaseAdmin.from('orders').insert(payload).select('*').maybeSingle()
  if (ins.error) throw new Error(ins.error.message)
  return ins.data
}

function daysBetween(a, b) {
  const ms = Math.abs(b.getTime() - a.getTime())
  return ms / (1000 * 60 * 60 * 24)
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
    const requestedFormat = safeRequestedFormat(req.body?.format) // 'jpg' | 'raw'

    if (!photoId || !email) {
      return res.status(400).json({ ok: false, error: 'Missing photoId or email' })
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }

    // ✅ Membership check (your table: memberships)
    // IMPORTANT: do NOT select columns that don't exist (tier/license/format/etc)
    const { data: member, error: mErr } = await supabaseAdmin
      .from('memberships')
      .select('email,plan,status,end_date,created_at')
      .eq('email', email)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (mErr) return res.status(500).json({ ok: false, error: mErr.message })
    if (!member) return res.status(403).json({ ok: false, error: 'Not a member' })

    if (member.end_date && new Date(member.end_date) < new Date()) {
      return res.status(403).json({ ok: false, error: 'Membership expired' })
    }

    const tier = resolveTierFromMembershipPlan(member.plan)
    if (!tier) return res.status(403).json({ ok: false, error: 'Invalid plan' })

    // ✅ Ensure we have a membership order row that tracks usage
    let memberOrder = await ensureMemberOrder(email, tier)

    // ✅ Reset monthly window (simple 30-day cycle) using orders.paid_at as cycle start
    const now = new Date()
    const cycleStart = memberOrder.paid_at ? new Date(memberOrder.paid_at) : new Date(memberOrder.created_at || now)
    const used = Number(memberOrder.download_count ?? 0)
    const limit = Number(memberOrder.download_limit ?? LIMITS[tier] ?? 0)

    let effectiveUsed = used
    let effectiveStart = cycleStart

    if (!Number.isFinite(cycleStart.getTime()) || daysBetween(cycleStart, now) >= 30) {
      // reset cycle
      const reset = await supabaseAdmin
        .from('orders')
        .update({ download_count: 0, paid_at: now.toISOString(), download_limit: limit })
        .eq('id', memberOrder.id)
        .select('*')
        .maybeSingle()

      if (!reset.error && reset.data) {
        memberOrder = reset.data
      }

      effectiveUsed = 0
      effectiveStart = now
    }

    if (limit > 0 && effectiveUsed >= limit) {
      return res.status(403).json({
        ok: false,
        error: 'Monthly download limit reached',
        tier,
        used: effectiveUsed,
        limit,
      })
    }

    // ✅ Determine allowed format
    const format = allowedFormatForTier(tier, requestedFormat)
    const ext = format === 'raw' ? 'zip' : 'jpg'

    // ✅ Resolve object key from photos table
    const objectKey = await resolveObjectKeyFromPhotos(photoId, format)
    if (!objectKey) return res.status(404).json({ ok: false, error: 'File not found' })

    // ✅ One-time token row (required by /api/download which uses consume_download_token RPC)
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

    // ✅ Increment usage (optimistic-ish)
    const nextUsed = effectiveUsed + 1
    const upd = await supabaseAdmin
      .from('orders')
      .update({ download_count: nextUsed, download_limit: limit })
      .eq('id', memberOrder.id)
      .eq('download_count', effectiveUsed)

    if (upd.error) {
      console.error('membership orders usage update failed:', upd.error.message)
      return res.status(409).json({ ok: false, error: 'Please retry download.' })
    }

    // ✅ Build download token payload matching pages/api/download.js requirements
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
      cycle_start: effectiveStart.toISOString(),
      used: nextUsed,
      limit,
      remaining: Math.max(0, limit - nextUsed),
      url: `/api/download?token=${encodeURIComponent(token)}`,
    })
  } catch (e) {
    console.error('member/download error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}