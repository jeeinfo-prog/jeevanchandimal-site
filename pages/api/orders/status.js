// pages/api/orders/status.js
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const orderRef = String(req.query.order_id || '').trim()
    if (!orderRef) {
      return res.status(400).json({ ok: false, error: 'Missing order_id' })
    }

    // 1) Try by id (old flow)
    const byId = await supabaseAdmin
      .from('orders')
      .select('id,code,status,paid_at,payhere_status_code')
      .eq('id', orderRef)
      .maybeSingle()

    if (byId.error) {
      return res.status(500).json({ ok: false, error: byId.error.message })
    }

    if (byId.data) {
      return res.status(200).json({
        ok: true,
        id: byId.data.id,
        code: byId.data.code || null,
        status: byId.data.status,
        paid_at: byId.data.paid_at,
        payhere_status_code: byId.data.payhere_status_code,
      })
    }

    // 2) Try by code (cart flow)
    const byCode = await supabaseAdmin
      .from('orders')
      .select('id,code,status,paid_at,payhere_status_code')
      .eq('code', orderRef)
      .maybeSingle()

    if (byCode.error) {
      return res.status(500).json({ ok: false, error: byCode.error.message })
    }

    if (!byCode.data) {
      return res.status(404).json({ ok: false, error: 'Order not found' })
    }

    return res.status(200).json({
      ok: true,
      id: byCode.data.id,
      code: byCode.data.code || null,
      status: byCode.data.status,
      paid_at: byCode.data.paid_at,
      payhere_status_code: byCode.data.payhere_status_code,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}