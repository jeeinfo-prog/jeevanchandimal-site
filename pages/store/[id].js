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

                <div className="priceRow">
                  <span className="price">{formatMoney(currency, price)}</span>
                  <span className="small">Instant digital download</span>
                </div>

                <button className="buyBtn" onClick={startCheckout}>
                  Buy license
                </button>
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
        .layout { display: grid; grid-template-columns: 1.35fr 0.65fr; gap: 20px; }
        .imageFrame { position: relative; }
        .imageFrame img { width: 100%; border-radius: 14px; }
        .wmTile {
          position: absolute;
          inset: 0;
          background-image: url('/watermark-logo/watermark-logo.png');
          background-repeat: repeat;
          background-size: 220px;
          opacity: 0.08;
          pointer-events: none;
        }
        .buyCard { border: 1px solid rgba(255,255,255,0.12); padding: 16px; border-radius: 14px; }
        .price { font-size: 22px; font-weight: 700; }
        .buyBtn { margin-top: 14px; width: 100%; padding: 12px; border-radius: 999px; border: 0; }
        .relGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .relCard img { width: 100%; border-radius: 10px; }
      `}</style>
    </>
  )
}
