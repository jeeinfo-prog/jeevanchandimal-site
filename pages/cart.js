// pages/cart.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

import { readCart, setQty, removeFromCart, clearCart, cartTotals } from '@/lib/cart'

function money(currency, amount) {
  const n = Number(amount || 0)
  if (currency === 'LKR') return `LKR ${n.toLocaleString('en-LK')}`
  if (currency === 'USD') return `$${n}`
  return `${currency || ''} ${n}`
}

export default function CartPage() {
  const [cart, setCart] = React.useState({ items: [] })
  const [loading, setLoading] = React.useState(true)

  // load cart once
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    setCart(readCart())
    setLoading(false)

    // keep in sync across tabs
    const onStorage = (e) => {
      if (e.key && e.key.includes('jc_cart')) setCart(readCart())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const totals = React.useMemo(() => cartTotals(cart), [cart])

  function onMinus(it) {
    setQty({
      photoId: it.photoId,
      license: it.license,
      format: it.format,
      currency: it.currency,
      qty: Math.max(1, Number(it.qty || 1) - 1),
    })
    setCart(readCart())
  }

  function onPlus(it) {
    setQty({
      photoId: it.photoId,
      license: it.license,
      format: it.format,
      currency: it.currency,
      qty: Number(it.qty || 1) + 1,
    })
    setCart(readCart())
  }

  function onRemove(it) {
    removeFromCart({
      photoId: it.photoId,
      license: it.license,
      format: it.format,
      currency: it.currency,
    })
    setCart(readCart())
  }

  function onClear() {
    if (!confirm('Clear cart?')) return
    clearCart()
    setCart(readCart())
  }

  // NOTE: next step we wire this to PayHere multi-item checkout
  function onCheckout() {
    alert('Next step: connect cart → PayHere checkout')
  }

  return (
    <>
      <Head>
        <title>Cart | Jeevan Chandimal</title>
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="top">
          <h1 className="h1">Cart</h1>

          <div className="actions">
            <Link href="/store">
              <a className="ghostBtn">← Continue shopping</a>
            </Link>

            <button className="ghostBtn" onClick={onClear} disabled={!cart?.items?.length}>
              Clear cart
            </button>
          </div>
        </div>

        {loading && <div className="empty">Loading…</div>}

        {!loading && (!cart?.items || cart.items.length === 0) && (
          <div className="empty">
            Your cart is empty. <Link href="/store">Go to Store →</Link>
          </div>
        )}

        {!loading && cart?.items?.length > 0 && (
          <>
            <div className="list">
              {cart.items.map((it) => {
                const title = it.title || 'Photo'
                const thumb = it.thumbUrl || '/placeholder.png'
                return (
                  <div key={`${it.photoId}_${it.license}_${it.format}_${it.currency}`} className="row">
                    <div className="left">
                      <div className="thumb">
                        <img src={thumb} alt={title} />
                      </div>

                      <div className="meta">
                        <div className="title">{title}</div>
                        <div className="chips">
                          <span className="chip">{String(it.license || '').toUpperCase()}</span>
                          <span className="chip">{String(it.format || '').toUpperCase()}</span>
                          <span className="chip">{String(it.currency || '').toUpperCase()}</span>
                        </div>
                        <div className="priceLine">
                          Unit: <b>{money(it.currency, it.unitPrice)}</b>
                        </div>
                      </div>
                    </div>

                    <div className="right">
                      <div className="qty">
                        <button className="qtyBtn" onClick={() => onMinus(it)} aria-label="Decrease">
                          −
                        </button>
                        <span className="qtyNum">{Number(it.qty || 1)}</span>
                        <button className="qtyBtn" onClick={() => onPlus(it)} aria-label="Increase">
                          +
                        </button>
                      </div>

                      <div className="lineTotal">
                        {money(it.currency, Number(it.unitPrice || 0) * Number(it.qty || 1))}
                      </div>

                      <button className="remove" onClick={() => onRemove(it)}>
                        Remove
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="summary">
              <div className="sumLeft">
                <div className="sumTitle">Summary</div>
                <div className="sumLine">
                  Items: <b>{totals.count}</b>
                </div>
                <div className="sumLine">
                  Subtotal: <b>{money(cart?.items?.[0]?.currency, totals.subtotal)}</b>
                </div>
                <div className="sumHint">
                  (Next step: we will enforce single currency in cart at checkout)
                </div>
              </div>

              <button className="checkout" onClick={onCheckout}>
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 42px 20px 90px;
        }

        .top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .h1 {
          margin: 0;
          font-size: 36px;
          line-height: 1.1;
        }

        .actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .ghostBtn {
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(255, 255, 255, 0.02);
          border-radius: 999px;
          padding: 12px 14px;
          font-size: 13px;
          color: #f5f4f4;
          text-decoration: none;
          cursor: pointer;
          opacity: 0.9;
        }

        .ghostBtn:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
        }

        .ghostBtn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .empty {
          margin-top: 18px;
          padding: 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.02);
          opacity: 0.9;
        }

        .list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 12px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          padding: 14px;
          background: rgba(255, 255, 255, 0.02);
        }

        .left {
          display: flex;
          gap: 14px;
          min-width: 0;
          flex: 1;
        }

        .thumb {
          width: 110px;
          height: 80px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.2);
          flex: 0 0 auto;
        }

        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .meta {
          min-width: 0;
        }

        .title {
          font-weight: 800;
          font-size: 15px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 640px;
        }

        .chips {
          margin-top: 8px;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .chip {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          opacity: 0.85;
        }

        .priceLine {
          margin-top: 8px;
          font-size: 12px;
          opacity: 0.8;
        }

        .right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          flex: 0 0 auto;
        }

        .qty {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          border-radius: 999px;
          padding: 8px 10px;
          background: rgba(255, 255, 255, 0.02);
        }

        .qtyBtn {
          width: 34px;
          height: 30px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: transparent;
          color: #f5f4f4;
          cursor: pointer;
          font-size: 16px;
        }

        .qtyBtn:hover {
          background: rgba(245, 244, 244, 0.08);
        }

        .qtyNum {
          min-width: 18px;
          text-align: center;
          font-weight: 700;
        }

        .lineTotal {
          font-weight: 800;
          opacity: 0.95;
        }

        .remove {
          border: 0;
          background: transparent;
          color: rgba(245, 244, 244, 0.7);
          cursor: pointer;
          font-size: 12px;
          text-decoration: underline;
        }

        .remove:hover {
          color: rgba(245, 244, 244, 0.95);
        }

        .summary {
          margin-top: 18px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
        }

        .sumTitle {
          font-weight: 900;
          margin-bottom: 8px;
        }

        .sumLine {
          font-size: 13px;
          opacity: 0.9;
          margin-top: 4px;
        }

        .sumHint {
          margin-top: 8px;
          font-size: 12px;
          opacity: 0.6;
        }

        .checkout {
          border: 1px solid rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.12);
          color: #25c3e2;
          font-weight: 900;
          padding: 12px 16px;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
        }

        .checkout:hover {
          background: rgba(37, 195, 226, 0.18);
        }

        @media (max-width: 720px) {
          .top {
            flex-direction: column;
            align-items: stretch;
          }
          .row {
            flex-direction: column;
            align-items: stretch;
          }
          .right {
            align-items: stretch;
          }
          .checkout {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}