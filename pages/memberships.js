import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function Membership() {
  const [email, setEmail] = React.useState('')
  const [loadingPlan, setLoadingPlan] = React.useState('') // 'monthly' | ...
  const [error, setError] = React.useState('')

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
  }

  async function startMembershipCheckout(plan) {
    try {
      setError('')
      const cleanEmail = String(email || '').trim().toLowerCase()

      if (!isValidEmail(cleanEmail)) {
        setError('Please enter a valid email address.')
        return
      }

      setLoadingPlan(plan)

      // 1) create order in DB
      const res = await fetch('/api/membership/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, plan, currency: 'LKR' }),
      })

      const json = await res.json()
      if (!json.ok) {
        setError(json.error || 'Failed to create membership order.')
        setLoadingPlan('')
        return
      }

      // 2) redirect to PayHere (POST form)
      // NOTE: Update merchant_id + return/cancel/notify URLs to match your project
      const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

      if (!merchantId || !siteUrl) {
        setError('Missing PayHere env variables (NEXT_PUBLIC_PAYHERE_MERCHANT_ID / NEXT_PUBLIC_SITE_URL).')
        setLoadingPlan('')
        return
      }

      const orderId = json.orderId
      const amount = json.amount
      const currency = json.currency

      const returnUrl = `${siteUrl}/membership/success?order_id=${encodeURIComponent(orderId)}`
      const cancelUrl = `${siteUrl}/membership/cancel?order_id=${encodeURIComponent(orderId)}`
      const notifyUrl = `${siteUrl}/api/payhere/notify`

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = 'https://www.payhere.lk/pay/checkout' // (sandbox uses a different URL if you use sandbox)

      const fields = {
        merchant_id: merchantId,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        notify_url: notifyUrl,

        order_id: orderId,
        items: `Membership (${plan})`,
        currency,
        amount: String(amount),

        first_name: cleanEmail.split('@')[0] || 'Member',
        last_name: 'User',
        email: cleanEmail,
        phone: '',
        address: '',
        city: '',
        country: 'Sri Lanka',
      }

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value == null ? '' : String(value)
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch (e) {
      setError(e.message || 'Something went wrong.')
      setLoadingPlan('')
    }
  }

  return (
    <>
      <Head>
        <title>Membership — Jeevan Chandimal</title>
        <meta
          name="description"
          content="Premium membership for unlimited access to licensed photography and cinematic visual assets."
        />
      </Head>

      <JeevanChandimalNavi />

      <main className="membership-page thq-section-padding">
        <div className="thq-section-max-width">
          {/* HERO */}
          <div className="membership-hero">
            <h1 className="thq-heading-1">Membership</h1>
            <p className="thq-body-large">
              Unlimited access to a curated archive of cinematic photography.
              Built for filmmakers, agencies, brands, and publishers.
            </p>

            {/* Email input */}
            <div className="emailBox">
              <label className="emailLabel">Email (for access + receipts)</label>
              <input
                className="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                inputMode="email"
              />
              {error ? <p className="errorText">{error}</p> : null}
            </div>
          </div>

          {/* PLANS */}
          <div className="membership-grid">
            {/* BASIC */}
            <div className="membership-card">
              <h3 className="thq-heading-3">Basic</h3>
              <p className="price">LKR 8,500 / month</p>

              <ul>
                <li>✔ Personal use</li>
                <li>✔ JPG downloads</li>
                <li>✔ Standard resolution</li>
                <li>✖ Commercial license</li>
                <li>✖ RAW files</li>
              </ul>

              <button className="thq-button-outline" disabled>
                Coming Soon
              </button>
            </div>

            {/* PRO (mapped to monthly) */}
            <div className="membership-card featured">
              <h3 className="thq-heading-3">Pro</h3>
              <p className="price">LKR 18,500 / month</p>

              <ul>
                <li>✔ Commercial license</li>
                <li>✔ Unlimited JPG downloads</li>
                <li>✔ High resolution</li>
                <li>✔ Priority support</li>
                <li>✖ RAW files</li>
              </ul>

              <button
                className="thq-button-filled"
                onClick={() => startMembershipCheckout('monthly')}
                disabled={loadingPlan === 'monthly'}
              >
                {loadingPlan === 'monthly' ? 'Redirecting…' : 'Get Pro Access'}
              </button>

              <p className="smallNote">You’ll be redirected to PayHere to complete payment.</p>
            </div>

            {/* ELITE */}
            <div className="membership-card">
              <h3 className="thq-heading-3">Elite</h3>
              <p className="price">LKR 38,500 / month</p>

              <ul>
                <li>✔ Full commercial license</li>
                <li>✔ Unlimited downloads</li>
                <li>✔ RAW + JPG access</li>
                <li>✔ Early access to new collections</li>
                <li>✔ Direct collaboration options</li>
              </ul>

              <button className="thq-button-outline" disabled>
                Apply for Elite
              </button>

              <p className="smallNote">
                Want Elite now? <Link href="/contact">Contact me</Link>.
              </p>
            </div>
          </div>

          {/* FEATURE LIST */}
          <div className="membership-features">
            <h2 className="thq-heading-2">Why Membership?</h2>

            <div className="feature-grid">
              <div>
                <h4>Unlimited Access</h4>
                <p>Download without per-image licensing.</p>
              </div>

              <div>
                <h4>Commercial Ready</h4>
                <p>Use in film, advertising, and editorial projects.</p>
              </div>

              <div>
                <h4>Curated Archive</h4>
                <p>No stock clutter — only cinematic work.</p>
              </div>

              <div>
                <h4>New Work Monthly</h4>
                <p>Fresh collections added regularly.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .membership-hero {
          text-align: center;
          max-width: 760px;
          margin: 0 auto var(--dl-layout-space-fiveunits);
        }

        .emailBox {
          margin: var(--dl-layout-space-twounits) auto 0;
          max-width: 520px;
          text-align: left;
          display: grid;
          gap: 10px;
        }

        .emailLabel {
          font-size: 14px;
          opacity: 0.9;
        }

        .emailInput {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.2);
          background: rgba(255, 255, 255, 0.02);
          color: #f5f4f4;
          outline: none;
        }

        .emailInput:focus {
          border-color: rgba(37, 195, 226, 0.65);
        }

        .errorText {
          margin: 0;
          font-size: 13px;
          color: #ffb3b3;
        }

        .membership-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--dl-layout-space-threeunits);
        }

        .membership-card {
          border: 1px solid rgba(245, 244, 244, 0.15);
          padding: var(--dl-layout-space-threeunits);
          border-radius: var(--dl-layout-radius-cardradius);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(6px);
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          transition: 0.3s;
        }

        .membership-card:hover {
          border-color: rgba(245, 244, 244, 0.35);
        }

        .featured {
          border-color: var(--dl-color-theme-primary1);
          background: rgba(37, 195, 226, 0.06);
        }

        .price {
          font-size: 22px;
          font-weight: 600;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .smallNote {
          margin: 0;
          font-size: 12px;
          opacity: 0.85;
        }

        .membership-features {
          margin-top: var(--dl-layout-space-fiveunits);
          text-align: center;
        }

        .feature-grid {
          margin-top: var(--dl-layout-space-threeunits);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--dl-layout-space-threeunits);
        }

        @media (max-width: 991px) {
          .membership-grid {
            grid-template-columns: 1fr;
          }

          .feature-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </>
  )
}
