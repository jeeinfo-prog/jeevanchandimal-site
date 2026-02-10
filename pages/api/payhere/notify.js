import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'
import { sendDownloadEmail } from '../../../lib/email'

function buildDownloadUrl(token, req) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`

  return `${base}/api/download?token=${encodeURIComponent(token)}`
}

function makeLocalSig({
  merchant_id,
  order_id,
  payhere_amount,
  payhere_currency,
  status_code,
  secret,
}) {
  return crypto
    .createHash('md5')
    .update(
      String(merchant_id) +
        String(order_id) +
        String(payhere_amount) +
        String(payhere_currency) +
        String(status_code) +
        String(secret)
    )
    .digest('hex')
    .toUpperCase()
}

export default async function handler(req, res) {
  // PayHere may call with GET or POST
  const data = req.method === 'POST' ? req.body : req.query

  try {
    const {
      order_id,
      payment_id,
      status_code,
      status_message,
      md5sig,
      merchant_id,
      payhere_amount,
      payhere_currency,
    } = data

    if (!order_id) {
      return res.status(200).json({ ok: true })
    }

    // 1) Fetch order
    const { data: order, error: orderErr } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', order_id)
      .single()

    if (orderErr || !order) {
      console.error('Order not found:', order_id, orderErr?.message)
      return res.status(200).json({ ok: true })
    }

    // 2) Verify PayHere MD5 signature
    const secret = process.env.PAYHERE_MERCHANT_SECRET
    if (secret) {
      const localSig = makeLocalSig({
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
        secret,
      })

      if (md5sig && String(md5sig).toUpperCase() !== localSig) {
        console.error('MD5 signature mismatch for order:', order_id)
        return res.status(200).json({ ok: true })
      }
    }

    const statusCodeNum = Number(status_code)

    // =========================
    // ✅ PAYMENT SUCCESS
    // =========================
    if (statusCodeNum === 2 && order.status !== 'PAID') {
      // Mark order as PAID
      await supabaseAdmin
        .from('orders')
        .update({
          status: 'PAID',
          paid_at: new Date().toISOString(),
          payhere_payment_id: payment_id,
          payhere_status_code: status_code,
          payhere_status_message: status_message,
        })
        .eq('id', order_id)

      // Must exist to deliver file
      const objectKey = order.delivery_object_key
      if (!objectKey) {
        console.error('Missing delivery_object_key for order:', order_id)
        return res.status(200).json({ ok: true })
      }

      // Create secure download token (10 minutes)
      const token = createDownloadToken(
        {
          orderId: order.id,
          photoId: order.photo_id,
          format: order.format || 'jpg',
          objectKey,
          userId: order.user_id || null,
          guestEmail: order.email || null,
          filename: `${order.photo_id}.${order.format === 'raw' ? 'zip' : 'jpg'}`,
        },
        '10m'
      )

      const downloadUrl = buildDownloadUrl(token, req)

      // Send email ONLY ONCE
      if (order.email && !order.download_email_sent_at) {
        await sendDownloadEmail({
          to: order.email,
          orderId: order.id,
          photoTitle: order.photo_id,
          downloadUrl,
        })

        await supabaseAdmin
          .from('orders')
          .update({ download_email_sent_at: new Date().toISOString() })
          .eq('id', order_id)
      }

      console.log('Order PAID + download email sent:', order_id)
      return res.status(200).json({ ok: true })
    }

    // =========================
    // ❌ PAYMENT FAILED / CANCELED
    // =========================
    if (statusCodeNum < 0 && order.status !== 'FAILED') {
      await supabaseAdmin
        .from('orders')
        .update({
          status: 'FAILED',
          payhere_payment_id: payment_id || '0',
          payhere_status_code: status_code,
          payhere_status_message: status_message,
        })
        .eq('id', order_id)

      console.log('Order FAILED:', order_id)
      return res.status(200).json({ ok: true })
    }

    // Always respond 200 to PayHere
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('PayHere notify error:', err)
    return res.status(200).json({ ok: true })
  }
}
