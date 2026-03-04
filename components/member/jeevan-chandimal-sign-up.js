import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const JeevanChandimalSignUp = (props) => {
  return (
    <>
      <div className="jeevan-chandimal-sign-up-container1">
        <div className="jeevan-chandimal-sign-up-thq-max-width-elm thq-section-max-width">
          <div className="jeevan-chandimal-sign-up-thq-form-root-elm thq-section-padding">
            <div className="jeevan-chandimal-sign-up-thq-form-elm">
              <div className="jeevan-chandimal-sign-up-thq-title-root-elm">
                <h2 className="thq-heading-2">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-sign-up-text2">
                        Sign Up for Our Services
                      </span>
                    </Fragment>
                  )}
                </h2>
                <div className="jeevan-chandimal-sign-up-thq-have-an-account-login-elm1">
                  <p className="thq-body-large">
                    Already have an account? Sign in
                  </p>
                </div>
              </div>
              <form
                data-form-id="7db63aa0-7945-40f0-8919-f3733d7e2da7"
                className="jeevan-chandimal-sign-up-form"
              >
                <div className="jeevan-chandimal-sign-up-thq-email-elm">
                  <label
                    htmlFor="thq-sign-up-1-email"
                    className="thq-body-large"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="thq-sign-up-1-email"
                    name="thq-sign-up-1-email"
                    required="true"
                    placeholder="Email address"
                    data-form-field-id="thq-sign-up-1-email"
                    className="jeevan-chandimal-sign-up-textinput1 thq-body-large thq-input"
                  />
                </div>
                <div className="jeevan-chandimal-sign-up-thq-username-elm">
                  <label
                    htmlFor="thq-sign-up-1-username"
                    className="thq-body-large"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="thq-sign-up-1-username"
                    name="thq-sign-up-1-username"
                    required="true"
                    placeholder="Username"
                    data-form-field-id="thq-sign-up-1-username"
                    className="jeevan-chandimal-sign-up-textinput2 thq-body-large thq-input"
                  />
                </div>
                <div className="jeevan-chandimal-sign-up-thq-password-elm">
                  <div className="jeevan-chandimal-sign-up-thq-textfield-elm">
                    <div className="jeevan-chandimal-sign-up-container2">
                      <label
                        htmlFor="thq-sign-up-1-password"
                        className="thq-body-large"
                      >
                        Password
                      </label>
                      <div className="jeevan-chandimal-sign-up-thq-hide-password-elm">
                        <svg
                          viewBox="0 0 1024 1024"
                          className="jeevan-chandimal-sign-up-icon1"
                        >
                          <path d="M317.143 762.857l44.571-80.571c-66.286-48-105.714-125.143-105.714-206.857 0-45.143 12-89.714 34.857-128.571-89.143 45.714-163.429 117.714-217.714 201.714 59.429 92 143.429 169.143 244 214.286zM539.429 329.143c0-14.857-12.571-27.429-27.429-27.429-95.429 0-173.714 78.286-173.714 173.714 0 14.857 12.571 27.429 27.429 27.429s27.429-12.571 27.429-27.429c0-65.714 53.714-118.857 118.857-118.857 14.857 0 27.429-12.571 27.429-27.429zM746.857 220c0 1.143 0 4-0.571 5.143-120.571 215.429-240 432-360.571 647.429l-28 50.857c-3.429 5.714-9.714 9.143-16 9.143-10.286 0-64.571-33.143-76.571-40-5.714-3.429-9.143-9.143-9.143-16 0-9.143 19.429-40 25.143-49.714-110.857-50.286-204-136-269.714-238.857-7.429-11.429-11.429-25.143-11.429-39.429 0-13.714 4-28 11.429-39.429 113.143-173.714 289.714-289.714 500.571-289.714 34.286 0 69.143 3.429 102.857 9.714l30.857-55.429c3.429-5.714 9.143-9.143 16-9.143 10.286 0 64 33.143 76 40 5.714 3.429 9.143 9.143 9.143 15.429zM768 475.429c0 106.286-65.714 201.143-164.571 238.857l160-286.857c2.857 16 4.571 32 4.571 48zM1024 548.571c0 14.857-4 26.857-11.429 39.429-17.714 29.143-40 57.143-62.286 82.857-112 128.571-266.286 206.857-438.286 206.857l42.286-75.429c166.286-14.286 307.429-115.429 396.571-253.714-42.286-65.714-96.571-123.429-161.143-168l36-64c70.857 47.429 142.286 118.857 186.857 192.571 7.429 12.571 11.429 24.571 11.429 39.429z"></path>
                        </svg>
                        <span className="thq-body-small">Hide</span>
                      </div>
                    </div>
                    <input
                      type="password"
                      id="thq-sign-up-1-password"
                      name="thq-sign-up-1-password"
                      required="true"
                      placeholder="Password"
                      data-form-field-id="thq-sign-up-1-password"
                      className="jeevan-chandimal-sign-up-textinput3 thq-body-large thq-input"
                    />
                  </div>
                  <div className="jeevan-chandimal-sign-up-thq-pass-requirements-elm">
                    <div className="jeevan-chandimal-sign-up-thq-pass-conditions1-elm">
                      <div className="jeevan-chandimal-sign-up-thq-bulletpoint-elm1">
                        <div className="jeevan-chandimal-sign-up-container3"></div>
                        <span className="jeevan-chandimal-sign-up-thq-text-elm16 thq-body-small">
                          Use 8 or more characters
                        </span>
                      </div>
                      <div className="jeevan-chandimal-sign-up-thq-bulletpoint-elm2">
                        <div className="jeevan-chandimal-sign-up-container4"></div>
                        <span className="jeevan-chandimal-sign-up-thq-text-elm17 thq-body-small">
                          One special character
                        </span>
                      </div>
                    </div>
                    <div className="jeevan-chandimal-sign-up-thq-pass-conditions2-elm">
                      <div className="jeevan-chandimal-sign-up-thq-bulletpoint-elm3">
                        <div className="jeevan-chandimal-sign-up-container5"></div>
                        <span className="jeevan-chandimal-sign-up-thq-text-elm18 thq-body-small">
                          One Uppercase character
                        </span>
                      </div>
                      <div className="jeevan-chandimal-sign-up-thq-bulletpoint-elm4">
                        <div className="jeevan-chandimal-sign-up-container6"></div>
                        <span className="jeevan-chandimal-sign-up-thq-text-elm19 thq-body-small">
                          One number
                        </span>
                      </div>
                    </div>
                    <div className="jeevan-chandimal-sign-up-thq-pass-conditions3-elm">
                      <div className="jeevan-chandimal-sign-up-thq-bulletpoint-elm5">
                        <div className="jeevan-chandimal-sign-up-container7"></div>
                        <span className="jeevan-chandimal-sign-up-thq-text-elm20 thq-body-small">
                          One lowercase character
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="jeevan-chandimal-sign-up-container8">
                <input
                  type="checkbox"
                  id="thq-sign-up-1-newsletter"
                  checked="false"
                  defaultChecked="true"
                  className="thq-checkbox"
                />
                <label
                  htmlFor="thq-sign-up-1-newsletter"
                  className="thq-body-large"
                >
                  {props.content1 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-sign-up-text1">
                        Join our platform to access a wide range of services
                        tailored to meet your specific needs. Sign up now to get
                        started!
                      </span>
                    </Fragment>
                  )}
                </label>
              </div>
              <div className="jeevan-chandimal-sign-up-thq-terms-agree-elm">
                <p className="thq-body-large">
                  By creating an account, you agree to the Terms of use and
                  Privacy Policy.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </p>
              </div>
              <button
                type="submit"
                className="thq-button-filled jeevan-chandimal-sign-up-thq-button-elm"
              >
                <span className="jeevan-chandimal-sign-up-thq-text-elm23 thq-body-small">
                  {props.action1 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-sign-up-text3">
                        Sign Up Now
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
              <div className="jeevan-chandimal-sign-up-thq-have-an-account-login-elm2">
                <p className="thq-body-large">
                  Already have an account? Sign in
                </p>
              </div>
            </div>
          </div>
          <div className="jeevan-chandimal-sign-up-container9">
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="jeevan-chandimal-sign-up-thq-sign-up-image-elm thq-img-ratio-4-6"
            />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .jeevan-chandimal-sign-up-container1 {
            width: 100%;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
            justify-content: center;
          }
          .jeevan-chandimal-sign-up-thq-max-width-elm {
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
          }
          .jeevan-chandimal-sign-up-thq-form-root-elm {
            gap: var(--dl-layout-space-unit);
            width: 60%;
            height: 100%;
            display: flex;
            overflow: hidden;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .jeevan-chandimal-sign-up-thq-form-elm {
            gap: var(--dl-layout-space-twounits);
            width: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-end;
          }
          .jeevan-chandimal-sign-up-thq-title-root-elm {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .jeevan-chandimal-sign-up-thq-have-an-account-login-elm1 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-items: flex-start;
          }
          .jeevan-chandimal-sign-up-form {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
          }
          .jeevan-chandimal-sign-up-thq-email-elm {
            gap: var(--dl-layout-space-halfunit);
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .jeevan-chandimal-sign-up-textinput1 {
            width: 100%;
            border-color: var(--dl-color-theme-primary1);
            background-color: transparent;
          }
          .jeevan-chandimal-sign-up-thq-username-elm {
            gap: var(--dl-layout-space-halfunit);
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .jeevan-chandimal-sign-up-textinput2 {
            width: 100%;
            border-color: var(--dl-color-theme-primary1);
            background-color: transparent;
          }
          .jeevan-chandimal-sign-up-thq-password-elm {
            gap: var(--dl-layout-space-halfunit);
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .jeevan-chandimal-sign-up-thq-textfield-elm {
            gap: 4px;
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .jeevan-chandimal-sign-up-container2 {
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .jeevan-chandimal-sign-up-thq-hide-password-elm {
            gap: var(--dl-layout-space-halfunit);
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-shrink: 1;
            justify-content: center;
          }
          .jeevan-chandimal-sign-up-icon1 {
            fill: var(--dl-color-theme-neutral-dark);
            width: 24px;
            height: 24px;
          }
          .jeevan-chandimal-sign-up-textinput3 {
            width: 100%;
            border-color: var(--dl-color-theme-primary1);
            background-color: transparent;
          }
          .jeevan-chandimal-sign-up-thq-pass-requirements-elm {
            width: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
          }
          .jeevan-chandimal-sign-up-thq-pass-conditions1-elm {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .jeevan-chandimal-sign-up-thq-bulletpoint-elm1 {
            gap: 8px;
            display: flex;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: 8px 8px 8px 0;
            padding-right: 8px 8px 8px 0;
            padding-bottom: var(--dl-layout-space-halfunit);
            justify-content: center;
          }
          .jeevan-chandimal-sign-up-container3 {
            flex: 0 0 auto;
            width: 6px;
            height: 6px;
            display: flex;
            align-items: flex-start;
            border-radius: var(--dl-layout-radius-round);
            flex-direction: column;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .jeevan-chandimal-sign-up-thq-text-elm16 {
            font-size: 14px;
          }
          .jeevan-chandimal-sign-up-thq-bulletpoint-elm2 {
            gap: 8px;
            display: flex;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: 8px 8px 8px 0;
            padding-right: 8px 8px 8px 0;
            padding-bottom: var(--dl-layout-space-halfunit);
            justify-content: center;
          }
          .jeevan-chandimal-sign-up-container4 {
            flex: 0 0 auto;
            width: 6px;
            height: 6px;
            display: flex;
            align-items: flex-start;
            border-radius: var(--dl-layout-radius-round);
            flex-direction: column;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .jeevan-chandimal-sign-up-thq-text-elm17 {
            font-size: 14px;
          }
          .jeevan-chandimal-sign-up-thq-pass-conditions2-elm {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .jeevan-chandimal-sign-up-thq-bulletpoint-elm3 {
            gap: 8px;
            display: flex;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: 8px 8px 8px 0;
            padding-right: 8px 8px 8px 0;
            padding-bottom: var(--dl-layout-space-halfunit);
            justify-content: center;
          }
          .jeevan-chandimal-sign-up-container5 {
            flex: 0 0 auto;
            width: 6px;
            height: 6px;
            display: flex;
            align-items: flex-start;
            border-radius: var(--dl-layout-radius-round);
            flex-direction: column;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .jeevan-chandimal-sign-up-thq-text-elm18 {
            font-size: 14px;
          }
          .jeevan-chandimal-sign-up-thq-bulletpoint-elm4 {
            gap: 8px;
            display: flex;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: 8px 8px 8px 0;
            padding-right: 8px 8px 8px 0;
            padding-bottom: var(--dl-layout-space-halfunit);
            justify-content: center;
          }
          .jeevan-chandimal-sign-up-container6 {
            flex: 0 0 auto;
            width: 6px;
            height: 6px;
            display: flex;
            align-items: flex-start;
            border-radius: var(--dl-layout-radius-round);
            flex-direction: column;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .jeevan-chandimal-sign-up-thq-text-elm19 {
            font-size: 14px;
          }
          .jeevan-chandimal-sign-up-thq-pass-conditions3-elm {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .jeevan-chandimal-sign-up-thq-bulletpoint-elm5 {
            gap: 8px;
            display: flex;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: 8px 8px 8px 0;
            padding-right: 8px 8px 8px 0;
            padding-bottom: var(--dl-layout-space-halfunit);
            justify-content: center;
          }
          .jeevan-chandimal-sign-up-container7 {
            flex: 0 0 auto;
            width: 6px;
            height: 6px;
            display: flex;
            align-items: flex-start;
            border-radius: var(--dl-layout-radius-round);
            flex-direction: column;
            background-color: var(--dl-color-theme-neutral-dark);
          }
          .jeevan-chandimal-sign-up-thq-text-elm20 {
            font-size: 14px;
          }
          .jeevan-chandimal-sign-up-container8 {
            gap: var(--dl-layout-space-halfunit);
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .jeevan-chandimal-sign-up-thq-terms-agree-elm {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            padding: var(--dl-layout-space-halfunit);
            align-items: flex-start;
          }
          .jeevan-chandimal-sign-up-thq-text-elm23 {
            text-align: center;
          }
          .jeevan-chandimal-sign-up-thq-have-an-account-login-elm2 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-items: flex-start;
          }
          .jeevan-chandimal-sign-up-container9 {
            width: 40%;
            height: 100%;
            display: flex;
            align-self: center;
            align-items: flex-start;
            flex-direction: row;
            justify-content: flex-start;
          }
          .jeevan-chandimal-sign-up-thq-sign-up-image-elm {
            width: 100%;
            height: 100%;
          }
          .jeevan-chandimal-sign-up-text1 {
            display: inline-block;
          }
          .jeevan-chandimal-sign-up-text2 {
            display: inline-block;
          }
          .jeevan-chandimal-sign-up-text3 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .jeevan-chandimal-sign-up-thq-form-root-elm {
              width: 100%;
              padding: var(--dl-layout-space-fourunits);
            }
            .jeevan-chandimal-sign-up-container9 {
              display: none;
            }
          }
          @media (max-width: 479px) {
            .jeevan-chandimal-sign-up-thq-form-root-elm {
              padding: var(--dl-layout-space-oneandhalfunits);
            }
            .jeevan-chandimal-sign-up-thq-pass-requirements-elm {
              flex-direction: column;
            }
            .jeevan-chandimal-sign-up-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

JeevanChandimalSignUp.defaultProps = {
  content1: undefined,
  image1Src:
    'https://images.unsplash.com/photo-1591278169022-4eac0c7d1e3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc2OTQ1NjczMHw&ixlib=rb-4.1.0&q=80&w=1080',
  image1Alt: 'Sign Up Image',
  heading1: undefined,
  action1: undefined,
}

JeevanChandimalSignUp.propTypes = {
  content1: PropTypes.element,
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
  heading1: PropTypes.element,
  action1: PropTypes.element,
}

export default JeevanChandimalSignUp
