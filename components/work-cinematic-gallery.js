import React, { Fragment, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

/**
 * WorkCinematicGallery (Vercel normal Next ✅)
 * - Beautiful masonry layout + hover glow
 * - Lightbox modal (ESC/←/→ supported)
 * - Auto-random images from your photo store via API (optional)
 * - Static fallback uses /public/work/photography/cg-01.jpg ... cg-12.jpg
 *
 * Usage:
 *   <WorkCinematicGallery apiEndpoint="/api/gallery/random?limit=18" />
 *   or static only:
 *   <WorkCinematicGallery />
 */

const WorkCinematicGallery = (props) => {
  // ✅ Static fallback (public/work/photography/cg-01.jpg ... cg-12.jpg)
  const staticFallback = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0')
        return `/work/photography/cg-${num}.jpg`
      }),
    []
  )

  const [images, setImages] = useState(
    Array.isArray(props.images) && props.images.length ? props.images : staticFallback
  )
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)

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
          A curated selection of photographs presented as standalone visual studies.
          These images focus on atmosphere, composition, and tonal depth—allowing
          each frame to exist without explanation.
        </span>
      </Fragment>
    )

  // ✅ Optional: Fetch random images from your store (Vercel normal Next supports API routes)
  useEffect(() => {
    let alive = true

    async function run() {
      if (!props.apiEndpoint) return
      try {
        setLoading(true)
        const res = await fetch(props.apiEndpoint, { headers: { Accept: 'application/json' } })
        const data = await res.json()

        // expected:
        //  { images: [ "https://...", ... ] }
        //  OR { images: [ { src: "...", alt?: "..." }, ... ] }
        const list = Array.isArray(data?.images) ? data.images : []
        const normalized = list
          .map((x) => (typeof x === 'string' ? { src: x } : x))
          .filter((x) => x?.src)

        if (!alive) return

        if (normalized.length) {
          setImages(normalized.map((x) => x.src))
        } else if (props.fallbackToStaticOnEmpty) {
          setImages(staticFallback)
        }
      } catch (e) {
        if (!alive) return
        if (props.fallbackToStaticOnError) setImages(staticFallback)
      } finally {
        if (alive) setLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [props.apiEndpoint, props.fallbackToStaticOnEmpty, props.fallbackToStaticOnError, staticFallback])

  // ✅ Optional: shuffle on load (useful for static mode or after API load)
  useEffect(() => {
    if (!props.shuffle) return
    setImages((prev) => {
      const a = [...prev]
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    })
    // run once when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ✅ Lightbox keyboard
  useEffect(() => {
    function onKey(e) {
      if (activeIdx < 0) return
      if (e.key === 'Escape') setActiveIdx(-1)
      if (e.key === 'ArrowRight') setActiveIdx((i) => Math.min(images.length - 1, i + 1))
      if (e.key === 'ArrowLeft') setActiveIdx((i) => Math.max(0, i - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIdx, images.length])

  function open(idx) {
    setActiveIdx(idx)
  }

  function close() {
    setActiveIdx(-1)
  }

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          <header className="head">
            <h2 className="title thq-heading-2">{headingNode}</h2>
            <p className="desc thq-body-large">{descNode}</p>

            {loading && (
              <div className="loading thq-body-small">Loading random images…</div>
            )}
          </header>

          <div className="masonry" aria-busy={loading ? 'true' : 'false'}>
            {images.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                type="button"
                className="tile"
                onClick={() => open(idx)}
                aria-label={`Open image ${idx + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img"
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  loading="lazy"
                />
                <span className="glow" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Lightbox */}
      {activeIdx >= 0 && images[activeIdx] && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <div className="lbInner" onClick={(e) => e.stopPropagation()}>
            <button className="lbClose" type="button" onClick={close} aria-label="Close">
              ✕
            </button>

            <button
              className="lbNav lbPrev"
              type="button"
              onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
              disabled={activeIdx === 0}
              aria-label="Previous"
            >
              ‹
            </button>

            <div className="lbMedia">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="lbImg" src={images[activeIdx]} alt={`Preview ${activeIdx + 1}`} />
              <div className="lbMeta thq-body-small">
                {activeIdx + 1} / {images.length}
              </div>
            </div>

            <button
              className="lbNav lbNext"
              type="button"
              onClick={() => setActiveIdx((i) => Math.min(images.length - 1, i + 1))}
              disabled={activeIdx === images.length - 1}
              aria-label="Next"
            >
              ›
            </button>
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
          gap: 22px;
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

        .titleText {
          display: inline-block;
          letter-spacing: 0.2px;
        }

        .desc {
          margin: 0;
          opacity: 0.9;
          line-height: 1.65;
        }

        .loading {
          margin-top: 6px;
          opacity: 0.75;
        }

        /* ✅ Masonry layout */
        .masonry {
          column-count: 4;
          column-gap: 14px;
          width: 100%;
        }

        .tile {
          width: 100%;
          border: 0;
          padding: 0;
          margin: 0 0 14px 0;
          background: transparent;
          display: inline-block; /* important for columns */
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          outline: none;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28);
          transform: translateZ(0);
        }

        .img {
          width: 100%;
          height: auto;
          display: block;
          transform: scale(1.02);
          transition: transform 0.25s ease;
        }

        .glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            800px circle at 50% 50%,
            rgba(120, 166, 255, 0.18),
            rgba(0, 0, 0, 0)
          );
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .tile:hover .img {
          transform: scale(1.06);
        }
        .tile:hover .glow {
          opacity: 1;
        }

        /* ✅ Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(8px);
          display: grid;
          place-items: center;
          padding: 18px;
        }

        .lbInner {
          width: min(1100px, 100%);
          display: grid;
          grid-template-columns: 54px 1fr 54px;
          gap: 10px;
          align-items: center;
          position: relative;
        }

        .lbMedia {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.35);
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.45);
          position: relative;
        }

        .lbImg {
          width: 100%;
          height: auto;
          display: block;
        }

        .lbMeta {
          position: absolute;
          left: 12px;
          bottom: 10px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.45);
          opacity: 0.9;
        }

        .lbClose {
          position: absolute;
          top: -12px;
          right: -8px;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.45);
          color: inherit;
          cursor: pointer;
        }

        .lbNav {
          width: 54px;
          height: 54px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.45);
          color: inherit;
          cursor: pointer;
          font-size: 34px;
          line-height: 1;
          display: grid;
          place-items: center;
          transition: transform 0.15s ease, border-color 0.15s ease;
        }

        .lbNav:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.45);
        }

        .lbNav:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none;
        }

        /* Responsive masonry */
        @media (max-width: 991px) {
          .masonry {
            column-count: 3;
          }
        }
        @media (max-width: 767px) {
          .head {
            text-align: left;
            margin: 0;
          }
          .masonry {
            column-count: 2;
          }
        }
        @media (max-width: 479px) {
          .masonry {
            column-count: 1;
          }
          .lbInner {
            grid-template-columns: 44px 1fr 44px;
          }
          .lbNav {
            width: 44px;
            height: 44px;
            font-size: 28px;
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
  images: undefined, // optional override (array of strings)
  apiEndpoint: '', // optional (string): "/api/gallery/random?limit=18"
  shuffle: false, // optional: shuffle current list on load
  fallbackToStaticOnError: true,
  fallbackToStaticOnEmpty: true,
}

WorkCinematicGallery.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  apiEndpoint: PropTypes.string,
  shuffle: PropTypes.bool,
  fallbackToStaticOnError: PropTypes.bool,
  fallbackToStaticOnEmpty: PropTypes.bool,
}

export default WorkCinematicGallery