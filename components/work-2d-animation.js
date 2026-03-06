import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Work2DAnimation = (props) => {
  return (
    <>
      <section className="wa2dSection thq-section-padding">
        <div className="panel" aria-hidden="true" />

        <div className="wrap thq-section-max-width thq-flex-column">
          {/* luxury cinematic curved title box */}
          <header className="titleShell">
            <div className="titleBg" aria-hidden="true">
              <div className="titleVignette" />
              <div className="titleGlow" />
              <div className="titleGrain" />
            </div>

            <div className="titleInner">
              <div className="titleCol">
                <div className="kickerRow">
                  <span className="kicker">2D</span>
                  <span className="kickerLine" />
                </div>

                <h2 className="thq-heading-2 title">
                  {props.sectionTitle ?? (
                    <Fragment>
                      <span>2D Animation</span>
                    </Fragment>
                  )}
                </h2>

                <div className="titleDivider" aria-hidden="true" />

                <div className="titleMeta thq-body-small">
                  Rhythm • Structure • Clarity
                </div>
              </div>

              <p className="thq-body-large desc">
                {props.sectionDescription ?? (
                  <Fragment>
                    <span>
                      Flat and illustrative animation developed with structure
                      and pacing in mind. Movement is clean, purposeful, and
                      aligned with narrative flow.
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
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
              </div>
              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span>Concept & Story</span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small cardText">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>
                        Movement designed around meaning—clear beats, clean
                        intention.
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
                      <span>Timing & Rhythm</span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small cardText">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span>
                        Controlled pacing that supports edit, tone, and emotion.
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
                      <span>Visual Cohesion</span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small cardText">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>
                        Design that integrates with film and photography—never
                        distracts.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>
          </div>

          {/* actions */}
          <div className="actions">
            <button className="btnPrimary thq-button-filled" type="button">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span>Customized Solutions</span>
                  </Fragment>
                )}
              </span>
            </button>

            <button className="btnGhost thq-button-outline" type="button">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span>Dedicated Customer Support</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .wa2dSection {
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
          position: relative;
          z-index: 1;
          gap: var(--dl-layout-space-threeunits);
          align-items: center;
        }

        /* curved corners box behind title */
        .titleShell {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.56);
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
              72% 62% at 18% 18%,
              rgba(255, 255, 255, 0.06),
              rgba(255, 255, 255, 0) 58%
            ),
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.03) 0%,
              rgba(0, 0, 0, 0.18) 46%,
              rgba(0, 0, 0, 0.5) 100%
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
          filter: blur(22px);
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

        .titleInner {
          width: 100%;
          max-width: 980px;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1.12fr;
          gap: 22px;
          align-items: end;
          padding: 30px 28px 24px;
        }

        .titleCol {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }

        .kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .kicker {
          width: fit-content;
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
          backdrop-filter: blur(10px);
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
          line-height: 1.08;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .desc {
          margin: 0;
          color: rgba(245, 244, 244, 0.84);
          line-height: 1.75;
          max-width: 62ch;
          text-align: left;
        }

        .titleDivider {
          width: 100%;
          max-width: 420px;
          height: 1px;
          margin-top: 4px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.14),
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0)
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
          .titleInner {
            grid-template-columns: 1fr;
            align-items: start;
          }

          .title {
            max-width: 100%;
          }
        }

        @media (max-width: 767px) {
          .titleInner {
            padding: 22px 16px 18px;
          }

          .kickerLine {
            display: none;
          }

          .grid {
            grid-template-columns: 1fr;
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

Work2DAnimation.defaultProps = {
  sectionTitle: undefined,
  sectionDescription: undefined,

  feature1Title: undefined,
  feature1Description: undefined,
  feature1ImageAlt: 'Concept & Story',
  feature1ImageSrc: '/work/animation/wa2d-01.jpg',

  feature2Title: undefined,
  feature2Description: undefined,
  feature2ImageAlt: 'Timing & Rhythm',
  feature2ImageSrc: '/work/animation/wa2d-02.jpg',

  feature3Title: undefined,
  feature3Description: undefined,
  feature3ImageAlt: 'Visual Cohesion',
  feature3ImageSrc: '/work/animation/wa2d-03.jpg',

  mainAction: undefined,
  secondaryAction: undefined,
}

Work2DAnimation.propTypes = {
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

export default Work2DAnimation