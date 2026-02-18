import React from 'react'
import LegalSeo from '../components/LegalSeo'

export default function TermsAndConditions() {
  return (
    <>
      <LegalSeo
        title="Terms & Conditions | Jeevan Chandimal"
        description="Terms and Conditions for purchasing digital photography and licensing from JeevanChandimal.com."
        path="/terms-and-conditions"
      />

      <main className="wrap">
        <h1>Terms & Conditions</h1>

        <p>
          Welcome to <strong>JeevanChandimal.com</strong>. These Terms & Conditions govern
          your use of our website and the purchase of digital photography and licensing
          products from our platform. By accessing this website and making a purchase, you
          agree to comply with these terms.
        </p>

        <h2>Use of the Website</h2>
        <ul>
          <li>You must be at least 18 years old to make purchases from our website.</li>
          <li>
            You agree to provide accurate and complete information during checkout and
            communication.
          </li>
          <li>
            You may not use this website for any unlawful, fraudulent, or unauthorized
            purpose.
          </li>
        </ul>

        <h2>Digital Products & Licensing</h2>
        <ul>
          <li>
            All products sold on this website are digital files and usage licenses for
            photography.
          </li>
          <li>
            No physical items will be shipped. Files are delivered electronically via
            secure download links.
          </li>
          <li>
            When you purchase an image, you are granted a license to use the image
            according to the selected license type. Ownership and copyright remain with
            Jeevan Chandimal.
          </li>
          <li>
            You may not resell, redistribute, or share purchased files with third parties
            unless the license explicitly allows it.
          </li>
        </ul>

        <h2>Product Information & Pricing</h2>
        <ul>
          <li>
            We strive to ensure that all product descriptions, previews, and pricing are
            accurate.
          </li>
          <li>Prices are subject to change without prior notice.</li>
          <li>
            Any promotional offers are time-limited and may be withdrawn at any time.
          </li>
        </ul>

        <h2>Orders & Payments</h2>
        <ul>
          <li>
            By placing an order, you agree to purchase the selected digital product and
            license.
          </li>
          <li>
            Payments are processed securely via trusted third-party payment gateways such
            as <strong>PayHere</strong>. We do not store your card details.
          </li>
          <li>
            We reserve the right to cancel or refuse any order in cases of pricing errors,
            suspected fraud, or technical issues.
          </li>
        </ul>

        <h2>Delivery</h2>
        <ul>
          <li>
            Digital files are delivered via secure download links after successful
            payment.
          </li>
          <li>
            It is your responsibility to download and store the files after purchase.
          </li>
        </ul>

        <h2>Refunds</h2>
        <p>
          All refunds are handled according to our{' '}
          <a href="/refund-policy">Refund Policy</a>. Because our products are digital,
          refunds are only issued under specific circumstances such as corrupted files,
          incorrect delivery, or verified payment errors.
        </p>

        <h2>Intellectual Property</h2>
        <ul>
          <li>
            All images, content, logos, and materials on this website are the intellectual
            property of Jeevan Chandimal and are protected by copyright laws.
          </li>
          <li>
            You may not copy, reproduce, distribute, or use any content without a valid
            license or written permission.
          </li>
        </ul>

        <h2>Limitation of Liability</h2>
        <ul>
          <li>
            We are not liable for any indirect, incidental, or consequential damages
            arising from the use of our website or digital products.
          </li>
          <li>
            We do not guarantee that the website will always be error-free or
            uninterrupted.
          </li>
        </ul>

        <h2>Privacy</h2>
        <p>
          Your use of this website is also governed by our{' '}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these Terms & Conditions at any time. Any changes will be posted on
          this page with an updated effective date.
        </p>

        <h2>Contact</h2>
        <p>
          For any questions regarding these Terms & Conditions, please contact:
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

        a {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
