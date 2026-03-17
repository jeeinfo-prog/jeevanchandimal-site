import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

/* ---------------- ENV (read once) ---------------- */

const FACEBOOK_PAGE_ID = (process.env.FACEBOOK_PAGE_ID || '').trim()
const FACEBOOK_PAGE_ACCESS_TOKEN = (process.env.FACEBOOK_PAGE_ACCESS_TOKEN || '').trim()
const GRAPH_VERSION = (process.env.FACEBOOK_GRAPH_VERSION || 'v25.0').trim()

const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

console.log('[commit.js] ENV FACEBOOK_PAGE_ID:', FACEBOOK_PAGE_ID)
console.log('[commit.js] ENV TOKEN EXISTS:', !!FACEBOOK_PAGE_ACCESS_TOKEN)

/* ---------------- helpers ---------------- */

function clean(v) {
  return String(v || '').trim()
}

function getSiteBase() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').trim()
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

/* ---------------- facebook ---------------- */

async function postToFacebook({ photoUrl, message }) {

  if (!FACEBOOK_PAGE_ID) {
    return { ok: false, error: 'Missing FACEBOOK_PAGE_ID' }
  }

  if (!FACEBOOK_PAGE_ACCESS_TOKEN) {
    return { ok: false, error: 'Missing FACEBOOK_PAGE_ACCESS_TOKEN' }
  }

  const url = `${GRAPH_BASE}/${FACEBOOK_PAGE_ID}/photos`

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: photoUrl,
      caption: message,
      access_token: FACEBOOK_PAGE_ACCESS_TOKEN,
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

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok:false, error:'Method not allowed' })
  }

  try {

    const token = extractAccessToken(req)

    if (!token) {
      return res.status(401).json({ ok:false, error:'Missing access token' })
    }

    const body = req.body || {}

    const photoId = clean(body.photoId)
    const filename = clean(body.filename)

    if (!photoId) {
      return res.status(400).json({ ok:false, error:'Missing photoId' })
    }

    /* ---------------- load photo ---------------- */

    const { data: photo, error } = await supabaseAdmin
      .from('photos')
      .select('*')
      .eq('id', photoId)
      .single()

    if (error || !photo) {
      return res.status(404).json({ ok:false, error:'Photo not found' })
    }

    /* ---------------- finalize photo ---------------- */

    const preview_url = photo.preview_url || `/api/photo/${photoId}/preview?variant=standard`
    const thumb_url = photo.thumb_url || `/api/photo/${photoId}/thumb`

    const title = photo.title || filename || 'Photo'
    const description = photo.description || ''

    const { error: updateError } = await supabaseAdmin
      .from('photos')
      .update({
        status:'published',
        preview_url,
        thumb_url
      })
      .eq('id', photoId)

    if (updateError) {
      return res.status(500).json({
        ok:false,
        error:updateError.message
      })
    }

    /* ---------------- urls ---------------- */

    const siteBase = getSiteBase()

    const previewUrl = `${siteBase}/api/photo/${photoId}/preview?variant=standard`
    const storeUrl = `${siteBase}/store/${photoId}`

    const message = [title, description, storeUrl]
      .filter(Boolean)
      .join('\n\n')

    /* ---------------- facebook ---------------- */

    let facebook = { skipped:true, reason:'Facebook autopost not attempted' }

    try {

      facebook = await postToFacebook({
        photoUrl: previewUrl,
        message
      })

    } catch(e) {

      facebook = {
        ok:false,
        error:e?.message || 'Facebook error'
      }

    }

    /* ---------------- response ---------------- */

    return res.status(200).json({

      ok:true,

      photo:{
        id:photoId,
        thumb_url,
        preview_url
      },

      facebook,

      instagram:{
        skipped:true,
        reason:'Instagram autopost not attempted'
      },

      pinterest:{
        skipped:true,
        reason:'Pinterest autopost not attempted'
      }

    })

  } catch(e) {

    console.error('Commit error:', e)

    return res.status(500).json({
      ok:false,
      error:e?.message || 'Commit failed'
    })
  }
}