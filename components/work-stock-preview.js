import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const WorkStockPreview = (props) => {
  // ✅ Local fallback: public/work/photography/wsp-01.jpg ... wsp-08.jpg
  const staticFallback = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0')
        return `/work/photography/wsp-${num}.jpg`
      }),
    []
  )

  const [items, setItems] = useState(() =>
    staticFallback.map((src, i) => ({
      src,
      alt: `Stock preview ${i + 1}`,
      href: props.storeHref || '/store',
    }))
  )
  const [loading, setLoading] = useState(false)

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
        <span>Stock Preview</span>
      </Fragment>
    )

  const descNode =
    props.content1 ?? (
      <Fragment>
        <span>
          A curated selection available for licensing — presented as visual
          previews, not a loud catalog. Each frame links to the store for usage
          details while staying consistent with the cinematic photographic
          language.
        </span>
      </Fragment>
    )

  function setStaticItems() {
    setItems(
      staticFallback.map((src, i) => ({
        src,
        alt: `Stock preview ${i + 1}`,
        href: props.storeHref || '/store',
      }))
    )
  }

  // ✅ Load from store (API)
  async function loadRandom() {
    if (!props.apiEndpoint) return
    try {
      setLoading(true)

      const res = await fetch(props.apiEndpoint, {
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()

      // Supports:
      // { images: ["url", ...] }
      // or { images: [{src, alt?, href?}, ...] }
      const list = Array.isArray(data?.images) ? data.images : []

      const normalized = list
        .map((x, idx) => {
          if (typeof x === 'string') {
            return {
              src: x,
              alt: `Stock preview ${idx + 1}`,
              href: props.storeHref || '/store',
            }
          }
          return {
            src: x?.src || x?.url,
            alt: x?.alt || `Stock preview ${idx + 1}`,
            href: x?.href || props.storeHref || '/store',
          }
        })
        .filter((x) => x?.src && typeof x.src === 'string')

      if (!mountedRef.current) return

      if (normalized.length) {
        setItems(normalized)
      } else if (props.fallbackToStaticOnEmpty) {
        setStaticItems()
      }
    } catch (e) {
      if (!mountedRef.current) return
      if (props.fallbackToStaticOnError) {
        setStaticItems()
      }
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }

  // initial
  useEffect(() => {
    if (props.apiEndpoint) loadRandom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.apiEndpoint])

  // ✅ Auto refresh (optional)
  useEffect(() => {
    if (!props.apiEndpoint) return
    if (!props.autoRefreshMs || props.autoRefreshMs < 5000) return

    const t = setInterval(() => {
      loadRandom()
    }, props.autoRefreshMs)

    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.apiEndpoint, props.autoRefreshMs])

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* ===== CINEMATIC HEADER CARD (like AI block) ===== */}
          <header className="hero">
            <div className="heroBg" aria-hidden="true">
              <div
                className="heroImg"
                style={{ backgroundImage: `url(${props.heroImageSrc || items?.[0]?.src || staticFallback[0]})` }}
              />
              <div className="heroVignette" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">PHOTOGRAPHY / STOCK</span>
                <span className="kickerLine" />
              </div>

              <h2 className="title thq-heading-2">{headingNode}</h2>
              <p className="desc thq-body-large">{descNode}</p>

              <div className="headActions">
                {props.apiEndpoint && (
                  <button
                    className="btnGhost"
                    type="button"
                    onClick={loadRandom}
                    disabled={loading}
                  >
                    <span className="thq-body-small">
                      {loading ? 'Refreshing…' : 'Refresh'}
                    </span>
                  </button>
                )}

                <a className="btnPrimary" href={props.storeHref || '/store'}>
                  <span className="thq-body-small">Open Store</span>
                  <svg viewBox="0 0 1024 1024" className="icon" aria-hidden="true">
                    <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
                  </svg>
                </a>
              </div>

              <div className="micro thq-body-small">
                Curated previews · Licensing-ready · Consistent visual language
              </div>
            </div>
          </header>

          {/* ===== GRID ===== */}
          <div className="grid">
            {items.map((it, idx) => (
              <a
                key={`${it.src}-${idx}`}
                className="tile"
                href={it.href || props.storeHref || '/store'}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img"
                  src={it.src}
                  alt={it.alt || `Stock preview ${idx + 1}`}
                  loading="lazy"
                />
                <div className="shade" />
                <div className="chip">License</div>
                <div className="count">{String(idx + 1).padStart(2, '0')}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .shell {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ================= HERO (cinematic card) ================= */
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
          padding: 26px 22px 18px;
          max-width: 920px;
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
          opacity: 0.9;
          line-height: 1.65;
          color: rgba(245, 244, 244, 0.84);
          max-width: 70ch;
        }

        .headActions {
          margin-top: 6px;
          display: flex;
          gap: 10px;
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        .btnPrimary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: linear-gradient(
            180deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0.06)
          );
          text-decoration: none;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          transition: transform 200ms ease, border-color 200ms ease;
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(160, 196, 255, 0.26);
        }

        .btnGhost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.18);
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: transform 200ms ease, border-color 200ms ease;
        }

        .btnGhost:hover {
          transform: translateY(-1px);
          border-color: rgba(245, 244, 244, 0.22);
        }

        .btnGhost:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .micro {
          margin-top: 6px;
          color: rgba(245, 244, 244, 0.62);
        }

        .icon {
          width: 18px;
          height: 18px;
        }

        /* ================= GRID ================= */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
          width: 100%;
          margin-top: 14px;
        }

        .tile {
          grid-column: span 3;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(0, 0, 0, 0.25);
          aspect-ratio: 16 / 9;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28);
          transform: translateZ(0);
          transition: transform 0.18s ease, border-color 0.18s ease,
            box-shadow 0.18s ease;
          text-decoration: none;
          display: block;
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
          display: block;
          transform: scale(1.02);
          transition: transform 0.28s ease;
        }

        .tile:hover .img {
          transform: scale(1.07);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.62)
          );
        }

        .chip {
          position: absolute;
          left: 10px;
          top: 10px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(8px);
          font-size: 12px;
          letter-spacing: 0.3px;
        }

        .count {
          position: absolute;
          right: 10px;
          top: 10px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
          font-size: 12px;
          letter-spacing: 0.28em;
          opacity: 0.85;
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
          .tile {
            grid-column: span 12;
          }
        }
      `}</style>
    </>
  )
}

WorkStockPreview.defaultProps = {
  rootClassName: '',

  heading1: undefined,
  content1: undefined,

  // ✅ cinematic header background (set to any strong frame)
  heroImageSrc: '/work/photography/wsp-01.jpg',

  // ✅ Store auto-load
  apiEndpoint: '/api/gallery/random?limit=8',

  // ✅ where each image should link
  storeHref: '/store',

  // ✅ auto update every 60s (set 0 to disable)
  autoRefreshMs: 60000,

  fallbackToStaticOnError: true,
  fallbackToStaticOnEmpty: true,
}

WorkStockPreview.propTypes = {
  rootClassName: PropTypes.string,

  heading1: PropTypes.element,
  content1: PropTypes.element,

  heroImageSrc: PropTypes.string,

  apiEndpoint: PropTypes.string,
  storeHref: PropTypes.string,

  autoRefreshMs: PropTypes.number,

  fallbackToStaticOnError: PropTypes.bool,
  fallbackToStaticOnEmpty: PropTypes.bool,
}

export default WorkStockPreview