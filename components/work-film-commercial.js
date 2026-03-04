// components/work-film-commercial.js
import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WorkFilmCommercial = (props) => {
  // ✅ Update only these defaults via props, or keep as-is
  const ITEMS = useMemo(
    () => [
      {
        key: 'feature1',
        img: props.feature1ImageSrc,
        alt: props.feature1ImageAlt || 'Commercial 01',
        title: props.feature1Title,
        desc: props.feature1Description,
        href: props.feature1Href,
        cta: props.feature1Button,
        pill: props.feature1Slogan,
        fallbackTitle: 'Commercial 01',
        fallbackDesc:
          'Cinematic brand film with mood-forward pacing and quiet detail.',
      },
      {
        key: 'feature2',
        img: props.feature2ImageSrc,
        alt: props.feature2ImageAlt || 'Commercial 02',
        title: props.feature2Title,
        desc: props.feature2Description,
        href: props.feature2Href,
        cta: props.feature2Button,
        pill: props.feature2Slogan,
        fallbackTitle: 'Commercial 02',
        fallbackDesc:
          'Story-led visual language designed for clarity across platforms.',
      },
      {
        key: 'feature3',
        img: props.feature3ImageSrc,
        alt: props.feature3ImageAlt || 'Commercial 03',
        title: props.feature3Title,
        desc: props.feature3Description,
        href: props.feature3Href,
        cta: props.feature3Button,
        pill: props.feature3Slogan,
        fallbackTitle: 'Commercial 03',
        fallbackDesc:
          'A restrained approach — rhythm, lighting, and emotional presence.',
      },
      {
        key: 'feature4',
        img: props.feature4ImageSrc,
        alt: props.feature4ImageAlt || 'Commercial 04',
        title: props.feature4Title,
        desc: props.feature4Description,
        href: props.feature4Href,
        cta: props.feature4Button,
        pill: props.feature4Slogan,
        fallbackTitle: 'Commercial 04',
        fallbackDesc:
          'Designed to feel premium, grounded, and visually consistent.',
      },
    ],
    [
      props.feature1ImageSrc,
      props.feature2ImageSrc,
      props.feature3ImageSrc,
      props.feature4ImageSrc,
      props.feature1ImageAlt,
      props.feature2ImageAlt,
      props.feature3ImageAlt,
      props.feature4ImageAlt,
      props.feature1Title,
      props.feature2Title,
      props.feature3Title,
      props.feature4Title,
      props.feature1Description,
      props.feature2Description,
      props.feature3Description,
      props.feature4Description,
      props.feature1Href,
      props.feature2Href,
      props.feature3Href,
      props.feature4Href,
      props.feature1Button,
      props.feature2Button,
      props.feature3Button,
      props.feature4Button,
      props.feature1Slogan,
      props.feature2Slogan,
      props.feature3Slogan,
      props.feature4Slogan,
    ]
  )

  // ✅ Hero uses first item image unless overridden
  const hero =
    props.heroImageSrc || ITEMS?.[0]?.img || '/work/film/wfc-01.jpg'

  const sectionTitleNode =
    props.sectionTitle ?? (
      <Fragment>
        <span className="titleText">Commercial</span>
      </Fragment>
    )

  const descriptionNode =
    props.text ?? (
      <Fragment>
        <span>
          Brand-led films created with cinematic language rather than advertising
          conventions. These projects focus on mood, clarity, and narrative presence —
          translating identity into visual stories that feel natural and considered.
          <br />
          <br />
          Each commercial is crafted to connect emotionally while maintaining visual
          integrity across platforms.
        </span>
      </Fragment>
    )

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* ===== CINEMATIC HERO (title + prop text area) ===== */}
          <div className="heroCard">
            <div className="heroBg" aria-hidden="true">
              <div className="heroImg" style={{ backgroundImage: `url(${hero})` }} />
              <div className="heroVignette" />
              <div className="heroGlow" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">WORK</span>
                <span className="dot" aria-hidden="true" />
                <span className="kickerSub">Commercial · Mood-first storytelling</span>
              </div>

              <h2 className="thq-heading-2 heroTitle">{sectionTitleNode}</h2>

              <p className="thq-body-large heroDesc">{descriptionNode}</p>

              <div className="micro thq-body-small">
                Cinematic restraint • Premium finish • Story-led clarity
              </div>
            </div>
          </div>

          {/* ===== GRID ===== */}
          <div className="grid">
            {ITEMS.map((it) => (
              <FilmCard key={it.key} item={it} />
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

        /* subtle luxury glass behind section */
        .wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              70% 60% at 50% 0%,
              rgba(37, 195, 226, 0.06),
              rgba(0, 0, 0, 0)
            ),
            linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0));
          opacity: 0.9;
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
          filter: saturate(0.92) contrast(1.1) brightness(0.68);
        }

        .heroVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              90% 70% at 50% 18%,
              rgba(0, 0, 0, 0.06),
              rgba(0, 0, 0, 0.74)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.42) 55%,
              rgba(0, 0, 0, 0.82) 100%
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
        }

        .kicker {
          letter-spacing: 0.28em;
          font-size: 11px;
          font-weight: 800;
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
          color: rgba(245, 244, 244, 0.84);
          line-height: 1.7;
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
          gap: 18px;
          margin-top: 6px;
        }

        @media (max-width: 991px) {
          .grid {
            gap: 14px;
          }
        }

        @media (max-width: 767px) {
          .heroInner {
            padding: 20px 16px 16px;
          }
        }
      `}</style>
    </>
  )
}

function FilmCard({ item }) {
  const {
    href,
    img,
    alt,
    title,
    desc,
    cta,
    pill,
    fallbackTitle,
    fallbackDesc,
  } = item

  const hasHref = Boolean(href)
  const cardTitleNode = title ?? (
    <Fragment>
      <span>{fallbackTitle}</span>
    </Fragment>
  )
  const cardDescNode = desc ?? (
    <Fragment>
      <span>{fallbackDesc}</span>
    </Fragment>
  )
  const pillNode = pill ?? (
    <Fragment>
      <span>Commercial</span>
    </Fragment>
  )
  const ctaNode = cta ?? (
    <Fragment>
      <span>Explore</span>
    </Fragment>
  )

  return (
    <>
      <article className="card">
        {hasHref ? (
          <Link href={href || '#'} legacyBehavior>
            <a className="cardLink" aria-label={fallbackTitle}>
              <Media img={img} alt={alt || fallbackTitle} pill={pillNode} />
              <Body title={cardTitleNode} desc={cardDescNode} cta={ctaNode} />
            </a>
          </Link>
        ) : (
          <div className="cardLink" aria-label={fallbackTitle}>
            <Media img={img} alt={alt || fallbackTitle} pill={pillNode} />
            <Body title={cardTitleNode} desc={cardDescNode} cta={ctaNode} />
          </div>
        )}
      </article>

      <style jsx>{`
        .card {
          grid-column: span 3;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.42);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          min-height: 100%;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 26px 60px rgba(0, 0, 0, 0.55);
        }

        .cardLink {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          height: 100%;
        }

        @media (max-width: 991px) {
          .card {
            grid-column: span 6;
          }
        }

        @media (max-width: 520px) {
          .card {
            grid-column: span 12;
          }
        }
      `}</style>
    </>
  )
}

function Media({ img, alt, pill }) {
  return (
    <>
      <div className="media">
        <div className="mediaFrame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="img" src={img} alt={alt} loading="lazy" />
          <div className="shade" aria-hidden="true" />
          <div className="innerStroke" aria-hidden="true" />
        </div>

        <div className="topLine">
          <span className="pill">{pill}</span>
        </div>
      </div>

      <style jsx>{`
        .media {
          position: relative;
          width: 100%;
          padding: 14px 14px 0;
        }

        /* ✅ curved box that contains the image (like your Photography cards) */
        .mediaFrame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.35s ease;
          filter: brightness(0.78) contrast(1.05) saturate(0.9);
        }

        :global(.card:hover) .img {
          transform: scale(1.08);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0.62)
          );
        }

        .innerStroke {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 16px;
          box-shadow: inset 0 0 0 1px rgba(245, 244, 244, 0.08);
        }

        .topLine {
          position: absolute;
          top: 24px;
          left: 24px;
          right: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          pointer-events: none;
        }

        .pill {
          pointer-events: auto;
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.1);
          color: #25c3e2;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }
      `}</style>
    </>
  )
}

function Body({ title, desc, cta }) {
  return (
    <>
      <div className="body">
        <div className="copy">
          <h3 className="h thq-heading-3">{title}</h3>
          <p className="p thq-body-small">{desc}</p>
        </div>

        <div className="actions">
          <span className="cta">
            {cta}
            <svg viewBox="0 0 1024 1024" className="icon" aria-hidden="true">
              <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
            </svg>
          </span>
        </div>
      </div>

      <style jsx>{`
        .body {
          padding: 12px 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .copy {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .h {
          margin: 0;
          color: rgba(245, 244, 244, 0.92);
          letter-spacing: 0.02em;
        }

        .p {
          margin: 0;
          color: rgba(245, 244, 244, 0.76);
          line-height: 1.65;
        }

        .actions {
          display: flex;
          justify-content: flex-start;
          margin-top: 2px;
        }

        .cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
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
        }

        :global(.card:hover) .cta {
          border-color: rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.08);
          transform: translateY(-1px);
        }

        .icon {
          width: 18px;
          height: 18px;
          opacity: 0.9;
        }
      `}</style>
    </>
  )
}

WorkFilmCommercial.defaultProps = {
  rootClassName: '',

  sectionTitle: undefined,
  text: undefined,

  // ✅ optional hero override (defaults to feature1 image)
  heroImageSrc: '/work/film/wfc-01.jpg',

  // ✅ update to your new local images
  feature1ImageSrc: '/work/film/wfc-01.jpg',
  feature2ImageSrc: '/work/film/wfc-02.jpg',
  feature3ImageSrc: '/work/film/wfc-03.jpg',
  feature4ImageSrc: '/work/film/wfc-04.jpg',

  feature1ImageAlt: 'Commercial 01',
  feature2ImageAlt: 'Commercial 02',
  feature3ImageAlt: 'Commercial 03',
  feature4ImageAlt: 'Commercial 04',

  feature1Title: undefined,
  feature2Title: undefined,
  feature3Title: undefined,
  feature4Title: undefined,

  feature1Description: undefined,
  feature2Description: undefined,
  feature3Description: undefined,
  feature4Description: undefined,

  feature1Button: undefined,
  feature2Button: undefined,
  feature3Button: undefined,
  feature4Button: undefined,

  // optional links
  feature1Href: '',
  feature2Href: '',
  feature3Href: '',
  feature4Href: '',

  // optional pill text on each card
  feature1Slogan: undefined,
  feature2Slogan: undefined,
  feature3Slogan: undefined,
  feature4Slogan: undefined,
}

WorkFilmCommercial.propTypes = {
  rootClassName: PropTypes.string,

  sectionTitle: PropTypes.element,
  text: PropTypes.element,

  // ✅ hero support (matches your WorkPhotography style)
  heroImageSrc: PropTypes.string,

  feature1ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature4ImageSrc: PropTypes.string,

  feature1ImageAlt: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  feature4ImageAlt: PropTypes.string,

  feature1Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature3Title: PropTypes.element,
  feature4Title: PropTypes.element,

  feature1Description: PropTypes.element,
  feature2Description: PropTypes.element,
  feature3Description: PropTypes.element,
  feature4Description: PropTypes.element,

  feature1Button: PropTypes.element,
  feature2Button: PropTypes.element,
  feature3Button: PropTypes.element,
  feature4Button: PropTypes.element,

  feature1Href: PropTypes.string,
  feature2Href: PropTypes.string,
  feature3Href: PropTypes.string,
  feature4Href: PropTypes.string,

  feature1Slogan: PropTypes.element,
  feature2Slogan: PropTypes.element,
  feature3Slogan: PropTypes.element,
  feature4Slogan: PropTypes.element,
}

export default WorkFilmCommercial