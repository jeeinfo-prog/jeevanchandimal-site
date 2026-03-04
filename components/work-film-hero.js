import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkFilmHero = (props) => {
  const scrollToSelected = () => {
    if (typeof document === 'undefined') return
    const el = document.getElementById('selected-film-work')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="work-film-hero-container1 thq-section-padding">
        {/* ✅ Video only (no background image) */}
        <div className="work-film-hero-container2">
          <video
            src={props.videoSrc2}
            loop
            muted
            autoPlay
            playsInline
            preload="metadata"
            className="work-film-hero-video"
          />

          {/* ✅ Left + vertically centered */}
          <div className="work-film-hero-thq-column-elm">
            <div className="work-film-hero-thq-content-elm">
              <h1 className="thq-heading-2 work-film-hero-thq-text-elm1">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="work-film-hero-text1">
                      Cinematic work shaped by story, mood, and intention.
                    </span>
                  </Fragment>
                )}
              </h1>

              <p className="thq-body-large work-film-hero-thq-text-elm2">
                {props.content1 ?? (
                  <Fragment>
                    <span className="work-film-hero-text2">
                      Narrative-driven films where image, motion, and sound come
                      together.
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
        .work-film-hero-container1 {
          width: 100%;
          height: 1015px;
          display: flex;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(245, 244, 244, 0.08);
          padding-top: 0; /* keep THQ padding class, but don’t push content down */
          padding-bottom: 0;
        }

        /* Full-height stage */
        .work-film-hero-container2 {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center; /* ✅ vertically center the text block */
        }

        .work-film-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.72) contrast(1.05) saturate(0.9);
        }

        /* subtle overlay for readability */
        .work-film-hero-container2::after {
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

        /* ✅ Left-middle: left aligned + vertically centered by parent */
        .work-film-hero-thq-column-elm {
          position: relative;
          z-index: 1;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 5rem; /* ✅ left gap */
        }

        .work-film-hero-thq-content-elm {
          gap: var(--dl-layout-space-oneandhalfunits);
          display: flex;
          align-self: stretch;
          align-items: flex-start;
          flex-direction: column;
          animation-name: fadeInLeft;
          animation-delay: 0s;
          animation-duration: 500ms;
          animation-direction: normal;
          animation-iteration-count: 1;
          animation-timing-function: ease;
        }

        .actions {
          margin-top: 10px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .work-film-hero-text1,
        .work-film-hero-text2 {
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
          .work-film-hero-thq-column-elm {
            padding-left: 0;
            margin: 0 auto; /* ✅ keep it visually nice on tablet */
          }
        }

        @media (max-width: 767px) {
          .work-film-hero-container2 {
            justify-content: center;
          }

          .work-film-hero-thq-column-elm {
            max-width: 100%;
            padding-left: 0;
            align-items: center;
            text-align: center;
            width: 100%;
          }

          .work-film-hero-thq-text-elm1,
          .work-film-hero-thq-text-elm2 {
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

WorkFilmHero.defaultProps = {
  heading1: undefined,
  content1: undefined,
  textinputPlaceholder: 'Create together',
  action3: undefined,
  videoSrc2: '/Film/film%20production%2002.mov',
}

WorkFilmHero.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
  action3: PropTypes.element,
  videoSrc2: PropTypes.string,
}

export default WorkFilmHero