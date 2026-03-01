import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const AudioProduction = (props) => {
  return (
    <>
      <section className="audioSection thq-section-padding">
        {/* cinematic panel */}
        <div className="panel" aria-hidden="true" />

        <div className="wrap thq-section-max-width thq-flex-column">
          {/* header */}
          <header className="titleBlock thq-flex-column">
            <div className="kicker">Audio</div>

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
                    <span>
                      Sound is approached here as an emotional and spatial element — something that
                      shapes how a story is felt, not simply heard. The work in this archive focuses
                      on texture, rhythm, and restraint, allowing silence and space to play an active
                      role.
                    </span>
                    <br />
                    <span>
                      This collection includes sound design, music, and voice-based work created to
                      support film, animation, and immersive visual experiences.
                    </span>
                  </span>
                </Fragment>
              )}
            </p>
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
                <div className="mediaOverlay" aria-hidden="true" />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span>Sound design</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>Atmosphere, texture, and spatial detail — built to support story.</span>
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
                <div className="mediaOverlay" aria-hidden="true" />
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
                      <span>Original compositions shaped around mood, pacing, and restraint.</span>
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
                <div className="mediaOverlay" aria-hidden="true" />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>Voice work</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>Clean delivery for narration and film — clarity over excess.</span>
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

        /* glass cinematic panel behind section */
        .panel {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              70% 60% at 50% 0%,
              rgba(255, 255, 255, 0.06),
              rgba(0, 0, 0, 0.0) 55%
            ),
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.05) 0%,
              rgba(0, 0, 0, 0.0) 42%,
              rgba(0, 0, 0, 0.35) 100%
            );
        }

        .wrap {
          width: 100%;
          gap: var(--dl-layout-space-threeunits);
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .titleBlock {
          align-items: center;
          text-align: center;
          max-width: 920px;
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

        .actions {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        /* Buttons: luxury look */
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
            width: 100%;
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
  sectionTitle: undefined,
  sectionDescription: undefined,

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