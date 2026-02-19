// pages/api/member/download.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const photoId = String(req.body?.photoId || '').trim()
    const email = String(req.body?.email || '').trim().toLowerCase()

    if (!photoId || !email) {
      return res.status(400).json({ ok: false, error: 'Missing photoId or email' })
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }

    // 🔐 verify membership
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

    const plan = String(member.plan || '').toLowerCase()

    // =========================
    // 🧠 PLAN LOGIC
    // =========================
    const isElite = plan === 'elite'
    const isPro = plan === 'pro'
    const isBasic = plan === 'basic'

    if (!isElite && !isPro && !isBasic) {
      return res.status(403).json({ ok: false, error: 'Invalid plan' })
    }

    // =========================
    // 🖼 BASIC + PRO → JPG via resize.js
    // =========================
    if (!isElite) {
      const token = createDownloadToken(
        {
          photoId,
          scope: 'original',
          w: 4000,
          guestEmail: email,
        },
        '1h'
      )

      return res.status(200).json({
        ok: true,
        type: 'jpg',
        url: `/api/photo/${encodeURIComponent(photoId)}/resize?src=original&w=4000&token=${encodeURIComponent(
          token
        )}`,
      })
    }

    // =========================
    // 🧾 ELITE → RAW ZIP via raw-download
    // =========================
    const token = createDownloadToken(
      {
        photoId,
        scope: 'original',
        format: 'raw',
        filename: `${photoId}.zip`,
      },
      '1h'
    )

    return res.status(200).json({
      ok: true,
      type: 'raw',
      url: `/api/raw-download?token=${encodeURIComponent(token)}`,
    })
  } catch (e) {
    console.error('member/download error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
