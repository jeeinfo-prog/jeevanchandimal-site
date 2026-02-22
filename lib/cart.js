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
 * Cart item shape (per photo + license + format + currency)
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

function itemKey(x) {
  return `${x.photoId}__${x.license}__${x.format}__${x.currency}`
}

function normalizeItem(item) {
  if (!item?.photoId) return null

  const license = ['personal', 'commercial', 'editorial'].includes(item.license)
    ? item.license
    : 'personal'

  const format = item.format === 'raw' ? 'raw' : 'jpg'
  const currency = item.currency === 'USD' ? 'USD' : 'LKR'

  return {
    photoId: String(item.photoId),
    title: String(item.title || ''),
    thumbUrl: String(item.thumbUrl || ''),
    license,
    format,
    currency,
    unitPrice: Number(item.unitPrice || 0),
    qty: Math.max(1, Number(item.qty || 1)),
  }
}

export function addToCart(item) {
  const cart = readCart()
  const items = cart.items || []

  const normalized = normalizeItem(item)
  if (!normalized) return cart

  const key = itemKey(normalized)
  const idx = items.findIndex((x) => itemKey(x) === key)

  if (idx >= 0) {
    const next = [...items]
    next[idx] = { ...next[idx], qty: Number(next[idx].qty || 1) + normalized.qty }
    const out = { items: next }
    writeCart(out)
    return out
  }

  const out = { items: [...items, normalized] }
  writeCart(out)
  return out
}

export function removeFromCart({ photoId, license, format, currency }) {
  const cart = readCart()
  const items = cart.items || []

  const key = itemKey({
    photoId: String(photoId || ''),
    license: license || 'personal',
    format: format === 'raw' ? 'raw' : 'jpg',
    currency: currency === 'USD' ? 'USD' : 'LKR',
  })

  const out = { items: items.filter((x) => itemKey(x) !== key) }
  writeCart(out)
  return out
}

export function setQty({ photoId, license, format, currency, qty }) {
  const cart = readCart()
  const items = cart.items || []

  const key = itemKey({
    photoId: String(photoId || ''),
    license: license || 'personal',
    format: format === 'raw' ? 'raw' : 'jpg',
    currency: currency === 'USD' ? 'USD' : 'LKR',
  })

  const next = items
    .map((x) => {
      if (itemKey(x) !== key) return x
      return { ...x, qty: Math.max(1, Number(qty || 1)) }
    })
    .filter(Boolean)

  const out = { items: next }
  writeCart(out)
  return out
}

export function cartTotals(cart) {
  const items = cart?.items || []
  const subtotal = items.reduce(
    (sum, it) => sum + Number(it.unitPrice || 0) * Number(it.qty || 1),
    0
  )
  const count = items.reduce((sum, it) => sum + Number(it.qty || 1), 0)
  return { subtotal, count }
}

export function cartCount() {
  return cartTotals(readCart()).count
}