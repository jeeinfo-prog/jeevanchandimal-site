import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkPhotographyPersonalProjects = (props) => {
  return (
    <>
      <div className="work-photography-personal-projects-thq-layout300-elm thq-section-padding">
        <div className="work-photography-personal-projects-thq-max-width-elm thq-section-max-width">
          <div className="work-photography-personal-projects-thq-section-title-elm">
            <div className="work-photography-personal-projects-thq-content-elm1">
              <h2 className="work-photography-personal-projects-thq-text-elm1 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="work-photography-personal-projects-text8">
                      Personal projects
                    </span>
                  </Fragment>
                )}
              </h2>
              <span className="work-photography-personal-projects-thq-text-elm2 thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="work-photography-personal-projects-text3">
                      Independent photographic work developed through
                      exploration and long-form observation. These projects
                      reflect ongoing personal interests in nature, landscape,
                      and human presence within space.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="work-photography-personal-projects-thq-content-elm2">
            <div className="work-photography-personal-projects-thq-row-elm thq-flex-row">
              <div className="work-photography-personal-projects-thq-feature1-elm">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-photography-personal-projects-thq-content-elm3">
                  <h3 className="work-photography-personal-projects-thq-feature1-title-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="work-photography-personal-projects-text4">
                          Intuitive Design
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="work-photography-personal-projects-text7">
                          We prioritize user experience with our intuitive and
                          user-friendly designs.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-photography-personal-projects-thq-feature2-elm">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-photography-personal-projects-thq-content-elm4">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="work-photography-personal-projects-text2">
                          Powerful Analytics Tools
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="work-photography-personal-projects-text5">
                          Gain valuable insights and make informed decisions
                          with our advanced analytics tools.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-photography-personal-projects-thq-feature3-elm">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-photography-personal-projects-thq-content-elm5">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="work-photography-personal-projects-text1">
                          AI &amp; Animations
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="work-photography-personal-projects-text6">
                          Incorporate cutting-edge AI and animations to enhance
                          your projects and captivate your audience.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-photography-personal-projects-thq-layout300-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-photography-personal-projects-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .work-photography-personal-projects-thq-section-title-elm {
            gap: 16px;
            width: 100%;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-photography-personal-projects-thq-content-elm1 {
            gap: 24px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .work-photography-personal-projects-thq-text-elm1 {
            text-align: center;
          }
          .work-photography-personal-projects-thq-text-elm2 {
            text-align: center;
          }
          .work-photography-personal-projects-thq-content-elm2 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .work-photography-personal-projects-thq-row-elm {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
            justify-content: center;
          }
          .work-photography-personal-projects-thq-feature1-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-photography-personal-projects-thq-content-elm3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-photography-personal-projects-thq-feature1-title-elm {
            text-align: center;
          }
          .work-photography-personal-projects-thq-feature2-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-photography-personal-projects-thq-content-elm4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-photography-personal-projects-thq-feature3-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-photography-personal-projects-thq-content-elm5 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-photography-personal-projects-text1 {
            display: inline-block;
          }
          .work-photography-personal-projects-text2 {
            display: inline-block;
          }
          .work-photography-personal-projects-text3 {
            display: inline-block;
          }
          .work-photography-personal-projects-text4 {
            display: inline-block;
          }
          .work-photography-personal-projects-text5 {
            display: inline-block;
          }
          .work-photography-personal-projects-text6 {
            display: inline-block;
          }
          .work-photography-personal-projects-text7 {
            display: inline-block;
          }
          .work-photography-personal-projects-text8 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-photography-personal-projects-thq-section-title-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .work-photography-personal-projects-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .work-photography-personal-projects-thq-section-title-elm {
              width: auto;
            }
            .work-photography-personal-projects-thq-text-elm1 {
              text-align: center;
            }
            .work-photography-personal-projects-thq-row-elm {
              flex-direction: column;
            }
            .work-photography-personal-projects-thq-feature2-elm {
              width: auto;
            }
            .work-photography-personal-projects-thq-feature3-elm {
              width: auto;
            }
          }
        `}
      </style>
    </>
  )
}

WorkPhotographyPersonalProjects.defaultProps = {
  feature2ImageAlt: 'Analytics Tools Image',
  feature3Title: undefined,
  feature2Title: undefined,
  feature1ImageAlt: 'Intuitive Design Image',
  feature1ImageSrc:
    '/Photography/1x1/arcade%2001_1x1_2000x2000_u_100-1400w.png',
  feature2ImageSrc:
    '/Photography/1x1/beira%20lake%20%20colombo%2C%20sri%20lanka._1x1_2000x2000_u_100-1400w.png',
  feature3ImageSrc:
    '/Photography/1x1/floating%20market%20-%20pettah%20%20colombo%2C%20sri%20lanka._1x1_2000x2000_u_100-1400w.png',
  feature3ImageAlt: 'AI & Animations Image',
  content1: undefined,
  feature1Title: undefined,
  feature2Description: undefined,
  feature3Description: undefined,
  feature1Description: undefined,
  heading1: undefined,
}

WorkPhotographyPersonalProjects.propTypes = {
  feature2ImageAlt: PropTypes.string,
  feature3Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  content1: PropTypes.element,
  feature1Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature3Description: PropTypes.element,
  feature1Description: PropTypes.element,
  heading1: PropTypes.element,
}

export default WorkPhotographyPersonalProjects
