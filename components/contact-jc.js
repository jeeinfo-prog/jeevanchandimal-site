import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ContactJC = (props) => {
  const whatsappNumber = '94711735735'
  const phoneNumber = '+94769771394'
  const emailAddress = 'info@jeevanchandimal.com'

  const handleWhatsAppCall = (e) => {
    e.preventDefault()
    if (typeof window === 'undefined') return

    const scheme = `whatsapp://call?phone=${encodeURIComponent('+94 711735735')}`
    const fallback = `https://wa.me/${whatsappNumber}`

    window.location.href = scheme

    setTimeout(() => {
      window.location.href = fallback
    }, 700)
  }

  return (
    <>
      <section className={`cjc-wrap ${props.rootClassName || ''}`}>
        <div className="cjc-head">
          <div className="cjc-kickerRow">
            <span className="cjc-kicker">DIRECT CONTACT</span>
            <span className="cjc-line" />
          </div>

          <h2 className="cjc-title thq-heading-2">
            {props.heading1 ?? (
              <Fragment>
                <span className="contact-jc-text1">Contact Us</span>
              </Fragment>
            )}
          </h2>
        </div>

        <div className="cjc-grid">
          {/* WhatsApp / Contact */}
          <article className="cjc-card">
            <div className="cjc-iconWrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="cjc-svgIcon">
                <path
                  d="M13.17 4L18 8.83V20H6V4zM14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm-2 12c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85a6.95 6.95 0 0 0-5.56 0A2.01 2.01 0 0 0 8 17.43V18h8z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <h3 className="cjc-cardTitle thq-heading-3">Contact</h3>

            <p className="cjc-main thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="contact-jc-text2">WhatsApp : +94 711735735</span>
                </Fragment>
              )}
            </p>

            <div className="cjc-actions">
              <a
                className="cjc-actionLink thq-body-small"
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.email1 ?? (
                  <Fragment>
                    <span className="contact-jc-text3">Start new chat</span>
                  </Fragment>
                )}
              </a>

              <a
                className="cjc-actionLink thq-body-small"
                href="#"
                onClick={handleWhatsAppCall}
              >
                {props.link1 ?? (
                  <Fragment>
                    <span className="contact-jc-text4">WhatsApp Call</span>
                  </Fragment>
                )}
              </a>
            </div>
          </article>

          {/* Phone */}
          <article className="cjc-card">
            <div className="cjc-iconWrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="cjc-svgIcon">
                <path
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42a18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>

            <h3 className="cjc-cardTitle thq-heading-3">
              {props.heading2 ?? (
                <Fragment>
                  <span className="contact-jc-text5">Phone</span>
                </Fragment>
              )}
            </h3>

            <p className="cjc-main thq-body-large">
              {props.content2 ?? (
                <Fragment>
                  <span className="contact-jc-text6">{phoneNumber}</span>
                </Fragment>
              )}
            </p>

            <div className="cjc-actions">
              <a className="cjc-actionLink thq-body-small" href={`tel:${phoneNumber}`}>
                {props.link1 ?? (
                  <Fragment>
                    <span className="contact-jc-text7">Start Call</span>
                  </Fragment>
                )}
              </a>
            </div>
          </article>

          {/* Email */}
          <article className="cjc-card">
            <div className="cjc-iconWrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="cjc-svgIcon">
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44"
                  fill="currentColor"
                />
              </svg>
            </div>

            <h3 className="cjc-cardTitle thq-heading-3">
              {props.heading3 ?? (
                <Fragment>
                  <span className="contact-jc-text8">Email</span>
                </Fragment>
              )}
            </h3>

            <p className="cjc-main thq-body-large">
              {props.content3 ?? (
                <Fragment>
                  <span className="contact-jc-text9">{emailAddress}</span>
                </Fragment>
              )}
            </p>

            <div className="cjc-actions">
              <a className="cjc-actionLink thq-body-small" href={`mailto:${emailAddress}`}>
                {props.phone1 ?? (
                  <Fragment>
                    <span className="contact-jc-text10">New mail</span>
                  </Fragment>
                )}
              </a>
            </div>
          </article>

          {/* Address */}
          <article className="cjc-card">
            <div className="cjc-iconWrap" aria-hidden="true">
              <svg viewBox="0 0 1024 1024" className="cjc-svgIcon">
                <path d="M512 0c-176.732 0-320 143.268-320 320 0 320 320 704 320 704s320-384 320-704c0-176.732-143.27-320-320-320zM512 512c-106.040 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z" />
              </svg>
            </div>

            <h3 className="cjc-cardTitle thq-heading-3">
              {props.heading4 ?? (
                <Fragment>
                  <span className="contact-jc-text11">Address</span>
                </Fragment>
              )}
            </h3>

            <p className="cjc-main thq-body-large">
              {props.content4 ?? (
                <Fragment>
                  <span className="contact-jc-text12">No. 99, Sunethradevi Road,</span>
                </Fragment>
              )}
            </p>

            <div className="cjc-actions">
              <span className="cjc-actionStatic thq-body-small">
                {props.address1 ?? (
                  <Fragment>
                    <span className="contact-jc-text13">Kohuwala, Srilanka.</span>
                  </Fragment>
                )}
              </span>
            </div>
          </article>
        </div>
      </section>

      <style jsx>{`
        .cjc-wrap {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cjc-head {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          text-align: center;
        }

        .cjc-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .cjc-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .cjc-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(245, 244, 244, 0.18), rgba(245, 244, 244, 0));
        }

        .cjc-title {
          margin: 0;
          color: #f5f4f4;
          line-height: 1.1;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .cjc-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .cjc-card {
          min-height: 260px;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.03),
            rgba(255, 255, 255, 0.015)
          );
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.28);
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .cjc-card:hover {
          transform: translateY(-2px);
          border-color: rgba(37, 195, 226, 0.18);
          box-shadow: 0 20px 54px rgba(0, 0, 0, 0.34);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.04),
            rgba(37, 195, 226, 0.02)
          );
        }

        .cjc-iconWrap {
          width: 60px;
          height: 60px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
          color: #f5f4f4;
        }

        .cjc-svgIcon {
          width: 24px;
          height: 24px;
          display: block;
          fill: currentColor;
        }

        .cjc-cardTitle {
          margin: 0;
          color: #f5f4f4;
        }

        .cjc-main {
          margin: 0;
          color: rgba(245, 244, 244, 0.9);
          line-height: 1.7;
        }

        .cjc-actions {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }

        .cjc-actionLink,
        .cjc-actionStatic {
          color: rgba(245, 244, 244, 0.62);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .cjc-actionLink {
          text-decoration: none;
          transition: transform 180ms ease, color 180ms ease, opacity 180ms ease;
          will-change: transform;
        }

        .cjc-actionLink:hover {
          color: #25c3e2;
          transform: translateY(-1px);
          opacity: 0.95;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .contact-jc-text1,
        .contact-jc-text2,
        .contact-jc-text3,
        .contact-jc-text4,
        .contact-jc-text5,
        .contact-jc-text6,
        .contact-jc-text7,
        .contact-jc-text8,
        .contact-jc-text9,
        .contact-jc-text10,
        .contact-jc-text11,
        .contact-jc-text12,
        .contact-jc-text13 {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .cjc-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .cjc-line {
            display: none;
          }

          .cjc-grid {
            grid-template-columns: 1fr;
          }

          .cjc-card {
            min-height: auto;
          }
        }
      `}</style>
    </>
  )
}

ContactJC.defaultProps = {
  heading1: undefined,
  heading2: undefined,
  heading3: undefined,
  heading4: undefined,
  content1: undefined,
  content2: undefined,
  content3: undefined,
  content4: undefined,
  link1: undefined,
  email1: undefined,
  phone1: undefined,
  address1: undefined,
  rootClassName: '',
}

ContactJC.propTypes = {
  heading1: PropTypes.element,
  heading2: PropTypes.element,
  heading3: PropTypes.element,
  heading4: PropTypes.element,
  content1: PropTypes.element,
  content2: PropTypes.element,
  content3: PropTypes.element,
  content4: PropTypes.element,
  link1: PropTypes.element,
  email1: PropTypes.element,
  phone1: PropTypes.element,
  address1: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default ContactJC