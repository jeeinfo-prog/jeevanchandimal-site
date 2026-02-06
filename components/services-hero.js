import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ServicesHero = (props) => {
  return (
    <>
      <div className="services-hero-container1 thq-section-padding">
        <img
          alt={props.videoSrc}
          src={props.videoSrc}
          className="services-hero-image"
        />
        <div className="services-hero-thq-column-elm">
          <div className="services-hero-thq-content-elm">
            <h1 className="thq-heading-2 services-hero-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="services-hero-text1">
                    End-to-end visual production, built with cinematic intent
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="thq-body-large services-hero-thq-text-elm2">
              {props.content1 ?? (
                <Fragment>
                  <span className="services-hero-text3">
                    Cinematic films crafted with intention - from concept
                    development to final cut, built with atmosphere, rhythm, and
                    narrative clarity.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="services-hero-container2">
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="services-hero-textinput thq-input"
              />
              <div className="services-hero-container3">
                <button className="services-hero-thq-button-elm thq-button-filled">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="services-hero-text2">
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
        <video
          src={props.videoSrc}
          loop="true"
          muted="true"
          poster="https://play.teleporthq.io/static/svg/videoposter.svg"
          autoPlay="true"
          playsInline="true"
          className="services-hero-video"
        ></video>
      </div>
      <style jsx>
        {`
          .services-hero-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .services-hero-image {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .services-hero-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .services-hero-thq-content-elm {
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
          .services-hero-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .services-hero-textinput {
            width: 70%;
            background-color: transparent;
          }
          .services-hero-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .services-hero-thq-button-elm {
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
          .services-hero-video {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .services-hero-text1 {
            display: inline-block;
          }
          .services-hero-text2 {
            display: inline-block;
          }
          .services-hero-text3 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .services-hero-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .services-hero-thq-column-elm {
              width: 100%;
            }
            .services-hero-thq-text-elm1 {
              text-align: center;
            }
            .services-hero-thq-text-elm2 {
              text-align: center;
            }
            .services-hero-container2 {
              flex-direction: column;
            }
            .services-hero-textinput {
              width: 100%;
            }
            .services-hero-container3 {
              width: 100%;
            }
            .services-hero-thq-button-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .services-hero-container3 {
              width: 100%;
            }
            .services-hero-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

ServicesHero.defaultProps = {
  heading1: undefined,
  action3: undefined,
  content1: undefined,
  textinputPlaceholder: 'Create Together',
  videoSrc: '/Audio/audio%20production%2003.mov',
}

ServicesHero.propTypes = {
  heading1: PropTypes.element,
  action3: PropTypes.element,
  content1: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
  videoSrc: PropTypes.string,
}

export default ServicesHero
