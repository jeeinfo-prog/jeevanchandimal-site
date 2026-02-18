import React from 'react'
import LegalSeo from '../components/LegalSeo'

export default function CookiesPolicy() {
  return (
    <>
      <LegalSeo
        title="Cookies Policy | Jeevan Chandimal"
        description="Cookies Policy explaining how JeevanChandimal.com uses cookies and similar technologies."
        path="/cookies-policy"
      />

      <main className="wrap">
        <h1>Cookies Policy</h1>
        {/* ...your existing content... */}
      </main>

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
          line-height: 1.7;
        }
      `}</style>
    </>
  )
}
