import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const ServicePhotographyHero = (props) => {
  return (
    <>
      <section className={`hero ${props.rootClassName || ''}`}>
        {/* ✅ VIDEO BACKGROUND (NO DIM) */}
        {props.videoSrc && (
          <video
            className="bgVideo"
            src={props.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        )}

        {/* ✅ cinematic legibility layers */}
        <div className="vignette" />
        <div className="grain" />

        <div className="content">
          <h1 className="title">
            {props.heading1 ?? (
              <Fragment>
                <span className="t">
                  Still imagery shaped by light, mood, and atmosphere.
                </span>
              </Fragment>
            )}
          </h1>

          <p className="desc">
            {props.content1 ?? (
              <Fragment>
                <span className="t">
                  Photography approached as storytelling — crafted with cinematic intent and emotional clarity.
                </span>
              </Fragment>
            )}
          </p>

          <div className="actions">
            <Link href={props.primaryHref} legacyBehavior>
              <a className="btnPrimary" aria-label="Explore Work">
                <span className="btnText">
                  {props.action3 ?? (
                    <Fragment>
                      <span className="t">Explore Work</span>
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
      </section>

      <style jsx>{`
        .hero {
          width: 100%;
          min-height: 72vh;

          display: flex;
          align-items: center;
          justify-content: flex-start;

          position: relative;
          overflow: hidden;

          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.08);

          /* ✅ EXACT SAME background as service-film-hero */
          background: rgba(12, 12, 12, 0.45);

          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);

          margin-top: 18px;
          padding-top: 0;
        }

        .bgVideo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(
              75% 60% at 28% 30%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0.52)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.58) 0%,
              rgba(0, 0, 0, 0.22) 55%,
              rgba(0, 0, 0, 0.42) 100%
            );
          pointer-events: none;
        }

        .grain {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 2;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .content {
          position: relative;
          z-index: 3;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0 18px;
          margin-left: var(--dl-layout-space-fiveunits);
        }

        .title {
          margin: 0;
          font-size: clamp(32px, 5vw, 44px);
          letter-spacing: -0.02em;
          color: #f5f4f4;
          text-shadow: 0 18px 42px rgba(0, 0, 0, 0.42);
          line-height: 1.08;
        }

        .desc {
          margin: 0;
          margin-top: var(--dl-layout-space-twounits);
          font-size: 16px;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.82);
          max-width: 52ch;
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

        .t {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .hero {
            border-radius: 18px;
          }

          .content {
            width: 100%;
            margin-left: 0;
            text-align: center;
            align-items: center;
            padding: 0 16px;
          }

          .actions {
            width: 100%;
            justify-content: center;
          }

          .btnPrimary,
          .btnGhost {
            width: 100%;
            justify-content: center;
            max-width: 520px;
          }
        }
      `}</style>
    </>
  )
}

ServicePhotographyHero.defaultProps = {
  rootClassName: '',
  heading1: undefined,
  content1: undefined,
  action3: undefined,
  videoSrc: '/Photography/Video/photography%2001.mov',

  primaryHref: '/work-photography',
  secondaryHref: '/contact',
  secondaryLabel: undefined,
}

ServicePhotographyHero.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  action3: PropTypes.element,
  videoSrc: PropTypes.string,
  primaryHref: PropTypes.string,
  secondaryHref: PropTypes.string,
  secondaryLabel: PropTypes.element,
}

export default ServicePhotographyHero