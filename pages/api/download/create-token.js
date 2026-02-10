// pages/api/download/create-token.js
import jwt from 'jsonwebtoken'
import { getOrder } from '../../../lib/orders-memory'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { orderId } = req.body || {}
  if (!orderId) return res.status(400).json({ error: 'Missing orderId' })

  const order = getOrder(String(orderId))
  if (!order) return res.status(404).json({ error: 'Order not found' })
  if (order.status !== 'PAID') return res.status(403).json({ error: 'Not paid' })

  const secret = process.env.DOWNLOAD_TOKEN_SECRET
  if (!secret) return res.status(500).json({ error: 'Missing DOWNLOAD_TOKEN_SECRET' })

  const token = jwt.sign(
    {
      orderId: order.id,
      photoId: order.photoId,
      license: order.license,
      format: order.format,
    },
    secret,
    { expiresIn: '10m' }
  )

  return res.status(200).json({ token })
}
