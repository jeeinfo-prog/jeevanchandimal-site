// pages/api/payhere/checkout-cart.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function round2(n) {
  const x = Number(n || 0)
  return Math.round(x * 100) / 100
}

// ✅ PayHere order_id string AND we store it in orders.order_id
function makeOrderRef() {
  return `ORD_${Date.now()}_${Math.random().toString(16).slice(2, 8).toUpperCase()}`
}

function normLicense(v) {
  return ['personal', 'commercial', 'editorial'].includes(v) ? v : 'personal'
}
function normFormat(v) {
  return v === 'raw' ? 'raw' : 'jpg'
}
function normCurrency(v) {
  return v === 'USD' ? 'USD' : 'LKR'
}

// ✅ IMPORTANT: adjust these column names to match your photos table if needed
async function getObjectKeyForPhoto(photoId, format) {
  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id, original_object_key, original_key, object_key, r2_key, raw_object_key, raw_key')
    .eq('id', photoId)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) throw new Error(`Photo not found: ${photoId}`)

  if (format === 'raw') {
    const raw = p.raw_object_key || p.raw_key
    if (raw) return String(raw)
    return `photos/original/${photoId}.zip`
  }

  const ok = p.original_object_key || p.original_key || p.object_key || p.r2_key
  if (ok) return String(ok)

  return `photos/original/${photoId}.jpg`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { email, currency, items } = req.body || {}

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok: false, error: 'Cart is empty' })
    }

    const ccy = normCurrency(currency)

    // ✅ Ensure all items use same currency (currency lock)
    const mismatch = items.find((it) => normCurrency(it.currency) !== ccy)
    if (mismatch) {
      return res.status(400).json({ ok: false, error: 'Currency mismatch in cart' })
    }

    // ✅ Validate + enrich items with objectKey
    const cleanItems = []
    for (const it of items) {
      const photoId = String(it.photoId || '')
      const license = normLicense(it.license)
      const format = normFormat(it.format)
      const unitPrice = Number(it.unitPrice || 0)
      const qty = Math.max(1, Math.min(99, Number(it.qty || 1)))

      if (!photoId || !unitPrice || unitPrice <= 0) {
        return res.status(400).json({ ok: false, error: 'Invalid cart items' })
      }

      const objectKey = await getObjectKeyForPhoto(photoId, format)

      cleanItems.push({
        photoId,
        title: String(it.title || ''),
        thumbUrl: String(it.thumbUrl || ''),
        license,
        format,
        currency: ccy,
        unitPrice,
        qty,
        objectKey, // ✅ stored for later downloads
      })
    }

    const amount = round2(cleanItems.reduce((sum, it) => sum + it.unitPrice * it.qty, 0))

    // ✅ order_ref is what PayHere will send back as "order_id"
    const orderRef = makeOrderRef()

    // ✅ Insert order using order_id (NOT code)
    const { data: created, error: createErr } = await supabaseAdmin
      .from('orders')
      .insert([
        {
          order_id: orderRef,
          email: email || null,
          currency: ccy,
          amount,
          status: 'pending',
          kind: 'cart',
          items: cleanItems,
        },
      ])
      .select('id, order_id')
      .single()

    if (createErr) {
      return res.status(500).json({ ok: false, error: createErr.message })
    }

    const orderId = created?.id
    const ref = created?.order_id || orderRef

    const merchant_id = process.env.PAYHERE_MERCHANT_ID
    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jeevanchandimal.com'

    if (!merchant_id || !merchant_secret) {
      return res.status(500).json({ ok: false, error: 'PayHere env missing' })
    }

    const return_url = `${baseUrl}/store/return?order_id=${encodeURIComponent(ref)}`
    const cancel_url = `${baseUrl}/store/cancel?order_id=${encodeURIComponent(ref)}`
    const notify_url = `${baseUrl}/api/payhere/notify`

    const payload = {
      merchant_id,
      return_url,
      cancel_url,
      notify_url,
      order_id: ref,
      items: `Jeevan Chandimal Photo Cart (${cleanItems.length} items)`,
      currency: ccy,
      amount: amount.toFixed(2),

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

    return res.status(200).json({ ok: true, orderId, orderRef: ref, orderCode: ref, redirectUrl })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}