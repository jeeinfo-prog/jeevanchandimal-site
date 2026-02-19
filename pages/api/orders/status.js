import { supabaseAdmin } from '@/lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const orderId = String(req.query.order_id || '').trim()
    if (!orderId) {
      return res.status(400).json({ ok: false, error: 'Missing order_id' })
    }

    // ✅ Support both schemas: some tables use `id`, some use `order_id`
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('id,order_id,status,amount,currency,email,updated_at,created_at')
      .or(`id.eq.${orderId},order_id.eq.${orderId}`)
      .limit(1)
      .maybeSingle()

    if (error) return res.status(500).json({ ok: false, error: error.message })
    if (!data) return res.status(404).json({ ok: false, error: 'Order not found' })

    return res.status(200).json({ ok: true, order: data })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message || 'Server error' })
  }
}
