import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const SelectedAudioWork = (props) => {
  return (
    <>
      <div
        className={`selected-audio-work-thq-gallery3-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="selected-audio-work-thq-max-width-elm">
          <div className="selected-audio-work-thq-section-title-elm">
            <h2 className="selected-audio-work-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="selected-audio-work-text4">
                    Selected Audio Work
                  </span>
                </Fragment>
              )}
            </h2>
            <span className="selected-audio-work-thq-text-elm2 thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="selected-audio-work-text1">
                    <span>
                      A selection of sound design and music created for film,
                      visual projects, and immersive experiences.
                    </span>
                    <br></br>
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="selected-audio-work-container1">
            <div className="selected-audio-work-thq-content-elm">
              <div className="selected-audio-work-container2">
                <img
                  alt={props.image1Alt}
                  src={props.image1Src}
                  className="selected-audio-work-thq-image1-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image2Alt}
                  src={props.image2Src}
                  className="selected-audio-work-thq-image2-elm thq-img-ratio-1-1"
                />
              </div>
              <div className="selected-audio-work-container3">
                <img
                  alt={props.image3Alt}
                  src={props.image3Src}
                  className="selected-audio-work-thq-image3-elm thq-img-ratio-4-3"
                />
                <img
                  alt={props.image4Alt}
                  src={props.image4Src}
                  className="selected-audio-work-thq-image4-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image5Alt}
                  src={props.image5Src}
                  className="selected-audio-work-thq-image5-elm thq-img-ratio-4-3"
                />
              </div>
              <div className="selected-audio-work-container4">
                <img
                  alt={props.image6Alt}
                  src={props.image6Src}
                  className="selected-audio-work-thq-image6-elm thq-img-ratio-1-1"
                />
                <img
                  alt={props.image7Alt}
                  src={props.image7Src}
                  className="selected-audio-work-thq-image7-elm thq-img-ratio-1-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .selected-audio-work-thq-gallery3-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .selected-audio-work-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .selected-audio-work-thq-section-title-elm {
            gap: 24px;
            width: auto;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .selected-audio-work-thq-text-elm1 {
            text-align: center;
          }
          .selected-audio-work-thq-text-elm2 {
            text-align: center;
          }
          .selected-audio-work-container1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .selected-audio-work-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: 100%;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .selected-audio-work-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-audio-work-thq-image1-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-audio-work-thq-image2-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-audio-work-container3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-audio-work-thq-image3-elm {
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
          .selected-audio-work-thq-image4-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-audio-work-thq-image5-elm {
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
          .selected-audio-work-container4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            height: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .selected-audio-work-thq-image6-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-audio-work-thq-image7-elm {
            width: 100%;
            height: 440px;
            object-fit: cover;
          }
          .selected-audio-work-text1 {
            display: inline-block;
          }
          .selected-audio-work-text4 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .selected-audio-work-thq-content-elm {
              align-items: center;
              flex-direction: column;
            }
            .selected-audio-work-container2 {
              width: 100%;
            }
            .selected-audio-work-thq-image1-elm {
              flex: 0 0 auto;
              width: 100%;
            }
            .selected-audio-work-container3 {
              width: 100%;
            }
            .selected-audio-work-container4 {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .selected-audio-work-thq-section-title-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

SelectedAudioWork.defaultProps = {
  image4Src: '/Audio/Studio/46761_107423315984578_6037668_n-1500w.jpg',
  image5Alt: 'Customized Solutions for Clients',
  image1Src: '/Audio/Selected/68d53331095f4755bcfc4f284587572b-1500w.jpg',
  image3Src: '/Audio/Studio/334747_381817385211835_1960908791_o-1500w.jpg',
  image3Alt: 'Creative Animation & Graphics',
  image6Alt: 'Intuitive Design Services',
  image1Alt: 'Professional Film Production',
  image7Alt: 'Dedicated Customer Support',
  image7Src: '/Audio/Selected/91fguagefgl._ss500_-1500w.jpg',
  rootClassName: '',
  image6Src: '/Audio/Studio/46761_107423282651248_1487833_n-1500w.jpg',
  image5Src: '/Audio/Studio/jeevan%20chandimal_0000_layer%2022-1500w.jpg',
  content1: undefined,
  heading1: undefined,
  image2Src: '/Audio/Studio/46761_107423299317913_4190446_n-1500w.jpg',
  image2Alt: 'High-Quality Audio Production',
  image4Alt: 'Stunning Photography Services',
}

SelectedAudioWork.propTypes = {
  image4Src: PropTypes.string,
  image5Alt: PropTypes.string,
  image1Src: PropTypes.string,
  image3Src: PropTypes.string,
  image3Alt: PropTypes.string,
  image6Alt: PropTypes.string,
  image1Alt: PropTypes.string,
  image7Alt: PropTypes.string,
  image7Src: PropTypes.string,
  rootClassName: PropTypes.string,
  image6Src: PropTypes.string,
  image5Src: PropTypes.string,
  content1: PropTypes.element,
  heading1: PropTypes.element,
  image2Src: PropTypes.string,
  image2Alt: PropTypes.string,
  image4Alt: PropTypes.string,
}

export default SelectedAudioWork
