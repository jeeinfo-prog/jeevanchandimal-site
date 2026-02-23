// pages/api/membership/create-order.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { payhereInitHash } from '../../../lib/payhere'

/**
 * Membership pricing:
 * tier:  basic | pro | elite
 * term:  monthly | yearly | lifetime
 */
const PRICES = {
  basic: {
    monthly: { LKR: 9500, USD: 29 },
    yearly: { LKR: 95000, USD: 290 },
    lifetime: { LKR: 250000, USD: 850 },
  },
  pro: {
    monthly: { LKR: 18500, USD: 55 },
    yearly: { LKR: 185000, USD: 550 },
    lifetime: { LKR: 450000, USD: 1500 },
  },
  elite: {
    monthly: { LKR: 28500, USD: 85 },
    yearly: { LKR: 285000, USD: 850 },
    lifetime: { LKR: 650000, USD: 2200 },
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    // ✅ accept both old + new request shapes
    // old: { email, plan, currency } where plan was monthly/yearly/lifetime (pro assumed)
    // new: { email, tier, term, currency }
    const body = req.body || {}

    const email = String(body.email || '').trim().toLowerCase()
    const currency = cleanUpper(body.currency, 'LKR')

    // tier/term normalization
    let tier = cleanLower(body.tier, '')
    let term = cleanLower(body.term, '')

    // Backward compatibility:
    // if UI still sends { plan: 'monthly' }, treat it as term and default tier to 'pro'
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

    const amount = PRICES?.[tier]?.[term]?.[currency]
    if (!amount) {
      return res.status(400).json({ ok: false, error: 'Invalid pricing selection' })
    }

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
      hash,
      notifyUrl: webhookBase ? `${webhookBase}/api/payhere/notify` : undefined,
    })
  } catch (e) {
    console.error('membership/create-order error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}