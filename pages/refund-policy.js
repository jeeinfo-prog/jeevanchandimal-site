import Head from 'next/head'
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function RefundPolicy() {
  return (
    <>
      <Head>
        <title>Refund Policy | Jeevan Chandimal</title>
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <h1>Refund Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <p>
          All products sold on this website are digital downloads and licensing rights
          for photographs. No physical items are shipped.
        </p>

        <h2>No Returns on Digital Downloads</h2>
        <p>
          Due to the nature of digital products, all sales are final once the download
          link or license access has been delivered.
        </p>

        <h2>Duplicate or Failed Payments</h2>
        <p>
          If you are charged multiple times for the same order, please contact us
          within 7 days. Verified duplicate payments will be fully refunded.
        </p>

        <h2>Technical Issues</h2>
        <p>
          If you receive a corrupted file or cannot download your purchase, we will
          provide a replacement or a full refund if the issue cannot be resolved.
        </p>

        <h2>Unauthorized Transactions</h2>
        <p>
          If you believe a payment was made fraudulently, contact us immediately.
        </p>

        <h2>Processing Time</h2>
        <p>
          Approved refunds will be processed within 5–10 business days via the original
          payment method.
        </p>

        <h2>Contact</h2>
        <p>Email: support@jeevanchandimal.com</p>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
          line-height: 1.7;
        }
      `}</style>
    </>
  )
}
