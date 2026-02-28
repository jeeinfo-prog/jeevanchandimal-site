// components/work-film-documentries.js
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkFilmDocumentries = (props) => {
  return (
    <>
      <section
        className={`docWrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="shell thq-section-max-width">
          {/* top line */}
          <div className="kickerRow">
            <span className="kicker">FILM</span>
            <span className="dot" aria-hidden="true" />
            <span className="kickerSub">Documentary · Authentic presence</span>
          </div>

          {/* title + copy */}
          <header className="head">
            <h2 className="title thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span>Documentary</span>
                </Fragment>
              )}
            </h2>

            <p className="desc thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span>
                    Observational and story-driven documentary work rooted in
                    authenticity. These films prioritize real moments, human
                    presence, and environmental context — allowing stories to
                    unfold without forced direction.
                    <br />
                    <br />
                    The emphasis is on patience, trust, and visual honesty.
                  </span>
                </Fragment>
              )}
            </p>
          </header>

          {/* cards */}
          <div className="grid">
            <article className="card">
              <div className="imgWrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img"
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  loading="lazy"
                />
                <div className="imgShade" />
                <div className="imgTag">Documentary</div>
              </div>

              <div className="cardBody">
                <h3 className="cardTitle thq-heading-3">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span>Field Film Production</span>
                    </Fragment>
                  )}
                </h3>
                <p className="cardDesc thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>
                        Natural-light, location-based shooting with a focus on
                        unobtrusive presence and narrative continuity.
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
            </article>

            <article className="card">
              <div className="imgWrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img"
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  loading="lazy"
                />
                <div className="imgShade" />
                <div className="imgTag">Sound</div>
              </div>

              <div className="cardBody">
                <h3 className="cardTitle thq-heading-3">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span>Location Sound</span>
                    </Fragment>
                  )}
                </h3>
                <p className="cardDesc thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span>
                        Clean dialogue, room tone, and environmental texture —
                        built to preserve realism and emotional clarity.
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
            </article>

            <article className="card">
              <div className="imgWrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img"
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  loading="lazy"
                />
                <div className="imgShade" />
                <div className="imgTag">Post</div>
              </div>

              <div className="cardBody">
                <h3 className="cardTitle thq-heading-3">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>Cut · Grade · Finish</span>
                    </Fragment>
                  )}
                </h3>
                <p className="cardDesc thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>
                        Pacing-led editing with restrained grading — shaped to
                        keep the story honest, grounded, and cinematic.
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

        .kickerRow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          text-align: center;
          opacity: 0.9;
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
          max-width: 860px;
          margin: 0 auto;
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
          gap: 14px;
          margin-top: 10px;
        }

        .card {
          grid-column: span 4;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.52);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(37, 195, 226, 0.22);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.52);
        }

        .imgWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.32s ease;
          filter: contrast(1.05) saturate(0.92);
        }

        .card:hover .img {
          transform: scale(1.07);
        }

        .imgShade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.18),
            rgba(0, 0, 0, 0)
          );
        }

        .imgTag {
          position: absolute;
          left: 12px;
          top: 12px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          color: rgba(245, 244, 244, 0.9);
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

        @media (max-width: 991px) {
          .card {
            grid-column: span 6;
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