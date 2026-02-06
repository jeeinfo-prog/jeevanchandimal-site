import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const HowItWorks = (props) => {
  return (
    <>
      <div className="how-it-works-container thq-section-padding">
        <div className="how-it-works-thq-max-width-elm thq-section-max-width">
          <div className="how-it-works-thq-content-elm thq-flex-column">
            <ul className="how-it-works-ul thq-flex-column">
              <li className="thq-flex-column list-item">
                <h2 className="how-it-works-thq-heading1-elm thq-heading-2">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="how-it-works-text9">How It Works</span>
                    </Fragment>
                  )}
                </h2>
              </li>
              <li className="list-item">
                <h3 className="thq-heading-3">
                  {props.heading2 ?? (
                    <Fragment>
                      <span className="how-it-works-text2">
                        Choose Your Membership
                      </span>
                    </Fragment>
                  )}
                </h3>
                <p className="thq-body-small">
                  {props.content2 ?? (
                    <Fragment>
                      <span className="how-it-works-text1">
                        Select the plan that fits your creative needs and level
                        of usage.
                      </span>
                    </Fragment>
                  )}
                </p>
              </li>
              <li className="list-item">
                <h3 className="thq-heading-3">
                  {props.heading3 ?? (
                    <Fragment>
                      <span className="how-it-works-text6">
                        Get Instant Access
                      </span>
                    </Fragment>
                  )}
                </h3>
                <p className="thq-body-small">
                  {props.content3 ?? (
                    <Fragment>
                      <span className="how-it-works-text7">
                        Your account opens immediately, unlocking the full image
                        library included in your plan.
                      </span>
                    </Fragment>
                  )}
                </p>
              </li>
              <li className="list-item">
                <h3 className="thq-heading-3">
                  {props.heading4 ?? (
                    <Fragment>
                      <span className="how-it-works-text3">
                        Download What Inspires You
                      </span>
                    </Fragment>
                  )}
                </h3>
                <p className="thq-body-small">
                  {props.content4 ?? (
                    <Fragment>
                      <span className="how-it-works-text4">
                        Browse the collection and download high-resolution
                        visuals for your projects.
                      </span>
                    </Fragment>
                  )}
                </p>
              </li>
              <li className="list-item">
                <h3 className="thq-heading-3">
                  {props.heading5 ?? (
                    <Fragment>
                      <span className="how-it-works-text5">
                        Create Without Limits
                      </span>
                    </Fragment>
                  )}
                </h3>
                <p className="thq-body-small">
                  {props.content5 ?? (
                    <Fragment>
                      <span className="how-it-works-text8">
                        Use the imagery to build films, campaigns, designs, and
                        stories with cinematic depth.
                      </span>
                    </Fragment>
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .how-it-works-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .how-it-works-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .how-it-works-thq-content-elm {
            align-self: stretch;
            align-items: flex-start;
          }
          .how-it-works-ul {
            align-items: flex-start;
          }
          .how-it-works-thq-heading1-elm {
            align-self: flex-start;
          }
          .how-it-works-text1 {
            display: inline-block;
          }
          .how-it-works-text2 {
            display: inline-block;
          }
          .how-it-works-text3 {
            display: inline-block;
          }
          .how-it-works-text4 {
            display: inline-block;
          }
          .how-it-works-text5 {
            display: inline-block;
          }
          .how-it-works-text6 {
            display: inline-block;
          }
          .how-it-works-text7 {
            display: inline-block;
          }
          .how-it-works-text8 {
            display: inline-block;
          }
          .how-it-works-text9 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

HowItWorks.defaultProps = {
  content2: undefined,
  heading2: undefined,
  heading4: undefined,
  content4: undefined,
  heading5: undefined,
  heading3: undefined,
  content3: undefined,
  content5: undefined,
  heading1: undefined,
}

HowItWorks.propTypes = {
  content2: PropTypes.element,
  heading2: PropTypes.element,
  heading4: PropTypes.element,
  content4: PropTypes.element,
  heading5: PropTypes.element,
  heading3: PropTypes.element,
  content3: PropTypes.element,
  content5: PropTypes.element,
  heading1: PropTypes.element,
}

export default HowItWorks
