// pages/cart.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

import * as CartLib from '../lib/cart'

// ✅ Shared FX helpers (live + lock)
import {
  DEFAULT_FX,
  getFxForDisplay,
  hasFxLock,
  readFxLock,
  writeFxLock,
  clearFxLock as clearFxLockLib,
  fetchLiveFx,
} from '../lib/fx'

// ---------- helpers ----------
const STORAGE_CART_KEY = 'jc_cart_v1'
const STORAGE_CCY_KEY = 'jc_currency_v1'

// ✅ Default display/checkout currency (you requested USD)
const DEFAULT_CURRENCY = 'USD'

function clamp(n, min, max) {
  const x = Number(n)
  if (!Number.isFinite(x)) return min
  return Math.max(min, Math.min(max, x))
}

function safeJsonParse(v, fallback) {
  try {
    return JSON.parse(v)
  } catch {
    return fallback
  }
}

function formatMoney(currency, amount) {
  const n = Number(amount || 0)
  if (currency === 'LKR') return `LKR ${Math.round(n).toLocaleString('en-LK')}`
  return `$${n.toFixed(2)}`
}

function formatMoneySimple(currency, amount) {
  const n = Number(amount || 0)
  if (currency === 'LKR') return `LKR ${Math.round(n).toLocaleString('en-LK')}`
  return `$${n.toFixed(2)}`
}

function readLS(key, fallback = null) {
  if (typeof window === 'undefined') return fallback
  try {
    return window.localStorage.getItem(key)
  } catch {
    return fallback
  }
}

function writeLS(key, value) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, value)
  } catch {}
}

function normCurrency(v) {
  return String(v || '').trim().toUpperCase() === 'USD' ? 'USD' : 'LKR'
}
function normLicense(v) {
  const x = String(v || '').toLowerCase()
  return ['personal', 'commercial', 'editorial'].includes(x) ? x : 'personal'
}
function normFormat(v) {
  const x = String(v || '').toLowerCase()
  return x === 'raw' ? 'raw' : 'jpg'
}

// ✅ FX helpers
// usdLkr = how many LKR for 1 USD
function normalizeRate(v, fallback = DEFAULT_FX) {
  const n = Number(v)
  if (!Number.isFinite(n) || n <= 0) return fallback
  return n
}

function convertAmount(amount, from, to, usdLkr) {
  const n = Number(amount || 0)
  const f = normCurrency(from)
  const t = normCurrency(to)
  const r = normalizeRate(usdLkr, DEFAULT_FX)

  if (f === t) return n
  if (f === 'USD' && t === 'LKR') return n * r
  if (f === 'LKR' && t === 'USD') return n / r
  return n
}

// stable key (must match lib/cart.js logic)
function cartKeyOf(x) {
  const photoId = String(x?.photoId || x?.photo_id || x?.id || x?._id || '')
  const license = normLicense(x?.license || x?._license)
  const format = normFormat(x?.format || x?._format)
  const currency = normCurrency(x?.currency || x?._currency)
  return `${photoId}__${license}__${format}__${currency}`
}

// ---------- fallback cart impl (only used if lib/cart.js functions not found) ----------
function fallbackReadCart() {
  if (typeof window === 'undefined') return { currency: DEFAULT_CURRENCY, items: [] }
  const raw = readLS(STORAGE_CART_KEY, null)
  const cart = safeJsonParse(raw, null)
  if (cart && Array.isArray(cart.items)) return cart
  return {
    currency: readLS(STORAGE_CCY_KEY, DEFAULT_CURRENCY) || DEFAULT_CURRENCY,
    items: [],
  }
}

function fallbackWriteCart(cart) {
  if (typeof window === 'undefined') return
  writeLS(STORAGE_CART_KEY, JSON.stringify(cart))
  writeLS(STORAGE_CCY_KEY, cart.currency || DEFAULT_CURRENCY)
}

// normalize item for UI display (keeps original fields, adds _*)
function normalizeItem(it, forcedCurrency) {
  const src = it || {}

  const photoId = String(src.photoId || src.photo_id || src.id || src._id || '')
  if (!photoId) return null

  const title = src.title || src.name || src._title || 'Untitled'
  const thumb =
    src.thumb_url ||
    src.thumbUrl ||
    src.thumb ||
    src.preview_url ||
    src.previewUrl ||
    src.image ||
    src._thumb ||
    null

  const license = normLicense(src.license || src.usage || src.plan || src.type || src._license)
  const format = normFormat(src.format || src.file || src.ext || src._format)

  // ✅ IMPORTANT: preserve item currency
  const currency = normCurrency(src.currency || src._currency || forcedCurrency)

  const qty = clamp(src.qty ?? src.quantity ?? src._qty ?? 1, 1, 99)

  // unit price can be item.unitPrice OR item.price OR price maps
  const unitPrice = Number(src.unitPrice ?? src.price ?? src._price ?? 0) || 0

  const key = `${photoId}__${license}__${format}__${currency}`

  return {
    ...src,
    photoId,
    title,
    thumbUrl: thumb,
    license,
    format,
    currency,
    unitPrice,
    qty,

    _key: key,
    _photoId: photoId,
    _title: String(title || ''),
    _thumb: thumb,
    _license: license,
    _format: format,
    _currency: currency,
    _qty: qty,
    _price: unitPrice,
  }
}

function getUnitPrice(item, currency) {
  if (Number(item.unitPrice || item._price) > 0) return Number(item.unitPrice || item._price)

  const prices = item.prices || item.PRICES || item.priceMap
  const lic = item.license || item._license
  const fmt = item.format || item._format

  if (prices && prices[currency] && prices[currency][lic] && prices[currency][lic][fmt] != null) {
    return Number(prices[currency][lic][fmt])
  }

  if (currency === 'LKR' && item.lkr) return Number(item.lkr)
  if (currency === 'USD' && item.usd) return Number(item.usd)

  return 0
}

// ---------- adapter to your lib/cart.js (best-effort) ----------
function getCartAdapter() {
  const api = {
    read() {
      try {
        if (typeof CartLib.getCart === 'function') return CartLib.getCart()
        if (typeof CartLib.readCart === 'function') return CartLib.readCart()
        if (typeof CartLib.loadCart === 'function') return CartLib.loadCart()
        if (typeof CartLib.cartGet === 'function') return CartLib.cartGet()
      } catch {}
      return fallbackReadCart()
    },
    write(cart) {
      try {
        if (typeof CartLib.setCart === 'function') return CartLib.setCart(cart)
        if (typeof CartLib.saveCart === 'function') return CartLib.saveCart(cart)
        if (typeof CartLib.writeCart === 'function') return CartLib.writeCart(cart)
        if (typeof CartLib.cartSet === 'function') return CartLib.cartSet(cart)
      } catch {}
      return fallbackWriteCart(cart)
    },
    clear() {
      try {
        if (typeof CartLib.clearCart === 'function') return CartLib.clearCart()
        if (typeof CartLib.cartClear === 'function') return CartLib.cartClear()
      } catch {}
      return fallbackWriteCart({
        currency: readLS(STORAGE_CCY_KEY, DEFAULT_CURRENCY) || DEFAULT_CURRENCY,
        items: [],
      })
    },
  }
  return api
}

// ✅ helper: submit PayHere POST
function submitPayHereForm(action, fields) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = String(action || '')
  form.style.display = 'none'

  for (const [k, v] of Object.entries(fields || {})) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = k
    input.value = String(v ?? '')
    form.appendChild(input)
  }

  document.body.appendChild(form)
  try {
    form.submit()
  } finally {
    try {
      document.body.removeChild(form)
    } catch {}
  }
}

export default function CartPage() {
  const router = useRouter()
  const cartApi = React.useMemo(() => getCartAdapter(), [])
  const [ready, setReady] = React.useState(false)

  // ✅ Display / checkout currency (Option B)
  const [currency, setCurrency] = React.useState(DEFAULT_CURRENCY)
  const [items, setItems] = React.useState([])
  const [note, setNote] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  // ✅ FX state (live + lock at checkout)
  const [fxLiveUsdLkr, setFxLiveUsdLkr] = React.useState(getFxForDisplay())
  const [fxLockedUsdLkr, setFxLockedUsdLkr] = React.useState(readFxLock())
  const fxRateUsdLkr = fxLockedUsdLkr || fxLiveUsdLkr

  // Selector enabled (display/checkout currency)
  const locked = false

  const load = React.useCallback(() => {
    const cart = cartApi.read() || {}
    const rawItems = Array.isArray(cart) ? cart : cart.items
    const ccy = normCurrency(
      (cart && cart.currency) || readLS(STORAGE_CCY_KEY, DEFAULT_CURRENCY) || DEFAULT_CURRENCY
    )

    setCurrency(ccy)
    setItems(
      Array.isArray(rawItems)
        ? rawItems.map((x) => normalizeItem(x, ccy)).filter(Boolean)
        : []
    )
  }, [cartApi])

  React.useEffect(() => {
    setReady(true)
    load()

    if (typeof window === 'undefined') return undefined

    const onStorage = (e) => {
      if (e.key === STORAGE_CART_KEY || e.key === STORAGE_CCY_KEY) load()
    }
    const onCustom = () => load()

    window.addEventListener('storage', onStorage)
    window.addEventListener('jc_cart_updated', onCustom)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('jc_cart_updated', onCustom)
    }
  }, [load])

  // ✅ Live FX refresh every 6 hours (only if NOT locked)
  React.useEffect(() => {
    let alive = true

    // initial sync
    const lockedRate = readFxLock()
    setFxLockedUsdLkr(lockedRate)
    setFxLiveUsdLkr(getFxForDisplay())

    async function refreshNow() {
      try {
        if (!alive) return
        if (hasFxLock()) return // 🔒 keep stable when locked
        const rate = await fetchLiveFx()
        if (!alive) return
        setFxLiveUsdLkr(rate)
      } catch {}
    }

    refreshNow()

    const SIX_HOURS = 6 * 60 * 60 * 1000
    const t = setInterval(refreshNow, SIX_HOURS)

    return () => {
      alive = false
      clearInterval(t)
    }
  }, [])

  function persist(nextItemsRaw, nextCurrency = currency) {
    const ccy = normCurrency(nextCurrency)

    // ✅ Preserve each item's own currency
    const withCurrency = (Array.isArray(nextItemsRaw) ? nextItemsRaw : []).map((x) => ({
      ...x,
      currency: normCurrency(x?.currency || x?._currency || ccy),
    }))

    const cart = { currency: ccy, items: withCurrency }
    cartApi.write(cart)
    writeLS(STORAGE_CCY_KEY, ccy)

    setCurrency(ccy)
    setItems(withCurrency.map((x) => normalizeItem(x, ccy)).filter(Boolean))

    try {
      window.dispatchEvent(new Event('jc_cart_updated'))
    } catch {}
  }

  function removeItemByKey(key) {
    const latest = cartApi.read() || {}
    const rawItems = Array.isArray(latest) ? latest : latest.items
    const arr = Array.isArray(rawItems) ? rawItems : []

    const next = arr.filter((x) => cartKeyOf(x) !== key)
    persist(next, currency)
  }

  function setQtyByKey(key, qty) {
    const latest = cartApi.read() || {}
    const rawItems = Array.isArray(latest) ? latest : latest.items
    const arr = Array.isArray(rawItems) ? rawItems : []

    const nextQty = clamp(qty, 1, 99)
    const next = arr.map((x) => {
      const k = cartKeyOf(x)
      if (k !== key) return x
      return { ...x, qty: nextQty }
    })

    persist(next, currency)
  }

  const currencySet = React.useMemo(() => {
    const set = new Set()
    for (const it of items) set.add(normCurrency(it?._currency || it?.currency || currency))
    return Array.from(set)
  }, [items, currency])

  const isMixedCurrency = currencySet.length > 1

  const computed = React.useMemo(() => {
    const totalsByCurrency = {}
    let subtotalConverted = 0

    for (const it of items) {
      const itemCcy = normCurrency(it?._currency || it?.currency || currency)
      const unit = Number(it.unitPrice || it._price || 0) || getUnitPrice(it, itemCcy)
      const qty = Number(it._qty || it.qty || 1)
      const line = Number(unit || 0) * Number(qty || 1)

      totalsByCurrency[itemCcy] = (totalsByCurrency[itemCcy] || 0) + line

      const convertedLine = convertAmount(line, itemCcy, currency, fxRateUsdLkr)
      subtotalConverted += convertedLine
    }

    return {
      totalsByCurrency,
      subtotalConverted,
      totalConverted: subtotalConverted,
    }
  }, [items, currency, fxRateUsdLkr])

  function onCurrencyChange(next) {
    const ccy = normCurrency(next)
    const latest = cartApi.read() || {}
    const rawItems = Array.isArray(latest) ? latest : latest.items
    persist(Array.isArray(rawItems) ? rawItems : [], ccy)
    setNote('Currency saved.')
    setTimeout(() => setNote(''), 1200)
  }

  function clearFxLock() {
    try {
      clearFxLockLib()
    } catch {}
    setFxLockedUsdLkr(null)
    setNote('Rate unlocked (live rate active).')
    setTimeout(() => setNote(''), 1400)
  }

  async function onCheckout() {
    if (busy) return

    const ccy = normCurrency(currency)

    const normItems = Array.isArray(items)
      ? items.map((x) => normalizeItem(x, ccy)).filter(Boolean)
      : []

    if (normItems.length === 0) {
      setNote('Cart is empty.')
      setTimeout(() => setNote(''), 1600)
      return
    }

    const emailRaw =
      (typeof window !== 'undefined' && window.localStorage.getItem('user_email')) || ''
    const email = String(emailRaw || '').trim().toLowerCase()

    if (!email) {
      setNote('Please login / enter email first (user_email missing).')
      setTimeout(() => setNote(''), 2200)
      return
    }

    // ✅ Lock FX at checkout time (stable totals)
    let lockRate = fxLockedUsdLkr
    if (!lockRate) {
      lockRate = normalizeRate(fxLiveUsdLkr, DEFAULT_FX)
      writeFxLock(lockRate)
      setFxLockedUsdLkr(lockRate)
    }

    setBusy(true)
    setNote('Redirecting to PayHere...')

    try {
      const payloadItems = normItems.map((it) => {
        const itemCcy = normCurrency(it._currency || it.currency || ccy)
        const rawUnit = Number(it.unitPrice || it._price || getUnitPrice(it, itemCcy) || 0)
        const qty = clamp(it._qty || it.qty || 1, 1, 99)

        // convert to checkout currency using locked rate
        const unitPrice = convertAmount(rawUnit, itemCcy, ccy, lockRate)

        return {
          photoId: String(it._photoId || it.photoId || ''),
          title: String(it._title || it.title || ''),
          thumbUrl: String(it.thumbUrl || it._thumb || ''),
          license: normLicense(it._license || it.license),
          format: normFormat(it._format || it.format),

          currency: ccy,
          qty,
          unitPrice,

          originalCurrency: itemCcy,
          originalUnitPrice: rawUnit,
        }
      })

      const r = await fetch('/api/payhere/checkout-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          currency: ccy,
          items: payloadItems,
          usdLkr: lockRate,
          fxLockedAt: Date.now(),
        }),
      })

      const data = await r.json().catch(() => ({}))

      if (!r.ok || !data?.ok) {
        setBusy(false)
        setNote(data?.error || 'Checkout failed')
        setTimeout(() => setNote(''), 2600)
        return
      }

      if (data?.redirectUrl) {
        window.location.href = String(data.redirectUrl)
        return
      }

      if (!data?.action || !data?.fields) {
        setBusy(false)
        setNote('Checkout response missing PayHere fields')
        setTimeout(() => setNote(''), 2600)
        return
      }

      submitPayHereForm(data.action, data.fields)
    } catch (e) {
      setBusy(false)
      setNote(e?.message || 'Checkout error')
      setTimeout(() => setNote(''), 2600)
    }
  }

  return (
    <>
      <Head>
        <title>Cart — Jeevan Chandimal</title>
        <meta
          name="description"
          content="Your cart — review items, adjust quantity and proceed to checkout."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <JeevanChandimalNavi />

      <main className="thq-section-padding">
        <div className="thq-section-max-width">
          <div className="topBar">
            <div>
              <h1 className="thq-heading-2">Cart</h1>
              <p className="thq-body-small sub">
                Review your items, adjust quantities, and proceed to checkout.
              </p>
            </div>

            <div className="ccyBox">
              <div className="ccyLabel">Currency</div>
              <select
                className="ccySelect"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                disabled={locked || busy}
                title="Choose display/checkout currency (totals will convert)"
              >
                <option value="USD">USD</option>
                <option value="LKR">LKR</option>
              </select>

              <div className="fxHint">
                {fxLockedUsdLkr ? (
                  <>
                    <span className="fxBadge">Rate locked</span>{' '}
                    <span className="fxText">1 USD = {Math.round(fxLockedUsdLkr)} LKR</span>
                    <button className="fxLink" type="button" onClick={clearFxLock} disabled={busy}>
                      Unlock
                    </button>
                  </>
                ) : (
                  <>
                    <span className="fxBadge live">Live rate</span>{' '}
                    <span className="fxText">1 USD = {Math.round(fxLiveUsdLkr)} LKR</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {note ? <div className="note">{note}</div> : null}

          {!ready ? null : items.length === 0 ? (
            <div className="emptyCard">
              <div className="emptyTitle">Your cart is empty</div>
              <div className="emptyText">Go to the store and add a photo to get started.</div>
              <div className="emptyActions">
                <Link href="/store" legacyBehavior>
                  <a className="btnPrimary">Browse Store</a>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid">
              <section className="itemsCard">
                <div className="cardTitle">Items</div>

                <div className="list">
                  {items.map((it, idx) => {
                    const key = it._key || cartKeyOf(it) || String(idx)
                    const itemCcy = normCurrency(it._currency || it.currency || currency)
                    const unit = Number(it.unitPrice || it._price || 0) || getUnitPrice(it, itemCcy)
                    const line = unit * Number(it._qty || it.qty || 1)
                    const photoId = it._photoId || it.photoId

                    const convertedLine = convertAmount(line, itemCcy, currency, fxRateUsdLkr)

                    return (
                      <div key={key} className="row">
                        <div className="thumb">
                          {it._thumb ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={it._thumb} alt={it._title} />
                          ) : (
                            <div className="thumbPh" />
                          )}
                        </div>

                        <div className="meta">
                          <div className="title">{it._title}</div>
                          <div className="tags">
                            <span className="pill">{String(it._license).toUpperCase()}</span>
                            <span className="pill">{String(it._format).toUpperCase()}</span>
                            <span className="pill">{String(itemCcy).toUpperCase()}</span>
                          </div>

                          <div className="priceLine">
                            <span className="muted">{formatMoney(itemCcy, unit)} each</span>
                            <span className="dot">•</span>
                            <span className="strong">{formatMoney(itemCcy, line)}</span>
                            {itemCcy !== currency ? (
                              <>
                                <span className="dot">•</span>
                                <span className="muted">
                                  {formatMoney(currency, convertedLine)} ({currency})
                                </span>
                              </>
                            ) : null}
                          </div>

                          <div className="actions">
                            <div className="qty">
                              <button
                                className="qtyBtn"
                                onClick={() => setQtyByKey(key, (it._qty || 1) - 1)}
                                aria-label="Decrease quantity"
                                type="button"
                                disabled={busy}
                              >
                                −
                              </button>
                              <input
                                className="qtyInput"
                                value={it._qty}
                                onChange={(e) => {
                                  const v = String(e.target.value || '').replace(/[^\d]/g, '')
                                  setQtyByKey(key, v ? Number(v) : 1)
                                }}
                                inputMode="numeric"
                                disabled={busy}
                              />
                              <button
                                className="qtyBtn"
                                onClick={() => setQtyByKey(key, (it._qty || 1) + 1)}
                                aria-label="Increase quantity"
                                type="button"
                                disabled={busy}
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="linkDanger"
                              onClick={() => removeItemByKey(key)}
                              type="button"
                              disabled={busy}
                            >
                              Remove
                            </button>

                            <Link href={`/store/${photoId}`} legacyBehavior>
                              <a className="link">View</a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="itemsFooter">
                  <button
                    className="btnGhost"
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      cartApi.clear()
                      load()
                      try {
                        window.dispatchEvent(new Event('jc_cart_updated'))
                      } catch {}
                    }}
                  >
                    Clear cart
                  </button>

                  <Link href="/store" legacyBehavior>
                    <a className="btnGhost">Continue shopping</a>
                  </Link>
                </div>
              </section>

              <aside className="summaryCard">
                <div className="cardTitle">Summary</div>

                {isMixedCurrency ? (
                  <div className="mixWarn">
                    <div className="mixTitle">Mixed currencies</div>
                    <div className="mixText">
                      Totals below are converted into <strong>{currency}</strong> using{' '}
                      {fxLockedUsdLkr ? 'locked' : 'live'} rate.
                    </div>
                    <div className="mixList">
                      {Object.keys(computed.totalsByCurrency).map((cur) => (
                        <div key={cur} className="mixLine">
                          <span className="muted">{cur}</span>
                          <span className="strong">
                            {formatMoneySimple(cur, computed.totalsByCurrency[cur])}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="sumRow">
                  <span className="muted">Subtotal</span>
                  <span className="strong">{formatMoney(currency, computed.subtotalConverted)}</span>
                </div>

                <div className="sumRow">
                  <span className="muted">Total</span>
                  <span className="strong">{formatMoney(currency, computed.totalConverted)}</span>
                </div>

                <div className="divider" />

                <button
                  className="btnPrimary full"
                  onClick={onCheckout}
                  type="button"
                  disabled={busy}
                >
                  {busy ? 'Please wait…' : fxLockedUsdLkr ? 'Checkout (rate locked)' : 'Checkout'}
                </button>

                <div className="smallNote">
                  Checkout will create a single order for multiple items.
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .topBar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }
        .sub {
          opacity: 0.85;
          margin-top: 6px;
        }

        .note {
          margin: 10px 0 16px;
          padding: 10px 12px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(34, 34, 34, 0.55);
          border-radius: 12px;
          font-size: 13px;
          opacity: 0.95;
        }

        .ccyBox {
          display: grid;
          gap: 6px;
          justify-items: end;
        }
        .ccyLabel {
          font-size: 12px;
          opacity: 0.8;
        }
        .ccySelect {
          min-width: 110px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(0, 0, 0, 0.35);
          color: #fff;
          outline: none;
        }
        .ccySelect:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .fxHint {
          font-size: 11px;
          opacity: 0.9;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-content: flex-end;
          flex-wrap: wrap;
        }
        .fxBadge {
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.12);
          font-weight: 800;
          letter-spacing: 0.3px;
          font-size: 10px;
          text-transform: uppercase;
        }
        .fxBadge.live {
          border-color: rgba(245, 244, 244, 0.2);
          background: rgba(255, 255, 255, 0.06);
        }
        .fxText {
          opacity: 0.9;
        }
        .fxLink {
          border: none;
          background: transparent;
          color: #fff;
          text-decoration: underline;
          opacity: 0.8;
          cursor: pointer;
          padding: 0;
          font-size: 11px;
        }
        .fxLink:hover {
          opacity: 1;
        }
        .fxLink:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .emptyCard {
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(34, 34, 34, 0.55);
          border-radius: 18px;
          padding: 22px;
          text-align: center;
        }
        .emptyTitle {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .emptyText {
          opacity: 0.85;
          margin-bottom: 14px;
        }
        .emptyActions {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 14px;
        }
        @media (max-width: 960px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .ccyBox {
            justify-items: start;
          }
          .topBar {
            flex-direction: column;
          }
          .fxHint {
            justify-content: flex-start;
          }
        }

        .itemsCard,
        .summaryCard {
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(34, 34, 34, 0.55);
          border-radius: 18px;
          padding: 16px;
          backdrop-filter: blur(10px);
        }

        .cardTitle {
          font-weight: 700;
          margin-bottom: 12px;
          opacity: 0.95;
        }

        .list {
          display: grid;
          gap: 12px;
        }

        .row {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 12px;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
        }

        .thumb {
          width: 90px;
          height: 66px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.04);
        }
        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .thumbPh {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.05);
        }

        .meta {
          min-width: 0;
        }
        .title {
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 8px;
        }
        .pill {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.05);
          opacity: 0.95;
        }

        .priceLine {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
        }
        .muted {
          opacity: 0.8;
          font-size: 12px;
        }
        .strong {
          font-weight: 800;
          font-size: 13px;
        }
        .dot {
          opacity: 0.5;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .qty {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(0, 0, 0, 0.28);
          overflow: hidden;
        }
        .qtyBtn {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
          font-size: 16px;
        }
        .qtyBtn:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        .qtyBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .qtyInput {
          width: 44px;
          height: 34px;
          border: none;
          outline: none;
          text-align: center;
          background: transparent;
          color: #fff;
          font-size: 13px;
        }

        .link,
        .linkDanger {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          font-size: 13px;
          text-decoration: underline;
          opacity: 0.9;
          color: #fff;
        }
        .linkDanger:hover {
          opacity: 1;
        }
        .linkDanger:disabled,
        .link:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .itemsFooter {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: space-between;
          margin-top: 12px;
        }

        .btnPrimary,
        .btnGhost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 14px;
          font-weight: 700;
          text-decoration: none;
          border: 1px solid rgba(245, 244, 244, 0.16);
          cursor: pointer;
          color: inherit;
        }
        .btnPrimary {
          background: rgba(0, 120, 255, 0.22);
        }
        .btnPrimary:hover {
          background: rgba(0, 120, 255, 0.28);
        }
        .btnPrimary:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .btnGhost {
          background: rgba(0, 0, 0, 0.2);
        }
        .btnGhost:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        .btnGhost:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .full {
          width: 100%;
        }

        .sumRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          gap: 10px;
        }

        .mixWarn {
          margin: 10px 0 4px;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255, 180, 0, 0.28);
          background: rgba(255, 180, 0, 0.06);
        }
        .mixTitle {
          font-weight: 800;
          font-size: 13px;
          margin-bottom: 4px;
        }
        .mixText {
          font-size: 12px;
          opacity: 0.85;
        }
        .mixList {
          margin-top: 10px;
          display: grid;
          gap: 6px;
        }
        .mixLine {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: baseline;
        }

        .divider {
          height: 1px;
          background: rgba(245, 244, 244, 0.12);
          margin: 10px 0 12px;
        }
        .smallNote {
          margin-top: 10px;
          font-size: 12px;
          opacity: 0.75;
        }
      `}</style>
    </>
  )
}