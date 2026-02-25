import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const Philosophy = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  // ✅ auto-rotate images (every 4.5s) + pause on interaction
  const [paused, setPaused] = useState(false)

  const images = useMemo(() => {
    const tab1 = (props.feature1Imgs?.length ? props.feature1Imgs : [props.feature1ImgSrc]).filter(Boolean)
    const tab2 = (props.feature2Imgs?.length ? props.feature2Imgs : [props.feature2ImgSrc]).filter(Boolean)
    return {
      0: tab1.length ? tab1 : ['/about/philosophy-mood.jpg'],
      1: tab2.length ? tab2 : ['/about/philosophy-presence.jpg'],
    }
  }, [props.feature1Imgs, props.feature2Imgs, props.feature1ImgSrc, props.feature2ImgSrc])

  const [idx0, setIdx0] = useState(0)
  const [idx1, setIdx1] = useState(0)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      if (activeTab === 0) setIdx0((i) => (i + 1) % images[0].length)
      else setIdx1((i) => (i + 1) % images[1].length)
    }, 4500)
    return () => clearInterval(id)
  }, [paused, activeTab, images])

  const currentSrc = activeTab === 0 ? images[0][idx0] : images[1][idx1]
  const currentAlt =
    activeTab === 0 ? props.feature1ImgAlt || 'Moody cinematic frame' : props.feature2ImgAlt || 'Atmospheric visual presence'

  const onTab = (n) => {
    setActiveTab(n)
    setPaused(true)
    window.setTimeout(() => setPaused(false), 7000)
  }

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="philosophy-container2 thq-section-max-width">
          {/* TABS */}
          <div className="philosophy-thq-tabs-menu-elm">
            {/* TAB 1 */}
            <button
              type="button"
              onClick={() => onTab(0)}
              className={`philoTab menuItem ${activeTab === 0 ? 'isActiveItem' : ''}`}
              aria-pressed={activeTab === 0}
            >
              <div className="philoTabInner">
                <h2 className="thq-heading-2">{props.feature1Title ?? <span>Philosophy</span>}</h2>
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
              className={`philoTab menuItem ${activeTab === 1 ? 'isActiveItem' : ''}`}
              aria-pressed={activeTab === 1}
            >
              <div className="philoTabInner">
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <span>
                      Whether it’s a film, a photograph, or a soundscape, the goal is the same — create work that carries
                      emotion, texture, and presence. Story over spectacle. Mood over noise. Meaning over excess.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          {/* IMAGE PANEL */}
          <div
            className="philosophy-thq-image-container-elm"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="imgCard">
              <img src={currentSrc} alt={currentAlt} className="philo-img" loading="lazy" />
              <div className="imgOverlay" />
            </div>

            <div className="imgMeta">
              <span className="imgTag">{activeTab === 0 ? 'PHILOSOPHY' : 'PRESENCE'}</span>
              <span className="imgHint">Auto</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .philosophy-container2 {
          width: 100%;
          display: grid;
          gap: var(--dl-layout-space-fiveunits);
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }

        .philosophy-thq-tabs-menu-elm {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          justify-content: center;
        }

        /* ✅ tab cards (same cinematic hover like SkillsOverview) */
        .philoTab {
          width: 100%;
          text-align: left;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          padding: 18px;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          color: #f5f4f4;
          opacity: 0.92;
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease,
            color 220ms ease;
          position: relative;
          will-change: transform;
        }

        .philoTabInner {
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

        /* ✅ cinematic hover glow + lift */
        .philoTab:hover {
          transform: translateY(-3px) scale(1.01);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(37, 195, 226, 0.15);
          background: rgba(255, 255, 255, 0.03);
        }

        /* active item stays blue */
        .menuItem.isActiveItem {
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.2), rgba(37, 195, 226, 0.08));
          border: 1px solid rgba(37, 195, 226, 0.18);
          color: #25c3e2 !important;
          opacity: 1;
          font-weight: 700;
        }

        .philoTab:focus-visible {
          outline: 2px solid rgba(37, 195, 226, 0.6);
          outline-offset: 3px;
        }

        /* arrow reveal like SkillsOverview */
        .hoverArrow {
          font-size: 18px;
          line-height: 1;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 220ms ease;
          color: #25c3e2;
          padding-top: 2px;
        }

        .philoTab:hover .hoverArrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* IMAGE PANEL */
        .philosophy-thq-image-container-elm {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }

        .imgCard {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
          background: rgba(0, 0, 0, 0.2);
        }

        .philo-img {
          width: 100%;
          max-height: 520px;
          height: auto;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          filter: saturate(1.04) contrast(1.03);
          transition: transform 320ms ease, filter 320ms ease;
          animation: fadeIn 260ms ease;
        }

        /* ✅ same small hover on images */
        .imgCard:hover .philo-img {
          transform: scale(1.05);
          filter: saturate(1.08) contrast(1.06);
        }

        .imgOverlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(70% 70% at 50% 25%, rgba(255, 255, 255, 0.06), transparent 60%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.5));
          opacity: 0.9;
          transition: opacity 320ms ease;
        }

        .imgCard:hover .imgOverlay {
          opacity: 0.98;
        }

        .imgMeta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: rgba(245, 244, 244, 0.9);
        }

        .imgTag {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(34, 34, 34, 0.5);
          border: 1px solid rgba(245, 244, 244, 0.12);
          backdrop-filter: blur(10px);
        }

        .imgHint {
          font-size: 12px;
          opacity: 0.75;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(34, 34, 34, 0.35);
          border: 1px solid rgba(245, 244, 244, 0.1);
          backdrop-filter: blur(10px);
        }

        @keyframes fadeIn {
          from {
            opacity: 0.6;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

  // ✅ optional arrays for auto rotation
  feature1Imgs: undefined,
  feature2Imgs: undefined,
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

  // ✅ pass arrays to auto-change images per tab
  feature1Imgs: PropTypes.arrayOf(PropTypes.string),
  feature2Imgs: PropTypes.arrayOf(PropTypes.string),
}

export default Philosophy