// pages/api/payhere/notify.js
import { payhereVerifyMd5Sig } from '../../../lib/payhere'
import { updateOrder } from '../../../lib/orders-memory'

export const config = {
  api: { bodyParser: false },
}

function parseFormUrlEncoded(raw) {
  const s = raw.toString('utf8')
  const obj = {}
  for (const pair of s.split('&')) {
    const [k, v] = pair.split('=')
    if (!k) continue
    obj[decodeURIComponent(k)] = decodeURIComponent((v || '').replace(/\+/g, ' '))
  }
  return obj
}

export default async function handler(req, res) {
  try {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const body = parseFormUrlEncoded(Buffer.concat(chunks))

    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET
    if (!merchantSecret) return res.status(500).send('Missing merchant secret')

    const ok = payhereVerifyMd5Sig({
      merchantSecret,
      merchant_id: body.merchant_id,
      order_id: body.order_id,
      payhere_amount: body.payhere_amount,
      payhere_currency: body.payhere_currency,
      status_code: body.status_code,
      md5sig: body.md5sig,
    })

    if (!ok) return res.status(400).send('Invalid signature')

    const statusCode = Number(body.status_code)

    if (statusCode === 2) {
      updateOrder(body.order_id, {
        status: 'PAID',
        paidAt: new Date().toISOString(),
        payherePaymentId: body.payment_id,
      })
    } else if (statusCode === -1) {
      updateOrder(body.order_id, { status: 'CANCELED' })
    } else if (statusCode === -2 || statusCode === -3) {
      updateOrder(body.order_id, { status: 'FAILED' })
    } else {
      updateOrder(body.order_id, { status: 'PENDING' })
    }

    return res.status(200).send('OK')
  } catch (e) {
    return res.status(500).send('Server error')
  }
}
