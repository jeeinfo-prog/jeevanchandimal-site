import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const ServiceAudioHero = (props) => {
  return (
    <>
      <div
        className={`service-audio-hero-container1 thq-section-padding ${props.rootClassName} `}
      >
        <video
          src={props.videoSrc}
          loop="true"
          muted="true"
          poster="https://play.teleporthq.io/static/svg/videoposter.svg"
          autoPlay="true"
          playsInline="true"
          className="service-audio-hero-video"
        ></video>
        <div className="service-audio-hero-thq-column-elm">
          <div className="service-audio-hero-thq-content-elm">
            <h1 className="thq-heading-2 service-audio-hero-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="service-audio-hero-text1">
                    <span>Sound designed to deepen emotion and presence.</span>
                    <br></br>
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="thq-body-large service-audio-hero-thq-text-elm2">
              {props.content1 ?? (
                <Fragment>
                  <span className="service-audio-hero-text5">
                    <span>
                      Audio treated as a storytelling layer - not an
                      afterthought.
                    </span>
                    <br></br>
                  </span>
                </Fragment>
              )}
            </p>
            <div className="service-audio-hero-container2">
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="service-audio-hero-textinput thq-input"
              />
              <div className="service-audio-hero-container3">
                <button className="service-audio-hero-thq-button-elm thq-button-filled">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="service-audio-hero-text4">
                          Listen to Work
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
          .service-audio-hero-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .service-audio-hero-video {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .service-audio-hero-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .service-audio-hero-thq-content-elm {
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
          .service-audio-hero-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .service-audio-hero-textinput {
            width: 70%;
            background-color: transparent;
          }
          .service-audio-hero-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .service-audio-hero-thq-button-elm {
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
          .service-audio-hero-text1 {
            display: inline-block;
          }
          .service-audio-hero-text4 {
            display: inline-block;
          }
          .service-audio-hero-text5 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .service-audio-hero-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .service-audio-hero-thq-column-elm {
              width: 100%;
            }
            .service-audio-hero-thq-text-elm1 {
              text-align: center;
            }
            .service-audio-hero-thq-text-elm2 {
              text-align: center;
            }
            .service-audio-hero-container2 {
              flex-direction: column;
            }
            .service-audio-hero-textinput {
              width: 100%;
            }
            .service-audio-hero-container3 {
              width: 100%;
            }
            .service-audio-hero-thq-button-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .service-audio-hero-container3 {
              width: 100%;
            }
            .service-audio-hero-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

ServiceAudioHero.defaultProps = {
  heading1: undefined,
  videoSrc: '/Audio/audio%20production%2003.mov',
  action3: undefined,
  textinputPlaceholder: 'Create Together',
  content1: undefined,
  rootClassName: '',
}

ServiceAudioHero.propTypes = {
  heading1: PropTypes.element,
  videoSrc: PropTypes.string,
  action3: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default ServiceAudioHero
