// components/work-cinematic-gallery.js
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WorkCinematicGallery = (props) => {
  // 🔹 Static fallback (public/work/photography/cg-01.jpg → cg-12.jpg)
  const staticFallback = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const num = String(i + 1).padStart(2, '0')
      return {
        src: `/work/photography/cg-${num}.jpg`,
        alt: `Gallery image ${i + 1}`,
        href: props.storeHref || '',
        num,
      }
    })
  }, [props.storeHref])

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
          focus on atmosphere, composition, and tonal depth — allowing each frame to exist without
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
              num: String(idx + 1).padStart(2, '0'),
            }
          }
          return {
            src: x?.src || x?.url,
            alt: x?.alt || `Gallery image ${idx + 1}`,
            href: x?.href || props.storeHref || '',
            num: String(idx + 1).padStart(2, '0'),
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
      if (e.key === 'ArrowRight')
        setActiveIdx((i) => Math.min(items.length - 1, i + 1))
      if (e.key === 'ArrowLeft') setActiveIdx((i) => Math.max(0, i - 1))
    }
    if (typeof window === 'undefined') return
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIdx, items.length])

  const active = activeIdx >= 0 ? items[activeIdx] : null

  // ✅ cinematic header hero image
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
          {/* ===== CINEMATIC HEADER CARD (luxury) ===== */}
          <header className="heroCard">
            <div className="heroBg" aria-hidden="true">
              <div className="heroImg" style={{ backgroundImage: `url(${hero})` }} />
              <div className="heroVignette" />
              <div className="heroGlow" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">PHOTOGRAPHY / GALLERY</span>
                <span className="dot" aria-hidden="true" />
                <span className="kickerSub">Light · Texture · Quiet narrative</span>
              </div>

              <h2 className="thq-heading-2 heroTitle">{headingNode}</h2>
              <p className="thq-body-large heroDesc">{descNode}</p>

              <div className="heroActions">
                {props.apiEndpoint ? (
                  <button className="cineBtnOutline" type="button" onClick={loadRandom} disabled={loading}>
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
                    <a className="cineBtnPrimary" href={props.storeHref} rel="noreferrer" aria-label="Open Store">
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
          </header>

          {/* ===== GRID (curved inner box) ===== */}
          {items.length === 0 ? (
            <div className="empty">No images found.</div>
          ) : (
            <div className="grid">
              {items.map((it, idx) => (
                <button
                  key={`${it.src}-${idx}`}
                  className="tile"
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Open image ${idx + 1}`}
                  type="button"
                >
                  <span className="frameWrap" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.src}
                      alt={it.alt || `Gallery image ${idx + 1}`}
                      className="img"
                      loading="lazy"
                      onError={(e) => {
                        // ✅ Keep tile visible (show placeholder) instead of hiding
                        e.currentTarget.style.display = 'none'
                        const btn = e.currentTarget.closest('button')
                        if (btn) btn.classList.add('broken')
                      }}
                    />
                    <span className="shade" />
                    <span className="innerStroke" />
                    <span className="tag">
                      <span className="tagText">Frame</span>
                      <span className="tagDot" aria-hidden="true" />
                      <span className="tagNum">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== LIGHTBOX (cinematic) ===== */}
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

              <button className="lbClose" onClick={() => setActiveIdx(-1)} type="button" aria-label="Close">
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
              isInternal(active.href) ? (
                <Link href={active.href} legacyBehavior>
                  <a className="lbLink">Open in Store →</a>
                </Link>
              ) : (
                <a className="lbLink" href={active.href} rel="noreferrer">
                  Open in Store →
                </a>
              )
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

        /* subtle luxury glow */
        .wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              70% 60% at 50% 0%,
              rgba(120, 166, 255, 0.07),
              rgba(0, 0, 0, 0)
            ),
            linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
          opacity: 0.95;
        }

        .shell {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ================= HERO CARD ================= */
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

        .heroImg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.03);
          filter: saturate(0.94) contrast(1.1) brightness(0.66);
        }

        .heroVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              90% 70% at 50% 18%,
              rgba(0, 0, 0, 0.06),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.85) 0%,
              rgba(0, 0, 0, 0.42) 55%,
              rgba(0, 0, 0, 0.85) 100%
            );
        }

        .heroGlow {
          position: absolute;
          inset: -40px -60px auto -60px;
          height: 180px;
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
          opacity: 0.085;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .heroInner {
          position: relative;
          z-index: 1;
          padding: 24px 22px 18px;
          max-width: 980px;
          display: flex;
          flex-direction: column;
          gap: 12px;
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

        /* Buttons */
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

        /* ================= EMPTY ================= */
        .empty {
          margin-top: 10px;
          padding: 14px 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          opacity: 0.9;
          background: rgba(0, 0, 0, 0.18);
        }

        /* ================= GRID ================= */
        .grid {
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
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.42);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
          cursor: pointer;
          padding: 0;
          aspect-ratio: 4 / 3;
        }

        .tile:hover {
          transform: translateY(-3px);
          border-color: rgba(120, 166, 255, 0.35);
          box-shadow: 0 24px 62px rgba(0, 0, 0, 0.5);
        }

        /* ✅ inner curved box */
        .frameWrap {
          position: absolute;
          inset: 10px;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.28);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.28s ease, filter 0.28s ease;
          filter: brightness(0.92) contrast(1.04) saturate(0.96);
        }

        .tile:hover .img {
          transform: scale(1.07);
          filter: brightness(0.98) contrast(1.06) saturate(1.02);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.6)
          );
          opacity: 0.65;
        }

        .innerStroke {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 14px;
          box-shadow: inset 0 0 0 1px rgba(245, 244, 244, 0.08);
        }

        .tag {
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

        .tagText {
          font-weight: 900;
        }

        .tagDot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(120, 166, 255, 0.7);
          box-shadow: 0 0 0 4px rgba(120, 166, 255, 0.12);
        }

        .tagNum {
          opacity: 0.95;
        }

        /* ✅ placeholder if image missing */
        .broken .frameWrap::after {
          content: 'Image not found';
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(0, 0, 0, 0.55);
          color: rgba(245, 244, 244, 0.85);
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ================= LIGHTBOX ================= */
        .lightbox {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(6px);
          padding: 18px;
        }

        .lbInner {
          width: min(1100px, 92vw);
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(12, 12, 12, 0.65);
          box-shadow: 0 30px 120px rgba(0, 0, 0, 0.6);
          position: relative;
        }

        .lbTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          border-bottom: 1px solid rgba(245, 244, 244, 0.08);
        }

        .lbMeta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .lbPill {
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
          color: rgba(245, 244, 244, 0.72);
        }

        .lbSep {
          width: 1px;
          height: 16px;
          background: rgba(245, 244, 244, 0.14);
        }

        .lbCount {
          font-size: 12px;
          color: rgba(245, 244, 244, 0.68);
        }

        .lbClose {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
          color: rgba(245, 244, 244, 0.9);
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease;
        }

        .lbClose:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.35);
        }

        .lbStage {
          display: grid;
          grid-template-columns: 52px 1fr 52px;
          align-items: center;
          gap: 10px;
          padding: 14px;
        }

        .lbImg {
          width: 100%;
          height: auto;
          max-height: 72vh;
          object-fit: contain;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(0, 0, 0, 0.25);
        }

        .lbNav {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
          color: rgba(245, 244, 244, 0.9);
          font-size: 28px;
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease;
        }

        .lbNav:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.35);
        }

        .lbNav:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .lbLink {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
          width: fit-content;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(120, 166, 255, 0.35);
          background: rgba(120, 166, 255, 0.14);
          text-decoration: none;
          color: rgba(245, 244, 244, 0.92);
          transition: transform 0.15s ease, border-color 0.15s ease;
        }

        .lbLink:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.55);
        }

        @media (max-width: 991px) {
          .tile {
            grid-column: span 6;
          }
        }

        @media (max-width: 767px) {
          .heroInner {
            padding: 18px 14px 14px;
          }
          .grid {
            gap: 12px;
          }
          .tile {
            grid-column: span 12;
          }
          .lbStage {
            grid-template-columns: 44px 1fr 44px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tile,
          .img,
          .cineBtnPrimary,
          .cineBtnOutline,
          .lbNav,
          .lbClose,
          .lbLink {
            transition: none;
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

  // ✅ optional hero background image for header
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