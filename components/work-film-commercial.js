import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkFilmCommercial = (props) => {
  return (
    <>
      <div className="work-film-commercial-thq-layout301-elm thq-section-padding">
        <div className="work-film-commercial-thq-max-width-elm thq-section-max-width">
          <h2 className="work-film-commercial-thq-text-elm thq-heading-2">
            {props.sectionTitle ?? (
              <Fragment>
                <span className="work-film-commercial-text20">Commercial</span>
              </Fragment>
            )}
          </h2>
          <span className="work-film-commercial-text10">
            {props.text ?? (
              <Fragment>
                <span className="work-film-commercial-text16">
                  <span>
                    Brand-led films created with cinematic language rather than
                    advertising conventions. These projects focus on mood,
                    clarity, and narrative presence, translating brand identity
                    into visual stories that feel natural and considered.
                  </span>
                  <br></br>
                  <span>
                    Each commercial is crafted to connect emotionally while
                    maintaining visual integrity across platforms.
                  </span>
                </span>
              </Fragment>
            )}
          </span>
          <div className="work-film-commercial-thq-row-elm thq-grid-auto-300">
            <div className="work-film-commercial-thq-feature1-elm">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-film-commercial-thq-content-elm1 thq-flex-column">
                <div className="work-film-commercial-thq-section-title-elm1 thq-flex-column">
                  <h3 className="work-film-commercial-thq-title1-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="work-film-commercial-text12">
                          Commercial 01
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="work-film-commercial-thq-description1-elm thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="work-film-commercial-text26">
                          Professional film production services tailored to your
                          needs.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-film-commercial-thq-action-elm1 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="work-film-commercial-text25">
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
            <div className="work-film-commercial-thq-feature2-elm">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-film-commercial-thq-content-elm2 thq-flex-column">
                <div className="work-film-commercial-thq-section-title-elm2 thq-flex-column">
                  <strong className="work-film-commercial-thq-title2-elm thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="work-film-commercial-text22">
                          Commercial 02
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="work-film-commercial-thq-description2-elm thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="work-film-commercial-text23">
                          High-quality audio production services for your
                          projects.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-film-commercial-thq-action-elm2 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="work-film-commercial-text14">
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
            <div className="work-film-commercial-thq-feature3-elm">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-film-commercial-thq-content-elm3 thq-flex-column">
                <div className="work-film-commercial-thq-section-title-elm3 thq-flex-column">
                  <strong className="work-film-commercial-thq-title3-elm thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="work-film-commercial-text24">
                          Commercial 03
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="work-film-commercial-thq-description3-elm thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="work-film-commercial-text21">
                          Creative animation and graphics solutions to enhance
                          your content.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-film-commercial-thq-action-elm3 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="work-film-commercial-text13">
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
            <div className="work-film-commercial-thq-feature4-elm">
              <img
                alt={props.feature4ImageAlt}
                src={props.feature4ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="work-film-commercial-thq-content-elm4 thq-flex-column">
                <div className="work-film-commercial-thq-section-title-elm4 thq-flex-column">
                  <strong className="work-film-commercial-thq-title4-elm thq-heading-3">
                    {props.feature4Title ?? (
                      <Fragment>
                        <span className="work-film-commercial-text15">
                          Commercial 04
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="work-film-commercial-thq-description4-elm thq-body-small">
                    {props.feature4Description ?? (
                      <Fragment>
                        <span className="work-film-commercial-text11">
                          Professional photography services to capture your
                          special moments.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="work-film-commercial-thq-action-elm4 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="work-film-commercial-text27">
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
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-film-commercial-thq-layout301-elm {
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
          .work-film-commercial-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .work-film-commercial-thq-text-elm {
            text-align: center;
          }
          .work-film-commercial-text10 {
            text-align: center;
          }
          .work-film-commercial-thq-row-elm {
            width: 100%;
          }
          .work-film-commercial-thq-feature1-elm {
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
          .work-film-commercial-thq-content-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .work-film-commercial-thq-section-title-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .work-film-commercial-thq-title1-elm {
            text-align: center;
          }
          .work-film-commercial-thq-description1-elm {
            text-align: center;
          }
          .work-film-commercial-thq-action-elm1 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-film-commercial-thq-feature2-elm {
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
          .work-film-commercial-thq-content-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .work-film-commercial-thq-section-title-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .work-film-commercial-thq-title2-elm {
            text-align: center;
          }
          .work-film-commercial-thq-description2-elm {
            text-align: center;
          }
          .work-film-commercial-thq-action-elm2 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-film-commercial-thq-feature3-elm {
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
          .work-film-commercial-thq-content-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .work-film-commercial-thq-section-title-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .work-film-commercial-thq-title3-elm {
            text-align: center;
          }
          .work-film-commercial-thq-description3-elm {
            text-align: center;
          }
          .work-film-commercial-thq-action-elm3 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-film-commercial-thq-feature4-elm {
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
          .work-film-commercial-thq-content-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .work-film-commercial-thq-section-title-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .work-film-commercial-thq-title4-elm {
            text-align: center;
          }
          .work-film-commercial-thq-description4-elm {
            text-align: center;
          }
          .work-film-commercial-thq-action-elm4 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .work-film-commercial-text11 {
            display: inline-block;
          }
          .work-film-commercial-text12 {
            display: inline-block;
          }
          .work-film-commercial-text13 {
            display: inline-block;
          }
          .work-film-commercial-text14 {
            display: inline-block;
          }
          .work-film-commercial-text15 {
            display: inline-block;
          }
          .work-film-commercial-text16 {
            display: inline-block;
          }
          .work-film-commercial-text20 {
            display: inline-block;
          }
          .work-film-commercial-text21 {
            display: inline-block;
          }
          .work-film-commercial-text22 {
            display: inline-block;
          }
          .work-film-commercial-text23 {
            display: inline-block;
          }
          .work-film-commercial-text24 {
            display: inline-block;
          }
          .work-film-commercial-text25 {
            display: inline-block;
          }
          .work-film-commercial-text26 {
            display: inline-block;
          }
          .work-film-commercial-text27 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-film-commercial-thq-row-elm {
              width: auto;
              align-items: center;
              flex-direction: column;
            }
            .work-film-commercial-thq-feature1-elm {
              width: 100%;
            }
            .work-film-commercial-thq-feature2-elm {
              width: 100%;
            }
            .work-film-commercial-thq-feature3-elm {
              width: 100%;
            }
            .work-film-commercial-thq-feature4-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .work-film-commercial-thq-text-elm {
              text-align: center;
            }
          }
          @media (max-width: 479px) {
            .work-film-commercial-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

WorkFilmCommercial.defaultProps = {
  feature2ImageAlt: 'Audio Production Image',
  feature4Description: undefined,
  feature1Title: undefined,
  feature3ImageAlt: 'Animation & Graphics Image',
  feature3Button: undefined,
  feature2Button: undefined,
  feature4Title: undefined,
  feature2ImageSrc: '/Film/Commercial/everyuth-600w.jpg',
  text: undefined,
  sectionTitle: undefined,
  feature3Description: undefined,
  feature4ImageSrc: '/Film/Commercial/61350_107829159277327_1262027_n-600w.jpg',
  feature1ImageAlt: 'Film Production Image',
  feature2Title: undefined,
  feature2Description: undefined,
  feature4ImageAlt: 'Photography Image',
  feature3ImageSrc: '/Film/Commercial/tips%20%26%20toes-600w.jpg',
  feature3Title: undefined,
  feature1Button: undefined,
  feature1Description: undefined,
  feature4Button: undefined,
  feature1ImageSrc: '/Film/Commercial/everyouth-600w.jpg',
}

WorkFilmCommercial.propTypes = {
  feature2ImageAlt: PropTypes.string,
  feature4Description: PropTypes.element,
  feature1Title: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature3Button: PropTypes.element,
  feature2Button: PropTypes.element,
  feature4Title: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  text: PropTypes.element,
  sectionTitle: PropTypes.element,
  feature3Description: PropTypes.element,
  feature4ImageSrc: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature2Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature4ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature3Title: PropTypes.element,
  feature1Button: PropTypes.element,
  feature1Description: PropTypes.element,
  feature4Button: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
}

export default WorkFilmCommercial
