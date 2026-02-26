// pages/memberships.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

/* ================== helpers ================== */

const STORAGE_CCY_KEY = 'jc_currency_v1'
const DEFAULT_CURRENCY = 'USD'

// ✅ USD base prices (server enforces + auto-converts LKR at checkout)
const PRICES_USD = {
  basic: 49,
  pro: 89,
  elite: 149,
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

function safeCurrency(v) {
  const c = String(v || '').trim().toUpperCase()
  return c === 'LKR' ? 'LKR' : 'USD'
}

function readCurrency() {
  if (typeof window === 'undefined') return DEFAULT_CURRENCY
  return safeCurrency(window.localStorage.getItem(STORAGE_CCY_KEY))
}

function writeCurrency(ccy) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_CCY_KEY, safeCurrency(ccy))
}

function formatPayhereAmount(n) {
  const x = Number(n || 0)
  return x.toFixed(2)
}

function formatMoney(currency, amount) {
  const c = safeCurrency(currency)
  const n = Number(amount || 0)
  if (c === 'LKR') return `LKR ${Math.round(n).toLocaleString('en-LK')}`
  return `$${Number(n).toLocaleString('en-US')}`
}

/* ================== reveal hook ================== */

function useRevealOnScroll() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!els.length) return

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      els.forEach((el) => el.classList.add('revealIn'))
      return
    }

    els.forEach((el) => el.classList.add('revealInit'))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealIn')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ================== page ================== */

export default function Memberships() {
  useRevealOnScroll()

  const [email, setEmail] = React.useState('')
  const [loadingPlan, setLoadingPlan] = React.useState('') // 'monthly' | ...
  const [error, setError] = React.useState('')

  // ✅ default USD + persisted toggle
  const [currency, setCurrency] = React.useState(DEFAULT_CURRENCY)

  // FAQ tabs + accordion
  const tabs = React.useMemo(() => ['General', 'Licensing', 'Billing'], [])
  const [faqTab, setFaqTab] = React.useState('General')
  const [openFaq, setOpenFaq] = React.useState(-1)

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
        a: 'Yes. Each plan includes a monthly download cap to protect the archive. Your usage resets every billing cycle.',
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
        a: 'Yes. JPG files are delivered as professionally graded, high-resolution files suitable for digital and print (tier dependent).',
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

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const savedEmail = window.localStorage.getItem('user_email')
    if (savedEmail && !email) setEmail(savedEmail)

    const c = readCurrency()
    setCurrency(c)
    writeCurrency(c)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setOpenFaq(-1)
  }, [faqTab])

  async function startMembershipCheckout(plan) {
    try {
      setError('')
      const cleanEmail = String(email || '').trim().toLowerCase()

      if (!isValidEmail(cleanEmail)) {
        setError('Please enter a valid email address.')
        return
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('user_email', cleanEmail)
      }

      setLoadingPlan(plan)

      // 1) create membership order in DB (server returns hash)
      // NOTE: UI sends plan='monthly' -> server assumes tier='pro' (backward compatible)
      const res = await fetch('/api/membership/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, plan, currency: safeCurrency(currency) }),
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

      const webhookBase = String(process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL || '').trim() || siteUrl

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
      const payCurrency = json.currency
      const hash = json.hash

      if (!orderId || !amount || !payCurrency || !hash) {
        setError('Missing order details from server (orderId/amount/currency/hash).')
        setLoadingPlan('')
        return
      }

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
        currency: payCurrency,
        amount: formatPayhereAmount(amount),

        // ✅ REQUIRED
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
          <section className="hero" data-reveal>
            <h1 className="thq-heading-1 center">Membership</h1>
            <p className="thq-body-large center sub">
              Unlimited access to a curated archive of cinematic photography. Built for filmmakers,
              agencies, brands, and publishers.
            </p>

            {/* Currency toggle */}
            <div className="toggleRow">
              <span className="toggleLabel">Pricing</span>
              <div className="togglePills" role="tablist" aria-label="Currency toggle">
                {['USD', 'LKR'].map((c) => {
                  const active = safeCurrency(currency) === c
                  return (
                    <button
                      key={c}
                      type="button"
                      className={`pill ${active ? 'active' : ''}`}
                      onClick={() => {
                        const next = safeCurrency(c)
                        setCurrency(next)
                        writeCurrency(next)
                      }}
                      aria-pressed={active ? 'true' : 'false'}
                    >
                      <span>{c}</span>
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
                  const v = e.target.value
                  setEmail(v)
                  if (typeof window !== 'undefined') {
                    window.localStorage.setItem('user_email', v)
                  }
                }}
                placeholder="you@example.com"
                inputMode="email"
              />
              {error ? <p className="errorText">{error}</p> : null}
            </div>
          </section>

          {/* PLANS (cinematic 360 cards) */}
          <section className="cineBlock" data-reveal>
            <h2 className="thq-heading-2 center">Choose your plan</h2>

            <div className="cineGrid">
              {/* BASIC */}
              <div className="cineCard">
                <div className="cineTop">
                  <h3 className="cineTitle">Basic</h3>
                  <p className="cinePrice">{formatMoney('USD', PRICES_USD.basic)} / month</p>
                </div>

                <ul className="cineList">
                  <li>✔ Personal use</li>
                  <li>✔ JPG downloads</li>
                  <li>✔ Standard resolution</li>
                  <li>✖ Commercial license</li>
                  <li>✖ RAW files</li>
                </ul>

                <div className="capNote">20 JPG downloads / month</div>

                <button className="thq-button-outline cineBtn" disabled>
                  Coming Soon
                </button>
              </div>

              {/* PRO (mapped to monthly) */}
              <div className="cineCard featured">
                <div className="cineTop">
                  <h3 className="cineTitle">Pro</h3>
                  <p className="cinePrice">{formatMoney('USD', PRICES_USD.pro)} / month</p>
                </div>

                <ul className="cineList">
                  <li>✔ Commercial license</li>
                  <li>✔ Monthly access</li>
                  <li>✔ High resolution JPG</li>
                  <li>✔ Priority support</li>
                  <li>✖ RAW files</li>
                </ul>

                <div className="capNote">75 JPG downloads / month</div>

                <button
                  className="thq-button-filled cineBtn"
                  onClick={() => startMembershipCheckout('monthly')}
                  disabled={loadingPlan === 'monthly'}
                >
                  {loadingPlan === 'monthly' ? 'Redirecting…' : 'Get Pro Access'}
                </button>

                <p className="smallNote">You’ll be redirected to PayHere to complete payment.</p>
              </div>

              {/* ELITE */}
              <div className="cineCard">
                <div className="cineTop">
                  <h3 className="cineTitle">Elite</h3>
                  <p className="cinePrice">{formatMoney('USD', PRICES_USD.elite)} / month</p>
                </div>

                <ul className="cineList">
                  <li>✔ Full commercial license</li>
                  <li>✔ JPG + RAW access</li>
                  <li>✔ Early access to new collections</li>
                  <li>✔ Agency-friendly usage</li>
                  <li>✔ Direct collaboration options</li>
                </ul>

                <div className="capNote">200 downloads / month + RAW</div>

                <button className="thq-button-outline cineBtn" disabled>
                  Coming Soon
                </button>

                <p className="smallNote">
                  Elite checkout is coming soon. <Link href="/contact">Contact me</Link> if you need
                  access now.
                </p>
              </div>
            </div>
          </section>

          {/* FEATURE LIST */}
          <section className="membership-features" data-reveal>
            <h2 className="thq-heading-2">Why Membership?</h2>

            <div className="feature-grid">
              <div>
                <h4>Curated Archive</h4>
                <p>No stock clutter — only cinematic work.</p>
              </div>

              <div>
                <h4>Commercial Ready</h4>
                <p>Use in film, advertising, and editorial projects.</p>
              </div>

              <div>
                <h4>Clear Limits</h4>
                <p>Monthly caps protect the archive while keeping pricing fair.</p>
              </div>

              <div>
                <h4>New Work Monthly</h4>
                <p>Fresh collections added regularly.</p>
              </div>
            </div>
          </section>

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
                <p>Access your member downloads instantly.</p>
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
                <div>✔ 20 / mo</div>
                <div>✔ 75 / mo</div>

                <div>RAW files</div>
                <div>✖</div>
                <div>✖</div>

                <div>Commercial license</div>
                <div>✖</div>
                <div>✔</div>

                <div>Resolution</div>
                <div>Standard</div>
                <div>High</div>

                <div>Price (USD)</div>
                <div>{formatMoney('USD', PRICES_USD.basic)}</div>
                <div>{formatMoney('USD', PRICES_USD.pro)}</div>
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
        .center {
          text-align: center;
        }

        /* ---------- reveal ---------- */
        .revealInit {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 600ms ease, transform 600ms ease;
          will-change: opacity, transform;
        }
        .revealIn {
          opacity: 1;
          transform: translateY(0);
        }

        /* ✅ prevent “shift left” feeling */
        .hero,
        .membership-features,
        .faqHead,
        .compareWrap,
        .cineBlock {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        /* ---------- hero ---------- */
        .hero {
          max-width: 860px;
          margin: 0 auto var(--dl-layout-space-fiveunits);
          display: grid;
          gap: 18px;
          justify-items: center;
        }
        .sub {
          max-width: 760px;
          opacity: 0.9;
          line-height: 1.7;
        }

        .toggleRow {
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .toggleLabel {
          font-size: 13px;
          opacity: 0.85;
        }
        .togglePills {
          display: inline-flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .pill {
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(255, 255, 255, 0.02);
          color: inherit;
          border-radius: 999px;
          padding: 10px 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 800;
          opacity: 0.86;
          transition: 0.18s ease;
        }
        .pill:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
          transform: translateY(-1px);
        }
        .pill.active {
          border-color: rgba(37, 195, 226, 0.7);
          background: rgba(37, 195, 226, 0.08);
          opacity: 1;
        }
        .pillArrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: 0.18s ease;
        }
        .pill:hover .pillArrow,
        .pill.active .pillArrow {
          opacity: 1;
          transform: translateX(0);
        }

        .emailBox {
          width: 100%;
          max-width: 520px;
          text-align: left;
          display: grid;
          gap: 10px;
          margin-top: 6px;
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

        /* ---------- cinematic blocks ---------- */
        .cineBlock {
          margin-top: var(--dl-layout-space-fiveunits);
          text-align: center;
        }

        /* ✅ earlier card sizing (fluid + capped) */
        .cineGrid {
          width: 100%;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          margin-top: var(--dl-layout-space-threeunits);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          justify-items: center;
        }

        .cineCard {
          width: 100%;
          max-width: 380px;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          padding: 18px 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
          text-align: left;
        }
        .cineCard:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 244, 244, 0.3);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25);
        }

        .cineCard.featured {
          border-color: rgba(37, 195, 226, 0.65);
          background: rgba(37, 195, 226, 0.07);
        }

        .cineTop {
          display: grid;
          gap: 4px;
        }
        .cineTitle {
          margin: 0;
          font-size: 18px;
        }
        .cinePrice {
          margin: 0;
          font-size: 14px;
          opacity: 0.9;
        }

        .cineList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 8px;
          opacity: 0.95;
          font-size: 13px;
        }

        .capNote {
          font-size: 12px;
          opacity: 0.85;
          padding: 8px 10px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .cineBtn {
          margin-top: 6px;
        }

        .smallNote {
          margin: 0;
          font-size: 12px;
          opacity: 0.85;
          line-height: 1.5;
        }

        /* ---------- features ---------- */
        .membership-features {
          margin-top: var(--dl-layout-space-fiveunits);
          text-align: center;
        }
        .feature-grid {
          max-width: 1200px;
          margin: var(--dl-layout-space-threeunits) auto 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--dl-layout-space-threeunits);
          text-align: left;
        }
        .feature-grid h4 {
          margin: 0 0 8px;
        }
        .feature-grid p {
          margin: 0;
          opacity: 0.88;
          line-height: 1.7;
        }

        /* ---------- license mini grid ---------- */
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
          text-align: left;
        }
        .stepCard:hover {
          border-color: rgba(37, 195, 226, 0.55);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.1);
          transform: translateY(-2px);
        }

        /* ---------- compare table ---------- */
        .compareWrap {
          margin-top: var(--dl-layout-space-threeunits);
          display: flex;
          justify-content: center;
        }
        .compareTable {
          width: 100%;
          max-width: 860px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          background: rgba(255, 255, 255, 0.02);
          text-align: center;
        }
        .compareTable > div {
          padding: 14px 14px;
          border-bottom: 1px solid rgba(245, 244, 244, 0.08);
          border-right: 1px solid rgba(245, 244, 244, 0.08);
          font-size: 13px;
          opacity: 0.95;
        }
        .compareTable > div:nth-child(3n) {
          border-right: 0;
        }
        .compareHead {
          font-weight: 800;
          background: rgba(0, 0, 0, 0.22);
        }

        /* ---------- FAQ ---------- */
        .faqWrap {
          margin-top: var(--dl-layout-space-fiveunits);
          text-align: center;
        }
        .faqHead {
          max-width: 920px;
          margin: 0 auto;
        }
        .faqSub {
          opacity: 0.9;
          line-height: 1.7;
          margin-top: 10px;
        }

        .faqTabs {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .faqTab {
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(255, 255, 255, 0.02);
          color: inherit;
          border-radius: 999px;
          padding: 10px 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 800;
          opacity: 0.86;
          transition: 0.18s ease;
        }
        .faqTab:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
          transform: translateY(-1px);
        }
        .faqTab.active {
          border-color: rgba(37, 195, 226, 0.7);
          background: rgba(37, 195, 226, 0.08);
          opacity: 1;
        }
        .faqTabArrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: 0.18s ease;
        }
        .faqTab:hover .faqTabArrow,
        .faqTab.active .faqTabArrow {
          opacity: 1;
          transform: translateX(0);
        }

        .faqCineGrid {
          width: 100%;
          max-width: 1200px;
          margin: 18px auto 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          justify-items: center;
        }
        .faqCineCard {
          width: 100%;
          max-width: 380px;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          overflow: hidden;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
          text-align: left;
        }
        .faqCineCard:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 244, 244, 0.3);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25);
        }
        .faqCineCard.active {
          border-color: rgba(37, 195, 226, 0.7);
          background: rgba(37, 195, 226, 0.06);
        }

        .faqTrigger {
          width: 100%;
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          padding: 14px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-align: left;
        }
        .faqQ {
          font-size: 13px;
          font-weight: 800;
          line-height: 1.35;
          opacity: 0.95;
        }
        .faqIcon {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          display: grid;
          place-items: center;
          opacity: 0.9;
          background: rgba(0, 0, 0, 0.2);
          flex: 0 0 auto;
          transition: 0.18s ease;
        }
        .faqCineCard:hover .faqIcon {
          border-color: rgba(245, 244, 244, 0.28);
        }
        .faqSvg {
          width: 18px;
          height: 18px;
          fill: currentColor;
          opacity: 0.9;
        }

        .faqAnswer {
          padding: 0 14px 14px;
          border-top: 1px solid rgba(245, 244, 244, 0.1);
          animation: fadeIn 260ms ease;
        }
        .faqA {
          margin: 12px 0 0;
          opacity: 0.9;
          line-height: 1.7;
        }

        /* ---------- CTA cards ---------- */
        .ctaCard {
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
          border-radius: 18px;
          border: 1px solid rgba(37, 195, 226, 0.45);
          background: rgba(37, 195, 226, 0.08);
          padding: 22px 18px;
          text-align: center;
          display: grid;
          gap: 10px;
        }
        .ctaCard h3 {
          margin: 0;
          font-size: 18px;
        }
        .ctaCard p {
          margin: 0;
          opacity: 0.9;
          line-height: 1.7;
        }
        .ctaCard.subtle {
          border-color: rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* --- theme buttons (only this page) --- */
        :global(.thq-button-filled) {
          border-radius: 999px !important;
          border: 1px solid rgba(37, 195, 226, 0.55) !important;
          background: rgba(37, 195, 226, 0.16) !important;
          color: #f5f4f4 !important;
          transition: 0.2s ease !important;
        }
        :global(.thq-button-filled:hover) {
          background: rgba(37, 195, 226, 0.24) !important;
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.14) !important;
          transform: translateY(-1px);
        }

        :global(.thq-button-outline) {
          border-radius: 999px !important;
          border: 1px solid rgba(245, 244, 244, 0.18) !important;
          background: rgba(255, 255, 255, 0.02) !important;
          color: #f5f4f4 !important;
          transition: 0.2s ease !important;
        }
        :global(.thq-button-outline:hover) {
          border-color: rgba(37, 195, 226, 0.45) !important;
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.12) !important;
          transform: translateY(-1px);
        }

        /* ---------- responsive ---------- */
        @media (max-width: 1100px) {
          .cineGrid,
          .faqCineGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cineMiniGrid {
            grid-template-columns: repeat(2, minmax(0, 260px));
          }
        }

        @media (max-width: 760px) {
          .cineGrid,
          .faqCineGrid {
            grid-template-columns: 1fr;
          }
          .stepsGrid {
            grid-template-columns: 1fr;
          }
          .cineMiniGrid {
            grid-template-columns: 1fr;
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