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

function addMonths(date, months) {
  const d = new Date(date.getTime())
  const day = d.getDate()
  d.setMonth(d.getMonth() + months)
  // handle month overflow (e.g., Jan 31 -> Feb)
  if (d.getDate() < day) d.setDate(0)
  return d
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

function resolveTierFromMemberRow(member) {
  // Prefer explicit tier-like fields if present (some older schemas used license/format)
  const direct = String(member?.license || '').trim().toLowerCase()
  if (['basic', 'pro', 'elite'].includes(direct)) return direct

  // Primary: memberships.plan
  const raw = String(member?.plan || '').trim().toLowerCase()

  // ✅ IMPORTANT: your current UI sends plan='monthly' to mean PRO.
  if (raw === 'monthly') return 'pro'
  if (raw === 'yearly') return 'pro'
  if (raw === 'lifetime') return 'elite'

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
 * ✅ Create/reuse a "membership order" row in orders table.
 * IMPORTANT:
 * - Your DB has constraint requiring photo_id for photo orders
 * - So we MUST set order_kind='membership' to bypass that constraint.
 * - Your orders.id has no default, so we MUST generate UUID.
 */
async function ensureMemberOrder(email, membershipPlan = 'pro') {
  const code = `MEMBER_${email}`

  const existing = await supabaseAdmin.from('orders').select('*').eq('code', code).maybeSingle()
  if (!existing.error && existing.data) return existing.data

  const id = crypto.randomUUID()

  // Build payload that won't trigger photo-order constraints
  const payload = {
    id,
    code,
    email,
    status: 'PAID',
    paid_at: new Date().toISOString(),
    amount: 0,
    currency: 'USD',

    // ✅ critical: prevents "photo_id required" check constraint
    order_kind: 'membership',

    // legacy-ish fields (only if columns exist — safe even if ignored)
    membership_plan: membershipPlan || null,
    membership_term: 'monthly',

    // keep non-photo markers
    license: 'membership',
    format: 'membership',

    // not used for membership caps (caps enforced in memberships table)
    download_limit: 0,
    download_count: 0,

    // placeholders for NOT NULL / legacy fields if your table has them
    photo_id: 'membership',
    delivery_object_key: 'membership',
  }

  const ins = await supabaseAdmin.from('orders').insert(payload).select('*').maybeSingle()
  if (ins.error) throw new Error(ins.error.message)
  return ins.data
}

/**
 * ✅ Ensure billing cycle + used counter exists and is current.
 * Returns { used, limit } and updates DB if it resets cycle.
 */
async function ensureUsageWindow(memberRow, tier) {
  const limit = LIMITS[tier] ?? 0
  const now = new Date()

  const used0 = Number(memberRow?.monthly_download_used ?? 0)
  const startRaw = memberRow?.billing_cycle_start || memberRow?.created_at
  const start = startRaw ? new Date(startRaw) : now

  // If no start or invalid, reset
  if (!startRaw || Number.isNaN(start.getTime())) {
    await supabaseAdmin
      .from('memberships')
      .update({
        billing_cycle_start: now.toISOString(),
        monthly_download_used: 0,
        monthly_download_limit: limit,
      })
      .eq('id', memberRow.id)

    return { used: 0, limit }
  }

  const nextReset = addMonths(start, 1)
  if (now >= nextReset) {
    await supabaseAdmin
      .from('memberships')
      .update({
        billing_cycle_start: now.toISOString(),
        monthly_download_used: 0,
        monthly_download_limit: limit,
      })
      .eq('id', memberRow.id)

    return { used: 0, limit }
  }

  // keep limit stored if missing
  if (memberRow?.monthly_download_limit == null || Number(memberRow.monthly_download_limit) !== limit) {
    await supabaseAdmin.from('memberships').update({ monthly_download_limit: limit }).eq('id', memberRow.id)
  }

  return { used: Math.max(0, used0), limit }
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
    // NOTE: do NOT select columns that don't exist (tier/term/etc)
    const { data: member, error: mErr } = await supabaseAdmin
      .from('memberships')
      .select(
        'id,email,status,plan,license,format,end_date,created_at,billing_cycle_start,monthly_download_limit,monthly_download_used'
      )
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

    const tier = resolveTierFromMemberRow(member)
    if (!tier) return res.status(403).json({ ok: false, error: 'Invalid membership tier' })

    // ✅ billing cycle + cap enforcement
    const { used, limit } = await ensureUsageWindow(member, tier)
    if (limit > 0 && used >= limit) {
      return res.status(403).json({
        ok: false,
        error: 'Monthly download limit reached',
        tier,
        used,
        limit,
      })
    }

    // ✅ Determine allowed format
    const format = allowedFormatForTier(tier, requestedFormat)
    const ext = format === 'raw' ? 'zip' : 'jpg'

    // ✅ Resolve object key from photos table
    const objectKey = await resolveObjectKeyFromPhotos(photoId, format)
    if (!objectKey) return res.status(404).json({ ok: false, error: 'File not found' })

    // ✅ Ensure we have a membership order row that won't violate constraints
    const memberOrder = await ensureMemberOrder(email, tier)

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

    // ✅ increment usage (optimistic concurrency to reduce race conditions)
    const nextUsed = used + 1
    const upd = await supabaseAdmin
      .from('memberships')
      .update({ monthly_download_used: nextUsed })
      .eq('id', member.id)
      .eq('monthly_download_used', used)

    if (upd.error) {
      console.error('membership usage update failed:', upd.error.message)
      return res.status(409).json({ ok: false, error: 'Please retry download (usage updated).' })
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