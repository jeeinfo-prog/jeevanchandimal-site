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
            loop
            muted
            poster="https://play.teleporthq.io/static/svg/videoposter.svg"
            autoPlay
            playsInline
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

            {/* ✅ FORM – FIXED */}
            <form
              className="contact-form-form"
              onSubmit={async (e) => {
                e.preventDefault()

                const data = {
                  name: e.target['contact-form-3-name']?.value || '',
                  email: e.target['contact-form-3-email']?.value || '',
                  message: e.target['contact-form-3-message']?.value || '',
                }

                const res = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                })

                if (res.ok) {
                  alert('Message sent successfully!')
                  e.target.reset()
                } else {
                  alert('Something went wrong. Please try again.')
                }
              }}
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
                  className="thq-input"
                  required
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
                  placeholder="Email"
                  className="thq-input"
                  required
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
                  className="thq-input"
                  required
                ></textarea>
              </div>

              <div className="contact-form-final-thq-checkbox-elm">
                <input
                  type="checkbox"
                  id="contact-form-3-check"
                  name="contact-form-3-check"
                  className="thq-checkbox"
                  required
                />
                <label
                  htmlFor="contact-form-3-check"
                  className="contact-form-final-thq-text-elm7 thq-body-small"
                >
                  I accept the Terms
                </label>
              </div>

              <button
                type="submit"
                className="contact-form-final-thq-button-elm thq-button-filled"
              >
                <span className="thq-body-small">
                  {props.action ?? (
                    <Fragment>
                      <span className="contact-form-final-text3">
                        Submit
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* styles unchanged */}
      <style jsx>{`
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
        .contact-form-final-thq-input-elm1,
        .contact-form-final-thq-input-elm2,
        .contact-form-final-container {
          gap: var(--dl-layout-space-halfunit);
          display: flex;
          flex-direction: column;
        }
        .contact-form-final-thq-checkbox-elm {
          gap: var(--dl-layout-space-unit);
          display: flex;
          align-items: center;
        }
        .contact-form-final-thq-button-elm {
          align-self: flex-start;
        }
        @media (max-width: 991px) {
          .contact-form-final-thq-max-width-elm {
            flex-direction: column;
          }
        }
      `}</style>
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
