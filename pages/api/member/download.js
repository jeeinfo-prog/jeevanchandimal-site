// pages/api/member/download.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const photoId = String(req.body?.photoId || '').trim()
    const email = String(req.body?.email || '').trim().toLowerCase()

    if (!photoId || !email) return res.status(400).json({ ok: false, error: 'Missing photoId or email' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ ok: false, error: 'Invalid email' })

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

    const rawPlan = String(member.plan || '').toLowerCase()

    // map payhere plans -> tiers
    let tier = null
    if (rawPlan === 'monthly') tier = 'basic'
    if (rawPlan === 'yearly') tier = 'pro'
    if (rawPlan === 'lifetime') tier = 'elite'
    if (['basic', 'pro', 'elite'].includes(rawPlan)) tier = rawPlan

    if (!tier) return res.status(403).json({ ok: false, error: 'Invalid plan' })

    // BASIC/PRO => JPG download (attachment)
    if (tier === 'basic' || tier === 'pro') {
      const token = createDownloadToken(
        {
          photoId,
          format: 'jpg',
          filename: `${photoId}.jpg`,
          guestEmail: email,
        },
        '1h'
      )

      return res.status(200).json({
        ok: true,
        tier,
        type: 'jpg',
        url: `/api/download?token=${encodeURIComponent(token)}`,
      })
    }

    // ELITE => RAW ZIP download (attachment)
    const token = createDownloadToken(
      {
        photoId,
        format: 'raw',
        filename: `${photoId}.zip`,
        guestEmail: email,
      },
      '1h'
    )

    return res.status(200).json({
      ok: true,
      tier,
      type: 'raw',
      url: `/api/download?token=${encodeURIComponent(token)}`,
    })
  } catch (e) {
    console.error('member/download error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
