// pages/api/orders/[id].js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  // HARD no-cache
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  const { id } = req.query
  const orderId = String(id || '').trim()

  if (!orderId) {
    return res.status(400).json({ ok: false, error: 'Missing order id' })
  }

  try {
    // ✅ DO NOT select columns that may not exist (kind, items)
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('id,code,status,photo_id,license,format,currency,amount,paid_at,payhere_payment_id')
      .eq('id', orderId)
      .maybeSingle()

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }
    if (!data) {
      return res.status(404).json({ ok: false, error: 'Order not found' })
    }

    // Your current DB schema = single-photo style
    const kind = 'single'

    return res.status(200).json({
      ok: true,
      id: data.id,

      // keep both for compatibility
      code: data.code || null,
      order_id: data.code || null,

      kind,
      status: data.status,

      photoId: data.photo_id || null,
      license: data.license || null,
      format: data.format || null,

      // cart not supported by current schema
      items: null,

      currency: data.currency || null,
      amount: Number(data.amount || 0),
      paidAt: data.paid_at || null,
      paymentId: data.payhere_payment_id || null,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}