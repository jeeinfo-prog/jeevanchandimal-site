import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WhatIDoFilmServices = (props) => {
  return (
    <>
      <div className="what-i-do-film-services-thq-layout301-elm thq-section-padding">
        <div className="what-i-do-film-services-thq-max-width-elm thq-section-max-width">
          <h2 className="what-i-do-film-services-thq-text-elm thq-heading-2">
            {props.sectionTitle ?? (
              <Fragment>
                <span className="what-i-do-film-services-text11">
                  What I Do
                </span>
              </Fragment>
            )}
          </h2>
          <div className="what-i-do-film-services-thq-row-elm thq-grid-auto-300">
            <div className="what-i-do-film-services-thq-feature1-elm">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-film-services-thq-content-elm1 thq-flex-column">
                <div className="what-i-do-film-services-thq-section-title-elm1 thq-flex-column">
                  <h3 className="what-i-do-film-services-thq-title1-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="what-i-do-film-services-text14">
                          Commercials &amp; Brand Films
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="what-i-do-film-services-thq-description1-elm thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="what-i-do-film-services-text10">
                          Narrative-driven films that translate brand identity
                          into cinematic storytelling.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-film-services-thq-action-elm1 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="what-i-do-film-services-text19">
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
            <div className="what-i-do-film-services-thq-feature2-elm">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-film-services-thq-content-elm2 thq-flex-column">
                <div className="what-i-do-film-services-thq-section-title-elm2 thq-flex-column">
                  <strong className="what-i-do-film-services-thq-title2-elm thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="what-i-do-film-services-text16">
                          Documentary Films
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="what-i-do-film-services-thq-description2-elm thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="what-i-do-film-services-text15">
                          Observational, story-led documentaries focused on
                          authenticity and human moments.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-film-services-thq-action-elm2 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="what-i-do-film-services-text22">
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
            <div className="what-i-do-film-services-thq-feature3-elm">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-film-services-thq-content-elm3 thq-flex-column">
                <div className="what-i-do-film-services-thq-section-title-elm3 thq-flex-column">
                  <strong className="what-i-do-film-services-thq-title3-elm thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="what-i-do-film-services-text21">
                          Short Films &amp; Visual Stories
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="what-i-do-film-services-thq-description3-elm thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="what-i-do-film-services-text20">
                          Conceptual and narrative films built around mood,
                          rhythm, and emotion.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-film-services-thq-action-elm3 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="what-i-do-film-services-text12">
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
            <div className="what-i-do-film-services-thq-feature4-elm">
              <img
                alt={props.feature4ImageAlt}
                src={props.feature4ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-film-services-thq-content-elm4 thq-flex-column">
                <div className="what-i-do-film-services-thq-section-title-elm4 thq-flex-column">
                  <strong className="what-i-do-film-services-thq-title4-elm thq-heading-3">
                    {props.feature4Title ?? (
                      <Fragment>
                        <span className="what-i-do-film-services-text18">
                          Post-Production &amp; Finishing
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="what-i-do-film-services-thq-description4-elm thq-body-small">
                    {props.feature4Description ?? (
                      <Fragment>
                        <span className="what-i-do-film-services-text17">
                          Editing, sound, and color grading shaped to complete
                          the cinematic experience.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-film-services-thq-action-elm4 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="what-i-do-film-services-text13">
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
          .what-i-do-film-services-thq-layout301-elm {
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
          .what-i-do-film-services-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .what-i-do-film-services-thq-text-elm {
            text-align: center;
          }
          .what-i-do-film-services-thq-row-elm {
            width: 100%;
          }
          .what-i-do-film-services-thq-feature1-elm {
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
          .what-i-do-film-services-thq-content-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-film-services-thq-section-title-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-film-services-thq-title1-elm {
            text-align: center;
          }
          .what-i-do-film-services-thq-description1-elm {
            text-align: center;
          }
          .what-i-do-film-services-thq-action-elm1 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-film-services-thq-feature2-elm {
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
          .what-i-do-film-services-thq-content-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-film-services-thq-section-title-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-film-services-thq-title2-elm {
            text-align: center;
          }
          .what-i-do-film-services-thq-description2-elm {
            text-align: center;
          }
          .what-i-do-film-services-thq-action-elm2 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-film-services-thq-feature3-elm {
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
          .what-i-do-film-services-thq-content-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-film-services-thq-section-title-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-film-services-thq-title3-elm {
            text-align: center;
          }
          .what-i-do-film-services-thq-description3-elm {
            text-align: center;
          }
          .what-i-do-film-services-thq-action-elm3 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-film-services-thq-feature4-elm {
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
          .what-i-do-film-services-thq-content-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-film-services-thq-section-title-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-film-services-thq-title4-elm {
            text-align: center;
          }
          .what-i-do-film-services-thq-description4-elm {
            text-align: center;
          }
          .what-i-do-film-services-thq-action-elm4 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-film-services-text10 {
            display: inline-block;
          }
          .what-i-do-film-services-text11 {
            display: inline-block;
          }
          .what-i-do-film-services-text12 {
            display: inline-block;
          }
          .what-i-do-film-services-text13 {
            display: inline-block;
          }
          .what-i-do-film-services-text14 {
            display: inline-block;
          }
          .what-i-do-film-services-text15 {
            display: inline-block;
          }
          .what-i-do-film-services-text16 {
            display: inline-block;
          }
          .what-i-do-film-services-text17 {
            display: inline-block;
          }
          .what-i-do-film-services-text18 {
            display: inline-block;
          }
          .what-i-do-film-services-text19 {
            display: inline-block;
          }
          .what-i-do-film-services-text20 {
            display: inline-block;
          }
          .what-i-do-film-services-text21 {
            display: inline-block;
          }
          .what-i-do-film-services-text22 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .what-i-do-film-services-thq-row-elm {
              width: auto;
              align-items: center;
              flex-direction: column;
            }
            .what-i-do-film-services-thq-feature1-elm {
              width: 100%;
            }
            .what-i-do-film-services-thq-feature2-elm {
              width: 100%;
            }
            .what-i-do-film-services-thq-feature3-elm {
              width: 100%;
            }
            .what-i-do-film-services-thq-feature4-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .what-i-do-film-services-thq-text-elm {
              text-align: center;
            }
          }
          @media (max-width: 479px) {
            .what-i-do-film-services-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

WhatIDoFilmServices.defaultProps = {
  feature4ImageAlt: 'Photography Image',
  feature1Description: undefined,
  sectionTitle: undefined,
  feature3Button: undefined,
  feature3ImageSrc: '/BTS/jeeva%20chandimal%20-%2005-600w.jpg',
  feature4Button: undefined,
  feature4ImageSrc: '/BTS/1150748_555509297842642_2090232654_o-600w.jpg',
  feature1Title: undefined,
  feature3ImageAlt: 'Animation & Graphics Image',
  feature2Description: undefined,
  feature2Title: undefined,
  feature4Description: undefined,
  feature4Title: undefined,
  feature2ImageAlt: 'Audio Production Image',
  feature1ImageAlt: 'Film Production Image',
  feature1ImageSrc: '/Film/Commercial/everyuth-600w.jpg',
  feature1Button: undefined,
  feature3Description: undefined,
  feature3Title: undefined,
  feature2Button: undefined,
  feature2ImageSrc: '/BTS/jeeva%20chandimal%20-%2006-600w.jpg',
}

WhatIDoFilmServices.propTypes = {
  feature4ImageAlt: PropTypes.string,
  feature1Description: PropTypes.element,
  sectionTitle: PropTypes.element,
  feature3Button: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature4Button: PropTypes.element,
  feature4ImageSrc: PropTypes.string,
  feature1Title: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature2Description: PropTypes.element,
  feature2Title: PropTypes.element,
  feature4Description: PropTypes.element,
  feature4Title: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  feature1Button: PropTypes.element,
  feature3Description: PropTypes.element,
  feature3Title: PropTypes.element,
  feature2Button: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
}

export default WhatIDoFilmServices
