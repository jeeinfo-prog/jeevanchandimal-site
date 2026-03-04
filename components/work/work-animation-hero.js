import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkAnimationHero = (props) => {
  const scrollToSelected = () => {
    if (typeof document === 'undefined') return
    const el = document.getElementById('selected-animation-work')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div
        className={`work-animation-hero-container1 thq-section-padding ${props.rootClassName}`}
      >
        <div className="work-animation-hero-stage">
          <video
            src={props.videoSrc}
            loop
            muted
            autoPlay
            playsInline
            preload="metadata"
            className="work-animation-hero-video"
          />

          {/* Left-middle text */}
          <div className="work-animation-hero-thq-column-elm">
            <div className="work-animation-hero-thq-content-elm">
              <h1 className="thq-heading-2 work-animation-hero-thq-text-elm1">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="work-animation-hero-text2">
                      Motion created with clarity, rhythm, and purpose.
                    </span>
                  </Fragment>
                )}
              </h1>

              <p className="thq-body-large work-animation-hero-thq-text-elm2">
                {props.content1 ?? (
                  <Fragment>
                    <span className="work-animation-hero-text1">
                      Animation and movement used to enhance visual storytelling.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="actions">
                <a href="/contact" className="cineBtnOutline">
                  {props.textinputPlaceholder || 'Create together'}
                </a>

                <button
                  type="button"
                  onClick={scrollToSelected}
                  className="cineBtnPrimary"
                >
                  {props.action3 ?? (
                    <Fragment>
                      <span>Explore Work</span>
                    </Fragment>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .work-animation-hero-container1 {
          width: 100%;
          height: 1015px;
          display: flex;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(245, 244, 244, 0.08);
          padding-top: 0;
          padding-bottom: 0;
        }

        .work-animation-hero-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center; /* vertical center */
        }

        .work-animation-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.72) contrast(1.05) saturate(0.9);
        }

        /* overlay */
        .work-animation-hero-stage::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.78)
          );
          z-index: 0;
        }

        .work-animation-hero-thq-column-elm {
          position: relative;
          z-index: 1;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 5rem;
        }

        .work-animation-hero-thq-content-elm {
          gap: var(--dl-layout-space-oneandhalfunits);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          animation: fadeInLeft 500ms ease;
        }

        .actions {
          margin-top: 10px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .work-animation-hero-text1,
        .work-animation-hero-text2,
        .work-animation-hero-text3 {
          display: inline-block;
        }

        /* PRIMARY CTA */
        .cineBtnPrimary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.65);
          background: rgba(37, 195, 226, 0.18);
          color: #f5f4f4;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.22s ease;
          backdrop-filter: blur(6px);
          cursor: pointer;
        }

        .cineBtnPrimary:hover {
          background: rgba(37, 195, 226, 0.28);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.16),
            0 0 18px rgba(37, 195, 226, 0.25);
          transform: translateY(-1px);
        }

        /* OUTLINE CTA */
        .cineBtnOutline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.28);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(245, 244, 244, 0.85);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.22s ease;
          backdrop-filter: blur(6px);
        }

        .cineBtnOutline:hover {
          border-color: rgba(37, 195, 226, 0.55);
          color: #f5f4f4;
          box-shadow: 0 0 16px rgba(37, 195, 226, 0.18);
          transform: translateY(-1px);
        }

        @media (max-width: 991px) {
          .work-animation-hero-thq-column-elm {
            padding-left: 0;
            margin: 0 auto;
          }
        }

        @media (max-width: 767px) {
          .work-animation-hero-stage {
            justify-content: center;
          }

          .work-animation-hero-thq-column-elm {
            max-width: 100%;
            padding-left: 0;
            align-items: center;
            text-align: center;
            width: 100%;
          }

          .work-animation-hero-thq-text-elm1,
          .work-animation-hero-thq-text-elm2 {
            text-align: center;
          }

          .actions {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }

          .cineBtnPrimary,
          .cineBtnOutline {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}

WorkAnimationHero.defaultProps = {
  videoSrc: '/Animation/animation%2001.mov',
  content1: undefined,
  heading1: undefined,
  textinputPlaceholder: 'Create together',
  rootClassName: '',
  action3: undefined,
}

WorkAnimationHero.propTypes = {
  videoSrc: PropTypes.string,
  content1: PropTypes.element,
  heading1: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
  rootClassName: PropTypes.string,
  action3: PropTypes.element,
}

export default WorkAnimationHero