import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Photography = (props) => {
  return (
    <>
      <div className="photography-thq-gallery3-elm thq-section-padding">
        <div className="photography-thq-max-width-elm thq-section-max-width">
          <div className="photography-thq-section-title-elm">
            <h2 className="photography-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="photography-text1">Photography</span>
                </Fragment>
              )}
            </h2>
            <span className="photography-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="photography-text2">
                    Explore our Photography projects and see how we bring
                    stories to life on screen.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="photography-container">
            <div className="photography-thq-content-elm">
              <div
                data-thq="slider"
                data-navigation="true"
                data-pagination="true"
                className="photography-thq-slider-elm swiper"
              >
                <div data-thq="slider-wrapper" className="swiper-wrapper">
                  <div
                    data-thq="slider-slide"
                    className="photography-thq-slider-slide-elm1 swiper-slide"
                  >
                    <img
                      alt={props.image1Alt}
                      src={props.image1Src}
                      className="photography-image1 thq-img-ratio-4-3"
                    />
                  </div>
                  <div
                    data-thq="slider-slide"
                    className="photography-thq-slider-slide-elm2 swiper-slide"
                  >
                    <img
                      alt={props.image2Alt}
                      src={props.image2Src}
                      className="photography-image2 thq-img-ratio-4-3"
                    />
                  </div>
                  <div
                    data-thq="slider-slide"
                    className="photography-thq-slider-slide-elm3 swiper-slide"
                  >
                    <img
                      alt={props.image3Alt}
                      src={props.image3Src}
                      className="photography-image3 thq-img-ratio-4-3"
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
                  className="photography-thq-slider-pagination-elm swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"
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
          .photography-thq-gallery3-elm {
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
          .photography-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .photography-thq-section-title-elm {
            gap: 24px;
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .photography-thq-text-elm1 {
            text-align: center;
          }
          .photography-thq-text-elm2 {
            text-align: center;
          }
          .photography-container {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .photography-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .photography-thq-slider-elm {
            width: 100%;
            height: 770px;
            display: inline-block;
          }
          .photography-thq-slider-slide-elm1 {
            height: calc(100% - 20px);
            display: flex;
          }
          .photography-image1 {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .photography-thq-slider-slide-elm2 {
            height: calc(100% - 20px);
            display: flex;
          }
          .photography-image2 {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .photography-thq-slider-slide-elm3 {
            height: calc(100% - 20px);
            display: flex;
          }
          .photography-image3 {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .photography-thq-slider-pagination-elm {
            display: block;
          }
          .photography-text1 {
            display: inline-block;
          }
          .photography-text2 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .photography-thq-content-elm {
              align-items: center;
              flex-direction: column;
            }
          }
          @media (max-width: 767px) {
            .photography-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .photography-thq-slider-elm {
              height: 550px;
            }
          }
          @media (max-width: 479px) {
            .photography-thq-slider-elm {
              height: 440px;
            }
          }
        `}
      </style>
    </>
  )
}

Photography.defaultProps = {
  heading1: undefined,
  image1Alt: 'Film Production Image 1',
  image3Alt: 'Film Production Image 3',
  content1: undefined,
  image3Src: '/Photography/3x2/_dsc5544_3x2_2000x1333_u_100-1400w.png',
  image1Src: '/Photography/3x2/_jee1604_3x2_2000x1333_u_100-1400w.jpg',
  image2Alt: 'Film Production Image 2',
  image2Src: '/Photography/3x2/_jee26873_3x2_2000x1333_u_100-1400w.png',
}

Photography.propTypes = {
  heading1: PropTypes.element,
  image1Alt: PropTypes.string,
  image3Alt: PropTypes.string,
  content1: PropTypes.element,
  image3Src: PropTypes.string,
  image1Src: PropTypes.string,
  image2Alt: PropTypes.string,
  image2Src: PropTypes.string,
}

export default Photography
