import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WorkPhotographyHero = (props) => {
  return (
    <>
      <div className="work-photography-hero-container1 thq-section-padding">
        <video
          src={props.videoSrc}
          loop
          muted
          autoPlay
          playsInline
          className="work-photography-hero-video"
        />

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
                    A collection of photographs created with cinematic depth and restraint.
                  </span>
                </Fragment>
              )}
            </p>

            {/* ✅ CTA only */}
            <div className="work-photography-hero-container3">
              <Link href="/contact" legacyBehavior>
                <a className="cineBtn">Create together</a>
              </Link>
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
          align-items: center;
          flex-direction: row;
        }

        .work-photography-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.72) contrast(1.05) saturate(0.9);
        }

        .work-photography-hero-thq-column-elm {
          gap: 24px;
          z-index: 1;
          max-width: 560px;
          display: flex;
          flex-direction: column;
        }

        .work-photography-hero-thq-content-elm {
          gap: var(--dl-layout-space-oneandhalfunits);
          display: flex;
          flex-direction: column;
          animation: fadeInLeft 500ms ease;
        }

        .work-photography-hero-container3 {
          margin-top: 10px;
        }

        /* ✅ Cinematic CTA button (matches site theme) */
        .cineBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 20px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.55);
          background: rgba(37, 195, 226, 0.16);
          color: #f5f4f4;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: 0.2s ease;
          backdrop-filter: blur(6px);
        }

        .cineBtn:hover {
          background: rgba(37, 195, 226, 0.24);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.14);
          transform: translateY(-1px);
        }

        .work-photography-hero-text1,
        .work-photography-hero-text2,
        .work-photography-hero-text3 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .work-photography-hero-thq-column-elm {
            width: 100%;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}

WorkPhotographyHero.defaultProps = {
  videoSrc: '/Photography/Video/photography%2001.mov',
  content1: undefined,
  heading1: undefined,
}

WorkPhotographyHero.propTypes = {
  content1: PropTypes.element,
  videoSrc: PropTypes.string,
  heading1: PropTypes.element,
}

export default WorkPhotographyHero