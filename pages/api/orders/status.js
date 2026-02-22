// pages/api/orders/status.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  // no-cache (prevents weird 304 behavior)
  res.setHeader('Cache-Control', 'no-store, max-age=0')

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const orderRef = String(req.query.order_id || '').trim()
    if (!orderRef) {
      return res.status(400).json({ ok: false, error: 'Missing order_id' })
    }

    // 1) Try by id (uuid) — old flow
    const byId = await supabaseAdmin
      .from('orders')
      .select('id,order_id,status,paid_at,payhere_status_code')
      .eq('id', orderRef)
      .maybeSingle()

    if (byId.error) {
      return res.status(500).json({ ok: false, error: byId.error.message })
    }

    if (byId.data) {
      return res.status(200).json({
        ok: true,
        id: byId.data.id,
        order_id: byId.data.order_id || null,
        code: byId.data.order_id || null, // backward compat
        status: byId.data.status,
        paid_at: byId.data.paid_at,
        payhere_status_code: byId.data.payhere_status_code ?? null,
      })
    }

    // 2) Try by order_id (PayHere order ref like ORD_...)
    const byOrderId = await supabaseAdmin
      .from('orders')
      .select('id,order_id,status,paid_at,payhere_status_code')
      .eq('order_id', orderRef)
      .maybeSingle()

    if (byOrderId.error) {
      return res.status(500).json({ ok: false, error: byOrderId.error.message })
    }

    if (!byOrderId.data) {
      return res.status(404).json({ ok: false, error: 'Order not found' })
    }

    return res.status(200).json({
      ok: true,
      id: byOrderId.data.id,
      order_id: byOrderId.data.order_id || null,
      code: byOrderId.data.order_id || null, // backward compat
      status: byOrderId.data.status,
      paid_at: byOrderId.data.paid_at,
      payhere_status_code: byOrderId.data.payhere_status_code ?? null,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}