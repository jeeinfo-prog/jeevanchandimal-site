import React, { useState } from 'react'
import PropTypes from 'prop-types'

const MyStoryNew = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className="thq-section-padding">
        <div className="my-story-new-container2 thq-section-max-width">
          <div className="my-story-new-thq-tabs-menu-elm">
            {/* TAB 1 */}
            <div
              onClick={() => setActiveTab(0)}
              className="my-story-new-thq-tab-horizontal-elm1"
            >
              <div className="my-story-new-thq-divider-container-elm1">
                {activeTab === 0 && <div className="my-story-new-container3" />}
              </div>

              <div className="my-story-new-thq-content-elm1">
                <h2 className="thq-heading-2">
                  {props.feature1Title ?? <span>My Story</span>}
                </h2>

                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <span>
                      I’m Jeevan Chandimal – a filmmaker and visual storyteller
                      working across film, photography, sound, and motion.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 2 */}
            <div
              onClick={() => setActiveTab(1)}
              className="my-story-new-thq-tab-horizontal-elm2"
            >
              <div className="my-story-new-thq-divider-container-elm2">
                {activeTab === 1 && <div className="my-story-new-container4" />}
              </div>

              <div className="my-story-new-thq-content-elm2">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <span>
                      Image, movement, and sound are treated as a single language
                      — developed together, shaped with intention, and refined
                      through atmosphere.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 3 */}
            <div
              onClick={() => setActiveTab(2)}
              className="my-story-new-thq-tab-horizontal-elm3"
            >
              <div className="my-story-new-thq-divider-container-elm3">
                {activeTab === 2 && <div className="my-story-new-container5" />}
              </div>

              <div className="my-story-new-thq-content-elm3">
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <span>
                      My work is built on stillness, observation, and control.
                      Mood is defined before the frame, intention before motion.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 4 (FIXED) */}
            <div
              onClick={() => setActiveTab(3)}
              className="my-story-new-thq-tab-horizontal-elm4"
            >
              <div className="my-story-new-thq-divider-container-elm4">
                {activeTab === 3 && <div className="my-story-new-container6" />}
              </div>

              <div className="my-story-new-thq-content-elm4">
                <span className="thq-body-small">
                  {props.feature3Description1 ?? (
                    <span>
                      Every project begins with a concept — not a format. Story,
                      tone, and presence guide the final form.
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* IMAGE PANEL */}
          <div className="my-story-new-thq-image-container-elm">
            {activeTab === 0 && (
              <img
                src={props.feature1ImgSrc || '/about/story.jpg'}
                alt={props.feature1ImgAlt || 'Jeevan Chandimal portrait'}
                className="my-story-new-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 1 && (
              <img
                src={props.feature2ImgSrc || '/about/language.jpg'}
                alt={props.feature2ImgAlt || 'Visual language'}
                className="my-story-new-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 2 && (
              <img
                src={props.feature3ImgSrc || '/about/process.jpg'}
                alt={props.feature3ImgAlt || 'Creative process'}
                className="my-story-new-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}

            {activeTab === 3 && (
              <img
                src={props.feature4ImgSrc || '/about/concept.jpg'}
                alt={props.feature4ImgAlt || 'Concept development'}
                className="my-story-new-img thq-img-ratio-16-9"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .my-story-new-container2 {
          width: 100%;
          display: grid;
          gap: var(--dl-layout-space-fiveunits);
          grid-template-columns: 1fr 1fr;
        }

        .my-story-new-thq-tabs-menu-elm {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          justify-content: center;
        }

        /* Center the image vertically + horizontally */
        .my-story-new-thq-image-container-elm {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }

        .my-story-new-img {
          width: 100%;
          max-height: 520px;
          object-fit: cover;
          border-radius: 14px;
          animation: fadeIn 300ms ease;
          border: 1px solid rgba(245, 244, 244, 0.12);
        }

        @media (max-width: 991px) {
          .my-story-new-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }
        }
      `}</style>
    </>
  )
}

MyStoryNew.defaultProps = {
  feature1Title: undefined,
  feature1Description: undefined,
  feature2Description: undefined,
  feature3Description: undefined,
  feature3Description1: undefined,

  // You can override these from the About page if you want
  feature1ImgSrc: '/about/story.jpg',
  feature2ImgSrc: '/about/language.jpg',
  feature3ImgSrc: '/about/process.jpg',
  feature4ImgSrc: '/about/concept.jpg',

  feature1ImgAlt: 'Jeevan Chandimal portrait',
  feature2ImgAlt: 'Visual language',
  feature3ImgAlt: 'Creative process',
  feature4ImgAlt: 'Concept development',
}

MyStoryNew.propTypes = {
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,

  feature2Description: PropTypes.element,

  feature3Description: PropTypes.element,
  feature3Description1: PropTypes.element,

  feature1ImgSrc: PropTypes.string,
  feature2ImgSrc: PropTypes.string,
  feature3ImgSrc: PropTypes.string,
  feature4ImgSrc: PropTypes.string,

  feature1ImgAlt: PropTypes.string,
  feature2ImgAlt: PropTypes.string,
  feature3ImgAlt: PropTypes.string,
  feature4ImgAlt: PropTypes.string,
}

export default MyStoryNew
