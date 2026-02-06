import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const HowIApproachAudio = (props) => {
  return (
    <>
      <div
        className={`how-i-approach-audio-thq-layout186-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="how-i-approach-audio-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="how-i-approach-audio-text1">
                  How I Approach Audio
                </span>
              </Fragment>
            )}
          </h2>
          <p className="how-i-approach-audio-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="how-i-approach-audio-text2">
                  <span>
                    I listen before I design. Silence, space, and restraint are
                    as important as sound itself.
                  </span>
                  <br></br>
                  <span>
                    Every layer is shaped to feel intentional — enhancing the
                    story without overpowering it.
                  </span>
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .how-i-approach-audio-thq-layout186-elm {
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
          .how-i-approach-audio-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .how-i-approach-audio-thq-text-elm2 {
            z-index: 2;
            text-align: center;
          }
          .how-i-approach-audio-text1 {
            display: inline-block;
          }
          .how-i-approach-audio-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

HowIApproachAudio.defaultProps = {
  feature1Title: undefined,
  rootClassName: '',
  feature1Description: undefined,
}

HowIApproachAudio.propTypes = {
  feature1Title: PropTypes.element,
  rootClassName: PropTypes.string,
  feature1Description: PropTypes.element,
}

export default HowIApproachAudio
