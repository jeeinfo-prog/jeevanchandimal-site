import React from 'react'
import LegalSeo from '../components/LegalSeo'

export default function CookiesPolicy() {
  return (
    <>
      <LegalSeo
        title="Cookies Policy | Jeevan Chandimal"
        description="Cookies Policy explaining how JeevanChandimal.com uses cookies for functionality, analytics, security, and user experience."
        path="/cookies-policy"
      />

      <main className="wrap">
        <h1>Cookies Policy</h1>

        <p>
          This Cookies Policy explains how <strong>JeevanChandimal.com</strong> uses cookies
          and similar technologies to improve your browsing experience, analyze website
          traffic, and help keep the website secure.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website.
          They help websites remember information about your visit, such as preferences,
          session details, and usage activity.
        </p>

        <h2>How We Use Cookies</h2>
        <p>We may use cookies for the following purposes:</p>
        <ul>
          <li>Website functionality and performance</li>
          <li>Remembering user preferences</li>
          <li>Analytics and traffic measurement</li>
          <li>Security and fraud prevention</li>
          <li>Improving the overall user experience</li>
        </ul>

        <h2>Types of Cookies We May Use</h2>
        <ul>
          <li>
            <strong>Essential cookies</strong> – required for core website functionality
          </li>
          <li>
            <strong>Analytics cookies</strong> – help us understand how visitors use the site
          </li>
          <li>
            <strong>Security cookies</strong> – help protect accounts, sessions, and transactions
          </li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>
          Some features of our website may rely on trusted third-party services. For example,
          payment processing is handled securely by <strong>PayHere</strong>. We do not store
          your full card details on our servers.
        </p>

        <p>
          We may also use third-party tools for analytics, email delivery, hosting, storage,
          or security. These providers may use cookies or similar technologies as part of
          the services they provide.
        </p>

        <h2>Managing Cookies</h2>
        <p>
          You can control or disable cookies through your browser settings. Please note that
          disabling certain cookies may affect the functionality of some parts of the website.
        </p>

        <h2>Related Policies</h2>
        <p>
          Please review our{' '}
          <a href="/privacy-policy" className="link">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms-and-conditions" className="link">
            Terms & Conditions
          </a>{' '}
          for more information about how we handle data and website usage.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Cookies Policy, please contact:
        </p>

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