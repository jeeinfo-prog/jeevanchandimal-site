import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const VoiceWork = (props) => {
  return (
    <>
      <div className="voice-work-thq-layout300-elm thq-section-padding">
        <div className="voice-work-thq-max-width-elm thq-section-max-width">
          <div className="voice-work-thq-section-title-elm">
            <div className="voice-work-thq-content-elm1">
              <h2 className="voice-work-thq-text-elm1 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="voice-work-text8">Voice Work</span>
                  </Fragment>
                )}
              </h2>
              <span className="voice-work-thq-text-elm2 thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="voice-work-text6">
                      Voice-based audio created for film, narration, and visual
                      storytelling. Clarity, tone, and emotional delivery are
                      prioritized over performance excess.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="voice-work-thq-content-elm2">
            <div className="voice-work-thq-row-elm thq-flex-row">
              <div className="voice-work-thq-feature1-elm">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="voice-work-thq-content-elm3">
                  <h3 className="voice-work-thq-feature1-title-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="voice-work-text1">
                          Film Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="voice-work-text7">
                          Professional film production services tailored to your
                          needs
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="voice-work-thq-feature2-elm">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="voice-work-thq-content-elm4">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="voice-work-text4">
                          Audio Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="voice-work-text2">
                          High-quality audio production for various projects
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="voice-work-thq-feature3-elm">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="voice-work-thq-content-elm5">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="voice-work-text3">
                          Animation &amp; Graphics
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="voice-work-text5">
                          Creative animation and graphics solutions to enhance
                          your content
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
          .voice-work-thq-layout300-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .voice-work-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .voice-work-thq-section-title-elm {
            gap: 16px;
            width: 100%;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .voice-work-thq-content-elm1 {
            gap: 24px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .voice-work-thq-text-elm1 {
            text-align: center;
          }
          .voice-work-thq-text-elm2 {
            text-align: center;
          }
          .voice-work-thq-content-elm2 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .voice-work-thq-row-elm {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
            justify-content: center;
          }
          .voice-work-thq-feature1-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .voice-work-thq-content-elm3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .voice-work-thq-feature1-title-elm {
            text-align: center;
          }
          .voice-work-thq-feature2-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .voice-work-thq-content-elm4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .voice-work-thq-feature3-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .voice-work-thq-content-elm5 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .voice-work-text1 {
            display: inline-block;
          }
          .voice-work-text2 {
            display: inline-block;
          }
          .voice-work-text3 {
            display: inline-block;
          }
          .voice-work-text4 {
            display: inline-block;
          }
          .voice-work-text5 {
            display: inline-block;
          }
          .voice-work-text6 {
            display: inline-block;
          }
          .voice-work-text7 {
            display: inline-block;
          }
          .voice-work-text8 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .voice-work-thq-section-title-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .voice-work-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .voice-work-thq-section-title-elm {
              width: auto;
            }
            .voice-work-thq-text-elm1 {
              text-align: center;
            }
            .voice-work-thq-row-elm {
              flex-direction: column;
            }
            .voice-work-thq-feature2-elm {
              width: auto;
            }
            .voice-work-thq-feature3-elm {
              width: auto;
            }
          }
        `}
      </style>
    </>
  )
}

VoiceWork.defaultProps = {
  feature1Title: undefined,
  feature2Description: undefined,
  feature1ImageSrc:
    '/Audio/Studio/jeevan%20chandimal_0009_layer%2013-1400w.jpg',
  feature3ImageSrc:
    '/Audio/Studio/jeevan%20chandimal_0007_layer%2015-1400w.jpg',
  feature3Title: undefined,
  feature2Title: undefined,
  feature3Description: undefined,
  content1: undefined,
  feature3ImageAlt: 'Animation & Graphics Image',
  feature1Description: undefined,
  heading1: undefined,
  feature1ImageAlt: 'Film Production Image',
  feature2ImageAlt: 'Audio Production Image',
  feature2ImageSrc:
    '/Audio/Studio/jeevan%20chandimal_0008_layer%2014-1400w.jpg',
}

VoiceWork.propTypes = {
  feature1Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature3Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature3Description: PropTypes.element,
  content1: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature1Description: PropTypes.element,
  heading1: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
}

export default VoiceWork
