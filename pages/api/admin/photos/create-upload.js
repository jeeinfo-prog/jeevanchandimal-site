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
  return String(name).replace(/[^\w.\-]+/g, '_')
}

function sanitizePath(pathLike) {
  const raw = String(pathLike || '').replace(/\\/g, '/').replace(/^\/+/, '')
  const parts = raw
    .split('/')
    .filter(Boolean)
    .filter((p) => p !== '.' && p !== '..')
    .map(sanitizeFilename)
  return parts.join('/')
}

function isUnknownColumn(err) {
  const msg = (err?.message || '').toLowerCase()
  return (
    err?.code === '42703' ||
    msg.includes('does not exist') ||
    msg.includes('schema cache')
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ ok: false, error: admin.error })

  try {
    const body = req.body || {}
    const filename = body.filename
    if (!filename) return res.status(400).json({ ok: false, error: 'filename required' })

    const safeName = sanitizeFilename(filename)

    // Optional: folder structure
    const relativePath = body.relativePath ? sanitizePath(body.relativePath) : ''
    const pathPart = relativePath && relativePath.includes('/') ? relativePath : safeName

    // Optional metadata (ONLY title/tags are attempted; pricing/licensing skipped unless you add columns later)
    const title = typeof body.title === 'string' ? body.title.trim() : ''
    const tags = Array.isArray(body.tags)
      ? body.tags.filter((t) => typeof t === 'string' && t.trim()).map((t) => t.trim())
      : null

    // 1) Insert draft photo row (try with title/tags; fallback if columns missing)
    let photoId = null

    {
      const insertPayload = { status: 'draft' }
      if (title) insertPayload.title = title
      if (tags) insertPayload.tags = tags

      const first = await supabaseAdmin
        .from('photos')
        .insert([insertPayload])
        .select('id')
        .single()

      if (first.error) {
        if (!isUnknownColumn(first.error)) {
          return res.status(500).json({ ok: false, error: first.error.message })
        }

        // fallback minimal insert
        const fallback = await supabaseAdmin
          .from('photos')
          .insert([{ status: 'draft' }])
          .select('id')
          .single()

        if (fallback.error) {
          return res.status(500).json({ ok: false, error: fallback.error.message })
        }
        photoId = fallback.data.id
      } else {
        photoId = first.data.id
      }
    }

    // 2) Object key
    const objectKey = `photos/original/${photoId}/${pathPart}`

    // 3) Update photos row with original_jpg_key (always exists)
    {
      const up = await supabaseAdmin
        .from('photos')
        .update({ original_jpg_key: objectKey })
        .eq('id', photoId)

      if (up.error) {
        return res.status(500).json({ ok: false, error: up.error.message })
      }
    }

    // 4) Presigned PUT URL (ContentType NOT bound)
    const uploadUrl = await getPresignedPutUrl({ key: objectKey })

    // 5) Asset row (audit)
    {
      const asset = await supabaseAdmin
        .from('photo_assets')
        .insert([{ photo_id: photoId, original_key: objectKey }])

      if (asset.error) {
        return res.status(500).json({ ok: false, error: asset.error.message })
      }
    }

    return res.status(200).json({
      ok: true,
      photoId,
      objectKey,
      uploadUrl,
    })
  } catch (e) {
    console.error('create-upload fatal error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
