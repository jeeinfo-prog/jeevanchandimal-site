import React, { Fragment, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const SelectedMotionWork = (props) => {
  const localFallback = useMemo(
    () => [
      '/services/animation/sani-01.jpg',
      '/services/animation/sani-02.jpg',
      '/services/animation/sani-03.jpg',
      '/services/animation/sani-04.jpg',
      '/services/animation/sani-05.jpg',
      '/services/animation/sani-06.jpg',
      '/services/animation/sani-07.jpg',
    ],
    []
  )

  const images = localFallback.map((src, i) => ({
    src: props[`image${i + 1}Src`] || src,
    alt: props[`image${i + 1}Alt`] || `Motion work ${i + 1}`,
  }))

  const [active, setActive] = useState(null)

  const close = () => setActive(null)

  const next = () =>
    setActive((prev) => (prev + 1) % images.length)

  const prev = () =>
    setActive((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )

  // keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (active === null) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active])

  return (
    <>
      <section className="smw-wrap thq-section-padding">
        <div className="thq-section-max-width smw-max">

          {/* Title */}
          <div className="smw-header">
            <h2 className="thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span>Selected Motion Work</span>
                </Fragment>
              )}
            </h2>
            <p className="thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span>
                    A curated selection of motion and animation projects.
                  </span>
                </Fragment>
              )}
            </p>
          </div>

          {/* Masonry */}
          <div className="smw-masonry">
            {images.map((img, i) => (
              <div
                key={i}
                className="smw-tile"
                onClick={() => setActive(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="smw-img"
                  loading="lazy"
                />
                <div className="smw-overlay" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {active !== null && (
        <div className="lightbox" onClick={close}>
          <div
            className="lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[active].src}
              alt={images[active].alt}
              className="lightbox-img"
            />

            <button className="lb-close" onClick={close}>
              ✕
            </button>

            <button className="lb-prev" onClick={prev}>
              ‹
            </button>

            <button className="lb-next" onClick={next}>
              ›
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .smw-max {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .smw-header {
          text-align: center;
        }

        .smw-masonry {
          column-count: 3;
          column-gap: 14px;
        }

        .smw-tile {
          display: inline-block;
          width: 100%;
          margin-bottom: 14px;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: transform 200ms ease;
        }

        .smw-tile:hover {
          transform: translateY(-3px);
        }

        .smw-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .smw-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.55)
          );
          opacity: 0.5;
          transition: opacity 200ms ease;
        }

        .smw-tile:hover .smw-overlay {
          opacity: 0.3;
        }

        /* ===== Lightbox ===== */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 200ms ease;
        }

        .lightbox-inner {
          position: relative;
          max-width: 90%;
          max-height: 85%;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 85vh;
          border-radius: 16px;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.7);
          animation: zoomIn 250ms ease;
        }

        .lb-close,
        .lb-prev,
        .lb-next {
          position: absolute;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          font-size: 22px;
          cursor: pointer;
          transition: all 180ms ease;
        }

        .lb-close {
          top: -20px;
          right: -20px;
        }

        .lb-prev {
          top: 50%;
          left: -60px;
          transform: translateY(-50%);
        }

        .lb-next {
          top: 50%;
          right: -60px;
          transform: translateY(-50%);
        }

        .lb-close:hover,
        .lb-prev:hover,
        .lb-next:hover {
          background: rgba(37, 195, 226, 0.3);
          border-color: rgba(37, 195, 226, 0.5);
        }

        @media (max-width: 991px) {
          .smw-masonry {
            column-count: 2;
          }
        }

        @media (max-width: 767px) {
          .smw-masonry {
            column-count: 1;
          }
          .lb-prev,
          .lb-next {
            display: none;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}

SelectedMotionWork.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
}

export default SelectedMotionWork