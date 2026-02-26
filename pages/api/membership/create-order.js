// pages/api/membership/create-order.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { payhereInitHash } from '../../../lib/payhere'

/**
 * ✅ Membership pricing (USD base)
 * - Your UI currently uses plan='monthly' to mean Pro monthly (backward compatibility).
 * - Currency can be USD or LKR.
 * - LKR is auto-converted from USD on the server.
 */
const USD_BASE_PRICES = {
  basic: {
    monthly: 49,
    yearly: 490,
    lifetime: 1490,
  },
  pro: {
    monthly: 89,
    yearly: 890,
    lifetime: 2490,
  },
  elite: {
    monthly: 149,
    yearly: 1490,
    lifetime: 3990,
  },
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
  return Number.isFinite(n) && n > 0 ? n : fallback
}

function usdToLkr(usd, fxRate) {
  // PayHere supports 2 decimals; LKR typically integer display,
  // but we keep 2 decimals safe for gateway.
  const x = Number(usd || 0) * Number(fxRate || 0)
  return Math.round(x * 100) / 100
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    /**
     * ✅ accept both old + new request shapes
     * old: { email, plan, currency } where plan was monthly/yearly/lifetime (pro assumed)
     * new: { email, tier, term, currency }
     */
    const body = req.body || {}

    const email = String(body.email || '').trim().toLowerCase()
    const currency = cleanUpper(body.currency, 'USD')

    // tier/term normalization
    let tier = cleanLower(body.tier, '')
    let term = cleanLower(body.term, '')

    // Backward compatibility:
    // If UI sends { plan: 'monthly' }, treat it as term and default tier to 'pro'
    if (!term && body.plan) term = cleanLower(body.plan, '')
    if (!tier) tier = 'pro'
    if (!term) term = 'monthly'

    if (!email || !tier || !term) {
      return res.status(400).json({ ok: false, error: 'Missing email, tier, or term' })
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }

    const validTiers = ['basic', 'pro', 'elite']
    const validTerms = ['monthly', 'yearly', 'lifetime']
    if (!validTiers.includes(tier)) {
      return res.status(400).json({ ok: false, error: 'Invalid tier' })
    }
    if (!validTerms.includes(term)) {
      return res.status(400).json({ ok: false, error: 'Invalid term' })
    }
    if (!['LKR', 'USD'].includes(currency)) {
      return res.status(400).json({ ok: false, error: 'Invalid currency' })
    }

    // ✅ USD base amount for the selection
    const usdAmount = USD_BASE_PRICES?.[tier]?.[term]
    if (!usdAmount) {
      return res.status(400).json({ ok: false, error: 'Invalid pricing selection' })
    }

    // ✅ FX rate for auto-conversion (you can wire real FX later)
    // Use env var so you can change without deploy:
    // MEMBERSHIP_USD_LKR_RATE=320 (example)
    const fxRate = toNumber(process.env.MEMBERSHIP_USD_LKR_RATE, 320)

    // ✅ final amount + currency for PayHere
    const amount = currency === 'LKR' ? usdToLkr(usdAmount, fxRate) : usdAmount

    // ✅ server env only
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
     * ✅ IMPORTANT:
     * Your orders table does NOT have membership_term/membership_tier.
     * So we store membership details using existing columns:
     * - license = tier (basic/pro/elite)
     * - format  = term (monthly/yearly/lifetime)
     *
     * Also: store USD base + fx info in optional columns if you have them,
     * but DO NOT require them (keep stable).
     */
    const payload = {
      id: orderId,
      email,
      order_kind: 'membership',

      // store membership metadata in existing fields
      license: tier,
      format: term,

      currency,
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

    // ✅ PayHere init hash with final amount+currency that will be posted from client
    const hash = payhereInitHash({
      merchantId,
      merchantSecret,
      orderId,
      amount,
      currency,
    })

    return res.status(200).json({
      ok: true,
      orderId,
      amount,
      currency,
      tier,
      term,
      // helpful for UI (optional)
      usdAmount,
      fxRate: currency === 'LKR' ? fxRate : undefined,
      hash,
      notifyUrl: webhookBase ? `${webhookBase}/api/payhere/notify` : undefined,
    })
  } catch (e) {
    console.error('membership/create-order error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}