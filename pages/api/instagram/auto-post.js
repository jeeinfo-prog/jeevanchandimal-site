// pages/api/instagram/auto-post.js

import { logSocialPost } from '../../../lib/socialLogger'

const GRAPH_VERSION =
  process.env.FACEBOOK_GRAPH_VERSION ||
  process.env.NEXT_PUBLIC_FACEBOOK_GRAPH_VERSION ||
  'v25.0'

const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

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

function readHeaderValue(req, name) {
  const value =
    req?.headers?.[name] ||
    req?.headers?.[name.toLowerCase()] ||
    req?.headers?.[name.toUpperCase()] ||
    ''

  if (Array.isArray(value)) return value[0] || ''
  return typeof value === 'string' ? value : ''
}

async function safeJson(resp) {
  const text = await resp.text()
  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

function getAutopostSecret() {
  return clean(
    process.env.FACEBOOK_AUTOPOST_SECRET ||
      process.env.FACEBOOK_AUTPOST_SECRET
  )
}

function getInstagramBusinessAccountId() {
  return clean(
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID ||
      process.env.INSTAGRAM_ACCOUNT_ID ||
      process.env.IG_BUSINESS_ACCOUNT_ID
  )
}

function getFacebookPageAccessToken() {
  return clean(
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN ||
      process.env.FB_PAGE_ACCESS_TOKEN
  )
}

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
    throw new Error(
      clean(err?.message) ||
        clean(err?.error_user_msg) ||
        `Graph GET failed (${resp.status})`
    )
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
    throw new Error(
      clean(err?.message) ||
        clean(err?.error_user_msg) ||
        `Graph POST failed (${resp.status})`
    )
  }

  return data
}

async function resolveInstagramContext() {
  const igUserId = getInstagramBusinessAccountId()
  const token = getFacebookPageAccessToken()

  if (!igUserId) {
    throw new Error('Missing INSTAGRAM_BUSINESS_ACCOUNT_ID')
  }

  if (!token) {
    throw new Error('Missing FACEBOOK_PAGE_ACCESS_TOKEN')
  }

  return { igUserId, token }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { ok: false, error: 'Method not allowed' })
  }

  try {
    const secret = getAutopostSecret()
    const sentSecret = clean(readHeaderValue(req, 'x-autopost-secret'))

    if (secret && sentSecret !== secret) {
      return json(res, 401, { ok: false, error: 'Unauthorized' })
    }

    const body = parseBody(req)

    const photoId = clean(body.photoId)
    const imageUrl = clean(body.imageUrl)
    const caption = clean(body.caption)
    const debug = body.debug === true

    if (!imageUrl) {
      return json(res, 400, { ok: false, error: 'Missing imageUrl' })
    }

    const { igUserId, token } = await resolveInstagramContext()

    await graphGet(`/${igUserId}`, {
      fields: 'id,username',
      access_token: token,
    })

    const media = await graphPost(`/${igUserId}/media`, {
      image_url: imageUrl,
      caption,
      access_token: token,
    })

    const creationId = clean(media?.id)

    if (!creationId) {
      throw new Error('Instagram media container was not created')
    }

    const published = await graphPost(`/${igUserId}/media_publish`, {
      creation_id: creationId,
      access_token: token,
    })

    const postId = clean(published?.id)

    await logSocialPost({
      photoId,
      platform: 'instagram',
      postId,
      status: 'published',
      error: null,
      payload: body,
      response: {
        creationId,
        published,
      },
    })

    return json(res, 200, {
      ok: true,
      postId,
      creationId,
      ...(debug
        ? {
            debug: {
              igUserId,
              tokenPresent: Boolean(token),
            },
          }
        : {}),
    })
  } catch (err) {
    console.error('Instagram autopost error:', err)

    return json(res, 500, {
      ok: false,
      error: err?.message || 'Instagram auto-post failed',
    })
  }
}