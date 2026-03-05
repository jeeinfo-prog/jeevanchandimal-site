import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

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

  // ✅ abort in-flight requests + ignore stale results
  const abortRef = useRef(null)
  const reqIdRef = useRef(0)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (abortRef.current) abortRef.current.abort()
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
          A curated selection of photographs presented as standalone visual
          studies. These images focus on atmosphere, composition, and tonal
          depth—allowing each frame to exist without explanation.
        </span>
      </Fragment>
    )

  function setStatic() {
    setItems(staticFallback)
  }

  // ✅ helper to bust CDN/browser cache
  function withCacheBust(url) {
    const u = new URL(
      url,
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
    )
    u.searchParams.set('_t', String(Date.now()))
    return u.pathname + u.search
  }

  // 🔹 Fetch random images from API (supports strings or objects)
  async function loadRandom() {
    if (!props.apiEndpoint) return

    // cancel any previous fetch
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const myReqId = ++reqIdRef.current

    try {
      setLoading(true)

      const endpoint = withCacheBust(props.apiEndpoint)

      const res = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
        signal: controller.signal,
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
      if (myReqId !== reqIdRef.current) return // stale response guard

      if (normalized.length) {
        setItems(normalized)
      } else if (props.fallbackToStaticOnEmpty) {
        setStatic()
      }
    } catch (e) {
      if (!mountedRef.current) return
      if (e?.name === 'AbortError') return
      if (props.fallbackToStaticOnError) setStatic()
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }

  // 🔹 initial load (and when endpoint changes)
  useEffect(() => {
    if (props.apiEndpoint) loadRandom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.apiEndpoint])

  // ✅ refresh when user returns to the tab
  useEffect(() => {
    if (!props.refreshOnFocus) return
    if (typeof window === 'undefined') return

    const onFocus = () => {
      if (props.apiEndpoint) loadRandom()
    }

    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.refreshOnFocus, props.apiEndpoint])

  // ✅ auto refresh every X ms
  useEffect(() => {
    if (!props.autoRefreshInterval || !props.apiEndpoint) return
    if (typeof window === 'undefined') return

    const timer = setInterval(() => {
      loadRandom()
    }, props.autoRefreshInterval)

    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.autoRefreshInterval, props.apiEndpoint])

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
  // If heroImageSrc is passed explicitly, use it.
  // Otherwise follow the newest loaded items[0].
  const hero = useMemo(() => {
    if (props.heroImageSrc) return props.heroImageSrc
    if (items?.[0]?.src) return items[0].src
    return staticFallback?.[0]?.src || '/work/photography/cg-01.jpg'
  }, [items, props.heroImageSrc, staticFallback])

  return (
    <>
      <section
        className={`wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="shell thq-section-max-width">
          {/* ===== CINEMATIC HEADER CARD (bit different) ===== */}
          <header className="hero">
            <div className="heroBg" aria-hidden="true">
              <div
                className="heroImg"
                style={{ backgroundImage: `url(${hero})` }}
              />
              <div className="heroVignette" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">PHOTOGRAPHY / GALLERY</span>
                <span className="kickerLine" />
              </div>

              <h2 className="title thq-heading-2">{headingNode}</h2>
              <p className="desc thq-body-large">{descNode}</p>

              <div className="heroActions">
                {props.apiEndpoint && (
                  <button
                    className="btnGhost"
                    type="button"
                    onClick={loadRandom}
                    disabled={loading}
                  >
                    {loading ? 'Loading…' : 'Refresh Images'}
                  </button>
                )}

                {!!(props.storeHref || active?.href) && (
                  <a
                    className="btnPrimary"
                    href={props.storeHref || active?.href || '/store'}
                  >
                    <span className="thq-body-small">Open Store</span>
                    <svg viewBox="0 0 1024 1024" className="icon">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
                    </svg>
                  </a>
                )}
              </div>

              <div className="micro thq-body-small">
                Tap any frame to preview · Arrow keys to navigate · Esc to close
                · Auto refresh every{' '}
                {Math.round((props.autoRefreshInterval || 0) / 1000)}s
              </div>
            </div>
          </header>

          {/* ===== GRID (masonry-ish but cleaner) ===== */}
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
                  <span className="count">
                    {String(idx + 1).padStart(2, '0')}
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

              <button
                className="lbClose"
                onClick={() => setActiveIdx(-1)}
                type="button"
              >
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
              <img
                className="lbImg"
                src={active.src}
                alt={active.alt || 'Preview'}
              />

              <button
                className="lbNav"
                onClick={() =>
                  setActiveIdx((i) => Math.min(items.length - 1, i + 1))
                }
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
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ================= HERO ================= */
        .hero {
          position: relative;
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
          filter: saturate(0.92) contrast(1.08) brightness(0.72);
        }

        .heroVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 60% at 50% 22%,
              rgba(0, 0, 0, 0.06),
              rgba(0, 0, 0, 0.72)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.8) 0%,
              rgba(0, 0, 0, 0.45) 55%,
              rgba(0, 0, 0, 0.82) 100%
            );
        }

        .heroGrain {
          position: absolute;
          inset: 0;
          opacity: 0.08;
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

        .kickerLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.16),
            rgba(245, 244, 244, 0)
          );
        }

        .title {
          margin: 0;
          line-height: 1.08;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .desc {
          margin: 0;
          color: rgba(245, 244, 244, 0.84);
          opacity: 0.92;
          line-height: 1.7;
          max-width: 72ch;
        }

        .heroActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .btnPrimary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(120, 166, 255, 0.35);
          background: rgba(120, 166, 255, 0.14);
          text-decoration: none;
          transition: transform 0.15s ease, border-color 0.15s ease,
            background 0.15s ease;
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.55);
          background: rgba(120, 166, 255, 0.18);
        }

        .btnGhost {
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.06);
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease,
            background 0.15s ease;
        }

        .btnGhost:hover {
          transform: translateY(-1px);
          border-color: rgba(245, 244, 244, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }

        .btnGhost:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .icon {
          width: 18px;
          height: 18px;
        }

        .micro {
          margin-top: 6px;
          color: rgba(245, 244, 244, 0.62);
        }

        /* ================= EMPTY ================= */
        .empty {
          margin-top: 14px;
          padding: 14px 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          opacity: 0.9;
        }

        /* ================= MASONRY GRID ================= */
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

        /* ================= LIGHTBOX ================= */
        .lightbox {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(6px);
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
          padding: 12px 12px;
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
          gap: 8px;
          margin: 0 auto 14px;
          width: fit-content;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(120, 166, 255, 0.35);
          background: rgba(120, 166, 255, 0.14);
          text-decoration: none;
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
          .masonry {
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
          .glow,
          .btnPrimary,
          .btnGhost,
          .lbNav {
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

  // ✅ IMPORTANT: do NOT set a real default image here,
  // otherwise hero will never follow loaded items.
  heroImageSrc: undefined,

  apiEndpoint: '/api/gallery/random?limit=12',
  storeHref: '/store',

  shuffle: false,
  fallbackToStaticOnError: true,
  fallbackToStaticOnEmpty: true,

  // ✅ refresh when tab gains focus
  refreshOnFocus: true,

  // ✅ auto refresh every 60 seconds
  autoRefreshInterval: 60000,
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

  refreshOnFocus: PropTypes.bool,
  autoRefreshInterval: PropTypes.number,
}

export default WorkCinematicGallery