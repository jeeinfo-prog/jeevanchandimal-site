import React from 'react'

export default function TermsAndConditionsPage() {
  return (
    <main className="legal-page">
      <div className="legal-wrap">
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last updated: February 2026</p>

        <h2>1. Use of this Website</h2>
        <p>
          By using this website, you agree not to misuse the site, attempt unauthorized access, or disrupt services.
        </p>

        <h2>2. Orders &amp; Payments</h2>
        <p>
          Product/service availability and pricing may change without notice. Payments are handled by third-party
          gateways (e.g., PayHere). We do not store card details.
        </p>

        <h2>3. Refunds</h2>
        <p>
          If refunds apply to a specific product/service, refund rules will be shown on the relevant product page,
          invoice, or checkout page.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All content on this website (text, images, video, branding) is owned by or licensed to us unless stated
          otherwise.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          To the fullest extent allowed by law, we are not liable for indirect or incidental losses arising from the use
          of this website.
        </p>

        <h2>6. Changes</h2>
        <p>
          We may update these Terms &amp; Conditions from time to time. Any changes will be posted on this page with an
          updated date.
        </p>

        <h2>7. Contact</h2>
        <p>
          Jeevan Chandimal<br />
          Website: https://jeevanchandimal.com<br />
          Email: contact@jeevanchandimal.com
        </p>
      </div>

      <style jsx>{`
        .legal-page { padding: 80px 20px; }
        .legal-wrap { max-width: 900px; margin: 0 auto; }
        .legal-updated { opacity: 0.8; margin: 8px 0 24px; }
        h2 { margin-top: 28px; }
        p { line-height: 1.8; }
      `}</style>
    </main>
  )
}
