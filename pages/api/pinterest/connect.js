// pages/api/pinterest/connect.js

export default function handler(req, res) {
  try {
    const clientId = process.env.PINTEREST_APP_ID
    const redirectUri = process.env.PINTEREST_REDIRECT_URI

    if (!clientId || !redirectUri) {
      return res.status(500).json({
        ok: false,
        error: 'Missing Pinterest env vars',
      })
    }

    // ✅ REQUIRED SCOPES (FULL AUTPOST)
    const scope = [
      'pins:read',
      'pins:write',
      'boards:read',
      'boards:write',
      'user_accounts:read',
    ].join(',')

    const authUrl =
      `https://www.pinterest.com/oauth/` +
      `?response_type=code` +
      `&client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`

    return res.redirect(authUrl)
  } catch (err) {
    console.error('Pinterest connect error:', err)

    return res.status(500).json({
      ok: false,
      error: 'Failed to initiate Pinterest OAuth',
    })
  }
}