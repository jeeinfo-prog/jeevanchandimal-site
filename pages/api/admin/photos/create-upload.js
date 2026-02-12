// pages/api/admin/photos/create-upload.js

import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { getPresignedPutUrl } from '../../../../lib/r2'

async function requireAdmin(req) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null

  if (!token) {
    return { ok: false, status: 401, error: 'Missing token' }
  }

  const { data: userData, error: userErr } =
    await supabaseAdmin.auth.getUser(token)

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

function sanitizeFilename(filename) {
  return String(filename).replace(/[^\w.\-]+/g, '_')
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
    const { filename } = req.body || {}

    if (!filename) {
      return res.status(400).json({
        ok: false,
        error: 'filename required',
      })
    }

    const safeName = sanitizeFilename(filename)

    // 1️⃣ Create draft photo row
    const { data: photo, error: photoErr } = await supabaseAdmin
      .from('photos')
      .insert([{ status: 'draft' }])
      .select('id')
      .single()

    if (photoErr) {
      console.error('photos insert error:', photoErr)
      return res.status(500).json({
        ok: false,
        error: photoErr.message,
      })
    }

    const objectKey = `photos/original/${photo.id}/${safeName}`

    // 2️⃣ Save original key to photos table
    const { error: updateErr } = await supabaseAdmin
      .from('photos')
      .update({ original_jpg_key: objectKey })
      .eq('id', photo.id)

    if (updateErr) {
      console.error('photos update error:', updateErr)
      return res.status(500).json({
        ok: false,
        error: updateErr.message,
      })
    }

    // 3️⃣ Generate presigned PUT URL
    // NOTE: ContentType is NOT signed anymore (important fix)
    const uploadUrl = await getPresignedPutUrl({
      key: objectKey,
    })

    // 4️⃣ Save asset row (optional but good practice)
    const { error: assetErr } = await supabaseAdmin
      .from('photo_assets')
      .insert([{ photo_id: photo.id, original_key: objectKey }])

    if (assetErr) {
      console.error('photo_assets insert error:', assetErr)
      return res.status(500).json({
        ok: false,
        error: assetErr.message,
      })
    }

    return res.status(200).json({
      ok: true,
      photoId: photo.id,
      objectKey,
      uploadUrl,
    })
  } catch (err) {
    console.error('create-upload fatal error:', err)

    return res.status(500).json({
      ok: false,
      error: err?.message || 'Server error',
    })
  }
}
