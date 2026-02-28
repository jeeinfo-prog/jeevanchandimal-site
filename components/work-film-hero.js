import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const WorkFilmHero = (props) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scrollToSelected = () => {
    if (typeof document === 'undefined') return
    const el = document.getElementById('selected-film-work')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section className="hero">
        {/* Background media */}
        {isMobile ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/work/film/wf-01.jpg"
            alt="Film background"
            className="bgMedia"
            loading="eager"
          />
        ) : (
          <video
            src={props.videoSrc2}
            loop
            muted
            autoPlay
            playsInline
            preload="metadata"
            className="bgMedia"
          />
        )}

        <div className="overlay" />

        {/* NOTE: keep thq padding, but we override centering in CSS */}
        <div className="content thq-section-max-width thq-section-padding">
          <div className="col">
            <h1 className="title thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span>Cinematic work shaped by story, mood, and intention.</span>
                </Fragment>
              )}
            </h1>

            <p className="subtitle thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span>
                    Narrative-driven films where image, motion, and sound come
                    together.
                  </span>
                </Fragment>
              )}
            </p>

            <div className="actions">
              {/* Create together → contact */}
              <a href="/contact" className="cineBtnOutline">
                {props.textinputPlaceholder || 'Create together'}
              </a>

              {/* Explore → scroll */}
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
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          width: 100%;
          min-height: 78vh;
          display: flex;
          align-items: center;
          justify-content: flex-start; /* ✅ page-left anchor */
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

          /* ✅ break out of thq-section-max-width centering */
          max-width: 100%;
          margin: 0;

          /* ✅ 5-unit page-left gap */
          padding-left: 5rem;
        }

        /* Desktop: left aligned */
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
          cursor: pointer;
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

        @media (max-width: 767px) {
          /* Mobile: center again */
          .hero {
            justify-content: center;
          }

          /* restore centered container behavior on mobile */
          .content {
            padding-left: 0;
            max-width: var(--dl-layout-size-maxwidth);
            margin: 0 auto;
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
  videoSrc2: '/Film/film production 02.mov',
}

WorkFilmHero.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
  action3: PropTypes.element,
  videoSrc2: PropTypes.string,
}

export default WorkFilmHero