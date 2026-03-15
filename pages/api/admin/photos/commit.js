import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

const GRAPH_VERSION = clean(process.env.FACEBOOK_GRAPH_VERSION) || 'v25.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

function clean(v) {
  return String(v || '').trim()
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function withRetry(fn, { tries = 4, baseDelayMs = 400 } = {}) {
  let lastErr

  for (let i = 0; i < tries; i++) {
    try {
      return await fn(i)
    } catch (err) {
      lastErr = err
      if (i === tries - 1) break
      await sleep(baseDelayMs * Math.pow(2, i))
    }
  }

  throw lastErr
}

function absoluteUrl(base, path) {
  const b = clean(base).replace(/\/+$/, '')
  const p = clean(path)

  if (!p) return ''
  if (/^https?:\/\//i.test(p)) return p
  if (!b) return p

  return `${b}${p.startsWith('/') ? '' : '/'}${p}`
}

function fileNameToTitle(filename) {
  const raw = clean(filename).replace(/\.[^/.]+$/, '')
  if (!raw) return 'Untitled Photo'

  return raw
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildFacebookCaption({ title, description, storeUrl }) {
  return [
    title,
    '',
    description || 'A cinematic moment captured in Sri Lanka.',
    '',
    'Available for licensing and purchase:',
    storeUrl,
    '',
    '#SriLanka #Photography #VisualStorytelling #FineArtPhotography',
  ].join('\n')
}

async function readJsonSafe(r) {
  try {
    return await r.json()
  } catch {
    return null
  }
}

async function graphGet(path, params = {}) {
  const url = new URL(`${GRAPH_BASE}${path}`)

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, String(v))
    }
  })

  return withRetry(async () => {
    const r = await fetch(url.toString(), { method: 'GET' })
    const data = await readJsonSafe(r)

    if (!r.ok || data?.error) {
      const err = data?.error || {}
      throw new Error(
        err.message ||
          `Facebook GET error (${r.status})`
      )
    }

    return data
  })
}

async function graphPost(path, form = {}) {
  const body = new URLSearchParams()

  Object.entries(form).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      body.append(k, String(v))
    }
  })

  return withRetry(async () => {
    const r = await fetch(`${GRAPH_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })

    const data = await readJsonSafe(r)

    if (!r.ok || data?.error) {
      const err = data?.error || {}
      throw new Error(
        err.message ||
          `Facebook POST error (${r.status})`
      )
    }

    return data
  })
}

/*
Priority:
1) direct page token from env
2) derive page token from long-lived user token
*/
async function getPageToken() {
  const directPageToken = clean(process.env.FACEBOOK_PAGE_ACCESS_TOKEN)
  if (directPageToken) return directPageToken

  const userToken = clean(process.env.FACEBOOK_LONG_LIVED_USER_TOKEN)
  const pageId = clean(process.env.FACEBOOK_PAGE_ID)

  if (!userToken) {
    throw new Error(
      'Missing FACEBOOK_LONG_LIVED_USER_TOKEN (or set FACEBOOK_PAGE_ACCESS_TOKEN directly)'
    )
  }

  if (!pageId) {
    throw new Error('Missing FACEBOOK_PAGE_ID')
  }

  const accounts = await graphGet('/me/accounts', {
    access_token: userToken,
  })

  const pages = Array.isArray(accounts?.data) ? accounts.data : []
  const match = pages.find((p) => clean(p.id) === pageId)

  if (!match) {
    throw new Error(`Page ${pageId} not found in /me/accounts`)
  }

  const pageToken = clean(match.access_token)
  if (!pageToken) {
    throw new Error(`No page access token returned for page ${pageId}`)
  }

  return pageToken
}

async function autoPostToFacebook({
  photoId,
  title,
  description,
  previewUrl,
  thumbUrl,
}) {
  const pageId = clean(process.env.FACEBOOK_PAGE_ID)
  if (!pageId) throw new Error('Missing FACEBOOK_PAGE_ID')

  const siteBase =
    clean(process.env.NEXT_PUBLIC_SITE_URL) || 'http://localhost:3000'

  const storeUrl = absoluteUrl(siteBase, `/store/${photoId}`)
  const photoUrl = absoluteUrl(siteBase, previewUrl || thumbUrl)

  if (!photoUrl) {
    throw new Error('Missing photo URL for Facebook post')
  }

  const caption = buildFacebookCaption({
    title,
    description,
    storeUrl,
  })

  const pageToken = await getPageToken()

  const result = await graphPost(`/${pageId}/photos`, {
    url: photoUrl,
    caption,
    access_token: pageToken,
  })

  return {
    ok: true,
    postId: result?.post_id || result?.id || null,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    })
  }

  try {
    const body = req.body || {}

    const photoId = clean(body.photoId)
    const filename = clean(body.filename)

    if (!photoId) {
      return res.status(400).json({
        ok: false,
        error: 'Missing photoId',
      })
    }

    if (!filename) {
      return res.status(400).json({
        ok: false,
        error: 'Missing filename',
      })
    }

    const preview_url = `/api/photo/${photoId}/preview?variant=standard`
    const thumb_url = `/api/photo/${photoId}/thumb`

    const title = fileNameToTitle(filename)
    const description = `${title} – premium Sri Lanka photography by Jeevan Chandimal.`

    const { data: updated, error: updateError } = await supabaseAdmin
      .from('photos')
      .update({
        status: 'published',
        title,
        description,
        preview_url,
        thumb_url,
      })
      .eq('id', photoId)
      .select()
      .single()

    if (updateError) {
      throw new Error(updateError.message || 'Failed to update photo')
    }

    let facebook = {
      ok: false,
      skipped: true,
      reason: 'Facebook autopost not attempted',
    }

    try {
      facebook = await autoPostToFacebook({
        photoId,
        title,
        description,
        previewUrl: preview_url,
        thumbUrl: thumb_url,
      })
    } catch (err) {
      facebook = {
        ok: false,
        error: clean(err?.message) || 'Facebook post failed',
      }
    }

    return res.status(200).json({
      ok: true,
      photo: updated,
      facebook,
    })
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: clean(e?.message) || 'Internal server error',
    })
  }
}