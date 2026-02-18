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
        {/* ...your existing content exactly... */}
      </main>

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 20px 100px;
          line-height: 1.7;
        }
      `}</style>
    </>
  )
}
