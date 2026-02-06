import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Animations = (props) => {
  return (
    <>
      <div className="animations-thq-layout300-elm thq-section-padding">
        <div className="animations-thq-max-width-elm thq-section-max-width thq-flex-column">
          <div className="animations-thq-section-title-elm thq-flex-column">
            <h2 className="thq-heading-2 animations-thq-text-elm1">
              {props.sectionTitle ?? (
                <Fragment>
                  <span className="animations-text18">
                    Animation &amp; Motion
                  </span>
                </Fragment>
              )}
            </h2>
            <p className="animations-thq-text-elm2 thq-body-large">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="animations-text11">
                    <span>
                      This archive explores motion as a storytelling tool —
                      where movement is guided by rhythm, clarity, and
                      intention. Animation is treated as a visual language, used
                      to enhance narrative rather than decorate it.
                    </span>
                    <br></br>
                    <span>
                      The work includes 2D, 3D, and motion graphic projects
                      designed to integrate seamlessly with film and
                      photographic elements.
                    </span>
                  </span>
                </Fragment>
              )}
            </p>
          </div>
          <div className="animations-thq-content-elm thq-grid-auto-300">
            <div className="animations-thq-feature1-elm thq-flex-column">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="animations-thq-feature1-title-elm thq-heading-3">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="animations-text16">2D Animations</span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="animations-text20">
                      Utilize cutting-edge AI technology and captivating
                      animations to enhance your projects.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="animations-thq-feature2-elm thq-flex-column">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="thq-heading-3">
                {props.feature2Title ?? (
                  <Fragment>
                    <span className="animations-text22">3D Animations</span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature2Description ?? (
                  <Fragment>
                    <span className="animations-text15">
                      Gain valuable insights and track performance with our
                      advanced analytics tools.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="animations-thq-feature3-elm thq-flex-column">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="thq-heading-3">
                {props.feature3Title ?? (
                  <Fragment>
                    <span className="animations-text10">Motion graphics</span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature3Description ?? (
                  <Fragment>
                    <span className="animations-text19">
                      Receive personalized assistance and support from our team
                      every step of the way.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="animations-thq-actions-elm thq-flex-row">
            <button className="animations-thq-button-elm1 thq-button-filled">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span className="animations-text17">Get Started</span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="animations-thq-button-elm2 thq-button-outline">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span className="animations-text21">Learn More</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .animations-thq-layout300-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .animations-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            align-items: center;
          }
          .animations-thq-section-title-elm {
            align-items: center;
          }
          .animations-thq-text-elm2 {
            text-align: center;
          }
          .animations-thq-content-elm {
            align-self: stretch;
            align-items: center;
          }
          .animations-thq-feature1-elm {
            align-items: flex-start;
          }
          .animations-thq-feature1-title-elm {
            text-align: center;
          }
          .animations-thq-feature2-elm {
            align-items: flex-start;
          }
          .animations-thq-feature3-elm {
            align-items: flex-start;
          }
          .animations-thq-actions-elm {
            align-items: flex-start;
          }
          .animations-thq-button-elm1 {
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-oneandhalfunits);
            padding-right: var(--dl-layout-space-oneandhalfunits);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .animations-thq-button-elm2 {
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-oneandhalfunits);
            padding-right: var(--dl-layout-space-oneandhalfunits);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .animations-text10 {
            display: inline-block;
          }
          .animations-text11 {
            display: inline-block;
          }
          .animations-text15 {
            display: inline-block;
          }
          .animations-text16 {
            display: inline-block;
          }
          .animations-text17 {
            display: inline-block;
          }
          .animations-text18 {
            display: inline-block;
          }
          .animations-text19 {
            display: inline-block;
          }
          .animations-text20 {
            display: inline-block;
          }
          .animations-text21 {
            display: inline-block;
          }
          .animations-text22 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .animations-thq-section-title-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .animations-thq-section-title-elm {
              width: auto;
            }
            .animations-thq-text-elm1 {
              text-align: center;
            }
            .animations-thq-feature2-elm {
              width: auto;
            }
            .animations-thq-feature3-elm {
              width: auto;
            }
          }
          @media (max-width: 479px) {
            .animations-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .animations-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .animations-thq-button-elm1 {
              width: 100%;
            }
            .animations-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

Animations.defaultProps = {
  feature2ImageSrc:
    '/Animation/New Animation Pic/the%20clockwork%20mountain%2013_3x2_2000x1333_u_100-200h.jpg',
  feature3Title: undefined,
  sectionDescription: undefined,
  feature2ImageAlt: 'Analytics Tools Image',
  feature2Description: undefined,
  feature3ImageSrc:
    '/Animation/New Animation Pic/hf_20260119_201908_b183ab80-964a-4339-873f-55cdf707938e_3x2_2000x1333_u_100-200h.jpg',
  feature1Title: undefined,
  mainAction: undefined,
  feature3ImageAlt: 'Customer Support Image',
  sectionTitle: undefined,
  feature3Description: undefined,
  feature1ImageSrc:
    '/Animation/New Animation Pic/the%20bridege%20that%20wakes%2004_3x2_2000x1333_u_100-1400w.jpg',
  feature1Description: undefined,
  secondaryAction: undefined,
  feature2Title: undefined,
  feature1ImageAlt: 'AI & Animations Image',
}

Animations.propTypes = {
  feature2ImageSrc: PropTypes.string,
  feature3Title: PropTypes.element,
  sectionDescription: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature2Description: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature1Title: PropTypes.element,
  mainAction: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  sectionTitle: PropTypes.element,
  feature3Description: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature1Description: PropTypes.element,
  secondaryAction: PropTypes.element,
  feature2Title: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
}

export default Animations
