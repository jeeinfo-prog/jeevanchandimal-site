import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const ServicesAnimationFinalCTA = (props) => {
  return (
    <>
      <section
        className={`safcta-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="safcta-max thq-section-max-width">
          <div className="safcta-card">
            <div className="safcta-bg" aria-hidden="true">
              <div className="safcta-vignette" />
              <div className="safcta-grain" />
            </div>

            <div className="safcta-inner">
              <div className="safcta-kickerRow">
                <span className="safcta-kicker">FINAL CTA</span>
                <span className="safcta-line" />
              </div>

              <h2 className="thq-heading-2 safcta-title">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="services-animation-final-cta-text1">
                      Have a story that needs movement?
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large safcta-copy">
                {props.content1 ?? (
                  <Fragment>
                    <span className="services-animation-final-cta-text2">
                      Let’s bring it to life with clarity, rhythm, and visual intent.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="safcta-actions">
                <Link href={props.primaryHref} legacyBehavior>
                  <a className="btnPrimary">
                    <span className="btnText">
                      {props.action2 ?? (
                        <Fragment>
                          <span className="services-animation-final-cta-text3">
                            Create Together
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <span className="arrow">→</span>
                  </a>
                </Link>

                {props.secondaryHref && (
                  <Link href={props.secondaryHref} legacyBehavior>
                    <a className="btnGhost">
                      <span className="btnText">View Motion Work</span>
                      <span className="arrow">→</span>
                    </a>
                  </Link>
                )}
              </div>

              <div className="safcta-divider" />
              <div className="safcta-meta thq-body-small">
                Motion • Rhythm • Clarity • Intent
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .safcta-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .safcta-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .safcta-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .safcta-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .safcta-vignette {
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

        .safcta-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .safcta-inner {
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

        .safcta-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .safcta-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .safcta-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .safcta-title {
          margin: 0;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .safcta-copy {
          margin: 0;
          line-height: 1.8;
          color: rgba(245, 244, 244, 0.85);
          max-width: 70ch;
        }

        .safcta-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 6px;
        }

        .btnPrimary,
        .btnGhost {
          height: 36px;
          padding: 0 16px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
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
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
        }

        .btnGhost {
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(245, 244, 244, 0.92);
        }

        .btnGhost:hover {
          transform: translateY(-1px);
        }

        .arrow {
          color: #25c3e2;
        }

        .safcta-divider {
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

        .safcta-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        @media (max-width: 767px) {
          .safcta-inner {
            padding: 22px 16px 18px;
          }

          .safcta-line {
            display: none;
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

ServicesAnimationFinalCTA.defaultProps = {
  rootClassName: '',
  heading1: undefined,
  content1: undefined,
  action2: undefined,
  primaryHref: '/contact',
  secondaryHref: '/work-animation',
}

ServicesAnimationFinalCTA.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  action2: PropTypes.element,
  primaryHref: PropTypes.string,
  secondaryHref: PropTypes.string,
}

export default ServicesAnimationFinalCTA