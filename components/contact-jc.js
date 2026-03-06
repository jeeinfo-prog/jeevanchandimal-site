import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ContactJC = (props) => {
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
          <article className="cjc-card">
            <div className="cjc-iconWrap" aria-hidden="true">
              <span className="cjc-icon">✦</span>
            </div>

            <h3 className="cjc-cardTitle thq-heading-3">Contact</h3>

            <p className="cjc-main thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="contact-jc-text2">Watsapp :+94 711735735</span>
                </Fragment>
              )}
            </p>

            <div className="cjc-actions">
              <span className="cjc-action thq-body-small">
                {props.email1 ?? (
                  <Fragment>
                    <span className="contact-jc-text3">Start new chat</span>
                  </Fragment>
                )}
              </span>

              <span className="cjc-action thq-body-small">
                {props.link1 ?? (
                  <Fragment>
                    <span className="contact-jc-text4">Start Call</span>
                  </Fragment>
                )}
              </span>
            </div>
          </article>

          <article className="cjc-card">
            <div className="cjc-iconWrap" aria-hidden="true">
              <span className="cjc-icon">✆</span>
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
                  <span className="contact-jc-text6">+94 769771394</span>
                </Fragment>
              )}
            </p>

            <div className="cjc-actions">
              <span className="cjc-action thq-body-small">
                {props.phone1 ?? (
                  <Fragment>
                    <span className="contact-jc-text7">Start Call</span>
                  </Fragment>
                )}
              </span>
            </div>
          </article>

          <article className="cjc-card">
            <div className="cjc-iconWrap" aria-hidden="true">
              <span className="cjc-icon">✉</span>
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
                  <span className="contact-jc-text9">info@jeevanchandimal.com</span>
                </Fragment>
              )}
            </p>

            <div className="cjc-actions">
              <span className="cjc-action thq-body-small">
                {props.phone1 ?? (
                  <Fragment>
                    <span className="contact-jc-text10">New mail</span>
                  </Fragment>
                )}
              </span>
            </div>
          </article>

          <article className="cjc-card">
            <div className="cjc-iconWrap" aria-hidden="true">
              <span className="cjc-icon">⌖</span>
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
              <span className="cjc-action thq-body-small">
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
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.015));
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.28);
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease,
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
        }

        .cjc-icon {
          color: #f5f4f4;
          font-size: 24px;
          line-height: 1;
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

        .cjc-action {
          color: rgba(245, 244, 244, 0.62);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 12px;
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