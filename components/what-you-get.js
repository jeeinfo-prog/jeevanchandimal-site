import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WhatYouGet = (props) => {
  return (
    <>
      <div className="what-you-get-thq-pricing23-elm thq-section-padding">
        <div className="what-you-get-thq-max-width-elm thq-section-max-width">
          <div className="what-you-get-thq-section-title-elm">
            <div className="what-you-get-thq-content-elm">
              <h2 className="what-you-get-thq-text-elm1 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="what-you-get-text33">THE COLLECTION</span>
                  </Fragment>
                )}
              </h2>
              <p className="what-you-get-thq-text-elm2 thq-body-large">
                {props.subtitle1 ?? (
                  <Fragment>
                    <span className="what-you-get-text35">
                      Every piece is curated to stand alone - yet belong
                      together.
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
          </div>
          <div className="what-you-get-container10">
            <div className="what-you-get-thq-content2-elm">
              <h3 className="thq-heading-3">
                {props.featureCategory1 ?? (
                  <Fragment>
                    <span className="what-you-get-text28">
                      Standard Features
                    </span>
                  </Fragment>
                )}
              </h3>
            </div>
            <div className="what-you-get-container11">
              <div className="what-you-get-container12">
                <span className="thq-body-small">
                  {props.feature1 ?? (
                    <Fragment>
                      <span className="what-you-get-text41">Icon</span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="what-you-get-container13">
                <span className="what-you-get-text12 thq-body-small">
                  {props.count1 ?? (
                    <Fragment>
                      <span className="what-you-get-text40">Feature</span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="what-you-get-container14">
                <span className="thq-body-small">
                  {props.count2 ?? (
                    <Fragment>
                      <span className="what-you-get-text30">Description</span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className="what-you-get-container15">
              <div className="what-you-get-container16">
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                </svg>
              </div>
              <div className="what-you-get-container17">
                <span className="thq-body-small">
                  {props.feature21 ?? (
                    <Fragment>
                      <span className="what-you-get-text36">
                        Cinematic Photography
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="what-you-get-container18">
                <span className="thq-body-small">
                  {props.feature211 ?? (
                    <Fragment>
                      <span className="what-you-get-text43">
                        Images crafted with atmosphere, depth, and storytelling
                        in mind.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className="what-you-get-container19">
              <div className="what-you-get-container20">
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                </svg>
              </div>
              <div className="what-you-get-container21">
                <span className="thq-body-small">
                  {props.feature212 ?? (
                    <Fragment>
                      <span className="what-you-get-text37">
                        Nature &amp; Wildlife Visuals
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="what-you-get-container22">
                <span className="thq-body-small">
                  {props.feature2111 ?? (
                    <Fragment>
                      <span className="what-you-get-text31">
                        Authentic moments from the wild, captured with patience
                        and precision.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className="what-you-get-container23">
              <div className="what-you-get-container24">
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                </svg>
              </div>
              <div className="what-you-get-container25">
                <span className="thq-body-small">
                  {props.feature2121 ?? (
                    <Fragment>
                      <span className="what-you-get-text39">
                        Landscape &amp; Travel Atmospheres
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="what-you-get-container26">
                <span className="thq-body-small">
                  {props.feature21111 ?? (
                    <Fragment>
                      <span className="what-you-get-text26">
                        Expansive scenes that carry mood, scale, and a sense of
                        place.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className="what-you-get-container27">
              <div className="what-you-get-container28">
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                </svg>
              </div>
              <div className="what-you-get-container29">
                <span className="thq-body-small">
                  {props.feature21211 ?? (
                    <Fragment>
                      <span className="what-you-get-text32">
                        Black &amp; White Fine Art
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="what-you-get-container30">
                <span className="thq-body-small">
                  {props.feature211111 ?? (
                    <Fragment>
                      <span className="what-you-get-text42">
                        Timeless compositions focused on light, texture, and
                        emotion.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className="what-you-get-container31">
              <div className="what-you-get-container32">
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                </svg>
              </div>
              <div className="what-you-get-container33">
                <span className="thq-body-small">
                  {props.feature212111 ?? (
                    <Fragment>
                      <span className="what-you-get-text29">
                        Film-grade color and texture
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="what-you-get-container34">
                <span className="thq-body-small">
                  {props.feature2111111 ?? (
                    <Fragment>
                      <span className="what-you-get-text34">
                        Carefully color-graded visuals, ready for creative use.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className="what-you-get-container35">
              <div className="what-you-get-container36">
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                </svg>
              </div>
              <div className="what-you-get-container37">
                <span className="thq-body-small">
                  {props.feature2121111 ?? (
                    <Fragment>
                      <span className="what-you-get-text27">
                        High Resolution master files
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <div className="what-you-get-container38">
                <span className="thq-body-small">
                  {props.feature21111111 ?? (
                    <Fragment>
                      <span className="what-you-get-text38">
                        Detailed, print-quality files suitable for professional
                        projects.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .what-you-get-thq-pricing23-elm {
            gap: 0;
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .what-you-get-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .what-you-get-thq-section-title-elm {
            gap: var(--dl-layout-space-unit);
            width: 100%;
            display: flex;
            max-width: 800px;
            margin-top: var(--dl-layout-space-twounits);
            align-items: center;
            flex-shrink: 0;
            margin-bottom: var(--dl-layout-space-twounits);
            flex-direction: column;
          }
          .what-you-get-thq-content-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            width: 100%;
            display: flex;
            max-width: 800px;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .what-you-get-thq-text-elm1 {
            text-align: center;
          }
          .what-you-get-thq-text-elm2 {
            text-align: center;
          }
          .what-you-get-container10 {
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .what-you-get-thq-content2-elm {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .what-you-get-container11 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: row;
          }
          .what-you-get-container12 {
            flex: 0 0 auto;
            width: 10%;
            height: auto;
            display: flex;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .what-you-get-container13 {
            flex: 1;
            width: 20%;
            height: auto;
            display: flex;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-text12 {
            width: 20px;
          }
          .what-you-get-container14 {
            width: 50%;
            height: auto;
            display: flex;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container15 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: row;
          }
          .what-you-get-container16 {
            flex: 0 0 auto;
            width: 10%;
            display: flex;
            align-self: stretch;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .what-you-get-container17 {
            flex: 1;
            width: 20%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container18 {
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container19 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: row;
          }
          .what-you-get-container20 {
            flex: 0 0 auto;
            width: 10%;
            display: flex;
            align-self: stretch;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .what-you-get-container21 {
            flex: 1;
            width: 20%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container22 {
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container23 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: row;
          }
          .what-you-get-container24 {
            flex: 0 0 auto;
            width: 10%;
            display: flex;
            align-self: stretch;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .what-you-get-container25 {
            flex: 1;
            width: 20%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container26 {
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container27 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: row;
          }
          .what-you-get-container28 {
            flex: 0 0 auto;
            width: 10%;
            display: flex;
            align-self: stretch;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .what-you-get-container29 {
            flex: 1;
            width: 20%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container30 {
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container31 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: row;
          }
          .what-you-get-container32 {
            flex: 0 0 auto;
            width: 10%;
            display: flex;
            align-self: stretch;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .what-you-get-container33 {
            flex: 1;
            width: 20%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container34 {
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container35 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            flex-direction: row;
          }
          .what-you-get-container36 {
            flex: 0 0 auto;
            width: 10%;
            display: flex;
            align-self: stretch;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .what-you-get-container37 {
            flex: 1;
            width: 20%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-container38 {
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-layout-space-halfunit);
            border-color: var(--dl-color-theme-neutral-dark);
            border-width: 1px;
            padding-left: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-halfunit);
            border-bottom-width: 0px;
          }
          .what-you-get-text26 {
            display: inline-block;
          }
          .what-you-get-text27 {
            display: inline-block;
          }
          .what-you-get-text28 {
            display: inline-block;
          }
          .what-you-get-text29 {
            display: inline-block;
          }
          .what-you-get-text30 {
            display: inline-block;
          }
          .what-you-get-text31 {
            display: inline-block;
          }
          .what-you-get-text32 {
            display: inline-block;
          }
          .what-you-get-text33 {
            display: inline-block;
          }
          .what-you-get-text34 {
            display: inline-block;
          }
          .what-you-get-text35 {
            display: inline-block;
          }
          .what-you-get-text36 {
            display: inline-block;
          }
          .what-you-get-text37 {
            display: inline-block;
          }
          .what-you-get-text38 {
            display: inline-block;
          }
          .what-you-get-text39 {
            display: inline-block;
          }
          .what-you-get-text40 {
            display: inline-block;
          }
          .what-you-get-text41 {
            display: inline-block;
          }
          .what-you-get-text42 {
            display: inline-block;
          }
          .what-you-get-text43 {
            display: inline-block;
          }
          @media (max-width: 767px) {
            .what-you-get-container10 {
              display: none;
            }
          }
          @media (max-width: 479px) {
            .what-you-get-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
          }
        `}
      </style>
    </>
  )
}

WhatYouGet.defaultProps = {
  feature21111: undefined,
  feature2121111: undefined,
  featureCategory1: undefined,
  feature212111: undefined,
  count2: undefined,
  feature2111: undefined,
  feature21211: undefined,
  heading1: undefined,
  feature2111111: undefined,
  subtitle1: undefined,
  feature21: undefined,
  feature212: undefined,
  feature21111111: undefined,
  feature2121: undefined,
  count1: undefined,
  feature1: undefined,
  feature211111: undefined,
  feature211: undefined,
}

WhatYouGet.propTypes = {
  feature21111: PropTypes.element,
  feature2121111: PropTypes.element,
  featureCategory1: PropTypes.element,
  feature212111: PropTypes.element,
  count2: PropTypes.element,
  feature2111: PropTypes.element,
  feature21211: PropTypes.element,
  heading1: PropTypes.element,
  feature2111111: PropTypes.element,
  subtitle1: PropTypes.element,
  feature21: PropTypes.element,
  feature212: PropTypes.element,
  feature21111111: PropTypes.element,
  feature2121: PropTypes.element,
  count1: PropTypes.element,
  feature1: PropTypes.element,
  feature211111: PropTypes.element,
  feature211: PropTypes.element,
}

export default WhatYouGet
