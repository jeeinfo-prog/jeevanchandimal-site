// pages/api/membership/create-order.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { payhereInitHash } from '../../../lib/payhere'

/**
 * ✅ Membership pricing (USD base)
 * - UI may send: { email, plan, currency } where plan=monthly/yearly/lifetime and tier assumed 'pro'
 * - Or new shape: { email, tier, term, currency_display }
 *
 * ✅ IMPORTANT (recommended):
 * - Always charge PayHere in **LKR** for memberships (stable for Sri Lanka gateway)
 * - UI currency toggle is for display only.
 */
const USD_BASE_PRICES = {
  basic: { monthly: 49, yearly: 490, lifetime: 1490 },
  pro: { monthly: 89, yearly: 890, lifetime: 2490 },
  elite: { monthly: 149, yearly: 1490, lifetime: 3990 },
}

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

function toNumber(v, fallback) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

// Basic sanity for FX (prevents garbage / malicious values)
function normalizeFxRate(v, fallback) {
  const n = Number(v)
  // USD->LKR realistic guardrails (adjust if needed)
  if (!Number.isFinite(n) || n < 100 || n > 1000) return fallback
  return n
}

function usdToLkr(usd, fxRate) {
  // PayHere supports 2 decimals; keep 2 decimals for gateway safety
  const x = Number(usd || 0) * Number(fxRate || 0)
  return Math.round(x * 100) / 100
}

async function fetchLiveUsdLkr(fallback) {
  try {
    // Use the same upstream you already use in /api/fx-rate
    const r = await fetch('https://open.er-api.com/v6/latest/USD', {
      headers: { 'Cache-Control': 'no-store' },
    })
    const data = await r.json().catch(() => null)
    const rate = data?.rates?.LKR
    const n = Number(rate)
    if (r.ok && Number.isFinite(n) && n > 0) return n
  } catch {}
  return fallback
}

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
    if (!validTiers.includes(tier)) {
      return res.status(400).json({ ok: false, error: 'Invalid tier' })
    }
    if (!validTerms.includes(term)) {
      return res.status(400).json({ ok: false, error: 'Invalid term' })
    }

    // Display currency only (UI toggle)
    const currencyDisplay = cleanUpper(body.currency_display || body.currency, 'USD')
    if (!['LKR', 'USD'].includes(currencyDisplay)) {
      return res.status(400).json({ ok: false, error: 'Invalid currency' })
    }

    // USD base amount for selection
    const usdAmount = USD_BASE_PRICES?.[tier]?.[term]
    if (!usdAmount) {
      return res.status(400).json({ ok: false, error: 'Invalid pricing selection' })
    }

    // ✅ Determine FX rate:
    // - prefer client-provided fx_rate (locked in browser) if valid
    // - else env fallback
    // - else fetch live
    const envFallback = normalizeFxRate(process.env.MEMBERSHIP_USD_LKR_RATE, 300)
    const clientFx = normalizeFxRate(body.fx_rate, null)
    const fxRate = clientFx || (await fetchLiveUsdLkr(envFallback))

    // ✅ Always charge memberships in LKR
    const payCurrency = 'LKR'
    const amount = usdToLkr(usdAmount, fxRate)

    // server env only
    const merchantId = String(process.env.PAYHERE_MERCHANT_ID || '').trim()
    const merchantSecret = String(process.env.PAYHERE_MERCHANT_SECRET || '').trim()
    const siteUrl = String(process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '').trim()
    const webhookBase = String(process.env.WEBHOOK_BASE_URL || siteUrl || '')
      .trim()
      .replace(/\/+$/, '')

    if (!merchantId || !merchantSecret) {
      return res.status(500).json({
        ok: false,
        error: 'Missing PAYHERE_MERCHANT_ID or PAYHERE_MERCHANT_SECRET (server env).',
      })
    }

    const orderId = crypto.randomUUID()

    /**
     * ✅ Store membership details using existing orders columns:
     * - license = tier (basic/pro/elite)
     * - format  = term (monthly/yearly/lifetime)
     *
     * ⚠️ Don’t add new columns here unless you KNOW they exist in Supabase,
     * otherwise insert will fail.
     */
    const payload = {
      id: orderId,
      email,
      order_kind: 'membership',

      license: tier,
      format: term,

      // store actual PayHere charge currency+amount
      currency: payCurrency,
      amount,
      status: 'PENDING',

      // placeholders for NOT NULL / legacy fields
      photo_id: 'membership',
      delivery_object_key: 'membership',
    }

    const { error } = await supabaseAdmin.from('orders').insert(payload)
    if (error) {
      console.error('membership order insert error:', error)
      return res.status(500).json({ ok: false, error: error.message })
    }

    // PayHere init hash with final amount+currency that will be posted from client
    const hash = payhereInitHash({
      merchantId,
      merchantSecret,
      orderId,
      amount,
      currency: payCurrency,
    })

    return res.status(200).json({
      ok: true,
      orderId,

      // ✅ PayHere values
      amount,
      currency: payCurrency,
      hash,

      // helpful to UI (display + debug)
      tier,
      term,
      usdAmount,
      fxRate,
      currencyDisplay,

      notifyUrl: webhookBase ? `${webhookBase}/api/payhere/notify` : undefined,
    })
  } catch (e) {
    console.error('membership/create-order error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}