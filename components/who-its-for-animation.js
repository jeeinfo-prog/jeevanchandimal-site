import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WhoItsForAnimation = (props) => {
  return (
    <>
      <div
        className={`who-its-for-animation-thq-gallery3-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="who-its-for-animation-thq-max-width-elm thq-section-max-width">
          <div className="who-its-for-animation-thq-section-title-elm">
            <h2 className="who-its-for-animation-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="who-its-for-animation-text2">
                    Who It’s For
                  </span>
                </Fragment>
              )}
            </h2>
            <span className="who-its-for-animation-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="who-its-for-animation-text1">
                    I work with filmmakers, brands, and creatives who value
                    thoughtful motion and refined visual language.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="who-its-for-animation-container1">
            <div className="who-its-for-animation-thq-content-elm">
              <div
                data-thq="slider"
                data-navigation="true"
                data-pagination="true"
                className="who-its-for-animation-thq-slider-elm swiper"
              >
                <div
                  data-thq="slider-wrapper"
                  className="who-its-for-animation-thq-slider-wrapper-elm swiper-wrapper"
                >
                  <div
                    data-thq="slider-slide"
                    className="who-its-for-animation-thq-slider-slide-elm1 swiper-slide"
                  >
                    <div className="who-its-for-animation-container2">
                      <img
                        alt={props.image1Alt}
                        src={props.image1Src}
                        className="who-its-for-animation-thq-image1-elm thq-img-ratio-4-3"
                      />
                    </div>
                    <div className="who-its-for-animation-container3">
                      <img
                        alt={props.image2Alt}
                        src={props.image2Src}
                        className="who-its-for-animation-thq-image2-elm thq-img-ratio-4-3"
                      />
                    </div>
                  </div>
                  <div
                    data-thq="slider-slide"
                    className="who-its-for-animation-thq-slider-slide-elm2 swiper-slide"
                  >
                    <div className="who-its-for-animation-container4">
                      <img
                        alt={props.image3Alt}
                        src={props.image3Src}
                        className="who-its-for-animation-thq-image3-elm thq-img-ratio-4-3"
                      />
                    </div>
                    <div className="who-its-for-animation-container5">
                      <img
                        alt={props.image4Alt}
                        src={props.image4Src}
                        className="who-its-for-animation-thq-image4-elm thq-img-ratio-4-3"
                      />
                    </div>
                  </div>
                  <div
                    data-thq="slider-slide"
                    className="who-its-for-animation-thq-slider-slide-elm3 swiper-slide"
                  >
                    <div className="who-its-for-animation-container6">
                      <img
                        alt={props.image5Alt}
                        src={props.image5Src}
                        className="who-its-for-animation-thq-image5-elm thq-img-ratio-4-3"
                      />
                    </div>
                    <div className="who-its-for-animation-container7">
                      <img
                        alt={props.image6Alt}
                        src={props.image6Src}
                        className="who-its-for-animation-thq-image6-elm thq-img-ratio-4-3"
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
                  className="who-its-for-animation-thq-slider-pagination-elm swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"
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
          .who-its-for-animation-thq-gallery3-elm {
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
          .who-its-for-animation-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .who-its-for-animation-thq-section-title-elm {
            gap: 24px;
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .who-its-for-animation-thq-text-elm1 {
            text-align: center;
          }
          .who-its-for-animation-thq-text-elm2 {
            text-align: center;
          }
          .who-its-for-animation-container1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .who-its-for-animation-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .who-its-for-animation-thq-slider-elm {
            width: 100%;
            height: 600px;
            display: inline-block;
          }
          .who-its-for-animation-thq-slider-wrapper-elm {
            width: 100%;
          }
          .who-its-for-animation-thq-slider-slide-elm1 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: calc(100% - 20px);
            display: flex;
          }
          .who-its-for-animation-container2 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-animation-thq-image1-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-animation-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-animation-thq-image2-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-animation-thq-slider-slide-elm2 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: calc(100% - 20px);
            display: flex;
          }
          .who-its-for-animation-container4 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-animation-thq-image3-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-animation-container5 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-animation-thq-image4-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-animation-thq-slider-slide-elm3 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: calc(100% - 20px);
            display: flex;
          }
          .who-its-for-animation-container6 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-animation-thq-image5-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-animation-container7 {
            flex: 1;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-animation-thq-image6-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-animation-thq-slider-pagination-elm {
            display: block;
          }
          .who-its-for-animation-text1 {
            display: inline-block;
          }
          .who-its-for-animation-text2 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .who-its-for-animation-thq-content-elm {
              align-items: center;
              flex-direction: column;
            }
          }
          @media (max-width: 767px) {
            .who-its-for-animation-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .who-its-for-animation-thq-slider-slide-elm1 {
              flex-direction: column;
            }
            .who-its-for-animation-container2 {
              height: calc(50% - 8px);
            }
            .who-its-for-animation-container3 {
              height: calc(50% - 8px);
            }
            .who-its-for-animation-thq-slider-slide-elm2 {
              flex-direction: column;
            }
            .who-its-for-animation-container4 {
              height: calc(50% - 8px);
            }
            .who-its-for-animation-container5 {
              height: calc(50% - 8px);
            }
            .who-its-for-animation-thq-slider-slide-elm3 {
              flex-direction: column;
            }
            .who-its-for-animation-container6 {
              height: calc(50% - 8px);
            }
            .who-its-for-animation-container7 {
              height: calc(50% - 8px);
            }
          }
          @media (max-width: 479px) {
            .who-its-for-animation-thq-slider-elm {
              height: 440px;
            }
          }
        `}
      </style>
    </>
  )
}

WhoItsForAnimation.defaultProps = {
  image2Alt: 'Audio Production',
  image6Src: '/Animation/a899ba28-4f7b-402b-a72f-74b78a94bafc-1400w.jpg',
  content1: undefined,
  image1Src:
    '/Animation/New Animation Pic/a899ba28-4f7b-402b-a72f-74b78a94bafc_3x2_2000x1333_u_100-2-1400w.jpg',
  image2Src:
    '/Animation/New Animation Pic/the%20clockwork%20mountain%2013_3x2_2000x1333_u_100-1400w.jpg',
  image3Alt: 'Animation & Graphics',
  image5Alt: 'AI & Animations Services',
  image6Alt: 'Sound Design',
  image3Src:
    '/Animation/New Animation Pic/hf_20260119_113429_1501ca54-e5e1-4056-8b40-85fea12c982b_3x2_2000x1333_u_100-1400w.jpg',
  rootClassName: '',
  heading1: undefined,
  image4Src:
    '/Animation/New Animation Pic/hf_20260119_201908_b183ab80-964a-4339-873f-55cdf707938e_3x2_2000x1333_u_100-1400w.jpg',
  image4Alt: 'Photography',
  image5Src: '/Animation/PIC/the%20bridege%20that%20wakes%2008%20a-1400w.jpg',
  image1Alt: 'Film Production',
}

WhoItsForAnimation.propTypes = {
  image2Alt: PropTypes.string,
  image6Src: PropTypes.string,
  content1: PropTypes.element,
  image1Src: PropTypes.string,
  image2Src: PropTypes.string,
  image3Alt: PropTypes.string,
  image5Alt: PropTypes.string,
  image6Alt: PropTypes.string,
  image3Src: PropTypes.string,
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  image4Src: PropTypes.string,
  image4Alt: PropTypes.string,
  image5Src: PropTypes.string,
  image1Alt: PropTypes.string,
}

export default WhoItsForAnimation
