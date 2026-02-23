// pages/api/member/download.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

function resolveTierFromMembershipPlan(plan) {
  const raw = String(plan || '').trim().toLowerCase()

  // legacy mapping (your memberships.plan currently stores monthly/yearly/lifetime)
  if (raw === 'monthly') return 'basic'
  if (raw === 'yearly') return 'pro'
  if (raw === 'lifetime') return 'elite'

  // if already a tier
  if (['basic', 'pro', 'elite'].includes(raw)) return raw

  return null
}

function formatForTier(tier) {
  // BASIC/PRO => JPG, ELITE => RAW ZIP
  return tier === 'elite' ? 'raw' : 'jpg'
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
async function ensureMemberOrder(email, membershipPlan = 'monthly') {
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
    currency: 'LKR',

    // ✅ critical: prevents "photo_id required" check constraint
    order_kind: 'membership',

    // helpful fields (only if these columns exist in your orders table)
    membership_plan: membershipPlan || null,
    membership_term: membershipPlan || null,

    // keep non-photo markers
    license: 'membership',
    format: 'membership',

    // unlimited
    download_limit: 0,
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

  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const photoId = String(req.body?.photoId || '').trim()
    const email = normalizeEmail(req.body?.email)

    if (!photoId || !email) return res.status(400).json({ ok: false, error: 'Missing photoId or email' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ ok: false, error: 'Invalid email' })

    // ✅ Membership check (your table: memberships)
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

    if (member.end_date && new Date(member.end_date) < new Date()) {
      return res.status(403).json({ ok: false, error: 'Membership expired' })
    }

    const tier = resolveTierFromMembershipPlan(member.plan)
    if (!tier) return res.status(403).json({ ok: false, error: 'Invalid plan' })

    const format = formatForTier(tier)
    const ext = format === 'raw' ? 'zip' : 'jpg'

    // ✅ Resolve object key from photos table
    const objectKey = await resolveObjectKeyFromPhotos(photoId, format)
    if (!objectKey) return res.status(404).json({ ok: false, error: 'File not found' })

    // ✅ Ensure we have a membership order row that won't violate constraints
    const membershipPlan = String(member.plan || '').trim().toLowerCase() || 'monthly'
    const memberOrder = await ensureMemberOrder(email, membershipPlan)

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
      url: `/api/download?token=${encodeURIComponent(token)}`,
    })
  } catch (e) {
    console.error('member/download error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}