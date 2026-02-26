import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const Process01 = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  const [paused, setPaused] = useState(false)

  const images = useMemo(() => {
    const t0 = (props.feature1Imgs?.length ? props.feature1Imgs : [props.feature1ImgSrc]).filter(Boolean)
    const t1 = (props.feature2Imgs?.length ? props.feature2Imgs : [props.feature2ImgSrc]).filter(Boolean)
    const t2 = (props.feature3Imgs?.length ? props.feature3Imgs : [props.feature3ImgSrc]).filter(Boolean)
    return {
      0: t0.length ? t0 : ['/about/process-concept.jpg'],
      1: t1.length ? t1 : ['/about/process-observation.jpg'],
      2: t2.length ? t2 : ['/about/process-detail.jpg'],
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

  const currentIdx = activeTab === 0 ? i0 : activeTab === 1 ? i1 : i2
  const pool = images[activeTab] || []
  const safeLen = pool.length || 1

  const currentSrc = pool[currentIdx % safeLen] || '/about/process-concept.jpg'
  const bottomSrc = pool.length > 1 ? pool[(currentIdx + 1) % safeLen] : currentSrc

  const currentAlt =
    activeTab === 0
      ? props.feature1ImgAlt || 'Concept planning'
      : activeTab === 1
      ? props.feature2ImgAlt || 'Observation and framing'
      : props.feature3ImgAlt || 'Craft and detail'

  const onTab = (n) => {
    setActiveTab(n)
    setPaused(true)
    window.setTimeout(() => setPaused(false), 7000)
  }

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="process-01-container2 thq-section-max-width">
          {/* TEXT TABS */}
          <div className="process-01-thq-tabs-menu-elm">
            <button
              type="button"
              onClick={() => onTab(0)}
              className={`processTab menuItem ${activeTab === 0 ? 'isActiveItem' : ''}`}
            >
              <div className="processTabInner">
                <h2 className="thq-heading-2">{props.feature1Title2 ?? <span>Process</span>}</h2>
                <h3 className="thq-heading-3">{props.feature1Title11 ?? <span>Concept First</span>}</h3>
                <span className="thq-body-small">
                  {props.feature1Description2 ?? (
                    <span>
                      Every collaboration begins with intention. Atmosphere, emotional direction, and story are defined
                      before production begins.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>

            <button
              type="button"
              onClick={() => onTab(1)}
              className={`processTab menuItem ${activeTab === 1 ? 'isActiveItem' : ''}`}
            >
              <div className="processTabInner">
                <h3 className="thq-heading-3">{props.feature3Title ?? <span>Observation Over Noise</span>}</h3>
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <span>
                      I prefer quiet moments to forced gestures. Real presence over performance. Stillness often reveals
                      more than motion.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>

            <button
              type="button"
              onClick={() => onTab(2)}
              className={`processTab menuItem ${activeTab === 2 ? 'isActiveItem' : ''}`}
            >
              <div className="processTabInner">
                <h3 className="thq-heading-3">{props.feature3Title1 ?? <span>Craft & Detail</span>}</h3>
                <span className="thq-body-small">
                  {props.feature3Description1 ?? (
                    <span>
                      From lighting and composition to sound texture and pacing, every element is refined with care.
                      Small decisions shape the final experience.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>
          </div>

          {/* RIGHT STACKED IMAGES */}
          <div
            className="process-01-thq-image-container-elm"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="imgColumn">
              <div className="imgCard small">
                <img src={currentSrc} alt={currentAlt} className="process-img" loading="lazy" />
                <div className="imgOverlay" />
              </div>

              <div className="imgCard small">
                <img src={bottomSrc} alt="Supporting process frame" className="process-img" loading="lazy" />
                <div className="imgOverlay" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .process-01-container2 {
  width: 100%;
  display: grid;
  gap: var(--dl-layout-space-fiveunits);
  grid-template-columns: 1fr 1fr;
  align-items: center; /* ✅ vertical center */
}

        .process-01-thq-tabs-menu-elm {
  display: flex;
  flex-direction: column;
  gap: var(--dl-layout-space-twounits);
  justify-content: center; /* ✅ center inside column */
}

        .processTab {
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

        .processTabInner {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .menuItem:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
          color: #25c3e2 !important;
        }

        .processTab:hover {
          transform: translateY(-3px) scale(1.01);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(37, 195, 226, 0.15);
        }

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

        .processTab:hover .hoverArrow {
          opacity: 1;
          transform: translateX(0);
        }

        .process-01-thq-image-container-elm {
  display: flex;
  align-items: center;
  justify-content: center;
}

        /* ✅ right column: top + bottom */
        .imgColumn {
  width: 100%;
  height: 740px; /* ✅ total block */
  display: flex;
  flex-direction: column;
  gap: 20px; /* ✅ ensures total feels like 740 */
}

        .imgCard.small {
          position: relative;
          width: 100%;
          height: 360px; /* ✅ each image */
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
          background: rgba(0, 0, 0, 0.2);
        }

        .process-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 320ms ease, filter 320ms ease;
        }

        .imgCard.small:hover .process-img {
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
          .process-01-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .imgColumn {
            height: auto;
          }

          .imgCard.small {
            height: 320px;
          }
        }
      `}</style>
    </>
  )
}

Process01.defaultProps = {
  rootClassName: '',

  feature1ImgSrc: '/about/process-concept.jpg',
  feature2ImgSrc: '/about/process-observation.jpg',
  feature3ImgSrc: '/about/process-detail.jpg',

  feature1ImgAlt: 'Concept planning',
  feature2ImgAlt: 'Observation and framing',
  feature3ImgAlt: 'Craft and detail',

  feature1Imgs: undefined,
  feature2Imgs: undefined,
  feature3Imgs: undefined,
}

Process01.propTypes = {
  rootClassName: PropTypes.string,

  feature1Title2: PropTypes.element,
  feature1Title11: PropTypes.element,
  feature1Description2: PropTypes.element,

  feature3Title: PropTypes.element,
  feature3Description: PropTypes.element,

  feature3Title1: PropTypes.element,
  feature3Description1: PropTypes.element,

  feature1ImgSrc: PropTypes.string,
  feature2ImgSrc: PropTypes.string,
  feature3ImgSrc: PropTypes.string,

  feature1ImgAlt: PropTypes.string,
  feature2ImgAlt: PropTypes.string,
  feature3ImgAlt: PropTypes.string,

  feature1Imgs: PropTypes.arrayOf(PropTypes.string),
  feature2Imgs: PropTypes.arrayOf(PropTypes.string),
  feature3Imgs: PropTypes.arrayOf(PropTypes.string),
}

export default Process01