import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const Process01 = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  const [paused, setPaused] = useState(false)

  /* ---------- image pools ---------- */
  const images = useMemo(() => {
    const tab1 = (props.feature1Imgs?.length ? props.feature1Imgs : [props.feature1ImgSrc]).filter(Boolean)
    const tab2 = (props.feature2Imgs?.length ? props.feature2Imgs : [props.feature2ImgSrc]).filter(Boolean)
    const tab3 = (props.feature3Imgs?.length ? props.feature3Imgs : [props.feature3ImgSrc]).filter(Boolean)

    return {
      0: tab1.length ? tab1 : ['/about/process-concept.jpg'],
      1: tab2.length ? tab2 : ['/about/process-observation.jpg'],
      2: tab3.length ? tab3 : ['/about/process-detail.jpg'],
    }
  }, [props.feature1Imgs, props.feature2Imgs, props.feature3Imgs, props.feature1ImgSrc, props.feature2ImgSrc, props.feature3ImgSrc])

  const [idx0, setIdx0] = useState(0)
  const [idx1, setIdx1] = useState(0)
  const [idx2, setIdx2] = useState(0)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      if (activeTab === 0) setIdx0((i) => (i + 1) % images[0].length)
      if (activeTab === 1) setIdx1((i) => (i + 1) % images[1].length)
      if (activeTab === 2) setIdx2((i) => (i + 1) % images[2].length)
    }, 4500)
    return () => clearInterval(id)
  }, [paused, activeTab, images])

  const currentSrc =
    activeTab === 0 ? images[0][idx0] : activeTab === 1 ? images[1][idx1] : images[2][idx2]

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

  const bottomImg =
    activeTab === 0
      ? props.feature1ImgAltSrc || '/about/process-concept-2.jpg'
      : activeTab === 1
      ? props.feature2ImgAltSrc || '/about/process-observation-2.jpg'
      : props.feature3ImgAltSrc || '/about/process-detail-2.jpg'

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName}`}>
        <div className="process-01-container2 thq-section-max-width">

          {/* ---------- TEXT TABS ---------- */}
          <div className="process-01-thq-tabs-menu-elm">
            <button
              type="button"
              onClick={() => onTab(0)}
              className={`processTab menuItem ${activeTab === 0 ? 'isActiveItem' : ''}`}
            >
              <div>
                <h2 className="thq-heading-2">{props.feature1Title2 ?? <span>Process</span>}</h2>
                <h3 className="thq-heading-3">{props.feature1Title11 ?? <span>Concept First</span>}</h3>
                <span className="thq-body-small">
                  {props.feature1Description2 ?? (
                    <span>
                      Every collaboration begins with intention. Atmosphere, emotional direction,
                      and story are defined before production begins.
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
              <div>
                <h3 className="thq-heading-3">{props.feature3Title ?? <span>Observation Over Noise</span>}</h3>
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <span>
                      I prefer quiet moments to forced gestures. Real presence over performance.
                      Stillness often reveals more than motion.
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
              <div>
                <h3 className="thq-heading-3">{props.feature3Title1 ?? <span>Craft & Detail</span>}</h3>
                <span className="thq-body-small">
                  {props.feature3Description1 ?? (
                    <span>
                      From lighting and composition to sound texture and pacing, every element is refined with care.
                    </span>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>
          </div>

          {/* ---------- RIGHT IMAGE STACK ---------- */}
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
                <img src={bottomImg} alt="Supporting process frame" className="process-img" loading="lazy" />
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
          align-items: center;
        }

        .process-01-thq-tabs-menu-elm {
          display: flex;
          flex-direction: column;
          gap: var(--dl-layout-space-twounits);
          justify-content: center;
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

        .menuItem:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
          color: #25c3e2 !important;
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

        .imgColumn {
          width: 100%;
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: var(--dl-layout-space-oneandhalfunits);
          height: 360px;
        }

        .imgCard.small {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
        }

        .process-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
}

export default Process01