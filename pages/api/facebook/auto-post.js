// pages/api/facebook/auto-post.js

const GRAPH_VERSION = 'v25.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

function maskToken(token) {
  const t = String(token || '')
  if (!t) return ''
  if (t.length <= 10) return '***'
  return `${t.slice(0, 6)}...${t.slice(-4)}`
}

function clean(v) {
  return String(v || '').trim()
}

function json(res, status, body) {
  return res.status(status).json(body)
}

function parseBody(req) {
  if (!req?.body) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body
}

async function graphGet(path, params = {}) {
  const url = new URL(`${GRAPH_BASE}${path}`)

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, String(v))
    }
  })

  const r = await fetch(url.toString(), { method: 'GET' })
  const data = await r.json().catch(() => ({}))

  if (!r.ok || data?.error) {
    const err = data?.error || {}
    const message =
      err.message ||
      err.error_user_msg ||
      `Graph GET failed (${r.status})`

    throw new Error(message)
  }

  return data
}

async function graphPost(path, form = {}) {
  const body = new URLSearchParams()

  Object.entries(form).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      body.append(k, String(v))
    }
  })

  const r = await fetch(`${GRAPH_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const data = await r.json().catch(() => ({}))

  if (!r.ok || data?.error) {
    const err = data?.error || {}
    const message =
      err.message ||
      err.error_user_msg ||
      `Graph POST failed (${r.status})`

    throw new Error(message)
  }

  return data
}

/**
 * Token priority:
 * 1) FACEBOOK_PAGE_ACCESS_TOKEN
 * 2) derive page token using FACEBOOK_LONG_LIVED_USER_TOKEN + FACEBOOK_PAGE_ID
 */
async function resolvePageAccessToken() {
  const pageId = clean(process.env.FACEBOOK_PAGE_ID)
  const directPageToken = clean(process.env.FACEBOOK_PAGE_ACCESS_TOKEN)
  const longLivedUserToken = clean(process.env.FACEBOOK_LONG_LIVED_USER_TOKEN)

  if (directPageToken) {
    if (!pageId) {
      throw new Error('Missing FACEBOOK_PAGE_ID')
    }

    return {
      token: directPageToken,
      source: 'FACEBOOK_PAGE_ACCESS_TOKEN',
      pageId,
    }
  }

  if (!pageId) {
    throw new Error('Missing FACEBOOK_PAGE_ID')
  }

  if (!longLivedUserToken) {
    throw new Error(
      'Missing token: set FACEBOOK_PAGE_ACCESS_TOKEN or FACEBOOK_LONG_LIVED_USER_TOKEN'
    )
  }

  const accounts = await graphGet('/me/accounts', {
    access_token: longLivedUserToken,
  })

  const pages = Array.isArray(accounts?.data) ? accounts.data : []
  const match = pages.find((p) => String(p?.id || '') === String(pageId))

  if (!match) {
    throw new Error(
      `Page ${pageId} not found in /me/accounts for the provided user token`
    )
  }

  if (!match.access_token) {
    throw new Error(`Missing token for page ${pageId}`)
  }

  return {
    token: match.access_token,
    source: 'derived_from_user_token',
    pageId,
  }
}

async function validatePageToken(pageId, token) {
  if (!pageId) throw new Error('Missing FACEBOOK_PAGE_ID')
  if (!token) throw new Error('Missing token')

  const page = await graphGet(`/${pageId}`, {
    fields: 'id,name',
    access_token: token,
  })

  return {
    id: page?.id || '',
    name: page?.name || '',
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, error: 'Method not allowed' })
  }

  try {
    const pageIdEnv = clean(process.env.FACEBOOK_PAGE_ID)

    // keep both to avoid breaking existing env typo
    const secret = clean(
      process.env.FACEBOOK_AUTPOST_SECRET ||
        process.env.FACEBOOK_AUTOPOST_SECRET
    )

    const sentSecret = clean(req.headers['x-autopost-secret'])
    const body = parseBody(req)

    if (secret && sentSecret !== secret) {
      return json(res, 401, { ok: false, error: 'Unauthorized' })
    }

    const {
      message,
      link,
      published = true,
      photoUrl,
      debug = false,
    } = body || {}

    const cleanMessage = clean(message)
    const cleanLink = clean(link)
    const cleanPhotoUrl = clean(photoUrl)

    if (!cleanMessage && !cleanLink && !cleanPhotoUrl) {
      return json(res, 400, {
        ok: false,
        error: 'Nothing to post. Provide message, link, or photoUrl.',
      })
    }

    const resolved = await resolvePageAccessToken()
    const finalPageId = pageIdEnv || resolved.pageId

    const page = await validatePageToken(finalPageId, resolved.token)

    let result

    if (cleanPhotoUrl) {
      result = await graphPost(`/${finalPageId}/photos`, {
        url: cleanPhotoUrl,
        caption: cleanMessage,
        published: published ? 'true' : 'false',
        access_token: resolved.token,
      })
    } else {
      result = await graphPost(`/${finalPageId}/feed`, {
        message: cleanMessage,
        link: cleanLink,
        published: published ? 'true' : 'false',
        access_token: resolved.token,
      })
    }

    return json(res, 200, {
      ok: true,
      postId: result?.post_id || result?.id || '',
      page: {
        id: page.id,
        name: page.name,
      },
      tokenSource: resolved.source,
      ...(debug
        ? {
            debug: {
              pageId: finalPageId,
              tokenPreview: maskToken(resolved.token),
            },
          }
        : {}),
    })
  } catch (err) {
    return json(res, 500, {
      ok: false,
      error: err?.message || 'Facebook auto-post failed',
    })
  }
}