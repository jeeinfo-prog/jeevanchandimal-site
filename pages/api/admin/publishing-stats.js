// pages/api/admin/publishing-stats.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function clean(v) {
  return String(v || '').trim()
}

function isUuid(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    clean(v)
  )
}

function safeDateMs(v) {
  const ms = new Date(v).getTime()
  return Number.isFinite(ms) ? ms : 0
}

function normalizeAssetUrl(value) {
  const raw = clean(value)
  return raw || null
}

function normalizeStatus(value, fallback = 'unknown') {
  return clean(value).toLowerCase() || fallback
}

function chunkArray(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size))
  }
  return out
}

function getPayloadField(obj, key) {
  if (!obj || typeof obj !== 'object') return ''
  const payload = obj.payload && typeof obj.payload === 'object' ? obj.payload : {}
  return clean(obj[key] || payload[key])
}

function getResponseField(obj, key) {
  if (!obj || typeof obj !== 'object') return ''
  const response = obj.response && typeof obj.response === 'object' ? obj.response : {}
  return clean(obj[key] || response[key])
}

async function loadPhotosByIds(photoIds) {
  const ids = Array.from(
    new Set(
      (Array.isArray(photoIds) ? photoIds : []).filter(
        (id) => isUuid(id) && id !== '00000000-0000-0000-0000-000000000000'
      )
    )
  )

  const photosById = {}

  for (const batch of chunkArray(ids, 200)) {
    if (!batch.length) continue

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, title, thumb_url, preview_url')
      .in('id', batch)

    if (error) throw error

    for (const p of data || []) {
      photosById[String(p.id)] = p
    }
  }

  return photosById
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    })
  }

  try {
    const { data: scheduledRaw, error: scheduledErr } = await supabaseAdmin
      .from('scheduled_posts')
      .select('*')
      .order('run_at', { ascending: true })

    if (scheduledErr) throw scheduledErr

    const { data: socialRaw, error: socialErr } = await supabaseAdmin
      .from('social_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (socialErr) throw socialErr

    const scheduledRows = Array.isArray(scheduledRaw) ? scheduledRaw : []
    const socialRows = Array.isArray(socialRaw) ? socialRaw : []

    const photoIds = [
      ...scheduledRows.map((row) => clean(row?.photo_id || row?.photoId)),
      ...socialRows.map((row) => clean(row?.photo_id || row?.photoId)),
    ]

    const photosById = await loadPhotosByIds(photoIds)
    const nowMs = Date.now()

    const scheduledCounts = {
      pending: 0,
      running: 0,
      done: 0,
      failed: 0,
      unknown: 0,
      overdue: 0,
    }

    for (const row of scheduledRows) {
      const status = normalizeStatus(row?.status)
      if (status === 'pending') scheduledCounts.pending += 1
      else if (status === 'running') scheduledCounts.running += 1
      else if (status === 'done') scheduledCounts.done += 1
      else if (status === 'failed') scheduledCounts.failed += 1
      else scheduledCounts.unknown += 1

      const runAtMs = safeDateMs(row?.run_at)
      if (status === 'pending' && runAtMs && runAtMs <= nowMs) {
        scheduledCounts.overdue += 1
      }
    }

    const socialCounts = {
      published: 0,
      skipped: 0,
      failed: 0,
      unknown: 0,
    }

    for (const row of socialRows) {
      const status = normalizeStatus(row?.status)
      if (status === 'published') socialCounts.published += 1
      else if (status === 'skipped') socialCounts.skipped += 1
      else if (status === 'failed') socialCounts.failed += 1
      else socialCounts.unknown += 1
    }

    const scheduledPosts = scheduledRows.slice(0, 100).map((row) => {
      const photoId = clean(row?.photo_id || row?.photoId) || null
      const photo = photoId ? photosById[photoId] || null : null

      const title =
        getPayloadField(row, 'title') ||
        clean(photo?.title) ||
        'Untitled'

      const thumbnail = normalizeAssetUrl(
        getPayloadField(row, 'preview_url') ||
          getPayloadField(row, 'thumb_url') ||
          photo?.thumb_url ||
          photo?.preview_url
      )

      return {
        id: row.id,
        photoId,
        platform: clean(row?.platform) || 'unknown',
        status: normalizeStatus(row?.status),
        attempts: Number(row?.attempts || 0),
        runAt: row?.run_at || null,
        startedAt: row?.started_at || null,
        finishedAt: row?.finished_at || null,
        updatedAt: row?.updated_at || null,
        error: clean(row?.last_error) || null,
        title,
        thumbnail,
        storeUrl: normalizeAssetUrl(getPayloadField(row, 'store_url')),
        previewUrl: normalizeAssetUrl(
          getPayloadField(row, 'preview_url') || photo?.preview_url
        ),
      }
    })

    const socialPosts = socialRows.slice(0, 100).map((row) => {
      const photoId = clean(row?.photo_id || row?.photoId) || null
      const photo = photoId ? photosById[photoId] || null : null

      const title =
        getPayloadField(row, 'title') ||
        clean(photo?.title) ||
        'Untitled'

      const thumbnail = normalizeAssetUrl(
        getPayloadField(row, 'imageUrl') ||
          getPayloadField(row, 'preview_url') ||
          getPayloadField(row, 'thumb_url') ||
          photo?.thumb_url ||
          photo?.preview_url
      )

      return {
        id: row.id,
        photoId,
        platform: clean(row?.platform) || 'unknown',
        status: normalizeStatus(row?.status),
        postId:
          clean(row?.post_id) ||
          getResponseField(row, 'postId') ||
          getResponseField(row, 'id') ||
          null,
        error: clean(row?.error) || null,
        createdAt: row?.created_at || null,
        title,
        thumbnail,
        response: row?.response && typeof row.response === 'object' ? row.response : null,
      }
    })

    return res.status(200).json({
      ok: true,
      summary: {
        scheduled: scheduledCounts,
        social: socialCounts,
      },
      scheduledPosts,
      socialPosts,
    })
  } catch (err) {
    console.error('publishing-stats error:', err)

    return res.status(500).json({
      ok: false,
      error: err?.message || 'Server error',
    })
  }
}