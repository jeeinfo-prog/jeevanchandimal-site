// pages/api/membership/create-order.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { payhereInitHash } from '../../../lib/payhere'

const USD_BASE_PRICES = {
  basic: { monthly: 49, yearly: 490, lifetime: 1490 },
  pro: { monthly: 89, yearly: 890, lifetime: 2490 },
  elite: { monthly: 149, yearly: 1490, lifetime: 3990 },
}

/* ---------------- helpers ---------------- */

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

function cleanUpper(v, fallback) {
  const s = String(v || '').trim().toUpperCase()
  return s || fallback
}

function cleanLower(v, fallback) {
  const s = String(v || '').trim().toLowerCase()
  return s || fallback
}

// Basic sanity for FX (prevents garbage / malicious values)
function normalizeFxRate(v, fallback) {
  const n = Number(v)
  // USD->LKR realistic guardrails (adjust if needed)
  if (!Number.isFinite(n) || n < 100 || n > 1000) return fallback
  return n
}

function usdToLkrNumber(usd, fxRate) {
  const x = Number(usd || 0) * Number(fxRate || 0)
  return Math.round(x * 100) / 100
}

function money2(n) {
  return Number(n || 0).toFixed(2)
}

function cleanBaseUrl(v) {
  return String(v || '')
    .trim()
    .replace(/\/+$/, '')
}

function getBaseUrl(req) {
  const webhook =
    cleanBaseUrl(process.env.WEBHOOK_BASE_URL) ||
    cleanBaseUrl(process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL)
  if (webhook) return webhook

  const proto = (req.headers['x-forwarded-proto'] || 'https').toString()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString()
  if (host) return `${proto}://${host}`

  return cleanBaseUrl(process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL)
}

async function fetchLiveUsdLkr(fallback) {
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/USD', {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-store' },
    })
    if (!r.ok) return fallback
    const data = await r.json().catch(() => null)
    const n = Number(data?.rates?.LKR)
    if (Number.isFinite(n) && n > 0) return n
  } catch {}
  return fallback
}

function getPayhereMode() {
  // Set PAYHERE_MODE="sandbox" for testing, otherwise live.
  const m = String(process.env.PAYHERE_MODE || '').trim().toLowerCase()
  return m === 'sandbox' ? 'sandbox' : 'live'
}

function getPayhereCheckoutUrl(mode) {
  return mode === 'sandbox'
    ? 'https://sandbox.payhere.lk/pay/checkout'
    : 'https://www.payhere.lk/pay/checkout'
}

/* ---------------- handler ---------------- */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    /**
     * ✅ Accept both old + new request shapes
     * old: { email, plan, currency } where plan was monthly/yearly/lifetime (pro assumed)
     * new: { email, tier, term, currency_display, fx_rate }
     */
    const body = req.body || {}

    const email = String(body.email || '').trim().toLowerCase()
    if (!email) return res.status(400).json({ ok: false, error: 'Missing email' })
    if (!isValidEmail(email)) return res.status(400).json({ ok: false, error: 'Invalid email' })

    // tier/term normalization
    let tier = cleanLower(body.tier, '')
    let term = cleanLower(body.term, '')

    // Backward compatibility:
    // If UI sends { plan: 'monthly' }, treat it as term and default tier to 'pro'
    if (!term && body.plan) term = cleanLower(body.plan, '')
    if (!tier) tier = 'pro'
    if (!term) term = 'monthly'

    const validTiers = ['basic', 'pro', 'elite']
    const validTerms = ['monthly', 'yearly', 'lifetime']
    if (!validTiers.includes(tier)) return res.status(400).json({ ok: false, error: 'Invalid tier' })
    if (!validTerms.includes(term)) return res.status(400).json({ ok: false, error: 'Invalid term' })

    // Display currency only (UI toggle)
    const currencyDisplay = cleanUpper(body.currency_display || body.currency, 'USD')
    if (!['LKR', 'USD'].includes(currencyDisplay)) {
      return res.status(400).json({ ok: false, error: 'Invalid currency' })
    }

    // USD base amount
    const usdAmount = USD_BASE_PRICES?.[tier]?.[term]
    if (!usdAmount) return res.status(400).json({ ok: false, error: 'Invalid pricing selection' })

    // FX: client locked rate OR env fallback OR live fetch
    const envFallback = normalizeFxRate(process.env.MEMBERSHIP_USD_LKR_RATE, 300)
    const clientFx = normalizeFxRate(body.fx_rate, null)
    const fxRate = clientFx || (await fetchLiveUsdLkr(envFallback))

    // ✅ Always charge memberships in LKR
    const payCurrency = 'LKR'
    const amountNum = usdToLkrNumber(usdAmount, fxRate)
    const amount = money2(amountNum) // ✅ string "1234.00"

    // PayHere creds (server env only)
    const merchantId = String(process.env.PAYHERE_MERCHANT_ID || '').trim()
    const merchantSecret = String(process.env.PAYHERE_MERCHANT_SECRET || '').trim()
    if (!merchantId || !merchantSecret) {
      return res.status(500).json({
        ok: false,
        error: 'Missing PAYHERE_MERCHANT_ID or PAYHERE_MERCHANT_SECRET (server env).',
      })
    }

    const mode = getPayhereMode()
    const checkoutUrl = getPayhereCheckoutUrl(mode)

    const base = getBaseUrl(req)
    const notifyUrl = base ? `${base}/api/payhere/notify` : undefined

    const orderId = crypto.randomUUID()

    /**
     * ✅ Store membership details using existing orders columns:
     * - license = tier (basic/pro/elite)
     * - format  = term (monthly/yearly/lifetime)
     */
    const payload = {
      id: orderId,
      email,
      order_kind: 'membership',

      license: tier,
      format: term,

      currency: payCurrency,
      amount,
      status: 'PENDING',

      // legacy placeholders
      photo_id: 'membership',
      delivery_object_key: 'membership',
    }

    const { error } = await supabaseAdmin.from('orders').insert(payload)
    if (error) {
      console.error('membership order insert error:', error)
      return res.status(500).json({ ok: false, error: error.message })
    }

    const hash = payhereInitHash({
      merchantId,
      merchantSecret,
      orderId,
      amount,
      currency: payCurrency,
    })

    return res.status(200).json({
      ok: true,

      // ✅ PayHere essentials (frontend MUST use these)
      checkoutUrl,
      merchantId, // safe to expose
      orderId,
      amount,
      currency: payCurrency,
      hash,
      notifyUrl,

      // helpful debug/display fields
      tier,
      term,
      usdAmount,
      fxRate,
      currencyDisplay,
      mode,
    })
  } catch (e) {
    console.error('membership/create-order error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}