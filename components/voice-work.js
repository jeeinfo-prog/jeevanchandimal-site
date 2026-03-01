import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const VoiceWork = (props) => {
  return (
    <>
      <section className="vwSection thq-section-padding">
        {/* cinematic glass layer */}
        <div className="panel" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="wrap thq-section-max-width">
          {/* header */}
          <header className="titleBlock">
            <div className="kicker">Voice</div>

            <h2 className="thq-heading-2 title">
              {props.heading1 ?? (
                <Fragment>
                  <span>Voice Work</span>
                </Fragment>
              )}
            </h2>

            <p className="thq-body-large desc">
              {props.content1 ?? (
                <Fragment>
                  <span>
                    Voice-based audio created for film, narration, and visual storytelling. Clarity,
                    tone, and emotional delivery are prioritized over performance excess.
                  </span>
                </Fragment>
              )}
            </p>
          </header>

          {/* cards */}
          <div className="grid">
            {/* 1 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="img"
                  loading="lazy"
                />
                <div className="mediaOverlay" aria-hidden="true" />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span>Narration</span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small cardText">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>Clean, controlled delivery—tone-first, never overperformed.</span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>

            {/* 2 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="img"
                  loading="lazy"
                />
                <div className="mediaOverlay" aria-hidden="true" />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span>Film / Documentary</span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small cardText">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span>Voice that supports story beats, pacing, and emotional clarity.</span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>

            {/* 3 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="img"
                  loading="lazy"
                />
                <div className="mediaOverlay" aria-hidden="true" />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>Brand Voice</span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small cardText">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>Warm, confident reads for campaigns, promos, and identity films.</span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <style jsx>{`
        .vwSection {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
          overflow: hidden;
        }

        .panel {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              80% 65% at 50% 0%,
              rgba(255, 255, 255, 0.06),
              rgba(0, 0, 0, 0) 55%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.12) 0%,
              rgba(0, 0, 0, 0) 46%,
              rgba(0, 0, 0, 0.38) 100%
            );
        }

        .grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .wrap {
          width: 100%;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
        }

        .titleBlock {
          width: 100%;
          max-width: 920px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.68);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(10px);
        }

        .title {
          margin: 0;
          line-height: 1.08;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .desc {
          margin: 0;
          color: rgba(245, 244, 244, 0.82);
          line-height: 1.7;
        }

        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }

        .card {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(15, 15, 15, 0.55);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: 0 18px 55px rgba(0, 0, 0, 0.42);
          transform: translateY(0);
          transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(160, 196, 255, 0.22);
          box-shadow: 0 28px 75px rgba(0, 0, 0, 0.55);
        }

        .media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.35);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
          filter: saturate(0.92) contrast(1.05) brightness(0.78);
          transition: transform 420ms ease, filter 420ms ease;
          display: block;
        }

        .card:hover .img {
          transform: scale(1.08);
          filter: saturate(0.98) contrast(1.08) brightness(0.82);
        }

        .mediaOverlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              85% 65% at 50% 20%,
              rgba(0, 0, 0, 0.08),
              rgba(0, 0, 0, 0.62)
            ),
            linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.75));
        }

        .cardBody {
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cardTitle {
          margin: 0;
          line-height: 1.2;
        }

        .cardText {
          color: rgba(245, 244, 244, 0.78);
          line-height: 1.6;
        }

        @media (max-width: 767px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

VoiceWork.defaultProps = {
  heading1: undefined,
  content1: undefined,

  feature1Title: undefined,
  feature1Description: undefined,
  feature1ImageAlt: 'Narration',
  feature1ImageSrc: '/work/audio/wavw-01.jpg',

  feature2Title: undefined,
  feature2Description: undefined,
  feature2ImageAlt: 'Film / Documentary',
  feature2ImageSrc: '/work/audio/wavw-02.jpg',

  feature3Title: undefined,
  feature3Description: undefined,
  feature3ImageAlt: 'Brand Voice',
  feature3ImageSrc: '/work/audio/wavw-03.jpg',
}

VoiceWork.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,

  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature1ImageSrc: PropTypes.string,

  feature2Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature2ImageSrc: PropTypes.string,

  feature3Title: PropTypes.element,
  feature3Description: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
}

export default VoiceWork