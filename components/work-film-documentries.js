// components/work-film-documentries.js
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkFilmDocumentries = (props) => {
  // ✅ hero image (falls back to feature1 image)
  const hero =
    props.heroImageSrc || props.feature1ImageSrc || '/work/film/wfd-01.jpg'

  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span className="titleText">Documentary</span>
      </Fragment>
    )

  const copyNode =
    props.content1 ?? (
      <Fragment>
        <span>
          Observational and story-driven documentary work rooted in authenticity.
          These films prioritize real moments, human presence, and environmental
          context — allowing stories to unfold without forced direction.
          <br />
          <br />
          The emphasis is on patience, trust, and visual honesty.
        </span>
      </Fragment>
    )

  return (
    <>
      <section className={`docWrap thq-section-padding ${props.rootClassName || ''}`}>
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
                <span className="kickerSub">Documentary · Authentic presence</span>
              </div>

              <h2 className="thq-heading-2 heroTitle">{headingNode}</h2>
              <p className="thq-body-large heroDesc">{copyNode}</p>

              <div className="micro thq-body-small">
                Observational pacing • Human presence • Visual honesty
              </div>
            </div>
          </div>

          {/* ===== CARDS ===== */}
          <div className="grid">
            <DocCard
              img={props.feature1ImageSrc}
              alt={props.feature1ImageAlt}
              tag="Documentary"
              title={props.feature1Title}
              desc={props.feature1Description}
              fallbackTitle="Field Film Production"
              fallbackDesc="Natural-light, location-based shooting with a focus on unobtrusive presence and narrative continuity."
            />

            <DocCard
              img={props.feature2ImageSrc}
              alt={props.feature2ImageAlt}
              tag="Sound"
              title={props.feature2Title}
              desc={props.feature2Description}
              fallbackTitle="Location Sound"
              fallbackDesc="Clean dialogue, room tone, and environmental texture — built to preserve realism and emotional clarity."
            />

            <DocCard
              img={props.feature3ImageSrc}
              alt={props.feature3ImageAlt}
              tag="Post"
              title={props.feature3Title}
              desc={props.feature3Description}
              fallbackTitle="Cut · Grade · Finish"
              fallbackDesc="Pacing-led editing with restrained grading — shaped to keep the story honest, grounded, and cinematic."
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .docWrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* subtle luxury glass / cyan ambience */
        .docWrap::before {
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
          filter: saturate(0.92) contrast(1.1) brightness(0.66);
        }

        .heroVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              90% 70% at 50% 18%,
              rgba(0, 0, 0, 0.06),
              rgba(0, 0, 0, 0.76)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.84) 0%,
              rgba(0, 0, 0, 0.42) 55%,
              rgba(0, 0, 0, 0.84) 100%
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
          gap: 14px;
          margin-top: 10px;
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

function DocCard({ img, alt, tag, title, desc, fallbackTitle, fallbackDesc }) {
  return (
    <>
      <article className="card">
        <div className="media">
          {/* ✅ Curved inner image box */}
          <div className="frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img" src={img} alt={alt || fallbackTitle} loading="lazy" />
            <div className="shade" aria-hidden="true" />
            <div className="innerStroke" aria-hidden="true" />
          </div>

          <div className="topLine">
            <div className="tag">{tag}</div>
          </div>
        </div>

        <div className="cardBody">
          <h3 className="cardTitle thq-heading-3">
            {title ?? (
              <Fragment>
                <span>{fallbackTitle}</span>
              </Fragment>
            )}
          </h3>

          <p className="cardDesc thq-body-small">
            {desc ?? (
              <Fragment>
                <span>{fallbackDesc}</span>
              </Fragment>
            )}
          </p>

          <div className="meta thq-body-small">Documentary craft • Premium finish</div>
        </div>
      </article>

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
          min-height: 100%;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(37, 195, 226, 0.22);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.52);
        }

        .media {
          position: relative;
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
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.32s ease;
          filter: contrast(1.05) saturate(0.92) brightness(0.9);
        }

        .card:hover .img {
          transform: scale(1.07);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.68),
            rgba(0, 0, 0, 0.2),
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

        .tag {
          pointer-events: auto;
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.28);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          color: rgba(245, 244, 244, 0.92);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .cardBody {
          padding: 14px 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cardTitle {
          margin: 0;
          color: rgba(245, 244, 244, 0.92);
        }

        .cardDesc {
          margin: 0;
          color: rgba(245, 244, 244, 0.74);
          line-height: 1.65;
        }

        .meta {
          margin-top: 2px;
          color: rgba(245, 244, 244, 0.6);
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

WorkFilmDocumentries.defaultProps = {
  heading1: undefined,
  content1: undefined,
  rootClassName: '',

  // ✅ hero override (optional)
  heroImageSrc: '/work/film/wfd-01.jpg',

  // ✅ update to your new public/work/film files
  feature1ImageSrc: '/work/film/wfd-01.jpg',
  feature2ImageSrc: '/work/film/wfd-02.jpg',
  feature3ImageSrc: '/work/film/wfd-03.jpg',

  feature1ImageAlt: 'Documentary frame 01',
  feature2ImageAlt: 'Documentary frame 02',
  feature3ImageAlt: 'Documentary frame 03',

  feature1Title: undefined,
  feature2Title: undefined,
  feature3Title: undefined,

  feature1Description: undefined,
  feature2Description: undefined,
  feature3Description: undefined,
}

WorkFilmDocumentries.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,

  // ✅ hero support
  heroImageSrc: PropTypes.string,

  feature1ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature3ImageSrc: PropTypes.string,

  feature1ImageAlt: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature3ImageAlt: PropTypes.string,

  feature1Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature3Title: PropTypes.element,

  feature1Description: PropTypes.element,
  feature2Description: PropTypes.element,
  feature3Description: PropTypes.element,
}

export default WorkFilmDocumentries