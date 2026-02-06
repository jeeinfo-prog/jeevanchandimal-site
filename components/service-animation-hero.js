import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ServiceAnimationHero = (props) => {
  return (
    <>
      <div
        className={`service-animation-hero-container1 thq-section-padding ${props.rootClassName} `}
      >
        <img
          alt={props.image1Alt}
          src={props.image1Src}
          className="service-animation-hero-image"
        />
        <div className="service-animation-hero-thq-column-elm">
          <div className="service-animation-hero-thq-content-elm">
            <h1 className="thq-heading-2 service-animation-hero-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="service-animation-hero-text1">
                    Motion designed with clarity, rhythm, and intent.
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="thq-body-large service-animation-hero-thq-text-elm2">
              {props.content1 ?? (
                <Fragment>
                  <span className="service-animation-hero-text3">
                    <span>
                      Animation and movement used to support story - not
                      distract from it.
                    </span>
                    <br></br>
                  </span>
                </Fragment>
              )}
            </p>
            <div className="service-animation-hero-container2">
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="service-animation-hero-textinput thq-input"
              />
              <div className="service-animation-hero-container3">
                <button className="service-animation-hero-thq-button-elm thq-button-filled">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="service-animation-hero-text2">
                          View Motion Work
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .service-animation-hero-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .service-animation-hero-image {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .service-animation-hero-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .service-animation-hero-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            animation-name: fadeInLeft;
            flex-direction: column;
            animation-delay: 0s;
            animation-duration: 500ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-timing-function: ease;
          }
          .service-animation-hero-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .service-animation-hero-textinput {
            width: 70%;
            background-color: transparent;
          }
          .service-animation-hero-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .service-animation-hero-thq-button-elm {
            gap: var(--dl-layout-space-halfunit);
            flex: 1;
            display: flex;
            box-sizing: content-box;
            align-items: center;
            border-color: var(--dl-color-theme-primary1);
            border-style: solid;
            border-width: 1px;
            justify-content: center;
            background-color: var(--dl-color-theme-primary1);
          }
          .service-animation-hero-text1 {
            display: inline-block;
          }
          .service-animation-hero-text2 {
            display: inline-block;
          }
          .service-animation-hero-text3 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .service-animation-hero-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .service-animation-hero-thq-column-elm {
              width: 100%;
            }
            .service-animation-hero-thq-text-elm1 {
              text-align: center;
            }
            .service-animation-hero-thq-text-elm2 {
              text-align: center;
            }
            .service-animation-hero-container2 {
              flex-direction: column;
            }
            .service-animation-hero-textinput {
              width: 100%;
            }
            .service-animation-hero-container3 {
              width: 100%;
            }
            .service-animation-hero-thq-button-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .service-animation-hero-container3 {
              width: 100%;
            }
            .service-animation-hero-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

ServiceAnimationHero.defaultProps = {
  heading1: undefined,
  image1Alt: 'Professional film production equipment',
  action3: undefined,
  rootClassName: '',
  image1Src:
    'https://images.pexels.com/photos/35460400/pexels-photo-35460400.jpeg?auto=compress&cs=tinysrgb&w=1500',
  textinputPlaceholder: 'Create Together',
  content1: undefined,
}

ServiceAnimationHero.propTypes = {
  heading1: PropTypes.element,
  image1Alt: PropTypes.string,
  action3: PropTypes.element,
  rootClassName: PropTypes.string,
  image1Src: PropTypes.string,
  textinputPlaceholder: PropTypes.string,
  content1: PropTypes.element,
}

export default ServiceAnimationHero
