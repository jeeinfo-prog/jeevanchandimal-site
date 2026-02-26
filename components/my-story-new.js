import React, { useState } from 'react'
import PropTypes from 'prop-types'

const MyStoryNew = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  const onTab = (n) => setActiveTab(n)

  const getImg = () => {
    if (activeTab === 0) return props.feature1ImgSrc || '/about/story.jpg'
    if (activeTab === 1) return props.feature2ImgSrc || '/about/language.jpg'
    if (activeTab === 2) return props.feature3ImgSrc || '/about/process.jpg'
    return props.feature4ImgSrc || '/about/concept.jpg'
  }

  const getAlt = () => {
    if (activeTab === 0) return props.feature1ImgAlt || 'Jeevan Chandimal portrait'
    if (activeTab === 1) return props.feature2ImgAlt || 'Visual language'
    if (activeTab === 2) return props.feature3ImgAlt || 'Creative process'
    return props.feature4ImgAlt || 'Concept development'
  }

  return (
    <>
      <div className="thq-section-padding">
        <div className="my-story-new-container2 thq-section-max-width">

          {/* LEFT TABS */}
          <div className="my-story-new-thq-tabs-menu-elm">

            <button
              type="button"
              onClick={() => onTab(0)}
              className={`storyTab menuItem ${activeTab === 0 ? 'isActiveItem' : ''}`}
            >
              <div className="storyTabInner">
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
              <span className="hoverArrow">→</span>
            </button>

            <button
              type="button"
              onClick={() => onTab(1)}
              className={`storyTab menuItem ${activeTab === 1 ? 'isActiveItem' : ''}`}
            >
              <div className="storyTabInner">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <span>
                      Image, movement, and sound are treated as a single language —
                      developed together, shaped with intention, and refined through atmosphere.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>

            <button
              type="button"
              onClick={() => onTab(2)}
              className={`storyTab menuItem ${activeTab === 2 ? 'isActiveItem' : ''}`}
            >
              <div className="storyTabInner">
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <span>
                      My work is built on stillness, observation, and control.
                      Mood is defined before the frame, intention before motion.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>

            <button
              type="button"
              onClick={() => onTab(3)}
              className={`storyTab menuItem ${activeTab === 3 ? 'isActiveItem' : ''}`}
            >
              <div className="storyTabInner">
                <span className="thq-body-small">
                  {props.feature3Description1 ?? (
                    <span>
                      Every project begins with a concept — not a format.
                      Story, tone, and presence guide the final form.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>

          </div>

          {/* RIGHT IMAGE */}
          <div className="my-story-new-thq-image-container-elm">
            <div className="imgCard">
              <img src={getImg()} alt={getAlt()} className="story-img" loading="lazy" />
              <div className="imgOverlay" />
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .my-story-new-container2 {
          width: 100%;
          display: grid;
          gap: var(--dl-layout-space-fiveunits);
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }

        .my-story-new-thq-tabs-menu-elm {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          justify-content: center;
        }

        .storyTab {
          width: 100%;
          text-align: left;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          padding: 18px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: #f5f4f4;
          opacity: 0.92;
          transition: all 0.22s ease;
        }

        .storyTabInner {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .menuItem:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
          color: #25c3e2 !important;
        }

        .storyTab:hover {
          transform: translateY(-3px) scale(1.01);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(37, 195, 226, 0.15);
        }

        .menuItem.isActiveItem {
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.2),
            rgba(37, 195, 226, 0.08)
          );
          border: 1px solid rgba(37, 195, 226, 0.18);
          color: #25c3e2 !important;
          opacity: 1;
          font-weight: 700;
        }

        .hoverArrow {
          font-size: 18px;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 220ms ease;
          color: #25c3e2;
        }

        .storyTab:hover .hoverArrow {
          opacity: 1;
          transform: translateX(0);
        }

        .my-story-new-thq-image-container-elm {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .imgCard {
          position: relative;
          width: 100%;
          height: 360px;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
        }

        .story-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 320ms ease, filter 320ms ease;
        }

        .imgCard:hover .story-img {
          transform: scale(1.05);
          filter: saturate(1.08) contrast(1.06);
        }

        .imgOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0.5)
          );
          opacity: 0.9;
          pointer-events: none;
        }

        @media (max-width: 991px) {
          .my-story-new-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .my-story-new-thq-tabs-menu-elm {
            order: 2;
          }

          .imgCard {
            height: 320px;
          }
        }
      `}</style>
    </>
  )
}

MyStoryNew.defaultProps = {
  feature1ImgSrc: '/about/story.jpg',
  feature2ImgSrc: '/about/language.jpg',
  feature3ImgSrc: '/about/process.jpg',
  feature4ImgSrc: '/about/concept.jpg',
}

export default MyStoryNew