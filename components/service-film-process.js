// components/service-film-process.js
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const ServiceFilmProcess = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  const [paused, setPaused] = useState(false)

  // ✅ Same image source behavior as Process01 (supports arrays + single fallback)
  const images = useMemo(() => {
    const t0 = (
      props.feature1Imgs?.length ? props.feature1Imgs : [props.feature1ImgSrc]
    ).filter(Boolean)

    const t1 = (
      props.feature2Imgs?.length ? props.feature2Imgs : [props.feature2ImgSrc]
    ).filter(Boolean)

    const t2 = (
      props.feature3Imgs?.length ? props.feature3Imgs : [props.feature3ImgSrc]
    ).filter(Boolean)

    return {
      0: t0.length ? t0 : ['/services/film/process/process-01.jpg'],
      1: t1.length ? t1 : ['/services/film/process/process-02.jpg'],
      2: t2.length ? t2 : ['/services/film/process/process-03.jpg'],
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

  const currentSrc =
    pool[currentIdx % safeLen] || '/services/film/process/process-01.jpg'

  // ✅ same “two stacked images” idea (top rotates, bottom supports)
  const bottomSrc =
    activeTab === 0
      ? props.bottomImgSrc0 || '/services/film/process/process-bottom-01.jpg'
      : activeTab === 1
      ? props.bottomImgSrc1 || '/services/film/process/process-bottom-02.jpg'
      : props.bottomImgSrc2 || '/services/film/process/process-bottom-03.jpg'

  const currentAlt =
    activeTab === 0
      ? props.feature1ImgAlt || 'Discovery and concept'
      : activeTab === 1
      ? props.feature2ImgAlt || 'Visual direction'
      : props.feature3ImgAlt || 'Production and post'

  const onTab = (n) => {
    setActiveTab(n)
    setPaused(true)
    window.setTimeout(() => setPaused(false), 7000)
  }

  return (
    <>
      <div className={`thq-section-padding ${props.rootClassName || ''}`}>
        <div className="process-01-container2 thq-section-max-width">
          {/* TEXT TABS */}
          <div className="process-01-thq-tabs-menu-elm">
            <button
              type="button"
              onClick={() => onTab(0)}
              className={`processTab menuItem ${
                activeTab === 0 ? 'isActiveItem' : ''
              }`}
            >
              <div className="processTabInner">
                <h2 className="thq-heading-2">
                  {props.feature1Title2 ?? (
                    <Fragment>
                      <span>Process</span>
                    </Fragment>
                  )}
                </h2>

                <h3 className="thq-heading-3">
                  {props.feature1Title11 ?? (
                    <Fragment>
                      <span>Discovery &amp; Concept</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small">
                  {props.feature1Description2 ?? (
                    <Fragment>
                      <span>
                        Understanding the idea, intention, and emotional
                        direction of the project.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>

            <button
              type="button"
              onClick={() => onTab(1)}
              className={`processTab menuItem ${
                activeTab === 1 ? 'isActiveItem' : ''
              }`}
            >
              <div className="processTabInner">
                <h3 className="thq-heading-3">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>Visual Direction</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>
                        Shaping the look, rhythm, and cinematic language of the
                        film.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>

            <button
              type="button"
              onClick={() => onTab(2)}
              className={`processTab menuItem ${
                activeTab === 2 ? 'isActiveItem' : ''
              }`}
            >
              <div className="processTabInner">
                <h3 className="thq-heading-3">
                  {props.feature3Title1 ?? (
                    <Fragment>
                      <span>Production &amp; Post</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small">
                  {props.feature3Description1 ?? (
                    <Fragment>
                      <span>
                        Careful execution through filming, editing, sound design,
                        and grading.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
              <span className="hoverArrow">→</span>
            </button>

            <button
              type="button"
              onClick={() => onTab(3)}
              className={`processTab menuItem ${
                activeTab === 3 ? 'isActiveItem' : ''
              }`}
            >
              <div className="processTabInner">
                <h3 className="thq-heading-3">
                  {props.feature3Title11 ?? (
                    <Fragment>
                      <span>Final Delivery</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small">
                  {props.feature3Description11 ?? (
                    <Fragment>
                      <span>
                        A refined, complete film ready for its intended audience
                        and platform.
                      </span>
                    </Fragment>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    activeTab === 3
                      ? props.finalImgSrc || currentSrc
                      : currentSrc
                  }
                  alt={
                    activeTab === 3
                      ? props.finalImgAlt || 'Final delivery'
                      : currentAlt
                  }
                  className="process-img"
                  loading="lazy"
                />
                <div className="imgOverlay" />
              </div>

              <div className="imgCard small">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    activeTab === 3
                      ? props.finalBottomImgSrc || bottomSrc
                      : bottomSrc
                  }
                  alt="Supporting process frame"
                  className="process-img"
                  loading="lazy"
                />
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

        .processTab:hover .hoverArrow {
          opacity: 1;
          transform: translateX(0);
        }

        .process-01-thq-image-container-elm {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .imgColumn {
          width: 100%;
          height: 740px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .imgCard.small {
          position: relative;
          width: 100%;
          height: 360px;
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
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0.5)
          );
          opacity: 0.9;
          pointer-events: none;
        }

        @media (max-width: 991px) {
          .process-01-container2 {
            grid-template-columns: 1fr;
            gap: var(--dl-layout-space-twounits);
          }

          .process-01-thq-tabs-menu-elm {
            order: 2;
          }

          .imgColumn {
            height: auto;
            gap: var(--dl-layout-space-oneandhalfunits);
          }

          .imgCard.small {
            height: 320px;
          }
        }
      `}</style>
    </>
  )
}

ServiceFilmProcess.defaultProps = {
  rootClassName: '',

  // ✅ single fallback images (still supports arrays via featureXImgs)
  feature1ImgSrc: '/services/film/process/process-01.jpg',
  feature2ImgSrc: '/services/film/process/process-02.jpg',
  feature3ImgSrc: '/services/film/process/process-03.jpg',

  bottomImgSrc0: '/services/film/process/process-bottom-01.jpg',
  bottomImgSrc1: '/services/film/process/process-bottom-02.jpg',
  bottomImgSrc2: '/services/film/process/process-bottom-03.jpg',

  finalImgSrc: '/services/film/process/process-04.jpg',
  finalBottomImgSrc: '/services/film/process/process-bottom-04.jpg',
}

ServiceFilmProcess.propTypes = {
  rootClassName: PropTypes.string,

  // Titles / copy
  feature1Title2: PropTypes.element,
  feature1Title11: PropTypes.element,
  feature1Description2: PropTypes.element,

  feature3Title: PropTypes.element,
  feature3Description: PropTypes.element,

  feature3Title1: PropTypes.element,
  feature3Description1: PropTypes.element,

  feature3Title11: PropTypes.element,
  feature3Description11: PropTypes.element,

  // Images: single + optional arrays (same approach as Process01)
  feature1ImgSrc: PropTypes.string,
  feature2ImgSrc: PropTypes.string,
  feature3ImgSrc: PropTypes.string,

  feature1Imgs: PropTypes.arrayOf(PropTypes.string),
  feature2Imgs: PropTypes.arrayOf(PropTypes.string),
  feature3Imgs: PropTypes.arrayOf(PropTypes.string),

  feature1ImgAlt: PropTypes.string,
  feature2ImgAlt: PropTypes.string,
  feature3ImgAlt: PropTypes.string,

  // Bottom stack images per tab
  bottomImgSrc0: PropTypes.string,
  bottomImgSrc1: PropTypes.string,
  bottomImgSrc2: PropTypes.string,

  // Optional explicit “final delivery” imagery
  finalImgSrc: PropTypes.string,
  finalBottomImgSrc: PropTypes.string,
  finalImgAlt: PropTypes.string,
}

export default ServiceFilmProcess