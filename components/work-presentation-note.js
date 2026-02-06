import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const WorkPresentationNote = (props) => {
  return (
    <>
      <div
        className={`work-presentation-note-thq-layout251-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="work-presentation-note-thq-max-width-elm thq-section-max-width">
          <div className="thq-flex-row work-presentation-note-thq-section-title-elm">
            <div className="work-presentation-note-thq-column-elm thq-flex-column">
              <h2 className="thq-heading-2 work-presentation-note-thq-text-elm1">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span className="work-presentation-note-text18">
                      Presentation Note
                    </span>
                  </Fragment>
                )}
              </h2>
            </div>
            <span className="thq-body-small">
              {props.sectionDescription ?? (
                <Fragment>
                  <span className="work-presentation-note-text14">
                    Projects are shown as short looping previews, allowing
                    motion to be experienced naturally without interruption.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="work-presentation-note-thq-content-elm1">
            <div className="work-presentation-note-thq-row-elm thq-flex-row">
              <div className="work-presentation-note-thq-feature1-elm thq-flex-column">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="thq-img-ratio-4-3 work-presentation-note-thq-feature1-image-elm"
                />
                <div className="work-presentation-note-thq-content-elm2 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature1Title ?? (
                      <Fragment>
                        <span className="work-presentation-note-text17">
                          Film Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature1Description ?? (
                      <Fragment>
                        <span className="work-presentation-note-text11">
                          Professional film production services tailored to
                          bring your stories to life.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-presentation-note-thq-feature2-elm thq-flex-column">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="thq-img-ratio-4-3 work-presentation-note-thq-feature2-image-elm"
                />
                <div className="work-presentation-note-thq-content-elm3 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature2Title ?? (
                      <Fragment>
                        <span className="work-presentation-note-text19">
                          Audio Production
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature2Description ?? (
                      <Fragment>
                        <span className="work-presentation-note-text15">
                          High-quality audio production for a captivating
                          auditory experience.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
              <div className="work-presentation-note-thq-feature3-elm thq-flex-column">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="thq-img-ratio-4-3 work-presentation-note-thq-feature3-image-elm"
                />
                <div className="work-presentation-note-thq-content-elm4 thq-flex-column">
                  <h3 className="thq-heading-3">
                    {props.feature3Title ?? (
                      <Fragment>
                        <span className="work-presentation-note-text13">
                          Animation &amp; Graphics
                        </span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-small">
                    {props.feature3Description ?? (
                      <Fragment>
                        <span className="work-presentation-note-text10">
                          Innovative animation and graphics solutions to enhance
                          visual storytelling.
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="work-presentation-note-thq-actions-elm">
            <button className="thq-button-filled work-presentation-note-thq-button-elm1">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span className="work-presentation-note-text12">
                      Customized Solutions
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="thq-button-outline work-presentation-note-thq-button-elm2">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span className="work-presentation-note-text16">
                      Dedicated Customer Support
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .work-presentation-note-thq-layout251-elm {
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .work-presentation-note-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-presentation-note-thq-column-elm {
            gap: var(--dl-layout-space-halfunit);
            align-items: flex-start;
            flex-shrink: 0;
          }
          .work-presentation-note-thq-content-elm1 {
            gap: 48px;
            display: flex;
            align-self: stretch;
            align-items: flex-start;
            flex-direction: column;
          }
          .work-presentation-note-thq-row-elm {
            align-items: flex-start;
          }
          .work-presentation-note-thq-feature1-elm {
            flex: 1;
          }
          .work-presentation-note-thq-content-elm2 {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-presentation-note-thq-feature2-elm {
            flex: 1;
          }
          .work-presentation-note-thq-content-elm3 {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-presentation-note-thq-feature3-elm {
            flex: 1;
          }
          .work-presentation-note-thq-content-elm4 {
            align-self: stretch;
            align-items: flex-start;
          }
          .work-presentation-note-thq-actions-elm {
            gap: var(--dl-layout-space-unit);
            display: flex;
            align-items: flex-start;
          }
          .work-presentation-note-text10 {
            display: inline-block;
          }
          .work-presentation-note-text11 {
            display: inline-block;
          }
          .work-presentation-note-text12 {
            display: inline-block;
          }
          .work-presentation-note-text13 {
            display: inline-block;
          }
          .work-presentation-note-text14 {
            display: inline-block;
          }
          .work-presentation-note-text15 {
            display: inline-block;
          }
          .work-presentation-note-text16 {
            display: inline-block;
          }
          .work-presentation-note-text17 {
            display: inline-block;
          }
          .work-presentation-note-text18 {
            display: inline-block;
          }
          .work-presentation-note-text19 {
            display: inline-block;
          }

          @media (max-width: 991px) {
            .work-presentation-note-thq-section-title-elm {
              align-items: flex-start;
              flex-direction: column;
            }
            .work-presentation-note-thq-feature1-image-elm {
              height: 260px;
            }
            .work-presentation-note-thq-feature2-image-elm {
              height: 260px;
            }
            .work-presentation-note-thq-feature3-image-elm {
              height: 260px;
            }
          }
          @media (max-width: 767px) {
            .work-presentation-note-thq-column-elm {
              width: 100%;
            }
            .work-presentation-note-thq-text-elm1 {
              text-align: center;
            }
            .work-presentation-note-thq-row-elm {
              flex-direction: column;
            }
            .work-presentation-note-thq-feature1-image-elm {
              width: 100%;
            }
            .work-presentation-note-thq-feature2-elm {
              width: auto;
            }
            .work-presentation-note-thq-feature2-image-elm {
              width: 100%;
            }
            .work-presentation-note-thq-feature3-elm {
              width: auto;
            }
            .work-presentation-note-thq-actions-elm {
              flex-wrap: wrap;
            }
          }
          @media (max-width: 479px) {
            .work-presentation-note-thq-actions-elm {
              width: 100%;
              flex-direction: column;
            }
            .work-presentation-note-thq-button-elm1 {
              width: 100%;
            }
            .work-presentation-note-thq-button-elm2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

WorkPresentationNote.defaultProps = {
  feature3Description: undefined,
  feature1ImageAlt: 'Film Production Image',
  feature2ImageAlt: 'Audio Production Image',
  feature1Description: undefined,
  feature3ImageSrc: '/unknown-300h.jpg',
  mainAction: undefined,
  feature2ImageSrc: '/flag_view-300h.jpg',
  feature3Title: undefined,
  rootClassName: '',
  feature3ImageAlt: 'Animation & Graphics Image',
  sectionDescription: undefined,
  feature2Description: undefined,
  secondaryAction: undefined,
  feature1Title: undefined,
  sectionTitle: undefined,
  feature2Title: undefined,
  feature1ImageSrc: '/colombo-engineering-300x223-1400w.jpg',
}

WorkPresentationNote.propTypes = {
  feature3Description: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature1Description: PropTypes.element,
  feature3ImageSrc: PropTypes.string,
  mainAction: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature3Title: PropTypes.element,
  rootClassName: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  sectionDescription: PropTypes.element,
  feature2Description: PropTypes.element,
  secondaryAction: PropTypes.element,
  feature1Title: PropTypes.element,
  sectionTitle: PropTypes.element,
  feature2Title: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
}

export default WorkPresentationNote
