import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const HowIApproachAudio = (props) => {
  return (
    <>
      <section
        className={`hiaa-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="hiaa-max thq-section-max-width">
          <div className="hiaa-card">
            <div className="hiaa-bg" aria-hidden="true">
              <div className="hiaa-vignette" />
              <div className="hiaa-grain" />
            </div>

            <div className="hiaa-inner">
              <div className="hiaa-kickerRow">
                <span className="hiaa-kicker">APPROACH</span>
                <span className="hiaa-line" />
              </div>

              <h2 className="thq-heading-2 hiaa-title">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="how-i-approach-audio-text1">
                      How I Approach Audio
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large hiaa-copy">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="how-i-approach-audio-text2">
                      <span>
                        I listen before I design. Silence, space, and restraint are
                        as important as sound itself.
                      </span>
                      <br />
                      <span>
                        Every layer is shaped to feel intentional — enhancing the
                        story without overpowering it.
                      </span>
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="hiaa-divider" />
              <div className="hiaa-meta thq-body-small">
                Silence • Space • Texture • Intention
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hiaa-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .hiaa-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .hiaa-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .hiaa-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hiaa-vignette {
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

        .hiaa-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .hiaa-inner {
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

        .hiaa-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .hiaa-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .hiaa-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .hiaa-title {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .hiaa-copy {
          margin: 0;
          line-height: 1.8;
          color: rgba(245, 244, 244, 0.85);
          max-width: 70ch;
        }

        .hiaa-divider {
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

        .hiaa-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .how-i-approach-audio-text1,
        .how-i-approach-audio-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .hiaa-inner {
            padding: 22px 16px 18px;
          }

          .hiaa-line {
            display: none;
          }

          .hiaa-copy {
            max-width: 62ch;
          }
        }
      `}</style>
    </>
  )
}

HowIApproachAudio.defaultProps = {
  feature1Title: undefined,
  rootClassName: '',
  feature1Description: undefined,
}

HowIApproachAudio.propTypes = {
  feature1Title: PropTypes.element,
  rootClassName: PropTypes.string,
  feature1Description: PropTypes.element,
}

export default HowIApproachAudio