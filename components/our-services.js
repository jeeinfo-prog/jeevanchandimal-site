import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const OurServices = (props) => {
  return (
    <>
      <section
        className={`osWrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="osMax thq-section-max-width">
          {/* ===== header (luxury cinematic like WID) ===== */}
          <header className="osHead">
            <div className="osKickerRow">
              <span className="osKicker">SERVICES</span>
              <span className="osLine" />
            </div>

            <h2 className="osTitle thq-heading-2">
              {props.sectionTitle ?? (
                <Fragment>
                  <span className="t">Our Services</span>
                </Fragment>
              )}
            </h2>

            <p className="osIntro thq-body-large">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="t">
                    Four disciplines — built with atmosphere, precision, and
                    cinematic restraint.
                  </span>
                </Fragment>
              )}
            </p>

            <div className="osDivider" aria-hidden="true" />
          </header>

          {/* ===== grid ===== */}
          <div className="osGrid">
            {/* 1 */}
            <article className="osCard">
              <div className="osMedia" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="osImg"
                  src={props.feature1ImageSrc}
                  alt={props.feature1ImageAlt}
                  loading="lazy"
                />
                <div className="osVignette" />
                <div className="osGlow" />
                <div className="osGrain" />
              </div>

              <div className="osInner">
                <div className="osTop">
                  <span className="osChip">01</span>
                  <span className="osChipLabel">FILM</span>
                </div>

                <h3 className="osH3 thq-heading-3">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span className="t">Film Production</span>
                    </Fragment>
                  )}
                </h3>

                <p className="osP thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span className="t">
                        Stories shaped through image, motion, &amp; sound — with
                        clarity and mood.
                      </span>
                    </Fragment>
                  )}
                </p>

                <div className="osAction">
                  <button className="osBtn" type="button">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="t">View Work</span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="osIcon" aria-hidden="true">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* 2 */}
            <article className="osCard">
              <div className="osMedia" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="osImg"
                  src={props.feature2ImageSrc}
                  alt={props.feature2ImageAlt}
                  loading="lazy"
                />
                <div className="osVignette" />
                <div className="osGlow" />
                <div className="osGrain" />
              </div>

              <div className="osInner">
                <div className="osTop">
                  <span className="osChip">02</span>
                  <span className="osChipLabel">AUDIO</span>
                </div>

                <h3 className="osH3 thq-heading-3">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span className="t">Audio Production</span>
                    </Fragment>
                  )}
                </h3>

                <p className="osP thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span className="t">
                        Sound designed to complete the story — texture, space,
                        emotion.
                      </span>
                    </Fragment>
                  )}
                </p>

                <div className="osAction">
                  <button className="osBtn" type="button">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="t">Explore</span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="osIcon" aria-hidden="true">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* 3 */}
            <article className="osCard">
              <div className="osMedia" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="osImg"
                  src={props.feature3ImageSrc}
                  alt={props.feature3ImageAlt}
                  loading="lazy"
                />
                <div className="osVignette" />
                <div className="osGlow" />
                <div className="osGrain" />
              </div>

              <div className="osInner">
                <div className="osTop">
                  <span className="osChip">03</span>
                  <span className="osChipLabel">MOTION</span>
                </div>

                <h3 className="osH3 thq-heading-3">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span className="t">Animation &amp; Motion</span>
                    </Fragment>
                  )}
                </h3>

                <p className="osP thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span className="t">
                        Motion that supports narrative and mood — refined,
                        deliberate, clean.
                      </span>
                    </Fragment>
                  )}
                </p>

                <div className="osAction">
                  <button className="osBtn" type="button">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="t">Start a Project</span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="osIcon" aria-hidden="true">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* 4 */}
            <article className="osCard">
              <div className="osMedia" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="osImg"
                  src={props.feature4ImageSrc}
                  alt={props.feature4ImageAlt}
                  loading="lazy"
                />
                <div className="osVignette" />
                <div className="osGlow" />
                <div className="osGrain" />
              </div>

              <div className="osInner">
                <div className="osTop">
                  <span className="osChip">04</span>
                  <span className="osChipLabel">PHOTO</span>
                </div>

                <h3 className="osH3 thq-heading-3">
                  {props.feature4Title ?? (
                    <Fragment>
                      <span className="t">Photography</span>
                    </Fragment>
                  )}
                </h3>

                <p className="osP thq-body-small">
                  {props.feature4Description ?? (
                    <Fragment>
                      <span className="t">
                        Still imagery guided by light, atmosphere, and emotion —
                        crafted with restraint.
                      </span>
                    </Fragment>
                  )}
                </p>

                <div className="osAction">
                  <button className="osBtn" type="button">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="t">See Portfolio</span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="osIcon" aria-hidden="true">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <style jsx>{`
        .osWrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .osMax {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ===== header ===== */
        .osHead {
          width: 100%;
          max-width: 920px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .osKickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .osKicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.78);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
          white-space: nowrap;
        }

        .osLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .osTitle {
          margin: 0;
          line-height: 1.1;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .osIntro {
          margin: 0;
          color: rgba(245, 244, 244, 0.84);
          line-height: 1.7;
          max-width: 72ch;
        }

        .osDivider {
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

        /* ===== grid ===== */
        .osGrid {
          width: 100%;
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(12, 1fr);
        }

        .osCard {
          grid-column: span 3;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          min-height: 420px;
          transform: translateZ(0);
        }

        /* ===== image layer ===== */
        .osMedia {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .osImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
          filter: brightness(0.78) contrast(1.08) saturate(1.02);
        }

        .osVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              70% 60% at 35% 20%,
              rgba(0, 0, 0, 0.08),
              rgba(0, 0, 0, 0.82)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.25) 0%,
              rgba(0, 0, 0, 0.62) 55%,
              rgba(0, 0, 0, 0.86) 100%
            );
        }

        .osGlow {
          position: absolute;
          inset: -18%;
          background: radial-gradient(
            40% 32% at 22% 28%,
            rgba(120, 166, 255, 0.12),
            rgba(120, 166, 255, 0) 62%
          );
          filter: blur(14px);
          opacity: 0.9;
        }

        .osGrain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        /* ===== content ===== */
        .osInner {
          position: relative;
          z-index: 2;
          height: 100%;
          padding: 18px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: flex-end;
        }

        .osTop {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2px;
        }

        .osChip {
          font-size: 12px;
          letter-spacing: 0.28em;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          color: rgba(245, 244, 244, 0.92);
        }

        .osChipLabel {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.7);
        }

        .osH3 {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .osP {
          margin: 0;
          color: rgba(245, 244, 244, 0.84);
          line-height: 1.7;
          max-width: 44ch;
        }

        .osAction {
          margin-top: 4px;
          display: flex;
          justify-content: flex-start;
        }

        .osBtn {
          height: 36px;
          padding: 0 14px 0 16px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(0, 0, 0, 0.22);
          color: rgba(245, 244, 244, 0.92);
          cursor: pointer;
          text-decoration: none;
          transition: transform 180ms ease, border-color 180ms ease,
            background 180ms ease;
        }

        .osBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.45);
          background: rgba(120, 166, 255, 0.08);
        }

        .osIcon {
          width: 18px;
          height: 18px;
          fill: currentColor;
          opacity: 0.9;
        }

        .t {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .osCard {
            grid-column: span 6;
            min-height: 380px;
          }
        }

        @media (max-width: 767px) {
          .osKickerRow {
            justify-content: center;
          }
          .osLine {
            display: none;
          }
          .osHead {
            text-align: center;
            align-items: center;
          }
          .osCard {
            grid-column: span 12;
            min-height: 340px;
          }
          .osInner {
            text-align: left;
          }
        }
      `}</style>
    </>
  )
}

OurServices.defaultProps = {
  rootClassName: '',
  sectionTitle: undefined,
  sectionDescription: undefined,

  feature1ImageSrc: '/services/oser-01.jpg',
  feature1ImageAlt: 'Film Production Image',
  feature1Title: undefined,
  feature1Description: undefined,
  feature1Button: undefined,

  feature2ImageSrc: '/services/oser-02.jpg',
  feature2ImageAlt: 'Audio Production Image',
  feature2Title: undefined,
  feature2Description: undefined,
  feature2Button: undefined,

  feature3ImageSrc: '/services/oser-03.jpg',
  feature3ImageAlt: 'Animation & Motion Image',
  feature3Title: undefined,
  feature3Description: undefined,
  feature3Button: undefined,

  feature4ImageSrc: '/services/oser-04.jpg',
  feature4ImageAlt: 'Photography Image',
  feature4Title: undefined,
  feature4Description: undefined,
  feature4Button: undefined,
}

OurServices.propTypes = {
  rootClassName: PropTypes.string,

  sectionTitle: PropTypes.element,
  sectionDescription: PropTypes.element,

  feature1ImageSrc: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature1Button: PropTypes.element,

  feature2ImageSrc: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature2Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature2Button: PropTypes.element,

  feature3ImageSrc: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  feature3Title: PropTypes.element,
  feature3Description: PropTypes.element,
  feature3Button: PropTypes.element,

  feature4ImageSrc: PropTypes.string,
  feature4ImageAlt: PropTypes.string,
  feature4Title: PropTypes.element,
  feature4Description: PropTypes.element,
  feature4Button: PropTypes.element,
}

export default OurServices