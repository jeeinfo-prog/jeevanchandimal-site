import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MyStoryNew = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <>
      <div className="thq-section-padding">
        <div className="my-story-new-container2 thq-section-max-width">
          <div className="my-story-new-thq-tabs-menu-elm">
            <div
              onClick={() => setActiveTab(0)}
              className="my-story-new-thq-tab-horizontal-elm1"
            >
              <div className="my-story-new-thq-divider-container-elm1">
                {activeTab === 0 && (
                  <div className="my-story-new-container3"></div>
                )}
              </div>
              <div className="my-story-new-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span className="my-story-new-text27">My Story</span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span className="my-story-new-text26">
                        I’m Jeevan Chandimal - a filmmaker and visual
                        storyteller working across film, photography, sound, and
                        motion.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(1)}
              className="my-story-new-thq-tab-horizontal-elm2"
            >
              <div className="my-story-new-thq-divider-container-elm2">
                {activeTab === 1 && (
                  <div className="my-story-new-container4"></div>
                )}
              </div>
              <div className="my-story-new-thq-content-elm2">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span className="my-story-new-text22">
                        <span>
                          I don’t approach projects as separate disciplines.
                        </span>
                        <br></br>
                        <span>
                          Image, movement, and sound are treated as a single
                          language - developed together, shaped with intention,
                          and refined through atmosphere.
                        </span>
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className="my-story-new-thq-tab-horizontal-elm3"
            >
              <div className="my-story-new-thq-divider-container-elm3">
                {activeTab === 2 && (
                  <div className="my-story-new-container5"></div>
                )}
              </div>
              <div className="my-story-new-thq-content-elm3">
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span className="my-story-new-text10">
                        <span>
                          My work is built on stillness, observation, and
                          control.
                        </span>
                        <br></br>
                        <span>
                          Before a frame is captured, the mood is defined.
                        </span>
                        <br></br>
                        <span>Before a camera moves, the reason is clear.</span>
                        <br></br>
                        <span>Before sound is added, space is considered.</span>
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className="my-story-new-thq-tab-horizontal-elm4"
            >
              <div className="my-story-new-thq-divider-container-elm4">
                {activeTab === 2 && (
                  <div className="my-story-new-container6"></div>
                )}
              </div>
              <div className="my-story-new-thq-content-elm4">
                <span className="thq-body-small">
                  {props.feature3Description1 ?? (
                    <Fragment>
                      <span className="my-story-new-text18">
                        <span>
                          Every project begins with a concept - not a format.
                        </span>
                        <br></br>
                        <span>
                          Whether it becomes a film, a photograph, a
                          sound-driven piece, or a motion sequence, the
                          foundation is always the same: story, tone, and
                          presence.
                        </span>
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="my-story-new-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                alt={props.feature1ImgAlt}
                src={props.feature1ImgSrc}
                className="my-story-new-image1 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 1 && (
              <img
                alt={props.feature2ImgAlt}
                src={props.feature2ImgSrc}
                className="my-story-new-image2 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 2 && (
              <img
                alt={props.feature3ImgAlt}
                src={props.feature3ImgSrc}
                className="my-story-new-image3 thq-img-ratio-16-9"
              />
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .my-story-new-container2 {
            width: 100%;
            display: grid;
            grid-gap: var(--dl-layout-space-fiveunits);
            position: relative;
            grid-template-columns: 1fr 1fr;
          }
          .my-story-new-thq-tabs-menu-elm {
            gap: var(--dl-layout-space-twounits);
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .my-story-new-thq-tab-horizontal-elm1 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .my-story-new-thq-divider-container-elm1 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .my-story-new-container3 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .my-story-new-thq-content-elm1 {
            gap: 16px;
            flex: 1;
            display: flex;
            overflow: hidden;
            flex-grow: 1;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
            justify-content: center;
          }
          .my-story-new-thq-tab-horizontal-elm2 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .my-story-new-thq-divider-container-elm2 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .my-story-new-container4 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .my-story-new-thq-content-elm2 {
            gap: 16px;
            flex: 1;
            display: flex;
            overflow: hidden;
            flex-grow: 1;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
            justify-content: center;
          }
          .my-story-new-thq-tab-horizontal-elm3 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .my-story-new-thq-divider-container-elm3 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .my-story-new-container5 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .my-story-new-thq-content-elm3 {
            gap: 16px;
            flex: 1;
            display: flex;
            overflow: hidden;
            flex-grow: 1;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
            justify-content: center;
          }
          .my-story-new-thq-tab-horizontal-elm4 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .my-story-new-thq-divider-container-elm4 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .my-story-new-container6 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .my-story-new-thq-content-elm4 {
            gap: 16px;
            flex: 1;
            display: flex;
            overflow: hidden;
            flex-grow: 1;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
            justify-content: center;
          }
          .my-story-new-thq-image-container-elm {
            height: 100%;
            display: flex;
            position: relative;
          }
          .my-story-new-image1 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .my-story-new-image2 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .my-story-new-image3 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .my-story-new-text10 {
            display: inline-block;
          }
          .my-story-new-text18 {
            display: inline-block;
          }
          .my-story-new-text22 {
            display: inline-block;
          }
          .my-story-new-text26 {
            display: inline-block;
          }
          .my-story-new-text27 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .my-story-new-container2 {
              grid-gap: var(--dl-layout-space-twounits);
              grid-template-columns: 1fr;
            }
            .my-story-new-thq-tabs-menu-elm {
              order: 2;
            }
          }
        `}
      </style>
    </>
  )
}

MyStoryNew.defaultProps = {
  feature3Description: undefined,
  feature3ImgSrc:
    'https://images.unsplash.com/photo-1758613656675-6f548e4f3712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDA2MjM5NHw&ixlib=rb-4.1.0&q=80&w=1080',
  feature3Description1: undefined,
  feature2Description: undefined,
  feature2ImgSrc:
    'https://images.unsplash.com/photo-1525022404438-91321710652d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDA2MjM5NXw&ixlib=rb-4.1.0&q=80&w=1080',
  feature2ImgAlt: 'Visual Aesthetics Image',
  feature1ImgSrc:
    'https://images.unsplash.com/photo-1769112112632-26be33f821b0?ixid=M3w5MTMyMXwwfDF8YWxsfDE0MHx8fHx8fHx8MTc3MDA2MzQ4MXw&ixlib=rb-4.1.0&w=1400',
  feature1Description: undefined,
  feature1ImgAlt: 'Cinematic Storytelling Image',
  feature3ImgAlt: 'Collaborative Projects Image',
  feature1Title: undefined,
}

MyStoryNew.propTypes = {
  feature3Description: PropTypes.element,
  feature3ImgSrc: PropTypes.string,
  feature3Description1: PropTypes.element,
  feature2Description: PropTypes.element,
  feature2ImgSrc: PropTypes.string,
  feature2ImgAlt: PropTypes.string,
  feature1ImgSrc: PropTypes.string,
  feature1Description: PropTypes.element,
  feature1ImgAlt: PropTypes.string,
  feature3ImgAlt: PropTypes.string,
  feature1Title: PropTypes.element,
}

export default MyStoryNew
