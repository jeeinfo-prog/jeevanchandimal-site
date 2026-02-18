import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Process01 = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="process-01-container2 thq-section-max-width">

          {/* TABS */}
          <div className="process-01-thq-tabs-menu-elm">

            {/* TAB 1 */}
            <div onClick={() => setActiveTab(0)} className="process-01-thq-tab-horizontal-elm1">
              <div className="process-01-thq-divider-container-elm1">
                {activeTab === 0 && <div className="process-01-container3" />}
              </div>

              <div className="process-01-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title2 ?? <span>Process</span>}
                </h2>

                <h3 className="thq-heading-3">
                  {props.feature1Title11 ?? <span>Concept First</span>}
                </h3>

                <span className="thq-body-small">
                  {props.feature1Description2 ?? (
                    <span>
                      Every collaboration begins with intention. Atmosphere,
                      emotional direction, and story are defined before
                      production begins.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 2 */}
            <div onClick={() => setActiveTab(1)} className="process-01-thq-tab-horizontal-elm2">
              <div className="process-01-thq-divider-container-elm2">
                {activeTab === 1 && <div className="process-01-container4" />}
              </div>

              <div className="process-01-thq-content-elm2">
                <h3 className="thq-heading-3">
                  {props.feature3Title ?? <span>Observation Over Noise</span>}
                </h3>

                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <span>
                      I prefer quiet moments to forced gestures. Real presence
                      over performance. Stillness often reveals more than motion.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 3 */}
            <div onClick={() => setActiveTab(2)} className="process-01-thq-tab-horizontal-elm3">
              <div className="process-01-thq-divider-container-elm3">
                {activeTab === 2 && <div className="process-01-container5" />}
              </div>

              <div className="process-01-thq-content-elm3">
                <h3 className="thq-heading-3">
                  {props.feature3Title1 ?? <span>Craft & Detail</span>}
                </h3>

                <span className="thq-body-small">
                  {props.feature3Description1 ?? (
                    <span>
                      From lighting and composition to sound texture and pacing,
                      every element is refined with care. Small decisions shape
                      the final experience.
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* IMAGE PANEL */}
          <div className="process-01-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                src={props.feature1ImgSrc || '/about/process-concept.jpg'}
                alt={props.feature1ImgAlt || 'Concept planning'}
                className="process-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 1 && (
              <img
                src={props.feature2ImgSrc || '/about/process-observation.jpg'}
                alt={props.feature2ImgAlt || 'Observation and framing'}
                className="process-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 2 && (
              <img
                src={props.feature3ImgSrc || '/about/process-detail.jpg'}
                alt={props.feature3ImgAlt || 'Craft and detail'}
                className="process-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .process-01-container2 {
          width: 100%;
          display: grid;
          gap: var(--dl-layout-space-fiveunits);
          grid-template-columns: 1fr 1fr;
        }

        .process-01-thq-tabs-menu-elm {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          justify-content: center;
        }

        /* Center image vertically */
        .process-01-thq-image-container-elm {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }

        .process-img {
          width: 100%;
          max-height: 520px;
          object-fit: cover;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          animation: fadeIn 300ms ease;
        }

        @media (max-width: 991px) {
          .process-01-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .process-01-thq-tabs-menu-elm {
            order: 2;
          }
        }
      `}</style>
    </>
  )
}

Process01.defaultProps = {
  rootClassName: '',

  feature1ImgSrc: '/about/process-concept.jpg',
  feature2ImgSrc: '/about/process-observation.jpg',
  feature3ImgSrc: '/about/process-detail.jpg',

  feature1ImgAlt: 'Concept planning',
  feature2ImgAlt: 'Observation and framing',
  feature3ImgAlt: 'Craft and detail',
}

Process01.propTypes = {
  rootClassName: PropTypes.string,

  feature1Title2: PropTypes.element,
  feature1Title11: PropTypes.element,
  feature1Description2: PropTypes.element,

  feature3Title: PropTypes.element,
  feature3Description: PropTypes.element,

  feature3Title1: PropTypes.element,
  feature3Description1: PropTypes.element,

  feature1ImgSrc: PropTypes.string,
  feature2ImgSrc: PropTypes.string,
  feature3ImgSrc: PropTypes.string,

  feature1ImgAlt: PropTypes.string,
  feature2ImgAlt: PropTypes.string,
  feature3ImgAlt: PropTypes.string,
}

export default Process01
