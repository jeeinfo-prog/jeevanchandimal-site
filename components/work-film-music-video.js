// components/work-film-music-video.js
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkFilmMusicVideo = (props) => {
  return (
    <>
      <section className={`mvWrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* ---------- Header (luxury cinematic) ---------- */}
          <header className="head">
            <div className="kickerRow">
              <span className="kicker">FILM</span>
              <span className="dot" aria-hidden="true" />
              <span className="kickerSub">Rhythm · Movement · Atmosphere</span>
            </div>

            <h2 className="title thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="t">Music Video</span>
                </Fragment>
              )}
            </h2>

            <p className="desc thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span>
                    Music-driven visual pieces where rhythm, movement, and image
                    work together as a unified experience. Each video is shaped
                    to support the sound while maintaining cinematic structure and restraint.
                  </span>
                </Fragment>
              )}
            </p>
          </header>

          {/* ---------- Grid ---------- */}
          <div className="grid">
            {/* Card 1 */}
            <a className="card" href={props.feature1Href || '#'} aria-label="Open Music Video 01">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img"
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                loading="lazy"
              />
              <div className="shade" />
              <div className="cap">
                <div className="capTop">
                  <span className="capTag">Music Video</span>
                  <span className="capDot" aria-hidden="true" />
                  <span className="capMeta">01</span>
                </div>

                <div className="capTitle">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span>mv-01</span>
                    </Fragment>
                  )}
                </div>

                <div className="capDesc">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>Music-driven storytelling with cinematic pacing.</span>
                    </Fragment>
                  )}
                </div>
              </div>
            </a>

            {/* Card 2 */}
            <a className="card" href={props.feature2Href || '#'} aria-label="Open Music Video 02">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img"
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                loading="lazy"
              />
              <div className="shade" />
              <div className="cap">
                <div className="capTop">
                  <span className="capTag">Music Video</span>
                  <span className="capDot" aria-hidden="true" />
                  <span className="capMeta">02</span>
                </div>

                <div className="capTitle">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span>mv-02</span>
                    </Fragment>
                  )}
                </div>

                <div className="capDesc">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span>Movement + texture designed to serve the sound.</span>
                    </Fragment>
                  )}
                </div>
              </div>
            </a>

            {/* Card 3 */}
            <a className="card" href={props.feature3Href || '#'} aria-label="Open Music Video 03">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img"
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                loading="lazy"
              />
              <div className="shade" />
              <div className="cap">
                <div className="capTop">
                  <span className="capTag">Music Video</span>
                  <span className="capDot" aria-hidden="true" />
                  <span className="capMeta">03</span>
                </div>

                <div className="capTitle">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>mv-03</span>
                    </Fragment>
                  )}
                </div>

                <div className="capDesc">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>Minimal narrative with strong visual continuity.</span>
                    </Fragment>
                  )}
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .mvWrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* subtle luxury glass / cyan bloom */
        .mvWrap::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              70% 60% at 50% 0%,
              rgba(37, 195, 226, 0.06),
              rgba(0, 0, 0, 0)
            ),
            linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
          opacity: 0.95;
        }

        .shell {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ---------- Header ---------- */
        .head {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kickerRow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          opacity: 0.92;
        }

        .kicker {
          letter-spacing: 0.28em;
          font-size: 11px;
          font-weight: 900;
          color: rgba(245, 244, 244, 0.82);
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(37, 195, 226, 0.65);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.1);
        }

        .kickerSub {
          font-size: 12px;
          color: rgba(245, 244, 244, 0.7);
          letter-spacing: 0.08em;
        }

        .title {
          margin: 0;
          color: #f5f4f4;
          text-shadow: 0 14px 38px rgba(0, 0, 0, 0.35);
        }

        .desc {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.82);
        }

        /* ---------- Grid ---------- */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
          width: 100%;
        }

        .card {
          grid-column: span 4;
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(0, 0, 0, 0.25);
          aspect-ratio: 16 / 10;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          transform: translateZ(0);
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
          text-decoration: none;
          display: block;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 24px 62px rgba(0, 0, 0, 0.55);
        }

        .img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.82) contrast(1.05) saturate(0.92);
          transform: scale(1.02);
          transition: transform 0.32s ease, filter 0.32s ease;
          display: block;
        }

        .card:hover .img {
          transform: scale(1.07);
          filter: brightness(0.9) contrast(1.08) saturate(0.98);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.78),
            rgba(0, 0, 0, 0.22),
            rgba(0, 0, 0, 0)
          );
        }

        .cap {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .capTop {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          color: rgba(245, 244, 244, 0.86);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .capTag {
          font-weight: 800;
        }

        .capDot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(37, 195, 226, 0.7);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.12);
        }

        .capMeta {
          opacity: 0.9;
        }

        .capTitle {
          font-size: 16px;
          font-weight: 900;
          color: #f5f4f4;
          letter-spacing: 0.02em;
          text-shadow: 0 10px 26px rgba(0, 0, 0, 0.45);
        }

        .capDesc {
          font-size: 12px;
          line-height: 1.55;
          color: rgba(245, 244, 244, 0.78);
          max-width: 60ch;
        }

        @media (max-width: 991px) {
          .card {
            grid-column: span 6;
          }
        }

        @media (max-width: 767px) {
          .head {
            text-align: left;
            margin: 0;
          }
          .kickerRow {
            justify-content: flex-start;
          }
          .card {
            grid-column: span 12;
          }
        }
      `}</style>
    </>
  )
}

WorkFilmMusicVideo.defaultProps = {
  rootClassName: '',
  heading1: undefined,
  content1: undefined,

  // ✅ update paths to /public/work/film/mv-xx.jpg
  feature1ImageSrc: '/work/film/mv-01.jpg',
  feature2ImageSrc: '/work/film/mv-02.jpg',
  feature3ImageSrc: '/work/film/mv-03.jpg',

  feature1ImageAlt: 'Music Video 01',
  feature2ImageAlt: 'Music Video 02',
  feature3ImageAlt: 'Music Video 03',

  feature1Title: undefined,
  feature2Title: undefined,
  feature3Title: undefined,

  feature1Description: undefined,
  feature2Description: undefined,
  feature3Description: undefined,

  // optional links
  feature1Href: '#',
  feature2Href: '#',
  feature3Href: '#',
}

WorkFilmMusicVideo.propTypes = {
  rootClassName: PropTypes.string,

  heading1: PropTypes.element,
  content1: PropTypes.element,

  feature1ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature3ImageSrc: PropTypes.string,

  feature1ImageAlt: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature3ImageAlt: PropTypes.string,

  feature1Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature3Title: PropTypes.element,

  feature1Description: PropTypes.element,
  feature2Description: PropTypes.element,
  feature3Description: PropTypes.element,

  feature1Href: PropTypes.string,
  feature2Href: PropTypes.string,
  feature3Href: PropTypes.string,
}

export default WorkFilmMusicVideo