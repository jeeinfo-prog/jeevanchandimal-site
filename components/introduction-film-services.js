import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const IntroductionFilmServices = (props) => {
  return (
    <>
      <div className="introduction-film-services-thq-layout186-elm thq-section-padding">
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="introduction-film-services-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="introduction-film-services-text1">
                  Introduction
                </span>
              </Fragment>
            )}
          </h2>
          <p className="introduction-film-services-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="introduction-film-services-text2">
                  <span>
                    I offer end-to-end film production shaped by cinematic
                    intent. Every project is approached as a complete visual
                    experience - carefully composed, emotionally grounded, and
                    refined through sound, movement, and pacing.
                  </span>
                  <br></br>
                  <span>
                    From early concept development to final cut, I work across
                    the full filmmaking process to create films that feel
                    intentional, immersive, and lasting.
                  </span>
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .introduction-film-services-thq-layout186-elm {
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
          .introduction-film-services-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .introduction-film-services-thq-text-elm2 {
            z-index: 2;
            text-align: center;
          }
          .introduction-film-services-text1 {
            display: inline-block;
          }
          .introduction-film-services-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

IntroductionFilmServices.defaultProps = {
  feature1Title: undefined,
  feature1Description: undefined,
}

IntroductionFilmServices.propTypes = {
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default IntroductionFilmServices
