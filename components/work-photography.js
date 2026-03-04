import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WorkPhotography = (props) => {
  // ✅ Edit only this list to update images / titles / links
  // Put images in: /public/work/photography/wp-01.jpg (etc)
  const ITEMS = useMemo(
    () => [
      {
        key: 'feature1',
        img: '/work/photography/wp-01.jpg',
        alt: 'Cinematic gallery',
        title: 'Cinematic gallery',
        desc:
          'A mood-driven selection shaped by light, texture, and cinematic framing.',
        href: '/work-photography/cinematic',
        cta: 'Explore',
      },
      {
        key: 'feature2',
        img: '/work/photography/wp-02.jpg',
        alt: 'Editorial',
        title: 'Editorial',
        desc:
          'Editorial storytelling with a clean visual language and strong narrative rhythm.',
        href: '/work-photography/editorial',
        cta: 'Discover',
      },
      {
        key: 'feature3',
        img: '/work/photography/wp-03.jpg',
        alt: 'Personal projects',
        title: 'Personal projects',
        desc:
          'Personal explorations, experiments, and long-form photographic studies.',
        href: '/work-photography/personal',
        cta: 'View',
      },
      {
        key: 'feature4',
        img: '/work/photography/wp-04.jpg',
        alt: 'Stock previews',
        title: 'Stock previews',
        desc:
          'Curated previews available for licensing — cohesive sets and standalone frames.',
        href: '/work-photography/stock',
        cta: 'Browse',
      },
    ],
    []
  )

  // ✅ Cinematic hero background
  const hero = props.heroImageSrc || ITEMS?.[0]?.img || '/work/photography/wp-01.jpg'

  const sectionTitleNode =
    props.sectionTitle ?? (
      <Fragment>
        <span className="titleText">Photography</span>
      </Fragment>
    )

  const descriptionNode =
    props.text ?? (
      <Fragment>
        <span>
          This archive brings together photographic work shaped by light,
          atmosphere, and quiet observation. Each image is created with a
          cinematic sensibility — focused on mood, texture, and the emotional
          weight of a moment.
          <br />
          <br />
          The collection spans personal exploration, editorial storytelling, and
          curated imagery available for licensing, presented as distinct but
          connected bodies of work.
        </span>
      </Fragment>
    )

  return (
    <>
      <section className="wrap thq-section-padding">
        <div className="shell thq-section-max-width">
          {/* ===== CINEMATIC HERO CARD (like AIAnimation) ===== */}
          <div className="heroCard">
            <div className="heroBg" aria-hidden="true">
              <div className="heroImg" style={{ backgroundImage: `url(${hero})` }} />
              <div className="heroVignette" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">WORK / PHOTOGRAPHY</span>
                <span className="kickerLine" />
              </div>

              <h2 className="thq-heading-2 heroTitle">{sectionTitleNode}</h2>

              <p className="thq-body-large heroDesc">{descriptionNode}</p>

              <div className="micro thq-body-small">
                Mood-first imagery • Cinematic restraint • Premium finish
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
                    <div className="badge">Photography</div>
                  </a>
                </Link>

                <div className="body">
                  <div className="top">
                    <h3 className="cardTitle thq-heading-3">{it.title}</h3>
                    <p className="cardDesc thq-body-small">{it.desc}</p>
                  </div>

                  <div className="actions">
                    <Link href={it.href} legacyBehavior>
                      <a className="btn">
                        <span className="thq-body-small">{it.cta}</span>
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

        /* ================= HERO CARD ================= */
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
          filter: saturate(0.92) contrast(1.08) brightness(0.72);
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
          padding: 26px 24px 20px;
          max-width: 980px;
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

        .titleText {
          display: inline-block;
          letter-spacing: 0.2px;
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
          max-width: 70ch;
        }

        .micro {
          margin-top: 4px;
          color: rgba(245, 244, 244, 0.62);
        }

        /* ================= GRID ================= */
        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 18px;
          margin-top: 10px;
        }

        .card {
          grid-column: span 3;
          border: 1px solid rgba(245, 244, 244, 0.1);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(34, 34, 34, 0.35);
          backdrop-filter: blur(10px);
          transition: transform 0.18s ease, border-color 0.18s ease,
            box-shadow 0.18s ease;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }

        .card:hover {
          transform: translateY(-3px);
          border-color: rgba(120, 166, 255, 0.35);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
        }

        .media {
          position: relative;
          display: block;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: rgba(0, 0, 0, 0.25);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.28s ease;
        }

        .card:hover .img {
          transform: scale(1.07);
        }

        .shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.0),
            rgba(0, 0, 0, 0.55)
          );
          pointer-events: none;
        }

        .badge {
          position: absolute;
          left: 12px;
          top: 12px;
          font-size: 12px;
          letter-spacing: 0.3px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(8px);
        }

        .body {
          padding: 14px 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
          flex: 1;
        }

        .top {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cardTitle {
          margin: 0;
          text-align: left;
        }

        .cardDesc {
          margin: 0;
          opacity: 0.86;
          line-height: 1.55;
          text-align: left;
        }

        .actions {
          display: flex;
          justify-content: flex-start;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.06);
          text-decoration: none;
          transition: transform 0.15s ease, border-color 0.15s ease,
            background 0.15s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.45);
          background: rgba(120, 166, 255, 0.12);
        }

        .icon {
          width: 18px;
          height: 18px;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .card {
            grid-column: span 6;
          }
        }

        @media (max-width: 767px) {
          .heroInner {
            padding: 20px 16px 16px;
          }
          .grid {
            gap: 14px;
          }
          .card {
            grid-column: span 12;
          }
        }
      `}</style>
    </>
  )
}

WorkPhotography.defaultProps = {
  sectionTitle: undefined,
  text: undefined,
  heroImageSrc: '/work/photography/wp-01.jpg',
}

WorkPhotography.propTypes = {
  sectionTitle: PropTypes.element,
  text: PropTypes.element,
  heroImageSrc: PropTypes.string,
}

export default WorkPhotography