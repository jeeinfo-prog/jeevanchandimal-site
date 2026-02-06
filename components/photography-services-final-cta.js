import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const PhotographyServicesFinalCTA = (props) => {
  return (
    <>
      <div
        className={`photography-services-final-cta-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="photography-services-final-cta-thq-max-width-elm thq-section-max-width">
          <div className="photography-services-final-cta-thq-content-elm">
            <h2 className="photography-services-final-cta-thq-heading1-elm thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="photography-services-final-cta-text2">
                    Looking for imagery with depth and intention?
                  </span>
                </Fragment>
              )}
            </h2>
            <p className="photography-services-final-cta-thq-content1-elm thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="photography-services-final-cta-text3">
                    Let’s create something with clarity, atmosphere, and
                    purpose.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="photography-services-final-cta-thq-actions-elm">
              <button className="thq-button-outline photography-services-final-cta-thq-button-elm">
                <span className="photography-services-final-cta-thq-action2-elm thq-body-small">
                  {props.action2 ?? (
                    <Fragment>
                      <span className="photography-services-final-cta-text1">
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
          .photography-services-final-cta-container {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            overflow: hidden;
            position: relative;
            flex-direction: column;
          }
          .photography-services-final-cta-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .photography-services-final-cta-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .photography-services-final-cta-thq-heading1-elm {
            text-align: center;
          }
          .photography-services-final-cta-thq-content1-elm {
            text-align: center;
          }
          .photography-services-final-cta-thq-actions-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-items: flex-start;
          }
          .photography-services-final-cta-thq-action2-elm {
            text-align: center;
          }
          .photography-services-final-cta-text1 {
            display: inline-block;
          }
          .photography-services-final-cta-text2 {
            display: inline-block;
          }
          .photography-services-final-cta-text3 {
            display: inline-block;
          }

          @media (max-width: 479px) {
            .photography-services-final-cta-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .photography-services-final-cta-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

PhotographyServicesFinalCTA.defaultProps = {
  action2: undefined,
  heading1: undefined,
  rootClassName: '',
  content1: undefined,
}

PhotographyServicesFinalCTA.propTypes = {
  action2: PropTypes.element,
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
  content1: PropTypes.element,
}

export default PhotographyServicesFinalCTA
