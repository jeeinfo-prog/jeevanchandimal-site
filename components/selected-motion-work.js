import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'

const SelectedMotionWork = (props) => {
  // ✅ default local images (public/services/animation/sani-01.jpg ... sani-07.jpg)
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

  const img1 = props.image1Src || localFallback.image1Src
  const img2 = props.image2Src || localFallback.image2Src
  const img3 = props.image3Src || localFallback.image3Src
  const img4 = props.image4Src || localFallback.image4Src
  const img5 = props.image5Src || localFallback.image5Src
  const img6 = props.image6Src || localFallback.image6Src
  const img7 = props.image7Src || localFallback.image7Src

  return (
    <>
      <section className={`smw-wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="smw-max thq-section-max-width">
          {/* ===== Title card (cinematic glass) ===== */}
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
                    <span className="selected-motion-work-text1">
                      Selected Motion Work
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large smw-sub">
                {props.content1 ?? (
                  <Fragment>
                    <span className="selected-motion-work-text2">
                      A selection of motion and animation projects created to
                      support film, brands, and visual narratives.
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
          </div>

          {/* ===== Film-strip grid ===== */}
          <div className="smw-grid">
            <a className="smw-tile tall" href={props.href1 || '#'} aria-label="Motion work 01">
              <img src={img1} alt={props.image1Alt} className="smw-img" loading="lazy" />
              <div className="smw-overlay" />
            </a>

            <a className="smw-tile tall" href={props.href2 || '#'} aria-label="Motion work 02">
              <img src={img2} alt={props.image2Alt} className="smw-img" loading="lazy" />
              <div className="smw-overlay" />
            </a>

            <a className="smw-tile wide" href={props.href3 || '#'} aria-label="Motion work 03">
              <img src={img3} alt={props.image3Alt} className="smw-img" loading="lazy" />
              <div className="smw-overlay" />
            </a>

            <a className="smw-tile tall" href={props.href4 || '#'} aria-label="Motion work 04">
              <img src={img4} alt={props.image4Alt} className="smw-img" loading="lazy" />
              <div className="smw-overlay" />
            </a>

            <a className="smw-tile wide" href={props.href5 || '#'} aria-label="Motion work 05">
              <img src={img5} alt={props.image5Alt} className="smw-img" loading="lazy" />
              <div className="smw-overlay" />
            </a>

            <a className="smw-tile tall" href={props.href6 || '#'} aria-label="Motion work 06">
              <img src={img6} alt={props.image6Alt} className="smw-img" loading="lazy" />
              <div className="smw-overlay" />
            </a>

            <a className="smw-tile tall" href={props.href7 || '#'} aria-label="Motion work 07">
              <img src={img7} alt={props.image7Alt} className="smw-img" loading="lazy" />
              <div className="smw-overlay" />
            </a>
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
          gap: 18px;
        }

        /* ========= title glass card ========= */
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
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
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

        /* ========= grid ========= */
        .smw-grid {
          width: 100%;
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(12, 1fr);
          align-items: stretch;
        }

        .smw-tile {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.4);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
          transform: translateY(0);
          transition: transform 180ms ease, border-color 180ms ease;
          display: block;
          text-decoration: none !important;
        }

        .smw-tile:hover {
          transform: translateY(-2px);
          border-color: rgba(37, 195, 226, 0.35);
        }

        .smw-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
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

        /* layout spans (film-strip feeling) */
        .tall {
          grid-column: span 4;
          min-height: 420px;
        }

        .wide {
          grid-column: span 4;
          min-height: 230px;
        }

        /* tweak layout to resemble your old 3 columns */
        .smw-grid > :nth-child(1) {
          grid-column: 1 / span 4;
        }
        .smw-grid > :nth-child(2) {
          grid-column: 5 / span 4;
        }
        .smw-grid > :nth-child(3) {
          grid-column: 9 / span 4;
          min-height: 230px;
        }
        .smw-grid > :nth-child(4) {
          grid-column: 9 / span 4;
          min-height: 420px;
        }
        .smw-grid > :nth-child(5) {
          grid-column: 9 / span 4;
          min-height: 230px;
        }
        .smw-grid > :nth-child(6) {
          grid-column: 1 / span 4;
        }
        .smw-grid > :nth-child(7) {
          grid-column: 5 / span 4;
        }

        .selected-motion-work-text1,
        .selected-motion-work-text2 {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .smw-grid {
            grid-template-columns: repeat(6, 1fr);
          }

          .tall,
          .wide {
            grid-column: span 3;
          }

          .smw-grid > :nth-child(1),
          .smw-grid > :nth-child(2),
          .smw-grid > :nth-child(3),
          .smw-grid > :nth-child(4),
          .smw-grid > :nth-child(5),
          .smw-grid > :nth-child(6),
          .smw-grid > :nth-child(7) {
            grid-column: span 3;
            min-height: 320px;
          }
        }

        @media (max-width: 767px) {
          .smw-titleInner {
            padding: 20px 16px 16px;
          }
          .smw-line {
            display: none;
          }
          .smw-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .smw-grid > :nth-child(n) {
            grid-column: span 2;
            min-height: 260px;
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

  // ✅ you can still override, but default uses sani-xx
  image1Alt: 'Motion work 01',
  image2Alt: 'Motion work 02',
  image3Alt: 'Motion work 03',
  image4Alt: 'Motion work 04',
  image5Alt: 'Motion work 05',
  image6Alt: 'Motion work 06',
  image7Alt: 'Motion work 07',

  // optional click targets
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