import React from 'react'
import Head from 'next/head'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

function formatMoney(v) {
  const n = Number(v || 0)
  return `$${n.toFixed(2)}`
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

function ChartTooltip({ active, payload, label, money = false }) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="tooltipBox">
      <div className="tooltipLabel">{formatShortDate(label)}</div>
      <div className="tooltipValue">
        {money ? formatMoney(payload[0]?.value) : payload[0]?.value}
      </div>

      <style jsx>{`
        .tooltipBox {
          background: rgba(12, 12, 12, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 10px 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
        }
        .tooltipLabel {
          font-size: 12px;
          opacity: 0.7;
          margin-bottom: 4px;
        }
        .tooltipValue {
          font-size: 14px;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default function AdminDownloads() {
  const [stats, setStats] = React.useState(null)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    let alive = true

    async function load() {
      try {
        const r = await fetch('/api/admin/download-stats')
        const data = await r.json().catch(() => ({}))

        if (!r.ok || data?.ok === false) {
          throw new Error(data?.error || 'Failed to load analytics')
        }

        if (alive) setStats(data)
      } catch (e) {
        if (alive) setError(e?.message || 'Failed to load analytics')
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [])

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
            <div>
              <p className="eyebrow">Admin dashboard</p>
              <h1 className="title">Store Analytics</h1>
              <p className="sub">
                Revenue, orders, downloads, and top-performing assets in one place.
              </p>
            </div>
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
              <section className="statsGrid">
                <div className="statCard">
                  <span className="statLabel">Revenue</span>
                  <strong className="statValue">{formatMoney(stats.totalRevenue)}</strong>
                </div>

                <div className="statCard">
                  <span className="statLabel">Paid Orders</span>
                  <strong className="statValue">{stats.totalOrders}</strong>
                </div>

                <div className="statCard">
                  <span className="statLabel">Downloads</span>
                  <strong className="statValue">{stats.totalDownloads}</strong>
                </div>
              </section>

              <section className="chartsGrid">
                <div className="card chartCard">
                  <div className="cardHead">
                    <h2>Revenue Trend</h2>
                    <span className="pill">Per day</span>
                  </div>

                  <div className="chartWrap">
                    <ResponsiveContainer width="100%" height={320}>
                      <LineChart data={stats.revenuePerDay || []}>
                        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickFormatter={formatShortDate}
                          tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tickFormatter={(v) => `$${v}`}
                          tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<ChartTooltip money />} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#00c2ff"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="card chartCard">
                  <div className="cardHead">
                    <h2>Top Orders</h2>
                    <span className="pill">By downloads</span>
                  </div>

                  <div className="chartWrap">
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={stats.topOrders || []}>
                        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis
                          dataKey="orderId"
                          hide
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="count" fill="#00c2ff" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              <section className="card tableCard">
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
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 22px;
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
          font-size: clamp(28px, 3vw, 40px);
          line-height: 1.05;
          font-weight: 600;
        }

        .chartsGrid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 22px;
          margin-bottom: 22px;
        }

        .chartCard,
        .tableCard,
        .errorCard {
          padding: 24px;
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

        .chartWrap {
          width: 100%;
          height: 320px;
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
          min-width: 520px;
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

        @media (max-width: 980px) {
          .statsGrid {
            grid-template-columns: 1fr;
          }

          .chartsGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .wrap {
            padding: 28px 14px 50px;
          }

          .statCard,
          .chartCard,
          .tableCard,
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