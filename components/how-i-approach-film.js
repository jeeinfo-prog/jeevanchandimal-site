import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const HowIApproachFilm = (props) => {
  return (
    <>
      <div className="how-i-approach-film-thq-layout186-elm thq-section-padding">
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="how-i-approach-film-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="how-i-approach-film-text1">
                  How I Approach Film
                </span>
              </Fragment>
            )}
          </h2>
          <p className="how-i-approach-film-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="how-i-approach-film-text2">
                  <span>
                    Story comes first. Before cameras, equipment, or timelines,
                    the focus is always on meaning, mood, and visual language.
                  </span>
                  <br></br>
                  <span>
                    I treat film as a layered experience — where composition,
                    movement, sound, and silence work together. Every choice is
                    made to serve the story, not the spectacle.
                  </span>
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .how-i-approach-film-thq-layout186-elm {
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
          .how-i-approach-film-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .how-i-approach-film-thq-text-elm2 {
            z-index: 2;
            text-align: center;
          }
          .how-i-approach-film-text1 {
            display: inline-block;
          }
          .how-i-approach-film-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

HowIApproachFilm.defaultProps = {
  feature1Title: undefined,
  feature1Description: undefined,
}

HowIApproachFilm.propTypes = {
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default HowIApproachFilm
