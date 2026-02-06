import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkMotionGraphics = (props) => {
  return (
    <>
      <div
        className={`work-motion-graphics-thq-layout251-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="work-motion-graphics-thq-max-width-elm thq-section-max-width">
          <div className="thq-flex-row work-motion-graphics-thq-section-title-elm">
            <div className="work-motion-graphics-thq-column-elm thq-flex-column">
              <h2 className="thq-heading-2 work-motion-graphics-thq-text-elm1">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span className="work-motion-graphics-text10">
                      Motion Graphics
                    </span>
                  </Fragment>
                )}
              </h2>
            </div>
            <span className="thq-body-small">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="work-motion-graphics-text16">
                    Graphic motion designed to support storytelling, titles, and
                    visual communication. Each piece prioritizes clarity,
                    rhythm, and restraint.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="work-motion-graphics-thq-content-elm1">
            <div className="work-motion-graphics-thq-row-elm thq-flex-row">
              <div className="work-motion-graphics-thq-feature1-elm thq-flex-column">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3 work-motion-graphics-thq-feature1-image-elm"
                />
                <div className="work-motion-graphics-thq-content-elm2 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="work-motion-graphics-text14">
                          Film Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="work-motion-graphics-text19">
                          Professional film production services tailored to
                          bring your stories to life.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-motion-graphics-thq-feature2-elm thq-flex-column">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3 work-motion-graphics-thq-feature2-image-elm"
                />
                <div className="work-motion-graphics-thq-content-elm3 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="work-motion-graphics-text13">
                          Audio Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="work-motion-graphics-text15">
                          High-quality audio production for a captivating
                          auditory experience.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-motion-graphics-thq-feature3-elm thq-flex-column">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3 work-motion-graphics-thq-feature3-image-elm"
                />
                <div className="work-motion-graphics-thq-content-elm4 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="work-motion-graphics-text18">
                          Animation &amp; Graphics
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="work-motion-graphics-text12">
                          Innovative animation and graphics solutions to enhance
                          visual storytelling.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="work-motion-graphics-thq-actions-elm">
            <button className="thq-button-filled work-motion-graphics-thq-button-elm1">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span className="work-motion-graphics-text11">
                      Customized Solutions
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="thq-button-outline work-motion-graphics-thq-button-elm2">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span className="work-motion-graphics-text17">
                      Dedicated Customer Support
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
          .work-motion-graphics-thq-layout251-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-motion-graphics-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-motion-graphics-thq-column-elm {
            gap: var(--dl-layout-space-halfunit);
            align-items: flex-start;
            flex-shrink: 0;
          }
          .work-motion-graphics-thq-content-elm1 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-motion-graphics-thq-row-elm {
            align-items: flex-start;
          }
          .work-motion-graphics-thq-feature1-elm {
            flex: 1;
          }
          .work-motion-graphics-thq-content-elm2 {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-motion-graphics-thq-feature2-elm {
            flex: 1;
          }
          .work-motion-graphics-thq-content-elm3 {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-motion-graphics-thq-feature3-elm {
            flex: 1;
          }
          .work-motion-graphics-thq-content-elm4 {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-motion-graphics-thq-actions-elm {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-items: flex-start;
          }
          .work-motion-graphics-text10 {
            display: inline-block;
          }
          .work-motion-graphics-text11 {
            display: inline-block;
          }
          .work-motion-graphics-text12 {
            display: inline-block;
          }
          .work-motion-graphics-text13 {
            display: inline-block;
          }
          .work-motion-graphics-text14 {
            display: inline-block;
          }
          .work-motion-graphics-text15 {
            display: inline-block;
          }
          .work-motion-graphics-text16 {
            display: inline-block;
          }
          .work-motion-graphics-text17 {
            display: inline-block;
          }
          .work-motion-graphics-text18 {
            display: inline-block;
          }
          .work-motion-graphics-text19 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .work-motion-graphics-thq-section-title-elm {
              align-items: flex-start;
              flex-direction: column;
            }
            .work-motion-graphics-thq-feature1-image-elm {
              height: 260px;
            }
            .work-motion-graphics-thq-feature2-image-elm {
              height: 260px;
            }
            .work-motion-graphics-thq-feature3-image-elm {
              height: 260px;
            }
          }
          @media (max-width: 767px) {
            .work-motion-graphics-thq-column-elm {
              width: 100%;
            }
            .work-motion-graphics-thq-text-elm1 {
              text-align: center;
            }
            .work-motion-graphics-thq-row-elm {
              flex-direction: column;
            }
            .work-motion-graphics-thq-feature1-image-elm {
              width: 100%;
            }
            .work-motion-graphics-thq-feature2-elm {
              width: auto;
            }
            .work-motion-graphics-thq-feature2-image-elm {
              width: 100%;
            }
            .work-motion-graphics-thq-feature3-elm {
              width: auto;
            }
            .work-motion-graphics-thq-actions-elm {
              flex-wrap: wrap;
            }
          }
          @media (max-width: 479px) {
            .work-motion-graphics-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .work-motion-graphics-thq-button-elm1 {
              width: 100%;
            }
            .work-motion-graphics-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

WorkMotionGraphics.defaultProps = {
  feature2ImageSrc:
    '/Animation/New Animation Pic/gemini_generated_image_3oc4gm3oc4gm3oc4_3x2_2000x1333_u_100-300h.jpg',
  sectionTitle: undefined,
  mainAction: undefined,
  feature1ImageSrc:
    '/Animation/New Animation Pic/hf_20260119_201908_b183ab80-964a-4339-873f-55cdf707938e_3x2_2000x1333_u_100-1400w.jpg',
  feature3Description: undefined,
  feature2Title: undefined,
  feature1Title: undefined,
  feature2Description: undefined,
  sectionDescription: undefined,
  feature1ImageAlt: 'Film Production Image',
  secondaryAction: undefined,
  feature3Title: undefined,
  feature1Description: undefined,
  feature3ImageSrc:
    '/Animation/New Animation Pic/the%20river%20that%20climbed%20the%20sky%2004_3x2_2000x1333_u_100-300h.jpg',
  feature2ImageAlt: 'Audio Production Image',
  rootClassName: '',
  feature3ImageAlt: 'Animation & Graphics Image',
}

WorkMotionGraphics.propTypes = {
  feature2ImageSrc: PropTypes.string,
  sectionTitle: PropTypes.element,
  mainAction: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature3Description: PropTypes.element,
  feature2Title: PropTypes.element,
  feature1Title: PropTypes.element,
  feature2Description: PropTypes.element,
  sectionDescription: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  secondaryAction: PropTypes.element,
  feature3Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  rootClassName: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
}

export default WorkMotionGraphics
