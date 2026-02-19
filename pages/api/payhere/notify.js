// pages/api/payhere/notify.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'
import { sendDownloadEmail, sendReceiptEmail } from '../../../lib/email'
import { payhereVerifyMd5Sig } from '../../../lib/payhere'

export const config = {
  api: { bodyParser: false }, // PayHere posts x-www-form-urlencoded
}

/* ---------------- helpers ---------------- */

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

function cleanBaseUrl(v) {
  return String(v || '').trim().replace(/\/+$/, '')
}

function getBaseUrl(req) {
  const webhook = cleanBaseUrl(process.env.WEBHOOK_BASE_URL)
  if (webhook) return webhook

  const proto = (req.headers['x-forwarded-proto'] || 'https').toString()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString()
  if (host) return `${proto}://${host}`

  return cleanBaseUrl(process.env.NEXT_PUBLIC_SITE_URL)
}

function buildDownloadUrl(token, req) {
  const base = getBaseUrl(req)
  return `${base}/api/download?token=${encodeURIComponent(token)}`
}

function fallbackObjectKey(order) {
  if (!order?.photo_id) return null
  if ((order.format || 'jpg') === 'raw') return `photos/original/${order.photo_id}.zip`
  return `photos/original/${order.photo_id}.jpg`
}

function limitForLicense(license) {
  if (license === 'commercial') return 0
  if (license === 'editorial') return 5
  return 3
}

function genInvoiceNo(orderId) {
  const d = new Date()
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const tail =
    String(orderId || '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(-6)
      .toUpperCase() || crypto.randomUUID().slice(0, 6).toUpperCase()
  return `INV-${yyyy}${mm}${dd}-${tail}`
}

function addMonthsFrom(baseDate, n) {
  const d = new Date(baseDate)
  d.setMonth(d.getMonth() + n)
  return d
}

function addYearsFrom(baseDate, n) {
  const d = new Date(baseDate)
  d.setFullYear(d.getFullYear() + n)
  return d
}

function normalizePayhereAmount(v) {
  // Must match PayHere signature formatting: "1234.00" (no commas)
  return Number(v || 0).toFixed(2)
}

/* ---------------- handler ---------------- */

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
      custom_1,
      custom_2,
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
    const merchantSecret = String(process.env.PAYHERE_MERCHANT_SECRET || '').trim()
    if (!merchantSecret) {
      console.error('Missing PAYHERE_MERCHANT_SECRET; cannot verify signature.')
      return res.status(200).send('OK')
    }

    const ok = payhereVerifyMd5Sig({
      merchantSecret,
      merchant_id,
      order_id,
      payhere_amount: normalizePayhereAmount(payhere_amount),
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

    const statusCodeNum = Number(status_code)

    /* =========================================================
       ✅ PAYMENT SUCCESS
    ========================================================= */

    if (statusCodeNum === 2) {
      const wasPaidAlready = order.status === 'PAID'

      // mark order paid once
      if (!wasPaidAlready) {
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

      // re-fetch for latest flags/timestamps
      const { data: fresh } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('id', order_id)
        .single()

      const o = fresh || order
      const email = String(o.email || '').trim().toLowerCase()

      // Determine membership vs photo order (support multiple shapes)
      const isMembership =
        String(o.order_kind || '').toLowerCase() === 'membership' ||
        String(custom_1 || '').toLowerCase() === 'membership'

      /* =========================================================
         🔓 MEMBERSHIP UNLOCK (tier + term)
      ========================================================= */

      if (isMembership) {
        if (!email) {
          console.error('Membership order has no email:', o.id)
          return res.status(200).send('OK')
        }

        // prevent double-extension on webhook retries
        if (wasPaidAlready) {
          console.log('Membership webhook repeat ignored (already PAID):', o.id)
          return res.status(200).send('OK')
        }

        const tierPlans = ['basic', 'pro', 'elite']
        const timePlans = ['monthly', 'yearly', 'lifetime']

        // Prefer new columns, fallback to old/custom fields
        let tier = String(o.membership_tier || o.membership_plan || '').trim().toLowerCase()
        let term = String(o.membership_term || '').trim().toLowerCase()

        // custom_2 fallback:
        // - could be "monthly" (old)
        // - could be "pro:monthly" (if you ever used this)
        const c2 = String(custom_2 || '').trim().toLowerCase()
        if ((!tier || !term) && c2) {
          if (c2.includes(':')) {
            const [a, b] = c2.split(':').map((x) => String(x || '').trim().toLowerCase())
            if (!tier) tier = a
            if (!term) term = b
          } else {
            // old format: custom_2 = monthly/yearly/lifetime
            if (!term) term = c2
          }
        }

        if (!tierPlans.includes(tier)) tier = 'basic'
        if (!timePlans.includes(term)) term = 'monthly'

        const now = new Date()

        // Read existing membership (include created_at!)
        const { data: existing, error: exErr } = await supabaseAdmin
          .from('memberships')
          .select('email, plan, status, start_date, end_date, created_at')
          .eq('email', email)
          .maybeSingle()

        if (exErr) console.error('Membership read failed:', exErr.message)

        const existingEnd = existing?.end_date ? new Date(existing.end_date) : null
        const base = existingEnd && existingEnd > now ? existingEnd : now

        let endDate = null
        if (term === 'monthly') endDate = addMonthsFrom(base, 1)
        if (term === 'yearly') endDate = addYearsFrom(base, 1)
        if (term === 'lifetime') endDate = null

        const startDate = existing?.start_date ? new Date(existing.start_date) : now

        // plan stored = tier (basic/pro/elite) so download logic is simple
        const payload = {
          email,
          plan: tier,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate ? endDate.toISOString() : null,
          created_at: existing?.created_at ? new Date(existing.created_at).toISOString() : now.toISOString(),
        }

        const { error: memErr } = await supabaseAdmin
          .from('memberships')
          .upsert(payload, { onConflict: 'email' })

        if (memErr) {
          console.error('Membership upsert failed:', memErr.message)
        } else {
          console.log('✅ Membership active:', email, tier, term, 'end:', payload.end_date || 'LIFETIME')
        }

        return res.status(200).send('OK')
      }

      /* =========================================================
         🖼️ PHOTO ORDER DELIVERY (receipt + download)
      ========================================================= */

      const objectKey = o.delivery_object_key || fallbackObjectKey(o)
      if (!objectKey) {
        console.error('Missing delivery_object_key for order:', order_id)
        return res.status(200).send('OK')
      }

      const desiredLimit = limitForLicense(o.license)
      if (o.download_limit == null || Number(o.download_limit) !== Number(desiredLimit)) {
        await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', o.id)
      }

      if (!o.delivery_object_key) {
        await supabaseAdmin.from('orders').update({ delivery_object_key: objectKey }).eq('id', o.id)
      }

      if (!email) return res.status(200).send('OK')

      // Ensure both emails are sent reliably
      try {
        // ensure invoice number
        let invoiceNo = o.invoice_no
        if (!invoiceNo) {
          invoiceNo = genInvoiceNo(o.id)
          await supabaseAdmin.from('orders').update({ invoice_no: invoiceNo }).eq('id', o.id)
        }

        // Create token first (so download email always has a link)
        const jti = crypto.randomUUID()
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

        const ins = await supabaseAdmin.from('download_tokens').insert({
          jti,
          order_id: o.id,
          expires_at: expiresAt.toISOString(),
        })

        if (ins.error) throw new Error(`download_tokens insert failed: ${ins.error.message}`)

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
            guestEmail: email,
            filename: `${o.photo_id}.${ext}`,
          },
          '1h'
        )

        const downloadUrl = buildDownloadUrl(token, req)

        // Receipt email (once)
        if (!o.invoice_email_sent_at) {
          await sendReceiptEmail({
            to: email,
            orderId: o.id,
            invoiceNo,
            amount: o.amount,
            currency: o.currency,
            photoTitle: o.photo_id,
            license: o.license,
            format: o.format,
            paymentId: payment_id || null,
          })

          await supabaseAdmin
            .from('orders')
            .update({ invoice_email_sent_at: new Date().toISOString() })
            .eq('id', o.id)
        }

        // Download email (once)
        if (!o.download_email_sent_at) {
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
        }

        console.log('✅ Receipt + Download emails ensured:', o.id)
      } catch (e) {
        console.error('❌ Photo delivery email block failed:', o.id, e)
      }

      return res.status(200).send('OK')
    }

    /* =========================================================
       ❌ PAYMENT FAILED / CANCELED
    ========================================================= */

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
    }

    return res.status(200).send('OK')
  } catch (err) {
    console.error('PayHere notify error:', err)
    return res.status(200).send('OK')
  }
}
