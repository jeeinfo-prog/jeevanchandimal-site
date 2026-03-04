// pages/license.js
import React from 'react'
import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'
import LegalSeo from '../components/LegalSeo'

export default function License() {
  return (
    <>
      <LegalSeo
        title="License Agreement | Jeevan Chandimal"
        description="License Agreement for digital photography downloads and usage at JeevanChandimal.com."
        path="/license"
      />

      <JeevanChandimalNavi />

      <main className="wrap">
        <header className="hero">
          <h1>License Agreement</h1>
          <p className="sub">
            This License Agreement explains how you may use images downloaded or purchased from{' '}
            <strong>JeevanChandimal.com</strong>. By downloading, purchasing, or using any image,
            you agree to these terms.
          </p>

          <div className="topLinks" aria-label="Quick links">
            <a className="pill" href="#license-types">
              License Types
            </a>
            <a className="pill" href="#permitted-use">
              Permitted Use
            </a>
            <a className="pill" href="#restrictions">
              Restrictions
            </a>
            <a className="pill" href="#credits">
              Credit
            </a>
            <a className="pill" href="#refunds">
              Refunds
            </a>
            <a className="pill" href="#contact">
              Contact
            </a>
          </div>
        </header>

        <section className="card">
          <h2 id="license-types">1) License Types</h2>
          <p>
            Licenses are granted per image and may be included via membership, or purchased
            individually. The applicable license for your use is the one selected at checkout (or
            assigned by your membership plan).
          </p>

          <div className="grid">
            <div className="box">
              <h3>Personal</h3>
              <ul>
                <li>Personal projects and non-commercial use</li>
                <li>Social posting (non-sponsored)</li>
                <li>Wall art / prints for personal display</li>
              </ul>
            </div>

            <div className="box">
              <h3>Editorial</h3>
              <ul>
                <li>News, blogs, documentary, education</li>
                <li>Magazine / article illustration</li>
                <li>
                  Must not imply endorsement by people/brands unless you have explicit permission
                </li>
              </ul>
            </div>

            <div className="box">
              <h3>Commercial</h3>
              <ul>
                <li>Advertising, marketing, promotional use</li>
                <li>Brand campaigns, agency work</li>
                <li>Web, social, print, and broadcast promos</li>
              </ul>
            </div>
          </div>

          <p className="note">
            Note: Some images may contain recognizable people, property, trademarks, or artwork.
            You are responsible for obtaining any additional releases required for your specific
            use case.
          </p>
        </section>

        <section className="card">
          <h2 id="permitted-use">2) Permitted Use</h2>
          <p>You may:</p>
          <ul>
            <li>Use the image in projects consistent with the license you selected</li>
            <li>Resize, crop, and color grade the image for your project needs</li>
            <li>Use in digital and print formats (web, social, editorial, brochures, posters)</li>
            <li>Use in client work if your license or membership plan allows it</li>
          </ul>

          <p className="note">
            Membership users may download and use images according to the active plan limits and
            license scope shown on the Membership page.
          </p>
        </section>

        <section className="card">
          <h2 id="restrictions">3) Restrictions</h2>
          <p>You may not:</p>
          <ul>
            <li>Resell, redistribute, or give away the original file (or near-original copy)</li>
            <li>Upload the file to stock sites, marketplaces, or “free download” platforms</li>
            <li>Use in logos, trademarks, or as a primary brand mark</li>
            <li>
              Use in illegal, defamatory, hateful, or pornographic content, or otherwise harmful
              contexts
            </li>
            <li>
              Claim authorship or register copyright ownership of the image (ownership remains with
              Jeevan Chandimal)
            </li>
            <li>
              Share membership download access with others (each membership is for one account /
              email)
            </li>
          </ul>
        </section>

        <section className="card">
          <h2>4) Delivery, Downloads, and File Handling</h2>
          <ul>
            <li>Downloads are delivered via secure links and may have limits for security</li>
            <li>Keep backups of your purchased files</li>
            <li>
              If you experience download problems, contact support with your Order ID for
              re-delivery
            </li>
          </ul>
        </section>

        <section className="card">
          <h2 id="credits">5) Credit & Attribution</h2>
          <p>
            Credit is appreciated and may be required for some editorial uses. If credit is needed
            or requested, use:
          </p>
          <p className="quote">Photo © Jeevan Chandimal — JeevanChandimal.com</p>
        </section>

        <section className="card">
          <h2>6) Ownership</h2>
          <p>
            All images remain the intellectual property of <strong>Jeevan Chandimal</strong>.
            Purchasing or downloading grants a license to use — not ownership of the image.
          </p>
        </section>

        <section className="card">
          <h2 id="refunds">7) Refunds</h2>
          <p>
            Digital downloads are generally non-refundable once delivered or downloaded. Please
            review the{' '}
            <a className="link" href="/refund-policy">
              Refund Policy
            </a>{' '}
            for full details and exceptions (corrupt file, wrong file, verified system error).
          </p>
        </section>

        <section className="card">
          <h2>8) Changes to This License</h2>
          <p>
            We may update this License Agreement from time to time. Changes will be posted on this
            page. Your use of the site after changes means you accept the updated terms.
          </p>
        </section>

        <section className="card">
          <h2 id="contact">9) Contact</h2>
          <p>
            Questions about licensing or usage rights? Contact:
            <br />
            📧 <strong>info@jeevanchandimal.com</strong>
          </p>

          <div className="actions">
            <a className="btn" href="/store">
              Browse Store →
            </a>
            <a className="btnOutline" href="/memberships">
              Membership →
            </a>
          </div>
        </section>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          max-width: 980px;
          margin: 0 auto;
          padding: 54px 20px 100px;
          line-height: 1.75;
        }

        .hero {
          text-align: center;
          margin-bottom: 22px;
        }

        h1 {
          margin: 0 0 10px;
          font-size: 42px;
          line-height: 1.08;
        }

        .sub {
          margin: 0 auto;
          max-width: 820px;
          opacity: 0.9;
        }

        .topLinks {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        .pill {
          text-decoration: none;
          font-size: 12px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(255, 255, 255, 0.02);
          opacity: 0.9;
          transition: 0.2s ease;
        }
        .pill:hover {
          opacity: 1;
          border-color: rgba(37, 195, 226, 0.55);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.12);
        }

        .card {
          margin-top: 16px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
          border-radius: 18px;
          padding: 22px 20px;
          backdrop-filter: blur(8px);
        }

        h2 {
          margin: 0 0 10px;
          font-size: 20px;
          line-height: 1.25;
        }

        h3 {
          margin: 0 0 10px;
          font-size: 16px;
        }

        ul {
          margin: 10px 0 0;
          padding-left: 18px;
        }

        li {
          margin: 6px 0;
        }

        .grid {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .box {
          border: 1px solid rgba(245, 244, 244, 0.14);
          border-radius: 16px;
          padding: 14px 14px;
          background: rgba(0, 0, 0, 0.18);
        }

        .note {
          margin-top: 12px;
          font-size: 13px;
          opacity: 0.9;
        }

        .quote {
          margin: 10px 0 0;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
          font-size: 14px;
          font-weight: 700;
        }

        .link {
          text-decoration: underline;
        }

        .actions {
          margin-top: 14px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn {
          text-decoration: none;
          padding: 12px 14px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.55);
          background: rgba(37, 195, 226, 0.08);
          font-weight: 800;
          transition: 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn:hover {
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.12);
          border-color: rgba(37, 195, 226, 0.7);
        }

        .btnOutline {
          text-decoration: none;
          padding: 12px 14px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.02);
          font-weight: 800;
          opacity: 0.9;
          transition: 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btnOutline:hover {
          opacity: 1;
          border-color: rgba(245, 244, 244, 0.35);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.1);
        }

        @media (max-width: 991px) {
          h1 {
            font-size: 34px;
          }
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}