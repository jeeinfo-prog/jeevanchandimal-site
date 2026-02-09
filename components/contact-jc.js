import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ContactJC = (props) => {
  // Numbers in international format (no +) for wa.me links
  const whatsappNumber = '94711735735'
  const phoneNumber = '+94769771394'
  const emailAddress = 'info@jeevanchandimal.com'

  // ✅ WhatsApp call (mobile app). If it fails, fallback to WhatsApp chat link.
  const handleWhatsAppCall = (e) => {
    e.preventDefault()
    if (typeof window === 'undefined') return

    // Some devices support whatsapp:// scheme
    const scheme = `whatsapp://call?phone=${encodeURIComponent('+94 711735735')}`
    const fallback = `https://wa.me/${whatsappNumber}`

    // Try open app call
    window.location.href = scheme

    // Fallback to chat if call scheme not supported
    setTimeout(() => {
      window.location.href = fallback
    }, 700)
  }

  return (
    <>
      <div className="contact-jc-thq-contact20-elm thq-section-padding">
        <div className="contact-jc-thq-max-width-elm thq-section-max-width">
          {/* WhatsApp */}
          <div className="contact-jc-thq-content-elm1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="thq-icon-medium"
            >
              <path
                d="M13.17 4L18 8.83V20H6V4zM14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm-2 12c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85a6.95 6.95 0 0 0-5.56 0A2.01 2.01 0 0 0 8 17.43V18h8z"
                fill="currentColor"
              ></path>
            </svg>
            <div className="contact-jc-thq-contact-info-elm1">
              <div className="contact-jc-thq-content-elm2">
                <h3 className="contact-jc-thq-text-elm1 thq-heading-3">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="contact-jc-text12">Contact Us</span>
                    </Fragment>
                  )}
                </h3>
                <p className="contact-jc-thq-text-elm2 thq-body-large">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="contact-jc-text15">
                        WhatsApp : +94 711735735
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>

              {/* ✅ Keep same place & styling, just make clickable */}
              <span className="contact-jc-thq-email-elm1 thq-body-small">
                {/* Chat */}
                <a
                  className="contact-jc-action-link"
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.email1 ?? (
                    <Fragment>
                      <span className="contact-jc-text20">Start new chat</span>
                    </Fragment>
                  )}
                </a>

                {/* Divider */}
                <span className="contact-jc-action-divider"> · </span>

                {/* Call */}
                <a
                  className="contact-jc-action-link"
                  href="#"
                  onClick={handleWhatsAppCall}
                >
                  WhatsApp Call
                </a>
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="contact-jc-thq-content-elm3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="thq-icon-medium"
            >
              <path
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42a18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
            <div className="contact-jc-thq-contact-info-elm2">
              <div className="contact-jc-thq-content-elm4">
                <h3 className="contact-jc-thq-text-elm3 thq-heading-3">
                  {props.heading2 ?? (
                    <Fragment>
                      <span className="contact-jc-text14">Phone</span>
                    </Fragment>
                  )}
                </h3>
                <p className="contact-jc-thq-text-elm4 thq-body-large">
                  {props.content2 ?? (
                    <Fragment>
                      <span className="contact-jc-text18">{phoneNumber}</span>
                    </Fragment>
                  )}
                </p>
              </div>

              <span className="contact-jc-thq-email-elm2 thq-body-small">
                <a className="contact-jc-action-link" href={`tel:${phoneNumber}`}>
                  {props.link1 ?? (
                    <Fragment>
                      <span className="contact-jc-text16">Start Call</span>
                    </Fragment>
                  )}
                </a>
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="contact-jc-thq-content-elm5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="thq-icon-medium"
            >
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44"
                fill="currentColor"
              ></path>
            </svg>
            <div className="contact-jc-thq-contact-info-elm3">
              <div className="contact-jc-thq-content-elm6">
                <h3 className="contact-jc-thq-text-elm5 thq-heading-3">
                  {props.heading3 ?? (
                    <Fragment>
                      <span className="contact-jc-text11">Email</span>
                    </Fragment>
                  )}
                </h3>
                <p className="contact-jc-thq-text-elm6 thq-body-large">
                  {props.content3 ?? (
                    <Fragment>
                      <span className="contact-jc-text13">{emailAddress}</span>
                    </Fragment>
                  )}
                </p>
              </div>

              <span className="contact-jc-thq-phone-elm thq-body-small">
                <a
                  className="contact-jc-action-link"
                  href={`mailto:${emailAddress}`}
                >
                  {props.phone1 ?? (
                    <Fragment>
                      <span className="contact-jc-text19">New mail</span>
                    </Fragment>
                  )}
                </a>
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="contact-jc-thq-content-elm7">
            <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
              <path d="M512 0c-176.732 0-320 143.268-320 320 0 320 320 704 320 704s320-384 320-704c0-176.732-143.27-320-320-320zM512 512c-106.040 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z"></path>
            </svg>
            <div className="contact-jc-thq-contact-info-elm4">
              <div className="contact-jc-thq-content-elm8">
                <h3 className="contact-jc-thq-text-elm7 thq-heading-3">
                  {props.heading4 ?? (
                    <Fragment>
                      <span className="contact-jc-text17">Address</span>
                    </Fragment>
                  )}
                </h3>
                <p className="contact-jc-thq-content4-elm thq-body-large">
                  {props.content4 ?? (
                    <Fragment>
                      <span className="contact-jc-text21">
                        No. 99, Sunethradevi Road,
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
              <span className="contact-jc-thq-address-elm thq-body-small">
                {props.address1 ?? (
                  <Fragment>
                    <span className="contact-jc-text10">
                      Kohuwala, Srilanka.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .contact-jc-thq-contact20-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            overflow: hidden;
            position: relative;
            flex-direction: column;
          }
          .contact-jc-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .contact-jc-thq-content-elm1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            display: flex;
            flex-grow: 1;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .contact-jc-thq-contact-info-elm1 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .contact-jc-thq-content-elm2 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .contact-jc-thq-text-elm1 {
            align-self: stretch;
            text-align: center;
          }
          .contact-jc-thq-text-elm2 {
            text-align: center;
          }
          .contact-jc-thq-email-elm1 {
            text-align: center;
          }
          .contact-jc-thq-content-elm3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            display: flex;
            flex-grow: 1;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .contact-jc-thq-contact-info-elm2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .contact-jc-thq-content-elm4 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .contact-jc-thq-text-elm3 {
            align-self: stretch;
            text-align: center;
          }
          .contact-jc-thq-text-elm4 {
            text-align: center;
          }
          .contact-jc-thq-email-elm2 {
            text-align: center;
          }
          .contact-jc-thq-content-elm5 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            display: flex;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .contact-jc-thq-contact-info-elm3 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .contact-jc-thq-content-elm6 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .contact-jc-thq-text-elm5 {
            align-self: stretch;
            text-align: center;
          }
          .contact-jc-thq-text-elm6 {
            text-align: center;
          }
          .contact-jc-thq-phone-elm {
            text-align: center;
          }
          .contact-jc-thq-content-elm7 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            width: auto;
            display: flex;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .contact-jc-thq-contact-info-elm4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .contact-jc-thq-content-elm8 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .contact-jc-thq-text-elm7 {
            align-self: stretch;
            text-align: center;
          }
          .contact-jc-thq-content4-elm {
            text-align: center;
          }
          .contact-jc-thq-address-elm {
            text-align: center;
          }
          .contact-jc-text10 {
            display: inline-block;
          }
          .contact-jc-text11 {
            display: inline-block;
          }
          .contact-jc-text12 {
            display: inline-block;
          }
          .contact-jc-text13 {
            display: inline-block;
          }
          .contact-jc-text14 {
            display: inline-block;
          }
          .contact-jc-text15 {
            display: inline-block;
          }
          .contact-jc-text16 {
            display: inline-block;
          }
          .contact-jc-text17 {
            display: inline-block;
          }
          .contact-jc-text18 {
            display: inline-block;
          }
          .contact-jc-text19 {
            display: inline-block;
          }
          .contact-jc-text20 {
            display: inline-block;
          }
          .contact-jc-text21 {
            display: inline-block;
          }

          /* ✅ Hover animation for links (no layout change) */
          .contact-jc-action-link {
            color: inherit;
            text-decoration: none;
            display: inline-block;
            transition: transform 180ms ease, color 180ms ease, opacity 180ms ease;
            will-change: transform;
          }
          .contact-jc-action-link:hover {
            color: var(--dl-color-theme-primary2);
            transform: translateY(-1px);
            opacity: 0.95;
            text-decoration: underline;
            text-underline-offset: 3px;
          }

          .contact-jc-action-divider {
            opacity: 0.6;
          }

          @media (max-width: 767px) {
            .contact-jc-thq-max-width-elm {
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  )
}

ContactJC.defaultProps = {
  address1: undefined,
  heading3: undefined,
  heading1: undefined,
  content3: undefined,
  heading2: undefined,
  content1: undefined,
  link1: undefined,
  heading4: undefined,
  content2: undefined,
  phone1: undefined,
  email1: undefined,
  content4: undefined,
}

ContactJC.propTypes = {
  address1: PropTypes.element,
  heading3: PropTypes.element,
  heading1: PropTypes.element,
  content3: PropTypes.element,
  heading2: PropTypes.element,
  content1: PropTypes.element,
  link1: PropTypes.element,
  heading4: PropTypes.element,
  content2: PropTypes.element,
  phone1: PropTypes.element,
  email1: PropTypes.element,
  content4: PropTypes.element,
}

export default ContactJC
