// components/service-film-hero.js
import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const ServiceFilmHero = (props) => {
  return (
    <>
      <section className={`hero ${props.rootClassName || ''}`}>
        {/* video */}
        <video
          className="bgVideo"
          src={props.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* luxury cinematic layers */}
        <div className="baseOverlay" />
        <div className="vignette" />
        <div className="glow" />
        <div className="grain" />
        <div className="bottomFade" />

        <div className="contentShell">
          <div className="eyebrowWrap">
            <span className="eyebrowLine" />
            <span className="eyebrow">
              {props.eyebrowText ?? (
                <Fragment>
                  <span className="t">Film Production</span>
                </Fragment>
              )}
            </span>
          </div>

          <div className="content">
            <h1 className="title">
              {props.heading1 ?? (
                <Fragment>
                  <span className="t">
                    Cinematic films crafted with story, mood, and precision.
                  </span>
                </Fragment>
              )}
            </h1>

            <p className="desc">
              {props.content1 ?? (
                <Fragment>
                  <span className="t">
                    Film-led visual production where image, motion, and sound
                    work as one — from concept to final delivery.
                  </span>
                </Fragment>
              )}
            </p>

            <div className="actions">
              <Link href={props.primaryHref} legacyBehavior>
                <a className="btnPrimary">
                  <span className="btnText">
                    {props.primaryLabel ?? (
                      <Fragment>
                        <span className="t">View Film Work</span>
                      </Fragment>
                    )}
                  </span>
                  <span className="arrow">→</span>
                </a>
              </Link>

              <Link href={props.secondaryHref} legacyBehavior>
                <a className="btnGhost">
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
          position: relative;
          width: 100%;
          min-height: 82vh;
          display: flex;
          align-items: stretch;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            radial-gradient(
              1200px 500px at 15% 15%,
              rgba(37, 195, 226, 0.08),
              transparent 60%
            ),
            linear-gradient(
              180deg,
              rgba(18, 18, 18, 0.92),
              rgba(8, 8, 8, 0.96)
            );
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          isolation: isolate;
          margin-top: 18px;
        }

        .bgVideo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .baseOverlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              90deg,
              rgba(5, 5, 5, 0.76) 0%,
              rgba(8, 8, 8, 0.52) 34%,
              rgba(8, 8, 8, 0.2) 60%,
              rgba(5, 5, 5, 0.58) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.28) 0%,
              rgba(0, 0, 0, 0.1) 30%,
              rgba(0, 0, 0, 0.38) 100%
            );
          pointer-events: none;
        }

        .vignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: radial-gradient(
            78% 72% at 32% 40%,
            rgba(0, 0, 0, 0.02) 0%,
            rgba(0, 0, 0, 0.15) 46%,
            rgba(0, 0, 0, 0.52) 100%
          );
          pointer-events: none;
        }

        .glow {
          position: absolute;
          inset: 0;
          z-index: 3;
          background:
            radial-gradient(
              560px 260px at 20% 24%,
              rgba(37, 195, 226, 0.14),
              transparent 70%
            ),
            radial-gradient(
              420px 220px at 82% 78%,
              rgba(255, 255, 255, 0.06),
              transparent 72%
            );
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .grain {
          position: absolute;
          inset: 0;
          z-index: 4;
          opacity: 0.05;
          mix-blend-mode: overlay;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .bottomFade {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 180px;
          z-index: 5;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.18) 48%,
            rgba(0, 0, 0, 0.52) 100%
          );
          pointer-events: none;
        }

        .contentShell {
          position: relative;
          z-index: 6;
          width: 100%;
          display: flex;
          align-items: center;
          padding: clamp(28px, 5vw, 54px);
        }

        .content {
          width: 100%;
          max-width: 640px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 26px 0;
        }

        .eyebrowWrap {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .eyebrowLine {
          width: 44px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(37, 195, 226, 0.95),
            rgba(37, 195, 226, 0.22)
          );
          box-shadow: 0 0 18px rgba(37, 195, 226, 0.28);
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.045);
          color: rgba(245, 244, 244, 0.88);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 12px 26px rgba(0, 0, 0, 0.24);
        }

        .title {
          margin: 0;
          font-size: clamp(38px, 6vw, 68px);
          line-height: 0.97;
          letter-spacing: -0.04em;
          color: #f5f4f4;
          text-shadow:
            0 18px 45px rgba(0, 0, 0, 0.42),
            0 2px 8px rgba(0, 0, 0, 0.22);
          max-width: 11ch;
        }

        .desc {
          margin: 0;
          margin-top: 8px;
          max-width: 56ch;
          color: rgba(245, 244, 244, 0.82);
          font-size: 15px;
          line-height: 1.78;
          text-shadow: 0 8px 24px rgba(0, 0, 0, 0.32);
        }

        .actions {
          margin-top: 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btnPrimary,
        .btnGhost {
          min-height: 46px;
          padding: 0 18px 0 20px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none !important;
          white-space: nowrap;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }

        .btnPrimary {
          color: #f5f4f4;
          border: 1px solid rgba(37, 195, 226, 0.42);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.08)
          );
          box-shadow:
            0 18px 30px rgba(0, 0, 0, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .btnPrimary:hover {
          transform: translateY(-2px);
          border-color: rgba(37, 195, 226, 0.68);
          box-shadow:
            0 24px 36px rgba(0, 0, 0, 0.34),
            0 0 0 1px rgba(37, 195, 226, 0.08);
        }

        .btnGhost {
          color: rgba(245, 244, 244, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.045);
          box-shadow:
            0 16px 28px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(8px);
        }

        .btnGhost:hover {
          transform: translateY(-2px);
          border-color: rgba(37, 195, 226, 0.42);
          background: rgba(37, 195, 226, 0.08);
        }

        .btnText {
          display: inline-flex;
          align-items: center;
        }

        .arrow {
          color: #25c3e2;
          font-size: 13px;
          transform: translateY(-1px);
        }

        .t {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .hero {
            min-height: 76vh;
            border-radius: 22px;
          }

          .content {
            max-width: 580px;
          }

          .title {
            max-width: 12ch;
          }
        }

        @media (max-width: 767px) {
          .hero {
            min-height: 78vh;
            border-radius: 18px;
            margin-top: 12px;
          }

          .baseOverlay {
            background:
              linear-gradient(
                180deg,
                rgba(7, 7, 7, 0.36) 0%,
                rgba(7, 7, 7, 0.3) 18%,
                rgba(7, 7, 7, 0.58) 60%,
                rgba(7, 7, 7, 0.8) 100%
              ),
              linear-gradient(
                90deg,
                rgba(7, 7, 7, 0.58) 0%,
                rgba(7, 7, 7, 0.22) 50%,
                rgba(7, 7, 7, 0.58) 100%
              );
          }

          .contentShell {
            align-items: flex-end;
            padding: 18px 16px 22px;
          }

          .content {
            max-width: 100%;
            width: 100%;
            padding: 18px 0 8px;
            text-align: center;
            align-items: center;
            gap: 12px;
          }

          .eyebrowWrap {
            justify-content: center;
            margin-bottom: 8px;
          }

          .title {
            max-width: 100%;
            font-size: clamp(32px, 9vw, 46px);
            line-height: 1.02;
          }

          .desc {
            max-width: 34ch;
            font-size: 14px;
            line-height: 1.7;
          }

          .actions {
            width: 100%;
            justify-content: center;
            gap: 10px;
            margin-top: 14px;
          }

          .btnPrimary,
          .btnGhost {
            width: 100%;
            max-width: 520px;
          }
        }

        @media (max-width: 479px) {
          .hero {
            min-height: 74vh;
          }

          .eyebrow {
            font-size: 9px;
            letter-spacing: 0.18em;
          }

          .btnPrimary,
          .btnGhost {
            min-height: 44px;
            padding: 0 16px;
            font-size: 10px;
            letter-spacing: 0.16em;
          }
        }
      `}</style>
    </>
  )
}

ServiceFilmHero.defaultProps = {
  rootClassName: '',
  videoSrc: '/services/film/servicesfilm-01.mp4',
  heading1: undefined,
  content1: undefined,
  eyebrowText: undefined,

  primaryHref: '/work-film',
  secondaryHref: '/contact',
  primaryLabel: undefined,
  secondaryLabel: undefined,
}

ServiceFilmHero.propTypes = {
  rootClassName: PropTypes.string,
  videoSrc: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  eyebrowText: PropTypes.element,

  primaryHref: PropTypes.string,
  secondaryHref: PropTypes.string,
  primaryLabel: PropTypes.element,
  secondaryLabel: PropTypes.element,
}

export default ServiceFilmHero