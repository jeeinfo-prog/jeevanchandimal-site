// components/what-i-do-audio-services.js
import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WhatIDoAudioServices = (props) => {
  // ✅ Edit this list only to update services
  const ITEMS = useMemo(
    () => [
      {
        key: 'feature1',
        img: '/services/audio/sawid-01.jpg',
        alt: 'Sound Design',
        title: 'Sound Design',
        desc:
          'Atmospheric soundscapes that add depth, realism, and cinematic texture to visual stories.',
        href: '/services/audio/sound-design',
        cta: 'Learn More',
        badge: 'Audio',
      },
      {
        key: 'feature2',
        img: '/services/audio/sawid-02.jpg',
        alt: 'Music Composition',
        title: 'Music Composition',
        desc:
          'Original compositions shaped around mood, pacing, and emotional tone.',
        href: '/services/audio/music-composition',
        cta: 'Discover More',
        badge: 'Audio',
      },
      {
        key: 'feature3',
        img: '/services/audio/sawid-03.jpg',
        alt: 'Audio Post-Production',
        title: 'Audio Post-Production',
        desc:
          'Editing, mixing, and refinement focused on clarity, balance, and impact.',
        href: '/services/audio/post-production',
        cta: 'Explore Now',
        badge: 'Audio',
      },
      {
        key: 'feature4',
        img: '/services/audio/sawid-04.jpg',
        alt: 'Film & Visual Audio',
        title: 'Film & Visual Audio',
        desc:
          'Sound crafted specifically to complement cinematic visuals and narrative flow.',
        href: '/services/audio/film-visual-audio',
        cta: 'View Portfolio',
        badge: 'Audio',
      },
    ],
    []
  )

  const hero =
    props.heroImageSrc || ITEMS?.[0]?.img || '/services/audio/sawid-01.jpg'

  const sectionTitleNode =
    props.sectionTitle ?? (
      <Fragment>
        <span className="titleText">What I Do</span>
      </Fragment>
    )

  const descriptionNode =
    props.text ?? (
      <Fragment>
        <span>
          Audio shaped with cinematic restraint and emotional clarity —
          from immersive sound design to original composition and refined
          post-production.
        </span>
      </Fragment>
    )

  const kicker = props.kickerText || 'SERVICES / AUDIO'

  return (
    <>
      <section
        className={`wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="shell thq-section-max-width">
          {/* ===== HERO ===== */}
          <div className="heroCard">
            <div className="heroBg" aria-hidden="true">
              <div
                className="heroImg"
                style={{ backgroundImage: `url(${hero})` }}
              />
              <div className="heroVignette" />
              <div className="heroGlow" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">{kicker}</span>
                <span className="kickerLine" aria-hidden="true" />
              </div>

              <h2 className="thq-heading-2 heroTitle">
                {sectionTitleNode}
              </h2>

              <p className="thq-body-large heroDesc">
                {descriptionNode}
              </p>

              <div className="micro thq-body-small">
                Texture • Space • Sonic precision • Premium finish
              </div>
            </div>
          </div>

          {/* ===== GRID ===== */}
          <div className="grid">
            {ITEMS.map((it) => (
              <article key={it.key} className="card">
                <Link href={it.href} legacyBehavior>
                  <a className="media" aria-label={it.title}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="img"
                      src={it.img}
                      alt={it.alt}
                      loading="lazy"
                    />
                    <div className="shade" />
                    <div className="badge">{it.badge}</div>
                  </a>
                </Link>

                <div className="body">
                  <div className="top">
                    <h3 className="cardTitle thq-heading-3">
                      {it.title}
                    </h3>
                    <p className="cardDesc thq-body-small">
                      {it.desc}
                    </p>
                  </div>

                  <div className="actions">
                    <Link href={it.href} legacyBehavior>
                      <a className="btn">
                        <span className="thq-body-small">
                          {it.cta}
                        </span>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="icon"
                          aria-hidden="true"
                        >
                          <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .shell {
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: relative;
          z-index: 1;
        }

        /* ===== HERO ===== */
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
          filter: saturate(0.92) contrast(1.1) brightness(0.7);
        }

        .heroVignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.85),
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.85)
          );
        }

        .heroGlow {
          position: absolute;
          inset: -40px -60px auto -60px;
          height: 180px;
          background: radial-gradient(
            60% 70% at 50% 50%,
            rgba(37, 195, 226, 0.12),
            rgba(37, 195, 226, 0)
          );
          opacity: 0.85;
          filter: blur(2px);
        }

        .heroGrain {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          mix-blend-mode: overlay;
        }

        .heroInner {
          position: relative;
          z-index: 1;
          padding: 26px 24px;
          max-width: 920px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kickerRow {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          opacity: 0.92;
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
          font-weight: 800;
        }

        .kickerLine {
          height: 1px;
          width: 140px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .heroTitle {
          margin: 0;
          line-height: 1.08;
          color: #f5f4f4;
        }

        .heroDesc {
          margin: 0;
          opacity: 0.88;
          line-height: 1.7;
          max-width: 74ch;
        }

        .micro {
          opacity: 0.65;
        }

        /* ===== GRID ===== */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 18px;
        }

        .card {
          grid-column: span 3;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(34, 34, 34, 0.35);
          backdrop-filter: blur(10px);
          transition: transform 0.18s ease, border-color 0.18s ease,
            box-shadow 0.18s ease;
          display: flex;
          flex-direction: column;
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.42);
        }

        .card:hover {
          transform: translateY(-3px);
          border-color: rgba(37, 195, 226, 0.28);
        }

        .media {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          display: block;
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.28s ease;
          transform: scale(1.02);
        }

        .card:hover .img {
          transform: scale(1.07);
        }

        .shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 0, 0, 0.65)
          );
        }

        .badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          font-weight: 800;
        }

        .body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          gap: 12px;
        }

        .cardTitle {
          margin: 0;
        }

        .cardDesc {
          margin: 8px 0 0;
          opacity: 0.85;
          line-height: 1.6;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.06);
          text-decoration: none;
        }

        @media (max-width: 991px) {
          .card {
            grid-column: span 6;
          }
        }

        @media (max-width: 767px) {
          .card {
            grid-column: span 12;
          }
          .kickerLine {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

WhatIDoAudioServices.defaultProps = {
  sectionTitle: undefined,
  text: undefined,
  heroImageSrc: '/services/audio/sawid-01.jpg',
  rootClassName: '',
  kickerText: 'SERVICES / AUDIO',
}

WhatIDoAudioServices.propTypes = {
  sectionTitle: PropTypes.element,
  text: PropTypes.element,
  heroImageSrc: PropTypes.string,
  rootClassName: PropTypes.string,
  kickerText: PropTypes.string,
}

export default WhatIDoAudioServices