// pages/store/download.js

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/layout/jeevan-chandimal-new-footer'

const PAID_STATUSES = new Set(['PAID', 'SUCCESS', 'COMPLETED', 'CONFIRMED', '2'])

function readQueryStr(q, key) {
  const v = q?.[key]
  if (typeof v === 'string') return v.trim()
  if (Array.isArray(v) && typeof v[0] === 'string') return v[0].trim()
  return ''
}

function normalizeLinksFromTokenApi(data) {
  const links = []

  const addUrl = (u, label) => {
    if (!u || typeof u !== 'string') return
    links.push({ url: u, label: label || 'Download' })
  }

  const tokenToUrl = (t) => `/api/download?token=${encodeURIComponent(t)}`

  if (typeof data?.url === 'string') {
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

function normStatus(s) {
  const v = String(s ?? 'PENDING').trim()
  if (v === '2') return 'PAID'
  return v.toUpperCase()
}

function isCartGroup(ref) {
  return String(ref || '')
    .trim()
    .toUpperCase()
    .startsWith('CART_')
}

export default function StoreDownload() {
  const router = useRouter()

  // supports:
  // - /store/download?order_id=...  (single)
  // - /store/download?code=CART_... (cart group)
  const orderIdRef = readQueryStr(router.query, 'order_id')
  const codeRef = readQueryStr(router.query, 'code')

  const ref = codeRef || orderIdRef
  const isCart = !!codeRef || isCartGroup(ref)

  const [status, setStatus] = React.useState('PENDING')
  const [msg, setMsg] = React.useState('')
  const [downloadLinks, setDownloadLinks] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  async function load() {
    if (!ref || loading) return

    setLoading(true)
    setMsg('')
    setDownloadLinks([])

    try {
      // 1) Verify paid
      const statusParam = isCart ? `code=${encodeURIComponent(ref)}` : `order_id=${encodeURIComponent(ref)}`
      const sr = await fetch(`/api/orders/status?${statusParam}&t=${Date.now()}`, {
        headers: { 'Cache-Control': 'no-store' },
      })

      const sdata = await sr.json().catch(() => ({}))

      if (!sr.ok || sdata?.ok === false) {
        setStatus('ERROR')
        setMsg(sdata?.error || `Order check failed (${sr.status})`)
        return
      }

      const st = normStatus(sdata?.status)
      setStatus(st)

      if (!PAID_STATUSES.has(st)) {
        setMsg('This order is not paid yet. Please complete payment first.')
        return
      }

      // 2) Generate secure link(s)
      // Use public reference directly instead of internal DB id
      const payload = isCart ? { code: ref } : { orderId: ref }

      const tr = await fetch('/api/download/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const tdata = await tr.json().catch(() => ({}))

      if (!tr.ok || tdata?.ok === false) {
        setMsg(tdata?.error || `Failed to create download link (${tr.status}).`)
        return
      }

      const links = normalizeLinksFromTokenApi(tdata)

      if (links.length > 0) {
        setDownloadLinks(links)
        setMsg('')
        return
      }

      setMsg('Download token missing. Please try again.')
    } catch (e) {
      setMsg(e?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (!router.isReady || !ref) return
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, ref, isCart])

  const paid = PAID_STATUSES.has(status)
  const backHref = isCart
    ? `/store/return?code=${encodeURIComponent(ref)}`
    : `/store/return?order_id=${encodeURIComponent(ref)}`

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

          {!ref ? (
            <p className="p">
              Missing order reference. Go back to the{' '}
              <Link href="/store" className="link">
                store
              </Link>
              .
            </p>
          ) : (
            <>
              <p className="p">
                {isCart ? 'Cart Code' : 'Order'}: <span className="mono">{ref}</span>
              </p>

              {!paid ? (
                <>
                  <div className="badge pending">Status: {status}</div>
                  <p className="p2">{msg || 'Waiting for payment confirmation.'}</p>
                  <p className="p2">
                    <Link href={backHref} className="link">
                      Back to payment status
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <div className="badge paid">Payment confirmed ✅</div>
                  <p className="p2">Your secure link expires in about 1 hour.</p>

                  {downloadLinks.length > 0 ? (
                    <div className="btnList">
                      {downloadLinks.map((x, idx) => (
                        <a key={idx} className="btn" href={x.url} rel="noreferrer">
                          {x.label || `Download item ${idx + 1}`}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <button className="btn" onClick={load} type="button" disabled={loading}>
                      {loading ? 'Generating…' : 'Generate download link'}
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
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
            'Courier New', monospace;
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
        button.btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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