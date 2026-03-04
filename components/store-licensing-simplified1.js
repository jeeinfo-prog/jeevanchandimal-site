import React, { Fragment } from 'react'
import Link from 'next/link'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const StoreLicensingSimplified1 = (props) => {
  return (
    <>
      <div
        className={`store-licensing-simplified1-thq-layout349-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="store-licensing-simplified1-thq-max-width-elm thq-section-max-width">
          <div className="store-licensing-simplified1-thq-content-elm1">
            <div className="store-licensing-simplified1-thq-section-title-elm">
              <div className="store-licensing-simplified1-thq-content-elm2">
                <h2 className="thq-heading-2">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span className="store-licensing-simplified1-text2">
                        Licensing Simplified
                      </span>
                    </Fragment>
                  )}
                </h2>
                <p className="thq-body-large">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span className="store-licensing-simplified1-text4">
                        <span>All images are licensed, not sold.</span>
                        <br></br>
                        <span>
                          Usage depends on the selected license or membership
                          tier.
                        </span>
                        <br></br>
                        <span>
                          Reselling, redistribution, or re-uploading images is
                          not permitted.
                        </span>
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
              <div className="store-licensing-simplified1-thq-actions-elm">
                <button className="store-licensing-simplified1-thq-button-elm1 thq-button-filled">
                  <span className="thq-body-small">
                    {props.feature1Action1 ?? (
                      <Fragment>
                        <span className="store-licensing-simplified1-text3">
                          View Full License
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
                <button className="store-licensing-simplified1-thq-button-elm2 thq-button-outline">
                  <Link href="/memberships">
                    <a className="store-licensing-simplified1-link thq-body-small">
                      {props.feature1Action2 ?? (
                        <Fragment>
                          <span className="store-licensing-simplified1-text1">
                            Get Started Today
                          </span>
                        </Fragment>
                      )}
                    </a>
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="store-licensing-simplified1-thq-image-container-elm">
            <img
              alt={props.feature1ImageAlt}
              src={props.feature1ImageSrc}
              className="store-licensing-simplified1-thq-placeholder-image-elm thq-img-ratio-16-9"
            />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .store-licensing-simplified1-thq-layout349-elm {
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .store-licensing-simplified1-thq-max-width-elm {
            gap: var(--dl-layout-space-fiveunits);
            display: flex;
            align-items: center;
          }
          .store-licensing-simplified1-thq-content-elm1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .store-licensing-simplified1-thq-section-title-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .store-licensing-simplified1-thq-content-elm2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .store-licensing-simplified1-thq-actions-elm {
            gap: var(--dl-layout-space-unit);
            display: flex;
          }
          .store-licensing-simplified1-thq-button-elm1 {
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-oneandhalfunits);
            padding-right: var(--dl-layout-space-oneandhalfunits);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .store-licensing-simplified1-thq-button-elm2 {
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-oneandhalfunits);
            padding-right: var(--dl-layout-space-oneandhalfunits);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .store-licensing-simplified1-link {
            text-decoration: none;
          }
          .store-licensing-simplified1-thq-image-container-elm {
            flex: 1;
            display: flex;
            align-items: center;
          }
          .store-licensing-simplified1-thq-placeholder-image-elm {
            border-radius: var(--dl-layout-radius-radius4);
          }
          .store-licensing-simplified1-text1 {
            display: inline-block;
          }
          .store-licensing-simplified1-text2 {
            display: inline-block;
          }
          .store-licensing-simplified1-text3 {
            display: inline-block;
          }
          .store-licensing-simplified1-text4 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .store-licensing-simplified1-thq-max-width-elm {
              gap: var(--dl-layout-space-twounits);
              flex-direction: column-reverse;
            }
          }
          @media (max-width: 479px) {
            .store-licensing-simplified1-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .store-licensing-simplified1-thq-button-elm1 {
              width: 100%;
            }
            .store-licensing-simplified1-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

StoreLicensingSimplified1.defaultProps = {
  feature1Action2: undefined,
  feature1ImageSrc: '/Photography/3x2/_jee26873_3x2_2000x1333_u_100-1400w.png',
  feature1ImageAlt: 'Customized Visual Production Services',
  feature1Title: undefined,
  feature1Action1: undefined,
  rootClassName: '',
  feature1Description: undefined,
}

StoreLicensingSimplified1.propTypes = {
  feature1Action2: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature1Title: PropTypes.element,
  feature1Action1: PropTypes.element,
  rootClassName: PropTypes.string,
  feature1Description: PropTypes.element,
}

export default StoreLicensingSimplified1
