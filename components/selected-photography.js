import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const SelectedPhotography = (props) => {
  /* ===== local fallback (12 images) ===== */
  const staticFallback = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const n = String(i + 1).padStart(2, '0')
        return `/services/photography/serphoto-${n}.jpg`
      }),
    []
  )

  const [items, setItems] = useState(
    staticFallback.map((src, i) => ({
      src,
      alt: `Photography ${i + 1}`,
      href: props.storeHref || '/store',
    }))
  )

  const [loading, setLoading] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => (mountedRef.current = false)
  }, [])

  /* ===== load from store API ===== */
  async function loadFromStore() {
    if (!props.apiEndpoint) return

    try {
      setLoading(true)

      const res = await fetch(props.apiEndpoint, {
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error()

      const data = await res.json()
      const list = Array.isArray(data?.images) ? data.images : []

      const normalized = list
        .map((x, idx) =>
          typeof x === 'string'
            ? {
                src: x,
                alt: `Photography ${idx + 1}`,
                href: props.storeHref || '/store',
              }
            : {
                src: x?.src || x?.url,
                alt: x?.alt || `Photography ${idx + 1}`,
                href: x?.href || props.storeHref || '/store',
              }
        )
        .filter((x) => x?.src)

      if (!mountedRef.current) return

      if (normalized.length) {
        setItems(normalized)
      } else if (props.fallbackToStaticOnEmpty) {
        setStatic()
      }
    } catch {
      if (!mountedRef.current) return
      if (props.fallbackToStaticOnError) setStatic()
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }

  function setStatic() {
    setItems(
      staticFallback.map((src, i) => ({
        src,
        alt: `Photography ${i + 1}`,
        href: props.storeHref || '/store',
      }))
    )
  }

  useEffect(() => {
    if (props.apiEndpoint) loadFromStore()
    // eslint-disable-next-line
  }, [props.apiEndpoint])

  /* ===== auto refresh ===== */
  useEffect(() => {
    if (!props.apiEndpoint || !props.autoRefreshMs) return
    if (props.autoRefreshMs < 5000) return

    const t = setInterval(loadFromStore, props.autoRefreshMs)
    return () => clearInterval(t)
    // eslint-disable-next-line
  }, [props.apiEndpoint, props.autoRefreshMs])

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* ===== header ===== */}
          <div className="head">
            <div className="kickerRow">
              <span className="kicker">PHOTOGRAPHY</span>
              <span className="kickerLine" />
            </div>

            <h2 className="title thq-heading-2">
              {props.heading1 ?? <span>Selected Photography</span>}
            </h2>

            <p className="desc thq-body-large">
              {props.content1 ?? (
                <span>
                  A curated selection of editorial, cinematic, and fine-art
                  photography — focused on atmosphere, texture, and detail.
                </span>
              )}
            </p>
          </div>

          {/* ===== grid ===== */}
          <div className="grid">
            {items.map((it, idx) => (
              <a
                key={`${it.src}-${idx}`}
                href={it.href || props.storeHref || '/store'}
                className="tile"
              >
                <img
                  src={it.src}
                  alt={it.alt || `Photography ${idx + 1}`}
                  loading="lazy"
                />
                <div className="shade" />
                <div className="count">{String(idx + 1).padStart(2, '0')}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          width: 100%;
        }

        .shell {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .head {
          max-width: 820px;
          display: flex;
          flex-direction: column;
          gap: 10px;
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
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .title {
          margin: 0;
          line-height: 1.1;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .desc {
          margin: 0;
          color: rgba(245, 244, 244, 0.84);
          max-width: 70ch;
        }

        /* ===== grid ===== */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
        }

        .tile {
          grid-column: span 3;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          aspect-ratio: 1 / 1;
          background: rgba(0, 0, 0, 0.25);
          display: block;
        }

        .tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 0.25s ease;
        }

        .tile:hover img {
          transform: scale(1.06);
        }

        .shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.6)
          );
        }

        .count {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 12px;
          letter-spacing: 0.28em;
          background: rgba(0, 0, 0, 0.3);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
        }

        @media (max-width: 991px) {
          .tile {
            grid-column: span 6;
          }
        }

        @media (max-width: 767px) {
          .tile {
            grid-column: span 12;
          }
        }
      `}</style>
    </>
  )
}

SelectedPhotography.defaultProps = {
  rootClassName: '',
  heading1: undefined,
  content1: undefined,

  apiEndpoint: '/api/gallery/random?limit=12',
  storeHref: '/store',
  autoRefreshMs: 60000,

  fallbackToStaticOnError: true,
  fallbackToStaticOnEmpty: true,
}

SelectedPhotography.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,

  apiEndpoint: PropTypes.string,
  storeHref: PropTypes.string,
  autoRefreshMs: PropTypes.number,

  fallbackToStaticOnError: PropTypes.bool,
  fallbackToStaticOnEmpty: PropTypes.bool,
}

export default SelectedPhotography