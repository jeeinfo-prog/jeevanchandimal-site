import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const SoundDesign2 = (props) => {
  return (
    <>
      <div className="sound-design-2-thq-layout300-elm thq-section-padding">
        <div className="sound-design-2-thq-max-width-elm thq-section-max-width thq-flex-column">
          <div className="sound-design-2-thq-section-title-elm thq-flex-column">
            <h2 className="thq-heading-2 sound-design-2-thq-text-elm1">
              {props.sectionTitle ?? (
                <Fragment>
                  <span className="sound-design-2-text15">Sound design</span>
                </Fragment>
              )}
            </h2>
            <p className="sound-design-2-thq-text-elm2 thq-body-large">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="sound-design-2-text10">
                    Atmospheric soundscapes and environmental design created to
                    add depth and realism to visual narratives. Each piece is
                    built with attention to space, layering, and emotional tone.
                  </span>
                </Fragment>
              )}
            </p>
          </div>
          <div className="sound-design-2-thq-content-elm thq-grid-auto-300">
            <div className="sound-design-2-thq-feature1-elm thq-flex-column">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="sound-design-2-thq-feature1-title-elm thq-heading-3">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="sound-design-2-text13">
                      Customized Solutions
                    </span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="sound-design-2-text14">
                      Tailored services to meet your unique needs and exceed
                      expectations.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="sound-design-2-thq-feature2-elm thq-flex-column">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="thq-heading-3">
                {props.feature2Title ?? (
                  <Fragment>
                    <span className="sound-design-2-text16">
                      Intuitive Design
                    </span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature2Description ?? (
                  <Fragment>
                    <span className="sound-design-2-text18">
                      User-friendly interfaces that enhance user experience and
                      engagement.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="sound-design-2-thq-feature3-elm thq-flex-column">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="thq-heading-3">
                {props.feature3Title ?? (
                  <Fragment>
                    <span className="sound-design-2-text17">
                      Powerful Analytics Tools
                    </span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature3Description ?? (
                  <Fragment>
                    <span className="sound-design-2-text12">
                      Gain valuable insights and make informed decisions with
                      our advanced analytics.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="sound-design-2-thq-actions-elm thq-flex-row">
            <button className="sound-design-2-thq-button-elm1 thq-button-filled">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span className="sound-design-2-text19">Get Started</span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="sound-design-2-thq-button-elm2 thq-button-outline">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span className="sound-design-2-text11">Learn More</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .sound-design-2-thq-layout300-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .sound-design-2-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            align-items: center;
          }
          .sound-design-2-thq-section-title-elm {
            align-items: center;
          }
          .sound-design-2-thq-text-elm2 {
            text-align: center;
          }
          .sound-design-2-thq-content-elm {
            align-self: stretch;
            align-items: center;
          }
          .sound-design-2-thq-feature1-elm {
            align-items: flex-start;
          }
          .sound-design-2-thq-feature1-title-elm {
            text-align: center;
          }
          .sound-design-2-thq-feature2-elm {
            align-items: flex-start;
          }
          .sound-design-2-thq-feature3-elm {
            align-items: flex-start;
          }
          .sound-design-2-thq-actions-elm {
            align-items: flex-start;
          }
          .sound-design-2-thq-button-elm1 {
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-oneandhalfunits);
            padding-right: var(--dl-layout-space-oneandhalfunits);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .sound-design-2-thq-button-elm2 {
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-oneandhalfunits);
            padding-right: var(--dl-layout-space-oneandhalfunits);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .sound-design-2-text10 {
            display: inline-block;
          }
          .sound-design-2-text11 {
            display: inline-block;
          }
          .sound-design-2-text12 {
            display: inline-block;
          }
          .sound-design-2-text13 {
            display: inline-block;
          }
          .sound-design-2-text14 {
            display: inline-block;
          }
          .sound-design-2-text15 {
            display: inline-block;
          }
          .sound-design-2-text16 {
            display: inline-block;
          }
          .sound-design-2-text17 {
            display: inline-block;
          }
          .sound-design-2-text18 {
            display: inline-block;
          }
          .sound-design-2-text19 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .sound-design-2-thq-section-title-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .sound-design-2-thq-section-title-elm {
              width: auto;
            }
            .sound-design-2-thq-text-elm1 {
              text-align: center;
            }
            .sound-design-2-thq-feature2-elm {
              width: auto;
            }
            .sound-design-2-thq-feature3-elm {
              width: auto;
            }
          }
          @media (max-width: 479px) {
            .sound-design-2-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .sound-design-2-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .sound-design-2-thq-button-elm1 {
              width: 100%;
            }
            .sound-design-2-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

SoundDesign2.defaultProps = {
  sectionDescription: undefined,
  secondaryAction: undefined,
  feature3Description: undefined,
  feature3ImageAlt: 'Powerful Analytics Tools Image',
  feature2ImageSrc: '/Audio/Studio/jeevan%20chandimal_0003_layer%2019-200h.jpg',
  feature1Title: undefined,
  feature2ImageAlt: 'Intuitive Design Image',
  feature1Description: undefined,
  sectionTitle: undefined,
  feature2Title: undefined,
  feature3ImageSrc:
    '/Audio/Studio/194813_381818151878425_1300551683_o-200h.jpg',
  feature3Title: undefined,
  feature2Description: undefined,
  feature1ImageAlt: 'Customized Solutions Image',
  feature1ImageSrc:
    '/Audio/Studio/jeevan%20chandimal_0002_layer%2020-1400w.jpg',
  mainAction: undefined,
}

SoundDesign2.propTypes = {
  sectionDescription: PropTypes.element,
  secondaryAction: PropTypes.element,
  feature3Description: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature1Title: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature1Description: PropTypes.element,
  sectionTitle: PropTypes.element,
  feature2Title: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature3Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  mainAction: PropTypes.element,
}

export default SoundDesign2
