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
