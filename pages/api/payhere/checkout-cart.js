// pages/api/payhere/checkout-cart.js
import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function round2(n) {
  const x = Number(n || 0)
  return Math.round(x * 100) / 100
}

function makeCartCode() {
  return `CART_${Date.now()}_${Math.random().toString(16).slice(2, 10).toUpperCase()}`
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

  // ✅ only select columns you actually use (safer than select '*')
  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id, original_key, original_jpg_key, original_raw_key')
    .eq('id', pid)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) throw new Error(`Photo not found: ${pid}`)

  if (format === 'raw') {
    if (p.original_raw_key) return String(p.original_raw_key)
    return null
  }

  const jpgKey = p.original_jpg_key || p.original_key
  return jpgKey ? String(jpgKey) : null
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

    const currency = normCurrency(body.currency || cart.currency)
    const email = String(body.email || cart.email || '').trim().toLowerCase()

    if (!email) return res.status(400).json({ ok: false, error: 'Missing email' })
    if (!items.length) return res.status(400).json({ ok: false, error: 'Cart is empty' })

    // ✅ Build normalized cart items that ALWAYS include license/format/objectKey
    const normalizedItems = []
    let total = 0

    for (const it of items) {
      const photoId = String(it.photoId || it.id || it._id || '').trim()
      const title = String(it.title || it.name || '').trim()
      const license = normLicense(it.license || it._license)
      const format = normFormat(it.format || it._format)
      const qty = Math.max(1, Math.min(99, Number(it.qty || it._qty || 1)))
      const unitPrice = Number(it.unitPrice || it.price || it._price || 0)

      if (!photoId) {
        return res.status(400).json({ ok: false, error: 'Invalid cart item (missing photoId)' })
      }
      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        return res.status(400).json({ ok: false, error: `Invalid price for photoId=${photoId}` })
      }

      const objectKey = await getObjectKeyForPhoto(photoId, format)
      if (!objectKey) {
        return res.status(400).json({
          ok: false,
          error: `Missing file key in photos table for photoId=${photoId} format=${format}`,
        })
      }

      const lineAmount = round2(unitPrice * qty)
      total += lineAmount

      normalizedItems.push({
        photoId,
        title,
        license,
        format,
        qty,
        unitPrice: round2(unitPrice),
        amount: lineAmount,
        objectKey, // ✅ stored for notify + token generation
      })
    }

    total = round2(total)

    // ✅ SINGLE cart order row (avoids UNIQUE(code) collision)
    const code = makeCartCode()

    // ✅ satisfy NOT NULL columns
    const topLicense = 'personal'
    const topFormat = 'jpg'
    const topPhotoId = String(normalizedItems[0]?.photoId || '').trim()

    if (!topPhotoId) {
      return res.status(400).json({ ok: false, error: 'Cart missing first photoId' })
    }

    const orderRow = {
      id: `ORD_${Date.now()}_${Math.random().toString(16).slice(2, 14)}`, // your style id
      status: 'PENDING',
      email,
      currency,
      amount: Number(total).toFixed(2),

      // NOT NULL schema fields:
      photo_id: topPhotoId,
      license: topLicense,
      format: topFormat,

      // cart identity:
      order_kind: 'cart',
      code, // ✅ UNIQUE
      items: normalizedItems, // ✅ JSONB

      // OPTIONAL: so you can also query by order_id if you want
      order_id: code,
    }

    const ins = await supabaseAdmin.from('orders').insert(orderRow).select('id, code, amount').maybeSingle()
    if (ins.error) {
      return res.status(500).json({ ok: false, error: ins.error.message })
    }
    const created = ins.data

    const merchant_id = process.env.PAYHERE_MERCHANT_ID || process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID
    if (!merchant_id) return res.status(500).json({ ok: false, error: 'Missing PAYHERE_MERCHANT_ID' })

    const baseUrl = getSiteBaseUrl(req)
    const notifyBase = getNotifyBaseUrl(req)

    const return_url = `${baseUrl}/store/return?order_id=${encodeURIComponent(code)}`
    const cancel_url = `${baseUrl}/store/cancel?order_id=${encodeURIComponent(code)}`
    const notify_url = `${notifyBase}/api/payhere/notify`

    const payload = {
      merchant_id,
      return_url,
      cancel_url,
      notify_url,

      // ✅ PayHere reference
      order_id: code,
      items: `Jeevan Chandimal Photo Cart (${normalizedItems.length} items)`,
      currency,
      amount: Number(total).toFixed(2),

      first_name: 'Customer',
      last_name: '',
      email,
      phone: '',
      address: '',
      city: '',
      country: 'Sri Lanka',

      // ✅ tell notify it's a cart + give it internal row id too
      custom_1: 'cart',
      custom_2: created?.id || orderRow.id,
    }

    const query = new URLSearchParams(payload).toString()

    // ✅ sandbox vs live
    const env = String(process.env.PAYHERE_ENV || '').toLowerCase()
    const payhereHost =
      env === 'sandbox' ? 'https://sandbox.payhere.lk' : 'https://www.payhere.lk'

    const redirectUrl = `${payhereHost}/pay/checkout?${query}`

    return res.status(200).json({
      ok: true,
      id: created?.id || orderRow.id,
      code,
      total,
      redirectUrl,
    })
  } catch (e) {
    console.error('checkout-cart error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}