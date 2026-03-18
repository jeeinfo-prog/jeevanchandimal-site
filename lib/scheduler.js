// lib/scheduler.js

import { supabaseAdmin } from './supabaseAdmin'

function clean(v) {
  return String(v || '').trim()
}

function daysFromNow(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
}

function normalizePayload(payload = {}) {
  if (!payload || typeof payload !== 'object') return {}

  const out = {}

  if (clean(payload.title)) out.title = clean(payload.title)
  if (clean(payload.description)) out.description = clean(payload.description)
  if (clean(payload.preview_url)) out.preview_url = clean(payload.preview_url)
  if (clean(payload.store_url)) out.store_url = clean(payload.store_url)

  return out
}

export async function scheduleReposts(photoId, payload = {}) {
  const safePhotoId = clean(photoId)

  if (!safePhotoId) {
    throw new Error('Missing photoId')
  }

  const normalizedPayload = normalizePayload(payload)
  const nowIso = new Date().toISOString()

  const posts = [
    {
      photo_id: safePhotoId,
      platform: 'facebook',
      run_at: daysFromNow(3),
      status: 'pending',
      attempts: 0,
      payload: normalizedPayload,
      updated_at: nowIso,
    },
    {
      photo_id: safePhotoId,
      platform: 'pinterest',
      run_at: daysFromNow(7),
      status: 'pending',
      attempts: 0,
      payload: normalizedPayload,
      updated_at: nowIso,
    },
    {
      photo_id: safePhotoId,
      platform: 'instagram',
      run_at: daysFromNow(30),
      status: 'pending',
      attempts: 0,
      payload: normalizedPayload,
      updated_at: nowIso,
    },
  ]

  const { data, error } = await supabaseAdmin
    .from('scheduled_posts')
    .upsert(posts, {
      onConflict: 'photo_id,platform,run_at',
    })
    .select()

  if (error) {
    throw new Error(`Failed to schedule reposts: ${error.message}`)
  }

  return {
    ok: true,
    jobs: data || [],
  }
}