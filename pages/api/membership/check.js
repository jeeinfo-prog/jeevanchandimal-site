import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function isExpired(endDate) {
  if (!endDate) return false
  const ms = new Date(endDate).getTime()
  if (!Number.isFinite(ms)) return false
  return ms < Date.now()
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const email = String(req.query.email || '').trim().toLowerCase()
    if (!email) {
      return res.status(400).json({ ok: false, error: 'Missing email' })
    }

    const { data, error } = await supabaseAdmin
      .from('memberships')
      .select('plan,status,end_date,created_at')
      .eq('email', email)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      return res.status(500).json({ ok: false, error: error.message || 'Database error' })
    }

    if (!data) {
      return res.status(200).json({ ok: true, member: false })
    }

    if (isExpired(data.end_date)) {
      return res.status(200).json({ ok: true, member: false })
    }

    return res.status(200).json({
      ok: true,
      member: true,
      plan: data.plan,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}