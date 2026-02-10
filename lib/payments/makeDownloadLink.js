import { createDownloadToken } from '../secureDownload'
import { supabaseAdmin } from '../supabaseAdmin'

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

export async function makeDownloadLinkForOrder(orderId) {
  // 1) Get the paid order (server truth)
  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .select(`
      id,
      status,
      photo_id,
      format,
      user_id,
      guest_email,
      delivery_object_key
    `)
    .eq('id', orderId)
    .eq('status', 'paid')
    .single()

  if (error || !order) {
    throw new Error('Order not found or not paid')
  }

  if (!order.delivery_object_key) {
    throw new Error('Missing delivery_object_key')
  }

  // 2) Create short-lived token
  const token = createDownloadToken(
    {
      orderId: order.id,
      photoId: order.photo_id,
      format: order.format, // jpg | raw
      objectKey: order.delivery_object_key,
      userId: order.user_id || null,
      guestEmail: order.guest_email || null,
      filename: `${order.photo_id}.${order.format === 'raw' ? 'zip' : 'jpg'}`,
    },
    '10m'
  )

  // 3) Build full URL
  return `${getBaseUrl()}/api/download?token=${encodeURIComponent(token)}`
}
