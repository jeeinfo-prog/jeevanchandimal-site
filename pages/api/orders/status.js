// pages/api/orders/status.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function isCartGroup(ref) {
  return String(ref || '').toUpperCase().startsWith('CART_')
}

function normStatus(s) {
  return String(s || 'PENDING').trim().toUpperCase()
}

function groupStatus(rows) {
  const list = Array.isArray(rows) ? rows : []
  if (list.length === 0) return 'NOT_FOUND'

  const statuses = list.map((r) => normStatus(r.status))

  if (statuses.some((s) => s === 'FAILED' || s === 'CANCELED' || s === 'CANCELLED')) {
    return 'FAILED'
  }

  if (statuses.some((s) => s === 'PAID')) return 'PAID'

  return 'PENDING'
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const ref = String(req.query.order_id || '').trim()
    if (!ref) return res.status(400).json({ ok: false, error: 'Missing order_id' })

    /* =========================
       CART GROUP: CART_...
       group stored in orders.order_id
    ========================= */
    if (isCartGroup(ref)) {
      const r = await supabaseAdmin
        .from('orders')
        .select('id,status,paid_at,payhere_status_code,order_id,code')
        .eq('order_id', ref)

      if (r.error) return res.status(500).json({ ok: false, error: r.error.message })

      const rows = Array.isArray(r.data) ? r.data : []
      if (rows.length === 0) return res.status(404).json({ ok: false, error: 'Order not found' })

      const st = groupStatus(rows)
      const paidRow = rows.find((x) => normStatus(x.status) === 'PAID') || rows[0]

      return res.status(200).json({
        ok: true,
        id: paidRow?.id || rows[0].id,
        code: ref,
        order_id: ref,
        status: st,
        count: rows.length,
        paid_at: paidRow?.paid_at || null,
        payhere_status_code: paidRow?.payhere_status_code ?? null,
      })
    }

    /* =========================
       SINGLE ORDER: try by id
    ========================= */
    const byId = await supabaseAdmin
      .from('orders')
      .select('id,code,order_id,status,paid_at,payhere_status_code')
      .eq('id', ref)
      .maybeSingle()

    if (byId.error) return res.status(500).json({ ok: false, error: byId.error.message })
    if (byId.data) {
      const resolved = byId.data?.order_id || byId.data?.code || byId.data?.id || ref
      return res.status(200).json({
        ok: true,
        id: byId.data.id,
        code: byId.data.code || byId.data.order_id || byId.data.id || ref,
        order_id: resolved,
        status: byId.data.status,
        paid_at: byId.data.paid_at || null,
        payhere_status_code: byId.data.payhere_status_code ?? null,
      })
    }

    /* =========================
       SINGLE ORDER: try by order_id
    ========================= */
    const byOrderId = await supabaseAdmin
      .from('orders')
      .select('id,code,order_id,status,paid_at,payhere_status_code')
      .eq('order_id', ref)
      .maybeSingle()

    if (byOrderId.error) return res.status(500).json({ ok: false, error: byOrderId.error.message })
    if (byOrderId.data) {
      const resolved = byOrderId.data?.order_id || byOrderId.data?.code || byOrderId.data?.id || ref
      return res.status(200).json({
        ok: true,
        id: byOrderId.data.id,
        code: byOrderId.data.code || byOrderId.data.order_id || byOrderId.data.id || ref,
        order_id: resolved,
        status: byOrderId.data.status,
        paid_at: byOrderId.data.paid_at || null,
        payhere_status_code: byOrderId.data.payhere_status_code ?? null,
      })
    }

    /* =========================
       SINGLE ORDER: try by code
    ========================= */
    const byCode = await supabaseAdmin
      .from('orders')
      .select('id,code,order_id,status,paid_at,payhere_status_code')
      .eq('code', ref)
      .maybeSingle()

    if (byCode.error) return res.status(500).json({ ok: false, error: byCode.error.message })
    if (!byCode.data) return res.status(404).json({ ok: false, error: 'Order not found' })

    const resolved = byCode.data?.order_id || byCode.data?.code || byCode.data?.id || ref
    return res.status(200).json({
      ok: true,
      id: byCode.data.id,
      code: byCode.data.code || byCode.data.order_id || byCode.data.id || ref,
      order_id: resolved,
      status: byCode.data.status,
      paid_at: byCode.data.paid_at || null,
      payhere_status_code: byCode.data.payhere_status_code ?? null,
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}