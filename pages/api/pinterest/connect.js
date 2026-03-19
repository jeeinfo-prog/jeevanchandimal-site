// pages/api/pinterest/connect.js

function clean(v) {
  return String(v || '').trim()
}

function requireEnv(name) {
  const value = clean(process.env[name])
  if (!value) throw new Error(`Missing required env var: ${name}`)
  return value
}

export default async function handler(req, res) {
  try {
    const appId = requireEnv('PINTEREST_APP_ID')
    const redirectUri = requireEnv('PINTEREST_REDIRECT_URI')

    const scope = ['pins:read', 'pins:write', 'boards:read'].join(',')
    const state = Math.random().toString(36).slice(2)

    const url = new URL('https://www.pinterest.com/oauth/')
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('redirect_uri', redirectUri)
    url.searchParams.set('client_id', appId)
    url.searchParams.set('scope', scope)
    url.searchParams.set('state', state)

    return res.redirect(url.toString())
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err?.message || 'Failed to start Pinterest OAuth',
    })
  }
}