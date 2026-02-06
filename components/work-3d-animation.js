import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Work3DAnimation = (props) => {
  return (
    <>
      <div
        className={`work-3d-animation-thq-layout251-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="work-3d-animation-thq-max-width-elm thq-section-max-width">
          <div className="thq-flex-row work-3d-animation-thq-section-title-elm">
            <div className="work-3d-animation-thq-column-elm thq-flex-column">
              <h2 className="thq-heading-2 work-3d-animation-thq-text-elm1">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span className="work-3d-animation-text18">
                      3D Animation
                    </span>
                  </Fragment>
                )}
              </h2>
            </div>
            <span className="thq-body-small">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="work-3d-animation-text17">
                    Three-dimensional motion work focused on spatial clarity and
                    visual cohesion. These projects emphasize lighting, form,
                    and controlled movement over spectacle.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="work-3d-animation-thq-content-elm1">
            <div className="work-3d-animation-thq-row-elm thq-flex-row">
              <div className="work-3d-animation-thq-feature1-elm thq-flex-column">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3 work-3d-animation-thq-feature1-image-elm"
                />
                <div className="work-3d-animation-thq-content-elm2 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="work-3d-animation-text16">
                          Film Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="work-3d-animation-text14">
                          Professional film production services tailored to
                          bring your stories to life.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-3d-animation-thq-feature2-elm thq-flex-column">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3 work-3d-animation-thq-feature2-image-elm"
                />
                <div className="work-3d-animation-thq-content-elm3 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="work-3d-animation-text10">
                          Audio Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="work-3d-animation-text19">
                          High-quality audio production for a captivating
                          auditory experience.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-3d-animation-thq-feature3-elm thq-flex-column">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3 work-3d-animation-thq-feature3-image-elm"
                />
                <div className="work-3d-animation-thq-content-elm4 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="work-3d-animation-text12">
                          Animation &amp; Graphics
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="work-3d-animation-text15">
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
          <div className="work-3d-animation-thq-actions-elm">
            <button className="thq-button-filled work-3d-animation-thq-button-elm1">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span className="work-3d-animation-text13">
                      Customized Solutions
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="thq-button-outline work-3d-animation-thq-button-elm2">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span className="work-3d-animation-text11">
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
          .work-3d-animation-thq-layout251-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-3d-animation-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-3d-animation-thq-column-elm {
            gap: var(--dl-layout-space-halfunit);
            align-items: flex-start;
            flex-shrink: 0;
          }
          .work-3d-animation-thq-content-elm1 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-3d-animation-thq-row-elm {
            align-items: flex-start;
          }
          .work-3d-animation-thq-feature1-elm {
            flex: 1;
          }
          .work-3d-animation-thq-content-elm2 {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-3d-animation-thq-feature2-elm {
            flex: 1;
          }
          .work-3d-animation-thq-content-elm3 {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-3d-animation-thq-feature3-elm {
            flex: 1;
          }
          .work-3d-animation-thq-content-elm4 {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-3d-animation-thq-actions-elm {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-items: flex-start;
          }
          .work-3d-animation-text10 {
            display: inline-block;
          }
          .work-3d-animation-text11 {
            display: inline-block;
          }
          .work-3d-animation-text12 {
            display: inline-block;
          }
          .work-3d-animation-text13 {
            display: inline-block;
          }
          .work-3d-animation-text14 {
            display: inline-block;
          }
          .work-3d-animation-text15 {
            display: inline-block;
          }
          .work-3d-animation-text16 {
            display: inline-block;
          }
          .work-3d-animation-text17 {
            display: inline-block;
          }
          .work-3d-animation-text18 {
            display: inline-block;
          }
          .work-3d-animation-text19 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .work-3d-animation-thq-section-title-elm {
              align-items: flex-start;
              flex-direction: column;
            }
            .work-3d-animation-thq-feature1-image-elm {
              height: 260px;
            }
            .work-3d-animation-thq-feature2-image-elm {
              height: 260px;
            }
            .work-3d-animation-thq-feature3-image-elm {
              height: 260px;
            }
          }
          @media (max-width: 767px) {
            .work-3d-animation-thq-column-elm {
              width: 100%;
            }
            .work-3d-animation-thq-text-elm1 {
              text-align: center;
            }
            .work-3d-animation-thq-row-elm {
              flex-direction: column;
            }
            .work-3d-animation-thq-feature1-image-elm {
              width: 100%;
            }
            .work-3d-animation-thq-feature2-elm {
              width: auto;
            }
            .work-3d-animation-thq-feature2-image-elm {
              width: 100%;
            }
            .work-3d-animation-thq-feature3-elm {
              width: auto;
            }
            .work-3d-animation-thq-actions-elm {
              flex-wrap: wrap;
            }
          }
          @media (max-width: 479px) {
            .work-3d-animation-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .work-3d-animation-thq-button-elm1 {
              width: 100%;
            }
            .work-3d-animation-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

Work3DAnimation.defaultProps = {
  feature2Title: undefined,
  secondaryAction: undefined,
  feature3Title: undefined,
  mainAction: undefined,
  feature1ImageSrc:
    '/Animation/New Animation Pic/the%20bridege%20that%20wakes%2008%20a_3x2_2000x1333_u_100-1400w.jpg',
  feature2ImageSrc:
    '/Animation/New Animation Pic/the%20clockwork%20mountain%2013_3x2_2000x1333_u_100-300h.jpg',
  feature1Description: undefined,
  feature3ImageSrc: '/Animation/PIC/the%20bridege%20that%20wakes%2013-200w.jpg',
  feature2ImageAlt: 'Audio Production Image',
  feature3Description: undefined,
  feature1Title: undefined,
  sectionDescription: undefined,
  rootClassName: '',
  feature3ImageAlt: 'Animation & Graphics Image',
  sectionTitle: undefined,
  feature2Description: undefined,
  feature1ImageAlt: 'Film Production Image',
}

Work3DAnimation.propTypes = {
  feature2Title: PropTypes.element,
  secondaryAction: PropTypes.element,
  feature3Title: PropTypes.element,
  mainAction: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature1Description: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature3Description: PropTypes.element,
  feature1Title: PropTypes.element,
  sectionDescription: PropTypes.element,
  rootClassName: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  sectionTitle: PropTypes.element,
  feature2Description: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
}

export default Work3DAnimation
