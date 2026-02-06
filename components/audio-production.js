import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const AudioProduction = (props) => {
  return (
    <>
      <div className="audio-production-thq-layout300-elm thq-section-padding">
        <div className="audio-production-thq-max-width-elm thq-section-max-width thq-flex-column">
          <div className="audio-production-thq-section-title-elm thq-flex-column">
            <h2 className="thq-heading-2 audio-production-thq-text-elm1">
              {props.sectionTitle ?? (
                <Fragment>
                  <span className="audio-production-text14">
                    Audio Production
                  </span>
                </Fragment>
              )}
            </h2>
            <p className="audio-production-thq-text-elm2 thq-body-large">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="audio-production-text19">
                    <span>
                      Sound is approached here as an emotional and spatial
                      element — something that shapes how a story is felt, not
                      simply heard. The work in this archive focuses on texture,
                      rhythm, and restraint, allowing silence and space to play
                      an active role.
                    </span>
                    <br></br>
                    <span>
                      This collection includes sound design, music, and
                      voice-based work created to support film, animation, and
                      immersive visual experiences.
                    </span>
                  </span>
                </Fragment>
              )}
            </p>
          </div>
          <div className="audio-production-thq-content-elm thq-grid-auto-300">
            <div className="audio-production-thq-feature1-elm thq-flex-column">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="audio-production-thq-feature1-title-elm thq-heading-3">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="audio-production-text11">
                      Sound design
                    </span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="audio-production-text10">
                      Tailored services to meet your unique needs.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="audio-production-thq-feature2-elm thq-flex-column">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="thq-heading-3">
                {props.feature2Title ?? (
                  <Fragment>
                    <span className="audio-production-text12">Music</span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature2Description ?? (
                  <Fragment>
                    <span className="audio-production-text17">
                      User-friendly interface for seamless navigation.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="audio-production-thq-feature3-elm thq-flex-column">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="thq-heading-3">
                {props.feature3Title ?? (
                  <Fragment>
                    <span className="audio-production-text13">Voice work</span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature3Description ?? (
                  <Fragment>
                    <span className="audio-production-text15">
                      Gain valuable insights with advanced analytics.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="audio-production-thq-actions-elm thq-flex-row">
            <button className="audio-production-thq-button-elm1 thq-button-filled">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span className="audio-production-text18">Get Started</span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="audio-production-thq-button-elm2 thq-button-outline">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span className="audio-production-text16">Learn More</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .audio-production-thq-layout300-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .audio-production-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            align-items: center;
          }
          .audio-production-thq-section-title-elm {
            align-items: center;
          }
          .audio-production-thq-text-elm2 {
            text-align: center;
          }
          .audio-production-thq-content-elm {
            align-self: stretch;
            align-items: center;
          }
          .audio-production-thq-feature1-elm {
            align-items: flex-start;
          }
          .audio-production-thq-feature1-title-elm {
            text-align: center;
          }
          .audio-production-thq-feature2-elm {
            align-items: flex-start;
          }
          .audio-production-thq-feature3-elm {
            align-items: flex-start;
          }
          .audio-production-thq-actions-elm {
            align-items: flex-start;
          }
          .audio-production-thq-button-elm1 {
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-oneandhalfunits);
            padding-right: var(--dl-layout-space-oneandhalfunits);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .audio-production-thq-button-elm2 {
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-oneandhalfunits);
            padding-right: var(--dl-layout-space-oneandhalfunits);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .audio-production-text10 {
            display: inline-block;
          }
          .audio-production-text11 {
            display: inline-block;
          }
          .audio-production-text12 {
            display: inline-block;
          }
          .audio-production-text13 {
            display: inline-block;
          }
          .audio-production-text14 {
            display: inline-block;
          }
          .audio-production-text15 {
            display: inline-block;
          }
          .audio-production-text16 {
            display: inline-block;
          }
          .audio-production-text17 {
            display: inline-block;
          }
          .audio-production-text18 {
            display: inline-block;
          }
          .audio-production-text19 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .audio-production-thq-section-title-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .audio-production-thq-section-title-elm {
              width: auto;
            }
            .audio-production-thq-text-elm1 {
              text-align: center;
            }
            .audio-production-thq-feature2-elm {
              width: auto;
            }
            .audio-production-thq-feature3-elm {
              width: auto;
            }
          }
          @media (max-width: 479px) {
            .audio-production-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .audio-production-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .audio-production-thq-button-elm1 {
              width: 100%;
            }
            .audio-production-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

AudioProduction.defaultProps = {
  feature1Description: undefined,
  feature3ImageSrc: '/Audio/Studio/jeevan%20chandimal_0005_layer%2017-200h.jpg',
  feature1Title: undefined,
  feature2Title: undefined,
  feature1ImageAlt: 'Customized Solutions Image',
  feature3Title: undefined,
  sectionTitle: undefined,
  feature3Description: undefined,
  secondaryAction: undefined,
  feature3ImageAlt: 'Analytics Tools Image',
  feature1ImageSrc:
    '/Audio/Studio/jeevan%20chandimal_0002_layer%2020-1400w.jpg',
  feature2Description: undefined,
  mainAction: undefined,
  feature2ImageAlt: 'Intuitive Design Image',
  sectionDescription: undefined,
  feature2ImageSrc: '/Audio/Studio/jeevan%20chandimal_0000_layer%2022-200h.jpg',
}

AudioProduction.propTypes = {
  feature1Description: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  feature1Title: PropTypes.element,
  feature2Title: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature3Title: PropTypes.element,
  sectionTitle: PropTypes.element,
  feature3Description: PropTypes.element,
  secondaryAction: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  feature2Description: PropTypes.element,
  mainAction: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  sectionDescription: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
}

export default AudioProduction
