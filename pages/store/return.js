// pages/store/return.js

import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

const PAID_STATUSES = new Set(['PAID', 'SUCCESS', 'COMPLETED'])
const FAIL_STATUSES = new Set(['FAILED', 'CANCELED', 'CANCELLED', 'EXPIRED'])

function readOrderId(q) {
  const v = q?.order_id
  if (typeof v === 'string') return v.trim()
  if (Array.isArray(v) && typeof v[0] === 'string') return v[0].trim()
  return ''
}

export default function StoreReturn() {
  const router = useRouter()
  const orderId = readOrderId(router.query)

  const [status, setStatus] = React.useState('PENDING')
  const [msg, setMsg] = React.useState('')

  React.useEffect(() => {
    if (!router.isReady || !orderId) return

    let cancelled = false
    let tries = 0
    const maxTries = 30
    let timer = null

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
          // ✅ Support both shapes: {status} or {order:{status}}
          const raw = data?.status ?? data?.order?.status ?? 'PENDING'
          const s = String(raw).trim().toUpperCase()

          setStatus(s)

          if (PAID_STATUSES.has(s)) {
            router.replace(`/store/download?order_id=${encodeURIComponent(orderId)}`)
            return
          }

          if (FAIL_STATUSES.has(s)) {
            setMsg('Payment not completed. If you were charged, please contact support with your Order ID.')
            return
          }
        }
      } catch (e) {
        if (!cancelled) setMsg(e?.message || 'Error checking payment.')
      }

      if (cancelled) return

      if (tries < maxTries) {
        timer = setTimeout(poll, 2000)
      } else {
        setMsg('Still waiting for confirmation. You can refresh this page.')
      }
    }

    poll()
    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [router.isReady, orderId, router])

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
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap { max-width: 900px; margin: 0 auto; padding: 50px 20px 90px; }
        .card { border: 1px solid rgba(245,244,244,0.12); border-radius: 18px; background: rgba(255,255,255,0.02); padding: 18px; }
        .title { margin: 0 0 10px; font-size: 22px; }
        .p { margin: 0; opacity: 0.85; line-height: 1.6; }
        .p2 { margin: 10px 0 0; opacity: 0.85; line-height: 1.6; }
        .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace; font-size: 13px; }
        .badge { display: inline-block; margin-top: 12px; padding: 6px 12px; border-radius: 999px; font-size: 12px; border: 1px solid rgba(245,244,244,0.18); }
      `}</style>
    </>
  )
}
