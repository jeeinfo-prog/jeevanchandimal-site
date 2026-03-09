// pages/api/auth/signin.js
import { supabase } from '../../../lib/supabaseClient'

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const email = normalizeEmail(req.body?.email)
    const password = String(req.body?.password || '')

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'Email and password required' })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return res.status(401).json({ ok: false, error: error.message })
    }

    return res.status(200).json({
      ok: true,
      user: data?.user || null,
      session: data?.session ? { expires_at: data.session.expires_at } : null,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}