import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const IntroductionAudioServices = (props) => {
  return (
    <>
      <div
        className={`introduction-audio-services-thq-layout186-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="introduction-audio-services-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="introduction-audio-services-text1">
                  Introduction
                </span>
              </Fragment>
            )}
          </h2>
          <p className="introduction-audio-services-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="introduction-audio-services-text2">
                  <span>
                    Sound shapes how a story is felt. I approach audio with the
                    same care as image and motion, focusing on texture, space,
                    and emotional impact.
                  </span>
                  <br></br>
                  <span>
                    From subtle atmospheres to full compositions, audio is
                    crafted to support narrative, rhythm, and cinematic flow.
                  </span>
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .introduction-audio-services-thq-layout186-elm {
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
          .introduction-audio-services-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .introduction-audio-services-thq-text-elm2 {
            z-index: 2;
            text-align: center;
          }
          .introduction-audio-services-text1 {
            display: inline-block;
          }
          .introduction-audio-services-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

IntroductionAudioServices.defaultProps = {
  rootClassName: '',
  feature1Title: undefined,
  feature1Description: undefined,
}

IntroductionAudioServices.propTypes = {
  rootClassName: PropTypes.string,
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default IntroductionAudioServices
