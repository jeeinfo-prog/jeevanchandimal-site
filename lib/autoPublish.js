// lib/autoPublish.js

import { generateCaption } from './aiCaptionGenerator'
import { normalizeSocialResult } from './socialResult'
import { logSocialPost } from './socialLogger'

function clean(v) {
  return String(v || '').trim()
}

function stripTrailingSlash(v) {
  return clean(v).replace(/\/+$/, '')
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

function buildMissingResult(error) {
  return normalizeSocialResult({
    ok: false,
    error,
  })
}

export async function runAutoPublishing({
  siteBase,
  photoId,
  previewUrl,
  storeUrl,
  title,
  description,
  tags = [],
}) {
  const base = stripTrailingSlash(siteBase)
  const imageUrl = clean(previewUrl)
  const safeStoreUrl = clean(storeUrl)
  const safeTitle = clean(title)
  const safeDescription = clean(description)
  const safeTags = Array.isArray(tags) ? tags : []

  if (!base) {
    return {
      ok: false,
      facebook: buildMissingResult('Missing siteBase'),
      instagram: buildMissingResult('Missing siteBase'),
      pinterest: buildMissingResult('Missing siteBase'),
    }
  }

  if (!photoId) {
    return {
      ok: false,
      facebook: buildMissingResult('Missing photoId'),
      instagram: buildMissingResult('Missing photoId'),
      pinterest: buildMissingResult('Missing photoId'),
    }
  }

  if (!imageUrl) {
    return {
      ok: false,
      facebook: buildMissingResult('Missing previewUrl'),
      instagram: buildMissingResult('Missing previewUrl'),
      pinterest: buildMissingResult('Missing previewUrl'),
    }
  }

  let caption = ''

  try {
    caption = await generateCaption({
      title: safeTitle,
      description: safeDescription,
      storeUrl: safeStoreUrl,
      photoId,
      tags: safeTags,
    })
  } catch (e) {
    caption = [safeTitle, safeDescription, safeStoreUrl].filter(Boolean).join('\n\n')
  }

  caption = clean(caption) || [safeTitle, safeDescription, safeStoreUrl].filter(Boolean).join('\n\n')

  const results = {}

  /* FACEBOOK */
  try {
    const payload = {
      message: caption,
      photoUrl: imageUrl,
      photoId,
      title: safeTitle,
      description: safeDescription,
      storeUrl: safeStoreUrl,
      tags: safeTags,
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
        photoId,
        title: safeTitle,
        description: safeDescription,
        storeUrl: safeStoreUrl,
        tags: safeTags,
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
      tags: safeTags,
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
        tags: safeTags,
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
      tags: safeTags,
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
        tags: safeTags,
      },
      response: null,
    })
  }

  const facebook =
    results.facebook ||
    buildMissingResult('Facebook missing result')

  const instagram =
    results.instagram ||
    buildMissingResult('Instagram missing result')

  const pinterest =
    results.pinterest ||
    buildMissingResult('Pinterest missing result')

  const ok = Boolean(facebook.ok || instagram.ok || pinterest.ok)

  return {
    ok,
    facebook,
    instagram,
    pinterest,
  }
}