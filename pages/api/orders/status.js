// pages/api/orders/status.js
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const orderId = String(req.query.order_id || '').trim()
    if (!orderId) {
      return res.status(400).json({ ok: false, error: 'Missing order_id' })
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('id,status,paid_at,payhere_status_code')
      .eq('id', orderId)
      .maybeSingle()

    if (error) return res.status(500).json({ ok: false, error: error.message })
    if (!data) return res.status(404).json({ ok: false, error: 'Order not found' })

    return res.status(200).json({
      ok: true,
      id: data.id,
      status: data.status,
      paid_at: data.paid_at,
      payhere_status_code: data.payhere_status_code,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
