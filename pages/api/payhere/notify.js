// pages/api/payhere/notify.js

import crypto from 'crypto'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { createDownloadToken } from '../../../lib/secureDownload'
import { sendDownloadEmail, sendReceiptEmail } from '../../../lib/email'
import {
  PAYHERE,
  assertPayhereEnv,
  payhereVerifyMd5Sig,
  getPayhereSecretForMerchantId,
} from '../../../lib/payhere'

export const config = {
  api: { bodyParser: false },
}

/* ---------------- helpers ---------------- */

function round2(n) {
  const x = Number(n || 0)
  return Math.round(x * 100) / 100
}

function clean(v) {
  return String(v || '').trim()
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    clean(value)
  )
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

function safeJsonParse(v, fallback = null) {
  try {
    return JSON.parse(v)
  } catch {
    return fallback
  }
}

function firstNonEmpty(...values) {
  for (const v of values) {
    if (clean(v)) return clean(v)
  }
  return ''
}

function cleanBaseUrl(v) {
  return clean(v).replace(/\/+$/, '')
}

function getBaseUrl(req) {
  const webhook =
    cleanBaseUrl(process.env.WEBHOOK_BASE_URL) ||
    cleanBaseUrl(process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL)
  if (webhook) return webhook

  const proto = clean(req.headers['x-forwarded-proto'] || 'https')
  const host = clean(req.headers['x-forwarded-host'] || req.headers.host || '')
  if (host) return `${proto}://${host}`

  return cleanBaseUrl(process.env.SITE_URL) || cleanBaseUrl(process.env.NEXT_PUBLIC_SITE_URL) || ''
}

function buildDownloadUrl(token, req) {
  const base = getBaseUrl(req)
  return `${base}/api/download?token=${encodeURIComponent(token)}`
}

function normalizePayhereAmount(v) {
  return Number(v || 0).toFixed(2)
}

function normalizeEmail(v) {
  return clean(v).toLowerCase()
}

function normalizeLicense(v) {
  const x = clean(v).toLowerCase()
  if (x === 'commercial') return 'commercial'
  if (x === 'editorial') return 'editorial'
  return 'personal'
}

function normalizeFormat(v) {
  return clean(v).toLowerCase() === 'raw' ? 'raw' : 'jpg'
}

function normalizeCurrency(v) {
  return clean(v).toUpperCase() === 'USD' ? 'USD' : 'LKR'
}

function normalizePaymentId(v) {
  const s = clean(v)
  if (!s || s === '0') return null
  return s
}

function alreadyProcessedPaidOrder(order, paymentId) {
  const pid = normalizePaymentId(paymentId)
  if (!order || !pid) return false

  return (
    String(order.status || '').toUpperCase() === 'PAID' &&
    clean(order.payhere_payment_id) === pid
  )
}

function makeReplayFingerprint(data, rawBody) {
  return crypto
    .createHash('sha256')
    .update(
      [
        clean(data.merchant_id),
        clean(data.order_id),
        clean(data.payment_id),
        normalizePayhereAmount(data.payhere_amount),
        normalizeCurrency(data.payhere_currency),
        clean(data.status_code),
        String(rawBody || ''),
      ].join('|')
    )
    .digest('hex')
}

/* ===== MEMBERSHIP HELPERS ===== */

function normalizeMembershipTier(v) {
  const x = clean(v).toLowerCase()
  return ['basic', 'pro', 'elite'].includes(x) ? x : 'pro'
}

function normalizeMembershipTerm(v) {
  const x = clean(v).toLowerCase()
  return ['monthly', 'yearly', 'lifetime'].includes(x) ? x : 'monthly'
}

function extractCustomPayloads(data) {
  const c1 = safeJsonParse(data?.custom_1, null)
  const c2 = safeJsonParse(data?.custom_2, null)

  return {
    c1: c1 && typeof c1 === 'object' ? c1 : null,
    c2: c2 && typeof c2 === 'object' ? c2 : null,
  }
}

function getMembershipMeta(data, dbOrder) {
  const { c1, c2 } = extractCustomPayloads(data)

  const plan = firstNonEmpty(
    data?.membership_plan,
    data?.plan,
    c1?.membership_plan,
    c1?.plan,
    c2?.membership_plan,
    c2?.plan,
    dbOrder?.membership_plan,
    dbOrder?.plan,
    dbOrder?.license
  )

  const term = firstNonEmpty(
    data?.membership_term,
    data?.term,
    c1?.membership_term,
    c1?.term,
    c2?.membership_term,
    c2?.term,
    dbOrder?.membership_term,
    dbOrder?.term,
    dbOrder?.format
  )

  return {
    plan: normalizeMembershipTier(plan),
    term: normalizeMembershipTerm(term),
  }
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

const MEMBER_LIMITS = {
  basic: 20,
  pro: 75,
  elite: 200,
}

/* ===== DOWNLOAD LIMIT HELPERS ===== */

function limitForLicense(license) {
  const x = normalizeLicense(license)
  if (x === 'commercial') return 0
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
    clean(orderId)
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(-6)
      .toUpperCase() || crypto.randomUUID().slice(0, 6).toUpperCase()
  return `INV-${yyyy}${mm}${dd}-${tail}`
}

async function ensureInvoiceNo(order) {
  if (order.invoice_no) return order.invoice_no
  const invoiceNo = genInvoiceNo(order.id)

  const up = await supabaseAdmin.from('orders').update({ invoice_no: invoiceNo }).eq('id', order.id)
  if (up.error) console.error('ensureInvoiceNo update failed:', up.error.message)
  return invoiceNo
}

/* ===== OBJECT KEY RESOLVE ===== */

function fallbackObjectKeyFromPhotoId(photoId, format) {
  const pid = clean(photoId)
  if (!pid) return null
  if (format === 'raw') return `photos/original/${pid}.zip`
  return `photos/original/${pid}.jpg`
}

async function resolveObjectKeyFromPhotos(photoId, format) {
  const pid = clean(photoId)
  if (!pid || !isUuid(pid)) return null

  const fmt = normalizeFormat(format)

  const { data: p, error } = await supabaseAdmin
    .from('photos')
    .select('id,original_key,original_raw_key,original_jpg_key')
    .eq('id', pid)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!p) return null

  if (fmt === 'raw') return p.original_raw_key ? String(p.original_raw_key) : null
  return p.original_jpg_key || p.original_key ? String(p.original_jpg_key || p.original_key) : null
}

/* ===== ORDER LOOKUPS ===== */

async function findCartOrder({ cartOrderDbId, cartCode }) {
  const id = clean(cartOrderDbId)
  const code = clean(cartCode)

  if (id) {
    const byId = await supabaseAdmin.from('orders').select('*').eq('id', id).maybeSingle()
    if (!byId.error && byId?.data) return byId.data
  }

  if (code) {
    const byCode = await supabaseAdmin.from('orders').select('*').eq('code', code).maybeSingle()
    if (!byCode.error && byCode?.data) return byCode.data

    const byOrderId = await supabaseAdmin.from('orders').select('*').eq('order_id', code).maybeSingle()
    if (!byOrderId.error && byOrderId?.data) return byOrderId.data

    const byPayhereOrderId = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('payhere_order_id', code)
      .maybeSingle()
    if (!byPayhereOrderId.error && byPayhereOrderId?.data) return byPayhereOrderId.data

    const byId2 = await supabaseAdmin.from('orders').select('*').eq('id', code).maybeSingle()
    if (!byId2.error && byId2?.data) return byId2.data
  }

  return null
}

async function findSingleOrderByRef(ref) {
  const v = clean(ref)
  if (!v) return null

  const byId = await supabaseAdmin.from('orders').select('*').eq('id', v).maybeSingle()
  if (!byId.error && byId?.data) return byId.data

  const byOrderId = await supabaseAdmin.from('orders').select('*').eq('order_id', v).maybeSingle()
  if (!byOrderId.error && byOrderId?.data) return byOrderId.data

  const byPayhereOrderId = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('payhere_order_id', v)
    .maybeSingle()
  if (!byPayhereOrderId.error && byPayhereOrderId?.data) return byPayhereOrderId.data

  const byCode = await supabaseAdmin.from('orders').select('*').eq('code', v).maybeSingle()
  if (!byCode.error && byCode?.data) return byCode.data

  return null
}

async function claimPaymentOnce(orderDbId, paymentId) {
  const pid = normalizePaymentId(paymentId)
  if (!pid) return false

  const r = await supabaseAdmin
    .from('orders')
    .update({ payhere_payment_id: pid })
    .eq('id', orderDbId)
    .is('payhere_payment_id', null)
    .select('id')
    .maybeSingle()

  if (r.error) {
    console.error('claimPaymentOnce failed:', r.error.message)
    return false
  }
  return !!r.data
}

async function updateOrderStatusSafe(orderId, patch) {
  const r = await supabaseAdmin.from('orders').update(patch).eq('id', orderId)
  if (r.error) console.error('updateOrderStatusSafe failed:', r.error.message, { orderId, patch })
}

async function markEmailSent(orderId, column) {
  const now = new Date().toISOString()
  const r = await supabaseAdmin
    .from('orders')
    .update({ [column]: now })
    .eq('id', orderId)
    .is(column, null)

  if (r.error) {
    console.error('markEmailSent failed:', column, r.error.message)
    return false
  }
  return true
}

async function markReplayIfPossible({ fingerprint, orderId, paymentId, statusCode, payload }) {
  try {
    await supabaseAdmin.from('payhere_notifications').insert({
      fingerprint,
      order_id: clean(orderId) || null,
      payment_id: normalizePaymentId(paymentId),
      status_code: clean(statusCode) || null,
      payload,
      created_at: new Date().toISOString(),
    })
    return { duplicate: false }
  } catch (e) {
    const msg = String(e?.message || '')
    if (msg.includes('duplicate key') || msg.includes('unique constraint') || msg.includes('23505')) {
      return { duplicate: true }
    }
    console.error('markReplayIfPossible failed:', msg)
    return { duplicate: false }
  }
}

/* ===== KIND DETECTION + AMOUNT SAFETY ===== */

function orderLooksLikeCart(order_id, custom_1, dbOrder) {
  const kindRaw = clean(custom_1).toLowerCase()
  const isCartByCustom = kindRaw === 'cart'
  const isCartByPrefix = clean(order_id).startsWith('CART_')
  const isCartByDb = clean(dbOrder?.order_kind).toLowerCase() === 'cart'
  return isCartByCustom || isCartByPrefix || isCartByDb
}

function orderLooksLikeMembership(data, dbOrder) {
  const kindRaw = clean(data?.custom_1).toLowerCase()
  const { c1, c2 } = extractCustomPayloads(data)

  const hasPlan = !!firstNonEmpty(
    data?.membership_plan,
    data?.plan,
    c1?.membership_plan,
    c1?.plan,
    c2?.membership_plan,
    c2?.plan,
    dbOrder?.membership_plan,
    dbOrder?.plan
  )

  const hasTerm = !!firstNonEmpty(
    data?.membership_term,
    data?.term,
    c1?.membership_term,
    c1?.term,
    c2?.membership_term,
    c2?.term,
    dbOrder?.membership_term,
    dbOrder?.term
  )

  const isMemByCustom = kindRaw === 'membership'
  const isMemByDb = clean(dbOrder?.order_kind).toLowerCase() === 'membership'

  return isMemByCustom || isMemByDb || hasPlan || hasTerm
}

function amountCurrencyMatchOrLog({ dbOrder, payhere_amount, payhere_currency }) {
  if (!dbOrder) return true
  if (dbOrder.amount == null || dbOrder.currency == null) return true

  const dbAmount = normalizePayhereAmount(dbOrder.amount)
  const dbCurrency = normalizeCurrency(dbOrder.currency)
  const phAmount = normalizePayhereAmount(payhere_amount)
  const phCurrency = normalizeCurrency(payhere_currency)

  if (dbAmount !== phAmount || dbCurrency !== phCurrency) {
    console.error('Amount/currency mismatch:', {
      orderId: dbOrder.id,
      code: dbOrder.code,
      order_id: dbOrder.order_id,
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
  if (req.method !== 'POST') {
    console.log('notify: non-POST request ignored')
    return res.status(200).send('OK')
  }

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

    console.log('=== PayHere notify hit ===')
    console.log('notify raw:', raw)
    console.log('notify parsed:', data)
    console.log('notify summary:', {
      order_id: clean(order_id),
      payment_id: clean(payment_id),
      status_code: clean(status_code),
      merchant_id: clean(merchant_id),
      custom_1: clean(custom_1),
      custom_2: clean(custom_2),
    })

    if (!order_id) {
      console.log('notify: missing order_id')
      return res.status(200).send('OK')
    }

    const pid = normalizePaymentId(payment_id)
    const fingerprint = makeReplayFingerprint(data, raw)
    const secretForThisMerchant = getPayhereSecretForMerchantId(merchant_id)

    const ok = payhereVerifyMd5Sig({
      merchantSecret: secretForThisMerchant,
      merchant_id,
      order_id,
      payhere_amount: normalizePayhereAmount(payhere_amount),
      payhere_currency,
      status_code,
      md5sig,
    })

    const cartCode = clean(order_id)
    const cartDbId = clean(custom_2)

    if (!ok) {
      console.error('notify: MD5 signature mismatch', {
        order_id: clean(order_id),
        merchant_id: clean(merchant_id),
        status_code: clean(status_code),
        payhere_amount: normalizePayhereAmount(payhere_amount),
        payhere_currency: clean(payhere_currency),
        md5sig: clean(md5sig),
      })

      let dbOrder = null
      try {
        if (clean(order_id).startsWith('CART_') || clean(custom_1).toLowerCase() === 'cart') {
          dbOrder = await findCartOrder({ cartOrderDbId: cartDbId, cartCode })
        } else {
          dbOrder = await findSingleOrderByRef(order_id)
        }
      } catch (e) {
        console.error('notify: lookup during invalid sig failed:', e?.message || e)
      }

      console.log('notify: dbOrder found during invalid sig?', !!dbOrder)

      if (dbOrder) {
        await updateOrderStatusSafe(dbOrder.id, {
          status: 'INVALID_SIG',
          payhere_status_code: clean(status_code) || null,
          payhere_status_message: clean(status_message) || null,
        })
      }

      return res.status(200).send('OK')
    }

    const knownIds = [
      clean(PAYHERE.merchantId),
      clean(PAYHERE.merchantIdLive),
      clean(PAYHERE.merchantIdSandbox),
    ].filter(Boolean)

    if (!knownIds.includes(clean(merchant_id))) {
      console.error('notify: merchant ID mismatch', {
        got: clean(merchant_id),
        expected_any_of: knownIds,
      })
      return res.status(200).send('OK')
    }

    const replayResult = await markReplayIfPossible({
      fingerprint,
      orderId: order_id,
      paymentId: pid,
      statusCode: status_code,
      payload: data,
    })

    if (replayResult.duplicate) {
      console.log('notify: duplicate webhook ignored', {
        order_id: clean(order_id),
        payment_id: pid,
      })
      return res.status(200).send('OK')
    }

    const statusCodeNum = Number(status_code)

    let dbOrder = null
    try {
      if (clean(order_id).startsWith('CART_') || clean(custom_1).toLowerCase() === 'cart') {
        dbOrder = await findCartOrder({ cartOrderDbId: cartDbId, cartCode })
      } else {
        dbOrder = await findSingleOrderByRef(order_id)
      }
    } catch (e) {
      console.error('notify: initial order lookup failed:', e?.message || e)
    }

    console.log('notify: dbOrder found?', !!dbOrder, {
      order_id: clean(order_id),
      dbOrderId: dbOrder?.id || null,
      dbOrderKind: dbOrder?.order_kind || null,
      dbStatus: dbOrder?.status || null,
    })

    /* =========================================================
       ✅ PAYMENT SUCCESS
    ========================================================= */
    if (statusCodeNum === 2) {
      console.log('notify: success branch entered', {
        order_id: clean(order_id),
        payment_id: pid,
      })

      const isCart = orderLooksLikeCart(order_id, custom_1, dbOrder)
      const isMembership = orderLooksLikeMembership(data, dbOrder)

      /* ================= MEMBERSHIP ================= */
      if (isMembership) {
        const order = dbOrder || (await findSingleOrderByRef(order_id))
        if (!order) {
          console.error('notify: membership order not found', { order_id: clean(order_id) })
          return res.status(200).send('OK')
        }

        if (alreadyProcessedPaidOrder(order, payment_id)) {
          console.log('notify: membership already processed', { orderId: order.id, payment_id: pid })
          return res.status(200).send('OK')
        }

        if (!amountCurrencyMatchOrLog({ dbOrder: order, payhere_amount, payhere_currency })) {
          if (pid) await claimPaymentOnce(order.id, pid)

          await updateOrderStatusSafe(order.id, {
            status: 'AMOUNT_MISMATCH',
            payhere_status_code: clean(status_code) || null,
            payhere_status_message: clean(status_message) || null,
          })

          return res.status(200).send('OK')
        }

        const claimedPayment = pid ? await claimPaymentOnce(order.id, pid) : false

        if (!claimedPayment && String(order.status || '').toUpperCase() === 'PAID') {
          await updateOrderStatusSafe(order.id, {
            payhere_status_code: clean(status_code) || null,
            payhere_status_message: clean(status_message) || null,
          })
          return res.status(200).send('OK')
        }

        const email = normalizeEmail(order.email)
        const userId = isUuid(order.user_id) ? clean(order.user_id) : null
        const wasPaidAlready = String(order.status || '').toUpperCase() === 'PAID'

        if (!wasPaidAlready) {
          await updateOrderStatusSafe(order.id, {
  status: 'PAID',
  paid_at: new Date().toISOString(),
  payhere_status_code: clean(status_code) || null,
  payhere_status_message: clean(status_message) || null,
})
        } else {
          await updateOrderStatusSafe(order.id, {
  payhere_status_code: clean(status_code) || null,
  payhere_status_message: clean(status_message) || null,
})
        }

        if (!email) {
          console.log('notify: membership email missing, payment still marked paid', { orderId: order.id })
          return res.status(200).send('OK')
        }

        const freshRes = await supabaseAdmin.from('orders').select('*').eq('id', order.id).maybeSingle()

        if (freshRes.error) {
          console.error('membership refetch failed:', freshRes.error.message)
          return res.status(200).send('OK')
        }

        const o = freshRes.data || order
        const { plan: tier, term } = getMembershipMeta(data, o)

        const now = new Date()
        const startDate = now.toISOString()

        let endDate = null
        if (term === 'monthly') endDate = addMonths(now, 1).toISOString()
        if (term === 'yearly') endDate = addYears(now, 1).toISOString()
        if (term === 'lifetime') endDate = addYears(now, 100).toISOString()

        const monthlyLimit = MEMBER_LIMITS[tier] ?? 75

        if (userId) {
          try {
            const payload = {
              user_id: userId,
              email,
              plan: tier,
              term,
              status: 'active',
              start_date: startDate,
              end_date: endDate,
              billing_cycle: term,
              billing_cycle_start: startDate,
              billing_cycle_end: endDate,
              monthly_download_limit: monthlyLimit,
              monthly_download_used: 0,
              updated_at: new Date().toISOString(),
            }

            const up = await supabaseAdmin.from('memberships').upsert(payload, { onConflict: 'user_id' })

            if (up.error) console.error('memberships upsert error:', up.error.message)
          } catch (e) {
            console.error('memberships activate error:', e?.message || e)
          }
        } else {
          console.error('membership activation skipped: missing UUID user_id for order', order.id)
        }

        try {
          const invoiceNo = await ensureInvoiceNo(o)
          const alreadySent = !!o.invoice_email_sent_at

          if (!alreadySent) {
            await sendReceiptEmail({
              to: email,
              orderId: o.id,
              invoiceNo,
              amount: o.amount,
              currency: o.currency || payhere_currency || 'LKR',
              photoTitle: `Membership (${tier} • ${term})`,
              license: tier,
              format: term,
              paymentId: pid || null,
            })

            await markEmailSent(o.id, 'invoice_email_sent_at')
          }
        } catch (e) {
          console.error('membership receipt email failed:', o?.id, e?.message || e)
        }

        return res.status(200).send('OK')
      }

      /* ================= CART ================= */
      if (isCart) {
        const cartOrder = dbOrder || (await findCartOrder({ cartOrderDbId: cartDbId, cartCode }))
        if (!cartOrder) {
          console.error('notify: cart order not found', {
            cartDbId,
            cartCode,
            order_id: clean(order_id),
          })
          return res.status(200).send('OK')
        }

        if (alreadyProcessedPaidOrder(cartOrder, payment_id)) {
          console.log('notify: cart already processed', { orderId: cartOrder.id, payment_id: pid })
          return res.status(200).send('OK')
        }

        if (!amountCurrencyMatchOrLog({ dbOrder: cartOrder, payhere_amount, payhere_currency })) {
          if (pid) await claimPaymentOnce(cartOrder.id, pid)

          await updateOrderStatusSafe(cartOrder.id, {
            status: 'AMOUNT_MISMATCH',
            payhere_status_code: clean(status_code) || null,
            payhere_status_message: clean(status_message) || null,
          })

          return res.status(200).send('OK')
        }

        const claimedPayment = pid ? await claimPaymentOnce(cartOrder.id, pid) : false
        if (!claimedPayment && String(cartOrder.status || '').toUpperCase() === 'PAID') {
          await updateOrderStatusSafe(cartOrder.id, {
            payhere_status_code: clean(status_code) || null,
            payhere_status_message: clean(status_message) || null,
          })
          return res.status(200).send('OK')
        }

        const email = normalizeEmail(cartOrder.email)
        const wasPaidAlready = String(cartOrder.status || '').toUpperCase() === 'PAID'

        if (!wasPaidAlready) {
          await updateOrderStatusSafe(cartOrder.id, {
            status: 'PAID',
            paid_at: new Date().toISOString(),
            payhere_order_id: clean(order_id) || null,
            payhere_status_code: clean(status_code) || null,
            payhere_status_message: clean(status_message) || null,
          })
        } else {
          await updateOrderStatusSafe(cartOrder.id, {
            payhere_order_id: clean(order_id) || null,
            payhere_status_code: clean(status_code) || null,
            payhere_status_message: clean(status_message) || null,
          })
        }

        if (!email) {
          console.log('notify: cart email missing, payment still marked paid', { orderId: cartOrder.id })
          return res.status(200).send('OK')
        }

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

        if (items.length === 0) {
          console.error('Cart order has no items array:', o.id)
          await updateOrderStatusSafe(o.id, {
            status: 'PAID_NO_ITEMS',
            payhere_status_code: clean(status_code) || null,
            payhere_status_message: clean(status_message) || null,
          })
          return res.status(200).send('OK')
        }

        const desiredLimit = cartLimitFromItems(items)
        if (o.download_limit == null || Number(o.download_limit) !== Number(desiredLimit)) {
          await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', o.id)
        }

        const invoiceNo = await ensureInvoiceNo(o)

        try {
          if (!o.invoice_email_sent_at) {
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
              paymentId: pid || null,
            })

            await markEmailSent(o.id, 'invoice_email_sent_at')
          }
        } catch (e) {
          console.error('cart receipt email failed:', o?.id, e?.message || e)
        }

        try {
          if (!o.download_email_sent_at) {
            const links = []

            for (const it of items) {
              const photoId = clean(it?.photoId || it?.photo_id)
              const legacyPhotoRef = clean(it?.photoRef || it?.photo_ref)
              const title = clean(it?.title) || legacyPhotoRef || photoId || 'Photo'
              const license = normalizeLicense(it?.license)
              const format = normalizeFormat(it?.format)

              let objectKey = clean(it?.objectKey || it?.object_key)

              if (photoId && isUuid(photoId) && !objectKey) {
                try {
                  objectKey = (await resolveObjectKeyFromPhotos(photoId, format)) || ''
                } catch (e) {
                  console.error('photos key resolve failed:', e?.message || e)
                }
              }

              if (!objectKey && photoId && isUuid(photoId)) {
                objectKey = fallbackObjectKeyFromPhotoId(photoId, format)
              }

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
              const safePhotoId =
                photoId && isUuid(photoId)
                  ? photoId
                  : '00000000-0000-0000-0000-000000000000'

              const token = createDownloadToken(
                {
                  jti,
                  orderId: o.id,
                  photoId: safePhotoId,
                  photoRef: legacyPhotoRef || null,
                  format,
                  objectKey,
                  userId: o.user_id || null,
                  guestEmail: email,
                  filename: `${safePhotoId}.${ext}`,
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

              await markEmailSent(o.id, 'download_email_sent_at')
            } else {
              console.error('Cart download links not generated:', o.id)
            }
          }
        } catch (e) {
          console.error('cart download email failed:', o?.id, e?.message || e)
        }

        return res.status(200).send('OK')
      }

      /* ================= SINGLE PHOTO ================= */

      const order = dbOrder || (await findSingleOrderByRef(order_id))
      if (!order) {
        console.error('notify: single order not found', { order_id: clean(order_id) })
        return res.status(200).send('OK')
      }

      if (alreadyProcessedPaidOrder(order, payment_id)) {
        console.log('notify: single order already processed', { orderId: order.id, payment_id: pid })
        return res.status(200).send('OK')
      }

      if (!amountCurrencyMatchOrLog({ dbOrder: order, payhere_amount, payhere_currency })) {
        if (pid) await claimPaymentOnce(order.id, pid)

        await updateOrderStatusSafe(order.id, {
          status: 'AMOUNT_MISMATCH',
          payhere_status_code: clean(status_code) || null,
          payhere_status_message: clean(status_message) || null,
        })

        return res.status(200).send('OK')
      }

      const claimedPayment = pid ? await claimPaymentOnce(order.id, pid) : false
      if (!claimedPayment && String(order.status || '').toUpperCase() === 'PAID') {
        await updateOrderStatusSafe(order.id, {
          payhere_status_code: clean(status_code) || null,
          payhere_status_message: clean(status_message) || null,
        })

        return res.status(200).send('OK')
      }

      const wasPaidAlready = String(order.status || '').toUpperCase() === 'PAID'
      if (!wasPaidAlready) {
        await updateOrderStatusSafe(order.id, {
          status: 'PAID',
          paid_at: new Date().toISOString(),
          payhere_order_id: clean(order_id) || null,
          payhere_status_code: clean(status_code) || null,
          payhere_status_message: clean(status_message) || null,
        })
      } else {
        await updateOrderStatusSafe(order.id, {
          payhere_order_id: clean(order_id) || null,
          payhere_status_code: clean(status_code) || null,
          payhere_status_message: clean(status_message) || null,
        })
      }

      const { data: fresh } = await supabaseAdmin.from('orders').select('*').eq('id', order.id).maybeSingle()

      const o = fresh || order
      const email = normalizeEmail(o.email)
      if (!email) {
        console.log('notify: single order email missing, payment still marked paid', { orderId: o.id })
        return res.status(200).send('OK')
      }

      let objectKey = null
      try {
        objectKey = await resolveObjectKeyFromPhotos(o.photo_id, o.format)
      } catch (e) {
        console.error('notify: resolveObjectKeyFromPhotos failed:', e?.message || e)
      }

      if (!objectKey) objectKey = clean(o.delivery_object_key)
      if (!objectKey) {
        objectKey = fallbackObjectKeyFromPhotoId(clean(o.photo_id), normalizeFormat(o.format))
      }
      if (!objectKey) {
        console.error('notify: no objectKey resolved for single order', { orderId: o.id })
        return res.status(200).send('OK')
      }

      const desiredLimit = limitForLicense(o.license)
      if (o.download_limit == null || Number(o.download_limit) !== Number(desiredLimit)) {
        await supabaseAdmin.from('orders').update({ download_limit: desiredLimit }).eq('id', o.id)
      }

      if (clean(o.delivery_object_key) !== clean(objectKey)) {
        await supabaseAdmin.from('orders').update({ delivery_object_key: objectKey }).eq('id', o.id)
      }

      try {
        const invoiceNo = await ensureInvoiceNo(o)
        const fmt = normalizeFormat(o.format)
        const ext = fmt === 'raw' ? 'zip' : 'jpg'
        const safePhotoId = isUuid(o.photo_id)
          ? o.photo_id
          : '00000000-0000-0000-0000-000000000000'
        const safePhotoRef = clean(o.photo_ref) || null

        let downloadUrl = null

        if (!o.download_email_sent_at) {
          const jti = crypto.randomUUID()
          const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

          const ins = await supabaseAdmin.from('download_tokens').insert({
            jti,
            order_id: o.id,
            expires_at: expiresAt.toISOString(),
          })
          if (ins.error) throw new Error(`download_tokens insert failed: ${ins.error.message}`)

          const token = createDownloadToken(
            {
              jti,
              orderId: o.id,
              photoId: safePhotoId,
              photoRef: safePhotoRef,
              format: fmt,
              objectKey,
              userId: o.user_id || null,
              guestEmail: email,
              filename: `${safePhotoId}.${ext}`,
              license: normalizeLicense(o.license),
            },
            '1h'
          )

          downloadUrl = buildDownloadUrl(token, req)
        }

        if (!o.invoice_email_sent_at) {
          await sendReceiptEmail({
            to: email,
            orderId: o.id,
            invoiceNo,
            amount: o.amount,
            currency: o.currency,
            photoTitle: safePhotoRef || safePhotoId,
            license: normalizeLicense(o.license),
            format: fmt,
            paymentId: pid || null,
          })

          await markEmailSent(o.id, 'invoice_email_sent_at')
        }

        if (!o.download_email_sent_at && downloadUrl) {
          await sendDownloadEmail({
            to: email,
            orderId: o.id,
            photoTitle: safePhotoRef || safePhotoId,
            downloadUrl,
            license: normalizeLicense(o.license),
            format: fmt,
          })

          await markEmailSent(o.id, 'download_email_sent_at')
        }
      } catch (e) {
        console.error('Single photo delivery email block failed:', o.id, e?.message || e)
      }

      return res.status(200).send('OK')
    }

    /* =========================================================
       ❌ PAYMENT FAILED / CANCELED / CHARGEDBACK
    ========================================================= */
    if (statusCodeNum < 0) {
      console.log('notify: failed payment branch entered', {
        order_id: clean(order_id),
        payment_id: pid,
        status_code: clean(status_code),
      })

      const isCart = orderLooksLikeCart(order_id, custom_1, dbOrder)

      const attachPidIfPossible = async (orderRow) => {
        if (!orderRow) return
        if (pid) await claimPaymentOnce(orderRow.id, pid)
      }

      if (isCart) {
        const cartOrder = dbOrder || (await findCartOrder({ cartOrderDbId: cartDbId, cartCode }))
        if (cartOrder) {
          await attachPidIfPossible(cartOrder)
          await updateOrderStatusSafe(cartOrder.id, {
            status: 'FAILED',
            payhere_status_code: clean(status_code) || null,
            payhere_status_message: clean(status_message) || null,
          })
        } else {
          console.error('notify: failed cart order not found', { order_id: clean(order_id) })
        }
        return res.status(200).send('OK')
      }

      const order = dbOrder || (await findSingleOrderByRef(order_id))
      if (order && String(order.status || '').toUpperCase() !== 'FAILED') {
        await attachPidIfPossible(order)
        await updateOrderStatusSafe(order.id, {
          status: 'FAILED',
          payhere_status_code: clean(status_code) || null,
          payhere_status_message: clean(status_message) || null,
        })
      } else if (!order) {
        console.error('notify: failed single order not found', { order_id: clean(order_id) })
      }
    }

    console.log('notify: completed without matching special branch', {
      order_id: clean(order_id),
      status_code: clean(status_code),
    })

    return res.status(200).send('OK')
  } catch (err) {
    console.error('PayHere notify error:', err?.message || err)
    return res.status(200).send('OK')
  }
}