import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const StoreCollection01 = (props) => {
  return (
    <>
      <div className="store-collection-01-thq-gallery3-elm thq-section-padding">
        <div className="store-collection-01-thq-max-width-elm thq-section-max-width">
          <div className="store-collection-01-thq-section-title-elm">
            <h2 className="store-collection-01-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="store-collection-01-text2">
                    Our Collection
                  </span>
                </Fragment>
              )}
            </h2>
            <span className="store-collection-01-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="store-collection-01-text1">
                    Explore our diverse range of services through the images
                    below.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="store-collection-01-container10 thq-grid-4">
            <div className="store-collection-01-container11">
              <img
                alt={props.image1Alt}
                src={props.image1Src}
                className="store-collection-01-thq-image1-elm1 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container12">
              <img
                alt={props.image1Alt2}
                src={props.image1Src2}
                className="store-collection-01-thq-image1-elm2 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container13">
              <img
                alt={props.image2Alt}
                src={props.image2Src}
                className="store-collection-01-thq-image2-elm1 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container14">
              <img
                alt={props.image2Alt2}
                src={props.image2Src2}
                className="store-collection-01-thq-image2-elm2 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container15">
              <img
                alt={props.image3Alt}
                src={props.image3Src}
                className="store-collection-01-thq-image3-elm1 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container16">
              <img
                alt={props.image3Alt2}
                src={props.image3Src2}
                className="store-collection-01-thq-image3-elm2 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container17">
              <img
                alt={props.image4Alt}
                src={props.image4Src}
                className="store-collection-01-thq-image4-elm1 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container18">
              <img
                alt={props.image4Alt2}
                src={props.image4Src2}
                className="store-collection-01-thq-image4-elm2 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container19">
              <img
                alt={props.image5Alt}
                src={props.image5Src}
                className="store-collection-01-thq-image5-elm1 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container20">
              <img
                alt={props.image5Alt2}
                src={props.image5Src2}
                className="store-collection-01-thq-image5-elm2 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container21">
              <img
                alt={props.image6Alt}
                src={props.image6Src}
                className="store-collection-01-thq-image6-elm1 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container22">
              <img
                alt={props.image6Alt2}
                src={props.image6Src2}
                className="store-collection-01-thq-image6-elm2 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container23">
              <img
                alt={props.image7Alt}
                src={props.image7Src}
                className="store-collection-01-thq-image7-elm1 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container24">
              <img
                alt={props.image7Alt2}
                src={props.image7Src2}
                className="store-collection-01-thq-image7-elm2 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container25">
              <img
                alt={props.image8Alt}
                src={props.image8Src}
                className="store-collection-01-thq-image8-elm1 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container26">
              <img
                alt={props.image8Alt2}
                src={props.image8Src2}
                className="store-collection-01-thq-image8-elm2 thq-img-ratio-16-9"
              />
            </div>
          </div>
          <div className="store-collection-01-container27 thq-grid-4">
            <div className="store-collection-01-container28">
              <img
                alt={props.image1Alt1}
                src={props.image1Src1}
                className="store-collection-01-thq-image1-elm3 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container29">
              <img
                alt={props.image2Alt1}
                src={props.image2Src1}
                className="store-collection-01-thq-image2-elm3 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container30">
              <img
                alt={props.image3Alt1}
                src={props.image3Src1}
                className="store-collection-01-thq-image3-elm3 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container31">
              <img
                alt={props.image4Alt1}
                src={props.image4Src1}
                className="store-collection-01-thq-image4-elm3 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container32">
              <img
                alt={props.image5Alt1}
                src={props.image5Src1}
                className="store-collection-01-thq-image5-elm3 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container33">
              <img
                alt={props.image6Alt1}
                src={props.image6Src1}
                className="store-collection-01-thq-image6-elm3 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container34">
              <img
                alt={props.image7Alt1}
                src={props.image7Src1}
                className="store-collection-01-thq-image7-elm3 thq-img-ratio-16-9"
              />
            </div>
            <div className="store-collection-01-container35">
              <img
                alt={props.image8Alt1}
                src={props.image8Src1}
                className="store-collection-01-thq-image8-elm3 thq-img-ratio-16-9"
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .store-collection-01-thq-gallery3-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .store-collection-01-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .store-collection-01-thq-section-title-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .store-collection-01-thq-text-elm1 {
            text-align: center;
          }
          .store-collection-01-thq-text-elm2 {
            text-align: center;
          }
          .store-collection-01-container10 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
          }
          .store-collection-01-container11 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image1-elm1 {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .store-collection-01-container12 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image1-elm2 {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .store-collection-01-container13 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image2-elm1 {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .store-collection-01-container14 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image2-elm2 {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .store-collection-01-container15 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image3-elm1 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container16 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image3-elm2 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container17 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image4-elm1 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container18 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image4-elm2 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container19 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image5-elm1 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container20 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image5-elm2 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container21 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image6-elm1 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container22 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image6-elm2 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container23 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image7-elm1 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container24 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image7-elm2 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container25 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image8-elm1 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container26 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image8-elm2 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container27 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
          }
          .store-collection-01-container28 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image1-elm3 {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .store-collection-01-container29 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image2-elm3 {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .store-collection-01-container30 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image3-elm3 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container31 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image4-elm3 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container32 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image5-elm3 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container33 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image6-elm3 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container34 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image7-elm3 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-container35 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-collection-01-thq-image8-elm3 {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .store-collection-01-text1 {
            display: inline-block;
          }
          .store-collection-01-text2 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .store-collection-01-thq-image1-elm1 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image1-elm2 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image2-elm1 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image2-elm2 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image3-elm1 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image3-elm2 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image4-elm1 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image4-elm2 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image5-elm1 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image5-elm2 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image6-elm1 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image6-elm2 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image7-elm1 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image7-elm2 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image8-elm1 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image8-elm2 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image1-elm3 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image2-elm3 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image3-elm3 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image4-elm3 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image5-elm3 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image6-elm3 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image7-elm3 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .store-collection-01-thq-image8-elm3 {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
          }
          @media (max-width: 767px) {
            .store-collection-01-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

StoreCollection01.defaultProps = {
  image5Src2:
    '/Photography/1x1/elephant%20senanayaka%20samudraya%2C%20ampara_1x1_2000x2000_u_100-600w.png',
  image7Src:
    '/Photography/1x1/diyaluma%20%20oslanda%2001_1x1_2000x2000_u_100-600w.png',
  image5Src1:
    '/Photography/1x1/floating%20market%20-%20pettah%20%20colombo%2C%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image2Src: '/Photography/1x1/_jee3136_1x1_2000x2000_u_100-600w.png',
  image4Src1: '/Photography/1x1/jee064332_1x1_2000x2000_u_100-600w.png',
  content1: undefined,
  image2Src1:
    '/Photography/1x1/independence%20square%20-%20colombo%2C%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image1Alt2: 'Film Production Image',
  image5Alt: 'Customized Solutions Image',
  image5Src:
    '/Photography/1x1/beira%20lake%20%20colombo%2C%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image7Src2:
    '/Photography/1x1/gangarama%20perahera%2005_1x1_2000x2000_u_100-600w.png',
  image8Src: '/Photography/1x1/colombo%20harbour_1x1_2000x2000_u_100-600w.png',
  image3Alt: 'Animation & Graphics Image',
  image5Alt2: 'Customized Solutions Image',
  image8Src1:
    '/Photography/1x1/gangarama%20perahera%2006_1x1_2000x2000_u_100-600w.png',
  image8Alt: 'Dedicated Customer Support Image',
  heading1: undefined,
  image1Src1:
    '/Photography/1x1/gangarama%20perahera%2007_1x1_2000x2000_u_100-600w.png',
  image3Src2: '/Photography/1x1/arcade%2001_1x1_2000x2000_u_100-600w.png',
  image1Alt: 'Film Production Image',
  image4Alt: 'Photography Image',
  image6Src1: '/Photography/1x1/_jee9868_1x1_2000x2000_u_100-600w.png',
  image8Alt1: 'Dedicated Customer Support Image',
  image7Alt2: 'Powerful Analytics Tools Image',
  image3Alt1: 'Animation & Graphics Image',
  image2Alt1: 'Audio Production Image',
  image6Src2:
    '/Photography/1x1/jami%20ul-alfar%20mosque%20%20colombo%2C%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image4Alt2: 'Photography Image',
  image8Src2:
    '/Photography/1x1/gangarama%20perahera%2C%20colombo%2001_1x1_2000x2000_u_100-600w.png',
  image7Alt1: 'Powerful Analytics Tools Image',
  image4Alt1: 'Photography Image',
  image2Alt: 'Audio Production Image',
  image6Alt1: 'Intuitive Design Image',
  image2Alt2: 'Audio Production Image',
  image3Src1:
    '/Photography/1x1/jee02224%2035_full%20resolution_9005x6003_u_0_1x1_2000x2000_u_100-600w.png',
  image3Src: '/Photography/1x1/_jee83936_1x1_2000x2000_u_100-600w.png',
  image1Src:
    '/Photography/1x1/%20buduruwagala%20%20wellawaya%2C%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image6Alt: 'Intuitive Design Image',
  image5Alt1: 'Customized Solutions Image',
  image7Alt: 'Powerful Analytics Tools Image',
  image4Src:
    '/Photography/1x1/bambarakandha%20waterfall_1x1_2000x2000_u_100-600w.png',
  image4Src2:
    '/Photography/1x1/batticaloa%20-%20%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image6Src:
    '/Photography/1x1/gangarama%20perahera%2002_1x1_2000x2000_u_100-600w.png',
  image7Src1:
    '/Photography/1x1/img_0956_full%20resolution_5682x3788_u_0_1x1_2000x2000_u_100-600w.png',
  image8Alt2: 'Dedicated Customer Support Image',
  image1Alt1: 'Film Production Image',
  image6Alt2: 'Intuitive Design Image',
  image1Src2: '/Photography/1x1/_jee01474_1x1_2000x2000_u_100-600w.png',
  image2Src2: '/Photography/1x1/_jee8143_1x1_2000x2000_u_100-600w.png',
  image3Alt2: 'Animation & Graphics Image',
}

StoreCollection01.propTypes = {
  image5Src2: PropTypes.string,
  image7Src: PropTypes.string,
  image5Src1: PropTypes.string,
  image2Src: PropTypes.string,
  image4Src1: PropTypes.string,
  content1: PropTypes.element,
  image2Src1: PropTypes.string,
  image1Alt2: PropTypes.string,
  image5Alt: PropTypes.string,
  image5Src: PropTypes.string,
  image7Src2: PropTypes.string,
  image8Src: PropTypes.string,
  image3Alt: PropTypes.string,
  image5Alt2: PropTypes.string,
  image8Src1: PropTypes.string,
  image8Alt: PropTypes.string,
  heading1: PropTypes.element,
  image1Src1: PropTypes.string,
  image3Src2: PropTypes.string,
  image1Alt: PropTypes.string,
  image4Alt: PropTypes.string,
  image6Src1: PropTypes.string,
  image8Alt1: PropTypes.string,
  image7Alt2: PropTypes.string,
  image3Alt1: PropTypes.string,
  image2Alt1: PropTypes.string,
  image6Src2: PropTypes.string,
  image4Alt2: PropTypes.string,
  image8Src2: PropTypes.string,
  image7Alt1: PropTypes.string,
  image4Alt1: PropTypes.string,
  image2Alt: PropTypes.string,
  image6Alt1: PropTypes.string,
  image2Alt2: PropTypes.string,
  image3Src1: PropTypes.string,
  image3Src: PropTypes.string,
  image1Src: PropTypes.string,
  image6Alt: PropTypes.string,
  image5Alt1: PropTypes.string,
  image7Alt: PropTypes.string,
  image4Src: PropTypes.string,
  image4Src2: PropTypes.string,
  image6Src: PropTypes.string,
  image7Src1: PropTypes.string,
  image8Alt2: PropTypes.string,
  image1Alt1: PropTypes.string,
  image6Alt2: PropTypes.string,
  image1Src2: PropTypes.string,
  image2Src2: PropTypes.string,
  image3Alt2: PropTypes.string,
}

export default StoreCollection01
