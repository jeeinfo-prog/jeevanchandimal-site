import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

import { getPhotoById } from '../../lib/photos'

const PRICES = {
  LKR: {
    personal: { jpg: 2500, raw: 4000 },
    commercial: { jpg: 6500, raw: 9500 },
    editorial: { jpg: 4000, raw: 6000 },
  },
  USD: {
    personal: { jpg: 8, raw: 13 },
    commercial: { jpg: 22, raw: 32 },
    editorial: { jpg: 13, raw: 20 },
  },
}

function formatMoney(currency, amount) {
  if (currency === 'LKR') return `LKR ${amount.toLocaleString('en-LK')}`
  return `$${amount}`
}

export default function StoreDetail() {
  const router = useRouter()
  const { id } = router.query

  const photo = React.useMemo(() => (id ? getPhotoById(String(id)) : null), [id])

  const [currency, setCurrency] = React.useState('LKR')
  const [license, setLicense] = React.useState('personal') // personal | commercial | editorial
  const [format, setFormat] = React.useState('jpg') // jpg | raw

  // Optional: basic loading state for checkout click
  const [isCheckingOut, setIsCheckingOut] = React.useState(false)

  // ✅ PayHere checkout starter (replaces alert)
  async function startCheckout() {
    if (!photo) return

    try {
      setIsCheckingOut(true)

      const r = await fetch('/api/payhere/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoId: photo.id,
          license,
          format,
          currency,
          email: prompt('Enter email to receive receipt (optional):') || '',
          firstName: 'Customer',
          lastName: 'Guest',
          phone: '0000000000',
          address: 'N/A',
          city: 'N/A',
          country: 'Sri Lanka',
        }),
      })

      const data = await r.json()
      if (!r.ok) {
        alert(data?.error || 'Checkout failed')
        return
      }

      // Build an auto-submitting form to PayHere (required flow)
      const formEl = document.createElement('form')
      formEl.method = 'POST'
      formEl.action = data.actionUrl

      Object.entries(data.fields).forEach(([k, v]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = k
        input.value = String(v)
        formEl.appendChild(input)
      })

      document.body.appendChild(formEl)
      formEl.submit()
    } catch (e) {
      alert('Checkout error. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (!photo) {
    return (
      <>
        <JeevanChandimalNavi />
        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '70px 20px' }}>
          <p style={{ opacity: 0.8 }}>Loading…</p>
          <p>
            <Link href="/store">
              <a style={{ textDecoration: 'underline' }}>Back to store</a>
            </Link>
          </p>
        </main>
        <JeevanChandimalNewFooter />
      </>
    )
  }

  const price = PRICES[currency][license][format]

  return (
    <>
      <Head>
        <title>{photo.title} | Store</title>
        <meta
          name="description"
          content={`License "${photo.title}" for Personal, Commercial, or Editorial use.`}
        />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="top">
          <Link href="/store">
            <a className="back">← Back to store</a>
          </Link>

          <div className="toggle" role="group" aria-label="Currency toggle">
            <button
              type="button"
              className={`tbtn ${currency === 'LKR' ? 'active' : ''}`}
              onClick={() => setCurrency('LKR')}
            >
              LKR
            </button>
            <button
              type="button"
              className={`tbtn ${currency === 'USD' ? 'active' : ''}`}
              onClick={() => setCurrency('USD')}
            >
              USD
            </button>
          </div>
        </div>

        <div className="layout">
          <section className="imageCard">
            <div className="imageFrame">
              <img src={photo.previewUrl} alt={photo.title} />
            </div>
            <p className="watermarkHint">
              Preview image shown. Purchased file will be delivered without watermark.
            </p>

            <div className="tags">
              {photo.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <aside className="buyCard">
            <h1 className="title">{photo.title}</h1>
            <p className="sub">Choose license + format</p>

            <div className="block">
              <div className="labelRow">
                <span className="label">License</span>
              </div>

              <div className="options">
                <button
                  type="button"
                  className={`opt ${license === 'personal' ? 'active' : ''}`}
                  onClick={() => setLicense('personal')}
                >
                  Personal
                </button>
                <button
                  type="button"
                  className={`opt ${license === 'commercial' ? 'active' : ''}`}
                  onClick={() => setLicense('commercial')}
                >
                  Commercial
                </button>
                <button
                  type="button"
                  className={`opt ${license === 'editorial' ? 'active' : ''}`}
                  onClick={() => setLicense('editorial')}
                >
                  Editorial
                </button>
              </div>

              <p className="fine">
                Personal: non-paid use. Commercial: ads/brand/client work. Editorial: news/documentary (no promotion).
              </p>
            </div>

            <div className="block">
              <div className="labelRow">
                <span className="label">Format</span>
              </div>

              <div className="options">
                <button
                  type="button"
                  className={`opt ${format === 'jpg' ? 'active' : ''}`}
                  onClick={() => setFormat('jpg')}
                >
                  JPG
                </button>
                <button
                  type="button"
                  className={`opt ${format === 'raw' ? 'active' : ''}`}
                  onClick={() => setFormat('raw')}
                >
                  RAW
                </button>
              </div>
            </div>

            <div className="priceRow">
              <span className="price">{formatMoney(currency, price)}</span>
              <span className="small">Instant digital download</span>
            </div>

            <button
              type="button"
              className="buyBtn"
              onClick={startCheckout}
              disabled={isCheckingOut}
              aria-busy={isCheckingOut ? 'true' : 'false'}
            >
              {isCheckingOut ? 'Redirecting…' : 'Buy license'}
            </button>

            <p className="fine">
              After payment, you’ll receive a secure download link (expires). You can re-download from your account
              (when we add login).
            </p>
          </aside>
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px 90px;
        }
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .back {
          text-decoration: none;
          opacity: 0.8;
        }
        .back:hover {
          opacity: 1;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .toggle {
          display: inline-flex;
          border: 1px solid rgba(245, 244, 244, 0.18);
          border-radius: 999px;
          overflow: hidden;
        }
        .tbtn {
          padding: 10px 14px;
          background: transparent;
          color: inherit;
          border: 0;
          cursor: pointer;
          opacity: 0.75;
          transition: opacity 180ms ease, background 180ms ease;
        }
        .tbtn:hover {
          opacity: 1;
        }
        .tbtn.active {
          opacity: 1;
          background: rgba(245, 244, 244, 0.12);
        }

        .layout {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 18px;
          align-items: start;
        }
        .imageCard,
        .buyCard {
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
        }
        .imageCard {
          overflow: hidden;
        }
        .imageFrame {
          width: 100%;
          aspect-ratio: 16/10;
          background: rgba(255, 255, 255, 0.02);
        }
        .imageFrame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .watermarkHint {
          margin: 10px 14px 0;
          opacity: 0.7;
          font-size: 13px;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 14px;
        }
        .tag {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          opacity: 0.85;
        }

        .buyCard {
          padding: 16px;
          position: sticky;
          top: 18px;
        }
        .title {
          margin: 0;
          font-size: 22px;
          line-height: 1.2;
        }
        .sub {
          margin: 8px 0 0;
          opacity: 0.75;
        }
        .block {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid rgba(245, 244, 244, 0.12);
        }
        .labelRow {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 10px;
        }
        .label {
          font-size: 13px;
          opacity: 0.85;
        }
        .options {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }
        .opt {
          padding: 10px 10px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: transparent;
          color: inherit;
          cursor: pointer;
          opacity: 0.85;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, opacity 180ms ease;
        }
        .opt:hover {
          opacity: 1;
          transform: translateY(-1px);
          border-color: rgba(245, 244, 244, 0.26);
        }
        .opt.active {
          opacity: 1;
          background: rgba(245, 244, 244, 0.12);
          border-color: rgba(245, 244, 244, 0.3);
        }

        .priceRow {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid rgba(245, 244, 244, 0.12);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
        }
        .price {
          font-size: 22px;
          font-weight: 700;
        }
        .small {
          opacity: 0.7;
          font-size: 12px;
        }
        .buyBtn {
          margin-top: 14px;
          width: 100%;
          padding: 12px 14px;
          border-radius: 999px;
          border: 0;
          cursor: pointer;
          background: #f5f4f4;
          color: #222222;
          font-weight: 700;
          transition: transform 180ms ease, opacity 180ms ease;
        }
        .buyBtn:hover {
          transform: translateY(-1px);
          opacity: 0.95;
        }
        .buyBtn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
          transform: none;
        }
        .fine {
          margin: 12px 0 0;
          opacity: 0.7;
          font-size: 12px;
          line-height: 1.6;
        }

        @media (max-width: 991px) {
          .layout {
            grid-template-columns: 1fr;
          }
          .buyCard {
            position: static;
          }
          .options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
