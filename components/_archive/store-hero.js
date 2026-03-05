import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const StoreHero = (props) => {
  return (
    <>
      <div className="store-hero-container1 thq-section-padding">
        <img
          alt={props.image1Alt}
          src={props.image1Src}
          className="store-hero-image"
        />
        <div className="store-hero-thq-column-elm">
          <div className="store-hero-thq-content-elm">
            <h1 className="thq-heading-2 store-hero-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="store-hero-text3">
                    Cinematic imagery, available for licensing.
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="thq-body-large store-hero-thq-text-elm2">
              {props.content1 ?? (
                <Fragment>
                  <span className="store-hero-text2">
                    A curated collection of photographs created with atmosphere,
                    restraint, and cinematic intent — available for creative use
                    through individual licensing or membership access.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="store-hero-container2">
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="store-hero-textinput thq-input"
              />
              <div className="store-hero-container3">
                <button className="store-hero-thq-button-elm thq-button-filled">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="store-hero-text1">Contact us</span>
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
          .store-hero-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .store-hero-image {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .store-hero-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .store-hero-thq-content-elm {
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
          .store-hero-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .store-hero-textinput {
            width: 70%;
            background-color: transparent;
          }
          .store-hero-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .store-hero-thq-button-elm {
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
          .store-hero-text1 {
            display: inline-block;
          }
          .store-hero-text2 {
            display: inline-block;
          }
          .store-hero-text3 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .store-hero-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .store-hero-thq-column-elm {
              width: 100%;
            }
            .store-hero-thq-text-elm1 {
              text-align: center;
            }
            .store-hero-thq-text-elm2 {
              text-align: center;
            }
            .store-hero-container2 {
              flex-direction: column;
            }
            .store-hero-textinput {
              width: 100%;
            }
            .store-hero-container3 {
              width: 100%;
            }
            .store-hero-thq-button-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .store-hero-container3 {
              width: 100%;
            }
            .store-hero-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

StoreHero.defaultProps = {
  textinputPlaceholder: 'Enter your email',
  action3: undefined,
  image1Src:
    '/Photography/B&W/wild%20elephant%20-%20senanayake%20samudraya%20ampara%2C%20sri%20lanka.-1100h.jpg',
  content1: undefined,
  image1Alt: 'Film camera icon',
  heading1: undefined,
}

StoreHero.propTypes = {
  textinputPlaceholder: PropTypes.string,
  action3: PropTypes.element,
  image1Src: PropTypes.string,
  content1: PropTypes.element,
  image1Alt: PropTypes.string,
  heading1: PropTypes.element,
}

export default StoreHero
