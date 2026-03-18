// lib/socialLogger.js

import { supabaseAdmin } from './supabaseAdmin'

function clean(v) {
  return String(v || '').trim()
}

function normalizePlatform(v) {
  return clean(v).toLowerCase()
}

function normalizeJsonValue(v) {
  if (v == null) return null
  if (typeof v === 'object') return v

  try {
    return JSON.parse(String(v))
  } catch {
    return { value: String(v) }
  }
}

export async function logSocialPost({
  photoId,
  platform,
  postId,
  status,
  error,
  payload,
  response,
}) {
  try {
    const safePhotoId = clean(photoId)
    const safePlatform = normalizePlatform(platform)

    if (!safePhotoId) {
      console.error('logSocialPost skipped: missing photoId')
      return
    }

    if (!safePlatform) {
      console.error('logSocialPost skipped: missing platform')
      return
    }

    const nowIso = new Date().toISOString()

    const { error: dbError } = await supabaseAdmin
      .from('social_posts')
      .insert({
        photo_id: safePhotoId,
        platform: safePlatform,
        post_id: clean(postId) || null,
        status: clean(status) || 'unknown',
        error: clean(error) || null,
        payload: normalizeJsonValue(payload),
        response: normalizeJsonValue(response),
        created_at: nowIso,
        updated_at: nowIso,
      })

    if (dbError) {
      console.error('social_posts insert failed:', dbError)
    }
  } catch (err) {
    console.error('logSocialPost fatal error:', err)
  }
}