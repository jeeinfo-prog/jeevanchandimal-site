import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createDownloadToken } from '@/lib/secureDownload'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { orderId } = req.body || {}
    if (!orderId) return res.status(400).json({ error: 'Missing orderId' })

    // fetch order
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('id,status,delivery_object_key,photo_id,format,email')
      .eq('id', String(orderId))
      .single()

    if (error || !order) return res.status(404).json({ error: 'Order not found' })
    if (order.status !== 'PAID') return res.status(400).json({ error: 'Order not paid' })

    const objectKey = order.delivery_object_key
    if (!objectKey) return res.status(400).json({ error: 'Missing delivery_object_key' })

    const token = createDownloadToken(
      {
        orderId: order.id,
        photoId: order.photo_id,
        format: order.format || 'jpg',
        objectKey,
        guestEmail: order.email || null,
        filename: `${order.photo_id}.${order.format === 'raw' ? 'zip' : 'jpg'}`,
      },
      '10m'
    )

    // IMPORTANT: your download endpoint is /api/download?token=...
    const base = process.env.NEXT_PUBLIC_SITE_URL || ''
    const url = `${base}/api/download?token=${encodeURIComponent(token)}`

    return res.status(200).json({ ok: true, url })
  } catch (e) {
    console.error('create-token error:', e)
    return res.status(500).json({ error: 'Server error' })
  }
}
