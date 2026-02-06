import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const HowIApproachPhotography = (props) => {
  return (
    <>
      <div
        className={`how-i-approach-photography-thq-layout186-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="how-i-approach-photography-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="how-i-approach-photography-text1">
                  How I Approach Photography
                </span>
              </Fragment>
            )}
          </h2>
          <p className="how-i-approach-photography-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="how-i-approach-photography-text2">
                  <span>
                    I look for moments that feel honest and unforced. Light,
                    timing, and stillness matter more than spectacle.
                  </span>
                  <br></br>
                  <span>
                    Whether working in controlled environments or in the field,
                    the goal is always the same — to create images that feel
                    considered, immersive, and lasting.
                  </span>
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .how-i-approach-photography-thq-layout186-elm {
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
          .how-i-approach-photography-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .how-i-approach-photography-thq-text-elm2 {
            z-index: 2;
            text-align: center;
          }
          .how-i-approach-photography-text1 {
            display: inline-block;
          }
          .how-i-approach-photography-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

HowIApproachPhotography.defaultProps = {
  feature1Title: undefined,
  rootClassName: '',
  feature1Description: undefined,
}

HowIApproachPhotography.propTypes = {
  feature1Title: PropTypes.element,
  rootClassName: PropTypes.string,
  feature1Description: PropTypes.element,
}

export default HowIApproachPhotography
