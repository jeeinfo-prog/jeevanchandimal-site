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
  return String(v || '')
    .trim()
    .replace(/\/+$/, '')
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

function limitForLicense(license) {
  if (license === 'commercial') return 0 // unlimited
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
  return Number(v || 0).toFixed(2)
}

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

function normalizeLicense(v) {
  const x = String(v || '').trim().toLowerCase()
  if (x === 'commercial') return 'commercial'
  if (x === 'editorial') return 'editorial'
  return 'personal'
}

function normalizeFormat(v) {
  return String(v || '').trim().toLowerCase() === 'raw' ? 'raw' : 'jpg'
}

function fallbackObjectKeyFromPhotoId(photoId, format) {
  const pid = String(photoId || '')
  if (!pid) return null
  if (format === 'raw') return `photos/original/${pid}.zip`
  return `photos/original/${pid}.jpg`
}

async function findOrderByPayhereOrderId(order_id) {
  const ref = String(order_id || '').trim()
  if (!ref) return null

  // - orders.id (uuid / your ORD_* ids)
  const byId = await supabaseAdmin.from('orders').select('*').eq('id', ref).maybeSingle()
  if (byId?.data) return byId.data

  // - orders.order_id (if you store payhere ref)
  const byOrderId = await supabaseAdmin.from('orders').select('*').eq('order_id', ref).maybeSingle()
  if (byOrderId?.data) return byOrderId.data

  // - orders.code (older cart flow)
  const byCode = await supabaseAdmin.from('orders').select('*').eq('code', ref).maybeSingle()
  if (byCode?.data) return byCode.data

  return null
}

async function ensureInvoiceNo(order) {
  if (order.invoice_no) return order.invoice_no
  const invoiceNo = genInvoiceNo(order.id)
  await supabaseAdmin.from('orders').update({ invoice_no: invoiceNo }).eq('id', order.id)
  return invoiceNo
}

async function resolveObjectKeyForCartItem(item) {
  const format = normalizeFormat(item.format)
  if (item.objectKey) return String(item.objectKey)

  const photoId = String(item.photoId || '')
  if (!photoId) return null

  const { data: p } = await supabaseAdmin
    .from('photos')
    .select('id, original_object_key, original_key, object_key, r2_key, raw_object_key, raw_key')
    .eq('id', photoId)
    .maybeSingle()

  if (p) {
    if (format === 'raw') {
      const rk = p.raw_object_key || p.raw_key
      if (rk) return String(rk)
    }
    const ok = p.original_object_key || p.original_key || p.object_key || p.r2_key
    if (ok) return String(ok)
  }

  return fallbackObjectKeyFromPhotoId(photoId, format)
}

/**
 * ✅ FIXED: resolve correct objectKey for SINGLE orders (folder + filename)
 * Your R2 structure is: photos/original/<photo_id>/<filename>.jpg
 * So we must read the correct key from photos table, NOT build it from photo_id.
 */
async function resolveObjectKeyForSingleOrder(o) {
  const photoId = String(o?.photo_id || '').trim()
  if (!photoId) return null

  const fmt = normalizeFormat(o?.format)

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id, original_key, original_jpg_key, original_raw_key, raw_key, raw_object_key')
    .eq('id', photoId)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) return null

  if (fmt === 'raw') {
    const rk = p.original_raw_key || p.raw_object_key || p.raw_key
    return rk ? String(rk) : null
  }

  // ✅ Prefer jpg-specific key first
  const k = p.original_jpg_key || p.original_key
  return k ? String(k) : null
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

    // 1) Fetch order by id OR order_id OR code
    const order = await findOrderByPayhereOrderId(order_id)
    if (!order) {
      console.error('Order not found (id/order_id/code):', order_id)
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
        .eq('id', order.id)

      return res.status(200).send('OK')
    }

    const statusCodeNum = Number(status_code)

    if (statusCodeNum === 2) {
      const wasPaidAlready = String(order.status || '').toUpperCase() === 'PAID'

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
          .eq('id', order.id)
      }

      const { data: fresh } = await supabaseAdmin.from('orders').select('*').eq('id', order.id).single()

      const o = fresh || order
      const email = normalizeEmail(o.email)

      const isMembership =
        String(o.order_kind || '').toLowerCase() === 'membership' ||
        String(custom_1 || '').toLowerCase() === 'membership'

      const isCart =
        String(o.kind || '').toLowerCase() === 'cart' ||
        String(custom_1 || '').toLowerCase() === 'cart'

      /* ================= MEMBERSHIP ================= */
      if (isMembership) {
        if (!email) return res.status(200).send('OK')

        if (wasPaidAlready) {
          console.log('Membership webhook repeat ignored (already PAID):', o.id)
          return res.status(200).send('OK')
        }

        const tierPlans = ['basic', 'pro', 'elite']
        const timePlans = ['monthly', 'yearly', 'lifetime']

        let tier = String(o.membership_tier || o.membership_plan || '').trim().toLowerCase()
        let term = String(o.membership_term || '').trim().toLowerCase()

        const c2 = String(custom_2 || '').trim().toLowerCase()
        if ((!tier || !term) && c2) {
          if (c2.includes(':')) {
            const [a, b] = c2.split(':').map((x) => String(x || '').trim().toLowerCase())
            if (!tier) tier = a
            if (!term) term = b
          } else {
            if (!term) term = c2
          }
        }

        if (!tierPlans.includes(tier)) tier = 'basic'
        if (!timePlans.includes(term)) term = 'monthly'

        const now = new Date()

        const { data: existing } = await supabaseAdmin
          .from('memberships')
          .select('email, plan, status, start_date, end_date, created_at')
          .eq('email', email)
          .maybeSingle()

        const existingEnd = existing?.end_date ? new Date(existing.end_date) : null
        const base = existingEnd && existingEnd > now ? existingEnd : now

        let endDate = null
        if (term === 'monthly') endDate = addMonthsFrom(base, 1)
        if (term === 'yearly') endDate = addYearsFrom(base, 1)
        if (term === 'lifetime') endDate = null

        const startDate = existing?.start_date ? new Date(existing.start_date) : now

        const payload = {
          email,
          plan: tier,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate ? endDate.toISOString() : null,
          created_at: existing?.created_at ? new Date(existing.created_at).toISOString() : now.toISOString(),
        }

        await supabaseAdmin.from('memberships').upsert(payload, { onConflict: 'email' })
        return res.status(200).send('OK')
      }

      /* ================= CART ================= */
      if (isCart) {
        if (!email) return res.status(200).send('OK')

        const items = Array.isArray(o.items) ? o.items : []
        if (items.length === 0) return res.status(200).send('OK')

        const licenses = items.map((it) => normalizeLicense(it.license))
        const downloadLimit = licenses.includes('commercial') ? 0 : licenses.includes('editorial') ? 5 : 3

        if (o.download_limit == null || Number(o.download_limit) !== Number(downloadLimit)) {
          await supabaseAdmin.from('orders').update({ download_limit: downloadLimit }).eq('id', o.id)
        }

        const invoiceNo = await ensureInvoiceNo(o)

        if (!o.invoice_email_sent_at) {
          await sendReceiptEmail({
            to: email,
            orderId: o.id,
            invoiceNo,
            amount: o.amount,
            currency: o.currency,
            photoTitle: `Cart (${items.length} items)`,
            license: '—',
            format: '—',
            paymentId: payment_id || null,
          })

          await supabaseAdmin.from('orders').update({ invoice_email_sent_at: new Date().toISOString() }).eq('id', o.id)
        }

        if (!o.download_email_sent_at) {
          const links = []

          for (const it of items) {
            const photoId = String(it.photoId || '')
            const title = String(it.title || photoId || 'Photo')
            const license = normalizeLicense(it.license)
            const format = normalizeFormat(it.format)

            const objectKey = await resolveObjectKeyForCartItem(it)
            if (!objectKey) continue

            const jti = crypto.randomUUID()
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

            const ins = await supabaseAdmin.from('download_tokens').insert({
              jti,
              order_id: o.id,
              expires_at: expiresAt.toISOString(),
            })
            if (ins.error) throw new Error(`download_tokens insert failed: ${ins.error.message}`)

            const ext = format === 'raw' ? 'zip' : 'jpg'

            const token = createDownloadToken(
              {
                jti,
                orderId: o.id,
                photoId,
                format,
                objectKey,
                userId: o.user_id || null,
                guestEmail: email,
                filename: `${photoId}.${ext}`,
                license,
              },
              '1h'
            )

            links.push({ title, photoId, license, format, url: buildDownloadUrl(token, req) })
          }

          if (links.length > 0) {
            const combined = links
              .map(
                (x, idx) =>
                  `${idx + 1}) ${x.title} • ${String(x.license).toUpperCase()} • ${String(
                    x.format
                  ).toUpperCase()}\n${x.url}`
              )
              .join('\n\n')

            await sendDownloadEmail({
              to: email,
              orderId: o.id,
              photoTitle: `Cart (${links.length} items)`,
              downloadUrl: combined,
              license: '—',
              format: '—',
            })

            await supabaseAdmin.from('orders').update({ download_email_sent_at: new Date().toISOString() }).eq('id', o.id)
          }
        }

        return res.status(200).send('OK')
      }

      /* ================= SINGLE ================= */

      // ✅ FIX: resolve correct R2 key from photos table (folder + filename)
      const objectKey = await resolveObjectKeyForSingleOrder(o)
      if (!objectKey) {
        console.error('Missing objectKey for single order:', o.id, 'photo:', o.photo_id)
        return res.status(200).send('OK')
      }

      const desiredLimit = limitForLicense(normalizeLicense(o.license))
      if (o.download_limit == null || Number(o.download_limit) !== Number(desiredLimit)) {
        await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', o.id)
      }

      // ✅ persist correct key (even if old key existed but was wrong, overwrite it)
      if (String(o.delivery_object_key || '') !== String(objectKey)) {
        await supabaseAdmin.from('orders').update({ delivery_object_key: objectKey }).eq('id', o.id)
      }

      if (!email) return res.status(200).send('OK')

      try {
        const invoiceNo = await ensureInvoiceNo(o)

        const jti = crypto.randomUUID()
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

        const ins = await supabaseAdmin.from('download_tokens').insert({
          jti,
          order_id: o.id,
          expires_at: expiresAt.toISOString(),
        })
        if (ins.error) throw new Error(`download_tokens insert failed: ${ins.error.message}`)

        const fmt = normalizeFormat(o.format)
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
            license: normalizeLicense(o.license),
          },
          '1h'
        )

        const downloadUrl = buildDownloadUrl(token, req)

        if (!o.invoice_email_sent_at) {
          await sendReceiptEmail({
            to: email,
            orderId: o.id,
            invoiceNo,
            amount: o.amount,
            currency: o.currency,
            photoTitle: o.photo_id,
            license: normalizeLicense(o.license),
            format: normalizeFormat(o.format),
            paymentId: payment_id || null,
          })

          await supabaseAdmin.from('orders').update({ invoice_email_sent_at: new Date().toISOString() }).eq('id', o.id)
        }

        if (!o.download_email_sent_at) {
          await sendDownloadEmail({
            to: email,
            orderId: o.id,
            photoTitle: o.photo_id,
            downloadUrl,
            license: normalizeLicense(o.license),
            format: normalizeFormat(o.format),
          })

          await supabaseAdmin.from('orders').update({ download_email_sent_at: new Date().toISOString() }).eq('id', o.id)
        }
      } catch (e) {
        console.error('❌ Single photo delivery email block failed:', o.id, e)
      }

      return res.status(200).send('OK')
    }

    /* =========================================================
       ❌ PAYMENT FAILED / CANCELED
    ========================================================= */

    if (statusCodeNum < 0 && String(order.status || '').toUpperCase() !== 'FAILED') {
      await supabaseAdmin
        .from('orders')
        .update({
          status: 'FAILED',
          payhere_payment_id: payment_id || null,
          payhere_status_code: status_code || null,
          payhere_status_message: status_message || null,
        })
        .eq('id', order.id)
    }

    return res.status(200).send('OK')
  } catch (err) {
    console.error('PayHere notify error:', err)
    return res.status(200).send('OK')
  }
}