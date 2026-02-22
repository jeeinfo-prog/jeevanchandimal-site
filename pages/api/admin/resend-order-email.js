import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createDownloadToken } from '@/lib/secureDownload'
import { sendDownloadEmail, sendReceiptEmail } from '@/lib/email'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { orderId } = req.body || {}
  if (!orderId) return res.status(400).json({ error: 'Missing orderId' })

  const { data: o, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error || !o) return res.status(404).json({ error: 'Order not found' })
  if (o.status !== 'PAID') return res.status(400).json({ error: 'Order not paid' })

  const email = String(o.email || '').trim().toLowerCase()
  if (!email) return res.status(400).json({ error: 'Missing email' })

  try {
    // ensure invoice
    let invoiceNo = o.invoice_no
    if (!invoiceNo) {
      invoiceNo = `INV-${Date.now()}`
      await supabaseAdmin.from('orders').update({ invoice_no: invoiceNo }).eq('id', o.id)
    }

    // create token
    const jti = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    await supabaseAdmin.from('download_tokens').insert({
      jti,
      order_id: o.id,
      expires_at: expiresAt.toISOString(),
    })

    const fmt = (o.format || 'jpg') === 'raw' ? 'raw' : 'jpg'
    const ext = fmt === 'raw' ? 'zip' : 'jpg'

    const token = createDownloadToken(
      {
        jti,
        orderId: o.id,
        photoId: o.photo_id,
        format: fmt,
        objectKey: o.delivery_object_key,
        guestEmail: email,
        filename: `${o.photo_id}.${ext}`,
      },
      '1h'
    )

    const base = process.env.NEXT_PUBLIC_SITE_URL
    const downloadUrl = `${base}/api/download?token=${encodeURIComponent(token)}`

    // send receipt
    await sendReceiptEmail({
      to: email,
      orderId: o.id,
      invoiceNo,
      amount: o.amount,
      currency: o.currency,
      photoTitle: o.photo_id,
      license: o.license,
      format: o.format,
      paymentId: o.payhere_payment_id || null,
    })

    await supabaseAdmin
      .from('orders')
      .update({ invoice_email_sent_at: new Date().toISOString() })
      .eq('id', o.id)

    // send download
    await sendDownloadEmail({
      to: email,
      orderId: o.id,
      photoTitle: o.photo_id,
      downloadUrl,
      license: o.license,
      format: o.format,
    })

    await supabaseAdmin
      .from('orders')
      .update({ download_email_sent_at: new Date().toISOString() })
      .eq('id', o.id)

    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Email resend failed' })
  }
}