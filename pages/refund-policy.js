// pages/refund-policy.js
import React from 'react'
import Head from 'next/head'

export default function RefundPolicy() {
  const CANONICAL = 'https://jeevanchandimal.com/refund-policy'

  return (
    <>
      <Head>
        <title>Refund Policy | Jeevan Chandimal</title>
        <meta
          name="description"
          content="Refund Policy for digital photography purchases and licensing at JeevanChandimal.com."
        />
        <link rel="canonical" href={CANONICAL} />

        {/* Open Graph */}
        <meta property="og:title" content="Refund Policy | Jeevan Chandimal" />
        <meta
          property="og:description"
          content="Refund Policy for digital photography purchases and licensing at JeevanChandimal.com."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Refund Policy | Jeevan Chandimal" />
        <meta
          name="twitter:description"
          content="Refund Policy for digital photography purchases and licensing at JeevanChandimal.com."
        />
      </Head>

      <main className="wrap">
        <h1>Refund Policy</h1>

        <p>
          Thank you for purchasing from <strong>JeevanChandimal.com</strong>. We provide
          high-quality digital photography and licensing services. Because our products are
          digital downloads, our refund policy differs from physical goods.
        </p>

        <h2>Digital Product Refunds</h2>
        <p>
          All purchases are for digital files and licensing rights. Once a file has been
          successfully delivered or downloaded, the sale is considered final and non-refundable.
        </p>

        <p>We do not offer refunds for:</p>
        <ul>
          <li>Change of mind after purchase</li>
          <li>Accidental purchases</li>
          <li>Incorrect license selection</li>
          <li>Incompatibility with software or devices</li>
          <li>Failure to read product details before purchase</li>
        </ul>

        <h2>Exceptions (Eligible for Refund or Replacement)</h2>
        <p>A refund or replacement may be provided only if:</p>
        <ul>
          <li>The purchased file is corrupted or cannot be opened</li>
          <li>You received the wrong file</li>
          <li>The file fails to download due to a verified system error</li>
        </ul>

        <p>
          In such cases, you must contact us within <strong>3 days</strong> of purchase with:
        </p>
        <ul>
          <li>Your order ID</li>
          <li>A description of the issue</li>
          <li>Screenshots (if applicable)</li>
        </ul>

        <p>
          We will first attempt to re-deliver a correct working file. If the issue cannot be
          resolved, a refund will be issued to the original payment method.
        </p>

        <h2>Duplicate Payments</h2>
        <p>
          If you were charged more than once for the same order due to a payment error, the
          duplicate amount will be refunded.
        </p>

        <h2>Processing Time</h2>
        <p>
          Approved refunds will be processed within <strong>5–10 business days</strong>. The time
          taken for the refund to appear depends on your payment provider.
        </p>

        <h2>License Usage</h2>
        <p>Refunds will not be granted if the downloaded image has already been:</p>
        <ul>
          <li>Used in any published work</li>
          <li>Shared publicly</li>
          <li>Distributed to third parties</li>
        </ul>

        <p>As licensing rights are granted immediately upon delivery.</p>

        <h2>Related Policies</h2>
        <p>
          Please review our{' '}
          <a href="/terms-and-conditions" className="link">
            Terms & Conditions
          </a>{' '}
          for additional information about usage and licensing.
        </p>

        <h2>Contact Us</h2>
        <p>If you experience any issues with your purchase, please contact:</p>

        <p>
          📧{' '}
          <a href="mailto:info@jeevanchandimal.com" className="link">
            info@jeevanchandimal.com
          </a>
        </p>

        <p>
          or visit our{' '}
          <a href="/contact" className="link">
            Contact Page
          </a>
        </p>
      </main>

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 20px 100px;
          line-height: 1.7;
        }

        h1 {
          margin-bottom: 20px;
        }

        h2 {
          margin-top: 30px;
          margin-bottom: 10px;
        }

        ul {
          margin-left: 20px;
          margin-top: 10px;
        }

        li {
          margin-bottom: 6px;
        }

        .link {
          text-decoration: underline;
          opacity: 0.9;
        }

        .link:hover {
          opacity: 1;
        }
      `}</style>
    </>
  )
}