import React from 'react'

export default function CookiesPolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-wrap">
        <h1>Cookies Policy</h1>
        <p className="legal-updated">Last updated: February 2026</p>

        <h2>1. What are cookies?</h2>
        <p>Cookies are small text files stored on your device to help websites function and improve user experience.</p>

        <h2>2. How we use cookies</h2>
        <p>We use cookies to maintain website functionality, remember preferences, analyze traffic, improve performance, and enhance security.</p>

        <h2>3. Types of cookies</h2>
        <ul>
          <li><strong>Essential cookies</strong> — required for core functionality like navigation and checkout.</li>
          <li><strong>Performance & Analytics</strong> — helps us understand usage to improve the site.</li>
          <li><strong>Functional cookies</strong> — remembers preferences like language/region.</li>
        </ul>

        <h2>4. Managing cookies</h2>
        <p>You can control or delete cookies in your browser settings. Disabling cookies may affect website functionality.</p>

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
        h1 { margin-bottom: 8px; }
        h2 { margin-top: 28px; }
        p, li { line-height: 1.8; }
        ul { margin-top: 10px; padding-left: 18px; }
      `}</style>
    </main>
  )
}
