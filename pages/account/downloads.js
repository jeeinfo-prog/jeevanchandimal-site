// pages/account/downloads.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import JeevanChandimalNavi from '../../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/layout/jeevan-chandimal-new-footer'

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

export default function DownloadsPage() {
  const [email, setEmail] = React.useState('')
  const [orders, setOrders] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [busyId, setBusyId] = React.useState(null)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const e = normalizeEmail(window.localStorage.getItem('user_email') || '')
    setEmail(e)
  }, [])

  React.useEffect(() => {
    if (!email) {
      setError('Please log in to view your downloads.')
      setLoading(false)
      return
    }

    let alive = true

    async function load() {
      try {
        setLoading(true)
        setError('')

        const r = await fetch(`/api/orders?email=${encodeURIComponent(email)}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-store' },
        })

        const data = await r.json().catch(() => null)

        if (!alive) return

        if (!r.ok || !data?.ok) {
          setError(data?.error || 'Failed to load orders')
          setOrders([])
          return
        }

        setOrders(Array.isArray(data.orders) ? data.orders : [])
      } catch {
        if (!alive) return
        setError('Failed to load orders')
        setOrders([])
      } finally {
        if (!alive) return
        setLoading(false)
      }
    }

    load()

    return () => {
      alive = false
    }
  }, [email])

  async function handleDownload(order) {
    try {
      setBusyId(order.id)

      const r = await fetch('/api/download/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ orderId: order.id }),
      })

      const data = await r.json().catch(() => null)
      if (!r.ok || !data?.ok || !data?.url) {
        alert(data?.error || 'Failed to create download link')
        return
      }

      window.location.href = data.url
    } catch {
      alert('Download failed')
    } finally {
      setBusyId(null)
    }
  }

  const formatMoney = (currency, amount) => {
    const n = Number(amount || 0)
    if (!currency) return String(n)
    if (currency === 'LKR') return `LKR ${n.toLocaleString('en-LK')}`
    return `${currency} ${n}`
  }

  return (
    <>
      <Head>
        <title>My Downloads | Jeevan Chandimal</title>
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <header className="top">
          <div>
            <h1 className="h1">My Downloads</h1>
            <p className="sub">
              Signed in as <span className="pill">{email || '—'}</span>
            </p>
          </div>

          {!email ? (
            <Link href="/login" legacyBehavior>
              <a className="loginBtn">Go to Login →</a>
            </Link>
          ) : null}
        </header>

        {loading ? <div className="empty">Loading…</div> : null}
        {!loading && error ? <div className="empty error">{error}</div> : null}

        {!loading && !error && orders.length === 0 ? (
          <div className="empty">No purchases yet.</div>
        ) : null}

        {!loading && !error && orders.length > 0 ? (
          <div className="list">
            {orders.map((o) => {
              const title = o?.title || o?.photo?.title || 'Photo'
              const thumb =
                o?.thumb_url ||
                o?.photo?.thumb_url ||
                o?.preview_url ||
                o?.photo?.preview_url ||
                '/placeholder.png'

              const canDownload = String(o.status || '').toUpperCase() === 'PAID'

              const used = Number(o.download_count || 0)
              const limit = o.download_limit == null ? null : Number(o.download_limit)
              const limitText =
                limit === 0
                  ? 'Unlimited downloads'
                  : limit != null
                  ? `${used}/${limit} downloads`
                  : null

              return (
                <div key={o.id} className="card">
                  <div className="left">
                    <div className="thumb">
                      <img src={thumb} alt={title} loading="lazy" />
                    </div>

                    <div className="meta">
                      <div className="title">{title}</div>

                      <div className="line">
                        {o.license ? (
                          <span className="chip">{String(o.license).toUpperCase()}</span>
                        ) : null}
                        {o.format ? (
                          <span className="chip">{String(o.format).toUpperCase()}</span>
                        ) : null}
                        <span className="chip">{formatMoney(o.currency, o.amount)}</span>
                        {limitText ? <span className="chip">{limitText}</span> : null}
                      </div>

                      <div className="sub2">
                        Order: <code className="code">{o.id}</code>
                        {o.paid_at ? (
                          <>
                            {' '}
                            • Paid: <span>{new Date(o.paid_at).toLocaleString()}</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn"
                    disabled={!canDownload || busyId === o.id}
                    onClick={() => handleDownload(o)}
                    title={!canDownload ? 'Order not paid yet' : 'Download'}
                  >
                    {busyId === o.id ? 'Preparing…' : 'Download'}
                  </button>
                </div>
              )
            })}
          </div>
        ) : null}
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          max-width: 980px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          margin-bottom: 18px;
        }

        .h1 {
          margin: 0;
          font-size: 34px;
          line-height: 1.1;
        }

        .sub {
          margin: 10px 0 0;
          opacity: 0.85;
        }

        .pill {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(255, 255, 255, 0.03);
          font-size: 12px;
        }

        .loginBtn {
          text-decoration: none;
          font-size: 13px;
          opacity: 0.85;
          border: 1px solid rgba(245, 244, 244, 0.16);
          padding: 12px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.02);
        }

        .loginBtn:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
        }

        .list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 14px;
        }

        .card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 16px;
          padding: 14px;
          background: rgba(255, 255, 255, 0.02);
        }

        .left {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
          flex: 1;
        }

        .thumb {
          width: 92px;
          height: 70px;
          border-radius: 12px;
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
          font-weight: 700;
          font-size: 15px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 620px;
        }

        .line {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .chip {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          opacity: 0.85;
        }

        .sub2 {
          margin-top: 8px;
          font-size: 12px;
          opacity: 0.75;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 720px;
        }

        .code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
            'Courier New', monospace;
          font-size: 11px;
          opacity: 0.9;
        }

        .btn {
          border: 1px solid rgba(245, 244, 244, 0.2);
          padding: 10px 16px;
          border-radius: 999px;
          background: transparent;
          cursor: pointer;
          white-space: nowrap;
        }

        .btn:hover {
          background: rgba(245, 244, 244, 0.08);
        }

        .btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .empty {
          margin-top: 18px;
          padding: 14px 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          opacity: 0.9;
        }

        .empty.error {
          color: #ff6b6b;
        }

        @media (max-width: 680px) {
          .top {
            flex-direction: column;
            align-items: stretch;
          }
          .title {
            max-width: 100%;
          }
          .sub2 {
            max-width: 100%;
          }
          .card {
            flex-direction: column;
            align-items: stretch;
          }
          .btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}