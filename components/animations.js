import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Animations = (props) => {
  return (
    <>
      <section className="anSection thq-section-padding">
        <div className="panel" aria-hidden="true" />

        <div className="wrap thq-section-max-width thq-flex-column">
          {/* luxury cinematic title section */}
          <header className="titleShell">
            <div className="titleBg" aria-hidden="true">
              <div className="titleVignette" />
              <div className="titleGrain" />
            </div>

            <div className="titleBlock">
              <div className="kickerRow">
                <span className="kicker">MOTION</span>
                <span className="kickerLine" />
              </div>

              <h2 className="thq-heading-2 title">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span>Animation &amp; Motion</span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large desc">
                {props.sectionDescription ?? (
                  <Fragment>
                    <span>
                      <span>
                        This archive explores motion as a storytelling tool —
                        where movement is guided by rhythm, clarity, and
                        intention. Animation is treated as a visual language,
                        used to enhance narrative rather than decorate it.
                      </span>
                      <br />
                      <br />
                      <span>
                        The work includes 2D, 3D, and motion graphic projects
                        designed to integrate seamlessly with film and
                        photographic elements.
                      </span>
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="titleDivider" aria-hidden="true" />

              <div className="titleMeta thq-body-small">
                Rhythm • Clarity • Restraint
              </div>
            </div>
          </header>

          {/* premium cards */}
          <div className="grid thq-grid-auto-300">
            {/* 1 */}
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
                      <span>2D Animations</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>
                        Clean illustrative motion—timing, rhythm, and narrative
                        clarity.
                      </span>
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
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span>3D Animations</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span>
                        Spatially coherent 3D—form, light, and controlled
                        movement.
                      </span>
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
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>Motion graphics</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>
                        Typography and graphic motion built for clarity, rhythm,
                        and tone.
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
        .anSection {
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
              rgba(255, 255, 255, 0.05),
              rgba(0, 0, 0, 0) 55%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.12) 0%,
              rgba(0, 0, 0, 0) 46%,
              rgba(0, 0, 0, 0.28) 100%
            );
        }

        .wrap {
          width: 100%;
          gap: var(--dl-layout-space-threeunits);
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* luxury cinematic title section */
        .titleShell {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
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

        .titleGrain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .titleBlock {
          position: relative;
          z-index: 1;
          padding: 28px 26px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
          text-align: left;
          max-width: 920px;
        }

        .kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .kickerLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .title {
          margin: 0;
          line-height: 1.12;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .desc {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.82);
          max-width: 70ch;
        }

        .titleDivider {
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

        .titleMeta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
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
          transform: scale(1.03);
          transition: transform 420ms ease;
          display: block;
          filter: none;
        }

        .card:hover .img {
          transform: scale(1.08);
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
            width: 100%;
          }
        }

        @media (max-width: 767px) {
          .titleBlock {
            padding: 20px 16px 16px;
            align-items: center;
            text-align: center;
          }

          .kickerRow {
            justify-content: center;
          }

          .kickerLine {
            display: none;
          }

          .desc {
            max-width: 62ch;
          }
        }

        @media (max-width: 479px) {
          .wrap {
            gap: var(--dl-layout-space-oneandhalfunits);
          }

          .actions {
            width: 100%;
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

Animations.defaultProps = {
  sectionTitle: undefined,
  sectionDescription: undefined,

  feature1Title: undefined,
  feature1Description: undefined,
  feature1ImageAlt: '2D Animations',
  feature1ImageSrc: '/work/animation/waam-01.jpg',

  feature2Title: undefined,
  feature2Description: undefined,
  feature2ImageAlt: '3D Animations',
  feature2ImageSrc: '/work/animation/waam-02.jpg',

  feature3Title: undefined,
  feature3Description: undefined,
  feature3ImageAlt: 'Motion graphics',
  feature3ImageSrc: '/work/animation/waam-03.jpg',

  mainAction: undefined,
  secondaryAction: undefined,
}

Animations.propTypes = {
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

export default Animations