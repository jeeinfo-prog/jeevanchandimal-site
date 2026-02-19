import { supabaseAdmin } from '@/lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const orderId = String(req.query.order_id || '').trim()

  if (!orderId) {
    return res.status(400).json({ ok: false, error: 'Missing order_id' })
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('id,status,amount,currency,email,updated_at,created_at')
    .eq('id', orderId)
    .single()

  if (error || !data) {
    return res.status(404).json({ ok: false, error: 'Order not found' })
  }

  return res.status(200).json({ ok: true, order: data })
}
