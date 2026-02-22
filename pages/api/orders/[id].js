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
    // ✅ Use the same lookup logic as notify.js: id OR order_id OR code
    // ✅ Keep select list safe (only columns you know exist)
    const selectCols =
      'id,code,order_id,status,photo_id,license,format,currency,amount,paid_at,payhere_payment_id,kind,order_kind,items'

    // 1) orders.id
    let q = await supabaseAdmin.from('orders').select(selectCols).eq('id', ref).maybeSingle()
    let data = q?.data

    // 2) orders.order_id
    if (!data) {
      q = await supabaseAdmin.from('orders').select(selectCols).eq('order_id', ref).maybeSingle()
      data = q?.data
    }

    // 3) orders.code
    if (!data) {
      q = await supabaseAdmin.from('orders').select(selectCols).eq('code', ref).maybeSingle()
      data = q?.data
    }

    if (q?.error) {
      return res.status(500).json({ ok: false, error: q.error.message })
    }
    if (!data) {
      return res.status(404).json({ ok: false, error: 'Order not found' })
    }

    // Determine kind safely
    const kind =
      String(data.kind || data.order_kind || '').toLowerCase() === 'cart' ||
      Array.isArray(data.items) ||
      (data.items && typeof data.items === 'object')
        ? 'cart'
        : String(data.kind || data.order_kind || 'single').toLowerCase() === 'membership'
        ? 'membership'
        : 'single'

    // If cart, keep items, else null (to match your frontend expectation)
    const items = kind === 'cart' ? (Array.isArray(data.items) ? data.items : []) : null

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

      items,

      currency: data.currency || null,
      amount: Number(data.amount || 0),

      paidAt: data.paid_at || null,
      paymentId: data.payhere_payment_id || null,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}