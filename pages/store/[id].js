// pages/store/[id].js

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

const PRICES = {
  LKR: {
    personal: { jpg: 2500, raw: 4000 },
    commercial: { jpg: 7500, raw: 10500 },
    editorial: { jpg: 4000, raw: 6000 },
  },
  USD: {
    personal: { jpg: 8, raw: 13 },
    commercial: { jpg: 25, raw: 35 },
    editorial: { jpg: 13, raw: 20 },
  },
}

function formatMoney(currency, amount) {
  if (currency === 'LKR') return `LKR ${Number(amount).toLocaleString('en-LK')}`
  return `$${Number(amount)}`
}

async function safeJson(resp) {
  const text = await resp.text()
  try {
    return { json: JSON.parse(text), text }
  } catch {
    return { json: null, text }
  }
}

export default function StoreDetail() {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [photo, setPhoto] = React.useState(null)

  const [currency, setCurrency] = React.useState('LKR')
  const [license, setLicense] = React.useState('personal') // personal | commercial | editorial
  const [format, setFormat] = React.useState('jpg') // jpg | raw
  const [isCheckingOut, setIsCheckingOut] = React.useState(false)

  React.useEffect(() => {
    let alive = true

    async function run() {
      if (!id) return
      try {
        setLoading(true)
        setError('')
        setPhoto(null)

        const r = await fetch(`/api/store/photo?id=${encodeURIComponent(id)}`, {
          headers: { 'Cache-Control': 'no-store' },
        })

        const { json, text } = await safeJson(r)
        if (!alive) return

        if (!r.ok || !json?.ok) {
          setError(json?.error || text || 'Failed to load photo')
          setLoading(false)
          return
        }

        const row = json.photo
        setPhoto({
          id: row.id,
          title: row.title || 'Untitled',
          tags: Array.isArray(row.tags) ? row.tags : [],
          thumbUrl: row.thumb_url,
          previewUrl: row.preview_url,
          createdAt: row.created_at,
        })

        setLoading(false)
      } catch (e) {
        if (!alive) return
        setError('Failed to load photo')
        setLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [id])

  async function startCheckout() {
    if (!photo) return
    try {
      setIsCheckingOut(true)

      // TODO: connect your real checkout here
      alert(
        `Checkout placeholder\n\nPhoto: ${photo.id}\nLicense: ${license}\nFormat: ${format}\nPrice: ${formatMoney(
          currency,
          PRICES[currency][license][format]
        )}`
      )
    } finally {
      setIsCheckingOut(false)
    }
  }

  const price = PRICES[currency][license][format]

  return (
    <>
      <Head>
        <title>{photo?.title ? `${photo.title} | Store` : 'Photo | Store'}</title>
        <meta name="description" content="License this photograph for Personal, Commercial, or Editorial use." />
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

        {loading && <div className="state">Loading…</div>}

        {!loading && error && (
          <div className="state">
            <div style={{ marginBottom: 10 }}>❌ {error}</div>
            <div style={{ opacity: 0.8, fontSize: 13 }}>
              Tip: open <span className="mono">/api/store/photo?id={id}</span> to verify the API response.
            </div>
          </div>
        )}

        {!loading && !error && photo && (
          <div className="layout">
            <section className="imageCard">
              <div className="imageFrame">
                {/* show preview from API route */}
                <img src={photo.previewUrl} alt={photo.title} />
              </div>

              <p className="watermarkHint">Preview image shown. Purchased file will be delivered without watermark.</p>

              <div className="tags">
                {(photo.tags || []).map((t) => (
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
                <span className="label">License</span>

                <div className="options options3">
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
                <span className="label">Format</span>

                <div className="options options2">
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

              <button type="button" className="buyBtn" onClick={startCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? 'Working…' : 'Buy license'}
              </button>

              <p className="fine">
                After payment, you’ll receive a secure download link (expires). (Checkout wiring next.)
              </p>
            </aside>
          </div>
        )}
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
        }
        .tbtn.active {
          opacity: 1;
          background: rgba(245, 244, 244, 0.12);
        }

        .state {
          margin-top: 18px;
          padding: 14px 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          opacity: 0.95;
        }
        .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;
          font-size: 12px;
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
        .label {
          font-size: 13px;
          opacity: 0.85;
        }
        .options {
          margin-top: 10px;
          display: grid;
          gap: 10px;
        }
        .options3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .options2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .opt {
          padding: 10px 10px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: transparent;
          color: inherit;
          cursor: pointer;
          opacity: 0.85;
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
          opacity: 1;
        }
        .buyBtn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
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
          .options3 {
            grid-template-columns: 1fr;
          }
          .options2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
