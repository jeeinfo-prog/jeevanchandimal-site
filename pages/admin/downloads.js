import React from 'react'
import Head from 'next/head'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'

export default function AdminDownloads() {
  const [stats, setStats] = React.useState(null)

  React.useEffect(() => {
    fetch('/api/admin/download-stats')
      .then((r) => r.json())
      .then((d) => setStats(d))
  }, [])

  if (!stats) return <p style={{ padding: 40 }}>Loading analytics...</p>

  return (
    <>
      <Head>
        <title>Admin Analytics</title>
      </Head>

      <main className="wrap">

        <h1 className="title">Download Analytics</h1>

        <div className="grid">

          <div className="card stat">
            <div className="label">Total Downloads</div>
            <div className="value">{stats.totalDownloads}</div>
          </div>

          <div className="card chart">
            <h3>Downloads per Day</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.downloadsPerDay}>
                <XAxis dataKey="date" stroke="#aaa"/>
                <YAxis stroke="#aaa"/>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#00c2ff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

          <div className="card chart">
            <h3>Top Orders</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topOrders}>
                <XAxis dataKey="orderId" hide />
                <YAxis stroke="#aaa"/>
                <Tooltip />
                <Bar dataKey="count" fill="#00c2ff"/>
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </main>

      <style jsx>{`
        .wrap {
          min-height:100vh;
          padding:60px;
          background:#0c0c0c;
        }

        .title{
          font-size:32px;
          margin-bottom:40px;
        }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:30px;
        }

        .card{
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:16px;
          padding:30px;
        }

        .stat{
          grid-column: span 2;
          text-align:center;
        }

        .label{
          opacity:.7;
        }

        .value{
          font-size:48px;
          font-weight:600;
        }

        .chart h3{
          margin-bottom:20px;
        }
      `}</style>
    </>
  )
}