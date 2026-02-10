// lib/orders-memory.js
const STORE = new Map()

export function createOrder(order) {
  STORE.set(order.id, order)
  return order
}

export function getOrder(orderId) {
  return STORE.get(orderId) || null
}

export function updateOrder(orderId, patch) {
  const existing = STORE.get(orderId)
  if (!existing) return null
  const updated = { ...existing, ...patch }
  STORE.set(orderId, updated)
  return updated
}
