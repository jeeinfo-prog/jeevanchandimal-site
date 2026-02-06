import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ServicesAnimationFinalCTA = (props) => {
  return (
    <>
      <div
        className={`services-animation-final-cta-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="services-animation-final-cta-thq-max-width-elm thq-section-max-width">
          <div className="services-animation-final-cta-thq-content-elm">
            <h2 className="services-animation-final-cta-thq-heading1-elm thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="services-animation-final-cta-text1">
                    Have a story that needs movement?
                  </span>
                </Fragment>
              )}
            </h2>
            <p className="services-animation-final-cta-thq-content1-elm thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="services-animation-final-cta-text2">
                    Let’s bring it to life with clarity, rhythm, and visual
                    intent.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="services-animation-final-cta-thq-actions-elm">
              <button className="thq-button-outline services-animation-final-cta-thq-button-elm">
                <span className="services-animation-final-cta-thq-action2-elm thq-body-small">
                  {props.action2 ?? (
                    <Fragment>
                      <span className="services-animation-final-cta-text3">
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
          .services-animation-final-cta-container {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            overflow: hidden;
            position: relative;
            flex-direction: column;
          }
          .services-animation-final-cta-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .services-animation-final-cta-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .services-animation-final-cta-thq-heading1-elm {
            text-align: center;
          }
          .services-animation-final-cta-thq-content1-elm {
            text-align: center;
          }
          .services-animation-final-cta-thq-actions-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-items: flex-start;
          }
          .services-animation-final-cta-thq-action2-elm {
            text-align: center;
          }
          .services-animation-final-cta-text1 {
            display: inline-block;
          }
          .services-animation-final-cta-text2 {
            display: inline-block;
          }
          .services-animation-final-cta-text3 {
            display: inline-block;
          }

          @media (max-width: 479px) {
            .services-animation-final-cta-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .services-animation-final-cta-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

ServicesAnimationFinalCTA.defaultProps = {
  rootClassName: '',
  heading1: undefined,
  content1: undefined,
  action2: undefined,
}

ServicesAnimationFinalCTA.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  action2: PropTypes.element,
}

export default ServicesAnimationFinalCTA
