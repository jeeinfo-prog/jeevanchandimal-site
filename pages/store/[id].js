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

  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setZoomOpen(false)
    }
    if (zoomOpen) {
      window.addEventListener('keydown', onKey)
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        window.removeEventListener('keydown', onKey)
        document.body.style.overflow = prev
      }
    }
  }, [zoomOpen])

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
          email: em,
          firstName: firstName || 'Customer',
          lastName: lastName || 'Guest',
        }),
      })

      const data = await r.json()
      if (!r.ok || !data?.actionUrl || !data?.fields) {
        alert(data?.error || 'Checkout failed')
        return
      }

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.actionUrl

      Object.entries(data.fields).forEach(([k, v]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = k
        input.value = String(v ?? '')
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch {
      alert('Checkout failed')
    } finally {
      setIsCheckingOut(false)
    }
  }

  const price = PRICES?.[currency]?.[license]?.[format] ?? 0
  const previewSrc = photo?.id ? `/api/photo/${photo.id}/preview?variant=${variant}` : ''

  const popularTerms = Array.from(
    new Set([...(photo?.tags || []), 'Portrait', 'Nature', 'Travel', 'Night', 'Animals'])
  ).slice(0, 10)

  return (
    <>
      <Head>
        <title>{photo?.title ? `${photo.title} | Store` : 'Photo | Store'}</title>
        <meta name="description" content={photo?.description || 'Licensable photograph'} />

        {photo && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                contentUrl: previewSrc,
                name: photo.title,
                description: photo.description || 'Licensable photograph by Jeevan Chandimal',
                creator: { '@type': 'Person', name: 'Jeevan Chandimal' },
                license: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/license`,
                acquireLicensePage: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/store/${photo.id}`,
              }),
            }}
          />
        )}
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        {loading && <div className="state">Loading…</div>}
        {!loading && error && <div className="state">❌ {error}</div>}

        {!loading && !error && photo && (
          <>
            <div className="layout">
              <div className="imageCard">
                <img src={previewSrc} alt={photo.title} onContextMenu={preventSave} />

                <div className="wmTile" />

                <button className="zoomBtn" onClick={() => setZoomOpen(true)}>
                  Zoom
                </button>
              </div>

              <div className="buyCard">
                <h1>{photo.title}</h1>

                <div className="priceRow">
                  <span>{formatMoney(currency, price)}</span>
                  <span>Instant download</span>
                </div>

                <button onClick={startCheckout} disabled={isCheckingOut}>
                  {isCheckingOut ? 'Working…' : 'Buy license'}
                </button>
              </div>
            </div>

            {similar.length > 0 && (
              <section className="relBlock">
                <h2>Similar images</h2>
                <div className="relGrid">
                  {similar.map((p) => (
                    <Link key={p.id} href={`/store/${p.id}`}>
                      <a>
                        <img src={p.thumb_url} alt={p.title} />
                        <div>{p.title}</div>
                      </a>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {recommended.length > 0 && (
              <section className="relBlock">
                <h2>Recommended for you</h2>
                <div className="relGrid">
                  {recommended.map((p) => (
                    <Link key={p.id} href={`/store/${p.id}`}>
                      <a>
                        <img src={p.thumb_url} alt={p.title} />
                        <div>{p.title}</div>
                      </a>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="relBlock">
              <h2>Try a popular search</h2>
              <div className="chips">
                {popularTerms.map((t) => (
                  <Link key={t} href={`/store?tag=${t}`}>
                    <a className="chip">{t}</a>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {zoomOpen && (
        <div className="zoomModal" onClick={() => setZoomOpen(false)}>
          <img src={previewSrc} alt={photo.title} />
        </div>
      )}

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .layout { display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 20px; }
        .imageCard { position: relative; }
        .imageCard img { width: 100%; border-radius: 14px; }
        .wmTile {
          position: absolute;
          inset: 0;
          background-image: url('/watermark-logo/watermark-logo.png');
          background-repeat: repeat;
          background-size: 220px;
          opacity: 0.08;
          pointer-events: none;
        }
        .zoomBtn { position: absolute; top: 12px; right: 12px; }
        .relGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .relGrid img { width: 100%; border-radius: 10px; }
        .chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip { border: 1px solid #ccc; padding: 6px 10px; border-radius: 999px; }
        .zoomModal { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; }
        .zoomModal img { max-width: 90%; border-radius: 14px; }
      `}</style>
    </>
  )
}
