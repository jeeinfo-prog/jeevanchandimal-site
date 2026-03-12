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
  const s = String(value || '').trim()
  if (!s) return ''
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return s
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })
}

function MiniBarChart({ data = [], currency }) {
  const items = Array.isArray(data) ? data : []
  const max = Math.max(...items.map((x) => Number(x?.value || 0)), 0)

  if (!items.length) {
    return <p className="muted">No revenue data yet.</p>
  }

  return (
    <div className="chartList">
      {items.map((item) => {
        const value = Number(item?.value || 0)
        const width = max > 0 ? Math.max(6, (value / max) * 100) : 0

        return (
          <div className="chartRow" key={`${currency}-${item.date}`}>
            <div className="chartMeta">
              <span>{formatShortDate(item.date)}</span>
              <strong>{formatMoney(value, currency)}</strong>
            </div>
            <div className="barTrack">
              <div className="barFill" style={{ width: `${width}%` }} />
            </div>
          </div>
        )
      })}

      <style jsx>{`
        .chartList {
          display: grid;
          gap: 12px;
        }
        .chartRow {
          display: grid;
          gap: 8px;
        }
        .chartMeta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 13px;
        }
        .barTrack {
          height: 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .barFill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(0, 194, 255, 0.85), rgba(92, 231, 255, 1));
          box-shadow: 0 0 18px rgba(0, 194, 255, 0.25);
        }
      `}</style>
    </div>
  )
}

function MiniLineChart({ data = [] }) {
  const items = Array.isArray(data) ? data : []

  if (!items.length) {
    return <p className="muted">No download data yet.</p>
  }

  const width = 100
  const height = 34
  const max = Math.max(...items.map((x) => Number(x?.value || 0)), 0)

  const points = items
    .map((item, i) => {
      const x = items.length === 1 ? width / 2 : (i / (items.length - 1)) * width
      const y =
        max > 0 ? height - (Number(item?.value || 0) / max) * (height - 4) - 2 : height - 2
      return `${x},${y}`
    })
    .join(' ')

  const localMax = Math.max(...items.map((x) => Number(x?.value || 0)), 1)

  return (
    <div className="lineChartWrap">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="lineChart">
        <polyline fill="none" stroke="rgba(0,194,255,0.95)" strokeWidth="2.2" points={points} />
      </svg>

      <div className="chartList">
        {items.map((item) => (
          <div className="chartRow" key={item.date}>
            <div className="chartMeta">
              <span>{formatShortDate(item.date)}</span>
              <strong>{item.value}</strong>
            </div>
            <div className="barTrack">
              <div
                className="barFill"
                style={{
                  width: `${Math.max(6, (Number(item?.value || 0) / localMax) * 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .lineChartWrap {
          display: grid;
          gap: 14px;
        }
        .lineChart {
          width: 100%;
          height: 80px;
          opacity: 0.95;
          display: block;
        }
        .chartList {
          display: grid;
          gap: 12px;
        }
        .chartRow {
          display: grid;
          gap: 8px;
        }
        .chartMeta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 13px;
        }
        .barTrack {
          height: 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .barFill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(0, 194, 255, 0.65), rgba(92, 231, 255, 0.95));
        }
      `}</style>
    </div>
  )
}

export default function AdminDownloads() {
  const [stats, setStats] = React.useState(null)
  const [error, setError] = React.useState('')
  const [activeCurrency, setActiveCurrency] = React.useState('')

  React.useEffect(() => {
    let alive = true

    async function load() {
      try {
        const r = await fetch('/api/admin/download-stats', {
          credentials: 'same-origin',
        })
        const data = await r.json().catch(() => ({}))

        if (!r.ok || data?.ok === false) {
          throw new Error(data?.error || 'Failed to load analytics')
        }

        if (!alive) return

        setStats(data)

        const firstCurrency =
          Array.isArray(data?.revenueByCurrency) && data.revenueByCurrency.length
            ? data.revenueByCurrency[0].currency
            : ''

        setActiveCurrency(firstCurrency)
      } catch (e) {
        if (alive) setError(e?.message || 'Failed to load analytics')
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [])

  const revenueCards = stats?.revenueByCurrency || []
  const revenueSeries = stats?.revenuePerDayByCurrency?.[activeCurrency] || []

  return (
    <>
      <Head>
        <title>Admin Analytics | Jeevan Chandimal</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className="wrap">
        <div className="bgGlow glow1" />
        <div className="bgGlow glow2" />

        <section className="shell">
          <div className="hero">
            <p className="eyebrow">Admin dashboard</p>
            <h1 className="title">Store Analytics</h1>
            <p className="sub">
              Revenue split by currency, downloads, and top-performing assets in one place.
            </p>
          </div>

          {error ? (
            <div className="card errorCard">
              <p>{error}</p>
            </div>
          ) : !stats ? (
            <div className="card">
              <p className="muted">Loading analytics...</p>
            </div>
          ) : (
            <>
              <section className="statsGrid revenueGrid">
                {revenueCards.map((item) => (
                  <button
                    key={item.currency}
                    type="button"
                    className={`statCard buttonCard ${
                      activeCurrency === item.currency ? 'isActive' : ''
                    }`}
                    onClick={() => setActiveCurrency(item.currency)}
                  >
                    <span className="statLabel">Revenue · {item.currency}</span>
                    <strong className="statValue">
                      {formatMoney(item.total, item.currency)}
                    </strong>
                  </button>
                ))}

                <div className="statCard">
                  <span className="statLabel">Paid Orders</span>
                  <strong className="statValue">{stats.totalOrders}</strong>
                </div>

                <div className="statCard">
                  <span className="statLabel">Downloads</span>
                  <strong className="statValue">{stats.totalDownloads}</strong>
                </div>
              </section>

              <section className="tablesGrid">
                <div className="card tableCard">
                  <div className="cardHead">
                    <h2>Top Orders</h2>
                    <span className="pill">By downloads</span>
                  </div>

                  <div className="tableWrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Downloads</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(stats.topOrders || []).length ? (
                          stats.topOrders.map((item) => (
                            <tr key={item.orderId}>
                              <td className="mono">{item.orderId}</td>
                              <td>{item.count}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="emptyCell">
                              No download data yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card tableCard">
                  <div className="cardHead">
                    <h2>Top Selling Photos</h2>
                    <span className="pill">Paid orders only</span>
                  </div>

                  <div className="tableWrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Photo ID</th>
                          <th>Sales</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(stats.topPhotos || []).length ? (
                          stats.topPhotos.map((item) => (
                            <tr key={item.photoId}>
                              <td className="mono">{item.photoId}</td>
                              <td>{item.count}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="emptyCell">
                              No photo sales yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="bottomGrid">
                <div className="card listCard">
                  <div className="cardHead">
                    <h2>Revenue Per Day</h2>
                    <span className="pill">{activeCurrency || 'Currency'}</span>
                  </div>

                  <MiniBarChart
                    data={revenueSeries.slice().reverse().slice(0, 10)}
                    currency={activeCurrency}
                  />
                </div>

                <div className="card listCard">
                  <div className="cardHead">
                    <h2>Downloads Per Day</h2>
                    <span className="pill">Trend</span>
                  </div>

                  <MiniLineChart
                    data={(stats.downloadsPerDay || []).slice().reverse().slice(0, 10)}
                  />
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
            radial-gradient(circle at 80% 90%, rgba(0, 194, 255, 0.05), transparent 24%),
            #0b0b0d;
          color: #f5f2eb;
          padding: 54px 20px 80px;
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

        .hero {
          margin-bottom: 28px;
        }

        .eyebrow {
          margin: 0 0 10px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          opacity: 0.62;
        }

        .title {
          margin: 0;
          font-size: clamp(32px, 4vw, 46px);
          line-height: 1.04;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .sub {
          margin: 12px 0 0;
          max-width: 760px;
          font-size: 15px;
          line-height: 1.7;
          opacity: 0.78;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 22px;
        }

        .revenueGrid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .tablesGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          margin-bottom: 22px;
        }

        .bottomGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .statCard,
        .card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 22px;
          backdrop-filter: blur(14px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.24);
        }

        .statCard {
          padding: 22px 24px;
        }

        .buttonCard {
          appearance: none;
          color: inherit;
          text-align: left;
          cursor: pointer;
          transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
        }

        .buttonCard:hover {
          transform: translateY(-1px);
          border-color: rgba(0, 194, 255, 0.2);
        }

        .buttonCard.isActive {
          border-color: rgba(0, 194, 255, 0.34);
          background: rgba(0, 194, 255, 0.08);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28), inset 0 0 0 1px rgba(0, 194, 255, 0.08);
        }

        .tableCard,
        .listCard,
        .errorCard {
          padding: 24px;
        }

        .statLabel {
          display: block;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          opacity: 0.62;
        }

        .statValue {
          display: block;
          margin-top: 10px;
          font-size: clamp(24px, 2.5vw, 36px);
          line-height: 1.08;
          font-weight: 600;
        }

        .cardHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }

        .cardHead h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.01em;
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

        .tableWrap {
          overflow-x: auto;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.015);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 420px;
        }

        th {
          text-align: left;
          padding: 16px 18px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          opacity: 0.62;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        td {
          padding: 16px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 14px;
        }

        tbody tr:hover td {
          background: rgba(255, 255, 255, 0.025);
        }

        .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
            'Courier New', monospace;
          font-size: 13px;
          opacity: 0.96;
        }

        .emptyCell {
          text-align: center;
          opacity: 0.68;
        }

        .muted {
          margin: 0;
          opacity: 0.72;
        }

        @media (max-width: 1100px) {
          .revenueGrid,
          .statsGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 980px) {
          .tablesGrid,
          .bottomGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .wrap {
            padding: 28px 14px 50px;
          }

          .revenueGrid,
          .statsGrid {
            grid-template-columns: 1fr;
          }

          .statCard,
          .tableCard,
          .listCard,
          .errorCard {
            padding: 18px;
          }

          .cardHead {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}