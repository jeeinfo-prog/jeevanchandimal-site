// components/work-film-commercial.js
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkFilmCommercial = (props) => {
  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* top line */}
          <div className="kickerRow">
            <span className="kicker">WORK</span>
            <span className="dot" aria-hidden="true" />
            <span className="kickerSub">Commercial · Mood-first storytelling</span>
          </div>

          <header className="head">
            <h2 className="title thq-heading-2">
              {props.sectionTitle ?? (
                <Fragment>
                  <span>Commercial</span>
                </Fragment>
              )}
            </h2>

            <p className="desc thq-body-large">
              {props.text ?? (
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
              )}
            </p>
          </header>

          <div className="grid">
            <Card
              href={props.feature1Href}
              img={props.feature1ImageSrc}
              imgAlt={props.feature1ImageAlt}
              over={props.feature1Slogan}
              title={props.feature1Title}
              desc={props.feature1Description}
              cta={props.feature1Button}
              fallbackTitle="Commercial 01"
              fallbackDesc="Cinematic brand film with mood-forward pacing and quiet detail."
            />
            <Card
              href={props.feature2Href}
              img={props.feature2ImageSrc}
              imgAlt={props.feature2ImageAlt}
              over={props.feature2Slogan}
              title={props.feature2Title}
              desc={props.feature2Description}
              cta={props.feature2Button}
              fallbackTitle="Commercial 02"
              fallbackDesc="Story-led visual language designed for clarity across platforms."
            />
            <Card
              href={props.feature3Href}
              img={props.feature3ImageSrc}
              imgAlt={props.feature3ImageAlt}
              over={props.feature3Slogan}
              title={props.feature3Title}
              desc={props.feature3Description}
              cta={props.feature3Button}
              fallbackTitle="Commercial 03"
              fallbackDesc="A restrained approach — rhythm, lighting, and emotional presence."
            />
            <Card
              href={props.feature4Href}
              img={props.feature4ImageSrc}
              imgAlt={props.feature4ImageAlt}
              over={props.feature4Slogan}
              title={props.feature4Title}
              desc={props.feature4Description}
              cta={props.feature4Button}
              fallbackTitle="Commercial 04"
              fallbackDesc="Designed to feel premium, grounded, and visually consistent."
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* subtle luxury glass */
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

        .kickerRow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          opacity: 0.9;
          flex-wrap: wrap;
          text-align: center;
        }

        .kicker {
          letter-spacing: 0.28em;
          font-size: 11px;
          font-weight: 800;
          color: rgba(245, 244, 244, 0.82);
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

        .head {
          max-width: 920px;
          margin: 0 auto 8px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .title {
          margin: 0;
          color: #f5f4f4;
          text-shadow: 0 14px 38px rgba(0, 0, 0, 0.35);
        }

        .desc {
          margin: 0;
          color: rgba(245, 244, 244, 0.82);
          line-height: 1.75;
        }

        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
        }

        @media (max-width: 991px) {
          .grid {
            gap: 14px;
          }
        }

        @media (max-width: 767px) {
          .kickerRow {
            justify-content: flex-start;
            text-align: left;
          }
          .head {
            text-align: left;
            margin: 0;
          }
        }
      `}</style>
    </>
  )
}

function Card({
  href,
  img,
  imgAlt,
  over,
  title,
  desc,
  cta,
  fallbackTitle,
  fallbackDesc,
}) {
  const Wrapper = href ? 'a' : 'div'
  const wrapperProps = href
    ? { href, className: 'card', rel: 'noreferrer', 'aria-label': fallbackTitle }
    : { className: 'card' }

  return (
    <>
      <Wrapper {...wrapperProps}>
        <div className="media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="img" src={img} alt={imgAlt || fallbackTitle} loading="lazy" />
          <div className="shade" aria-hidden="true" />
          <div className="topLine">
            <span className="pill">
              {over ?? (
                <Fragment>
                  <span>Commercial</span>
                </Fragment>
              )}
            </span>
          </div>
        </div>

        <div className="body">
          <h3 className="h thq-heading-3">
            {title ?? (
              <Fragment>
                <span>{fallbackTitle}</span>
              </Fragment>
            )}
          </h3>

          <p className="p thq-body-small">
            {desc ?? (
              <Fragment>
                <span>{fallbackDesc}</span>
              </Fragment>
            )}
          </p>

          <div className="actions">
            <span className="cta">
              {cta ?? (
                <Fragment>
                  <span>Learn more</span>
                </Fragment>
              )}
            </span>
            <svg viewBox="0 0 1024 1024" className="icon" aria-hidden="true">
              <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
            </svg>
          </div>
        </div>
      </Wrapper>

      <style jsx>{`
        .card {
          grid-column: span 3;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.52);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transform: translateZ(0);
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
          min-height: 100%;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 26px 60px rgba(0, 0, 0, 0.55);
        }

        .media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: rgba(255, 255, 255, 0.03);
          overflow: hidden;
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

        .card:hover .img {
          transform: scale(1.08);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.12),
            rgba(0, 0, 0, 0.62)
          );
        }

        .topLine {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .pill {
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.1);
          color: #25c3e2;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .body {
          padding: 14px 14px 16px;
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
          margin-top: 6px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.04);
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }

        .card:hover .actions {
          border-color: rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.08);
          transform: translateY(-1px);
        }

        .cta {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.9);
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

        @media (max-width: 520px) {
          .card {
            grid-column: span 12;
          }
        }
      `}</style>
    </>
  )
}

WorkFilmCommercial.defaultProps = {
  rootClassName: '',

  sectionTitle: undefined,
  text: undefined,

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