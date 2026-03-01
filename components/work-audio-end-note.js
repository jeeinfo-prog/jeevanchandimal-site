import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkAudioEndNote = (props) => {
  return (
    <>
      <section className="waenWrap thq-section-padding">
        <div className="waenMax thq-section-max-width">
          <div className="waenCard">
            <div className="waenGlow" aria-hidden="true" />

            <div className="waenHeader">
              <div className="waenKicker">End Note</div>

              <h3 className="thq-heading-3 waenTitle">
                {props.heading2 ?? (
                  <Fragment>
                    <span className="work-audio-end-note-text2">
                      Audio Production
                    </span>
                  </Fragment>
                )}
              </h3>
            </div>

            <p className="thq-body-small waenBody">
              {props.content2 ?? (
                <Fragment>
                  <span className="work-audio-end-note-text1">
                    Each piece is presented with embedded audio players and
                    supporting visuals, allowing sound to be experienced in
                    context.
                  </span>
                </Fragment>
              )}
            </p>

            <div className="waenDivider" aria-hidden="true" />

            <div className="waenFooter">
              <span className="waenDot" aria-hidden="true" />
              <span className="waenFooterText">
                Texture • Space • Emotional clarity
              </span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ========= LUX CINEMATIC END NOTE ========= */

        .waenWrap {
          width: 100%;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .waenMax {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .waenCard {
          width: 100%;
          max-width: 980px;

          position: relative;
          overflow: hidden;

          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.10);
          background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.06) 0%,
              rgba(255, 255, 255, 0.03) 60%,
              rgba(0, 0, 0, 0.28) 100%
            ),
            radial-gradient(
              120% 120% at 10% 0%,
              rgba(120, 160, 255, 0.10),
              rgba(0, 0, 0, 0) 55%
            );

          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);

          padding: 26px 28px;
        }

        /* soft cinematic highlight */
        .waenGlow {
          position: absolute;
          inset: -40%;
          background: radial-gradient(
            circle at 30% 20%,
            rgba(140, 170, 255, 0.14),
            rgba(0, 0, 0, 0) 55%
          );
          filter: blur(8px);
          pointer-events: none;
        }

        .waenHeader {
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          z-index: 1;
        }

        .waenKicker {
          display: inline-flex;
          width: fit-content;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.35);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-size: 11px;
          color: rgba(245, 244, 244, 0.82);
        }

        .waenTitle {
          margin: 0;
          line-height: 1.15;
        }

        .waenBody {
          margin: 14px 0 0;
          color: rgba(245, 244, 244, 0.86);
          line-height: 1.75;
          position: relative;
          z-index: 1;
        }

        .waenDivider {
          height: 1px;
          margin-top: 18px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0),
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
          position: relative;
          z-index: 1;
        }

        .waenFooter {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
          position: relative;
          z-index: 1;
        }

        .waenDot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(120, 160, 255, 0.85);
          box-shadow: 0 0 0 3px rgba(120, 160, 255, 0.12);
        }

        .waenFooterText {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.70);
        }

        /* keep your original spans valid */
        .work-audio-end-note-text1,
        .work-audio-end-note-text2 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .waenCard {
            padding: 22px 18px;
            border-radius: 18px;
          }
          .waenFooterText {
            letter-spacing: 0.06em;
          }
        }
      `}</style>
    </>
  )
}

WorkAudioEndNote.defaultProps = {
  content2: undefined,
  heading2: undefined,
}

WorkAudioEndNote.propTypes = {
  content2: PropTypes.element,
  heading2: PropTypes.element,
}

export default WorkAudioEndNote