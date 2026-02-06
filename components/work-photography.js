import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkPhotography = (props) => {
  return (
    <>
      <div className="work-photography-thq-layout301-elm thq-section-padding">
        <div className="work-photography-thq-max-width-elm thq-section-max-width">
          <h2 className="work-photography-thq-text-elm thq-heading-2">
            {props.sectionTitle ?? (
              <Fragment>
                <span className="work-photography-text11">Photography</span>
              </Fragment>
            )}
          </h2>
          <span className="work-photography-text10 thq-body-small">
            {props.text ?? (
              <Fragment>
                <span className="work-photography-text24">
                  <span>
                    This archive brings together photographic work shaped by
                    light, atmosphere, and quiet observation. Each image is
                    created with a cinematic sensibility — focused on mood,
                    texture, and the emotional weight of a moment.
                  </span>
                  <br></br>
                  <span>
                    The collection spans personal exploration, editorial
                    storytelling, and curated imagery available for licensing,
                    presented as distinct but connected bodies of work.
                  </span>
                </span>
              </Fragment>
            )}
          </span>
          <div className="work-photography-thq-row-elm thq-grid-auto-300">
            <div className="work-photography-thq-feature1-elm">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-photography-thq-content-elm1 thq-flex-column">
                <div className="work-photography-thq-section-title-elm1 thq-flex-column">
                  <h3 className="work-photography-thq-title1-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="work-photography-text18">
                          Cinematic gallery
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="work-photography-thq-description1-elm thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="work-photography-text19">
                          Professional film production services tailored to your
                          needs.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-photography-thq-action-elm1 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="work-photography-text20">
                            Learn More
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="work-photography-thq-feature2-elm">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-photography-thq-content-elm2 thq-flex-column">
                <div className="work-photography-thq-section-title-elm2 thq-flex-column">
                  <strong className="work-photography-thq-title2-elm thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="work-photography-text21">
                          Editorial
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="work-photography-thq-description2-elm thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="work-photography-text14">
                          High-quality audio production services for your
                          projects.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-photography-thq-action-elm2 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="work-photography-text17">
                            Discover More
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="work-photography-thq-feature3-elm">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-photography-thq-content-elm3 thq-flex-column">
                <div className="work-photography-thq-section-title-elm3 thq-flex-column">
                  <strong className="work-photography-thq-title3-elm thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="work-photography-text16">
                          Personal projects
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="work-photography-thq-description3-elm thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="work-photography-text22">
                          Creative animation and graphics solutions to enhance
                          your content.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-photography-thq-action-elm3 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="work-photography-text12">
                            Explore Now
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="work-photography-thq-feature4-elm">
              <img
                alt={props.feature4ImageAlt}
                src={props.feature4ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-photography-thq-content-elm4 thq-flex-column">
                <div className="work-photography-thq-section-title-elm4 thq-flex-column">
                  <strong className="work-photography-thq-title4-elm thq-heading-3">
                    {props.feature4Title ?? (
                      <Fragment>
                        <span className="work-photography-text15">
                          Stock previews
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="work-photography-thq-description4-elm thq-body-small">
                    {props.feature4Description ?? (
                      <Fragment>
                        <span className="work-photography-text13">
                          Professional photography services to capture your
                          special moments.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-photography-thq-action-elm4 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="work-photography-text23">
                            View Portfolio
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-photography-thq-layout301-elm {
            gap: var(--dl-layout-space-fiveunits);
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
            justify-content: center;
          }
          .work-photography-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .work-photography-thq-text-elm {
            text-align: center;
          }
          .work-photography-text10 {
            text-align: center;
          }
          .work-photography-thq-row-elm {
            width: 100%;
          }
          .work-photography-thq-feature1-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-photography-thq-content-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .work-photography-thq-section-title-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .work-photography-thq-title1-elm {
            text-align: center;
          }
          .work-photography-thq-description1-elm {
            text-align: center;
          }
          .work-photography-thq-action-elm1 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-photography-thq-feature2-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-photography-thq-content-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .work-photography-thq-section-title-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .work-photography-thq-title2-elm {
            text-align: center;
          }
          .work-photography-thq-description2-elm {
            text-align: center;
          }
          .work-photography-thq-action-elm2 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-photography-thq-feature3-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-photography-thq-content-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .work-photography-thq-section-title-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .work-photography-thq-title3-elm {
            text-align: center;
          }
          .work-photography-thq-description3-elm {
            text-align: center;
          }
          .work-photography-thq-action-elm3 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-photography-thq-feature4-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-photography-thq-content-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .work-photography-thq-section-title-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .work-photography-thq-title4-elm {
            text-align: center;
          }
          .work-photography-thq-description4-elm {
            text-align: center;
          }
          .work-photography-thq-action-elm4 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-photography-text11 {
            display: inline-block;
          }
          .work-photography-text12 {
            display: inline-block;
          }
          .work-photography-text13 {
            display: inline-block;
          }
          .work-photography-text14 {
            display: inline-block;
          }
          .work-photography-text15 {
            display: inline-block;
          }
          .work-photography-text16 {
            display: inline-block;
          }
          .work-photography-text17 {
            display: inline-block;
          }
          .work-photography-text18 {
            display: inline-block;
          }
          .work-photography-text19 {
            display: inline-block;
          }
          .work-photography-text20 {
            display: inline-block;
          }
          .work-photography-text21 {
            display: inline-block;
          }
          .work-photography-text22 {
            display: inline-block;
          }
          .work-photography-text23 {
            display: inline-block;
          }
          .work-photography-text24 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-photography-thq-row-elm {
              width: auto;
              align-items: center;
              flex-direction: column;
            }
            .work-photography-thq-feature1-elm {
              width: 100%;
            }
            .work-photography-thq-feature2-elm {
              width: 100%;
            }
            .work-photography-thq-feature3-elm {
              width: 100%;
            }
            .work-photography-thq-feature4-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .work-photography-thq-text-elm {
              text-align: center;
            }
          }
          @media (max-width: 479px) {
            .work-photography-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

WorkPhotography.defaultProps = {
  sectionTitle: undefined,
  feature3Button: undefined,
  feature4Description: undefined,
  feature2ImageAlt: 'Audio Production Image',
  feature2ImageSrc: '/Photography/3x2/_jee1691_3x2_2000x1333_u_100-600w.jpg',
  feature1ImageSrc: '/Photography/3x2/_dsc8124_3x2_2000x1333_u_100-600w.png',
  feature2Description: undefined,
  feature4Title: undefined,
  feature3Title: undefined,
  feature2Button: undefined,
  feature1Title: undefined,
  feature1Description: undefined,
  feature1ImageAlt: 'Film Production Image',
  feature1Button: undefined,
  feature4ImageSrc: '/Photography/3x2/_dsc5544_3x2_2000x1333_u_100-600w.png',
  feature2Title: undefined,
  feature3ImageSrc: '/Photography/3x2/_jee8856_3x2_2000x1333_u_100-600w.png',
  feature3Description: undefined,
  feature4Button: undefined,
  feature3ImageAlt: 'Animation & Graphics Image',
  feature4ImageAlt: 'Photography Image',
  text: undefined,
}

WorkPhotography.propTypes = {
  sectionTitle: PropTypes.element,
  feature3Button: PropTypes.element,
  feature4Description: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  feature2Description: PropTypes.element,
  feature4Title: PropTypes.element,
  feature3Title: PropTypes.element,
  feature2Button: PropTypes.element,
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature1Button: PropTypes.element,
  feature4ImageSrc: PropTypes.string,
  feature2Title: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature3Description: PropTypes.element,
  feature4Button: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature4ImageAlt: PropTypes.string,
  text: PropTypes.element,
}

export default WorkPhotography
