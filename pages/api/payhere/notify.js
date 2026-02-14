// pages/api/payhere/notify.js
import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'
import { sendDownloadEmail } from '../../../lib/email'

export const config = {
  api: { bodyParser: false }, // ✅ PayHere posts x-www-form-urlencoded
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

// PayHere signature = MD5( merchant_id + order_id + amount + currency + status_code + MD5(secret) )
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

// ✅ fallback: where your originals live in R2
function fallbackObjectKey(order) {
  // JPG originals: photos/original/<photoId>.jpg
  if (!order?.photo_id) return null
  if ((order.format || 'jpg') === 'raw') {
    // if you later store RAW as zip, adjust this path if needed
    return `photos/original/${order.photo_id}.zip`
  }
  return `photos/original/${order.photo_id}.jpg`
}

export default async function handler(req, res) {
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

    // 2) Verify signature
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

        await supabaseAdmin
          .from('orders')
          .update({
            status: 'INVALID_SIG',
            payhere_payment_id: payment_id || null,
            payhere_status_code: status_code || null,
            payhere_status_message: status_message || null,
          })
          .eq('id', order_id)

        return res.status(200).send('OK')
      }
    }

    const statusCodeNum = Number(status_code)

    // =========================
    // ✅ PAYMENT SUCCESS
    // =========================
    if (statusCodeNum === 2) {
      // Mark as PAID if not already
      if (order.status !== 'PAID') {
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
      }

      // IMPORTANT: Always try to send email if not sent yet
      // Re-fetch latest order (in case delivery_object_key/email was updated)
      const { data: fresh, error: freshErr } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('id', order_id)
        .single()

      const o = freshErr || !fresh ? order : fresh

      // Need objectKey to deliver
      const objectKey = o.delivery_object_key || fallbackObjectKey(o)
      if (!objectKey) {
        console.error('Missing delivery_object_key (and fallback failed) for order:', order_id)
        return res.status(200).send('OK')
      }

      // Create token (10 minutes)
      const token = createDownloadToken(
        {
          orderId: o.id,
          photoId: o.photo_id,
          format: o.format || 'jpg',
          objectKey,
          userId: o.user_id || null,
          guestEmail: o.email || null,
          filename: `${o.photo_id}.${(o.format || 'jpg') === 'raw' ? 'zip' : 'jpg'}`,
        },
        '10m'
      )

      const downloadUrl = buildDownloadUrl(token, req)

      // ✅ Send email ONCE (even if already PAID)
      if (o.email && !o.download_email_sent_at) {
        await sendDownloadEmail({
          to: o.email,
          orderId: o.id,
          photoTitle: o.photo_id,
          downloadUrl,
        })

        await supabaseAdmin
          .from('orders')
          .update({
            download_email_sent_at: new Date().toISOString(),
            // keep a copy (optional but useful)
            delivery_object_key: o.delivery_object_key || objectKey,
          })
          .eq('id', order_id)

        console.log('Order PAID + email sent:', order_id)
      } else {
        console.log('Order PAID (email skipped):', order_id, {
          hasEmail: !!o.email,
          alreadySent: !!o.download_email_sent_at,
        })
      }

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
    return res.status(200).send('OK')
  }
}
