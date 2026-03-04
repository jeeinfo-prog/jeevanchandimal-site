import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const HowIApproachFilm = (props) => {
  return (
    <>
      <section className={`haf-wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="haf-max thq-section-max-width">
          <div className="haf-card">
            <div className="haf-bg" aria-hidden="true">
              <div className="haf-vignette" />
              <div className="haf-grain" />
            </div>

            <div className="haf-inner">
              <div className="haf-kickerRow">
                <span className="haf-kicker">APPROACH</span>
                <span className="haf-line" />
              </div>

              <h2 className="thq-heading-2 haf-title">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="how-i-approach-film-text1">
                      How I Approach Film
                    </span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large haf-copy">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="how-i-approach-film-text2">
                      Story comes first. Before cameras, equipment, or timelines,
                      the focus is always on meaning, mood, and visual language.
                      <br />
                      <br />
                      I treat film as a layered experience — where composition,
                      movement, sound, and silence work together. Every choice
                      is made to serve the story, not the spectacle.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="haf-divider" aria-hidden="true" />
              <div className="haf-meta thq-body-small">
                Story • Composition • Rhythm • Silence
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .haf-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .haf-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .haf-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .haf-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .haf-vignette {
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

        .haf-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .haf-inner {
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

        .haf-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .haf-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .haf-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .haf-title {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .haf-copy {
          margin: 0;
          line-height: 1.8;
          color: rgba(245, 244, 244, 0.85);
          max-width: 70ch;
        }

        .haf-divider {
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

        .haf-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .how-i-approach-film-text1,
        .how-i-approach-film-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .haf-inner {
            padding: 22px 16px 18px;
          }

          .haf-line {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

HowIApproachFilm.defaultProps = {
  feature1Title: undefined,
  feature1Description: undefined,
  rootClassName: '',
}

HowIApproachFilm.propTypes = {
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default HowIApproachFilm