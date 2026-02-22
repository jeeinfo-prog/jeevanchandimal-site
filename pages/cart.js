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

// ---------- fallback cart impl (only used if lib/cart.js functions not found) ----------
function fallbackReadCart() {
  if (typeof window === 'undefined') return { currency: 'LKR', items: [] }
  const raw = localStorage.getItem(STORAGE_CART_KEY)
  const cart = safeJsonParse(raw, null)
  if (cart && Array.isArray(cart.items)) return cart
  return { currency: localStorage.getItem(STORAGE_CCY_KEY) || 'LKR', items: [] }
}

function fallbackWriteCart(cart) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart))
  localStorage.setItem(STORAGE_CCY_KEY, cart.currency || 'LKR')
}

function normalizeItem(it) {
  // Supports multiple shapes from different implementations
  const id = it.id || it.photoId || it.photo_id
  const title = it.title || it.name || 'Untitled'
  const thumb =
    it.thumb_url || it.thumbUrl || it.thumb || it.preview_url || it.previewUrl || it.image || null

  const license = it.license || it.usage || it.plan || it.type || 'personal'
  const format = it.format || it.file || it.ext || 'jpg'

  const qty = clamp(it.qty ?? it.quantity ?? 1, 1, 99)

  // price can be item.price OR item.prices[currency][license][format]
  const price = Number(it.price || 0)

  return { ...it, _id: id, _title: title, _thumb: thumb, _license: license, _format: format, _qty: qty, _price: price }
}

function getUnitPrice(item, currency) {
  if (Number(item._price) > 0) return Number(item._price)

  const prices = item.prices || item.PRICES || item.priceMap
  if (prices && prices[currency] && prices[currency][item._license] && prices[currency][item._license][item._format]) {
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
      // Try common names
      if (typeof CartLib.getCart === 'function') return CartLib.getCart()
      if (typeof CartLib.readCart === 'function') return CartLib.readCart()
      if (typeof CartLib.loadCart === 'function') return CartLib.loadCart()
      if (typeof CartLib.cartGet === 'function') return CartLib.cartGet()
      return fallbackReadCart()
    },
    write(cart) {
      if (typeof CartLib.setCart === 'function') return CartLib.setCart(cart)
      if (typeof CartLib.saveCart === 'function') return CartLib.saveCart(cart)
      if (typeof CartLib.writeCart === 'function') return CartLib.writeCart(cart)
      if (typeof CartLib.cartSet === 'function') return CartLib.cartSet(cart)
      return fallbackWriteCart(cart)
    },
    clear() {
      if (typeof CartLib.clearCart === 'function') return CartLib.clearCart()
      if (typeof CartLib.cartClear === 'function') return CartLib.cartClear()
      return fallbackWriteCart({ currency: localStorage.getItem(STORAGE_CCY_KEY) || 'LKR', items: [] })
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

  const locked = items.length > 0

  const load = React.useCallback(() => {
    const cart = cartApi.read() || { currency: 'LKR', items: [] }
    const ccy = cart.currency || (typeof window !== 'undefined' ? localStorage.getItem(STORAGE_CCY_KEY) : null) || 'LKR'
    setCurrency(ccy)
    setItems(Array.isArray(cart.items) ? cart.items.map(normalizeItem) : [])
  }, [cartApi])

  React.useEffect(() => {
    setReady(true)
    load()
    // cross-tab sync
    const onStorage = (e) => {
      if (e.key === STORAGE_CART_KEY || e.key === STORAGE_CCY_KEY) load()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [load])

  function persist(nextItems, nextCurrency = currency) {
    const cart = { currency: nextCurrency, items: nextItems }
    cartApi.write(cart)
    setItems(nextItems.map(normalizeItem))
    setCurrency(nextCurrency)
  }

  function removeItem(photoId) {
    const next = items.filter((x) => (x._id || x.id || x.photoId) !== photoId)
    persist(next)
  }

  function setQty(photoId, qty) {
    const next = items.map((x) => {
      const id = x._id || x.id || x.photoId
      if (id !== photoId) return x
      return { ...x, qty: clamp(qty, 1, 99), _qty: clamp(qty, 1, 99) }
    })
    persist(next)
  }

  const computed = React.useMemo(() => {
    const norm = items.map(normalizeItem)
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
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_CCY_KEY, ccy)
    setNote('Currency saved.')
    setTimeout(() => setNote(''), 1200)
  }

  function onCheckout() {
    // Step 2 will wire this into PayHere multi-item checkout.
    setNote('Next step: connect this button to PayHere checkout (multi-item).')
    setTimeout(() => setNote(''), 1800)
  }

  return (
    <>
      <Head>
        <title>Cart — Jeevan Chandimal</title>
        <meta name="description" content="Your cart — review items, adjust quantity and proceed to checkout." />
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
                disabled={locked}
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
                <Link href="/store" className="btnPrimary">
                  Browse Store
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid">
              <section className="itemsCard">
                <div className="cardTitle">Items</div>

                <div className="list">
                  {items.map((raw) => {
                    const it = normalizeItem(raw)
                    const id = it._id
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
                              >
                                −
                              </button>
                              <input
                                className="qtyInput"
                                value={it._qty}
                                onChange={(e) => setQty(id, e.target.value)}
                                inputMode="numeric"
                              />
                              <button
                                className="qtyBtn"
                                onClick={() => setQty(id, it._qty + 1)}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <button className="linkDanger" onClick={() => removeItem(id)}>
                              Remove
                            </button>

                            <Link className="link" href={`/store/${id}`}>
                              View
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
                    onClick={() => {
                      cartApi.clear()
                      load()
                    }}
                  >
                    Clear cart
                  </button>

                  <Link href="/store" className="btnGhost">
                    Continue shopping
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

                <button className="btnPrimary full" onClick={onCheckout}>
                  Checkout
                </button>

                <div className="smallNote">
                  Checkout will create a single order for multiple items (next step).
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
        .linkDanger {
          opacity: 0.9;
        }
        .linkDanger:hover {
          opacity: 1;
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
        }
        .btnPrimary {
          background: rgba(0, 120, 255, 0.22);
        }
        .btnPrimary:hover {
          background: rgba(0, 120, 255, 0.28);
        }
        .btnGhost {
          background: rgba(0, 0, 0, 0.2);
        }
        .btnGhost:hover {
          background: rgba(255, 255, 255, 0.06);
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