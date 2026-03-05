import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const IntroductionAnimationServices = (props) => {
  return (
    <>
      <section
        className={`ias-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="ias-max thq-section-max-width">
          <div className="ias-card">
            <div className="ias-bg" aria-hidden="true">
              <div className="ias-vignette" />
              <div className="ias-grain" />
            </div>

            <div className="ias-inner">
              <div className="ias-kickerRow">
                <span className="ias-kicker">INTRODUCTION</span>
                <span className="ias-line" />
              </div>

              <h2 className="thq-heading-2 ias-title">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="introduction-animation-services-text1">
                      Introduction
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large ias-copy">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="introduction-animation-services-text2">
                      <span>
                        Motion is an extension of visual storytelling. I use
                        animation and motion design to add clarity, structure,
                        and rhythm to ideas — always in service of the narrative.
                      </span>
                      <br />
                      <span>
                        The focus is on purpose and restraint, creating movement
                        that feels natural and cinematic.
                      </span>
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="ias-divider" aria-hidden="true" />

              <div className="ias-meta thq-body-small">
                Rhythm • Structure • Intent • Atmosphere
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ias-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .ias-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .ias-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .ias-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ias-vignette {
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

        .ias-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .ias-inner {
          position: relative;
          z-index: 1;
          padding: 32px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .ias-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .ias-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .ias-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .ias-title {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .ias-copy {
          margin: 0;
          line-height: 1.8;
          color: rgba(245, 244, 244, 0.85);
          max-width: 70ch;
        }

        .ias-divider {
          width: 100%;
          height: 1px;
          margin-top: 8px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.12),
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0.12)
          );
        }

        .ias-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .introduction-animation-services-text1,
        .introduction-animation-services-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .ias-inner {
            padding: 22px 16px 18px;
          }

          .ias-line {
            display: none;
          }

          .ias-copy {
            max-width: 62ch;
          }
        }
      `}</style>
    </>
  )
}

IntroductionAnimationServices.defaultProps = {
  feature1Title: undefined,
  feature1Description: undefined,
  rootClassName: '',
}

IntroductionAnimationServices.propTypes = {
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default IntroductionAnimationServices