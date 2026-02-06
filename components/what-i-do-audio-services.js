import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WhatIDoAudioServices = (props) => {
  return (
    <>
      <div
        className={`what-i-do-audio-services-thq-layout301-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="what-i-do-audio-services-thq-max-width-elm thq-section-max-width">
          <h2 className="what-i-do-audio-services-thq-text-elm thq-heading-2">
            {props.sectionTitle ?? (
              <Fragment>
                <span className="what-i-do-audio-services-text22">
                  What I Do
                </span>
              </Fragment>
            )}
          </h2>
          <div className="what-i-do-audio-services-thq-row-elm thq-grid-auto-300">
            <div className="what-i-do-audio-services-thq-feature1-elm">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-audio-services-thq-content-elm1 thq-flex-column">
                <div className="what-i-do-audio-services-thq-section-title-elm1 thq-flex-column">
                  <h3 className="what-i-do-audio-services-thq-title1-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="what-i-do-audio-services-text19">
                          Sound Design
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="what-i-do-audio-services-thq-description1-elm thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="what-i-do-audio-services-text21">
                          Atmospheric soundscapes that add depth and realism to
                          visual stories.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-audio-services-thq-action-elm1 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="what-i-do-audio-services-text20">
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
            <div className="what-i-do-audio-services-thq-feature2-elm">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-audio-services-thq-content-elm2 thq-flex-column">
                <div className="what-i-do-audio-services-thq-section-title-elm2 thq-flex-column">
                  <strong className="what-i-do-audio-services-thq-title2-elm thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="what-i-do-audio-services-text16">
                          <span>Music Composition</span>
                          <br></br>
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="what-i-do-audio-services-thq-description2-elm thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="what-i-do-audio-services-text12">
                          <span>
                            Original compositions built around mood, pacing, and
                            emotional tone.
                          </span>
                          <br></br>
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-audio-services-thq-action-elm2 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="what-i-do-audio-services-text10">
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
            <div className="what-i-do-audio-services-thq-feature3-elm">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-audio-services-thq-content-elm3 thq-flex-column">
                <div className="what-i-do-audio-services-thq-section-title-elm3 thq-flex-column">
                  <strong className="what-i-do-audio-services-thq-title3-elm thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="what-i-do-audio-services-text15">
                          Audio Post-Production
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="what-i-do-audio-services-thq-description3-elm thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="what-i-do-audio-services-text11">
                          Editing, mixing, and refinement for clarity, balance,
                          and impact.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-audio-services-thq-action-elm3 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="what-i-do-audio-services-text28">
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
            <div className="what-i-do-audio-services-thq-feature4-elm">
              <img
                alt={props.feature4ImageAlt}
                src={props.feature4ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="what-i-do-audio-services-thq-content-elm4 thq-flex-column">
                <div className="what-i-do-audio-services-thq-section-title-elm4 thq-flex-column">
                  <strong className="what-i-do-audio-services-thq-title4-elm thq-heading-3">
                    {props.feature4Title ?? (
                      <Fragment>
                        <span className="what-i-do-audio-services-text23">
                          <span>Film &amp; Visual Audio</span>
                          <br></br>
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="what-i-do-audio-services-thq-description4-elm thq-body-small">
                    {props.feature4Description ?? (
                      <Fragment>
                        <span className="what-i-do-audio-services-text26">
                          Sound created specifically to complement cinematic
                          visuals.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="what-i-do-audio-services-thq-action-elm4 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="what-i-do-audio-services-text27">
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
          .what-i-do-audio-services-thq-layout301-elm {
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
          .what-i-do-audio-services-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .what-i-do-audio-services-thq-text-elm {
            text-align: center;
          }
          .what-i-do-audio-services-thq-row-elm {
            width: 100%;
          }
          .what-i-do-audio-services-thq-feature1-elm {
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
          .what-i-do-audio-services-thq-content-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-audio-services-thq-section-title-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-audio-services-thq-title1-elm {
            text-align: center;
          }
          .what-i-do-audio-services-thq-description1-elm {
            text-align: center;
          }
          .what-i-do-audio-services-thq-action-elm1 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-audio-services-thq-feature2-elm {
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
          .what-i-do-audio-services-thq-content-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-audio-services-thq-section-title-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-audio-services-thq-title2-elm {
            text-align: center;
          }
          .what-i-do-audio-services-thq-description2-elm {
            text-align: center;
          }
          .what-i-do-audio-services-thq-action-elm2 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-audio-services-thq-feature3-elm {
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
          .what-i-do-audio-services-thq-content-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-audio-services-thq-section-title-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-audio-services-thq-title3-elm {
            text-align: center;
          }
          .what-i-do-audio-services-thq-description3-elm {
            text-align: center;
          }
          .what-i-do-audio-services-thq-action-elm3 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-audio-services-thq-feature4-elm {
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
          .what-i-do-audio-services-thq-content-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-audio-services-thq-section-title-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .what-i-do-audio-services-thq-title4-elm {
            text-align: center;
          }
          .what-i-do-audio-services-thq-description4-elm {
            text-align: center;
          }
          .what-i-do-audio-services-thq-action-elm4 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .what-i-do-audio-services-text10 {
            display: inline-block;
          }
          .what-i-do-audio-services-text11 {
            display: inline-block;
          }
          .what-i-do-audio-services-text12 {
            display: inline-block;
          }
          .what-i-do-audio-services-text15 {
            display: inline-block;
          }
          .what-i-do-audio-services-text16 {
            display: inline-block;
          }
          .what-i-do-audio-services-text19 {
            display: inline-block;
          }
          .what-i-do-audio-services-text20 {
            display: inline-block;
          }
          .what-i-do-audio-services-text21 {
            display: inline-block;
          }
          .what-i-do-audio-services-text22 {
            display: inline-block;
          }
          .what-i-do-audio-services-text23 {
            display: inline-block;
          }
          .what-i-do-audio-services-text26 {
            display: inline-block;
          }
          .what-i-do-audio-services-text27 {
            display: inline-block;
          }
          .what-i-do-audio-services-text28 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .what-i-do-audio-services-thq-row-elm {
              width: auto;
              align-items: center;
              flex-direction: column;
            }
            .what-i-do-audio-services-thq-feature1-elm {
              width: 100%;
            }
            .what-i-do-audio-services-thq-feature2-elm {
              width: 100%;
            }
            .what-i-do-audio-services-thq-feature3-elm {
              width: 100%;
            }
            .what-i-do-audio-services-thq-feature4-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .what-i-do-audio-services-thq-text-elm {
              text-align: center;
            }
          }
          @media (max-width: 479px) {
            .what-i-do-audio-services-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

WhatIDoAudioServices.defaultProps = {
  feature2ImageAlt: 'Audio Production Image',
  feature4ImageSrc:
    '/Audio/Studio/334747_381817385211835_1960908791_o-600w.jpg',
  feature2Button: undefined,
  rootClassName: '',
  feature3Description: undefined,
  feature3ImageSrc:
    'https://images.unsplash.com/photo-1658246975950-6f87691fa48e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc2OTU0MzYwOHw&ixlib=rb-4.1.0&q=80&w=1080',
  feature2Description: undefined,
  feature1ImageSrc: '/JC/jeeva%20chandimal%20-%201_0004_layer%201-600w.jpg',
  feature3Title: undefined,
  feature2Title: undefined,
  feature1Title: undefined,
  feature1Button: undefined,
  feature1Description: undefined,
  feature3ImageAlt: 'Animation & Graphics Image',
  sectionTitle: undefined,
  feature4Title: undefined,
  feature2ImageSrc: '/Audio/Studio/jeevan%20chandimal_0013_layer%209-600w.jpg',
  feature4ImageAlt: 'Photography Image',
  feature4Description: undefined,
  feature1ImageAlt: 'Film Production Image',
  feature4Button: undefined,
  feature3Button: undefined,
}

WhatIDoAudioServices.propTypes = {
  feature2ImageAlt: PropTypes.string,
  feature4ImageSrc: PropTypes.string,
  feature2Button: PropTypes.element,
  rootClassName: PropTypes.string,
  feature3Description: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature2Description: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature3Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature1Title: PropTypes.element,
  feature1Button: PropTypes.element,
  feature1Description: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  sectionTitle: PropTypes.element,
  feature4Title: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature4ImageAlt: PropTypes.string,
  feature4Description: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature4Button: PropTypes.element,
  feature3Button: PropTypes.element,
}

export default WhatIDoAudioServices
