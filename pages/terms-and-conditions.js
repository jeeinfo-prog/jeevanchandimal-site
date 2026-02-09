import React from 'react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-wrap">
        <div className="legal-topbar">
          <Link href="/">
            <a className="legal-back">← Back to Home</a>
          </Link>
          <div className="legal-mini-links">
            <Link href="/privacy-policy"><a className="legal-mini">Privacy</a></Link>
            <Link href="/cookies-policy"><a className="legal-mini">Cookies</a></Link>
          </div>
        </div>

        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last updated: February 2026</p>

        <h2>1. Use of this website</h2>
        <p>
          By using this website, you agree not to misuse the site, attempt unauthorized access,
          or disrupt services.
        </p>

        <h2>2. Orders &amp; Payments</h2>
        <p>
          Product/service availability and pricing may change without notice. Payments are handled by
          third-party gateways (e.g., PayHere). We do not store card details.
        </p>

        <h2>3. Refunds</h2>
        <p>
          If refunds apply to a specific product/service, the refund rules will be shown on the relevant
          checkout or product page.
        </p>

        <h2>4. Intellectual property</h2>
        <p>
          All content on this website (text, images, video, branding) is owned by or licensed to us unless
          stated otherwise.
        </p>

        <h2>5. Limitation of liability</h2>
        <p>
          We are not liable for indirect losses or damages arising from the use of this website to the fullest
          extent allowed by law.
        </p>

        <h2>6. Changes</h2>
        <p>
          We may update these terms at any time. Updates will be posted on this page with a revised date.
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
        .legal-updated { opacity: 0.8; margin-top: 8px; }

        .legal-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0 24px 0;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          margin-bottom: 24px;
        }

        .legal-back { text-decoration: none; font-weight: 600; }
        .legal-back:hover {
          color: var(--dl-color-theme-primary2);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .legal-mini-links { display: flex; gap: 14px; align-items: center; }
        .legal-mini { text-decoration: none; opacity: 0.9; }
        .legal-mini:hover {
          color: var(--dl-color-theme-primary2);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        h1 { margin-bottom: 8px; }
        h2 { margin-top: 28px; }
        p { line-height: 1.8; }
      `}</style>
    </main>
  )
}
