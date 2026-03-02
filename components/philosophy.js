import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const WorkHero = (props) => {
  // ✅ default slideshow: /public/work/photo-01.jpg ... photo-06.jpg
  const slides = useMemo(() => {
    if (Array.isArray(props.slides) && props.slides.length) return props.slides

    const total = props.slideCount || 6
    return Array.from({ length: total }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return `/work/photo-${n}.jpg`
    })
  }, [props.slides, props.slideCount])

  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState(() => new Set())
  const timerRef = useRef(null)
  const hoverRef = useRef(false)

  const intervalMs = Math.max(1800, Number(props.intervalMs || 5200))
  const transitionMs = Math.max(450, Number(props.transitionMs || 900))

  // Respect "prefers-reduced-motion"
  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(!!mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  // preload current + next
  useEffect(() => {
    if (typeof window === 'undefined') return
    const cur = slides[idx]
    const next = slides[(idx + 1) % slides.length]

    ;[cur, next].forEach((src) => {
      if (!src || loaded.has(src)) return
      const img = new window.Image()
      img.onload = () =>
        setLoaded((prev) => {
          const n = new Set(prev)
          n.add(src)
          return n
        })
      img.src = src
    })
  }, [idx, slides, loaded])

  // auto-advance
  useEffect(() => {
    if (reduceMotion) return
    if (!slides?.length || slides.length < 2) return

    const clear = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    clear()
    timerRef.current = setInterval(() => {
      if (hoverRef.current) return
      setIdx((i) => (i + 1) % slides.length)
    }, intervalMs)

    return clear
  }, [slides, intervalMs, reduceMotion])

  const currentSrc = slides[idx]
  const nextSrc = slides[(idx + 1) % slides.length]

  return (
    <>
      <div
        className={`hero ${props.rootClassName}`}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        {/* Background layers for crossfade */}
        <div className="bgStack" aria-hidden="true">
          {nextSrc && (
            <img
              alt=""
              src={nextSrc}
              className="bg bgNext"
              loading="eager"
              draggable="false"
            />
          )}

          {currentSrc && (
            <img
              alt={props.imageAlt}
              src={currentSrc}
              className="bg bgCurrent"
              loading="eager"
              draggable="false"
              style={{ transitionDuration: `${transitionMs}ms` }}
            />
          )}
        </div>

        {/* ✅ softer overlays (don’t dim) */}
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="glow" aria-hidden="true" />

        {/* content */}
        <div className="content">
          {/* ✅ SoundDesign-style top aligned title block + thin line */}
          <div className="kickerRow" aria-label="Section label">
            <span className="kicker">{props.kickerText}</span>
            <span className="kickerLine" />
          </div>

          <h1 className="title">
            {props.heading1 ?? (
              <Fragment>
                <span className="t">
                  Selected work across film, photography, sound, and motion.
                </span>
              </Fragment>
            )}
          </h1>

          <p className="desc">
            {props.content1 ?? (
              <Fragment>
                <span className="t">
                  Explore each discipline as a focused body of work.
                </span>
              </Fragment>
            )}
          </p>

          {/* ✅ thin divider like sound-design.js */}
          <div className="divider" aria-hidden="true" />

          <div className="actions">
            <Link href={props.primaryHref} legacyBehavior>
              <a className="btnPrimary" aria-label="Explore Work">
                <span className="btnText">
                  {props.primaryLabel ?? (
                    <Fragment>
                      <span className="t">Explore Work</span>
                    </Fragment>
                  )}
                </span>
                <span className="arrow">→</span>
              </a>
            </Link>

            <Link href={props.secondaryHref} legacyBehavior>
              <a className="btnGhost" aria-label="Create Together">
                <span className="btnText">
                  {props.secondaryLabel ?? (
                    <Fragment>
                      <span className="t">Create Together</span>
                    </Fragment>
                  )}
                </span>
                <span className="arrow">→</span>
              </a>
            </Link>
          </div>

          {/* tiny slide indicators */}
          {!reduceMotion && slides.length > 1 && (
            <div className="dots" aria-label="Slideshow indicators">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`dot ${i === idx ? 'on' : ''}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          min-height: 72vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          margin-top: 18px;
        }

        /* ===== slideshow stack ===== */
        .bgStack {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);

          /* ✅ keep picture bright */
          filter: brightness(0.92) contrast(1.06) saturate(1.02);

          user-select: none;
          pointer-events: none;
        }

        .bgNext {
          opacity: 1;
        }

        .bgCurrent {
          opacity: 1;
          animation: fadeIn ease both;
          animation-duration: ${transitionMs}ms;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.035);
          }
          to {
            opacity: 1;
            transform: scale(1.03);
          }
        }

        /* ===== cinematic overlays (soft) ===== */
        .vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(
              80% 65% at 30% 30%,
              rgba(0, 0, 0, 0.06),
              rgba(0, 0, 0, 0.46)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.48) 0%,
              rgba(0, 0, 0, 0.18) 55%,
              rgba(0, 0, 0, 0.34) 100%
            );
        }

        .glow {
          position: absolute;
          inset: -18%;
          z-index: 2;
          background: radial-gradient(
            38% 28% at 18% 44%,
            rgba(37, 195, 226, 0.12),
            rgba(37, 195, 226, 0) 62%
          );
          filter: blur(10px);
          pointer-events: none;
        }

        .grain {
          position: absolute;
          inset: 0;
          z-index: 3;
          opacity: 0.045;
          mix-blend-mode: overlay;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        /* ===== content: top aligned like sound-design.js ===== */
        .content {
          position: relative;
          z-index: 4;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 10px;

          /* ✅ push content up */
          align-self: flex-start;
          margin-top: 38px;

          padding: 0 18px;
          margin-left: var(--dl-layout-space-fiveunits);
        }

        /* kicker row + pill */
        .kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2px;
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.18);
          white-space: nowrap;
        }

        /* ✅ thin line exactly like sound-design.js divider style */
        .kickerLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.12),
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0.12)
          );
        }

        .title {
          margin: 0;
          font-size: clamp(32px, 5vw, 44px);
          letter-spacing: -0.02em;
          color: #f5f4f4;
          text-shadow: 0 18px 42px rgba(0, 0, 0, 0.36);
          line-height: 1.15; /* like sound-design title rhythm */
        }

        .desc {
          margin: 0;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.84);
          max-width: 48ch;
        }

        /* ✅ divider line same as sound-design.js */
        .divider {
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

        .actions {
          margin-top: 2px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btnPrimary,
        .btnGhost {
          height: 36px;
          padding: 0 14px 0 16px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none !important;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 900;
          transition: all 180ms ease;
          white-space: nowrap;
        }

        .btnPrimary {
          border: 1px solid rgba(37, 195, 226, 0.45);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.08)
          );
          color: #f5f4f4;
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.35);
        }
        .btnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.7);
        }

        .btnGhost {
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(245, 244, 244, 0.92);
        }
        .btnGhost:hover {
          border-color: rgba(37, 195, 226, 0.45);
          background: rgba(37, 195, 226, 0.08);
          transform: translateY(-1px);
        }

        .arrow {
          color: #25c3e2;
          transform: translateY(-1px);
        }

        /* dots */
        .dots {
          margin-top: 14px;
          display: inline-flex;
          gap: 8px;
          align-items: center;
        }
        .dot {
          width: 28px;
          height: 3px;
          border-radius: 99px;
          border: 0;
          background: rgba(245, 244, 244, 0.18);
          cursor: pointer;
          padding: 0;
          transition: all 180ms ease;
        }
        .dot.on {
          background: rgba(37, 195, 226, 0.7);
          box-shadow: 0 0 0 1px rgba(37, 195, 226, 0.18);
        }
        .dot:hover {
          background: rgba(245, 244, 244, 0.28);
        }

        .t {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .hero {
            border-radius: 18px;
          }
          .content {
            width: 100%;
            margin-left: 0;
            margin-top: 22px; /* ✅ top aligned on mobile too */
            text-align: center;
            align-items: center;
            padding: 0 16px;
          }

          .kickerRow {
            justify-content: center;
          }
          .kickerLine {
            display: none;
          }

          .actions {
            width: 100%;
            justify-content: center;
          }
          .btnPrimary,
          .btnGhost {
            width: 100%;
            justify-content: center;
            max-width: 520px;
          }
          .dots {
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}

WorkHero.defaultProps = {
  rootClassName: '',
  imageAlt: 'Work hero background',

  kickerText: 'WORK',

  // slideshow
  slides: undefined,
  slideCount: 6,
  intervalMs: 5200,
  transitionMs: 900,

  heading1: undefined,
  content1: undefined,

  primaryHref: '/work',
  secondaryHref: '/contact',
  primaryLabel: undefined,
  secondaryLabel: undefined,
}

WorkHero.propTypes = {
  rootClassName: PropTypes.string,
  imageAlt: PropTypes.string,

  kickerText: PropTypes.string,

  slides: PropTypes.arrayOf(PropTypes.string),
  slideCount: PropTypes.number,
  intervalMs: PropTypes.number,
  transitionMs: PropTypes.number,

  heading1: PropTypes.element,
  content1: PropTypes.element,

  primaryHref: PropTypes.string,
  secondaryHref: PropTypes.string,
  primaryLabel: PropTypes.element,
  secondaryLabel: PropTypes.element,
}

export default WorkHero