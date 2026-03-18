// lib/autoPublish.js

import { generateCaption } from './aiCaptionGenerator'
import { normalizeSocialResult } from './socialResult'
import { logSocialPost } from './socialLogger'

function clean(v) {
  return String(v || '').trim()
}

function getAutopostSecret() {
  return clean(
    process.env.FACEBOOK_AUTOPOST_SECRET ||
      process.env.FACEBOOK_AUTPOST_SECRET
  )
}

async function safeJson(resp) {
  const text = await resp.text()

  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

async function postInternalJson(url, body, { includeSecret = true } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (includeSecret) {
    const secret = getAutopostSecret()
    if (secret) {
      headers['x-autopost-secret'] = secret
    }
  }

  const resp = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body || {}),
  })

  const data = await safeJson(resp)

  if (!resp.ok) {
    return {
      ok: false,
      error:
        clean(data?.error) ||
        clean(data?.message) ||
        `Request failed (${resp.status})`,
      status: resp.status,
      raw: data,
    }
  }

  return data
}

async function safeLogSocialPost(entry) {
  try {
    await logSocialPost(entry)
  } catch (e) {
    console.error('logSocialPost failed:', e)
  }
}

export async function runAutoPublishing({
  siteBase,
  photoId,
  previewUrl,
  storeUrl,
  title,
  description,
}) {
  const base = clean(siteBase)
  const imageUrl = clean(previewUrl)
  const safeStoreUrl = clean(storeUrl)
  const safeTitle = clean(title)
  const safeDescription = clean(description)

  if (!base) {
    return {
      facebook: normalizeSocialResult({
        ok: false,
        error: 'Missing siteBase',
      }),
      instagram: normalizeSocialResult({
        ok: false,
        error: 'Missing siteBase',
      }),
      pinterest: normalizeSocialResult({
        ok: false,
        error: 'Missing siteBase',
      }),
    }
  }

  if (!photoId) {
    return {
      facebook: normalizeSocialResult({
        ok: false,
        error: 'Missing photoId',
      }),
      instagram: normalizeSocialResult({
        ok: false,
        error: 'Missing photoId',
      }),
      pinterest: normalizeSocialResult({
        ok: false,
        error: 'Missing photoId',
      }),
    }
  }

  if (!imageUrl) {
    return {
      facebook: normalizeSocialResult({
        ok: false,
        error: 'Missing previewUrl',
      }),
      instagram: normalizeSocialResult({
        ok: false,
        error: 'Missing previewUrl',
      }),
      pinterest: normalizeSocialResult({
        ok: false,
        error: 'Missing previewUrl',
      }),
    }
  }

  const caption = generateCaption({
    title: safeTitle,
    description: safeDescription,
    storeUrl: safeStoreUrl,
    photoId,
  })

  const results = {}

  /* FACEBOOK */
  try {
    const payload = {
      message: caption,
      photoUrl: imageUrl,
    }

    const raw = await postInternalJson(`${base}/api/facebook/auto-post`, payload)
    const normalized = normalizeSocialResult(raw)

    results.facebook = normalized

    await safeLogSocialPost({
      photoId,
      platform: 'facebook',
      postId: normalized.postId,
      status: normalized.ok
        ? 'published'
        : normalized.skipped
          ? 'skipped'
          : 'failed',
      error: normalized.error || null,
      payload,
      response: raw,
    })
  } catch (e) {
    const normalized = normalizeSocialResult({
      ok: false,
      error: e?.message || 'Facebook auto-post failed',
    })

    results.facebook = normalized

    await safeLogSocialPost({
      photoId,
      platform: 'facebook',
      postId: null,
      status: 'failed',
      error: normalized.error,
      payload: {
        message: caption,
        photoUrl: imageUrl,
      },
      response: null,
    })
  }

  /* INSTAGRAM */
  try {
    const payload = {
      imageUrl,
      caption,
      photoId,
      title: safeTitle,
      description: safeDescription,
      storeUrl: safeStoreUrl,
    }

    const raw = await postInternalJson(
      `${base}/api/instagram/auto-post`,
      payload
    )
    const normalized = normalizeSocialResult(raw)

    results.instagram = normalized

    await safeLogSocialPost({
      photoId,
      platform: 'instagram',
      postId: normalized.postId,
      status: normalized.ok
        ? 'published'
        : normalized.skipped
          ? 'skipped'
          : 'failed',
      error: normalized.error || null,
      payload,
      response: raw,
    })
  } catch (e) {
    const normalized = normalizeSocialResult({
      ok: false,
      error: e?.message || 'Instagram auto-post failed',
    })

    results.instagram = normalized

    await safeLogSocialPost({
      photoId,
      platform: 'instagram',
      postId: null,
      status: 'failed',
      error: normalized.error,
      payload: {
        imageUrl,
        caption,
        photoId,
        title: safeTitle,
        description: safeDescription,
        storeUrl: safeStoreUrl,
      },
      response: null,
    })
  }

  /* PINTEREST */
  try {
    const payload = {
      imageUrl,
      title: safeTitle,
      description: caption,
      link: safeStoreUrl,
      photoId,
    }

    const raw = await postInternalJson(
      `${base}/api/pinterest/auto-post`,
      payload
    )
    const normalized = normalizeSocialResult(raw)

    results.pinterest = normalized

    await safeLogSocialPost({
      photoId,
      platform: 'pinterest',
      postId: normalized.postId,
      status: normalized.ok
        ? 'published'
        : normalized.skipped
          ? 'skipped'
          : 'failed',
      error: normalized.error || null,
      payload,
      response: raw,
    })
  } catch (e) {
    const normalized = normalizeSocialResult({
      ok: false,
      error: e?.message || 'Pinterest auto-post failed',
    })

    results.pinterest = normalized

    await safeLogSocialPost({
      photoId,
      platform: 'pinterest',
      postId: null,
      status: 'failed',
      error: normalized.error,
      payload: {
        imageUrl,
        title: safeTitle,
        description: caption,
        link: safeStoreUrl,
        photoId,
      },
      response: null,
    })
  }

  return {
    facebook:
      results.facebook ||
      normalizeSocialResult({
        ok: false,
        error: 'Facebook missing result',
      }),
    instagram:
      results.instagram ||
      normalizeSocialResult({
        ok: false,
        error: 'Instagram missing result',
      }),
    pinterest:
      results.pinterest ||
      normalizeSocialResult({
        ok: false,
        error: 'Pinterest missing result',
      }),
  }
}