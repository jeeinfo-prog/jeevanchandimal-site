// pages/membership/success.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

export default function MembershipSuccess() {
  const router = useRouter()
  const { order_id, email } = router.query

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    if (typeof email === 'string' && email.trim()) {
      window.localStorage.setItem('user_email', email.trim().toLowerCase())
    }
  }, [email])

  return (
    <>
      <Head>
        <title>Membership Activated — Jeevan Chandimal</title>
        <meta name="description" content="Your membership payment was successful." />
      </Head>

      <JeevanChandimalNavi />

      <main className="thq-section-padding">
        <div className="thq-section-max-width" style={{ textAlign: 'center' }}>
          <h1 className="thq-heading-1">Payment Successful ✅</h1>
          <p className="thq-body-large" style={{ opacity: 0.9 }}>
            Your membership is now active.
          </p>

          {order_id ? (
            <p className="thq-body-small" style={{ opacity: 0.75 }}>
              Order ID: <span style={{ fontFamily: 'monospace' }}>{order_id}</span>
            </p>
          ) : null}

          <div
            style={{
              marginTop: 24,
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/store" className="thq-button-filled">
              Go to Store
            </Link>

            <Link href="/memberships" className="thq-button-outline">
              Back to Membership
            </Link>
          </div>
        </div>
      </main>

      <JeevanChandimalNewFooter />
    </>
  )
}
