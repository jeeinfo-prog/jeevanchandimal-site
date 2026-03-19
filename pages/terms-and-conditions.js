// pages/terms-and-conditions.js
import React from 'react'
import Head from 'next/head'

export default function TermsAndConditions() {
  const CANONICAL = 'https://jeevanchandimal.com/terms-and-conditions'

  return (
    <>
      <Head>
        <title>Terms & Conditions | Jeevan Chandimal</title>
        <meta
          name="description"
          content="Terms and Conditions for using JeevanChandimal.com and purchasing digital photography and licensing."
        />
        <link rel="canonical" href={CANONICAL} />

        {/* Open Graph */}
        <meta property="og:title" content="Terms & Conditions | Jeevan Chandimal" />
        <meta
          property="og:description"
          content="Terms and Conditions for using JeevanChandimal.com and purchasing digital photography and licensing."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms & Conditions | Jeevan Chandimal" />
        <meta
          name="twitter:description"
          content="Terms and Conditions for using JeevanChandimal.com and purchasing digital photography and licensing."
        />
      </Head>

      <main className="wrap">
        <h1>Terms & Conditions</h1>

        <p>
          Welcome to <strong>JeevanChandimal.com</strong>. By accessing this website and purchasing
          digital products, you agree to the following terms and conditions.
        </p>

        <h2>Use of Website</h2>
        <p>
          You agree to use this website only for lawful purposes. You must not use this website in
          any way that may damage, disable, or impair the website or interfere with other users.
        </p>

        <h2>Digital Products & Licensing</h2>
        <p>
          All products available on this website are digital downloads and are protected by
          copyright laws.
        </p>

        <ul>
          <li>You are granted a non-exclusive, non-transferable license</li>
          <li>You may not resell, redistribute, or share the files</li>
          <li>You must follow the license terms associated with each purchase</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>
          All content, including images, videos, and text, is the property of Jeevan Chandimal and
          is protected by copyright and intellectual property laws.
        </p>

        <h2>Payments</h2>
        <p>
          All payments are processed securely through third-party payment providers. By making a
          purchase, you agree to provide accurate billing information.
        </p>

        <h2>Refund Policy</h2>
        <p>
          Please refer to our Refund Policy page for detailed information regarding refunds and
          replacements.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          We are not liable for any damages arising from the use or inability to use our digital
          products, including but not limited to loss of data, business interruption, or financial
          loss.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these terms at any time without prior notice.
          Continued use of the website constitutes acceptance of the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions about these Terms & Conditions, please contact:
        </p>
        <p>
          📧 <strong>info@jeevanchandimal.com</strong>
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
      `}</style>
    </>
  )
}