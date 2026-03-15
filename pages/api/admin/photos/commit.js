import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

const GRAPH_VERSION = 'v25.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function withRetry(fn, { tries = 4, baseDelayMs = 250 } = {}) {
  let lastErr
  for (let i = 0; i < tries; i++) {
    try {
      return await fn(i)
    } catch (e) {
      lastErr = e
      if (i === tries - 1) break
      await sleep(baseDelayMs * Math.pow(2, i))
    }
  }
  throw lastErr
}

function readHeader(req, name) {
  const v = req.headers?.[name]
  if (Array.isArray(v)) return v[0] || ''
  return typeof v === 'string' ? v : ''
}

function clean(v) {
  return String(v || '').trim()
}

function extractAccessToken(req) {
  const authHeader =
    readHeader(req, 'authorization') ||
    readHeader(req, 'Authorization') ||
    ''

  const m = authHeader.match(/^Bearer\s+(.+)$/i)
  if (m?.[1]) return m[1].trim()

  const alt =
    readHeader(req, 'x-supabase-access-token') ||
    readHeader(req, 'x-access-token') ||
    ''

  if (alt) return alt.trim()

  return ''
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

async function requireAdmin(req) {
  const token = extractAccessToken(req)

  if (!token) {
    return { ok: false, status: 401, error: 'Missing token' }
  }

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) {
    return { ok: false, status: 401, error: 'Invalid token' }
  }

  const { data: profile, error: profErr } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single()

  if (profErr || !profile) {
    return { ok: false, status: 403, error: 'No profile' }
  }

  if (profile.role !== 'admin') {
    return { ok: false, status: 403, error: 'Not admin' }
  }

  return { ok: true, user: userData.user }
}

function stripExt(name) {
  return String(name || '').replace(/\.[a-z0-9]+$/i, '')
}

function smartTitleFromFilename(filename) {
  const base = stripExt(filename)
  const left = base.split('__')[0] || base
  return left
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function smartTagsFromFilename(filename) {
  const base = stripExt(filename)
  const left = base.split('__')[0] || base
  const parts = left
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, ' ')
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .map((s) => s.trim())
    .filter(Boolean)

  const deny = new Set(['the', 'and', 'or', 'a', 'an', 'of', 'in', 'on', 'at'])
  const tags = []
  for (const p of parts) {
    if (deny.has(p)) continue
    if (p.length < 3) continue
    if (!tags.includes(p)) tags.push(p)
    if (tags.length >= 18) break
  }
  return tags
}

function absoluteUrl(base, path) {
  const b = clean(base).replace(/\/+$/, '')
  const p = clean(path)
  if (!p) return ''
  if (p.startsWith('http://') || p.startsWith('https://')) return p
  if (!b) return p
  return `${b}${p.startsWith('/') ? '' : '/'}${p}`
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

function maskToken(token) {
  const t = String(token || '')
  if (!t) return ''
  if (t.length <= 10) return '***'
  return `${t.slice(0, 6)}...${t.slice(-4)}`
}

function readFacebookEnv() {
  return {
    pageId:
      clean(process.env.FACEBOOK_PAGE_ID) ||
      clean(process.env.FB_PAGE_ID) ||
      '',
    pageAccessToken:
      clean(process.env.FACEBOOK_PAGE_ACCESS_TOKEN) ||
      clean(process.env.FB_PAGE_ACCESS_TOKEN) ||
      '',
    longLivedUserToken:
      clean(process.env.FACEBOOK_LONG_LIVED_USER_TOKEN) ||
      clean(process.env.FB_LONG_LIVED_USER_TOKEN) ||
      '',
    siteBase:
      clean(process.env.NEXT_PUBLIC_SITE_URL) ||
      clean(process.env.SITE_URL) ||
      'http://localhost:3000',
  }
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
    throw new Error(err.message || err.error_user_msg || `Graph GET failed (${r.status})`)
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
    throw new Error(err.message || err.error_user_msg || `Graph POST failed (${r.status})`)
  }

  return data
}

/**
 * Resolve page credentials safely.
 *
 * Priority:
 * 1) FACEBOOK_PAGE_ACCESS_TOKEN + FACEBOOK_PAGE_ID
 * 2) FACEBOOK_PAGE_ACCESS_TOKEN and auto-detect page id from /me
 * 3) FACEBOOK_LONG_LIVED_USER_TOKEN + FACEBOOK_PAGE_ID -> derive page token via /me/accounts
 */
async function resolveFacebookPageCredentials() {
  const env = readFacebookEnv()
  const pageId = env.pageId
  const directPageToken = env.pageAccessToken
  const longLivedUserToken = env.longLivedUserToken

  if (directPageToken && pageId) {
    return {
      pageId,
      token: directPageToken,
      source: 'FACEBOOK_PAGE_ACCESS_TOKEN',
    }
  }

  if (directPageToken && !pageId) {
    const me = await graphGet('/me', {
      fields: 'id,name',
      access_token: directPageToken,
    })

    const detectedPageId = clean(me?.id)
    if (!detectedPageId) {
      throw new Error('Could not detect page id from FACEBOOK_PAGE_ACCESS_TOKEN')
    }

    return {
      pageId: detectedPageId,
      token: directPageToken,
      source: 'FACEBOOK_PAGE_ACCESS_TOKEN:auto_page_id',
      pageName: clean(me?.name),
    }
  }

  if (!longLivedUserToken) {
    throw new Error(
      'Missing Facebook token: set FACEBOOK_PAGE_ACCESS_TOKEN or FACEBOOK_LONG_LIVED_USER_TOKEN'
    )
  }

  if (!pageId) {
    throw new Error(
      'Missing FACEBOOK_PAGE_ID: required when using FACEBOOK_LONG_LIVED_USER_TOKEN'
    )
  }

  const accounts = await graphGet('/me/accounts', {
    access_token: longLivedUserToken,
  })

  const pages = Array.isArray(accounts?.data) ? accounts.data : []
  const match = pages.find((p) => String(p?.id || '') === String(pageId))

  if (!match) {
    throw new Error(`Page ${pageId} not found in /me/accounts for the provided user token`)
  }

  if (!match.access_token) {
    throw new Error(`Missing page access token for page ${pageId}`)
  }

  return {
    pageId,
    token: match.access_token,
    source: 'derived_from_user_token',
    pageName: clean(match?.name),
  }
}

async function validatePageToken(pageId, token) {
  if (!pageId) throw new Error('Missing Facebook page id')
  if (!token) throw new Error('Missing Facebook token')

  const page = await graphGet(`/${pageId}`, {
    fields: 'id,name',
    access_token: token,
  })

  return {
    id: clean(page?.id),
    name: clean(page?.name),
  }
}

async function autoPostToFacebook({ photoId, title, description, previewUrl, thumbUrl }) {
  const env = readFacebookEnv()
  const storeUrl = absoluteUrl(env.siteBase, `/store/${encodeURIComponent(photoId)}`)
  const photoUrl = absoluteUrl(env.siteBase, previewUrl || thumbUrl || '')
  const message = buildFacebookCaption({ title, description, storeUrl })

  if (!photoUrl) {
    return {
      ok: false,
      skipped: true,
      reason: 'Missing preview/thumb URL',
    }
  }

  const resolved = await resolveFacebookPageCredentials()
  const page = await validatePageToken(resolved.pageId, resolved.token)

  const result = await graphPost(`/${resolved.pageId}/photos`, {
    url: photoUrl,
    caption: message,
    published: 'true',
    access_token: resolved.token,
  })

  return {
    ok: true,
    postId: result?.post_id || result?.id || '',
    page: {
      id: page.id,
      name: page.name,
    },
    tokenSource: resolved.source,
    debug: {
      pageId: resolved.pageId,
      tokenPreview: maskToken(resolved.token),
      storeUrl,
      photoUrl,
    },
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const env = readFacebookEnv()

  console.log('FB ENV DEBUG', {
    FACEBOOK_PAGE_ID: env.pageId || '(missing)',
    hasPageToken: !!env.pageAccessToken,
    hasLongLivedUserToken: !!env.longLivedUserToken,
    NEXT_PUBLIC_SITE_URL: env.siteBase || '(missing)',
  })

  const admin = await requireAdmin(req)
  if (!admin.ok) {
    return res.status(admin.status).json({ ok: false, error: admin.error })
  }

  try {
    const body = parseBody(req)
    const photoId = clean(body.photoId || body.id)
    let filename = clean(body.filename || body.originalFilename)

    if (!photoId) {
      return res.status(400).json({ ok: false, error: 'Missing photoId' })
    }

    const row = await withRetry(async () => {
      const { data, error } = await supabaseAdmin
        .from('photos')
        .select('id, status, original_filename, filename, original_jpg_key')
        .eq('id', photoId)
        .maybeSingle()

      if (error) throw error
      if (!data) throw new Error('Photo not found')
      return data
    })

    const originalKeyFromDb = clean(row?.original_jpg_key)

    if (!filename) {
      filename = clean(row?.original_filename || row?.filename)

      if (!filename && originalKeyFromDb) {
        filename = clean(originalKeyFromDb.split('/').pop())
      }
    }

    if (!filename) {
      return res.status(400).json({
        ok: false,
        error: 'Missing filename (not in request and not found in DB)',
        hint:
          'Send filename to commit OR ensure create-upload stores original_filename OR original_jpg_key is saved',
      })
    }

    const original_key = `photos/original/${photoId}/${filename}`

    const title = clean(body.title) || smartTitleFromFilename(filename)
    const description =
      clean(body.description) ||
      `${title} – premium Sri Lanka photography by Jeevan Chandimal. Available for licensing.`

    const tags =
      Array.isArray(body.tags) && body.tags.length > 0
        ? body.tags
        : smartTagsFromFilename(filename)

    const preview_url = `/api/photo/${encodeURIComponent(photoId)}/preview?variant=standard`
    const thumb_url = `/api/photo/${encodeURIComponent(photoId)}/thumb`

    const updatePayload = {
      status: 'published',
      title,
      description,
      tags,
      original_key,
      original_filename: filename,
      preview_url,
      thumb_url,
    }

    const { data: updated, error: upErr } = await supabaseAdmin
      .from('photos')
      .update(updatePayload)
      .eq('id', photoId)
      .select(
        'id, title, description, tags, status, original_key, original_filename, preview_url, thumb_url, created_at'
      )
      .single()

    if (upErr || !updated) {
      return res.status(500).json({ ok: false, error: upErr?.message || 'Commit failed' })
    }

    let facebook = null

    try {
      facebook = await autoPostToFacebook({
        photoId: updated.id,
        title: updated.title,
        description: updated.description,
        previewUrl: updated.preview_url,
        thumbUrl: updated.thumb_url,
      })
    } catch (fbErr) {
      facebook = {
        ok: false,
        error: fbErr?.message || 'Facebook auto-post failed',
      }
    }

    return res.status(200).json({
      ok: true,
      photo: updated,
      thumbUrl: updated?.thumb_url,
      previewUrl: updated?.preview_url,
      facebook,
    })
  } catch (e) {
    console.error('commit error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Commit failed' })
  }
}