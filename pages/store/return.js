import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ReturnPage() {
  const router = useRouter()
  const orderId = router.query.order_id

  const [status, setStatus] = React.useState('CHECKING')
  const [downloadUrl, setDownloadUrl] = React.useState('')

  React.useEffect(() => {
    if (!orderId) return
    let alive = true

    async function run() {
      for (let i = 0; i < 10; i++) {
        const r = await fetch(`/api/orders/${orderId}`)
        if (!r.ok) {
          setStatus('NOT_FOUND')
          return
        }
        const data = await r.json()
        if (!alive) return

        if (data.status === 'PAID') {
          setStatus('PAID')

          const t = await fetch('/api/download/create-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
          })
          const tok = await t.json()
          if (tok.token) {
            setDownloadUrl(`/api/download/file?token=${encodeURIComponent(tok.token)}`)
          }
          return
        }

        if (data.status === 'FAILED') {
          setStatus('FAILED')
          return
        }
        if (data.status === 'CANCELED') {
          setStatus('CANCELED')
          return
        }

        setStatus('PENDING')
        await new Promise((r) => setTimeout(r, 2000))
      }

      setStatus('PENDING')
    }

    run()
    return () => {
      alive = false
    }
  }, [orderId])

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px' }}>
      <h1>Payment status</h1>

      {status === 'CHECKING' && <p>Checking your payment…</p>}
      {status === 'PENDING' && <p>Payment is still processing. Refresh in a moment.</p>}
      {status === 'PAID' && (
        <>
          <p>Payment confirmed ✅</p>
          {downloadUrl ? (
            <p>
              <a href={downloadUrl} style={{ textDecoration: 'underline' }}>
                Download your file
              </a>{' '}
              (expires soon)
            </p>
          ) : (
            <p>Preparing secure download…</p>
          )}
        </>
      )}
      {status === 'FAILED' && <p>Payment failed ❌</p>}
      {status === 'CANCELED' && <p>Payment canceled.</p>}
      {status === 'NOT_FOUND' && <p>Order not found.</p>}

      <p style={{ marginTop: 20 }}>
        <Link href="/store">
          <a style={{ textDecoration: 'underline' }}>Back to store</a>
        </Link>
      </p>
    </main>
  )
}
