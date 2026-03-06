import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const AudioProduction = (props) => {
  return (
    <>
      <section className="audioSection thq-section-padding">
        {/* cinematic ambient panel */}
        <div className="panel" aria-hidden="true" />

        <div className="wrap thq-section-max-width thq-flex-column">
          {/* premium left-aligned title section */}
          <header className="titleShell">
            <div className="titleBg" aria-hidden="true">
              <div className="titleVignette" />
              <div className="titleGlow" />
              <div className="titleGrain" />
            </div>

            <div className="titleBlock thq-flex-column">
              <div className="kickerRow">
                <span className="kicker">AUDIO</span>
                <span className="kickerLine" />
              </div>

              <h2 className="thq-heading-2 title">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span>Audio Production</span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large desc">
                {props.sectionDescription ?? (
                  <Fragment>
                    <span>
                      Sound shaped with atmosphere, restraint, and intention —
                      designed to deepen emotion, space, and cinematic presence
                      across film, animation, and immersive visual work.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="titleDivider" aria-hidden="true" />

              <div className="titleMeta thq-body-small">
                Atmosphere • Rhythm • Presence
              </div>
            </div>
          </header>

          {/* grid */}
          <div className="grid thq-grid-auto-300">
            {/* CARD 1 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="img"
                  loading="lazy"
                />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span>Sound Design</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>
                        Atmosphere, texture, and spatial detail built to support
                        story with precision.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>

            {/* CARD 2 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="img"
                  loading="lazy"
                />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span>Music</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span>
                        Original compositions shaped around mood, pacing, and
                        emotional restraint.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>

            {/* CARD 3 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="img"
                  loading="lazy"
                />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>Voice Work</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>
                        Clean, focused delivery for narration and film, with
                        clarity leading every performance.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>
          </div>

          {/* actions */}
          <div className="actions thq-flex-row">
            <button className="btnPrimary thq-button-filled" type="button">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span>Get Started</span>
                  </Fragment>
                )}
              </span>
            </button>

            <button className="btnGhost thq-button-outline" type="button">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span>Learn More</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .audioSection {
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
              70% 60% at 50% 0%,
              rgba(255, 255, 255, 0.05),
              rgba(0, 0, 0, 0) 56%
            ),
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.02) 0%,
              rgba(0, 0, 0, 0) 48%,
              rgba(0, 0, 0, 0.24) 100%
            );
        }

        .wrap {
          width: 100%;
          gap: var(--dl-layout-space-threeunits);
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* premium left-aligned header */
        .titleShell {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: linear-gradient(
            180deg,
            rgba(18, 18, 18, 0.72) 0%,
            rgba(10, 10, 10, 0.58) 100%
          );
          box-shadow: 0 30px 110px rgba(0, 0, 0, 0.58);
          backdrop-filter: blur(10px);
        }

        .titleBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .titleVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              60% 58% at 16% 18%,
              rgba(255, 255, 255, 0.07),
              rgba(255, 255, 255, 0) 60%
            ),
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.03) 0%,
              rgba(0, 0, 0, 0.18) 52%,
              rgba(0, 0, 0, 0.42) 100%
            );
        }

        .titleGlow {
          position: absolute;
          inset: -20%;
          background: radial-gradient(
            38% 34% at 18% 24%,
            rgba(160, 196, 255, 0.14),
            rgba(160, 196, 255, 0) 65%
          );
          filter: blur(20px);
          opacity: 0.95;
        }

        .titleGrain {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .titleBlock {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 900px;
          margin: 0;
          padding: 40px 32px 28px;
          align-items: flex-start;
          text-align: left;
          gap: 12px;
        }

        .kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: flex-start;
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.24);
          white-space: nowrap;
        }

        .kickerLine {
          flex: 1;
          max-width: 360px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.2),
            rgba(245, 244, 244, 0.08),
            rgba(245, 244, 244, 0)
          );
        }

        .title {
          margin: 0;
          max-width: 12ch;
          line-height: 1.06;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.52);
        }

        .desc {
          margin: 0;
          max-width: 64ch;
          color: rgba(245, 244, 244, 0.84);
          line-height: 1.8;
        }

        .titleDivider {
          width: 100%;
          max-width: 520px;
          height: 1px;
          margin-top: 8px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0.06),
            rgba(245, 244, 244, 0)
          );
        }

        .titleMeta {
          margin-top: 2px;
          color: rgba(245, 244, 244, 0.58);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .grid {
          width: 100%;
          align-self: stretch;
          align-items: stretch;
          gap: 18px;
        }

        .card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(15, 15, 15, 0.55);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: 0 18px 55px rgba(0, 0, 0, 0.42);
          transform: translateY(0);
          transition: transform 260ms ease, border-color 260ms ease,
            box-shadow 260ms ease;
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
          background: rgba(0, 0, 0, 0.08);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          filter: saturate(1) contrast(1.02) brightness(1);
          transition: transform 420ms ease;
        }

        .card:hover .img {
          transform: scale(1.06);
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

        .actions {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .btnPrimary {
          border-radius: 999px;
          padding: 10px 18px;
          background: linear-gradient(
            180deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0.06)
          );
          border: 1px solid rgba(245, 244, 244, 0.16);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          transition: transform 200ms ease, border-color 200ms ease;
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(160, 196, 255, 0.25);
        }

        .btnGhost {
          border-radius: 999px;
          padding: 10px 18px;
          background: rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(245, 244, 244, 0.14);
          backdrop-filter: blur(10px);
          transition: transform 200ms ease, border-color 200ms ease;
        }

        .btnGhost:hover {
          transform: translateY(-1px);
          border-color: rgba(245, 244, 244, 0.22);
        }

        @media (max-width: 991px) {
          .titleBlock {
            padding: 30px 22px 22px;
          }

          .title {
            max-width: 100%;
          }
        }

        @media (max-width: 767px) {
          .wrap {
            gap: var(--dl-layout-space-twounits);
          }

          .titleBlock {
            padding: 22px 16px 16px;
          }

          .kickerLine {
            display: none;
          }

          .titleDivider {
            max-width: 100%;
          }
        }

        @media (max-width: 479px) {
          .wrap {
            gap: var(--dl-layout-space-oneandhalfunits);
          }

          .actions {
            flex-direction: column;
            align-items: stretch;
          }

          .btnPrimary,
          .btnGhost {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}

AudioProduction.defaultProps = {
  sectionTitle: (
    <Fragment>
      <span>Audio Production</span>
    </Fragment>
  ),
  sectionDescription: (
    <Fragment>
      <span>
        Sound shaped with atmosphere, restraint, and intention — designed to
        deepen emotion, space, and cinematic presence across film, animation,
        and immersive visual work.
      </span>
    </Fragment>
  ),

  feature1Title: undefined,
  feature1Description: undefined,
  feature1ImageAlt: 'Sound design',
  feature1ImageSrc: '/work/audio/wap-01.jpg',

  feature2Title: undefined,
  feature2Description: undefined,
  feature2ImageAlt: 'Music',
  feature2ImageSrc: '/work/audio/wap-02.jpg',

  feature3Title: undefined,
  feature3Description: undefined,
  feature3ImageAlt: 'Voice work',
  feature3ImageSrc: '/work/audio/wap-03.jpg',

  mainAction: undefined,
  secondaryAction: undefined,
}

AudioProduction.propTypes = {
  sectionTitle: PropTypes.element,
  sectionDescription: PropTypes.element,

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

  mainAction: PropTypes.element,
  secondaryAction: PropTypes.element,
}

export default AudioProduction