import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkPhotographyPersonalProjects = (props) => {
  return (
    <>
      <section className="wrap thq-section-padding">
        <div className="shell thq-section-max-width">
          <header className="head">
            <h2 className="title thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span>Personal projects</span>
                </Fragment>
              )}
            </h2>

            <p className="subtitle thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span>
                    Independent photographic work developed through exploration
                    and long-form observation. These projects reflect ongoing
                    personal interests in nature, landscape, and human presence
                    within space.
                  </span>
                </Fragment>
              )}
            </p>
          </header>

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
              </div>

              <div className="body">
                <h3 className="cardTitle thq-heading-3">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span>Nature & Atmosphere</span>
                    </Fragment>
                  )}
                </h3>

                <p className="cardDesc thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>
                        Studies of weather, light, and quiet rhythm — built around
                        mood and texture.
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
              </div>

              <div className="body">
                <h3 className="cardTitle thq-heading-3">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span>Landscape observations</span>
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
              </div>

              <div className="body">
                <h3 className="cardTitle thq-heading-3">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>Human presence</span>
                    </Fragment>
                  )}
                </h3>

                <p className="cardDesc thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>
                        Small moments inside larger worlds — scenes that feel lived-in
                        and honest.
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
          gap: 20px;
        }

        .head {
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .title {
          margin: 0;
        }

        .subtitle {
          margin: 0;
          opacity: 0.9;
          line-height: 1.65;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
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
            rgba(0, 0, 0, 0.55)
          );
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

WorkPhotographyPersonalProjects.defaultProps = {
  heading1: undefined,
  content1: undefined,

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
  heading1: PropTypes.element,
  content1: PropTypes.element,

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