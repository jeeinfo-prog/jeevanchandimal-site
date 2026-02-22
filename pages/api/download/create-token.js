// pages/api/download/create-token.js
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createDownloadToken } from '@/lib/secureDownload'

function limitForLicense(license) {
  const x = String(license || '').trim().toLowerCase()
  if (x === 'commercial') return 0 // unlimited
  if (x === 'editorial') return 5
  return 3 // personal
}

function getBaseUrl(req) {
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString()
  if (host) return `${proto}://${host}`
  return process.env.NEXT_PUBLIC_SITE_URL || ''
}

function normalizeFormat(v) {
  return String(v || '').trim().toLowerCase() === 'raw' ? 'raw' : 'jpg'
}

function isUuid(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(v || '').trim())
}

/**
 * ✅ Resolve correct R2 key for single orders:
 * photos/original/<photo_id>/<filename>.jpg  (from photos table)
 */
async function resolveObjectKeyForSingleOrder(order) {
  const fmt = normalizeFormat(order?.format)
  const photoId = String(order?.photo_id || '').trim()
  if (!photoId) return null
  if (!isUuid(photoId)) return null // legacy slug orders can't be resolved here

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id, original_key, original_jpg_key, original_raw_key')
    .eq('id', photoId)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) return null

  if (fmt === 'raw') return p.original_raw_key ? String(p.original_raw_key) : null

  const k = p.original_jpg_key || p.original_key
  return k ? String(k) : null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const { orderId } = req.body || {}
    const ref = String(orderId || '').trim()
    if (!ref) return res.status(400).json({ ok: false, error: 'Missing orderId' })

    // ✅ Keep your existing select list
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('id,status,delivery_object_key,photo_id,format,email,license,download_limit')
      .eq('id', ref)
      .maybeSingle()

    if (error) return res.status(500).json({ ok: false, error: error.message })
    if (!order) return res.status(404).json({ ok: false, error: 'Order not found' })
    if (String(order.status || '').toUpperCase() !== 'PAID') {
      return res.status(400).json({ ok: false, error: 'Order not paid' })
    }

    // ✅ Fix: if key missing OR clearly the old wrong fallback, resolve from photos table
    const fallbackJpg = `photos/original/${order.photo_id}.jpg`
    const fallbackZip = `photos/original/${order.photo_id}.zip`

    let objectKey = order.delivery_object_key ? String(order.delivery_object_key) : ''
    const looksWrong =
      !objectKey || objectKey === fallbackJpg || objectKey === fallbackZip || objectKey === `photos/original/${order.photo_id}`

    if (looksWrong) {
      const resolved = await resolveObjectKeyForSingleOrder(order)
      if (resolved) {
        objectKey = resolved
        // ✅ persist corrected key so future calls are fast
        const u = await supabaseAdmin.from('orders').update({ delivery_object_key: objectKey }).eq('id', order.id)
        if (u.error) {
          console.error('delivery_object_key update failed:', u.error.message)
          // don't hard fail; token can still be returned
        }
      }
    }

    if (!objectKey) {
      return res.status(400).json({
        ok: false,
        error: 'Missing delivery_object_key (cannot resolve)',
      })
    }

    // ✅ Ensure per-license limit is set (only if empty/null)
    if (order.download_limit == null) {
      const desiredLimit = limitForLicense(order.license)
      const u = await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', order.id)

      if (u.error) {
        console.error('download_limit update failed:', u.error.message)
        return res.status(500).json({ ok: false, error: 'Failed to set download limit' })
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
    if (ins.error) return res.status(500).json({ ok: false, error: ins.error.message })

    const fmt = normalizeFormat(order.format)
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
        license: String(order.license || '').trim().toLowerCase() || 'personal',
      },
      '1h'
    )

    const base = getBaseUrl(req)
    const url = `${base}/api/download?token=${encodeURIComponent(token)}`

    return res.status(200).json({ ok: true, url, expiresAt: expiresAt.toISOString() })
  } catch (e) {
    console.error('create-token error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}