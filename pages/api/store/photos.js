// pages/api/store/photos.js

import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function cleanUrl(u) {
  const s = String(u || '').trim()
  return s || null
}

function toArray(v) {
  if (Array.isArray(v)) return v
  if (!v) return []
  if (typeof v === 'string') {
    // allow comma-separated tags fallback
    return v
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
  }
  return []
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const limitRaw = Number(req.query?.limit)
    const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(limitRaw, 2000) : 200

    const { data, error } = await supabaseAdmin
      .from('photos')
      .select(
        `
        id,
        title,
        description,
        tags,
        location,
        camera,
        preview_url,
        thumb_url,
        created_at
      `
      )
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('store/photos error:', error.message)
      return res.status(500).json({ ok: false, error: error.message })
    }

    const photos = (data || []).map((row) => ({
      id: row.id,
      title: row.title || 'Untitled',
      description: row.description || '',
      tags: toArray(row.tags),
      location: row.location || null,
      camera: row.camera || null,
      preview_url: cleanUrl(row.preview_url),
      thumb_url: cleanUrl(row.thumb_url),
      created_at: row.created_at,
    }))

    return res.status(200).json({
      ok: true,
      count: photos.length,
      photos,
    })
  } catch (e) {
    console.error('store/photos fatal:', e)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}