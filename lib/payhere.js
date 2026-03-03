// lib/payhere.js
import crypto from 'crypto'

/** ---------- env / config ---------- */

export const PAYHERE = {
  sandbox: String(process.env.PAYHERE_SANDBOX) === 'true',

  merchantId: process.env.PAYHERE_MERCHANT_ID,
  merchantSecret: process.env.PAYHERE_MERCHANT_SECRET,

  checkoutUrl:
    String(process.env.PAYHERE_SANDBOX) === 'true'
      ? 'https://sandbox.payhere.lk/pay/checkout'
      : 'https://www.payhere.lk/pay/checkout',
}

export function assertPayhereEnv() {
  const missing = []
  if (!PAYHERE.merchantId) missing.push('PAYHERE_MERCHANT_ID')
  if (!PAYHERE.merchantSecret) missing.push('PAYHERE_MERCHANT_SECRET')

  if (missing.length) {
    throw new Error(`Missing PayHere env vars: ${missing.join(', ')}`)
  }
}

/** ---------- helpers ---------- */

function md5Upper(str) {
  return crypto
    .createHash('md5')
    .update(String(str ?? ''), 'utf8')
    .digest('hex')
    .toUpperCase()
}

/**
 * PayHere expects amount in "0.00" format (no commas).
 * MUST match exactly what you POST to PayHere.
 */
export function formatAmount2(amount) {
  const n = Number(amount)
  if (!Number.isFinite(n)) return '0.00'
  return n
    .toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replaceAll(',', '')
}

/**
 * Init hash for PayHere checkout
 * hash = MD5(merchant_id + order_id + amount + currency + MD5(merchant_secret))
 */
export function payhereInitHash({
  merchantId,
  merchantSecret,
  orderId,
  amount,
  currency,
}) {
  const mId = String(merchantId ?? '').trim()
  const oId = String(orderId ?? '').trim()
  const ccy = String(currency ?? '').trim().toUpperCase()
  const hashedSecret = md5Upper(String(merchantSecret ?? '').trim())

  const amountFormatted = formatAmount2(amount)

  const raw = `${mId}${oId}${amountFormatted}${ccy}${hashedSecret}`
  return md5Upper(raw)
}

/**
 * Verify MD5 signature from PayHere notify callback
 * md5sig = MD5(merchant_id + order_id + payhere_amount + payhere_currency + status_code + MD5(secret))
 */
export function payhereVerifyMd5Sig({
  merchantSecret,
  merchant_id,
  order_id,
  payhere_amount,
  payhere_currency,
  status_code,
  md5sig,
}) {
  const hashedSecret = md5Upper(String(merchantSecret ?? '').trim())

  const local = md5Upper(
    `${String(merchant_id ?? '').trim()}${String(order_id ?? '').trim()}${String(
      payhere_amount ?? ''
    ).trim()}${String(payhere_currency ?? '')
      .trim()
      .toUpperCase()}${String(status_code ?? '').trim()}${hashedSecret}`
  )

  return local === String(md5sig ?? '').trim().toUpperCase()
}