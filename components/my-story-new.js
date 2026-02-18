import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'

const MyStoryNew = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className="thq-section-padding">
        <div className="my-story-new-container2 thq-section-max-width">
          <div className="my-story-new-thq-tabs-menu-elm">

            {/* TAB 1 */}
            <div onClick={() => setActiveTab(0)} className="my-story-new-thq-tab-horizontal-elm1">
              <div className="my-story-new-thq-divider-container-elm1">
                {activeTab === 0 && <div className="my-story-new-container3"></div>}
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
            <div onClick={() => setActiveTab(1)} className="my-story-new-thq-tab-horizontal-elm2">
              <div className="my-story-new-thq-divider-container-elm2">
                {activeTab === 1 && <div className="my-story-new-container4"></div>}
              </div>
              <div className="my-story-new-thq-content-elm2">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <span>
                      Image, movement, and sound are treated as a single language –
                      developed together and refined through atmosphere.
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* TAB 3 */}
            <div onClick={() => setActiveTab(2)} className="my-story-new-thq-tab-horizontal-elm3">
              <div className="my-story-new-thq-divider-container-elm3">
                {activeTab === 2 && <div className="my-story-new-container5"></div>}
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

            {/* TAB 4 – FIXED */}
            <div onClick={() => setActiveTab(3)} className="my-story-new-thq-tab-horizontal-elm4">
              <div className="my-story-new-thq-divider-container-elm4">
                {activeTab === 3 && <div className="my-story-new-container6"></div>}
              </div>
              <div className="my-story-new-thq-content-elm4">
                <span className="thq-body-small">
                  {props.feature3Description1 ?? (
                    <span>
                      Every project begins with a concept – not a format.
                      Story, tone, and presence guide the final form.
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* IMAGE PANEL */}
          <div className="my-story-new-thq-image-container-elm">
            {activeTab === 0 && (
              <img src="/about/story.jpg" alt="Jeevan Chandimal portrait" className="thq-img-ratio-16-9" />
            )}
            {activeTab === 1 && (
              <img src="/about/language.jpg" alt="Visual language" className="thq-img-ratio-16-9" />
            )}
            {activeTab === 2 && (
              <img src="/about/process.jpg" alt="Creative process" className="thq-img-ratio-16-9" />
            )}
            {activeTab === 3 && (
              <img src="/about/concept.jpg" alt="Concept development" className="thq-img-ratio-16-9" />
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

        .my-story-new-thq-image-container-elm img {
          width: 100%;
          border-radius: 14px;
          animation: fadeIn 300ms ease;
        }

        @media (max-width: 991px) {
          .my-story-new-container2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export default MyStoryNew
