import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkHero = (props) => {
  return (
    <>
      <div
        className={`work-hero-container1 thq-section-padding ${props.rootClassName}`}
      >
        {/* background image */}
        <img
          alt={props.image1Alt}
          src={props.image1Src}
          className="work-hero-image"
        />

        {/* cinematic overlays */}
        <div className="vignette" />
        <div className="grain" />

        <div className="work-hero-thq-column-elm">
          <div className="work-hero-thq-content-elm">
            <h1 className="thq-heading-2 work-hero-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="work-hero-text1">
                    Selected work across film, photography, sound, and motion.
                  </span>
                </Fragment>
              )}
            </h1>

            <p className="thq-body-large work-hero-thq-text-elm2">
              {props.content1 ?? (
                <Fragment>
                  <span className="work-hero-text3">
                    Explore each discipline as a focused body of work.
                  </span>
                </Fragment>
              )}
            </p>

            <div className="work-hero-container2">
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="work-hero-textinput thq-input"
              />

              <div className="work-hero-container3">
                <button className="work-hero-thq-button-elm">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="work-hero-text2">
                          Explore Work
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .work-hero-container1 {
          width: 100%;
          min-height: 72vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .work-hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.68) contrast(1.06);
          z-index: 0;
        }

        /* ===== CINEMATIC OVERLAYS ===== */

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              70% 55% at 50% 28%,
              rgba(0, 0, 0, 0.1),
              rgba(0, 0, 0, 0.7)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.78) 0%,
              rgba(0, 0, 0, 0.45) 55%,
              rgba(0, 0, 0, 0.82) 100%
            );
          z-index: 1;
        }

        .grain {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          mix-blend-mode: overlay;
          z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .work-hero-thq-column-elm {
          position: relative;
          z-index: 2;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-left: var(--dl-layout-space-fiveunits);
        }

        .work-hero-thq-content-elm {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .work-hero-thq-text-elm1 {