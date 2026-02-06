import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkRecentPost = (props) => {
  return (
    <>
      <div className="work-recent-post-thq-layout301-elm thq-section-padding">
        <div className="work-recent-post-thq-max-width-elm thq-section-max-width">
          <h2 className="work-recent-post-thq-text-elm thq-heading-2">
            {props.sectionTitle ?? (
              <Fragment>
                <span className="work-recent-post-text18">Recent Posts</span>
              </Fragment>
            )}
          </h2>
          <div className="work-recent-post-thq-row-elm thq-grid-auto-300">
            <div className="work-recent-post-thq-feature1-elm">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-recent-post-thq-content-elm1 thq-flex-column">
                <div className="work-recent-post-thq-section-title-elm1 thq-flex-column">
                  <h3 className="work-recent-post-thq-title1-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="work-recent-post-text21">
                          Film Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="work-recent-post-thq-description1-elm thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="work-recent-post-text19">
                          Professional film production services tailored to your
                          needs.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-recent-post-thq-action-elm1 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="work-recent-post-text12">
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
            <div className="work-recent-post-thq-feature2-elm">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-recent-post-thq-content-elm2 thq-flex-column">
                <div className="work-recent-post-thq-section-title-elm2 thq-flex-column">
                  <strong className="work-recent-post-thq-title2-elm thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="work-recent-post-text20">
                          Audio Production
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="work-recent-post-thq-description2-elm thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="work-recent-post-text13">
                          High-quality audio production services for your
                          projects.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-recent-post-thq-action-elm2 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="work-recent-post-text14">
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
            <div className="work-recent-post-thq-feature3-elm">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-recent-post-thq-content-elm3 thq-flex-column">
                <div className="work-recent-post-thq-section-title-elm3 thq-flex-column">
                  <strong className="work-recent-post-thq-title3-elm thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="work-recent-post-text15">
                          Animation &amp; Graphics
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="work-recent-post-thq-description3-elm thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="work-recent-post-text11">
                          Creative animation and graphics solutions to enhance
                          your content.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-recent-post-thq-action-elm3 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="work-recent-post-text22">
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
            <div className="work-recent-post-thq-feature4-elm">
              <img
                alt={props.feature4ImageAlt}
                src={props.feature4ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-recent-post-thq-content-elm4 thq-flex-column">
                <div className="work-recent-post-thq-section-title-elm4 thq-flex-column">
                  <strong className="work-recent-post-thq-title4-elm thq-heading-3">
                    {props.feature4Title ?? (
                      <Fragment>
                        <span className="work-recent-post-text17">
                          Photography
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="work-recent-post-thq-description4-elm thq-body-small">
                    {props.feature4Description ?? (
                      <Fragment>
                        <span className="work-recent-post-text16">
                          Professional photography services capturing your
                          moments beautifully.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-recent-post-thq-action-elm4 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="work-recent-post-text10">
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
          .work-recent-post-thq-layout301-elm {
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
          .work-recent-post-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .work-recent-post-thq-text-elm {
            text-align: center;
          }
          .work-recent-post-thq-row-elm {
            width: 100%;
          }
          .work-recent-post-thq-feature1-elm {
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
          .work-recent-post-thq-content-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .work-recent-post-thq-section-title-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .work-recent-post-thq-title1-elm {
            text-align: center;
          }
          .work-recent-post-thq-description1-elm {
            text-align: center;
          }
          .work-recent-post-thq-action-elm1 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-recent-post-thq-feature2-elm {
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
          .work-recent-post-thq-content-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .work-recent-post-thq-section-title-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .work-recent-post-thq-title2-elm {
            text-align: center;
          }
          .work-recent-post-thq-description2-elm {
            text-align: center;
          }
          .work-recent-post-thq-action-elm2 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-recent-post-thq-feature3-elm {
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
          .work-recent-post-thq-content-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .work-recent-post-thq-section-title-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .work-recent-post-thq-title3-elm {
            text-align: center;
          }
          .work-recent-post-thq-description3-elm {
            text-align: center;
          }
          .work-recent-post-thq-action-elm3 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-recent-post-thq-feature4-elm {
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
          .work-recent-post-thq-content-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .work-recent-post-thq-section-title-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .work-recent-post-thq-title4-elm {
            text-align: center;
          }
          .work-recent-post-thq-description4-elm {
            text-align: center;
          }
          .work-recent-post-thq-action-elm4 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-recent-post-text10 {
            display: inline-block;
          }
          .work-recent-post-text11 {
            display: inline-block;
          }
          .work-recent-post-text12 {
            display: inline-block;
          }
          .work-recent-post-text13 {
            display: inline-block;
          }
          .work-recent-post-text14 {
            display: inline-block;
          }
          .work-recent-post-text15 {
            display: inline-block;
          }
          .work-recent-post-text16 {
            display: inline-block;
          }
          .work-recent-post-text17 {
            display: inline-block;
          }
          .work-recent-post-text18 {
            display: inline-block;
          }
          .work-recent-post-text19 {
            display: inline-block;
          }
          .work-recent-post-text20 {
            display: inline-block;
          }
          .work-recent-post-text21 {
            display: inline-block;
          }
          .work-recent-post-text22 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-recent-post-thq-row-elm {
              width: auto;
              align-items: center;
              flex-direction: column;
            }
            .work-recent-post-thq-feature1-elm {
              width: 100%;
            }
            .work-recent-post-thq-feature2-elm {
              width: 100%;
            }
            .work-recent-post-thq-feature3-elm {
              width: 100%;
            }
            .work-recent-post-thq-feature4-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .work-recent-post-thq-text-elm {
              text-align: center;
            }
          }
          @media (max-width: 479px) {
            .work-recent-post-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

WorkRecentPost.defaultProps = {
  feature4Button: undefined,
  feature3Description: undefined,
  feature1Button: undefined,
  feature2Description: undefined,
  feature2ImageSrc: '/Photography/3x2/_jee26873_3x2_2000x1333_u_100-600w.png',
  feature2Button: undefined,
  feature3Title: undefined,
  feature1ImageAlt: 'Film Production Image',
  feature3ImageAlt: 'Animation & Graphics Image',
  feature4Description: undefined,
  feature4Title: undefined,
  feature4ImageSrc: '/Photography/3x2/_dsc8124_3x2_2000x1333_u_100-600w.png',
  sectionTitle: undefined,
  feature1Description: undefined,
  feature4ImageAlt: 'Photography Image',
  feature1ImageSrc: '/Photography/3x2/_jee8856_3x2_2000x1333_u_100-600w.png',
  feature3ImageSrc: '/Photography/3x2/_jee1604_3x2_2000x1333_u_100-600w.jpg',
  feature2Title: undefined,
  feature2ImageAlt: 'Audio Production Image',
  feature1Title: undefined,
  feature3Button: undefined,
}

WorkRecentPost.propTypes = {
  feature4Button: PropTypes.element,
  feature3Description: PropTypes.element,
  feature1Button: PropTypes.element,
  feature2Description: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature2Button: PropTypes.element,
  feature3Title: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  feature4Description: PropTypes.element,
  feature4Title: PropTypes.element,
  feature4ImageSrc: PropTypes.string,
  sectionTitle: PropTypes.element,
  feature1Description: PropTypes.element,
  feature4ImageAlt: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature2Title: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature1Title: PropTypes.element,
  feature3Button: PropTypes.element,
}

export default WorkRecentPost
