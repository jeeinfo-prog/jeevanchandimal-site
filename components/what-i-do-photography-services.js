import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WhatIDoPhotographyServices = (props) => {
  return (
    <>
      <div
        className={`what-i-do-photography-services-thq-layout301-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="what-i-do-photography-services-thq-max-width-elm thq-section-max-width">
          <h2 className="what-i-do-photography-services-thq-text-elm thq-heading-2">
            {props.sectionTitle ?? (
              <Fragment>
                <span className="what-i-do-photography-services-text13">
                  What I Do
                </span>
              </Fragment>
            )}
          </h2>
          <div className="what-i-do-photography-services-thq-row-elm thq-grid-auto-300">
            <div className="what-i-do-photography-services-thq-feature1-elm">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-photography-services-thq-content-elm1 thq-flex-column">
                <div className="what-i-do-photography-services-thq-section-title-elm1 thq-flex-column">
                  <h3 className="what-i-do-photography-services-thq-title1-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="what-i-do-photography-services-text16">
                          Cinematic &amp; Editorial Photography
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="what-i-do-photography-services-thq-description1-elm thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="what-i-do-photography-services-text12">
                          Story-driven imagery created with intention and visual
                          depth.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-photography-services-thq-action-elm1 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="what-i-do-photography-services-text20">
                            Learn More
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="what-i-do-photography-services-thq-feature2-elm">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-photography-services-thq-content-elm2 thq-flex-column">
                <div className="what-i-do-photography-services-thq-section-title-elm2 thq-flex-column">
                  <strong className="what-i-do-photography-services-thq-title2-elm thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="what-i-do-photography-services-text22">
                          Nature &amp; Wildlife
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="what-i-do-photography-services-thq-description2-elm thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="what-i-do-photography-services-text10">
                          Quiet, patient observations of the natural world,
                          captured with respect and realism.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-photography-services-thq-action-elm2 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="what-i-do-photography-services-text14">
                            Discover More
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="what-i-do-photography-services-thq-feature3-elm">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-photography-services-thq-content-elm3 thq-flex-column">
                <div className="what-i-do-photography-services-thq-section-title-elm3 thq-flex-column">
                  <strong className="what-i-do-photography-services-thq-title3-elm thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="what-i-do-photography-services-text21">
                          Landscape &amp; Travel
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="what-i-do-photography-services-thq-description3-elm thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="what-i-do-photography-services-text19">
                          Expansive scenes that convey scale, mood, and a sense
                          of place.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-photography-services-thq-action-elm3 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="what-i-do-photography-services-text17">
                            Explore Now
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="what-i-do-photography-services-thq-feature4-elm">
              <img
                alt={props.feature4ImageAlt}
                src={props.feature4ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-photography-services-thq-content-elm4 thq-flex-column">
                <div className="what-i-do-photography-services-thq-section-title-elm4 thq-flex-column">
                  <strong className="what-i-do-photography-services-thq-title4-elm thq-heading-3">
                    {props.feature4Title ?? (
                      <Fragment>
                        <span className="what-i-do-photography-services-text11">
                          Black &amp; White Fine Art
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="what-i-do-photography-services-thq-description4-elm thq-body-small">
                    {props.feature4Description ?? (
                      <Fragment>
                        <span className="what-i-do-photography-services-text18">
                          Timeless compositions focused on light, form, and
                          emotion.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-photography-services-thq-action-elm4 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="what-i-do-photography-services-text15">
                            View Portfolio
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .what-i-do-photography-services-thq-layout301-elm {
            gap: var(--dl-layout-space-fiveunits);
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
            justify-content: center;
          }
          .what-i-do-photography-services-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .what-i-do-photography-services-thq-text-elm {
            text-align: center;
          }
          .what-i-do-photography-services-thq-row-elm {
            width: 100%;
          }
          .what-i-do-photography-services-thq-feature1-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .what-i-do-photography-services-thq-content-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-photography-services-thq-section-title-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-photography-services-thq-title1-elm {
            text-align: center;
          }
          .what-i-do-photography-services-thq-description1-elm {
            text-align: center;
          }
          .what-i-do-photography-services-thq-action-elm1 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-photography-services-thq-feature2-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .what-i-do-photography-services-thq-content-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-photography-services-thq-section-title-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-photography-services-thq-title2-elm {
            text-align: center;
          }
          .what-i-do-photography-services-thq-description2-elm {
            text-align: center;
          }
          .what-i-do-photography-services-thq-action-elm2 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-photography-services-thq-feature3-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .what-i-do-photography-services-thq-content-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-photography-services-thq-section-title-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-photography-services-thq-title3-elm {
            text-align: center;
          }
          .what-i-do-photography-services-thq-description3-elm {
            text-align: center;
          }
          .what-i-do-photography-services-thq-action-elm3 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-photography-services-thq-feature4-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .what-i-do-photography-services-thq-content-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-photography-services-thq-section-title-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-photography-services-thq-title4-elm {
            text-align: center;
          }
          .what-i-do-photography-services-thq-description4-elm {
            text-align: center;
          }
          .what-i-do-photography-services-thq-action-elm4 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-photography-services-text10 {
            display: inline-block;
          }
          .what-i-do-photography-services-text11 {
            display: inline-block;
          }
          .what-i-do-photography-services-text12 {
            display: inline-block;
          }
          .what-i-do-photography-services-text13 {
            display: inline-block;
          }
          .what-i-do-photography-services-text14 {
            display: inline-block;
          }
          .what-i-do-photography-services-text15 {
            display: inline-block;
          }
          .what-i-do-photography-services-text16 {
            display: inline-block;
          }
          .what-i-do-photography-services-text17 {
            display: inline-block;
          }
          .what-i-do-photography-services-text18 {
            display: inline-block;
          }
          .what-i-do-photography-services-text19 {
            display: inline-block;
          }
          .what-i-do-photography-services-text20 {
            display: inline-block;
          }
          .what-i-do-photography-services-text21 {
            display: inline-block;
          }
          .what-i-do-photography-services-text22 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .what-i-do-photography-services-thq-row-elm {
              width: auto;
              align-items: center;
              flex-direction: column;
            }
            .what-i-do-photography-services-thq-feature1-elm {
              width: 100%;
            }
            .what-i-do-photography-services-thq-feature2-elm {
              width: 100%;
            }
            .what-i-do-photography-services-thq-feature3-elm {
              width: 100%;
            }
            .what-i-do-photography-services-thq-feature4-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .what-i-do-photography-services-thq-text-elm {
              text-align: center;
            }
          }
          @media (max-width: 479px) {
            .what-i-do-photography-services-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

WhatIDoPhotographyServices.defaultProps = {
  feature2Description: undefined,
  feature4Title: undefined,
  feature1Description: undefined,
  sectionTitle: undefined,
  feature2Button: undefined,
  feature4ImageSrc:
    '/Photography/B&W/wild%20elephant%20-%20senanayake%20samudraya%20ampara%2C%20sri%20lanka.-600w.jpg',
  feature4Button: undefined,
  feature4ImageAlt: 'Photography Image',
  feature1Title: undefined,
  feature3ImageAlt: 'Animation & Graphics Image',
  feature1ImageSrc: '/Film/Commercial/everyouth-600w.jpg',
  feature3Button: undefined,
  feature4Description: undefined,
  feature3ImageSrc: '/Photography/3x2/_dsc5544_3x2_2000x1333_u_100-600w.png',
  rootClassName: '',
  feature3Description: undefined,
  feature2ImageAlt: 'Audio Production Image',
  feature1Button: undefined,
  feature3Title: undefined,
  feature2ImageSrc: '/Photography/3x2/_dsc8124_3x2_2000x1333_u_100-600w.png',
  feature1ImageAlt: 'Film Production Image',
  feature2Title: undefined,
}

WhatIDoPhotographyServices.propTypes = {
  feature2Description: PropTypes.element,
  feature4Title: PropTypes.element,
  feature1Description: PropTypes.element,
  sectionTitle: PropTypes.element,
  feature2Button: PropTypes.element,
  feature4ImageSrc: PropTypes.string,
  feature4Button: PropTypes.element,
  feature4ImageAlt: PropTypes.string,
  feature1Title: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  feature3Button: PropTypes.element,
  feature4Description: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  rootClassName: PropTypes.string,
  feature3Description: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature1Button: PropTypes.element,
  feature3Title: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature2Title: PropTypes.element,
}

export default WhatIDoPhotographyServices
