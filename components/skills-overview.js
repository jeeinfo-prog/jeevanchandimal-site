import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const SkillsOverview = (props) => {
  return (
    <>
      <div className="skills-overview-thq-layout300-elm thq-section-padding">
        <div className="skills-overview-thq-max-width-elm thq-section-max-width">
          <div className="skills-overview-thq-section-title-elm">
            <div className="skills-overview-thq-content-elm1">
              <h2 className="skills-overview-thq-text-elm1 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="skills-overview-text7">Skills Overview</span>
                  </Fragment>
                )}
              </h2>
              <span className="skills-overview-thq-text-elm2 thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="skills-overview-text4">
                      From concept to final delivery, I handle the full creative process - ensuring every element works
                      together as one voice.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>

          <div className="skills-overview-thq-content-elm2">
            <div className="skills-overview-thq-row-elm thq-flex-row">
              {/* ✅ Visual -> /work-film */}
              <Link href="/work-film" passHref legacyBehavior>
                <a className="skillsCard skills-overview-thq-feature1-elm" aria-label="View Visual work (Film)">
                  <div className="imgWrap">
                    <img alt={props.feature1ImageAlt} src={props.feature1ImageSrc} className="cardImg thq-img-ratio-4-3" />
                    <div className="imgOverlay" />
                  </div>
                  <div className="skills-overview-thq-content-elm3">
                    <h3 className="skills-overview-thq-feature1-title-elm thq-heading-3">
                      {props.feature1Title ?? (
                        <Fragment>
                          <span className="skills-overview-text8">Visual</span>
                        </Fragment>
                      )}
                    </h3>
                    <span className="thq-body-small">
                      {props.feature1Description ?? (
                        <Fragment>
                          <span className="skills-overview-text3">
                            Cinematography · Photography · Color Grading · Visual Direction
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </a>
              </Link>

              {/* ✅ Motion -> /work-animation */}
              <Link href="/work-animation" passHref legacyBehavior>
                <a className="skillsCard skills-overview-thq-feature2-elm" aria-label="View Motion work (Animation)">
                  <div className="imgWrap">
                    <img alt={props.feature2ImageAlt} src={props.feature2ImageSrc} className="cardImg thq-img-ratio-4-3" />
                    <div className="imgOverlay" />
                  </div>
                  <div className="skills-overview-thq-content-elm4">
                    <h3 className="thq-heading-3">
                      {props.feature2Title ?? (
                        <Fragment>
                          <span className="skills-overview-text6">Motion</span>
                        </Fragment>
                      )}
                    </h3>
                    <span className="thq-body-small">
                      {props.feature2Description ?? (
                        <Fragment>
                          <span className="skills-overview-text2">
                            Editing · Animation · Motion Graphics · Visual Storytelling
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </a>
              </Link>

              {/* ✅ Audio -> /work-audio */}
              <Link href="/work-audio" passHref legacyBehavior>
                <a className="skillsCard skills-overview-thq-feature3-elm" aria-label="View Audio work">
                  <div className="imgWrap">
                    <img alt={props.feature3ImageAlt} src={props.feature3ImageSrc} className="cardImg thq-img-ratio-4-3" />
                    <div className="imgOverlay" />
                  </div>
                  <div className="skills-overview-thq-content-elm5">
                    <h3 className="thq-heading-3">
                      {props.feature3Title ?? (
                        <Fragment>
                          <span className="skills-overview-text1">Audio</span>
                        </Fragment>
                      )}
                    </h3>
                    <span className="thq-body-small">
                      {props.feature3Description ?? (
                        <Fragment>
                          <span className="skills-overview-text5">
                            Sound Design · Music Composition · Audio Post-Production
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .skills-overview-thq-layout300-elm {
          width: 100%;
          height: auto;
          display: flex;
          overflow: hidden;
          position: relative;
          align-items: center;
          flex-shrink: 0;
          flex-direction: column;
        }
        .skills-overview-thq-max-width-elm {
          gap: var(--dl-layout-space-threeunits);
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        .skills-overview-thq-section-title-elm {
          gap: 16px;
          width: 100%;
          display: flex;
          max-width: 800px;
          align-items: center;
          flex-shrink: 0;
          flex-direction: column;
        }
        .skills-overview-thq-content-elm1 {
          gap: 24px;
          display: flex;
          align-self: stretch;
          align-items: center;
          flex-direction: column;
        }
        .skills-overview-thq-text-elm1 {
          text-align: center;
        }
        .skills-overview-thq-text-elm2 {
          text-align: center;
        }
        .skills-overview-thq-content-elm2 {
          gap: 48px;
          display: flex;
          align-self: stretch;
          align-items: center;
          flex-direction: column;
        }
        .skills-overview-thq-row-elm {
          display: flex;
          align-self: stretch;
          align-items: stretch;
          flex-shrink: 0;
          justify-content: center;
          gap: var(--dl-layout-space-twounits);
        }

        /* ✅ Make whole feature clickable card */
        .skillsCard {
          gap: var(--dl-layout-space-twounits);
          flex: 1;
          width: 100%;
          display: flex;
          overflow: hidden;
          align-items: flex-start;
          flex-direction: column;
          text-decoration: none !important;
          color: inherit;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(245, 244, 244, 0.08);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease,
            background 180ms ease;
        }

        .skillsCard:hover {
          transform: translateY(-2px);
          border-color: rgba(37, 195, 226, 0.22);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
          background: rgba(255, 255, 255, 0.03);
        }

        .skillsCard:focus-visible {
          outline: 2px solid rgba(37, 195, 226, 0.6);
          outline-offset: 3px;
        }

        .imgWrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        /* ✅ Same small hover effect for images */
        .cardImg {
          width: 100%;
          display: block;
          object-fit: cover;
          transform: scale(1.01);
          transition: transform 280ms ease, filter 280ms ease;
          filter: saturate(1.02) contrast(1.02);
        }

        .skillsCard:hover .cardImg {
          transform: scale(1.05);
          filter: saturate(1.08) contrast(1.05);
        }

        .imgOverlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.45));
          opacity: 0.85;
          transition: opacity 280ms ease;
        }

        .skillsCard:hover .imgOverlay {
          opacity: 0.95;
        }

        .skills-overview-thq-content-elm3,
        .skills-overview-thq-content-elm4,
        .skills-overview-thq-content-elm5 {
          gap: var(--dl-layout-space-oneandhalfunits);
          display: flex;
          align-self: stretch;
          align-items: flex-start;
          flex-direction: column;
          padding: 0 18px 18px;
        }

        .skills-overview-thq-feature1-title-elm {
          text-align: left;
        }

        .skills-overview-text1,
        .skills-overview-text2,
        .skills-overview-text3,
        .skills-overview-text4,
        .skills-overview-text5,
        .skills-overview-text6,
        .skills-overview-text7,
        .skills-overview-text8 {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .skills-overview-thq-section-title-elm {
            width: 100%;
          }
        }

        @media (max-width: 767px) {
          .skills-overview-thq-max-width-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
          }
          .skills-overview-thq-section-title-elm {
            width: auto;
          }
          .skills-overview-thq-text-elm1 {
            text-align: center;
          }
          .skills-overview-thq-row-elm {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}

SkillsOverview.defaultProps = {
  feature3Title: undefined,
  feature2Description: undefined,
  feature1Description: undefined,
  feature1ImageSrc: '/JC/jeeva%20chandimal%20-%201_0002_viveza%203-1400w.jpg',
  content1: undefined,
  feature2ImageAlt: 'Intuitive Design Image',
  feature1ImageAlt: 'Customized Solutions Image',
  feature3ImageSrc: '/JC/jeeva%20chandimal%20-%201_0004_layer%201-1400w.jpg',
  feature3Description: undefined,
  feature2Title: undefined,
  feature3ImageAlt: 'Analytics Tools Image',
  heading1: undefined,
  feature2ImageSrc: '/JC/jeevan%20chandimal_0000_layer%2023-1400w.jpg',
  feature1Title: undefined,
}

SkillsOverview.propTypes = {
  feature3Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature1Description: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  content1: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature3Description: PropTypes.element,
  feature2Title: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  heading1: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature1Title: PropTypes.element,
}

export default SkillsOverview