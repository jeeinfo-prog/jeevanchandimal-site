// pages/api/admin/photos/commit.js

import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { runAutoPublishing } from '../../../../lib/autoPublish'
import { scheduleReposts } from '../../../../lib/scheduler'

function clean(v) {
  return String(v || '').trim()
}

function firstNonEmpty(...vals) {
  for (const v of vals) {
    const x = clean(v)
    if (x) return x
  }
  return ''
}

function fileNameToTitle(filename) {
  const raw = clean(filename).replace(/\.[^/.]+$/, '')
  if (!raw) return 'Untitled Photo'

  return raw
    .replace(/__.+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function readHeader(req, name) {
  const v = req.headers?.[name]
  if (Array.isArray(v)) return v[0] || ''
  return typeof v === 'string' ? v : ''
}

function extractAccessToken(req) {
  const auth =
    readHeader(req, 'authorization') ||
    readHeader(req, 'Authorization') ||
    ''

  if (auth.startsWith('Bearer ')) return auth.slice(7)

  return (
    readHeader(req, 'x-supabase-access-token') ||
    readHeader(req, 'X-Supabase-Access-Token') ||
    ''
  )
}

function normalizeDbTags(input) {
  if (!Array.isArray(input)) return []

  const out = []
  const seen = new Set()

  for (const raw of input) {
    const t = clean(raw).toLowerCase()
    if (!t || seen.has(t)) continue
    seen.add(t)
    out.push(t)
  }

  return out
}

function getSiteBase(req) {
  const envBase = clean(process.env.NEXT_PUBLIC_SITE_URL)
  if (envBase) return envBase

  const host =
    clean(readHeader(req, 'x-forwarded-host')) || clean(readHeader(req, 'host'))

  const proto =
    clean(readHeader(req, 'x-forwarded-proto')) ||
    (host && !host.includes('localhost') ? 'https' : 'http')

  if (host) return `${proto}://${host}`

  return 'http://localhost:3000'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    })
  }

  try {
    const token = extractAccessToken(req)

    if (!token) {
      return res.status(401).json({
        ok: false,
        error: 'Missing access token',
      })
    }

    const body = req.body || {}
    const photoId = clean(body.photoId)
    const filename = clean(body.filename)

    if (!photoId) {
      return res.status(400).json({
        ok: false,
        error: 'Missing photoId',
      })
    }

    if (!filename) {
      return res.status(400).json({
        ok: false,
        error: 'Missing filename',
      })
    }

    const { data: existing, error: existingError } = await supabaseAdmin
      .from('photos')
      .select('*')
      .eq('id', photoId)
      .single()

    if (existingError || !existing) {
      return res.status(404).json({
        ok: false,
        error: existingError?.message || 'Photo not found',
      })
    }

    const preview_url =
      firstNonEmpty(existing?.preview_url, existing?.previewUrl) ||
      `/api/photo/${photoId}/preview?variant=standard`

    const thumb_url =
      firstNonEmpty(existing?.thumb_url, existing?.thumbUrl) ||
      `/api/photo/${photoId}/thumb`

    const title =
      firstNonEmpty(existing?.title, body.title) || fileNameToTitle(filename)

    const description =
      firstNonEmpty(existing?.description, body.description) ||
      `${title} – premium Sri Lanka photography by Jeevan Chandimal.`

    const tags = normalizeDbTags(existing?.tags || body.tags || [])

    const updatePayload = {
      status: 'published',
      title,
      description,
      preview_url,
      thumb_url,
    }

    if (tags.length) {
      updatePayload.tags = tags
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from('photos')
      .update(updatePayload)
      .eq('id', photoId)
      .select()
      .single()

    if (updateError || !updated) {
      return res.status(500).json({
        ok: false,
        error: updateError?.message || 'Failed to finalize photo',
      })
    }

    const siteBase = getSiteBase(req)
    const previewUrl = `${siteBase}/api/photo/${photoId}/preview?variant=standard`
    const storeUrl = `${siteBase}/store/${photoId}`

    const publishing = await runAutoPublishing({
      siteBase,
      photoId,
      previewUrl,
      storeUrl,
      title,
      description,
    })

    let scheduled = {
      ok: false,
      jobs: [],
    }

    try {
      scheduled = await scheduleReposts(photoId, {
        photo_id: photoId,
        title,
        description,
        preview_url: previewUrl,
        store_url: storeUrl,
      })
    } catch (e) {
      scheduled = {
        ok: false,
        error: e?.message || 'Failed to schedule reposts',
        jobs: [],
      }
    }

    return res.status(200).json({
      ok: true,
      photo: updated,
      thumbUrl: updated?.thumb_url || thumb_url,
      previewUrl: updated?.preview_url || preview_url,
      publishing,
      scheduled,
      facebook: publishing?.facebook || {
        ok: false,
        error: 'Facebook result missing',
      },
      instagram: publishing?.instagram || {
        ok: false,
        error: 'Instagram result missing',
      },
      pinterest: publishing?.pinterest || {
        ok: false,
        error: 'Pinterest result missing',
      },
    })
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e?.message || 'Commit failed',
    })
  }
}