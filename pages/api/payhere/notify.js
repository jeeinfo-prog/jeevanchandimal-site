// pages/api/payhere/notify.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'
import { sendDownloadEmail } from '../../../lib/email'
import { payhereVerifyMd5Sig } from '../../../lib/payhere'

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

function getBaseUrl(req) {
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString()
  if (host) return `${proto}://${host}`
  return process.env.NEXT_PUBLIC_SITE_URL || ''
}

function buildDownloadUrl(token, req) {
  const base = getBaseUrl(req)
  return `${base}/api/download?token=${encodeURIComponent(token)}`
}

// If delivery_object_key wasn't set at checkout, infer a safe default
function fallbackObjectKey(order) {
  if (!order?.photo_id) return null
  if ((order.format || 'jpg') === 'raw') return `photos/original/${order.photo_id}.zip`
  return `photos/original/${order.photo_id}.jpg`
}

// ✅ Per-license download limits
function limitForLicense(license) {
  if (license === 'commercial') return 0 // unlimited
  if (license === 'editorial') return 5
  return 3 // personal
}

export default async function handler(req, res) {
  // PayHere expects 200 always
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
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET
    if (merchantSecret) {
      const ok = payhereVerifyMd5Sig({
        merchantSecret,
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
        md5sig,
      })

      if (!ok) {
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
      // Mark PAID if not already
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

      // Re-fetch latest order
      const { data: fresh, error: freshErr } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('id', order_id)
        .single()

      const o = !freshErr && fresh ? fresh : order

      // Ensure delivery_object_key exists
      const objectKey = o.delivery_object_key || fallbackObjectKey(o)
      if (!objectKey) {
        console.error('Missing delivery_object_key for order:', order_id)
        return res.status(200).send('OK')
      }

      // ✅ Ensure per-license download_limit is set (B)
      const desiredLimit = limitForLicense(o.license)
      if (o.download_limit == null) {
        await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', o.id)
      }

      // Always persist inferred key (even if no email)
      if (!o.delivery_object_key) {
        await supabaseAdmin.from('orders').update({ delivery_object_key: objectKey }).eq('id', o.id)
      }

      // ✅ Email ONCE (C) with ONE-TIME token (A)
      if (o.email && !o.download_email_sent_at) {
        const jti = crypto.randomUUID()
        const expiresMinutes = 60
        const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000)

        // Store one-time token record
        const ins = await supabaseAdmin.from('download_tokens').insert({
          jti,
          order_id: o.id,
          expires_at: expiresAt.toISOString(),
        })

        if (ins.error) {
          console.error('download_tokens insert failed:', ins.error.message)
          return res.status(200).send('OK')
        }

        const fmt = (o.format || 'jpg') === 'raw' ? 'raw' : 'jpg'
        const ext = fmt === 'raw' ? 'zip' : 'jpg'

        const token = createDownloadToken(
          {
            jti,
            orderId: o.id,
            photoId: o.photo_id,
            format: fmt,
            objectKey,
            userId: o.user_id || null,
            guestEmail: o.email || null,
            filename: `${o.photo_id}.${ext}`,
          },
          '1h'
        )

        const downloadUrl = buildDownloadUrl(token, req)

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
          })
          .eq('id', o.id)

        console.log('Order PAID + email sent (one-time):', order_id)
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
    return res.status(200).send('OK') // Always 200 for PayHere
  }
}
