import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MembershipCTA = (props) => {
  return (
    <>
      <div className="membership-cta-container thq-section-padding">
        <div className="membership-cta-thq-max-width-elm thq-section-max-width">
          <div className="membership-cta-thq-container-elm thq-flex-row">
            <h2 className="thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="membership-cta-text9">
                    Create with restraint.
                  </span>
                </Fragment>
              )}
            </h2>
            <div className="membership-cta-thq-content-elm">
              <p className="thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="membership-cta-text6">
                      <span>Build with intention.</span>
                      <br></br>
                    </span>
                  </Fragment>
                )}
              </p>
              <div className="membership-cta-thq-actions-elm">
                <button type="button" className="thq-button-filled">
                  <span>
                    {props.action1 ?? (
                      <Fragment>
                        <span className="membership-cta-text4">
                          Join Membership
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
                <button type="button" className="thq-button-outline">
                  <span>
                    {props.action2 ?? (
                      <Fragment>
                        <span className="membership-cta-text5">View Plans</span>
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
          .membership-cta-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-cta-thq-max-width-elm {
            gap: 80px;
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            max-width: var(--dl-layout-size-maxwidth);
            align-self: center;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-cta-thq-container-elm {
            gap: var(--dl-layout-space-fiveunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .membership-cta-thq-content-elm {
            gap: var(--dl-layout-space-unit);
            width: 616px;
            display: flex;
            flex-grow: 1;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-cta-thq-actions-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-items: flex-start;
          }
          .membership-cta-text4 {
            display: inline-block;
          }
          .membership-cta-text5 {
            display: inline-block;
          }
          .membership-cta-text6 {
            display: inline-block;
          }
          .membership-cta-text9 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .membership-cta-thq-container-elm {
              gap: var(--dl-layout-space-twounits);
              flex-direction: column;
            }
          }
          @media (max-width: 767px) {
            .membership-cta-thq-max-width-elm {
              background-color: transparent;
            }
            .membership-cta-thq-content-elm {
              width: auto;
            }
          }
          @media (max-width: 479px) {
            .membership-cta-thq-container-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

MembershipCTA.defaultProps = {
  action1: undefined,
  action2: undefined,
  content1: undefined,
  heading1: undefined,
}

MembershipCTA.propTypes = {
  action1: PropTypes.element,
  action2: PropTypes.element,
  content1: PropTypes.element,
  heading1: PropTypes.element,
}

export default MembershipCTA
