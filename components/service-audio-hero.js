// components/service-audio-hero.js
import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const ServiceAudioHero = (props) => {
  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span className="t">
          <span>Sound designed to deepen emotion and presence.</span>
          <br />
        </span>
      </Fragment>
    )

  const descNode =
    props.content1 ?? (
      <Fragment>
        <span className="t">
          <span>
            Audio treated as a storytelling layer — not an afterthought.
          </span>
          <br />
        </span>
      </Fragment>
    )

  return (
    <>
      <section className={`hero ${props.rootClassName || ''}`}>
        {/* ✅ VIDEO BACKGROUND (no dim) */}
        <video
          className="bgVideo"
          src={props.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* optional: keep a light vignette ONLY for text legibility (not dimming video) */}
        <div className="vignette" aria-hidden="true" />

        <div className="content thq-section-padding">
          <div className="inner">
            <h1 className="name thq-heading-2">{headingNode}</h1>

            <h2 className="role">
              {props.heading11 ?? (
                <Fragment>
                  <span className="t">Sound Design · Composition · Post</span>
                </Fragment>
              )}
            </h2>

            <p className="tagline thq-body-large">{descNode}</p>

            <div className="actions">
              <Link href={props.primaryHref} legacyBehavior>
                <a className="btnPrimary" aria-label="Listen to Work">
                  <span className="btnText">
                    {props.primaryLabel ?? (
                      <Fragment>
                        <span className="t">Listen to Work</span>
                      </Fragment>
                    )}
                  </span>
                  <span className="arrow">→</span>
                </a>
              </Link>

              <Link href={props.secondaryHref} legacyBehavior>
                <a className="btnGhost" aria-label="Create Together">
                  <span className="btnText">
                    {props.secondaryLabel ?? (
                      <Fragment>
                        <span className="t">Create Together</span>
                      </Fragment>
                    )}
                  </span>
                  <span className="arrow">→</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          width: 100%;
          min-height: 72vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .bgVideo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          /* ✅ no dim filters */
          filter: none;
        }

        /* ✅ subtle text-legibility vignette (doesn't dim the whole video) */
        .vignette {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(
              80% 70% at 28% 45%,
              rgba(0, 0, 0, 0.35),
              rgba(0, 0, 0, 0)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.55) 0%,
              rgba(0, 0, 0, 0.18) 55%,
              rgba(0, 0, 0, 0.35) 100%
            );
          opacity: 0.85;
        }

        .content {
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .inner {
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-left: var(--dl-layout-space-fiveunits);
        }

        .name {
          margin: 0;
          font-size: clamp(32px, 5vw, 44px);
          letter-spacing: -0.02em;
          color: #f5f4f4;
          text-shadow: 0 18px 42px rgba(0, 0, 0, 0.42);
          line-height: 1.12;
        }

        .role {
          margin: 0;
          font-size: clamp(18px, 2.4vw, 22px);
          color: #25c3e2;
          letter-spacing: 0.04em;
          text-transform: none;
          text-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
        }

        .tagline {
          margin: 0;
          margin-top: var(--dl-layout-space-twounits);
          font-size: 16px;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.86);
          max-width: 52ch;
          text-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
        }

        .actions {
          margin-top: var(--dl-layout-space-twounits);
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btnPrimary,
        .btnGhost {
          height: 36px;
          padding: 0 14px 0 16px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none !important;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 900;
          transition: all 180ms ease;
          white-space: nowrap;
          backdrop-filter: blur(6px);
        }

        .btnPrimary {
          border: 1px solid rgba(37, 195, 226, 0.45);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.08)
          );
          color: #f5f4f4;
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.35);
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.7);
        }

        .btnGhost {
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(245, 244, 244, 0.92);
        }

        .btnGhost:hover {
          border-color: rgba(37, 195, 226, 0.45);
          background: rgba(37, 195, 226, 0.08);
          transform: translateY(-1px);
        }

        .arrow {
          color: #25c3e2;
          transform: translateY(-1px);
        }

        @media (max-width: 991px) {
          .inner {
            margin-left: var(--dl-layout-space-twounits);
          }
        }

        @media (max-width: 767px) {
          .inner {
            width: 100%;
            text-align: center;
            align-items: center;
            margin-left: 0;
          }

          .actions {
            justify-content: center;
          }

          .btnPrimary,
          .btnGhost {
            width: 100%;
            justify-content: center;
            max-width: 520px;
          }

          .vignette {
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.55),
              rgba(0, 0, 0, 0.15),
              rgba(0, 0, 0, 0.45)
            );
          }
        }

        .t {
          display: inline-block;
        }
      `}</style>
    </>
  )
}

ServiceAudioHero.defaultProps = {
  heading1: undefined,
  heading11: undefined,
  content1: undefined,
  rootClassName: '',

  videoSrc: '/Audio/audio%20production%2003.mov',

  // ✅ buttons
  primaryHref: '/work-audio',
  secondaryHref: '/contact',
  primaryLabel: undefined,
  secondaryLabel: undefined,
}

ServiceAudioHero.propTypes = {
  heading1: PropTypes.element,
  heading11: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,

  videoSrc: PropTypes.string,

  primaryHref: PropTypes.string,
  secondaryHref: PropTypes.string,
  primaryLabel: PropTypes.element,
  secondaryLabel: PropTypes.element,
}

export default ServiceAudioHero