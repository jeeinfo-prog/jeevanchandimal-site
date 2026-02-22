// pages/api/download/create-token.js

import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createDownloadToken } from '@/lib/secureDownload'

function limitForLicense(license) {
  if (license === 'commercial') return 0 // unlimited
  if (license === 'editorial') return 5
  return 3 // personal
}

function normalizeLicense(v) {
  const x = String(v || '').trim().toLowerCase()
  if (x === 'commercial') return 'commercial'
  if (x === 'editorial') return 'editorial'
  return 'personal'
}

function normalizeFormat(v) {
  return String(v || '').trim().toLowerCase() === 'raw' ? 'raw' : 'jpg'
}

function getBaseUrl(req) {
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString()
  if (host) return `${proto}://${host}`
  return process.env.NEXT_PUBLIC_SITE_URL || ''
}

async function resolveObjectKeyForCartItem(item) {
  const format = normalizeFormat(item.format)
  if (item.objectKey) return String(item.objectKey)

  const photoId = String(item.photoId || '')
  if (!photoId) return null

  // Try common columns from your photos table (best-effort)
  const { data: p } = await supabaseAdmin
    .from('photos')
    .select('id, original_object_key, original_key, object_key, r2_key, raw_object_key, raw_key')
    .eq('id', photoId)
    .maybeSingle()

  if (p) {
    if (format === 'raw') {
      const rk = p.raw_object_key || p.raw_key
      if (rk) return String(rk)
    }
    const ok = p.original_object_key || p.original_key || p.object_key || p.r2_key
    if (ok) return String(ok)
  }

  // LAST RESORT (works only if your storage uses this pattern)
  if (format === 'raw') return `photos/original/${photoId}.zip`
  return `photos/original/${photoId}.jpg`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { orderId } = req.body || {}
    if (!orderId) return res.status(400).json({ error: 'Missing orderId' })

    // ✅ Fetch minimal fields + cart fields
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select(
        'id,status,kind,items,currency,amount,delivery_object_key,photo_id,format,email,license,download_limit'
      )
      .eq('id', String(orderId))
      .single()

    if (error || !order) return res.status(404).json({ error: 'Order not found' })
    if (order.status !== 'PAID') return res.status(400).json({ error: 'Order not paid' })

    const base = getBaseUrl(req)

    // =========================================================
    // 🛒 CART ORDER: create multiple tokens + return list
    // =========================================================
    if (String(order.kind || '').toLowerCase() === 'cart') {
      const items = Array.isArray(order.items) ? order.items : []
      if (items.length === 0) return res.status(400).json({ error: 'Cart has no items' })

      // Ensure download_limit set (safe rule: any commercial => 0, else any editorial => 5, else 3)
      if (order.download_limit == null) {
        const licenses = items.map((it) => normalizeLicense(it.license))
        const desiredLimit =
          licenses.includes('commercial') ? 0 : licenses.includes('editorial') ? 5 : 3

        const u = await supabaseAdmin
          .from('orders')
          .update({ download_limit: desiredLimit })
          .eq('id', order.id)

        if (u.error) {
          console.error('download_limit update failed:', u.error.message)
          return res.status(500).json({ error: 'Failed to set download limit' })
        }
      }

      const expiresMinutes = 60
      const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000)

      const outItems = []
      const urls = []

      // Create one token per item (not per qty)
      for (const it of items) {
        const photoId = String(it.photoId || '')
        if (!photoId) continue

        const title = String(it.title || photoId || 'Photo')
        const license = normalizeLicense(it.license)
        const format = normalizeFormat(it.format)

        const objectKey = await resolveObjectKeyForCartItem(it)
        if (!objectKey) continue

        const jti = crypto.randomUUID()

        const ins = await supabaseAdmin.from('download_tokens').insert({
          jti,
          order_id: order.id,
          expires_at: expiresAt.toISOString(),
        })
        if (ins.error) {
          console.error('download_tokens insert failed:', ins.error.message)
          return res.status(500).json({ error: ins.error.message })
        }

        const ext = format === 'raw' ? 'zip' : 'jpg'

        const token = createDownloadToken(
          {
            jti,
            orderId: order.id,
            photoId,
            format,
            objectKey,
            guestEmail: order.email || null,
            filename: `${photoId}.${ext}`,
            // optional extra info
            license,
          },
          '1h'
        )

        const url = `${base}/api/download?token=${encodeURIComponent(token)}`
        urls.push(url)
        outItems.push({ title, photoId, license, format, url })
      }

      if (urls.length === 0) {
        return res.status(400).json({ error: 'Failed to generate download links' })
      }

      return res.status(200).json({
        ok: true,
        kind: 'cart',
        expiresAt: expiresAt.toISOString(),
        urls,
        items: outItems,
      })
    }

    // =========================================================
    // 🖼️ SINGLE PHOTO ORDER (existing behavior)
    // =========================================================

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

    const jti = crypto.randomUUID()
    const expiresMinutes = 60
    const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000)

    const ins = await supabaseAdmin.from('download_tokens').insert({
      jti,
      order_id: order.id,
      expires_at: expiresAt.toISOString(),
    })
    if (ins.error) return res.status(500).json({ error: ins.error.message })

    const fmt = order.format === 'raw' ? 'raw' : 'jpg'
    const ext = fmt === 'raw' ? 'zip' : 'jpg'

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

    const url = `${base}/api/download?token=${encodeURIComponent(token)}`

    return res.status(200).json({ ok: true, url, expiresAt: expiresAt.toISOString() })
  } catch (e) {
    console.error('create-token error:', e)
    return res.status(500).json({ error: e?.message || 'Server error' })
  }
}