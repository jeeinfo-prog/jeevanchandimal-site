import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

export const config = {
  api: {
    bodyParser: true,
  },
}

const GRAPH_VERSION = process.env.FACEBOOK_GRAPH_VERSION || 'v25.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

/* ---------------- helpers ---------------- */

function clean(v) {
  return String(v || '').trim()
}

function getEnv(name, fallback = '') {
  return clean(process.env[name]) || clean(fallback)
}

function getSiteBase() {
  return getEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000')
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

function firstNonEmpty(...vals) {
  for (const v of vals) {
    const x = clean(v)
    if (x) return x
  }
  return ''
}

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

async function safeJson(resp) {
  const text = await resp.text()
  try {
    return { json: JSON.parse(text), text }
  } catch {
    return { json: null, text }
  }
}

function readHeader(req, name) {
  const v = req.headers?.[name]
  if (Array.isArray(v)) return v[0] || ''
  return typeof v === 'string' ? v : ''
}

function extractAccessToken(req) {
  const auth =
    readHeader(req, 'authorization') ||
    readHeader(req, 'Authorization') ||
    ''

  if (auth.startsWith('Bearer ')) return auth.slice(7)

  return (
    readHeader(req, 'x-supabase-access-token') ||
    readHeader(req, 'X-Supabase-Access-Token') ||
    ''
  )
}

function absoluteUrl(base, path) {
  const b = clean(base).replace(/\/+$/, '')
  const p = clean(path)

  if (!p) return ''
  if (/^https?:\/\//i.test(p)) return p
  if (!b) return p

  return `${b}${p.startsWith('/') ? '' : '/'}${p}`
}

function buildFacebookCaption({ title, description, storeUrl }) {
  return [title, description, storeUrl].filter(Boolean).join('\n\n')
}

/* ---------------- facebook ---------------- */

async function postToFacebook({ photoUrl, message }) {
  const pageId = getEnv('FACEBOOK_PAGE_ID')
  const token = getEnv('FACEBOOK_PAGE_ACCESS_TOKEN')

  console.log('[commit.js] FACEBOOK_PAGE_ID raw:', process.env.FACEBOOK_PAGE_ID)
  console.log('[commit.js] FACEBOOK_PAGE_ID cleaned:', pageId)
  console.log('[commit.js] FACEBOOK_PAGE_ACCESS_TOKEN exists:', !!token)

  if (!pageId) {
    return { ok: false, error: 'Missing FACEBOOK_PAGE_ID' }
  }

  if (!token) {
    return { ok: false, error: 'Missing FACEBOOK_PAGE_ACCESS_TOKEN' }
  }

  const url = `${GRAPH_BASE}/${pageId}/photos`

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: photoUrl,
      caption: message,
      access_token: token,
    }),
  })

  const { json, text } = await safeJson(resp)

  if (!resp.ok) {
    return {
      ok: false,
      error: json?.error?.message || text || 'Facebook API error',
    }
  }

  return {
    ok: true,
    postId: json?.post_id || json?.id || null,
  }
}

/* ---------------- handler ---------------- */

export default async function handler(req, res) {
  console.log('=== COMMIT API HIT ===')
  console.log('[commit.js] file marker: FINAL-COMMIT-DEBUG-V1')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    })
  }

  try {
    const token = extractAccessToken(req)

    if (!token) {
      return res.status(401).json({
        ok: false,
        error: 'Missing access token',
      })
    }

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

    /* ---------------- load existing photo ---------------- */

    const { data: existing, error: existingError } = await supabaseAdmin
      .from('photos')
      .select('*')
      .eq('id', photoId)
      .single()

    if (existingError || !existing) {
      return res.status(404).json({
        ok: false,
        error: existingError?.message || 'Photo not found',
      })
    }

    /* ---------------- finalize photo for store ---------------- */

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

    if (tags.length) {
      updatePayload.tags = tags
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from('photos')
      .update(updatePayload)
      .eq('id', photoId)
      .select()
      .single()

    if (updateError || !updated) {
      return res.status(500).json({
        ok: false,
        error: updateError?.message || 'Failed to finalize photo',
      })
    }

    /* ---------------- urls ---------------- */

    const siteBase = getSiteBase()
    const previewUrl = absoluteUrl(siteBase, updated?.preview_url || preview_url)
    const storeUrl = absoluteUrl(siteBase, `/store/${photoId}`)

    const message = buildFacebookCaption({
      title,
      description,
      storeUrl,
    })

    /* ---------------- facebook ---------------- */

    let facebook = {
      ok: false,
      skipped: true,
      reason: 'Facebook autopost not attempted',
    }

    try {
      facebook = await postToFacebook({
        photoUrl: previewUrl,
        message,
      })
    } catch (e) {
      facebook = {
        ok: false,
        error: e?.message || 'Facebook post failed',
      }
    }

    /* ---------------- response ---------------- */

    return res.status(200).json({
      ok: true,
      photo: updated,
      thumbUrl: updated?.thumb_url || thumb_url,
      previewUrl: updated?.preview_url || preview_url,
      facebook,
      instagram: {
        ok: false,
        skipped: true,
        reason: 'Instagram autopost not attempted',
      },
      pinterest: {
        ok: false,
        skipped: true,
        reason: 'Pinterest autopost not attempted',
      },
    })
  } catch (e) {
    console.error('[commit.js] Commit error:', e)

    return res.status(500).json({
      ok: false,
      error: e?.message || 'Commit failed',
    })
  }
}