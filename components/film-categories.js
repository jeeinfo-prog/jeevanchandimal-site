// components/featured-frames-film.js
import React, { Fragment, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const FeaturedFramesFilm = (props) => {
  // ✅ build /work/film/fc-01.jpg ... fc-48.jpg
  const items = useMemo(() => {
    const count = Math.max(1, Math.min(48, Number(props.count || 12)))
    return Array.from({ length: count }, (_, i) => {
      const num = String(i + 1).padStart(2, '0')
      return {
        src: `/work/film/fc-${num}.jpg`,
        alt: `Featured frame ${i + 1}`,
        num,
      }
    })
  }, [props.count])

  const [activeIdx, setActiveIdx] = useState(-1)
  const active = activeIdx >= 0 ? items[activeIdx] : null

  const hero =
    props.heroImageSrc || items?.[0]?.src || '/work/film/fc-01.jpg'

  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span className="titleText">Featured Frames</span>
      </Fragment>
    )

  const descNode =
    props.content1 ?? (
      <Fragment>
        <span>
          Selected frames—crafted for mood, restraint, and cinematic clarity.
          Updated by file name inside <code>/public/work/film</code>.
        </span>
      </Fragment>
    )

  // keyboard nav for lightbox
  useEffect(() => {
    function onKey(e) {
      if (activeIdx < 0) return
      if (e.key === 'Escape') setActiveIdx(-1)
      if (e.key === 'ArrowRight')
        setActiveIdx((i) => Math.min(items.length - 1, i + 1))
      if (e.key === 'ArrowLeft') setActiveIdx((i) => Math.max(0, i - 1))
    }
    if (typeof window === 'undefined') return
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIdx, items.length])

  const isInternal = (href) => typeof href === 'string' && href.startsWith('/')

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* ===== CINEMATIC HERO (title + prop text) ===== */}
          <div className="heroCard">
            <div className="heroBg" aria-hidden="true">
              <div className="heroImg" style={{ backgroundImage: `url(${hero})` }} />
              <div className="heroVignette" />
              <div className="heroGlow" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">SELECTED FRAMES</span>
                <span className="dot" aria-hidden="true" />
                <span className="kickerSub">Mood · Restraint · Cinematic clarity</span>
              </div>

              <h2 className="thq-heading-2 heroTitle">{headingNode}</h2>
              <p className="thq-body-large heroDesc">{descNode}</p>

              <div className="actions">
                {props.primaryHref ? (
                  isInternal(props.primaryHref) ? (
                    <Link href={props.primaryHref} legacyBehavior>
                      <a className="cineBtnPrimary">{props.primaryText || 'View Film Work'}</a>
                    </Link>
                  ) : (
                    <a className="cineBtnPrimary" href={props.primaryHref} rel="noreferrer">
                      {props.primaryText || 'View Film Work'}
                    </a>
                  )
                ) : null}

                {props.secondaryHref ? (
                  isInternal(props.secondaryHref) ? (
                    <Link href={props.secondaryHref} legacyBehavior>
                      <a className="cineBtnOutline">
                        {props.secondaryText || 'Request a Private Selection'}
                      </a>
                    </Link>
                  ) : (
                    <a className="cineBtnOutline" href={props.secondaryHref} rel="noreferrer">
                      {props.secondaryText || 'Request a Private Selection'}
                    </a>
                  )
                ) : null}
              </div>

              <div className="micro thq-body-small">
                Tap any frame to preview • Arrow keys to navigate • Esc to close
              </div>
            </div>
          </div>

          {/* ===== GRID ===== */}
          <div className="grid">
            {items.map((it, idx) => (
              <button
                key={`${it.src}-${idx}`}
                className="tile"
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-label={`Open frame ${idx + 1}`}
              >
                {/* ✅ Curved inner image box */}
                <span className="frameWrap" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="img"
                    src={it.src}
                    alt={it.alt}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.closest('button')?.classList.add('hideTile')
                    }}
                  />
                  <span className="shade" />
                  <span className="innerStroke" />
                  <span className="tag">
                    <span className="tagText">Frame</span>
                    <span className="tagDot" aria-hidden="true" />
                    <span className="tagNum">{it.num}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {active?.src && (
        <div className="lightbox" onClick={() => setActiveIdx(-1)}>
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
            <img className="lbImg" src={active.src} alt={active.alt || 'Preview'} />

            <button
              className="lbNav"
              type="button"
              onClick={() => setActiveIdx((i) => Math.min(items.length - 1, i + 1))}
              disabled={activeIdx === items.length - 1}
              aria-label="Next"
            >
              ›
            </button>

            <div className="lbMeta">
              <span className="lbCount">
                {activeIdx + 1} / {items.length}
              </span>
              <span className="lbAlt">{active.alt || 'Featured frame'}</span>
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
            linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
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
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
          max-width: 78ch;
        }

        .actions {
          margin-top: 6px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .micro {
          margin-top: 2px;
          color: rgba(245, 244, 244, 0.62);
        }

        /* Buttons */
        .cineBtnPrimary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.65);
          background: rgba(37, 195, 226, 0.18);
          color: #f5f4f4;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          backdrop-filter: blur(6px);
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease,
            box-shadow 0.18s ease;
          white-space: nowrap;
        }

        .cineBtnPrimary:hover {
          background: rgba(37, 195, 226, 0.28);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.16),
            0 0 18px rgba(37, 195, 226, 0.25);
          transform: translateY(-1px);
        }

        .cineBtnOutline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.24);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(245, 244, 244, 0.88);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          backdrop-filter: blur(6px);
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease,
            box-shadow 0.18s ease;
          white-space: nowrap;
        }

        .cineBtnOutline:hover {
          border-color: rgba(37, 195, 226, 0.55);
          color: #f5f4f4;
          box-shadow: 0 0 16px rgba(37, 195, 226, 0.18);
          transform: translateY(-1px);
        }

        /* ================= GRID ================= */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
          margin-top: 6px;
        }

        .tile {
          grid-column: span 3;
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.42);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
          cursor: pointer;
          padding: 0;
        }

        .tile:hover {
          transform: translateY(-3px);
          border-color: rgba(37, 195, 226, 0.32);
          box-shadow: 0 24px 62px rgba(0, 0, 0, 0.5);
        }

        /* ✅ inner curved box */
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
          transition: transform 0.28s ease, filter 0.28s ease;
          filter: brightness(0.92) contrast(1.04) saturate(0.96);
        }

        .tile:hover .img {
          transform: scale(1.07);
          filter: brightness(0.98) contrast(1.06) saturate(1.02);
        }

        .shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.6)
          );
          pointer-events: none;
        }

        .innerStroke {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 14px;
          box-shadow: inset 0 0 0 1px rgba(245, 244, 244, 0.08);
        }

        .tag {
          position: absolute;
          left: 10px;
          top: 10px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          color: rgba(245, 244, 244, 0.88);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .tagText {
          font-weight: 900;
        }

        .tagDot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(37, 195, 226, 0.7);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.12);
        }

        .tagNum {
          opacity: 0.95;
        }

        .hideTile {
          display: none;
        }

        /* ================= LIGHTBOX ================= */
        .lightbox {
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

        /* ================= RESPONSIVE ================= */
        @media (max-width: 991px) {
          .tile {
            grid-column: span 6;
          }
          .heroInner {
            padding: 20px 16px 16px;
          }
        }

        @media (max-width: 767px) {
          .tile {
            grid-column: span 12;
          }
          .actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 479px) {
          .actions {
            flex-direction: column;
            align-items: stretch;
          }
          .cineBtnPrimary,
          .cineBtnOutline {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}

FeaturedFramesFilm.defaultProps = {
  heading1: undefined,
  content1: undefined,
  rootClassName: '',
  count: 12,

  // ✅ optional hero override
  heroImageSrc: '/work/film/fc-01.jpg',

  primaryHref: '/work-film',
  primaryText: 'View Film Work',
  secondaryHref: '/contact',
  secondaryText: 'Request a Private Selection',
}

FeaturedFramesFilm.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  rootClassName: PropTypes.string,
  count: PropTypes.number,

  heroImageSrc: PropTypes.string,

  primaryHref: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryHref: PropTypes.string,
  secondaryText: PropTypes.string,
}

export default FeaturedFramesFilm