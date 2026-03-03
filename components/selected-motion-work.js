import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'

const SelectedMotionWork = (props) => {
  const localFallback = useMemo(
    () => ({
      image1Src: '/services/animation/sani-01.jpg',
      image2Src: '/services/animation/sani-02.jpg',
      image3Src: '/services/animation/sani-03.jpg',
      image4Src: '/services/animation/sani-04.jpg',
      image5Src: '/services/animation/sani-05.jpg',
      image6Src: '/services/animation/sani-06.jpg',
      image7Src: '/services/animation/sani-07.jpg',
    }),
    []
  )

  const tiles = [
    { src: props.image1Src || localFallback.image1Src, alt: props.image1Alt, href: props.href1 || '' },
    { src: props.image2Src || localFallback.image2Src, alt: props.image2Alt, href: props.href2 || '' },
    { src: props.image3Src || localFallback.image3Src, alt: props.image3Alt, href: props.href3 || '' },
    { src: props.image4Src || localFallback.image4Src, alt: props.image4Alt, href: props.href4 || '' },
    { src: props.image5Src || localFallback.image5Src, alt: props.image5Alt, href: props.href5 || '' },
    { src: props.image6Src || localFallback.image6Src, alt: props.image6Alt, href: props.href6 || '' },
    { src: props.image7Src || localFallback.image7Src, alt: props.image7Alt, href: props.href7 || '' },
  ]

  return (
    <>
      <section className={`smw-wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="smw-max thq-section-max-width">
          {/* ===== Title card ===== */}
          <div className="smw-titleCard">
            <div className="smw-titleBg" aria-hidden="true">
              <div className="smw-vignette" />
              <div className="smw-grain" />
            </div>

            <div className="smw-titleInner">
              <div className="smw-kickerRow">
                <span className="smw-kicker">SELECTED WORK</span>
                <span className="smw-line" />
              </div>

              <h2 className="thq-heading-2 smw-title">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="selected-motion-work-text1">Selected Motion Work</span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large smw-sub">
                {props.content1 ?? (
                  <Fragment>
                    <span className="selected-motion-work-text2">
                      A selection of motion and animation projects created to support film, brands, and visual narratives.
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
          </div>

          {/* ===== Masonry grid (NO GAPS) ===== */}
          <div className="smw-masonry" aria-label="Selected motion work gallery">
            {tiles.map((t, i) => {
              const Tag = t.href ? 'a' : 'div'
              const tagProps = t.href ? { href: t.href } : {}
              return (
                <Tag key={i} className="smw-tile" {...tagProps} aria-label={t.alt || `Motion work ${i + 1}`}>
                  <img src={t.src} alt={t.alt} className="smw-img" loading="lazy" />
                  <div className="smw-overlay" />
                </Tag>
              )
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .smw-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .smw-max {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ===== title glass card ===== */
        .smw-titleCard {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .smw-titleBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .smw-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 70% at 50% 15%,
              rgba(255, 255, 255, 0.05),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.35) 50%,
              rgba(0, 0, 0, 0.82) 100%
            );
        }

        .smw-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .smw-titleInner {
          position: relative;
          z-index: 1;
          padding: 26px 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          text-align: center;
          max-width: 920px;
          margin: 0 auto;
        }

        .smw-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .smw-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .smw-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(245, 244, 244, 0.18), rgba(245, 244, 244, 0));
        }

        .smw-title {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .smw-sub {
          margin: 0;
          line-height: 1.8;
          color: rgba(245, 244, 244, 0.85);
          max-width: 70ch;
        }

        /* ===== Masonry (this removes holes) ===== */
        .smw-masonry {
          width: 100%;
          column-count: 3;
          column-gap: 12px;
        }

        .smw-tile {
          width: 100%;
          display: inline-block; /* required for columns */
          margin: 0 0 12px;
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.4);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
          transform: translateY(0);
          transition: transform 180ms ease, border-color 180ms ease;
          text-decoration: none !important;
          break-inside: avoid;
        }

        .smw-tile:hover {
          transform: translateY(-2px);
          border-color: rgba(37, 195, 226, 0.35);
        }

        .smw-img {
          width: 100%;
          height: auto; /* natural masonry */
          display: block;
          object-fit: cover;
        }

        .smw-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              60% 60% at 50% 35%,
              rgba(0, 0, 0, 0.04),
              rgba(0, 0, 0, 0.48)
            ),
            linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.35));
          opacity: 0.55;
          transition: opacity 180ms ease;
          pointer-events: none;
        }

        .smw-tile:hover .smw-overlay {
          opacity: 0.42;
        }

        .selected-motion-work-text1,
        .selected-motion-work-text2 {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .smw-masonry {
            column-count: 2;
          }
        }

        @media (max-width: 767px) {
          .smw-titleInner {
            padding: 20px 16px 16px;
          }
          .smw-line {
            display: none;
          }
          .smw-masonry {
            column-count: 1;
          }
        }
      `}</style>
    </>
  )
}

SelectedMotionWork.defaultProps = {
  heading1: undefined,
  content1: undefined,
  rootClassName: '',

  image1Alt: 'Motion work 01',
  image2Alt: 'Motion work 02',
  image3Alt: 'Motion work 03',
  image4Alt: 'Motion work 04',
  image5Alt: 'Motion work 05',
  image6Alt: 'Motion work 06',
  image7Alt: 'Motion work 07',

  href1: '',
  href2: '',
  href3: '',
  href4: '',
  href5: '',
  href6: '',
  href7: '',
}

SelectedMotionWork.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,

  image1Src: PropTypes.string,
  image2Src: PropTypes.string,
  image3Src: PropTypes.string,
  image4Src: PropTypes.string,
  image5Src: PropTypes.string,
  image6Src: PropTypes.string,
  image7Src: PropTypes.string,

  image1Alt: PropTypes.string,
  image2Alt: PropTypes.string,
  image3Alt: PropTypes.string,
  image4Alt: PropTypes.string,
  image5Alt: PropTypes.string,
  image6Alt: PropTypes.string,
  image7Alt: PropTypes.string,

  href1: PropTypes.string,
  href2: PropTypes.string,
  href3: PropTypes.string,
  href4: PropTypes.string,
  href5: PropTypes.string,
  href6: PropTypes.string,
  href7: PropTypes.string,
}

export default SelectedMotionWork