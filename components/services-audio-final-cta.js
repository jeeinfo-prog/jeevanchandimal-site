import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const ServicesAudioFinalCTA = (props) => {
  return (
    <>
      <section className={`safctaA-wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="safctaA-max thq-section-max-width">
          <div className="safctaA-card">
            <div className="safctaA-bg" aria-hidden="true">
              <div className="safctaA-vignette" />
              <div className="safctaA-grain" />
            </div>

            <div className="safctaA-inner">
              <div className="safctaA-kickerRow">
                <span className="safctaA-kicker">FINAL CTA</span>
                <span className="safctaA-line" />
              </div>

              <h2 className="thq-heading-2 safctaA-title">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="services-audio-final-cta-text1">
                      Have a story that needs sound?
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large safctaA-copy">
                {props.content1 ?? (
                  <Fragment>
                    <span className="services-audio-final-cta-text2">
                      Let’s shape it with depth, texture, and emotional clarity.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="safctaA-actions">
                <Link href={props.primaryHref} legacyBehavior>
                  <a className="btnPrimary" aria-label="Create Together">
                    <span className="btnText">
                      {props.action2 ?? (
                        <Fragment>
                          <span className="services-audio-final-cta-text3">
                            Create Together
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <span className="arrow">→</span>
                  </a>
                </Link>

                {props.secondaryHref ? (
                  <Link href={props.secondaryHref} legacyBehavior>
                    <a className="btnGhost" aria-label="View Audio Work">
                      <span className="btnText">
                        {props.secondaryLabel ?? (
                          <Fragment>
                            <span className="t">View Audio Work</span>
                          </Fragment>
                        )}
                      </span>
                      <span className="arrow">→</span>
                    </a>
                  </Link>
                ) : null}
              </div>

              <div className="safctaA-divider" aria-hidden="true" />
              <div className="safctaA-meta thq-body-small">Depth • Texture • Emotion • Clarity</div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .safctaA-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .safctaA-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .safctaA-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .safctaA-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .safctaA-vignette {
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

        .safctaA-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .safctaA-inner {
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

        .safctaA-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .safctaA-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .safctaA-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .safctaA-title {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .safctaA-copy {
          margin: 0;
          line-height: 1.8;
          color: rgba(245, 244, 244, 0.85);
          max-width: 70ch;
        }

        .safctaA-actions {
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

        .btnText .services-audio-final-cta-text3,
        .services-audio-final-cta-text1,
        .services-audio-final-cta-text2,
        .t {
          display: inline-block;
        }

        .safctaA-divider {
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

        .safctaA-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        @media (max-width: 767px) {
          .safctaA-inner {
            padding: 22px 16px 18px;
          }

          .safctaA-line {
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

ServicesAudioFinalCTA.defaultProps = {
  heading1: undefined,
  content1: undefined,
  rootClassName: '',
  action2: undefined,

  primaryHref: '/contact',
  secondaryHref: '/work-audio',
  secondaryLabel: undefined,
}

ServicesAudioFinalCTA.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,
  action2: PropTypes.element,

  primaryHref: PropTypes.string,
  secondaryHref: PropTypes.string,
  secondaryLabel: PropTypes.element,
}

export default ServicesAudioFinalCTA