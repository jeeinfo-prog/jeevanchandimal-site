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
        msg.includes('cloudflarestatus.com') ||
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

    if (!photoId) {
      return res.status(400).json({ ok: false, error: 'Missing photoId' })
    }

    // ✅ If filename not provided, read it from DB (very important for reliability)
    if (!filename) {
      const { data: row } = await supabaseAdmin
        .from('photos')
        .select('id, original_filename, filename, file_name')
        .eq('id', photoId)
        .single()

      filename =
        String(row?.original_filename || row?.filename || row?.file_name || '').trim()
    }

    if (!filename) {
      return res.status(400).json({
        ok: false,
        error: 'Missing filename (not in request and not found in DB)',
        hint: 'Ensure create-upload saves original_filename OR send filename to commit',
      })
    }

    // ✅ Your real R2 key pattern:
    const original_key = `photos/original/${photoId}/${filename}`

    const title = String(body.title || '').trim() || smartTitleFromFilename(filename)
    const description =
      String(body.description || '').trim() ||
      `${title} – premium Sri Lanka photography by Jeevan Chandimal. Available for licensing.`
    const tags =
      Array.isArray(body.tags) && body.tags.length > 0 ? body.tags : smartTagsFromFilename(filename)

    const preview_url = `/api/photo/${encodeURIComponent(photoId)}/preview?variant=standard`
    const thumb_url = `/api/photo/${encodeURIComponent(photoId)}/thumb?variant=standard`

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
        .select(
          'id, title, description, tags, status, original_key, original_filename, preview_url, thumb_url, created_at'
        )
        .single()
    )

    if (error || !data) {
      return res.status(500).json({ ok: false, error: error?.message || 'Commit failed' })
    }

    return res.status(200).json({ ok: true, photo: data })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Commit failed' })
  }
}
