import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const StoreImagePresentationNote01 = (props) => {
  return (
    <>
      <div className="store-image-presentation-note-01-thq-layout251-elm thq-section-padding">
        <div className="store-image-presentation-note-01-thq-max-width-elm thq-section-max-width">
          <div className="thq-flex-row store-image-presentation-note-01-thq-section-title-elm">
            <div className="store-image-presentation-note-01-thq-column-elm thq-flex-column">
              <h2 className="thq-heading-2 store-image-presentation-note-01-thq-text-elm1">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span className="store-image-presentation-note-01-text5">
                      Each image is presented with:
                    </span>
                  </Fragment>
                )}
              </h2>
            </div>
            <span className="thq-body-small">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="store-image-presentation-note-01-text2">
                    Downloads are delivered in professionally graded,
                    high-quality formats suitable for creative and commercial
                    use.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="store-image-presentation-note-01-thq-content-elm1">
            <div className="store-image-presentation-note-01-thq-row-elm thq-flex-row">
              <div className="store-image-presentation-note-01-thq-feature1-elm thq-flex-column">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3 store-image-presentation-note-01-thq-feature1-image-elm"
                />
                <div className="store-image-presentation-note-01-thq-content-elm2 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="store-image-presentation-note-01-text4">
                          High-resolution previews
                        </span>
                      </Fragment>
                    )}
                  </h3>
                </div>
              </div>
              <div className="store-image-presentation-note-01-thq-feature2-elm thq-flex-column">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3 store-image-presentation-note-01-thq-feature2-image-elm"
                />
                <div className="store-image-presentation-note-01-thq-content-elm3 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="store-image-presentation-note-01-text7">
                          Clear licensing options
                        </span>
                      </Fragment>
                    )}
                  </h3>
                </div>
              </div>
              <div className="store-image-presentation-note-01-thq-feature3-elm thq-flex-column">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3 store-image-presentation-note-01-thq-feature3-image-elm"
                />
                <div className="store-image-presentation-note-01-thq-content-elm4 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="store-image-presentation-note-01-text3">
                          Usage details based on selection
                        </span>
                      </Fragment>
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="store-image-presentation-note-01-thq-actions-elm">
            <button className="thq-button-filled store-image-presentation-note-01-thq-button-elm1">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span className="store-image-presentation-note-01-text1">
                      Customized Visual Solutions
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="thq-button-outline store-image-presentation-note-01-thq-button-elm2">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span className="store-image-presentation-note-01-text6">
                      View Portfolio
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .store-image-presentation-note-01-thq-layout251-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .store-image-presentation-note-01-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .store-image-presentation-note-01-thq-column-elm {
            gap: var(--dl-layout-space-halfunit);
            align-items: flex-start;
            flex-shrink: 0;
          }
          .store-image-presentation-note-01-thq-content-elm1 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .store-image-presentation-note-01-thq-row-elm {
            align-items: flex-start;
          }
          .store-image-presentation-note-01-thq-feature1-elm {
            flex: 1;
          }
          .store-image-presentation-note-01-thq-content-elm2 {
            align-self: stretch;
            align-items: flex-start;
          }
          .store-image-presentation-note-01-thq-feature2-elm {
            flex: 1;
          }
          .store-image-presentation-note-01-thq-content-elm3 {
            align-self: stretch;
            align-items: flex-start;
          }
          .store-image-presentation-note-01-thq-feature3-elm {
            flex: 1;
          }
          .store-image-presentation-note-01-thq-content-elm4 {
            align-self: stretch;
            align-items: flex-start;
          }
          .store-image-presentation-note-01-thq-actions-elm {
            gap: var(--dl-layout-space-unit);
            display: none;
            align-items: flex-start;
          }
          .store-image-presentation-note-01-text1 {
            display: inline-block;
          }
          .store-image-presentation-note-01-text2 {
            display: inline-block;
          }
          .store-image-presentation-note-01-text3 {
            display: inline-block;
          }
          .store-image-presentation-note-01-text4 {
            display: inline-block;
          }
          .store-image-presentation-note-01-text5 {
            display: inline-block;
          }
          .store-image-presentation-note-01-text6 {
            display: inline-block;
          }
          .store-image-presentation-note-01-text7 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .store-image-presentation-note-01-thq-section-title-elm {
              align-items: flex-start;
              flex-direction: column;
            }
            .store-image-presentation-note-01-thq-feature1-image-elm {
              height: 260px;
            }
            .store-image-presentation-note-01-thq-feature2-image-elm {
              height: 260px;
            }
            .store-image-presentation-note-01-thq-feature3-image-elm {
              height: 260px;
            }
          }
          @media (max-width: 767px) {
            .store-image-presentation-note-01-thq-column-elm {
              width: 100%;
            }
            .store-image-presentation-note-01-thq-text-elm1 {
              text-align: center;
            }
            .store-image-presentation-note-01-thq-row-elm {
              flex-direction: column;
            }
            .store-image-presentation-note-01-thq-feature1-image-elm {
              width: 100%;
            }
            .store-image-presentation-note-01-thq-feature2-elm {
              width: auto;
            }
            .store-image-presentation-note-01-thq-feature2-image-elm {
              width: 100%;
            }
            .store-image-presentation-note-01-thq-feature3-elm {
              width: auto;
            }
            .store-image-presentation-note-01-thq-actions-elm {
              flex-wrap: wrap;
            }
          }
          @media (max-width: 479px) {
            .store-image-presentation-note-01-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .store-image-presentation-note-01-thq-button-elm1 {
              width: 100%;
            }
            .store-image-presentation-note-01-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

StoreImagePresentationNote01.defaultProps = {
  mainAction: undefined,
  sectionDescription: undefined,
  feature1ImageAlt: 'Film Production Image',
  feature2ImageAlt: 'Photography Services Image',
  feature1ImageSrc: '/Photography/3x2/_dsc8124_3x2_2000x1333_u_100-1400w.png',
  feature3Title: undefined,
  feature1Title: undefined,
  feature2ImageSrc: '/Photography/3x2/_dsc5544_3x2_2000x1333_u_100-300h.png',
  feature3ImageAlt: 'Sound and Animation Image',
  sectionTitle: undefined,
  feature3ImageSrc: '/Photography/3x2/_jee8856_3x2_2000x1333_u_100-300h.png',
  secondaryAction: undefined,
  feature2Title: undefined,
}

StoreImagePresentationNote01.propTypes = {
  mainAction: PropTypes.element,
  sectionDescription: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  feature3Title: PropTypes.element,
  feature1Title: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  sectionTitle: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  secondaryAction: PropTypes.element,
  feature2Title: PropTypes.element,
}

export default StoreImagePresentationNote01
