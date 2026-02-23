// pages/api/payhere/checkout-cart.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function round2(n) {
  const x = Number(n || 0)
  return Math.round(x * 100) / 100
}

function makeOrderRef() {
  return `ORD_${Date.now()}_${Math.random().toString(16).slice(2, 10).toUpperCase()}`
}

function normLicense(v) {
  const x = String(v || '').trim().toLowerCase()
  return x === 'commercial' || x === 'editorial' ? x : 'personal'
}

function normFormat(v) {
  return String(v || '').trim().toLowerCase() === 'raw' ? 'raw' : 'jpg'
}

function normCurrency(v) {
  return String(v || '').trim().toUpperCase() === 'USD' ? 'USD' : 'LKR'
}

function cleanBaseUrl(v) {
  return String(v || '').trim().replace(/\/+$/, '')
}

function getSiteBaseUrl(req) {
  return (
    cleanBaseUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    `${(req.headers['x-forwarded-proto'] || 'https').toString()}://${(
      req.headers['x-forwarded-host'] || req.headers.host || ''
    ).toString()}`
  )
}

function getNotifyBaseUrl(req) {
  return (
    cleanBaseUrl(process.env.WEBHOOK_BASE_URL) ||
    cleanBaseUrl(process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL) ||
    getSiteBaseUrl(req)
  )
}

async function getObjectKeyForPhoto(photoId, format) {
  const pid = String(photoId || '').trim()
  if (!pid) throw new Error('Missing photoId')

  const { data: p, error } = await supabaseAdmin.from('photos').select('*').eq('id', pid).maybeSingle()
  if (error) throw new Error(error.message)
  if (!p) throw new Error(`Photo not found: ${pid}`)

  const jpgKey =
    p.original_jpg_key ||
    p.original_key ||
    p.original_object_key ||
    p.object_key ||
    p.r2_key ||
    p.key ||
    null

  const rawKey =
    p.original_raw_key ||
    p.raw_object_key ||
    p.raw_zip_key ||
    p.raw_original_key ||
    null

  if (format === 'raw') {
    if (rawKey) return String(rawKey)
    return `photos/original/${pid}.zip`
  }

  if (jpgKey) return String(jpgKey)
  return `photos/original/${pid}.jpg`
}

async function insertOrderWithFallback(row) {
  let r = await supabaseAdmin.from('orders').insert([row]).select('id, order_id').single()
  if (!r.error) return r

  const msg = String(r.error.message || '').toLowerCase()

  if (msg.includes('column') && msg.includes('items')) {
    const { items, ...rest } = row
    r = await supabaseAdmin.from('orders').insert([rest]).select('id, order_id').single()
    if (!r.error) return r
  }

  if (msg.includes('column') && msg.includes('order_kind')) {
    const { order_kind, ...rest } = row
    r = await supabaseAdmin.from('orders').insert([rest]).select('id, order_id').single()
    if (!r.error) return r
  }

  const minimal = {
    order_id: row.order_id,
    email: row.email,
    currency: row.currency,
    amount: row.amount,
    status: row.status,
  }
  r = await supabaseAdmin.from('orders').insert([minimal]).select('id, order_id').single()
  return r
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const body = req.body || {}
    const cart = body.cart || {}

    // ✅ Accept BOTH shapes
    const items =
      (Array.isArray(body.items) && body.items) ||
      (Array.isArray(cart.items) && cart.items) ||
      []

    const ccy = normCurrency(body.currency || cart.currency)
    const email = String(body.email || cart.email || '').trim().toLowerCase() || null

    if (!items.length) {
      return res.status(400).json({ ok: false, error: 'Cart is empty (no items received)' })
    }

    const cleanItems = []
    for (const it of items) {
      const photoId = String(it.photoId || it.id || it._id || '').trim()
      const license = normLicense(it.license || it._license)
      const format = normFormat(it.format || it._format)
      const qty = Math.max(1, Math.min(99, Number(it.qty || it._qty || 1)))
      const unitPrice = Number(it.unitPrice || it.price || it._price || 0)

      if (!photoId) {
        return res.status(400).json({ ok: false, error: 'Invalid cart item (missing photoId)' })
      }
      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        return res.status(400).json({ ok: false, error: `Invalid cart item (missing price) photoId=${photoId}` })
      }

      // ✅ Do NOT crash the whole request if DB lookup fails
      let objectKey = null
      try {
        objectKey = await getObjectKeyForPhoto(photoId, format)
      } catch (e) {
        // make this a clean 400 (real reason shown)
        const msg = String(e?.message || 'Photo lookup failed')
        return res.status(400).json({ ok: false, error: msg })
      }

      cleanItems.push({
        photoId,
        title: String(it.title || it._title || ''),
        thumbUrl: String(it.thumbUrl || it.thumb_url || it._thumb || ''),
        license,
        format,
        currency: ccy,
        unitPrice,
        qty,
        objectKey,
      })
    }

    const amount = round2(cleanItems.reduce((sum, it) => sum + it.unitPrice * it.qty, 0))
    const orderRef = makeOrderRef()

    const toInsert = {
      order_id: orderRef,
      email,
      currency: ccy,
      amount,
      status: 'PENDING',
      order_kind: 'cart',
      items: cleanItems,
    }

    const created = await insertOrderWithFallback(toInsert)
    if (created.error || !created.data) {
      return res.status(500).json({
        ok: false,
        error: created.error?.message || 'Order create failed',
      })
    }

    const orderId = created.data.id
    const ref = created.data.order_id || orderRef

    const merchant_id = process.env.PAYHERE_MERCHANT_ID || process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID
    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET || process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_SECRET

    if (!merchant_id || !merchant_secret) {
      return res.status(500).json({ ok: false, error: 'PayHere env missing (merchant id/secret)' })
    }

    const baseUrl = getSiteBaseUrl(req)
    const notifyBase = getNotifyBaseUrl(req)

    const return_url = `${baseUrl}/store/return?order_id=${encodeURIComponent(ref)}`
    const cancel_url = `${baseUrl}/store/cancel?order_id=${encodeURIComponent(ref)}`
    const notify_url = `${notifyBase}/api/payhere/notify`

    const payload = {
      merchant_id,
      return_url,
      cancel_url,
      notify_url,

      order_id: ref,
      items: `Jeevan Chandimal Photo Cart (${cleanItems.length} items)`,
      currency: ccy,
      amount: Number(amount).toFixed(2),

      first_name: 'Customer',
      last_name: '',
      email: email || '',
      phone: '',
      address: '',
      city: '',
      country: 'Sri Lanka',

      custom_1: 'cart',
      custom_2: orderId || '',
    }

    const query = new URLSearchParams(payload).toString()
    const redirectUrl = `https://www.payhere.lk/pay/checkout?${query}`

    return res.status(200).json({
      ok: true,
      orderId,
      orderRef: ref,
      orderCode: ref,
      redirectUrl,
    })
  } catch (e) {
    console.error('checkout-cart error:', e)
    return res.status(500).json({
      ok: false,
      error: e?.message || 'Server error',
    })
  }
}