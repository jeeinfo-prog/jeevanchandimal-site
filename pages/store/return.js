// pages/store/return.js

import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

const PAID_STATUSES = new Set(['PAID', 'SUCCESS', 'COMPLETED', 'CONFIRMED', '2'])
const FAIL_STATUSES = new Set(['FAILED', 'CANCELED', 'CANCELLED', 'EXPIRED', '-1', '-2', '-3'])

function readQueryOrderId(q) {
  const v = q?.order_id
  if (typeof v === 'string') return v.trim()
  if (Array.isArray(v) && typeof v[0] === 'string') return v[0].trim()
  return ''
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {}
}
function safeGet(key) {
  try {
    return window.localStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

function normalizeStatus(data) {
  const raw =
    data?.status ??
    data?.order?.status ??
    data?.payhere_status_code ?? // sometimes exposed
    'PENDING'

  const s = String(raw).trim()

  if (s === '2') return 'PAID'
  if (s === '-1' || s === '-2' || s === '-3') return 'FAILED'

  return s.toUpperCase()
}

function isCartGroup(ref) {
  return String(ref || '').toUpperCase().startsWith('CART_')
}

export default function StoreReturn() {
  const router = useRouter()

  const urlOrderId = readQueryOrderId(router.query)
  const [orderId, setOrderId] = React.useState(urlOrderId || '')
  const [status, setStatus] = React.useState('PENDING')
  const [msg, setMsg] = React.useState('')

  // Resolve orderId from URL -> localStorage fallback
  React.useEffect(() => {
    if (!router.isReady) return

    if (urlOrderId) {
      setOrderId(urlOrderId)
      safeSet('last_order_ref', urlOrderId)
      safeSet('last_order_id', urlOrderId) // backward compat
      return
    }

    const saved = safeGet('last_order_ref') || safeGet('last_order_id')
    if (saved) setOrderId(saved)
  }, [router.isReady, urlOrderId])

  // Poll status
  React.useEffect(() => {
    if (!router.isReady || !orderId) return

    let stopped = false
    let tries = 0
    const maxTries = 45 // ~90s

    const tick = async () => {
      if (stopped) return
      tries += 1

      try {
        const url = `/api/orders/status?order_id=${encodeURIComponent(orderId)}&t=${Date.now()}`
        const r = await fetch(url, { headers: { 'Cache-Control': 'no-store' } })
        const data = await r.json().catch(() => ({}))
        if (stopped) return

        if (!r.ok || data?.ok === false) {
          setMsg(data?.error ? String(data.error) : `Order check failed (${r.status}).`)
        } else {
          const s = normalizeStatus(data)
          setStatus(s)

          // ✅ PAID
          if (PAID_STATUSES.has(s)) {
            stopped = true

            // clear cart only after confirmed paid
            try {
              window.localStorage.removeItem('jc_cart_v1')
            } catch {}

            // ✅ If CART_* then go to download page with code=
            const target = isCartGroup(orderId)
              ? `/store/download?code=${encodeURIComponent(orderId)}`
              : `/store/download?order_id=${encodeURIComponent(orderId)}`

            try {
              router.replace(target)
            } catch {}

            setTimeout(() => {
              try {
                window.location.href = target
              } catch {}
            }, 150)

            return
          }

          // ✅ FAILED/CANCELED
          if (FAIL_STATUSES.has(s)) {
            stopped = true
            setMsg('Payment not completed. If you were charged, please contact support with your Order ID.')
            return
          }

          setMsg('Please wait…')
        }
      } catch (e) {
        if (!stopped) setMsg(e?.message || 'Error checking payment.')
      }

      if (!stopped && tries >= maxTries) {
        stopped = true
        setMsg('Still waiting for confirmation. You can refresh this page.')
      }
    }

    tick()
    const iv = setInterval(tick, 2000)

    return () => {
      stopped = true
      clearInterval(iv)
    }
  }, [router.isReady, orderId, router])

  const isPaid = PAID_STATUSES.has(status)

  const downloadHref = orderId
    ? isCartGroup(orderId)
      ? `/store/download?code=${encodeURIComponent(orderId)}`
      : `/store/download?order_id=${encodeURIComponent(orderId)}`
    : ''

  return (
    <>
      <Head>
        <title>Confirming Payment | Store</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="card">
          <h1 className="title">{isPaid ? 'Payment confirmed ✅' : 'Confirming payment…'}</h1>

          <p className="p">
            Order ID: <span className="mono">{orderId || '-'}</span>
          </p>

          <div className="badge">Status: {status}</div>

          {msg ? <p className="p2">{msg}</p> : <p className="p2">Please wait…</p>}

          {orderId ? (
            <p className="p2">
              <a href={downloadHref}>Go to download</a>
            </p>
          ) : (
            <p className="p2">
              Missing <span className="mono">order_id</span>. Please return from PayHere again.
            </p>
          )}
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
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
            'Courier New', monospace;
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