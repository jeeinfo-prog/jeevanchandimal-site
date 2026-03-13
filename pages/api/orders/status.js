// pages/api/orders/status.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

function clean(v) {
  return String(v || '').trim()
}

function isCartGroup(ref) {
  return clean(ref).toUpperCase().startsWith('CART_')
}

function normStatus(s) {
  return clean(s || 'PENDING').toUpperCase()
}

function isPaidRow(row) {
  const status = normStatus(row?.status)
  const gatewayCode = clean(row?.payhere_status_code)
  const paidAt = clean(row?.paid_at)

  if (gatewayCode === '2') return true
  if (paidAt) return true
  if (status === 'PAID' || status === 'SUCCESS' || status === 'COMPLETED' || status === 'CONFIRMED') {
    return true
  }
  return false
}

function isFailedRow(row) {
  const status = normStatus(row?.status)
  const gatewayCode = clean(row?.payhere_status_code)

  if (gatewayCode === '-1' || gatewayCode === '-2' || gatewayCode === '-3') return true
  if (status === 'FAILED' || status === 'CANCELED' || status === 'CANCELLED' || status === 'EXPIRED') {
    return true
  }
  return false
}

function groupStatus(rows) {
  const list = Array.isArray(rows) ? rows : []
  if (list.length === 0) return 'NOT_FOUND'

  if (list.some(isPaidRow)) return 'PAID'
  if (list.some(isFailedRow)) return 'FAILED'
  return 'PENDING'
}

function buildResponse(row) {
  return {
    ok: true,
    status: normStatus(row?.status),
  }
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
    const orderIdRef = clean(req.query.order_id)
    const codeRef = clean(req.query.code)
    const idRef = clean(req.query.id)

    const ref = orderIdRef || codeRef || idRef

    if (!ref) {
      return res.status(400).json({ ok: false, error: 'Missing order reference' })
    }

    /* =========================
       CART GROUP: CART_...
       Can be sent as code=... or order_id=...
    ========================= */
    if (isCartGroup(ref)) {
      const byGroupOrderId = await supabaseAdmin
        .from('orders')
        .select('status,paid_at,payhere_status_code')
        .eq('order_id', ref)

      if (byGroupOrderId.error) {
        return res.status(500).json({ ok: false, error: byGroupOrderId.error.message })
      }

      let rows = Array.isArray(byGroupOrderId.data) ? byGroupOrderId.data : []

      if (rows.length === 0) {
        const byGroupCode = await supabaseAdmin
          .from('orders')
          .select('status,paid_at,payhere_status_code')
          .eq('code', ref)

        if (byGroupCode.error) {
          return res.status(500).json({ ok: false, error: byGroupCode.error.message })
        }

        rows = Array.isArray(byGroupCode.data) ? byGroupCode.data : []
      }

      if (rows.length === 0) {
        return res.status(404).json({ ok: false, error: 'Order not found' })
      }

      return res.status(200).json({
        ok: true,
        status: groupStatus(rows),
      })
    }

    /* =========================
       SINGLE ORDER: try by id
    ========================= */
    const byId = await supabaseAdmin
      .from('orders')
      .select('status,paid_at,payhere_status_code')
      .eq('id', ref)
      .maybeSingle()

    if (byId.error) {
      return res.status(500).json({ ok: false, error: byId.error.message })
    }
    if (byId.data) {
      return res.status(200).json(buildResponse(byId.data))
    }

    /* =========================
       SINGLE ORDER: try by order_id
    ========================= */
    const byOrderId = await supabaseAdmin
      .from('orders')
      .select('status,paid_at,payhere_status_code')
      .eq('order_id', ref)
      .maybeSingle()

    if (byOrderId.error) {
      return res.status(500).json({ ok: false, error: byOrderId.error.message })
    }
    if (byOrderId.data) {
      return res.status(200).json(buildResponse(byOrderId.data))
    }

    /* =========================
       SINGLE ORDER: try by code
    ========================= */
    const byCode = await supabaseAdmin
      .from('orders')
      .select('status,paid_at,payhere_status_code')
      .eq('code', ref)
      .maybeSingle()

    if (byCode.error) {
      return res.status(500).json({ ok: false, error: byCode.error.message })
    }
    if (byCode.data) {
      return res.status(200).json(buildResponse(byCode.data))
    }

    return res.status(404).json({ ok: false, error: 'Order not found' })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}