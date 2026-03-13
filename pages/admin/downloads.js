import React from 'react'
import Head from 'next/head'

function formatMoney(value, currency) {
  const n = Number(value || 0)

  if (currency === 'LKR') {
    return `LKR ${n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  if (currency === 'USD') {
    return `$${n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return `${currency} ${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function formatShortDate(value) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value || '')
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })
}

export default function AdminDownloads() {
  const [stats, setStats] = React.useState(null)
  const [error, setError] = React.useState('')
  const [activeCurrency, setActiveCurrency] = React.useState('')
  const [orders, setOrders] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let alive = true

    async function load() {
      try {
        setLoading(true)
        setError('')

        const r = await fetch('/api/admin/download-stats', {
          credentials: 'same-origin',
        })
        const data = await r.json().catch(() => ({}))

        if (!r.ok || data?.ok === false) {
          throw new Error(data?.error || 'Failed to load analytics')
        }

        if (!alive) return

        setStats(data)
        setOrders(Array.isArray(data?.orders) ? data.orders : [])

        const firstCurrency =
          Array.isArray(data?.revenueByCurrency) && data.revenueByCurrency.length
            ? data.revenueByCurrency[0].currency
            : ''

        setActiveCurrency(firstCurrency)
      } catch (e) {
        if (!alive) return
        setError(e?.message || 'Failed to load analytics')
        setStats(null)
        setOrders([])
      } finally {
        if (alive) setLoading(false)
      }
    }

    load()

    return () => {
      alive = false
    }
  }, [])

  function logout() {
    window.location.href = '/api/admin/logout'
  }

  const revenueCards = stats?.revenueByCurrency || []
  const revenueSeries = stats?.revenuePerDayByCurrency?.[activeCurrency] || []

  return (
    <>
      <Head>
        <title>Admin Dashboard | Jeevan Chandimal</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className="wrap">
        <div className="bgGlow glow1" />
        <div className="bgGlow glow2" />

        <section className="shell">
          <div className="header">
            <div>
              <p className="eyebrow">Admin Dashboard</p>
              <h1>Store Analytics</h1>
            </div>

            <button className="logout" onClick={logout} type="button">
              Logout
            </button>
          </div>

          {error ? <div className="errorBox">{error}</div> : null}

          {loading ? (
            <div className="card">
              <p className="muted">Loading analytics...</p>
            </div>
          ) : !stats ? (
            <div className="card">
              <p className="muted">No analytics available.</p>
            </div>
          ) : (
            <>
              <section className="statsGrid">
                {revenueCards.map((item) => (
                  <button
                    key={item.currency}
                    type="button"
                    className={`statCard ${activeCurrency === item.currency ? 'active' : ''}`}
                    onClick={() => setActiveCurrency(item.currency)}
                  >
                    <span className="statLabel">Revenue · {item.currency}</span>
                    <strong className="statValue">
                      {formatMoney(item.total, item.currency)}
                    </strong>
                  </button>
                ))}

                <div className="statCard plainCard">
                  <span className="statLabel">Paid Orders</span>
                  <strong className="statValue">{stats.totalOrders}</strong>
                </div>

                <div className="statCard plainCard">
                  <span className="statLabel">Downloads</span>
                  <strong className="statValue">{stats.totalDownloads}</strong>
                </div>
              </section>

              <section className="card">
                <div className="sectionHead">
                  <h2>Revenue Per Day</h2>
                  <span className="pill">{activeCurrency || 'Currency'}</span>
                </div>

                {revenueSeries.length ? (
                  <div className="rows">
                    {revenueSeries
                      .slice()
                      .reverse()
                      .slice(0, 10)
                      .map((item) => (
                        <div className="row" key={item.date}>
                          <span>{formatShortDate(item.date)}</span>
                          <strong>{formatMoney(item.value, activeCurrency)}</strong>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="muted">No revenue data yet.</p>
                )}
              </section>

              <section className="card">
                <div className="sectionHead">
                  <h2>Recent Orders</h2>
                  <span className="pill">Latest 20</span>
                </div>

                <div className="tableWrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Title</th>
                        <th>Order ID</th>
                        <th>Image ID</th>
                        <th>Amount</th>
                        <th>Downloads</th>
                        <th>Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.length ? (
                        orders.map((o) => (
                          <tr key={o.orderId}>
                            <td>
                              {o.thumbnail ? (
                                o.original ? (
                                  <a
                                    href={o.original}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="thumbLink"
                                    title="Open preview"
                                  >
                                    <img
                                      src={o.thumbnail}
                                      className="thumb"
                                      alt={o.title || o.photoId || 'Order thumbnail'}
                                    />
                                  </a>
                                ) : (
                                  <img
                                    src={o.thumbnail}
                                    className="thumb"
                                    alt={o.title || o.photoId || 'Order thumbnail'}
                                  />
                                )
                              ) : (
                                <div className="thumbFallback">No image</div>
                              )}
                            </td>

                            <td className="titleCell">{o.title || 'Untitled'}</td>
                            <td className="mono">{o.orderId}</td>
                            <td className="mono">{o.photoId}</td>
                            <td>{formatMoney(o.amount, o.currency)}</td>
                            <td>{o.downloads}</td>
                            <td>{formatShortDate(o.date)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="emptyCell">
                            No recent orders found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </section>
      </main>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 15% 18%, rgba(0, 194, 255, 0.08), transparent 28%),
            radial-gradient(circle at 88% 22%, rgba(0, 194, 255, 0.06), transparent 26%),
            #0b0b0d;
          color: #f5f4f4;
          padding: 40px 20px 60px;
        }

        .bgGlow {
          position: absolute;
          border-radius: 999px;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.22;
        }

        .glow1 {
          width: 260px;
          height: 260px;
          top: 120px;
          left: -40px;
          background: rgba(0, 194, 255, 0.18);
        }

        .glow2 {
          width: 320px;
          height: 320px;
          right: -80px;
          bottom: 60px;
          background: rgba(0, 194, 255, 0.12);
        }

        .shell {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 30px;
        }

        .eyebrow {
          margin: 0 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 11px;
          opacity: 0.62;
        }

        h1 {
          margin: 0;
          font-size: clamp(32px, 4vw, 46px);
          line-height: 1.04;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        h2 {
          margin: 0;
          font-size: 22px;
          line-height: 1.2;
        }

        .logout {
          background: #ff4444;
          border: none;
          padding: 10px 18px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .logout:hover {
          opacity: 0.92;
        }

        .errorBox {
          margin-bottom: 20px;
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(255, 68, 68, 0.12);
          border: 1px solid rgba(255, 68, 68, 0.25);
          color: #ffd2d2;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }

        .statCard,
        .card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          backdrop-filter: blur(14px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.24);
        }

        .statCard {
          padding: 20px;
          text-align: left;
          color: inherit;
        }

        button.statCard {
          cursor: pointer;
        }

        button.statCard:hover {
          border-color: rgba(0, 194, 255, 0.26);
        }

        .statCard.active {
          border-color: rgba(0, 194, 255, 0.5);
          background: rgba(0, 194, 255, 0.08);
        }

        .plainCard {
          cursor: default;
        }

        .statLabel {
          display: block;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          opacity: 0.68;
        }

        .statValue {
          display: block;
          margin-top: 10px;
          font-size: clamp(24px, 2.5vw, 36px);
          line-height: 1.08;
          font-weight: 600;
        }

        .card {
          padding: 24px;
          margin-bottom: 24px;
        }

        .sectionHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid rgba(0, 194, 255, 0.22);
          background: rgba(0, 194, 255, 0.08);
          color: #89e3ff;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .rows {
          display: grid;
          gap: 10px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .tableWrap {
          overflow-x: auto;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.015);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 980px;
        }

        th,
        td {
          padding: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          text-align: left;
          vertical-align: middle;
        }

        th {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          opacity: 0.62;
        }

        .thumb {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          display: block;
          background: rgba(255, 255, 255, 0.04);
        }

        .thumbLink {
          display: inline-block;
        }

        .thumbFallback {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          opacity: 0.7;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
            'Courier New', monospace;
          font-size: 13px;
        }

        .titleCell {
          min-width: 220px;
        }

        .emptyCell,
        .muted {
          opacity: 0.72;
        }

        .emptyCell {
          text-align: center;
        }

        @media (max-width: 1100px) {
          .statsGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .wrap {
            padding: 28px 14px 50px;
          }

          .header,
          .sectionHead {
            flex-direction: column;
            align-items: flex-start;
          }

          .statsGrid {
            grid-template-columns: 1fr;
          }

          .card,
          .statCard {
            padding: 18px;
          }
        }
      `}</style>
    </>
  )
}