// lib/scheduler.js

import { supabaseAdmin } from './supabaseAdmin'

function clean(v) {
  return String(v || '').trim()
}

function isoAtFutureDay(daysAhead, hour = 9, minute = 0, second = 0) {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() + daysAhead)
  d.setUTCHours(hour, minute, second, 0)
  return d.toISOString()
}

function normalizeTags(input) {
  let arr = []

  if (Array.isArray(input)) {
    arr = input
  } else if (typeof input === 'string') {
    const raw = input.trim()

    if (!raw) {
      arr = []
    } else {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) arr = parsed
        else arr = raw.split(',')
      } catch {
        arr = raw.split(',')
      }
    }
  }

  const out = []
  const seen = new Set()

  for (const raw of arr) {
    let t = clean(raw).toLowerCase()
    t = t.replace(/\s+/g, '-')
    if (!t) continue
    if (t === 'sri-anka') t = 'sri-lanka'
    if (seen.has(t)) continue
    seen.add(t)
    out.push(t)
    if (out.length >= 30) break
  }

  return out
}

function normalizePayload(payload = {}) {
  if (!payload || typeof payload !== 'object') return {}

  const out = {}

  if (clean(payload.photo_id)) out.photo_id = clean(payload.photo_id)
  if (clean(payload.title)) out.title = clean(payload.title)
  if (clean(payload.description)) out.description = clean(payload.description)
  if (clean(payload.preview_url)) out.preview_url = clean(payload.preview_url)
  if (clean(payload.store_url)) out.store_url = clean(payload.store_url)

  const tags = normalizeTags(payload.tags)
  if (tags.length) out.tags = tags

  return out
}

function buildScheduledPost(photoId, platform, runAt, payload, nowIso) {
  return {
    photo_id: photoId,
    platform,
    run_at: runAt,
    status: 'pending',
    attempts: 0,
    payload,
    started_at: null,
    finished_at: null,
    last_error: null,
    result: null,
    updated_at: nowIso,
  }
}

export async function scheduleReposts(photoId, payload = {}) {
  const safePhotoId = clean(photoId)

  if (!safePhotoId) {
    throw new Error('Missing photoId')
  }

  const nowIso = new Date().toISOString()
  const normalizedPayload = normalizePayload({
    ...payload,
    photo_id: safePhotoId,
  })

  const posts = [
    buildScheduledPost(
      safePhotoId,
      'facebook',
      isoAtFutureDay(3, 9, 0, 0),
      normalizedPayload,
      nowIso
    ),
    buildScheduledPost(
      safePhotoId,
      'pinterest',
      isoAtFutureDay(7, 10, 0, 0),
      normalizedPayload,
      nowIso
    ),
    buildScheduledPost(
      safePhotoId,
      'instagram',
      isoAtFutureDay(30, 9, 30, 0),
      normalizedPayload,
      nowIso
    ),
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