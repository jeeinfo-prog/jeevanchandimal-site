import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const FilmCategories = (props) => {
  return (
    <>
      <div className="film-categories-thq-layout301-elm thq-section-padding">
        <div className="film-categories-thq-max-width-elm thq-section-max-width">
          <div className="film-categories-thq-row-elm thq-grid-auto-300">
            <div className="film-categories-thq-feature1-elm">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="film-categories-thq-content-elm1 thq-flex-column">
                <div className="film-categories-thq-section-title-elm1 thq-flex-column">
                  <h3 className="film-categories-thq-title1-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="film-categories-text19">
                          <span>Commercial</span>
                          <br></br>
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="film-categories-thq-description1-elm thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="film-categories-text15">
                          Professional film production services tailored to your
                          needs.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="film-categories-thq-action-elm1 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="film-categories-text14">
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
            <div className="film-categories-thq-feature2-elm">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="film-categories-thq-content-elm2 thq-flex-column">
                <div className="film-categories-thq-section-title-elm2 thq-flex-column">
                  <strong className="film-categories-thq-title2-elm thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="film-categories-text12">
                          Documentary
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="film-categories-thq-description2-elm thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="film-categories-text17">
                          Customized audio production solutions for your
                          projects.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="film-categories-thq-action-elm2 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="film-categories-text10">
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
            <div className="film-categories-thq-feature3-elm">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="film-categories-thq-content-elm3 thq-flex-column">
                <div className="film-categories-thq-section-title-elm3 thq-flex-column">
                  <strong className="film-categories-thq-title3-elm thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="film-categories-text11">
                          Music Videos
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="film-categories-thq-description3-elm thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="film-categories-text13">
                          Expertise in character animation and stunning graphics
                          for your content.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="film-categories-thq-action-elm3 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="film-categories-text22">
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
            <div className="film-categories-thq-feature4-elm">
              <img
                alt={props.feature4ImageAlt}
                src={props.feature4ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="film-categories-thq-content-elm4 thq-flex-column">
                <div className="film-categories-thq-section-title-elm4 thq-flex-column">
                  <strong className="film-categories-thq-title4-elm thq-heading-3">
                    {props.feature4Title ?? (
                      <Fragment>
                        <span className="film-categories-text16">
                          Short Films
                        </span>
                      </Fragment>
                    )}
                  </strong>
                  <span className="film-categories-thq-description4-elm thq-body-small">
                    {props.feature4Description ?? (
                      <Fragment>
                        <span className="film-categories-text18">
                          Professional photography services to capture your
                          moments beautifully.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="film-categories-thq-action-elm4 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="film-categories-text23">
                            See Portfolio
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
          .film-categories-thq-layout301-elm {
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
          .film-categories-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .film-categories-thq-row-elm {
            width: 100%;
          }
          .film-categories-thq-feature1-elm {
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
          .film-categories-thq-content-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .film-categories-thq-section-title-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .film-categories-thq-title1-elm {
            text-align: center;
          }
          .film-categories-thq-description1-elm {
            text-align: center;
          }
          .film-categories-thq-action-elm1 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .film-categories-thq-feature2-elm {
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
          .film-categories-thq-content-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .film-categories-thq-section-title-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .film-categories-thq-title2-elm {
            text-align: center;
          }
          .film-categories-thq-description2-elm {
            text-align: center;
          }
          .film-categories-thq-action-elm2 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .film-categories-thq-feature3-elm {
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
          .film-categories-thq-content-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .film-categories-thq-section-title-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .film-categories-thq-title3-elm {
            text-align: center;
          }
          .film-categories-thq-description3-elm {
            text-align: center;
          }
          .film-categories-thq-action-elm3 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .film-categories-thq-feature4-elm {
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
          .film-categories-thq-content-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .film-categories-thq-section-title-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .film-categories-thq-title4-elm {
            text-align: center;
          }
          .film-categories-thq-description4-elm {
            text-align: center;
          }
          .film-categories-thq-action-elm4 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .film-categories-text10 {
            display: inline-block;
          }
          .film-categories-text11 {
            display: inline-block;
          }
          .film-categories-text12 {
            display: inline-block;
          }
          .film-categories-text13 {
            display: inline-block;
          }
          .film-categories-text14 {
            display: inline-block;
          }
          .film-categories-text15 {
            display: inline-block;
          }
          .film-categories-text16 {
            display: inline-block;
          }
          .film-categories-text17 {
            display: inline-block;
          }
          .film-categories-text18 {
            display: inline-block;
          }
          .film-categories-text19 {
            display: inline-block;
          }
          .film-categories-text22 {
            display: inline-block;
          }
          .film-categories-text23 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .film-categories-thq-row-elm {
              width: auto;
              align-items: center;
              flex-direction: column;
            }
            .film-categories-thq-feature1-elm {
              width: 100%;
            }
            .film-categories-thq-feature2-elm {
              width: 100%;
            }
            .film-categories-thq-feature3-elm {
              width: 100%;
            }
            .film-categories-thq-feature4-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .film-categories-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

FilmCategories.defaultProps = {
  feature1ImageSrc: '/Film/Commercial/everyuth-600w.jpg',
  feature4ImageSrc: '/Film/Short Film/img_7122-600w.jpg',
  feature3ImageAlt: 'Animation & Graphics Image',
  feature2ImageSrc: '/BTS/978028_520051914721714_1589376154_o-600w.jpg',
  feature2Button: undefined,
  feature3Title: undefined,
  feature2Title: undefined,
  feature2ImageAlt: 'Audio Production Image',
  feature3Description: undefined,
  feature1Button: undefined,
  feature1Description: undefined,
  feature4Title: undefined,
  feature2Description: undefined,
  feature4Description: undefined,
  feature1Title: undefined,
  feature1ImageAlt: 'Film Production Image',
  feature4ImageAlt: 'Photography Services Image',
  feature3Button: undefined,
  feature4Button: undefined,
  feature3ImageSrc:
    '/BTS/16903322_1391526320907598_6223719616267141958_o-600w.jpg',
}

FilmCategories.propTypes = {
  feature1ImageSrc: PropTypes.string,
  feature4ImageSrc: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature2Button: PropTypes.element,
  feature3Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature3Description: PropTypes.element,
  feature1Button: PropTypes.element,
  feature1Description: PropTypes.element,
  feature4Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature4Description: PropTypes.element,
  feature1Title: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature4ImageAlt: PropTypes.string,
  feature3Button: PropTypes.element,
  feature4Button: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
}

export default FilmCategories
