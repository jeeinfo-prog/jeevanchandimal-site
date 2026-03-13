// pages/api/auth/oauth/start.js

import crypto from 'crypto'

const ALLOWED_PROVIDERS = new Set(['google'])

function cleanProvider(value) {
  return String(value || '').trim().toLowerCase()
}

function cleanNext(value) {
  const v = String(value || '').trim()
  if (!v.startsWith('/')) return '/store'
  return v
}

function cleanDeviceId(value) {
  return String(value || '').trim()
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

function makeState() {
  return crypto.randomBytes(24).toString('hex')
}

export default async function handler(req, res) {
  try {
    const provider = cleanProvider(req.query?.provider)
    const next = cleanNext(req.query?.next)
    const deviceId = cleanDeviceId(req.query?.deviceId)

    if (!ALLOWED_PROVIDERS.has(provider)) {
      return res.status(400).json({
        ok: false,
        error: 'Only Google is enabled for now',
      })
    }

    if (!deviceId) {
      return res.status(400).json({
        ok: false,
        error: 'Missing deviceId',
      })
    }

    const googleClientId = String(process.env.GOOGLE_CLIENT_ID || '').trim()

    if (!googleClientId) {
      return res.status(500).json({
        ok: false,
        error: 'Missing GOOGLE_CLIENT_ID',
      })
    }

    const state = makeState()
    const baseUrl = getBaseUrl(req)
    const redirectUri = `${baseUrl}/api/auth/oauth/callback`
    const isProd = process.env.NODE_ENV === 'production'

    const callbackCarry =
      `provider=${encodeURIComponent(provider)}` +
      `&next=${encodeURIComponent(next)}` +
      `&deviceId=${encodeURIComponent(deviceId)}`

    res.setHeader('Set-Cookie', [
      [
        `jc_oauth_state=${encodeURIComponent(state)}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        isProd ? 'Secure' : '',
        'Max-Age=600',
      ]
        .filter(Boolean)
        .join('; '),
      [
        `jc_oauth_data=${encodeURIComponent(callbackCarry)}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        isProd ? 'Secure' : '',
        'Max-Age=600',
      ]
        .filter(Boolean)
        .join('; '),
    ])

    const googleUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    googleUrl.searchParams.set('client_id', googleClientId)
    googleUrl.searchParams.set('redirect_uri', redirectUri)
    googleUrl.searchParams.set('response_type', 'code')
    googleUrl.searchParams.set('scope', 'openid email profile')
    googleUrl.searchParams.set('state', state)
    googleUrl.searchParams.set('access_type', 'offline')
    googleUrl.searchParams.set('prompt', 'consent')
    googleUrl.searchParams.set('include_granted_scopes', 'true')

    return res.redirect(302, googleUrl.toString())
  } catch (err) {
    console.error('oauth/start error', err)
    return res.status(500).json({
      ok: false,
      error: 'Server error',
    })
  }
}