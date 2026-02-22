// pages/store/download.js

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

function readQueryOrderId(q) {
  const v = q?.order_id
  if (typeof v === 'string') return v.trim()
  if (Array.isArray(v) && typeof v[0] === 'string') return v[0].trim()
  return ''
}

function normalizeLinksFromTokenApi(data) {
  // Supports multiple shapes:
  // - { token }
  // - { url }
  // - { tokens: [] }
  // - { urls: [] }
  // - { items: [{ token|url, title }] }
  const links = []

  const addUrl = (u, label) => {
    if (!u || typeof u !== 'string') return
    links.push({ url: u, label: label || 'Download' })
  }

  const tokenToUrl = (t) => `/api/download?token=${encodeURIComponent(t)}`

  if (typeof data?.url === 'string' && data.url.includes('/api/download?token=')) {
    addUrl(data.url, 'Download file')
    return links
  }

  if (typeof data?.token === 'string' && data.token.length > 10) {
    addUrl(tokenToUrl(data.token), 'Download file')
    return links
  }

  if (Array.isArray(data?.urls)) {
    data.urls.forEach((u, i) => addUrl(u, `Download item ${i + 1}`))
    return links
  }

  if (Array.isArray(data?.tokens)) {
    data.tokens.forEach((t, i) => {
      if (typeof t === 'string' && t.length > 10) addUrl(tokenToUrl(t), `Download item ${i + 1}`)
    })
    return links
  }

  if (Array.isArray(data?.items)) {
    data.items.forEach((x, i) => {
      const label = x?.title ? String(x.title) : `Download item ${i + 1}`
      if (typeof x?.url === 'string') addUrl(x.url, label)
      else if (typeof x?.token === 'string' && x.token.length > 10) addUrl(tokenToUrl(x.token), label)
    })
    return links
  }

  return links
}

export default function StoreDownload() {
  const router = useRouter()
  const orderRef = readQueryOrderId(router.query) // can be UUID or JC-... code

  const [status, setStatus] = React.useState('PENDING')
  const [msg, setMsg] = React.useState('')
  const [downloadLinks, setDownloadLinks] = React.useState([])

  // resolved UUID (real orders.id)
  const [resolvedId, setResolvedId] = React.useState('')

  async function load() {
    if (!orderRef) return

    setMsg('')
    setDownloadLinks([])

    // 1) Resolve order by id OR code
    const sr = await fetch(
      `/api/orders/status?order_id=${encodeURIComponent(orderRef)}&t=${Date.now()}`,
      { headers: { 'Cache-Control': 'no-store' } }
    )

    const sdata = await sr.json().catch(() => ({}))
    if (!sr.ok || sdata?.ok === false) {
      setStatus('ERROR')
      setMsg(sdata?.error || 'Order not found.')
      return
    }

    const oid = String(sdata?.id || '').trim()
    const st = String(sdata?.status || 'PENDING').trim().toUpperCase()
    setResolvedId(oid)
    setStatus(st)

    if (st !== 'PAID') {
      setMsg('This order is not paid yet. Please complete payment first.')
      return
    }

    if (!oid) {
      setMsg('Missing internal order id. Please contact support.')
      return
    }

    // 2) (Optional) Fetch order details (keeps your old behavior; safe if endpoint expects UUID)
    // If /api/orders/:id isn’t required, you can remove this block.
    try {
      const r = await fetch(`/api/orders/${encodeURIComponent(oid)}`, {
        headers: { 'Cache-Control': 'no-store' },
      })
      if (!r.ok) {
        // not fatal
        console.warn('Order details not found for id:', oid)
      }
    } catch (e) {
      console.warn('Order details fetch error:', e)
    }

    // 3) Create secure token(s)
    const t = await fetch('/api/download/create-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // IMPORTANT: pass UUID to token API
      body: JSON.stringify({ orderId: oid }),
    })

    const data = await t.json().catch(() => ({}))

    if (!t.ok) {
      setMsg(data?.error || 'Failed to create download link.')
      return
    }

    const links = normalizeLinksFromTokenApi(data)

    if (links.length > 0) {
      setDownloadLinks(links)
      return
    }

    setMsg('Download token missing. Please try again.')
  }

  React.useEffect(() => {
    if (!router.isReady) return
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, orderRef])

  const paid = status === 'PAID'

  return (
    <>
      <Head>
        <title>Download | Store</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="card">
          <h1 className="title">Download</h1>

          {!orderRef ? (
            <p className="p">
              Missing order id. Go back to the{' '}
              <Link href="/store" className="link">
                store
              </Link>
              .
            </p>
          ) : (
            <>
              <p className="p">
                Order: <span className="mono">{orderRef}</span>
              </p>

              {resolvedId && resolvedId !== orderRef ? (
                <p className="p2">
                  Internal ID: <span className="mono">{resolvedId}</span>
                </p>
              ) : null}

              {!paid ? (
                <>
                  <div className="badge pending">Status: {status}</div>
                  <p className="p2">{msg || 'Waiting for payment confirmation.'}</p>
                  <p className="p2">
                    <Link
                      href={`/store/return?order_id=${encodeURIComponent(orderRef)}`}
                      className="link"
                    >
                      Back to payment status
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <div className="badge paid">Payment confirmed ✅</div>
                  <p className="p2">Your secure link expires in 10 minutes.</p>

                  {downloadLinks.length > 0 ? (
                    <div className="btnList">
                      {downloadLinks.map((x, idx) => (
                        <a key={idx} className="btn" href={x.url}>
                          {x.label || `Download item ${idx + 1}`}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <button className="btn" onClick={load} type="button">
                      Generate download link
                    </button>
                  )}

                  {msg ? <p className="p2 warn">{msg}</p> : null}
                </>
              )}
            </>
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
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          font-size: 13px;
          opacity: 0.95;
        }
        .badge {
          display: inline-block;
          margin-top: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          border: 1px solid rgba(245, 244, 244, 0.18);
        }
        .pending {
          opacity: 0.9;
        }
        .paid {
          opacity: 0.95;
        }
        .btnList {
          margin-top: 14px;
          display: grid;
          gap: 10px;
          max-width: 420px;
        }
        .btn {
          display: inline-block;
          padding: 12px 16px;
          border-radius: 999px;
          background: #f5f4f4;
          color: #222222;
          font-weight: 700;
          text-decoration: none;
          border: 0;
          cursor: pointer;
          text-align: center;
        }
        .btn:hover {
          opacity: 0.95;
        }
        .link {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .warn {
          opacity: 0.85;
        }
      `}</style>
    </>
  )
}