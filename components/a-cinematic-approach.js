import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ACinematicApproach = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName} `}>
        <div className="a-cinematic-approach-container2 thq-section-max-width">
          <div className="a-cinematic-approach-thq-tabs-menu-elm">
            <div
              onClick={() => setActiveTab(0)}
              className="a-cinematic-approach-thq-tab-horizontal-elm1"
            >
              <div className="a-cinematic-approach-thq-divider-container-elm1">
                {activeTab === 0 && (
                  <div className="a-cinematic-approach-container3"></div>
                )}
              </div>
              <div className="a-cinematic-approach-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span className="a-cinematic-approach-text23">
                        A Cinematic Approach
                      </span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span className="a-cinematic-approach-text15">
                        <span>
                          I work with a film-led mindset, even when the output
                          is still imagery or sound.
                        </span>
                        <br></br>
                        <span>Lighting is treated as narrative.</span>
                        <br></br>
                        <span>Movement is deliberate, never decorative.</span>
                        <br></br>
                        <span>
                          Sound is designed to support emotion, not overwhelm
                          it.
                        </span>
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(1)}
              className="a-cinematic-approach-thq-tab-horizontal-elm2"
            >
              <div className="a-cinematic-approach-thq-divider-container-elm2">
                {activeTab === 1 && (
                  <div className="a-cinematic-approach-container4"></div>
                )}
              </div>
              <div className="a-cinematic-approach-thq-content-elm2">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span className="a-cinematic-approach-text10">
                        This approach allows each project to feel cohesive - not
                        assembled.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className="a-cinematic-approach-thq-tab-horizontal-elm3"
            >
              <div className="a-cinematic-approach-thq-divider-container-elm3">
                {activeTab === 2 && (
                  <div className="a-cinematic-approach-container5"></div>
                )}
              </div>
              <div className="a-cinematic-approach-thq-content-elm3">
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span className="a-cinematic-approach-text11">
                        <span>
                          Film, photography, audio, and animation are developed
                          side by side, not added in layers.
                        </span>
                        <br></br>
                        <span>
                          The result is work that feels considered, restrained,
                          and immersive.
                        </span>
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="a-cinematic-approach-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                alt={props.feature1ImgAlt}
                src={props.feature1ImgSrc}
                className="a-cinematic-approach-image1 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 1 && (
              <img
                alt={props.feature2ImgAlt}
                src={props.feature2ImgSrc}
                className="a-cinematic-approach-image2 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 2 && (
              <img
                alt={props.feature3ImgAlt}
                src={props.feature3ImgSrc}
                className="a-cinematic-approach-image3 thq-img-ratio-16-9"
              />
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .a-cinematic-approach-container2 {
            width: 100%;
            display: grid;
            grid-gap: var(--dl-layout-space-fiveunits);
            position: relative;
            grid-template-columns: 1fr 1fr;
          }
          .a-cinematic-approach-thq-tabs-menu-elm {
            gap: var(--dl-layout-space-twounits);
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .a-cinematic-approach-thq-tab-horizontal-elm1 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .a-cinematic-approach-thq-divider-container-elm1 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .a-cinematic-approach-container3 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .a-cinematic-approach-thq-content-elm1 {
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
          .a-cinematic-approach-thq-tab-horizontal-elm2 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .a-cinematic-approach-thq-divider-container-elm2 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .a-cinematic-approach-container4 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .a-cinematic-approach-thq-content-elm2 {
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
          .a-cinematic-approach-thq-tab-horizontal-elm3 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .a-cinematic-approach-thq-divider-container-elm3 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .a-cinematic-approach-container5 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .a-cinematic-approach-thq-content-elm3 {
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
          .a-cinematic-approach-thq-image-container-elm {
            height: 100%;
            display: flex;
            position: relative;
          }
          .a-cinematic-approach-image1 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .a-cinematic-approach-image2 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .a-cinematic-approach-image3 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .a-cinematic-approach-text10 {
            display: inline-block;
          }
          .a-cinematic-approach-text11 {
            display: inline-block;
          }
          .a-cinematic-approach-text15 {
            display: inline-block;
          }
          .a-cinematic-approach-text23 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .a-cinematic-approach-container2 {
              grid-gap: var(--dl-layout-space-twounits);
              grid-template-columns: 1fr;
            }
            .a-cinematic-approach-thq-tabs-menu-elm {
              order: 2;
            }
          }
        `}
      </style>
    </>
  )
}

ACinematicApproach.defaultProps = {
  rootClassName: '',
  feature3ImgSrc:
    'https://images.unsplash.com/photo-1758613656675-6f548e4f3712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDA2MjM5NHw&ixlib=rb-4.1.0&q=80&w=1080',
  feature2Description: undefined,
  feature1ImgAlt: 'Cinematic Storytelling Image',
  feature1ImgSrc:
    'https://images.unsplash.com/photo-1769295746989-9b2144a4e20c?ixid=M3w5MTMyMXwwfDF8YWxsfDg4fHx8fHx8fHwxNzcwMDYzMzcyfA&ixlib=rb-4.1.0&w=1400',
  feature2ImgSrc:
    'https://images.unsplash.com/photo-1525022404438-91321710652d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDA2MjM5NXw&ixlib=rb-4.1.0&q=80&w=1080',
  feature3Description: undefined,
  feature1Description: undefined,
  feature2ImgAlt: 'Visual Aesthetics Image',
  feature3ImgAlt: 'Collaborative Projects Image',
  feature1Title: undefined,
}

ACinematicApproach.propTypes = {
  rootClassName: PropTypes.string,
  feature3ImgSrc: PropTypes.string,
  feature2Description: PropTypes.element,
  feature1ImgAlt: PropTypes.string,
  feature1ImgSrc: PropTypes.string,
  feature2ImgSrc: PropTypes.string,
  feature3Description: PropTypes.element,
  feature1Description: PropTypes.element,
  feature2ImgAlt: PropTypes.string,
  feature3ImgAlt: PropTypes.string,
  feature1Title: PropTypes.element,
}

export default ACinematicApproach
