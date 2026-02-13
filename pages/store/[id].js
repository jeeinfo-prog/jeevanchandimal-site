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
  const [license, setLicense] = React.useState('personal')
  const [format, setFormat] = React.useState('jpg')
  const [variant, setVariant] = React.useState('standard')
  const [isCheckingOut, setIsCheckingOut] = React.useState(false)

  React.useEffect(() => {
    if (!router.isReady || !id) return

    let alive = true

    async function run() {
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
        })

        setLoading(false)
      } catch {
        if (!alive) return
        setError('Failed to load photo')
        setLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [router.isReady, id])

  const price = PRICES[currency][license][format]

  const previewSrc = photo?.id
    ? `/api/photo/${encodeURIComponent(photo.id)}/preview?variant=${variant}`
    : ''

  async function startCheckout() {
    if (!photo) return
    try {
      setIsCheckingOut(true)
      alert(
        `Checkout placeholder\n\nPhoto: ${photo.id}\nLicense: ${license}\nFormat: ${format}\nPrice: ${formatMoney(
          currency,
          price
        )}`
      )
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <>
      <Head>
        <title>{photo?.title ? `${photo.title} | Store` : 'Photo | Store'}</title>
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="top">
          <Link href="/store">
            <a className="back">← Back to store</a>
          </Link>

          <div className="toggle">
            <button className={`tbtn ${currency === 'LKR' ? 'active' : ''}`} onClick={() => setCurrency('LKR')}>
              LKR
            </button>
            <button className={`tbtn ${currency === 'USD' ? 'active' : ''}`} onClick={() => setCurrency('USD')}>
              USD
            </button>
          </div>
        </div>

        {loading && <div className="state">Loading…</div>}
        {!loading && error && <div className="state">❌ {error}</div>}

        {!loading && !error && photo && (
          <div className="layout">
            <section className="imageCard">
              <div className="imageFrame wm">
                <img src={previewSrc} alt={photo.title} />

                {/* WATERMARK OVERLAY TEXT */}
                <span>JEEVAN CHANDIMAL</span>
              </div>

              {/* WATERMARK SELECTOR */}
              <div className="wmSelector">
                {['standard', 'corner', 'strong'].map((v) => (
                  <button
                    key={v}
                    className={`wmBtn ${variant === v ? 'active' : ''}`}
                    onClick={() => setVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <p className="watermarkHint">
                Preview image shown. Purchased file will be delivered without watermark.
              </p>

              <div className="tags">
                {photo.tags.map((t) => (
                  <Link key={t} href={`/store?tag=${encodeURIComponent(t)}`}>
                    <a className="tag">{t}</a>
                  </Link>
                ))}
              </div>
            </section>

            <aside className="buyCard">
              <h1 className="title">{photo.title}</h1>

              <div className="priceRow">
                <span className="price">{formatMoney(currency, price)}</span>
              </div>

              <button className="buyBtn" onClick={startCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? 'Working…' : 'Buy license'}
              </button>
            </aside>
          </div>
        )}
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wm {
          position: relative;
        }

        .wm img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wm span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-20deg);
          font-size: 42px;
          letter-spacing: 6px;
          color: rgba(255, 255, 255, 0.15);
          pointer-events: none;
          z-index: 5;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
          white-space: nowrap;
        }

        .wmSelector {
          display: flex;
          gap: 10px;
          margin: 10px 0;
        }

        .wmBtn {
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          color: inherit;
          cursor: pointer;
        }

        .wmBtn.active {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </>
  )
}
