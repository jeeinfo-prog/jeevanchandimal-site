import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Philosophy = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="philosophy-container2 thq-section-max-width">

          {/* TABS */}
          <div className="philosophy-thq-tabs-menu-elm">

            {/* TAB 1 */}
            <div onClick={() => setActiveTab(0)} className="philosophy-thq-tab-horizontal-elm1">
              <div className="philosophy-thq-divider-container-elm1">
                {activeTab === 0 && <div className="philosophy-container3" />}
              </div>

              <div className="philosophy-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title ?? <span>Philosophy</span>}
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
            <div onClick={() => setActiveTab(1)} className="philosophy-thq-tab-horizontal-elm2">
              <div className="philosophy-thq-divider-container-elm2">
                {activeTab === 1 && <div className="philosophy-container4" />}
              </div>

              <div className="philosophy-thq-content-elm2">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <span>
                      Whether it’s a film, a photograph, or a soundscape, the
                      goal is the same — create work that carries emotion,
                      texture, and presence. Story over spectacle. Mood over
                      noise. Meaning over excess.
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* IMAGE PANEL */}
          <div className="philosophy-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                src={props.feature1ImgSrc || '/about/philosophy-mood.jpg'}
                alt={props.feature1ImgAlt || 'Moody cinematic frame'}
                className="philo-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 1 && (
              <img
                src={props.feature2ImgSrc || '/about/philosophy-presence.jpg'}
                alt={props.feature2ImgAlt || 'Atmospheric visual presence'}
                className="philo-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .philosophy-container2 {
          width: 100%;
          display: grid;
          gap: var(--dl-layout-space-fiveunits);
          grid-template-columns: 1fr 1fr;
        }

        .philosophy-thq-tabs-menu-elm {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          justify-content: center;
        }

        /* Center image vertically */
        .philosophy-thq-image-container-elm {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }

        .philo-img {
          width: 100%;
          max-height: 520px;
          object-fit: cover;
          border-radius: 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          animation: fadeIn 300ms ease;
        }

        @media (max-width: 991px) {
          .philosophy-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .philosophy-thq-tabs-menu-elm {
            order: 2;
          }
        }
      `}</style>
    </>
  )
}

Philosophy.defaultProps = {
  rootClassName: '',

  feature1ImgSrc: '/about/philosophy-mood.jpg',
  feature2ImgSrc: '/about/philosophy-presence.jpg',

  feature1ImgAlt: 'Moody cinematic frame',
  feature2ImgAlt: 'Atmospheric visual presence',
}

Philosophy.propTypes = {
  rootClassName: PropTypes.string,

  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature2Description: PropTypes.element,

  feature1ImgSrc: PropTypes.string,
  feature2ImgSrc: PropTypes.string,

  feature1ImgAlt: PropTypes.string,
  feature2ImgAlt: PropTypes.string,
}

export default Philosophy
