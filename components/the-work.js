import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TheWork = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="the-work-container2 thq-section-max-width">

          {/* TABS */}
          <div className="the-work-thq-tabs-menu-elm">

            {/* TAB 1 */}
            <div onClick={() => setActiveTab(0)} className="the-work-thq-tab-horizontal-elm1">
              <div className="the-work-thq-divider-container-elm1">
                {activeTab === 0 && <div className="the-work-container3" />}
              </div>

              <div className="the-work-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title ?? <span>The Work</span>}
                </h2>

                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <span>
                      My projects range across narrative film, documentary,
                      commercial work, editorial photography, sound design,
                      and motion pieces.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 2 */}
            <div onClick={() => setActiveTab(1)} className="the-work-thq-tab-horizontal-elm2">
              <div className="the-work-thq-divider-container-elm2">
                {activeTab === 1 && <div className="the-work-container4" />}
              </div>

              <div className="the-work-thq-content-elm2">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <span>
                      Some are expansive. Some are minimal. All are approached as
                      complete visual experiences.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 3 */}
            <div onClick={() => setActiveTab(2)} className="the-work-thq-tab-horizontal-elm3">
              <div className="the-work-thq-divider-container-elm3">
                {activeTab === 2 && <div className="the-work-container5" />}
              </div>

              <div className="the-work-thq-content-elm3">
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <span>
                      I work both independently and in collaboration, depending
                      on the scale and needs of the project. Each production is
                      built intentionally — with the right tools, pace, and team.
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* IMAGE PANEL */}
          <div className="the-work-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                src={props.feature1ImgSrc || '/about/work-film.jpg'}
                alt={props.feature1ImgAlt || 'Narrative film still'}
                className="thework-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 1 && (
              <img
                src={props.feature2ImgSrc || '/about/work-minimal.jpg'}
                alt={props.feature2ImgAlt || 'Minimal visual composition'}
                className="thework-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 2 && (
              <img
                src={props.feature3ImgSrc || '/about/work-collaboration.jpg'}
                alt={props.feature3ImgAlt || 'Collaborative production'}
                className="thework-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .the-work-container2 {
          width: 100%;
          display: grid;
          gap: var(--dl-layout-space-fiveunits);
          grid-template-columns: 1fr 1fr;
        }

        .the-work-thq-tabs-menu-elm {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          justify-content: center;
        }

        /* Center image vertically */
        .the-work-thq-image-container-elm {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }

        .thework-img {
          width: 100%;
          max-height: 520px;
          object-fit: cover;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          animation: fadeIn 300ms ease;
        }

        @media (max-width: 991px) {
          .the-work-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .the-work-thq-tabs-menu-elm {
            order: 2;
          }
        }
      `}</style>
    </>
  )
}

TheWork.defaultProps = {
  rootClassName: '',

  feature1ImgSrc: '/about/work-film.jpg',
  feature2ImgSrc: '/about/work-minimal.jpg',
  feature3ImgSrc: '/about/work-collaboration.jpg',

  feature1ImgAlt: 'Narrative film still',
  feature2ImgAlt: 'Minimal visual composition',
  feature3ImgAlt: 'Collaborative production',
}

TheWork.propTypes = {
  rootClassName: PropTypes.string,

  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature2Description: PropTypes.element,
  feature3Description: PropTypes.element,

  feature1ImgSrc: PropTypes.string,
  feature2ImgSrc: PropTypes.string,
  feature3ImgSrc: PropTypes.string,

  feature1ImgAlt: PropTypes.string,
  feature2ImgAlt: PropTypes.string,
  feature3ImgAlt: PropTypes.string,
}

export default TheWork
