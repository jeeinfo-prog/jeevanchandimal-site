import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WorkPhotographyHero = (props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <section className="hero thq-section-padding">
        {/* ✅ SSR-safe: render video only after mount */}
        {mounted ? (
          <video
            src={props.videoSrc}
            loop
            muted
            autoPlay
            playsInline
            preload="metadata"
            className="bgMedia"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/work/photography/wp-01.jpg"
            alt="Photography background"
            className="bgMedia"
            loading="eager"
          />
        )}

        <div className="overlay" />

        <div className="content thq-section-max-width">
          {/* ✅ keep text block same style/structure as Film hero */}
          <div className="col">
            <h1 className="title thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="work-photography-hero-text3">
                    Still imagery guided by light, atmosphere, and emotion.
                  </span>
                </Fragment>
              )}
            </h1>

            <p className="subtitle thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="work-photography-hero-text2">
                    A collection of photographs created with cinematic depth and
                    restraint.
                  </span>
                </Fragment>
              )}
            </p>

            {/* ✅ CTA only (same placement as Film hero actions) */}
            <div className="actions">
              <Link href="/contact" legacyBehavior>
                <a className="cineBtnOutline">Create together</a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          width: 100%;
          min-height: 78vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          border-bottom: 1px solid rgba(245, 244, 244, 0.08);
        }

        .bgMedia {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.72) contrast(1.05) saturate(0.9);
        }

        .overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.78)
          );
        }

        .content {
          position: relative;
          z-index: 2;
          width: 100%;
          padding-left: 5rem; /* ✅ same 5-unit left gap */
        }

        .col {
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: flex-start;
          text-align: left;
        }

        .title {
          margin: 0;
          color: #f5f4f4;
        }

        .subtitle {
          margin: 0;
          color: rgba(245, 244, 244, 0.78);
          line-height: 1.65;
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

        /* OUTLINE CTA (same as Film hero) */
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

        @media (max-width: 767px) {
          .hero {
            justify-content: center;
          }

          .content {
            padding-left: 0;
          }

          .col {
            max-width: 100%;
            align-items: center;
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