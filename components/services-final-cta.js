import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const ServicesFinalCTA = (props) => {
  return (
    <>
      <section className={`scta-wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="scta-max thq-section-max-width">
          <div className="scta-card">
            <div className="scta-bg" aria-hidden="true">
              <div className="scta-vignette" />
              <div className="scta-grain" />
            </div>

            <div className="scta-inner">
              <div className="scta-kickerRow">
                <span className="scta-kicker">FINAL CTA</span>
                <span className="scta-line" />
              </div>

              <h2 className="thq-heading-2 scta-title">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="services-final-cta-text3">Have a project in mind?</span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large scta-copy">
                {props.content1 ?? (
                  <Fragment>
                    <span className="services-final-cta-text2">
                      Let’s build something with atmosphere, clarity, and purpose.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="scta-actions">
                <Link href={props.primaryHref} legacyBehavior>
                  <a className="btnPrimary" aria-label="Create Together">
                    <span className="btnText">
                      {props.action2 ?? (
                        <Fragment>
                          <span className="services-final-cta-text1">Create Together</span>
                        </Fragment>
                      )}
                    </span>
                    <span className="arrow">→</span>
                  </a>
                </Link>

                {props.secondaryHref ? (
                  <Link href={props.secondaryHref} legacyBehavior>
                    <a className="btnGhost" aria-label="View Work">
                      <span className="btnText">
                        {props.secondaryLabel ?? (
                          <Fragment>
                            <span className="t">View Work</span>
                          </Fragment>
                        )}
                      </span>
                      <span className="arrow">→</span>
                    </a>
                  </Link>
                ) : null}
              </div>

              <div className="scta-divider" aria-hidden="true" />
              <div className="scta-meta thq-body-small">Story • Craft • Atmosphere</div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .scta-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .scta-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .scta-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .scta-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .scta-vignette {
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

        .scta-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .scta-inner {
          position: relative;
          z-index: 1;
          padding: 32px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          max-width: 920px;
        }

        .scta-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .scta-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .scta-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .scta-title {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .scta-copy {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.82);
          max-width: 72ch;
        }

        .scta-actions {
          margin-top: 6px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* ===== buttons (same cinematic pills) ===== */
        .btnPrimary,
        .btnGhost {
          height: 36px;
          padding: 0 14px 0 16px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none !important;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 900;
          transition: all 180ms ease;
          white-space: nowrap;
        }

        .btnPrimary {
          border: 1px solid rgba(37, 195, 226, 0.45);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.08)
          );
          color: #f5f4f4;
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.35);
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.7);
        }

        .btnGhost {
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(245, 244, 244, 0.92);
        }

        .btnGhost:hover {
          border-color: rgba(37, 195, 226, 0.45);
          background: rgba(37, 195, 226, 0.08);
          transform: translateY(-1px);
        }

        .arrow {
          color: #25c3e2;
          transform: translateY(-1px);
        }

        .btnText .services-final-cta-text1,
        .services-final-cta-text2,
        .services-final-cta-text3,
        .t {
          display: inline-block;
        }

        .scta-divider {
          width: 100%;
          height: 1px;
          margin-top: 10px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.12),
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0.12)
          );
        }

        .scta-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        @media (max-width: 767px) {
          .scta-inner {
            padding: 22px 16px 18px;
            align-items: center;
            text-align: center;
          }

          .scta-kickerRow {
            justify-content: center;
          }

          .scta-line {
            display: none;
          }

          .scta-actions {
            width: 100%;
            justify-content: center;
          }

          .btnPrimary,
          .btnGhost {
            width: 100%;
            justify-content: center;
            max-width: 520px;
          }
        }
      `}</style>
    </>
  )
}

ServicesFinalCTA.defaultProps = {
  action2: undefined,
  rootClassName: '',
  content1: undefined,
  heading1: undefined,

  // ✅ links
  primaryHref: '/contact',
  secondaryHref: '/work',
  secondaryLabel: undefined,
}

ServicesFinalCTA.propTypes = {
  action2: PropTypes.element,
  rootClassName: PropTypes.string,
  content1: PropTypes.element,
  heading1: PropTypes.element,

  primaryHref: PropTypes.string,
  secondaryHref: PropTypes.string,
  secondaryLabel: PropTypes.element,
}

export default ServicesFinalCTA