import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkFilmShortFilm = (props) => {
  return (
    <>
      <div className="work-film-short-film-thq-layout300-elm thq-section-padding">
        <div className="work-film-short-film-thq-max-width-elm thq-section-max-width">
          <div className="work-film-short-film-thq-section-title-elm">
            <div className="work-film-short-film-thq-content-elm1">
              <h2 className="work-film-short-film-thq-text-elm1 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="work-film-short-film-text2">
                      Short Films
                    </span>
                  </Fragment>
                )}
              </h2>
              <span className="work-film-short-film-thq-text-elm2 thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="work-film-short-film-text3">
                      Narrative and conceptual short films developed around
                      atmosphere, pacing, and emotional tone. These works
                      explore character, space, and silence as storytelling
                      tools, often blurring the line between narrative and
                      visual study.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="work-film-short-film-thq-content-elm2">
            <div className="work-film-short-film-thq-row-elm thq-flex-row">
              <div className="work-film-short-film-thq-feature1-elm">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-film-short-film-thq-content-elm3">
                  <h3 className="work-film-short-film-thq-feature1-title-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="work-film-short-film-text8">
                          Film Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="work-film-short-film-text1">
                          Professional film production services tailored to your
                          needs.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-film-short-film-thq-feature2-elm">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-film-short-film-thq-content-elm4">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="work-film-short-film-text4">
                          Audio Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="work-film-short-film-text5">
                          High-quality audio production for a captivating
                          auditory experience.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-film-short-film-thq-feature3-elm">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-film-short-film-thq-content-elm5">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="work-film-short-film-text7">
                          Animation
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="work-film-short-film-text6">
                          Bring your ideas to life with our expert animation
                          services.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-film-short-film-thq-layout300-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-short-film-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .work-film-short-film-thq-section-title-elm {
            gap: 16px;
            width: 100%;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-short-film-thq-content-elm1 {
            gap: 24px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .work-film-short-film-thq-text-elm1 {
            text-align: center;
          }
          .work-film-short-film-thq-text-elm2 {
            text-align: center;
          }
          .work-film-short-film-thq-content-elm2 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .work-film-short-film-thq-row-elm {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
            justify-content: center;
          }
          .work-film-short-film-thq-feature1-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-short-film-thq-content-elm3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-film-short-film-thq-feature1-title-elm {
            text-align: center;
          }
          .work-film-short-film-thq-feature2-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-short-film-thq-content-elm4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-film-short-film-thq-feature3-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-short-film-thq-content-elm5 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-film-short-film-text1 {
            display: inline-block;
          }
          .work-film-short-film-text2 {
            display: inline-block;
          }
          .work-film-short-film-text3 {
            display: inline-block;
          }
          .work-film-short-film-text4 {
            display: inline-block;
          }
          .work-film-short-film-text5 {
            display: inline-block;
          }
          .work-film-short-film-text6 {
            display: inline-block;
          }
          .work-film-short-film-text7 {
            display: inline-block;
          }
          .work-film-short-film-text8 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-film-short-film-thq-section-title-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .work-film-short-film-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .work-film-short-film-thq-section-title-elm {
              width: auto;
            }
            .work-film-short-film-thq-text-elm1 {
              text-align: center;
            }
            .work-film-short-film-thq-row-elm {
              flex-direction: column;
            }
            .work-film-short-film-thq-feature2-elm {
              width: auto;
            }
            .work-film-short-film-thq-feature3-elm {
              width: auto;
            }
          }
        `}
      </style>
    </>
  )
}

WorkFilmShortFilm.defaultProps = {
  feature1ImageAlt: 'Film Production Image',
  feature1Description: undefined,
  feature1ImageSrc: '/BTS/1102635_555509404509298_479568048_o-1400w.jpg',
  heading1: undefined,
  content1: undefined,
  feature3ImageSrc:
    '/BTS/11260448_962355320491369_8491050869243749466_o-1400w.jpg',
  feature2Title: undefined,
  feature2ImageSrc: '/BTS/1102674_555509917842580_1345062633_o-1400w.jpg',
  feature2Description: undefined,
  feature3Description: undefined,
  feature2ImageAlt: 'Audio Production Image',
  feature3Title: undefined,
  feature1Title: undefined,
  feature3ImageAlt: 'Animation Image',
}

WorkFilmShortFilm.propTypes = {
  feature1ImageAlt: PropTypes.string,
  feature1Description: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature2Title: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature2Description: PropTypes.element,
  feature3Description: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature3Title: PropTypes.element,
  feature1Title: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
}

export default WorkFilmShortFilm
