import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ACinematicApproach = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="a-cinematic-approach-container2 thq-section-max-width">
          <div className="a-cinematic-approach-thq-tabs-menu-elm">

            {/* TAB 1 */}
            <div onClick={() => setActiveTab(0)} className="a-cinematic-approach-thq-tab-horizontal-elm1">
              <div className="a-cinematic-approach-thq-divider-container-elm1">
                {activeTab === 0 && <div className="a-cinematic-approach-container3" />}
              </div>

              <div className="a-cinematic-approach-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title ?? <span>A Cinematic Approach</span>}
                </h2>

                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <span>
                      I work with a film-led mindset, even when the output is still
                      imagery or sound. Lighting is treated as narrative, movement
                      is deliberate, and sound supports emotion.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 2 */}
            <div onClick={() => setActiveTab(1)} className="a-cinematic-approach-thq-tab-horizontal-elm2">
              <div className="a-cinematic-approach-thq-divider-container-elm2">
                {activeTab === 1 && <div className="a-cinematic-approach-container4" />}
              </div>

              <div className="a-cinematic-approach-thq-content-elm2">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <span>
                      This approach allows each project to feel cohesive — not
                      assembled.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 3 */}
            <div onClick={() => setActiveTab(2)} className="a-cinematic-approach-thq-tab-horizontal-elm3">
              <div className="a-cinematic-approach-thq-divider-container-elm3">
                {activeTab === 2 && <div className="a-cinematic-approach-container5" />}
              </div>

              <div className="a-cinematic-approach-thq-content-elm3">
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <span>
                      Film, photography, audio, and animation are developed side by
                      side — not added in layers. The result is restrained and immersive.
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* IMAGE PANEL */}
          <div className="a-cinematic-approach-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                src={props.feature1ImgSrc || '/about/cinematic-light.jpg'}
                alt={props.feature1ImgAlt || 'Cinematic lighting'}
                className="a-cinematic-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 1 && (
              <img
                src={props.feature2ImgSrc || '/about/cohesive-frame.jpg'}
                alt={props.feature2ImgAlt || 'Cohesive visual frame'}
                className="a-cinematic-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 2 && (
              <img
                src={props.feature3ImgSrc || '/about/multidisciplinary.jpg'}
                alt={props.feature3ImgAlt || 'Multidisciplinary workflow'}
                className="a-cinematic-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .a-cinematic-approach-container2 {
          width: 100%;
          display: grid;
          gap: var(--dl-layout-space-fiveunits);
          grid-template-columns: 1fr 1fr;
        }

        .a-cinematic-approach-thq-tabs-menu-elm {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          justify-content: center;
        }

        /* Center image */
        .a-cinematic-approach-thq-image-container-elm {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }

        .a-cinematic-img {
          width: 100%;
          max-height: 520px;
          object-fit: cover;
          border-radius: 14px;
          animation: fadeIn 300ms ease;
          border: 1px solid rgba(245, 244, 244, 0.12);
        }

        @media (max-width: 991px) {
          .a-cinematic-approach-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .a-cinematic-approach-thq-tabs-menu-elm {
            order: 2;
          }
        }
      `}</style>
    </>
  )
}

ACinematicApproach.defaultProps = {
  rootClassName: '',
  feature1ImgSrc: '/about/cinematic-light.jpg',
  feature2ImgSrc: '/about/cohesive-frame.jpg',
  feature3ImgSrc: '/about/multidisciplinary.jpg',

  feature1ImgAlt: 'Cinematic lighting',
  feature2ImgAlt: 'Cohesive visual frame',
  feature3ImgAlt: 'Multidisciplinary workflow',
}

ACinematicApproach.propTypes = {
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

export default ACinematicApproach
