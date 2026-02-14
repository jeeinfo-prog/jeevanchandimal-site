// pages/api/download/create-token.js

import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createDownloadToken } from '@/lib/secureDownload'

function limitForLicense(license) {
  if (license === 'commercial') return 0 // unlimited
  if (license === 'editorial') return 5
  return 3 // personal
}

function getBaseUrl(req) {
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString()
  if (host) return `${proto}://${host}`
  return process.env.NEXT_PUBLIC_SITE_URL || ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { orderId } = req.body || {}
    if (!orderId) return res.status(400).json({ error: 'Missing orderId' })

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('id,status,delivery_object_key,photo_id,format,email,license,download_limit')
      .eq('id', String(orderId))
      .single()

    if (error || !order) return res.status(404).json({ error: 'Order not found' })
    if (order.status !== 'PAID') return res.status(400).json({ error: 'Order not paid' })

    const objectKey = order.delivery_object_key
    if (!objectKey) return res.status(400).json({ error: 'Missing delivery_object_key' })

    // ✅ Ensure per-license limit is set (only if empty/null)
    if (order.download_limit == null) {
      const desiredLimit = limitForLicense(order.license)
      const u = await supabaseAdmin
        .from('orders')
        .update({ download_limit: desiredLimit })
        .eq('id', order.id)

      if (u.error) {
        console.error('download_limit update failed:', u.error.message)
        return res.status(500).json({ error: 'Failed to set download limit' })
      }
    }

    // ✅ One-time token id (jti)
    const jti = crypto.randomUUID()

    // Token validity window (also stored in DB for one-time enforcement)
    const expiresMinutes = 60
    const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000)

    // ✅ Store token record (one-time)
    const ins = await supabaseAdmin.from('download_tokens').insert({
      jti,
      order_id: order.id,
      expires_at: expiresAt.toISOString(),
    })
    if (ins.error) return res.status(500).json({ error: ins.error.message })

    const fmt = order.format === 'raw' ? 'raw' : 'jpg'
    const ext = fmt === 'raw' ? 'zip' : 'jpg'

    // ✅ Sign JWT
    const token = createDownloadToken(
      {
        jti,
        orderId: order.id,
        photoId: order.photo_id,
        format: fmt,
        objectKey,
        guestEmail: order.email || null,
        filename: `${order.photo_id}.${ext}`,
      },
      '1h'
    )

    const base = getBaseUrl(req)
    const url = `${base}/api/download?token=${encodeURIComponent(token)}`

    return res.status(200).json({ ok: true, url, expiresAt: expiresAt.toISOString() })
  } catch (e) {
    console.error('create-token error:', e)
    return res.status(500).json({ error: 'Server error' })
  }
}
