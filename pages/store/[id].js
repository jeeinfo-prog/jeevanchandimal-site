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

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
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
  const [isCheckingOut, setIsCheckingOut] = React.useState(false)

  const [variant, setVariant] = React.useState('standard')
  const [zoomOpen, setZoomOpen] = React.useState(false)

  const [email, setEmail] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  const [similar, setSimilar] = React.useState([])
  const [recommended, setRecommended] = React.useState([])

  React.useEffect(() => {
    if (!router.isReady || !id) return

    let alive = true
    async function run() {
      try {
        setLoading(true)
        setError('')

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
          description: row.description || '',
          tags: Array.isArray(row.tags) ? row.tags : [],
          thumbUrl: row.thumb_url,
          previewUrl: row.preview_url,
          createdAt: row.created_at,
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

  React.useEffect(() => {
    if (!photo?.id) return

    async function run() {
      try {
        const s = await fetch(`/api/store/similar?id=${photo.id}&limit=6`).then((r) => r.json())
        setSimilar(Array.isArray(s?.photos) ? s.photos : [])

        const r = await fetch(`/api/store/recommended?excludeId=${photo.id}&limit=6`).then((r) => r.json())
        setRecommended(Array.isArray(r?.photos) ? r.photos : [])
      } catch {
        setSimilar([])
        setRecommended([])
      }
    }

    run()
  }, [photo?.id])

  const price = PRICES?.[currency]?.[license]?.[format] ?? 0
  const previewSrc = photo?.id ? `/api/photo/${photo.id}/preview?variant=${variant}` : ''

  function preventSave(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  async function startCheckout() {
    if (!photo) return

    const em = String(email || '').trim().toLowerCase()
    if (!isValidEmail(em)) {
      alert('Please enter a valid email')
      return
    }

    setIsCheckingOut(true)
    setTimeout(() => setIsCheckingOut(false), 1200)
  }

  return (
    <>
      <Head>
        <title>{photo?.title ? `${photo.title} | Store` : 'Photo | Store'}</title>
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        {loading && <div className="state">Loading…</div>}
        {!loading && error && <div className="state">❌ {error}</div>}

        {!loading && !error && photo && (
          <>
            <div className="layout">
              {/* LEFT IMAGE */}
              <section className="imageCard">
                <div className="imageFrame">
                  <img src={previewSrc} alt={photo.title} onContextMenu={preventSave} />
                  <div className="wmTile" />
                </div>

                <p className="desc">
                  {photo.description ||
                    'Premium preview with watermark. Final download is delivered clean after payment.'}
                </p>
              </section>

              {/* BUY CARD */}
            <aside className="buyCard">
  <h1 className="title">{photo.title}</h1>
  <p className="sub">Choose license + format</p>

  {/* EMAIL */}
  <div className="block">
    <span className="label">Receipt email</span>
    <input
      className="field"
      type="email"
      placeholder="you@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <div className="row2">
      <input
        className="field"
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className="field"
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>

    <p className="fine">
      We’ll send your receipt + secure download link to this email.
    </p>
  </div>

  {/* LICENSE */}
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
      Personal: non-paid use. Commercial: ads/brand/client work. Editorial: news/documentary.
    </p>
  </div>

  {/* FORMAT */}
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

  {/* CURRENCY */}
  <div className="block">
    <span className="label">Currency</span>

    <div className="options options2">
      <button
        type="button"
        className={`opt ${currency === 'LKR' ? 'active' : ''}`}
        onClick={() => setCurrency('LKR')}
      >
        LKR
      </button>

      <button
        type="button"
        className={`opt ${currency === 'USD' ? 'active' : ''}`}
        onClick={() => setCurrency('USD')}
      >
        USD
      </button>
    </div>
  </div>

  {/* PRICE */}
  <div className="priceRow">
    <span className="price">{formatMoney(currency, price)}</span>
    <span className="small">Instant digital download</span>
  </div>

  {/* BUY BUTTON */}
  <button
    type="button"
    className="buyBtn"
    onClick={startCheckout}
    disabled={isCheckingOut}
  >
    {isCheckingOut ? 'Working…' : 'Buy license'}
  </button>

  <p className="fine">
    After payment, we email your secure download link.
  </p>
</aside>
            </div>

            {/* SIMILAR */}
            {similar.length > 0 && (
              <section className="relBlock">
                <h2>Similar images</h2>
                <div className="relGrid">
                  {similar.map((p) => (
                    <Link key={p.id} href={`/store/${p.id}`}>
                      <a className="relCard">
                        <img src={p.thumb_url} alt={p.title} />
                        <div className="relName">{p.title}</div>
                      </a>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* RECOMMENDED */}
            {recommended.length > 0 && (
              <section className="relBlock">
                <h2>Recommended for you</h2>
                <div className="relGrid">
                  {recommended.map((p) => (
                    <Link key={p.id} href={`/store/${p.id}`}>
                      <a className="relCard">
                        <img src={p.thumb_url} alt={p.title} />
                        <div className="relName">{p.title}</div>
                      </a>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <JeevanChandimalNewFooter />

     <style jsx>{`
.layout {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 20px;
}

.imageFrame {
  position: relative;
}

.imageFrame img {
  width: 100%;
  border-radius: 14px;
}

/* WATERMARK */
.wmTile {
  position: absolute;
  inset: 0;
  background-image: url('/watermark-logo/watermark-logo.png');
  background-repeat: repeat;
  background-size: 220px;
  opacity: 0.08;
  pointer-events: none;
}

/* BUY CARD */
.buyCard {
  border: 1px solid rgba(245,244,244,0.12);
  border-radius: 18px;
  background: rgba(255,255,255,0.02);
  padding: 16px;
  position: sticky;
  top: 18px;
}

.title { margin: 0; font-size: 22px; }
.sub { margin: 8px 0 0; opacity: 0.75; }

.block {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(245,244,244,0.12);
}

.label { font-size: 13px; opacity: 0.85; }

.options { margin-top: 10px; display: grid; gap: 10px; }
.options3 { grid-template-columns: repeat(3, 1fr); }
.options2 { grid-template-columns: repeat(2, 1fr); }

.opt {
  padding: 10px;
  border-radius: 12px;
  border: 1px solid rgba(245,244,244,0.16);
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.85;
}

.opt.active {
  opacity: 1;
  background: rgba(245,244,244,0.12);
  border-color: rgba(245,244,244,0.3);
}

.field {
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(245,244,244,0.16);
  background: rgba(0,0,0,0.2);
  color: inherit;
}

.row2 {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.priceRow {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(245,244,244,0.12);
  display: flex;
  justify-content: space-between;
}

.price { font-size: 22px; font-weight: 700; }
.small { opacity: 0.7; font-size: 12px; }

.buyBtn {
  margin-top: 14px;
  width: 100%;
  padding: 12px;
  border-radius: 999px;
  border: 0;
  background: #f5f4f4;
  color: #222;
  font-weight: 700;
}

.fine {
  margin-top: 12px;
  opacity: 0.7;
  font-size: 12px;
}

/* RELATED GRID */
.relGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.relCard img {
  width: 100%;
  border-radius: 10px;
}
`}</style>
    </>
  )
}
