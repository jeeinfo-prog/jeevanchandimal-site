// lib/payhere.js
import crypto from 'crypto'

function boolEnv(v) {
  return String(v || '')
    .trim()
    .toLowerCase() === 'true'
}

/** ---------- env / config ---------- */

export const PAYHERE = {
  sandbox: boolEnv(process.env.PAYHERE_SANDBOX),

  // Default (single set)
  merchantId: process.env.PAYHERE_MERCHANT_ID,
  merchantSecret: process.env.PAYHERE_MERCHANT_SECRET,

  // Optional split creds (recommended if you switch between sandbox/live)
  merchantIdLive: process.env.PAYHERE_MERCHANT_ID_LIVE,
  merchantSecretLive: process.env.PAYHERE_MERCHANT_SECRET_LIVE,
  merchantIdSandbox: process.env.PAYHERE_MERCHANT_ID_SANDBOX,
  merchantSecretSandbox: process.env.PAYHERE_MERCHANT_SECRET_SANDBOX,

  checkoutUrl: boolEnv(process.env.PAYHERE_SANDBOX)
    ? 'https://sandbox.payhere.lk/pay/checkout'
    : 'https://www.payhere.lk/pay/checkout',
}

export function assertPayhereEnv() {
  // Accept either (default pair) OR (split pairs)
  const hasDefault = !!(PAYHERE.merchantId && PAYHERE.merchantSecret)
  const hasSplit =
    !!(PAYHERE.merchantIdLive && PAYHERE.merchantSecretLive) ||
    !!(PAYHERE.merchantIdSandbox && PAYHERE.merchantSecretSandbox)

  if (!hasDefault && !hasSplit) {
    throw new Error(
      'Missing PayHere env vars: set PAYHERE_MERCHANT_ID + PAYHERE_MERCHANT_SECRET (or LIVE/SANDBOX pairs).'
    )
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
export function payhereInitHash({ merchantId, merchantSecret, orderId, amount, currency }) {
  const mId = String(merchantId ?? '').trim()
  const oId = String(orderId ?? '').trim()
  const ccy = String(currency ?? '').trim().toUpperCase()
  const hashedSecret = md5Upper(String(merchantSecret ?? '').trim())

  const amountFormatted = formatAmount2(amount)
  const raw = `${mId}${oId}${amountFormatted}${ccy}${hashedSecret}`
  return md5Upper(raw)
}

/**
 * Choose correct secret based on merchant_id (handles live/sandbox mixed setups).
 */
export function getPayhereSecretForMerchantId(merchant_id) {
  const mid = String(merchant_id || '').trim()

  // If split creds exist, match by merchant id
  if (PAYHERE.merchantIdLive && mid === String(PAYHERE.merchantIdLive).trim()) {
    return PAYHERE.merchantSecretLive || PAYHERE.merchantSecret
  }
  if (PAYHERE.merchantIdSandbox && mid === String(PAYHERE.merchantIdSandbox).trim()) {
    return PAYHERE.merchantSecretSandbox || PAYHERE.merchantSecret
  }

  // Fallback to default
  return PAYHERE.merchantSecret
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
  const secret = String(merchantSecret ?? '').trim()
  const hashedSecret = md5Upper(secret)

  const local = md5Upper(
    `${String(merchant_id ?? '').trim()}${String(order_id ?? '').trim()}${String(
      payhere_amount ?? ''
    ).trim()}${String(payhere_currency ?? '')
      .trim()
      .toUpperCase()}${String(status_code ?? '').trim()}${hashedSecret}`
  )

  return local === String(md5sig ?? '').trim().toUpperCase()
}