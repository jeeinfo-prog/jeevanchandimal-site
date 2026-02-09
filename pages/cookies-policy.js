import React from 'react'
import Link from 'next/link'

export default function CookiesPolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-wrap">
        <div className="legal-topbar">
          <Link href="/">
            <a className="legal-back">← Back to Home</a>
          </Link>
          <div className="legal-mini-links">
            <Link href="/privacy-policy"><a className="legal-mini">Privacy</a></Link>
            <Link href="/terms-and-conditions"><a className="legal-mini">Terms</a></Link>
          </div>
        </div>

        <h1>Cookies Policy</h1>
        <p className="legal-updated">Last updated: February 2026</p>

        <h2>1. What are cookies?</h2>
        <p>
          Cookies are small text files stored on your device to help websites function and improve user experience.
        </p>

        <h2>2. How we use cookies</h2>
        <p>
          We use cookies to maintain website functionality, remember preferences, analyze traffic, improve performance,
          and enhance security.
        </p>

        <h2>3. Types of cookies</h2>
        <ul>
          <li><strong>Essential cookies</strong> — required for core functionality like navigation and checkout.</li>
          <li><strong>Performance &amp; Analytics</strong> — helps us understand usage to improve the site.</li>
          <li><strong>Functional cookies</strong> — remembers preferences like language/region.</li>
        </ul>

        <h2>4. Managing cookies</h2>
        <p>
          You can control or delete cookies in your browser settings. Disabling cookies may affect website functionality.
        </p>

        <h2>5. Contact</h2>
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
        p, li { line-height: 1.8; }
        ul { margin-top: 10px; padding-left: 18px; }
      `}</style>
    </main>
  )
}
