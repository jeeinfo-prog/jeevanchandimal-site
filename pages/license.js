// pages/license.js
import React from 'react'
import LegalSeo from '../components/LegalSeo'
import Link from 'next/link'

export default function License() {
  return (
    <>
      <LegalSeo
        title="License Terms | Jeevan Chandimal"
        description="License terms for photography downloads and membership access on JeevanChandimal.com — including personal, editorial, and commercial usage."
        path="/license"
      />

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
          <li>
            You receive a <strong>license</strong> to use the file — you do <strong>not</strong>{' '}
            own the copyright.
          </li>
          <li>
            You may <strong>crop</strong>, <strong>resize</strong>, and <strong>color grade</strong>{' '}
            the file to match your project.
          </li>
          <li>
            You may not claim the file as your own or register it as a trademark.
          </li>
          <li>
            You may not use the file in a way that is unlawful, defamatory, or misleading.
          </li>
        </ul>

        <h2>License Types</h2>

        <h3>1) Personal License</h3>
        <p>For individual / non-client use (portfolio, personal projects, home prints).</p>
        <ul>
          <li>✔ Personal social posts (non-sponsored)</li>
          <li>✔ Personal website / portfolio</li>
          <li>✔ Personal prints (non-commercial)</li>
          <li>✖ Brand advertising or paid campaigns</li>
          <li>✖ Client projects</li>
          <li>✖ Resale or redistribution</li>
        </ul>

        <h3>2) Editorial License</h3>
        <p>
          For news, documentary, blog, or editorial usage where the image illustrates a story.
        </p>
        <ul>
          <li>✔ News / magazine / blog editorial use</li>
          <li>✔ Documentary / educational use</li>
          <li>✔ Social posts related to editorial content</li>
          <li>✖ Advertising / promotions (paid or sponsored)</li>
          <li>✖ Product packaging</li>
          <li>✖ Resale or redistribution</li>
        </ul>

        <h3>3) Commercial License (Pro / higher tiers or commercial purchase)</h3>
        <p>For business, brand, and client-facing commercial projects.</p>
        <ul>
          <li>✔ Brand websites, landing pages</li>
          <li>✔ Advertising and paid campaigns</li>
          <li>✔ Client work (agency / production / marketing)</li>
          <li>✔ Social media promotions</li>
          <li>✖ Resale, sublicensing, or redistribution</li>
          <li>✖ Use in “print-on-demand” templates / stock bundles</li>
        </ul>

        <h2>Prohibited Uses (Not Allowed Under Any Standard License)</h2>
        <ul>
          <li>
            <strong>Redistribution</strong>: sharing the original files or making them available
            for download (Google Drive, Dropbox, bundles, stock sites, torrents, etc.).
          </li>
          <li>
            <strong>Resale</strong>: selling the file as-is or as part of a pack/template/product
            where the image is the primary value.
          </li>
          <li>
            <strong>Sub-licensing</strong>: granting others rights to use the file.
          </li>
          <li>
            <strong>AI training / dataset use</strong>: using files to train or build datasets
            (unless you have written permission).
          </li>
          <li>
            <strong>Misleading use</strong>: implying endorsement by a person/brand/location if not
            true.
          </li>
        </ul>

        <h2>Team / Seat Usage</h2>
        <p>
          Standard licenses are intended for use by the purchaser or the purchasing organization.
          If you need multi-team distribution across departments, or usage across multiple client
          accounts, request a custom license.
        </p>

        <h2>Membership Downloads</h2>
        <ul>
          <li>
            Files downloaded during an active membership remain licensed under the terms of the
            membership tier at the time of download.
          </li>
          <li>
            If you cancel, your prior downloads do not “expire”, but your ability to download new
            files ends when your billing period ends.
          </li>
          <li>
            Membership access is for the subscriber/organization and may not be shared publicly.
          </li>
        </ul>

        <h2>Attribution</h2>
        <p>
          Attribution is not required unless specified for an editorial arrangement. If you do
          credit, use: <strong>© Jeevan Chandimal</strong>.
        </p>

        <h2>Refunds</h2>
        <p>
          Digital purchases are typically non-refundable once delivered. See{' '}
          <Link href="/refund-policy">Refund Policy</Link> for details.
        </p>

        <h2>Contact</h2>
        <p>
          For custom licensing, questions, or permissions, contact:
          <br />
          📧 <strong>info@jeevanchandimal.com</strong>
        </p>

        <p className="small">
          <strong>Last updated:</strong> February 26, 2026
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