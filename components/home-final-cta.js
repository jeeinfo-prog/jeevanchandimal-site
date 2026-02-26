import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const HomeFinalCTA = (props) => {
  return (
    <>
      <section className={`ctaWrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="ctaMax thq-section-max-width">
          <div className="ctaCard">
            <div className="ctaGlow" aria-hidden="true" />
            <div className="ctaGrain" aria-hidden="true" />

            <div className="ctaContent">
              <span className="kicker">LET’S WORK</span>

              <h2 className="ctaH thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="home-final-cta-text3">Have a project in mind?</span>
                  </Fragment>
                )}
              </h2>

              <p className="ctaP thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="home-final-cta-text1">
                      Let’s create something with clarity, depth, and cinematic presence.
                      <br />
                      Send the brief — I’ll reply with next steps.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="ctaActions">
                <Link href="/contact" legacyBehavior>
                  <a className="btn" aria-label="Go to Contact">
                    <span className="btnText">
                      {props.action2 ?? (
                        <Fragment>
                          <span className="home-final-cta-text2">Contact</span>
                        </Fragment>
                      )}
                    </span>
                    <span className="btnIcon" aria-hidden="true">
                      →
                    </span>
                  </a>
                </Link>

                <div className="hint">Usually replies within 24–48 hours.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ctaWrap {
          width: 100%;
          position: relative;
          overflow: visible; /* ✅ keep sticky nav safe */
          padding-top: 72px;
          padding-bottom: 72px;
        }

        .ctaMax {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ctaCard {
          width: 100%;
          max-width: 980px;
          border-radius: 22px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(10, 10, 10, 0.55);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.52);
          backdrop-filter: blur(10px);
        }

        .ctaGlow {
          position: absolute;
          inset: -2px;
          background: radial-gradient(
              60% 60% at 20% 20%,
              rgba(37, 195, 226, 0.22),
              rgba(37, 195, 226, 0) 55%
            ),
            radial-gradient(
              55% 55% at 80% 70%,
              rgba(245, 244, 244, 0.12),
              rgba(245, 244, 244, 0) 60%
            ),
            linear-gradient(180deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.55));
          pointer-events: none;
        }

        .ctaGrain {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
          pointer-events: none;
        }

        .ctaContent {
          position: relative;
          z-index: 1;
          padding: 34px 26px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .kicker {
          font-size: 11px;
          letter-spacing: 0.28em;
          font-weight: 900;
          color: rgba(245, 244, 244, 0.72);
        }

        .ctaH {
          margin: 0;
          color: #f5f4f4;
          letter-spacing: -0.02em;
          text-shadow: 0 18px 42px rgba(0, 0, 0, 0.42);
        }

        .ctaP {
          margin: 0;
          max-width: 72ch;
          color: rgba(245, 244, 244, 0.78);
          line-height: 1.7;
        }

        .ctaActions {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .btn {
          height: 42px;
          padding: 0 16px 0 18px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none !important;

          border: 1px solid rgba(37, 195, 226, 0.45);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.08)
          );
          box-shadow: 0 18px 34px rgba(0, 0, 0, 0.38);
          color: #f5f4f4;

          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
        }

        .btn:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.7);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.28),
            rgba(37, 195, 226, 0.12)
          );
        }

        .btnText {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 900;
          color: rgba(245, 244, 244, 0.92);
        }

        .btnIcon {
          color: #25c3e2;
          font-weight: 900;
          transform: translateY(-1px);
        }

        .hint {
          font-size: 12px;
          color: rgba(245, 244, 244, 0.62);
        }

        @media (max-width: 520px) {
          .ctaContent {
            padding: 28px 18px;
          }
          .btn {
            width: 100%;
            justify-content: center;
          }
        }

        .home-final-cta-text1,
        .home-final-cta-text2,
        .home-final-cta-text3 {
          display: inline-block;
        }
      `}</style>
    </>
  )
}

HomeFinalCTA.defaultProps = {
  content1: undefined,
  action2: undefined,
  heading1: undefined,
  rootClassName: '',
}

HomeFinalCTA.propTypes = {
  content1: PropTypes.element,
  action2: PropTypes.element,
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default HomeFinalCTA