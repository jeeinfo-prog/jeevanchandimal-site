import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Process01 = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName} `}>
        <div className="process-01-container2 thq-section-max-width">
          <div className="process-01-thq-tabs-menu-elm">
            <div
              onClick={() => setActiveTab(0)}
              className="process-01-thq-tab-horizontal-elm1"
            >
              <div className="process-01-thq-divider-container-elm1">
                {activeTab === 0 && (
                  <div className="process-01-container3"></div>
                )}
              </div>
              <div className="process-01-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title2 ?? (
                    <Fragment>
                      <span className="process-01-text3">Process</span>
                    </Fragment>
                  )}
                </h2>
                <h2 className="thq-heading-3">
                  {props.feature1Title11 ?? (
                    <Fragment>
                      <span className="process-01-text6">Concept First</span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.feature1Description2 ?? (
                    <Fragment>
                      <span className="process-01-text1">
                        Every collaboration begins with intention. We define the
                        atmosphere, the emotional direction, and the story
                        before production begins.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className="process-01-thq-tab-horizontal-elm2"
            >
              <div className="process-01-thq-divider-container-elm2">
                {activeTab === 2 && (
                  <div className="process-01-container4"></div>
                )}
              </div>
              <div className="process-01-thq-content-elm2">
                <h2 className="thq-heading-3">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span className="process-01-text4">
                        Observation Over Noise
                      </span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span className="process-01-text7">
                        I prefer quiet moments to forced gestures. Real presence
                        over performance. Stillness often reveals more than
                        motion.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className="process-01-thq-tab-horizontal-elm3"
            >
              <div className="process-01-thq-divider-container-elm3">
                {activeTab === 2 && (
                  <div className="process-01-container5"></div>
                )}
              </div>
              <div className="process-01-thq-content-elm3">
                <h2 className="thq-heading-3">
                  {props.feature3Title1 ?? (
                    <Fragment>
                      <span className="process-01-text5">
                        Craft &amp; Detail
                      </span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.feature3Description1 ?? (
                    <Fragment>
                      <span className="process-01-text2">
                        From lighting and composition to sound texture and
                        pacing, every element is refined with care. Small
                        decisions shape the final experience.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="process-01-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                alt={props.feature1ImgAlt}
                src={props.feature1ImgSrc}
                className="process-01-image1 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 1 && (
              <img
                alt={props.feature2ImgAlt}
                src={props.feature2ImgSrc}
                className="process-01-image2 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 2 && (
              <img
                alt={props.feature3ImgAlt}
                src={props.feature3ImgSrc}
                className="process-01-image3 thq-img-ratio-16-9"
              />
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .process-01-container2 {
            width: 100%;
            display: grid;
            grid-gap: var(--dl-layout-space-fiveunits);
            position: relative;
            grid-template-columns: 1fr 1fr;
          }
          .process-01-thq-tabs-menu-elm {
            gap: var(--dl-layout-space-twounits);
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .process-01-thq-tab-horizontal-elm1 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .process-01-thq-divider-container-elm1 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .process-01-container3 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .process-01-thq-content-elm1 {
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
          .process-01-thq-tab-horizontal-elm2 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .process-01-thq-divider-container-elm2 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .process-01-container4 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .process-01-thq-content-elm2 {
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
          .process-01-thq-tab-horizontal-elm3 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .process-01-thq-divider-container-elm3 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .process-01-container5 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .process-01-thq-content-elm3 {
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
          .process-01-thq-image-container-elm {
            height: 100%;
            display: flex;
            position: relative;
          }
          .process-01-image1 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .process-01-image2 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .process-01-image3 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .process-01-text1 {
            display: inline-block;
          }
          .process-01-text2 {
            display: inline-block;
          }
          .process-01-text3 {
            display: inline-block;
          }
          .process-01-text4 {
            display: inline-block;
          }
          .process-01-text5 {
            display: inline-block;
          }
          .process-01-text6 {
            display: inline-block;
          }
          .process-01-text7 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .process-01-container2 {
              grid-gap: var(--dl-layout-space-twounits);
              grid-template-columns: 1fr;
            }
            .process-01-thq-tabs-menu-elm {
              order: 2;
            }
          }
        `}
      </style>
    </>
  )
}

Process01.defaultProps = {
  feature1Description2: undefined,
  feature2ImgAlt: 'Photography Image',
  feature1ImgAlt: 'Film Image',
  feature3Description1: undefined,
  feature1Title2: undefined,
  feature1ImgSrc:
    'https://images.unsplash.com/photo-1769399287730-6e42c3990377?ixid=M3w5MTMyMXwwfDF8YWxsfDU0fHx8fHx8fHwxNzcwMDYzMTM1fA&ixlib=rb-4.1.0&w=1400',
  feature3Title: undefined,
  feature3Title1: undefined,
  rootClassName: '',
  feature3ImgSrc:
    'https://images.unsplash.com/photo-1496492813606-88559707e685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDA2MjkwOHw&ixlib=rb-4.1.0&q=80&w=1080',
  feature1Title11: undefined,
  feature2ImgSrc:
    'https://images.unsplash.com/photo-1759417501248-0aa9489dab3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDA2MjkwOXw&ixlib=rb-4.1.0&q=80&w=1080',
  feature3Description: undefined,
  feature3ImgAlt: 'Sound Image',
}

Process01.propTypes = {
  feature1Description2: PropTypes.element,
  feature2ImgAlt: PropTypes.string,
  feature1ImgAlt: PropTypes.string,
  feature3Description1: PropTypes.element,
  feature1Title2: PropTypes.element,
  feature1ImgSrc: PropTypes.string,
  feature3Title: PropTypes.element,
  feature3Title1: PropTypes.element,
  rootClassName: PropTypes.string,
  feature3ImgSrc: PropTypes.string,
  feature1Title11: PropTypes.element,
  feature2ImgSrc: PropTypes.string,
  feature3Description: PropTypes.element,
  feature3ImgAlt: PropTypes.string,
}

export default Process01
