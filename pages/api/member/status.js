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

function resolveTierTermFromMembershipRow(memberRow) {
  const planRaw = cleanLower(memberRow?.plan)

  // legacy mapping (if your old plan stored monthly/yearly/lifetime)
  if (planRaw === 'monthly') return { tier: 'basic', term: 'monthly' }
  if (planRaw === 'yearly') return { tier: 'pro', term: 'yearly' }
  if (planRaw === 'lifetime') return { tier: 'elite', term: 'lifetime' }

  // new style (plan stores tier)
  if (['basic', 'pro', 'elite'].includes(planRaw)) {
    // best-effort term inference from end_date (optional)
    const end = memberRow?.end_date || null
    if (!end) return { tier: planRaw, term: 'monthly' }

    const diffDays = Math.round((new Date(end).getTime() - Date.now()) / 86400000)
    if (diffDays > 3000) return { tier: planRaw, term: 'lifetime' }
    if (diffDays > 300) return { tier: planRaw, term: 'yearly' }
    return { tier: planRaw, term: 'monthly' }
  }

  return { tier: 'pro', term: 'monthly' }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const email = normalizeEmail(req.query?.email)
    if (!email || !isValidEmail(email)) return res.status(400).json({ ok: false, error: 'Invalid email' })

    // ✅ IMPORTANT: select ONLY columns that actually exist in memberships
    const { data: member, error } = await supabaseAdmin
      .from('memberships')
      .select('plan,status,end_date,created_at')
      .eq('email', email)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) return res.status(500).json({ ok: false, error: error.message })
    if (!member) return res.status(200).json({ ok: true, member: false })

    const endDate = member.end_date || null
    if (endDate && new Date(endDate) < new Date()) {
      return res.status(200).json({ ok: true, member: false })
    }

    const { tier, term } = resolveTierTermFromMembershipRow(member)

    // ✅ “Option C” badge: tier + term
    const plan = `${tier} ${term}` // e.g. "pro monthly"

    return res.status(200).json({
      ok: true,
      member: true,
      plan, // used by navbar badge
      tier,
      term,
      ends_at: endDate,
    })
  } catch (e) {
    console.error('member/status error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}