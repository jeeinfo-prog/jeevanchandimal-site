import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ServicesAudioFinalCTA = (props) => {
  return (
    <>
      <div
        className={`services-audio-final-cta-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="services-audio-final-cta-thq-max-width-elm thq-section-max-width">
          <div className="services-audio-final-cta-thq-content-elm">
            <h2 className="services-audio-final-cta-thq-heading1-elm thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="services-audio-final-cta-text1">
                    Have a story that needs sound?
                  </span>
                </Fragment>
              )}
            </h2>
            <p className="services-audio-final-cta-thq-content1-elm thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="services-audio-final-cta-text2">
                    Let’s shape it with depth, texture, and emotional clarity.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="services-audio-final-cta-thq-actions-elm">
              <button className="thq-button-outline services-audio-final-cta-thq-button-elm">
                <span className="services-audio-final-cta-thq-action2-elm thq-body-small">
                  {props.action2 ?? (
                    <Fragment>
                      <span className="services-audio-final-cta-text3">
                        Create Together
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .services-audio-final-cta-container {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            overflow: hidden;
            position: relative;
            flex-direction: column;
          }
          .services-audio-final-cta-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .services-audio-final-cta-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .services-audio-final-cta-thq-heading1-elm {
            text-align: center;
          }
          .services-audio-final-cta-thq-content1-elm {
            text-align: center;
          }
          .services-audio-final-cta-thq-actions-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-items: flex-start;
          }
          .services-audio-final-cta-thq-action2-elm {
            text-align: center;
          }
          .services-audio-final-cta-text1 {
            display: inline-block;
          }
          .services-audio-final-cta-text2 {
            display: inline-block;
          }
          .services-audio-final-cta-text3 {
            display: inline-block;
          }

          @media (max-width: 479px) {
            .services-audio-final-cta-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .services-audio-final-cta-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

ServicesAudioFinalCTA.defaultProps = {
  heading1: undefined,
  content1: undefined,
  rootClassName: '',
  action2: undefined,
}

ServicesAudioFinalCTA.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,
  action2: PropTypes.element,
}

export default ServicesAudioFinalCTA
