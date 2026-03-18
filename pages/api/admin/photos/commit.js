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

function stripExt(name) {
  const n = clean(name)
  const i = n.lastIndexOf('.')
  return i > 0 ? n.slice(0, i) : n
}

function humanizeWords(s) {
  return String(s || '')
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function titleCaseWords(s) {
  return humanizeWords(s)
    .split(' ')
    .filter(Boolean)
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
    .join(' ')
}

function fileNameToTitle(filename) {
  const raw = stripExt(filename).replace(/__.+$/, '')
  if (!raw) return 'Untitled Photo'
  return titleCaseWords(raw)
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

  const m = auth.match(/^Bearer\s+(.+)$/i)
  if (m?.[1]) return m[1].trim()

  return (
    readHeader(req, 'x-supabase-access-token') ||
    readHeader(req, 'X-Supabase-Access-Token') ||
    readHeader(req, 'x-access-token') ||
    ''
  ).trim()
}

async function requireAdmin(req) {
  const token = extractAccessToken(req)

  if (!token) {
    return { ok: false, status: 401, error: 'Missing access token' }
  }

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) {
    return { ok: false, status: 401, error: 'Invalid token' }
  }

  const { data: profile, error: profErr } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single()

  if (profErr || !profile) {
    return { ok: false, status: 403, error: 'No profile' }
  }

  if (profile.role !== 'admin') {
    return { ok: false, status: 403, error: 'Not admin' }
  }

  return { ok: true, user: userData.user, token }
}

function parseBoolean(v, fallback = false) {
  if (typeof v === 'boolean') return v
  if (typeof v === 'string') {
    const x = v.trim().toLowerCase()
    if (x === 'true' || x === '1' || x === 'yes') return true
    if (x === 'false' || x === '0' || x === 'no') return false
  }
  return fallback
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

function getSiteBase(req) {
  const envBase = clean(process.env.NEXT_PUBLIC_SITE_URL)
  if (envBase) return envBase.replace(/\/+$/, '')

  const host =
    clean(readHeader(req, 'x-forwarded-host')) ||
    clean(readHeader(req, 'host'))

  const proto =
    clean(readHeader(req, 'x-forwarded-proto')) ||
    (host && !host.includes('localhost') ? 'https' : 'http')

  if (host) return `${proto}://${host}`

  return 'http://localhost:3000'
}

function normalizePrice(value) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? n : null
}

function normalizeLicensePreset(value) {
  const v = clean(value).toLowerCase()
  return ['personal', 'editorial', 'commercial'].includes(v) ? v : ''
}

function socialSkipped(reason) {
  return {
    ok: false,
    skipped: true,
    reason,
  }
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
    const admin = await requireAdmin(req)
    if (!admin.ok) {
      return res.status(admin.status).json({
        ok: false,
        error: admin.error,
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

    const originalKey = firstNonEmpty(
      existing?.original_key,
      existing?.original_jpg_key,
      body.original_key,
      body.original_jpg_key
    )

    if (!originalKey) {
      return res.status(400).json({
        ok: false,
        error: 'Original asset key is missing for this photo',
      })
    }

    const bodyTitle = clean(body.title)
    const bodyDescription = clean(body.description)
    const bodyTags = normalizeTags(body.tags)
    const existingTags = normalizeTags(existing?.tags)

    const title =
      firstNonEmpty(bodyTitle, existing?.title) ||
      fileNameToTitle(filename)

    const description =
      firstNonEmpty(bodyDescription, existing?.description) ||
      `${title} – premium Sri Lanka photography by Jeevan Chandimal. Available for licensing.`

    const tags = bodyTags.length ? bodyTags : existingTags

    const preview_url =
      firstNonEmpty(existing?.preview_url, existing?.previewUrl) ||
      `/api/photo/${photoId}/preview?variant=standard`

    const thumb_url =
      firstNonEmpty(existing?.thumb_url, existing?.thumbUrl) ||
      `/api/photo/${photoId}/thumb`

    const licensePreset =
      normalizeLicensePreset(body.licensePreset) ||
      normalizeLicensePreset(existing?.license_preset)

    const priceLkr =
      normalizePrice(body.priceLkr) ??
      normalizePrice(existing?.price_lkr)

    const priceUsd =
      normalizePrice(body.priceUsd) ??
      normalizePrice(existing?.price_usd)

    const updatePayload = {
      status: 'published',
      title,
      description,
      preview_url,
      thumb_url,
    }

    if (tags.length) {
      updatePayload.tags = JSON.stringify(tags)
    }

    if (licensePreset) {
      updatePayload.license_preset = licensePreset
    }

    if (priceLkr != null) {
      updatePayload.price_lkr = priceLkr
    }

    if (priceUsd != null) {
      updatePayload.price_usd = priceUsd
    }

    if (!clean(existing?.original_key)) {
      updatePayload.original_key = originalKey
    }

    if (!clean(existing?.original_jpg_key)) {
      updatePayload.original_jpg_key = originalKey
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

    const autopost = parseBoolean(body.autopost, true)

    let publishing = {
      ok: false,
      skipped: !autopost,
      facebook: socialSkipped('Auto-post disabled'),
      instagram: socialSkipped('Auto-post disabled'),
      pinterest: socialSkipped('Auto-post disabled'),
    }

    if (autopost) {
      publishing = await runAutoPublishing({
        siteBase,
        photoId,
        previewUrl,
        storeUrl,
        title,
        description,
        tags,
      })
    }

    let scheduled = {
      ok: false,
      skipped: !autopost,
      jobs: [],
    }

    if (autopost) {
      try {
        scheduled = await scheduleReposts(photoId, {
          photo_id: photoId,
          title,
          description,
          preview_url: previewUrl,
          store_url: storeUrl,
          tags,
        })
      } catch (e) {
        scheduled = {
          ok: false,
          error: e?.message || 'Failed to schedule reposts',
          jobs: [],
        }
      }
    } else {
      scheduled = {
        ok: false,
        skipped: true,
        jobs: [],
      }
    }

    return res.status(200).json({
      ok: true,
      photo: updated,
      thumbUrl: updated?.thumb_url || thumb_url,
      previewUrl: updated?.preview_url || preview_url,
      storeUrl,
      publishing,
      scheduled,
      facebook: publishing?.facebook || socialSkipped('Facebook result missing'),
      instagram: publishing?.instagram || socialSkipped('Instagram result missing'),
      pinterest: publishing?.pinterest || socialSkipped('Pinterest result missing'),
    })
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e?.message || 'Commit failed',
    })
  }
}