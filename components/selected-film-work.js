import React, { Fragment, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const SelectedFilmWork = (props) => {
  const frames = useMemo(() => {
    const list = [
      { src: props.image1Src, alt: props.image1Alt },
      { src: props.image2Src, alt: props.image2Alt },
      { src: props.image3Src, alt: props.image3Alt },
      { src: props.image4Src, alt: props.image4Alt },
      { src: props.image5Src, alt: props.image5Alt },
      { src: props.image6Src, alt: props.image6Alt },
      { src: props.image7Src, alt: props.image7Alt },
    ].filter((x) => x?.src)

    return list
  }, [
    props.image1Src,
    props.image2Src,
    props.image3Src,
    props.image4Src,
    props.image5Src,
    props.image6Src,
    props.image7Src,
    props.image1Alt,
    props.image2Alt,
    props.image3Alt,
    props.image4Alt,
    props.image5Alt,
    props.image6Alt,
    props.image7Alt,
  ])

  const [activeIdx, setActiveIdx] = useState(-1)

  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span className="t1">Selected Film Work</span>
      </Fragment>
    )

  const descNode =
    props.content1 ?? (
      <Fragment>
        <span className="t2">
          A distilled set of frames — atmosphere first. If you need a full deck,
          request a private selection.
        </span>
      </Fragment>
    )

  // Lightbox keyboard controls
  useEffect(() => {
    function onKey(e) {
      if (activeIdx < 0) return
      if (e.key === 'Escape') setActiveIdx(-1)
      if (e.key === 'ArrowRight')
        setActiveIdx((i) => Math.min(frames.length - 1, i + 1))
      if (e.key === 'ArrowLeft') setActiveIdx((i) => Math.max(0, i - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIdx, frames.length])

  return (
    <>
      <section
        id="selected-film-work"
        className={`wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="shell thq-section-max-width">
          {/* Luxury header */}
          <header className="head">
            <div className="kickerRow">
              <span className="kicker">SELECTED FRAMES</span>
              <span className="dot" aria-hidden="true" />
              <span className="kickerSub">Film · Commercial · Documentary</span>
            </div>

            <h2 className="title thq-heading-2">{headingNode}</h2>
            <p className="desc thq-body-large">{descNode}</p>
          </header>

          {/* Gallery */}
          <div className="grid">
            {/* Column 1 */}
            <div className="col">
              <button className="tile sq" type="button" onClick={() => setActiveIdx(0)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="img" src={props.image1Src} alt={props.image1Alt} loading="lazy" />
                <span className="shade" />
                <span className="frame" />
              </button>

              <button className="tile sq" type="button" onClick={() => setActiveIdx(1)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="img" src={props.image2Src} alt={props.image2Alt} loading="lazy" />
                <span className="shade" />
                <span className="frame" />
              </button>
            </div>

            {/* Column 2 */}
            <div className="col">
              <button className="tile w43" type="button" onClick={() => setActiveIdx(2)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="img" src={props.image3Src} alt={props.image3Alt} loading="lazy" />
                <span className="shade" />
                <span className="frame" />
              </button>

              <button className="tile sq" type="button" onClick={() => setActiveIdx(3)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="img" src={props.image4Src} alt={props.image4Alt} loading="lazy" />
                <span className="shade" />
                <span className="frame" />
              </button>

              <button className="tile w43" type="button" onClick={() => setActiveIdx(4)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="img" src={props.image5Src} alt={props.image5Alt} loading="lazy" />
                <span className="shade" />
                <span className="frame" />
              </button>
            </div>

            {/* Column 3 */}
            <div className="col">
              <button className="tile sq" type="button" onClick={() => setActiveIdx(5)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="img" src={props.image6Src} alt={props.image6Alt} loading="lazy" />
                <span className="shade" />
                <span className="frame" />
              </button>

              <button className="tile sq" type="button" onClick={() => setActiveIdx(6)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="img" src={props.image7Src} alt={props.image7Alt} loading="lazy" />
                <span className="shade" />
                <span className="frame" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeIdx >= 0 && frames[activeIdx] && (
        <div className="lb" onClick={() => setActiveIdx(-1)}>
          <div className="lbInner" onClick={(e) => e.stopPropagation()}>
            <button className="lbClose" type="button" onClick={() => setActiveIdx(-1)} aria-label="Close">
              ✕
            </button>

            <button
              className="lbNav"
              type="button"
              onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
              disabled={activeIdx === 0}
              aria-label="Previous"
            >
              ‹
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lbImg" src={frames[activeIdx].src} alt={frames[activeIdx].alt || 'Preview'} />

            <button
              className="lbNav"
              type="button"
              onClick={() => setActiveIdx((i) => Math.min(frames.length - 1, i + 1))}
              disabled={activeIdx === frames.length - 1}
              aria-label="Next"
            >
              ›
            </button>

            <div className="lbMeta">
              <span className="lbCount">
                {activeIdx + 1} / {frames.length}
              </span>
              <span className="lbAlt">{frames[activeIdx].alt || 'Selected frame'}</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* subtle luxury glow */
        .wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              70% 60% at 50% 0%,
              rgba(37, 195, 226, 0.06),
              rgba(0, 0, 0, 0)
            ),
            linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0));
          opacity: 0.95;
        }

        .shell {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .head {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kickerRow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          opacity: 0.9;
        }

        .kicker {
          letter-spacing: 0.28em;
          font-size: 11px;
          font-weight: 900;
          color: rgba(245, 244, 244, 0.82);
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(37, 195, 226, 0.65);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.1);
        }

        .kickerSub {
          font-size: 12px;
          color: rgba(245, 244, 244, 0.7);
          letter-spacing: 0.08em;
        }

        .title {
          margin: 0;
          color: #f5f4f4;
          text-shadow: 0 14px 38px rgba(0, 0, 0, 0.35);
        }

        .desc {
          margin: 0;
          opacity: 0.85;
          line-height: 1.65;
        }

        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          align-items: start;
        }

        .col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tile {
          position: relative;
          border: none;
          padding: 0;
          width: 100%;
          cursor: pointer;
          border-radius: 18px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.28);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          transform: translateZ(0);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .tile:hover {
          transform: translateY(-3px);
          border-color: rgba(37, 195, 226, 0.25);
          box-shadow: 0 26px 60px rgba(0, 0, 0, 0.55);
        }

        .sq {
          aspect-ratio: 1 / 1;
        }
        .w43 {
          aspect-ratio: 4 / 3;
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.35s ease;
        }

        .tile:hover .img {
          transform: scale(1.07);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.0),
            rgba(0, 0, 0, 0.55)
          );
          opacity: 0.9;
        }

        .frame {
          position: absolute;
          inset: 10px;
          border-radius: 14px;
          pointer-events: none;
          border: 1px solid rgba(245, 244, 244, 0.12);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);
          opacity: 0.85;
        }

        /* Lightbox */
        .lb {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.82);
          display: grid;
          place-items: center;
          z-index: 9999;
          padding: 18px;
        }

        .lbInner {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 10px;
          width: min(1100px, 100%);
        }

        .lbImg {
          width: 100%;
          max-height: 78vh;
          object-fit: contain;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.6);
          background: rgba(12, 12, 12, 0.45);
        }

        .lbNav,
        .lbClose {
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.45);
          color: #fff;
          cursor: pointer;
          border-radius: 999px;
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          font-size: 28px;
          transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
        }

        .lbNav:hover,
        .lbClose:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.12);
        }

        .lbNav:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .lbClose {
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 18px;
          width: 40px;
          height: 40px;
        }

        .lbMeta {
          grid-column: 1 / -1;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          color: rgba(245, 244, 244, 0.72);
          font-size: 12px;
          letter-spacing: 0.06em;
        }

        .lbCount {
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.03);
        }

        .lbAlt {
          opacity: 0.9;
        }

        @media (max-width: 991px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .head {
            text-align: left;
            margin: 0;
          }
          .kickerRow {
            justify-content: flex-start;
          }
        }
      `}</style>
    </>
  )
}

SelectedFilmWork.defaultProps = {
  heading1: undefined,
  content1: undefined,
  rootClassName: '',

  // 🔁 Updated filenames → /public/work/film/sfm-xx.jpg
  image1Src: '/work/film/sfm-01.jpg',
  image2Src: '/work/film/sfm-02.jpg',
  image3Src: '/work/film/sfm-03.jpg',
  image4Src: '/work/film/sfm-04.jpg',
  image5Src: '/work/film/sfm-05.jpg',
  image6Src: '/work/film/sfm-06.jpg',
  image7Src: '/work/film/sfm-07.jpg',

  image1Alt: 'Selected film frame 01',
  image2Alt: 'Selected film frame 02',
  image3Alt: 'Selected film frame 03',
  image4Alt: 'Selected film frame 04',
  image5Alt: 'Selected film frame 05',
  image6Alt: 'Selected film frame 06',
  image7Alt: 'Selected film frame 07',
}

SelectedFilmWork.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,

  image1Src: PropTypes.string,
  image2Src: PropTypes.string,
  image3Src: PropTypes.string,
  image4Src: PropTypes.string,
  image5Src: PropTypes.string,
  image6Src: PropTypes.string,
  image7Src: PropTypes.string,

  image1Alt: PropTypes.string,
  image2Alt: PropTypes.string,
  image3Alt: PropTypes.string,
  image4Alt: PropTypes.string,
  image5Alt: PropTypes.string,
  image6Alt: PropTypes.string,
  image7Alt: PropTypes.string,
}

export default SelectedFilmWork