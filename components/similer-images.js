import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const SimilerImages = (props) => {
  return (
    <>
      <div className="similer-images-thq-gallery3-elm thq-section-padding">
        <div className="similer-images-thq-max-width-elm thq-section-max-width">
          <div className="similer-images-thq-section-title-elm">
            <h2 className="similer-images-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="similer-images-text2">Similer Images</span>
                </Fragment>
              )}
            </h2>
            <span className="similer-images-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="similer-images-text1">
                    Explore our diverse range of services through the images
                    below.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="similer-images-container1 thq-grid-4">
            <div className="similer-images-container2">
              <img
                alt={props.image1Alt}
                src={props.image1Src}
                className="similer-images-thq-image1-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="similer-images-container3">
              <img
                alt={props.image2Alt}
                src={props.image2Src}
                className="similer-images-thq-image2-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="similer-images-container4">
              <img
                alt={props.image3Alt}
                src={props.image3Src}
                className="similer-images-thq-image3-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="similer-images-container5">
              <img
                alt={props.image4Alt}
                src={props.image4Src}
                className="similer-images-thq-image4-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="similer-images-container6">
              <img
                alt={props.image5Alt}
                src={props.image5Src}
                className="similer-images-thq-image5-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="similer-images-container7">
              <img
                alt={props.image6Alt}
                src={props.image6Src}
                className="similer-images-thq-image6-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="similer-images-container8">
              <img
                alt={props.image7Alt}
                src={props.image7Src}
                className="similer-images-thq-image7-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="similer-images-container9">
              <img
                alt={props.image8Alt}
                src={props.image8Src}
                className="similer-images-thq-image8-elm thq-img-ratio-16-9"
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .similer-images-thq-gallery3-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .similer-images-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .similer-images-thq-section-title-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .similer-images-thq-text-elm1 {
            text-align: center;
          }
          .similer-images-thq-text-elm2 {
            text-align: center;
          }
          .similer-images-container1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
          }
          .similer-images-container2 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .similer-images-thq-image1-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .similer-images-container3 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .similer-images-thq-image2-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .similer-images-container4 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .similer-images-thq-image3-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .similer-images-container5 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .similer-images-thq-image4-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .similer-images-container6 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .similer-images-thq-image5-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .similer-images-container7 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .similer-images-thq-image6-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .similer-images-container8 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .similer-images-thq-image7-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .similer-images-container9 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .similer-images-thq-image8-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .similer-images-text1 {
            display: inline-block;
          }
          .similer-images-text2 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .similer-images-thq-image1-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .similer-images-thq-image2-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .similer-images-thq-image3-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .similer-images-thq-image4-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .similer-images-thq-image5-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .similer-images-thq-image6-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .similer-images-thq-image7-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .similer-images-thq-image8-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
          }
          @media (max-width: 767px) {
            .similer-images-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

SimilerImages.defaultProps = {
  image2Src:
    '/Photography/1x1/gangarama%20perahera%2C%20colombo%2001_1x1_2000x2000_u_100-600w.png',
  image6Src:
    '/Photography/1x1/gangarama%20perahera%2005_1x1_2000x2000_u_100-600w.png',
  image1Src:
    '/Photography/1x1/gangarama%20perahera%2008_1x1_2000x2000_u_100-600w.png',
  image3Alt: 'Animation',
  image8Src: '/Photography/1x1/jee064332_1x1_2000x2000_u_100-600w.png',
  content1: undefined,
  image6Alt: 'Analytics Tools',
  image7Src:
    '/Photography/1x1/gangarama%20perahera%2002_1x1_2000x2000_u_100-600w.png',
  image5Alt: 'AI & Animations',
  image2Alt: 'Audio Production',
  image5Src:
    '/Photography/1x1/gangarama%20perahera%2004_1x1_2000x2000_u_100-600w.png',
  image1Alt: 'Film Production',
  heading1: undefined,
  image7Alt: 'Customer Support',
  image3Src:
    '/Photography/1x1/gangarama%20perahera%2007_1x1_2000x2000_u_100-600w.png',
  image4Src:
    '/Photography/1x1/img_0956_full%20resolution_5682x3788_u_0_1x1_2000x2000_u_100-600w.png',
  image4Alt: 'Photography',
  image8Alt: 'Customized Solutions',
}

SimilerImages.propTypes = {
  image2Src: PropTypes.string,
  image6Src: PropTypes.string,
  image1Src: PropTypes.string,
  image3Alt: PropTypes.string,
  image8Src: PropTypes.string,
  content1: PropTypes.element,
  image6Alt: PropTypes.string,
  image7Src: PropTypes.string,
  image5Alt: PropTypes.string,
  image2Alt: PropTypes.string,
  image5Src: PropTypes.string,
  image1Alt: PropTypes.string,
  heading1: PropTypes.element,
  image7Alt: PropTypes.string,
  image3Src: PropTypes.string,
  image4Src: PropTypes.string,
  image4Alt: PropTypes.string,
  image8Alt: PropTypes.string,
}

export default SimilerImages
