import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'

const ContactOffice = (props) => {
  const card1 = useRef(null)
  const card2 = useRef(null)

  const handleMove = (e, ref) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const px = x / rect.width
    const py = y / rect.height

    const rotateX = (py - 0.5) * 8
    const rotateY = (px - 0.5) * -8

    ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    ref.current.style.setProperty('--mx', `${x}px`)
    ref.current.style.setProperty('--my', `${y}px`)
    ref.current.style.setProperty('--spot-opacity', '1')
  }

  const resetMove = (ref) => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
    ref.current.style.setProperty('--spot-opacity', '0')
    ref.current.style.setProperty('--mx', '50%')
    ref.current.style.setProperty('--my', '50%')
  }

  const mapsLink =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('No. 99, Sunethradevi Road, Kohuwala, Sri Lanka')

  return (
    <>
      <section className={`co-wrap ${props.rootClassName || ''}`}>
        <div className="co-head">
          <div className="co-kickerRow">
            <span className="co-kicker">VISIT</span>
            <span className="co-line" />
          </div>

          <h2 className="co-title thq-heading-2">
            {props.heading1 ?? (
              <Fragment>
                <span>Visit the Space</span>
              </Fragment>
            )}
          </h2>

          <p className="co-copy thq-body-large">
            {props.content1 ?? (
              <Fragment>
                <span>
                  For inquiries and appointments, please visit our headquarters.
                </span>
              </Fragment>
            )}
          </p>
        </div>

        <div className="co-gallery">
          <div
            className="co-imageCard"
            ref={card1}
            onMouseMove={(e) => handleMove(e, card1)}
            onMouseLeave={() => resetMove(card1)}
          >
            <img
              src={props.location1ImgSrc}
              alt={props.location1ImgAlt}
              className="co-image"
            />
            <div className="co-overlay" />
            <div className="co-spotlight" />
            <div className="co-sheen" />
          </div>

          <div
            className="co-imageCard"
            ref={card2}
            onMouseMove={(e) => handleMove(e, card2)}
            onMouseLeave={() => resetMove(card2)}
          >
            <img
              src={props.location2ImgSrc}
              alt={props.location2ImgAlt}
              className="co-image"
            />
            <div className="co-overlay" />
            <div className="co-spotlight" />
            <div className="co-sheen" />
          </div>
        </div>

        <div className="co-locations">
          <article className="co-locationCard">
            <span className="co-badge">Office</span>

            <h3 className="co-locationTitle thq-heading-3">
              {props.location1 ?? (
                <Fragment>
                  <span>Headquarters</span>
                </Fragment>
              )}
            </h3>

            <p className="co-locationCopy thq-body-large">
              {props.location1Description ?? (
                <Fragment>
                  <span>No. 99, Sunethradevi Road, Kohuwala, Sri Lanka.</span>
                </Fragment>
              )}
            </p>

            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="co-button"
            >
              Get directions
            </a>
          </article>

          <article className="co-locationCard">
            <span className="co-badge">Studio</span>

            <h3 className="co-locationTitle thq-heading-3">
              {props.location2 ?? (
                <Fragment>
                  <span>Studio</span>
                </Fragment>
              )}
            </h3>

            <p className="co-locationCopy thq-body-large">
              {props.location2Description ?? (
                <Fragment>
                  <span>No. 99, Sunethradevi Road, Kohuwala, Sri Lanka.</span>
                </Fragment>
              )}
            </p>

            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="co-button"
            >
              Get directions
            </a>
          </article>
        </div>
      </section>

      <style jsx>{`
        .co-wrap {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 34px;
}

        .co-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }

        .co-kickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .co-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.7);
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(0, 0, 0, 0.3);
        }

        .co-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.18),
            rgba(255, 255, 255, 0)
          );
        }

        .co-title {
          margin: 0;
          color: #f5f4f4;
          text-shadow: 0 24px 70px rgba(0, 0, 0, 0.65);
        }

        .co-copy {
          margin: 0;
          color: rgba(245, 244, 244, 0.8);
          line-height: 1.8;
          max-width: 64ch;
        }

        .co-gallery {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

        .co-imageCard {
          --mx: 50%;
          --my: 50%;
          --spot-opacity: 0;
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
          transform-style: preserve-3d;
          will-change: transform;
        }

        .co-imageCard:hover {
          box-shadow: 0 36px 95px rgba(0, 0, 0, 0.62);
        }

        .co-image {
  width: 100%;
  height: 380px;
  object-fit: cover;
  display: block;
  transform: scale(1);
  transition: transform 0.6s ease, filter 0.6s ease;
}

        .co-imageCard:hover .co-image {
          transform: scale(1.05);
          filter: contrast(1.06) saturate(1.08);
        }

        .co-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              60% 60% at 50% 30%,
              rgba(255, 255, 255, 0.05),
              rgba(0, 0, 0, 0.55)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.08),
              rgba(0, 0, 0, 0.36)
            );
          pointer-events: none;
          z-index: 1;
        }

        .co-spotlight {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: var(--spot-opacity);
          transition: opacity 220ms ease;
          background:
            radial-gradient(
              240px circle at var(--mx) var(--my),
              rgba(255, 255, 255, 0.18),
              rgba(255, 255, 255, 0.08) 22%,
              rgba(37, 195, 226, 0.08) 38%,
              rgba(0, 0, 0, 0) 62%
            );
          mix-blend-mode: screen;
        }

        .co-sheen {
          position: absolute;
          inset: -20%;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(
            115deg,
            rgba(255, 255, 255, 0) 30%,
            rgba(255, 255, 255, 0.08) 48%,
            rgba(255, 255, 255, 0) 62%
          );
          transform: translateX(-60%) skewX(-18deg);
          transition: opacity 220ms ease;
        }

        .co-imageCard:hover .co-sheen {
          opacity: 1;
          animation: co-sheen-move 1.4s ease;
        }

        @keyframes co-sheen-move {
          0% {
            transform: translateX(-60%) skewX(-18deg);
          }
          100% {
            transform: translateX(60%) skewX(-18deg);
          }
        }

        .co-locations {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

        .co-locationCard {
  width: 100%;
  min-height: 176px;
  padding: 28px 24px;
  border-radius: 26px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.015)
  );
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  transition: all 0.25s ease;
}

        .co-locationCard:hover {
          transform: translateY(-4px);
          border-color: rgba(37, 195, 226, 0.25);
        }

        .co-badge {
          width: fit-content;
          padding: 8px 12px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border-radius: 999px;
          color: #25c3e2;
          background: linear-gradient(
            180deg,
            rgba(37, 195, 226, 0.2),
            rgba(37, 195, 226, 0.06)
          );
          border: 1px solid rgba(37, 195, 226, 0.2);
        }

        .co-locationTitle {
          margin: 0;
          color: #f5f4f4;
        }

        .co-locationCopy {
          margin: 0;
          color: rgba(245, 244, 244, 0.8);
          line-height: 1.8;
        }

        .co-button {
          margin-top: 10px;
          width: fit-content;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #f5f4f4;
          background: rgba(0, 0, 0, 0.35);
          transition: all 0.2s ease;
        }

        .co-button:hover {
          color: #25c3e2;
          border-color: rgba(37, 195, 226, 0.4);
          transform: translateY(-1px);
        }

        @media (max-width: 767px) {
          .co-line {
            display: none;
          }

          .co-gallery,
          .co-locations {
            grid-template-columns: 1fr;
          }

          .co-imageCard {
            transform: none !important;
          }

          .co-image {
            height: 260px;
          }
        }
      `}</style>
    </>
  )
}

ContactOffice.defaultProps = {
  heading1: undefined,
  content1: undefined,
  location1: undefined,
  location2: undefined,
  location1Description: undefined,
  location2Description: undefined,
  rootClassName: '',
  location1ImgSrc: '/contact/contactoffice-01.jpg',
  location1ImgAlt: 'Office',
  location2ImgSrc: '/contact/contactstudio-02.jpg',
  location2ImgAlt: 'Studio',
}

ContactOffice.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  location1: PropTypes.element,
  location2: PropTypes.element,
  location1Description: PropTypes.element,
  location2Description: PropTypes.element,
  rootClassName: PropTypes.string,
  location1ImgSrc: PropTypes.string,
  location1ImgAlt: PropTypes.string,
  location2ImgSrc: PropTypes.string,
  location2ImgAlt: PropTypes.string,
}

export default ContactOffice