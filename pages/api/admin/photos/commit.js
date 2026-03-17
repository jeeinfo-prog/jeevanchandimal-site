import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

export const config = {
  api: {
    bodyParser: true,
  },
}

/* ---------------- helpers ---------------- */

function clean(v) {
  return String(v || '').trim()
}

function isDisabled(value, defaultValue = false) {
  const raw = clean(value).toLowerCase()
  if (!raw) return defaultValue
  return raw === 'false' || raw === '0' || raw === 'off' || raw === 'no'
}

function getEnv(name, fallback = '') {
  return clean(process.env[name]) || clean(fallback)
}

function graphVersion() {
  return getEnv('FACEBOOK_GRAPH_VERSION', 'v25.0')
}

function graphBase() {
  return `https://graph.facebook.com/${graphVersion()}`
}

function getFacebookPageId() {
  return getEnv('FACEBOOK_PAGE_ID')
}

function getFacebookPageAccessToken() {
  return getEnv('FACEBOOK_PAGE_ACCESS_TOKEN')
}

function getFacebookLongLivedUserToken() {
  return getEnv('FACEBOOK_LONG_LIVED_USER_TOKEN')
}

function getSiteBase() {
  return getEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000')
}

const FETCH_TIMEOUT_MS = 30000

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function isRetryableError(message = '') {
  const msg = clean(message).toLowerCase()
  return (
    msg.includes('timeout') ||
    msg.includes('timed out') ||
    msg.includes('temporarily unavailable') ||
    msg.includes('temporarily blocked') ||
    msg.includes('please reduce the amount of data') ||
    msg.includes('try again') ||
    msg.includes('rate limit') ||
    msg.includes('connection reset') ||
    msg.includes('network') ||
    msg.includes('failed to fetch') ||
    msg.includes('fetch failed') ||
    msg.includes('gateway') ||
    msg.includes('service unavailable')
  )
}

async function withRetry(fn, { tries = 4, baseDelayMs = 500 } = {}) {
  let lastErr

  for (let i = 0; i < tries; i++) {
    try {
      return await fn(i)
    } catch (err) {
      lastErr = err
      if (i === tries - 1) break
      if (!isRetryableError(err?.message)) break
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
    .replace(/__.+$/, '')
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

function buildInstagramCaption({ title, description, storeUrl }) {
  return [
    title,
    '',
    description || 'A cinematic moment captured in Sri Lanka.',
    '',
    `Available here: ${storeUrl}`,
    '',
    '#SriLanka #Photography #VisualStorytelling #FineArtPhotography #TravelPhotography',
  ].join('\n')
}

function buildPinterestDescription({ title, description, storeUrl }) {
  return [
    description || title,
    '',
    `Available for licensing and purchase: ${storeUrl}`,
  ].join('\n')
}

function firstNonEmpty(...vals) {
  for (const v of vals) {
    const x = clean(v)
    if (x) return x
  }
  return ''
}

async function readJsonSafe(r) {
  try {
    return await r.json()
  } catch {
    return null
  }
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    })
  } catch (err) {
    if (err?.name === 'AbortError') {
      throw new Error('Request timed out')
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

function extractGraphError(data, status) {
  const err = data?.error || {}
  const message = clean(err?.message) || `Facebook error (${status})`
  const code = clean(err?.code)
  const subcode = clean(err?.error_subcode)
  const type = clean(err?.type)

  return [message, type && `type=${type}`, code && `code=${code}`, subcode && `subcode=${subcode}`]
    .filter(Boolean)
    .join(' | ')
}

async function graphGet(path, params = {}) {
  const url = new URL(`${graphBase()}${path}`)

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, String(v))
    }
  })

  return withRetry(async () => {
    const r = await fetchWithTimeout(url.toString(), { method: 'GET' })
    const data = await readJsonSafe(r)

    if (!r.ok || data?.error) {
      throw new Error(extractGraphError(data, r.status))
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
    const r = await fetchWithTimeout(`${graphBase()}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })

    const data = await readJsonSafe(r)

    if (!r.ok || data?.error) {
      throw new Error(extractGraphError(data, r.status))
    }

    return data
  })
}

async function pinterestPost(path, bodyObj, token) {
  return withRetry(async () => {
    const r = await fetchWithTimeout(`https://api.pinterest.com/v5${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObj),
    })

    const data = await readJsonSafe(r)

    if (!r.ok || data?.code || data?.message) {
      const msg =
        data?.message ||
        data?.details ||
        data?.code ||
        `Pinterest POST error (${r.status})`
      throw new Error(msg)
    }

    return data
  })
}

/* ---------------- facebook post queue ---------------- */

let facebookPostQueue = Promise.resolve()

async function enqueueFacebookPost(task) {
  const run = facebookPostQueue.then(async () => {
    await sleep(900)
    return task()
  })

  facebookPostQueue = run.catch(() => {})
  return run
}

/* ---------------- token helpers ---------------- */

/*
Priority:
1) direct page token from env
2) derive page token from long-lived user token
*/
async function getPageToken() {
  const pageId = getFacebookPageId()

  if (!pageId) {
    throw new Error(
      'Missing FACEBOOK_PAGE_ID. Add FACEBOOK_PAGE_ID=your_page_id to .env.local and restart the Next.js server.'
    )
  }

  const directPageToken = getFacebookPageAccessToken()
  if (directPageToken) return directPageToken

  const userToken = getFacebookLongLivedUserToken()
  if (!userToken) {
    throw new Error(
      'Missing FACEBOOK_PAGE_ACCESS_TOKEN and FACEBOOK_LONG_LIVED_USER_TOKEN'
    )
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

async function getInstagramBusinessAccountId(pageToken) {
  const envIgId = getEnv('INSTAGRAM_BUSINESS_ACCOUNT_ID')
  if (envIgId) return envIgId

  const pageId = getFacebookPageId()
  if (!pageId) throw new Error('Missing FACEBOOK_PAGE_ID')

  const page = await graphGet(`/${pageId}`, {
    fields: 'instagram_business_account',
    access_token: pageToken,
  })

  const igId = clean(page?.instagram_business_account?.id)
  if (!igId) {
    throw new Error('No instagram_business_account linked to this Facebook page')
  }

  return igId
}

/* ---------------- autopost actions ---------------- */

async function autoPostToFacebook({
  photoId,
  title,
  description,
  previewUrl,
  thumbUrl,
  pageToken,
  siteBase,
}) {
  const pageId = getFacebookPageId()
  if (!pageId) throw new Error('Missing FACEBOOK_PAGE_ID')

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

  const result = await enqueueFacebookPost(() =>
    graphPost(`/${pageId}/photos`, {
      url: photoUrl,
      caption,
      access_token: pageToken,
    })
  )

  return {
    ok: true,
    postId: result?.post_id || result?.id || null,
  }
}

async function autoPostToInstagram({
  photoId,
  title,
  description,
  previewUrl,
  thumbUrl,
  pageToken,
  siteBase,
}) {
  if (isDisabled(process.env.ENABLE_INSTAGRAM_AUTOPOST, false)) {
    return {
      ok: false,
      skipped: true,
      reason: 'Instagram autopost disabled by env',
    }
  }

  const storeUrl = absoluteUrl(siteBase, `/store/${photoId}`)
  const photoUrl = absoluteUrl(siteBase, previewUrl || thumbUrl)

  if (!photoUrl) {
    throw new Error('Missing photo URL for Instagram post')
  }

  const igUserId = await getInstagramBusinessAccountId(pageToken)
  const caption = buildInstagramCaption({
    title,
    description,
    storeUrl,
  })

  const media = await graphPost(`/${igUserId}/media`, {
    image_url: photoUrl,
    caption,
    access_token: pageToken,
  })

  const creationId = clean(media?.id)
  if (!creationId) {
    throw new Error('Instagram media container creation failed')
  }

  const publish = await graphPost(`/${igUserId}/media_publish`, {
    creation_id: creationId,
    access_token: pageToken,
  })

  return {
    ok: true,
    creationId,
    mediaId: publish?.id || null,
  }
}

async function autoPostToPinterest({
  photoId,
  title,
  description,
  previewUrl,
  thumbUrl,
  siteBase,
}) {
  if (isDisabled(process.env.ENABLE_PINTEREST_AUTOPOST, false)) {
    return {
      ok: false,
      skipped: true,
      reason: 'Pinterest autopost disabled by env',
    }
  }

  const token = getEnv('PINTEREST_ACCESS_TOKEN')
  const boardId = getEnv('PINTEREST_BOARD_ID')

  if (!token) {
    throw new Error('Missing PINTEREST_ACCESS_TOKEN')
  }
  if (!boardId) {
    throw new Error('Missing PINTEREST_BOARD_ID')
  }

  const storeUrl = absoluteUrl(siteBase, `/store/${photoId}`)
  const photoUrl = absoluteUrl(siteBase, previewUrl || thumbUrl)

  if (!photoUrl) {
    throw new Error('Missing photo URL for Pinterest pin')
  }

  const payload = {
    title: title || 'Jeevan Chandimal Photography',
    description: buildPinterestDescription({
      title,
      description,
      storeUrl,
    }),
    board_id: boardId,
    media_source: {
      source_type: 'image_url',
      url: photoUrl,
    },
    link: storeUrl,
  }

  const result = await pinterestPost('/pins', payload, token)

  return {
    ok: true,
    pinId: result?.id || null,
  }
}

/* ---------------- data helpers ---------------- */

function normalizeDbTags(input) {
  if (!Array.isArray(input)) return []
  const out = []
  const seen = new Set()

  for (const raw of input) {
    const t = clean(raw).toLowerCase()
    if (!t || seen.has(t)) continue
    seen.add(t)
    out.push(t)
  }

  return out
}

function logEnvStatus() {
  console.log('[commit.js] env check', {
    FACEBOOK_PAGE_ID: !!getFacebookPageId(),
    FACEBOOK_PAGE_ACCESS_TOKEN: !!getFacebookPageAccessToken(),
    FACEBOOK_LONG_LIVED_USER_TOKEN: !!getFacebookLongLivedUserToken(),
    INSTAGRAM_BUSINESS_ACCOUNT_ID: !!getEnv('INSTAGRAM_BUSINESS_ACCOUNT_ID'),
    PINTEREST_ACCESS_TOKEN: !!getEnv('PINTEREST_ACCESS_TOKEN'),
    PINTEREST_BOARD_ID: !!getEnv('PINTEREST_BOARD_ID'),
    FACEBOOK_GRAPH_VERSION: graphVersion(),
    NEXT_PUBLIC_SITE_URL: getSiteBase(),
  })
}

/* ---------------- handler ---------------- */

export default async function handler(req, res) {
  console.log('=== COMMIT API HIT ===')
  console.log('[commit.js] FACEBOOK_PAGE_ID raw:', process.env.FACEBOOK_PAGE_ID)
  console.log('[commit.js] file marker: FINAL-COMMIT-JS-V2')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    })
  }

  try {
    logEnvStatus()

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

    const { data: existing, error: existingError } = await supabaseAdmin
      .from('photos')
      .select('*')
      .eq('id', photoId)
      .single()

    if (existingError) {
      throw new Error(existingError.message || 'Failed to load photo')
    }

    const preview_url =
      firstNonEmpty(existing?.preview_url, existing?.previewUrl) ||
      `/api/photo/${photoId}/preview?variant=standard`

    const thumb_url =
      firstNonEmpty(existing?.thumb_url, existing?.thumbUrl) ||
      `/api/photo/${photoId}/thumb`

    const title =
      firstNonEmpty(existing?.title, body.title) || fileNameToTitle(filename)

    const description =
      firstNonEmpty(existing?.description, body.description) ||
      `${title} – premium Sri Lanka photography by Jeevan Chandimal.`

    const tags = normalizeDbTags(existing?.tags || body.tags || [])

    const updatePayload = {
      status: 'published',
      title,
      description,
      preview_url,
      thumb_url,
    }

    if (tags.length) updatePayload.tags = tags

    const { data: updated, error: updateError } = await supabaseAdmin
      .from('photos')
      .update(updatePayload)
      .eq('id', photoId)
      .select()
      .single()

    if (updateError) {
      throw new Error(updateError.message || 'Failed to update photo')
    }

    const siteBase = getSiteBase()

    let pageToken = null

    let facebook = {
      ok: false,
      skipped: true,
      reason: 'Facebook autopost not attempted',
    }

    let instagram = isDisabled(process.env.ENABLE_INSTAGRAM_AUTOPOST, false)
      ? {
          ok: false,
          skipped: true,
          reason: 'Instagram autopost disabled by env',
        }
      : {
          ok: false,
          skipped: true,
          reason: 'Instagram autopost not attempted',
        }

    let pinterest = isDisabled(process.env.ENABLE_PINTEREST_AUTOPOST, false)
      ? {
          ok: false,
          skipped: true,
          reason: 'Pinterest autopost disabled by env',
        }
      : {
          ok: false,
          skipped: true,
          reason: 'Pinterest autopost not attempted',
        }

    try {
      pageToken = await getPageToken()
    } catch (err) {
      const msg = clean(err?.message) || 'Failed to resolve Facebook page token'
      facebook = { ok: false, error: msg }

      if (!instagram.skipped) {
        instagram = { ok: false, error: msg }
      }
    }

    if (pageToken) {
      try {
        facebook = await autoPostToFacebook({
          photoId,
          title,
          description,
          previewUrl: preview_url,
          thumbUrl: thumb_url,
          pageToken,
          siteBase,
        })
      } catch (err) {
        facebook = {
          ok: false,
          error: clean(err?.message) || 'Facebook post failed',
        }
      }

      if (!instagram.skipped) {
        try {
          instagram = await autoPostToInstagram({
            photoId,
            title,
            description,
            previewUrl: preview_url,
            thumbUrl: thumb_url,
            pageToken,
            siteBase,
          })
        } catch (err) {
          instagram = {
            ok: false,
            error: clean(err?.message) || 'Instagram post failed',
          }
        }
      }
    }

    if (!pinterest.skipped) {
      try {
        pinterest = await autoPostToPinterest({
          photoId,
          title,
          description,
          previewUrl: preview_url,
          thumbUrl: thumb_url,
          siteBase,
        })
      } catch (err) {
        pinterest = {
          ok: false,
          error: clean(err?.message) || 'Pinterest post failed',
        }
      }
    }

    return res.status(200).json({
      ok: true,
      photo: updated,
      thumbUrl: updated?.thumb_url || thumb_url,
      previewUrl: updated?.preview_url || preview_url,
      facebook,
      instagram,
      pinterest,
    })
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: clean(e?.message) || 'Internal server error',
    })
  }
}