import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkStockPreview = (props) => {
  return (
    <>
      <div className="work-stock-preview-thq-gallery3-elm thq-section-padding">
        <div className="work-stock-preview-thq-max-width-elm thq-section-max-width">
          <div className="work-stock-preview-thq-section-title-elm">
            <h2 className="work-stock-preview-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="work-stock-preview-text2">
                    Stock Preview
                  </span>
                </Fragment>
              )}
            </h2>
            <span className="work-stock-preview-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="work-stock-preview-text1">
                    A selection of images available for licensing, presented as
                    visual previews rather than a commercial catalog. Each image
                    links to the store for usage details, while maintaining
                    consistency with the overall photographic language.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="work-stock-preview-container1 thq-grid-4">
            <div className="work-stock-preview-container2">
              <img
                alt={props.image1Alt}
                src={props.image1Src}
                className="work-stock-preview-thq-image1-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-stock-preview-container3">
              <img
                alt={props.image2Alt}
                src={props.image2Src}
                className="work-stock-preview-thq-image2-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-stock-preview-container4">
              <img
                alt={props.image3Alt}
                src={props.image3Src}
                className="work-stock-preview-thq-image3-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-stock-preview-container5">
              <img
                alt={props.image4Alt}
                src={props.image4Src}
                className="work-stock-preview-thq-image4-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-stock-preview-container6">
              <img
                alt={props.image5Alt}
                src={props.image5Src}
                className="work-stock-preview-thq-image5-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-stock-preview-container7">
              <img
                alt={props.image6Alt}
                src={props.image6Src}
                className="work-stock-preview-thq-image6-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-stock-preview-container8">
              <img
                alt={props.image7Alt}
                src={props.image7Src}
                className="work-stock-preview-thq-image7-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-stock-preview-container9">
              <img
                alt={props.image8Alt}
                src={props.image8Src}
                className="work-stock-preview-thq-image8-elm thq-img-ratio-16-9"
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-stock-preview-thq-gallery3-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-stock-preview-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .work-stock-preview-thq-section-title-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-stock-preview-thq-text-elm1 {
            text-align: center;
          }
          .work-stock-preview-thq-text-elm2 {
            text-align: center;
          }
          .work-stock-preview-container1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
          }
          .work-stock-preview-container2 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-stock-preview-thq-image1-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .work-stock-preview-container3 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-stock-preview-thq-image2-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .work-stock-preview-container4 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-stock-preview-thq-image3-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-stock-preview-container5 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-stock-preview-thq-image4-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-stock-preview-container6 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-stock-preview-thq-image5-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-stock-preview-container7 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-stock-preview-thq-image6-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-stock-preview-container8 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-stock-preview-thq-image7-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-stock-preview-container9 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-stock-preview-thq-image8-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-stock-preview-text1 {
            display: inline-block;
          }
          .work-stock-preview-text2 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-stock-preview-thq-image1-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-stock-preview-thq-image2-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-stock-preview-thq-image3-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-stock-preview-thq-image4-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-stock-preview-thq-image5-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-stock-preview-thq-image6-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-stock-preview-thq-image7-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-stock-preview-thq-image8-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
          }
          @media (max-width: 767px) {
            .work-stock-preview-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

WorkStockPreview.defaultProps = {
  image2Src: '/Pic 01/maligawa-01-400h.jpg',
  image3Src: '/Pic 01/sigiriya-02-400h.jpg',
  image7Src: '/Photography/3x2/_dsc5544_3x2_2000x1333_u_100-400h.png',
  image1Alt: 'Film Production',
  image5Src:
    '/Photography/1x1/lake%20-%20matale%2C%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image8Alt: 'Dedicated Customer Support',
  image1Src: '/Pic 01/ruwanweliseya-01-400h.jpg',
  content1: undefined,
  image6Src:
    '/Photography/1x1/wild%20elephant%20-%20senanayake%20samudraya%20ampara%2C%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image8Src: '/Photography/3x2/_jee1691_3x2_2000x1333_u_100-400h.jpg',
  image7Alt: 'Powerful Analytics Tools',
  image6Alt: 'Intuitive Design',
  image4Alt: 'Photography',
  image4Src:
    '/Photography/1x1/lotus%20tower_full%20resolution_4702x7050_u_0_1x1_2000x2000_u_100-600w.png',
  image5Alt: 'Customized Solutions',
  heading1: undefined,
  image2Alt: 'Audio Production',
  image3Alt: 'Animation & Graphics',
}

WorkStockPreview.propTypes = {
  image2Src: PropTypes.string,
  image3Src: PropTypes.string,
  image7Src: PropTypes.string,
  image1Alt: PropTypes.string,
  image5Src: PropTypes.string,
  image8Alt: PropTypes.string,
  image1Src: PropTypes.string,
  content1: PropTypes.element,
  image6Src: PropTypes.string,
  image8Src: PropTypes.string,
  image7Alt: PropTypes.string,
  image6Alt: PropTypes.string,
  image4Alt: PropTypes.string,
  image4Src: PropTypes.string,
  image5Alt: PropTypes.string,
  heading1: PropTypes.element,
  image2Alt: PropTypes.string,
  image3Alt: PropTypes.string,
}

export default WorkStockPreview
