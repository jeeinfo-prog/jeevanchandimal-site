import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkPhotographyEditorial = (props) => {
  return (
    <>
      <div className="work-photography-editorial-thq-layout216-elm thq-section-padding">
        <div className="work-photography-editorial-thq-max-width-elm thq-section-max-width thq-flex-row">
          <div className="thq-flex-column">
            <img
              alt={props.featureImageAlt}
              src={props.featureImageSrc}
              className="thq-img-ratio-4-3 work-photography-editorial-thq-image1-elm"
            />
          </div>
          <div className="thq-flex-column work-photography-editorial-thq-content-elm">
            <div className="work-photography-editorial-thq-section-title-elm thq-flex-column">
              <span className="thq-body-small">
                {props.slogan ?? (
                  <Fragment>
                    <span className="work-photography-editorial-text3">
                      Explore our key features
                    </span>
                  </Fragment>
                )}
              </span>
              <h2 className="thq-heading-2">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span className="work-photography-editorial-text7">
                      Editorial
                    </span>
                  </Fragment>
                )}
              </h2>
              <p className="thq-body-large">
                {props.featureDescription ?? (
                  <Fragment>
                    <span className="work-photography-editorial-text5">
                      Photography created for narrative and contextual use —
                      images that support stories, publications, and visual
                      essays. The focus remains on authenticity, environment,
                      and visual coherence.
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
            <div className="work-photography-editorial-thq-list-elm thq-flex-row">
              <div className="work-photography-editorial-thq-list-item-elm1 thq-flex-column">
                <h3 className="thq-heading-3">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span className="work-photography-editorial-text8">
                        Customized Solutions
                      </span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span className="work-photography-editorial-text2">
                        Tailored services to meet your specific needs
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="work-photography-editorial-thq-list-item-elm2 thq-flex-column">
                <h3 className="thq-heading-3">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span className="work-photography-editorial-text1">
                        Powerful Tools
                      </span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span className="work-photography-editorial-text9">
                        Intuitive design, analytics tools, AI &amp; animations
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className="work-photography-editorial-thq-actions-elm thq-flex-row">
              <button className="thq-button-filled work-photography-editorial-thq-button-elm1">
                <span className="thq-body-small">
                  {props.mainAction ?? (
                    <Fragment>
                      <span className="work-photography-editorial-text6">
                        Learn More
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
              <button className="thq-button-outline work-photography-editorial-thq-button-elm2">
                <span className="thq-body-small">
                  {props.secondaryAction ?? (
                    <Fragment>
                      <span className="work-photography-editorial-text4">
                        Get Started
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-photography-editorial-thq-layout216-elm {
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
          .work-photography-editorial-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
          }
          .work-photography-editorial-thq-section-title-elm {
            align-items: flex-start;
          }
          .work-photography-editorial-thq-list-elm {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-photography-editorial-thq-list-item-elm1 {
            align-items: flex-start;
          }
          .work-photography-editorial-thq-list-item-elm2 {
            align-items: flex-start;
          }
          .work-photography-editorial-thq-actions-elm {
            align-self: flex-start;
          }
          .work-photography-editorial-text1 {
            display: inline-block;
          }
          .work-photography-editorial-text2 {
            display: inline-block;
          }
          .work-photography-editorial-text3 {
            display: inline-block;
          }
          .work-photography-editorial-text4 {
            display: inline-block;
          }
          .work-photography-editorial-text5 {
            display: inline-block;
          }
          .work-photography-editorial-text6 {
            display: inline-block;
          }
          .work-photography-editorial-text7 {
            display: inline-block;
          }
          .work-photography-editorial-text8 {
            display: inline-block;
          }
          .work-photography-editorial-text9 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .work-photography-editorial-thq-layout216-elm {
              width: 100%;
            }
            .work-photography-editorial-thq-max-width-elm {
              flex-direction: column;
            }
            .work-photography-editorial-thq-image1-elm {
              width: 100%;
            }
            .work-photography-editorial-thq-content-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .work-photography-editorial-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .work-photography-editorial-thq-list-elm {
              flex-direction: column;
            }
            .work-photography-editorial-thq-actions-elm {
              width: 100%;
              flex-wrap: wrap;
              margin-top: var(--dl-layout-space-unit);
            }
            .work-photography-editorial-thq-button-elm1 {
              width: 100%;
            }
            .work-photography-editorial-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

WorkPhotographyEditorial.defaultProps = {
  feature2Title: undefined,
  feature1Description: undefined,
  featureImageSrc: '/Photography/3x2/_jee26873_3x2_2000x1333_u_100-1400w.png',
  slogan: undefined,
  secondaryAction: undefined,
  featureDescription: undefined,
  mainAction: undefined,
  featureImageAlt: 'Customized Solutions Image',
  sectionTitle: undefined,
  feature1Title: undefined,
  feature2Description: undefined,
}

WorkPhotographyEditorial.propTypes = {
  feature2Title: PropTypes.element,
  feature1Description: PropTypes.element,
  featureImageSrc: PropTypes.string,
  slogan: PropTypes.element,
  secondaryAction: PropTypes.element,
  featureDescription: PropTypes.element,
  mainAction: PropTypes.element,
  featureImageAlt: PropTypes.string,
  sectionTitle: PropTypes.element,
  feature1Title: PropTypes.element,
  feature2Description: PropTypes.element,
}

export default WorkPhotographyEditorial
