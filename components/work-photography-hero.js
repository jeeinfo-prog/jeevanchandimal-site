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
  <a href="/contact" className="cineBtnOutline">
    Create together
  </a>

  <button onClick={scrollToSelected} className="cineBtnPrimary">
    Explore Work
  </button>
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

  /* ✅ LEFT ALIGN on desktop */
  .work-photography-hero-thq-column-elm {
    gap: 24px;
    z-index: 1;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
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

  /* 🎯 PRIMARY CTA – cyan glow */
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
  }

  .cineBtnPrimary:hover {
    background: rgba(37, 195, 226, 0.28);
    box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.16),
      0 0 18px rgba(37, 195, 226, 0.25);
    transform: translateY(-1px);
  }

  /* 🎯 OUTLINE CTA – subtle glass */
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

  .work-photography-hero-text1,
  .work-photography-hero-text2,
  .work-photography-hero-text3 {
    display: inline-block;
  }

  /* 📱 MOBILE – center text only on small screens */
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