import React from 'react'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-wrap">
        <div className="legal-topbar">
          <Link href="/">
            <a className="legal-back">← Back to Home</a>
          </Link>
          <div className="legal-mini-links">
            <Link href="/terms-and-conditions"><a className="legal-mini">Terms</a></Link>
            <Link href="/cookies-policy"><a className="legal-mini">Cookies</a></Link>
          </div>
        </div>

        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: February 2026</p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect personal information you provide (name, email, phone, billing/shipping details)
          and technical information (IP address, browser type, device info, pages visited).
        </p>

        <h2>2. Payments</h2>
        <p>
          Payments are processed securely through third-party payment gateways such as PayHere.
          We do not store or process your card details on our servers.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>
          We use your information to process orders, provide support, communicate with you, improve the
          website, and comply with legal obligations.
        </p>

        <h2>4. Cookies</h2>
        <p>
          We use cookies for essential site functions and analytics. See our Cookies Policy for more details.
        </p>

        <h2>5. Third Parties</h2>
        <p>
          We may use trusted third-party services (payment gateways, analytics, hosting/security). They receive
          only what’s necessary to provide their services.
        </p>

        <h2>6. Security</h2>
        <p>
          We take reasonable measures to protect your data, but no online system is 100% secure.
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

        .legal-back {
          text-decoration: none;
          font-weight: 600;
        }
        .legal-back:hover {
          color: var(--dl-color-theme-primary2);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .legal-mini-links {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .legal-mini {
          text-decoration: none;
          opacity: 0.9;
        }
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
