import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Music = (props) => {
  return (
    <>
      <div className="music-thq-layout300-elm thq-section-padding">
        <div className="music-thq-max-width-elm thq-section-max-width thq-flex-column">
          <div className="music-thq-section-title-elm thq-flex-column">
            <h2 className="thq-heading-2 music-thq-text-elm1">
              {props.sectionTitle ?? (
                <Fragment>
                  <span className="music-text10">Music</span>
                </Fragment>
              )}
            </h2>
            <p className="music-thq-text-elm2 thq-body-large">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="music-text19">
                    Original musical compositions developed around mood and
                    pacing. These works are created to support narrative flow,
                    whether as subtle background elements or more present
                    emotional drivers.
                  </span>
                </Fragment>
              )}
            </p>
          </div>
          <div className="music-thq-content-elm thq-grid-auto-300">
            <div className="music-thq-feature1-elm thq-flex-column">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="music-thq-feature1-title-elm thq-heading-3">
                {props.feature1Title ?? (
                  <Fragment>
                    <span className="music-text12">Customized Solutions</span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature1Description ?? (
                  <Fragment>
                    <span className="music-text15">
                      Tailored services to meet your unique needs and
                      requirements.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="music-thq-feature2-elm thq-flex-column">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="thq-heading-3">
                {props.feature2Title ?? (
                  <Fragment>
                    <span className="music-text11">Intuitive Design</span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature2Description ?? (
                  <Fragment>
                    <span className="music-text14">
                      User-friendly interfaces and designs for seamless user
                      experience.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="music-thq-feature3-elm thq-flex-column">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3"
              />
              <h3 className="thq-heading-3">
                {props.feature3Title ?? (
                  <Fragment>
                    <span className="music-text16">
                      Powerful Analytics Tools
                    </span>
                  </Fragment>
                )}
              </h3>
              <span className="thq-body-small">
                {props.feature3Description ?? (
                  <Fragment>
                    <span className="music-text18">
                      Gain valuable insights and data-driven decisions with our
                      advanced analytics tools.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="music-thq-actions-elm thq-flex-row">
            <button className="music-thq-button-elm1 thq-button-filled">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span className="music-text17">Get Started</span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="music-thq-button-elm2 thq-button-outline">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span className="music-text13">Learn More</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .music-thq-layout300-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .music-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            align-items: center;
          }
          .music-thq-section-title-elm {
            align-items: center;
          }
          .music-thq-text-elm2 {
            text-align: center;
          }
          .music-thq-content-elm {
            align-self: stretch;
            align-items: center;
          }
          .music-thq-feature1-elm {
            align-items: flex-start;
          }
          .music-thq-feature1-title-elm {
            text-align: center;
          }
          .music-thq-feature2-elm {
            align-items: flex-start;
          }
          .music-thq-feature3-elm {
            align-items: flex-start;
          }
          .music-thq-actions-elm {
            align-items: flex-start;
          }
          .music-thq-button-elm1 {
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-oneandhalfunits);
            padding-right: var(--dl-layout-space-oneandhalfunits);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .music-thq-button-elm2 {
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-oneandhalfunits);
            padding-right: var(--dl-layout-space-oneandhalfunits);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .music-text10 {
            display: inline-block;
          }
          .music-text11 {
            display: inline-block;
          }
          .music-text12 {
            display: inline-block;
          }
          .music-text13 {
            display: inline-block;
          }
          .music-text14 {
            display: inline-block;
          }
          .music-text15 {
            display: inline-block;
          }
          .music-text16 {
            display: inline-block;
          }
          .music-text17 {
            display: inline-block;
          }
          .music-text18 {
            display: inline-block;
          }
          .music-text19 {
            display: inline-block;
          }
          @media (max-width: 991px) {
            .music-thq-section-title-elm {
              width: 100%;
            }
          }
          @media (max-width: 767px) {
            .music-thq-section-title-elm {
              width: auto;
            }
            .music-thq-text-elm1 {
              text-align: center;
            }
            .music-thq-feature2-elm {
              width: auto;
            }
            .music-thq-feature3-elm {
              width: auto;
            }
          }
          @media (max-width: 479px) {
            .music-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .music-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .music-thq-button-elm1 {
              width: 100%;
            }
            .music-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

Music.defaultProps = {
  sectionTitle: undefined,
  feature2Title: undefined,
  feature3ImageAlt: 'Powerful Analytics Tools Image',
  feature3ImageSrc: '/Audio/Studio/46761_107423282651248_1487833_n-200h.jpg',
  feature1Title: undefined,
  secondaryAction: undefined,
  feature1ImageAlt: 'Customized Solutions Image',
  feature2Description: undefined,
  feature1Description: undefined,
  feature3Title: undefined,
  mainAction: undefined,
  feature1ImageSrc:
    '/Audio/Studio/291692_381818428545064_937224267_o-1400w.jpg',
  feature3Description: undefined,
  sectionDescription: undefined,
  feature2ImageSrc: '/Audio/Studio/46761_107423315984578_6037668_n-200h.jpg',
  feature2ImageAlt: 'Intuitive Design Image',
}

Music.propTypes = {
  sectionTitle: PropTypes.element,
  feature2Title: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature1Title: PropTypes.element,
  secondaryAction: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature2Description: PropTypes.element,
  feature1Description: PropTypes.element,
  feature3Title: PropTypes.element,
  mainAction: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature3Description: PropTypes.element,
  sectionDescription: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
}

export default Music
