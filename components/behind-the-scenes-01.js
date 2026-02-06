import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const BehindTheScenes01 = (props) => {
  return (
    <>
      <div className="behind-the-scenes-01-thq-gallery3-elm thq-section-padding">
        <div className="behind-the-scenes-01-thq-max-width-elm">
          <div className="behind-the-scenes-01-thq-section-title-elm">
            <h2 className="behind-the-scenes-01-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="behind-the-scenes-01-text2">
                    Behind the Scenes
                  </span>
                </Fragment>
              )}
            </h2>
            <span className="behind-the-scenes-01-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="behind-the-scenes-01-text1">
                    Most of the magic happens where the camera isn’t pointed -
                    shaping light, building sound layers, refining motion frame
                    by frame. The process is hands-on, detail-driven, and
                    focused on turning ideas into crafted visual experiences.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="behind-the-scenes-01-container1">
            <div className="behind-the-scenes-01-thq-content-elm">
              <div className="behind-the-scenes-01-container2">
                <img
                  alt={props.image1Alt}
                  src={props.image1Src}
                  className="behind-the-scenes-01-thq-image1-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image2Alt}
                  src={props.image2Src}
                  className="behind-the-scenes-01-thq-image2-elm thq-img-ratio-1-1"
                />
              </div>
              <div className="behind-the-scenes-01-container3">
                <img
                  alt={props.image3Alt}
                  src={props.image3Src}
                  className="behind-the-scenes-01-thq-image3-elm thq-img-ratio-4-3"
                />
                <img
                  alt={props.image4Alt}
                  src={props.image4Src}
                  className="behind-the-scenes-01-thq-image4-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image5Alt}
                  src={props.image5Src}
                  className="behind-the-scenes-01-thq-image5-elm thq-img-ratio-4-3"
                />
              </div>
              <div className="behind-the-scenes-01-container4">
                <img
                  alt={props.image6Alt}
                  src={props.image6Src}
                  className="behind-the-scenes-01-thq-image6-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image7Alt}
                  src={props.image7Src}
                  className="behind-the-scenes-01-thq-image7-elm thq-img-ratio-1-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .behind-the-scenes-01-thq-gallery3-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .behind-the-scenes-01-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .behind-the-scenes-01-thq-section-title-elm {
            gap: 24px;
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .behind-the-scenes-01-thq-text-elm1 {
            text-align: center;
          }
          .behind-the-scenes-01-thq-text-elm2 {
            text-align: center;
          }
          .behind-the-scenes-01-container1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .behind-the-scenes-01-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .behind-the-scenes-01-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .behind-the-scenes-01-thq-image1-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .behind-the-scenes-01-thq-image2-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .behind-the-scenes-01-container3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .behind-the-scenes-01-thq-image3-elm {
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
          .behind-the-scenes-01-thq-image4-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .behind-the-scenes-01-thq-image5-elm {
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
          .behind-the-scenes-01-container4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .behind-the-scenes-01-thq-image6-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .behind-the-scenes-01-thq-image7-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .behind-the-scenes-01-text1 {
            display: inline-block;
          }
          .behind-the-scenes-01-text2 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .behind-the-scenes-01-thq-content-elm {
              align-items: center;
              flex-direction: column;
            }
            .behind-the-scenes-01-container2 {
              width: 100%;
            }
            .behind-the-scenes-01-thq-image1-elm {
              flex: 0 0 auto;
              width: 100%;
            }
            .behind-the-scenes-01-container3 {
              width: 100%;
            }
            .behind-the-scenes-01-container4 {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .behind-the-scenes-01-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

BehindTheScenes01.defaultProps = {
  image6Alt: 'Intuitive Design',
  image5Alt: 'Customized Solutions',
  content1: undefined,
  image2Alt: 'Audio Production',
  image7Src: '/BTS/16903322_1391526320907598_6223719616267141958_o-1500w.jpg',
  image1Src: '/BTS/1167585_555509951175910_1131034166_o-1500w.jpg',
  image4Src: '/BTS/199443_1722558857722_6270428_n-1500w.jpg',
  image5Src: '/BTS/17097391_1391521010908129_4975006197871996090_o-1500w.jpg',
  image1Alt: 'Film Production',
  heading1: undefined,
  image3Src: '/BTS/16707331_1374389039287993_7550180668214549850_o-1500w.jpg',
  image6Src: '/BTS/16716053_1374388602621370_5959989464476088896_o-1500w.jpg',
  image3Alt: 'Animation & Graphics',
  image7Alt: 'Dedicated Customer Support',
  image2Src: '/BTS/16797582_1374407929286104_7610079039377369550_o-1500w.jpg',
  image4Alt: 'Photography',
}

BehindTheScenes01.propTypes = {
  image6Alt: PropTypes.string,
  image5Alt: PropTypes.string,
  content1: PropTypes.element,
  image2Alt: PropTypes.string,
  image7Src: PropTypes.string,
  image1Src: PropTypes.string,
  image4Src: PropTypes.string,
  image5Src: PropTypes.string,
  image1Alt: PropTypes.string,
  heading1: PropTypes.element,
  image3Src: PropTypes.string,
  image6Src: PropTypes.string,
  image3Alt: PropTypes.string,
  image7Alt: PropTypes.string,
  image2Src: PropTypes.string,
  image4Alt: PropTypes.string,
}

export default BehindTheScenes01
