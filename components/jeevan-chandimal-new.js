import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const JeevanChandimalNew = (props) => {
  return (
    <>
      <section className={`hero ${props.rootClassName || ''}`}>
        {/* background image */}
        {props.image1Src && (
          <img
            alt={props.image1Alt}
            src={props.image1Src}
            className="bg"
            loading="eager"
          />
        )}

        {/* cinematic overlays */}
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="content">
          <h1 className="name">
            {props.heading1 ?? (
              <Fragment>
                <span className="t">Jeevan Chandimal</span>
              </Fragment>
            )}
          </h1>

          <h2 className="role">
            {props.heading11 ?? (
              <Fragment>
                <span className="t">Filmmaker · Visual Storyteller</span>
              </Fragment>
            )}
          </h2>

          <p className="tagline">
            {props.content1 ?? (
              <Fragment>
                <span className="t">
                  Where image, motion, and sound become atmosphere.
                </span>
              </Fragment>
            )}
          </p>

          <div className="actions">
            <Link href="/work" legacyBehavior>
              <a className="btnPrimary" aria-label="Explore Work">
                <span className="btnText">Explore Work</span>
                <span className="arrow">→</span>
              </a>
            </Link>

            <Link href="/contact" legacyBehavior>
              <a className="btnGhost" aria-label="Create Together">
                <span className="btnText">
                  {props.action3 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-new-text3">Create Together</span>
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
          position: relative;
          overflow: hidden;
        }

        .bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.68) contrast(1.05);
          z-index: 0;
        }

        .vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(
              80% 70% at 50% 20%,
              rgba(255, 255, 255, 0.04),
              rgba(0, 0, 0, 0.62)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.72) 0%,
              rgba(0, 0, 0, 0.24) 46%,
              rgba(0, 0, 0, 0.48) 100%
            );
          pointer-events: none;
        }

        .grain {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.07;
          mix-blend-mode: overlay;
          pointer-events: none;
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
          margin-left: var(--dl-layout-space-fiveunits);
        }

        .name {
          margin: 0;
          font-size: clamp(32px, 5vw, 44px);
          letter-spacing: -0.02em;
          color: #f5f4f4;
          text-shadow: 0 18px 42px rgba(0, 0, 0, 0.42);
          line-height: 1.02;
        }

        .role {
          margin: 0;
          font-size: clamp(18px, 2.4vw, 22px);
          color: #25c3e2;
          letter-spacing: 0.04em;
          line-height: 1.25;
        }

        .tagline {
          margin: 0;
          margin-top: var(--dl-layout-space-twounits);
          font-size: 16px;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.82);
          max-width: 48ch;
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
          backdrop-filter: blur(8px);
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
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.28),
            rgba(37, 195, 226, 0.12)
          );
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
          font-size: 14px;
          line-height: 1;
        }

        .btnText {
          display: inline-flex;
          align-items: center;
        }

        .jeevan-chandimal-new-text1,
        .jeevan-chandimal-new-text2,
        .jeevan-chandimal-new-text3,
        .jeevan-chandimal-new-text4,
        .t {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .hero {
            min-height: 68vh;
          }

          .content {
            max-width: 540px;
            margin-left: var(--dl-layout-space-threeunits);
          }
        }

        @media (max-width: 767px) {
          .hero {
            min-height: 64vh;
            justify-content: center;
            padding-left: 16px;
            padding-right: 16px;
          }

          .content {
            width: 100%;
            text-align: center;
            align-items: center;
            margin-left: 0;
          }

          .actions {
            justify-content: center;
          }
        }

        @media (max-width: 479px) {
          .actions {
            width: 100%;
            flex-direction: column;
          }

          .btnPrimary,
          .btnGhost {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}

JeevanChandimalNew.defaultProps = {
  image1Alt: 'Film Production Image',
  image1Src: '/JC/jeevan-chandimal-1100h.jpg',
  heading1: undefined,
  heading11: undefined,
  content1: undefined,
  action3: undefined,
  textinputPlaceholder: 'Enter your email to get started',
  rootClassName: '',
}

JeevanChandimalNew.propTypes = {
  image1Alt: PropTypes.string,
  image1Src: PropTypes.string,
  heading1: PropTypes.element,
  heading11: PropTypes.element,
  content1: PropTypes.element,
  action3: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default JeevanChandimalNew