import React from 'react'
import Head from 'next/head'

export default function AdminDownloads() {
  const [stats, setStats] = React.useState(null)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    fetch('/api/admin/download-stats')
      .then(async (r) => {
        const data = await r.json()
        if (!r.ok) throw new Error(data?.error || 'Failed to load stats')
        setStats(data)
      })
      .catch((e) => setError(e.message || 'Failed to load stats'))
  }, [])

  return (
    <>
      <Head>
        <title>Admin – Download Analytics</title>
      </Head>

      <main className="wrap">
        <div className="card">

          <h1 className="title">Download Analytics</h1>

          {error && <p className="error">{error}</p>}

          {!stats && !error && <p className="loading">Loading analytics...</p>}

          {stats && (
            <>
              <div className="statBox">
                <div className="statLabel">Total Downloads</div>
                <div className="statValue">{stats.totalDownloads}</div>
              </div>

              <h2 className="subtitle">Top Orders</h2>

              <div className="tableWrap">
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Downloads</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(stats.topOrders || []).map((o) => (
                      <tr key={o.orderId}>
                        <td className="mono">{o.orderId}</td>
                        <td>{o.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </div>
      </main>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          padding: 80px 24px;
          display: flex;
          justify-content: center;
          background:
            radial-gradient(circle at 20% 20%, rgba(0,180,255,0.05), transparent),
            radial-gradient(circle at 80% 30%, rgba(0,200,255,0.05), transparent),
            #0c0c0c;
        }

        .card {
          width: 100%;
          max-width: 1000px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }

        .title {
          font-size: 32px;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .subtitle {
          margin-top: 40px;
          margin-bottom: 16px;
          font-size: 20px;
          font-weight: 500;
        }

        .statBox {
          margin-top: 20px;
          padding: 20px 26px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          width: fit-content;
        }

        .statLabel {
          font-size: 14px;
          opacity: 0.7;
        }

        .statValue {
          font-size: 28px;
          font-weight: 600;
          margin-top: 4px;
        }

        .tableWrap {
          overflow-x: auto;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 14px 18px;
          font-size: 13px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          opacity: 0.6;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        td {
          padding: 14px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        tr:hover td {
          background: rgba(255,255,255,0.03);
        }

        .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 13px;
        }

        .loading {
          opacity: 0.7;
        }

        .error {
          color: #ff6b6b;
        }
      `}</style>
    </>
  )
}