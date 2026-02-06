import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const SelectedMotionWork = (props) => {
  return (
    <>
      <div
        className={`selected-motion-work-thq-gallery3-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="selected-motion-work-thq-max-width-elm">
          <div className="selected-motion-work-thq-section-title-elm">
            <h2 className="selected-motion-work-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="selected-motion-work-text1">
                    Selected Motion Work
                  </span>
                </Fragment>
              )}
            </h2>
            <span className="selected-motion-work-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="selected-motion-work-text2">
                    A selection of motion and animation projects created to
                    support film, brands, and visual narratives.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="selected-motion-work-container1">
            <div className="selected-motion-work-thq-content-elm">
              <div className="selected-motion-work-container2">
                <img
                  alt={props.image1Alt}
                  src={props.image1Src}
                  className="selected-motion-work-thq-image1-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image2Alt}
                  src={props.image2Src}
                  className="selected-motion-work-thq-image2-elm thq-img-ratio-1-1"
                />
              </div>
              <div className="selected-motion-work-container3">
                <img
                  alt={props.image3Alt}
                  src={props.image3Src}
                  className="selected-motion-work-thq-image3-elm thq-img-ratio-4-3"
                />
                <img
                  alt={props.image4Alt}
                  src={props.image4Src}
                  className="selected-motion-work-thq-image4-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image5Alt}
                  src={props.image5Src}
                  className="selected-motion-work-thq-image5-elm thq-img-ratio-4-3"
                />
              </div>
              <div className="selected-motion-work-container4">
                <img
                  alt={props.image6Alt}
                  src={props.image6Src}
                  className="selected-motion-work-thq-image6-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image7Alt}
                  src={props.image7Src}
                  className="selected-motion-work-thq-image7-elm thq-img-ratio-1-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .selected-motion-work-thq-gallery3-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .selected-motion-work-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .selected-motion-work-thq-section-title-elm {
            gap: 24px;
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .selected-motion-work-thq-text-elm1 {
            text-align: center;
          }
          .selected-motion-work-thq-text-elm2 {
            text-align: center;
          }
          .selected-motion-work-container1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .selected-motion-work-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .selected-motion-work-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-motion-work-thq-image1-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-motion-work-thq-image2-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-motion-work-container3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-motion-work-thq-image3-elm {
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
          .selected-motion-work-thq-image4-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-motion-work-thq-image5-elm {
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
          .selected-motion-work-container4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-motion-work-thq-image6-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-motion-work-thq-image7-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-motion-work-text1 {
            display: inline-block;
          }
          .selected-motion-work-text2 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .selected-motion-work-thq-content-elm {
              align-items: center;
              flex-direction: column;
            }
            .selected-motion-work-container2 {
              width: 100%;
            }
            .selected-motion-work-thq-image1-elm {
              flex: 0 0 auto;
              width: 100%;
            }
            .selected-motion-work-container3 {
              width: 100%;
            }
            .selected-motion-work-container4 {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .selected-motion-work-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

SelectedMotionWork.defaultProps = {
  image7Src:
    '/Animation/New Animation Pic/a899ba28-4f7b-402b-a72f-74b78a94bafc_3x2_2000x1333_u_100-1500w.jpg',
  image6Alt: 'Intuitive Design Services',
  image4Src:
    '/Animation/New Animation Pic/hf_20260119_201908_b183ab80-964a-4339-873f-55cdf707938e_3x2_2000x1333_u_100-1500w.jpg',
  image2Alt: 'High-Quality Audio Production',
  image1Src:
    '/Animation/New Animation Pic/gemini_generated_image_3oc4gm3oc4gm3oc4_3x2_2000x1333_u_100-1500w.jpg',
  image3Src:
    '/Animation/New Animation Pic/the%20bridege%20that%20wakes%2008%20a_3x2_2000x1333_u_100-1500w.jpg',
  image2Src:
    '/Animation/New Animation Pic/hf_20260119_115635_40a00c59-34b8-44ae-a55f-ecfb92202b09_3x2_2000x1333_u_100-1500w.jpg',
  image5Src:
    '/Animation/New Animation Pic/the%20clockwork%20mountain%2013_3x2_2000x1333_u_100-1500w.jpg',
  image5Alt: 'Customized Solutions for Clients',
  heading1: undefined,
  rootClassName: '',
  image3Alt: 'Creative Animation & Graphics',
  image7Alt: 'Dedicated Customer Support',
  image4Alt: 'Stunning Photography Services',
  image6Src: '/Animation/PIC/the%20bridege%20that%20wakes%2004-1500w.jpg',
  content1: undefined,
  image1Alt: 'Professional Film Production',
}

SelectedMotionWork.propTypes = {
  image7Src: PropTypes.string,
  image6Alt: PropTypes.string,
  image4Src: PropTypes.string,
  image2Alt: PropTypes.string,
  image1Src: PropTypes.string,
  image3Src: PropTypes.string,
  image2Src: PropTypes.string,
  image5Src: PropTypes.string,
  image5Alt: PropTypes.string,
  heading1: PropTypes.element,
  rootClassName: PropTypes.string,
  image3Alt: PropTypes.string,
  image7Alt: PropTypes.string,
  image4Alt: PropTypes.string,
  image6Src: PropTypes.string,
  content1: PropTypes.element,
  image1Alt: PropTypes.string,
}

export default SelectedMotionWork
