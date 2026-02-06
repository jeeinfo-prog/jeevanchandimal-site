import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MyStory = (props) => {
  return (
    <>
      <div className="my-story-thq-layout186-elm thq-section-padding">
        <div className="thq-section-max-width thq-flex-column">
          <h2 className="my-story-thq-text-elm1 thq-heading-2">
            {props.feature1Title ?? (
              <Fragment>
                <span className="my-story-text1">My Story</span>
              </Fragment>
            )}
          </h2>
          <p className="my-story-thq-text-elm2 thq-body-large">
            {props.feature1Description ?? (
              <Fragment>
                <span className="my-story-text2">
                  <span>
                    I began with photography, drawn to light, mood, and quiet
                    human moments. What started as capturing frames slowly
                    expanded into motion, then sound, then full visual worlds
                    Curiosity led the way - from still images to moving stories,
                    from visuals to the textures of audio.
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    Over time, that exploration shaped a multidisciplinary
                    approach. Today, every project I create blends visual
                    composition, motion, and sound into one cohesive language -
                    because powerful storytelling doesn’t live in just one
                    medium.
                  </span>
                </span>
              </Fragment>
            )}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .my-story-thq-layout186-elm {
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
          .my-story-thq-text-elm1 {
            z-index: 2;
            text-align: center;
          }
          .my-story-thq-text-elm2 {
            z-index: 2;
            text-align: justify;
          }
          .my-story-text1 {
            display: inline-block;
          }
          .my-story-text2 {
            display: inline-block;
            text-align: left;
          }
        `}
      </style>
    </>
  )
}

MyStory.defaultProps = {
  feature1Title: undefined,
  feature1Description: undefined,
}

MyStory.propTypes = {
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
}

export default MyStory
