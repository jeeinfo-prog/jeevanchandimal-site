import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const MembershipFAQ01 = (props) => {
  const [faq5Visible, setFaq5Visible] = useState(false)
  const [faq1Visible, setFaq1Visible] = useState(false)
  const [faq4Visible, setFaq4Visible] = useState(false)
  const [faq2Visible, setFaq2Visible] = useState(false)
  const [faq3Visible, setFaq3Visible] = useState(false)
  return (
    <>
      <div className="membership-faq-01-thq-faq8-elm thq-section-padding">
        <div className="membership-faq-01-thq-max-width-elm thq-section-max-width">
          <div className="thq-section-max-width thq-flex-column membership-faq-01-thq-container-elm">
            <div className="membership-faq-01-thq-section-title-elm">
              <div className="membership-faq-01-thq-content-elm">
                <h2 className="membership-faq-01-thq-text-elm1 thq-heading-2">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="membership-faq-01-text17">
                        Frequently Asked Questions
                      </span>
                    </Fragment>
                  )}
                </h2>
                <p className="membership-faq-01-thq-text-elm2 thq-body-large">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="membership-faq-01-text14">
                        We offer customized solutions for film production, audio
                        production, animation, and photography. From concept to
                        final delivery, we focus on cinematic intent and
                        attention to detail.
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
            </div>
            <div className="membership-faq-01-thq-list-elm">
              <div className="membership-faq-01-thq-faq1-elm">
                <div
                  onClick={() => setFaq1Visible(!faq1Visible)}
                  className="membership-faq-01-thq-trigger-elm1"
                >
                  <p className="membership-faq-01-thq-faq1-question-elm1 thq-body-large">
                    {props.faq1Question ?? (
                      <Fragment>
                        <span className="membership-faq-01-text18">
                          What does the membership include?
                        </span>
                      </Fragment>
                    )}
                  </p>
                  <div className="membership-faq-01-thq-icons-container-elm1">
                    {faq1Visible === false && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-01-thq-icon-elm1"
                        >
                          <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                    {faq1Visible === true && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-01-icon11"
                        >
                          <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {faq1Visible === true && (
                  <div className="membership-faq-01-container12">
                    <span className="thq-body-small">
                      Membership gives you access to a curated collection of
                      cinematic imagery, with downloads and usage based on your
                      selected plan. New work is added regularly as the archive
                      grows.
                    </span>
                  </div>
                )}
              </div>
              <div className="membership-faq-01-thq-faq2-elm">
                <div
                  onClick={() => setFaq2Visible(!faq2Visible)}
                  className="membership-faq-01-thq-trigger-elm2"
                >
                  <p className="membership-faq-01-thq-faq2-question-elm1 thq-body-large">
                    {props.faq2Question ?? (
                      <Fragment>
                        <span className="membership-faq-01-text15">
                          How can I use the images?
                        </span>
                      </Fragment>
                    )}
                  </p>
                  <div className="membership-faq-01-thq-icons-container-elm2">
                    {faq2Visible === false && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-01-thq-icon-elm2"
                        >
                          <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                    {faq2Visible === true && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-01-icon14"
                        >
                          <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {faq2Visible === true && (
                  <div className="membership-faq-01-container15">
                    <span className="thq-body-small">
                      Images can be used for personal, editorial, and commercial
                      projects according to your membership tier. Full usage
                      details are outlined clearly in the license agreement.
                    </span>
                  </div>
                )}
              </div>
              <div className="membership-faq-01-thq-faq3-elm">
                <div
                  onClick={() => setFaq3Visible(!faq3Visible)}
                  className="membership-faq-01-thq-trigger-elm3"
                >
                  <p className="membership-faq-01-thq-faq2-question-elm2 thq-body-large">
                    {props.faq3Question ?? (
                      <Fragment>
                        <span className="membership-faq-01-text13">
                          Are the images sold exclusively?
                        </span>
                      </Fragment>
                    )}
                  </p>
                  <div className="membership-faq-01-thq-icons-container-elm3">
                    {faq3Visible === false && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-01-thq-icon-elm3"
                        >
                          <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                    {faq3Visible === true && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-01-icon17"
                        >
                          <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {faq3Visible === true && (
                  <div className="membership-faq-01-container18">
                    <span className="thq-body-small">
                      No. Images are licensed, not sold exclusively. The same
                      image may be licensed to multiple members or clients.
                    </span>
                  </div>
                )}
              </div>
              <div className="membership-faq-01-thq-faq4-elm">
                <div
                  onClick={() => setFaq4Visible(!faq4Visible)}
                  className="membership-faq-01-thq-trigger-elm4"
                >
                  <p className="membership-faq-01-thq-faq2-question-elm3 thq-body-large">
                    {props.faq4Question ?? (
                      <Fragment>
                        <span className="membership-faq-01-text16">
                          Can I use the images for client work?
                        </span>
                      </Fragment>
                    )}
                  </p>
                  <div className="membership-faq-01-thq-icons-container-elm4">
                    {faq4Visible === false && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-01-thq-icon-elm4"
                        >
                          <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                    {faq4Visible === true && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-01-icon20"
                        >
                          <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {faq4Visible === true && (
                  <div className="membership-faq-01-container21">
                    <span className="thq-body-small">
                      Yes. Client use is allowed depending on your membership
                      plan. Higher tiers offer broader commercial usage.
                    </span>
                  </div>
                )}
              </div>
              <div className="membership-faq-01-thq-faq5-elm">
                <div
                  onClick={() => setFaq5Visible(!faq5Visible)}
                  className="membership-faq-01-thq-trigger-elm5"
                >
                  <p className="membership-faq-01-thq-faq1-question-elm2 thq-body-large">
                    {props.faq1Question1 ?? (
                      <Fragment>
                        <span className="membership-faq-01-text19">
                          Is there a limit to how many images I can download?
                        </span>
                      </Fragment>
                    )}
                  </p>
                  <div className="membership-faq-01-thq-icons-container-elm5">
                    {faq5Visible === false && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-01-thq-icon-elm5"
                        >
                          <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                    {faq5Visible === true && (
                      <div>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="membership-faq-01-icon23"
                        >
                          <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {faq5Visible === true && (
                  <div className="membership-faq-01-container24">
                    <span className="thq-body-small">
                      Download limits depend on your plan. Each membership tier
                      clearly defines monthly or unlimited access.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .membership-faq-01-thq-faq8-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-faq-01-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .membership-faq-01-thq-section-title-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-faq-01-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: center;
            align-items: center;
            flex-direction: column;
          }
          .membership-faq-01-thq-text-elm1 {
            text-align: center;
          }
          .membership-faq-01-thq-text-elm2 {
            text-align: center;
          }
          .membership-faq-01-thq-list-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .membership-faq-01-thq-faq1-elm {
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: column;
          }
          .membership-faq-01-thq-trigger-elm1 {
            display: flex;
            padding: var(--dl-layout-space-unit);
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-01-thq-faq1-question-elm1 {
            font-style: normal;
            text-align: center;
            font-weight: 600;
          }
          .membership-faq-01-thq-icons-container-elm1 {
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-01-thq-icon-elm1 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-01-icon11 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-01-container12 {
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
          .membership-faq-01-thq-faq2-elm {
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: column;
          }
          .membership-faq-01-thq-trigger-elm2 {
            display: flex;
            padding: var(--dl-layout-space-unit);
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-01-thq-faq2-question-elm1 {
            font-style: normal;
            text-align: center;
            font-weight: 600;
          }
          .membership-faq-01-thq-icons-container-elm2 {
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-01-thq-icon-elm2 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-01-icon14 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-01-container15 {
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
          .membership-faq-01-thq-faq3-elm {
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: column;
          }
          .membership-faq-01-thq-trigger-elm3 {
            display: flex;
            padding: var(--dl-layout-space-unit);
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-01-thq-faq2-question-elm2 {
            font-style: normal;
            text-align: center;
            font-weight: 600;
          }
          .membership-faq-01-thq-icons-container-elm3 {
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-01-thq-icon-elm3 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-01-icon17 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-01-container18 {
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
          .membership-faq-01-thq-faq4-elm {
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: column;
          }
          .membership-faq-01-thq-trigger-elm4 {
            display: flex;
            padding: var(--dl-layout-space-unit);
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-01-thq-faq2-question-elm3 {
            font-style: normal;
            text-align: center;
            font-weight: 600;
          }
          .membership-faq-01-thq-icons-container-elm4 {
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-01-thq-icon-elm4 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-01-icon20 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-01-container21 {
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
          .membership-faq-01-thq-faq5-elm {
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: column;
          }
          .membership-faq-01-thq-trigger-elm5 {
            display: flex;
            padding: var(--dl-layout-space-unit);
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-01-thq-faq1-question-elm2 {
            font-style: normal;
            text-align: center;
            font-weight: 600;
          }
          .membership-faq-01-thq-icons-container-elm5 {
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
          }
          .membership-faq-01-thq-icon-elm5 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-01-icon23 {
            width: 24px;
            height: 24px;
          }
          .membership-faq-01-container24 {
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
          .membership-faq-01-text13 {
            display: inline-block;
          }
          .membership-faq-01-text14 {
            display: inline-block;
          }
          .membership-faq-01-text15 {
            display: inline-block;
          }
          .membership-faq-01-text16 {
            display: inline-block;
          }
          .membership-faq-01-text17 {
            display: inline-block;
          }
          .membership-faq-01-text18 {
            display: inline-block;
          }
          .membership-faq-01-text19 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .membership-faq-01-thq-container-elm {
              flex-direction: column;
            }
          }
          @media (max-width: 479px) {
            .membership-faq-01-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

MembershipFAQ01.defaultProps = {
  faq3Question: undefined,
  content1: undefined,
  faq2Question: undefined,
  faq4Question: undefined,
  heading1: undefined,
  faq1Question: undefined,
  faq1Question1: undefined,
}

MembershipFAQ01.propTypes = {
  faq3Question: PropTypes.element,
  content1: PropTypes.element,
  faq2Question: PropTypes.element,
  faq4Question: PropTypes.element,
  heading1: PropTypes.element,
  faq1Question: PropTypes.element,
  faq1Question1: PropTypes.element,
}

export default MembershipFAQ01
