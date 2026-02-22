// pages/api/orders/status.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  // HARD no-cache (browser + CDN + Vercel)
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const ref = String(req.query.order_id || '').trim()
    if (!ref) {
      return res.status(400).json({ ok: false, error: 'Missing order_id' })
    }

    // helper to keep response consistent
    const pack = (row) => {
      const resolved = row?.code || row?.id || ref
      return {
        ok: true,
        id: row.id,
        code: resolved, // ✅ always present
        order_id: resolved, // ✅ always present
        status: row.status,
        paid_at: row.paid_at || null,
        payhere_status_code: row.payhere_status_code ?? null,
      }
    }

    // 1) Try by id (covers UUID + ORD_* ids)
    const byId = await supabaseAdmin
      .from('orders')
      .select('id,code,status,paid_at,payhere_status_code')
      .eq('id', ref)
      .maybeSingle()

    if (byId.error) {
      return res.status(500).json({ ok: false, error: byId.error.message })
    }

    if (byId.data) {
      return res.status(200).json(pack(byId.data))
    }

    // 2) Try by code (if you ever store code separately)
    const byCode = await supabaseAdmin
      .from('orders')
      .select('id,code,status,paid_at,payhere_status_code')
      .eq('code', ref)
      .maybeSingle()

    if (byCode.error) {
      return res.status(500).json({ ok: false, error: byCode.error.message })
    }

    if (!byCode.data) {
      return res.status(404).json({ ok: false, error: 'Order not found' })
    }

    return res.status(200).json(pack(byCode.data))
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}