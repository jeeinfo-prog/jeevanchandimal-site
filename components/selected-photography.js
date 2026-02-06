import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const SelectedPhotography = (props) => {
  return (
    <>
      <div
        className={`selected-photography-thq-gallery3-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="selected-photography-thq-max-width-elm">
          <div className="selected-photography-thq-section-title-elm">
            <h2 className="selected-photography-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="selected-photography-text1">
                    Selected Photography
                  </span>
                </Fragment>
              )}
            </h2>
            <span className="selected-photography-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="selected-photography-text2">
                    A curated selection of editorial, cinematic, and fine-art
                    photography — focused on atmosphere, texture, and detail.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="selected-photography-container1">
            <div className="selected-photography-thq-content-elm">
              <div className="selected-photography-container2">
                <img
                  alt={props.image1Alt}
                  src={props.image1Src}
                  className="selected-photography-thq-image1-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image2Alt}
                  src={props.image2Src}
                  className="selected-photography-thq-image2-elm thq-img-ratio-1-1"
                />
              </div>
              <div className="selected-photography-container3">
                <img
                  alt={props.image3Alt}
                  src={props.image3Src}
                  className="selected-photography-thq-image3-elm thq-img-ratio-4-3"
                />
                <img
                  alt={props.image4Alt}
                  src={props.image4Src}
                  className="selected-photography-thq-image4-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image5Alt}
                  src={props.image5Src}
                  className="selected-photography-thq-image5-elm thq-img-ratio-4-3"
                />
              </div>
              <div className="selected-photography-container4">
                <img
                  alt={props.image6Alt}
                  src={props.image6Src}
                  className="selected-photography-thq-image6-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image7Alt}
                  src={props.image7Src}
                  className="selected-photography-thq-image7-elm thq-img-ratio-1-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .selected-photography-thq-gallery3-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .selected-photography-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .selected-photography-thq-section-title-elm {
            gap: 24px;
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .selected-photography-thq-text-elm1 {
            text-align: center;
          }
          .selected-photography-thq-text-elm2 {
            text-align: center;
          }
          .selected-photography-container1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .selected-photography-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .selected-photography-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-photography-thq-image1-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-photography-thq-image2-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-photography-container3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-photography-thq-image3-elm {
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
          .selected-photography-thq-image4-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-photography-thq-image5-elm {
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
          .selected-photography-container4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-photography-thq-image6-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-photography-thq-image7-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-photography-text1 {
            display: inline-block;
          }
          .selected-photography-text2 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .selected-photography-thq-content-elm {
              align-items: center;
              flex-direction: column;
            }
            .selected-photography-container2 {
              width: 100%;
            }
            .selected-photography-thq-image1-elm {
              flex: 0 0 auto;
              width: 100%;
            }
            .selected-photography-container3 {
              width: 100%;
            }
            .selected-photography-container4 {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .selected-photography-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

SelectedPhotography.defaultProps = {
  heading1: undefined,
  content1: undefined,
  image2Alt: 'High-Quality Audio Production',
  image3Src: '/Photography/3x2/_jee1691_3x2_2000x1333_u_100-1500w.jpg',
  image2Src: '/Photography/3x2/_jee1604_3x2_2000x1333_u_100-1500w.jpg',
  image4Src: '/Photography/3x2/_jee26873_3x2_2000x1333_u_100-1500w.png',
  image7Alt: 'Dedicated Customer Support',
  image5Src:
    '/Photography/1x1/wild%20elephant%20-%20senanayake%20samudraya%20ampara%2C%20sri%20lanka._1x1_2000x2000_u_100-1500w.png',
  image6Alt: 'Intuitive Design Services',
  rootClassName: '',
  image1Alt: 'Professional Film Production',
  image4Alt: 'Stunning Photography Services',
  image6Src: '/Photography/3x2/_dsc5544_3x2_2000x1333_u_100-1500w.png',
  image7Src: '/Photography/3x2/_dsc8124_3x2_2000x1333_u_100-1500w.png',
  image5Alt: 'Customized Solutions for Clients',
  image1Src: '/Photography/3x2/_jee8856_3x2_2000x1333_u_100-1500w.png',
  image3Alt: 'Creative Animation & Graphics',
}

SelectedPhotography.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  image2Alt: PropTypes.string,
  image3Src: PropTypes.string,
  image2Src: PropTypes.string,
  image4Src: PropTypes.string,
  image7Alt: PropTypes.string,
  image5Src: PropTypes.string,
  image6Alt: PropTypes.string,
  rootClassName: PropTypes.string,
  image1Alt: PropTypes.string,
  image4Alt: PropTypes.string,
  image6Src: PropTypes.string,
  image7Src: PropTypes.string,
  image5Alt: PropTypes.string,
  image1Src: PropTypes.string,
  image3Alt: PropTypes.string,
}

export default SelectedPhotography
