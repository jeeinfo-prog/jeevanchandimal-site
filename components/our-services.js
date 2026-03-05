import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const OurServices = (props) => {
  return (
    <>
      <div className="our-services-thq-layout301-elm thq-section-padding">
        <div className="our-services-thq-max-width-elm thq-section-max-width">
          <h2 className="our-services-thq-text-elm thq-heading-2">
            {props.sectionTitle ?? (
              <Fragment>
                <span className="our-services-text11">Our Services</span>
              </Fragment>
            )}
          </h2>
          <div className="our-services-thq-row-elm thq-grid-auto-300">
            <div className="our-services-thq-feature1-elm">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="our-services-thq-content-elm1 thq-flex-column">
                <div className="our-services-thq-section-title-elm1 thq-flex-column">
                  <h3 className="our-services-thq-title1-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="our-services-text18">
                          Film Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="our-services-thq-description1-elm thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="our-services-text12">
                          Stories shaped through image, motion, &amp; sound.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="our-services-thq-action-elm1 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="our-services-text10">View Work</span>
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
            <div className="our-services-thq-feature2-elm">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="our-services-thq-content-elm2 thq-flex-column">
                <div className="our-services-thq-section-title-elm2 thq-flex-column">
                  <strong className="our-services-thq-title2-elm thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="our-services-text19">
                          Audio Production
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="our-services-thq-description2-elm thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="our-services-text20">
                          Sound designed to complete the story.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="our-services-thq-action-elm2 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="our-services-text14">Explore</span>
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
            <div className="our-services-thq-feature3-elm">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="our-services-thq-content-elm3 thq-flex-column">
                <div className="our-services-thq-section-title-elm3 thq-flex-column">
                  <strong className="our-services-thq-title3-elm thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="our-services-text13">
                          Animation &amp; Motion
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="our-services-thq-description3-elm thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="our-services-text21">
                          Motion that supports narrative and mood.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="our-services-thq-action-elm3 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="our-services-text22">
                            Start a Project
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
            <div className="our-services-thq-feature4-elm">
              <img
                alt={props.feature4ImageAlt}
                src={props.feature4ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="our-services-thq-content-elm4 thq-flex-column">
                <div className="our-services-thq-section-title-elm4 thq-flex-column">
                  <strong className="our-services-thq-title4-elm thq-heading-3">
                    {props.feature4Title ?? (
                      <Fragment>
                        <span className="our-services-text15">Photography</span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="our-services-thq-description4-elm thq-body-small">
                    {props.feature4Description ?? (
                      <Fragment>
                        <span className="our-services-text16">
                          Motion that supports narrative and mood.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="our-services-thq-action-elm4 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="our-services-text17">
                            See Portfolio
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
          .our-services-thq-layout301-elm {
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
          .our-services-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .our-services-thq-text-elm {
            text-align: center;
          }
          .our-services-thq-row-elm {
            width: 100%;
          }
          .our-services-thq-feature1-elm {
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
          .our-services-thq-content-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .our-services-thq-section-title-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .our-services-thq-title1-elm {
            text-align: center;
          }
          .our-services-thq-description1-elm {
            text-align: center;
          }
          .our-services-thq-action-elm1 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .our-services-thq-feature2-elm {
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
          .our-services-thq-content-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .our-services-thq-section-title-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .our-services-thq-title2-elm {
            text-align: center;
          }
          .our-services-thq-description2-elm {
            text-align: center;
          }
          .our-services-thq-action-elm2 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .our-services-thq-feature3-elm {
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
          .our-services-thq-content-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .our-services-thq-section-title-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .our-services-thq-title3-elm {
            text-align: center;
          }
          .our-services-thq-description3-elm {
            text-align: center;
          }
          .our-services-thq-action-elm3 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .our-services-thq-feature4-elm {
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
          .our-services-thq-content-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .our-services-thq-section-title-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .our-services-thq-title4-elm {
            text-align: center;
          }
          .our-services-thq-description4-elm {
            text-align: center;
          }
          .our-services-thq-action-elm4 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .our-services-text10 {
            display: inline-block;
          }
          .our-services-text11 {
            display: inline-block;
          }
          .our-services-text12 {
            display: inline-block;
          }
          .our-services-text13 {
            display: inline-block;
          }
          .our-services-text14 {
            display: inline-block;
          }
          .our-services-text15 {
            display: inline-block;
          }
          .our-services-text16 {
            display: inline-block;
          }
          .our-services-text17 {
            display: inline-block;
          }
          .our-services-text18 {
            display: inline-block;
          }
          .our-services-text19 {
            display: inline-block;
          }
          .our-services-text20 {
            display: inline-block;
          }
          .our-services-text21 {
            display: inline-block;
          }
          .our-services-text22 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .our-services-thq-row-elm {
              width: auto;
              align-items: center;
              flex-direction: column;
            }
            .our-services-thq-feature1-elm {
              width: 100%;
            }
            .our-services-thq-feature2-elm {
              width: 100%;
            }
            .our-services-thq-feature3-elm {
              width: 100%;
            }
            .our-services-thq-feature4-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .our-services-thq-text-elm {
              text-align: center;
            }
          }
          @media (max-width: 479px) {
            .our-services-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

OurServices.defaultProps = {
  feature1ImageAlt: 'Film Production Image',
  feature3ImageSrc: '/JC/jeevan%20chandimal_0000_layer%2023-600w.jpg',
  feature1Button: undefined,
  feature1ImageSrc: '/JC/jeeva%20chandimal%20-%201_0002_viveza%203-600w.jpg',
  feature2ImageSrc: '/JC/jeeva%20chandimal%20-%201_0004_layer%201-600w.jpg',
  sectionTitle: undefined,
  feature4ImageSrc: '/JC/jeevan-chandimal-600w.jpg',
  feature1Description: undefined,
  feature3Title: undefined,
  feature3ImageAlt: 'Animation & Graphics Image',
  feature2Button: undefined,
  feature4Title: undefined,
  feature4Description: undefined,
  feature4Button: undefined,
  feature1Title: undefined,
  feature4ImageAlt: 'Photography Image',
  feature2Title: undefined,
  feature2ImageAlt: 'Audio Production Image',
  feature2Description: undefined,
  feature3Description: undefined,
  feature3Button: undefined,
}

OurServices.propTypes = {
  feature1ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature1Button: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  sectionTitle: PropTypes.element,
  feature4ImageSrc: PropTypes.string,
  feature1Description: PropTypes.element,
  feature3Title: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature2Button: PropTypes.element,
  feature4Title: PropTypes.element,
  feature4Description: PropTypes.element,
  feature4Button: PropTypes.element,
  feature1Title: PropTypes.element,
  feature4ImageAlt: PropTypes.string,
  feature2Title: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature2Description: PropTypes.element,
  feature3Description: PropTypes.element,
  feature3Button: PropTypes.element,
}

export default OurServices
