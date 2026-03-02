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
      <section className={`whWrap ${props.rootClassName || ''}`}>
        <div className="whMax thq-section-padding">
          {/* ✅ not full page width: use thq-section-max-width like SoundDesign */}
          <div
            className="whCard thq-section-max-width"
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
          >
            {/* ===== slideshow background (absolute) ===== */}
            <div className="whMedia" aria-hidden="true">
              {nextSrc && (
                <img
                  alt=""
                  src={nextSrc}
                  className="whBg whBgNext"
                  loading="eager"
                  draggable="false"
                />
              )}
              {currentSrc && (
                <img
                  alt={props.imageAlt}
                  src={currentSrc}
                  className="whBg whBgCurrent"
                  loading="eager"
                  draggable="false"
                  style={{ animationDuration: `${transitionMs}ms` }}
                />
              )}

              {/* ✅ soft overlays (don’t dim like crazy) */}
              <div className="whVignette" />
              <div className="whGlow" />
              <div className="whGrain" />
            </div>

            {/* ===== content (aligned like sdInner) ===== */}
            <div className="whInner">
              <div className="whKickerRow">
                <span className="whKicker">{props.kickerText}</span>
                <span className="whLine" />
              </div>

              <h1 className="thq-heading-1 whTitle">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="t">
                      Selected work across film, photography, sound, and motion.
                    </span>
                  </Fragment>
                )}
              </h1>

              <p className="thq-body-large whCopy">
                {props.content1 ?? (
                  <Fragment>
                    <span className="t">
                      Explore each discipline as a focused body of work.
                    </span>
                  </Fragment>
                )}
              </p>

              {/* ✅ same thin divider as SoundDesign */}
              <div className="whDivider" aria-hidden="true" />

              <div className="whActions">
                <Link href={props.primaryHref} legacyBehavior>
                  <a className="whBtnPrimary" aria-label="Explore Work">
                    <span className="whBtnText">
                      {props.primaryLabel ?? (
                        <Fragment>
                          <span className="t">Explore Work</span>
                        </Fragment>
                      )}
                    </span>
                    <span className="whArrow">→</span>
                  </a>
                </Link>

                <Link href={props.secondaryHref} legacyBehavior>
                  <a className="whBtnGhost" aria-label="Create Together">
                    <span className="whBtnText">
                      {props.secondaryLabel ?? (
                        <Fragment>
                          <span className="t">Create Together</span>
                        </Fragment>
                      )}
                    </span>
                    <span className="whArrow">→</span>
                  </a>
                </Link>
              </div>

              {/* dots */}
              {!reduceMotion && slides.length > 1 && (
                <div className="whDots" aria-label="Slideshow indicators">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`whDot ${i === idx ? 'on' : ''}`}
                      onClick={() => setIdx(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .whWrap {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .whMax {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* ✅ same "card" behavior as SoundDesign */
        .whCard {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
          min-height: 72vh;
        }

        /* ===== media layer ===== */
        .whMedia {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .whBg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
          /* ✅ keep it bright */
          filter: brightness(1) contrast(1.05) saturate(1.05);
          user-select: none;
        }

        .whBgNext {
          opacity: 1;
        }

        .whBgCurrent {
          opacity: 1;
          animation: whFadeIn ease both;
        }

        @keyframes whFadeIn {
          from {
            opacity: 0;
            transform: scale(1.035);
          }
          to {
            opacity: 1;
            transform: scale(1.03);
          }
        }

        /* ✅ overlay style closer to SoundDesign (still cinematic, less dim) */
        .whVignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(
              80% 70% at 50% 15%,
              rgba(255, 255, 255, 0.04),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.62) 0%,
              rgba(0, 0, 0, 0.26) 55%,
              rgba(0, 0, 0, 0.55) 100%
            );
        }

        .whGlow {
          position: absolute;
          inset: -18%;
          z-index: 2;
          background: radial-gradient(
            38% 28% at 18% 44%,
            rgba(37, 195, 226, 0.14),
            rgba(37, 195, 226, 0) 62%
          );
          filter: blur(10px);
        }

        .whGrain {
          position: absolute;
          inset: 0;
          z-index: 3;
          opacity: 0.06;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        /* ✅ inner content matches sdInner (left-top, not centered) */
        .whInner {
          position: relative;
          z-index: 4;
          padding: 34px 28px 22px; /* same as SoundDesign */
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          max-width: 920px; /* same idea as SoundDesign */
        }

        .whKickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .whKicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
          white-space: nowrap;
        }

        /* ✅ EXACT sdLine style */
        .whLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .whTitle {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 14px 40px rgba(0, 0, 0, 0.55);
        }

        .whCopy {
          margin: 0;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
          max-width: 70ch;
        }

        /* ✅ EXACT sdDivider style */
        .whDivider {
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

        .whActions {
          margin-top: 4px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .whBtnPrimary,
        .whBtnGhost {
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

        .whBtnPrimary {
          border: 1px solid rgba(37, 195, 226, 0.45);
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.22),
            rgba(37, 195, 226, 0.08)
          );
          color: #f5f4f4;
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.35);
        }

        .whBtnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(37, 195, 226, 0.7);
        }

        .whBtnGhost {
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(245, 244, 244, 0.92);
        }

        .whBtnGhost:hover {
          border-color: rgba(37, 195, 226, 0.45);
          background: rgba(37, 195, 226, 0.08);
          transform: translateY(-1px);
        }

        .whArrow {
          color: #25c3e2;
          transform: translateY(-1px);
        }

        .whDots {
          margin-top: 14px;
          display: inline-flex;
          gap: 8px;
          align-items: center;
        }

        .whDot {
          width: 28px;
          height: 3px;
          border-radius: 99px;
          border: 0;
          background: rgba(245, 244, 244, 0.18);
          cursor: pointer;
          padding: 0;
          transition: all 180ms ease;
        }

        .whDot.on {
          background: rgba(37, 195, 226, 0.7);
          box-shadow: 0 0 0 1px rgba(37, 195, 226, 0.18);
        }

        .whDot:hover {
          background: rgba(245, 244, 244, 0.28);
        }

        .t {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .whCard {
            min-height: 66vh;
          }
        }

        @media (max-width: 767px) {
          .whInner {
            padding: 22px 16px 16px; /* same as SoundDesign mobile */
            align-items: center;
            text-align: center;
          }
          .whKickerRow {
            justify-content: center;
          }
          .whLine {
            display: none;
          }
          .whActions {
            width: 100%;
            justify-content: center;
          }
          .whBtnPrimary,
          .whBtnGhost {
            width: 100%;
            justify-content: center;
            max-width: 520px;
          }
          .whDots {
            justify-content: center;
          }
        }

        @media (max-width: 479px) {
          .whCard {
            min-height: 52vh;
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