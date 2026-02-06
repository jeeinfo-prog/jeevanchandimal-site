import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const HomePageHero = (props) => {
  return (
    <>
      <div className="home-page-hero-container1 thq-section-padding">
        <img
          alt={props.image1Alt}
          src={props.image1Src}
          className="home-page-hero-image"
        />
        <div className="home-page-hero-thq-column-elm">
          <div className="home-page-hero-thq-content-elm">
            <h1 className="thq-heading-2 home-page-hero-thq-text-elm1">
              {props.heading1 ?? (
                <Fragment>
                  <span className="home-page-hero-text1">Jeevan Chandimal</span>
                </Fragment>
              )}
            </h1>
            <h1 className="home-page-hero-thq-text-elm2 thq-heading-3">
              {props.heading11 ?? (
                <Fragment>
                  <span className="home-page-hero-text4">
                    Filmmaker · Visual Storyteller
                  </span>
                </Fragment>
              )}
            </h1>
            <p className="thq-body-large home-page-hero-thq-text-elm3">
              {props.content1 ?? (
                <Fragment>
                  <span className="home-page-hero-text2">
                    Where image, motion, and sound become atmosphere.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="home-page-hero-container2">
              <input
                type="email"
                placeholder={props.textinputPlaceholder}
                className="home-page-hero-textinput thq-input"
              />
              <div className="home-page-hero-container3">
                <button className="home-page-hero-thq-button-elm thq-button-filled">
                  <span className="thq-body-small">
                    {props.action3 ?? (
                      <Fragment>
                        <span className="home-page-hero-text3">
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
          .home-page-hero-container1 {
            width: 100%;
            height: 1015px;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: row;
          }
          .home-page-hero-image {
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            height: 100%;
            margin: auto;
            position: absolute;
            object-fit: cover;
          }
          .home-page-hero-thq-column-elm {
            gap: 24px;
            width: auto;
            display: flex;
            z-index: 1;
            max-width: 560px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .home-page-hero-thq-content-elm {
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
          .home-page-hero-thq-text-elm2 {
            fill: var(--dl-color-theme-primary1);
            color: var(--dl-color-theme-primary1);
          }
          .home-page-hero-container2 {
            gap: var(--dl-layout-space-oneandhalfunits);
            flex: 0 0 auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
          }
          .home-page-hero-textinput {
            width: 70%;
            background-color: transparent;
          }
          .home-page-hero-container3 {
            flex: 1;
            display: flex;
            align-items: flex-start;
          }
          .home-page-hero-thq-button-elm {
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
          .home-page-hero-text1 {
            display: inline-block;
          }
          .home-page-hero-text2 {
            display: inline-block;
          }
          .home-page-hero-text3 {
            display: inline-block;
          }
          .home-page-hero-text4 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .home-page-hero-thq-column-elm {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .home-page-hero-thq-column-elm {
              width: 100%;
            }
            .home-page-hero-thq-text-elm1 {
              text-align: center;
            }
            .home-page-hero-thq-text-elm2 {
              text-align: center;
            }
            .home-page-hero-thq-text-elm3 {
              text-align: center;
            }
            .home-page-hero-container2 {
              flex-direction: column;
            }
            .home-page-hero-textinput {
              width: 100%;
            }
            .home-page-hero-container3 {
              width: 100%;
            }
            .home-page-hero-thq-button-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .home-page-hero-container3 {
              width: 100%;
            }
            .home-page-hero-thq-button-elm {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

HomePageHero.defaultProps = {
  textinputPlaceholder: 'Create Together',
  image1Alt: 'Professional film production',
  heading1: undefined,
  content1: undefined,
  action3: undefined,
  heading11: undefined,
  image1Src: '/JC/jeevan-chandimal-1100h.jpg',
}

HomePageHero.propTypes = {
  textinputPlaceholder: PropTypes.string,
  image1Alt: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  action3: PropTypes.element,
  heading11: PropTypes.element,
  image1Src: PropTypes.string,
}

export default HomePageHero
