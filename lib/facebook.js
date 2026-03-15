// lib/facebook.js

const GRAPH_VERSION = 'v25.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

function requireEnv(name) {
  const value = process.env[name]
  if (!value || !String(value).trim()) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return String(value).trim()
}

export async function postPhotoToFacebookPage({
  imageUrl,
  caption,
  published = true,
}) {
  const pageId = requireEnv('FACEBOOK_PAGE_ID')
  const pageAccessToken = requireEnv('FACEBOOK_PAGE_ACCESS_TOKEN')

  if (!imageUrl || !String(imageUrl).trim()) {
    throw new Error('imageUrl is required')
  }

  const body = new URLSearchParams({
    url: String(imageUrl).trim(),
    caption: String(caption || '').trim(),
    published: published ? 'true' : 'false',
    access_token: pageAccessToken,
  })

  const res = await fetch(`${GRAPH_BASE}/${pageId}/photos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok || data?.error) {
    const message =
      data?.error?.message ||
      `Facebook API request failed with status ${res.status}`
    throw new Error(message)
  }

  return data
}
