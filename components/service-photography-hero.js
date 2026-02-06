import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ServicePhotographyHero = (props) => {
  return (
    <>
      <div
        className={`service-photography-hero-container1 thq-section-padding ${props.rootClassName} `}
      >
        <video
          src={props.videoSrc}
          loop="true"
          muted="true"
          poster="https://play.teleporthq.io/static/svg/videoposter.svg"
          autoPlay="true"
          playsInline="true"
          className="service-photography-hero-video"
        ></video>
        <div className="service-photography-hero-thq-column-elm">
          <div className="service-photography-hero-thq-content-elm">
            <h1 className="thq-heading-2 service-photography-hero-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="service-photography-hero-text3">
                    <span>
                      Still imagery shaped by light, mood, and atmosphere.
                    </span>
                    <br></br>
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="thq-body-large service-photography-hero-thq-text-elm2">
              {props.content1 ?? (
                <Fragment>
                  <span className="service-photography-hero-text2">
                    Photography approached as storytelling - crafted with
                    cinematic intent and emotional clarity.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="service-photography-hero-container2">
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="service-photography-hero-textinput thq-input"
              />
              <div className="service-photography-hero-container3">
                <button className="service-photography-hero-thq-button-elm thq-button-filled">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="service-photography-hero-text1">
                          Explore Work
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
          .service-photography-hero-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .service-photography-hero-video {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            position: absolute;
            object-fit: cover;
          }
          .service-photography-hero-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .service-photography-hero-thq-content-elm {
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
          .service-photography-hero-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .service-photography-hero-textinput {
            width: 70%;
            background-color: transparent;
          }
          .service-photography-hero-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .service-photography-hero-thq-button-elm {
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
          .service-photography-hero-text1 {
            display: inline-block;
          }
          .service-photography-hero-text2 {
            display: inline-block;
          }
          .service-photography-hero-text3 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .service-photography-hero-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .service-photography-hero-thq-column-elm {
              width: 100%;
            }
            .service-photography-hero-thq-text-elm1 {
              text-align: center;
            }
            .service-photography-hero-thq-text-elm2 {
              text-align: center;
            }
            .service-photography-hero-container2 {
              flex-direction: column;
            }
            .service-photography-hero-textinput {
              width: 100%;
            }
            .service-photography-hero-container3 {
              width: 100%;
            }
            .service-photography-hero-thq-button-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .service-photography-hero-container3 {
              width: 100%;
            }
            .service-photography-hero-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

ServicePhotographyHero.defaultProps = {
  action3: undefined,
  videoSrc: '/Photography/Video/photography%2001.mov',
  content1: undefined,
  rootClassName: '',
  heading1: undefined,
  textinputPlaceholder: 'Create Together',
}

ServicePhotographyHero.propTypes = {
  action3: PropTypes.element,
  videoSrc: PropTypes.string,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
}

export default ServicePhotographyHero
