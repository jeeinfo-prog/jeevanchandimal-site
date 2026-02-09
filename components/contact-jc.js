import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ContactJC = (props) => {
  const whatsappNumber = '94711735735'
  const phoneNumber = '+94769771394'
  const emailAddress = 'info@jeevanchandimal.com'

  return (
    <>
      <div className="contact-jc-thq-contact20-elm thq-section-padding">
        <div className="contact-jc-thq-max-width-elm thq-section-max-width">

          {/* WhatsApp */}
          <div className="contact-jc-thq-content-elm1">
            <svg width="24" height="24" viewBox="0 0 24 24" className="thq-icon-medium">
              <path
                d="M13.17 4L18 8.83V20H6V4zM14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm-2 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85a6.95 6.95 0 0 0-5.56 0A2.01 2.01 0 0 0 8 17.43V18h8z"
                fill="currentColor"
              />
            </svg>

            <div className="contact-jc-thq-contact-info-elm1">
              <div className="contact-jc-thq-content-elm2">
                <h3 className="contact-jc-thq-text-elm1 thq-heading-3">
                  Contact Us
                </h3>
                <p className="contact-jc-thq-text-elm2 thq-body-large">
                  WhatsApp: +94 711 735 735
                </p>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-jc-thq-email-elm1 thq-body-small"
              >
                Start WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="contact-jc-thq-content-elm3">
            <svg width="24" height="24" viewBox="0 0 24 24" className="thq-icon-medium">
              <path
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42a18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>

            <div className="contact-jc-thq-contact-info-elm2">
              <div className="contact-jc-thq-content-elm4">
                <h3 className="contact-jc-thq-text-elm3 thq-heading-3">
                  Phone
                </h3>
                <p className="contact-jc-thq-text-elm4 thq-body-large">
                  {phoneNumber}
                </p>
              </div>

              <a
                href={`tel:${phoneNumber}`}
                className="contact-jc-thq-email-elm2 thq-body-small"
              >
                Start Call
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="contact-jc-thq-content-elm5">
            <svg width="24" height="24" viewBox="0 0 24 24" className="thq-icon-medium">
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44"
                fill="currentColor"
              />
            </svg>

            <div className="contact-jc-thq-contact-info-elm3">
              <div className="contact-jc-thq-content-elm6">
                <h3 className="contact-jc-thq-text-elm5 thq-heading-3">
                  Email
                </h3>
                <p className="contact-jc-thq-text-elm6 thq-body-large">
                  {emailAddress}
                </p>
              </div>

              <a
                href={`mailto:${emailAddress}`}
                className="contact-jc-thq-phone-elm thq-body-small"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* Address (unchanged) */}
          <div className="contact-jc-thq-content-elm7">
            <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
              <path d="M512 0c-176.732 0-320 143.268-320 320 0 320 320 704 320 704s320-384 320-704c0-176.732-143.27-320-320-320zM512 512c-106.040 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z" />
            </svg>

            <div className="contact-jc-thq-contact-info-elm4">
              <div className="contact-jc-thq-content-elm8">
                <h3 className="contact-jc-thq-text-elm7 thq-heading-3">
                  Address
                </h3>
                <p className="contact-jc-thq-content4-elm thq-body-large">
                  No. 99, Sunethradevi Road
                </p>
              </div>
              <span className="contact-jc-thq-address-elm thq-body-small">
                Kohuwala, Sri Lanka
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default ContactJC
