import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const Collaboration = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  const [paused, setPaused] = useState(false)

  // ✅ support optional arrays for auto-rotate per tab
  const images = useMemo(() => {
    const t0 = (props.feature1Imgs?.length ? props.feature1Imgs : [props.feature1ImgSrc]).filter(Boolean)
    const t1 = (props.feature2Imgs?.length ? props.feature2Imgs : [props.feature2ImgSrc]).filter(Boolean)
    const t2 = (props.feature3Imgs?.length ? props.feature3Imgs : [props.feature3ImgSrc]).filter(Boolean)

    return {
      0: t0.length ? t0 : ['/about/collab-portrait.jpg'],
      1: t1.length ? t1 : ['/about/collab-direction.jpg'],
      2: t2.length ? t2 : ['/about/collab-team.jpg'],
    }
  }, [
    props.feature1Imgs,
    props.feature2Imgs,
    props.feature3Imgs,
    props.feature1ImgSrc,
    props.feature2ImgSrc,
    props.feature3ImgSrc,
  ])

  const [i0, setI0] = useState(0)
  const [i1, setI1] = useState(0)
  const [i2, setI2] = useState(0)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      if (activeTab === 0) setI0((i) => (i + 1) % images[0].length)
      if (activeTab === 1) setI1((i) => (i + 1) % images[1].length)
      if (activeTab === 2) setI2((i) => (i + 1) % images[2].length)
    }, 4500)
    return () => clearInterval(id)
  }, [paused, activeTab, images])

  const onTab = (n) => {
    setActiveTab(n)
    setPaused(true)
    window.setTimeout(() => setPaused(false), 7000)
  }

  const currentSrc = activeTab === 0 ? images[0][i0] : activeTab === 1 ? images[1][i1] : images[2][i2]
  const currentAlt =
    activeTab === 0
      ? props.feature1ImgAlt || 'Working with client on set'
      : activeTab === 1
      ? props.feature2ImgAlt || 'Creative direction session'
      : props.feature3ImgAlt || 'Collaborative production team'

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="collaboration-container2 thq-section-max-width">
          {/* TABS */}
          <div className="collaboration-thq-tabs-menu-elm">
            {/* TAB 1 */}
            <button
              type="button"
              onClick={() => onTab(0)}
              className={`collabTab menuItem ${activeTab === 0 ? 'isActiveItem' : ''}`}
            >
              <div className="collabTabInner">
                <h2 className="thq-heading-2">{props.feature1Title ?? <span>Collaboration</span>}</h2>
                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <span>
                      I work with individuals, brands, and agencies who value clarity, mood, and storytelling over volume.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow" aria-hidden="true">
                →
              </span>
            </button>

            {/* TAB 2 */}
            <button
              type="button"
              onClick={() => onTab(1)}
              className={`collabTab menuItem ${activeTab === 1 ? 'isActiveItem' : ''}`}
            >
              <div className="collabTabInner">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <span>
                      Projects are selected carefully to ensure focus and quality at every stage — from concept through
                      final delivery.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow" aria-hidden="true">
                →
              </span>
            </button>

            {/* TAB 3 */}
            <button
              type="button"
              onClick={() => onTab(2)}
              className={`collabTab menuItem ${activeTab === 2 ? 'isActiveItem' : ''}`}
            >
              <div className="collabTabInner">
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <span>
                      If you’re looking for work that feels cinematic, grounded, and thoughtfully crafted, we’re likely
                      aligned.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          {/* IMAGE PANEL (✅ same card height + same hover like Philosophy) */}
          <div
            className="collaboration-thq-image-container-elm"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="imgCard">
              <img src={currentSrc} alt={currentAlt} className="collab-img" loading="lazy" />
              <div className="imgOverlay" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .collaboration-container2 {
  width: 100%;
  display: grid;
  gap: var(--dl-layout-space-fiveunits);
  grid-template-columns: 1fr 1fr;
  align-items: center; /* ✅ center */
}

        .collaboration-thq-tabs-menu-elm {
  display: flex;
  flex-direction: column;
  gap: var(--dl-layout-space-twounits);
  justify-content: center; /* ✅ center text */
}

        /* ✅ Tab cards (same cinematic effects) */
        .collabTab {
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
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease,
            background 220ms ease, color 220ms ease;
          position: relative;
          will-change: transform;
        }

        .collabTabInner {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .menuItem:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
          color: #25c3e2 !important;
        }

        .collabTab:hover {
          transform: translateY(-3px) scale(1.01);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(37, 195, 226, 0.15);
          background: rgba(255, 255, 255, 0.03);
        }

        .menuItem.isActiveItem {
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.2), rgba(37, 195, 226, 0.08));
          border: 1px solid rgba(37, 195, 226, 0.18);
          color: #25c3e2 !important;
          opacity: 1;
          font-weight: 700;
        }

        .collabTab:focus-visible {
          outline: 2px solid rgba(37, 195, 226, 0.6);
          outline-offset: 3px;
        }

        .hoverArrow {
          font-size: 18px;
          line-height: 1;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 220ms ease;
          color: #25c3e2;
          padding-top: 2px;
        }

        .collabTab:hover .hoverArrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* IMAGE PANEL */
        .collaboration-thq-image-container-elm {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }

        /* ✅ same card height as Philosophy */
        .imgCard {
          position: relative;
          width: 100%;
          height: 360px; /* ✅ same */
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
          background: rgba(0, 0, 0, 0.2);
        }

        .collab-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          filter: saturate(1.04) contrast(1.03);
          transition: transform 320ms ease, filter 320ms ease;
        }

        .imgCard:hover .collab-img {
          transform: scale(1.05);
          filter: saturate(1.08) contrast(1.06);
        }

        .imgOverlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.5));
          opacity: 0.9;
          transition: opacity 320ms ease;
        }

        .imgCard:hover .imgOverlay {
          opacity: 0.98;
        }

        @media (max-width: 991px) {
          .collaboration-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .collaboration-thq-tabs-menu-elm {
            order: 2;
          }

          .imgCard {
            height: 320px; /* optional nicer on mobile */
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

  // ✅ optional arrays for rotation
  feature1Imgs: undefined,
  feature2Imgs: undefined,
  feature3Imgs: undefined,
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

  // ✅ optional arrays for auto-rotate per tab
  feature1Imgs: PropTypes.arrayOf(PropTypes.string),
  feature2Imgs: PropTypes.arrayOf(PropTypes.string),
  feature3Imgs: PropTypes.arrayOf(PropTypes.string),
}

export default Collaboration