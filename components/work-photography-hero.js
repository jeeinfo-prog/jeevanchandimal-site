import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WorkPhotographyHero = (props) => {
  return (
    <>
      <div className="work-photography-hero-container1 thq-section-padding">
        <div className="work-photography-hero-container2">
          <video
            src={props.videoSrc}
            loop
            muted
            autoPlay
            playsInline
            preload="metadata"
            className="work-photography-hero-video"
          />

          {/* Left-middle text block */}
          <div className="work-photography-hero-thq-column-elm">
            <div className="work-photography-hero-thq-content-elm">
              <h1 className="thq-heading-2 work-photography-hero-thq-text-elm1">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="work-photography-hero-text3">
                      Still imagery guided by light, atmosphere, and emotion.
                    </span>
                  </Fragment>
                )}
              </h1>

              <p className="thq-body-large work-photography-hero-thq-text-elm2">
                {props.content1 ?? (
                  <Fragment>
                    <span className="work-photography-hero-text2">
                      A collection of photographs created with cinematic depth
                      and restraint.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="actions">
                <Link href="/contact" legacyBehavior>
                  <a className="cineBtnOutline">Create together</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .work-photography-hero-container1 {
          width: 100%;
          height: 1015px;
          display: flex;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(245, 244, 244, 0.08);
          padding-top: 0;
          padding-bottom: 0;
        }

        .work-photography-hero-container2 {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center; /* vertical center */
        }

        .work-photography-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.72) contrast(1.05) saturate(0.9);
        }

        /* overlay for readability */
        .work-photography-hero-container2::after {
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

        .work-photography-hero-thq-column-elm {
          position: relative;
          z-index: 1;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 5rem; /* left gap */
        }

        .work-photography-hero-thq-content-elm {
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

        .work-photography-hero-text2,
        .work-photography-hero-text3 {
          display: inline-block;
        }

        /* outline CTA */
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
          .work-photography-hero-thq-column-elm {
            padding-left: 0;
            margin: 0 auto;
          }
        }

        @media (max-width: 767px) {
          .work-photography-hero-container2 {
            justify-content: center;
          }

          .work-photography-hero-thq-column-elm {
            max-width: 100%;
            padding-left: 0;
            align-items: center;
            text-align: center;
            width: 100%;
          }

          .work-photography-hero-thq-text-elm1,
          .work-photography-hero-thq-text-elm2 {
            text-align: center;
          }

          .actions {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }

          .cineBtnOutline {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}

WorkPhotographyHero.defaultProps = {
  videoSrc: '/work/photography/workphotographyhero-01.mov',
  content1: undefined,
  heading1: undefined,
}

WorkPhotographyHero.propTypes = {
  content1: PropTypes.element,
  videoSrc: PropTypes.string,
  heading1: PropTypes.element,
}

export default WorkPhotographyHero