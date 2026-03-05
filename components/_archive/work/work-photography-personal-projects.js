import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkPhotographyPersonalProjects = (props) => {
  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span>Personal Projects</span>
      </Fragment>
    )

  const descNode =
    props.content1 ?? (
      <Fragment>
        <span>
          Independent photographic work developed through exploration and
          long-form observation. These projects reflect ongoing personal
          interests in nature, landscape, and human presence within space.
        </span>
      </Fragment>
    )

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* ===== CINEMATIC HEADER CARD (same style) ===== */}
          <header className="hero">
            <div className="heroBg" aria-hidden="true">
              <div
                className="heroImg"
                style={{
                  backgroundImage: `url(${
                    props.heroImageSrc ||
                    props.feature1ImageSrc ||
                    '/work/photography/wpp-01.jpg'
                  })`,
                }}
              />
              <div className="heroVignette" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">PHOTOGRAPHY / PERSONAL</span>
                <span className="kickerLine" />
              </div>

              <h2 className="title thq-heading-2">{headingNode}</h2>
              <p className="subtitle thq-body-large">{descNode}</p>

              <div className="micro thq-body-small">
                Mood-first studies · Slow observation · Cinematic restraint
              </div>
            </div>
          </header>

          {/* ===== CARDS ===== */}
          <div className="grid">
            {/* Card 1 */}
            <article className="card">
              <div className="media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="img"
                  loading="lazy"
                />
                <div className="shade" />
                <div className="chip">Series 01</div>
              </div>

              <div className="body">
                <h3 className="cardTitle thq-heading-3">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span>Nature &amp; Atmosphere</span>
                    </Fragment>
                  )}
                </h3>

                <p className="cardDesc thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>
                        Studies of weather, light, and quiet rhythm — built
                        around mood and texture.
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
            </article>

            {/* Card 2 */}
            <article className="card">
              <div className="media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="img"
                  loading="lazy"
                />
                <div className="shade" />
                <div className="chip">Series 02</div>
              </div>

              <div className="body">
                <h3 className="cardTitle thq-heading-3">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span>Landscape Observations</span>
                    </Fragment>
                  )}
                </h3>

                <p className="cardDesc thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span>
                        Long-form frames shaped by place — distance, scale, and
                        the feeling of space.
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
            </article>

            {/* Card 3 */}
            <article className="card">
              <div className="media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="img"
                  loading="lazy"
                />
                <div className="shade" />
                <div className="chip">Series 03</div>
              </div>

              <div className="body">
                <h3 className="cardTitle thq-heading-3">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>Human Presence</span>
                    </Fragment>
                  )}
                </h3>

                <p className="cardDesc thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>
                        Small moments inside larger worlds — scenes that feel
                        lived-in and honest.
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
            </article>
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

        /* ================= HERO (cinematic card) ================= */
        .hero {
          position: relative;
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
              rgba(0, 0, 0, 0.8) 0%,
              rgba(0, 0, 0, 0.45) 55%,
              rgba(0, 0, 0, 0.82) 100%
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
          padding: 26px 22px 18px;
          max-width: 920px;
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

        .title {
          margin: 0;
          line-height: 1.08;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .subtitle {
          margin: 0;
          opacity: 0.9;
          line-height: 1.65;
          color: rgba(245, 244, 244, 0.84);
          max-width: 70ch;
        }

        .micro {
          margin-top: 6px;
          color: rgba(245, 244, 244, 0.62);
        }

        /* ================= GRID ================= */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
          width: 100%;
          margin-top: 12px;
        }

        .card {
          grid-column: span 4;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(34, 34, 34, 0.35);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.32);
          transition: transform 0.18s ease, border-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .card:hover {
          transform: translateY(-3px);
          border-color: rgba(120, 166, 255, 0.35);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.42);
        }

        .media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: rgba(0, 0, 0, 0.2);
          overflow: hidden;
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
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.6)
          );
        }

        .chip {
          position: absolute;
          left: 10px;
          top: 10px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(8px);
          font-size: 12px;
          letter-spacing: 0.3px;
        }

        .body {
          padding: 14px 14px 16px;
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

        @media (max-width: 991px) {
          .card {
            grid-column: span 6;
          }
        }

        @media (max-width: 767px) {
          .heroInner {
            padding: 18px 14px 14px;
          }
          .card {
            grid-column: span 12;
          }
        }
      `}</style>
    </>
  )
}

WorkPhotographyPersonalProjects.defaultProps = {
  rootClassName: '',

  heading1: undefined,
  content1: undefined,

  // ✅ optional hero background image for header
  heroImageSrc: '/work/photography/wpp-01.jpg',

  // ✅ New file naming system
  feature1ImageSrc: '/work/photography/wpp-01.jpg',
  feature2ImageSrc: '/work/photography/wpp-02.jpg',
  feature3ImageSrc: '/work/photography/wpp-03.jpg',

  feature1ImageAlt: 'Personal project 01',
  feature2ImageAlt: 'Personal project 02',
  feature3ImageAlt: 'Personal project 03',

  feature1Title: undefined,
  feature2Title: undefined,
  feature3Title: undefined,

  feature1Description: undefined,
  feature2Description: undefined,
  feature3Description: undefined,
}

WorkPhotographyPersonalProjects.propTypes = {
  rootClassName: PropTypes.string,

  heading1: PropTypes.element,
  content1: PropTypes.element,

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

export default WorkPhotographyPersonalProjects