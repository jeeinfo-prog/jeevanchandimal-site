// pages/api/auth/oauth/callback.js
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

function cleanNext(value) {
  const v = String(value || '').trim()
  if (!v.startsWith('/')) return '/store'
  return v
}

function parseCookies(req) {
  const raw = String(req.headers.cookie || '')
  const out = {}

  raw.split(';').forEach((part) => {
    const idx = part.indexOf('=')
    if (idx === -1) return
    const key = part.slice(0, idx).trim()
    const val = part.slice(idx + 1).trim()
    out[key] = decodeURIComponent(val)
  })

  return out
}

function getBaseUrl(req) {
  const envUrl = String(process.env.NEXT_PUBLIC_SITE_URL || '').trim()
  if (envUrl) return envUrl.replace(/\/+$/, '')

  const proto =
    String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim() ||
    (process.env.NODE_ENV === 'production' ? 'https' : 'http')

  const host =
    String(req.headers['x-forwarded-host'] || '').split(',')[0].trim() ||
    req.headers.host ||
    'localhost:3000'

  return `${proto}://${host}`
}

function clearCookie(name, isProd) {
  return [
    `${name}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    isProd ? 'Secure' : '',
    'Max-Age=0',
  ]
    .filter(Boolean)
    .join('; ')
}

function buildErrorRedirect(message) {
  return `/login?error=${encodeURIComponent(String(message || 'Login failed'))}`
}

function clearOauthCookies(res, isProd) {
  res.setHeader('Set-Cookie', [
    clearCookie('jc_oauth_state', isProd),
    clearCookie('jc_oauth_data', isProd),
  ])
}

function clearOauthCookiesAndRedirect(res, isProd, location) {
  clearOauthCookies(res, isProd)
  return res.redirect(302, location)
}

async function findAuthUserByEmail(email) {
  const cleanEmail = String(email || '').trim().toLowerCase()
  if (!cleanEmail) return null

  const { data, error } = await supabaseAdmin.auth.admin.listUsers()

  if (error) throw error

  const users = Array.isArray(data?.users) ? data.users : []
  return users.find((u) => String(u.email || '').trim().toLowerCase() === cleanEmail) || null
}

async function ensureSupabaseAuthUser({ email, name, picture }) {
  const cleanEmail = String(email || '').trim().toLowerCase()
  const cleanName = String(name || '').trim()
  const cleanPicture = String(picture || '').trim()

  if (!cleanEmail) {
    throw new Error('Missing email')
  }

  const existing = await findAuthUserByEmail(cleanEmail)
  if (existing?.id) {
    return { userId: existing.id, created: false }
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: cleanEmail,
    email_confirm: true,
    user_metadata: {
      full_name: cleanName || null,
      avatar_url: cleanPicture || null,
      provider: 'google',
    },
  })

  if (error) throw error
  if (!data?.user?.id) throw new Error('Could not create auth user')

  return { userId: data.user.id, created: true }
}

async function attachUserIdToMembershipIfNeeded(email, userId) {
  const cleanEmail = String(email || '').trim().toLowerCase()
  const cleanUserId = String(userId || '').trim()

  if (!cleanEmail || !cleanUserId) return

  const { data, error } = await supabaseAdmin
    .from('memberships')
    .select('id,email,user_id,status,end_date,created_at')
    .eq('email', cleanEmail)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  if (!data?.id) return

  const existingUserId = String(data.user_id || '').trim()
  if (existingUserId === cleanUserId) return

  // If membership already belongs to another auth user, do not overwrite automatically.
  if (existingUserId && existingUserId !== cleanUserId) {
    throw new Error('Membership is already linked to another user')
  }

  const { error: updateError } = await supabaseAdmin
    .from('memberships')
    .update({ user_id: cleanUserId })
    .eq('id', data.id)

  if (updateError) throw updateError
}

export default async function handler(req, res) {
  const isProd = process.env.NODE_ENV === 'production'

  try {
    const code = String(req.query?.code || '').trim()
    const state = String(req.query?.state || '').trim()
    const oauthError = String(req.query?.error || '').trim()

    if (oauthError) {
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect(`Google OAuth error: ${oauthError}`)
      )
    }

    const cookies = parseCookies(req)
    const savedState = String(cookies.jc_oauth_state || '').trim()
    const rawCarry = String(cookies.jc_oauth_data || '').trim()

    if (!state || !savedState || state !== savedState) {
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect('Invalid or missing OAuth state')
      )
    }

    if (!code) {
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect('Missing Google authorization code')
      )
    }

    if (!rawCarry) {
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect('Missing OAuth session data')
      )
    }

    const params = new URLSearchParams(rawCarry)
    const provider = String(params.get('provider') || '').trim().toLowerCase()
    const next = cleanNext(params.get('next'))
    const deviceId = String(params.get('deviceId') || '').trim()

    if (provider !== 'google') {
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect('Unsupported provider in callback')
      )
    }

    if (!deviceId) {
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect('Missing deviceId in callback data')
      )
    }

    const googleClientId = String(process.env.GOOGLE_CLIENT_ID || '').trim()
    const googleClientSecret = String(process.env.GOOGLE_CLIENT_SECRET || '').trim()
    const redirectUri = `${getBaseUrl(req)}/api/auth/oauth/callback`

    if (!googleClientId || !googleClientSecret) {
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect('Missing Google OAuth environment variables')
      )
    }

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    })

    const tokenData = await tokenRes.json().catch(() => ({}))

    if (!tokenRes.ok || !tokenData?.access_token) {
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect(
          tokenData?.error_description || tokenData?.error || 'Failed to exchange Google code'
        )
      )
    }

    const profileRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const profile = await profileRes.json().catch(() => ({}))
    const email = String(profile?.email || '').trim().toLowerCase()
    const name = String(profile?.name || '').trim()
    const picture = String(profile?.picture || '').trim()

    if (!profileRes.ok || !email) {
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect('Failed to load Google profile')
      )
    }

    let authUserId = ''

    try {
      const ensured = await ensureSupabaseAuthUser({ email, name, picture })
      authUserId = String(ensured?.userId || '').trim()
    } catch (err) {
      console.error('ensureSupabaseAuthUser error', err)
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect('Could not create your account')
      )
    }

    try {
      await attachUserIdToMembershipIfNeeded(email, authUserId)
    } catch (err) {
      console.error('attachUserIdToMembershipIfNeeded error', err)
      return clearOauthCookiesAndRedirect(
        res,
        isProd,
        buildErrorRedirect(err?.message || 'Could not link membership')
      )
    }

    const sessionRes = await fetch(`${getBaseUrl(req)}/api/member/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'start',
        email,
        deviceId,
      }),
    })

    const sessionData = await sessionRes.json().catch(() => ({}))

    if (!sessionRes.ok || !sessionData?.ok || !sessionData?.token) {
      const errMsg =
        sessionData?.code === 'DEVICE_LIMIT' && sessionData?.cinematic?.title
          ? sessionData.cinematic.title
          : sessionData?.error || 'Could not start member session'

      return clearOauthCookiesAndRedirect(res, isProd, buildErrorRedirect(errMsg))
    }

    const remaining =
      typeof sessionData.active === 'number' && typeof sessionData.max === 'number'
        ? String(Math.max(0, sessionData.max - sessionData.active))
        : ''

    clearOauthCookies(res, isProd)

    const finishUrl =
      `/auth/finish` +
      `?token=${encodeURIComponent(sessionData.token)}` +
      `&email=${encodeURIComponent(email)}` +
      `&next=${encodeURIComponent(next)}` +
      `&remaining=${encodeURIComponent(remaining)}`

    return res.redirect(302, finishUrl)
  } catch (err) {
    console.error('oauth/callback error', err)
    return clearOauthCookiesAndRedirect(
      res,
      isProd,
      buildErrorRedirect('Server error during Google sign-in')
    )
  }
}