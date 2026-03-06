import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const Availability = (props) => {
  return (
    <>
      <section className={`availability-wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="availability-max thq-section-max-width">
          <div className="availability-card">
            <div className="availability-bg" aria-hidden="true">
              <div className="availability-vignette" />
              <div className="availability-grain" />
            </div>

            <div className="availability-inner">
              <div className="availability-kickerRow">
                <span className="availability-kicker">AVAILABILITY</span>
                <span className="availability-line" />
              </div>

              <div className="badgeRow">
                <span className={`availabilityBadge ${props.statusTone || 'toneCyan'}`}>
                  <span className="dot" aria-hidden="true" />
                  {props.statusText ?? (
                    <Fragment>
                      <span className="availability-text20">Available for select projects</span>
                    </Fragment>
                  )}
                </span>
              </div>

              <h2 className="thq-heading-2 availability-title">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="availability-text17">Availability</span>
                  </Fragment>
                )}
              </h2>

              <h3 className="thq-heading-3 availability-subtitle">
                {props.heading11 ?? (
                  <Fragment>
                    <span className="availability-text15">Available for select projects.</span>
                  </Fragment>
                )}
              </h3>

              <p className="thq-body-large availability-copy">
                {props.content1 ?? (
                  <Fragment>
                    <span className="availability-text19">
                      If you’d like to collaborate or discuss an idea, feel free to reach out.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="availability-divider" aria-hidden="true" />

              <div className="availability-bottom">
                <div className="availability-meta thq-body-small">
                  Film • Motion • Photography • Audio
                </div>

                <div className="availability-actions">
                  <Link href="/contact" passHref legacyBehavior>
                    <a className="availability-cta">
                      <span className="ctaLabel">
                        {props.action2 ?? (
                          <Fragment>
                            <span className="availability-text18">Contact Me</span>
                          </Fragment>
                        )}
                      </span>
                      <span className="ctaArrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .availability-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .availability-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .availability-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .availability-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .availability-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
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

        .availability-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .availability-inner {
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

        .availability-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .availability-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .availability-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .badgeRow {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .availabilityBadge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(245, 244, 244, 0.92);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(245, 244, 244, 0.6);
          box-shadow: 0 0 0 4px rgba(245, 244, 244, 0.08);
        }

        .toneCyan {
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.18), rgba(37, 195, 226, 0.06));
          border-color: rgba(37, 195, 226, 0.22);
          color: #25c3e2;
        }

        .toneCyan .dot {
          background: #25c3e2;
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.12);
        }

        .toneAmber {
          background: linear-gradient(180deg, rgba(255, 193, 7, 0.16), rgba(255, 193, 7, 0.06));
          border-color: rgba(255, 193, 7, 0.22);
          color: rgba(255, 193, 7, 0.95);
        }

        .toneAmber .dot {
          background: rgba(255, 193, 7, 0.95);
          box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.12);
        }

        .toneRed {
          background: linear-gradient(180deg, rgba(255, 76, 76, 0.16), rgba(255, 76, 76, 0.06));
          border-color: rgba(255, 76, 76, 0.22);
          color: rgba(255, 120, 120, 0.95);
        }

        .toneRed .dot {
          background: rgba(255, 120, 120, 0.95);
          box-shadow: 0 0 0 4px rgba(255, 120, 120, 0.12);
        }

        .availability-title {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .availability-subtitle {
          margin: 0;
          line-height: 1.3;
          color: rgba(245, 244, 244, 0.94);
        }

        .availability-copy {
          margin: 0;
          line-height: 1.8;
          color: rgba(245, 244, 244, 0.85);
          max-width: 70ch;
        }

        .availability-divider {
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

        .availability-bottom {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 6px;
        }

        .availability-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
          text-align: left;
        }

        .availability-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .availability-cta {
          color: #25c3e2 !important;
          text-decoration: none !important;
          padding: 14px 18px;
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.22), rgba(37, 195, 226, 0.1));
          border: 1px solid rgba(37, 195, 226, 0.22);
          opacity: 1;
          font-weight: 700;
          box-shadow: 0 8px 18px rgba(37, 195, 226, 0.08);
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease,
            opacity 180ms ease;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 13px;
          will-change: transform;
        }

        .availability-cta:hover {
          transform: translateY(-1px);
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.28), rgba(37, 195, 226, 0.12));
          box-shadow: 0 14px 26px rgba(37, 195, 226, 0.12);
        }

        .availability-cta:active {
          transform: translateY(0px);
        }

        .availability-cta:focus-visible {
          outline: 2px solid rgba(37, 195, 226, 0.6);
          outline-offset: 2px;
        }

        .ctaArrow {
          font-size: 18px;
          line-height: 1;
        }

        .availability-text15,
        .availability-text17,
        .availability-text18,
        .availability-text19,
        .availability-text20 {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .availability-bottom {
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .availability-meta {
            text-align: center;
          }

          .availability-actions {
            justify-content: center;
          }
        }

        @media (max-width: 767px) {
          .availability-inner {
            padding: 22px 16px 18px;
          }

          .availability-line {
            display: none;
          }

          .availability-copy {
            max-width: 62ch;
          }

          .availability-cta {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}

Availability.defaultProps = {
  heading11: undefined,
  action2: undefined,
  heading1: undefined,
  content1: undefined,
  statusText: undefined,
  statusTone: 'toneCyan',
  rootClassName: '',
}

Availability.propTypes = {
  heading11: PropTypes.element,
  action2: PropTypes.element,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  statusText: PropTypes.element,
  statusTone: PropTypes.oneOf(['toneCyan', 'toneAmber', 'toneRed']),
  rootClassName: PropTypes.string,
}

export default Availability