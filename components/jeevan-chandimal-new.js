import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const JeevanChandimalNew = (props) => {
  return (
    <>
      <div
        className={`jeevan-chandimal-new-container1 thq-section-padding ${props.rootClassName} `}
      >
        <img
          alt={props.image1Alt}
          src={props.image1Src}
          className="jeevan-chandimal-new-image"
        />
        <div className="jeevan-chandimal-new-thq-column-elm">
          <div className="jeevan-chandimal-new-thq-content-elm">
            <h1 className="thq-heading-1 jeevan-chandimal-new-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="jeevan-chandimal-new-text4">
                    Jeevan Chandimal
                  </span>
                </Fragment>
              )}
            </h1>
            <h1 className="jeevan-chandimal-new-thq-text-elm2 thq-heading-2">
              {props.heading11 ?? (
                <Fragment>
                  <span className="jeevan-chandimal-new-text2">
                    Filmmaker · Visual Storyteller
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="thq-body-large jeevan-chandimal-new-thq-text-elm3">
              {props.content1 ?? (
                <Fragment>
                  <span className="jeevan-chandimal-new-text1">
                    Where image, motion, and sound become atmosphere.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="jeevan-chandimal-new-container2">
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="jeevan-chandimal-new-textinput thq-input"
              />
              <div className="jeevan-chandimal-new-container3">
                <button className="jeevan-chandimal-new-thq-button-elm thq-button-filled">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="jeevan-chandimal-new-text3">
                          Get Started
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
          .jeevan-chandimal-new-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .jeevan-chandimal-new-image {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .jeevan-chandimal-new-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .jeevan-chandimal-new-thq-content-elm {
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
          .jeevan-chandimal-new-thq-text-elm2 {
            fill: var(--dl-color-theme-primary1);
            color: var(--dl-color-theme-primary1);
          }
          .jeevan-chandimal-new-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: none;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .jeevan-chandimal-new-textinput {
            width: 70%;
            background-color: transparent;
          }
          .jeevan-chandimal-new-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .jeevan-chandimal-new-thq-button-elm {
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
          .jeevan-chandimal-new-text1 {
            display: inline-block;
          }
          .jeevan-chandimal-new-text2 {
            display: inline-block;
          }
          .jeevan-chandimal-new-text3 {
            display: inline-block;
          }
          .jeevan-chandimal-new-text4 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .jeevan-chandimal-new-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .jeevan-chandimal-new-thq-column-elm {
              width: 100%;
            }
            .jeevan-chandimal-new-thq-text-elm1 {
              text-align: center;
            }
            .jeevan-chandimal-new-thq-text-elm2 {
              text-align: center;
            }
            .jeevan-chandimal-new-thq-text-elm3 {
              text-align: center;
            }
            .jeevan-chandimal-new-container2 {
              flex-direction: column;
            }
            .jeevan-chandimal-new-textinput {
              width: 100%;
            }
            .jeevan-chandimal-new-container3 {
              width: 100%;
            }
            .jeevan-chandimal-new-thq-button-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .jeevan-chandimal-new-container3 {
              width: 100%;
            }
            .jeevan-chandimal-new-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

JeevanChandimalNew.defaultProps = {
  textinputPlaceholder: 'Enter your email to get started',
  content1: undefined,
  heading11: undefined,
  rootClassName: '',
  image1Alt: 'Film Production Image',
  action3: undefined,
  image1Src: '/JC/jeevan-chandimal-1100h.jpg',
  heading1: undefined,
}

JeevanChandimalNew.propTypes = {
  textinputPlaceholder: PropTypes.string,
  content1: PropTypes.element,
  heading11: PropTypes.element,
  rootClassName: PropTypes.string,
  image1Alt: PropTypes.string,
  action3: PropTypes.element,
  image1Src: PropTypes.string,
  heading1: PropTypes.element,
}

export default JeevanChandimalNew
