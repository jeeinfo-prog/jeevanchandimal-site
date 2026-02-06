import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkFilmDocumentries = (props) => {
  return (
    <>
      <div className="work-film-documentries-thq-layout300-elm thq-section-padding">
        <div className="work-film-documentries-thq-max-width-elm thq-section-max-width">
          <div className="work-film-documentries-thq-section-title-elm">
            <div className="work-film-documentries-thq-content-elm1">
              <h2 className="work-film-documentries-thq-text-elm1 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="work-film-documentries-text12">
                      Documentary
                    </span>
                  </Fragment>
                )}
              </h2>
              <span className="work-film-documentries-thq-text-elm2 thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="work-film-documentries-text16">
                      <span>
                        Observational and story-driven documentary work rooted
                        in authenticity. These films prioritize real moments,
                        human presence, and environmental context, allowing
                        stories to unfold without forced direction.
                      </span>
                      <br></br>
                      <span>
                        The emphasis is on patience, trust, and visual honesty.
                      </span>
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="work-film-documentries-thq-content-elm2">
            <div className="work-film-documentries-thq-row-elm thq-flex-row">
              <div className="work-film-documentries-thq-feature1-elm">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-film-documentries-thq-content-elm3">
                  <h3 className="work-film-documentries-thq-feature1-title-elm thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="work-film-documentries-text10">
                          Film Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="work-film-documentries-text13">
                          Professional film production services tailored to your
                          needs.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-film-documentries-thq-feature2-elm">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-film-documentries-thq-content-elm4">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="work-film-documentries-text11">
                          Audio Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="work-film-documentries-text15">
                          High-quality audio production services for a
                          captivating sound experience.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-film-documentries-thq-feature3-elm">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3"
                />
                <div className="work-film-documentries-thq-content-elm5">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="work-film-documentries-text14">
                          Animation &amp; Graphics
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="work-film-documentries-text20">
                          Creative animation and graphics services to bring your
                          ideas to life.
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
          .work-film-documentries-thq-layout300-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-documentries-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .work-film-documentries-thq-section-title-elm {
            gap: 16px;
            width: 100%;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-documentries-thq-content-elm1 {
            gap: 24px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .work-film-documentries-thq-text-elm1 {
            text-align: center;
          }
          .work-film-documentries-thq-text-elm2 {
            text-align: center;
          }
          .work-film-documentries-thq-content-elm2 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .work-film-documentries-thq-row-elm {
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
            justify-content: center;
          }
          .work-film-documentries-thq-feature1-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-documentries-thq-content-elm3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-film-documentries-thq-feature1-title-elm {
            text-align: center;
          }
          .work-film-documentries-thq-feature2-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-documentries-thq-content-elm4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-film-documentries-thq-feature3-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-film-documentries-thq-content-elm5 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-film-documentries-text10 {
            display: inline-block;
          }
          .work-film-documentries-text11 {
            display: inline-block;
          }
          .work-film-documentries-text12 {
            display: inline-block;
          }
          .work-film-documentries-text13 {
            display: inline-block;
          }
          .work-film-documentries-text14 {
            display: inline-block;
          }
          .work-film-documentries-text15 {
            display: inline-block;
          }
          .work-film-documentries-text16 {
            display: inline-block;
          }
          .work-film-documentries-text20 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-film-documentries-thq-section-title-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .work-film-documentries-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .work-film-documentries-thq-section-title-elm {
              width: auto;
            }
            .work-film-documentries-thq-text-elm1 {
              text-align: center;
            }
            .work-film-documentries-thq-row-elm {
              flex-direction: column;
            }
            .work-film-documentries-thq-feature2-elm {
              width: auto;
            }
            .work-film-documentries-thq-feature3-elm {
              width: auto;
            }
          }
        `}
      </style>
    </>
  )
}

WorkFilmDocumentries.defaultProps = {
  feature3ImageAlt: 'Animation & Graphics Image',
  feature1Title: undefined,
  feature2Title: undefined,
  feature1ImageAlt: 'Film Production Image',
  heading1: undefined,
  feature1Description: undefined,
  feature3Title: undefined,
  feature1ImageSrc: '/BTS/1147522_555510027842569_150843797_o-1400w.jpg',
  feature2Description: undefined,
  feature2ImageAlt: 'Audio Production Image',
  content1: undefined,
  feature3Description: undefined,
  feature3ImageSrc: '/BTS/jeeva%20chandimal%20-%2006-1400w.jpg',
  feature2ImageSrc: '/BTS/1167595_555509554509283_1206522710_o-1400w.jpg',
}

WorkFilmDocumentries.propTypes = {
  feature3ImageAlt: PropTypes.string,
  feature1Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  heading1: PropTypes.element,
  feature1Description: PropTypes.element,
  feature3Title: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature2Description: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  content1: PropTypes.element,
  feature3Description: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
}

export default WorkFilmDocumentries
