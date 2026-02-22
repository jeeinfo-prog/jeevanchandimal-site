// pages/api/orders/[id].js

import { supabaseAdmin } from '../../../lib/supabaseAdmin.js'

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

  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(
      'id,code,kind,status,items,photo_id,license,format,currency,amount,paid_at,payhere_payment_id'
    )
    .eq('id', orderId)
    .single()

  if (error || !data) return res.status(404).json({ error: 'Order not found' })

  const kind = String(data.kind || '').toLowerCase() || (data.items ? 'cart' : 'single')

  return res.status(200).json({
    id: data.id,
    code: data.code || null,
    kind, // 'cart' | 'single' | ...
    status: data.status,

    // Single photo fields (if applicable)
    photoId: data.photo_id || null,
    license: data.license || null,
    format: data.format || null,

    // Cart fields (if applicable)
    items: Array.isArray(data.items) ? data.items : null,

    currency: data.currency,
    amount: Number(data.amount),
    paidAt: data.paid_at,
    paymentId: data.payhere_payment_id,
  })
}