import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const BehindTheScenes01 = (props) => {
  // ✅ Editable gallery data (pass items from About page)
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

  // ✅ Keep your original layout feel: 2 / 3 / 2 (cinematic masonry)
  const col1 = items.slice(0, 2)
  const col2 = items.slice(2, 5)
  const col3 = items.slice(5, 7)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const flat = useMemo(() => [...col1, ...col2, ...col3], [col1, col2, col3])

  const openAt = useCallback(
    (idx) => {
      const safe = Math.max(0, Math.min(idx, flat.length - 1))
      setActiveIndex(safe)
      setLightboxOpen(true)
      // lock scroll
      if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
    },
    [flat.length]
  )

  const close = useCallback(() => {
    setLightboxOpen(false)
    if (typeof document !== 'undefined') document.body.style.overflow = ''
  }, [])

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + flat.length) % flat.length)
  }, [flat.length])

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % flat.length)
  }, [flat.length])

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

  const getImgClass = (ratio) => {
    if (ratio === '4-3') return 'img img43'
    return 'img img11'
  }

  const renderCol = (arr, offset) =>
    arr.map((it, i) => {
      const idx = offset + i
      return (
        <button
          key={it.id}
          type="button"
          className="cardBtn"
          onClick={() => openAt(idx)}
          aria-label={`Open ${it.alt || 'Behind the Scenes image'} preview`}
        >
          <div className="card">
            <img alt={it.alt || ''} src={it.src} className={getImgClass(it.ratio)} loading="lazy" />
            <div className="overlay" />
            <div className="meta">
              <span className="tag">BTS</span>
              <span className="hint">Click to preview</span>
            </div>
          </div>
        </button>
      )
    })

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
                    Most of the magic happens where the camera isn’t pointed — shaping light,
                    building sound layers, refining motion frame by frame. The process is hands-on,
                    detail-driven, and focused on turning ideas into crafted visual experiences.
                  </span>
                </Fragment>
              )}
            </p>
          </header>

          <div className="grid3">
            <div className="col">{renderCol(col1, 0)}</div>
            <div className="col">{renderCol(col2, 2)}</div>
            <div className="col">{renderCol(col3, 5)}</div>
          </div>
        </div>
      </section>

      {/* ✅ CINEMATIC LIGHTBOX */}
      {lightboxOpen && (
        <div className="lbOverlay" role="dialog" aria-modal="true" aria-label="Image preview">
          <button type="button" className="lbBackdrop" onClick={close} aria-label="Close preview" />

          <div className="lbShell">
            <div className="lbTop">
              <div className="lbTitle">
                <span className="lbKicker">Behind the Scenes</span>
                <span className="lbCount">
                  {activeIndex + 1}/{flat.length}
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
                <img
                  src={flat[activeIndex]?.src}
                  alt={flat[activeIndex]?.alt || ''}
                  className="lbImg"
                  draggable="false"
                />
                <div className="lbGrain" />
                <div className="lbVignette" />
              </div>

              <button type="button" className="lbNav right" onClick={next} aria-label="Next">
                ›
              </button>
            </div>

            <div className="lbFooter">
              <span className="lbAlt">{flat[activeIndex]?.alt || '—'}</span>
              <div className="lbTips">Esc to close • ← → to navigate</div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ====== SECTION ====== */
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

        /* ====== CINEMATIC GRID ====== */
        .grid3 {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--dl-layout-space-oneandhalfunits);
          align-items: start;
        }

        .col {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-oneandhalfunits);
          min-width: 0;
        }

        .cardBtn {
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
          transform: translateZ(0);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
          outline: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(0, 0, 0, 0.2);
        }

        .img {
          width: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          filter: saturate(1.05) contrast(1.02);
          transition: transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* keep your heights */
        .img11 {
          height: 440px;
        }
        .img43 {
          height: 240px;
        }

        /* filmic overlay + vignette */
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

        /* hover cinematic */
        .cardBtn:hover .img {
          transform: scale(1.08);
          filter: saturate(1.12) contrast(1.06);
        }

        .cardBtn:hover .overlay {
          opacity: 0.95;
        }

        .cardBtn:focus-visible .card {
          outline: 2px solid rgba(0, 153, 255, 0.65);
          outline-offset: 2px;
        }

        /* ====== LIGHTBOX ====== */
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
          transform: scale(1.01);
        }

        /* subtle film grain + vignette */
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
          transition: transform 180ms ease, background 180ms ease;
        }

        .lbNav:hover {
          transform: translateY(-1px);
          background: rgba(34, 34, 34, 0.7);
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

        /* ====== RESPONSIVE ====== */
        @media (max-width: 991px) {
          .grid3 {
            grid-template-columns: 1fr;
          }
          .img11,
          .img43 {
            height: 420px;
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
          .img11,
          .img43 {
            height: 320px;
          }
          .lbBody {
            padding: 12px;
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

  // ✅ preferred (editable)
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