import React, { Fragment, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const WorkCinematicGallery = (props) => {
  // 🔹 Static fallback (public/work/photography/cg-01.jpg → cg-12.jpg)
  const staticFallback = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0')
        return `/work/photography/cg-${num}.jpg`
      }),
    []
  )

  const [images, setImages] = useState(staticFallback)
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

  // 🔹 Fetch random images from API
  async function loadRandom() {
    if (!props.apiEndpoint) return
    try {
      setLoading(true)
      const res = await fetch(props.apiEndpoint)
      const data = await res.json()

      const list = Array.isArray(data?.images) ? data.images : []
      if (list.length) {
        setImages(list)
      } else if (props.fallbackToStaticOnEmpty) {
        setImages(staticFallback)
      }
    } catch {
      if (props.fallbackToStaticOnError) {
        setImages(staticFallback)
      }
    } finally {
      setLoading(false)
    }
  }

  // 🔹 initial load
  useEffect(() => {
    if (props.apiEndpoint) {
      loadRandom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.apiEndpoint])

  // 🔹 shuffle static mode if enabled
  useEffect(() => {
    if (!props.shuffle) return
    setImages((prev) => [...prev].sort(() => Math.random() - 0.5))
  }, [props.shuffle])

  // 🔹 keyboard navigation for lightbox
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

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          <header className="head">
            <h2 className="title thq-heading-2">{headingNode}</h2>
            <p className="desc thq-body-large">{descNode}</p>

            {props.apiEndpoint && (
              <button
                className="refreshBtn"
                onClick={loadRandom}
                disabled={loading}
              >
                {loading ? 'Loading…' : 'Refresh Images'}
              </button>
            )}
          </header>

          <div className="masonry">
            {images.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                className="tile"
                onClick={() => setActiveIdx(idx)}
                aria-label={`Open image ${idx + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  className="img"
                  loading="lazy"
                />
                <span className="glow" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 Lightbox */}
      {activeIdx >= 0 && images[activeIdx] && (
        <div className="lightbox" onClick={() => setActiveIdx(-1)}>
          <div className="lbInner" onClick={(e) => e.stopPropagation()}>
            <button className="lbClose" onClick={() => setActiveIdx(-1)}>✕</button>

            <button
              className="lbNav"
              onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
              disabled={activeIdx === 0}
            >
              ‹
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lbImg" src={images[activeIdx]} alt="Preview" />

            <button
              className="lbNav"
              onClick={() =>
                setActiveIdx((i) => Math.min(images.length - 1, i + 1))
              }
              disabled={activeIdx === images.length - 1}
            >
              ›
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .head {
          text-align: center;
          margin-bottom: 20px;
        }

        .refreshBtn {
          margin-top: 10px;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.06);
          cursor: pointer;
        }

        .masonry {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .tile {
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 16px;
          position: relative;
          border: none;
          padding: 0;
          cursor: pointer;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.25s ease;
        }

        .tile:hover .img {
          transform: scale(1.06);
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
        }

        .tile:hover .glow {
          opacity: 1;
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: grid;
          place-items: center;
          z-index: 9999;
        }

        .lbInner {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lbImg {
          max-width: 80vw;
          max-height: 80vh;
          border-radius: 12px;
        }

        .lbNav,
        .lbClose {
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          font-size: 28px;
          padding: 10px;
          cursor: pointer;
          border-radius: 999px;
        }

        @media (max-width: 991px) {
          .masonry {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 479px) {
          .masonry {
            grid-template-columns: 1fr;
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
  apiEndpoint: '',
  shuffle: false,
  fallbackToStaticOnError: true,
  fallbackToStaticOnEmpty: true,
}

WorkCinematicGallery.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,
  apiEndpoint: PropTypes.string,
  shuffle: PropTypes.bool,
  fallbackToStaticOnError: PropTypes.bool,
  fallbackToStaticOnEmpty: PropTypes.bool,
}

export default WorkCinematicGallery