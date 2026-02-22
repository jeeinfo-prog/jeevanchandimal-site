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
  const ref = String(id || '').trim()

  if (!ref) {
    return res.status(400).json({ ok: false, error: 'Missing order id' })
  }

  try {
    // ✅ ONLY select columns that exist in your DB (based on your working file)
    const selectCols = 'id,code,order_id,status,photo_id,license,format,currency,amount,paid_at,payhere_payment_id'

    async function fetchBy(field) {
      const { data, error } = await supabaseAdmin.from('orders').select(selectCols).eq(field, ref).maybeSingle()
      if (error) throw new Error(error.message)
      return data
    }

    // ✅ Find by id OR order_id OR code (same as notify.js)
    let data = await fetchBy('id')
    if (!data) data = await fetchBy('order_id')
    if (!data) data = await fetchBy('code')

    if (!data) {
      return res.status(404).json({ ok: false, error: 'Order not found' })
    }

    // Your current schema for this endpoint = single-style response
    const kind = 'single'

    return res.status(200).json({
      ok: true,
      id: data.id,

      // ✅ fallback so frontend always has a usable ref
      code: data.code || data.order_id || data.id || ref,
      order_id: data.order_id || data.code || data.id || ref,

      kind,
      status: data.status,
      photoId: data.photo_id || null,
      license: data.license || null,
      format: data.format || null,
      items: null,

      currency: data.currency || null,
      amount: Number(data.amount || 0),
      paidAt: data.paid_at || null,
      paymentId: data.payhere_payment_id || null,
    })
  } catch (e) {
    console.error('orders/[id] error:', e)
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}