import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MembershipCreator = (props) => {
  return (
    <>
      <div className="membership-creator-thq-layout251-elm thq-section-padding">
        <div className="membership-creator-thq-max-width-elm thq-section-max-width">
          <div className="thq-flex-row membership-creator-thq-section-title-elm1">
            <div className="membership-creator-thq-column-elm thq-flex-column">
              <h2 className="thq-heading-2 membership-creator-thq-text-elm1">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span className="membership-creator-text3">
                      INTENDED FOR
                    </span>
                  </Fragment>
                )}
              </h2>
            </div>
            <span className="thq-body-small">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="membership-creator-text4">
                    Creators, studios, and brands who value:
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="membership-creator-thq-content-elm1">
            <div className="membership-creator-thq-row-elm thq-flex-row">
              <div className="membership-creator-thq-feature1-elm thq-flex-column">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3 membership-creator-thq-feature1-image-elm"
                />
                <div className="membership-creator-thq-content-elm2 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="membership-creator-text5">
                          Restraint over excess
                        </span>
                      </Fragment>
                    )}
                  </h3>
                </div>
              </div>
              <div className="membership-creator-thq-feature2-elm thq-flex-column">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3 membership-creator-thq-feature2-image-elm"
                />
                <div className="membership-creator-thq-content-elm3 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="membership-creator-text6">
                          Timelessness over trends
                        </span>
                      </Fragment>
                    )}
                  </h3>
                </div>
              </div>
              <div className="membership-creator-thq-feature3-elm thq-flex-column">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3 membership-creator-thq-feature3-image-elm"
                />
                <div className="membership-creator-thq-content-elm4 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="membership-creator-text2">
                          Craft over convenience
                        </span>
                      </Fragment>
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="thq-flex-row membership-creator-thq-section-title-elm2">
            <span className="thq-body-small">
              {props.sectionDescription1 ?? (
                <Fragment>
                  <span className="membership-creator-text1">
                    If you recognize this tone, you belong here.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .membership-creator-thq-layout251-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-creator-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-creator-thq-column-elm {
            gap: var(--dl-layout-space-halfunit);
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-creator-thq-content-elm1 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-creator-thq-row-elm {
            align-items: flex-start;
          }
          .membership-creator-thq-feature1-elm {
            flex: 1;
          }
          .membership-creator-thq-content-elm2 {
            align-self: stretch;
            align-items: flex-start;
          }
          .membership-creator-thq-feature2-elm {
            flex: 1;
          }
          .membership-creator-thq-content-elm3 {
            align-self: stretch;
            align-items: flex-start;
          }
          .membership-creator-thq-feature3-elm {
            flex: 1;
          }
          .membership-creator-thq-content-elm4 {
            align-self: stretch;
            align-items: flex-start;
          }
          .membership-creator-text1 {
            display: inline-block;
          }
          .membership-creator-text2 {
            display: inline-block;
          }
          .membership-creator-text3 {
            display: inline-block;
          }
          .membership-creator-text4 {
            display: inline-block;
          }
          .membership-creator-text5 {
            display: inline-block;
          }
          .membership-creator-text6 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .membership-creator-thq-section-title-elm1 {
              align-items: flex-start;
              flex-direction: column;
            }
            .membership-creator-thq-feature1-image-elm {
              height: 260px;
            }
            .membership-creator-thq-feature2-image-elm {
              height: 260px;
            }
            .membership-creator-thq-feature3-image-elm {
              height: 260px;
            }
            .membership-creator-thq-section-title-elm2 {
              align-items: flex-start;
              flex-direction: column;
            }
          }
          @media (max-width: 767px) {
            .membership-creator-thq-column-elm {
              width: 100%;
            }
            .membership-creator-thq-text-elm1 {
              text-align: center;
            }
            .membership-creator-thq-row-elm {
              flex-direction: column;
            }
            .membership-creator-thq-feature1-image-elm {
              width: 100%;
            }
            .membership-creator-thq-feature2-elm {
              width: auto;
            }
            .membership-creator-thq-feature2-image-elm {
              width: 100%;
            }
            .membership-creator-thq-feature3-elm {
              width: auto;
            }
          }
        `}
      </style>
    </>
  )
}

MembershipCreator.defaultProps = {
  feature2ImageAlt: 'Audio Production Image',
  sectionDescription1: undefined,
  feature1ImageSrc: '/Membership/Membership Image/private-1400w.jpg',
  feature3Title: undefined,
  sectionTitle: undefined,
  feature3ImageSrc:
    '/Membership/Membership Image/the%20philosopy%2002-300h.png',
  feature2ImageSrc: '/Membership/Membership Image/signature-300h.jpg',
  feature3ImageAlt: 'Animation & Graphics Image',
  sectionDescription: undefined,
  feature1Title: undefined,
  feature2Title: undefined,
  feature1ImageAlt: 'Film Production Image',
}

MembershipCreator.propTypes = {
  feature2ImageAlt: PropTypes.string,
  sectionDescription1: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature3Title: PropTypes.element,
  sectionTitle: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  sectionDescription: PropTypes.element,
  feature1Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
}

export default MembershipCreator
