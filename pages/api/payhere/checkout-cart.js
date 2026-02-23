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
  // Public base for return/cancel pages
  return (
    cleanBaseUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    `${(req.headers['x-forwarded-proto'] || 'https').toString()}://${(
      req.headers['x-forwarded-host'] || req.headers.host || ''
    ).toString()}`
  )
}

function getNotifyBaseUrl(req) {
  // IMPORTANT: PayHere must reach this URL from outside
  return (
    cleanBaseUrl(process.env.WEBHOOK_BASE_URL) ||
    cleanBaseUrl(process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL) ||
    getSiteBaseUrl(req)
  )
}

/**
 * ✅ Safely resolve object key from photos row WITHOUT assuming column names exist.
 * Your working keys look like:
 * photos/original/<photo_id>/<filename>.jpg
 */
async function getObjectKeyForPhoto(photoId, format) {
  const pid = String(photoId || '').trim()
  if (!pid) throw new Error('Missing photoId')

  const { data: p, error } = await supabaseAdmin.from('photos').select('*').eq('id', pid).maybeSingle()
  if (error) throw new Error(error.message)
  if (!p) throw new Error(`Photo not found: ${pid}`)

  // Try a bunch of possible columns (because your schema changed a few times)
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
    // fallback (best effort)
    return `photos/original/${pid}.zip`
  }

  if (jpgKey) return String(jpgKey)
  // fallback (best effort)
  return `photos/original/${pid}.jpg`
}

/**
 * ✅ Insert order but auto-fallback if some columns don't exist.
 * Your DB definitely has: order_id, email, currency, amount, status, order_kind (photo exists)
 * items/kind may not exist.
 */
async function insertOrderWithFallback(row) {
  // 1) Try full row
  let r = await supabaseAdmin.from('orders').insert([row]).select('id, order_id').single()
  if (!r.error) return r

  const msg = String(r.error.message || '')

  // 2) If "items" column missing, retry without it
  if (msg.toLowerCase().includes('column') && msg.toLowerCase().includes('items')) {
    const { items, ...rest } = row
    r = await supabaseAdmin.from('orders').insert([rest]).select('id, order_id').single()
    if (!r.error) return r
  }

  // 3) If "order_kind" missing, retry without it
  if (msg.toLowerCase().includes('column') && msg.toLowerCase().includes('order_kind')) {
    const { order_kind, ...rest } = row
    r = await supabaseAdmin.from('orders').insert([rest]).select('id, order_id').single()
    if (!r.error) return r
  }

  // 4) If both missing, retry with minimum safe columns
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

    // ✅ FIX: support both payload shapes:
    // A) cart.js sends: { email, currency, items }
    // B) older code might send: { cart: { currency, items, email }, currency }
    const cart = body.cart || {}
    const items =
      (Array.isArray(body.items) && body.items) ||
      (Array.isArray(cart.items) && cart.items) ||
      []
    const ccy = normCurrency(body.currency || cart.currency)

    const email = String(body.email || cart.email || '').trim().toLowerCase() || null

    if (!items.length) return res.status(400).json({ ok: false, error: 'Cart is empty' })

    // ✅ Validate + enrich items
    const cleanItems = []
    for (const it of items) {
      const photoId = String(it.photoId || it.id || it._id || '').trim()
      const license = normLicense(it.license || it._license)
      const format = normFormat(it.format || it._format)
      const qty = Math.max(1, Math.min(99, Number(it.qty || it._qty || 1)))

      // price can come as price/_price/unitPrice
      const unitPrice = Number(it.unitPrice || it.price || it._price || 0)

      if (!photoId) {
        return res.status(400).json({ ok: false, error: 'Invalid cart item (missing photoId)' })
      }
      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        return res.status(400).json({ ok: false, error: 'Invalid cart item (missing price)' })
      }

      const objectKey = await getObjectKeyForPhoto(photoId, format)

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

    // ✅ Insert order (no orders.kind)
    const toInsert = {
      order_id: orderRef, // PayHere will send this back as order_id
      email,
      currency: ccy,
      amount,
      status: 'PENDING', // keep consistent (your paid is "PAID")
      order_kind: 'cart', // if column exists
      items: cleanItems, // if column exists
    }

    const created = await insertOrderWithFallback(toInsert)

    if (created.error || !created.data) {
      return res.status(500).json({ ok: false, error: created.error?.message || 'Order create failed' })
    }

    const orderId = created.data.id
    const ref = created.data.order_id || orderRef

    const merchant_id = process.env.PAYHERE_MERCHANT_ID || process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID

    const merchant_secret =
      process.env.PAYHERE_MERCHANT_SECRET || process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_SECRET

    if (!merchant_id || !merchant_secret) {
      return res.status(500).json({ ok: false, error: 'PayHere env missing (merchant id/secret)' })
    }

    const baseUrl = getSiteBaseUrl(req)
    const notifyBase = getNotifyBaseUrl(req)

    // ✅ Use your existing pages (same as single flow)
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

      // ✅ make notify.js treat as cart
      custom_1: 'cart',
      // keep internal DB id if you want
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
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}