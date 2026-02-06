import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const IntroductionPhotographyServices = (props) => {
  return (
    <>
      <div
        className={`introduction-photography-services-thq-layout186-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="introduction-photography-services-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="introduction-photography-services-text1">
                  Introduction
                </span>
              </Fragment>
            )}
          </h2>
          <p className="introduction-photography-services-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="introduction-photography-services-text2">
                  <span>
                    Photography is where my visual language began. I approach
                    still images the same way I approach film — with attention
                    to light, composition, and the feeling a moment carries.
                  </span>
                  <br></br>
                  <span>
                    Each photograph is created to stand on its own, while also
                    fitting naturally into larger visual narratives for
                    editorial, commercial, and artistic use.
                  </span>
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .introduction-photography-services-thq-layout186-elm {
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
          .introduction-photography-services-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .introduction-photography-services-thq-text-elm2 {
            z-index: 2;
            text-align: center;
          }
          .introduction-photography-services-text1 {
            display: inline-block;
          }
          .introduction-photography-services-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

IntroductionPhotographyServices.defaultProps = {
  rootClassName: '',
  feature1Title: undefined,
  feature1Description: undefined,
}

IntroductionPhotographyServices.propTypes = {
  rootClassName: PropTypes.string,
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default IntroductionPhotographyServices
