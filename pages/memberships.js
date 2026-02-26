// pages/memberships.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

function formatPayhereAmount(n) {
  const x = Number(n || 0)
  return x.toFixed(2)
}

function formatMoney(ccy, amount) {
  const n = Number(amount || 0)
  if (ccy === 'LKR') return `LKR ${Math.round(n).toLocaleString('en-LK')}`
  // USD
  return `$${n.toLocaleString('en-US')}`
}

export default function Memberships() {
  const [email, setEmail] = React.useState('')
  const [loadingPlan, setLoadingPlan] = React.useState('') // 'monthly' | ...
  const [error, setError] = React.useState('')

  // ✅ Pricing toggle (default USD)
  const [currency, setCurrency] = React.useState('USD') // USD | LKR

  // FAQ tabs + accordion
  const [faqTab, setFaqTab] = React.useState('General') // General | Licensing | Billing
  const [openFaq, setOpenFaq] = React.useState(-1)

  // ---------------- reveal on scroll ----------------
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!els.length) return

    // Reduced motion support
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem('user_email')
    if (saved && !email) setEmail(saved)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setOpenFaq(-1)
  }, [faqTab])

  // -------- Prices (display + checkout) --------
  const PRICES = React.useMemo(
    () => ({
      USD: {
        basic: 29,
        pro: 59,
        elite: 119,
      },
      LKR: {
        basic: 8500,
        pro: 18500,
        elite: 38500,
      },
    }),
    []
  )

  async function startMembershipCheckout(plan) {
    try {
      setError('')
      const cleanEmail = String(email || '').trim().toLowerCase()

      if (!isValidEmail(cleanEmail)) {
        setError('Please enter a valid email address.')
        return
      }

      // ✅ save for badge + member downloads later
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('user_email', cleanEmail)
      }

      setLoadingPlan(plan)

      // 1) create order in DB (server returns hash)
      const res = await fetch('/api/membership/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, plan, currency }), // ✅ use selected currency
      })

      const json = await res.json()
      if (!json.ok) {
        setError(json.error || 'Failed to create membership order.')
        setLoadingPlan('')
        return
      }

      const merchantId = String(process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID || '').trim()
      const siteUrl =
        String(process.env.NEXT_PUBLIC_SITE_URL || '').trim() ||
        (typeof window !== 'undefined' ? window.location.origin : '')

      // In prod this should be your deployed domain (NOT localhost)
      const webhookBase = String(process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL || '').trim() || siteUrl

      // ✅ safe default: sandbox true if env missing
      const sandboxFlag = String(process.env.NEXT_PUBLIC_PAYHERE_SANDBOX ?? 'true')
        .toLowerCase()
        .trim()
      const isSandbox = sandboxFlag === 'true'

      if (!merchantId || !siteUrl) {
        setError(
          'Missing PayHere env variables (NEXT_PUBLIC_PAYHERE_MERCHANT_ID / NEXT_PUBLIC_SITE_URL).'
        )
        setLoadingPlan('')
        return
      }

      const orderId = json.orderId
      const amount = json.amount
      const serverCurrency = json.currency
      const hash = json.hash

      if (!orderId || !amount || !serverCurrency || !hash) {
        setError('Missing order details from server (orderId/amount/currency/hash).')
        setLoadingPlan('')
        return
      }

      // ✅ include email so success page can set localStorage + badge works
      const returnUrl = `${siteUrl}/membership/success?order_id=${encodeURIComponent(
        orderId
      )}&email=${encodeURIComponent(cleanEmail)}`
      const cancelUrl = `${siteUrl}/membership/cancel?order_id=${encodeURIComponent(
        orderId
      )}&email=${encodeURIComponent(cleanEmail)}`
      const notifyUrl = `${webhookBase}/api/payhere/notify`

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = isSandbox
        ? 'https://sandbox.payhere.lk/pay/checkout'
        : 'https://www.payhere.lk/pay/checkout'

      const fields = {
        merchant_id: merchantId,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        notify_url: notifyUrl,

        order_id: orderId,
        items: `Membership (${plan})`,
        currency: serverCurrency,
        amount: formatPayhereAmount(amount),

        // ✅ REQUIRED (fixes Unauthorized payment request)
        hash,

        // Buyer details
        first_name: cleanEmail.split('@')[0] || 'Member',
        last_name: 'User',
        email: cleanEmail,
        phone: '0000000000',
        address: 'N/A',
        city: 'Colombo',
        country: 'Sri Lanka',

        // Helpful for webhook routing
        custom_1: 'membership',
        custom_2: String(plan || ''),
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
      setError(e?.message || 'Something went wrong.')
      setLoadingPlan('')
    }
  }

  const faqsAll = React.useMemo(
    () => [
      // GENERAL
      {
        tab: 'General',
        q: 'What does the membership include?',
        a: 'Membership gives you access to a curated collection of cinematic imagery, with downloads and usage based on your selected plan. New work is added regularly as the archive grows.',
      },
      {
        tab: 'General',
        q: 'Is there a limit to how many images I can download?',
        a: 'Download limits depend on your plan. Each membership tier clearly defines monthly limits or unlimited access.',
      },
      {
        tab: 'General',
        q: 'How often is new content added?',
        a: 'New images are added regularly, reflecting ongoing projects, travels, and visual explorations.',
      },
      // LICENSING
      {
        tab: 'Licensing',
        q: 'How can I use the images?',
        a: 'Images can be used for personal, editorial, and commercial projects according to your membership tier. Full usage details are outlined clearly in the license terms.',
      },
      {
        tab: 'Licensing',
        q: 'Can I use the images for client work?',
        a: 'Yes. Client use is allowed depending on your membership plan. Higher tiers offer broader commercial usage.',
      },
      {
        tab: 'Licensing',
        q: 'Are the images sold exclusively?',
        a: 'No. Images are licensed, not sold exclusively. The same image may be licensed to multiple members or clients.',
      },
      {
        tab: 'Licensing',
        q: 'Are high-resolution files included?',
        a: 'Yes. Images are provided as professionally graded high-resolution files (tier dependent).',
      },
      // BILLING
      {
        tab: 'Billing',
        q: 'Can I cancel my membership anytime?',
        a: 'Yes. You can cancel at any time. Your access will remain active until the end of your current billing period.',
      },
      {
        tab: 'Billing',
        q: 'Do downloads expire if I cancel my membership?',
        a: 'No. Images downloaded during an active membership can continue to be used according to the license terms under which they were obtained.',
      },
      {
        tab: 'Billing',
        q: 'Do you offer refunds?',
        a: 'Due to the nature of digital access, memberships are non-refundable once activated. Please review plan details before subscribing.',
      },
    ],
    []
  )

  const faqs = faqsAll.filter((x) => x.tab === faqTab)
  const tabs = ['General', 'Licensing', 'Billing']

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
          <div className="membership-hero" data-reveal>
            <h1 className="thq-heading-1">Membership</h1>
            <p className="thq-body-large">
              Unlimited access to a curated archive of cinematic photography. Built for filmmakers,
              agencies, brands, and publishers.
            </p>

            {/* Currency toggle */}
            <div className="currencyBar">
              <span className="currencyLabel">Pricing</span>
              <div className="currencyToggle" role="tablist" aria-label="Currency toggle">
                {['USD', 'LKR'].map((ccy) => {
                  const active = currency === ccy
                  return (
                    <button
                      key={ccy}
                      type="button"
                      className={`currencyPill ${active ? 'active' : ''}`}
                      onClick={() => setCurrency(ccy)}
                      role="tab"
                      aria-selected={active ? 'true' : 'false'}
                    >
                      <span className="pillText">{ccy}</span>
                      <span className="pillArrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Email input */}
            <div className="emailBox">
              <label className="emailLabel">Email (for access + receipts)</label>
              <input
                className="emailInput"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (typeof window !== 'undefined') {
                    window.localStorage.setItem('user_email', e.target.value)
                  }
                }}
                placeholder="you@example.com"
                inputMode="email"
              />
              {error ? <p className="errorText">{error}</p> : null}
            </div>
          </div>

          {/* PLANS */}
          <div className="membership-grid" data-reveal>
            {/* BASIC */}
            <div className="membership-card">
              <h3 className="thq-heading-3">Basic</h3>
              <p className="price">{formatMoney(currency, PRICES[currency].basic)} / month</p>

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
              <p className="price">{formatMoney(currency, PRICES[currency].pro)} / month</p>

              <ul>
                <li>✔ Commercial license</li>
                <li>✔ Unlimited JPG downloads</li>
                <li>✔ High resolution</li>
                <li>✔ Priority support</li>
                <li>✖ RAW files</li>
              </ul>

              {/* Included in Pro strip */}
              <div className="proStrip">
                <span>Unlimited JPG</span>
                <span>Commercial</span>
                <span>High-res</span>
                <span>Priority</span>
              </div>

              <button
                className="thq-button-filled"
                onClick={() => startMembershipCheckout('monthly')}
                disabled={loadingPlan === 'monthly'}
              >
                {loadingPlan === 'monthly' ? 'Redirecting…' : 'Get Pro Access'}
              </button>

              <p className="smallNote">
                You’ll be redirected to PayHere to complete payment. (Currency: {currency})
              </p>
            </div>

            {/* ELITE */}
            <div className="membership-card">
              <h3 className="thq-heading-3">Elite</h3>
              <p className="price">{formatMoney(currency, PRICES[currency].elite)} / month</p>

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
          <div className="membership-features" data-reveal>
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

          {/* LICENSE OVERVIEW */}
          <section className="cineBlock" data-reveal>
            <h2 className="thq-heading-2 center">License Overview</h2>
            <div className="cineMiniGrid">
              <div className="cineMiniCard">Personal use ✔</div>
              <div className="cineMiniCard">Editorial use ✔</div>
              <div className="cineMiniCard">Commercial use ✔ (Pro+)</div>
              <div className="cineMiniCard">
                <Link href="/license">View full license →</Link>
              </div>
            </div>
          </section>

          {/* TRUST */}
          <section className="cineBlock" data-reveal>
            <h2 className="thq-heading-2 center">Trusted by</h2>
            <div className="trustRow">
              <span>Filmmakers</span>
              <span>Agencies</span>
              <span>Brands</span>
              <span>Publishers</span>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="cineBlock" data-reveal>
            <h2 className="thq-heading-2 center">How it works</h2>
            <div className="stepsGrid">
              <div className="stepCard">
                <h4>1. Subscribe</h4>
                <p>Choose a plan and complete secure checkout.</p>
              </div>
              <div className="stepCard">
                <h4>2. Download</h4>
                <p>Access the cinematic archive instantly.</p>
              </div>
              <div className="stepCard">
                <h4>3. Use</h4>
                <p>Apply images in film, advertising, and editorial projects.</p>
              </div>
            </div>
          </section>

          {/* PLAN COMPARISON */}
          <section className="cineBlock" data-reveal>
            <h2 className="thq-heading-2 center">Plan comparison</h2>

            <div className="compareWrap">
              <div className="compareTable">
                <div className="compareHead">Feature</div>
                <div className="compareHead">Basic</div>
                <div className="compareHead">Pro</div>

                <div>JPG downloads</div>
                <div>✔</div>
                <div>✔ Unlimited</div>

                <div>RAW files</div>
                <div>✖</div>
                <div>✖</div>

                <div>Commercial license</div>
                <div>✖</div>
                <div>✔</div>

                <div>Resolution</div>
                <div>Standard</div>
                <div>High</div>

                <div>Price</div>
                <div>{formatMoney(currency, PRICES[currency].basic)}</div>
                <div>{formatMoney(currency, PRICES[currency].pro)}</div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <div className="faqWrap" data-reveal>
            <div className="faqHead">
              <h2 className="thq-heading-2">Frequently Asked Questions</h2>
              <p className="thq-body-large faqSub">
                Quick answers before you subscribe. If you need anything else,{' '}
                <Link href="/contact">contact me</Link>.
              </p>

              {/* Tabs */}
              <div className="faqTabs" role="tablist" aria-label="FAQ categories">
                {tabs.map((t) => {
                  const active = faqTab === t
                  return (
                    <button
                      key={t}
                      type="button"
                      className={`faqTab ${active ? 'active' : ''}`}
                      onClick={() => setFaqTab(t)}
                      role="tab"
                      aria-selected={active ? 'true' : 'false'}
                    >
                      <span className="faqTabLabel">{t}</span>
                      <span className="faqTabArrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Cinematic 360 grid */}
            <div className="faqCineGrid">
              {faqs.map((item, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div className={`faqCineCard ${isOpen ? 'active' : ''}`} key={`${faqTab}-${idx}`}>
                    <button
                      type="button"
                      className="faqTrigger"
                      onClick={() => setOpenFaq((v) => (v === idx ? -1 : idx))}
                    >
                      <span className="faqQ">{item.q}</span>
                      <span className="faqIcon" aria-hidden="true">
                        {!isOpen ? (
                          <svg viewBox="0 0 1024 1024" className="faqSvg">
                            <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 1024 1024" className="faqSvg">
                            <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                          </svg>
                        )}
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="faqAnswer">
                        <p className="faqA thq-body-small">{item.a}</p>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>

          {/* CUSTOM LICENSING CTA */}
          <section className="cineBlock" data-reveal>
            <div className="ctaCard">
              <h3>Need custom licensing?</h3>
              <p>Agency plans, bulk access, and exclusive usage options available.</p>
              <Link href="/contact" className="thq-button-filled">
                Contact for custom plan
              </Link>
            </div>
          </section>

          {/* RETURNING MEMBER */}
<section className="cineBlock" data-reveal>
  <div className="ctaCard subtle">
    <h3>Already a member?</h3>
    <p>Go directly to your downloads and archive.</p>

    <Link href="/member-access" legacyBehavior>
      <a className="thq-button-outline">Member access</a>
    </Link>
  </div>
</section>
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        /* reveal */
        [data-reveal] {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 700ms ease, transform 700ms ease;
          will-change: opacity, transform;
        }
        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .membership-hero {
          text-align: center;
          max-width: 760px;
          margin: 0 auto var(--dl-layout-space-fiveunits);
        }

        .currencyBar {
          margin: var(--dl-layout-space-twounits) auto 0;
          display: grid;
          gap: 10px;
          justify-items: center;
        }

        .currencyLabel {
          font-size: 13px;
          opacity: 0.9;
        }

        .currencyToggle {
          display: inline-flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .currencyPill {
          cursor: pointer;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
          color: #f5f4f4;
          border-radius: 999px;
          padding: 10px 14px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .pillText {
          font-weight: 650;
          letter-spacing: 0.2px;
          font-size: 13px;
          opacity: 0.95;
        }

        .pillArrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: 0.25s ease;
          font-size: 14px;
        }

        .currencyPill:hover {
          border-color: rgba(37, 195, 226, 0.55);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.1);
        }

        .currencyPill:hover .pillArrow {
          opacity: 1;
          transform: translateX(0);
        }

        .currencyPill.active {
          border-color: rgba(37, 195, 226, 0.75);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.14);
          background: rgba(37, 195, 226, 0.06);
        }

        .currencyPill.active .pillArrow {
          opacity: 1;
          transform: translateX(0);
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
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.12);
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
          transform: translateY(-2px);
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

        .proStrip {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: -6px;
        }

        .proStrip span {
          font-size: 12px;
          opacity: 0.9;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
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

        /* 🎬 Cinematic blocks */
        .cineBlock {
          margin-top: var(--dl-layout-space-fiveunits);
          text-align: center;
        }

        .center {
          text-align: center;
        }

        .cineMiniGrid {
          margin-top: var(--dl-layout-space-threeunits);
          display: grid;
          grid-template-columns: repeat(4, 260px);
          justify-content: center;
          gap: var(--dl-layout-space-twounits);
        }

        .cineMiniCard {
          padding: 18px;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(6px);
          transition: 0.25s ease;
        }

        .cineMiniCard:hover {
          border-color: rgba(37, 195, 226, 0.55);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.1);
        }

        .trustRow {
          margin-top: var(--dl-layout-space-threeunits);
          display: flex;
          gap: var(--dl-layout-space-threeunits);
          justify-content: center;
          opacity: 0.85;
          flex-wrap: wrap;
        }

        .stepsGrid {
          margin-top: var(--dl-layout-space-threeunits);
          display: grid;
          grid-template-columns: repeat(3, 300px);
          justify-content: center;
          gap: var(--dl-layout-space-threeunits);
        }

        .stepCard {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
          transition: 0.25s ease;
        }

        .stepCard:hover {
          border-color: rgba(37, 195, 226, 0.55);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.1);
          transform: translateY(-2px);
        }

        .compareWrap {
          margin-top: var(--dl-layout-space-threeunits);
          display: flex;
          justify-content: center;
        }

        .compareTable {
          width: 100%;
          max-width: 820px;
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 0.9fr;
          gap: 10px;
          text-align: center;
          padding: 18px;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(6px);
        }

        .compareHead {
          font-weight: 700;
          opacity: 0.95;
        }

        /* FAQ cinematic 360 + tabs */
        .faqWrap {
          margin-top: var(--dl-layout-space-fiveunits);
        }

        .faqHead {
          text-align: center;
          max-width: 760px;
          margin: 0 auto var(--dl-layout-space-threeunits);
        }

        .faqSub {
          opacity: 0.85;
        }

        .faqTabs {
          margin-top: var(--dl-layout-space-twounits);
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .faqTab {
          cursor: pointer;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
          color: #f5f4f4;
          border-radius: 999px;
          padding: 10px 14px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .faqTabLabel {
          font-weight: 650;
          letter-spacing: 0.2px;
          font-size: 13px;
          opacity: 0.95;
        }

        .faqTabArrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: 0.25s ease;
          font-size: 14px;
        }

        .faqTab:hover {
          border-color: rgba(37, 195, 226, 0.55);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.1);
        }

        .faqTab:hover .faqTabArrow {
          opacity: 1;
          transform: translateX(0);
        }

        .faqTab.active {
          border-color: rgba(37, 195, 226, 0.75);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.14);
          background: rgba(37, 195, 226, 0.06);
        }

        .faqTab.active .faqTabArrow {
          opacity: 1;
          transform: translateX(0);
        }

        .faqCineGrid {
          display: grid;
          grid-template-columns: repeat(2, 360px);
          justify-content: center;
          gap: var(--dl-layout-space-threeunits);
        }

        .faqCineCard {
          width: 360px;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          transition: 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .faqCineCard:hover {
          border-color: rgba(37, 195, 226, 0.65);
          box-shadow: 0 0 0 1px rgba(37, 195, 226, 0.25), 0 18px 48px rgba(0, 0, 0, 0.45);
          transform: translateY(-4px);
        }

        .faqCineCard.active {
          border-color: rgba(37, 195, 226, 0.75);
          box-shadow: 0 0 0 1px rgba(37, 195, 226, 0.35), 0 22px 54px rgba(0, 0, 0, 0.55);
        }

        .faqTrigger {
          width: 100%;
          cursor: pointer;
          border: none;
          outline: none;
          background: transparent;
          color: inherit;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 20px 20px;
          text-align: left;
        }

        .faqQ {
          font-weight: 650;
          line-height: 1.35;
          letter-spacing: 0.2px;
        }

        .faqIcon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
          flex-shrink: 0;
          transition: 0.25s ease;
        }

        .faqCineCard:hover .faqIcon {
          border-color: rgba(37, 195, 226, 0.6);
          box-shadow: 0 0 12px rgba(37, 195, 226, 0.35);
        }

        .faqSvg {
          width: 18px;
          height: 18px;
        }

        .faqAnswer {
          padding: 0 20px 20px;
          animation: fadeIn 240ms ease;
        }

        .faqA {
          margin: 0;
          opacity: 0.9;
        }

        /* CTA cards */
        .ctaCard {
          max-width: 560px;
          margin: 0 auto;
          padding: 28px;
          border-radius: 18px;
          border: 1px solid rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.06);
          display: grid;
          gap: 12px;
        }

        .ctaCard.subtle {
          border-color: rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.02);
        }

        @media (max-width: 991px) {
          .membership-grid {
            grid-template-columns: 1fr;
          }

          .feature-grid {
            grid-template-columns: 1fr 1fr;
          }

          .cineMiniGrid {
            grid-template-columns: 1fr;
          }

          .stepsGrid {
            grid-template-columns: 1fr;
          }

          .compareTable {
            grid-template-columns: 1fr;
            text-align: left;
          }

          .faqCineGrid {
            grid-template-columns: 1fr;
            justify-content: center;
          }

          .faqCineCard {
            width: 100%;
          }
        }

        @media (max-width: 479px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}