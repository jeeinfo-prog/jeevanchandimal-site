// pages/api/pinterest/callback.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function clean(v) {
  return String(v || '').trim()
}

function requireEnv(name) {
  const value = clean(process.env[name])
  if (!value) throw new Error(`Missing required env var: ${name}`)
  return value
}

async function safeJson(resp) {
  const text = await resp.text()
  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

export default async function handler(req, res) {
  try {
    const code = clean(req.query?.code)
    const error = clean(req.query?.error)

    if (error) {
      return res.status(400).send(`Pinterest OAuth error: ${error}`)
    }

    if (!code) {
      return res.status(400).send('Missing Pinterest authorization code')
    }

    const clientId = requireEnv('PINTEREST_APP_ID')
    const clientSecret = requireEnv('PINTEREST_APP_SECRET')
    const redirectUri = requireEnv('PINTEREST_REDIRECT_URI')

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const body = new URLSearchParams()
    body.set('grant_type', 'authorization_code')
    body.set('code', code)
    body.set('redirect_uri', redirectUri)

    const resp = await fetch('https://api.pinterest.com/v5/oauth/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const data = await safeJson(resp)

    if (!resp.ok || data?.error) {
      return res.status(500).json({
        ok: false,
        error: data?.message || data?.error || 'Failed to exchange Pinterest code',
        raw: data,
      })
    }

    const accessToken = clean(data?.access_token)
    const refreshToken = clean(data?.refresh_token)
    const scope = data?.scope || null
    const expiresIn = Number(data?.expires_in || 0) || null
    const refreshTokenExpiresIn =
      Number(data?.refresh_token_expires_in || 0) || null

    if (!accessToken) {
      return res.status(500).json({
        ok: false,
        error: 'Pinterest did not return an access token',
      })
    }

    const now = Date.now()
    const accessExpiresAt = expiresIn
      ? new Date(now + expiresIn * 1000).toISOString()
      : null
    const refreshExpiresAt = refreshTokenExpiresIn
      ? new Date(now + refreshTokenExpiresIn * 1000).toISOString()
      : null

    const { error: dbError } = await supabaseAdmin
      .from('app_secrets')
      .upsert(
        {
          key: 'pinterest_oauth',
          value: {
            access_token: accessToken,
            refresh_token: refreshToken || null,
            scope,
            expires_in: expiresIn,
            refresh_token_expires_in: refreshTokenExpiresIn,
            access_expires_at: accessExpiresAt,
            refresh_expires_at: refreshExpiresAt,
            updated_at: new Date().toISOString(),
          },
        },
        { onConflict: 'key' }
      )

    if (dbError) {
      return res.status(500).json({
        ok: false,
        error: `Failed to save Pinterest token: ${dbError.message}`,
      })
    }

    return res
      .status(200)
      .send('Pinterest connected successfully. You can close this tab.')
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err?.message || 'Pinterest callback failed',
    })
  }
}