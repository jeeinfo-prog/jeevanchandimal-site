import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const SoundDesign = (props) => {
  const t = useTranslations()

  return (
    <>
      <section className={`sdWrap ${props.rootClassName || ''}`}>
        <div className="sdMax thq-section-padding">
          <div className="sdCard thq-section-max-width">
            {/* ===== video background ===== */}
            <div className="sdMedia" aria-hidden="true">
              <video
                src={props.videoSrc1}
                loop
                muted
                autoPlay
                playsInline
                preload="auto"
                className="sdVideo"
              />
              <div className="sdVignette" />
              <div className="sdGrain" />
              <div className="sdGlow" />
            </div>

            {/* ===== content ===== */}
            <div className="sdInner">
              {/* kicker row like your EndNote */}
              <div className="sdKickerRow">
                <span className="sdKicker">AUDIO</span>
                <span className="sdLine" />
              </div>

              <h1 className="thq-heading-1 sdTitle">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="sound-design-text3">Sound design</span>
                  </Fragment>
                )}
              </h1>

              <p className="thq-body-large sdCopy">
                {props.content1 ?? (
                  <Fragment>
                    <span className="sound-design-text4">
                      Expert soundtrack composition, sound design and audio
                      post-production for film, TV, and digital media. We bring
                      your vision to life with professional and creative audio
                      solutions.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="sdDivider" aria-hidden="true" />

              <div className="sdActions">
                <Link href="/services-audio" legacyBehavior>
                  <a className="sdBtnPrimary" aria-label="Explore Services">
                    <span className="sdBtnText">
                      {props.action1 ?? (
                        <Fragment>
                          <span className="sound-design-text1">
                            Explore Services
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <span className="sdArrow">→</span>
                  </a>
                </Link>

                <Link href="/work-audio" legacyBehavior>
                  <a className="sdBtnGhost" aria-label="Learn More">
                    <span className="sdBtnText">
                      {props.action2 ?? (
                        <Fragment>
                          <span className="sound-design-text2">Learn More</span>
                        </Fragment>
                      )}
                    </span>
                    <span className="sdArrow">→</span>
                  </a>
                </Link>
              </div>

              <div className="sdMeta thq-body-small">
                Rhythm • Texture • Restraint
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .sdWrap {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .sdMax {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .sdCard {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
          min-height: 560px;
        }

        /* ===== media layer ===== */
        .sdMedia {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .sdVideo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(1) contrast(1.05) saturate(1.05);
          transform: scale(1.02);
        }

        .sdVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 70% at 50% 15%,
              rgba(255, 255, 255, 0.05),
              rgba(0, 0, 0, 0.8)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.35) 55%,
              rgba(0, 0, 0, 0.82) 100%
            );
          z-index: 1;
        }

        .sdGlow {
          position: absolute;
          inset: -18%;
          z-index: 2;
          background: radial-gradient(
            38% 28% at 18% 44%,
            rgba(37, 195, 226, 0.16),
            rgba(37, 195, 226, 0) 62%
          );
          filter: blur(10px);
        }

        .sdGrain {
          position: absolute;
          inset: 0;
          z-index: 3;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        /* ===== inner content ===== */
        .sdInner {
          position: relative;
          z-index: 4;
          padding: 34px 28px 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          max-width: 920px;
        }

        .sdKickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sdKicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .sdLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .sdTitle {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .sdCopy {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
          max-width: 70ch;
        }

        .sdDivider {
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

        .sdActions {
          margin-top: 4px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        /* ===== buttons (luxury small like your hero) ===== */
        .sdBtnPrimary,
        .sdBtnGhost {
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

        .sdBtnPrimary {
          border: 1px solid rgba(37, 195, 226, 0.45);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.08)
          );
          color: #f5f4f4;
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.35);
        }

        .sdBtnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.7);
        }

        .sdBtnGhost {
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(245, 244, 244, 0.92);
        }

        .sdBtnGhost:hover {
          border-color: rgba(37, 195, 226, 0.45);
          background: rgba(37, 195, 226, 0.08);
          transform: translateY(-1px);
        }

        .sdArrow {
          color: #25c3e2;
          transform: translateY(-1px);
        }

        .sdMeta {
          margin-top: 10px;
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        /* Keep your original spans */
        .sound-design-text1,
        .sound-design-text2,
        .sound-design-text3,
        .sound-design-text4 {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .sdCard {
            min-height: 520px;
          }
        }

        @media (max-width: 767px) {
          .sdInner {
            padding: 22px 16px 16px;
            align-items: center;
            text-align: center;
          }
          .sdKickerRow {
            justify-content: center;
          }
          .sdLine {
            display: none;
          }
          .sdActions {
            width: 100%;
            justify-content: center;
          }
          .sdBtnPrimary,
          .sdBtnGhost {
            width: 100%;
            justify-content: center;
            max-width: 520px;
          }
          .sdCard {
            min-height: 380px;
          }
        }

        @media (max-width: 479px) {
          .sdCard {
            min-height: 320px;
          }
        }
      `}</style>
    </>
  )
}

SoundDesign.defaultProps = {
  rootClassName: '',
  action1: undefined,
  action2: undefined,
  heading1: undefined,
  content1: undefined,
  videoSrc1: '/Audio/audio%20production%2003.mov',
}

SoundDesign.propTypes = {
  rootClassName: PropTypes.string,
  action1: PropTypes.element,
  action2: PropTypes.element,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  videoSrc1: PropTypes.string,
}

export default SoundDesign