// pages/api/member/status.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

function cleanLower(v) {
  return String(v || '').trim().toLowerCase()
}

function isExpired(iso) {
  if (!iso) return false
  const t = new Date(iso).getTime()
  if (!Number.isFinite(t)) return false
  return t < Date.now()
}

/**
 * Legacy compatibility:
 * Some old rows had plan = monthly/yearly/lifetime.
 * New rows have plan = basic/pro/elite and billing_cycle = monthly/yearly/lifetime.
 */
function resolveTierTermFromMembershipRow(m) {
  const planRaw = cleanLower(m?.plan)
  const cycleRaw = cleanLower(m?.billing_cycle)

  // New correct schema
  if (['basic', 'pro', 'elite'].includes(planRaw)) {
    const term = ['monthly', 'yearly', 'lifetime'].includes(cycleRaw) ? cycleRaw : 'monthly'
    return { tier: planRaw, term }
  }

  // Legacy mapping
  if (planRaw === 'monthly') return { tier: 'pro', term: 'monthly' }
  if (planRaw === 'yearly') return { tier: 'pro', term: 'yearly' }
  if (planRaw === 'lifetime') return { tier: 'pro', term: 'lifetime' }

  // fallback
  return { tier: 'pro', term: 'monthly' }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const email = normalizeEmail(req.query?.email)
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }

    // ✅ Read membership row only (NO order creation)
    const { data: m, error } = await supabaseAdmin
      .from('memberships')
      .select(
        'email, plan, status, start_date, end_date, billing_cycle, billing_cycle_start, billing_cycle_end, monthly_download_limit, monthly_download_used, created_at'
      )
      .eq('email', email)
      .maybeSingle()

    if (error) return res.status(500).json({ ok: false, error: error.message })
    if (!m) return res.status(200).json({ ok: true, member: false })

    if (cleanLower(m.status) !== 'active') {
      return res.status(200).json({ ok: true, member: false })
    }

    // Prefer billing_cycle_end; fallback end_date
    const endsAt = m.billing_cycle_end || m.end_date || null
    if (isExpired(endsAt)) {
      return res.status(200).json({ ok: true, member: false, ends_at: endsAt })
    }

    const { tier, term } = resolveTierTermFromMembershipRow(m)

    const used = Number(m.monthly_download_used ?? 0)
    const limit = Number(m.monthly_download_limit ?? 0)

    // limit=0 means unlimited
    const remaining = limit === 0 ? null : Math.max(0, limit - used)

    return res.status(200).json({
      ok: true,
      member: true,

      tier,
      term,

      used,
      limit,
      remaining,

      starts_at: m.billing_cycle_start || m.start_date || null,
      ends_at: endsAt,
    })
  } catch (e) {
    console.error('member/status error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}