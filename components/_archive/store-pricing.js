import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const StorePricing = (props) => {
  return (
    <>
      <div className="store-pricing-thq-pricing10-elm thq-section-padding">
        <div className="store-pricing-thq-max-width-elm thq-section-max-width">
          <div className="store-pricing-thq-section-title-elm">
            <div className="store-pricing-thq-content-elm1">
              <h2 className="store-pricing-thq-text-elm10 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="store-pricing-text10">
                      Ways to Access the Collection
                    </span>
                  </Fragment>
                )}
              </h2>
            </div>
          </div>
          <div className="store-pricing-thq-content-elm2">
            <div className="store-pricing-thq-column-elm1 thq-card">
              <div className="store-pricing-thq-content-elm3">
                <div className="store-pricing-thq-price-elm1">
                  <h3 className="store-pricing-thq-text-elm11 thq-heading-3">
                    {props.plan1Price ?? (
                      <Fragment>
                        <span className="store-pricing-text22">
                          License Individual Images
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <p className="store-pricing-thq-text-elm12 thq-body-large">
                    {props.plan1Yearly ?? (
                      <Fragment>
                        <span className="store-pricing-text17">
                          Select and license single images for specific
                          projects, campaigns, or editorial use.
                        </span>
                      </Fragment>
                    )}
                  </p>
                </div>
                <div className="store-pricing-thq-list-elm1">
                  <div className="store-pricing-thq-list-item-elm1">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan1Feature1 ?? (
                        <Fragment>
                          <span className="store-pricing-text19">
                            Up to 2 hours of filming or photography
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="store-pricing-thq-list-item-elm2">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan1Feature2 ?? (
                        <Fragment>
                          <span className="store-pricing-text11">
                            Basic editing included
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="store-pricing-thq-list-item-elm3">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan1Feature3 ?? (
                        <Fragment>
                          <span className="store-pricing-text24">
                            Additional hours at $100/hour
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="store-pricing-thq-button-elm1 thq-button-outline">
                <span className="thq-body-small">
                  {props.plan1Action ?? (
                    <Fragment>
                      <span className="store-pricing-text21">Get Started</span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
            <div className="store-pricing-thq-column-elm2 thq-card">
              <div className="store-pricing-thq-price-elm2">
                <div className="store-pricing-thq-price-elm3">
                  <h3 className="store-pricing-thq-text-elm17 thq-heading-3">
                    {props.plan2Price ?? (
                      <Fragment>
                        <span className="store-pricing-text13">
                          Membership Access
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <p className="store-pricing-thq-text-elm18 thq-body-large">
                    {props.plan2Yearly ?? (
                      <Fragment>
                        <span className="store-pricing-text20">
                          Unlock broader access through curated membership
                          plans, offering flexible usage and ongoing additions
                          to the archive.
                        </span>
                      </Fragment>
                    )}
                  </p>
                </div>
                <div className="store-pricing-thq-list-elm2">
                  <div className="store-pricing-thq-list-item-elm4">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature1 ?? (
                        <Fragment>
                          <span className="store-pricing-text16">
                            Up to 8 hours of filming or photography
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="store-pricing-thq-list-item-elm5">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature2 ?? (
                        <Fragment>
                          <span className="store-pricing-text14">
                            Advanced editing and color grading included
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="store-pricing-thq-list-item-elm6">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature3 ?? (
                        <Fragment>
                          <span className="store-pricing-text15">
                            Custom sound design and music composition
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="store-pricing-thq-list-item-elm7">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature4 ?? (
                        <Fragment>
                          <span className="store-pricing-text12">
                            Professional animation services available
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="store-pricing-thq-list-item-elm8">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature5 ?? (
                        <Fragment>
                          <span className="store-pricing-text23">
                            Priority scheduling and dedicated support
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="store-pricing-thq-button-elm2 thq-button-filled">
                <span className="thq-body-small">
                  {props.plan2Action ?? (
                    <Fragment>
                      <span className="store-pricing-text18">Contact Us</span>
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
          .store-pricing-thq-pricing10-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .store-pricing-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .store-pricing-thq-section-title-elm {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            display: flex;
            max-width: 800px;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .store-pricing-thq-content-elm1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .store-pricing-thq-text-elm10 {
            text-align: center;
          }
          .store-pricing-thq-content-elm2 {
            gap: var(--dl-layout-space-twounits);
            width: 100%;
            display: flex;
            align-items: stretch;
            flex-shrink: 0;
          }
          .store-pricing-thq-column-elm1 {
            flex: 1;
            display: flex;
            align-items: center;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            border-radius: var(--dl-layout-radius-radius4);
            flex-direction: column;
            justify-content: space-between;
          }
          .store-pricing-thq-content-elm3 {
            gap: 32px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .store-pricing-thq-price-elm1 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .store-pricing-thq-text-elm11 {
            font-size: 48px;
            text-align: center;
          }
          .store-pricing-thq-text-elm12 {
            text-align: center;
          }
          .store-pricing-thq-list-elm1 {
            gap: var(--dl-layout-space-unit);
            display: none;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .store-pricing-thq-list-item-elm1 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .store-pricing-thq-list-item-elm2 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .store-pricing-thq-list-item-elm3 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .store-pricing-thq-button-elm1 {
            width: 100%;
          }
          .store-pricing-thq-column-elm2 {
            flex: 1;
            width: auto;
            display: flex;
            flex-grow: 1;
            align-items: center;
            flex-shrink: 0;
            border-color: var(--dl-color-theme-neutral-dark);
            border-style: solid;
            border-width: 1px;
            border-radius: var(--dl-layout-radius-radius4);
            flex-direction: column;
            background-color: var(--dl-color-theme-accent1);
          }
          .store-pricing-thq-price-elm2 {
            gap: 32px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .store-pricing-thq-price-elm3 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .store-pricing-thq-text-elm17 {
            font-size: 48px;
            text-align: center;
          }
          .store-pricing-thq-text-elm18 {
            text-align: center;
          }
          .store-pricing-thq-list-elm2 {
            gap: var(--dl-layout-space-unit);
            display: none;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .store-pricing-thq-list-item-elm4 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .store-pricing-thq-list-item-elm5 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .store-pricing-thq-list-item-elm6 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .store-pricing-thq-list-item-elm7 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .store-pricing-thq-list-item-elm8 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .store-pricing-thq-button-elm2 {
            width: 100%;
          }
          .store-pricing-text10 {
            display: inline-block;
          }
          .store-pricing-text11 {
            display: inline-block;
          }
          .store-pricing-text12 {
            display: inline-block;
          }
          .store-pricing-text13 {
            display: inline-block;
          }
          .store-pricing-text14 {
            display: inline-block;
          }
          .store-pricing-text15 {
            display: inline-block;
          }
          .store-pricing-text16 {
            display: inline-block;
          }
          .store-pricing-text17 {
            display: inline-block;
          }
          .store-pricing-text18 {
            display: inline-block;
          }
          .store-pricing-text19 {
            display: inline-block;
          }
          .store-pricing-text20 {
            display: inline-block;
          }
          .store-pricing-text21 {
            display: inline-block;
          }
          .store-pricing-text22 {
            display: inline-block;
          }
          .store-pricing-text23 {
            display: inline-block;
          }
          .store-pricing-text24 {
            display: inline-block;
          }
          @media (max-width: 767px) {
            .store-pricing-thq-content-elm2 {
              flex-direction: column;
            }
            .store-pricing-thq-column-elm2 {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .store-pricing-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .store-pricing-thq-button-elm1 {
              width: 100%;
            }
            .store-pricing-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

StorePricing.defaultProps = {
  heading1: undefined,
  plan1Feature2: undefined,
  plan2Feature4: undefined,
  plan2Price: undefined,
  plan2Feature2: undefined,
  plan2Feature3: undefined,
  plan2Feature1: undefined,
  plan1Yearly: undefined,
  plan2Action: undefined,
  plan1Feature1: undefined,
  plan2Yearly: undefined,
  plan1Action: undefined,
  plan1Price: undefined,
  plan2Feature5: undefined,
  plan1Feature3: undefined,
}

StorePricing.propTypes = {
  heading1: PropTypes.element,
  plan1Feature2: PropTypes.element,
  plan2Feature4: PropTypes.element,
  plan2Price: PropTypes.element,
  plan2Feature2: PropTypes.element,
  plan2Feature3: PropTypes.element,
  plan2Feature1: PropTypes.element,
  plan1Yearly: PropTypes.element,
  plan2Action: PropTypes.element,
  plan1Feature1: PropTypes.element,
  plan2Yearly: PropTypes.element,
  plan1Action: PropTypes.element,
  plan1Price: PropTypes.element,
  plan2Feature5: PropTypes.element,
  plan1Feature3: PropTypes.element,
}

export default StorePricing
