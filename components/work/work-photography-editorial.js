import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkPhotographyEditorial = (props) => {
  return (
    <>
      <section className="wrap thq-section-padding">
        <div className="shell thq-section-max-width">
          <div className="card">
            <div className="media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={props.featureImageAlt}
                src={props.featureImageSrc}
                className="img"
                loading="lazy"
              />
              <div className="mediaShade" />
              <div className="mediaTag">Editorial</div>
            </div>

            <div className="content">
              <div className="kicker thq-body-small">
                {props.slogan ?? (
                  <Fragment>
                    <span>Photography for story & context</span>
                  </Fragment>
                )}
              </div>

              <h2 className="title thq-heading-2">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span>Editorial</span>
                  </Fragment>
                )}
              </h2>

              <p className="desc thq-body-large">
                {props.featureDescription ?? (
                  <Fragment>
                    <span>
                      Photography created for narrative and contextual use — images
                      that support stories, publications, and visual essays. The
                      focus remains on authenticity, environment, and visual
                      coherence.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="points">
                <div className="point">
                  <div className="dot" />
                  <div className="pointText">
                    <h3 className="thq-heading-3 pointTitle">
                      {props.feature1Title ?? (
                        <Fragment>
                          <span>Story-led sets</span>
                        </Fragment>
                      )}
                    </h3>
                    <span className="thq-body-small pointDesc">
                      {props.feature1Description ?? (
                        <Fragment>
                          <span>
                            Cohesive frames designed to support narrative flow and
                            visual continuity.
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>

                <div className="point">
                  <div className="dot" />
                  <div className="pointText">
                    <h3 className="thq-heading-3 pointTitle">
                      {props.feature2Title ?? (
                        <Fragment>
                          <span>Authentic environments</span>
                        </Fragment>
                      )}
                    </h3>
                    <span className="thq-body-small pointDesc">
                      {props.feature2Description ?? (
                        <Fragment>
                          <span>
                            Real places, human moments, and grounded light — edited
                            with restraint.
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="actions">
                <button className="btnPrimary" type="button">
                  <span className="thq-body-small">
                    {props.mainAction ?? (
                      <Fragment>
                        <span>View Editorial</span>
                      </Fragment>
                    )}
                  </span>
                  <svg viewBox="0 0 1024 1024" className="icon">
                    <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
                  </svg>
                </button>

                <button className="btnGhost" type="button">
                  <span className="thq-body-small">
                    {props.secondaryAction ?? (
                      <Fragment>
                        <span>Licensing Info</span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
            </div>
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
          width: 100%;
        }

        /* Glass card */
        .card {
          width: 100%;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 22px;
          padding: 18px;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(34, 34, 34, 0.35);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
        }

        /* Image */
        .media {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(0, 0, 0, 0.2);
          min-height: 340px;
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.35s ease;
        }

        .card:hover .img {
          transform: scale(1.06);
        }

        .mediaShade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.0),
            rgba(0, 0, 0, 0.55)
          );
        }

        .mediaTag {
          position: absolute;
          left: 12px;
          top: 12px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(8px);
          font-size: 12px;
          letter-spacing: 0.3px;
        }

        /* Content */
        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 12px;
          padding: 8px 6px;
        }

        .kicker {
          opacity: 0.85;
          letter-spacing: 0.35px;
        }

        .title {
          margin: 0;
        }

        .desc {
          margin: 0;
          opacity: 0.9;
          line-height: 1.65;
        }

        .points {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 6px;
        }

        .point {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 12px;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(255, 255, 255, 0.04);
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          margin-top: 8px;
          background: rgba(120, 166, 255, 0.85);
          box-shadow: 0 0 0 6px rgba(120, 166, 255, 0.12);
          flex: 0 0 auto;
        }

        .pointTitle {
          margin: 0;
        }

        .pointDesc {
          opacity: 0.85;
          line-height: 1.55;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .btnPrimary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(120, 166, 255, 0.35);
          background: rgba(120, 166, 255, 0.14);
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease,
            border-color 0.15s ease;
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
          background: rgba(120, 166, 255, 0.18);
          border-color: rgba(120, 166, 255, 0.55);
        }

        .btnGhost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.06);
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease,
            background 0.15s ease;
        }

        .btnGhost:hover {
          transform: translateY(-1px);
          border-color: rgba(120, 166, 255, 0.45);
          background: rgba(120, 166, 255, 0.1);
        }

        .icon {
          width: 18px;
          height: 18px;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .card {
            grid-template-columns: 1fr;
          }
          .media {
            min-height: 320px;
          }
        }

        @media (max-width: 479px) {
          .card {
            padding: 14px;
            border-radius: 18px;
          }
          .point {
            padding: 10px;
          }
          .btnPrimary,
          .btnGhost {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}

WorkPhotographyEditorial.defaultProps = {
  featureImageSrc: '/work/photography/pe-01.jpg',
  featureImageAlt: 'Editorial preview',

  slogan: undefined,
  sectionTitle: undefined,
  featureDescription: undefined,

  feature1Title: undefined,
  feature1Description: undefined,
  feature2Title: undefined,
  feature2Description: undefined,

  mainAction: undefined,
  secondaryAction: undefined,
}

WorkPhotographyEditorial.propTypes = {
  featureImageSrc: PropTypes.string,
  featureImageAlt: PropTypes.string,

  slogan: PropTypes.element,
  sectionTitle: PropTypes.element,
  featureDescription: PropTypes.element,

  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature2Title: PropTypes.element,
  feature2Description: PropTypes.element,

  mainAction: PropTypes.element,
  secondaryAction: PropTypes.element,
}

export default WorkPhotographyEditorial