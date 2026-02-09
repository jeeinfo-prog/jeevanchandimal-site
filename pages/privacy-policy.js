import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-wrap">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: February 2026</p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect personal information you provide (name, email, phone, billing/shipping details) and technical
          information (IP address, browser type, device info, pages visited).
        </p>

        <h2>2. Payments</h2>
        <p>
          Payments on this website are processed securely through third-party payment gateways such as PayHere. We do not
          store or process your card details on our servers.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>
          We use your information to process orders, provide support, communicate with you, improve the website, and
          comply with legal obligations.
        </p>

        <h2>4. Cookies</h2>
        <p>
          We use cookies and similar technologies to maintain website functionality, analyze traffic, improve
          performance, and enhance security. Please see our Cookies Policy for details.
        </p>

        <h2>5. Third-Party Services</h2>
        <p>
          We may use trusted third-party services (payment gateways, analytics providers, hosting and security tools).
          These third parties only receive the information necessary to perform their services and are required to
          protect your data.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We take reasonable technical and organizational measures to protect your personal data. However, no online
          system can be guaranteed to be 100% secure.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, or delete your personal data, and withdraw
          consent where applicable.
        </p>

        <h2>8. Contact</h2>
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
        p {
          line-height: 1.8;
        }
      `}</style>
    </main>
  )
}
