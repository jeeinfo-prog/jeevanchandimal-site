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
    const { error: dbError } = await supabaseAdmin
      .from('social_posts')
      .insert({
        photo_id: clean(photoId),
        platform: normalizePlatform(platform),
        post_id: clean(postId) || null,
        status: clean(status) || 'unknown',
        error: clean(error) || null,
        payload: normalizeJsonValue(payload),
        response: normalizeJsonValue(response),
        created_at: new Date().toISOString(),
      })

    if (dbError) {
      console.error('social_posts insert failed:', dbError)
    }
  } catch (err) {
    console.error('logSocialPost fatal error:', err)
  }
}