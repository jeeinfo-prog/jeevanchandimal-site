// components/selected-audio-work.js
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const SelectedAudioWork = (props) => {
  const frames = useMemo(() => {
    // ✅ defaults to local public/services/audio/saw-xx.jpg
    const list = [
      {
        src: props.image1Src || '/services/audio/saw-01.jpg',
        alt: props.image1Alt || 'Selected audio work 01',
      },
      {
        src: props.image2Src || '/services/audio/saw-02.jpg',
        alt: props.image2Alt || 'Selected audio work 02',
      },
      {
        src: props.image3Src || '/services/audio/saw-03.jpg',
        alt: props.image3Alt || 'Selected audio work 03',
      },
      {
        src: props.image4Src || '/services/audio/saw-04.jpg',
        alt: props.image4Alt || 'Selected audio work 04',
      },
      {
        src: props.image5Src || '/services/audio/saw-05.jpg',
        alt: props.image5Alt || 'Selected audio work 05',
      },
      {
        src: props.image6Src || '/services/audio/saw-06.jpg',
        alt: props.image6Alt || 'Selected audio work 06',
      },
      {
        src: props.image7Src || '/services/audio/saw-07.jpg',
        alt: props.image7Alt || 'Selected audio work 07',
      },
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

  const hero =
    props.heroImageSrc || frames?.[0]?.src || '/services/audio/saw-01.jpg'

  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span className="titleText">Selected Audio Work</span>
      </Fragment>
    )

  const descNode =
    props.content1 ?? (
      <Fragment>
        <span>
          A selection of sound design and music created for film, visual
          projects, and immersive experiences.
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
        id="selected-audio-work"
        className={`wrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="shell thq-section-max-width">
          {/* ===== CINEMATIC HERO ===== */}
          <div className="heroCard">
            <div className="heroBg" aria-hidden="true">
              <div
                className="heroImg"
                style={{ backgroundImage: `url(${hero})` }}
              />
              <div className="heroVignette" />
              <div className="heroGlow" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">SELECTED CUTS</span>
                <span className="dot" aria-hidden="true" />
                <span className="kickerSub">
                  Sound Design · Music · Atmosphere
                </span>
              </div>

              <h2 className="thq-heading-2 heroTitle">{headingNode}</h2>
              <p className="thq-body-large heroDesc">{descNode}</p>

              <div className="micro thq-body-small">
                Texture • Space • Cinematic restraint
              </div>
            </div>
          </div>

          {/* ===== GALLERY ===== */}
          <div className="grid">
            {/* Column 1 */}
            <div className="col">
              <Tile
                aspect="sq"
                src={frames[0]?.src}
                alt={frames[0]?.alt}
                onOpen={() => setActiveIdx(0)}
              />
              <Tile
                aspect="sq"
                src={frames[1]?.src}
                alt={frames[1]?.alt}
                onOpen={() => setActiveIdx(1)}
              />
            </div>

            {/* Column 2 */}
            <div className="col">
              <Tile
                aspect="w43"
                src={frames[2]?.src}
                alt={frames[2]?.alt}
                onOpen={() => setActiveIdx(2)}
              />
              <Tile
                aspect="sq"
                src={frames[3]?.src}
                alt={frames[3]?.alt}
                onOpen={() => setActiveIdx(3)}
              />
              <Tile
                aspect="w43"
                src={frames[4]?.src}
                alt={frames[4]?.alt}
                onOpen={() => setActiveIdx(4)}
              />
            </div>

            {/* Column 3 */}
            <div className="col">
              <Tile
                aspect="sq"
                src={frames[5]?.src}
                alt={frames[5]?.alt}
                onOpen={() => setActiveIdx(5)}
              />
              <Tile
                aspect="sq"
                src={frames[6]?.src}
                alt={frames[6]?.alt}
                onOpen={() => setActiveIdx(6)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {activeIdx >= 0 && frames[activeIdx] && (
        <div className="lb" onClick={() => setActiveIdx(-1)}>
          <div className="lbInner" onClick={(e) => e.stopPropagation()}>
            <button
              className="lbClose"
              type="button"
              onClick={() => setActiveIdx(-1)}
              aria-label="Close"
            >
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
            <img
              className="lbImg"
              src={frames[activeIdx].src}
              alt={frames[activeIdx].alt || 'Preview'}
            />

            <button
              className="lbNav"
              type="button"
              onClick={() =>
                setActiveIdx((i) => Math.min(frames.length - 1, i + 1))
              }
              disabled={activeIdx === frames.length - 1}
              aria-label="Next"
            >
              ›
            </button>

            <div className="lbMeta">
              <span className="lbCount">
                {activeIdx + 1} / {frames.length}
              </span>
              <span className="lbAlt">
                {frames[activeIdx].alt || 'Selected audio work'}
              </span>
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
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.025),
              rgba(255, 255, 255, 0)
            );
          opacity: 0.95;
        }

        .shell {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ================= HERO CARD ================= */
        .heroCard {
          position: relative;
          width: 100%;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }

        .heroBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .heroImg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.03);
          filter: saturate(0.94) contrast(1.1) brightness(0.66);
        }

        .heroVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              90% 70% at 50% 18%,
              rgba(0, 0, 0, 0.06),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.85) 0%,
              rgba(0, 0, 0, 0.42) 55%,
              rgba(0, 0, 0, 0.85) 100%
            );
        }

        .heroGlow {
          position: absolute;
          inset: -40px -60px auto -60px;
          height: 180px;
          background: radial-gradient(
            60% 70% at 50% 50%,
            rgba(37, 195, 226, 0.12),
            rgba(37, 195, 226, 0)
          );
          opacity: 0.9;
          filter: blur(2px);
        }

        .heroGrain {
          position: absolute;
          inset: 0;
          opacity: 0.085;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .heroInner {
          position: relative;
          z-index: 1;
          padding: 26px 24px 20px;
          max-width: 980px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kickerRow {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          opacity: 0.92;
        }

        .kicker {
          letter-spacing: 0.28em;
          font-size: 11px;
          font-weight: 900;
          color: rgba(245, 244, 244, 0.82);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
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

        .titleText {
          display: inline-block;
          letter-spacing: 0.2px;
        }

        .heroTitle {
          margin: 0;
          line-height: 1.08;
          color: #f5f4f4;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .heroDesc {
          margin: 0;
          opacity: 0.88;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.84);
          max-width: 72ch;
        }

        .micro {
          margin-top: 4px;
          color: rgba(245, 244, 244, 0.62);
        }

        /* ================= GALLERY GRID ================= */
        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          align-items: start;
          margin-top: 6px;
        }

        .col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ================= LIGHTBOX ================= */
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
          transition: transform 0.15s ease, border-color 0.15s ease,
            background 0.15s ease;
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
          .heroInner {
            padding: 20px 16px 16px;
          }
          .kickerRow {
            justify-content: flex-start;
          }
        }
      `}</style>
    </>
  )
}

function Tile({ aspect, src, alt, onOpen }) {
  return (
    <>
      <button className={`tile ${aspect}`} type="button" onClick={onOpen}>
        <span className="frameWrap" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="img" src={src} alt={alt} loading="lazy" />
          <span className="shade" />
          <span className="innerStroke" />
        </span>
      </button>

      <style jsx>{`
        .tile {
          position: relative;
          border: none;
          padding: 0;
          width: 100%;
          cursor: pointer;
          border-radius: 18px;
          overflow: hidden;
          background: rgba(12, 12, 12, 0.42);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          transform: translateZ(0);
          transition: transform 0.2s ease, border-color 0.2s ease,
            box-shadow 0.2s ease;
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

        .frameWrap {
          position: absolute;
          inset: 10px;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.28);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          transition: transform 0.35s ease, filter 0.35s ease;
          filter: brightness(0.82) contrast(1.05) saturate(0.92);
        }

        .tile:hover .img {
          transform: scale(1.07);
          filter: brightness(0.9) contrast(1.08) saturate(0.98);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.55)
          );
          opacity: 0.9;
        }

        .innerStroke {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 14px;
          box-shadow: inset 0 0 0 1px rgba(245, 244, 244, 0.08);
        }
      `}</style>
    </>
  )
}

SelectedAudioWork.defaultProps = {
  heading1: undefined,
  content1: undefined,
  rootClassName: '',

  heroImageSrc: '/services/audio/saw-01.jpg',

  image1Src: '/services/audio/saw-01.jpg',
  image2Src: '/services/audio/saw-02.jpg',
  image3Src: '/services/audio/saw-03.jpg',
  image4Src: '/services/audio/saw-04.jpg',
  image5Src: '/services/audio/saw-05.jpg',
  image6Src: '/services/audio/saw-06.jpg',
  image7Src: '/services/audio/saw-07.jpg',

  image1Alt: 'Selected audio work 01',
  image2Alt: 'Selected audio work 02',
  image3Alt: 'Selected audio work 03',
  image4Alt: 'Selected audio work 04',
  image5Alt: 'Selected audio work 05',
  image6Alt: 'Selected audio work 06',
  image7Alt: 'Selected audio work 07',
}

SelectedAudioWork.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,

  heroImageSrc: PropTypes.string,

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

export default SelectedAudioWork