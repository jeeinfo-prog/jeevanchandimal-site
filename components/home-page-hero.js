import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const HomePageHero = (props) => {
  return (
    <>
      <div className="hero">
        {/* background image (optional fallback if you use index bg) */}
        {props.image1Src && (
          <img
            alt={props.image1Alt}
            src={props.image1Src}
            className="bg"
            loading="eager"
          />
        )}

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

            <Link href="/contact" legacyBehavior>
              <a className="btnGhost" aria-label="Create Together">
                <span className="btnText">Create Together</span>
                <span className="arrow">→</span>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          min-height: 72vh;
          display: flex;
          align-items: center;
          position: relative;
        }

        .bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7) contrast(1.05);
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 10px; /* ✅ reduced gap */
        }

        .name {
          margin: 0;
          font-size: clamp(32px, 5vw, 44px);
          letter-spacing: -0.02em;
          color: #f5f4f4;
          text-shadow: 0 18px 42px rgba(0, 0, 0, 0.42);
        }

        .role {
          margin: 0;
          font-size: clamp(18px, 2.4vw, 22px);
          color: #25c3e2;
          letter-spacing: 0.04em;
        }

        .tagline {
          margin: 6px 0 0;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.82);
          max-width: 48ch;
        }

        .actions {
          margin-top: 12px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btnPrimary,
        .btnGhost {
          height: 42px;
          padding: 0 16px 0 18px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none !important;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 900;
          transition: all 180ms ease;
        }

        .btnPrimary {
          border: 1px solid rgba(37, 195, 226, 0.45);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.08)
          );
          color: #f5f4f4;
          box-shadow: 0 18px 34px rgba(0, 0, 0, 0.38);
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
        }

        @media (max-width: 767px) {
          .content {
            width: 100%;
            text-align: center;
            align-items: center;
          }
        }

        .t {
          display: inline-block;
        }
      `}</style>
    </>
  )
}

HomePageHero.defaultProps = {
  image1Alt: 'Professional film production',
  heading1: undefined,
  content1: undefined,
  action3: undefined,
  heading11: undefined,
  image1Src: '', // you already use bg in index.js
}

HomePageHero.propTypes = {
  image1Alt: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  action3: PropTypes.element,
  heading11: PropTypes.element,
  image1Src: PropTypes.string,
}

export default HomePageHero