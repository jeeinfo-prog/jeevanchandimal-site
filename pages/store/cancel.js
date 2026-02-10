import Link from 'next/link'

export default function CancelPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px' }}>
      <h1>Payment canceled</h1>
      <p>No worries — you can try again anytime.</p>
      <p style={{ marginTop: 20 }}>
        <Link href="/store">
          <a style={{ textDecoration: 'underline' }}>Back to store</a>
        </Link>
      </p>
    </main>
  )
}
