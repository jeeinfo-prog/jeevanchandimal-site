import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

const PLAN_PRICES = {
  monthly: { LKR: 5000, USD: 15 },
  yearly: { LKR: 50000, USD: 150 },
  lifetime: { LKR: 120000, USD: 400 },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { email, plan, currency = 'LKR' } = req.body

    if (!email || !plan) {
      return res.status(400).json({ ok: false, error: 'Missing email or plan' })
    }

    const cleanEmail = String(email).trim().toLowerCase()

    if (!PLAN_PRICES[plan]) {
      return res.status(400).json({ ok: false, error: 'Invalid plan' })
    }

    const amount = PLAN_PRICES[plan][currency]
    if (!amount) {
      return res.status(400).json({ ok: false, error: 'Invalid currency' })
    }

    const orderId = crypto.randomUUID()

    const { error } = await supabaseAdmin.from('orders').insert({
      id: orderId,
      email: cleanEmail,
      order_kind: 'membership',
      membership_plan: plan,
      currency,
      amount,
      status: 'PENDING',
    })

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    return res.status(200).json({
      ok: true,
      orderId,
      amount,
      currency,
      plan,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message })
  }
}
