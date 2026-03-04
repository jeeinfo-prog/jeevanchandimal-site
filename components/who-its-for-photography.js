// components/who-its-for-photography.js
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

function clampInt(v, min, max, fallback) {
  const n = Number.parseInt(String(v ?? ''), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, n))
}

function cleanUrl(u) {
  const s = String(u || '').trim()
  if (!s) return ''
  return s.replace(/\s+/g, '')
}

const WhoItsForPhotography = (props) => {
  // ✅ Local fallback: public/services/photography/wif-01.jpg ... wif-06.jpg
  const staticFallback = useMemo(() => {
    const total = clampInt(props.fallbackCount, 2, 24, 6)
    return Array.from({ length: total }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      const src = `/services/photography/wif-${n}.jpg`
      return {
        id: `wif-${n}`,
        title: `Who it’s for ${i + 1}`,
        src,
        href: props.storeHref || '/store',
      }
    })
  }, [props.fallbackCount, props.storeHref])

  const [items, setItems] = useState(staticFallback)
  const [page, setPage] = useState(0) // each page shows 2 images
  const [loading, setLoading] = useState(false)

  const mountedRef = useRef(true)
  const hoverRef = useRef(false)
  const timerRef = useRef(null)

  const perPage = 2
  const pages = Math.max(1, Math.ceil(items.length / perPage))
  const intervalMs = Math.max(2500, Number(props.intervalMs || 5200))

  // prefers-reduced-motion
  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(!!mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  function setStaticItems() {
    setItems(staticFallback)
    setPage(0)
  }

  // ✅ Best endpoint for sliders (returns { images: [{src, href, alt}] })
  async function loadFromGalleryRandom() {
    if (!props.randomEndpoint) return
    try {
      setLoading(true)

      const limit = clampInt(props.randomLimit, 4, 40, 12)
      const res = await fetch(`${props.randomEndpoint}?limit=${limit}`, {
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json().catch(() => null)
      const list = Array.isArray(data?.images) ? data.images : []

      const normalized = list
        .map((x, idx) => {
          const src = cleanUrl(x?.src || x?.url || '')
          if (!src) return null
          return {
            id: `rand-${idx + 1}-${src.slice(-14)}`,
            title: x?.alt || `Photo ${idx + 1}`,
            src,
            href: x?.href || props.storeHref || '/store',
          }
        })
        .filter(Boolean)

      if (!mountedRef.current) return

      if (normalized.length) {
        setItems(normalized)
        setPage(0)
      } else if (props.fallbackToStaticOnEmpty) {
        setStaticItems()
      }
    } catch (e) {
      if (!mountedRef.current) return
      if (props.fallbackToStaticOnError) setStaticItems()
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }

  // ✅ Alternative endpoint (your /api/store/photos returns { ok, photos })
  async function loadFromStorePhotos() {
    if (!props.apiEndpoint) return
    try {
      setLoading(true)

      const limit = clampInt(props.apiLimit, 6, 2000, 24)
      const res = await fetch(`${props.apiEndpoint}?limit=${limit}`, {
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json().catch(() => null)
      const list = Array.isArray(data?.photos) ? data.photos : []

      const normalized = list
        .map((p, idx) => {
          const id = p?.id
          const src = cleanUrl(p?.thumb_url || p?.preview_url || '')
          if (!src) return null

          const href =
            (props.itemHrefBase && id ? `${props.itemHrefBase}/${id}` : '') ||
            (id ? `/store/${id}` : '') ||
            props.storeHref ||
            '/store'

          return {
            id: id || `store-${idx + 1}`,
            title: p?.title || `Photo ${idx + 1}`,
            src,
            href,
          }
        })
        .filter(Boolean)

      if (!mountedRef.current) return

      if (normalized.length) {
        setItems(normalized)
        setPage(0)
      } else if (props.fallbackToStaticOnEmpty) {
        setStaticItems()
      }
    } catch (e) {
      if (!mountedRef.current) return
      if (props.fallbackToStaticOnError) setStaticItems()
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }

  // ✅ initial load preference: randomEndpoint → store/photos → fallback
  useEffect(() => {
    if (props.randomEndpoint) {
      loadFromGalleryRandom()
      return
    }
    if (props.apiEndpoint) {
      loadFromStorePhotos()
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.randomEndpoint, props.randomLimit, props.apiEndpoint, props.apiLimit])

  // optional refresh (random preferred)
  useEffect(() => {
    const ms = Number(props.autoRefreshMs || 0)
    if (ms < 5000) return
    const t = setInterval(() => {
      if (props.randomEndpoint) loadFromGalleryRandom()
      else if (props.apiEndpoint) loadFromStorePhotos()
    }, ms)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.autoRefreshMs, props.randomEndpoint, props.randomLimit, props.apiEndpoint, props.apiLimit])

  // ✅ Auto slide pages
  useEffect(() => {
    if (reduceMotion) return
    if (pages <= 1) return

    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (hoverRef.current) return
      setPage((p) => (p + 1) % pages)
    }, intervalMs)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [pages, intervalMs, reduceMotion])

  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span className="t">Who It’s For</span>
      </Fragment>
    )

  const descNode =
    props.content1 ?? (
      <Fragment>
        <span className="t">
          I work with brands, agencies, filmmakers, and individuals who value craft, atmosphere, and intentional
          storytelling — and who see photography as more than just content.
        </span>
      </Fragment>
    )

  const start = page * perPage
  const visible = items.slice(start, start + perPage)

  const heroImg =
    cleanUrl(props.heroImageSrc) ||
    cleanUrl(visible?.[0]?.src) ||
    cleanUrl(items?.[0]?.src) ||
    cleanUrl(staticFallback?.[0]?.src)

  function prev() {
    setPage((p) => (p - 1 + pages) % pages)
  }
  function next() {
    setPage((p) => (p + 1) % pages)
  }

  const refreshNow = () => {
    if (props.randomEndpoint) return loadFromGalleryRandom()
    if (props.apiEndpoint) return loadFromStorePhotos()
  }

  return (
    <>
      <section className={`wifWrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="wifShell thq-section-max-width">
          {/* ===== cinematic header card ===== */}
          <header className="wifHero">
            <div className="wifHeroBg" aria-hidden="true">
              <div className="wifHeroImg" style={{ backgroundImage: `url(${heroImg})` }} />
              <div className="wifHeroVignette" />
              <div className="wifHeroGrain" />
              <div className="wifHeroGlow" />
            </div>

            <div className="wifHeroInner">
              <div className="wifKickerRow">
                <span className="wifKicker">PHOTOGRAPHY</span>
                <span className="wifLine" />
              </div>

              <h2 className="wifTitle thq-heading-2">{headingNode}</h2>
              <p className="wifDesc thq-body-large">{descNode}</p>

              <div className="wifActions">
                {(props.randomEndpoint || props.apiEndpoint) && (
                  <button className="wifBtnGhost" type="button" onClick={refreshNow} disabled={loading}>
                    <span className="thq-body-small">{loading ? 'Refreshing…' : 'Refresh'}</span>
                  </button>
                )}

                <Link href={props.storeHref || '/store'} legacyBehavior>
                  <a className="wifBtnPrimary">
                    <span className="thq-body-small">Open Store</span>
                    <svg viewBox="0 0 1024 1024" className="wifIcon" aria-hidden="true">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
                    </svg>
                  </a>
                </Link>

                <div className="wifNav">
                  <button className="wifNavBtn" type="button" onClick={prev} aria-label="Previous">
                    ←
                  </button>
                  <button className="wifNavBtn" type="button" onClick={next} aria-label="Next">
                    →
                  </button>
                </div>
              </div>

              <div className="wifMicro thq-body-small">Auto sliding · Two-frame story beats · Cinematic continuity</div>
            </div>
          </header>

          {/* ===== double-frame slider ===== */}
          <div
            className="wifStage"
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
          >
            <div className="wifGrid">
              {visible.map((it, idx) => {
                const num = start + idx + 1
                const href = it.href || props.storeHref || '/store'
                const imgSrc = cleanUrl(it.src)

                return (
                  <Link href={href} legacyBehavior key={`${it.id}-${num}`}>
                    <a className="wifTile" aria-label={`Open image ${num}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="wifImg"
                        src={imgSrc}
                        alt={it.title || `Who it’s for ${num}`}
                        loading="lazy"
                        onError={(e) => {
                          // ✅ if store URL fails, fallback to local placeholder
                          const fallback = staticFallback?.[(num - 1) % staticFallback.length]?.src
                          if (fallback && e.currentTarget.src !== fallback) e.currentTarget.src = fallback
                        }}
                      />
                      <div className="wifShade" />
                      <div className="wifChip">{String(num).padStart(2, '0')}</div>
                      <div className="wifHint">View</div>
                    </a>
                  </Link>
                )
              })}
            </div>

            {/* pagination */}
            <div className="wifDots" aria-label="Slider indicators">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`wifDot ${i === page ? 'on' : ''}`}
                  onClick={() => setPage(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .wifWrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .wifShell {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ================= HERO ================= */
        .wifHero {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }

        .wifHeroBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .wifHeroImg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.03);
          filter: saturate(0.92) contrast(1.08) brightness(0.72);
        }

        .wifHeroVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(80% 60% at 50% 22%, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.72)),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.78) 0%,
              rgba(0, 0, 0, 0.45) 55%,
              rgba(0, 0, 0, 0.84) 100%
            );
        }

        .wifHeroGlow {
          position: absolute;
          inset: -18%;
          background: radial-gradient(40% 32% at 22% 28%, rgba(37, 195, 226, 0.12), rgba(37, 195, 226, 0) 62%);
          filter: blur(14px);
          opacity: 0.9;
        }

        .wifHeroGrain {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .wifHeroInner {
          position: relative;
          z-index: 1;
          padding: 26px 22px 18px;
          max-width: 920px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .wifKickerRow {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .wifKicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
          white-space: nowrap;
        }

        .wifLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(245, 244, 244, 0.16), rgba(245, 244, 244, 0));
        }

        .wifTitle {
          margin: 0;
          line-height: 1.1;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .wifDesc {
          margin: 0;
          opacity: 0.9;
          line-height: 1.65;
          color: rgba(245, 244, 244, 0.84);
          max-width: 70ch;
        }

        .wifActions {
          margin-top: 6px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .wifBtnPrimary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: linear-gradient(180deg, rgba(245, 244, 244, 0.18), rgba(245, 244, 244, 0.06));
          text-decoration: none;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          transition: transform 200ms ease, border-color 200ms ease;
        }

        .wifBtnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.35);
        }

        .wifBtnGhost {
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

        .wifBtnGhost:hover {
          transform: translateY(-1px);
          border-color: rgba(245, 244, 244, 0.22);
        }

        .wifBtnGhost:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .wifNav {
          margin-left: auto;
          display: inline-flex;
          gap: 8px;
        }

        .wifNavBtn {
          height: 36px;
          min-width: 44px;
          padding: 0 14px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.18);
          color: rgba(245, 244, 244, 0.92);
          cursor: pointer;
          transition: transform 180ms ease, border-color 180ms ease;
        }

        .wifNavBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.35);
        }

        .wifMicro {
          margin-top: 6px;
          color: rgba(245, 244, 244, 0.62);
        }

        .wifIcon {
          width: 18px;
          height: 18px;
        }

        /* ================= STAGE ================= */
        .wifStage {
          width: 100%;
          position: relative;
        }

        .wifGrid {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .wifTile {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(0, 0, 0, 0.25);
          aspect-ratio: 4 / 3;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
          text-decoration: none;
          display: block;
          transform: translateZ(0);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }

        .wifTile:hover {
          transform: translateY(-2px);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.45);
        }

        .wifImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 650ms ease;
          filter: brightness(0.95) contrast(1.05) saturate(1.02);
        }

        .wifTile:hover .wifImg {
          transform: scale(1.06);
        }

        .wifShade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.58));
        }

        .wifChip {
          position: absolute;
          left: 10px;
          top: 10px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(8px);
          font-size: 12px;
          letter-spacing: 0.28em;
          color: rgba(245, 244, 244, 0.92);
        }

        .wifHint {
          position: absolute;
          right: 10px;
          top: 10px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(8px);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.82);
        }

        .wifDots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
        }

        .wifDot {
          width: 26px;
          height: 3px;
          border: 0;
          border-radius: 99px;
          background: rgba(245, 244, 244, 0.18);
          cursor: pointer;
          padding: 0;
          transition: background 180ms ease, box-shadow 180ms ease;
        }

        .wifDot.on {
          background: rgba(37, 195, 226, 0.7);
          box-shadow: 0 0 0 1px rgba(37, 195, 226, 0.18);
        }

        .t {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .wifHeroInner {
            padding: 18px 14px 14px;
            text-align: center;
            align-items: center;
          }
          .wifKickerRow {
            justify-content: center;
          }
          .wifLine {
            display: none;
          }
          .wifNav {
            margin-left: 0;
            width: 100%;
            justify-content: center;
          }
          .wifActions {
            width: 100%;
            justify-content: center;
          }
          .wifGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

WhoItsForPhotography.defaultProps = {
  rootClassName: '',

  heading1: undefined,
  content1: undefined,

  // ✅ if empty, uses first visible image
  heroImageSrc: '',

  // ✅ PREFERRED: random endpoint that returns { images: [{src,href,alt}] }
  randomEndpoint: '/api/gallery/random',
  randomLimit: 12,

  // ✅ optional alternative
  apiEndpoint: '', // '/api/store/photos'
  apiLimit: 24,

  storeHref: '/store',
  itemHrefBase: '/store',

  intervalMs: 5200,
  autoRefreshMs: 0,

  fallbackCount: 6,
  fallbackToStaticOnError: true,
  fallbackToStaticOnEmpty: true,
}

WhoItsForPhotography.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,

  heroImageSrc: PropTypes.string,

  randomEndpoint: PropTypes.string,
  randomLimit: PropTypes.number,

  apiEndpoint: PropTypes.string,
  apiLimit: PropTypes.number,

  storeHref: PropTypes.string,
  itemHrefBase: PropTypes.string,

  intervalMs: PropTypes.number,
  autoRefreshMs: PropTypes.number,

  fallbackCount: PropTypes.number,
  fallbackToStaticOnError: PropTypes.bool,
  fallbackToStaticOnEmpty: PropTypes.bool,
}

export default WhoItsForPhotography