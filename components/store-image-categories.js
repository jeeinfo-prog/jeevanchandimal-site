import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const StoreImageCategories = (props) => {
  return (
    <>
      <div
        className={`store-image-categories-thq-layout349-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="store-image-categories-thq-max-width-elm thq-section-max-width">
          <div className="store-image-categories-container1">
            <h2 className="thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="store-image-categories-text42">
                    Categories
                  </span>
                </Fragment>
              )}
            </h2>
          </div>
          <div className="store-image-categories-container2 thq-grid-auto-300">
            <div className="store-image-categories-thq-card-elm1 thq-card thq-flex-column">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="store-image-categories-image1 thq-img-ratio-1-1"
              />
              <h2 className="thq-heading-2">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="store-image-categories-text32">
                      Nature
                    </span>
                  </Fragment>
                )}
              </h2>
              <span className="store-image-categories-text12 thq-body-small">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="store-image-categories-text31">
                      Quiet studies of the natural world, shaped by light,
                      rhythm, and stillness.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="store-image-categories-thq-card-elm2 thq-card thq-flex-column">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="store-image-categories-image2 thq-img-ratio-1-1"
              />
              <h2 className="thq-heading-2">
                {props.feature2Title ?? (
                  <Fragment>
                    <span className="store-image-categories-text33">
                      Wildlife
                    </span>
                  </Fragment>
                )}
              </h2>
              <span className="store-image-categories-text14 thq-body-small">
                {props.feature2Description ?? (
                  <Fragment>
                    <span className="store-image-categories-text30">
                      Patient observations of animals in their natural
                      environments, captured with respect and restraint.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="store-image-categories-thq-card-elm3 thq-card thq-flex-column">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="store-image-categories-image3 thq-img-ratio-1-1"
              />
              <h1 className="thq-heading-2">
                {props.feature3Title ?? (
                  <Fragment>
                    <span className="store-image-categories-text34">
                      Landscape
                    </span>
                  </Fragment>
                )}
              </h1>
              <span className="store-image-categories-text16 thq-body-small">
                {props.feature3Description ?? (
                  <Fragment>
                    <span className="store-image-categories-text37">
                      Expansive scenes defined by scale, form, and atmospheric
                      depth.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="store-image-categories-thq-card-elm4 thq-card thq-flex-column">
              <img
                alt={props.feature4ImageAlt}
                src={props.feature4ImageSrc}
                className="store-image-categories-image4 thq-img-ratio-1-1"
              />
              <h1 className="thq-heading-2">
                {props.feature4Title ?? (
                  <Fragment>
                    <span className="store-image-categories-text44">
                      Travel
                    </span>
                  </Fragment>
                )}
              </h1>
              <span className="store-image-categories-text18 thq-body-small">
                {props.feature4Description ?? (
                  <Fragment>
                    <span className="store-image-categories-text28">
                      Visual impressions of place, movement, and transition —
                      shaped by environment and experience.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="store-image-categories-thq-card-elm5 thq-card thq-flex-column">
              <img
                alt={props.feature5ImageAlt}
                src={props.feature5ImageSrc}
                className="store-image-categories-image5 thq-img-ratio-1-1"
              />
              <h1 className="thq-heading-2">
                {props.feature5Title ?? (
                  <Fragment>
                    <span className="store-image-categories-text36">
                      Culture
                    </span>
                  </Fragment>
                )}
              </h1>
              <span className="store-image-categories-text20 thq-body-small">
                {props.feature5Description ?? (
                  <Fragment>
                    <span className="store-image-categories-text45">
                      Moments reflecting tradition, ritual, and everyday life
                      within different communities.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="store-image-categories-thq-card-elm6 thq-card thq-flex-column">
              <img
                alt={props.feature6ImageAlt}
                src={props.feature6ImageSrc}
                className="store-image-categories-image6 thq-img-ratio-1-1"
              />
              <h1 className="thq-heading-2">
                {props.feature6Title ?? (
                  <Fragment>
                    <span className="store-image-categories-text43">
                      History
                    </span>
                  </Fragment>
                )}
              </h1>
              <span className="store-image-categories-text22 thq-body-small">
                {props.feature6Description ?? (
                  <Fragment>
                    <span className="store-image-categories-text35">
                      Visual traces of the past — architecture, places, and
                      details that carry memory and time.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="store-image-categories-thq-card-elm7 thq-card thq-flex-column">
              <img
                alt={props.feature7ImageAlt}
                src={props.feature7ImageSrc}
                className="store-image-categories-image7 thq-img-ratio-1-1"
              />
              <h1 className="thq-heading-2">
                {props.feature7Title ?? (
                  <Fragment>
                    <span className="store-image-categories-text29">
                      People
                    </span>
                  </Fragment>
                )}
              </h1>
              <span className="store-image-categories-text24 thq-body-small">
                {props.feature7Description ?? (
                  <Fragment>
                    <span className="store-image-categories-text41">
                      Human presence captured with sensitivity, context, and
                      emotional clarity.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="store-image-categories-thq-card-elm8 thq-card thq-flex-column">
              <img
                alt={props.feature8ImageAlt}
                src={props.feature8ImageSrc}
                className="store-image-categories-image8 thq-img-ratio-1-1"
              />
              <h1 className="thq-heading-2">
                {props.feature8Title ?? (
                  <Fragment>
                    <span className="store-image-categories-text38">
                      <span>
                        Black &amp; White
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                      <br></br>
                    </span>
                  </Fragment>
                )}
              </h1>
              <span className="store-image-categories-text26 thq-body-small">
                {props.feature8Description ?? (
                  <Fragment>
                    <span className="store-image-categories-text27">
                      Timeless compositions focused on light, form, contrast,
                      and texture.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .store-image-categories-thq-layout349-elm {
            gap: var(--dl-layout-space-twounits);
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .store-image-categories-thq-max-width-elm {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .store-image-categories-container1 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            max-width: 600px;
            align-items: center;
            margin-bottom: var(--dl-layout-space-fourunits);
            flex-direction: column;
          }
          .store-image-categories-container2 {
            width: 100%;
          }
          .store-image-categories-thq-card-elm1 {
            color: var(--dl-color-theme-neutral-light);
            height: auto;
            display: flex;
            align-self: flex-start;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background-color: var(--dl-color-theme-primary2);
          }
          .store-image-categories-image1 {
            width: var(--dl-layout-size-xxlarge);
            height: var(--dl-layout-size-xxlarge);
            object-fit: cover;
          }
          .store-image-categories-text12 {
            text-align: center;
          }
          .store-image-categories-thq-card-elm2 {
            color: var(--dl-color-theme-neutral-light);
            height: auto;
            display: flex;
            align-self: flex-start;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background-color: var(--dl-color-theme-primary1);
          }
          .store-image-categories-image2 {
            width: var(--dl-layout-size-xxlarge);
            height: var(--dl-layout-size-xxlarge);
            object-fit: cover;
          }
          .store-image-categories-text14 {
            text-align: center;
          }
          .store-image-categories-thq-card-elm3 {
            color: var(--dl-color-theme-neutral-light);
            height: auto;
            display: flex;
            align-self: flex-start;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background-color: var(--dl-color-theme-primary2);
          }
          .store-image-categories-image3 {
            width: var(--dl-layout-size-xxlarge);
            height: var(--dl-layout-size-xxlarge);
            object-fit: cover;
          }
          .store-image-categories-text16 {
            text-align: center;
          }
          .store-image-categories-thq-card-elm4 {
            color: var(--dl-color-theme-neutral-light);
            height: auto;
            display: flex;
            align-self: flex-start;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background-color: var(--dl-color-theme-primary1);
          }
          .store-image-categories-image4 {
            width: var(--dl-layout-size-xxlarge);
            height: var(--dl-layout-size-xxlarge);
            object-fit: cover;
          }
          .store-image-categories-text18 {
            text-align: center;
          }
          .store-image-categories-thq-card-elm5 {
            color: var(--dl-color-theme-neutral-light);
            height: auto;
            display: flex;
            align-self: flex-start;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background-color: var(--dl-color-theme-primary1);
          }
          .store-image-categories-image5 {
            width: var(--dl-layout-size-xxlarge);
            height: var(--dl-layout-size-xxlarge);
            object-fit: cover;
          }
          .store-image-categories-text20 {
            text-align: center;
          }
          .store-image-categories-thq-card-elm6 {
            color: var(--dl-color-theme-neutral-light);
            height: auto;
            display: flex;
            align-self: flex-start;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background-color: var(--dl-color-theme-primary2);
          }
          .store-image-categories-image6 {
            width: var(--dl-layout-size-xxlarge);
            height: var(--dl-layout-size-xxlarge);
            object-fit: cover;
          }
          .store-image-categories-text22 {
            text-align: center;
          }
          .store-image-categories-thq-card-elm7 {
            color: var(--dl-color-theme-neutral-light);
            height: auto;
            display: flex;
            align-self: flex-start;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background-color: var(--dl-color-theme-primary1);
          }
          .store-image-categories-image7 {
            width: var(--dl-layout-size-xxlarge);
            height: var(--dl-layout-size-xxlarge);
            object-fit: cover;
          }
          .store-image-categories-text24 {
            text-align: center;
          }
          .store-image-categories-thq-card-elm8 {
            color: var(--dl-color-theme-neutral-light);
            height: auto;
            display: flex;
            align-self: flex-start;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background-color: var(--dl-color-theme-primary2);
          }
          .store-image-categories-image8 {
            width: var(--dl-layout-size-xxlarge);
            height: var(--dl-layout-size-xxlarge);
            object-fit: cover;
          }
          .store-image-categories-text26 {
            text-align: center;
          }
          .store-image-categories-text27 {
            display: inline-block;
          }
          .store-image-categories-text28 {
            display: inline-block;
          }
          .store-image-categories-text29 {
            display: inline-block;
          }
          .store-image-categories-text30 {
            display: inline-block;
          }
          .store-image-categories-text31 {
            display: inline-block;
          }
          .store-image-categories-text32 {
            display: inline-block;
          }
          .store-image-categories-text33 {
            display: inline-block;
          }
          .store-image-categories-text34 {
            display: inline-block;
          }
          .store-image-categories-text35 {
            display: inline-block;
          }
          .store-image-categories-text36 {
            display: inline-block;
          }
          .store-image-categories-text37 {
            display: inline-block;
          }
          .store-image-categories-text38 {
            display: inline-block;
          }
          .store-image-categories-text41 {
            display: inline-block;
          }
          .store-image-categories-text42 {
            display: inline-block;
          }
          .store-image-categories-text43 {
            display: inline-block;
          }
          .store-image-categories-text44 {
            display: inline-block;
          }
          .store-image-categories-text45 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .store-image-categories-thq-max-width-elm {
              flex-direction: column;
            }
            .store-image-categories-container1 {
              margin-bottom: var(--dl-layout-space-threeunits);
            }
          }
          @media (max-width: 767px) {
            .store-image-categories-container1 {
              margin-bottom: var(--dl-layout-space-oneandhalfunits);
            }
            .store-image-categories-thq-card-elm1 {
              width: 100%;
            }
            .store-image-categories-thq-card-elm2 {
              width: 100%;
            }
            .store-image-categories-thq-card-elm3 {
              width: 100%;
            }
            .store-image-categories-thq-card-elm4 {
              width: 100%;
            }
            .store-image-categories-thq-card-elm5 {
              width: 100%;
            }
            .store-image-categories-thq-card-elm6 {
              width: 100%;
            }
            .store-image-categories-thq-card-elm7 {
              width: 100%;
            }
            .store-image-categories-thq-card-elm8 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

StoreImageCategories.defaultProps = {
  feature4ImageSrc:
    '/Photography/1x1/jee02224%2035_full%20resolution_9005x6003_u_0_1x1_2000x2000_u_100-1400w.png',
  feature3ImageAlt: 'Animation & Graphics Image',
  feature8Description: undefined,
  feature2ImageSrc:
    '/Photography/1x1/elephant%20senanayaka%20samudraya%2C%20ampara_1x1_2000x2000_u_100-1400w.png',
  feature4Description: undefined,
  feature7Title: undefined,
  feature5ImageSrc:
    '/Photography/1x1/gangarama%20perahera%2005_1x1_2000x2000_u_100-1400w.png',
  feature3ImageSrc:
    '/Photography/1x1/lake%20-%20matale%2C%20sri%20lanka._1x1_2000x2000_u_100-1400w.png',
  feature2Description: undefined,
  feature2ImageAlt: 'Audio Production Image',
  feature1Description: undefined,
  rootClassName: '',
  feature8ImageSrc:
    '/Photography/B&W/1x1/wild%20elephant%20-%20senanayake%20samudraya%20ampara%2C%20sri%20lanka._1x1_2000x2000_u_100%20b%26w-1400w.png',
  feature6ImageAlt: 'image',
  feature7ImageAlt: 'image',
  feature1Title: undefined,
  feature1ImageSrc:
    '/Photography/1x1/diyaluma%20%20oslanda%2001_1x1_2000x2000_u_100-1400w.png',
  feature2Title: undefined,
  feature3Title: undefined,
  feature7ImageSrc: '/Photography/1x1/jee064332_1x1_2000x2000_u_100-1400w.png',
  feature6Description: undefined,
  feature1ImageAlt: 'Film Production Image',
  feature5Title: undefined,
  feature3Description: undefined,
  feature5ImageAlt: 'image',
  feature8Title: undefined,
  feature7Description: undefined,
  feature4ImageAlt: 'Photography Image',
  heading1: undefined,
  feature6ImageSrc:
    '/Photography/1x1/%20buduruwagala%20%20wellawaya%2C%20sri%20lanka._1x1_2000x2000_u_100-1400w.png',
  feature6Title: undefined,
  feature8ImageAlt: 'image',
  feature4Title: undefined,
  feature5Description: undefined,
}

StoreImageCategories.propTypes = {
  feature4ImageSrc: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  feature8Description: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature4Description: PropTypes.element,
  feature7Title: PropTypes.element,
  feature5ImageSrc: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature2Description: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature1Description: PropTypes.element,
  rootClassName: PropTypes.string,
  feature8ImageSrc: PropTypes.string,
  feature6ImageAlt: PropTypes.string,
  feature7ImageAlt: PropTypes.string,
  feature1Title: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature2Title: PropTypes.element,
  feature3Title: PropTypes.element,
  feature7ImageSrc: PropTypes.string,
  feature6Description: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature5Title: PropTypes.element,
  feature3Description: PropTypes.element,
  feature5ImageAlt: PropTypes.string,
  feature8Title: PropTypes.element,
  feature7Description: PropTypes.element,
  feature4ImageAlt: PropTypes.string,
  heading1: PropTypes.element,
  feature6ImageSrc: PropTypes.string,
  feature6Title: PropTypes.element,
  feature8ImageAlt: PropTypes.string,
  feature4Title: PropTypes.element,
  feature5Description: PropTypes.element,
}

export default StoreImageCategories
