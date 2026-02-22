import React from 'react'
import Head from 'next/head'
import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

export default function DownloadsPage() {
  const [orders, setOrders] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [busyId, setBusyId] = React.useState(null)

  const email =
    typeof window !== 'undefined' ? localStorage.getItem('user_email') : null

  React.useEffect(() => {
    if (!email) {
      setError('Please log in to view your downloads.')
      setLoading(false)
      return
    }

    async function load() {
      try {
        const r = await fetch(`/api/orders?email=${encodeURIComponent(email)}`)
        const data = await r.json()

        if (!data?.ok) {
          setError(data?.error || 'Failed to load orders')
          setOrders([])
        } else {
          setOrders(data.orders || [])
        }
      } catch {
        setError('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [email])

  async function handleDownload(item) {
    try {
      setBusyId(item.id)

      const r = await fetch('/api/download/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: item.order_id, photoId: item.photo_id }),
      })

      const data = await r.json()
      if (!data?.ok || !data?.url) {
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

  return (
    <>
      <Head>
        <title>My Downloads | Jeevan Chandimal</title>
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <h1>My Downloads</h1>

        {loading && <p>Loading…</p>}
        {!loading && error && <p className="error">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p>No purchases yet.</p>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="list">
            {orders.map((o) => (
              <div key={o.id} className="card">
                <div className="meta">
                  <div className="title">{o.title || 'Photo'}</div>
                  <div className="sub">
                    Order: {o.order_id} • {o.format?.toUpperCase()}
                  </div>
                </div>

                <button
                  className="btn"
                  disabled={busyId === o.id}
                  onClick={() => handleDownload(o)}
                >
                  {busyId === o.id ? 'Preparing…' : 'Download'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }

        h1 {
          margin-bottom: 20px;
        }

        .list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
        }

        .title {
          font-weight: 600;
        }

        .sub {
          font-size: 12px;
          opacity: 0.75;
          margin-top: 4px;
        }

        .btn {
          border: 1px solid rgba(245, 244, 244, 0.2);
          padding: 10px 16px;
          border-radius: 999px;
          background: transparent;
          cursor: pointer;
        }

        .btn:hover {
          background: rgba(245, 244, 244, 0.08);
        }

        .error {
          color: #ff6b6b;
        }
      `}</style>
    </>
  )
}