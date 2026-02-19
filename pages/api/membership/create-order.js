// pages/api/membership/create-order.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { payhereInitHash } from '../../../lib/payhere'

// ✅ Prices (match your UI Pro plan)
const PLAN_PRICES = {
  monthly: { LKR: 18500, USD: 55 },
  yearly: { LKR: 185000, USD: 550 }, // optional
  lifetime: { LKR: 450000, USD: 1500 }, // optional
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { email, plan, currency = 'LKR' } = req.body || {}

    const cleanEmail = String(email || '').trim().toLowerCase()
    const cleanPlan = String(plan || '').trim().toLowerCase()
    const cleanCurrency = String(currency || 'LKR').trim().toUpperCase()

    if (!cleanEmail || !cleanPlan) {
      return res.status(400).json({ ok: false, error: 'Missing email or plan' })
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' })
    }

    if (!PLAN_PRICES[cleanPlan]) {
      return res.status(400).json({ ok: false, error: 'Invalid plan' })
    }

    const amount = PLAN_PRICES[cleanPlan][cleanCurrency]
    if (!amount) {
      return res.status(400).json({ ok: false, error: 'Invalid currency' })
    }

    // ✅ Server env (NOT NEXT_PUBLIC_*)
    const merchantId = String(process.env.PAYHERE_MERCHANT_ID || '').trim()
    const merchantSecret = String(process.env.PAYHERE_MERCHANT_SECRET || '').trim()

    if (!merchantId || !merchantSecret) {
      return res.status(500).json({
        ok: false,
        error: 'Missing PAYHERE_MERCHANT_ID or PAYHERE_MERCHANT_SECRET (server env).',
      })
    }

    const orderId = crypto.randomUUID()

    // ✅ Orders table placeholders for NOT NULL photo-order fields
    const payload = {
      id: orderId,
      email: cleanEmail,

      order_kind: 'membership',
      membership_plan: cleanPlan,

      currency: cleanCurrency,
      amount,
      status: 'PENDING',

      // placeholders for NOT NULL fields in your orders schema
      photo_id: 'membership',
      license: 'membership',
      format: 'membership',
      delivery_object_key: 'membership',
    }

    const { error } = await supabaseAdmin.from('orders').insert(payload)
    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    // ✅ PayHere init hash (required to avoid "Unauthorized payment request")
    const hash = payhereInitHash({
      merchantId,
      merchantSecret,
      orderId,
      amount,
      currency: cleanCurrency,
    })

    return res.status(200).json({
      ok: true,
      orderId,
      amount,
      currency: cleanCurrency,
      plan: cleanPlan,
      hash,
    })
  } catch (e) {
    console.error('membership/create-order error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
