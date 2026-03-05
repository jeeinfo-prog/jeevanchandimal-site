import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ServiceIntro = (props) => {
  return (
    <>
      <section
        className={`si-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="si-max thq-section-max-width">
          <div className="si-card">
            <div className="si-bg" aria-hidden="true">
              <div className="si-vignette" />
              <div className="si-grain" />
            </div>

            <div className="si-inner">
              <div className="si-kickerRow">
                <span className="si-kicker">INTRODUCTION</span>
                <span className="si-line" />
              </div>

              <h2 className="thq-heading-2 si-title">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="service-intro-text2">
                      End-to-end visual production, built with cinematic intent.
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-small si-copy">
                {props.content1 ?? (
                  <Fragment>
                    <span className="service-intro-text1">
                      I work across film, photography, sound, and animation —
                      offering complete creative solutions from concept to final
                      delivery. Each project is approached with care, precision,
                      and a strong sense of atmosphere.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="si-divider" aria-hidden="true" />

              <div className="si-meta thq-body-small">
                Story • Craft • Atmosphere • Intent
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .si-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .si-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .si-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .si-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .si-vignette {
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

        .si-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .si-inner {
          position: relative;
          z-index: 1;
          padding: 32px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          max-width: 920px;
        }

        .si-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .si-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .si-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .si-title {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .si-copy {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.82);
          max-width: 72ch;
        }

        .si-divider {
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

        .si-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .service-intro-text1,
        .service-intro-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .si-inner {
            padding: 22px 16px 18px;
            align-items: center;
            text-align: center;
          }

          .si-kickerRow {
            justify-content: center;
          }

          .si-line {
            display: none;
          }

          .si-copy {
            max-width: 62ch;
          }
        }
      `}</style>
    </>
  )
}

ServiceIntro.defaultProps = {
  content1: undefined,
  heading1: undefined,
  rootClassName: '',
}

ServiceIntro.propTypes = {
  content1: PropTypes.element,
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default ServiceIntro