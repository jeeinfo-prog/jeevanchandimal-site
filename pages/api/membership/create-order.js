// pages/api/membership/create-order.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

const PLAN_PRICES = {
  monthly: { LKR: 5000, USD: 15 },
  yearly: { LKR: 50000, USD: 150 },
  lifetime: { LKR: 120000, USD: 400 },
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

    const orderId = crypto.randomUUID()

    // IMPORTANT:
    // Membership orders do NOT have photo_id/license/format/object_key etc.
    // We set them explicitly to null so the insert works if your DB allows nulls.
    const payload = {
      id: orderId,
      email: cleanEmail,
      order_kind: 'membership',
      membership_plan: cleanPlan,
      currency: cleanCurrency,
      amount,
      status: 'PENDING',

      // membership -> null
      photo_id: null,
      license: null,
      format: null,
      delivery_object_key: null,
      user_id: null,
    }

    const { error } = await supabaseAdmin.from('orders').insert(payload)

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    return res.status(200).json({
      ok: true,
      orderId,
      amount,
      currency: cleanCurrency,
      plan: cleanPlan,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
