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

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
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

  const [variant] = React.useState('standard') // keep for future variants

  const [email, setEmail] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  const [similar, setSimilar] = React.useState([])
  const [recommended, setRecommended] = React.useState([])
  const [relLoading, setRelLoading] = React.useState(false)

  // Watermark controls
  const [wmOn, setWmOn] = React.useState(true)
  const [wmOpacity, setWmOpacity] = React.useState(0.08)

  // Zoom modal
  const [zoomOpen, setZoomOpen] = React.useState(false)
  const [zoom, setZoom] = React.useState(1)
  const [pan, setPan] = React.useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = React.useState(false)
  const panStart = React.useRef({ x: 0, y: 0 })
  const panOrigin = React.useRef({ x: 0, y: 0 })

  function preventSave(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function openZoom() {
    setZoomOpen(true)
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  function closeZoom() {
    setZoomOpen(false)
    setIsPanning(false)
  }

  function onWheelZoom(e) {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.08 : 0.08
    setZoom((z) => clamp(Number((z + delta).toFixed(2)), 1, 3))
  }

  function onMouseDownPan(e) {
    e.preventDefault()
    setIsPanning(true)
    panStart.current = { x: e.clientX, y: e.clientY }
    panOrigin.current = { x: pan.x, y: pan.y }
  }

  function onMouseMovePan(e) {
    if (!isPanning) return
    const dx = e.clientX - panStart.current.x
    const dy = e.clientY - panStart.current.y
    setPan({ x: panOrigin.current.x + dx, y: panOrigin.current.y + dy })
  }

  function onMouseUpPan() {
    setIsPanning(false)
  }

  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') closeZoom()
    }
    if (zoomOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomOpen])

  // ✅ Load photo details
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

        if (!r.ok || !json?.ok || !json?.photo) {
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

    // ✅ Load similar + recommended (matches existing API params)
  React.useEffect(() => {
    if (!photo?.id) return

    let alive = true

    async function loadRelated() {
      try {
        setRelLoading(true)

        // Similar expects: ?id=<photoId>
        const sResp = await fetch(
          `/api/store/similar?id=${encodeURIComponent(photo.id)}&limit=6`,
          { headers: { 'Cache-Control': 'no-store' } }
        )
        const s = await sResp.json().catch(() => ({}))
        const similarList = Array.isArray(s?.photos) ? s.photos : []

        if (!alive) return
        setSimilar(similarList)

        // Recommended expects:
        // ?excludeId=<photoId>&similarIds=<comma-separated>&limit=6
        const similarIds = similarList.map((p) => p.id).filter(Boolean).join(',')

        const rResp = await fetch(
          `/api/store/recommended?excludeId=${encodeURIComponent(
            photo.id
          )}&similarIds=${encodeURIComponent(similarIds)}&limit=6`,
          { headers: { 'Cache-Control': 'no-store' } }
        )
        const r = await rResp.json().catch(() => ({}))

        if (!alive) return
        setRecommended(Array.isArray(r?.photos) ? r.photos : [])
      } catch {
        if (!alive) return
        setSimilar([])
        setRecommended([])
      } finally {
        if (!alive) return
        setRelLoading(false)
      }
    }

    loadRelated()
    return () => {
      alive = false
    }
  }, [photo?.id])

  const price = PRICES?.[currency]?.[license]?.[format] ?? 0

  // Uses your existing preview API route pattern
  const previewSrc = photo?.id
    ? `/api/photo/${encodeURIComponent(photo.id)}/preview?variant=${variant}`
    : ''

  const firstTag = (photo?.tags || []).find(Boolean) || ''

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

      const data = await r.json().catch(() => null)

      // Expecting: { actionUrl, fields } where fields is a dict of hidden inputs
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

  return (
    <>
      <Head>
        <title>{photo?.title ? `${photo.title} | Store` : 'Photo | Store'}</title>
        <meta
          name="description"
          content="License this photograph for Personal, Commercial, or Editorial use."
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

        {loading && <div className="state">Loading…</div>}
        {!loading && error && <div className="state">❌ {error}</div>}

        {!loading && !error && photo && (
          <>
            <div className="layout">
              {/* LEFT IMAGE */}
              <section className="imageCard">
                <div className="imageFrame" onContextMenu={preventSave}>
                  <button type="button" className="zoomBtn" onClick={openZoom}>
                    Zoom
                  </button>

                  <img
                    src={previewSrc}
                    alt={photo.title}
                    draggable={false}
                    onClick={openZoom}
                    onContextMenu={preventSave}
                    onDragStart={preventSave}
                    loading="eager"
                    onError={(e) => {
                      // fallback to previewUrl then thumbUrl
                      if (photo.previewUrl && e.currentTarget.src !== photo.previewUrl) {
                        e.currentTarget.src = photo.previewUrl
                        return
                      }
                      if (photo.thumbUrl) e.currentTarget.src = photo.thumbUrl
                    }}
                  />

                  {wmOn && <div className="wmTile" style={{ opacity: wmOpacity }} />}
                </div>

                <p className="desc">
                  {photo.description ||
                    'Premium preview with watermark. Final download is delivered clean after payment.'}
                </p>

                {/* Watermark controls + details */}
                <div className="metaCard">
                  <div className="metaRow">
                    <div className="metaTitle">Watermark</div>
                    <div className="metaCell">
                      <div className="wmControls">
                        <button
                          type="button"
                          className={`miniBtn ${wmOn ? 'active' : ''}`}
                          onClick={() => setWmOn(true)}
                        >
                          On
                        </button>
                        <button
                          type="button"
                          className={`miniBtn ${!wmOn ? 'active' : ''}`}
                          onClick={() => setWmOn(false)}
                        >
                          Off
                        </button>
                      </div>
                    </div>
                    <div />
                  </div>

                  <div className="metaRow">
                    <div className="metaTitle">Strength</div>
                    <div className="metaCell">
                      <input
                        type="range"
                        min="0.02"
                        max="0.18"
                        step="0.01"
                        value={wmOpacity}
                        onChange={(e) => setWmOpacity(Number(e.target.value))}
                        className="range"
                        disabled={!wmOn}
                      />
                    </div>
                    <div className="rangeVal">{Math.round(wmOpacity * 100)}%</div>
                  </div>

                  <div className="metaRow metaRowTall">
                    <div className="metaTitle">Photo details</div>
                    <div className="metaText">
                      <div>
                        <strong>ID:</strong> {photo.id}
                      </div>
                      {photo.createdAt ? (
                        <div>
                          <strong>Date:</strong> {new Date(photo.createdAt).toLocaleDateString()}
                        </div>
                      ) : null}
                      <div>
                        <strong>Preview:</strong> Watermarked
                      </div>
                      <div>
                        <strong>Delivery:</strong> Clean file after payment
                      </div>
                    </div>
                    <div />
                  </div>

                  <div className="metaRow metaRowTall">
                    <div className="metaTitle">Tags</div>
                    <div className="metaText">
                      {Array.isArray(photo.tags) && photo.tags.length > 0 ? (
                        <div className="tagRow">
                          {photo.tags.slice(0, 14).map((t) => (
                            <Link key={t} href={`/store?tag=${encodeURIComponent(t)}`}>
                              <a className="tag">#{t}</a>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div style={{ opacity: 0.75 }}>No tags</div>
                      )}
                    </div>
                    <div />
                  </div>

                  <div className="metaRow metaRowTall">
                    <div className="metaTitle">Description</div>
                    <div className="metaText">
                      {photo.description ? (
                        photo.description
                      ) : (
                        <span style={{ opacity: 0.75 }}>No description added yet.</span>
                      )}
                    </div>
                    <div />
                  </div>
                </div>
              </section>

              {/* BUY CARD */}
              <aside className="buyCard">
                <h1 className="title">{photo.title}</h1>
                <p className="sub">Choose license + format</p>

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
                    Personal: non-paid use. Commercial: ads/brand/client work. Editorial:
                    news/documentary.
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

                <button
                  type="button"
                  className="buyBtn"
                  onClick={startCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Working…' : 'Buy license'}
                </button>

                <p className="fine">After payment, we email your secure download link.</p>
              </aside>
            </div>

            {/* SIMILAR */}
            <section className="relBlock">
              <div className="relHead">
                <h2>Similar images</h2>
                <Link href={firstTag ? `/store?tag=${encodeURIComponent(firstTag)}` : '/store'}>
                  <a className="seeAll">See all</a>
                </Link>
              </div>

              {relLoading ? (
                <div className="relState">Loading…</div>
              ) : similar.length === 0 ? (
                <div className="relState">No similar photos found yet.</div>
              ) : (
                <div className="relGrid">
                  {similar.map((p) => (
                    <Link key={p.id} href={`/store/${p.id}`}>
                      <a className="relCard">
                        <div className="relThumb">
                          <img src={p.thumb_url} alt={p.title || 'Photo'} loading="lazy" />
                          {wmOn && <div className="relWm" style={{ opacity: wmOpacity }} />}
                        </div>
                        <div className="relMeta">
                          <div className="relName">{p.title || 'Untitled'}</div>
                          <div className="relTag">
                            {Array.isArray(p.tags) && p.tags[0] ? `#${p.tags[0]}` : 'Photo'}
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* RECOMMENDED */}
            <section className="relBlock">
              <div className="relHead">
                <h2>Recommended for you</h2>
                <Link href="/store">
                  <a className="seeAll">See all</a>
                </Link>
              </div>

              {relLoading ? (
                <div className="relState">Loading…</div>
              ) : recommended.length === 0 ? (
                <div className="relState">No recommendations yet.</div>
              ) : (
                <div className="relGrid">
                  {recommended.map((p) => (
                    <Link key={p.id} href={`/store/${p.id}`}>
                      <a className="relCard">
                        <div className="relThumb">
                          <img src={p.thumb_url} alt={p.title || 'Photo'} loading="lazy" />
                          {wmOn && <div className="relWm" style={{ opacity: wmOpacity }} />}
                        </div>
                        <div className="relMeta">
                          <div className="relName">{p.title || 'Untitled'}</div>
                          <div className="relTag">
                            {Array.isArray(p.tags) && p.tags[0] ? `#${p.tags[0]}` : 'Photo'}
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* ZOOM MODAL */}
            {zoomOpen && (
              <div className="zoomOverlay" onMouseMove={onMouseMovePan} onMouseUp={onMouseUpPan}>
                <div className="zoomTop">
                  <div className="zoomTitle">{photo.title}</div>
                  <div className="zoomActions">
                    <button
                      type="button"
                      className="miniBtn"
                      onClick={() => setZoom((z) => clamp(z - 0.2, 1, 3))}
                    >
                      -
                    </button>
                    <div className="zoomPct">{Math.round(zoom * 100)}%</div>
                    <button
                      type="button"
                      className="miniBtn"
                      onClick={() => setZoom((z) => clamp(z + 0.2, 1, 3))}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="miniBtn"
                      onClick={() => {
                        setZoom(1)
                        setPan({ x: 0, y: 0 })
                      }}
                    >
                      Reset
                    </button>
                    <button type="button" className="closeBtn" onClick={closeZoom}>
                      ✕
                    </button>
                  </div>
                </div>

                <div className="zoomStage" onWheel={onWheelZoom}>
                  <div
                    className="zoomPan"
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    }}
                    onMouseDown={onMouseDownPan}
                  >
                    <img
                      src={previewSrc}
                      alt={photo.title}
                      draggable={false}
                      onContextMenu={preventSave}
                      onDragStart={preventSave}
                      className="zoomImg"
                      onError={(e) => {
                        if (photo.previewUrl && e.currentTarget.src !== photo.previewUrl) {
                          e.currentTarget.src = photo.previewUrl
                          return
                        }
                        if (photo.thumbUrl) e.currentTarget.src = photo.thumbUrl
                      }}
                    />
                    {wmOn && <div className="zoomWm" style={{ opacity: wmOpacity }} />}
                  </div>
                </div>

                <div className="zoomHint">Scroll to zoom • Drag to pan • ESC to close</div>
              </div>
            )}
          </>
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
          margin: 18px 0;
          padding: 14px 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          opacity: 0.95;
        }

        .layout {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 20px;
          align-items: start;
        }

        .imageFrame {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
        }
        .imageFrame img {
          width: 100%;
          display: block;
          border-radius: 14px;
          -webkit-user-drag: none;
          user-select: none;
          -webkit-touch-callout: none;
          cursor: zoom-in;
        }

        .zoomBtn {
          position: absolute;
          z-index: 5;
          top: 12px;
          left: 12px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(0, 0, 0, 0.35);
          color: inherit;
          cursor: pointer;
          font-weight: 600;
          font-size: 12px;
          backdrop-filter: blur(6px);
        }

        .wmTile {
          position: absolute;
          inset: 0;
          background-image: url('/watermark-logo/watermark-logo.png');
          background-repeat: repeat;
          background-size: 220px;
          pointer-events: none;
          transform: rotate(-12deg);
        }

        .desc {
          margin: 10px 0 0;
          opacity: 0.8;
          line-height: 1.6;
        }

        .metaCard {
          margin-top: 12px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.02);
          padding: 12px;
        }

        .metaRow {
          display: grid;
          grid-template-columns: 110px 1fr auto;
          gap: 10px;
          align-items: center;
          padding: 10px 0;
          border-top: 1px solid rgba(245, 244, 244, 0.08);
        }
        .metaRow:first-child {
          border-top: 0;
          padding-top: 0;
        }
        .metaRowTall {
          align-items: start;
        }

        .metaTitle {
          font-size: 12px;
          opacity: 0.8;
        }

        .metaCell {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: space-between;
        }

        .metaText {
          opacity: 0.9;
          font-size: 13px;
          line-height: 1.6;
        }

        .wmControls {
          display: inline-flex;
          gap: 8px;
        }

        .miniBtn {
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: transparent;
          color: inherit;
          cursor: pointer;
          font-size: 12px;
          opacity: 0.85;
        }
        .miniBtn.active {
          opacity: 1;
          background: rgba(245, 244, 244, 0.12);
          border-color: rgba(245, 244, 244, 0.3);
        }

        .range {
          width: 100%;
        }
        .rangeVal {
          font-size: 12px;
          opacity: 0.8;
          min-width: 44px;
          text-align: right;
        }

        .tagRow {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          text-decoration: none;
          color: inherit;
          font-size: 12px;
          opacity: 0.85;
        }
        .tag:hover {
          opacity: 1;
          border-color: rgba(245, 244, 244, 0.35);
        }

        .buyCard {
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
          padding: 16px;
          position: sticky;
          top: 18px;
        }

        .title {
          margin: 0;
          font-size: 22px;
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
          grid-template-columns: repeat(3, 1fr);
        }
        .options2 {
          grid-template-columns: repeat(2, 1fr);
        }

        .opt {
          padding: 10px;
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

        .field {
          width: 100%;
          margin-top: 10px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(0, 0, 0, 0.2);
          color: inherit;
          outline: none;
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
          padding: 12px;
          border-radius: 999px;
          border: 0;
          background: #f5f4f4;
          color: #222;
          font-weight: 700;
          cursor: pointer;
        }
        .buyBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .fine {
          margin-top: 12px;
          opacity: 0.7;
          font-size: 12px;
          line-height: 1.6;
        }

        .relBlock {
          margin-top: 16px;
          padding: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
        }

        .relHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          gap: 10px;
        }
        .seeAll {
          font-size: 12px;
          opacity: 0.75;
          text-decoration: none;
        }
        .seeAll:hover {
          opacity: 1;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .relState {
          opacity: 0.75;
          font-size: 13px;
          padding: 6px 0;
        }

        .relGrid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }

        .relCard {
          display: block;
          text-decoration: none;
          color: inherit;
          transition: transform 0.18s ease;
        }
        .relCard:hover {
          transform: translateY(-4px);
        }

        .relThumb {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }
        .relCard:hover .relThumb {
          border-color: rgba(245, 244, 244, 0.35);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
        }

        .relThumb img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
        .relCard:hover .relThumb img {
          transform: scale(1.06);
        }

        .relWm {
          position: absolute;
          inset: 0;
          background-image: url('/watermark-logo/watermark-logo.png');
          background-repeat: repeat;
          background-size: 140px;
          pointer-events: none;
          transform: rotate(-12deg);
        }

        .relMeta {
          margin-top: 6px;
        }
        .relName {
          font-size: 13px;
          line-height: 1.3;
          opacity: 0.95;
        }
        .relTag {
          font-size: 12px;
          opacity: 0.7;
        }

        /* Zoom modal */
        .zoomOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.78);
          z-index: 9999;
          display: grid;
          grid-template-rows: auto 1fr auto;
        }

        .zoomTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
        }

        .zoomTitle {
          font-size: 14px;
          opacity: 0.95;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 55vw;
        }

        .zoomActions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .zoomPct {
          font-size: 12px;
          opacity: 0.85;
          min-width: 54px;
          text-align: center;
        }

        .closeBtn {
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(245, 244, 244, 0.14);
          color: inherit;
          cursor: pointer;
          font-weight: 800;
        }

        .zoomStage {
          display: grid;
          place-items: center;
          overflow: hidden;
          user-select: none;
        }

        .zoomPan {
          position: relative;
          cursor: grab;
          transform-origin: center;
        }
        .zoomPan:active {
          cursor: grabbing;
        }

        .zoomImg {
          max-width: 92vw;
          max-height: 78vh;
          display: block;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.14);
        }

        .zoomWm {
          position: absolute;
          inset: 0;
          background-image: url('/watermark-logo/watermark-logo.png');
          background-repeat: repeat;
          background-size: 220px;
          pointer-events: none;
          transform: rotate(-12deg);
          border-radius: 14px;
        }

        .zoomHint {
          padding: 10px 16px;
          font-size: 12px;
          opacity: 0.75;
          border-top: 1px solid rgba(245, 244, 244, 0.12);
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
          .row2 {
            grid-template-columns: 1fr;
          }
          .relGrid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 520px) {
          .relGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .metaRow {
            grid-template-columns: 1fr;
          }
          .metaCell {
            justify-content: flex-start;
          }
          .rangeVal {
            text-align: left;
          }
        }
      `}</style>
    </>
  )
}
