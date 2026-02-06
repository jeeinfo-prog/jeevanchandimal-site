import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkCinematicGallery = (props) => {
  return (
    <>
      <div
        className={`work-cinematic-gallery-thq-gallery3-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="work-cinematic-gallery-thq-max-width-elm thq-section-max-width">
          <div className="work-cinematic-gallery-thq-section-title-elm">
            <h2 className="work-cinematic-gallery-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="work-cinematic-gallery-text2">
                    Cinematic Gallery
                  </span>
                </Fragment>
              )}
            </h2>
            <span className="work-cinematic-gallery-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="work-cinematic-gallery-text1">
                    A curated selection of photographs presented as standalone
                    visual studies. These images focus on atmosphere,
                    composition, and tonal depth, allowing each frame to exist
                    without explanation.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="work-cinematic-gallery-container1 thq-grid-4">
            <div className="work-cinematic-gallery-container2">
              <img
                alt={props.image1Alt}
                src={props.image1Src}
                className="work-cinematic-gallery-thq-image1-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-cinematic-gallery-container3">
              <img
                alt={props.image2Alt}
                src={props.image2Src}
                className="work-cinematic-gallery-thq-image2-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-cinematic-gallery-container4">
              <img
                alt={props.image3Alt}
                src={props.image3Src}
                className="work-cinematic-gallery-thq-image3-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-cinematic-gallery-container5">
              <img
                alt={props.image4Alt}
                src={props.image4Src}
                className="work-cinematic-gallery-thq-image4-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-cinematic-gallery-container6">
              <img
                alt={props.image5Alt}
                src={props.image5Src}
                className="work-cinematic-gallery-thq-image5-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-cinematic-gallery-container7">
              <img
                alt={props.image6Alt}
                src={props.image6Src}
                className="work-cinematic-gallery-thq-image6-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-cinematic-gallery-container8">
              <img
                alt={props.image7Alt}
                src={props.image7Src}
                className="work-cinematic-gallery-thq-image7-elm thq-img-ratio-16-9"
              />
            </div>
            <div className="work-cinematic-gallery-container9">
              <img
                alt={props.image8Alt}
                src={props.image8Src}
                className="work-cinematic-gallery-thq-image8-elm thq-img-ratio-16-9"
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-cinematic-gallery-thq-gallery3-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-cinematic-gallery-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .work-cinematic-gallery-thq-section-title-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-cinematic-gallery-thq-text-elm1 {
            text-align: center;
          }
          .work-cinematic-gallery-thq-text-elm2 {
            text-align: center;
          }
          .work-cinematic-gallery-container1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
          }
          .work-cinematic-gallery-container2 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-cinematic-gallery-thq-image1-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .work-cinematic-gallery-container3 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-cinematic-gallery-thq-image2-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
            align-self: center;
          }
          .work-cinematic-gallery-container4 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-cinematic-gallery-thq-image3-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-cinematic-gallery-container5 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-cinematic-gallery-thq-image4-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-cinematic-gallery-container6 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-cinematic-gallery-thq-image5-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-cinematic-gallery-container7 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-cinematic-gallery-thq-image6-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-cinematic-gallery-container8 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-cinematic-gallery-thq-image7-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-cinematic-gallery-container9 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .work-cinematic-gallery-thq-image8-elm {
            width: 100%;
            height: 340px;
            max-width: 600px;
          }
          .work-cinematic-gallery-text1 {
            display: inline-block;
          }
          .work-cinematic-gallery-text2 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .work-cinematic-gallery-thq-image1-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-cinematic-gallery-thq-image2-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-cinematic-gallery-thq-image3-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-cinematic-gallery-thq-image4-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-cinematic-gallery-thq-image5-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-cinematic-gallery-thq-image6-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-cinematic-gallery-thq-image7-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
            .work-cinematic-gallery-thq-image8-elm {
              flex: 0 0 auto;
              width: 100%;
              height: 400px;
            }
          }
          @media (max-width: 767px) {
            .work-cinematic-gallery-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

WorkCinematicGallery.defaultProps = {
  content1: undefined,
  image3Alt: 'Animation & Graphics',
  image7Src:
    '/Photography/1x1/kovil%2002%20%20hatton%2C%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image2Alt: 'Audio Production',
  image7Alt: 'Customized Solutions',
  image1Alt: 'Film Production',
  heading1: undefined,
  image2Src: '/Photography/1x1/_jee3136_1x1_2000x2000_u_100-600w.png',
  image6Alt: 'Soundtrack Composition',
  image8Src: '/Photography/1x1/jee064332_1x1_2000x2000_u_100-600w.png',
  image1Src: '/Photography/1x1/_jee8143_1x1_2000x2000_u_100-600w.png',
  image5Src:
    '/Photography/1x1/maruthanamadam%20anjaneya%20kovil%20%20jaffna%2C%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image5Alt: 'Character Animation',
  image8Alt: 'Dedicated Customer Support',
  rootClassName: '',
  image3Src: '/Photography/1x1/_jee83936_1x1_2000x2000_u_100-600w.png',
  image4Src:
    '/Photography/1x1/beira%20lake%20%20colombo%2C%20sri%20lanka._1x1_2000x2000_u_100-600w.png',
  image6Src:
    '/Photography/1x1/gangarama%20perahera%2008_1x1_2000x2000_u_100-600w.png',
  image4Alt: 'Photography Services',
}

WorkCinematicGallery.propTypes = {
  content1: PropTypes.element,
  image3Alt: PropTypes.string,
  image7Src: PropTypes.string,
  image2Alt: PropTypes.string,
  image7Alt: PropTypes.string,
  image1Alt: PropTypes.string,
  heading1: PropTypes.element,
  image2Src: PropTypes.string,
  image6Alt: PropTypes.string,
  image8Src: PropTypes.string,
  image1Src: PropTypes.string,
  image5Src: PropTypes.string,
  image5Alt: PropTypes.string,
  image8Alt: PropTypes.string,
  rootClassName: PropTypes.string,
  image3Src: PropTypes.string,
  image4Src: PropTypes.string,
  image6Src: PropTypes.string,
  image4Alt: PropTypes.string,
}

export default WorkCinematicGallery
