// pages/api/orders/[id].js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  // ✅ GET only
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // HARD no-cache (Vercel/CDN/browser)
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  const { id } = req.query
  const orderId = String(id || '').trim()

  if (!orderId) {
    return res.status(400).json({ error: 'Missing order id' })
  }

  // ✅ remove code column usage; select order_id instead
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(
      'id,order_id,kind,status,items,photo_id,license,format,currency,amount,paid_at,payhere_payment_id'
    )
    .eq('id', orderId)
    .maybeSingle()

  if (error || !data) return res.status(404).json({ error: 'Order not found' })

  const kind = String(data.kind || '').toLowerCase() || (data.items ? 'cart' : 'single')

  return res.status(200).json({
    id: data.id,

    // ✅ keep "code" for any frontend still reading it
    code: data.order_id || null,
    order_id: data.order_id || null,

    kind, // 'cart' | 'single' | ...
    status: data.status,

    // Single photo fields (if applicable)
    photoId: data.photo_id || null,
    license: data.license || null,
    format: data.format || null,

    // Cart fields (if applicable)
    items: Array.isArray(data.items) ? data.items : null,

    currency: data.currency,
    amount: Number(data.amount || 0),
    paidAt: data.paid_at,
    paymentId: data.payhere_payment_id,
  })
}