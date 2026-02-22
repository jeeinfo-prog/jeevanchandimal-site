// pages/api/orders/[id].js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  // ✅ GET only
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  // ✅ HARD no-cache (Vercel/CDN/browser)
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  const { id } = req.query
  const orderId = String(id || '').trim()

  if (!orderId) {
    return res.status(400).json({ ok: false, error: 'Missing order id' })
  }

  // ✅ Your DB has: code (NOT order_id)
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(
      'id,code,kind,status,items,photo_id,license,format,currency,amount,paid_at,payhere_payment_id'
    )
    .eq('id', orderId)
    .maybeSingle()

  if (error) {
    return res.status(500).json({ ok: false, error: error.message })
  }

  if (!data) {
    return res.status(404).json({ ok: false, error: 'Order not found' })
  }

  const kind = String(data.kind || '').toLowerCase() || (data.items ? 'cart' : 'single')

  return res.status(200).json({
    ok: true,

    id: data.id,

    // ✅ keep both for compatibility
    code: data.code || null,
    order_id: data.code || null, // alias for old frontend

    kind,
    status: data.status,

    // Single photo fields
    photoId: data.photo_id || null,
    license: data.license || null,
    format: data.format || null,

    // Cart fields
    items: Array.isArray(data.items) ? data.items : null,

    currency: data.currency || null,
    amount: Number(data.amount || 0),
    paidAt: data.paid_at || null,
    paymentId: data.payhere_payment_id || null,
  })
}