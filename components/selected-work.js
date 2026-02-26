import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const SelectedWork = (props) => {
  return (
    <>
      <section className="sw thq-section-padding">
        <div className="swMax thq-section-max-width">
          {/* header */}
          <div className="swHeader">
            <div className="swTitleCol">
              <span className="kicker">SELECTED WORK</span>

              <h2 className="swTitle thq-heading-2">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span className="selected-work-text1">Selected Work</span>
                  </Fragment>
                )}
              </h2>
            </div>

            <p className="swDesc thq-body-small">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="selected-work-text2">
                    A curated selection of projects across film, photography, sound, and motion —
                    each created with clarity, mood, and narrative presence.
                  </span>
                </Fragment>
              )}
            </p>
          </div>

          {/* cinematic gallery grid */}
          <div className="grid">
            <figure className="tile tileA">
              <div className="imgWrap">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc || '/home/sw-01.jpg'}
                  className="img"
                  loading="lazy"
                />
                <div className="overlay">
                  <span className="chip">01</span>
                </div>
              </div>
            </figure>

            <figure className="tile tileB">
              <div className="imgWrap">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc || '/home/sw-02.jpg'}
                  className="img"
                  loading="lazy"
                />
                <div className="overlay">
                  <span className="chip">02</span>
                </div>
              </div>
            </figure>

            <figure className="tile tileC">
              <div className="imgWrap">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc || '/home/sw-03.jpg'}
                  className="img"
                  loading="lazy"
                />
                <div className="overlay">
                  <span className="chip">03</span>
                </div>
              </div>
            </figure>

            <figure className="tile tileD">
              <div className="imgWrap">
                <img
                  alt={props.feature1ImageAlt1}
                  src={props.feature1ImageSrc1 || '/home/sw-04.jpg'}
                  className="img"
                  loading="lazy"
                />
                <div className="overlay">
                  <span className="chip">04</span>
                </div>
              </div>
            </figure>

            <figure className="tile tileE">
              <div className="imgWrap">
                <img
                  alt={props.feature2ImageAlt1}
                  src={props.feature2ImageSrc1 || '/home/sw-05.jpg'}
                  className="img"
                  loading="lazy"
                />
                <div className="overlay">
                  <span className="chip">05</span>
                </div>
              </div>
            </figure>

            <figure className="tile tileF">
              <div className="imgWrap">
                <img
                  alt={props.feature3ImageAlt1}
                  src={props.feature3ImageSrc1 || '/home/sw-06.jpg'}
                  className="img"
                  loading="lazy"
                />
                <div className="overlay">
                  <span className="chip">06</span>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <style jsx>{`
        .sw {
          width: 100%;
          position: relative;
          overflow: visible; /* ✅ do NOT break sticky nav */
        }

        .swMax {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .swHeader {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 18px;
          align-items: end;
        }

        .swTitleCol {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .kicker {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 0.28em;
          font-weight: 900;
          color: rgba(245, 244, 244, 0.72);
        }

        .swTitle {
          margin: 0;
          color: #f5f4f4;
          letter-spacing: -0.02em;
          text-shadow: 0 18px 42px rgba(0, 0, 0, 0.42);
        }

        .swDesc {
          margin: 0;
          color: rgba(245, 244, 244, 0.76);
          line-height: 1.75;
          max-width: 70ch;
        }

        /* ========= GRID ========= */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
        }

        .tile {
          margin: 0;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(10, 10, 10, 0.6);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.42);
          transform: translateZ(0);
        }

        /* Cinematic layout */
        .tileA {
          grid-column: span 6;
          grid-row: span 2;
          min-height: 420px;
        }
        .tileB {
          grid-column: span 3;
          min-height: 200px;
        }
        .tileC {
          grid-column: span 3;
          min-height: 200px;
        }
        .tileD {
          grid-column: span 4;
          min-height: 240px;
        }
        .tileE {
          grid-column: span 4;
          min-height: 240px;
        }
        .tileF {
          grid-column: span 4;
          min-height: 240px;
        }

        .imgWrap {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: inherit;
        }

        .img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
          filter: saturate(0.92) contrast(1.06) brightness(0.92);
          transition: transform 600ms ease, filter 600ms ease;
        }

        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          padding: 14px;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 55%,
            rgba(0, 0, 0, 0.6) 100%
          );
          opacity: 0;
          transition: opacity 320ms ease;
        }

        .chip {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.18em;
          color: #25c3e2;
          border: 1px solid rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.1);
          padding: 7px 10px;
          border-radius: 999px;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.35);
        }

        .tile:hover .img {
          transform: scale(1.09);
          filter: saturate(1) contrast(1.1) brightness(0.98);
        }
        .tile:hover .overlay {
          opacity: 1;
        }

        /* ========= RESPONSIVE ========= */
        @media (max-width: 991px) {
          .swHeader {
            grid-template-columns: 1fr;
          }
          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .tileA {
            grid-column: span 2;
            grid-row: auto;
            min-height: 320px;
          }
          .tileB,
          .tileC,
          .tileD,
          .tileE,
          .tileF {
            grid-column: span 1;
            min-height: 200px;
          }
        }

        @media (max-width: 520px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .tileA,
          .tileB,
          .tileC,
          .tileD,
          .tileE,
          .tileF {
            grid-column: span 1;
            min-height: 220px;
          }
        }

        .selected-work-text1,
        .selected-work-text2 {
          display: inline-block;
        }
      `}</style>
    </>
  )
}

SelectedWork.defaultProps = {
  feature2ImageAlt: 'Selected work image 02',
  feature1ImageAlt1: 'Selected work image 04',
  feature3ImageAlt1: 'Selected work image 06',
  feature1ImageAlt: 'Selected work image 01',
  feature2ImageAlt1: 'Selected work image 05',
  feature3ImageAlt: 'Selected work image 03',

  // ✅ NEW: default to /public/home/ sw-xx files
  // Put images here:
  // /public/home/sw-01.jpg ... sw-06.jpg
  feature1ImageSrc: '/home/sw-01.jpg',
  feature2ImageSrc: '/home/sw-02.jpg',
  feature3ImageSrc: '/home/sw-03.jpg',
  feature1ImageSrc1: '/home/sw-04.jpg',
  feature2ImageSrc1: '/home/sw-05.jpg',
  feature3ImageSrc1: '/home/sw-06.jpg',

  sectionTitle: undefined,
  sectionDescription: undefined,
}

SelectedWork.propTypes = {
  feature2ImageAlt: PropTypes.string,
  feature1ImageAlt1: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature1ImageSrc1: PropTypes.string,
  feature3ImageSrc1: PropTypes.string,
  sectionTitle: PropTypes.element,
  feature3ImageAlt1: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature2ImageSrc1: PropTypes.string,
  feature2ImageAlt1: PropTypes.string,
  sectionDescription: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
}

export default SelectedWork