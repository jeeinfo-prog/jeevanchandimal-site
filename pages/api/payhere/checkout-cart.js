// pages/api/payhere/checkout-cart.js
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

// ✅ Sandbox / Live switch
function getPayHereCheckoutBase() {
  const env =
    String(process.env.PAYHERE_ENV || process.env.NEXT_PUBLIC_PAYHERE_ENV || '')
      .trim()
      .toLowerCase()

  const sandboxFlag =
    String(process.env.PAYHERE_SANDBOX || process.env.NEXT_PUBLIC_PAYHERE_SANDBOX || '')
      .trim()
      .toLowerCase()

  const isSandbox = env === 'sandbox' || sandboxFlag === 'true' || sandboxFlag === '1' || sandboxFlag === 'yes'

  return isSandbox ? 'https://sandbox.payhere.lk/pay/checkout' : 'https://www.payhere.lk/pay/checkout'
}

/**
 * ✅ Safely resolve object key from photos row WITHOUT assuming column names exist.
 */
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

/**
 * ✅ Insert order with safe fallbacks when some columns don't exist.
 * We'll TRY: code + order_kind + items + (required fields).
 * If some columns don't exist, we retry with less.
 */
async function insertOrderWithFallback(row) {
  // 1) Try full row
  let r = await supabaseAdmin.from('orders').insert([row]).select('id, code').single()
  if (!r.error) return r

  const msg = String(r.error.message || '').toLowerCase()

  // 2) If items column missing, retry without items
  if (msg.includes('column') && msg.includes('items')) {
    const { items, ...rest } = row
    r = await supabaseAdmin.from('orders').insert([rest]).select('id, code').single()
    if (!r.error) return r
  }

  // 3) If order_kind missing, retry without it
  if (msg.includes('column') && msg.includes('order_kind')) {
    const { order_kind, ...rest } = row
    r = await supabaseAdmin.from('orders').insert([rest]).select('id, code').single()
    if (!r.error) return r
  }

  // 4) Minimal safe insert (still include NOT NULL columns)
  const minimal = {
    status: row.status,
    email: row.email,
    currency: row.currency,
    amount: row.amount,
    photo_id: row.photo_id,
    license: row.license,
    format: row.format,
    delivery_object_key: row.delivery_object_key,
    code: row.code,
  }

  r = await supabaseAdmin.from('orders').insert([minimal]).select('id, code').single()
  return r
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

    // ✅ Build clean items + compute total
    const cleanItems = []
    let total = 0

    for (const it of items) {
      const photoId = String(it.photoId || it.id || it._id || '').trim()
      const license = normLicense(it.license || it._license)
      const format = normFormat(it.format || it._format)
      const qty = Math.max(1, Math.min(99, Number(it.qty || it._qty || 1)))
      const unitPrice = Number(it.unitPrice || it.price || it._price || 0)

      if (!photoId) return res.status(400).json({ ok: false, error: 'Invalid cart item (missing photoId)' })
      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        return res.status(400).json({ ok: false, error: `Invalid cart item (missing price) photoId=${photoId}` })
      }

      const objectKey = await getObjectKeyForPhoto(photoId, format)
      const lineAmount = round2(unitPrice * qty)
      total += lineAmount

      cleanItems.push({
        photoId,
        title: String(it.title || ''),
        thumbUrl: String(it.thumbUrl || it.thumb_url || ''),
        license,
        format,
        currency: ccy,
        unitPrice,
        qty,
        objectKey,
      })
    }

    total = round2(total)

    // ✅ ONE DB ROW for the cart (code is UNIQUE, so this is required)
    const cartCode = makeCartCode()

    // Your orders table has NOT NULL: photo_id, license, format (based on your errors)
    // So we must provide placeholders. Use first item.
    const first = cleanItems[0]
    const placeholderLicense = normLicense(first?.license) || 'personal'
    const placeholderFormat = normFormat(first?.format) || 'jpg'
    const placeholderPhotoId = String(first?.photoId || '').trim()
    const placeholderKey = String(first?.objectKey || '').trim()

    if (!placeholderPhotoId || !placeholderKey) {
      return res.status(400).json({ ok: false, error: 'Cart item missing photoId/objectKey (cannot create order)' })
    }

    const toInsert = {
      status: 'PENDING',
      email,
      currency: ccy,
      amount: total,

      // ✅ required (NOT NULL) columns in your schema
      photo_id: placeholderPhotoId,
      license: placeholderLicense,
      format: placeholderFormat,
      delivery_object_key: placeholderKey,

      // ✅ cart markers
      order_kind: 'cart',
      code: cartCode,

      // ✅ only if column exists
      items: cleanItems,
    }

    const created = await insertOrderWithFallback(toInsert)
    if (created.error || !created.data) {
      return res.status(500).json({ ok: false, error: created.error?.message || 'Order create failed' })
    }

    const orderRowId = created.data.id

    const merchant_id = process.env.PAYHERE_MERCHANT_ID || process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID
    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET || process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_SECRET
    if (!merchant_id || !merchant_secret) {
      return res.status(500).json({ ok: false, error: 'PayHere env missing (merchant id/secret)' })
    }

    const baseUrl = getSiteBaseUrl(req)
    const notifyBase = getNotifyBaseUrl(req)

    // ✅ PayHere order_id should be the CART CODE (human-friendly) OR the DB id.
    // We'll send cartCode as order_id and also send DB id as custom_2.
    const return_url = `${baseUrl}/store/return?order_id=${encodeURIComponent(cartCode)}`
    const cancel_url = `${baseUrl}/store/cancel?order_id=${encodeURIComponent(cartCode)}`
    const notify_url = `${notifyBase}/api/payhere/notify`

    const payload = {
      merchant_id,
      return_url,
      cancel_url,
      notify_url,

      order_id: cartCode,
      items: `Jeevan Chandimal Photo Cart (${cleanItems.length} items)`,
      currency: ccy,
      amount: Number(total).toFixed(2),

      first_name: 'Customer',
      last_name: '',
      email,
      phone: '',
      address: '',
      city: '',
      country: 'Sri Lanka',

      custom_1: 'cart',
      custom_2: orderRowId, // ✅ DB id to find the cart row later
    }

    const query = new URLSearchParams(payload).toString()
    const redirectUrl = `${getPayHereCheckoutBase()}?${query}`

    return res.status(200).json({
      ok: true,
      cartCode,
      orderId: orderRowId,
      total,
      redirectUrl,
      payhere: {
        mode:
          getPayHereCheckoutBase().includes('sandbox') ? 'sandbox' : 'live',
      },
    })
  } catch (e) {
    console.error('checkout-cart error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}