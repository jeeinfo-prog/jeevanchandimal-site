import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WhatIDoAnimationServices = (props) => {
  // ✅ Edit this list only to update services
  const ITEMS = useMemo(
    () => [
      {
        key: 'feature1',
        img: '/services/animation/swid-01.jpg',
        alt: 'Motion Graphics',
        title: 'Motion Graphics',
        desc:
          'Clean, intentional motion designed to elevate brand communication and cinematic storytelling.',
        href: '/services/animation/motion-graphics',
        cta: 'Explore',
      },
      {
        key: 'feature2',
        img: '/services/animation/swid-02.jpg',
        alt: '2D & 3D Animation',
        title: '2D & 3D Animation',
        desc:
          'Structured animation built with pacing, clarity, and visual depth.',
        href: '/services/animation/2d-3d',
        cta: 'Discover',
      },
      {
        key: 'feature3',
        img: '/services/animation/swid-03.jpg',
        alt: 'Title Sequences',
        title: 'Title Sequences',
        desc:
          'Opening visuals crafted to establish tone, rhythm, and cinematic atmosphere.',
        href: '/services/animation/title-sequences',
        cta: 'View',
      },
      {
        key: 'feature4',
        img: '/services/animation/swid-04.jpg',
        alt: 'Visual Story Support',
        title: 'Visual Story Support',
        desc:
          'Motion elements seamlessly integrated with film and photography.',
        href: '/services/animation/visual-support',
        cta: 'Browse',
      },
    ],
    []
  )

  const hero =
    props.heroImageSrc || ITEMS?.[0]?.img || '/services/animation/swid-01.jpg'

  const sectionTitleNode =
    props.sectionTitle ?? (
      <Fragment>
        <span className="titleText">Animation Services</span>
      </Fragment>
    )

  const descriptionNode =
    props.text ?? (
      <Fragment>
        <span>
          Motion and animation crafted with cinematic restraint and visual
          clarity. Each project is shaped by atmosphere, rhythm, and emotional
          intent — whether supporting film, brands, or narrative worlds.
        </span>
      </Fragment>
    )

  return (
    <>
      <section className="wrap thq-section-padding">
        <div className="shell thq-section-max-width">

          {/* ===== CINEMATIC HERO CARD ===== */}
          <div className="heroCard">
            <div className="heroBg" aria-hidden="true">
              <div
                className="heroImg"
                style={{ backgroundImage: `url(${hero})` }}
              />
              <div className="heroVignette" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">SERVICES / ANIMATION</span>
                <span className="kickerLine" />
              </div>

              <h2 className="thq-heading-2 heroTitle">
                {sectionTitleNode}
              </h2>

              <p className="thq-body-large heroDesc">
                {descriptionNode}
              </p>

              <div className="micro thq-body-small">
                Cinematic motion • Structured rhythm • Premium finish
              </div>
            </div>
          </div>

          {/* ===== GRID ===== */}
          <div className="grid">
            {ITEMS.map((it) => (
              <article key={it.key} className="card">
                <Link href={it.href} legacyBehavior>
                  <a className="media" aria-label={it.title}>
                    <img className="img" src={it.img} alt={it.alt} />
                    <div className="shade" />
                    <div className="badge">Animation</div>
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
                        <svg viewBox="0 0 1024 1024" className="icon">
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
        }

        .heroImg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.03);
          filter: saturate(0.92) contrast(1.08) brightness(0.72);
        }

        .heroVignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.8)
          );
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
          max-width: 900px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
        }

        .heroTitle {
          margin: 0;
        }

        .heroDesc {
          margin: 0;
          opacity: 0.85;
        }

        .micro {
          opacity: 0.6;
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
          transition: all 0.18s ease;
          display: flex;
          flex-direction: column;
        }

        .card:hover {
          transform: translateY(-3px);
          border-color: rgba(120, 166, 255, 0.35);
        }

        .media {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.28s ease;
        }

        .card:hover .img {
          transform: scale(1.07);
        }

        .shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
        }

        .badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
        }

        .body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
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
        }
      `}</style>
    </>
  )
}

WhatIDoAnimationServices.defaultProps = {
  sectionTitle: undefined,
  text: undefined,
  heroImageSrc: '/services/animation/swid-01.jpg',
}

WhatIDoAnimationServices.propTypes = {
  sectionTitle: PropTypes.element,
  text: PropTypes.element,
  heroImageSrc: PropTypes.string,
}

export default WhatIDoAnimationServices