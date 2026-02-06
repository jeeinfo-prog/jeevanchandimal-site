import React from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MainSlider = (props) => {
  return (
    <>
      <div
        className={`main-slider-thq-gallery3-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="main-slider-thq-max-width-elm">
          <div className="main-slider-container">
            <div className="main-slider-thq-content-elm">
              <div
                data-thq="slider"
                data-loop="true"
                data-autoplay="true"
                data-navigation="true"
                data-pagination="true"
                className="main-slider-thq-slider-elm swiper"
              >
                <div data-thq="slider-wrapper" className="swiper-wrapper">
                  <div
                    data-thq="slider-slide"
                    className="main-slider-thq-slider-slide-elm1 swiper-slide"
                  >
                    <img
                      alt={props.image1Alt}
                      src={props.image1Src}
                      className="main-slider-image1 thq-img-ratio-16-9"
                    />
                  </div>
                  <div
                    data-thq="slider-slide"
                    className="main-slider-thq-slider-slide-elm2 swiper-slide"
                  >
                    <img
                      alt={props.image2Alt}
                      src={props.image2Src}
                      className="main-slider-image2 thq-img-ratio-16-9"
                    />
                  </div>
                  <div
                    data-thq="slider-slide"
                    className="main-slider-thq-slider-slide-elm3 swiper-slide"
                  >
                    <img
                      alt={props.image3Alt}
                      src={props.image3Src}
                      className="main-slider-image3 thq-img-ratio-16-9"
                    />
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
                  className="main-slider-thq-slider-pagination-elm swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"
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
          .main-slider-thq-gallery3-elm {
            width: 100%;
            height: auto;
            display: flex;
            padding: 0px;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
            justify-content: center;
          }
          .main-slider-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .main-slider-container {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .main-slider-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .main-slider-thq-slider-elm {
            width: 100%;
            height: 100%;
            display: inline-block;
          }
          .main-slider-thq-slider-slide-elm1 {
            height: calc(100% - 20px);
            display: flex;
          }
          .main-slider-image1 {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .main-slider-thq-slider-slide-elm2 {
            height: calc(100% - 20px);
            display: flex;
          }
          .main-slider-image2 {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .main-slider-thq-slider-slide-elm3 {
            height: calc(100% - 20px);
            display: flex;
          }
          .main-slider-image3 {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .main-slider-thq-slider-pagination-elm {
            display: block;
          }

          @media (max-width: 991px) {
            .main-slider-thq-content-elm {
              align-items: center;
              flex-direction: column;
            }
          }
          @media (max-width: 767px) {
            .main-slider-thq-slider-elm {
              height: 550px;
            }
          }
          @media (max-width: 479px) {
            .main-slider-thq-slider-elm {
              height: 440px;
            }
          }
        `}
      </style>
    </>
  )
}

MainSlider.defaultProps = {
  image2Alt: 'Product 2',
  rootClassName: '',
  image1Alt: 'Product 1',
  image3Alt: 'Product 3',
  image3Src: '/Pic 01/sigiriya-02-1500w.jpg',
  image2Src: '/Pic 01/ruwanweliseya-01-1500w.jpg',
  image1Src: '/Pic 01/maligawa-01-1500w.jpg',
}

MainSlider.propTypes = {
  image2Alt: PropTypes.string,
  rootClassName: PropTypes.string,
  image1Alt: PropTypes.string,
  image3Alt: PropTypes.string,
  image3Src: PropTypes.string,
  image2Src: PropTypes.string,
  image1Src: PropTypes.string,
}

export default MainSlider
