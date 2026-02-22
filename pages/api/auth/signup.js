import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body || {}

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: 'Email and password required',
      })
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/login`,
      },
    })

    if (error) {
      return res.status(400).json({
        ok: false,
        error: error.message,
      })
    }

    return res.status(200).json({
      ok: true,
      user: data.user,
      needsEmailConfirm: !!data.user && !data.session,
    })
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e.message || 'Server error',
    })
  }
}