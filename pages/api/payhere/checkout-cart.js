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

// ✅ Reads PayHere mode from Supabase app_settings, with env fallbacks.
// Supports your existing PAYHERE_SANDBOX=true too.
async function getPayhereMode() {
  // ENV fallbacks (your project uses PAYHERE_SANDBOX)
  const sandboxFlag =
    String(process.env.PAYHERE_SANDBOX || process.env.NEXT_PUBLIC_PAYHERE_SANDBOX || '')
      .trim()
      .toLowerCase() === 'true'

  const envModeRaw = String(process.env.PAYHERE_ENV || process.env.PAYHERE_MODE || '')
    .trim()
    .toLowerCase()

  // Default if nothing set:
  let fallbackMode = 'sandbox'
  if (sandboxFlag) fallbackMode = 'sandbox'
  else if (envModeRaw === 'live') fallbackMode = 'live'
  else if (envModeRaw === 'sandbox') fallbackMode = 'sandbox'

  try {
    const { data, error } = await supabaseAdmin
      .from('app_settings')
      .select('value')
      .eq('key', 'payhere_mode')
      .maybeSingle()

    if (error) return fallbackMode

    const v = String(data?.value || '').trim().toLowerCase()
    if (v === 'live') return 'live'
    return 'sandbox'
  } catch {
    return fallbackMode
  }
}

async function getObjectKeyForPhoto(photoId, format) {
  const pid = String(photoId || '').trim()
  if (!pid) throw new Error('Missing photoId')

  // ✅ only select columns you actually use
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

async function insertOrderWithFallback(orderRow) {
  // Try insert with items + payhere_mode (if columns exist),
  // then retry dropping fields if DB doesn’t have those columns.
  const tryInsert = async (row) =>
    supabaseAdmin.from('orders').insert(row).select('id, code, amount').maybeSingle()

  // 1) first attempt
  let ins = await tryInsert(orderRow)
  if (!ins.error) return ins

  const msg = String(ins.error.message || '')

  // 2) if column doesn't exist, retry removing payhere_mode
  if (msg.includes('payhere_mode') && msg.includes('column')) {
    const { payhere_mode, ...rest } = orderRow
    ins = await tryInsert(rest)
    if (!ins.error) return ins
  }

  // 3) if items column doesn't exist, retry removing items
  if (msg.includes('items') && msg.includes('column')) {
    const { items, ...rest } = orderRow
    ins = await tryInsert(rest)
    if (!ins.error) return ins
  }

  // 4) retry removing both (in case both missing)
  if (
    (msg.includes('payhere_mode') && msg.includes('column')) ||
    (msg.includes('items') && msg.includes('column'))
  ) {
    const { items, payhere_mode, ...rest } = orderRow
    ins = await tryInsert(rest)
    if (!ins.error) return ins
  }

  return ins
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

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

    // ✅ normalize cart items
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
        objectKey,
      })
    }

    total = round2(total)

    const code = makeCartCode()

    // satisfy NOT NULL columns in your orders table
    const topPhotoId = String(normalizedItems[0]?.photoId || '').trim()
    if (!topPhotoId) return res.status(400).json({ ok: false, error: 'Cart missing first photoId' })

    const payhereMode = await getPayhereMode()

    // ✅ order row
    const orderRow = {
      id: `ORD_${Date.now()}_${Math.random().toString(16).slice(2, 14)}`,
      status: 'PENDING',
      email,
      currency,
      amount: Number(total).toFixed(2),

      // NOT NULL schema fields:
      photo_id: topPhotoId,
      license: 'personal',
      format: 'jpg',

      // cart identity:
      order_kind: 'cart',
      code,
      items: normalizedItems, // JSONB (fallback will remove if column missing)
      order_id: code,

      // Optional (fallback removes if column missing)
      payhere_mode: payhereMode,
    }

    const ins = await insertOrderWithFallback(orderRow)
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

      custom_1: 'cart',
      custom_2: created?.id || orderRow.id,
    }

    const query = new URLSearchParams(payload).toString()

    const payhereHost = payhereMode === 'live' ? 'https://www.payhere.lk' : 'https://sandbox.payhere.lk'
    const redirectUrl = `${payhereHost}/pay/checkout?${query}`

    return res.status(200).json({
      ok: true,
      id: created?.id || orderRow.id,
      code,
      total,
      redirectUrl,
      payhereMode,
    })
  } catch (e) {
    console.error('checkout-cart error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}