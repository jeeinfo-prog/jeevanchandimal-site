// pages/license.js
import React from 'react'
import Link from 'next/link'
import LegalSeo from '../components/LegalSeo'
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function License() {
  return (
    <>
      <LegalSeo
        title="License Terms | Jeevan Chandimal"
        description="License terms for photography downloads and membership access on JeevanChandimal.com — including personal, editorial, and commercial usage."
        path="/license"
      />

      {/* ✅ NAV */}
      <JeevanChandimalNavi />

      <main className="wrap">
        <h1>License Terms</h1>

        <p>
          This License Terms page explains how you may use digital photography and assets
          downloaded from <strong>JeevanChandimal.com</strong> (including purchases and
          membership downloads). By downloading or using any file, you agree to these terms.
        </p>

        <p className="note">
          If you need a custom license (exclusive usage, extended distribution, or agency-wide
          usage), please <Link href="/contact">contact me</Link>.
        </p>

        <h2>Definitions</h2>
        <ul>
          <li>
            <strong>Asset / Image / File</strong> — any digital photo or visual file downloaded
            from the site (JPG/RAW or other formats).
          </li>
          <li>
            <strong>License</strong> — permission to use the file under the conditions below.
          </li>
          <li>
            <strong>Member</strong> — an active membership subscriber with download access.
          </li>
          <li>
            <strong>Client Work</strong> — work produced for a client (brand, agency, publisher).
          </li>
        </ul>

        <h2>General Rules (Applies to All Licenses)</h2>
        <ul>
          <li>You receive a <strong>license</strong>, not ownership of copyright.</li>
          <li>You may crop, resize, and color grade the file.</li>
          <li>You may not claim the file as your own or trademark it.</li>
          <li>You may not use the file unlawfully or misleadingly.</li>
        </ul>

        <h2>License Types</h2>

        <h3>1) Personal License</h3>
        <ul>
          <li>✔ Personal social posts (non-sponsored)</li>
          <li>✔ Personal website / portfolio</li>
          <li>✔ Personal prints</li>
          <li>✖ Brand advertising</li>
          <li>✖ Client projects</li>
          <li>✖ Resale or redistribution</li>
        </ul>

        <h3>2) Editorial License</h3>
        <ul>
          <li>✔ News / blog / documentary</li>
          <li>✔ Educational use</li>
          <li>✖ Advertising or promotions</li>
          <li>✖ Product packaging</li>
          <li>✖ Resale or redistribution</li>
        </ul>

        <h3>3) Commercial License</h3>
        <ul>
          <li>✔ Brand websites and campaigns</li>
          <li>✔ Client work</li>
          <li>✔ Paid advertising</li>
          <li>✖ Resale or sublicensing</li>
          <li>✖ Stock redistribution</li>
        </ul>

        <h2>Prohibited Uses</h2>
        <ul>
          <li>Redistributing original files</li>
          <li>Reselling as templates or packs</li>
          <li>AI training datasets</li>
          <li>Misleading endorsement</li>
        </ul>

        <h2>Membership Downloads</h2>
        <ul>
          <li>Downloads remain licensed after cancellation</li>
          <li>No new downloads after membership ends</li>
          <li>Access is for the subscriber/organization only</li>
        </ul>

        <h2>Attribution</h2>
        <p>
          Not required unless editorial. Optional credit: <strong>© Jeevan Chandimal</strong>.
        </p>

        <h2>Refunds</h2>
        <p>
          See <Link href="/refund-policy">Refund Policy</Link> for details.
        </p>

        <h2>Contact</h2>
        <p>
          📧 <strong>info@jeevanchandimal.com</strong>
        </p>

        <p className="small">
          <strong>Last updated:</strong> February 26, 2026
        </p>
      </main>

      {/* ✅ FOOTER */}
      <JeevanChandimalNewFooter />

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

        h3 {
          margin-top: 18px;
          margin-bottom: 8px;
        }

        ul {
          margin-left: 20px;
          margin-top: 10px;
        }

        li {
          margin-bottom: 6px;
        }

        .note {
          margin-top: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.02);
        }

        .small {
          margin-top: 30px;
          font-size: 13px;
          opacity: 0.85;
        }
      `}</style>
    </>
  )
}