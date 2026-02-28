import React, { Fragment, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const FeaturedFramesFilm = (props) => {
  // ✅ build /work/film/fc-01.jpg ... fc-12.jpg
  const items = useMemo(() => {
    const count = Math.max(1, Math.min(48, Number(props.count || 12)))
    return Array.from({ length: count }, (_, i) => {
      const num = String(i + 1).padStart(2, '0')
      return {
        src: `/work/film/fc-${num}.jpg`,
        alt: `Featured frame ${i + 1}`,
      }
    })
  }, [props.count])

  const [activeIdx, setActiveIdx] = useState(-1)
  const active = activeIdx >= 0 ? items[activeIdx] : null

  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span>Featured Frames</span>
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
      if (e.key === 'ArrowRight') setActiveIdx((i) => Math.min(items.length - 1, i + 1))
      if (e.key === 'ArrowLeft') setActiveIdx((i) => Math.max(0, i - 1))
    }
    if (typeof window === 'undefined') return
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIdx, items.length])

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          <header className="head">
            <div className="kicker">SELECTED FRAMES</div>

            <h2 className="title thq-heading-2">{headingNode}</h2>
            <p className="desc thq-body-large">{descNode}</p>

            <div className="actions">
              {props.primaryHref && (
                <a className="cineBtnPrimary" href={props.primaryHref}>
                  {props.primaryText || 'View Film Work'}
                </a>
              )}

              {props.secondaryHref && (
                <a className="cineBtnOutline" href={props.secondaryHref}>
                  {props.secondaryText || 'Request a Private Selection'}
                </a>
              )}
            </div>
          </header>

          <div className="grid">
            {items.map((it, idx) => (
              <button
                key={`${it.src}-${idx}`}
                className="tile"
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-label={`Open frame ${idx + 1}`}
              >
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
                <div className="shade" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {active?.src && (
        <div className="lightbox" onClick={() => setActiveIdx(-1)}>
          <div className="lbInner" onClick={(e) => e.stopPropagation()}>
            <button className="lbClose" onClick={() => setActiveIdx(-1)}>
              ✕
            </button>

            <button
              className="lbNav"
              onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
              disabled={activeIdx === 0}
            >
              ‹
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lbImg" src={active.src} alt={active.alt || 'Preview'} />

            <button
              className="lbNav"
              onClick={() => setActiveIdx((i) => Math.min(items.length - 1, i + 1))}
              disabled={activeIdx === items.length - 1}
            >
              ›
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .wrap {
          width: 100%;
          overflow: hidden;
        }

        .shell {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .head {
          max-width: 980px;
          margin: 0 auto 6px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kicker {
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          opacity: 0.72;
        }

        .title {
          margin: 0;
        }

        .desc {
          margin: 0;
          opacity: 0.86;
          line-height: 1.7;
        }

        .actions {
          margin-top: 8px;
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Buttons */
        .cineBtnPrimary {
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.65);
          background: rgba(37, 195, 226, 0.18);
          color: #f5f4f4;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          backdrop-filter: blur(6px);
          transition: 0.22s ease;
        }
        .cineBtnPrimary:hover {
          background: rgba(37, 195, 226, 0.28);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.16),
            0 0 18px rgba(37, 195, 226, 0.25);
          transform: translateY(-1px);
        }

        .cineBtnOutline {
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.24);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(245, 244, 244, 0.88);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          backdrop-filter: blur(6px);
          transition: 0.22s ease;
        }
        .cineBtnOutline:hover {
          border-color: rgba(37, 195, 226, 0.55);
          color: #f5f4f4;
          box-shadow: 0 0 16px rgba(37, 195, 226, 0.18);
          transform: translateY(-1px);
        }

        /* Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
        }

        .tile {
          grid-column: span 3;
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(0, 0, 0, 0.25);
          aspect-ratio: 16 / 10;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
          transition: 0.18s ease;
          cursor: pointer;
        }

        .tile:hover {
          transform: translateY(-3px);
          border-color: rgba(37, 195, 226, 0.32);
          box-shadow: 0 24px 62px rgba(0, 0, 0, 0.5);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.28s ease;
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
            rgba(0, 0, 0, 0.55)
          );
        }

        .hideTile {
          display: none;
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.82);
          display: grid;
          place-items: center;
          z-index: 9999;
        }

        .lbInner {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lbImg {
          max-width: 82vw;
          max-height: 82vh;
          border-radius: 14px;
          box-shadow: 0 40px 120px rgba(0, 0, 0, 0.7);
        }

        .lbNav,
        .lbClose {
          background: rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(245, 244, 244, 0.12);
          color: white;
          font-size: 28px;
          padding: 10px;
          cursor: pointer;
          border-radius: 999px;
        }

        @media (max-width: 991px) {
          .tile {
            grid-column: span 6;
          }
        }

        @media (max-width: 767px) {
          .head {
            text-align: left;
            margin: 0;
          }
          .actions {
            justify-content: flex-start;
          }
          .tile {
            grid-column: span 12;
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
  primaryHref: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryHref: PropTypes.string,
  secondaryText: PropTypes.string,
}

export default FeaturedFramesFilm