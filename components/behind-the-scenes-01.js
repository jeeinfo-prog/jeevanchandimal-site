import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const BehindTheScenes01 = (props) => {
  const items = useMemo(() => {
    if (props.items?.length) return props.items
    return [
      { id: 'b1', src: '/about/bts-1.jpg', alt: 'Behind the Scenes 1', ratio: '1-1' },
      { id: 'b2', src: '/about/bts-2.jpg', alt: 'Behind the Scenes 2', ratio: '1-1' },
      { id: 'b3', src: '/about/bts-3.jpg', alt: 'Behind the Scenes 3', ratio: '4-3' },
      { id: 'b4', src: '/about/bts-4.jpg', alt: 'Behind the Scenes 4', ratio: '1-1' },
      { id: 'b5', src: '/about/bts-5.jpg', alt: 'Behind the Scenes 5', ratio: '4-3' },
      { id: 'b6', src: '/about/bts-6.jpg', alt: 'Behind the Scenes 6', ratio: '1-1' },
      { id: 'b7', src: '/about/bts-7.jpg', alt: 'Behind the Scenes 7', ratio: '1-1' },
    ]
  }, [props.items])

  /* -------------------- Lightbox -------------------- */
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openAt = useCallback(
    (idx) => {
      const safe = Math.max(0, Math.min(idx, items.length - 1))
      setActiveIndex(safe)
      setLightboxOpen(true)
      if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
    },
    [items.length]
  )

  const close = useCallback(() => {
    setLightboxOpen(false)
    if (typeof document !== 'undefined') document.body.style.overflow = ''
  }, [])

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + items.length) % items.length)
  }, [items.length])

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % items.length)
  }, [items.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, close, prev, next])

  /* -------------------- Auto-pick best landscape hero -------------------- */
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    let cancelled = false
    if (!items?.length) return

    const measure = (src) =>
      new Promise((resolve) => {
        const img = new window.Image()
        img.decoding = 'async'
        img.onload = () => resolve({ w: img.naturalWidth || 0, h: img.naturalHeight || 0, ok: true })
        img.onerror = () => resolve({ w: 0, h: 0, ok: false })
        img.src = src
      })

    ;(async () => {
      if (typeof window === 'undefined') return

      const results = await Promise.all(
        items.map(async (it, idx) => {
          const m = await measure(it.src)
          const w = m.w || 0
          const h = m.h || 0
          const ar = h > 0 ? w / h : 0
          const area = w * h

          const isLandscape = ar >= 1.18
          const score = isLandscape ? ar * Math.log10(Math.max(area, 10)) : 0

          return { idx, score }
        })
      )

      if (cancelled) return

      let best = { idx: 0, score: 0 }
      for (const r of results) if (r.score > best.score) best = r
      setHeroIndex(best.score > 0 ? best.idx : 0)
    })()

    return () => {
      cancelled = true
    }
  }, [items])

  const heroItem = items[heroIndex]

  // ✅ below grid: exactly 6 images (excluding hero)
  const gridItems = useMemo(() => {
    const withOriginalIndex = items.map((it, originalIndex) => ({ ...it, originalIndex }))
    const rest = withOriginalIndex.filter((it) => it.originalIndex !== heroIndex)
    return rest.slice(0, 6)
  }, [items, heroIndex])

  return (
    <>
      <section className="btsWrap thq-section-padding">
        <div className="btsMax thq-section-max-width">
          <header className="btsTitle">
            <h2 className="btsH2 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span>Behind the Scenes</span>
                </Fragment>
              )}
            </h2>

            <p className="btsP thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span>
                    Most of the magic happens where the camera isn’t pointed — shaping light, building sound layers,
                    refining motion frame by frame. The process is hands-on, detail-driven, and focused on turning ideas
                    into crafted visual experiences.
                  </span>
                </Fragment>
              )}
            </p>
          </header>

          <div className="btsLayout">
            {/* HERO */}
            {heroItem && (
              <button
                type="button"
                className="heroBtn"
                onClick={() => openAt(heroIndex)}
                aria-label="Open BTS hero preview"
              >
                <div className="heroCard">
                  <img src={heroItem.src} alt={heroItem.alt || ''} className="heroImg" loading="eager" />
                  <div className="heroOverlay" />
                  <div className="heroMeta">
                    <span className="heroTag">BEHIND THE SCENES</span>
                    <span className="heroHint">Click to preview</span>
                  </div>
                </div>
              </button>
            )}

            {/* ✅ 6 IMAGES GRID (2 rows × 3 columns) */}
            <div className="grid6">
              {gridItems.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  className="gridItem"
                  onClick={() => openAt(it.originalIndex)}
                  aria-label={`Open ${it.alt || 'BTS image'} preview`}
                >
                  <div className="card">
                    <img src={it.src} alt={it.alt || ''} className="gridImg" loading="lazy" />
                    <div className="overlay" />
                    <div className="meta">
                      <span className="tag">BTS</span>
                      <span className="hint">Preview</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="lbOverlay" role="dialog" aria-modal="true" aria-label="Image preview">
          <button type="button" className="lbBackdrop" onClick={close} aria-label="Close preview" />

          <div className="lbShell">
            <div className="lbTop">
              <div className="lbTitle">
                <span className="lbKicker">Behind the Scenes</span>
                <span className="lbCount">
                  {activeIndex + 1}/{items.length}
                </span>
              </div>

              <button type="button" className="lbClose" onClick={close} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="lbBody">
              <button type="button" className="lbNav left" onClick={prev} aria-label="Previous">
                ‹
              </button>

              <div className="lbFrame">
                <img src={items[activeIndex]?.src} alt={items[activeIndex]?.alt || ''} className="lbImg" />
                <div className="lbGrain" />
                <div className="lbVignette" />
              </div>

              <button type="button" className="lbNav right" onClick={next} aria-label="Next">
                ›
              </button>
            </div>

            <div className="lbFooter">
              <span className="lbAlt">{items[activeIndex]?.alt || '—'}</span>
              <div className="lbTips">Esc to close • ← → to navigate</div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .btsWrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .btsMax {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-threeunits);
        }

        .btsTitle {
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .btsH2 {
          letter-spacing: -0.02em;
        }

        .btsP {
          opacity: 0.92;
          line-height: 1.7;
          margin: 0;
        }

        .btsLayout {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--dl-layout-space-oneandhalfunits); /* ✅ same gap as grid */
}

        /* ===== HERO ===== */
        .heroBtn {
          border: 0;
          padding: 0;
          background: transparent;
          cursor: pointer;
          text-align: left;
        }

        .heroCard {
          position: relative;
          width: 100%;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.38);
          outline: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(0, 0, 0, 0.25);
        }

        .heroImg {
          width: 100%;
          height: clamp(360px, 46vw, 560px);
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          filter: saturate(1.08) contrast(1.06);
          transition: transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .heroOverlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(70% 70% at 50% 25%, rgba(255, 255, 255, 0.08), transparent 60%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.75));
          opacity: 0.95;
        }

        .heroMeta {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: rgba(245, 244, 244, 0.95);
        }

        .heroTag {
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 10px 12px;
          border-radius: 999px;
          background: rgba(34, 34, 34, 0.55);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(245, 244, 244, 0.14);
        }

        .heroHint {
          font-size: 12px;
          opacity: 0.85;
          padding: 10px 12px;
          border-radius: 999px;
          background: rgba(34, 34, 34, 0.35);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(245, 244, 244, 0.12);
        }

        .heroBtn:hover .heroImg {
          transform: scale(1.06);
          filter: saturate(1.14) contrast(1.1);
        }

        .heroBtn:focus-visible .heroCard {
          outline: 2px solid rgba(0, 153, 255, 0.7);
          outline-offset: 2px;
        }

        /* ===== GRID 6 (aligned) ===== */
        .grid6 {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--dl-layout-space-oneandhalfunits);
        }

        .gridItem {
          border: 0;
          padding: 0;
          background: transparent;
          cursor: pointer;
          text-align: left;
        }

        .card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
          outline: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(0, 0, 0, 0.2);
        }

        .gridImg {
          width: 100%;
          height: 230px; /* ✅ aligned cards */
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          filter: saturate(1.05) contrast(1.02);
          transition: transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .overlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(80% 70% at 50% 30%, rgba(255, 255, 255, 0.06), transparent 60%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.55));
          opacity: 0.85;
          transition: opacity 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .meta {
          position: absolute;
          inset: auto 14px 14px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: rgba(245, 244, 244, 0.92);
        }

        .tag {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(34, 34, 34, 0.55);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(245, 244, 244, 0.12);
        }

        .hint {
          font-size: 12px;
          opacity: 0.85;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(34, 34, 34, 0.35);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(245, 244, 244, 0.1);
        }

        .gridItem:hover .gridImg {
          transform: scale(1.06);
          filter: saturate(1.12) contrast(1.06);
        }

        .gridItem:hover .overlay {
          opacity: 0.95;
        }

        .gridItem:focus-visible .card {
          outline: 2px solid rgba(0, 153, 255, 0.65);
          outline-offset: 2px;
        }

        /* ===== LIGHTBOX ===== */
        .lbOverlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: grid;
          place-items: center;
          padding: 18px;
        }

        .lbBackdrop {
          position: absolute;
          inset: 0;
          border: 0;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(10px);
          cursor: pointer;
        }

        .lbShell {
          position: relative;
          width: min(1080px, 96vw);
          max-height: min(78vh, 760px);
          display: flex;
          flex-direction: column;
          border-radius: 18px;
          overflow: hidden;
          background: rgba(18, 18, 18, 0.92);
          border: 1px solid rgba(245, 244, 244, 0.12);
          box-shadow: 0 30px 120px rgba(0, 0, 0, 0.5);
        }

        .lbTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: rgba(0, 0, 0, 0.35);
          border-bottom: 1px solid rgba(245, 244, 244, 0.08);
        }

        .lbTitle {
          display: flex;
          align-items: baseline;
          gap: 10px;
          color: rgba(245, 244, 244, 0.92);
        }

        .lbKicker {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .lbCount {
          font-size: 12px;
          opacity: 0.75;
        }

        .lbClose {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(34, 34, 34, 0.55);
          color: rgba(245, 244, 244, 0.95);
          cursor: pointer;
        }

        .lbBody {
          position: relative;
          display: grid;
          grid-template-columns: 52px 1fr 52px;
          align-items: center;
          gap: 10px;
          padding: 16px;
          flex: 1;
          min-height: 0;
        }

        .lbFrame {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.35);
          outline: 1px solid rgba(245, 244, 244, 0.08);
        }

        .lbImg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .lbGrain {
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.16;
          mix-blend-mode: overlay;
          background-image: url('/about/grain.png');
          background-size: 420px 420px;
          background-repeat: repeat;
          filter: contrast(1.05);
        }

        .lbVignette {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(70% 65% at 50% 45%, transparent 0%, rgba(0, 0, 0, 0.55) 78%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.35));
          opacity: 0.9;
        }

        .lbNav {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(34, 34, 34, 0.55);
          color: rgba(245, 244, 244, 0.95);
          font-size: 30px;
          line-height: 0;
          cursor: pointer;
          display: grid;
          place-items: center;
        }

        .lbFooter {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
          border-top: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(0, 0, 0, 0.25);
          color: rgba(245, 244, 244, 0.88);
        }

        .lbAlt {
          font-size: 13px;
          opacity: 0.9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 70%;
        }

        .lbTips {
          font-size: 12px;
          opacity: 0.7;
          white-space: nowrap;
        }

        @media (max-width: 991px) {
          .grid6 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .gridImg {
            height: 220px;
          }
          .heroImg {
            height: clamp(300px, 58vw, 420px);
          }
          .lbBody {
            grid-template-columns: 44px 1fr 44px;
          }
          .lbNav {
            width: 44px;
            height: 44px;
            border-radius: 14px;
          }
        }

        @media (max-width: 767px) {
          .grid6 {
            grid-template-columns: 1fr;
          }
          .gridImg {
            height: 260px;
          }
          .heroMeta {
            flex-direction: column;
            align-items: flex-start;
          }
          .heroImg {
            height: 320px;
          }
          .lbFooter {
            flex-direction: column;
            align-items: flex-start;
          }
          .lbAlt {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  )
}

BehindTheScenes01.defaultProps = {
  heading1: undefined,
  content1: undefined,
  items: undefined,
}

BehindTheScenes01.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      ratio: PropTypes.oneOf(['1-1', '4-3']),
    })
  ),
}

export default BehindTheScenes01