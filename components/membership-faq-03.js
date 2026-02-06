import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MembershipFAQ03 = (props) => {
  const [faq3Visible, setFaq3Visible] = useState(false)
  const [faq1Visible, setFaq1Visible] = useState(false)
  const [faq4Visible, setFaq4Visible] = useState(false)
  const [faq2Visible, setFaq2Visible] = useState(false)
  const [faq5Visible, setFaq5Visible] = useState(false)
  return (
    <>
      <div className="membership-faq-03-thq-faq8-elm thq-section-padding">
        <div className="membership-faq-03-thq-max-width-elm thq-section-max-width">
          <div className="thq-section-max-width thq-flex-column membership-faq-03-thq-container-elm">
            <div className="membership-faq-03-thq-list-elm">
              <div className="membership-faq-03-thq-faq1-elm">
                <div
                  onClick={() => setFaq1Visible(!faq1Visible)}
                  className="membership-faq-03-thq-trigger-elm1"
                >
                  <p className="membership-faq-03-thq-faq1-question-elm thq-body-large">
                    {props.faq1Question ?? (
                      <Fragment>
                        <span className="membership-faq-03-text6">
                          What if I need a custom license or special usage?
                        </span>
                      </Fragment>
                    )}
                  </p>
                  <div className="membership-faq-03-thq-icons-container-elm1">
                    {faq1Visible === false && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-03-thq-icon-elm1"
                        >
                          <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                    {faq1Visible === true && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-03-icon2"
                        >
                          <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {faq1Visible === true && (
                  <div className="membership-faq-03-container3">
                    <span className="thq-body-small">
                      If your project requires extended or exclusive usage, you
                      can get in touch to discuss custom licensing options.
                    </span>
                  </div>
                )}
              </div>
              <div className="membership-faq-03-thq-faq2-elm">
                <div
                  onClick={() => setFaq2Visible(!faq2Visible)}
                  className="membership-faq-03-thq-trigger-elm2"
                >
                  <p className="membership-faq-03-thq-faq2-question-elm thq-body-large">
                    {props.faq2Question ?? (
                      <Fragment>
                        <span className="membership-faq-03-text5">
                          Can I upgrade or change my membership plan later?
                        </span>
                      </Fragment>
                    )}
                  </p>
                  <div className="membership-faq-03-thq-icons-container-elm2">
                    {faq2Visible === false && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-03-thq-icon-elm2"
                        >
                          <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                    {faq2Visible === true && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-03-icon5"
                        >
                          <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {faq2Visible === true && (
                  <div className="membership-faq-03-container6">
                    <span className="thq-body-small">
                      <span>
                        Yes. You can upgrade or change your membership plan at
                        any time. Changes take effect immediately or at the
                        start of your next billing cycle, depending on your
                        selected option.
                      </span>
                      <br></br>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="membership-faq-03-thq-content-elm1 thq-flex-column">
            <div className="membership-faq-03-thq-content-elm2">
              <h2 className="membership-faq-03-thq-text-elm2 thq-heading-2">
                {props.heading2 ?? (
                  <Fragment>
                    <span className="membership-faq-03-text7">
                      Still have a question?
                    </span>
                  </Fragment>
                )}
              </h2>
              <p className="membership-faq-03-thq-text-elm3 thq-body-large">
                {props.content2 ?? (
                  <Fragment>
                    <span className="membership-faq-03-text4">
                      Jeevan Chandimal is a filmmaker and visual storyteller who
                      specializes in creating visual stories with atmosphere and
                      emotional clarity.
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
            <button className="thq-button-filled">
              <span className="thq-body-small">
                {props.action ?? (
                  <Fragment>
                    <span className="membership-faq-03-text8">Contact</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .membership-faq-03-thq-faq8-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-faq-03-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-faq-03-thq-list-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-faq-03-thq-faq1-elm {
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: column;
          }
          .membership-faq-03-thq-trigger-elm1 {
            display: flex;
            padding: var(--dl-layout-space-unit);
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-03-thq-faq1-question-elm {
            font-style: normal;
            text-align: center;
            font-weight: 600;
          }
          .membership-faq-03-thq-icons-container-elm1 {
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-03-thq-icon-elm1 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-03-icon2 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-03-container3 {
            display: flex;
            padding: var(--dl-layout-space-unit);
            align-self: stretch;
            align-items: flex-start;
            animation-name: fadeIn;
            flex-direction: row;
            animation-delay: 0s;
            justify-content: space-between;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .membership-faq-03-thq-faq2-elm {
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: column;
          }
          .membership-faq-03-thq-trigger-elm2 {
            display: flex;
            padding: var(--dl-layout-space-unit);
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-03-thq-faq2-question-elm {
            font-style: normal;
            text-align: center;
            font-weight: 600;
          }
          .membership-faq-03-thq-icons-container-elm2 {
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-03-thq-icon-elm2 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-03-icon5 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-03-container6 {
            display: flex;
            padding: var(--dl-layout-space-unit);
            align-self: stretch;
            align-items: flex-start;
            animation-name: fadeIn;
            flex-direction: row;
            animation-delay: 0s;
            justify-content: space-between;
            animation-duration: 300ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .membership-faq-03-thq-content-elm1 {
            align-self: center;
          }
          .membership-faq-03-thq-content-elm2 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .membership-faq-03-thq-text-elm2 {
            text-align: center;
          }
          .membership-faq-03-thq-text-elm3 {
            text-align: center;
          }
          .membership-faq-03-text4 {
            display: inline-block;
          }
          .membership-faq-03-text5 {
            display: inline-block;
          }
          .membership-faq-03-text6 {
            display: inline-block;
          }
          .membership-faq-03-text7 {
            display: inline-block;
          }
          .membership-faq-03-text8 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .membership-faq-03-thq-container-elm {
              flex-direction: column;
            }
          }
          @media (max-width: 479px) {
            .membership-faq-03-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

MembershipFAQ03.defaultProps = {
  content2: undefined,
  faq2Question: undefined,
  faq1Question: undefined,
  heading2: undefined,
  action: undefined,
}

MembershipFAQ03.propTypes = {
  content2: PropTypes.element,
  faq2Question: PropTypes.element,
  faq1Question: PropTypes.element,
  heading2: PropTypes.element,
  action: PropTypes.element,
}

export default MembershipFAQ03
