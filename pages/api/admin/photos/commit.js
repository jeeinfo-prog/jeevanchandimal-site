// pages/api/admin/photos/commit.js
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function withRetry(fn, { tries = 4, baseDelayMs = 250 } = {}) {
  let lastErr
  for (let i = 0; i < tries; i++) {
    try {
      return await fn(i)
    } catch (e) {
      lastErr = e
      if (i === tries - 1) break
      await sleep(baseDelayMs * Math.pow(2, i))
    }
  }
  throw lastErr
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
  return tags
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const body = req.body || {}
    const photoId = String(body.photoId || body.id || '').trim()
    let filename = String(body.filename || body.originalFilename || '').trim()

    if (!photoId) return res.status(400).json({ ok: false, error: 'Missing photoId' })

    // ✅ Read row (retry a few times to avoid serverless timing issues)
    const read = await withRetry(async () => {
      const { data: row, error: readErr } = await supabaseAdmin
        .from('photos')
        .select('id, status, original_filename, filename, file_name, original_jpg_key')
        .eq('id', photoId)
        .maybeSingle() // ✅ important: do not throw if not found yet

      if (readErr) throw readErr
      if (!row) throw new Error('Photo not found')
      return row
    })

    const row = read

    // ✅ If filename not provided, read from DB; FINAL fallback = derive from original_jpg_key
    let originalKeyFromDb = String(row?.original_jpg_key || '').trim()

    if (!filename) {
      filename = String(row?.original_filename || row?.filename || row?.file_name || '').trim()

      // ✅ FINAL fallback: derive filename from original_jpg_key = photos/original/{photoId}/{filename}
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

    // ✅ Your real R2 key pattern
    const original_key = `photos/original/${photoId}/${filename}`

    const title = String(body.title || '').trim() || smartTitleFromFilename(filename)
    const description =
      String(body.description || '').trim() ||
      `${title} – premium Sri Lanka photography by Jeevan Chandimal. Available for licensing.`
    const tags = Array.isArray(body.tags) && body.tags.length > 0 ? body.tags : smartTagsFromFilename(filename)

    // ✅ Use your preview/thumb endpoints
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

    // ✅ Update (retry also, but usually not needed)
    const { data, error } = await withRetry(async () => {
      const out = await supabaseAdmin
        .from('photos')
        .update(updatePayload)
        .eq('id', photoId)
        .select('id, title, description, tags, status, original_key, original_filename, preview_url, thumb_url, created_at')
        .single()
      if (out.error) throw out.error
      return out
    })

    return res.status(200).json({
      ok: true,
      photo: data,
      thumbUrl: data?.thumb_url,
      previewUrl: data?.preview_url,
    })
  } catch (e) {
    console.error('commit error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Commit failed' })
  }
}