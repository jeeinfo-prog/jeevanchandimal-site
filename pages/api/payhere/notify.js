// pages/api/payhere/notify.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'
import { sendDownloadEmail, sendReceiptEmail } from '../../../lib/email'
import { PAYHERE, assertPayhereEnv, payhereVerifyMd5Sig } from '../../../lib/payhere'

export const config = {
  api: { bodyParser: false }, // PayHere posts x-www-form-urlencoded
}

/* ---------------- helpers ---------------- */

function round2(n) {
  const x = Number(n || 0)
  return Math.round(x * 100) / 100
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

function cleanBaseUrl(v) {
  return String(v || '')
    .trim()
    .replace(/\/+$/, '')
}

function getBaseUrl(req) {
  const webhook =
    cleanBaseUrl(process.env.WEBHOOK_BASE_URL) ||
    cleanBaseUrl(process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL)
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

function normalizeCurrency(v) {
  return String(v || '').trim().toUpperCase() === 'USD' ? 'USD' : 'LKR'
}

/* ===== MEMBERSHIP HELPERS ===== */

function normalizeMembershipTier(v) {
  const x = String(v || '').trim().toLowerCase()
  return ['basic', 'pro', 'elite'].includes(x) ? x : 'pro'
}

function normalizeMembershipTerm(v) {
  const x = String(v || '').trim().toLowerCase()
  return ['monthly', 'yearly', 'lifetime'].includes(x) ? x : 'monthly'
}

function addMonths(date, months) {
  const d = new Date(date)
  const day = d.getUTCDate()
  d.setUTCMonth(d.getUTCMonth() + months)
  if (d.getUTCDate() < day) d.setUTCDate(0)
  return d
}

function addYears(date, years) {
  const d = new Date(date)
  d.setUTCFullYear(d.getUTCFullYear() + years)
  return d
}

// ✅ monthly caps (your final numbers)
const MEMBER_LIMITS = {
  basic: 20,
  pro: 75,
  elite: 200,
}

/* ===== DOWNLOAD LIMIT HELPERS ===== */

function limitForLicense(license) {
  const x = normalizeLicense(license)
  if (x === 'commercial') return 0 // unlimited
  if (x === 'editorial') return 5
  return 3
}

function cartLimitFromItems(items) {
  const list = Array.isArray(items) ? items : []
  const licenses = list.map((it) => normalizeLicense(it?.license))
  if (licenses.includes('commercial')) return 0
  if (licenses.includes('editorial')) return 5
  return 3
}

/* ===== INVOICE ===== */

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

async function ensureInvoiceNo(order) {
  if (order.invoice_no) return order.invoice_no
  const invoiceNo = genInvoiceNo(order.id)

  const up = await supabaseAdmin
    .from('orders')
    .update({ invoice_no: invoiceNo })
    .eq('id', order.id)
  if (up.error) {
    console.error('ensureInvoiceNo update failed:', up.error.message)
  }
  return invoiceNo
}

/* ===== OBJECT KEY RESOLVE ===== */

// NOTE: last resort fallback
function fallbackObjectKeyFromPhotoId(photoId, format) {
  const pid = String(photoId || '')
  if (!pid) return null
  if (format === 'raw') return `photos/original/${pid}.zip`
  return `photos/original/${pid}.jpg`
}

// ✅ Resolve correct R2 key from photos table
async function resolveObjectKeyFromPhotos(photoId, format) {
  const pid = String(photoId || '').trim()
  if (!pid) return null

  const fmt = normalizeFormat(format)

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id,original_key,original_raw_key,original_jpg_key')
    .eq('id', pid)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) return null

  if (fmt === 'raw') return p.original_raw_key ? String(p.original_raw_key) : null
  return p.original_jpg_key || p.original_key
    ? String(p.original_jpg_key || p.original_key)
    : null
}

/* ===== ORDER LOOKUPS ===== */

async function findCartOrder({ cartOrderDbId, cartCode }) {
  const id = String(cartOrderDbId || '').trim()
  const code = String(cartCode || '').trim()

  // 1) Prefer custom_2 (DB id)
  if (id) {
    const byId = await supabaseAdmin.from('orders').select('*').eq('id', id).maybeSingle()
    if (!byId.error && byId?.data) return byId.data
  }

  // 2) Fallback to code = CART_...
  if (code) {
    const byCode = await supabaseAdmin.from('orders').select('*').eq('code', code).maybeSingle()
    if (!byCode.error && byCode?.data) return byCode.data
  }

  return null
}

async function findSingleOrderByRef(ref) {
  const v = String(ref || '').trim()
  if (!v) return null

  const byId = await supabaseAdmin.from('orders').select('*').eq('id', v).maybeSingle()
  if (!byId.error && byId?.data) return byId.data

  const byOrderId = await supabaseAdmin.from('orders').select('*').eq('order_id', v).maybeSingle()
  if (!byOrderId.error && byOrderId?.data) return byOrderId.data

  const byCode = await supabaseAdmin.from('orders').select('*').eq('code', v).maybeSingle()
  if (!byCode.error && byId?.data) return byId.data

  return null
}

/**
 * ✅ Idempotency helper:
 * Set timestamp only if currently NULL.
 */
async function claimSendOnce(orderId, column) {
  const now = new Date().toISOString()
  const r = await supabaseAdmin
    .from('orders')
    .update({ [column]: now })
    .eq('id', orderId)
    .is(column, null)
    .select('id')
    .maybeSingle()

  if (r.error) {
    console.error('claimSendOnce failed:', column, r.error.message)
    return false
  }
  return !!r.data
}

/* ===== KIND DETECTION + AMOUNT SAFETY ===== */

function orderLooksLikeCart(order_id, custom_1, dbOrder) {
  const kindRaw = String(custom_1 || '').trim().toLowerCase()
  const isCartByCustom = kindRaw === 'cart'
  const isCartByPrefix = String(order_id || '').startsWith('CART_')
  const isCartByDb = String(dbOrder?.order_kind || '').toLowerCase() === 'cart'
  return isCartByCustom || isCartByPrefix || isCartByDb
}

function orderLooksLikeMembership(custom_1, dbOrder) {
  const kindRaw = String(custom_1 || '').trim().toLowerCase()
  const isMemByCustom = kindRaw === 'membership'
  const isMemByDb = String(dbOrder?.order_kind || '').toLowerCase() === 'membership'
  return isMemByCustom || isMemByDb
}

function amountCurrencyMatchOrLog({ dbOrder, payhere_amount, payhere_currency }) {
  if (!dbOrder) return true
  if (!dbOrder.amount || !dbOrder.currency) return true

  const dbAmount = normalizePayhereAmount(dbOrder.amount)
  const dbCurrency = normalizeCurrency(dbOrder.currency)
  const phAmount = normalizePayhereAmount(payhere_amount)
  const phCurrency = normalizeCurrency(payhere_currency)

  if (dbAmount !== phAmount || dbCurrency !== phCurrency) {
    console.error('Amount/currency mismatch:', {
      orderId: dbOrder.id,
      code: dbOrder.code,
      dbAmount,
      dbCurrency,
      phAmount,
      phCurrency,
    })
    return false
  }
  return true
}

/* ---------------- handler ---------------- */

export default async function handler(req, res) {
  // PayHere expects 200 always
  if (req.method !== 'POST') return res.status(200).send('OK')

  try {
    assertPayhereEnv()

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

    // ✅ After signature check passes, we also enforce merchant_id match
    const ok = payhereVerifyMd5Sig({
      merchantSecret: PAYHERE.merchantSecret,
      merchant_id,
      order_id,
      payhere_amount: normalizePayhereAmount(payhere_amount),
      payhere_currency,
      status_code,
      md5sig,
    })

    if (!ok) {
      console.error('MD5 signature mismatch for order:', order_id)
      // Preserve your existing behavior: mark INVALID_SIG when possible, then return OK.

      // Try to find DB row early (helps kind detection + amount validation)
      let dbOrder = null
      try {
        if (
          String(order_id || '').startsWith('CART_') ||
          String(custom_1 || '').trim().toLowerCase() === 'cart'
        ) {
          dbOrder = await findCartOrder({ cartOrderDbId: String(custom_2 || '').trim(), cartCode: String(order_id).trim() })
        } else {
          dbOrder = await findSingleOrderByRef(order_id)
        }
      } catch {}

      const isCart = orderLooksLikeCart(order_id, custom_1, dbOrder)

      if (isCart) {
        const cartOrder =
          dbOrder ||
          (await findCartOrder({
            cartOrderDbId: String(custom_2 || '').trim(),
            cartCode: String(order_id || '').trim(),
          }))

        if (cartOrder) {
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'INVALID_SIG',
              payhere_payment_id: payment_id || null,
              payhere_status_code: status_code || null,
              payhere_status_message: status_message || null,
            })
            .eq('id', cartOrder.id)
        }
      } else {
        const single = dbOrder || (await findSingleOrderByRef(order_id))
        if (single) {
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'INVALID_SIG',
              payhere_payment_id: payment_id || null,
              payhere_status_code: status_code || null,
              payhere_status_message: status_message || null,
            })
            .eq('id', single.id)
        }
      }

      return res.status(200).send('OK')
    }

    // ✅ merchant_id hard check (prevents accepting another merchant’s webhook)
    if (String(merchant_id || '').trim() !== String(PAYHERE.merchantId || '').trim()) {
      console.error('Merchant ID mismatch:', {
        got: String(merchant_id || '').trim(),
        expected: String(PAYHERE.merchantId || '').trim(),
      })
      return res.status(200).send('OK')
    }

    const statusCodeNum = Number(status_code)

    // Try to find DB row early (helps kind detection + amount validation)
    let dbOrder = null
    const cartCode = String(order_id || '').trim()
    const cartDbId = String(custom_2 || '').trim()

    try {
      if (
        String(order_id || '').startsWith('CART_') ||
        String(custom_1 || '').trim().toLowerCase() === 'cart'
      ) {
        dbOrder = await findCartOrder({ cartOrderDbId: cartDbId, cartCode })
      } else {
        dbOrder = await findSingleOrderByRef(order_id)
      }
    } catch {}

    /* =========================================================
       ✅ PAYMENT SUCCESS
    ========================================================= */
    if (statusCodeNum === 2) {
      const isCart = orderLooksLikeCart(order_id, custom_1, dbOrder)
      const isMembership = orderLooksLikeMembership(custom_1, dbOrder)

      /* ================= MEMBERSHIP ================= */
      if (isMembership) {
        const order = dbOrder || (await findSingleOrderByRef(order_id))
        if (!order) return res.status(200).send('OK')

        if (!amountCurrencyMatchOrLog({ dbOrder: order, payhere_amount, payhere_currency })) {
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'AMOUNT_MISMATCH',
              payhere_payment_id: payment_id || null,
              payhere_status_code: status_code || null,
              payhere_status_message: status_message || null,
            })
            .eq('id', order.id)
          return res.status(200).send('OK')
        }

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
        }

        const freshRes = await supabaseAdmin
          .from('orders')
          .select('*')
          .eq('id', order.id)
          .maybeSingle()
        if (freshRes.error) {
          console.error('membership refetch failed:', freshRes.error.message)
          return res.status(200).send('OK')
        }

        const o = freshRes.data || order

        // ✅ your membership order encodes: license=tier, format=term
        const tier = normalizeMembershipTier(o.license)
        const term = normalizeMembershipTerm(o.format)

        const now = new Date()
        let endDate = null
        if (term === 'monthly') endDate = addMonths(now, 1).toISOString()
        if (term === 'yearly') endDate = addYears(now, 1).toISOString()
        if (term === 'lifetime') endDate = addYears(now, 100).toISOString()

        const monthlyLimit = MEMBER_LIMITS[tier] ?? 75

        // ✅ Activate membership in *memberships* table (this matches /api/member/download.js)
        try {
          const payload = {
            email,
            plan: tier,
            status: 'active',
            end_date: endDate,

            billing_cycle_start: now.toISOString(),
            monthly_download_limit: monthlyLimit,
            monthly_download_used: 0,

            updated_at: now.toISOString(),
          }

          const up = await supabaseAdmin.from('memberships').upsert(payload, { onConflict: 'email' })
          if (up.error) console.error('memberships upsert error:', up.error.message)
        } catch (e) {
          console.error('memberships activate error:', e?.message || e)
        }

        // Receipt email (send once)
        try {
          const invoiceNo = await ensureInvoiceNo(o)
          const claimedReceipt = await claimSendOnce(o.id, 'invoice_email_sent_at')
          if (claimedReceipt) {
            await sendReceiptEmail({
              to: email,
              orderId: o.id,
              invoiceNo,
              amount: o.amount,
              currency: o.currency || payhere_currency || 'LKR',
              photoTitle: `Membership (${tier} • ${term})`,
              license: tier,
              format: term,
              paymentId: payment_id || null,
            })
          }
        } catch (e) {
          console.error('membership receipt email failed:', o?.id, e?.message || e)
        }

        return res.status(200).send('OK')
      }

      /* ================= CART (NEW: SINGLE ROW) ================= */
      if (isCart) {
        const cartOrder = dbOrder || (await findCartOrder({ cartOrderDbId: cartDbId, cartCode }))
        if (!cartOrder) {
          console.error('Cart order not found:', { cartDbId, cartCode })
          return res.status(200).send('OK')
        }

        if (!amountCurrencyMatchOrLog({ dbOrder: cartOrder, payhere_amount, payhere_currency })) {
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'AMOUNT_MISMATCH',
              payhere_payment_id: payment_id || null,
              payhere_status_code: status_code || null,
              payhere_status_message: status_message || null,
            })
            .eq('id', cartOrder.id)
          return res.status(200).send('OK')
        }

        const email = normalizeEmail(cartOrder.email)
        if (!email) return res.status(200).send('OK')

        const wasPaidAlready = String(cartOrder.status || '').toUpperCase() === 'PAID'

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
            .eq('id', cartOrder.id)
        }

        // Re-fetch latest
        const { data: freshCart, error: freshErr } = await supabaseAdmin
          .from('orders')
          .select('*')
          .eq('id', cartOrder.id)
          .maybeSingle()

        if (freshErr) {
          console.error('cart refetch failed:', freshErr.message)
          return res.status(200).send('OK')
        }

        const o = freshCart || cartOrder
        const items = Array.isArray(o.items) ? o.items : []

        // ✅ IMPORTANT: if paid cart has no items, mark it clearly in DB
        if (items.length === 0) {
          console.error('Cart order has no items array:', o.id)

          await supabaseAdmin
            .from('orders')
            .update({
              status: 'PAID_NO_ITEMS',
              payhere_payment_id: payment_id || null,
              payhere_status_code: status_code || null,
              payhere_status_message: status_message || null,
            })
            .eq('id', o.id)

          return res.status(200).send('OK')
        }

        // Ensure download_limit on cart order
        const desiredLimit = cartLimitFromItems(items)
        if (o.download_limit == null || Number(o.download_limit) !== Number(desiredLimit)) {
          await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', o.id)
        }

        // Invoice number
        const invoiceNo = await ensureInvoiceNo(o)

        // Receipt email (send once)
        const claimedReceipt = await claimSendOnce(o.id, 'invoice_email_sent_at')
        if (claimedReceipt) {
          const amount =
            o.amount != null
              ? String(o.amount)
              : String(
                  round2(
                    items.reduce(
                      (sum, it) => sum + Number(it?.unitPrice || 0) * Number(it?.qty || 1),
                      0
                    )
                  )
                )

          await sendReceiptEmail({
            to: email,
            orderId: o.code || o.id,
            invoiceNo,
            amount,
            currency: o.currency || payhere_currency || 'LKR',
            photoTitle: `Cart (${items.length} items)`,
            license: '—',
            format: '—',
            paymentId: payment_id || null,
          })
        }

        // Download email (send once)
        const claimedDownload = await claimSendOnce(o.id, 'download_email_sent_at')
        if (claimedDownload) {
          const links = []

          for (const it of items) {
            const photoId = String(it?.photoId || it?.photo_id || '').trim()
            if (!photoId) continue

            const title = String(it?.title || photoId || 'Photo')
            const license = normalizeLicense(it?.license)
            const format = normalizeFormat(it?.format)

            let objectKey = String(it?.objectKey || it?.object_key || '').trim()

            if (!objectKey) {
              try {
                objectKey = (await resolveObjectKeyFromPhotos(photoId, format)) || ''
              } catch (e) {
                console.error('photos key resolve failed:', e?.message || e)
              }
            }

            if (!objectKey) objectKey = fallbackObjectKeyFromPhotoId(photoId, format)
            if (!objectKey) continue

            const jti = crypto.randomUUID()
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

            const ins = await supabaseAdmin.from('download_tokens').insert({
              jti,
              order_id: o.id,
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
              title,
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
              orderId: o.code || o.id,
              photoTitle: `Cart (${links.length} items)`,
              downloadUrl: combined,
              license: '—',
              format: '—',
            })
          } else {
            console.error('Cart claimed download email, but no links were generated:', o.id)
          }
        }

        return res.status(200).send('OK')
      }

      /* ================= SINGLE PHOTO (EXISTING) ================= */

      const order = dbOrder || (await findSingleOrderByRef(order_id))
      if (!order) return res.status(200).send('OK')

      if (!amountCurrencyMatchOrLog({ dbOrder: order, payhere_amount, payhere_currency })) {
        await supabaseAdmin
          .from('orders')
          .update({
            status: 'AMOUNT_MISMATCH',
            payhere_payment_id: payment_id || null,
            payhere_status_code: status_code || null,
            payhere_status_message: status_message || null,
          })
          .eq('id', order.id)
        return res.status(200).send('OK')
      }

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

      const { data: fresh } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('id', order.id)
        .single()
      const o = fresh || order

      const email = normalizeEmail(o.email)
      if (!email) return res.status(200).send('OK')

      let objectKey = null
      try {
        objectKey = await resolveObjectKeyFromPhotos(o.photo_id, o.format)
      } catch {}
      if (!objectKey) objectKey = String(o.delivery_object_key || '').trim()
      if (!objectKey)
        objectKey = fallbackObjectKeyFromPhotoId(String(o.photo_id || ''), normalizeFormat(o.format))
      if (!objectKey) return res.status(200).send('OK')

      const desiredLimit = limitForLicense(o.license)
      if (o.download_limit == null || Number(o.download_limit) !== Number(desiredLimit)) {
        await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', o.id)
      }

      if (String(o.delivery_object_key || '') !== String(objectKey)) {
        await supabaseAdmin.from('orders').update({ delivery_object_key: objectKey }).eq('id', o.id)
      }

      try {
        const invoiceNo = await ensureInvoiceNo(o)

        const claimedReceipt = await claimSendOnce(o.id, 'invoice_email_sent_at')
        const claimedDownload = await claimSendOnce(o.id, 'download_email_sent_at')

        if (!claimedReceipt && !claimedDownload) return res.status(200).send('OK')

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

        if (claimedReceipt) {
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
        }

        if (claimedDownload) {
          await sendDownloadEmail({
            to: email,
            orderId: o.id,
            photoTitle: o.photo_id,
            downloadUrl,
            license: normalizeLicense(o.license),
            format: normalizeFormat(o.format),
          })
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
      const isCart = orderLooksLikeCart(order_id, custom_1, dbOrder)

      if (isCart) {
        const cartOrder = dbOrder || (await findCartOrder({ cartOrderDbId: cartDbId, cartCode }))
        if (cartOrder) {
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'FAILED',
              payhere_payment_id: payment_id || null,
              payhere_status_code: status_code || null,
              payhere_status_message: status_message || null,
            })
            .eq('id', cartOrder.id)
        }
        return res.status(200).send('OK')
      }

      const order = dbOrder || (await findSingleOrderByRef(order_id))
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