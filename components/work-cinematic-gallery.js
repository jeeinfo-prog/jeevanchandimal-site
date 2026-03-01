// components/work-cinematic-gallery.js
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WorkCinematicGallery = (props) => {
  // 🔹 Static fallback (public/work/photography/cg-01.jpg → cg-12.jpg)
  const staticFallback = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0')
        return {
          src: `/work/photography/cg-${num}.jpg`,
          alt: `Gallery image ${i + 1}`,
          href: props.storeHref || '',
        }
      }),
    [props.storeHref]
  )

  // ✅ items = [{src, alt?, href?}]
  const [items, setItems] = useState(staticFallback)
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)

  // ✅ prevent setState after unmount
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span className="titleText">Cinematic Gallery</span>
      </Fragment>
    )

  const descNode =
    props.content1 ?? (
      <Fragment>
        <span>
          A curated selection of photographs presented as standalone visual studies. These images
          focus on atmosphere, composition, and tonal depth—allowing each frame to exist without
          explanation.
        </span>
      </Fragment>
    )

  function setStatic() {
    setItems(staticFallback)
  }

  // 🔹 Fetch random images from API (supports strings or objects)
  async function loadRandom() {
    if (!props.apiEndpoint) return
    try {
      setLoading(true)
      const res = await fetch(props.apiEndpoint, {
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      const list = Array.isArray(data?.images) ? data.images : []

      const normalized = list
        .map((x, idx) => {
          if (typeof x === 'string') {
            return {
              src: x,
              alt: `Gallery image ${idx + 1}`,
              href: props.storeHref || '',
            }
          }
          return {
            src: x?.src || x?.url,
            alt: x?.alt || `Gallery image ${idx + 1}`,
            href: x?.href || props.storeHref || '',
          }
        })
        .filter((x) => x?.src && typeof x.src === 'string')

      if (!mountedRef.current) return

      if (normalized.length) {
        setItems(normalized)
      } else if (props.fallbackToStaticOnEmpty) {
        setStatic()
      }
    } catch (e) {
      if (!mountedRef.current) return
      if (props.fallbackToStaticOnError) setStatic()
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }

  // 🔹 initial load
  useEffect(() => {
    if (props.apiEndpoint) loadRandom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.apiEndpoint])

  // 🔹 shuffle mode
  useEffect(() => {
    if (!props.shuffle) return
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5))
  }, [props.shuffle])

  // 🔹 keyboard navigation for lightbox
  useEffect(() => {
    function onKey(e) {
      if (activeIdx < 0) return
      if (e.key === 'Escape') setActiveIdx(-1)
      if (e.key === 'ArrowRight') setActiveIdx((i) => Math.min(items.length - 1, i + 1))
      if (e.key === 'ArrowLeft') setActiveIdx((i) => Math.max(0, i - 1))
    }
    if (typeof window === 'undefined') return
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIdx, items.length])

  const active = activeIdx >= 0 ? items[activeIdx] : null

  // ✅ HERO / PROP IMAGE (for header card only)
  const hero =
    props.heroImageSrc ||
    items?.[0]?.src ||
    staticFallback?.[0]?.src ||
    '/work/photography/cg-01.jpg'

  const isInternal = (href) => typeof href === 'string' && href.startsWith('/')

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* ===== HEADER: Title + Prop Text + Prop Image INSIDE curved box ===== */}
          <header className="heroCard">
            <div className="heroBg" aria-hidden="true">
              <div className="heroGlow" />
              <div className="heroGrain" />
            </div>

            <div className="heroGrid">
              {/* LEFT: Title + text */}
              <div className="heroLeft">
                <div className="kickerRow">
                  <span className="kicker">PHOTOGRAPHY / GALLERY</span>
                  <span className="dot" aria-hidden="true" />
                  <span className="kickerSub">Light · Texture · Quiet narrative</span>
                </div>

                <h2 className="heroTitle thq-heading-2">{headingNode}</h2>
                <p className="heroDesc thq-body-large">{descNode}</p>

                <div className="heroActions">
                  {props.apiEndpoint ? (
                    <button
                      className="cineBtnOutline"
                      type="button"
                      onClick={loadRandom}
                      disabled={loading}
                    >
                      {loading ? 'Loading…' : 'Refresh Images'}
                    </button>
                  ) : null}

                  {props.storeHref ? (
                    isInternal(props.storeHref) ? (
                      <Link href={props.storeHref} legacyBehavior>
                        <a className="cineBtnPrimary" aria-label="Open Store">
                          <span className="thq-body-small">Open Store</span>
                          <svg viewBox="0 0 1024 1024" className="icon" aria-hidden="true">
                            <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
                          </svg>
                        </a>
                      </Link>
                    ) : (
                      <a className="cineBtnPrimary" href={props.storeHref} rel="noreferrer">
                        <span className="thq-body-small">Open Store</span>
                        <svg viewBox="0 0 1024 1024" className="icon" aria-hidden="true">
                          <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
                        </svg>
                      </a>
                    )
                  ) : null}
                </div>

                <div className="micro thq-body-small">
                  Tap any frame to preview • Arrow keys to navigate • Esc to close
                </div>
              </div>

              {/* RIGHT: Prop image inside curved frame */}
              <div className="heroRight" aria-hidden="true">
                <div className="propOuter">
                  <div className="propInner">
                    <div className="propImg" style={{ backgroundImage: `url(${hero})` }} />
                    <div className="propShade" />
                    <div className="propStroke" />
                    <div className="propPill">
                      <span className="propPillTxt">Featured</span>
                      <span className="propPillDot" />
                      <span className="propPillTxt2">Gallery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* ===== GRID (unchanged) ===== */}
          {items.length === 0 ? (
            <div className="empty">No images found.</div>
          ) : (
            <div className="masonry">
              {items.map((it, idx) => (
                <button
                  key={`${it.src}-${idx}`}
                  className="tile"
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Open image ${idx + 1}`}
                  type="button"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.src}
                    alt={it.alt || `Gallery image ${idx + 1}`}
                    className="img"
                    loading="lazy"
                  />
                  <div className="shade" />
                  <span className="glow" />
                  <span className="count">{String(idx + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== LIGHTBOX (unchanged) ===== */}
      {active && active.src && (
        <div className="lightbox" onClick={() => setActiveIdx(-1)}>
          <div className="lbInner" onClick={(e) => e.stopPropagation()}>
            <div className="lbTop">
              <div className="lbMeta">
                <span className="lbPill">Cinematic Gallery</span>
                <span className="lbSep" />
                <span className="lbCount">
                  {activeIdx + 1} / {items.length}
                </span>
              </div>

              <button className="lbClose" onClick={() => setActiveIdx(-1)} type="button">
                ✕
              </button>
            </div>

            <div className="lbStage">
              <button
                className="lbNav"
                onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                disabled={activeIdx === 0}
                type="button"
                aria-label="Previous"
              >
                ‹
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="lbImg" src={active.src} alt={active.alt || 'Preview'} />

              <button
                className="lbNav"
                onClick={() => setActiveIdx((i) => Math.min(items.length - 1, i + 1))}
                disabled={activeIdx === items.length - 1}
                type="button"
                aria-label="Next"
              >
                ›
              </button>
            </div>

            {active.href ? (
              <a className="lbLink" href={active.href}>
                Open in Store →
              </a>
            ) : null}
          </div>
        </div>
      )}

      <style jsx>{`
        .wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .shell {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ================= HERO CARD (NEW) ================= */
        .heroCard {
          position: relative;
          width: 100%;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }

        .heroBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .heroGlow {
          position: absolute;
          inset: -60px -80px auto -80px;
          height: 220px;
          background: radial-gradient(
            60% 70% at 50% 50%,
            rgba(120, 166, 255, 0.14),
            rgba(120, 166, 255, 0)
          );
          opacity: 0.9;
          filter: blur(2px);
        }

        .heroGrain {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .heroGrid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 18px;
          padding: 22px;
          align-items: center;
        }

        .heroLeft {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
        }

        .kickerRow {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          opacity: 0.92;
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(120, 166, 255, 0.7);
          box-shadow: 0 0 0 4px rgba(120, 166, 255, 0.12);
        }

        .kickerSub {
          font-size: 12px;
          color: rgba(245, 244, 244, 0.7);
          letter-spacing: 0.08em;
        }

        .titleText {
          display: inline-block;
          letter-spacing: 0.2px;
        }

        .heroTitle {
          margin: 0;
          line-height: 1.08;
          color: #f5f4f4;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .heroDesc {
          margin: 0;
          opacity: 0.88;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
          max-width: 78ch;
        }

        .heroActions {
          margin-top: 6px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .micro {
          margin-top: 2px;
          color: rgba(245, 244, 244, 0.62);
        }

        .cineBtnPrimary,
        .cineBtnOutline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 999px;
          text-decoration: none;
          backdrop-filter: blur(6px);
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease,
            box-shadow 0.18s ease;
          white-space: nowrap;
        }

        .cineBtnPrimary {
          border: 1px solid rgba(120, 166, 255, 0.55);
          background: rgba(120, 166, 255, 0.16);
          color: #f5f4f4;
          font-size: 13px;
          font-weight: 800;
        }

        .cineBtnPrimary:hover {
          background: rgba(120, 166, 255, 0.22);
          box-shadow: 0 0 0 4px rgba(120, 166, 255, 0.14),
            0 0 18px rgba(120, 166, 255, 0.22);
          transform: translateY(-1px);
        }

        .cineBtnOutline {
          border: 1px solid rgba(245, 244, 244, 0.24);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(245, 244, 244, 0.88);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .cineBtnOutline:hover {
          border-color: rgba(120, 166, 255, 0.55);
          color: #f5f4f4;
          box-shadow: 0 0 16px rgba(120, 166, 255, 0.16);
          transform: translateY(-1px);
        }

        .cineBtnOutline:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .icon {
          width: 18px;
          height: 18px;
          opacity: 0.95;
        }

        /* RIGHT: PROP IMAGE IN CURVED BOX */
        .heroRight {
          display: flex;
          justify-content: flex-end;
          min-width: 0;
        }

        .propOuter {
          width: 100%;
          max-width: 420px;
          border-radius: 20px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(0, 0, 0, 0.22);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.45);
          padding: 10px;
        }

        .propInner {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(245, 244, 244, 0.08);
          transform: translateZ(0);
        }

        .propImg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.03);
          filter: saturate(0.95) contrast(1.06) brightness(0.78);
        }

        .propShade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.12),
            rgba(0, 0, 0, 0.72)
          );
        }

        .propStroke {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          pointer-events: none;
          box-shadow: inset 0 0 0 1px rgba(245, 244, 244, 0.1);
        }

        .propPill {
          position: absolute;
          left: 10px;
          top: 10px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          color: rgba(245, 244, 244, 0.88);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .propPillDot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(120, 166, 255, 0.75);
          box-shadow: 0 0 0 4px rgba(120, 166, 255, 0.12);
        }

        /* ================= BELOW HERE: your existing grid/lightbox styles can remain ================= */
        .empty {
          margin-top: 14px;
          padding: 14px 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          opacity: 0.9;
        }

        .masonry {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
          width: 100%;
          margin-top: 6px;
        }

        .tile {
          grid-column: span 3;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          padding: 0;
          cursor: pointer;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28);
          background: rgba(0, 0, 0, 0.25);
          aspect-ratio: 4 / 3;
          transform: translateZ(0);
          transition: transform 0.18s ease, border-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .tile:hover {
          transform: translateY(-3px);
          border-color: rgba(120, 166, 255, 0.35);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.42);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.25s ease;
          display: block;
          transform: scale(1.02);
          filter: saturate(0.98) contrast(1.04) brightness(0.92);
        }

        .tile:hover .img {
          transform: scale(1.07);
          filter: saturate(1.02) contrast(1.05) brightness(1);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.55)
          );
          opacity: 0.55;
        }

        .glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at 50% 50%,
            rgba(120, 166, 255, 0.18),
            transparent
          );
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .tile:hover .glow {
          opacity: 1;
        }

        .count {
          position: absolute;
          right: 10px;
          bottom: 10px;
          font-size: 12px;
          letter-spacing: 0.26em;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(8px);
          color: rgba(245, 244, 244, 0.78);
        }

        /* Responsive */
        @media (max-width: 991px) {
          .heroGrid {
            grid-template-columns: 1fr;
          }
          .heroRight {
            justify-content: flex-start;
          }
          .propOuter {
            max-width: 520px;
          }
          .tile {
            grid-column: span 6;
          }
        }

        @media (max-width: 767px) {
          .heroGrid {
            padding: 16px 14px;
          }
          .tile {
            grid-column: span 12;
          }
        }
      `}</style>
    </>
  )
}

WorkCinematicGallery.defaultProps = {
  heading1: undefined,
  content1: undefined,
  rootClassName: '',

  // ✅ optional hero / prop image for header
  heroImageSrc: '/work/photography/cg-01.jpg',

  apiEndpoint: '/api/gallery/random?limit=12',
  storeHref: '/store',

  shuffle: false,
  fallbackToStaticOnError: true,
  fallbackToStaticOnEmpty: true,
}

WorkCinematicGallery.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,

  heroImageSrc: PropTypes.string,

  apiEndpoint: PropTypes.string,
  storeHref: PropTypes.string,

  shuffle: PropTypes.bool,
  fallbackToStaticOnError: PropTypes.bool,
  fallbackToStaticOnEmpty: PropTypes.bool,
}

export default WorkCinematicGallery