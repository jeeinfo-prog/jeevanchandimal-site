import React from 'react'
import Head from 'next/head'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function AdminDownloads() {

  const [stats, setStats] = React.useState(null)

  React.useEffect(() => {
    fetch('/api/admin/download-stats')
      .then(r => r.json())
      .then(setStats)
  }, [])

  if (!stats) {
    return <div style={{padding:40}}>Loading analytics...</div>
  }

  return (
    <>
      <Head>
        <title>Admin Analytics</title>
      </Head>

      <main className="wrap">

        <h1 className="title">Store Analytics</h1>

        <div className="stats">

          <div className="card">
            <div className="label">Revenue</div>
            <div className="value">${stats.totalRevenue}</div>
          </div>

          <div className="card">
            <div className="label">Orders</div>
            <div className="value">{stats.totalOrders}</div>
          </div>

          <div className="card">
            <div className="label">Downloads</div>
            <div className="value">{stats.totalDownloads}</div>
          </div>

        </div>

        <div className="grid">

          <div className="chart">
            <h3>Revenue Trend</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.revenuePerDay}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Line dataKey="value" stroke="#00c2ff"/>
              </LineChart>
            </ResponsiveContainer>

          </div>

          <div className="chart">
            <h3>Top Orders</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topOrders}>
                <XAxis dataKey="orderId" hide/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="count" fill="#00c2ff"/>
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </main>

      <style jsx>{`

        .wrap{
          min-height:100vh;
          padding:60px;
          background:#0c0c0c;
        }

        .title{
          font-size:32px;
          margin-bottom:40px;
        }

        .stats{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:20px;
          margin-bottom:40px;
        }

        .card{
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:16px;
          padding:30px;
          text-align:center;
        }

        .label{
          opacity:.7;
        }

        .value{
          font-size:36px;
          margin-top:6px;
          font-weight:600;
        }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:30px;
        }

        .chart{
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:16px;
          padding:30px;
        }

      `}</style>
    </>
  )
}