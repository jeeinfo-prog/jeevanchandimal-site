import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const TheWork = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  const [paused, setPaused] = useState(false)

  const images = useMemo(() => {
    const t0 = (props.feature1Imgs?.length ? props.feature1Imgs : [props.feature1ImgSrc]).filter(Boolean)
    const t1 = (props.feature2Imgs?.length ? props.feature2Imgs : [props.feature2ImgSrc]).filter(Boolean)
    const t2 = (props.feature3Imgs?.length ? props.feature3Imgs : [props.feature3ImgSrc]).filter(Boolean)

    return {
      0: t0.length ? t0 : ['/about/work-film.jpg'],
      1: t1.length ? t1 : ['/about/work-minimal.jpg'],
      2: t2.length ? t2 : ['/about/work-collaboration.jpg'],
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

  const currentSrc =
    activeTab === 0 ? images[0][i0] : activeTab === 1 ? images[1][i1] : images[2][i2]

  const currentAlt =
    activeTab === 0
      ? props.feature1ImgAlt || 'Narrative film still'
      : activeTab === 1
      ? props.feature2ImgAlt || 'Minimal visual composition'
      : props.feature3ImgAlt || 'Collaborative production'

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="the-work-container2 thq-section-max-width">
          {/* TABS */}
          <div className="the-work-thq-tabs-menu-elm">
            {[0, 1, 2].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => onTab(tab)}
                className={`workTab menuItem ${activeTab === tab ? 'isActiveItem' : ''}`}
              >
                <div className="workTabInner">
                  {tab === 0 && (
                    <>
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
                    </>
                  )}

                  {tab === 1 && (
                    <span className="thq-body-small">
                      {props.feature2Description ?? (
                        <span>
                          Some are expansive. Some are minimal. All are approached
                          as complete visual experiences.
                        </span>
                      )}
                    </span>
                  )}

                  {tab === 2 && (
                    <span className="thq-body-small">
                      {props.feature3Description ?? (
                        <span>
                          I work both independently and in collaboration,
                          depending on the scale and needs of the project. Each
                          production is built intentionally — with the right
                          tools, pace, and team.
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <span className="hoverArrow">→</span>
              </button>
            ))}
          </div>

          {/* IMAGE PANEL */}
          <div
            className="the-work-thq-image-container-elm"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="imgCard">
              <img src={currentSrc} alt={currentAlt} className="thework-img" loading="lazy" />
              <div className="imgOverlay" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .the-work-container2 {
  width: 100%;
  display: grid;
  gap: var(--dl-layout-space-fiveunits);
  grid-template-columns: 1fr 1fr;
  align-items: center; /* ✅ center text & image vertically */
}

        .the-work-thq-tabs-menu-elm {
  display: flex;
  flex-direction: column;
  gap: var(--dl-layout-space-twounits);
  justify-content: center; /* ✅ vertical center */
}

        /* TAB CARD */
        .workTab {
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
        }

        .workTabInner {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .menuItem:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
          color: #25c3e2 !important;
        }

        .workTab:hover {
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

        .workTab:hover .hoverArrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* IMAGE CARD (same as others) */
        .imgCard {
          position: relative;
          width: 100%;
          height: 360px;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
        }

        .thework-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 320ms ease, filter 320ms ease;
        }

        .imgCard:hover .thework-img {
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
        }

        @media (max-width: 991px) {
          .the-work-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .the-work-thq-tabs-menu-elm {
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

TheWork.defaultProps = {
  rootClassName: '',
  feature1ImgSrc: '/about/work-film.jpg',
  feature2ImgSrc: '/about/work-minimal.jpg',
  feature3ImgSrc: '/about/work-collaboration.jpg',
}

export default TheWork