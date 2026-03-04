import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MembershipPhilosophy = (props) => {
  return (
    <>
      <div className="membership-philosophy-thq-layout216-elm thq-section-padding">
        <div className="membership-philosophy-thq-max-width-elm thq-section-max-width thq-flex-row">
          <div className="thq-flex-column">
            <img
              alt={props.featureImageAlt}
              src={props.featureImageSrc}
              className="thq-img-ratio-4-3 membership-philosophy-thq-image1-elm"
            />
          </div>
          <div className="membership-philosophy-thq-content-elm thq-flex-column">
            <div className="membership-philosophy-thq-section-title-elm thq-flex-column">
              <h2 className="thq-heading-2">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span className="membership-philosophy-text27">
                      THE PHILOSOPHY
                    </span>
                  </Fragment>
                )}
              </h2>
              <p className="thq-body-large">
                {props.featureDescription ?? (
                  <Fragment>
                    <span className="membership-philosophy-text22">
                      <span>Most libraries grow by volume.</span>
                      <br></br>
                      <span>This one grows by intention.</span>
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
            <div className="membership-philosophy-thq-list-elm thq-flex-row">
              <div className="membership-philosophy-thq-list-item-elm1 thq-flex-column">
                <h3 className="thq-heading-3">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span className="membership-philosophy-text11">
                        Each visual exists for a reason:
                      </span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span className="membership-philosophy-text16">
                        <span>— To hold mood</span>
                        <br></br>
                        <span>— To support narrative</span>
                        <br></br>
                        <span>— To elevate the frame</span>
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="membership-philosophy-thq-list-item-elm2 thq-flex-column">
                <h3 className="thq-heading-3">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span className="membership-philosophy-text12">
                        <span>You don’t search endlessly.</span>
                        <br></br>
                      </span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span className="membership-philosophy-text26">
                        You select with certainty.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className="membership-philosophy-thq-actions-elm thq-flex-row">
              <button className="thq-button-filled membership-philosophy-thq-button-elm1">
                <span className="thq-body-small">
                  {props.mainAction ?? (
                    <Fragment>
                      <span className="membership-philosophy-text10">
                        View Our Portfolio
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
              <button className="thq-button-outline membership-philosophy-thq-button-elm2">
                <span className="thq-body-small">
                  {props.secondaryAction ?? (
                    <Fragment>
                      <span className="membership-philosophy-text15">
                        Contact Us for a Quote
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
          .membership-philosophy-thq-layout216-elm {
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
          .membership-philosophy-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
          }
          .membership-philosophy-thq-content-elm {
            align-items: flex-start;
          }
          .membership-philosophy-thq-section-title-elm {
            align-items: flex-start;
          }
          .membership-philosophy-thq-list-elm {
            align-self: stretch;
            align-items: flex-start;
          }
          .membership-philosophy-thq-list-item-elm1 {
            align-items: flex-start;
          }
          .membership-philosophy-thq-list-item-elm2 {
            align-items: flex-start;
          }
          .membership-philosophy-thq-actions-elm {
            align-self: flex-start;
          }
          .membership-philosophy-text10 {
            display: inline-block;
          }
          .membership-philosophy-text11 {
            display: inline-block;
          }
          .membership-philosophy-text12 {
            display: inline-block;
          }
          .membership-philosophy-text15 {
            display: inline-block;
          }
          .membership-philosophy-text16 {
            display: inline-block;
          }
          .membership-philosophy-text22 {
            display: inline-block;
          }
          .membership-philosophy-text26 {
            display: inline-block;
          }
          .membership-philosophy-text27 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .membership-philosophy-thq-layout216-elm {
              width: 100%;
            }
            .membership-philosophy-thq-max-width-elm {
              flex-direction: column;
            }
            .membership-philosophy-thq-image1-elm {
              width: 100%;
            }
            .membership-philosophy-thq-content-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .membership-philosophy-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .membership-philosophy-thq-list-elm {
              flex-direction: column;
            }
            .membership-philosophy-thq-actions-elm {
              width: 100%;
              flex-wrap: wrap;
              margin-top: var(--dl-layout-space-unit);
            }
            .membership-philosophy-thq-button-elm1 {
              width: 100%;
            }
            .membership-philosophy-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

MembershipPhilosophy.defaultProps = {
  mainAction: undefined,
  feature1Title: undefined,
  feature2Title: undefined,
  featureImageAlt: 'Visual Production Services',
  secondaryAction: undefined,
  feature1Description: undefined,
  featureImageSrc:
    '/Membership/Membership Image/the%20philosopy%2002-1400w.png',
  featureDescription: undefined,
  feature2Description: undefined,
  sectionTitle: undefined,
}

MembershipPhilosophy.propTypes = {
  mainAction: PropTypes.element,
  feature1Title: PropTypes.element,
  feature2Title: PropTypes.element,
  featureImageAlt: PropTypes.string,
  secondaryAction: PropTypes.element,
  feature1Description: PropTypes.element,
  featureImageSrc: PropTypes.string,
  featureDescription: PropTypes.element,
  feature2Description: PropTypes.element,
  sectionTitle: PropTypes.element,
}

export default MembershipPhilosophy
