import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

const GRAPH_VERSION = 'v25.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

function clean(v) {
  return String(v || '').trim()
}

function absoluteUrl(base, path) {
  const b = clean(base).replace(/\/+$/, '')
  const p = clean(path)
  if (!p) return ''
  if (/^https?:\/\//i.test(p)) return p
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

async function graphGet(path, params = {}) {
  const url = new URL(`${GRAPH_BASE}${path}`)

  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v)
  })

  const r = await fetch(url.toString())
  const data = await r.json()

  if (!r.ok || data?.error) {
    const err = data?.error || {}
    throw new Error(err.message || 'Facebook GET error')
  }

  return data
}

async function graphPost(path, form = {}) {
  const body = new URLSearchParams()

  Object.entries(form).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') body.append(k, v)
  })

  const r = await fetch(`${GRAPH_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  const data = await r.json()

  if (!r.ok || data?.error) {
    const err = data?.error || {}
    throw new Error(err.message || 'Facebook POST error')
  }

  return data
}

/*
Derive page access token from long lived user token
*/
async function getPageToken() {
  const userToken = clean(process.env.FACEBOOK_LONG_LIVED_USER_TOKEN)
  const pageId = clean(process.env.FACEBOOK_PAGE_ID)

  if (!userToken) throw new Error('Missing FACEBOOK_LONG_LIVED_USER_TOKEN')
  if (!pageId) throw new Error('Missing FACEBOOK_PAGE_ID')

  const accounts = await graphGet('/me/accounts', {
    access_token: userToken,
  })

  const pages = accounts?.data || []
  const match = pages.find((p) => p.id === pageId)

  if (!match) {
    throw new Error(`Page ${pageId} not found in /me/accounts`)
  }

  return match.access_token
}

async function autoPostToFacebook({
  photoId,
  title,
  description,
  previewUrl,
  thumbUrl,
}) {
  const pageId = clean(process.env.FACEBOOK_PAGE_ID)

  const siteBase =
    clean(process.env.NEXT_PUBLIC_SITE_URL) ||
    'http://localhost:3000'

  const storeUrl = absoluteUrl(siteBase, `/store/${photoId}`)
  const photoUrl = absoluteUrl(siteBase, previewUrl || thumbUrl)

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
    postId: result?.post_id || result?.id,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ ok: false })

  try {
    const body = req.body || {}

    const photoId = clean(body.photoId)
    const filename = clean(body.filename)

    const preview_url = `/api/photo/${photoId}/preview?variant=standard`
    const thumb_url = `/api/photo/${photoId}/thumb`

    const title = filename.replace(/[_-]/g, ' ').replace(/\.[^/.]+$/, '')

    const description =
      `${title} – premium Sri Lanka photography by Jeevan Chandimal.`

    const { data: updated } = await supabaseAdmin
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

    let facebook = null

    try {
      facebook = await autoPostToFacebook({
        photoId,
        title,
        description,
        previewUrl: preview_url,
        thumbUrl: thumb_url,
      })
    } catch (err) {
      facebook = { ok: false, error: err.message }
    }

    return res.status(200).json({
      ok: true,
      photo: updated,
      facebook,
    })
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e.message,
    })
  }
}