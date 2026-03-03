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
          I collaborate with filmmakers, visual artists, studios, and brands
          who understand the emotional power of sound in storytelling.
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
      <section className={`wifWrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="wifShell thq-section-max-width">

          <header className="wifHero">
            <div className="wifHeroInner">
              <h2 className="wifTitle thq-heading-2">{headingNode}</h2>
              <p className="wifDesc thq-body-large">{descNode}</p>

              <div className="wifNav">
                <button onClick={prev} className="wifNavBtn">←</button>
                <button onClick={next} className="wifNavBtn">→</button>
              </div>
            </div>
          </header>

          <div
            className="wifStage"
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
          >
            <div className="wifGrid">
              {visible.map((it, idx) => (
                <div key={it.id} className="wifTile">
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
                  className={`wifDot ${i === page ? 'on' : ''}`}
                  onClick={() => setPage(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .wifWrap { width: 100%; }
        .wifShell { display: flex; flex-direction: column; gap: 18px; }

        .wifHeroInner { text-align: center; }

        .wifTitle { margin: 0; }
        .wifDesc { margin-top: 10px; opacity: 0.85; }

        .wifNav { margin-top: 14px; display: flex; gap: 8px; justify-content: center; }

        .wifNavBtn {
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(245,244,244,0.15);
          background: rgba(0,0,0,0.25);
          cursor: pointer;
        }

        .wifGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .wifTile {
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(245,244,244,0.1);
          aspect-ratio: 4 / 3;
        }

        .wifImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .wifTile:hover .wifImg {
          transform: scale(1.05);
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
          background: rgba(245,244,244,0.2);
          border-radius: 99px;
          cursor: pointer;
        }

        .wifDot.on {
          background: rgba(37,195,226,0.8);
        }

        @media (max-width: 767px) {
          .wifGrid { grid-template-columns: 1fr; }
        }

        .t { display: inline-block; }
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
}

WhoItsForAudio.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.element,
  content1: PropTypes.element,
  intervalMs: PropTypes.number,
  fallbackCount: PropTypes.number,
}

export default WhoItsForAudio