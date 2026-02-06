import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ContactOffice = (props) => {
  return (
    <>
      <div className="contact-office-container1 thq-section-padding">
        <div className="contact-office-thq-max-width-elm thq-section-max-width">
          <div className="contact-office-thq-content-elm1 thq-flex-row">
            <div className="contact-office-thq-content-elm2">
              <h2 className="thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="contact-office-text17">Contact Us</span>
                  </Fragment>
                )}
              </h2>
              <p className="thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="contact-office-text16">
                      For inquiries and appointments, please visit us at our
                      headquarters.
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
          </div>
          <div className="contact-office-thq-content-elm3 thq-flex-row">
            <div className="contact-office-container2">
              <img
                alt={props.location1ImgAlt}
                src={props.location1ImgSrc}
                className="contact-office-image1 thq-img-ratio-16-9"
              />
              <h3 className="contact-office-text10 thq-heading-3">
                {props.location1 ?? (
                  <Fragment>
                    <span className="contact-office-text15">Headquarters</span>
                  </Fragment>
                )}
              </h3>
              <p className="thq-body-large">
                {props.location1Description ?? (
                  <Fragment>
                    <span className="contact-office-text18">
                      No. 99, Sunethradevi Road, Kohuwala, Sri Lanka.
                    </span>
                  </Fragment>
                )}
              </p>
              <div className="contact-office-container3">
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="thq-body-small thq-button-flat"
                >
                  Get directions
                </a>
              </div>
            </div>
            <div className="contact-office-container4">
              <img
                alt={props.location2ImgAlt}
                src={props.location2ImgSrc}
                className="contact-office-image2 thq-img-ratio-16-9"
              />
              <h3 className="contact-office-text12 thq-heading-3">
                {props.location2 ?? (
                  <Fragment>
                    <span className="contact-office-text14">Studio</span>
                  </Fragment>
                )}
              </h3>
              <p className="thq-body-large">
                {props.location2Description ?? (
                  <Fragment>
                    <span className="contact-office-text19">
                      No. 99, Sunethradevi Road, Kohuwala, Sri Lanka.
                    </span>
                  </Fragment>
                )}
              </p>
              <div className="contact-office-container5">
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="thq-body-small thq-button-flat"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .contact-office-container1 {
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .contact-office-thq-max-width-elm {
            align-self: center;
          }
          .contact-office-thq-content-elm1 {
            width: 100%;
            margin-bottom: var(--dl-layout-space-threeunits);
            justify-content: center;
          }
          .contact-office-thq-content-elm2 {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .contact-office-thq-content-elm3 {
            width: 100%;
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
          }
          .contact-office-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .contact-office-image1 {
            object-fit: cover;
          }
          .contact-office-text10 {
            text-align: center;
          }
          .contact-office-container3 {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          }
          .contact-office-container4 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .contact-office-image2 {
            object-fit: cover;
            object-position: bottom;
          }
          .contact-office-text12 {
            text-align: center;
          }
          .contact-office-container5 {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          }
          .contact-office-text14 {
            display: inline-block;
          }
          .contact-office-text15 {
            display: inline-block;
          }
          .contact-office-text16 {
            display: inline-block;
          }
          .contact-office-text17 {
            display: inline-block;
          }
          .contact-office-text18 {
            display: inline-block;
          }
          .contact-office-text19 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .contact-office-thq-content-elm3 {
              align-items: center;
              flex-direction: column;
            }
          }
          @media (max-width: 767px) {
            .contact-office-thq-content-elm1 {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .contact-office-image1 {
              width: 100%;
            }
            .contact-office-image2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

ContactOffice.defaultProps = {
  location2: undefined,
  location1: undefined,
  location2ImgAlt: 'Studio Image',
  location1ImgAlt: 'Headquarters Image',
  location2ImgSrc: '/Audio/Studio/46761_107423292651247_2063467_n-1400w.jpg',
  content1: undefined,
  heading1: undefined,
  location1Description: undefined,
  location1ImgSrc:
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fG9mZmljZXxlbnwwfHx8fDE3Njk0NTYxNjZ8MA&ixlib=rb-4.1.0&w=1400',
  location2Description: undefined,
}

ContactOffice.propTypes = {
  location2: PropTypes.element,
  location1: PropTypes.element,
  location2ImgAlt: PropTypes.string,
  location1ImgAlt: PropTypes.string,
  location2ImgSrc: PropTypes.string,
  content1: PropTypes.element,
  heading1: PropTypes.element,
  location1Description: PropTypes.element,
  location1ImgSrc: PropTypes.string,
  location2Description: PropTypes.element,
}

export default ContactOffice
