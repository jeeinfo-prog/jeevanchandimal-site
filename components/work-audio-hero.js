import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkAudioHero = (props) => {
  const scrollToSelected = () => {
    if (typeof document === 'undefined') return
    const el = document.getElementById('selected-audio-work')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div
        className={`work-audio-hero-container1 thq-section-padding ${props.rootClassName} `}
      >
        <div className="work-audio-hero-containerStage">
          {/* ✅ Video only */}
          <video
            src={props.videoSrc}
            loop
            muted
            autoPlay
            playsInline
            preload="metadata"
            className="work-audio-hero-video"
          />

          {/* ✅ Left-middle text */}
          <div className="work-audio-hero-thq-column-elm">
            <div className="work-audio-hero-thq-content-elm">
              <h1 className="thq-heading-2 work-audio-hero-thq-text-elm1">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="work-audio-hero-text2">
                      Sound designed to support story and presence.
                    </span>
                  </Fragment>
                )}
              </h1>

              <p className="thq-body-large work-audio-hero-thq-text-elm2">
                {props.content1 ?? (
                  <Fragment>
                    <span className="work-audio-hero-text3">
                      Audio work shaped through texture, space, and emotional
                      clarity.
                    </span>
                  </Fragment>
                )}
              </p>

              {/* ✅ New theme buttons */}
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
        .work-audio-hero-container1 {
          width: 100%;
          height: 1015px;
          display: flex;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(245, 244, 244, 0.08);
          padding-top: 0;
          padding-bottom: 0;
        }

        .work-audio-hero-containerStage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center; /* ✅ vertical center */
        }

        .work-audio-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.72) contrast(1.05) saturate(0.9);
        }

        /* overlay for readability */
        .work-audio-hero-containerStage::after {
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

        .work-audio-hero-thq-column-elm {
          position: relative;
          z-index: 1;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 5rem; /* ✅ left gap */
        }

        .work-audio-hero-thq-content-elm {
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

        .work-audio-hero-text1,
        .work-audio-hero-text2,
        .work-audio-hero-text3 {
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
          .work-audio-hero-thq-column-elm {
            padding-left: 0;
            margin: 0 auto;
          }
        }

        @media (max-width: 767px) {
          .work-audio-hero-containerStage {
            justify-content: center;
          }

          .work-audio-hero-thq-column-elm {
            width: 100%;
            padding-left: 0;
            align-items: center;
            text-align: center;
          }

          .work-audio-hero-thq-text-elm1,
          .work-audio-hero-thq-text-elm2 {
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

WorkAudioHero.defaultProps = {
  action3: undefined,
  heading1: undefined,
  videoSrc: 'work/audio/workaudio-01.mov',
  rootClassName: '',
  textinputPlaceholder: 'Create together',
  content1: undefined,
}

WorkAudioHero.propTypes = {
  action3: PropTypes.element,
  heading1: PropTypes.element,
  videoSrc: PropTypes.string,
  rootClassName: PropTypes.string,
  textinputPlaceholder: PropTypes.string,
  content1: PropTypes.element,
}

export default WorkAudioHero