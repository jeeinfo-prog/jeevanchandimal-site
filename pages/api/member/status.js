// pages/api/member/status.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const email = normalizeEmail(req.query?.email)
    if (!email) return res.status(200).json({ ok: true, member: false })

    // ✅ Prefer active membership row
    const { data, error } = await supabaseAdmin
      .from('memberships')
      .select('plan,status,end_date,created_at')
      .eq('email', email)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) return res.status(500).json({ ok: false, error: error.message })
    if (!data) return res.status(200).json({ ok: true, member: false })

    let notExpired = true
    if (data.end_date) {
      const t = new Date(data.end_date).getTime()
      notExpired = Number.isFinite(t) && t > Date.now()
    }

    const isMember = notExpired

    return res.status(200).json({
      ok: true,
      member: isMember,
      plan: isMember ? data.plan : null,
      end_date: isMember ? data.end_date || null : null,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}