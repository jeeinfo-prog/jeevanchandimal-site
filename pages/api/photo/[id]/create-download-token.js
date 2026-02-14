// pages/api/photo/[id]/create-download-token.js
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { signDownloadToken } from '../../../../lib/download'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    if (!id) return res.status(400).json({ error: 'Missing photo id' })

    const secret = process.env.DOWNLOAD_TOKEN_SECRET
    if (!secret) return res.status(500).json({ error: 'DOWNLOAD_TOKEN_SECRET not configured' })

    const body = req.body || {}
    const scope = body.scope || 'original' // original | preview (optional)

    const ttlSecondsRaw = Number(body.ttlSeconds)
    const ttlSeconds = Number.isFinite(ttlSecondsRaw) ? ttlSecondsRaw : 300
    const ttlClamped = Math.max(10, Math.min(ttlSeconds, 3600)) // 10s..1h

    // Optional: lock width in token
    const w = body.w != null ? parseInt(body.w, 10) : null
    if (w != null && (Number.isNaN(w) || w < 50 || w > 6000)) {
      return res.status(400).json({ error: 'Invalid w' })
    }

    // ✅ Confirm photo exists AND is published
    const { data: photo, error: photoErr } = await supabaseAdmin
      .from('photos')
      .select('id, status')
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (photoErr || !photo) return res.status(404).json({ error: 'Photo not found' })

    const token = signDownloadToken(
      { photoId: id, scope, ...(w != null ? { w } : {}) },
      secret,
      { ttlSeconds: ttlClamped }
    )

    return res.status(200).json({
      ok: true,
      photoId: id,
      scope,
      ttlSeconds: ttlClamped,
      token,
    })
  } catch (err) {
    console.error('create-download-token error:', err)
    return res.status(500).json({
      error: 'Failed to create token',
      detail: err?.message || String(err),
    })
  }
}
