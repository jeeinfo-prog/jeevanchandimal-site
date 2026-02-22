// pages/store/return.js

import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

const PAID_STATUSES = new Set(['PAID', 'SUCCESS', 'COMPLETED'])
const FAIL_STATUSES = new Set(['FAILED', 'CANCELED', 'CANCELLED', 'EXPIRED'])

function readQueryOrderId(q) {
  const v = q?.order_id
  if (typeof v === 'string') return v.trim()
  if (Array.isArray(v) && typeof v[0] === 'string') return v[0].trim()
  return ''
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {}
}
function safeGet(key) {
  try {
    return localStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

export default function StoreReturn() {
  const router = useRouter()

  // 1) Try URL first
  const urlOrderId = readQueryOrderId(router.query)

  // 2) Fallback to localStorage if PayHere drops query params
  const [orderId, setOrderId] = React.useState(urlOrderId)

  const [status, setStatus] = React.useState('PENDING')
  const [msg, setMsg] = React.useState('')

  React.useEffect(() => {
    if (!router.isReady) return

    // If URL has order_id, prefer it and store it
    if (urlOrderId) {
      setOrderId(urlOrderId)

      // ✅ Save under both keys (backward + forward compatible)
      safeSet('last_order_ref', urlOrderId) // new
      safeSet('last_order_id', urlOrderId) // old (keep)
      return
    }

    // Otherwise recover from localStorage
    const saved =
      safeGet('last_order_ref') || // new
      safeGet('last_order_id') // old fallback

    if (saved) setOrderId(saved)
  }, [router.isReady, urlOrderId])

  React.useEffect(() => {
    if (!router.isReady || !orderId) return

    let cancelled = false
    let tries = 0
    const maxTries = 30 // ~60s

    async function poll() {
      tries += 1

      try {
        const url = `/api/orders/status?order_id=${encodeURIComponent(orderId)}&t=${Date.now()}`
        const r = await fetch(url, { headers: { 'Cache-Control': 'no-store' } })
        const data = await r.json().catch(() => ({}))
        if (cancelled) return

        if (!r.ok || data?.ok === false) {
          setMsg(data?.error ? String(data.error) : `Order check failed (${r.status}).`)
        } else {
          const raw = data?.status ?? data?.order?.status ?? 'PENDING'
          const s = String(raw).trim().toUpperCase()
          setStatus(s)

          // ✅ Paid → clear cart + go to download
          if (PAID_STATUSES.has(s)) {
            // Safe to clear cart now (prevents accidental double orders)
            try {
              localStorage.removeItem('jc_cart_v1')
            } catch {}

            window.location.href = `/store/download?order_id=${encodeURIComponent(orderId)}`
            return
          }

          // ✅ Failure states
          if (FAIL_STATUSES.has(s)) {
            setMsg('Payment not completed. If you were charged, please contact support with your Order ID.')
            return
          }
        }
      } catch (e) {
        if (!cancelled) setMsg(e?.message || 'Error checking payment.')
      }

      if (!cancelled && tries < maxTries) {
        setTimeout(poll, 2000)
      } else if (!cancelled) {
        setMsg('Still waiting for confirmation. You can refresh this page.')
      }
    }

    poll()
    return () => {
      cancelled = true
    }
  }, [router.isReady, orderId])

  return (
    <>
      <Head>
        <title>Confirming Payment | Store</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="card">
          <h1 className="title">Confirming payment…</h1>

          <p className="p">
            Order ID: <span className="mono">{orderId || '-'}</span>
          </p>

          <div className="badge">Status: {status}</div>

          {msg ? <p className="p2">{msg}</p> : <p className="p2">Please wait…</p>}

          {/* Manual fallback button (in case redirect is blocked) */}
          {orderId && PAID_STATUSES.has(status) ? (
            <p className="p2">
              <a href={`/store/download?order_id=${encodeURIComponent(orderId)}`}>Download</a>
            </p>
          ) : null}

          {!orderId ? (
            <p className="p2">
              Missing <span className="mono">order_id</span>. Please return from PayHere again.
            </p>
          ) : null}
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 50px 20px 90px;
        }
        .card {
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
          padding: 18px;
        }
        .title {
          margin: 0 0 10px;
          font-size: 22px;
        }
        .p {
          margin: 0;
          opacity: 0.85;
          line-height: 1.6;
        }
        .p2 {
          margin: 10px 0 0;
          opacity: 0.85;
          line-height: 1.6;
        }
        .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          font-size: 13px;
        }
        .badge {
          display: inline-block;
          margin-top: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          border: 1px solid rgba(245, 244, 244, 0.18);
        }
      `}</style>
    </>
  )
}