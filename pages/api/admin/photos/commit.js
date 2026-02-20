// pages/api/admin/photos/commit.js
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function withRetry(fn, { tries = 4, baseDelayMs = 500 } = {}) {
  let lastErr
  for (let i = 0; i < tries; i++) {
    try {
      return await fn()
    } catch (e) {
      lastErr = e
      const msg = String(e?.message || e)
      const transient =
        msg.includes('Service Unavailable') ||
        msg.includes('InternalError') ||
        msg.includes('ECONNRESET') ||
        msg.includes('ETIMEDOUT') ||
        msg.includes('RequestTimeout') ||
        msg.includes('SlowDown') ||
        msg.includes('503') ||
        msg.includes('502') ||
        msg.includes('504')
      if (!transient || i === tries - 1) throw e
      await sleep(baseDelayMs * Math.pow(2, i))
    }
  }
  throw lastErr
}

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

function stripExt(name) {
  return String(name || '').replace(/\.[a-z0-9]+$/i, '')
}

function smartTitleFromFilename(filename) {
  const base = stripExt(filename)
  const left = base.split('__')[0] || base
  return left
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function smartTagsFromFilename(filename) {
  const base = stripExt(filename)
  const left = base.split('__')[0] || base
  const parts = left
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, ' ')
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .map((s) => s.trim())
    .filter(Boolean)

  const deny = new Set(['the', 'and', 'or', 'a', 'an', 'of', 'in', 'on', 'at'])
  const tags = []
  for (const p of parts) {
    if (deny.has(p)) continue
    if (p.length < 3) continue
    if (!tags.includes(p)) tags.push(p)
    if (tags.length >= 18) break
  }

  // fix sri anka
  const set = new Set(tags)
  if (set.has('sri') && set.has('anka')) {
    const cleaned = tags.filter((t) => t !== 'sri' && t !== 'anka')
    cleaned.unshift('sri-lanka')
    return cleaned
  }
  if (set.has('sri') && set.has('lanka')) {
    const cleaned = tags.filter((t) => t !== 'sri' && t !== 'lanka')
    cleaned.unshift('sri-lanka')
    return cleaned
  }

  return tags
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ ok: false, error: admin.error })

  try {
    const body = req.body || {}
    const photoId = String(body.photoId || body.id || '').trim()
    let filename = String(body.filename || body.originalFilename || '').trim()

    if (!photoId) return res.status(400).json({ ok: false, error: 'Missing photoId' })

    // Read from DB for safest source-of-truth keys
    const { data: row, error: readErr } = await supabaseAdmin
      .from('photos')
      .select('id, original_filename, filename, file_name, original_jpg_key, title, description, tags')
      .eq('id', photoId)
      .maybeSingle()

    if (readErr || !row) {
      return res.status(404).json({ ok: false, error: 'Photo not found' })
    }

    const originalKeyFromDb = String(row?.original_jpg_key || '').trim()

    // filename fallback
    if (!filename) {
      filename = String(row?.original_filename || row?.filename || row?.file_name || '').trim()
      if (!filename && originalKeyFromDb) filename = originalKeyFromDb.split('/').pop()
    }

    if (!filename) {
      return res.status(400).json({
        ok: false,
        error: 'Missing filename (not in request and not found in DB)',
        hint:
          'Send filename to commit OR ensure create-upload stores original_filename OR ensure original_jpg_key is saved',
      })
    }

    // ✅ Folder-safe original key: always prefer DB key (includes folder path)
    const original_key = originalKeyFromDb || `photos/original/${photoId}/${filename}`

    const title = String(body.title || '').trim() || String(row?.title || '').trim() || smartTitleFromFilename(filename)
    const description =
      String(body.description || '').trim() ||
      String(row?.description || '').trim() ||
      `${title} – premium Sri Lanka photography by Jeevan Chandimal. Available for licensing.`

    const tags =
      Array.isArray(body.tags) && body.tags.length > 0
        ? body.tags
        : Array.isArray(row?.tags) && row.tags.length > 0
        ? row.tags
        : smartTagsFromFilename(filename)

    // ✅ URLs that match your endpoints
    const preview_url = `/api/photo/${encodeURIComponent(photoId)}/preview?variant=standard`
    const thumb_url = `/api/photo/${encodeURIComponent(photoId)}/thumb`

    const updatePayload = {
      status: 'published',
      title,
      description,
      tags,
      original_key,
      original_filename: filename,
      preview_url,
      thumb_url,
    }

    const { data, error } = await withRetry(() =>
      supabaseAdmin
        .from('photos')
        .update(updatePayload)
        .eq('id', photoId)
        .select('id, title, description, tags, status, original_key, original_filename, preview_url, thumb_url, created_at')
        .single()
    )

    if (error || !data) {
      return res.status(500).json({ ok: false, error: error?.message || 'Commit failed' })
    }

    // ✅ top-level fields for upload.js logs + keep nested "photo"
    return res.status(200).json({
      ok: true,
      ...data,
      photo: data,
    })
  } catch (e) {
    console.error('commit error:', e)
    return res.status(500).json({ ok: false, error: 'Commit failed', detail: e?.message || String(e) })
  }
}