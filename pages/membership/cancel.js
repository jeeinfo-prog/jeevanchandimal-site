import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

export default function MembershipCancel() {
  const router = useRouter()
  const { order_id } = router.query

  return (
    <>
      <Head>
        <title>Payment Cancelled — Jeevan Chandimal</title>
        <meta name="description" content="Your membership payment was cancelled." />
      </Head>

      <JeevanChandimalNavi />

      <main className="thq-section-padding">
        <div className="thq-section-max-width" style={{ textAlign: 'center' }}>
          <h1 className="thq-heading-1">Payment Cancelled</h1>
          <p className="thq-body-large" style={{ opacity: 0.9 }}>
            No worries — you can try again anytime.
          </p>

          {order_id ? (
            <p className="thq-body-small" style={{ opacity: 0.75 }}>
              Order ID: <span style={{ fontFamily: 'monospace' }}>{order_id}</span>
            </p>
          ) : null}

          <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/memberships">
              <a className="thq-button-filled">Try Again</a>
            </Link>
            <Link href="/contact">
              <a className="thq-button-outline">Contact</a>
            </Link>
          </div>
        </div>
      </main>

      <JeevanChandimalNewFooter />
    </>
  )
}
