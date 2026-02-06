import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const HowIApproachMotion = (props) => {
  return (
    <>
      <div
        className={`how-i-approach-motion-thq-layout186-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="how-i-approach-motion-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="how-i-approach-motion-text1">
                  How I Approach Motion
                </span>
              </Fragment>
            )}
          </h2>
          <p className="how-i-approach-motion-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="how-i-approach-motion-text2">
                  <span>
                    Every movement has intention. Timing, rhythm, and simplicity
                    guide each decision.
                  </span>
                  <br></br>
                  <span>
                    Animation is used to strengthen the story — never to
                    overwhelm it.
                  </span>
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .how-i-approach-motion-thq-layout186-elm {
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
          .how-i-approach-motion-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .how-i-approach-motion-thq-text-elm2 {
            z-index: 2;
            text-align: center;
          }
          .how-i-approach-motion-text1 {
            display: inline-block;
          }
          .how-i-approach-motion-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

HowIApproachMotion.defaultProps = {
  feature1Title: undefined,
  feature1Description: undefined,
  rootClassName: '',
}

HowIApproachMotion.propTypes = {
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default HowIApproachMotion
