// components/work-film-short-film.js
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkFilmShortFilm = (props) => {
  const items = [
    {
      idx: '01',
      title: props.feature1Title ?? 'Short Film 01',
      desc:
        props.feature1Description ??
        'Atmosphere-led narrative exploring character and silence.',
      img: props.feature1ImageSrc || '/work/film/sf-01.jpg',
      alt: props.feature1ImageAlt || 'Short Film 01',
      href: props.feature1Href || '#',
    },
    {
      idx: '02',
      title: props.feature2Title ?? 'Short Film 02',
      desc:
        props.feature2Description ??
        'Minimal visual storytelling shaped through pacing and space.',
      img: props.feature2ImageSrc || '/work/film/sf-02.jpg',
      alt: props.feature2ImageAlt || 'Short Film 02',
      href: props.feature2Href || '#',
    },
    {
      idx: '03',
      title: props.feature3Title ?? 'Short Film 03',
      desc:
        props.feature3Description ??
        'Conceptual study balancing tone, rhythm, and composition.',
      img: props.feature3ImageSrc || '/work/film/sf-03.jpg',
      alt: props.feature3ImageAlt || 'Short Film 03',
      href: props.feature3Href || '#',
    },
  ]

  const hero = props.heroImageSrc || items?.[0]?.img || '/work/film/sf-01.jpg'

  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span className="titleText">Short Films</span>
      </Fragment>
    )

  const copyNode =
    props.content1 ?? (
      <Fragment>
        <span>
          Narrative and conceptual short films shaped through atmosphere,
          restraint, and emotional tone — built with cinematic pacing and a
          premium finish.
        </span>
      </Fragment>
    )

  return (
    <>
      <section className={`sfWrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* ===== CINEMATIC HERO (title + prop text) ===== */}
          <div className="heroCard">
            <div className="heroBg" aria-hidden="true">
              <div className="heroImg" style={{ backgroundImage: `url(${hero})` }} />
              <div className="heroVignette" />
              <div className="heroGlow" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">FILM</span>
                <span className="dot" aria-hidden="true" />
                <span className="kickerSub">Narrative · Atmosphere · Restraint</span>
              </div>

              <h2 className="thq-heading-2 heroTitle">{headingNode}</h2>
              <p className="thq-body-large heroDesc">{copyNode}</p>

              <div className="micro thq-body-small">
                Mood-forward pacing • Cinematic language • Premium finish
              </div>
            </div>
          </div>

          {/* ===== GRID ===== */}
          <div className="grid">
            {items.map((it) => (
              <ShortCard key={it.idx} item={it} />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .sfWrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* subtle luxury glass / cyan ambience */
        .sfWrap::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              70% 60% at 50% 0%,
              rgba(37, 195, 226, 0.06),
              rgba(0, 0, 0, 0)
            ),
            linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
          opacity: 0.95;
        }

        .shell {
          position: relative;
          z-index: 1;
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
          filter: saturate(0.94) contrast(1.1) brightness(0.66);
        }

        .heroVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              90% 70% at 50% 18%,
              rgba(0, 0, 0, 0.06),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.85) 0%,
              rgba(0, 0, 0, 0.42) 55%,
              rgba(0, 0, 0, 0.85) 100%
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
          opacity: 0.9;
          filter: blur(2px);
        }

        .heroGrain {
          position: absolute;
          inset: 0;
          opacity: 0.085;
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
          flex-wrap: wrap;
          opacity: 0.92;
        }

        .kicker {
          letter-spacing: 0.28em;
          font-size: 11px;
          font-weight: 900;
          color: rgba(245, 244, 244, 0.82);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(37, 195, 226, 0.65);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.1);
        }

        .kickerSub {
          font-size: 12px;
          color: rgba(245, 244, 244, 0.7);
          letter-spacing: 0.08em;
        }

        .titleText {
          display: inline-block;
          letter-spacing: 0.2px;
        }

        .heroTitle {
          margin: 0;
          line-height: 1.08;
          color: #f5f4f4;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .heroDesc {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
          max-width: 72ch;
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
          gap: 14px;
          margin-top: 6px;
        }
      `}</style>
    </>
  )
}

function ShortCard({ item }) {
  const { idx, title, desc, img, alt, href } = item

  const Wrapper = href && href !== '#' ? 'a' : 'div'
  const wrapperProps =
    Wrapper === 'a'
      ? { href, className: 'card', rel: 'noreferrer', 'aria-label': `Open Short Film ${idx}` }
      : { className: 'card', 'aria-label': `Short Film ${idx}` }

  return (
    <>
      <Wrapper {...wrapperProps}>
        {/* ===== curved image box ===== */}
        <div className="media">
          <div className="frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img" src={img} alt={alt || title} loading="lazy" />
            <div className="shade" aria-hidden="true" />
            <div className="innerStroke" aria-hidden="true" />

            <div className="badgeRow">
              <span className="badge">Short Film</span>
              <span className="badgeDot" aria-hidden="true" />
              <span className="badgeNum">{idx}</span>
            </div>
          </div>
        </div>

        <div className="body">
          <h3 className="h thq-heading-3">{title}</h3>
          <p className="p thq-body-small">{desc}</p>

          <div className="actions">
            <span className="cta">
              <span>Explore</span>
              <svg viewBox="0 0 1024 1024" className="icon" aria-hidden="true">
                <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
              </svg>
            </span>
          </div>
        </div>
      </Wrapper>

      <style jsx>{`
        .card {
          grid-column: span 4;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.42);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
          min-height: 100%;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(37, 195, 226, 0.24);
          box-shadow: 0 24px 62px rgba(0, 0, 0, 0.55);
        }

        .media {
          width: 100%;
          padding: 14px 14px 0;
        }

        .frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
          transform: translateZ(0);
        }

        .img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.32s ease, filter 0.32s ease;
          filter: brightness(0.82) contrast(1.05) saturate(0.92);
        }

        .card:hover .img {
          transform: scale(1.07);
          filter: brightness(0.9) contrast(1.08) saturate(0.98);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.74),
            rgba(0, 0, 0, 0.18),
            rgba(0, 0, 0, 0)
          );
        }

        .innerStroke {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 16px;
          box-shadow: inset 0 0 0 1px rgba(245, 244, 244, 0.08);
        }

        .badgeRow {
          position: absolute;
          left: 12px;
          top: 12px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          color: rgba(245, 244, 244, 0.88);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .badge {
          font-weight: 900;
        }

        .badgeDot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(37, 195, 226, 0.7);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.12);
        }

        .badgeNum {
          opacity: 0.95;
        }

        .body {
          padding: 12px 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .h {
          margin: 0;
          color: rgba(245, 244, 244, 0.92);
          letter-spacing: 0.02em;
        }

        .p {
          margin: 0;
          line-height: 1.6;
          color: rgba(245, 244, 244, 0.76);
        }

        .actions {
          margin-top: 4px;
          display: flex;
          justify-content: flex-start;
        }

        .cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.04);
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.9);
          width: fit-content;
        }

        .card:hover .cta {
          border-color: rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.08);
          transform: translateY(-1px);
        }

        .icon {
          width: 18px;
          height: 18px;
          opacity: 0.9;
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

WorkFilmShortFilm.defaultProps = {
  rootClassName: '',
  heading1: undefined,
  content1: undefined,

  heroImageSrc: '/work/film/sf-01.jpg',

  feature1Title: undefined,
  feature2Title: undefined,
  feature3Title: undefined,

  feature1Description: undefined,
  feature2Description: undefined,
  feature3Description: undefined,

  feature1ImageSrc: '/work/film/sf-01.jpg',
  feature2ImageSrc: '/work/film/sf-02.jpg',
  feature3ImageSrc: '/work/film/sf-03.jpg',

  feature1ImageAlt: 'Short Film 01',
  feature2ImageAlt: 'Short Film 02',
  feature3ImageAlt: 'Short Film 03',

  feature1Href: '#',
  feature2Href: '#',
  feature3Href: '#',
}

WorkFilmShortFilm.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,

  heroImageSrc: PropTypes.string,

  feature1Title: PropTypes.string,
  feature2Title: PropTypes.string,
  feature3Title: PropTypes.string,

  feature1Description: PropTypes.string,
  feature2Description: PropTypes.string,
  feature3Description: PropTypes.string,

  feature1ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature3ImageSrc: PropTypes.string,

  feature1ImageAlt: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature3ImageAlt: PropTypes.string,

  feature1Href: PropTypes.string,
  feature2Href: PropTypes.string,
  feature3Href: PropTypes.string,
}

export default WorkFilmShortFilm