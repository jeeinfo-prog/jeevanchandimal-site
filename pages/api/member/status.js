// pages/api/member/status.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const email = String(req.query.email || '').trim().toLowerCase()
    if (!email) return res.status(200).json({ ok: true, member: false })

    const { data, error } = await supabaseAdmin
      .from('memberships')
      .select('plan,status,end_date,created_at')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) return res.status(500).json({ ok: false, error: error.message })
    if (!data) return res.status(200).json({ ok: true, member: false })

    const active = String(data.status || '').toLowerCase() === 'active'
    const end = data.end_date ? new Date(data.end_date).getTime() : null
    const notExpired = end == null || end > Date.now()

    const isMember = active && notExpired

    return res.status(200).json({
      ok: true,
      member: isMember,
      plan: isMember ? data.plan : null,
      end_date: data.end_date || null,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message || 'Server error' })
  }
}
