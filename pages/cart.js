// pages/cart.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

import * as CartLib from '../lib/cart'

// ---------- helpers ----------
const STORAGE_CART_KEY = 'jc_cart_v1'
const STORAGE_CCY_KEY = 'jc_currency_v1'

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

// ---------- fallback cart impl (only used if lib/cart.js functions not found) ----------
function fallbackReadCart() {
  if (typeof window === 'undefined') return { currency: 'LKR', items: [] }
  const raw = readLS(STORAGE_CART_KEY, null)
  const cart = safeJsonParse(raw, null)
  if (cart && Array.isArray(cart.items)) {
    const ccy = cart.currency === 'USD' ? 'USD' : 'LKR'
    return { currency: ccy, items: cart.items }
  }
  return { currency: readLS(STORAGE_CCY_KEY, 'LKR') || 'LKR', items: [] }
}

function fallbackWriteCart(cart) {
  if (typeof window === 'undefined') return
  const ccy = cart?.currency === 'USD' ? 'USD' : 'LKR'
  const items = Array.isArray(cart?.items) ? cart.items : []
  writeLS(STORAGE_CART_KEY, JSON.stringify({ currency: ccy, items }))
  writeLS(STORAGE_CCY_KEY, ccy)
}

function normalizeItem(it, fallbackCurrency = 'LKR') {
  const src = it || {}

  // Supports multiple shapes from different implementations
  const id = src.photoId || src.photo_id || src.id || src._id || null
  const title = src.title || src.name || src._title || 'Untitled'
  const thumb =
    src.thumbUrl ||
    src.thumb_url ||
    src.thumb ||
    src.previewUrl ||
    src.preview_url ||
    src.image ||
    src._thumb ||
    null

  const license = src.license || src.usage || src.plan || src.type || src._license || 'personal'
  const format = src.format || src.file || src.ext || src._format || 'jpg'

  const qty = clamp(src.qty ?? src.quantity ?? src._qty ?? 1, 1, 99)

  // price can be item.price OR item.prices[currency][license][format]
  const price = Number(src.unitPrice ?? src.price ?? src._price ?? 0) || 0

  // ✅ normalize currency per item (important for checkout payload)
  const currency = src.currency === 'USD' ? 'USD' : fallbackCurrency === 'USD' ? 'USD' : 'LKR'

  return {
    ...src,
    _id: id ? String(id) : null,
    _title: String(title || 'Untitled'),
    _thumb: thumb ? String(thumb) : null,
    _license: String(license || 'personal').toLowerCase(),
    _format: String(format || 'jpg').toLowerCase() === 'raw' ? 'raw' : 'jpg',
    _qty: qty,
    _price: price,
    _currency: currency,
  }
}

function getUnitPrice(item, currency) {
  if (Number(item._price) > 0) return Number(item._price)

  const prices = item.prices || item.PRICES || item.priceMap
  if (
    prices &&
    prices[currency] &&
    prices[currency][item._license] &&
    prices[currency][item._license][item._format] != null
  ) {
    return Number(prices[currency][item._license][item._format])
  }

  // last resort: if item has { lkr, usd } etc
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
        currency: readLS(STORAGE_CCY_KEY, 'LKR') || 'LKR',
        items: [],
      })
    },
  }
  return api
}

export default function CartPage() {
  const router = useRouter()
  const cartApi = React.useMemo(() => getCartAdapter(), [])
  const [ready, setReady] = React.useState(false)

  const [currency, setCurrency] = React.useState('LKR')
  const [items, setItems] = React.useState([])
  const [note, setNote] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  const locked = items.length > 0

  const load = React.useCallback(() => {
    const cart = cartApi.read() || {}

    const rawItems = Array.isArray(cart) ? cart : cart.items
    const ccy = (cart && cart.currency) || readLS(STORAGE_CCY_KEY, 'LKR') || 'LKR'
    const normalizedCcy = ccy === 'USD' ? 'USD' : 'LKR'

    setCurrency(normalizedCcy)
    setItems(Array.isArray(rawItems) ? rawItems.map((x) => normalizeItem(x, normalizedCcy)).filter(Boolean) : [])
  }, [cartApi])

  React.useEffect(() => {
    setReady(true)
    load()

    if (typeof window === 'undefined') return undefined

    // cross-tab sync
    const onStorage = (e) => {
      if (e.key === STORAGE_CART_KEY || e.key === STORAGE_CCY_KEY) load()
    }

    // same-tab updates from AddToCartButton
    const onCustom = () => load()

    window.addEventListener('storage', onStorage)
    window.addEventListener('jc_cart_updated', onCustom)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('jc_cart_updated', onCustom)
    }
  }, [load])

  function persist(nextItems, nextCurrency = currency) {
    const ccy = nextCurrency === 'USD' ? 'USD' : 'LKR'
    const cleaned = Array.isArray(nextItems)
      ? nextItems.map((x) => normalizeItem(x, ccy)).filter(Boolean)
      : []

    const cart = { currency: ccy, items: cleaned }
    cartApi.write(cart)

    // keep separate currency key for legacy readers
    writeLS(STORAGE_CCY_KEY, ccy)

    setItems(cleaned)
    setCurrency(ccy)

    // tell navbar etc (same-tab)
    try {
      window.dispatchEvent(new Event('jc_cart_updated'))
    } catch {}
  }

  function removeItem(photoId) {
    const next = items.filter((x) => (x._id || x.id || x.photoId) !== photoId)
    persist(next)
  }

  function setQty(photoId, qty) {
    const nextQty = clamp(qty, 1, 99)
    const next = items.map((x) => {
      const id = x._id || x.id || x.photoId
      if (id !== photoId) return x
      return { ...x, qty: nextQty, _qty: nextQty }
    })
    persist(next)
  }

  const computed = React.useMemo(() => {
    const norm = items.map((x) => normalizeItem(x, currency)).filter(Boolean)
    let subtotal = 0
    for (const it of norm) {
      const unit = getUnitPrice(it, currency)
      subtotal += unit * it._qty
    }
    return { subtotal, total: subtotal }
  }, [items, currency])

  function onCurrencyChange(next) {
    if (locked) return
    const ccy = next === 'USD' ? 'USD' : 'LKR'
    persist(items, ccy)
    setNote('Currency saved.')
    setTimeout(() => setNote(''), 1200)
  }

  async function onCheckout() {
  if (busy) return

  // ✅ read the latest cart at click-time (source of truth)
  const latest = cartApi.read() || {}
  const rawItems = Array.isArray(latest) ? latest : latest.items
  const ccy = (latest && latest.currency) || readLS(STORAGE_CCY_KEY, currency) || currency
  const useCurrency = ccy === 'USD' ? 'USD' : 'LKR'

  const normItems = Array.isArray(rawItems)
    ? rawItems.map((x) => normalizeItem(x, useCurrency)).filter(Boolean)
    : []

  if (normItems.length === 0) {
    setNote('Cart is empty.')
    setTimeout(() => setNote(''), 1600)
    return
  }

  // ✅ email (same place your navbar uses)
  const emailRaw =
    (typeof window !== 'undefined' && window.localStorage.getItem('user_email')) || ''
  const email = String(emailRaw || '').trim().toLowerCase()

  if (!email) {
    setNote('Please login / enter email first (user_email missing).')
    setTimeout(() => setNote(''), 2200)
    return
  }

  setBusy(true)
  setNote('Redirecting to PayHere...')

  try {
    // ✅ build payload exactly what checkout-cart.js expects
    const payloadItems = normItems.map((it) => {
      const unitPrice = Number(it.unitPrice || it._price || getUnitPrice(it, useCurrency) || 0)

      return {
        photoId: String(it.photoId || it._id || ''),
        title: String(it.title || it._title || ''),
        thumbUrl: String(it.thumbUrl || it._thumb || ''),
        license: String(it.license || it._license || 'personal').toLowerCase(),
        format: String(it.format || it._format || 'jpg').toLowerCase() === 'raw' ? 'raw' : 'jpg',
        currency: useCurrency,
        qty: clamp(it.qty || it._qty || 1, 1, 99),
        unitPrice,
      }
    })

    const r = await fetch('/api/payhere/checkout-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        currency: useCurrency,
        items: payloadItems,
      }),
    })

    const data = await r.json().catch(() => ({}))

    if (!r.ok || !data?.ok || !data?.redirectUrl) {
      setNote(data?.error || 'Checkout failed')
      setTimeout(() => setNote(''), 2600)
      setBusy(false)
      return
    }

    window.location.href = data.redirectUrl
  } catch (e) {
    setNote(e?.message || 'Checkout error')
    setTimeout(() => setNote(''), 2600)
    setBusy(false)
  }
}

    // ✅ email used same style as single checkout / membership
    const emailRaw =
      (typeof window !== 'undefined' && window.localStorage.getItem('user_email')) || ''
    const email = String(emailRaw || '').trim().toLowerCase()

    if (!email) {
      setNote('Please login / enter email first (user_email missing).')
      setTimeout(() => setNote(''), 2200)
      return
    }

    setBusy(true)
    setNote('Redirecting to PayHere...')

    try {
      const payloadItems = normItems.map((it) => {
        const photoId = it._id
        const title = it._title
        const thumbUrl = it._thumb
        const license = (it._license || 'personal').toLowerCase()
        const format = it._format === 'raw' ? 'raw' : 'jpg'
        const qty = clamp(it._qty, 1, 99)
        const unitPrice = Number(getUnitPrice(it, currency) || 0)

        return {
          photoId,
          title,
          thumbUrl,
          license,
          format,
          currency,
          qty,
          unitPrice,
        }
      })

      const r = await fetch('/api/payhere/checkout-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          currency,
          items: payloadItems,
        }),
      })

      const data = await r.json().catch(() => ({}))
      if (!r.ok || !data?.ok || !data?.redirectUrl) {
        const msg = data?.error || 'Checkout failed'
        setNote(msg)
        setTimeout(() => setNote(''), 2400)
        setBusy(false)
        return
      }

      // ✅ Go to PayHere checkout
      window.location.href = data.redirectUrl
    } catch (e) {
      setNote(e?.message || 'Checkout error')
      setTimeout(() => setNote(''), 2400)
      setBusy(false)
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
                title={locked ? 'Currency is locked once items are in cart.' : 'Choose currency'}
              >
                <option value="LKR">LKR</option>
                <option value="USD">USD</option>
              </select>
              {locked && <div className="ccyHint">Locked</div>}
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
                  {items.map((raw, idx) => {
                    const it = normalizeItem(raw, currency)
                    if (!it) return null

                    const id = it._id || `${idx}`
                    const unit = getUnitPrice(it, currency)
                    const line = unit * it._qty

                    return (
                      <div key={id} className="row">
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
                          </div>

                          <div className="priceLine">
                            <span className="muted">{formatMoney(currency, unit)} each</span>
                            <span className="dot">•</span>
                            <span className="strong">{formatMoney(currency, line)}</span>
                          </div>

                          <div className="actions">
                            <div className="qty">
                              <button
                                className="qtyBtn"
                                onClick={() => setQty(id, it._qty - 1)}
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
                                  setQty(id, v ? Number(v) : 1)
                                }}
                                inputMode="numeric"
                                disabled={busy}
                              />
                              <button
                                className="qtyBtn"
                                onClick={() => setQty(id, it._qty + 1)}
                                aria-label="Increase quantity"
                                type="button"
                                disabled={busy}
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="linkDanger"
                              onClick={() => removeItem(id)}
                              type="button"
                              disabled={busy}
                            >
                              Remove
                            </button>

                            {/* IMPORTANT: store page expects /store/<photoId> not per-item key */}
                            <Link href={`/store/${encodeURIComponent(String(it._id))}`} legacyBehavior>
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

                <div className="sumRow">
                  <span className="muted">Subtotal</span>
                  <span className="strong">{formatMoney(currency, computed.subtotal)}</span>
                </div>

                <div className="sumRow">
                  <span className="muted">Total</span>
                  <span className="strong">{formatMoney(currency, computed.total)}</span>
                </div>

                <div className="divider" />

                <button className="btnPrimary full" onClick={onCheckout} type="button" disabled={busy}>
                  {busy ? 'Redirecting…' : 'Checkout'}
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
        .ccyHint {
          font-size: 11px;
          opacity: 0.7;
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
          opacity: 0.55;
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
        .qtyInput:disabled {
          opacity: 0.55;
          cursor: not-allowed;
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
        .linkDanger:disabled {
          opacity: 0.55;
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