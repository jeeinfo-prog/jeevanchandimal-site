import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const SignIn2 = (props) => {
  return (
    <>
      <div className="sign-in2-container1 thq-section-padding">
        <div className="sign-in2-thq-max-width-elm thq-section-max-width">
          <div className="sign-in2-thq-form-root-elm">
            <h2 className="sign-in2-thq-text-elm1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="sign-in2-text4">
                    Sign In to Access Your Account
                  </span>
                </Fragment>
              )}
            </h2>
            <div className="sign-in2-container2">
              <button className="sign-in2-thq-button-elm1 thq-button-outline">
                <svg
                  viewBox="0 0 877.7142857142857 1024"
                  className="sign-in2-icon1"
                >
                  <path d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"></path>
                </svg>
                <span className="thq-body-small">Continue with Facebook</span>
              </button>
              <button className="sign-in2-thq-button-elm2 thq-button-outline">
                <svg
                  viewBox="0 0 860.0137142857142 1024"
                  className="sign-in2-icon3"
                >
                  <path d="M438.857 449.143h414.286c4 22.286 6.857 44 6.857 73.143 0 250.286-168 428.571-421.143 428.571-242.857 0-438.857-196-438.857-438.857s196-438.857 438.857-438.857c118.286 0 217.714 43.429 294.286 114.857l-119.429 114.857c-32.571-31.429-89.714-68-174.857-68-149.714 0-272 124-272 277.143s122.286 277.143 272 277.143c173.714 0 238.857-124.571 249.143-189.143h-249.143v-150.857z"></path>
                </svg>
                <span className="thq-body-small">Continue with Google</span>
              </button>
            </div>
            <div className="sign-in2-thq-divider-elm1">
              <div className="sign-in2-thq-divider-elm2"></div>
              <span className="thq-body-large">OR</span>
              <div className="sign-in2-thq-divider-elm3"></div>
            </div>
            <div className="sign-in2-thq-form-elm">
              <div className="sign-in2-container3">
                <button
                  type="submit"
                  className="sign-in2-thq-button-elm3 thq-button-filled"
                >
                  <span className="sign-in2-thq-text-elm5 thq-body-small">
                    {props.action1 ?? (
                      <Fragment>
                        <span className="sign-in2-text5">Email Address</span>
                      </Fragment>
                    )}
                  </span>
                </button>
                <div className="sign-in2-thq-terms-agree-elm">
                  <p className="thq-body-large">
                    By continuing, you agree to the Terms of use and Privacy
                    Policy.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="sign-in2-thq-have-an-account-login-elm"></div>
            </div>
          </div>
          <div className="sign-in2-container4">
            <div className="sign-in2-thq-divider-elm4"></div>
            <span className="thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="sign-in2-text3">
                    Enter your credentials to access your account and manage
                    your projects.
                  </span>
                </Fragment>
              )}
            </span>
            <button
              type="button"
              className="sign-in2-thq-button-elm4 thq-button-outline"
            >
              <span className="sign-in2-thq-text-elm7 thq-body-small">
                {props.action2 ?? (
                  <Fragment>
                    <span className="sign-in2-text2">Password</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .sign-in2-container1 {
            width: 100%;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .sign-in2-thq-max-width-elm {
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .sign-in2-thq-form-root-elm {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: center;
            flex-shrink: 0;
            border-radius: var(--dl-layout-radius-radius4);
            flex-direction: column;
            justify-content: center;
          }
          .sign-in2-thq-text-elm1 {
            align-self: center;
          }
          .sign-in2-container2 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            display: flex;
            box-sizing: border-box;
            align-items: center;
            flex-direction: column;
            justify-content: flex-end;
          }
          .sign-in2-thq-button-elm1 {
            gap: var(--dl-layout-space-halfunit);
            width: 100%;
            display: flex;
            box-sizing: border-box;
            align-items: center;
            border-color: var(--dl-color-theme-primary1);
            border-style: solid;
            border-width: 1px;
            justify-content: center;
          }
          .sign-in2-icon1 {
            width: 24px;
            height: 24px;
          }
          .sign-in2-thq-button-elm2 {
            gap: var(--dl-layout-space-halfunit);
            width: 100%;
            display: flex;
            box-sizing: border-box;
            align-items: center;
            border-color: var(--dl-color-theme-primary1);
            border-style: solid;
            border-width: 1px;
            justify-content: center;
          }
          .sign-in2-icon3 {
            width: 24px;
            height: 24px;
          }
          .sign-in2-thq-divider-elm1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .sign-in2-thq-divider-elm2 {
            flex: 1;
            width: var(--dl-layout-size-medium);
            height: 1px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            background-color: var(--dl-color-theme-primary1);
          }
          .sign-in2-thq-divider-elm3 {
            flex: 1;
            width: var(--dl-layout-size-medium);
            height: 1px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            background-color: var(--dl-color-theme-primary1);
          }
          .sign-in2-thq-form-elm {
            gap: var(--dl-layout-space-twounits);
            width: 100%;
            display: flex;
            align-self: center;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-end;
          }
          .sign-in2-container3 {
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-end;
          }
          .sign-in2-thq-button-elm3 {
            width: 100%;
            align-self: center;
          }
          .sign-in2-thq-text-elm5 {
            text-align: center;
          }
          .sign-in2-thq-terms-agree-elm {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            padding: var(--dl-layout-space-halfunit);
            align-items: flex-start;
          }
          .sign-in2-thq-have-an-account-login-elm {
            gap: var(--dl-layout-space-halfunit);
            border: 2px dashed rgba(120, 120, 120, 0.4);
            display: flex;
            align-items: flex-start;
          }
          .sign-in2-container4 {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            display: flex;
            max-width: 600px;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .sign-in2-thq-divider-elm4 {
            width: 100%;
            height: 1px;
            background-color: var(--dl-color-theme-primary1);
          }
          .sign-in2-thq-button-elm4 {
            width: 100%;
            align-self: center;
          }
          .sign-in2-thq-text-elm7 {
            text-align: center;
          }
          .sign-in2-text2 {
            display: inline-block;
          }
          .sign-in2-text3 {
            display: inline-block;
          }
          .sign-in2-text4 {
            display: inline-block;
          }
          .sign-in2-text5 {
            display: inline-block;
          }
          @media (max-width: 479px) {
            .sign-in2-thq-button-elm1 {
              width: 100%;
            }
            .sign-in2-thq-button-elm2 {
              width: 100%;
            }
            .sign-in2-thq-button-elm3 {
              width: 100%;
            }
            .sign-in2-thq-button-elm4 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

SignIn2.defaultProps = {
  action2: undefined,
  content1: undefined,
  heading1: undefined,
  action1: undefined,
}

SignIn2.propTypes = {
  action2: PropTypes.element,
  content1: PropTypes.element,
  heading1: PropTypes.element,
  action1: PropTypes.element,
}

export default SignIn2
