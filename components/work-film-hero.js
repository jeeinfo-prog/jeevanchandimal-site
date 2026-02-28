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
    const el = document.getElementById('selected-film-work')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="hero">
        {/* MOBILE → IMAGE */}
        {isMobile ? (
          <img
            src="/work/film/wf-01.jpg"
            alt="Film background"
            className="bgMedia"
          />
        ) : (
          /* DESKTOP → VIDEO */
          <video
            src={props.videoSrc2}
            loop
            muted
            autoPlay
            playsInline
            className="bgMedia"
          />
        )}

        <div className="overlay" />

        <div className="content">
          <h1 className="title">
            {props.heading1 ?? (
              <Fragment>
                <span>
                  Cinematic work shaped by story, mood, and intention.
                </span>
              </Fragment>
            )}
          </h1>

          <p className="subtitle">
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
            {/* CONTACT */}
            <a href="/contact" className="btnOutline">
              {props.textinputPlaceholder || 'Create together'}
            </a>

            {/* SCROLL */}
            <button onClick={scrollToSelected} className="btnPrimary">
              {props.action3 ?? (
                <Fragment>
                  <span>Explore Work</span>
                </Fragment>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          width: 100%;
          min-height: 78vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(245, 244, 244, 0.08);
        }

        .bgMedia {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.78)
          );
        }

        .content {
          position: relative;
          z-index: 2;
          max-width: 760px;
          text-align: center;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .title {
          color: #f5f4f4;
        }

        .subtitle {
          color: rgba(245, 244, 244, 0.78);
        }

        .actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .btnPrimary {
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(120, 166, 255, 0.6);
          background: rgba(120, 166, 255, 0.18);
          color: #f5f4f4;
          backdrop-filter: blur(6px);
          transition: all 0.25s ease;
        }

        .btnPrimary:hover {
          background: rgba(120, 166, 255, 0.32);
          box-shadow: 0 0 18px rgba(120, 166, 255, 0.35);
          transform: translateY(-1px);
        }

        .btnOutline {
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.28);
          color: rgba(245, 244, 244, 0.85);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btnOutline:hover {
          border-color: rgba(120, 166, 255, 0.6);
          color: #f5f4f4;
          box-shadow: 0 0 16px rgba(120, 166, 255, 0.25);
          transform: translateY(-1px);
        }

        @media (max-width: 767px) {
          .actions {
            flex-direction: column;
          }

          .btnPrimary,
          .btnOutline {
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