import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ServiceFilmProcess = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName} `}>
        <div className="service-film-process-container2 thq-section-max-width">
          <div className="service-film-process-thq-tabs-menu-elm">
            <div
              onClick={() => setActiveTab(0)}
              className="service-film-process-thq-tab-horizontal-elm1"
            >
              <div className="service-film-process-thq-divider-container-elm1">
                {activeTab === 0 && (
                  <div className="service-film-process-container3"></div>
                )}
              </div>
              <div className="service-film-process-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title2 ?? (
                    <Fragment>
                      <span className="service-film-process-text3">
                        Process
                      </span>
                    </Fragment>
                  )}
                </h2>
                <h2 className="thq-heading-3">
                  {props.feature1Title11 ?? (
                    <Fragment>
                      <span className="service-film-process-text2">
                        Discovery &amp; Concept
                      </span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.feature1Description2 ?? (
                    <Fragment>
                      <span className="service-film-process-text8">
                        Understanding the idea, intention, and emotional
                        direction of the project.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className="service-film-process-thq-tab-horizontal-elm2"
            >
              <div className="service-film-process-thq-divider-container-elm2">
                {activeTab === 2 && (
                  <div className="service-film-process-container4"></div>
                )}
              </div>
              <div className="service-film-process-thq-content-elm2">
                <h2 className="thq-heading-3">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span className="service-film-process-text6">
                        Visual Direction
                      </span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span className="service-film-process-text9">
                        Shaping the look, rhythm, and cinematic language of the
                        film.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className="service-film-process-thq-tab-horizontal-elm3"
            >
              <div className="service-film-process-thq-divider-container-elm3">
                {activeTab === 2 && (
                  <div className="service-film-process-container5"></div>
                )}
              </div>
              <div className="service-film-process-thq-content-elm3">
                <h2 className="thq-heading-3">
                  {props.feature3Title1 ?? (
                    <Fragment>
                      <span className="service-film-process-text5">
                        Production &amp; Post
                      </span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.feature3Description1 ?? (
                    <Fragment>
                      <span className="service-film-process-text1">
                        Careful execution through filming, editing, sound
                        design, and grading.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className="service-film-process-thq-tab-horizontal-elm4"
            >
              <div className="service-film-process-thq-divider-container-elm4">
                {activeTab === 2 && (
                  <div className="service-film-process-container6"></div>
                )}
              </div>
              <div className="service-film-process-thq-content-elm4">
                <h2 className="thq-heading-3">
                  {props.feature3Title11 ?? (
                    <Fragment>
                      <span className="service-film-process-text4">
                        Final Delivery
                      </span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.feature3Description11 ?? (
                    <Fragment>
                      <span className="service-film-process-text7">
                        A refined, complete film ready for its intended audience
                        and platform.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="service-film-process-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                alt={props.feature1ImgAlt}
                src={props.feature1ImgSrc}
                className="service-film-process-image1 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 1 && (
              <img
                alt={props.feature2ImgAlt}
                src={props.feature2ImgSrc}
                className="service-film-process-image2 thq-img-ratio-16-9"
              />
            )}
            {activeTab === 2 && (
              <img
                alt={props.feature3ImgAlt}
                src={props.feature3ImgSrc}
                className="service-film-process-image3 thq-img-ratio-16-9"
              />
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .service-film-process-container2 {
            width: 100%;
            display: grid;
            grid-gap: var(--dl-layout-space-fiveunits);
            position: relative;
            grid-template-columns: 1fr 1fr;
          }
          .service-film-process-thq-tabs-menu-elm {
            gap: var(--dl-layout-space-twounits);
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .service-film-process-thq-tab-horizontal-elm1 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .service-film-process-thq-divider-container-elm1 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .service-film-process-container3 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .service-film-process-thq-content-elm1 {
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
          .service-film-process-thq-tab-horizontal-elm2 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .service-film-process-thq-divider-container-elm2 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .service-film-process-container4 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .service-film-process-thq-content-elm2 {
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
          .service-film-process-thq-tab-horizontal-elm3 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .service-film-process-thq-divider-container-elm3 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .service-film-process-container5 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .service-film-process-thq-content-elm3 {
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
          .service-film-process-thq-tab-horizontal-elm4 {
            gap: var(--dl-layout-space-twounits);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .service-film-process-thq-divider-container-elm4 {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
          }
          .service-film-process-container6 {
            width: 2px;
            align-self: stretch;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .service-film-process-thq-content-elm4 {
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
          .service-film-process-thq-image-container-elm {
            height: 100%;
            display: flex;
            position: relative;
          }
          .service-film-process-image1 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .service-film-process-image2 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .service-film-process-image3 {
            animation-name: fadeIn;
            animation-delay: 0s;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .service-film-process-text1 {
            display: inline-block;
          }
          .service-film-process-text2 {
            display: inline-block;
          }
          .service-film-process-text3 {
            display: inline-block;
          }
          .service-film-process-text4 {
            display: inline-block;
          }
          .service-film-process-text5 {
            display: inline-block;
          }
          .service-film-process-text6 {
            display: inline-block;
          }
          .service-film-process-text7 {
            display: inline-block;
          }
          .service-film-process-text8 {
            display: inline-block;
          }
          .service-film-process-text9 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .service-film-process-container2 {
              grid-gap: var(--dl-layout-space-twounits);
              grid-template-columns: 1fr;
            }
            .service-film-process-thq-tabs-menu-elm {
              order: 2;
            }
          }
        `}
      </style>
    </>
  )
}

ServiceFilmProcess.defaultProps = {
  feature3Description1: undefined,
  feature1Title11: undefined,
  feature2ImgAlt: 'Photography Image',
  rootClassName: '',
  feature1Title2: undefined,
  feature3ImgAlt: 'Sound Image',
  feature3Title11: undefined,
  feature3Title1: undefined,
  feature2ImgSrc:
    'https://images.unsplash.com/photo-1759417501248-0aa9489dab3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDA2MjkwOXw&ixlib=rb-4.1.0&q=80&w=1080',
  feature1ImgSrc:
    'https://images.unsplash.com/photo-1769399287730-6e42c3990377?ixid=M3w5MTMyMXwwfDF8YWxsfDU0fHx8fHx8fHwxNzcwMDYzMTM1fA&ixlib=rb-4.1.0&w=1400',
  feature3Title: undefined,
  feature1ImgAlt: 'Film Image',
  feature3Description11: undefined,
  feature1Description2: undefined,
  feature3Description: undefined,
  feature3ImgSrc:
    'https://images.unsplash.com/photo-1496492813606-88559707e685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc3MDA2MjkwOHw&ixlib=rb-4.1.0&q=80&w=1080',
}

ServiceFilmProcess.propTypes = {
  feature3Description1: PropTypes.element,
  feature1Title11: PropTypes.element,
  feature2ImgAlt: PropTypes.string,
  rootClassName: PropTypes.string,
  feature1Title2: PropTypes.element,
  feature3ImgAlt: PropTypes.string,
  feature3Title11: PropTypes.element,
  feature3Title1: PropTypes.element,
  feature2ImgSrc: PropTypes.string,
  feature1ImgSrc: PropTypes.string,
  feature3Title: PropTypes.element,
  feature1ImgAlt: PropTypes.string,
  feature3Description11: PropTypes.element,
  feature1Description2: PropTypes.element,
  feature3Description: PropTypes.element,
  feature3ImgSrc: PropTypes.string,
}

export default ServiceFilmProcess
