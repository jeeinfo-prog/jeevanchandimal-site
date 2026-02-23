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

function normalizeLicense(v) {
  const x = String(v || '').trim().toLowerCase()
  if (x === 'commercial') return 'commercial'
  if (x === 'editorial') return 'editorial'
  return 'personal'
}

function isUuid(v) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(v || '').trim()
  )
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

async function ensureObjectKey(order) {
  const fallbackJpg = `photos/original/${order.photo_id}.jpg`
  const fallbackZip = `photos/original/${order.photo_id}.zip`

  let objectKey = order.delivery_object_key ? String(order.delivery_object_key) : ''
  const looksWrong =
    !objectKey ||
    objectKey === fallbackJpg ||
    objectKey === fallbackZip ||
    objectKey === `photos/original/${order.photo_id}`

  if (looksWrong) {
    const resolved = await resolveObjectKeyForSingleOrder(order)
    if (resolved) {
      objectKey = resolved
      const u = await supabaseAdmin.from('orders').update({ delivery_object_key: objectKey }).eq('id', order.id)
      if (u.error) console.error('delivery_object_key update failed:', u.error.message)
    }
  }

  return objectKey || ''
}

function makeItemLabel(o, idx) {
  const lic = normalizeLicense(o.license)
  const fmt = normalizeFormat(o.format)
  const base = o.title || o.photo_id || `Item ${idx + 1}`
  return `${base} • ${lic.toUpperCase()} • ${fmt.toUpperCase()}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const body = req.body || {}
    const orderId = String(body.orderId || '').trim()
    const code = String(body.code || '').trim()

    if (!orderId && !code) {
      return res.status(400).json({ ok: false, error: 'Missing orderId or code' })
    }

    // Token validity window (also stored in DB for one-time enforcement)
    const expiresMinutes = 60
    const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000)
    const base = getBaseUrl(req)

    /* =========================================================
       ✅ CART GROUP: body.code = CART_...
    ========================================================= */
    if (code) {
      const { data: orders, error } = await supabaseAdmin
        .from('orders')
        .select('id,status,delivery_object_key,photo_id,format,email,license,download_limit,title,code')
        .eq('code', code)

      if (error) return res.status(500).json({ ok: false, error: error.message })

      const list = Array.isArray(orders) ? orders : []
      if (list.length === 0) return res.status(404).json({ ok: false, error: 'Cart orders not found' })

      // require all PAID (or at least one paid)
      const anyPaid = list.some((o) => String(o.status || '').toUpperCase() === 'PAID')
      if (!anyPaid) return res.status(400).json({ ok: false, error: 'Order not paid' })

      const items = []

      for (let i = 0; i < list.length; i++) {
        const o = list[i]
        if (String(o.status || '').toUpperCase() !== 'PAID') continue

        // ensure limit set (only if empty/null)
        if (o.download_limit == null) {
          const desiredLimit = limitForLicense(o.license)
          const u = await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', o.id)
          if (u.error) {
            console.error('download_limit update failed:', u.error.message)
            // do not hard fail; continue
          }
        }

        const objectKey = await ensureObjectKey(o)
        if (!objectKey) continue

        const jti = crypto.randomUUID()

        const ins = await supabaseAdmin.from('download_tokens').insert({
          jti,
          order_id: o.id,
          expires_at: expiresAt.toISOString(),
        })
        if (ins.error) {
          console.error('download_tokens insert failed:', ins.error.message)
          continue
        }

        const fmt = normalizeFormat(o.format)
        const ext = fmt === 'raw' ? 'zip' : 'jpg'

        const token = createDownloadToken(
          {
            jti,
            orderId: o.id,
            photoId: o.photo_id,
            format: fmt,
            objectKey,
            guestEmail: o.email || null,
            filename: `${o.photo_id}.${ext}`,
            license: normalizeLicense(o.license),
          },
          '1h'
        )

        items.push({
          title: makeItemLabel(o, i),
          token,
          url: `${base}/api/download?token=${encodeURIComponent(token)}`,
        })
      }

      if (items.length === 0) {
        return res.status(400).json({ ok: false, error: 'No downloadable items found for this cart' })
      }

      // ✅ Return items with token+url (frontend supports both)
      return res.status(200).json({ ok: true, items, expiresAt: expiresAt.toISOString() })
    }

    /* =========================================================
       ✅ SINGLE ORDER: body.orderId
    ========================================================= */
    {
      const ref = orderId
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

      const objectKey = await ensureObjectKey(order)
      if (!objectKey) {
        return res.status(400).json({ ok: false, error: 'Missing delivery_object_key (cannot resolve)' })
      }

      if (order.download_limit == null) {
        const desiredLimit = limitForLicense(order.license)
        const u = await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', order.id)
        if (u.error) {
          console.error('download_limit update failed:', u.error.message)
          return res.status(500).json({ ok: false, error: 'Failed to set download limit' })
        }
      }

      const jti = crypto.randomUUID()

      const ins = await supabaseAdmin.from('download_tokens').insert({
        jti,
        order_id: order.id,
        expires_at: expiresAt.toISOString(),
      })
      if (ins.error) return res.status(500).json({ ok: false, error: ins.error.message })

      const fmt = normalizeFormat(order.format)
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
          license: normalizeLicense(order.license),
        },
        '1h'
      )

      const url = `${base}/api/download?token=${encodeURIComponent(token)}`
      return res.status(200).json({ ok: true, url, token, expiresAt: expiresAt.toISOString() })
    }
  } catch (e) {
    console.error('create-token error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}