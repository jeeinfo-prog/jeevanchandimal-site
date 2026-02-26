import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ACinematicApproach = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="a-cinematic-approach-container2 thq-section-max-width">
          {/* TEXT TABS */}
          <div className="a-cinematic-approach-thq-tabs-menu-elm">
            <button
              type="button"
              onClick={() => setActiveTab(0)}
              className={`cinTab menuItem ${activeTab === 0 ? 'isActiveItem' : ''}`}
            >
              <div className="cinTabInner">
                <h2 className="thq-heading-2">{props.feature1Title ?? <span>A Cinematic Approach</span>}</h2>
                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <span>
                      I work with a film-led mindset, even when the output is still imagery or sound. Lighting is treated
                      as narrative, movement is deliberate, and sound supports emotion.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(1)}
              className={`cinTab menuItem ${activeTab === 1 ? 'isActiveItem' : ''}`}
            >
              <div className="cinTabInner">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <span>This approach allows each project to feel cohesive — not assembled.</span>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(2)}
              className={`cinTab menuItem ${activeTab === 2 ? 'isActiveItem' : ''}`}
            >
              <div className="cinTabInner">
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <span>
                      Film, photography, audio, and animation are developed side by side — not added in layers. The
                      result is restrained and immersive.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>
          </div>

          {/* IMAGE PANEL */}
          <div className="a-cinematic-approach-thq-image-container-elm">
            <div className="imgCard">
              {activeTab === 0 && (
                <img
                  src={props.feature1ImgSrc || '/about/cinematic-light.jpg'}
                  alt={props.feature1ImgAlt || 'Cinematic lighting'}
                  className="a-cinematic-img"
                  loading="lazy"
                />
              )}

              {activeTab === 1 && (
                <img
                  src={props.feature2ImgSrc || '/about/cohesive-frame.jpg'}
                  alt={props.feature2ImgAlt || 'Cohesive visual frame'}
                  className="a-cinematic-img"
                  loading="lazy"
                />
              )}

              {activeTab === 2 && (
                <img
                  src={props.feature3ImgSrc || '/about/multidisciplinary.jpg'}
                  alt={props.feature3ImgAlt || 'Multidisciplinary workflow'}
                  className="a-cinematic-img"
                  loading="lazy"
                />
              )}

              <div className="imgOverlay" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .a-cinematic-approach-container2 {
          width: 100%;
          display: grid;
          gap: var(--dl-layout-space-fiveunits);
          grid-template-columns: 1fr 1fr;
          align-items: center; /* ✅ center text + image together */
        }

        .a-cinematic-approach-thq-tabs-menu-elm {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          justify-content: center;
        }

        .cinTab {
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

        .cinTabInner {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* ✅ hover = BLUE text */
        .menuItem:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
          color: #25c3e2 !important;
        }

        .cinTab:hover {
          transform: translateY(-3px) scale(1.01);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(37, 195, 226, 0.15);
        }

        /* active item stays blue */
        .menuItem.isActiveItem {
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.2), rgba(37, 195, 226, 0.08));
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

        .cinTab:hover .hoverArrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ✅ image wrapper */
        .a-cinematic-approach-thq-image-container-elm {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .imgCard {
          position: relative;
          width: 100%;
          height: 360px; /* ✅ match your cinematic card height */
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
          background: rgba(0, 0, 0, 0.2);
        }

        .a-cinematic-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 320ms ease, filter 320ms ease;
        }

        .imgCard:hover .a-cinematic-img {
          transform: scale(1.05);
          filter: saturate(1.08) contrast(1.06);
        }

        .imgOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.5));
          opacity: 0.9;
          pointer-events: none;
        }

        @media (max-width: 991px) {
          .a-cinematic-approach-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .a-cinematic-approach-thq-tabs-menu-elm {
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