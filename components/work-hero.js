import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkHero = (props) => {
  return (
    <>
      <div className={`work-hero-container1 ${props.rootClassName}`}>
        {/* background image */}
        <img
          alt={props.image1Alt}
          src={props.image1Src}
          className="work-hero-image"
        />

        {/* cinematic overlays */}
        <div className="vignette" />
        <div className="grain" />

        <div className="content">
          <h1 className="title">
            {props.heading1 ?? (
              <Fragment>
                <span className="work-hero-text1">
                  Selected work across film, photography, sound, and motion.
                </span>
              </Fragment>
            )}
          </h1>

          <p className="desc">
            {props.content1 ?? (
              <Fragment>
                <span className="work-hero-text3">
                  Explore each discipline as a focused body of work.
                </span>
              </Fragment>
            )}
          </p>

          <div className="ctaRow">
            <input
              type="email"
              placeholder={props.textinputPlaceholder}
              className="work-hero-textinput thq-input"
            />

            <button className="work-hero-thq-button-elm" type="button">
              <span className="thq-body-small">
                {props.action3 ?? (
                  <Fragment>
                    <span className="work-hero-text2">Explore Work</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .work-hero-container1 {
          width: 100%;
          min-height: 72vh; /* match the 2nd image feel */
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          margin-top: 18px;
        }

        .work-hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* softer than before so image stays visible like 2nd image */
          filter: brightness(0.82) contrast(1.05) saturate(0.95);
          z-index: 0;
        }

        /* ===== cinematic overlays (softer) ===== */
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              75% 60% at 28% 30%,
              rgba(0, 0, 0, 0.18),
              rgba(0, 0, 0, 0.68)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.72) 0%,
              rgba(0, 0, 0, 0.35) 55%,
              rgba(0, 0, 0, 0.55) 100%
            );
          z-index: 1;
        }

        .grain {
          position: absolute;
          inset: 0;
          opacity: 0.045;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 2;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        /* ===== content layout like 2nd image ===== */
        .content {
          position: relative;
          z-index: 3;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0 18px;
          margin-left: var(--dl-layout-space-fiveunits); /* left offset like homepage */
        }

        .title {
          margin: 0;
          font-size: clamp(32px, 5vw, 44px);
          letter-spacing: -0.02em;
          color: #f5f4f4;
          text-shadow: 0 18px 42px rgba(0, 0, 0, 0.42);
          line-height: 1.08;
        }

        .desc {
          margin: 0;
          margin-top: var(--dl-layout-space-twounits);
          font-size: 16px;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.82);
          max-width: 48ch;
        }

        .ctaRow {
          margin-top: var(--dl-layout-space-twounits);
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .work-hero-textinput {
          width: min(420px, 64vw);
          height: 36px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(245, 244, 244, 0.18);
          color: rgba(245, 244, 244, 0.92);
          border-radius: 999px;
        }

        .work-hero-thq-button-elm {
          height: 36px;
          padding: 0 14px 0 16px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(37, 195, 226, 0.45);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.08)
          );
          color: #f5f4f4;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 900;
          cursor: pointer;
          transition: all 180ms ease;
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.35);
          white-space: nowrap;
        }

        .work-hero-thq-button-elm:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.7);
        }

        .work-hero-text1,
        .work-hero-text2,
        .work-hero-text3 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .work-hero-container1 {
            border-radius: 18px;
          }
          .content {
            width: 100%;
            margin-left: 0;
            text-align: center;
            align-items: center;
            padding: 0 16px;
          }
          .work-hero-textinput {
            width: 100%;
            max-width: 520px;
          }
          .work-hero-thq-button-elm {
            width: 100%;
            justify-content: center;
            max-width: 520px;
          }
          .ctaRow {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}

WorkHero.defaultProps = {
  heading1: undefined,
  rootClassName: '',
  image1Alt: 'Professional film production equipment',
  image1Src:
    '/work/herowrok.jpg',
  action3: undefined,
  content1: undefined,
  textinputPlaceholder: 'Create Together',
}

WorkHero.propTypes = {
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
  image1Alt: PropTypes.string,
  image1Src: PropTypes.string,
  action3: PropTypes.element,
  content1: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
}

export default WorkHero