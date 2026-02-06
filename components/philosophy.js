import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Philosophy = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName} `}>
        <div className="philosophy-container2 thq-section-max-width">
          <div className="philosophy-thq-tabs-menu-elm">
            <div
              onClick={() => setActiveTab(0)}
              className="philosophy-thq-tab-horizontal-elm1"
            >
              <div className="philosophy-thq-divider-container-elm1">
                {activeTab === 0 && (
                  <div className="philosophy-container3"></div>
                )}
              </div>
              <div className="philosophy-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span className="philosophy-text3">Philosophy</span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span className="philosophy-text1">
                        I work with individuals, brands, and agencies who value
                        clarity, mood, and storytelling over volume.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(1)}
              className="philosophy-thq-tab-horizontal-elm2"
            >
              <div className="philosophy-thq-divider-container-elm2">
                {activeTab === 1 && (
                  <div className="philosophy-container4"></div>
                )}
              </div>
              <div className="philosophy-thq-content-elm2">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span className="philosophy-text2">
                        Whether it’s a film, a photograph, or a soundscape, the
                        goal is the same - create work that carries emotion,
                        texture, and presence. Story over spectacle. Mood over
                        noise. Meaning over excess.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="philosophy-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                alt={props.feature1ImgAlt}
                src={props.feature1ImgSrc}
                className="philosophy-image1 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 1 && (
              <img
                alt={props.feature2ImgAlt}
                src={props.feature2ImgSrc}
                className="philosophy-image2 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 2 && (
              <img
                alt={props.feature3ImgAlt}
                src={props.feature3ImgSrc}
                className="philosophy-image3 thq-img-ratio-16-9"
              />
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .philosophy-container2 {
            width: 100%;
            display: grid;
            grid-gap: var(--dl-layout-space-fiveunits);
            position: relative;
            grid-template-columns: 1fr 1fr;
          }
          .philosophy-thq-tabs-menu-elm {
            gap: var(--dl-layout-space-twounits);
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .philosophy-thq-tab-horizontal-elm1 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .philosophy-thq-divider-container-elm1 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .philosophy-container3 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .philosophy-thq-content-elm1 {
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
          .philosophy-thq-tab-horizontal-elm2 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .philosophy-thq-divider-container-elm2 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .philosophy-container4 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .philosophy-thq-content-elm2 {
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
          .philosophy-thq-image-container-elm {
            height: 100%;
            display: flex;
            position: relative;
          }
          .philosophy-image1 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .philosophy-image2 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .philosophy-image3 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .philosophy-text1 {
            display: inline-block;
          }
          .philosophy-text2 {
            display: inline-block;
          }
          .philosophy-text3 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .philosophy-container2 {
              grid-gap: var(--dl-layout-space-twounits);
              grid-template-columns: 1fr;
            }
            .philosophy-thq-tabs-menu-elm {
              order: 2;
            }
          }
        `}
      </style>
    </>
  )
}

Philosophy.defaultProps = {
  feature3ImgSrc:
    'https://images.unsplash.com/photo-1758613656675-6f548e4f3712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDA2MjM5NHw&ixlib=rb-4.1.0&q=80&w=1080',
  feature1Description: undefined,
  feature2ImgSrc:
    'https://images.unsplash.com/photo-1525022404438-91321710652d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDA2MjM5NXw&ixlib=rb-4.1.0&q=80&w=1080',
  feature1ImgSrc:
    'https://images.unsplash.com/photo-1769295746989-9b2144a4e20c?ixid=M3w5MTMyMXwwfDF8YWxsfDg4fHx8fHx8fHwxNzcwMDYzMzcyfA&ixlib=rb-4.1.0&w=1400',
  feature1ImgAlt: 'Cinematic Storytelling Image',
  feature3ImgAlt: 'Collaborative Projects Image',
  feature2Description: undefined,
  feature1Title: undefined,
  feature2ImgAlt: 'Visual Aesthetics Image',
  rootClassName: '',
}

Philosophy.propTypes = {
  feature3ImgSrc: PropTypes.string,
  feature1Description: PropTypes.element,
  feature2ImgSrc: PropTypes.string,
  feature1ImgSrc: PropTypes.string,
  feature1ImgAlt: PropTypes.string,
  feature3ImgAlt: PropTypes.string,
  feature2Description: PropTypes.element,
  feature1Title: PropTypes.element,
  feature2ImgAlt: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Philosophy
