// pages/api/admin/photos/create-upload.js

import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { getPresignedPutUrl } from '../../../../lib/r2'

async function requireAdmin(req) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return { ok: false, status: 401, error: 'Missing token' }

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) return { ok: false, status: 401, error: 'Invalid token' }

  const { data: profile, error: profErr } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single()

  if (profErr || !profile) return { ok: false, status: 403, error: 'No profile' }
  if (profile.role !== 'admin') return { ok: false, status: 403, error: 'Not admin' }

  return { ok: true, user: userData.user }
}

function sanitizeFilename(name) {
  // Keep extension, replace spaces/special chars safely.
  return String(name).replace(/[^\w.\-]+/g, '_')
}

function sanitizePath(pathLike) {
  // Convert "Trip/Sigiriya/IMG 1.jpg" => "Trip/Sigiriya/IMG_1.jpg"
  // Remove leading slashes, collapse .., keep simple folder structure
  const raw = String(pathLike || '').replace(/\\/g, '/').replace(/^\/+/, '')
  const parts = raw
    .split('/')
    .filter(Boolean)
    .filter((p) => p !== '.' && p !== '..')
    .map(sanitizeFilename)
  return parts.join('/')
}

function isMissingColumnError(err) {
  // Postgres undefined_column is 42703 (Supabase usually forwards this)
  return err?.code === '42703' || /column .* does not exist/i.test(err?.message || '')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ ok: false, error: admin.error })

  try {
    const body = req.body || {}

    // filename is always required (base file name)
    const filename = body.filename
    if (!filename) return res.status(400).json({ ok: false, error: 'filename required' })

    // Optional: preserve folder structure from browser folder upload
    // Example: "Trip/Sigiriya/IMG_123.jpg"
    const relativePath = body.relativePath ? sanitizePath(body.relativePath) : ''

    // Optional metadata (safe: we’ll attempt to store; if columns missing, we retry without them)
    const title = typeof body.title === 'string' ? body.title.trim() : ''
    const tags = Array.isArray(body.tags) ? body.tags.filter((t) => typeof t === 'string' && t.trim()).map((t) => t.trim()) : null
    const license_preset = typeof body.licensePreset === 'string' ? body.licensePreset.trim() : ''
    const price_lkr = Number.isFinite(body.priceLkr) ? body.priceLkr : (typeof body.priceLkr === 'number' ? body.priceLkr : null)
    const price_usd = Number.isFinite(body.priceUsd) ? body.priceUsd : (typeof body.priceUsd === 'number' ? body.priceUsd : null)

    const baseInsert = { status: 'draft' }

    const metaInsert = {
      ...(title ? { title } : {}),
      ...(tags ? { tags } : {}),
      ...(license_preset ? { license_preset } : {}),
      ...(typeof price_lkr === 'number' ? { price_lkr } : {}),
      ...(typeof price_usd === 'number' ? { price_usd } : {}),
    }

    // 1) Create photo row first to get ID
    let photo
    {
      // Try with metadata first; fallback to minimal if your table doesn't have those columns yet
      const first = await supabaseAdmin
        .from('photos')
        .insert([{ ...baseInsert, ...metaInsert }])
        .select('id')
        .single()

      if (first.error) {
        if (!isMissingColumnError(first.error)) {
          console.error('photos insert error:', first.error)
          return res.status(500).json({ ok: false, error: first.error.message })
        }

        const fallback = await supabaseAdmin
          .from('photos')
          .insert([{ ...baseInsert }])
          .select('id')
          .single()

        if (fallback.error) {
          console.error('photos insert fallback error:', fallback.error)
          return res.status(500).json({ ok: false, error: fallback.error.message })
        }
        photo = fallback.data
      } else {
        photo = first.data
      }
    }

    const safeName = sanitizeFilename(filename)

    // 2) Object key
    // If relativePath includes folders, keep them under the photoId namespace.
    // Example:
    // photos/original/{photoId}/Trip/Sigiriya/IMG_123.jpg
    const pathPart = relativePath && relativePath.includes('/') ? relativePath : safeName
    const objectKey = `photos/original/${photo.id}/${pathPart}`

    // 3) Save original key on photos row (commit.js relies on this)
    {
      const updatePatch = { original_jpg_key: objectKey }

      // If table supports these, keep them synced too (best-effort)
      if (title) updatePatch.title = title
      if (tags) updatePatch.tags = tags
      if (license_preset) updatePatch.license_preset = license_preset
      if (typeof price_lkr === 'number') updatePatch.price_lkr = price_lkr
      if (typeof price_usd === 'number') updatePatch.price_usd = price_usd

      const up = await supabaseAdmin.from('photos').update(updatePatch).eq('id', photo.id)

      if (up.error) {
        // If missing columns, retry with only original_jpg_key
        if (isMissingColumnError(up.error)) {
          const up2 = await supabaseAdmin
            .from('photos')
            .update({ original_jpg_key: objectKey })
            .eq('id', photo.id)

          if (up2.error) {
            console.error('photos update fallback error:', up2.error)
            return res.status(500).json({ ok: false, error: up2.error.message })
          }
        } else {
          console.error('photos update error:', up.error)
          return res.status(500).json({ ok: false, error: up.error.message })
        }
      }
    }

    // 4) Presigned PUT URL (ContentType NOT bound)
    const uploadUrl = await getPresignedPutUrl({ key: objectKey })

    // 5) Save asset row (audit/history)
    {
      const asset = await supabaseAdmin.from('photo_assets').insert([
        { photo_id: photo.id, original_key: objectKey },
      ])
      if (asset.error) {
        console.error('photo_assets insert error:', asset.error)
        // Not fatal for upload, but better to fail loudly (your choice)
        return res.status(500).json({ ok: false, error: asset.error.message })
      }
    }

    return res.status(200).json({
      ok: true,
      photoId: photo.id,
      objectKey,
      uploadUrl,
    })
  } catch (e) {
    console.error('create-upload fatal error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
