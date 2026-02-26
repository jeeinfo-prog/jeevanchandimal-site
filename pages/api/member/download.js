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
function cleanLower(v) {
  return String(v || '').trim().toLowerCase()
}

function resolveTierTermFromMembershipRow(memberRow) {
  const planRaw = cleanLower(memberRow?.plan)

  // legacy mapping (your old memberships.plan stored monthly/yearly/lifetime)
  if (planRaw === 'monthly') return { tier: 'basic', term: 'monthly' }
  if (planRaw === 'yearly') return { tier: 'pro', term: 'yearly' }
  if (planRaw === 'lifetime') return { tier: 'elite', term: 'lifetime' }

  // new: plan stores tier
  if (['basic', 'pro', 'elite'].includes(planRaw)) {
    const end = memberRow?.end_date || memberRow?.expires_at || null
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

function normalizeFormat(v) {
  return String(v || '').trim().toLowerCase() === 'raw' ? 'raw' : 'jpg'
}

function cycleKey(term, now = new Date()) {
  const t = cleanLower(term)
  const yyyy = now.getUTCFullYear()
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  if (t === 'yearly') return `${yyyy}`
  if (t === 'lifetime') return `LIFE`
  return `${yyyy}-${mm}`
}

// ✅ Resolve correct R2 key from photos table
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

/**
 * ✅ Create/reuse a membership order row per cycle.
 * - code: MEMBER_<cycle>_<email>
 * - download_count/limit enforce the tier quota per cycle
 */
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

    // keep non-photo markers
    photo_id: 'membership',
    delivery_object_key: 'membership',

    // store membership metadata in existing fields
    license: cleanLower(tier), // tier
    format: cleanLower(term), // term

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

  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const photoId = String(req.body?.photoId || '').trim()
    const email = normalizeEmail(req.body?.email)
    const requestedFormat = normalizeFormat(req.body?.format)

    if (!photoId || !email) return res.status(400).json({ ok: false, error: 'Missing photoId or email' })
    if (!isValidEmail(email)) return res.status(400).json({ ok: false, error: 'Invalid email' })

    // ✅ Membership check (your table: memberships)
    const { data: member, error: mErr } = await supabaseAdmin
      .from('memberships')
      .select('plan,status,end_date,expires_at,created_at')
      .eq('email', email)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (mErr) return res.status(500).json({ ok: false, error: mErr.message })
    if (!member) return res.status(403).json({ ok: false, error: 'Not a member' })

    const endDate = member.end_date || member.expires_at || null
    if (endDate && new Date(endDate) < new Date()) {
      return res.status(403).json({ ok: false, error: 'Membership expired' })
    }

    const { tier, term } = resolveTierTermFromMembershipRow(member)

    // ✅ Format gating: RAW only for ELITE
    const canRaw = cleanLower(tier) === 'elite'
    const format = requestedFormat === 'raw' && canRaw ? 'raw' : 'jpg'
    const ext = format === 'raw' ? 'zip' : 'jpg'

    // ✅ Resolve object key from photos table
    const objectKey = await resolveObjectKeyFromPhotos(photoId, format)
    if (!objectKey) return res.status(404).json({ ok: false, error: 'File not found' })

    // ✅ Ensure we have a membership order row per cycle (enforces limits via download_count)
    const memberOrder = await ensureMemberOrder(email, tier, term)

    // If already exceeded, block early (even before token)
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

    // Note: used/remaining will update after /api/download consumes token (download_count increment)
    // Return current counters for UI/navbar
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