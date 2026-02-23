// pages/api/payhere/checkout-cart.js
import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function round2(n) {
  const x = Number(n || 0)
  return Math.round(x * 100) / 100
}

function makeUuid() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function makeGroupId() {
  return `CART_${Date.now()}_${Math.random().toString(16).slice(2, 10).toUpperCase()}`
}

// IMPORTANT: your DB has unique constraint on orders.code
// So every row MUST have its own unique code.
function makeRowCode() {
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

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('*')
    .eq('id', pid)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) throw new Error(`Photo not found: ${pid}`)

  // prefer stable columns
  const jpgKey = p.original_jpg_key || p.original_key || p.original_object_key || p.object_key || p.r2_key || p.key || null
  const rawKey = p.original_raw_key || p.raw_zip_key || p.raw_original_key || p.raw_object_key || null

  if (format === 'raw') {
    if (rawKey) return String(rawKey)
    return `photos/original/${pid}.zip`
  }

  if (jpgKey) return String(jpgKey)
  return `photos/original/${pid}.jpg`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  try {
    const body = req.body || {}
    const cart = body.cart || {}

    const items =
      (Array.isArray(body.items) && body.items) ||
      (Array.isArray(cart.items) && cart.items) ||
      []

    const ccy = normCurrency(body.currency || cart.currency)
    const email = String(body.email || cart.email || '').trim().toLowerCase()

    if (!email) return res.status(400).json({ ok: false, error: 'Missing email' })
    if (!items.length) return res.status(400).json({ ok: false, error: 'Cart is empty' })

    // ✅ Group id used as PayHere order_id AND stored in orders.order_id for ALL rows
    const groupId = makeGroupId()

    const rows = []
    let total = 0

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

      const objectKey = await getObjectKeyForPhoto(photoId, format)

      const lineAmount = round2(unitPrice * qty)
      total += lineAmount

      // ✅ If qty > 1: simplest is 1 row with amount=unit*qty
      // Download still 1 file; qty is only for pricing.
      rows.push({
        id: makeUuid(),
        status: 'PENDING',
        email,
        currency: ccy,
        amount: lineAmount,

        photo_id: photoId,
        license,
        format,

        delivery_object_key: objectKey,

        order_kind: 'photo', // keep compatible with existing schema

        // ✅ IMPORTANT:
        // - order_id = shared groupId (for cart)
        // - code must be unique per row (because orders_code_unique)
        order_id: groupId,
        code: makeRowCode(),
      })
    }

    total = round2(total)

    const ins = await supabaseAdmin.from('orders').insert(rows).select('id, photo_id, amount, order_id, code')
    if (ins.error) {
      return res.status(500).json({ ok: false, error: ins.error.message })
    }

    const merchant_id = process.env.PAYHERE_MERCHANT_ID || process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID
    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET || process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_SECRET
    if (!merchant_id || !merchant_secret) {
      return res.status(500).json({ ok: false, error: 'PayHere env missing (merchant id/secret)' })
    }

    const baseUrl = getSiteBaseUrl(req)
    const notifyBase = getNotifyBaseUrl(req)

    // ✅ PayHere order_id = groupId (cart group)
    const return_url = `${baseUrl}/store/return?order_id=${encodeURIComponent(groupId)}`
    const cancel_url = `${baseUrl}/store/cancel?order_id=${encodeURIComponent(groupId)}`
    const notify_url = `${notifyBase}/api/payhere/notify`

    const payload = {
      merchant_id,
      return_url,
      cancel_url,
      notify_url,

      order_id: groupId,
      items: `Jeevan Chandimal Photo Cart (${rows.length} items)`,
      currency: ccy,
      amount: Number(total).toFixed(2),

      first_name: 'Customer',
      last_name: '',
      email,
      phone: '',
      address: '',
      city: '',
      country: 'Sri Lanka',

      // ✅ make notify.js treat as cart
      custom_1: 'cart',
      custom_2: groupId,
    }

    const query = new URLSearchParams(payload).toString()
    const redirectUrl = `https://www.payhere.lk/pay/checkout?${query}`

    return res.status(200).json({
      ok: true,
      groupId,
      count: rows.length,
      total,
      redirectUrl,
    })
  } catch (e) {
    console.error('checkout-cart error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}