import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const IntroductionPhotographyServices = (props) => {
  return (
    <>
      <section
        className={`ipIntro-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="ipIntro-max thq-section-max-width">
          <div className="ipIntro-card">
            {/* background overlays */}
            <div className="ipIntro-bg" aria-hidden="true">
              <div className="ipIntro-vignette" />
              <div className="ipIntro-grain" />
              <div className="ipIntro-glow" />
            </div>

            <div className="ipIntro-inner">
              {/* kicker row */}
              <div className="ipIntro-kickerRow">
                <span className="ipIntro-kicker">INTRODUCTION</span>
                <span className="ipIntro-line" />
              </div>

              <h2 className="thq-heading-2 ipIntro-title">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="introduction-photography-services-text1">
                      Introduction
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large ipIntro-copy">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="introduction-photography-services-text2">
                      <span>
                        Photography is where my visual language began. I approach still
                        images the same way I approach film — with attention to light,
                        composition, and the feeling a moment carries.
                      </span>
                      <br />
                      <span>
                        Each photograph is created to stand on its own, while also fitting
                        naturally into larger visual narratives for editorial, commercial,
                        and artistic use.
                      </span>
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="ipIntro-divider" aria-hidden="true" />

              <div className="ipIntro-meta thq-body-small">
                Light • Composition • Atmosphere
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ipIntro-wrap {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .ipIntro-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .ipIntro-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .ipIntro-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ipIntro-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 70% at 50% 15%,
              rgba(255, 255, 255, 0.04),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.32) 55%,
              rgba(0, 0, 0, 0.82) 100%
            );
        }

        .ipIntro-glow {
          position: absolute;
          inset: -18%;
          background: radial-gradient(
            40% 30% at 18% 40%,
            rgba(37, 195, 226, 0.12),
            rgba(37, 195, 226, 0) 62%
          );
          filter: blur(12px);
          opacity: 0.9;
        }

        .ipIntro-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .ipIntro-inner {
          position: relative;
          z-index: 1;
          padding: 28px 26px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
          max-width: 920px;
        }

        .ipIntro-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ipIntro-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
          white-space: nowrap;
        }

        .ipIntro-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .ipIntro-title {
          margin: 0;
          line-height: 1.2;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .ipIntro-copy {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
          max-width: 70ch;
        }

        .ipIntro-divider {
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

        .ipIntro-meta {
          margin-top: 8px;
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        /* Keep your original spans */
        .introduction-photography-services-text1,
        .introduction-photography-services-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .ipIntro-inner {
            padding: 20px 16px 16px;
            align-items: center;
            text-align: center;
          }
          .ipIntro-kickerRow {
            justify-content: center;
          }
          .ipIntro-line {
            display: none;
          }
          .ipIntro-copy {
            max-width: 62ch;
          }
        }
      `}</style>
    </>
  )
}

IntroductionPhotographyServices.defaultProps = {
  rootClassName: '',
  feature1Title: undefined,
  feature1Description: undefined,
}

IntroductionPhotographyServices.propTypes = {
  rootClassName: PropTypes.string,
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default IntroductionPhotographyServices