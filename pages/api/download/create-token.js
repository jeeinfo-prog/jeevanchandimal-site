import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createDownloadToken } from '@/lib/secureDownload'

function getBaseUrl(req) {
  // Works on Vercel + locally
  const proto = (req.headers['x-forwarded-proto'] || 'http').toString()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString()
  if (host) return `${proto}://${host}`

  // Fallback if host missing (rare)
  return process.env.NEXT_PUBLIC_SITE_URL || ''
}

function safeFilename(name) {
  return String(name || '')
    .replace(/[\r\n"]/g, '')
    .replace(/[\\/]/g, '-') // avoid path tricks
    .trim() || 'download'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { orderId } = req.body || {}
    if (!orderId) return res.status(400).json({ error: 'Missing orderId' })

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('id,status,delivery_object_key,photo_id,format,email')
      .eq('id', String(orderId))
      .single()

    if (error || !order) return res.status(404).json({ error: 'Order not found' })
    if (order.status !== 'PAID') return res.status(400).json({ error: 'Order not paid' })

    const objectKey = order.delivery_object_key
    if (!objectKey) return res.status(400).json({ error: 'Missing delivery_object_key' })

    const fmt = order.format === 'raw' ? 'raw' : 'jpg'
    const ext = fmt === 'raw' ? 'zip' : 'jpg'
    const filename = safeFilename(`${order.photo_id}.${ext}`)

    const token = createDownloadToken(
      {
        orderId: order.id,
        photoId: order.photo_id,
        format: fmt,
        objectKey,
        guestEmail: order.email || null,
        filename,
      },
      '10m'
    )

    // ✅ Always generate URL for the SAME host that is calling this API
    const base = getBaseUrl(req)
    const url = `${base}/api/download?token=${encodeURIComponent(token)}`

    return res.status(200).json({ ok: true, url })
  } catch (e) {
    console.error('create-token error:', e)
    return res.status(500).json({ error: 'Server error' })
  }
}
