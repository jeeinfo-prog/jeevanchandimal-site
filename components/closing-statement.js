import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ClosingStatement = (props) => {
  return (
    <>
      <section
        className={`closing-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="closing-max thq-section-max-width">
          <div className="closing-card">
            <div className="closing-bg" aria-hidden="true">
              <div className="closing-vignette" />
              <div className="closing-grain" />
              <div className="closing-glow" />
            </div>

            <div className="closing-inner">
              <div className="closing-kickerRow">
                <span className="closing-kicker">CLOSING NOTE</span>
                <span className="closing-line" />
              </div>

              <h2 className="closing-title thq-heading-2">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="closing-statement-text1">
                      Let’s create something that lasts.
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="closing-copy thq-body-large">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="closing-statement-text2">
                      I create work that lives beyond the screen — projects
                      built with atmosphere, intention, and cinematic depth.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="closing-divider" aria-hidden="true" />

              <div className="closing-meta thq-body-small">
                Atmosphere • Intention • Depth
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .closing-wrap {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .closing-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .closing-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.56);
          box-shadow: 0 30px 110px rgba(0, 0, 0, 0.62);
          backdrop-filter: blur(10px);
        }

        .closing-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
        }

        .closing-vignette {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
              72% 56% at 50% 24%,
              rgba(255, 255, 255, 0.06),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.32) 0%,
              rgba(0, 0, 0, 0.72) 68%,
              rgba(0, 0, 0, 0.88) 100%
            );
        }

        .closing-glow {
          position: absolute;
          inset: -22%;
          border-radius: inherit;
          background: radial-gradient(
            42% 34% at 50% 26%,
            rgba(37, 195, 226, 0.16),
            rgba(37, 195, 226, 0) 62%
          );
          filter: blur(16px);
          opacity: 0.95;
        }

        .closing-grain {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .closing-inner {
          position: relative;
          z-index: 1;
          padding: 34px 26px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          text-align: center;
          max-width: 920px;
          margin: 0 auto;
        }

        .closing-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
        }

        .closing-kicker {
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

        .closing-line {
          flex: 1;
          max-width: 320px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0),
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .closing-title {
          margin: 0;
          line-height: 1.2;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .closing-copy {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
          max-width: 72ch;
        }

        .closing-divider {
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

        .closing-meta {
          margin-top: 10px;
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .closing-statement-text1,
        .closing-statement-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .closing-inner {
            padding: 22px 16px 16px;
          }

          .closing-line {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

ClosingStatement.defaultProps = {
  rootClassName: '',
  feature1Title: undefined,
  feature1Description: undefined,
}

ClosingStatement.propTypes = {
  rootClassName: PropTypes.string,
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default ClosingStatement