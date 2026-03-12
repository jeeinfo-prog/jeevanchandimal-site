// pages/admin/downloads.js
import React from 'react'

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

  if (error) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Download Analytics</h1>
        <p>{error}</p>
      </div>
    )
  }

  if (!stats) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Download Analytics</h1>
        <p>Loading stats...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Download Analytics</h1>

      <h2>Total Downloads</h2>
      <p>{stats.totalDownloads}</p>

      <h2>Top Orders</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order</th>
            <th>Downloads</th>
          </tr>
        </thead>
        <tbody>
          {(stats.topOrders || []).map((o) => (
            <tr key={o.orderId}>
              <td>{o.orderId}</td>
              <td>{o.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}