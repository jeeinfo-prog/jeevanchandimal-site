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
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

export default function AdminDownloads() {

  const [stats, setStats] = React.useState(null)
  const [error, setError] = React.useState('')
  const [activeCurrency, setActiveCurrency] = React.useState('')
  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    let alive = true

    async function load() {
      try {

        const r = await fetch('/api/admin/download-stats')
        const data = await r.json()

        if (!r.ok || data?.ok === false) {
          throw new Error(data?.error || 'Failed to load analytics')
        }

        if (!alive) return

        setStats(data)
        setOrders(data.orders || [])

        const firstCurrency =
          data?.revenueByCurrency?.length
            ? data.revenueByCurrency[0].currency
            : ''

        setActiveCurrency(firstCurrency)

      } catch (e) {
        if (alive) setError(e.message)
      }
    }

    load()
    return () => { alive = false }

  }, [])

  function logout() {
    window.location.href = '/admin/logout'
  }

  const revenueCards = stats?.revenueByCurrency || []
  const revenueSeries = stats?.revenuePerDayByCurrency?.[activeCurrency] || []

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <main className="wrap">

        <div className="header">
          <h1>Store Analytics</h1>
          <button className="logout" onClick={logout}>Logout</button>
        </div>

        {error && <p>{error}</p>}

        {!stats ? (
          <p>Loading analytics...</p>
        ) : (
          <>

{/* Revenue Cards */}

<section className="statsGrid">

{revenueCards.map((item) => (

<button
key={item.currency}
className={`statCard ${activeCurrency === item.currency ? 'active' : ''}`}
onClick={() => setActiveCurrency(item.currency)}
>

<span>{item.currency}</span>

<strong>{formatMoney(item.total, item.currency)}</strong>

</button>

))}

<div className="statCard">
<span>Paid Orders</span>
<strong>{stats.totalOrders}</strong>
</div>

<div className="statCard">
<span>Downloads</span>
<strong>{stats.totalDownloads}</strong>
</div>

</section>


{/* Revenue Per Day */}

<section className="card">

<h2>Revenue Per Day ({activeCurrency})</h2>

{revenueSeries.map(item => (

<div className="row" key={item.date}>

<span>{formatShortDate(item.date)}</span>

<strong>{formatMoney(item.value, activeCurrency)}</strong>

</div>

))}

</section>


{/* Recent Orders */}

<section className="card">

<h2>Recent Orders</h2>

<table>

<thead>
<tr>
<th>Photo</th>
<th>Order ID</th>
<th>Image ID</th>
<th>Amount</th>
<th>Downloads</th>
<th>Date</th>
</tr>
</thead>

<tbody>

{orders.map(o => (

<tr key={o.orderId}>

<td>
{o.thumbnail && (
<img src={o.thumbnail} className="thumb"/>
)}
</td>

<td>{o.orderId}</td>

<td>{o.photoId}</td>

<td>{formatMoney(o.amount,o.currency)}</td>

<td>{o.downloads}</td>

<td>{formatShortDate(o.date)}</td>

</tr>

))}

</tbody>

</table>

</section>

          </>
        )}

      </main>


<style jsx>{`

.wrap{
max-width:1200px;
margin:auto;
padding:40px;
color:white;
background:#0b0b0d;
min-height:100vh;
}

.header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:30px;
}

.logout{
background:#ff4444;
border:none;
padding:10px 18px;
border-radius:8px;
color:white;
cursor:pointer;
}

.statsGrid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:16px;
margin-bottom:30px;
}

.statCard{
background:#121214;
padding:20px;
border-radius:12px;
border:1px solid rgba(255,255,255,.08);
cursor:pointer;
}

.statCard.active{
border-color:#00c2ff;
}

.card{
background:#121214;
padding:24px;
border-radius:14px;
margin-bottom:30px;
}

.row{
display:flex;
justify-content:space-between;
padding:6px 0;
}

table{
width:100%;
border-collapse:collapse;
}

th,td{
padding:12px;
border-bottom:1px solid rgba(255,255,255,.1);
text-align:left;
}

.thumb{
width:60px;
height:60px;
object-fit:cover;
border-radius:6px;
}

`}</style>

    </>
  )
}