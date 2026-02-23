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
  const webhook =
    cleanBaseUrl(process.env.WEBHOOK_BASE_URL) || cleanBaseUrl(process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL)
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

// NOTE: last resort fallback
function fallbackObjectKeyFromPhotoId(photoId, format) {
  const pid = String(photoId || '')
  if (!pid) return null
  if (format === 'raw') return `photos/original/${pid}.zip`
  return `photos/original/${pid}.jpg`
}

async function findOrderByPayhereOrderId(order_id) {
  const ref = String(order_id || '').trim()
  if (!ref) return null

  const byId = await supabaseAdmin.from('orders').select('*').eq('id', ref).maybeSingle()
  if (byId?.data) return byId.data

  const byOrderId = await supabaseAdmin.from('orders').select('*').eq('order_id', ref).maybeSingle()
  if (byOrderId?.data) return byOrderId.data

  // IMPORTANT: code can match MANY rows; we only use maybeSingle as fallback.
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

// ✅ key resolver for single order
async function resolveObjectKeyForSingleOrder(o) {
  const photoId = String(o?.photo_id || '').trim()
  if (!photoId) return null

  const fmt = normalizeFormat(o?.format)

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id,original_key,original_raw_key')
    .eq('id', photoId)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) return null

  if (fmt === 'raw') return p.original_raw_key ? String(p.original_raw_key) : null
  return p.original_key ? String(p.original_key) : null
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

    // Verify signature
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
      // try to mark something, but always 200
      const ref = String(custom_2 || order_id || '').trim()
      if (ref) {
        await supabaseAdmin
          .from('orders')
          .update({
            status: 'INVALID_SIG',
            payhere_payment_id: payment_id || null,
            payhere_status_code: status_code || null,
            payhere_status_message: status_message || null,
          })
          .eq('code', ref)
      }
      return res.status(200).send('OK')
    }

    const statusCodeNum = Number(status_code)

    /* =========================================================
       ✅ PAYMENT SUCCESS
    ========================================================= */
    if (statusCodeNum === 2) {
      const kind = String(custom_1 || '').trim().toLowerCase()

      const isMembership = kind === 'membership'
      const isCart = kind === 'cart'

      /* ================= MEMBERSHIP ================= */
      if (isMembership) {
        const order = await findOrderByPayhereOrderId(order_id)
        if (!order) return res.status(200).send('OK')

        const email = normalizeEmail(order.email)
        if (!email) return res.status(200).send('OK')

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
        } else {
          return res.status(200).send('OK')
        }

        const tierPlans = ['basic', 'pro', 'elite']
        const timePlans = ['monthly', 'yearly', 'lifetime']

        let tier = String(order.membership_tier || order.membership_plan || '').trim().toLowerCase()
        let term = String(order.membership_term || '').trim().toLowerCase()

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

      /* ================= CART (GROUP PAYMENT) ================= */
      if (isCart) {
        const groupCode = String(custom_2 || order_id || '').trim()
        if (!groupCode) return res.status(200).send('OK')

        // Load all item orders for this cart payment
        const { data: orders, error: ordErr } = await supabaseAdmin
          .from('orders')
          .select('*')
          .eq('code', groupCode)

        if (ordErr) {
          console.error('Cart orders fetch failed:', ordErr.message)
          return res.status(200).send('OK')
        }

        const list = Array.isArray(orders) ? orders : []
        if (list.length === 0) return res.status(200).send('OK')

        const email = normalizeEmail(list[0].email)
        if (!email) return res.status(200).send('OK')

        const alreadyAllPaid = list.every((x) => String(x.status || '').toUpperCase() === 'PAID')

        // Mark all as PAID (idempotent)
        if (!alreadyAllPaid) {
          const up = await supabaseAdmin
            .from('orders')
            .update({
              status: 'PAID',
              paid_at: new Date().toISOString(),
              payhere_payment_id: payment_id || null,
              payhere_status_code: status_code || null,
              payhere_status_message: status_message || null,
            })
            .eq('code', groupCode)

          if (up.error) console.error('Cart orders update failed:', up.error.message)
        }

        // Re-fetch (latest flags)
        const { data: freshOrders } = await supabaseAdmin.from('orders').select('*').eq('code', groupCode)
        const items = Array.isArray(freshOrders) && freshOrders.length ? freshOrders : list

        const totalAmount = items.reduce((sum, o) => sum + Number(o.amount || 0), 0)
        const currency = items[0].currency || payhere_currency || 'LKR'

        // Choose invoiceNo (first order gets it; optional)
        const invoiceNo = await ensureInvoiceNo(items[0])

        // Receipt email (send once)
        if (!items[0].invoice_email_sent_at) {
          await sendReceiptEmail({
            to: email,
            orderId: groupCode,
            invoiceNo,
            amount: String(round2(totalAmount)),
            currency,
            photoTitle: `Cart (${items.length} items)`,
            license: '—',
            format: '—',
            paymentId: payment_id || null,
          })

          // mark all rows as receipt sent
          await supabaseAdmin
            .from('orders')
            .update({ invoice_email_sent_at: new Date().toISOString() })
            .eq('code', groupCode)
        }

        // Download email (send once)
        if (!items[0].download_email_sent_at) {
          const links = []

          for (const o of items) {
            const photoId = String(o.photo_id || '').trim()
            const license = normalizeLicense(o.license)
            const format = normalizeFormat(o.format)

            if (!photoId) continue

            let objectKey = String(o.delivery_object_key || '').trim()
            if (!objectKey) {
              // try photos table for safety
              try {
                objectKey = (await resolveObjectKeyForSingleOrder(o)) || ''
              } catch {}
            }
            if (!objectKey) {
              objectKey = fallbackObjectKeyFromPhotoId(photoId, format)
            }
            if (!objectKey) continue

            const jti = crypto.randomUUID()
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

            const ins = await supabaseAdmin.from('download_tokens').insert({
              jti,
              order_id: o.id, // token tied to item-order id
              expires_at: expiresAt.toISOString(),
            })
            if (ins.error) {
              console.error('download_tokens insert failed:', ins.error.message)
              continue
            }

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

            links.push({
              title: o.title || photoId,
              photoId,
              license,
              format,
              url: buildDownloadUrl(token, req),
            })
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
              orderId: groupCode,
              photoTitle: `Cart (${links.length} items)`,
              downloadUrl: combined,
              license: '—',
              format: '—',
            })

            // mark all rows as download sent
            await supabaseAdmin
              .from('orders')
              .update({ download_email_sent_at: new Date().toISOString() })
              .eq('code', groupCode)
          }
        }

        return res.status(200).send('OK')
      }

      /* ================= SINGLE PHOTO (EXISTING) ================= */

      const order = await findOrderByPayhereOrderId(order_id)
      if (!order) return res.status(200).send('OK')

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
      if (!email) return res.status(200).send('OK')

      let objectKey = await resolveObjectKeyForSingleOrder(o)
      if (!objectKey) objectKey = String(o.delivery_object_key || '').trim()
      if (!objectKey) objectKey = fallbackObjectKeyFromPhotoId(String(o.photo_id || ''), normalizeFormat(o.format))

      if (!objectKey) return res.status(200).send('OK')

      const desiredLimit = limitForLicense(normalizeLicense(o.license))
      if (o.download_limit == null || Number(o.download_limit) !== Number(desiredLimit)) {
        await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', o.id)
      }

      if (String(o.delivery_object_key || '') !== String(objectKey)) {
        await supabaseAdmin.from('orders').update({ delivery_object_key: objectKey }).eq('id', o.id)
      }

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
    if (statusCodeNum < 0) {
      const groupCode = String(custom_2 || order_id || '').trim()
      if (String(custom_1 || '').trim().toLowerCase() === 'cart') {
        await supabaseAdmin
          .from('orders')
          .update({
            status: 'FAILED',
            payhere_payment_id: payment_id || null,
            payhere_status_code: status_code || null,
            payhere_status_message: status_message || null,
          })
          .eq('code', groupCode)
        return res.status(200).send('OK')
      }

      const order = await findOrderByPayhereOrderId(order_id)
      if (order && String(order.status || '').toUpperCase() !== 'FAILED') {
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
    }

    return res.status(200).send('OK')
  } catch (err) {
    console.error('PayHere notify error:', err)
    return res.status(200).send('OK')
  }
}