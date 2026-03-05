import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const HowIApproachPhotography = (props) => {
  return (
    <>
      <section
        className={`hiap-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="hiap-max thq-section-max-width">
          <div className="hiap-card">
            {/* background overlays */}
            <div className="hiap-bg" aria-hidden="true">
              <div className="hiap-vignette" />
              <div className="hiap-grain" />
              <div className="hiap-glow" />
            </div>

            <div className="hiap-inner">
              {/* kicker row */}
              <div className="hiap-kickerRow">
                <span className="hiap-kicker">PROCESS</span>
                <span className="hiap-line" />
              </div>

              <h2 className="thq-heading-2 hiap-title">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="how-i-approach-photography-text1">
                      How I Approach Photography
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large hiap-copy">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="how-i-approach-photography-text2">
                      <span>
                        I look for moments that feel honest and unforced. Light,
                        timing, and stillness matter more than spectacle.
                      </span>
                      <br />
                      <span>
                        Whether working in controlled environments or in the
                        field, the goal is always the same — to create images
                        that feel considered, immersive, and lasting.
                      </span>
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="hiap-divider" aria-hidden="true" />

              <div className="hiap-meta thq-body-small">
                Observation • Patience • Intent
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hiap-wrap {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .hiap-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .hiap-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .hiap-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hiap-vignette {
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

        .hiap-glow {
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

        .hiap-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .hiap-inner {
          position: relative;
          z-index: 1;
          padding: 28px 26px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
          max-width: 920px;
        }

        .hiap-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hiap-kicker {
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

        .hiap-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .hiap-title {
          margin: 0;
          line-height: 1.2;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .hiap-copy {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
          max-width: 70ch;
        }

        .hiap-divider {
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

        .hiap-meta {
          margin-top: 8px;
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        /* keep original spans */
        .how-i-approach-photography-text1,
        .how-i-approach-photography-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .hiap-inner {
            padding: 20px 16px 16px;
            align-items: center;
            text-align: center;
          }
          .hiap-kickerRow {
            justify-content: center;
          }
          .hiap-line {
            display: none;
          }
          .hiap-copy {
            max-width: 62ch;
          }
        }
      `}</style>
    </>
  )
}

HowIApproachPhotography.defaultProps = {
  feature1Title: undefined,
  rootClassName: '',
  feature1Description: undefined,
}

HowIApproachPhotography.propTypes = {
  feature1Title: PropTypes.element,
  rootClassName: PropTypes.string,
  feature1Description: PropTypes.element,
}

export default HowIApproachPhotography