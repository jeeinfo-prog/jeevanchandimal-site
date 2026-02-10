// lib/payhere.js
import crypto from 'crypto'

function md5Upper(str) {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex').toUpperCase()
}

export function formatAmount2(amount) {
  return Number(amount)
    .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .replaceAll(',', '')
}

export function payhereInitHash({ merchantId, merchantSecret, orderId, amount, currency }) {
  const hashedSecret = md5Upper(merchantSecret)
  const amountFormatted = formatAmount2(amount)
  const raw = `${merchantId}${orderId}${amountFormatted}${currency}${hashedSecret}`
  return md5Upper(raw)
}

export function payhereVerifyMd5Sig({
  merchantSecret,
  merchant_id,
  order_id,
  payhere_amount,
  payhere_currency,
  status_code,
  md5sig,
}) {
  const hashedSecret = md5Upper(merchantSecret)
  const local = md5Upper(
    `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${hashedSecret}`
  )
  return local === String(md5sig || '').toUpperCase()
}
