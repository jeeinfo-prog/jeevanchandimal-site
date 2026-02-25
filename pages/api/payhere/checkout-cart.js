// pages/api/payhere/checkout-cart.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import crypto from 'crypto'

function round2(n) {
  const x = Number(n || 0)
  return Math.round(x * 100) / 100
}

function money2(n) {
  const x = Number(n || 0)
  return (Math.round(x * 100) / 100).toFixed(2)
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
async function getPayhereMode() {
  const sandboxFlag =
    String(process.env.PAYHERE_SANDBOX || process.env.NEXT_PUBLIC_PAYHERE_SANDBOX || '')
      .trim()
      .toLowerCase() === 'true'

  const envModeRaw = String(process.env.PAYHERE_ENV || process.env.PAYHERE_MODE || '')
    .trim()
    .toLowerCase()

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

/**
 * ✅ STRICT INSERT:
 * - NEVER drops `items`
 * - If DB missing orders.items, FAIL FAST with clear error
 * - Still allows dropping optional columns like payhere_mode / fx fields
 */
async function insertOrderStrict(orderRow) {
  const tryInsert = async (row) =>
    supabaseAdmin.from('orders').insert(row).select('id, code, amount').maybeSingle()

  let ins = await tryInsert(orderRow)
  if (!ins.error) return ins

  const msg = String(ins.error.message || '')

  if (msg.includes('items') && msg.includes('column')) {
    return {
      data: null,
      error: new Error(
        'DB missing orders.items column. Run: alter table orders add column if not exists items jsonb;'
      ),
    }
  }

  async function retry(dropKeys) {
    const next = { ...orderRow }
    for (const k of dropKeys) delete next[k]
    return tryInsert(next)
  }

  if (msg.includes('payhere_mode') && msg.includes('column')) {
    ins = await retry(['payhere_mode'])
    if (!ins.error) return ins
  }

  if (msg.includes('fx_usd_lkr') && msg.includes('column')) {
    ins = await retry(['fx_usd_lkr'])
    if (!ins.error) return ins
  }

  if (msg.includes('fx_locked_at') && msg.includes('column')) {
    ins = await retry(['fx_locked_at'])
    if (!ins.error) return ins
  }

  ins = await retry(['payhere_mode', 'fx_usd_lkr', 'fx_locked_at'])
  if (!ins.error) return ins

  return ins
}

// PayHere hash helper
function md5(s) {
  return crypto.createHash('md5').update(String(s)).digest('hex')
}

function computePayHereHash({ merchant_id, order_id, amount, currency, merchant_secret }) {
  const secretHash = md5(merchant_secret).toUpperCase()
  return md5(`${merchant_id}${order_id}${amount}${currency}${secretHash}`).toUpperCase()
}

function getMerchantCreds(payhereMode) {
  const isLive = payhereMode === 'live'

  const merchant_id =
    (isLive
      ? process.env.PAYHERE_MERCHANT_ID_LIVE
      : process.env.PAYHERE_MERCHANT_ID_SANDBOX) ||
    process.env.PAYHERE_MERCHANT_ID ||
    process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID

  const merchant_secret =
    (isLive
      ? process.env.PAYHERE_MERCHANT_SECRET_LIVE
      : process.env.PAYHERE_MERCHANT_SECRET_SANDBOX) ||
    process.env.PAYHERE_MERCHANT_SECRET

  return { merchant_id, merchant_secret }
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

    const usdLkr = body.usdLkr != null ? Number(body.usdLkr) : null
    const fxLockedAt = body.fxLockedAt != null ? Number(body.fxLockedAt) : null

    if (!email) return res.status(400).json({ ok: false, error: 'Missing email' })
    if (!items.length) return res.status(400).json({ ok: false, error: 'Cart is empty' })

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
        amount: round2(lineAmount),
        objectKey,
      })
    }

    total = round2(total)

    const code = makeCartCode()
    const topPhotoId = String(normalizedItems[0]?.photoId || '').trim()
    if (!topPhotoId) return res.status(400).json({ ok: false, error: 'Cart missing first photoId' })

    const payhereMode = await getPayhereMode()

    const orderRow = {
      id: `ORD_${Date.now()}_${Math.random().toString(16).slice(2, 14)}`,
      status: 'PENDING',
      email,
      currency,
      amount: money2(total),

      fx_usd_lkr: usdLkr != null ? round2(usdLkr) : null,
      fx_locked_at: fxLockedAt ? new Date(Number(fxLockedAt)).toISOString() : null,

      photo_id: topPhotoId,
      license: 'personal',
      format: 'jpg',

      order_kind: 'cart',
      code,
      items: normalizedItems,
      order_id: code,

      payhere_mode: payhereMode,
    }

    const ins = await insertOrderStrict(orderRow)
    if (ins.error) {
      return res.status(500).json({ ok: false, error: ins.error.message })
    }

    const created = ins.data

    const { merchant_id, merchant_secret } = getMerchantCreds(payhereMode)
    if (!merchant_id) return res.status(500).json({ ok: false, error: 'Missing PAYHERE_MERCHANT_ID' })
    if (!merchant_secret)
      return res.status(500).json({ ok: false, error: 'Missing PAYHERE_MERCHANT_SECRET' })

    const baseUrl = getSiteBaseUrl(req)
    const notifyBase = getNotifyBaseUrl(req)

    const return_url = `${baseUrl}/store/return?order_id=${encodeURIComponent(code)}`
    const cancel_url = `${baseUrl}/store/cancel?order_id=${encodeURIComponent(code)}`
    const notify_url = `${notifyBase}/api/payhere/notify`

    const action =
      payhereMode === 'live'
        ? 'https://www.payhere.lk/pay/checkout'
        : 'https://sandbox.payhere.lk/pay/checkout'

    const amountStr = money2(total)

    const fields = {
      merchant_id,
      return_url,
      cancel_url,
      notify_url,

      order_id: code,
      items: `Jeevan Chandimal Photo Cart (${normalizedItems.length} items)`,
      currency,
      amount: amountStr,

      first_name: 'Customer',
      last_name: '',
      email,
      phone: '',
      address: '',
      city: '',
      country: 'Sri Lanka',

      custom_1: 'cart',
      custom_2: created?.id || orderRow.id,

      hash: computePayHereHash({
        merchant_id,
        order_id: code,
        amount: amountStr,
        currency,
        merchant_secret,
      }),
    }

    return res.status(200).json({
      ok: true,
      id: created?.id || orderRow.id,
      code,
      total: amountStr,
      payhereMode,
      action,
      fields,
      fxLockedAt: fxLockedAt || null,
    })
  } catch (e) {
    console.error('checkout-cart error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}