import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkFilmProduction = (props) => {
  return (
    <>
      <div className="work-film-production-thq-layout226-elm thq-section-padding">
        <div className="work-film-production-thq-max-width-elm thq-section-max-width">
          <div className="thq-flex-column">
            <img
              alt={props.feature1ImageAlt}
              src={props.feature1ImageSrc}
              className="thq-img-ratio-4-3"
            />
            <div className="thq-flex-column">
              <span className="work-film-production-thq-over-title1-elm thq-body-small">
                {props.feature1Slogan ?? (
                  <Fragment>
                    <span className="work-film-production-text13">
                      Tailored to Your Needs
                    </span>
                  </Fragment>
                )}
              </span>
              <div className="thq-flex-column work-film-production-thq-content-elm1">
                <h3 className="work-film-production-thq-title1-elm thq-heading-3">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span className="work-film-production-text14">
                        Customized Solutions
                      </span>
                    </Fragment>
                  )}
                </h3>
                <span className="work-film-production-thq-description1-elm thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span className="work-film-production-text11">
                        We offer customized solutions for film, audio,
                        animation, and photography services to meet your
                        specific requirements.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="thq-flex-row work-film-production-thq-actions-elm1">
                <button className="thq-button-filled work-film-production-thq-button-elm1">
                  <span className="work-film-production-thq-action1-elm1 thq-body-small">
                    {props.feature1MainAction ?? (
                      <Fragment>
                        <span className="work-film-production-text17">
                          Explore Services
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
                <button className="thq-button-outline work-film-production-thq-button-elm2">
                  <span className="work-film-production-thq-action2-elm1 thq-body-small">
                    {props.feature1SecondaryAction ?? (
                      <Fragment>
                        <span className="work-film-production-text16">
                          Secondary action
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="thq-flex-column">
            <img
              alt={props.feature2ImageAlt}
              src={props.feature2ImageSrc}
              className="thq-img-ratio-4-3"
            />
            <div className="thq-flex-column">
              <span className="work-film-production-thq-over-title2-elm thq-body-small">
                {props.feature2Slogan ?? (
                  <Fragment>
                    <span className="work-film-production-text18">
                      Experts in Every Field
                    </span>
                  </Fragment>
                )}
              </span>
              <div className="thq-flex-column">
                <h3 className="work-film-production-thq-title2-elm thq-heading-3">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span className="work-film-production-text19">
                        Experienced Professionals
                      </span>
                    </Fragment>
                  )}
                </h3>
                <span className="work-film-production-thq-description2-elm thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span className="work-film-production-text10">
                        Our team consists of experienced professionals in film
                        production, audio production, animation &amp; graphics,
                        and photography, ensuring high-quality results.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="thq-flex-row work-film-production-thq-actions-elm2">
                <button className="thq-button-filled work-film-production-thq-button-elm3">
                  <span className="work-film-production-thq-action1-elm2 thq-body-small">
                    {props.feature2MainAction ?? (
                      <Fragment>
                        <span className="work-film-production-text12">
                          Meet Our Team
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
                <button className="thq-button-outline work-film-production-thq-button-elm4">
                  <span className="work-film-production-thq-action2-elm2 thq-body-small">
                    {props.feature2Action2 ?? (
                      <Fragment>
                        <span className="work-film-production-text15">
                          Secondary action
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-film-production-thq-layout226-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: row;
            justify-content: center;
          }
          .work-film-production-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-direction: row;
          }
          .work-film-production-thq-over-title1-elm {
            height: auto;
            font-size: 16px;
            font-style: normal;
            text-align: center;
            font-family: Roboto;
            font-weight: 600px;
            line-height: 150%;
            font-stretch: normal;
          }
          .work-film-production-thq-title1-elm {
            text-align: center;
          }
          .work-film-production-thq-description1-elm {
            text-align: center;
          }
          .work-film-production-thq-action1-elm1 {
            text-align: center;
          }
          .work-film-production-thq-action2-elm1 {
            text-align: center;
          }
          .work-film-production-thq-over-title2-elm {
            font-size: 16px;
            font-style: normal;
            text-align: center;
            font-family: Roboto;
            line-height: 150%;
            font-stretch: normal;
          }
          .work-film-production-thq-title2-elm {
            text-align: center;
          }
          .work-film-production-thq-description2-elm {
            text-align: center;
          }
          .work-film-production-thq-action1-elm2 {
            text-align: center;
          }
          .work-film-production-thq-action2-elm2 {
            text-align: center;
          }
          .work-film-production-text10 {
            display: inline-block;
          }
          .work-film-production-text11 {
            display: inline-block;
          }
          .work-film-production-text12 {
            display: inline-block;
          }
          .work-film-production-text13 {
            display: inline-block;
          }
          .work-film-production-text14 {
            display: inline-block;
          }
          .work-film-production-text15 {
            display: inline-block;
          }
          .work-film-production-text16 {
            display: inline-block;
          }
          .work-film-production-text17 {
            display: inline-block;
          }
          .work-film-production-text18 {
            display: inline-block;
          }
          .work-film-production-text19 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-film-production-thq-layout226-elm {
              flex-direction: column;
            }
            .work-film-production-thq-max-width-elm {
              flex-direction: column;
            }
            .work-film-production-thq-content-elm1 {
              align-items: center;
            }
          }
          @media (max-width: 767px) {
            .work-film-production-thq-actions-elm1 {
              flex-wrap: wrap;
            }
            .work-film-production-thq-actions-elm2 {
              flex-wrap: wrap;
            }
          }
          @media (max-width: 479px) {
            .work-film-production-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .work-film-production-thq-button-elm1 {
              width: 100%;
            }
            .work-film-production-thq-button-elm2 {
              width: 100%;
            }
            .work-film-production-thq-button-elm3 {
              width: 100%;
            }
            .work-film-production-thq-button-elm4 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

WorkFilmProduction.defaultProps = {
  feature2Description: undefined,
  feature2ImageAlt: 'Experienced Professionals Image',
  feature1Description: undefined,
  feature2ImageSrc:
    '/BTS/16797595_1374407882619442_6509026956266989204_o-1400w.jpg',
  feature2MainAction: undefined,
  feature1Slogan: undefined,
  feature1Title: undefined,
  feature2Action2: undefined,
  feature1SecondaryAction: undefined,
  feature1MainAction: undefined,
  feature1ImageSrc: '/BTS/1167585_555509951175910_1131034166_o-1400w.jpg',
  feature2Slogan: undefined,
  feature2Title: undefined,
  feature1ImageAlt: 'Customized Solutions Image',
}

WorkFilmProduction.propTypes = {
  feature2Description: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature1Description: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature2MainAction: PropTypes.element,
  feature1Slogan: PropTypes.element,
  feature1Title: PropTypes.element,
  feature2Action2: PropTypes.element,
  feature1SecondaryAction: PropTypes.element,
  feature1MainAction: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature2Slogan: PropTypes.element,
  feature2Title: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
}

export default WorkFilmProduction
