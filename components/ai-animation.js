import React, { Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const AIAnimation = (props) => {
  const images = (props.images && props.images.length ? props.images : []).filter(
    Boolean
  )

  // Fallback so it never breaks
  const hero = props.heroImageSrc || images[0] || '/work/animation/waaia-01.jpg'

  // Build long rows (repeat the array a few times to avoid empty space)
  const row1 = [...images, ...images, ...images]
  const row2 = [...images.slice().reverse(), ...images.slice().reverse(), ...images.slice().reverse()]

  return (
    <>
      <section className={`aiWrap ${props.rootClassName || ''}`}>
        {/* ===== TOP: CINEMATIC HERO CARD ===== */}
        <div className="hero thq-section-padding">
          <div className="heroMax thq-section-max-width">
            <div className="heroCard">
              <div className="heroBg" aria-hidden="true">
                <div className="heroImg" style={{ backgroundImage: `url(${hero})` }} />
                <div className="heroVignette" />
                <div className="heroGrain" />
              </div>

              <div className="heroInner">
                <div className="kickerRow">
                  <span className="kicker">AI / ANIMATION</span>
                  <span className="kickerLine" />
                </div>

                <h2 className="thq-heading-2 heroTitle">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="ai-animation-text2">AI &amp; Animation</span>
                    </Fragment>
                  )}
                </h2>

                <p className="thq-body-large heroDesc">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="ai-animation-text1">
                        AI-driven visuals developed with cinematic restraint — atmosphere first,
                        movement second. These experiments explore light, texture, and rhythm as a
                        narrative language.
                      </span>
                    </Fragment>
                  )}
                </p>

                <div className="heroActions">
                  <Link href="/services-animation" legacyBehavior>
                    <a className="btnPrimary thq-body-small">
                      {props.action1 ?? (
                        <Fragment>
                          <span className="ai-animation-text3">Get Started</span>
                        </Fragment>
                      )}
                    </a>
                  </Link>

                  <Link href="/work-animation" legacyBehavior>
                    <a className="btnGhost thq-body-small">
                      {props.action2 ?? (
                        <Fragment>
                          <span className="ai-animation-text4">Learn More</span>
                        </Fragment>
                      )}
                    </a>
                  </Link>
                </div>

                <div className="micro thq-body-small">Curated frames. Controlled motion. Premium finish.</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM: CINEMATIC MARQUEE WALL ===== */}
        <div className="marqueeZone" aria-hidden="true">
          <div className="marqueeVignette" />
          <div className="marqueeGrain" />

          {/* Row 1 */}
          <div className="row">
            <div className="track">
              {row1.map((src, i) => (
                <div className="tile" key={`r1a-${i}`}>
                  <img src={src} alt="AI Animation preview" />
                </div>
              ))}
            </div>
            <div className="track" aria-hidden="true">
              {row1.map((src, i) => (
                <div className="tile" key={`r1b-${i}`}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 reverse */}
          <div className="row reverse">
            <div className="track">
              {row2.map((src, i) => (
                <div className="tile" key={`r2a-${i}`}>
                  <img src={src} alt="AI Animation preview" />
                </div>
              ))}
            </div>
            <div className="track" aria-hidden="true">
              {row2.map((src, i) => (
                <div className="tile" key={`r2b-${i}`}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .aiWrap {
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ================= HERO ================= */
        .hero {
          width: 100%;
          position: relative;
          z-index: 2;
        }
        .heroCard {
          position: relative;
          width: 100%;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }
        .heroBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .heroImg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.03);
          filter: saturate(0.92) contrast(1.08) brightness(0.74);
        }
        .heroVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 60% at 50% 22%,
              rgba(0, 0, 0, 0.06),
              rgba(0, 0, 0, 0.72)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.78) 0%,
              rgba(0, 0, 0, 0.4) 55%,
              rgba(0, 0, 0, 0.78) 100%
            );
        }
        .heroGrain {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .heroInner {
          position: relative;
          z-index: 1;
          padding: 28px 26px 22px;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kickerRow {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
        }
        .kickerLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.16),
            rgba(245, 244, 244, 0)
          );
        }

        .heroTitle {
          margin: 0;
          line-height: 1.08;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }
        .heroDesc {
          margin: 0;
          color: rgba(245, 244, 244, 0.84);
          line-height: 1.7;
          max-width: 64ch;
        }

        .heroActions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 2px;
        }
        .btnPrimary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          border-radius: 999px;
          text-decoration: none;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: linear-gradient(
            180deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0.06)
          );
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          transition: transform 200ms ease, border-color 200ms ease;
        }
        .btnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(160, 196, 255, 0.26);
        }

        .btnGhost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          border-radius: 999px;
          text-decoration: none;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(10px);
          transition: transform 200ms ease, border-color 200ms ease;
        }
        .btnGhost:hover {
          transform: translateY(-1px);
          border-color: rgba(245, 244, 244, 0.22);
        }

        .micro {
          margin-top: 6px;
          color: rgba(245, 244, 244, 0.62);
        }

        /* ================= MARQUEE ================= */
        .marqueeZone {
          width: 100%;
          position: relative;
          z-index: 1;
          padding: 6px 0 22px;
        }

        .marqueeVignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0) 35%,
            rgba(0, 0, 0, 0.85) 100%
          );
          opacity: 0.9;
        }

        .marqueeGrain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.06;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .row {
          width: 100%;
          display: flex;
          gap: 16px;
          overflow: hidden;
          padding: 8px 0;
          mask-image: linear-gradient(
            90deg,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .track {
          display: flex;
          gap: 16px;
          animation: scrollX 28s linear infinite;
          will-change: transform;
        }

        .reverse .track {
          animation-direction: reverse;
          animation-duration: 32s;
        }

        .tile {
          width: 260px;
          height: 260px;
          flex: 0 0 auto;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(12, 12, 12, 0.4);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
        }

        .tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          filter: saturate(0.92) contrast(1.06) brightness(0.78);
          transition: transform 300ms ease;
        }

        .tile:hover img {
          transform: scale(1.06);
        }

        @keyframes scrollX {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 8px));
          }
        }

        @media (max-width: 767px) {
          .heroInner {
            padding: 20px 16px 16px;
          }
          .tile {
            width: 210px;
            height: 210px;
          }
        }

        @media (max-width: 479px) {
          .heroActions {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }
          .btnPrimary,
          .btnGhost {
            width: 100%;
          }
          .tile {
            width: 180px;
            height: 180px;
            border-radius: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .track {
            animation: none;
          }
          .tile img {
            transition: none;
          }
        }
      `}</style>
    </>
  )
}

AIAnimation.defaultProps = {
  rootClassName: '',

  heading1: undefined,
  content1: undefined,
  action1: undefined,
  action2: undefined,

  heroImageSrc: '/work/animation/waaia-01.jpg',

  // ✅ add all your images here
  images: [
    '/work/animation/waaia-01.jpg',
    '/work/animation/waaia-02.jpg',
    '/work/animation/waaia-03.jpg',
    '/work/animation/waaia-04.jpg',
    '/work/animation/waaia-05.jpg',
    '/work/animation/waaia-06.jpg',
  ],
}

AIAnimation.propTypes = {
  rootClassName: PropTypes.string,

  heading1: PropTypes.element,
  content1: PropTypes.element,
  action1: PropTypes.element,
  action2: PropTypes.element,

  heroImageSrc: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
}

export default AIAnimation