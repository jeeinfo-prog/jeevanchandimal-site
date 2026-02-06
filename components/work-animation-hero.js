import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkAnimationHero = (props) => {
  return (
    <>
      <div
        className={`work-animation-hero-container1 thq-section-padding ${props.rootClassName} `}
      >
        <video
          src={props.videoSrc}
          loop="true"
          muted="true"
          poster="https://play.teleporthq.io/static/svg/videoposter.svg"
          autoPlay="true"
          playsInline="true"
          className="work-animation-hero-video"
        ></video>
        <div className="work-animation-hero-thq-column-elm">
          <div className="work-animation-hero-thq-content-elm">
            <h1 className="thq-heading-2 work-animation-hero-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="work-animation-hero-text2">
                    Motion created with clarity, rhythm, and purpose.
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="thq-body-large work-animation-hero-thq-text-elm2">
              {props.content1 ?? (
                <Fragment>
                  <span className="work-animation-hero-text1">
                    Animation and movement used to enhance visual storytelling.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="work-animation-hero-container2">
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="work-animation-hero-textinput thq-input"
              />
              <div className="work-animation-hero-container3">
                <button className="work-animation-hero-thq-button-elm thq-button-filled">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="work-animation-hero-text3">
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
          .work-animation-hero-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .work-animation-hero-video {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .work-animation-hero-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-animation-hero-thq-content-elm {
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
          .work-animation-hero-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .work-animation-hero-textinput {
            width: 70%;
            background-color: transparent;
          }
          .work-animation-hero-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .work-animation-hero-thq-button-elm {
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
          .work-animation-hero-text1 {
            display: inline-block;
          }
          .work-animation-hero-text2 {
            display: inline-block;
          }
          .work-animation-hero-text3 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .work-animation-hero-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .work-animation-hero-thq-column-elm {
              width: 100%;
            }
            .work-animation-hero-thq-text-elm1 {
              text-align: center;
            }
            .work-animation-hero-thq-text-elm2 {
              text-align: center;
            }
            .work-animation-hero-container2 {
              flex-direction: column;
            }
            .work-animation-hero-textinput {
              width: 100%;
            }
            .work-animation-hero-container3 {
              width: 100%;
            }
            .work-animation-hero-thq-button-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .work-animation-hero-container3 {
              width: 100%;
            }
            .work-animation-hero-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

WorkAnimationHero.defaultProps = {
  videoSrc: '/Audio/audio%20production%2003.mov',
  content1: undefined,
  heading1: undefined,
  textinputPlaceholder: 'Create together',
  rootClassName: '',
  action3: undefined,
}

WorkAnimationHero.propTypes = {
  videoSrc: PropTypes.string,
  content1: PropTypes.element,
  heading1: PropTypes.element,
  textinputPlaceholder: PropTypes.string,
  rootClassName: PropTypes.string,
  action3: PropTypes.element,
}

export default WorkAnimationHero
