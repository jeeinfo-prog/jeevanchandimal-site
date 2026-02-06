import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Availability = (props) => {
  return (
    <>
      <div className="thq-section-padding">
        <div className="thq-section-max-width">
          <div className="availability-thq-container-elm">
            <div className="availability-thq-content-elm">
              <span className="thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="availability-text17">Availability</span>
                  </Fragment>
                )}
              </span>
              <span className="thq-heading-3">
                {props.heading11 ?? (
                  <Fragment>
                    <span className="availability-text15">
                      Available for select projects.
                    </span>
                  </Fragment>
                )}
              </span>
              <p className="thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="availability-text19">
                      If you’d like to collaborate or discuss an idea, feel free
                      to reach out.
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
            <div className="availability-thq-actions-elm">
              <button type="button" className="thq-button-filled">
                <span>
                  {props.action1 ?? (
                    <Fragment>
                      <span className="availability-text16">Get in Touch</span>
                    </Fragment>
                  )}
                </span>
              </button>
              <button type="button" className="thq-button-outline">
                <span>
                  {props.action2 ?? (
                    <Fragment>
                      <span className="availability-text18">Contact Me</span>
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
          .availability-thq-container-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: center;
            justify-content: space-between;
          }
          .availability-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .availability-thq-actions-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .availability-text15 {
            display: inline-block;
          }
          .availability-text16 {
            display: inline-block;
          }
          .availability-text17 {
            display: inline-block;
          }
          .availability-text18 {
            display: inline-block;
          }
          .availability-text19 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .availability-thq-container-elm {
              align-items: flex-start;
              flex-direction: column;
              justify-content: flex-end;
            }
          }
        `}
      </style>
    </>
  )
}

Availability.defaultProps = {
  heading11: undefined,
  action1: undefined,
  heading1: undefined,
  action2: undefined,
  content1: undefined,
}

Availability.propTypes = {
  heading11: PropTypes.element,
  action1: PropTypes.element,
  heading1: PropTypes.element,
  action2: PropTypes.element,
  content1: PropTypes.element,
}

export default Availability
