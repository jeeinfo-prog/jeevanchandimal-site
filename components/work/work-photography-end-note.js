import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkPhotographyEndNote = (props) => {
  return (
    <>
      <section
        className={`wpEndNote thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="wpMax thq-section-max-width">
          <div className="wpCard">
            {/* soft background texture */}
            <div className="wpGlow" aria-hidden="true" />
            <div className="wpGrain" aria-hidden="true" />

            <div className="wpInner">
              <div className="wpKicker">Closing note</div>

              <h3 className="wpTitle thq-heading-3">
                {props.heading2 ?? (
                  <Fragment>
                    <span className="work-photography-end-note-text1">
                      Photography
                    </span>
                  </Fragment>
                )}
              </h3>

              <p className="wpBody thq-body-small">
                {props.content2 ?? (
                  <Fragment>
                    <span className="work-photography-end-note-text2">
                      Every image is created with intention — whether as art,
                      narrative support, or licensed visual material.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="wpRule" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .wpEndNote {
          width: 100%;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .wpMax {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* ====== CINEMATIC CARD ====== */
        .wpCard {
          width: 100%;
          max-width: 980px;
          position: relative;
          overflow: hidden;

          border-radius: 22px;
          background: rgba(14, 14, 14, 0.62);
          border: 1px solid rgba(245, 244, 244, 0.09);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);

          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .wpGlow {
          position: absolute;
          inset: -40%;
          background: radial-gradient(
              50% 45% at 30% 20%,
              rgba(77, 155, 255, 0.22),
              rgba(0, 0, 0, 0) 55%
            ),
            radial-gradient(
              45% 40% at 80% 70%,
              rgba(255, 255, 255, 0.06),
              rgba(0, 0, 0, 0) 60%
            );
          pointer-events: none;
        }

        .wpGrain {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
          pointer-events: none;
        }

        .wpInner {
          position: relative;
          padding: 34px 28px 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .wpKicker {
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 12px;
          color: rgba(245, 244, 244, 0.66);
        }

        .wpTitle {
          margin: 0;
          color: rgba(245, 244, 244, 0.96);
        }

        .wpBody {
          margin: 0;
          max-width: 70ch;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.78);
        }

        .wpRule {
          margin-top: 12px;
          height: 1px;
          width: 100%;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0),
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        /* keep your original span classes working */
        .work-photography-end-note-text1,
        .work-photography-end-note-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .wpInner {
            padding: 28px 18px 22px;
          }
          .wpCard {
            border-radius: 18px;
          }
        }
      `}</style>
    </>
  )
}

WorkPhotographyEndNote.defaultProps = {
  heading2: undefined,
  content2: undefined,
  rootClassName: '',
}

WorkPhotographyEndNote.propTypes = {
  heading2: PropTypes.element,
  content2: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default WorkPhotographyEndNote