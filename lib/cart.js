// lib/cart.js

const CART_KEY = 'jc_cart_v1'

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json)
    return v ?? fallback
  } catch {
    return fallback
  }
}

export function readCart() {
  if (typeof window === 'undefined') return { items: [] }
  const raw = window.localStorage.getItem(CART_KEY)
  const cart = safeParse(raw, { items: [] })
  if (!cart?.items || !Array.isArray(cart.items)) return { items: [] }
  return cart
}

export function writeCart(cart) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function clearCart() {
  writeCart({ items: [] })
}

/**
 * Cart item shape (per photo + license + format)
 * {
 *   photoId: string,
 *   title: string,
 *   thumbUrl: string,
 *   license: 'personal' | 'commercial' | 'editorial',
 *   format: 'jpg' | 'raw',
 *   currency: 'LKR' | 'USD',
 *   unitPrice: number,
 *   qty: number
 * }
 */

export function addToCart(item) {
  const cart = readCart()
  const items = cart.items || []

  // ✅ Unique key: same photo + same license + same format + same currency
  const key = `${item.photoId}__${item.license}__${item.format}__${item.currency}`

  const idx = items.findIndex(
    (x) =>
      `${x.photoId}__${x.license}__${x.format}__${x.currency}` === key
  )

  if (idx >= 0) {
    const next = [...items]
    next[idx] = { ...next[idx], qty: (next[idx].qty || 1) + (item.qty || 1) }
    const out = { items: next }
    writeCart(out)
    return out
  }

  const out = { items: [...items, { ...item, qty: item.qty || 1 }] }
  writeCart(out)
  return out
}

export function removeFromCart({ photoId, license, format, currency }) {
  const cart = readCart()
  const items = cart.items || []
  const key = `${photoId}__${license}__${format}__${currency}`
  const out = {
    items: items.filter(
      (x) => `${x.photoId}__${x.license}__${x.format}__${x.currency}` !== key
    ),
  }
  writeCart(out)
  return out
}

export function setQty({ photoId, license, format, currency, qty }) {
  const cart = readCart()
  const items = cart.items || []
  const key = `${photoId}__${license}__${format}__${currency}`

  const next = items
    .map((x) => {
      const k = `${x.photoId}__${x.license}__${x.format}__${x.currency}`
      if (k !== key) return x
      return { ...x, qty: Math.max(1, Number(qty || 1)) }
    })
    .filter(Boolean)

  const out = { items: next }
  writeCart(out)
  return out
}

export function cartTotals(cart) {
  const items = cart?.items || []
  const subtotal = items.reduce((sum, it) => sum + Number(it.unitPrice || 0) * Number(it.qty || 1), 0)
  const count = items.reduce((sum, it) => sum + Number(it.qty || 1), 0)

  // note: currency mixing is possible; we’ll lock currency later in cart UI
  return { subtotal, count }
}