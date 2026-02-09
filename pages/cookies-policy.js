import React from 'react'

export default function CookiesPolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-wrap">
        <h1>Cookies Policy</h1>
        <p className="legal-updated">Last updated: February 2026</p>

        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help websites function
          properly and improve user experience.
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>
          We use cookies to maintain website functionality, remember preferences, analyze traffic, improve performance,
          and enhance security.
        </p>

        <h2>3. Types of Cookies We Use</h2>
        <ul>
          <li>
            <strong>Essential Cookies</strong> — required for core functionality (navigation, secure areas, cart/checkout)
          </li>
          <li>
            <strong>Performance &amp; Analytics Cookies</strong> — help us understand usage so we can improve the website
          </li>
          <li>
            <strong>Functional Cookies</strong> — remember preferences like language or region
          </li>
        </ul>

        <h2>4. Third-Party Cookies</h2>
        <p>
          Some cookies may be set by third-party services we use (payment gateways, analytics providers, embedded
          content). We do not control these cookies directly.
        </p>

        <h2>5. Managing Cookies</h2>
        <p>
          You can control or delete cookies through your browser settings. Disabling cookies may affect website
          functionality.
        </p>

        <h2>6. Contact</h2>
        <p>
          Jeevan Chandimal
          <br />
          Website: https://jeevanchandimal.com
          <br />
          Email: contact@jeevanchandimal.com
        </p>
      </div>

      <style jsx>{`
        .legal-page {
          padding: 80px 20px;
        }
        .legal-wrap {
          max-width: 900px;
          margin: 0 auto;
        }
        .legal-updated {
          opacity: 0.8;
          margin-top: 8px;
          margin-bottom: 24px;
        }
        h1 {
          margin-bottom: 8px;
        }
        h2 {
          margin-top: 28px;
        }
        p,
        li {
          line-height: 1.8;
        }
        ul {
          margin-top: 10px;
          padding-left: 18px;
        }
      `}</style>
    </main>
  )
}
