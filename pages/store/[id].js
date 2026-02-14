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

  // ✅ Watermark variant (controls tiled watermark density)
  const [variant, setVariant] = React.useState('standard')

  // ✅ Zoom modal
  const [zoomOpen, setZoomOpen] = React.useState(false)

  // ✅ Customer details for receipt + download link
  const [email, setEmail] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  React.useEffect(() => {
    if (!router.isReady) return
    if (!id) return

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
  }, [router.isReady, id])

  // ✅ ESC close zoom + lock scroll
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

  function openZoom(e) {
    if (e && typeof e.button === 'number' && e.button !== 0) return
    setZoomOpen(true)
  }

  async function startCheckout() {
    if (!photo) return

    const em = String(email || '').trim().toLowerCase()
    if (!isValidEmail(em)) {
      alert('Please enter a valid email for receipt + download link.')
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
          firstName: (firstName || 'Customer').trim(),
          lastName: (lastName || 'Guest').trim(),
          phone: '0000000000',
          address: 'N/A',
          city: 'N/A',
          country: 'Sri Lanka',
        }),
      })

      const data = await r.json()

      if (!r.ok || !data?.actionUrl || !data?.fields) {
        alert(data?.error || 'Checkout init failed')
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
    } catch (e) {
      console.error(e)
      alert('Checkout failed')
    } finally {
      setIsCheckingOut(false)
    }
  }

  const price = PRICES[currency][license][format]
  const previewSrc = photo?.id ? `/api/photo/${encodeURIComponent(photo.id)}/preview?variant=${variant}` : ''

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
              <div className="imageFrame wm">
                <button
                  type="button"
                  className="zoomBtn"
                  onClick={openZoom}
                  onContextMenu={preventSave}
                  onDragStart={preventSave}
                  aria-label="Zoom preview"
                  title="Click to zoom"
                >
                  <img
                    key={`${photo.id}:${variant}`}
                    src={previewSrc}
                    alt={photo.title}
                    loading="eager"
                    draggable={false}
                    onContextMenu={preventSave}
                    onDragStart={preventSave}
                    onError={(e) => {
                      if (photo.previewUrl && e.currentTarget.src !== photo.previewUrl) {
                        e.currentTarget.src = photo.previewUrl
                        return
                      }
                      if (photo.thumbUrl) e.currentTarget.src = photo.thumbUrl
                    }}
                  />

                  {/* ✅ TILED logo watermark overlay (visual only) */}
                  <div className={`wmTile wmTile-${variant}`} aria-hidden="true" />

                  <span className="zoomPill">Zoom</span>
                </button>
              </div>

              <div className="wmSelector" role="group" aria-label="Watermark selector">
                {['standard', 'corner', 'strong'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`wmBtn ${variant === v ? 'active' : ''}`}
                    onClick={() => setVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <p className="watermarkHint">Preview image shown. Purchased file will be delivered without watermark.</p>

              <div className="tags">
                {(photo.tags || []).map((t) => (
                  <Link key={t} href={`/store?tag=${encodeURIComponent(t)}`}>
                    <a className="tag">{t}</a>
                  </Link>
                ))}
              </div>
            </section>

            <aside className="buyCard">
              <h1 className="title">{photo.title}</h1>
              <p className="sub">Choose license + format</p>

              {/* ✅ Email + name for receipt + download link */}
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

                <p className="fine">We’ll send your receipt + secure download link to this email.</p>
              </div>

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

              <p className="fine">After payment, we email your secure download link.</p>
            </aside>
          </div>
        )}
      </main>

      {zoomOpen && photo && (
        <div
          className="zoomModal"
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomOpen(false)}
          onContextMenu={preventSave}
        >
          <div className="zoomInner" onClick={(e) => e.stopPropagation()}>
            <button className="zoomClose" type="button" onClick={() => setZoomOpen(false)} aria-label="Close zoom">
              ✕
            </button>

            <div className="zoomImgWrap">
              <img
                src={previewSrc}
                alt={photo.title}
                draggable={false}
                onContextMenu={preventSave}
                onDragStart={preventSave}
              />

              {/* ✅ TILED logo watermark overlay inside zoom */}
              <div className={`zoomWm wmTile wmTile-${variant}`} aria-hidden="true" />
            </div>

            <div className="zoomHint">ESC to close</div>
          </div>
        </div>
      )}

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding: 40px 20px 90px; }
        .top { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 16px; }
        .back { text-decoration: none; opacity: 0.8; }
        .back:hover { opacity: 1; text-decoration: underline; text-underline-offset: 3px; }
        .toggle { display: inline-flex; border: 1px solid rgba(245,244,244,0.18); border-radius: 999px; overflow: hidden; }
        .tbtn { padding: 10px 14px; background: transparent; color: inherit; border: 0; cursor: pointer; opacity: 0.75; }
        .tbtn.active { opacity: 1; background: rgba(245,244,244,0.12); }
        .state { margin-top: 18px; padding: 14px 16px; border: 1px solid rgba(245,244,244,0.12); border-radius: 14px; opacity: 0.95; }
        .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono','Courier New', monospace; font-size: 12px; }
        .layout { display: grid; grid-template-columns: 1.35fr 0.65fr; gap: 18px; align-items: start; }
        .imageCard,.buyCard { border: 1px solid rgba(245,244,244,0.12); border-radius: 18px; background: rgba(255,255,255,0.02); }
        .imageCard { overflow: hidden; }
        .imageFrame { width: 100%; aspect-ratio: 16/10; background: rgba(255,255,255,0.02); position: relative; }
        .zoomBtn { all: unset; cursor: zoom-in; display: block; width: 100%; height: 100%; position: relative; z-index: 2; }
        .imageFrame img { width: 100%; height: 100%; object-fit: cover; display: block; -webkit-user-drag:none; user-select:none; -webkit-touch-callout:none; }

        .zoomPill { position: absolute; right: 12px; top: 12px; padding: 6px 10px; border-radius: 999px; font-size: 12px; font-weight: 700;
          background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.14); color: rgba(245,244,244,0.95); pointer-events:none; }

        .watermarkHint { margin: 10px 14px 0; opacity: 0.7; font-size: 13px; }
        .tags { display: flex; flex-wrap: wrap; gap: 8px; padding: 14px; }
        .tag { font-size: 12px; padding: 6px 10px; border-radius: 999px; border: 1px solid rgba(245,244,244,0.14); opacity: 0.85; text-decoration: none; color: inherit; }

        .wmSelector { display: flex; gap: 10px; padding: 12px 14px 0; }
        .wmBtn { padding: 6px 12px; border-radius: 999px; border: 1px solid rgba(245,244,244,0.18); background: transparent; color: inherit; cursor: pointer; opacity: 0.8; text-transform: lowercase; font-size: 12px; }
        .wmBtn.active { opacity: 1; background: rgba(245,244,244,0.12); }

        /* ✅ Tiled logo watermark */
        .wmTile {
          position: absolute;
          inset: 0;
          pointer-events: none;
          user-select: none;
          z-index: 4;

          background-image: url('/watermark-logo/watermark-logo.png');
          background-repeat: repeat;
          background-position: center;
          background-size: 220px;
          opacity: 0.08;
          transform: rotate(-12deg);
        }
        .wmTile-standard { background-size: 220px; opacity: 0.08; }
        .wmTile-corner { background-size: 260px; opacity: 0.06; }
        .wmTile-strong { background-size: 180px; opacity: 0.12; }

        .buyCard { padding: 16px; position: sticky; top: 18px; }
        .title { margin: 0; font-size: 22px; line-height: 1.2; }
        .sub { margin: 8px 0 0; opacity: 0.75; }
        .block { margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(245,244,244,0.12); }
        .label { font-size: 13px; opacity: 0.85; }
        .options { margin-top: 10px; display: grid; gap: 10px; }
        .options3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .options2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .opt { padding: 10px 10px; border-radius: 12px; border: 1px solid rgba(245,244,244,0.16); background: transparent; color: inherit; cursor: pointer; opacity: 0.85; }
        .opt.active { opacity: 1; background: rgba(245,244,244,0.12); border-color: rgba(245,244,244,0.3); }
        .priceRow { margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(245,244,244,0.12); display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .price { font-size: 22px; font-weight: 700; }
        .small { opacity: 0.7; font-size: 12px; }
        .buyBtn { margin-top: 14px; width: 100%; padding: 12px 14px; border-radius: 999px; border: 0; cursor: pointer; background: #f5f4f4; color: #222222; font-weight: 700; }
        .buyBtn:disabled { cursor: not-allowed; opacity: 0.6; }
        .fine { margin: 12px 0 0; opacity: 0.7; font-size: 12px; line-height: 1.6; }

        .field { width: 100%; margin-top: 10px; padding: 12px 12px; border-radius: 12px; border: 1px solid rgba(245,244,244,0.16);
          background: rgba(0,0,0,0.2); color: inherit; outline: none; }
        .field:focus { border-color: rgba(245,244,244,0.32); }
        .row2 { margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        .zoomModal { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.78);
          display: flex; align-items: center; justify-content: center; padding: 18px; cursor: zoom-out; }
        .zoomInner { position: relative; max-width: 1200px; width: 100%; cursor: default; }
        .zoomImgWrap { position: relative; }
        .zoomImgWrap img { width: 100%; height: auto; display: block; border-radius: 14px; border: 1px solid rgba(255,255,255,0.12);
          -webkit-user-drag:none; user-select:none; -webkit-touch-callout:none; }
        .zoomWm { border-radius: 14px; }
        .zoomClose { position: absolute; top: -10px; right: -10px; width: 36px; height: 36px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18); background: rgba(0,0,0,0.55); color: #f5f4f4; cursor: pointer; font-size: 16px; }
        .zoomHint { margin-top: 10px; text-align: center; font-size: 12px; opacity: 0.75; color: rgba(245,244,244,0.9); }

        @media (max-width: 991px) {
          .layout { grid-template-columns: 1fr; }
          .buyCard { position: static; }
          .options3 { grid-template-columns: 1fr; }
          .options2 { grid-template-columns: 1fr; }
          .row2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
