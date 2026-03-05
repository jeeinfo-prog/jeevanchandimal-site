// components/who-its-for-audio.js
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

function clampInt(v, min, max, fallback) {
  const n = Number.parseInt(String(v ?? ''), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, n))
}

const WhoItsForAudio = (props) => {
  // ✅ LOCAL STATIC IMAGES
  const staticItems = useMemo(() => {
    const total = clampInt(props.fallbackCount, 2, 24, 6)
    return Array.from({ length: total }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        id: `sawif-${n}`,
        title: `Audio ${i + 1}`,
        src: `/services/audio/sawif-${n}.jpg`,
      }
    })
  }, [props.fallbackCount])

  const [page, setPage] = useState(0)
  const hoverRef = useRef(false)
  const timerRef = useRef(null)

  const perPage = 2
  const pages = Math.ceil(staticItems.length / perPage)
  const intervalMs = Math.max(2500, Number(props.intervalMs || 5200))

  useEffect(() => {
    if (pages <= 1) return

    timerRef.current = setInterval(() => {
      if (hoverRef.current) return
      setPage((p) => (p + 1) % pages)
    }, intervalMs)

    return () => clearInterval(timerRef.current)
  }, [pages, intervalMs])

  const start = page * perPage
  const visible = staticItems.slice(start, start + perPage)

  const headingNode =
    props.heading1 ?? (
      <Fragment>
        <span className="t">Who It’s For</span>
      </Fragment>
    )

  const descNode =
    props.content1 ?? (
      <Fragment>
        <span className="t">
          I collaborate with filmmakers, visual artists, studios, and brands who
          understand the emotional power of sound in storytelling.
        </span>
      </Fragment>
    )

  function prev() {
    setPage((p) => (p - 1 + pages) % pages)
  }

  function next() {
    setPage((p) => (p + 1) % pages)
  }

  return (
    <>
      <section
        className={`wifWrap thq-section-padding ${props.rootClassName || ''}`}
      >
        <div className="wifShell thq-section-max-width">
          {/* ===== TITLE / HERO (match ServicesAudioFinalCTA style) ===== */}
          <header className="wifHero">
            <div className="wifHeroBg" aria-hidden="true">
              <div className="wifHeroVignette" />
              <div className="wifHeroGrain" />
            </div>

            <div className="wifHeroInner">
              <div className="wifKickerRow">
                <span className="wifKicker">{props.kickerText || 'WHO IT’S FOR'}</span>
                <span className="wifLine" />
              </div>

              <h2 className="wifTitle thq-heading-2">{headingNode}</h2>
              <p className="wifDesc thq-body-large">{descNode}</p>

              <div className="wifNav">
                <button
                  type="button"
                  onClick={prev}
                  className="wifNavBtn"
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="wifNavBtn"
                  aria-label="Next"
                >
                  →
                </button>
              </div>

              <div className="wifDivider" aria-hidden="true" />
              <div className="wifMeta thq-body-small">
                Texture • Space • Emotion • Clarity
              </div>
            </div>
          </header>

          {/* ===== IMAGES ===== */}
          <div
            className="wifStage"
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
          >
            <div className="wifGrid">
              {visible.map((it) => (
                <div key={it.id} className="wifTile">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.src}
                    alt={it.title}
                    className="wifImg"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="wifDots">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`wifDot ${i === page ? 'on' : ''}`}
                  onClick={() => setPage(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .wifWrap {
          width: 100%;
        }

        .wifShell {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ===== HERO (CTA-like) ===== */
        .wifHero {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .wifHeroBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .wifHeroVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 70% at 50% 15%,
              rgba(255, 255, 255, 0.05),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.35) 50%,
              rgba(0, 0, 0, 0.82) 100%
            );
        }

        .wifHeroGrain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .wifHeroInner {
          position: relative;
          z-index: 1;
          padding: 28px 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .wifKickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .wifKicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .wifLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .wifTitle {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .wifDesc {
          margin: 0;
          line-height: 1.8;
          color: rgba(245, 244, 244, 0.85);
          max-width: 70ch;
          opacity: 0.9;
        }

        .wifNav {
          margin-top: 6px;
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .wifNavBtn {
          height: 36px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.15);
          background: rgba(0, 0, 0, 0.25);
          cursor: pointer;
          color: rgba(245, 244, 244, 0.92);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 900;
          transition: all 180ms ease;
        }

        .wifNavBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.45);
          background: rgba(37, 195, 226, 0.08);
        }

        .wifDivider {
          width: 100%;
          height: 1px;
          margin-top: 6px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.12),
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0.12)
          );
        }

        .wifMeta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        /* ===== GRID ===== */
        .wifGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .wifTile {
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          aspect-ratio: 4 / 3;
          background: rgba(12, 12, 12, 0.35);
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.35);
        }

        .wifImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease, filter 0.5s ease;
          filter: brightness(0.9) contrast(1.05) saturate(0.95);
          transform: scale(1.01);
          display: block;
        }

        .wifTile:hover .wifImg {
          transform: scale(1.05);
          filter: brightness(0.98) contrast(1.08) saturate(1);
        }

        .wifDots {
          margin-top: 12px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .wifDot {
          width: 26px;
          height: 3px;
          border: 0;
          background: rgba(245, 244, 244, 0.2);
          border-radius: 99px;
          cursor: pointer;
          transition: background 160ms ease;
        }

        .wifDot.on {
          background: rgba(37, 195, 226, 0.8);
        }

        @media (max-width: 767px) {
          .wifHeroInner {
            padding: 22px 16px 18px;
          }
          .wifLine {
            display: none;
          }
          .wifGrid {
            grid-template-columns: 1fr;
          }
          .wifNavBtn {
            width: 100%;
            justify-content: center;
            max-width: 520px;
          }
        }

        .t {
          display: inline-block;
        }
      `}</style>
    </>
  )
}

WhoItsForAudio.defaultProps = {
  rootClassName: '',
  heading1: undefined,
  content1: undefined,
  intervalMs: 5200,
  fallbackCount: 6,
  kickerText: 'WHO IT’S FOR',
}

WhoItsForAudio.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  intervalMs: PropTypes.number,
  fallbackCount: PropTypes.number,
  kickerText: PropTypes.string,
}

export default WhoItsForAudio