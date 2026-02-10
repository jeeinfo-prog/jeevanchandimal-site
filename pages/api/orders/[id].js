// pages/api/orders/[id].js
import { getOrder } from '../../../lib/orders-memory'

export default function handler(req, res) {
  const { id } = req.query
  const order = getOrder(String(id))
  if (!order) return res.status(404).json({ error: 'Not found' })

  return res.status(200).json({
    id: order.id,
    status: order.status,
    photoId: order.photoId,
    license: order.license,
    format: order.format,
    currency: order.currency,
    amount: order.amount,
  })
}
