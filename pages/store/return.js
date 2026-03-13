// pages/store/return.js

import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/layout/jeevan-chandimal-new-footer'

const PAID_STATUSES = new Set(['PAID', 'SUCCESS', 'COMPLETED', 'CONFIRMED', '2'])
const FAIL_STATUSES = new Set(['FAILED', 'CANCELED', 'CANCELLED', 'EXPIRED', '-1', '-2', '-3'])

function readFirstString(v) {
  if (typeof v === 'string') return v.trim()
  if (Array.isArray(v) && typeof v[0] === 'string') return v[0].trim()
  return ''
}

function readQueryOrderRef(q) {
  return (
    readFirstString(q?.order_id) ||
    readFirstString(q?.code) ||
    readFirstString(q?.id) ||
    readFirstString(q?.orderId) ||
    ''
  )
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

function safeRemove(key) {
  try {
    window.localStorage.removeItem(key)
  } catch {}
}

function normalizeStatus(data) {
  const directStatus = String(
    data?.status ??
      data?.order?.status ??
      data?.payment_status ??
      data?.order?.payment_status ??
      ''
  )
    .trim()
    .toUpperCase()

  const gatewayCode = String(
    data?.payhere_status_code ??
      data?.order?.payhere_status_code ??
      data?.status_code ??
      data?.order?.status_code ??
      ''
  ).trim()

  const paidAt = String(data?.paid_at ?? data?.order?.paid_at ?? '').trim()

  // strongest positive signals
  if (gatewayCode === '2') return 'PAID'
  if (paidAt) return 'PAID'

  // strongest negative signals
  if (gatewayCode === '-1' || gatewayCode === '-2' || gatewayCode === '-3') return 'FAILED'

  if (directStatus) return directStatus
  return 'PENDING'
}

function isCartGroup(ref) {
  return String(ref || '')
    .trim()
    .toUpperCase()
    .startsWith('CART_')
}

function buildStatusUrl(ref) {
  const key = isCartGroup(ref) ? 'code' : 'order_id'
  return `/api/orders/status?${key}=${encodeURIComponent(ref)}&t=${Date.now()}`
}

function buildDownloadUrl(ref) {
  if (!ref) return ''
  return isCartGroup(ref)
    ? `/store/download?code=${encodeURIComponent(ref)}`
    : `/store/download?order_id=${encodeURIComponent(ref)}`
}

export default function StoreReturn() {
  const router = useRouter()

  const queryOrderRef = readQueryOrderRef(router.query)

  const [orderRef, setOrderRef] = React.useState('')
  const [status, setStatus] = React.useState('PENDING')
  const [msg, setMsg] = React.useState('Waiting for payment confirmation…')

  const inFlightRef = React.useRef(false)
  const stoppedRef = React.useRef(false)
  const redirectedRef = React.useRef(false)

  // Resolve order reference from URL first, then localStorage fallback
  React.useEffect(() => {
    if (!router.isReady) return

    if (queryOrderRef) {
      setOrderRef(queryOrderRef)
      safeSet('last_order_ref', queryOrderRef)
      safeSet('last_order_id', queryOrderRef)
      return
    }

    const saved =
      safeGet('last_order_ref') ||
      safeGet('last_order_id') ||
      safeGet('last_cart_code') ||
      ''

    if (saved) {
      setOrderRef(saved)
    }
  }, [router.isReady, queryOrderRef])

  // Poll order status
  React.useEffect(() => {
    if (!router.isReady || !orderRef) return

    stoppedRef.current = false
    redirectedRef.current = false

    let tries = 0
    const maxTries = 45 // about 90 seconds at 2s interval

    const goToDownload = () => {
      if (redirectedRef.current) return
      redirectedRef.current = true
      stoppedRef.current = true

      safeRemove('jc_cart_v1')

      const target = buildDownloadUrl(orderRef)

      try {
        router.replace(target)
      } catch {}

      setTimeout(() => {
        try {
          window.location.href = target
        } catch {}
      }, 150)
    }

    const tick = async () => {
      if (stoppedRef.current || inFlightRef.current) return

      inFlightRef.current = true
      tries += 1

      try {
        const url = buildStatusUrl(orderRef)

        const r = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
            Pragma: 'no-cache',
          },
        })

        const data = await r.json().catch(() => ({}))

        if (stoppedRef.current) return

        if (!r.ok || data?.ok === false) {
          const errorText = data?.error
            ? String(data.error)
            : `Order check failed (${r.status}).`
          setMsg(errorText)
          return
        }

        const s = normalizeStatus(data)
        setStatus(s)

        if (PAID_STATUSES.has(s)) {
          setMsg('Payment confirmed. Redirecting to your download…')
          goToDownload()
          return
        }

        if (FAIL_STATUSES.has(s)) {
          stoppedRef.current = true
          setMsg('Payment was not completed. If you were charged, please contact support with your Order ID.')
          return
        }

        if (tries < maxTries) {
          setMsg('Waiting for webhook confirmation…')
        } else {
          stoppedRef.current = true
          setMsg('Still waiting for confirmation. Please refresh this page in a moment.')
        }
      } catch (e) {
        if (!stoppedRef.current) {
          setMsg(e?.message || 'Error checking payment.')
        }
      } finally {
        inFlightRef.current = false
      }
    }

    tick()
    const iv = setInterval(tick, 2000)

    return () => {
      stoppedRef.current = true
      clearInterval(iv)
    }
  }, [router, router.isReady, orderRef])

  const isPaid = PAID_STATUSES.has(status)
  const downloadHref = buildDownloadUrl(orderRef)

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
            Order ID: <span className="mono">{orderRef || '-'}</span>
          </p>

          <div className="badge">Status: {status}</div>

          <p className="p2">{msg}</p>

          {orderRef ? (
            <p className="p2">
              <a href={downloadHref}>Go to download</a>
            </p>
          ) : (
            <p className="p2">
              Missing order reference. Please return from PayHere again.
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