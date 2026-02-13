// pages/api/payhere/notify.js
import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'
import { sendDownloadEmail } from '../../../lib/email'

export const config = {
  api: { bodyParser: false }, // ✅ IMPORTANT: PayHere posts form-encoded
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function parseForm(body) {
  const params = new URLSearchParams(body)
  const obj = {}
  for (const [k, v] of params.entries()) obj[k] = v
  return obj
}

function md5Upper(str) {
  return crypto.createHash('md5').update(String(str)).digest('hex').toUpperCase()
}

// ✅ PayHere signature = MD5( merchant_id + order_id + amount + currency + status_code + MD5(secret) )
function makePayhereSig({ merchant_id, order_id, payhere_amount, payhere_currency, status_code, secret }) {
  return md5Upper(
    String(merchant_id) +
      String(order_id) +
      String(payhere_amount) +
      String(payhere_currency) +
      String(status_code) +
      md5Upper(secret)
  )
}

function buildDownloadUrl(token, req) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`
  return `${base}/api/download?token=${encodeURIComponent(token)}`
}

export default async function handler(req, res) {
  // PayHere should POST. (Some tools may call GET; we ignore safely.)
  if (req.method !== 'POST') return res.status(200).send('OK')

  try {
    const raw = await readRawBody(req)
    const data = parseForm(raw)

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

    if (!order_id) return res.status(200).send('OK')

    // 1) Fetch order
    const { data: order, error: orderErr } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', order_id)
      .single()

    if (orderErr || !order) {
      console.error('Order not found:', order_id, orderErr?.message)
      return res.status(200).send('OK')
    }

    // 2) Verify signature (CRITICAL)
    const secret = process.env.PAYHERE_MERCHANT_SECRET
    if (secret) {
      const localSig = makePayhereSig({
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
        secret,
      })

      if (!md5sig || String(md5sig).toUpperCase() !== localSig) {
        console.error('MD5 signature mismatch for order:', order_id)

        // Optional: mark order as invalid signature (helps debugging)
        await supabaseAdmin
          .from('orders')
          .update({
            status: 'INVALID_SIG',
            payhere_payment_id: payment_id || null,
            payhere_status_code: status_code || null,
            payhere_status_message: status_message || null,
          })
          .eq('id', order_id)

        return res.status(200).send('OK') // PayHere expects 200
      }
    }

    const statusCodeNum = Number(status_code)

    // =========================
    // ✅ PAYMENT SUCCESS (status_code === 2)
    // =========================
    if (statusCodeNum === 2 && order.status !== 'PAID') {
      // Mark PAID
      await supabaseAdmin
        .from('orders')
        .update({
          status: 'PAID',
          paid_at: new Date().toISOString(),
          payhere_payment_id: payment_id || null,
          payhere_status_code: status_code || null,
          payhere_status_message: status_message || null,
        })
        .eq('id', order_id)

      // Must exist to deliver file
      const objectKey = order.delivery_object_key
      if (!objectKey) {
        console.error('Missing delivery_object_key for order:', order_id)
        return res.status(200).send('OK')
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

      console.log('Order PAID + email sent:', order_id)
      return res.status(200).send('OK')
    }

    // =========================
    // ❌ PAYMENT FAILED / CANCELED
    // =========================
    if (statusCodeNum < 0 && order.status !== 'FAILED') {
      await supabaseAdmin
        .from('orders')
        .update({
          status: 'FAILED',
          payhere_payment_id: payment_id || null,
          payhere_status_code: status_code || null,
          payhere_status_message: status_message || null,
        })
        .eq('id', order_id)

      console.log('Order FAILED:', order_id)
      return res.status(200).send('OK')
    }

    return res.status(200).send('OK')
  } catch (err) {
    console.error('PayHere notify error:', err)
    return res.status(200).send('OK') // Always 200 for PayHere
  }
}
