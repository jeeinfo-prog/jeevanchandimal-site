import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ContactFormFinal = (props) => {
  return (
    <>
      <div className="contact-form-final-thq-contact9-elm thq-section-padding">
        <div className="thq-section-max-width thq-flex-row contact-form-final-thq-max-width-elm">
          <video
            src={props.videoSrc}
            loop="true"
            muted="true"
            poster="https://play.teleporthq.io/static/svg/videoposter.svg"
            autoPlay="true"
            playsInline="true"
            className="contact-form-final-video thq-img-ratio-4-3"
          ></video>
          <div className="contact-form-final-thq-content-elm1 thq-flex-column">
            <div className="contact-form-final-thq-section-title-elm thq-card">
              <span className="thq-body-small">
                {props.content2 ?? (
                  <Fragment>
                    <span className="contact-form-final-text2">
                      Get in touch with us
                    </span>
                  </Fragment>
                )}
              </span>
              <div className="contact-form-final-thq-content-elm2">
                <h2 className="thq-heading-2">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="contact-form-final-text4">
                        Contact us
                      </span>
                    </Fragment>
                  )}
                </h2>
                <span className="thq-body-small">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="contact-form-final-text1">
                        Do not hesitate to contact us. We look forward to
                        hearing from you!
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <form
              data-form-id="4e97daf4-1169-401e-8a6a-8dce6aa78e78"
              className="thq-card"
            >
              <div className="contact-form-final-thq-input-elm1">
                <label htmlFor="contact-form-3-name" className="thq-body-small">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-form-3-name"
                  name="contact-form-3-name"
                  placeholder="Name"
                  data-form-field-id="contact-form-3-name"
                  className="thq-input"
                />
              </div>
              <div className="contact-form-final-thq-input-elm2">
                <label
                  htmlFor="contact-form-3-email"
                  className="thq-body-small"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-form-3-email"
                  name="contact-form-3-email"
                  required="true"
                  placeholder="Email"
                  data-form-field-id="contact-form-3-email"
                  className="thq-input"
                />
              </div>
              <div className="contact-form-final-container">
                <label
                  htmlFor="contact-form-3-message"
                  className="thq-body-small"
                >
                  Message
                </label>
                <textarea
                  id="contact-form-3-message"
                  name="contact-form-3-message"
                  rows="3"
                  placeholder="Enter your message"
                  data-form-field-id="contact-form-3-message"
                  className="thq-input"
                ></textarea>
              </div>
              <div className="contact-form-final-thq-checkbox-elm">
                <input
                  type="checkbox"
                  id="contact-form-3-check"
                  name="contact-form-3-check"
                  checked="false"
                  required="true"
                  defaultChecked="true"
                  data-form-field-id="contact-form-3-check"
                  className="thq-checkbox"
                />
                <label
                  htmlFor="contact-form-3-check"
                  className="contact-form-final-thq-text-elm7 thq-body-small"
                >
                  I accept the Terms
                </label>
              </div>
              <button
                name="button 5tlr35464t"
                type="submit"
                className="contact-form-final-thq-button-elm thq-button-filled"
              >
                <span className="thq-body-small">
                  {props.action ?? (
                    <Fragment>
                      <span className="contact-form-final-text3">Submit</span>
                    </Fragment>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .contact-form-final-thq-contact9-elm {
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .contact-form-final-video {
            width: 751px;
            height: 470px;
          }
          .contact-form-final-thq-content-elm1 {
            gap: 0;
            flex: 1;
            align-items: stretch;
          }
          .contact-form-final-thq-section-title-elm {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .contact-form-final-thq-content-elm2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .contact-form-final-thq-input-elm1 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            flex-direction: column;
          }
          .contact-form-final-thq-input-elm2 {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-self: stretch;
            flex-direction: column;
          }
          .contact-form-final-container {
            gap: var(--dl-layout-space-halfunit);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .contact-form-final-thq-checkbox-elm {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-items: center;
          }
          .contact-form-final-thq-text-elm7 {
            height: auto;
            font-size: 14px;
            font-style: Regular;
            text-align: left;
            font-family: Roboto;
            font-weight: 400;
            line-height: 150%;
            font-stretch: normal;
            text-decoration: none;
          }
          .contact-form-final-thq-button-elm {
            align-self: flex-start;
          }
          .contact-form-final-text1 {
            display: inline-block;
          }
          .contact-form-final-text2 {
            display: inline-block;
          }
          .contact-form-final-text3 {
            display: inline-block;
          }
          .contact-form-final-text4 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .contact-form-final-thq-max-width-elm {
              flex-direction: column;
            }
            .contact-form-final-thq-content-elm1 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

ContactFormFinal.defaultProps = {
  content1: undefined,
  videoSrc: '/JC/jeevan%20chandimal%20logo.mp4',
  content2: undefined,
  action: undefined,
  heading1: undefined,
}

ContactFormFinal.propTypes = {
  content1: PropTypes.element,
  videoSrc: PropTypes.string,
  content2: PropTypes.element,
  action: PropTypes.element,
  heading1: PropTypes.element,
}

export default ContactFormFinal
