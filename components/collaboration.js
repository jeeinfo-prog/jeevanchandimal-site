import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Collaboration = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="collaboration-container2 thq-section-max-width">

          {/* TABS */}
          <div className="collaboration-thq-tabs-menu-elm">

            {/* TAB 1 */}
            <div onClick={() => setActiveTab(0)} className="collaboration-thq-tab-horizontal-elm1">
              <div className="collaboration-thq-divider-container-elm1">
                {activeTab === 0 && <div className="collaboration-container3" />}
              </div>

              <div className="collaboration-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title ?? <span>Collaboration</span>}
                </h2>

                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <span>
                      I work with individuals, brands, and agencies who value
                      clarity, mood, and storytelling over volume.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 2 */}
            <div onClick={() => setActiveTab(1)} className="collaboration-thq-tab-horizontal-elm2">
              <div className="collaboration-thq-divider-container-elm2">
                {activeTab === 1 && <div className="collaboration-container4" />}
              </div>

              <div className="collaboration-thq-content-elm2">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <span>
                      Projects are selected carefully to ensure focus and quality
                      at every stage — from concept through final delivery.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 3 */}
            <div onClick={() => setActiveTab(2)} className="collaboration-thq-tab-horizontal-elm3">
              <div className="collaboration-thq-divider-container-elm3">
                {activeTab === 2 && <div className="collaboration-container5" />}
              </div>

              <div className="collaboration-thq-content-elm3">
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <span>
                      If you’re looking for work that feels cinematic, grounded,
                      and thoughtfully crafted, we’re likely aligned.
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* IMAGE PANEL */}
          <div className="collaboration-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                src={props.feature1ImgSrc || '/about/collab-portrait.jpg'}
                alt={props.feature1ImgAlt || 'Working with client on set'}
                className="collab-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 1 && (
              <img
                src={props.feature2ImgSrc || '/about/collab-direction.jpg'}
                alt={props.feature2ImgAlt || 'Creative direction session'}
                className="collab-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 2 && (
              <img
                src={props.feature3ImgSrc || '/about/collab-team.jpg'}
                alt={props.feature3ImgAlt || 'Collaborative production team'}
                className="collab-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .collaboration-container2 {
          width: 100%;
          display: grid;
          gap: var(--dl-layout-space-fiveunits);
          grid-template-columns: 1fr 1fr;
        }

        .collaboration-thq-tabs-menu-elm {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          justify-content: center;
        }

        /* Center image vertically */
        .collaboration-thq-image-container-elm {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }

        .collab-img {
          width: 100%;
          max-height: 520px;
          object-fit: cover;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          animation: fadeIn 300ms ease;
        }

        @media (max-width: 991px) {
          .collaboration-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .collaboration-thq-tabs-menu-elm {
            order: 2;
          }
        }
      `}</style>
    </>
  )
}

Collaboration.defaultProps = {
  rootClassName: '',

  feature1ImgSrc: '/about/collab-portrait.jpg',
  feature2ImgSrc: '/about/collab-direction.jpg',
  feature3ImgSrc: '/about/collab-team.jpg',

  feature1ImgAlt: 'Working with client on set',
  feature2ImgAlt: 'Creative direction session',
  feature3ImgAlt: 'Collaborative production team',
}

Collaboration.propTypes = {
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

export default Collaboration
