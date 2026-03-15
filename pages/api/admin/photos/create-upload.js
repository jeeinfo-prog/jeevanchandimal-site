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

    const filename = body.filename
    if (!filename) {
      return res.status(400).json({ ok: false, error: 'filename required' })
    }

    const safeName = sanitizeFilename(filename)

    const relativePath = body.relativePath ? sanitizePath(body.relativePath) : ''
    const pathPart = relativePath && relativePath.includes('/') ? relativePath : safeName

    const parsed = parsePhotoFilename(filename, relativePath)

    const rawTitle = typeof body.title === 'string' ? body.title.trim() : ''
    const description = typeof body.description === 'string' ? body.description.trim() : ''
    const title = rawTitle || parsed.title || ''

    let tags = Array.isArray(body.tags)
      ? body.tags
          .filter((t) => typeof t === 'string' && t.trim())
          .map((t) => t.trim().toLowerCase())
      : []

    tags = normalizeTags(tags)

    if (parsed.collection) {
      const merged = new Set(tags)
      merged.add(parsed.collection)
      tags = Array.from(merged)
    }

    const licensePreset = typeof body.licensePreset === 'string' ? body.licensePreset.trim() : ''
    const priceLkr = body.priceLkr != null ? Number(body.priceLkr) : null
    const priceUsd = body.priceUsd != null ? Number(body.priceUsd) : null

    let photoId = null
    {
      const insertPayload = { status: 'draft' }

      if (title) insertPayload.title = title
      if (description) insertPayload.description = description
      if (tags.length) insertPayload.tags = tags
      if (licensePreset) insertPayload.license_preset = licensePreset
      if (Number.isFinite(priceLkr)) insertPayload.price_lkr = priceLkr
      if (Number.isFinite(priceUsd)) insertPayload.price_usd = priceUsd

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
        if (tags.length) updatePayload.tags = tags
        if (licensePreset) updatePayload.license_preset = licensePreset
        if (Number.isFinite(priceLkr)) updatePayload.price_lkr = priceLkr
        if (Number.isFinite(priceUsd)) updatePayload.price_usd = priceUsd

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
        .update({ original_jpg_key: objectKey })
        .eq('id', photoId)

      if (up.error) {
        console.error('photos update original_jpg_key error:', up.error)
        return res.status(500).json({ ok: false, error: up.error.message })
      }
    }

    const uploadUrl = await getPresignedPutUrl({ key: objectKey })

    {
      const asset = await supabaseAdmin
        .from('photo_assets')
        .insert([{ photo_id: photoId, original_key: objectKey }])

      if (asset.error && !isUnknownColumn(asset.error)) {
        console.error('photo_assets insert error:', asset.error)
        return res.status(500).json({ ok: false, error: asset.error.message })
      }
    }

    return res.status(200).json({
      ok: true,
      photoId,
      objectKey,
      uploadUrl,
      parsed: {
        collection: parsed.collection,
        title: parsed.title,
      },
    })
  } catch (e) {
    console.error('create-upload fatal error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
