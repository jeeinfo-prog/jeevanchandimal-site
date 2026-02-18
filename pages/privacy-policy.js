import React from 'react'
import LegalSeo from '../components/LegalSeo'

export default function PrivacyPolicy() {
  return (
    <>
      <LegalSeo
        title="Privacy Policy | Jeevan Chandimal"
        description="Privacy Policy explaining how JeevanChandimal.com collects, uses, and protects customer data."
        path="/privacy-policy"
      />

      <main className="wrap">
        <h1>Privacy Policy</h1>

        <p>
          At <strong>JeevanChandimal.com</strong>, we are committed to protecting your
          privacy and safeguarding your personal information. This Privacy Policy explains
          how we collect, use, and protect your data when you visit our website or purchase
          digital photography and licensing services from us.
        </p>

        <h2>Information We Collect</h2>
        <p>When you use our website, we may collect the following information:</p>
        <ul>
          <li>
            Personal information such as your name and email address provided during
            checkout or when contacting us.
          </li>
          <li>
            Payment details required to process your order. Payments are securely handled
            by third-party payment processors such as <strong>PayHere</strong>. We do not
            store your full card details.
          </li>
          <li>
            Order and licensing information related to the digital products you purchase.
          </li>
          <li>
            Technical data such as your IP address, browser type, device information, and
            usage data collected through cookies and analytics tools.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Process and deliver your digital downloads and licenses</li>
          <li>Send purchase confirmations and secure download links via email</li>
          <li>Provide customer support and respond to inquiries</li>
          <li>Improve our website, services, and user experience</li>
          <li>Prevent fraud, unauthorized transactions, and misuse of our content</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We do not sell or rent your personal data. We may share your information only
          with trusted third parties who help us operate our business, including:
        </p>
        <ul>
          <li>
            <strong>PayHere</strong> – to securely process payments
          </li>
          <li>
            <strong>Email delivery providers (e.g., Resend)</strong> – to send receipts
            and download links
          </li>
          <li>
            <strong>
              Cloud storage and database providers (e.g., Supabase, Cloudflare R2)
            </strong>{' '}
            – to store product files and order records securely
          </li>
        </ul>

        <p>
          These providers are required to protect your data and use it only for the
          services they provide. We may also disclose information if required by law or
          to protect our legal rights.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your personal data
          from unauthorized access, alteration, or disclosure. However, no method of
          transmission over the internet is 100% secure, and we cannot guarantee absolute
          security.
        </p>

        <h2>Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar technologies to enhance your browsing experience,
          analyze website traffic, and understand user behavior. You can disable cookies
          in your browser settings, but some features of the website may not function
          properly.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your order and contact information only as long as necessary to
          provide your digital downloads, maintain transaction records, and comply with
          legal obligations.
        </p>

        <h2>Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data by
          contacting us at the email below.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted
          on this page with an updated effective date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or how your data is handled,
          please contact:
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
