import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkFilmEndNote = (props) => {
  return (
    <>
      <section
        className={`wfEnd-wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="wfEnd-max thq-section-max-width">
          <div className="wfEnd-card">
            <div className="wfEnd-bg" aria-hidden="true">
              <div className="wfEnd-vignette" />
              <div className="wfEnd-grain" />
            </div>

            <div className="wfEnd-inner">
              <div className="wfEnd-kickerRow">
                <span className="wfEnd-kicker">END NOTE</span>
                <span className="wfEnd-line" />
              </div>

              <h3 className="thq-heading-3 wfEnd-title">
                {props.heading2 ?? (
                  <Fragment>
                    <span className="work-film-end-note-text2">
                      Film Production
                    </span>
                  </Fragment>
                )}
              </h3>

              <p className="thq-body-small wfEnd-copy">
                {props.content2 ?? (
                  <Fragment>
                    <span className="work-film-end-note-text1">
                      Each project opens into a dedicated case study, presenting
                      the film as a complete visual work.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="wfEnd-divider" aria-hidden="true" />

              <div className="wfEnd-meta thq-body-small">
                Story • Craft • Atmosphere
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .wfEnd-wrap {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .wfEnd-max {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .wfEnd-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .wfEnd-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .wfEnd-vignette {
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

        .wfEnd-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .wfEnd-inner {
          position: relative;
          z-index: 1;
          padding: 28px 26px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
          max-width: 920px;
        }

        .wfEnd-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .wfEnd-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .wfEnd-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .wfEnd-title {
          margin: 0;
          line-height: 1.2;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .wfEnd-copy {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.82);
          max-width: 70ch;
        }

        .wfEnd-divider {
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

        .wfEnd-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        /* Keep your original spans */
        .work-film-end-note-text1,
        .work-film-end-note-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .wfEnd-inner {
            padding: 20px 16px 16px;
            align-items: center;
            text-align: center;
          }
          .wfEnd-kickerRow {
            justify-content: center;
          }
          .wfEnd-line {
            display: none;
          }
          .wfEnd-copy {
            max-width: 62ch;
          }
        }
      `}</style>
    </>
  )
}

WorkFilmEndNote.defaultProps = {
  content2: undefined,
  rootClassName: '',
  heading2: undefined,
}

WorkFilmEndNote.propTypes = {
  content2: PropTypes.element,
  rootClassName: PropTypes.string,
  heading2: PropTypes.element,
}

export default WorkFilmEndNote