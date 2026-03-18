// pages/api/admin/photos/create-upload.js
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { getPresignedPutUrl } from '../../../../lib/r2'

function readHeader(req, name) {
  const v = req.headers?.[name]
  if (Array.isArray(v)) return v[0] || ''
  return typeof v === 'string' ? v : ''
}

function extractAccessToken(req) {
  const authHeader =
    readHeader(req, 'authorization') ||
    readHeader(req, 'Authorization') ||
    ''

  const m = authHeader.match(/^Bearer\s+(.+)$/i)
  if (m?.[1]) return m[1].trim()

  const alt =
    readHeader(req, 'x-supabase-access-token') ||
    readHeader(req, 'x-access-token') ||
    ''

  if (alt) return alt.trim()

  return ''
}

async function requireAdmin(req) {
  const token = extractAccessToken(req)

  if (!token) {
    return { ok: false, status: 401, error: 'Missing token' }
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

  return { ok: true, user: userData.user }
}

function sanitizeFilename(name) {
  return String(name || '').replace(/[^\w.\-]+/g, '_')
}

function sanitizePath(pathLike) {
  const raw = String(pathLike || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')

  const parts = raw
    .split('/')
    .filter(Boolean)
    .filter((p) => p !== '.' && p !== '..')
    .map(sanitizeFilename)

  return parts.join('/')
}

function stripExt(name) {
  const n = String(name || '')
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

function parsePhotoFilename(filename, relativePath = '') {
  const original = stripExt(filename || '')
  const withoutId = original.replace(/__.+$/, '')
  const rawParts = withoutId.split('-').filter(Boolean)

  const folder = String(relativePath || '')
    .replace(/\\/g, '/')
    .split('/')[0]
    ?.trim()
    ?.toLowerCase()

  let collection = ''
  let titleParts = rawParts

  if (rawParts.length > 1) {
    collection = rawParts[0].toLowerCase()
    titleParts = rawParts.slice(1)
  } else if (folder) {
    collection = folder
    titleParts = rawParts
  }

  const titleSlug = titleParts.join('-')
  const title = titleCaseWords(titleSlug)

  return {
    original,
    withoutId,
    folder,
    collection,
    titleSlug,
    title,
  }
}

function normalizeTags(input) {
  const arr = Array.isArray(input)
    ? input
    : String(input || '')
        .split(',')
        .map((t) => t.trim())

  const out = []
  const seen = new Set()

  for (const raw of arr) {
    let t = String(raw || '').trim().toLowerCase()
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

function isUnknownColumn(err) {
  const msg = (err?.message || '').toLowerCase()
  return err?.code === '42703' || msg.includes('does not exist') || msg.includes('schema cache')
}

function isAllowedImageFilename(name) {
  const ext = String(name || '')
    .split('.')
    .pop()
    ?.toLowerCase()

  return ['jpg', 'jpeg', 'png', 'webp', 'tif', 'tiff'].includes(ext)
}

function normalizeCollection(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9_-]/g, '')
}

async function trySaveOriginalFilename(photoId, safeName) {
  if (!photoId || !safeName) return

  const up = await supabaseAdmin
    .from('photos')
    .update({ original_filename: safeName })
    .eq('id', photoId)

  if (up.error && !isUnknownColumn(up.error)) {
    console.error('photos update original_filename error:', up.error)
  }
}

async function tryInsertPhotoAsset(photoId, objectKey) {
  if (!photoId || !objectKey) return

  const first = await supabaseAdmin
    .from('photo_assets')
    .insert([{ photo_id: photoId, original_key: objectKey }])

  if (!first.error) return

  if (isUnknownColumn(first.error)) return

  const msg = String(first.error?.message || '').toLowerCase()
  const isDup =
    first.error?.code === '23505' ||
    msg.includes('duplicate key') ||
    msg.includes('unique constraint')

  if (isDup) {
    const up = await supabaseAdmin
      .from('photo_assets')
      .update({ original_key: objectKey })
      .eq('photo_id', photoId)

    if (up.error && !isUnknownColumn(up.error)) {
      throw up.error
    }
    return
  }

  throw first.error
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const admin = await requireAdmin(req)
  if (!admin.ok) {
    return res.status(admin.status).json({ ok: false, error: admin.error })
  }

  try {
    const body = req.body || {}

    const filename = String(body.filename || '').trim()
    if (!filename) {
      return res.status(400).json({ ok: false, error: 'filename required' })
    }

    if (!isAllowedImageFilename(filename)) {
      return res.status(400).json({ ok: false, error: 'Unsupported file type' })
    }

    const safeName = sanitizeFilename(filename)

    const relativePath = body.relativePath ? sanitizePath(body.relativePath) : ''
    const pathPart = relativePath || safeName

    const parsed = parsePhotoFilename(filename, relativePath)

    const requestedCollection = normalizeCollection(body.collection)
    const collection = requestedCollection || parsed.collection || ''

    const rawTitle = typeof body.title === 'string' ? body.title.trim() : ''
    const description = typeof body.description === 'string' ? body.description.trim() : ''
    const title = rawTitle || parsed.title || ''

    let tags = Array.isArray(body.tags)
      ? body.tags
          .filter((t) => typeof t === 'string' && t.trim())
          .map((t) => t.trim().toLowerCase())
      : []

    tags = normalizeTags(tags)

    if (collection) {
      const merged = new Set(tags)
      merged.add(collection)
      tags = Array.from(merged)
    }

    const allowedPresets = new Set(['personal', 'editorial', 'commercial'])
    const rawLicensePreset =
      typeof body.licensePreset === 'string' ? body.licensePreset.trim().toLowerCase() : ''
    const licensePreset = allowedPresets.has(rawLicensePreset) ? rawLicensePreset : ''

    const rawPriceLkr = body.priceLkr != null ? Number(body.priceLkr) : null
    const rawPriceUsd = body.priceUsd != null ? Number(body.priceUsd) : null

    const priceLkr = Number.isFinite(rawPriceLkr) && rawPriceLkr >= 0 ? rawPriceLkr : null
    const priceUsd = Number.isFinite(rawPriceUsd) && rawPriceUsd >= 0 ? rawPriceUsd : null

    let photoId = null
    {
      const insertPayload = { status: 'draft' }

      if (title) insertPayload.title = title
      if (description) insertPayload.description = description
      if (tags.length) insertPayload.tags = JSON.stringify(tags)
      if (licensePreset) insertPayload.license_preset = licensePreset
      if (priceLkr != null) insertPayload.price_lkr = priceLkr
      if (priceUsd != null) insertPayload.price_usd = priceUsd

      const first = await supabaseAdmin
        .from('photos')
        .insert([insertPayload])
        .select('id')
        .single()

      if (first.error) {
        if (!isUnknownColumn(first.error)) {
          console.error('photos insert error:', first.error)
          return res.status(500).json({ ok: false, error: first.error.message })
        }

        const fallback = await supabaseAdmin
          .from('photos')
          .insert([{ status: 'draft' }])
          .select('id')
          .single()

        if (fallback.error) {
          console.error('photos insert fallback error:', fallback.error)
          return res.status(500).json({ ok: false, error: fallback.error.message })
        }

        photoId = fallback.data.id

        const updatePayload = {}
        if (title) updatePayload.title = title
        if (description) updatePayload.description = description
        if (tags.length) updatePayload.tags = JSON.stringify(tags)
        if (licensePreset) updatePayload.license_preset = licensePreset
        if (priceLkr != null) updatePayload.price_lkr = priceLkr
        if (priceUsd != null) updatePayload.price_usd = priceUsd

        if (Object.keys(updatePayload).length) {
          const up = await supabaseAdmin
            .from('photos')
            .update(updatePayload)
            .eq('id', photoId)

          if (up.error && !isUnknownColumn(up.error)) {
            console.error('photos update meta error:', up.error)
          }
        }
      } else {
        photoId = first.data.id
      }
    }

    await trySaveOriginalFilename(photoId, safeName)

    const objectKey = `photos/original/${photoId}/${pathPart}`

    {
      const up = await supabaseAdmin
        .from('photos')
        .update({
          original_jpg_key: objectKey,
          original_key: objectKey,
        })
        .eq('id', photoId)

      if (up.error) {
        console.error('photos update original key error:', up.error)
        return res.status(500).json({ ok: false, error: up.error.message })
      }
    }

    const uploadUrl = await getPresignedPutUrl({ key: objectKey })

    try {
      await tryInsertPhotoAsset(photoId, objectKey)
    } catch (assetErr) {
      console.error('photo_assets insert/update error:', assetErr)
      return res.status(500).json({ ok: false, error: assetErr.message || 'photo_assets failed' })
    }

    return res.status(200).json({
      ok: true,
      photoId,
      objectKey,
      uploadUrl,
      parsed: {
        collection,
        title: parsed.title,
      },
    })
  } catch (e) {
    console.error('create-upload fatal error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}