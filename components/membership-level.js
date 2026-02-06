import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MembershipLevel = (props) => {
  return (
    <>
      <div className="membership-level-thq-layout251-elm thq-section-padding">
        <div className="membership-level-thq-max-width-elm thq-section-max-width">
          <div className="thq-flex-row membership-level-thq-section-title-elm">
            <div className="membership-level-thq-column-elm thq-flex-column">
              <h2 className="thq-heading-2 membership-level-thq-text-elm">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span className="membership-level-text10">
                      MEMBERSHIP LEVELS
                    </span>
                  </Fragment>
                )}
              </h2>
            </div>
          </div>
          <div className="membership-level-thq-content-elm1">
            <div className="membership-level-thq-row-elm thq-flex-row">
              <div className="membership-level-thq-feature1-elm thq-flex-column">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3 membership-level-thq-feature1-image-elm"
                />
                <div className="membership-level-thq-content-elm2 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="membership-level-text31">
                          ESSENTIAL
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="membership-level-text24">
                          <span>A foundation for refined visual language.</span>
                          <br></br>
                          <span>
                            Access to a rotating selection of cinematic
                            photography and atmospheric imagery, professionally
                            graded and prepared for serious creative use.
                          </span>
                          <br></br>
                          <span>
                            Designed for individual creators and small studios
                            shaping their visual identity.
                          </span>
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="membership-level-thq-feature2-elm thq-flex-column">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3 membership-level-thq-feature2-image-elm"
                />
                <div className="membership-level-thq-content-elm3 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="membership-level-text11">
                          SIGNATURE
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="membership-level-text18">
                          <span>Expanded access for elevated work.</span>
                          <br></br>
                          <span>
                            Includes the complete Essential library, alongside
                            broader cinematic environments, priority access to
                            new releases, and extended commercial usage.
                          </span>
                          <br></br>
                          <span>
                            Created for studios and brands producing work at
                            scale — without compromise.
                          </span>
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="membership-level-thq-feature3-elm thq-flex-column">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3 membership-level-thq-feature3-image-elm"
                />
                <div className="membership-level-thq-content-elm4 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="membership-level-text30">
                          PRIVATE ACCESS
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="membership-level-text12">
                          <span>Invitation-based.</span>
                          <br></br>
                          <span>
                            Full access to the Signature library, plus exclusive
                            collections reserved for private members. Early
                            releases, limited visuals, and priority
                            consideration for direct collaboration.
                          </span>
                          <br></br>
                          <span>Membership is intentionally limited.</span>
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
          .membership-level-thq-layout251-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-level-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-level-thq-column-elm {
            gap: var(--dl-layout-space-halfunit);
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-level-thq-content-elm1 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-level-thq-row-elm {
            align-items: flex-start;
          }
          .membership-level-thq-feature1-elm {
            flex: 1;
          }
          .membership-level-thq-content-elm2 {
            align-self: stretch;
            align-items: flex-start;
          }
          .membership-level-thq-feature2-elm {
            flex: 1;
          }
          .membership-level-thq-content-elm3 {
            align-self: stretch;
            align-items: flex-start;
          }
          .membership-level-thq-feature3-elm {
            flex: 1;
          }
          .membership-level-thq-content-elm4 {
            align-self: stretch;
            align-items: flex-start;
          }
          .membership-level-text10 {
            display: inline-block;
          }
          .membership-level-text11 {
            display: inline-block;
          }
          .membership-level-text12 {
            display: inline-block;
          }
          .membership-level-text18 {
            display: inline-block;
          }
          .membership-level-text24 {
            display: inline-block;
          }
          .membership-level-text30 {
            display: inline-block;
          }
          .membership-level-text31 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .membership-level-thq-section-title-elm {
              align-items: flex-start;
              flex-direction: column;
            }
            .membership-level-thq-feature1-image-elm {
              height: 260px;
            }
            .membership-level-thq-feature2-image-elm {
              height: 260px;
            }
            .membership-level-thq-feature3-image-elm {
              height: 260px;
            }
          }
          @media (max-width: 767px) {
            .membership-level-thq-column-elm {
              width: 100%;
            }
            .membership-level-thq-text-elm {
              text-align: center;
            }
            .membership-level-thq-row-elm {
              flex-direction: column;
            }
            .membership-level-thq-feature1-image-elm {
              width: 100%;
            }
            .membership-level-thq-feature2-elm {
              width: auto;
            }
            .membership-level-thq-feature2-image-elm {
              width: 100%;
            }
            .membership-level-thq-feature3-elm {
              width: auto;
            }
          }
        `}
      </style>
    </>
  )
}

MembershipLevel.defaultProps = {
  feature2ImageSrc: '/Membership/Membership Image/signature-300h.jpg',
  feature1ImageSrc: '/Membership/Membership Image/esensional-1400w.png',
  sectionTitle: undefined,
  feature3ImageAlt: 'Creative Animation Image',
  feature2Title: undefined,
  feature3Description: undefined,
  feature2Description: undefined,
  feature1Description: undefined,
  feature3Title: undefined,
  feature1ImageAlt: 'Cinematic Storytelling Image',
  feature2ImageAlt: 'Audio Excellence Image',
  feature3ImageSrc: '/Membership/Membership Image/private%2002-300h.jpg',
  feature1Title: undefined,
}

MembershipLevel.propTypes = {
  feature2ImageSrc: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  sectionTitle: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature2Title: PropTypes.element,
  feature3Description: PropTypes.element,
  feature2Description: PropTypes.element,
  feature1Description: PropTypes.element,
  feature3Title: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature1Title: PropTypes.element,
}

export default MembershipLevel
