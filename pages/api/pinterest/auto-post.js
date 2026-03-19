// pages/api/pinterest/auto-post.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { logSocialPost } from '../../../lib/socialLogger'

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

function getSecret() {
  return clean(
    process.env.FACEBOOK_AUTOPOST_SECRET ||
      process.env.FACEBOOK_AUTPOST_SECRET
  )
}

function getBoardId() {
  return clean(process.env.PINTEREST_BOARD_ID)
}

async function safeJson(resp) {
  const text = await resp.text()
  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

async function getPinterestAccessToken() {
  const { data, error } = await supabaseAdmin
    .from('app_secrets')
    .select('value')
    .eq('key', 'pinterest_oauth')
    .single()

  if (error || !data?.value?.access_token) {
    throw new Error('Pinterest OAuth token not connected yet')
  }

  return clean(data.value.access_token)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { ok: false, error: 'Method not allowed' })
  }

  try {
    const secret = getSecret()
    const sentSecret = clean(readHeaderValue(req, 'x-autopost-secret'))

    if (secret && sentSecret !== secret) {
      return json(res, 401, { ok: false, error: 'Unauthorized' })
    }

    const body = parseBody(req)

    const photoId = clean(body.photoId)
    const imageUrl = clean(body.imageUrl)
    const title = clean(body.title)
    const description = clean(body.description)
    const link = clean(body.link)

    if (!imageUrl || !link) {
      return json(res, 400, {
        ok: false,
        error: 'Missing imageUrl or link',
      })
    }

    const token = await getPinterestAccessToken()
    const boardId = getBoardId()

    if (!boardId) throw new Error('Missing PINTEREST_BOARD_ID')

    const resp = await fetch('https://api.pinterest.com/v5/pins', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        board_id: boardId,
        title,
        description,
        link,
        media_source: {
          source_type: 'image_url',
          url: imageUrl,
        },
      }),
    })

    const data = await safeJson(resp)

    if (!resp.ok || data?.code || data?.message) {
      if (!resp.ok) {
        throw new Error(data?.message || `Pinterest API failed (${resp.status})`)
      }
    }

    const postId = clean(data?.id)

    await logSocialPost({
      photoId,
      platform: 'pinterest',
      postId,
      status: 'published',
      error: null,
      payload: body,
      response: data,
    })

    return json(res, 200, {
      ok: true,
      postId,
    })
  } catch (err) {
    console.error('Pinterest autopost error:', err)

    return json(res, 500, {
      ok: false,
      error: err?.message || 'Pinterest auto-post failed',
    })
  }
}