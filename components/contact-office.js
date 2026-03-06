import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ContactOffice = (props) => {
  return (
    <>
      <section className={`co-wrap ${props.rootClassName || ''}`}>
        <div className="co-head">
          <div className="co-kickerRow">
            <span className="co-kicker">VISIT</span>
            <span className="co-line" />
          </div>

          <h2 className="co-title thq-heading-2">
            {props.heading1 ?? (
              <Fragment>
                <span className="contact-office-text1">Contact Us</span>
              </Fragment>
            )}
          </h2>

          <p className="co-copy thq-body-large">
            {props.content1 ?? (
              <Fragment>
                <span className="contact-office-text2">
                  For inquiries and appointments, please visit us at our headquarters.
                </span>
              </Fragment>
            )}
          </p>
        </div>

        <div className="co-gallery">
          <div className="co-imageCard">
            <img src={props.image1Src} alt={props.image1Alt} className="co-image" />
          </div>
          <div className="co-imageCard">
            <img src={props.image2Src} alt={props.image2Alt} className="co-image" />
          </div>
        </div>

        <div className="co-locations">
          <article className="co-locationCard">
            <span className="co-badge">Office</span>

            <h3 className="co-locationTitle thq-heading-3">
              {props.location1 ?? (
                <Fragment>
                  <span className="contact-office-text3">Office</span>
                </Fragment>
              )}
            </h3>

            <p className="co-locationCopy thq-body-large">
              {props.location1Description ?? (
                <Fragment>
                  <span className="contact-office-text4">No. 99, Sunethradevi Road,</span>
                </Fragment>
              )}
            </p>
          </article>

          <article className="co-locationCard">
            <span className="co-badge">Studio</span>

            <h3 className="co-locationTitle thq-heading-3">
              {props.location2 ?? (
                <Fragment>
                  <span className="contact-office-text5">Studio</span>
                </Fragment>
              )}
            </h3>

            <p className="co-locationCopy thq-body-large">
              {props.location2Description ?? (
                <Fragment>
                  <span className="contact-office-text6">
                    No. 99, Sunethradevi Road, Kohuwala, Sri Lanka.
                  </span>
                </Fragment>
              )}
            </p>
          </article>
        </div>
      </section>

      <style jsx>{`
        .co-wrap {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .co-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }

        .co-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .co-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .co-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(245, 244, 244, 0.18), rgba(245, 244, 244, 0));
        }

        .co-title {
          margin: 0;
          color: #f5f4f4;
          line-height: 1.1;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .co-copy {
          margin: 0;
          color: rgba(245, 244, 244, 0.82);
          line-height: 1.8;
          max-width: 62ch;
        }

        .co-gallery {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .co-imageCard {
          position: relative;
          overflow: hidden;
          min-height: 280px;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(255, 255, 255, 0.02);
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.28);
        }

        .co-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 320ms ease, filter 320ms ease;
        }

        .co-imageCard:hover .co-image {
          transform: scale(1.03);
          filter: contrast(1.03) saturate(1.04);
        }

        .co-locations {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .co-locationCard {
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.015));
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.28);
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .co-badge {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          padding: 8px 10px;
          border-radius: 999px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #25c3e2;
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.18), rgba(37, 195, 226, 0.06));
          border: 1px solid rgba(37, 195, 226, 0.18);
        }

        .co-locationTitle {
          margin: 0;
          color: #f5f4f4;
        }

        .co-locationCopy {
          margin: 0;
          color: rgba(245, 244, 244, 0.82);
          line-height: 1.8;
        }

        .contact-office-text1,
        .contact-office-text2,
        .contact-office-text3,
        .contact-office-text4,
        .contact-office-text5,
        .contact-office-text6 {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .co-line {
            display: none;
          }

          .co-gallery,
          .co-locations {
            grid-template-columns: 1fr;
          }

          .co-imageCard {
            min-height: 220px;
            border-radius: 18px;
          }

          .co-locationCard {
            border-radius: 18px;
          }
        }
      `}</style>
    </>
  )
}

ContactOffice.defaultProps = {
  heading1: undefined,
  content1: undefined,
  location1: undefined,
  location2: undefined,
  location1Description: undefined,
  location2Description: undefined,
  rootClassName: '',
  image1Src: '/contact/contact-office-01.jpg',
  image1Alt: 'Office interior',
  image2Src: '/contact/contact-office-02.jpg',
  image2Alt: 'Studio interior',
}

ContactOffice.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  location1: PropTypes.element,
  location2: PropTypes.element,
  location1Description: PropTypes.element,
  location2Description: PropTypes.element,
  rootClassName: PropTypes.string,
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
  image2Src: PropTypes.string,
  image2Alt: PropTypes.string,
}

export default ContactOffice