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
          A selection of images available for licensing, presented as visual
          previews rather than a commercial catalog. Each image links to the
          store for usage details, while maintaining consistency with the
          overall photographic language.
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
      <section className="wrap thq-section-padding">
        <div className="shell thq-section-max-width">
          <header className="head">
            <h2 className="title thq-heading-2">{headingNode}</h2>
            <p className="desc thq-body-large">{descNode}</p>

            <div className="headActions">
              {props.apiEndpoint && (
                <button
                  className="refreshBtn"
                  type="button"
                  onClick={loadRandom}
                  disabled={loading}
                >
                  {loading ? 'Loading…' : 'Refresh'}
                </button>
              )}

              <a className="storeBtn" href={props.storeHref || '/store'}>
                <span className="thq-body-small">Open Store</span>
                <svg viewBox="0 0 1024 1024" className="icon">
                  <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
                </svg>
              </a>
            </div>
          </header>

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

        .head {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .title {
          margin: 0;
        }

        .desc {
          margin: 0;
          opacity: 0.9;
          line-height: 1.65;
        }

        .headActions {
          margin-top: 8px;
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .refreshBtn {
          padding: 9px 14px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.06);
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease,
            background 0.15s ease;
        }

        .refreshBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.45);
          background: rgba(120, 166, 255, 0.1);
        }

        .refreshBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .storeBtn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 999px;
          border: 1px solid rgba(120, 166, 255, 0.35);
          background: rgba(120, 166, 255, 0.14);
          text-decoration: none;
          transition: transform 0.15s ease, border-color 0.15s ease,
            background 0.15s ease;
        }

        .storeBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.55);
          background: rgba(120, 166, 255, 0.18);
        }

        .icon {
          width: 18px;
          height: 18px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
          width: 100%;
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
            rgba(0, 0, 0, 0.55)
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

        @media (max-width: 991px) {
          .tile {
            grid-column: span 6;
          }
        }

        @media (max-width: 767px) {
          .head {
            text-align: left;
            margin: 0;
          }

          .headActions {
            justify-content: flex-start;
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
  heading1: undefined,
  content1: undefined,

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
  heading1: PropTypes.element,
  content1: PropTypes.element,

  apiEndpoint: PropTypes.string,
  storeHref: PropTypes.string,

  autoRefreshMs: PropTypes.number,

  fallbackToStaticOnError: PropTypes.bool,
  fallbackToStaticOnEmpty: PropTypes.bool,
}

export default WorkStockPreview