import React, { Fragment } from 'react'
import Link from 'next/link'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const HomeWork01 = (props) => {
  return (
    <>
      <div
        className={`home-work-01-thq-layout301-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="home-work-01-thq-max-width-elm thq-section-max-width">
          <div className="home-work-01-thq-row-elm thq-grid-auto-300">
            <div className="home-work-01-thq-feature1-elm">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="home-work-01-thq-content-elm1 thq-flex-column">
                <div className="home-work-01-thq-section-title-elm1 thq-flex-column">
                  <Link href="/work-film">
                    <a>
                      <h3 className="home-work-01-thq-title1-elm thq-heading-3">
                        {props.feature1Title ?? (
                          <Fragment>
                            <span className="home-work-01-text12">
                              Film Production
                            </span>
                          </Fragment>
                        )}
                      </h3>
                    </a>
                  </Link>
                  <span className="home-work-01-thq-description1-elm thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="home-work-01-text15">
                          Stories shaped through image, motion, and sound.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="home-work-01-thq-action-elm1 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature1Button ?? (
                        <Fragment>
                          <span className="home-work-01-text18">
                            Learn More
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="home-work-01-thq-feature2-elm">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="home-work-01-thq-content-elm2 thq-flex-column">
                <div className="home-work-01-thq-section-title-elm2 thq-flex-column">
                  <Link href="/work-audio">
                    <a>
                      <strong className="home-work-01-thq-title2-elm thq-heading-3">
                        {props.feature2Title ?? (
                          <Fragment>
                            <span className="home-work-01-text11">
                              Audio Production
                            </span>
                          </Fragment>
                        )}
                      </strong>
                    </a>
                  </Link>
                  <span className="home-work-01-thq-description2-elm thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="home-work-01-text19">
                          Sound designed to support emotion and presence.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="home-work-01-thq-action-elm2 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature2Button ?? (
                        <Fragment>
                          <span className="home-work-01-text20">
                            Discover Now
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="home-work-01-thq-feature3-elm">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="home-work-01-thq-content-elm3 thq-flex-column">
                <div className="home-work-01-thq-section-title-elm3 thq-flex-column">
                  <Link href="/work-animation">
                    <a>
                      <strong className="home-work-01-thq-title3-elm thq-heading-3">
                        {props.feature3Title ?? (
                          <Fragment>
                            <span className="home-work-01-text14">
                              Animation &amp; Motion
                            </span>
                          </Fragment>
                        )}
                      </strong>
                    </a>
                  </Link>
                  <span className="home-work-01-thq-description3-elm thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="home-work-01-text17">
                          Movement crafted with clarity, rhythm, and intent.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="home-work-01-thq-action-elm3 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature3Button ?? (
                        <Fragment>
                          <span className="home-work-01-text13">
                            Get Support
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="home-work-01-thq-feature4-elm">
              <img
                alt={props.feature4ImageAlt}
                src={props.feature4ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <div className="home-work-01-thq-content-elm4 thq-flex-column">
                <div className="home-work-01-thq-section-title-elm4 thq-flex-column">
                  <Link href="/work-photography">
                    <a>
                      <strong className="home-work-01-thq-title4-elm thq-heading-3">
                        {props.feature4Title ?? (
                          <Fragment>
                            <span className="home-work-01-text16">
                              Photography
                            </span>
                          </Fragment>
                        )}
                      </strong>
                    </a>
                  </Link>
                  <span className="home-work-01-thq-description4-elm thq-body-small">
                    {props.feature4Description ?? (
                      <Fragment>
                        <span className="home-work-01-text10">
                          Still imagery with cinematic depth and atmosphere.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="home-work-01-thq-action-elm4 thq-flex-row">
                  <button className="thq-button-flat">
                    <span className="thq-body-small">
                      {props.feature4Button ?? (
                        <Fragment>
                          <span className="home-work-01-text21">
                            Customize Your Experience
                          </span>
                        </Fragment>
                      )}
                    </span>
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M426 256l256 256-256 256-60-60 196-196-196-196z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .home-work-01-thq-layout301-elm {
            gap: var(--dl-layout-space-fiveunits);
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            padding-top: 112px;
            padding-left: var(--dl-layout-space-twounits);
            padding-right: var(--dl-layout-space-twounits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-twounits);
            justify-content: center;
          }
          .home-work-01-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .home-work-01-thq-row-elm {
            width: 100%;
          }
          .home-work-01-thq-feature1-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .home-work-01-thq-content-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .home-work-01-thq-section-title-elm1 {
            align-self: stretch;
            align-items: center;
          }
          .home-work-01-thq-title1-elm {
            text-align: center;
            text-decoration: none;
          }
          .home-work-01-thq-description1-elm {
            text-align: center;
          }
          .home-work-01-thq-action-elm1 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .home-work-01-thq-feature2-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .home-work-01-thq-content-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .home-work-01-thq-section-title-elm2 {
            align-self: stretch;
            align-items: center;
          }
          .home-work-01-thq-title2-elm {
            text-align: center;
            text-decoration: none;
          }
          .home-work-01-thq-description2-elm {
            text-align: center;
          }
          .home-work-01-thq-action-elm2 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .home-work-01-thq-feature3-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .home-work-01-thq-content-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .home-work-01-thq-section-title-elm3 {
            align-self: stretch;
            align-items: center;
          }
          .home-work-01-thq-title3-elm {
            text-align: center;
            text-decoration: none;
          }
          .home-work-01-thq-description3-elm {
            text-align: center;
          }
          .home-work-01-thq-action-elm3 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .home-work-01-thq-feature4-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            width: auto;
            display: flex;
            overflow: hidden;
            max-width: 600px;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .home-work-01-thq-content-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .home-work-01-thq-section-title-elm4 {
            align-self: stretch;
            align-items: center;
          }
          .home-work-01-thq-title4-elm {
            text-align: center;
            text-decoration: none;
          }
          .home-work-01-thq-description4-elm {
            text-align: center;
          }
          .home-work-01-thq-action-elm4 {
            align-self: stretch;
            align-items: stretch;
            justify-content: center;
          }
          .home-work-01-text10 {
            display: inline-block;
          }
          .home-work-01-text11 {
            display: inline-block;
          }
          .home-work-01-text12 {
            display: inline-block;
          }
          .home-work-01-text13 {
            display: inline-block;
          }
          .home-work-01-text14 {
            display: inline-block;
          }
          .home-work-01-text15 {
            display: inline-block;
          }
          .home-work-01-text16 {
            display: inline-block;
          }
          .home-work-01-text17 {
            display: inline-block;
          }
          .home-work-01-text18 {
            display: inline-block;
          }
          .home-work-01-text19 {
            display: inline-block;
          }
          .home-work-01-text20 {
            display: inline-block;
          }
          .home-work-01-text21 {
            display: inline-block;
          }

          .home-work-01root-class-name1 {
            padding-top: 112px;
          }
          @media (max-width: 991px) {
            .home-work-01-thq-row-elm {
              width: auto;
              align-items: center;
              flex-direction: column;
            }
            .home-work-01-thq-feature1-elm {
              width: 100%;
            }
            .home-work-01-thq-feature2-elm {
              width: 100%;
            }
            .home-work-01-thq-feature3-elm {
              width: 100%;
            }
            .home-work-01-thq-feature4-elm {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .home-work-01-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

HomeWork01.defaultProps = {
  feature1ImageAlt: 'User-Friendly Interface Image Alt',
  feature4Description: undefined,
  feature3ImageSrc:
    'https://images.unsplash.com/photo-1727434032765-9c4df88b6e02?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDM4fHxhaXxlbnwwfHx8fDE3NjkyMTM1MTR8MA&ixlib=rb-4.1.0&w=600',
  feature4ImageAlt: 'Customizable Solutions Image Alt',
  feature3ImageAlt: '24/7 Customer Support Image Alt',
  feature2Title: undefined,
  feature1Title: undefined,
  feature1ImageSrc:
    'https://images.unsplash.com/photo-1518930259200-3e5b29f42096?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDI2fHxmaWxtfGVufDB8fHx8MTc2OTIxMjkxNHww&ixlib=rb-4.1.0&w=600',
  feature3Button: undefined,
  feature2ImageAlt: 'Advanced Analytics Tools Image Alt',
  feature3Title: undefined,
  feature1Description: undefined,
  feature4Title: undefined,
  rootClassName: '',
  feature3Description: undefined,
  feature1Button: undefined,
  feature4ImageSrc:
    'https://images.unsplash.com/photo-1590071089561-2087ff1fc418?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDUyfHxwaG90b3xlbnwwfHx8fDE3NjkyMTM2MDB8MA&ixlib=rb-4.1.0&w=600',
  feature2Description: undefined,
  feature2Button: undefined,
  feature4Button: undefined,
  feature2ImageSrc:
    'https://images.unsplash.com/photo-1466428996289-fb355538da1b?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE2fHxhdWRpb3xlbnwwfHx8fDE3NjkyMTM1NDF8MA&ixlib=rb-4.1.0&w=600',
}

HomeWork01.propTypes = {
  feature1ImageAlt: PropTypes.string,
  feature4Description: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature4ImageAlt: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  feature2Title: PropTypes.element,
  feature1Title: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature3Button: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature3Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature4Title: PropTypes.element,
  rootClassName: PropTypes.string,
  feature3Description: PropTypes.element,
  feature1Button: PropTypes.element,
  feature4ImageSrc: PropTypes.string,
  feature2Description: PropTypes.element,
  feature2Button: PropTypes.element,
  feature4Button: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
}

export default HomeWork01
