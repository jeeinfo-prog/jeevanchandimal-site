import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WhoItsForFilm = (props) => {
  return (
    <>
      <div className="who-its-for-film-thq-gallery3-elm thq-section-padding">
        <div className="who-its-for-film-thq-max-width-elm thq-section-max-width">
          <div className="who-its-for-film-thq-section-title-elm">
            <h2 className="who-its-for-film-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="who-its-for-film-text2">Who It’s For</span>
                </Fragment>
              )}
            </h2>
            <span className="who-its-for-film-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="who-its-for-film-text1">
                    I work with brands, agencies, filmmakers, and individuals
                    who value craft, atmosphere, and intentional storytelling —
                    and who see film as more than just content.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="who-its-for-film-container1">
            <div className="who-its-for-film-thq-content-elm">
              <div
                data-thq="slider"
                data-navigation="true"
                data-pagination="true"
                className="who-its-for-film-thq-slider-elm swiper"
              >
                <div
                  data-thq="slider-wrapper"
                  className="who-its-for-film-thq-slider-wrapper-elm swiper-wrapper"
                >
                  <div
                    data-thq="slider-slide"
                    className="who-its-for-film-thq-slider-slide-elm1 swiper-slide"
                  >
                    <div className="who-its-for-film-container2">
                      <img
                        alt={props.image1Alt}
                        src={props.image1Src}
                        className="who-its-for-film-thq-image1-elm thq-img-ratio-4-3"
                      />
                    </div>
                    <div className="who-its-for-film-container3">
                      <img
                        alt={props.image2Alt}
                        src={props.image2Src}
                        className="who-its-for-film-thq-image2-elm thq-img-ratio-4-3"
                      />
                    </div>
                  </div>
                  <div
                    data-thq="slider-slide"
                    className="who-its-for-film-thq-slider-slide-elm2 swiper-slide"
                  >
                    <div className="who-its-for-film-container4">
                      <img
                        alt={props.image3Alt}
                        src={props.image3Src}
                        className="who-its-for-film-thq-image3-elm thq-img-ratio-4-3"
                      />
                    </div>
                    <div className="who-its-for-film-container5">
                      <img
                        alt={props.image4Alt}
                        src={props.image4Src}
                        className="who-its-for-film-thq-image4-elm thq-img-ratio-4-3"
                      />
                    </div>
                  </div>
                  <div
                    data-thq="slider-slide"
                    className="who-its-for-film-thq-slider-slide-elm3 swiper-slide"
                  >
                    <div className="who-its-for-film-container6">
                      <img
                        alt={props.image5Alt}
                        src={props.image5Src}
                        className="who-its-for-film-thq-image5-elm thq-img-ratio-4-3"
                      />
                    </div>
                    <div className="who-its-for-film-container7">
                      <img
                        alt={props.image6Alt}
                        src={props.image6Src}
                        className="who-its-for-film-thq-image6-elm thq-img-ratio-4-3"
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
                  className="who-its-for-film-thq-slider-pagination-elm swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"
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
          .who-its-for-film-thq-gallery3-elm {
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
          .who-its-for-film-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .who-its-for-film-thq-section-title-elm {
            gap: 24px;
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .who-its-for-film-thq-text-elm1 {
            text-align: center;
          }
          .who-its-for-film-thq-text-elm2 {
            text-align: center;
          }
          .who-its-for-film-container1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .who-its-for-film-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .who-its-for-film-thq-slider-elm {
            width: 100%;
            height: 600px;
            display: inline-block;
          }
          .who-its-for-film-thq-slider-wrapper-elm {
            width: 100%;
          }
          .who-its-for-film-thq-slider-slide-elm1 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: calc(100% - 20px);
            display: flex;
          }
          .who-its-for-film-container2 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-film-thq-image1-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-film-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-film-thq-image2-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-film-thq-slider-slide-elm2 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: calc(100% - 20px);
            display: flex;
          }
          .who-its-for-film-container4 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-film-thq-image3-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-film-container5 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-film-thq-image4-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-film-thq-slider-slide-elm3 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: calc(100% - 20px);
            display: flex;
          }
          .who-its-for-film-container6 {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-film-thq-image5-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-film-container7 {
            flex: 1;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .who-its-for-film-thq-image6-elm {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .who-its-for-film-thq-slider-pagination-elm {
            display: block;
          }
          .who-its-for-film-text1 {
            display: inline-block;
          }
          .who-its-for-film-text2 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .who-its-for-film-thq-content-elm {
              align-items: center;
              flex-direction: column;
            }
          }
          @media (max-width: 767px) {
            .who-its-for-film-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .who-its-for-film-thq-slider-slide-elm1 {
              flex-direction: column;
            }
            .who-its-for-film-container2 {
              height: calc(50% - 8px);
            }
            .who-its-for-film-container3 {
              height: calc(50% - 8px);
            }
            .who-its-for-film-thq-slider-slide-elm2 {
              flex-direction: column;
            }
            .who-its-for-film-container4 {
              height: calc(50% - 8px);
            }
            .who-its-for-film-container5 {
              height: calc(50% - 8px);
            }
            .who-its-for-film-thq-slider-slide-elm3 {
              flex-direction: column;
            }
            .who-its-for-film-container6 {
              height: calc(50% - 8px);
            }
            .who-its-for-film-container7 {
              height: calc(50% - 8px);
            }
          }
          @media (max-width: 479px) {
            .who-its-for-film-thq-slider-elm {
              height: 440px;
            }
          }
        `}
      </style>
    </>
  )
}

WhoItsForFilm.defaultProps = {
  image6Alt: 'Sound Design',
  image1Alt: 'Film Production',
  image4Alt: 'Photography',
  content1: undefined,
  image5Alt: 'AI & Animations Services',
  heading1: undefined,
  image4Src: '/BTS/1167585_555509951175910_1131034166_o-1400w.jpg',
  image5Src: '/BTS/16905000_1391539670906263_5044795706700183659_o-1400w.jpg',
  image3Src: '/BTS/1147522_555510027842569_150843797_o-1400w.jpg',
  image1Src: '/BTS/16819524_1374441572616073_8086884086305302427_o-1400w.jpg',
  image6Src: '/BTS/17097611_1391540067572890_10567823998967461_o-1400w.jpg',
  image2Alt: 'Audio Production',
  image2Src: '/BTS/16797582_1374407929286104_7610079039377369550_o-1400w.jpg',
  image3Alt: 'Animation & Graphics',
}

WhoItsForFilm.propTypes = {
  image6Alt: PropTypes.string,
  image1Alt: PropTypes.string,
  image4Alt: PropTypes.string,
  content1: PropTypes.element,
  image5Alt: PropTypes.string,
  heading1: PropTypes.element,
  image4Src: PropTypes.string,
  image5Src: PropTypes.string,
  image3Src: PropTypes.string,
  image1Src: PropTypes.string,
  image6Src: PropTypes.string,
  image2Alt: PropTypes.string,
  image2Src: PropTypes.string,
  image3Alt: PropTypes.string,
}

export default WhoItsForFilm
