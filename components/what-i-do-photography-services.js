// components/what-i-do-photography-services.js
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WhatIDoPhotographyServices = (props) => {
  return (
    <>
      <section
        className={`widWrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="widMax thq-section-max-width">
          {/* ===== header ===== */}
          <header className="widHead">
            <div className="widKickerRow">
              <span className="widKicker">PHOTOGRAPHY</span>
              <span className="widLine" />
            </div>

            <h2 className="widTitle thq-heading-2">
              {props.sectionTitle ?? (
                <Fragment>
                  <span className="t">What I Do</span>
                </Fragment>
              )}
            </h2>

            <p className="widIntro thq-body-large">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="t">
                    Four focused disciplines — crafted with atmosphere, restraint, and
                    cinematic clarity.
                  </span>
                </Fragment>
              )}
            </p>

            <div className="widDivider" aria-hidden="true" />
          </header>

          {/* ===== grid ===== */}
          <div className="widGrid">
            {/* 1 */}
            <article className="widCard">
              <div className="widMedia" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="widImg"
                  src={props.feature1ImageSrc}
                  alt={props.feature1ImageAlt}
                  loading="lazy"
                />
                <div className="widVignette" />
                <div className="widGlow" />
                <div className="widGrain" />
              </div>

              <div className="widInner">
                <div className="widTop">
                  <span className="widChip">01</span>
                  <span className="widChipLabel">CINEMATIC</span>
                </div>

                <h3 className="widH3 thq-heading-3">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span className="t">
                        Cinematic &amp; Editorial Photography
                      </span>
                    </Fragment>
                  )}
                </h3>

                <p className="widP thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span className="t">
                        Story-driven imagery created with intention and visual depth.
                      </span>
                    </Fragment>
                  )}
                </p>

                <div className="widAction">
                  <button className="widBtn" type="button">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="t">Learn More</span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="widIcon" aria-hidden="true">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* 2 */}
            <article className="widCard">
              <div className="widMedia" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="widImg"
                  src={props.feature2ImageSrc}
                  alt={props.feature2ImageAlt}
                  loading="lazy"
                />
                <div className="widVignette" />
                <div className="widGlow" />
                <div className="widGrain" />
              </div>

              <div className="widInner">
                <div className="widTop">
                  <span className="widChip">02</span>
                  <span className="widChipLabel">WILDLIFE</span>
                </div>

                <h3 className="widH3 thq-heading-3">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span className="t">Nature &amp; Wildlife</span>
                    </Fragment>
                  )}
                </h3>

                <p className="widP thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span className="t">
                        Quiet, patient observations of the natural world — captured with
                        respect and realism.
                      </span>
                    </Fragment>
                  )}
                </p>

                <div className="widAction">
                  <button className="widBtn" type="button">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="t">Discover More</span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="widIcon" aria-hidden="true">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* 3 */}
            <article className="widCard">
              <div className="widMedia" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="widImg"
                  src={props.feature3ImageSrc}
                  alt={props.feature3ImageAlt}
                  loading="lazy"
                />
                <div className="widVignette" />
                <div className="widGlow" />
                <div className="widGrain" />
              </div>

              <div className="widInner">
                <div className="widTop">
                  <span className="widChip">03</span>
                  <span className="widChipLabel">TRAVEL</span>
                </div>

                <h3 className="widH3 thq-heading-3">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span className="t">Landscape &amp; Travel</span>
                    </Fragment>
                  )}
                </h3>

                <p className="widP thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span className="t">
                        Expansive scenes that convey scale, mood, and a sense of place.
                      </span>
                    </Fragment>
                  )}
                </p>

                <div className="widAction">
                  <button className="widBtn" type="button">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="t">Explore Now</span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="widIcon" aria-hidden="true">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* 4 */}
            <article className="widCard">
              <div className="widMedia" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="widImg"
                  src={props.feature4ImageSrc}
                  alt={props.feature4ImageAlt}
                  loading="lazy"
                />
                <div className="widVignette" />
                <div className="widGlow" />
                <div className="widGrain" />
              </div>

              <div className="widInner">
                <div className="widTop">
                  <span className="widChip">04</span>
                  <span className="widChipLabel">FINE ART</span>
                </div>

                <h3 className="widH3 thq-heading-3">
                  {props.feature4Title ?? (
                    <Fragment>
                      <span className="t">Black &amp; White Fine Art</span>
                    </Fragment>
                  )}
                </h3>

                <p className="widP thq-body-small">
                  {props.feature4Description ?? (
                    <Fragment>
                      <span className="t">
                        Timeless compositions focused on light, form, and emotion.
                      </span>
                    </Fragment>
                  )}
                </p>

                <div className="widAction">
                  <button className="widBtn" type="button">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="t">View Portfolio</span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="widIcon" aria-hidden="true">
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
        .widWrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .widMax {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ===== header ===== */
        .widHead {
          width: 100%;
          max-width: 920px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .widKickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .widKicker {
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

        .widLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .widTitle {
          margin: 0;
          line-height: 1.1;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .widIntro {
          margin: 0;
          color: rgba(245, 244, 244, 0.84);
          line-height: 1.7;
          max-width: 72ch;
        }

        .widDivider {
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
        .widGrid {
          width: 100%;
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(12, 1fr);
        }

        .widCard {
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
        .widMedia {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .widImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
          filter: brightness(0.78) contrast(1.08) saturate(1.02);
        }

        /* make text readable even on bright/complex images */
        .widVignette {
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

        .widGlow {
          position: absolute;
          inset: -18%;
          background: radial-gradient(
            40% 32% at 22% 28%,
            rgba(37, 195, 226, 0.12),
            rgba(37, 195, 226, 0) 62%
          );
          filter: blur(14px);
          opacity: 0.9;
        }

        .widGrain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        /* ===== content ===== */
        .widInner {
          position: relative;
          z-index: 2;
          height: 100%;
          padding: 18px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: flex-end;
        }

        .widTop {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2px;
        }

        .widChip {
          font-size: 12px;
          letter-spacing: 0.28em;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          color: rgba(245, 244, 244, 0.92);
        }

        .widChipLabel {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.7);
        }

        .widH3 {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .widP {
          margin: 0;
          color: rgba(245, 244, 244, 0.84);
          line-height: 1.7;
          max-width: 44ch;
        }

        .widAction {
          margin-top: 4px;
          display: flex;
          justify-content: flex-start;
        }

        .widBtn {
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
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }

        .widBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.45);
          background: rgba(37, 195, 226, 0.08);
        }

        .widIcon {
          width: 18px;
          height: 18px;
          fill: currentColor;
          opacity: 0.9;
        }

        .t {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .widCard {
            grid-column: span 6;
            min-height: 380px;
          }
        }

        @media (max-width: 767px) {
          .widKickerRow {
            justify-content: center;
          }
          .widLine {
            display: none;
          }
          .widHead {
            text-align: center;
            align-items: center;
          }
          .widCard {
            grid-column: span 12;
            min-height: 340px;
          }
          .widInner {
            text-align: left;
          }
        }
      `}</style>
    </>
  )
}

WhatIDoPhotographyServices.defaultProps = {
  rootClassName: '',
  sectionTitle: undefined,
  sectionDescription: undefined,

  feature1Title: undefined,
  feature1Description: undefined,
  feature1Button: undefined,
  feature1ImageAlt: 'Cinematic & Editorial Photography',
  feature1ImageSrc: '/services/photography/wid-01.jpg',

  feature2Title: undefined,
  feature2Description: undefined,
  feature2Button: undefined,
  feature2ImageAlt: 'Nature & Wildlife',
  feature2ImageSrc: '/services/photography/wid-02.jpg',

  feature3Title: undefined,
  feature3Description: undefined,
  feature3Button: undefined,
  feature3ImageAlt: 'Landscape & Travel',
  feature3ImageSrc: '/services/photography/wid-03.jpg',

  feature4Title: undefined,
  feature4Description: undefined,
  feature4Button: undefined,
  feature4ImageAlt: 'Black & White Fine Art',
  feature4ImageSrc: '/services/photography/wid-04.jpg',
}

WhatIDoPhotographyServices.propTypes = {
  rootClassName: PropTypes.string,

  sectionTitle: PropTypes.element,
  sectionDescription: PropTypes.element,

  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature1Button: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature1ImageSrc: PropTypes.string,

  feature2Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature2Button: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature2ImageSrc: PropTypes.string,

  feature3Title: PropTypes.element,
  feature3Description: PropTypes.element,
  feature3Button: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,

  feature4Title: PropTypes.element,
  feature4Description: PropTypes.element,
  feature4Button: PropTypes.element,
  feature4ImageAlt: PropTypes.string,
  feature4ImageSrc: PropTypes.string,
}

export default WhatIDoPhotographyServices