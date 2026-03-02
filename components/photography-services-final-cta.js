import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PhotographyServicesFinalCTA = (props) => {
  return (
    <>
      <section
        className={`psCta-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="psCta-max thq-section-max-width">
          <div className="psCta-card">
            {/* background overlays */}
            <div className="psCta-bg" aria-hidden="true">
              <div className="psCta-vignette" />
              <div className="psCta-grain" />
              <div className="psCta-glow" />
            </div>

            <div className="psCta-inner">
              <div className="psCta-kickerRow">
                <span className="psCta-kicker">LET’S CREATE</span>
                <span className="psCta-line" />
              </div>

              <h2 className="thq-heading-2 psCta-title">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="photography-services-final-cta-text2">
                      Looking for imagery with depth and intention?
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large psCta-copy">
                {props.content1 ?? (
                  <Fragment>
                    <span className="photography-services-final-cta-text3">
                      Let’s create something with clarity, atmosphere, and purpose.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="psCta-divider" aria-hidden="true" />

              <div className="psCta-actions">
                <button
                  type="button"
                  className="psCtaBtn"
                  aria-label="Create Together"
                >
                  <span className="psCtaBtnText">
                    {props.action2 ?? (
                      <Fragment>
                        <span className="photography-services-final-cta-text1">
                          Create Together
                        </span>
                      </Fragment>
                    )}
                  </span>
                  <span className="psCtaArrow">→</span>
                </button>
              </div>

              <div className="psCta-meta thq-body-small">
                Direction • Tone • Craft
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .psCta-wrap {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .psCta-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .psCta-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 30px 110px rgba(0, 0, 0, 0.62);
          backdrop-filter: blur(10px);
        }

        .psCta-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* slightly different: spotlight center + softer edges */
        .psCta-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              70% 55% at 50% 28%,
              rgba(255, 255, 255, 0.06),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.35) 0%,
              rgba(0, 0, 0, 0.72) 70%,
              rgba(0, 0, 0, 0.88) 100%
            );
        }

        .psCta-glow {
          position: absolute;
          inset: -22%;
          background: radial-gradient(
            42% 34% at 50% 30%,
            rgba(37, 195, 226, 0.18),
            rgba(37, 195, 226, 0) 62%
          );
          filter: blur(16px);
          opacity: 0.95;
        }

        .psCta-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .psCta-inner {
          position: relative;
          z-index: 1;
          padding: 34px 26px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center; /* ✅ CTA centered (different from others) */
          text-align: center;
          max-width: 920px;
          margin: 0 auto;
        }

        .psCta-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
        }

        .psCta-kicker {
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

        .psCta-line {
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

        .psCta-title {
          margin: 0;
          line-height: 1.2;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .psCta-copy {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
          max-width: 72ch;
        }

        .psCta-divider {
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

        .psCta-actions {
          margin-top: 2px;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        /* ✅ different: single primary CTA */
        .psCtaBtn {
          height: 40px;
          padding: 0 18px 0 20px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(37, 195, 226, 0.55);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.28),
            rgba(37, 195, 226, 0.1)
          );
          color: #f5f4f4;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 900;
          cursor: pointer;
          transition: all 180ms ease;
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.42);
          white-space: nowrap;
        }

        .psCtaBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.8);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.34),
            rgba(37, 195, 226, 0.12)
          );
        }

        .psCtaArrow {
          color: #25c3e2;
          transform: translateY(-1px);
        }

        .psCta-meta {
          margin-top: 10px;
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        /* Keep your original spans */
        .photography-services-final-cta-text1,
        .photography-services-final-cta-text2,
        .photography-services-final-cta-text3 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .psCta-inner {
            padding: 22px 16px 16px;
          }
          .psCta-line {
            display: none;
          }
          .psCtaBtn {
            width: 100%;
            justify-content: center;
            max-width: 520px;
          }
        }
      `}</style>
    </>
  )
}

PhotographyServicesFinalCTA.defaultProps = {
  action2: undefined,
  heading1: undefined,
  rootClassName: '',
  content1: undefined,
}

PhotographyServicesFinalCTA.propTypes = {
  action2: PropTypes.element,
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
  content1: PropTypes.element,
}

export default PhotographyServicesFinalCTA