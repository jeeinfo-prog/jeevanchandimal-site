import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const IntroductionAudioServices = (props) => {
  return (
    <>
      <section
        className={`ias-audio-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="ias-audio-max thq-section-max-width">
          <div className="ias-audio-card">
            <div className="ias-audio-bg" aria-hidden="true">
              <div className="ias-audio-vignette" />
              <div className="ias-audio-grain" />
            </div>

            <div className="ias-audio-inner">
              <div className="ias-audio-kickerRow">
                <span className="ias-audio-kicker">INTRODUCTION</span>
                <span className="ias-audio-line" />
              </div>

              <h2 className="thq-heading-2 ias-audio-title">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="introduction-audio-services-text1">
                      Introduction
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large ias-audio-copy">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="introduction-audio-services-text2">
                      <span>
                        Sound shapes how a story is felt. I approach audio with the
                        same care as image and motion, focusing on texture, space,
                        and emotional impact.
                      </span>
                      <br />
                      <span>
                        From subtle atmospheres to full compositions, audio is
                        crafted to support narrative, rhythm, and cinematic flow.
                      </span>
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="ias-audio-divider" />
              <div className="ias-audio-meta thq-body-small">
                Texture • Space • Emotion • Flow
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ias-audio-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .ias-audio-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .ias-audio-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .ias-audio-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ias-audio-vignette {
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

        .ias-audio-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .ias-audio-inner {
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

        .ias-audio-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .ias-audio-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .ias-audio-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .ias-audio-title {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .ias-audio-copy {
          margin: 0;
          line-height: 1.8;
          color: rgba(245, 244, 244, 0.85);
          max-width: 70ch;
        }

        .ias-audio-divider {
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

        .ias-audio-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .introduction-audio-services-text1,
        .introduction-audio-services-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .ias-audio-inner {
            padding: 22px 16px 18px;
          }

          .ias-audio-line {
            display: none;
          }

          .ias-audio-copy {
            max-width: 62ch;
          }
        }
      `}</style>
    </>
  )
}

IntroductionAudioServices.defaultProps = {
  rootClassName: '',
  feature1Title: undefined,
  feature1Description: undefined,
}

IntroductionAudioServices.propTypes = {
  rootClassName: PropTypes.string,
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default IntroductionAudioServices