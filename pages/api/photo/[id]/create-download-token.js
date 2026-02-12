import { createClient } from '@supabase/supabase-js'
import { signDownloadToken } from '../../../../lib/download-token'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'Missing photo id' })

    const secret = process.env.DOWNLOAD_TOKEN_SECRET
    if (!secret) return res.status(500).json({ error: 'DOWNLOAD_TOKEN_SECRET not configured' })

    const body = req.body || {}
    const scope = body.scope || 'original' // original | preview (optional)
    const ttlSecondsRaw = Number(body.ttlSeconds)
    const ttlSeconds = Number.isFinite(ttlSecondsRaw) ? ttlSecondsRaw : 300
    const ttlClamped = Math.max(10, Math.min(ttlSeconds, 3600)) // 10s..1h

    // Optional: lock width in token
    const w = body.w ? parseInt(body.w, 10) : null
    if (w && (Number.isNaN(w) || w < 50 || w > 6000)) {
      return res.status(400).json({ error: 'Invalid w' })
    }

    // Confirm photo exists
    const { data: photo, error: photoErr } = await supabase
      .from('photos')
      .select('id, status')
      .eq('id', id)
      .single()

    if (photoErr || !photo) return res.status(404).json({ error: 'Photo not found' })

    const token = signDownloadToken(
      { photoId: id, scope, ...(w ? { w } : {}) },
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
