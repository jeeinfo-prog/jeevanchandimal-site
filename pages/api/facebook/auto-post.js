// pages/api/facebook/auto-post.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { logSocialPost } from '../../../lib/socialLogger'

const GRAPH_VERSION =
  process.env.FACEBOOK_GRAPH_VERSION ||
  process.env.NEXT_PUBLIC_FACEBOOK_GRAPH_VERSION ||
  'v25.0'

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

function getFacebookPageId() {
  return clean(
    process.env.FACEBOOK_PAGE_ID ||
      process.env.FB_PAGE_ID ||
      process.env.FACEBOOK_TARGET_PAGE_ID
  )
}

function getFacebookSystemUserToken() {
  return clean(
    process.env.FACEBOOK_SYSTEM_USER_ACCESS_TOKEN ||
      process.env.FB_SYSTEM_USER_ACCESS_TOKEN
  )
}

/* ---------------- graph helpers ---------------- */

async function graphGet(path, params = {}) {
  const url = new URL(`${GRAPH_BASE}${path}`)

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, String(v))
    }
  })

  const resp = await fetch(url.toString(), {
    method: 'GET',
  })

  const data = await safeJson(resp)

  if (!resp.ok || data?.error) {
    const err = data?.error || {}
    const msg =
      clean(err?.message) ||
      clean(err?.error_user_msg) ||
      `Graph GET failed (${resp.status})`

    const e = new Error(msg)
    e.graph = data
    e.status = resp.status
    throw e
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
      clean(err?.message) ||
      clean(err?.error_user_msg) ||
      `Graph POST failed (${resp.status})`

    const e = new Error(msg)
    e.graph = data
    e.status = resp.status
    throw e
  }

  return data
}

/* ---------------- config + validation ---------------- */

function normalizePhotoUrl(photoUrl) {
  return clean(photoUrl)
}

async function resolveSystemUserContext() {
  const pageId = getFacebookPageId()
  const token = getFacebookSystemUserToken()

  if (!pageId) {
    throw new Error('Missing FACEBOOK_PAGE_ID')
  }

  if (!token) {
    throw new Error('Missing FACEBOOK_SYSTEM_USER_ACCESS_TOKEN')
  }

  return {
    pageId,
    token,
    source: 'FACEBOOK_SYSTEM_USER_ACCESS_TOKEN',
  }
}

async function validatePageAccess(pageId, token) {
  const page = await graphGet(`/${pageId}`, {
    fields: 'id,name',
    access_token: token,
  })

  return {
    id: clean(page?.id),
    name: clean(page?.name),
  }
}

/* ---------------- handler ---------------- */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, {
      ok: false,
      error: 'Method not allowed',
    })
  }

  try {
    const secret = getAutopostSecret()
    const sentSecret = clean(readHeaderValue(req, 'x-autopost-secret'))

    if (secret && sentSecret !== secret) {
      return json(res, 401, {
        ok: false,
        error: 'Unauthorized',
      })
    }

    const body = parseBody(req)

    const photoId = clean(body.photoId)
    const message = clean(body.message)
    const link = clean(body.link)
    const photoUrl = normalizePhotoUrl(body.photoUrl)
    const published = body.published !== false
    const debug = body.debug === true

    if (!message && !link && !photoUrl) {
      return json(res, 400, {
        ok: false,
        error: 'Nothing to post',
      })
    }

    // Duplicate protection: one published Facebook post per photo
    if (photoId) {
      const { data: existing, error: existingErr } = await supabaseAdmin
        .from('social_posts')
        .select('id, post_id, status')
        .eq('photo_id', photoId)
        .eq('platform', 'facebook')
        .eq('status', 'published')
        .limit(1)
        .maybeSingle()

      if (existingErr) {
        console.error('facebook duplicate check error:', existingErr)
      }

      if (existing) {
        return json(res, 200, {
          ok: true,
          skipped: true,
          reason: 'Already posted to Facebook',
          postId: clean(existing.post_id),
          ...(debug
            ? {
                debug: {
                  graphVersion: GRAPH_VERSION,
                  pageId: getFacebookPageId(),
                  systemUserTokenPresent: Boolean(getFacebookSystemUserToken()),
                  tokenPreview: maskToken(getFacebookSystemUserToken()),
                },
              }
            : {}),
        })
      }
    }

    const resolved = await resolveSystemUserContext()
    const page = await validatePageAccess(resolved.pageId, resolved.token)

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

    const postId = clean(result?.post_id || result?.id)

    await logSocialPost({
      photoId,
      platform: 'facebook',
      postId,
      status: 'published',
      error: null,
      payload: body,
      response: result,
    })

    return json(res, 200, {
      ok: true,
      postId,
      page,
      tokenSource: resolved.source,
      ...(debug
        ? {
            debug: {
              graphVersion: GRAPH_VERSION,
              pageId: resolved.pageId,
              pageName: page?.name || '',
              systemUserTokenPresent: Boolean(getFacebookSystemUserToken()),
              tokenPreview: maskToken(resolved.token),
              usedPhotoEndpoint: Boolean(photoUrl),
            },
          }
        : {}),
    })
  } catch (err) {
    console.error('Facebook autopost error:', err)

    return json(res, 500, {
      ok: false,
      error: err?.message || 'Facebook auto-post failed',
      ...(req?.body?.debug === true
        ? {
            debug: {
              graphVersion: GRAPH_VERSION,
              pageId: getFacebookPageId(),
              systemUserTokenPresent: Boolean(getFacebookSystemUserToken()),
              tokenPreview: maskToken(getFacebookSystemUserToken()),
              graphError: err?.graph || null,
            },
          }
        : {}),
    })
  }
}