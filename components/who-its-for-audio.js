import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WhoItsForAudio = (props) => {
  return (
    <>
      <div
        className={`who-its-for-audio-thq-gallery3-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="who-its-for-audio-thq-max-width-elm thq-section-max-width">
          <div className="who-its-for-audio-thq-section-title-elm">
            <h2 className="who-its-for-audio-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="who-its-for-audio-text1">Who It’s For</span>
                </Fragment>
              )}
            </h2>
            <span className="who-its-for-audio-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="who-its-for-audio-text2">
                    I collaborate with filmmakers, visual artists, and studios
                    who understand the power of sound in storytelling.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="who-its-for-audio-container1">
            <div className="who-its-for-audio-thq-content-elm">
              <div
                data-thq="slider"
                data-navigation="true"
                data-pagination="true"
                className="who-its-for-audio-thq-slider-elm swiper"
              >
                <div
                  data-thq="slider-wrapper"
                  className="who-its-for-audio-thq-slider-wrapper-elm swiper-wrapper"
                >
                  <div
                    data-thq="slider-slide"
                    className="who-its-for-audio-thq-slider-slide-elm1 swiper-slide"
                  >
                    <div className="who-its-for-audio-container2">
                      <img
                        alt={props.image1Alt}
                        src={props.image1Src}
                        className="who-its-for-audio-thq-image1-elm thq-img-ratio-4-3"
                      />
                    </div>
                    <div className="who-its-for-audio-container3">
                      <img
                        alt={props.image2Alt}
                        src={props.image2Src}
                        className="who-its-for-audio-thq-image2-elm thq-img-ratio-4-3"
                      />
                    </div>
                  </div>
                  <div
                    data-thq="slider-slide"
                    className="who-its-for-audio-thq-slider-slide-elm2 swiper-slide"
                  >
                    <div className="who-its-for-audio-container4">
                      <img
                        alt={props.image3Alt}
                        src={props.image3Src}
                        className="who-its-for-audio-thq-image3-elm thq-img-ratio-4-3"
                      />
                    </div>
                    <div className="who-its-for-audio-container5">
                      <img
                        alt={props.image4Alt}
                        src={props.image4Src}
                        className="who-its-for-audio-thq-image4-elm thq-img-ratio-4-3"
                      />
                    </div>
                  </div>
                  <div
                    data-thq="slider-slide"
                    className="who-its-for-audio-thq-slider-slide-elm3 swiper-slide"
                  >
                    <div className="who-its-for-audio-container6">
                      <img
                        alt={props.image5Alt}
                        src={props.image5Src}
                        className="who-its-for-audio-thq-image5-elm thq-img-ratio-4-3"
                      />
                    </div>
                    <div className="who-its-for-audio-container7">
                      <img
                        alt={props.image6Alt}
                        src={props.image6Src}
                        className="who-its-for-audio-thq-image6-elm thq-img-ratio-4-3"
                      />
                    </div>
                  </div>
                </div>
                <div
                  data-thq="slider-button-prev"
                  className="swiper-button-prev"
                ></div>
                <div
                  data-thq="slider-button-next"
                  className="swiper-button-next"
                ></div>
                <div
                  data-thq="slider-pagination"
                  className="who-its-for-audio-thq-slider-pagination-elm swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"
                >
                  <div
                    data-thq="slider-pagination-bullet"
                    className="swiper-pagination-bullet swiper-pagination-bullet-active"
                  ></div>
                  <div
                    data-thq="slider-pagination-bullet"
                    className="swiper-pagination-bullet"
                  ></div>
                  <div
                    data-thq="slider-pagination-bullet"
                    className="swiper-pagination-bullet"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .who-its-for-audio-thq-gallery3-elm {
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
          .who-its-for-audio-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .who-its-for-audio-thq-section-title-elm {
            gap: 24px;
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .who-its-for-audio-thq-text-elm1 {
            text-align: center;
          }
          .who-its-for-audio-thq-text-elm2 {
            text-align: center;
          }
          .who-its-for-audio-container1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .who-its-for-audio-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .who-its-for-audio-thq-slider-elm {
            width: 100%;
            height: 600px;
            display: inline-block;
          }
          .who-its-for-audio-thq-slider-wrapper-elm {
            width: 100%;
          }
          .who-its-for-audio-thq-slider-slide-elm1 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: calc(100% - 20px);
            display: flex;
          }
          .who-its-for-audio-container2 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-audio-thq-image1-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-audio-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-audio-thq-image2-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-audio-thq-slider-slide-elm2 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: calc(100% - 20px);
            display: flex;
          }
          .who-its-for-audio-container4 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-audio-thq-image3-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-audio-container5 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-audio-thq-image4-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-audio-thq-slider-slide-elm3 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: calc(100% - 20px);
            display: flex;
          }
          .who-its-for-audio-container6 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-audio-thq-image5-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-audio-container7 {
            flex: 1;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-audio-thq-image6-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-audio-thq-slider-pagination-elm {
            display: block;
          }
          .who-its-for-audio-text1 {
            display: inline-block;
          }
          .who-its-for-audio-text2 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .who-its-for-audio-thq-content-elm {
              align-items: center;
              flex-direction: column;
            }
          }
          @media (max-width: 767px) {
            .who-its-for-audio-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .who-its-for-audio-thq-slider-slide-elm1 {
              flex-direction: column;
            }
            .who-its-for-audio-container2 {
              height: calc(50% - 8px);
            }
            .who-its-for-audio-container3 {
              height: calc(50% - 8px);
            }
            .who-its-for-audio-thq-slider-slide-elm2 {
              flex-direction: column;
            }
            .who-its-for-audio-container4 {
              height: calc(50% - 8px);
            }
            .who-its-for-audio-container5 {
              height: calc(50% - 8px);
            }
            .who-its-for-audio-thq-slider-slide-elm3 {
              flex-direction: column;
            }
            .who-its-for-audio-container6 {
              height: calc(50% - 8px);
            }
            .who-its-for-audio-container7 {
              height: calc(50% - 8px);
            }
          }
          @media (max-width: 479px) {
            .who-its-for-audio-thq-slider-elm {
              height: 440px;
            }
          }
        `}
      </style>
    </>
  )
}

WhoItsForAudio.defaultProps = {
  image2Alt: 'Audio Production',
  image6Alt: 'Sound Design',
  image1Src: '/Audio/Studio/46761_107423292651247_2063467_n-1400w.jpg',
  heading1: undefined,
  image4Alt: 'Photography',
  rootClassName: '',
  image2Src: '/Audio/Studio/jeevan%20chandimal_0003_layer%2019-1400w.jpg',
  image6Src: '/Audio/Studio/jeevan%20chandimal_0001_layer%2021-1400w.jpg',
  image1Alt: 'Film Production',
  image5Alt: 'AI & Animations Services',
  image4Src: '/Audio/Studio/277309_381817668545140_1195496920_o-1400w.jpg',
  image3Alt: 'Animation & Graphics',
  content1: undefined,
  image3Src: '/Audio/Studio/194813_381818151878425_1300551683_o-1400w.jpg',
  image5Src: '/Audio/Studio/jeevan%20chandimal_0002_layer%2020-1400w.jpg',
}

WhoItsForAudio.propTypes = {
  image2Alt: PropTypes.string,
  image6Alt: PropTypes.string,
  image1Src: PropTypes.string,
  heading1: PropTypes.element,
  image4Alt: PropTypes.string,
  rootClassName: PropTypes.string,
  image2Src: PropTypes.string,
  image6Src: PropTypes.string,
  image1Alt: PropTypes.string,
  image5Alt: PropTypes.string,
  image4Src: PropTypes.string,
  image3Alt: PropTypes.string,
  content1: PropTypes.element,
  image3Src: PropTypes.string,
  image5Src: PropTypes.string,
}

export default WhoItsForAudio
