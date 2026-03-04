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

function normCurrency(v) {
  return v === 'USD' ? 'USD' : 'LKR'
}

export function readCart() {
  if (typeof window === 'undefined') return { currency: 'LKR', items: [] }
  const raw = window.localStorage.getItem(CART_KEY)
  const cart = safeParse(raw, { currency: 'LKR', items: [] })
  const items = Array.isArray(cart?.items) ? cart.items : []
  const currency = normCurrency(cart?.currency)
  return { currency, items }
}

export function writeCart(cart) {
  if (typeof window === 'undefined') return
  try {
    const currency = normCurrency(cart?.currency)
    const items = Array.isArray(cart?.items) ? cart.items : []
    window.localStorage.setItem(CART_KEY, JSON.stringify({ currency, items }))
  } catch {
    // ignore quota / privacy mode errors
  }
}

export function clearCart() {
  writeCart({ currency: readCart().currency || 'LKR', items: [] })
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

function normalizeItem(item, fallbackCurrency = 'LKR') {
  if (!item?.photoId) return null

  const license = ['personal', 'commercial', 'editorial'].includes(item.license)
    ? item.license
    : 'personal'

  const format = item.format === 'raw' ? 'raw' : 'jpg'
  const currency = normCurrency(item.currency || fallbackCurrency)

  const unitPriceNum = Number(item.unitPrice || 0)
  const unitPrice = Number.isFinite(unitPriceNum) ? unitPriceNum : 0

  const qtyNum = Number(item.qty || 1)
  const qty = Number.isFinite(qtyNum) ? Math.max(1, Math.min(99, qtyNum)) : 1

  return {
    photoId: String(item.photoId),
    title: String(item.title || ''),
    thumbUrl: String(item.thumbUrl || ''),
    license,
    format,
    currency,
    unitPrice,
    qty,
  }
}

export function addToCart(item) {
  const cart = readCart()
  const currency = normCurrency(item?.currency || cart.currency || 'LKR')

  // normalize existing items (protect older/partial shapes)
  const items = (cart.items || [])
    .map((x) => normalizeItem(x, currency))
    .filter(Boolean)

  const normalized = normalizeItem(item, currency)
  if (!normalized) return { currency, items }

  const key = itemKey(normalized)
  const idx = items.findIndex((x) => itemKey(x) === key)

  if (idx >= 0) {
    const next = [...items]
    const curQty = Number(next[idx].qty || 1)
    next[idx] = { ...next[idx], qty: Math.min(99, curQty + normalized.qty) }
    const out = { currency, items: next }
    writeCart(out)
    return out
  }

  const out = { currency, items: [...items, normalized] }
  writeCart(out)
  return out
}

export function removeFromCart({ photoId, license, format, currency }) {
  const cart = readCart()
  const ccy = normCurrency(currency || cart.currency || 'LKR')

  const items = (cart.items || [])
    .map((x) => normalizeItem(x, ccy))
    .filter(Boolean)

  const key = itemKey({
    photoId: String(photoId || ''),
    license: ['personal', 'commercial', 'editorial'].includes(license) ? license : 'personal',
    format: format === 'raw' ? 'raw' : 'jpg',
    currency: ccy,
  })

  const out = { currency: ccy, items: items.filter((x) => itemKey(x) !== key) }
  writeCart(out)
  return out
}

export function setQty({ photoId, license, format, currency, qty }) {
  const cart = readCart()
  const ccy = normCurrency(currency || cart.currency || 'LKR')

  const items = (cart.items || [])
    .map((x) => normalizeItem(x, ccy))
    .filter(Boolean)

  const key = itemKey({
    photoId: String(photoId || ''),
    license: ['personal', 'commercial', 'editorial'].includes(license) ? license : 'personal',
    format: format === 'raw' ? 'raw' : 'jpg',
    currency: ccy,
  })

  const next = items.map((x) => {
    if (itemKey(x) !== key) return x
    const q = Number(qty || 1)
    const safeQty = Number.isFinite(q) ? Math.max(1, Math.min(99, q)) : 1
    return { ...x, qty: safeQty }
  })

  const out = { currency: ccy, items: next }
  writeCart(out)
  return out
}

export function cartTotals(cart) {
  const items = cart?.items || []
  const subtotal = items.reduce((sum, it) => sum + Number(it.unitPrice || 0) * Number(it.qty || 1), 0)
  const count = items.reduce((sum, it) => sum + Number(it.qty || 1), 0)
  return { subtotal, count }
}

export function cartCount() {
  return cartTotals(readCart()).count
}

// ---------------- compatibility exports ----------------

export function getCart() {
  return readCart()
}

export function loadCart() {
  return readCart()
}

export function cartGet() {
  return readCart()
}

export function setCart(cart) {
  writeCart(cart)
  return cart
}

export function saveCart(cart) {
  writeCart(cart)
  return cart
}

export function cartSet(cart) {
  writeCart(cart)
  return cart
}

export function cartClear() {
  clearCart()
  return { currency: readCart().currency || 'LKR', items: [] }
}