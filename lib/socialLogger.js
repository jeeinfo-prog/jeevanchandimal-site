// lib/socialLogger.js

import { supabaseAdmin } from './supabaseAdmin'

export async function logSocialPost({
  photoId,
  platform,
  postId,
  status,
  error,
  payload,
  response,
}) {
  await supabaseAdmin.from('social_posts').insert({
    photo_id: photoId,
    platform,
    post_id: postId || null,
    status,
    error: error || null,
    payload: payload || null,
    response: response || null,
  })
}