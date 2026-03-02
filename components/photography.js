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

        {/* cinematic overlays */}
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="glow" aria-hidden="true" />

        {/* content */}
        <div className="content">
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
                <span className="t">Explore each discipline as a focused body of work.</span>
              </Fragment>
            )}
          </p>

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
          filter: brightness(0.78) contrast(1.08) saturate(0.92);
          user-select: none;
          pointer-events: none;
        }

        /* keep next visible underneath */
        .bgNext {
          opacity: 1;
        }

        /* current fades in on top */
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

        /* ===== cinematic overlays ===== */
        .vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(
              75% 60% at 28% 30%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0.72)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.74) 0%,
              rgba(0, 0, 0, 0.34) 55%,
              rgba(0, 0, 0, 0.62) 100%
            );
        }

        .glow {
          position: absolute;
          inset: -20%;
          z-index: 2;
          background: radial-gradient(
            40% 30% at 18% 40%,
            rgba(37, 195, 226, 0.16),
            rgba(37, 195, 226, 0.0) 60%
          );
          filter: blur(8px);
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

        /* ===== content (luxury) ===== */
        .content {
          position: relative;
          z-index: 4;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0 18px;
          margin-left: var(--dl-layout-space-fiveunits);
        }

        .title {
          margin: 0;
          font-size: clamp(32px, 5vw, 44px);
          letter-spacing: -0.02em;
          color: #f5f4f4;
          text-shadow: 0 18px 42px rgba(0, 0, 0, 0.42);
          line-height: 1.08;
        }

        .desc {
          margin: 0;
          margin-top: var(--dl-layout-space-twounits);
          font-size: 16px;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.82);
          max-width: 48ch;
        }

        .actions {
          margin-top: var(--dl-layout-space-twounits);
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
            text-align: center;
            align-items: center;
            padding: 0 16px;
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

  // slideshow
  slides: undefined, // optional: ['/work/photo-01.jpg', '/work/photo-02.jpg', ...]
  slideCount: 6, // used only when slides is undefined
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