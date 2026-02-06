import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const FilmProductionText = (props) => {
  return (
    <>
      <div className="film-production-text-thq-layout186-elm thq-section-padding">
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="film-production-text-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="film-production-text-text1">
                  Film Production
                </span>
              </Fragment>
            )}
          </h2>
          <p className="film-production-text-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="film-production-text-text2">
                  <span>
                    This collection presents cinematic work shaped through
                    story, atmosphere, and visual restraint. Each film is
                    approached as a complete narrative experience, where image,
                    movement, sound, and silence are treated as equal elements.
                  </span>
                  <br></br>
                  <span>
                    The work spans commercial, documentary, short-form, and
                    music-driven storytelling. While formats vary, every project
                    is guided by the same intent — to create films that feel
                    grounded, purposeful, and emotionally present.
                  </span>
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .film-production-text-thq-layout186-elm {
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
          .film-production-text-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .film-production-text-thq-text-elm2 {
            z-index: 2;
            text-align: center;
          }
          .film-production-text-text1 {
            display: inline-block;
          }
          .film-production-text-text2 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

FilmProductionText.defaultProps = {
  feature1Title: undefined,
  feature1Description: undefined,
}

FilmProductionText.propTypes = {
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default FilmProductionText
