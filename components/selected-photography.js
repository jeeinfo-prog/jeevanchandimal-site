import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'

const SelectedPhotography = (props) => {
  // 🔥 auto load from /public/services/photography/
  const images = useMemo(() => {
    if (props.images?.length) return props.images

    const total = props.imageCount || 12
    return Array.from({ length: total }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return `/services/photography/serphoto-${n}.jpg`
    })
  }, [props.images, props.imageCount])

  return (
    <>
      <section
        className={`sp-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="sp-max thq-section-max-width">
          <div className="sp-card">
            {/* overlays */}
            <div className="sp-bg" aria-hidden="true">
              <div className="sp-vignette" />
              <div className="sp-grain" />
              <div className="sp-glow" />
            </div>

            <div className="sp-inner">
              {/* title block */}
              <div className="sp-titleBlock">
                <div className="sp-kickerRow">
                  <span className="sp-kicker">GALLERY</span>
                  <span className="sp-line" />
                </div>

                <h2 className="thq-heading-2 sp-title">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="selected-photography-text1">
                        Selected Photography
                      </span>
                    </Fragment>
                  )}
                </h2>

                <p className="thq-body-large sp-copy">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="selected-photography-text2">
                        A curated selection of editorial, cinematic, and fine-art
                        photography — focused on atmosphere, texture, and detail.
                      </span>
                    </Fragment>
                  )}
                </p>

                <div className="sp-divider" />
              </div>

              {/* grid */}
              <div className="sp-grid">
                {images.map((src, i) => (
                  <div key={i} className="sp-item">
                    <img src={src} alt={`Selected photography ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .sp-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .sp-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 30px 110px rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
        }

        .sp-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .sp-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 65% at 50% 18%,
              rgba(255, 255, 255, 0.04),
              rgba(0, 0, 0, 0.82)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.3) 0%,
              rgba(0, 0, 0, 0.78) 70%,
              rgba(0, 0, 0, 0.92) 100%
            );
        }

        .sp-glow {
          position: absolute;
          inset: -22%;
          background: radial-gradient(
            40% 32% at 20% 30%,
            rgba(37, 195, 226, 0.14),
            rgba(37, 195, 226, 0) 62%
          );
          filter: blur(14px);
        }

        .sp-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .sp-inner {
          position: relative;
          z-index: 1;
          padding: 32px 26px 28px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .sp-titleBlock {
          max-width: 720px;
        }

        .sp-kickerRow {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sp-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .sp-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .sp-title {
          margin: 0;
          line-height: 1.2;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .sp-copy {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
        }

        .sp-divider {
          width: 100%;
          height: 1px;
          margin-top: 6px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.12),
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0.12)
          );
        }

        /* ===== grid ===== */
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .sp-item {
          position: relative;
          overflow: hidden;
          border-radius: 14px;
        }

        .sp-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 4 / 3;
          transition: transform 1200ms ease;
          filter: brightness(0.95) contrast(1.05);
        }

        .sp-item:hover img {
          transform: scale(1.06);
        }

        @media (max-width: 991px) {
          .sp-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 767px) {
          .sp-inner {
            padding: 22px 16px 20px;
            text-align: center;
            align-items: center;
          }
          .sp-kickerRow {
            justify-content: center;
          }
          .sp-line {
            display: none;
          }
          .sp-grid {
            grid-template-columns: 1fr;
          }
        }

        .selected-photography-text1,
        .selected-photography-text2 {
          display: inline-block;
        }
      `}</style>
    </>
  )
}

SelectedPhotography.defaultProps = {
  rootClassName: '',
  heading1: undefined,
  content1: undefined,
  images: undefined,
  imageCount: 12,
}

SelectedPhotography.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  images: PropTypes.arrayOf(PropTypes.string),
  imageCount: PropTypes.number,
}

export default SelectedPhotography