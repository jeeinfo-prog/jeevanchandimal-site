// pages/api/facebook/auto-post.js

const GRAPH_VERSION = process.env.FACEBOOK_GRAPH_VERSION || 'v25.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

/* ---------------- helpers ---------------- */

function clean(v) {
  return String(v || '').trim()
}

function json(res, status, body) {
  return res.status(status).json(body)
}

function maskToken(token) {
  const t = clean(token)
  if (!t) return ''
  if (t.length <= 12) return '***'
  return `${t.slice(0, 6)}...${t.slice(-4)}`
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

async function safeJson(resp) {
  const text = await resp.text()

  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

/* ---------------- graph helpers ---------------- */

async function graphGet(path, params = {}) {
  const url = new URL(`${GRAPH_BASE}${path}`)

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, String(v))
    }
  })

  const resp = await fetch(url.toString(), { method: 'GET' })
  const data = await safeJson(resp)

  if (!resp.ok || data?.error) {
    const err = data?.error || {}
    const msg =
      err.message ||
      err.error_user_msg ||
      `Graph GET failed (${resp.status})`

    throw new Error(msg)
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

  const resp = await fetch(`${GRAPH_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const data = await safeJson(resp)

  if (!resp.ok || data?.error) {
    const err = data?.error || {}
    const msg =
      err.message ||
      err.error_user_msg ||
      `Graph POST failed (${resp.status})`

    throw new Error(msg)
  }

  return data
}

/* ---------------- resolve page token ---------------- */

async function resolvePageAccessToken() {
  const pageId = clean(process.env.FACEBOOK_PAGE_ID)
  const pageToken = clean(process.env.FACEBOOK_PAGE_ACCESS_TOKEN)
  const userToken = clean(process.env.FACEBOOK_LONG_LIVED_USER_TOKEN)

  if (pageToken) {
    if (!pageId) throw new Error('Missing FACEBOOK_PAGE_ID')

    return {
      token: pageToken,
      pageId,
      source: 'FACEBOOK_PAGE_ACCESS_TOKEN',
    }
  }

  if (!pageId) {
    throw new Error('Missing FACEBOOK_PAGE_ID')
  }

  if (!userToken) {
    throw new Error(
      'Missing token: set FACEBOOK_PAGE_ACCESS_TOKEN or FACEBOOK_LONG_LIVED_USER_TOKEN'
    )
  }

  const accounts = await graphGet('/me/accounts', {
    access_token: userToken,
  })

  const pages = Array.isArray(accounts?.data) ? accounts.data : []

  const page = pages.find((p) => String(p?.id) === pageId)

  if (!page) {
    throw new Error(`Page ${pageId} not found in /me/accounts`)
  }

  if (!page.access_token) {
    throw new Error(`No access token for page ${pageId}`)
  }

  return {
    token: page.access_token,
    pageId,
    source: 'derived_from_user_token',
  }
}

/* ---------------- validate page ---------------- */

async function validatePageToken(pageId, token) {
  const page = await graphGet(`/${pageId}`, {
    fields: 'id,name',
    access_token: token,
  })

  return {
    id: page?.id || '',
    name: page?.name || '',
  }
}

/* ---------------- handler ---------------- */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, error: 'Method not allowed' })
  }

  try {
    const secret =
      clean(process.env.FACEBOOK_AUTPOST_SECRET) ||
      clean(process.env.FACEBOOK_AUTOPOST_SECRET)

    const sentSecret = clean(req.headers['x-autopost-secret'])

    if (secret && sentSecret !== secret) {
      return json(res, 401, { ok: false, error: 'Unauthorized' })
    }

    const body = parseBody(req)

    const message = clean(body.message)
    const link = clean(body.link)
    const photoUrl = clean(body.photoUrl)
    const published = body.published !== false
    const debug = body.debug === true

    if (!message && !link && !photoUrl) {
      return json(res, 400, {
        ok: false,
        error: 'Nothing to post',
      })
    }

    const resolved = await resolvePageAccessToken()

    const page = await validatePageToken(resolved.pageId, resolved.token)

    let result

    if (photoUrl) {
      result = await graphPost(`/${resolved.pageId}/photos`, {
        url: photoUrl,
        caption: message,
        published: published ? 'true' : 'false',
        access_token: resolved.token,
      })
    } else {
      result = await graphPost(`/${resolved.pageId}/feed`, {
        message,
        link,
        published: published ? 'true' : 'false',
        access_token: resolved.token,
      })
    }

    return json(res, 200, {
      ok: true,
      postId: result?.post_id || result?.id || '',
      page,
      tokenSource: resolved.source,
      ...(debug && {
        debug: {
          pageId: resolved.pageId,
          tokenPreview: maskToken(resolved.token),
          graphVersion: GRAPH_VERSION,
        },
      }),
    })
  } catch (err) {
    console.error('Facebook autopost error:', err)

    return json(res, 500, {
      ok: false,
      error: err?.message || 'Facebook auto-post failed',
    })
  }
}