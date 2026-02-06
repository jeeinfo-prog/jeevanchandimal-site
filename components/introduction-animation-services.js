import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const IntroductionAnimationServices = (props) => {
  return (
    <>
      <div
        className={`introduction-animation-services-thq-layout186-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="introduction-animation-services-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="introduction-animation-services-text1">
                  Introduction
                </span>
              </Fragment>
            )}
          </h2>
          <p className="introduction-animation-services-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="introduction-animation-services-text2">
                  <span>
                    Motion is an extension of visual storytelling. I use
                    animation and motion design to add clarity, structure, and
                    rhythm to ideas - always in service of the narrative.
                  </span>
                  <br></br>
                  <span>
                    The focus is on purpose and restraint, creating movement
                    that feels natural and cinematic.
                  </span>
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .introduction-animation-services-thq-layout186-elm {
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
          .introduction-animation-services-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .introduction-animation-services-thq-text-elm2 {
            z-index: 2;
            text-align: center;
          }
          .introduction-animation-services-text1 {
            display: inline-block;
          }
          .introduction-animation-services-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

IntroductionAnimationServices.defaultProps = {
  feature1Title: undefined,
  feature1Description: undefined,
  rootClassName: '',
}

IntroductionAnimationServices.propTypes = {
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default IntroductionAnimationServices
