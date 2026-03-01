import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkFilmShortFilm = (props) => {
  const items = [
    {
      title: props.feature1Title ?? 'Short Film 01',
      desc:
        props.feature1Description ??
        'Atmosphere-led narrative exploring character and silence.',
      img: props.feature1ImageSrc || '/work/film/sf-01.jpg',
    },
    {
      title: props.feature2Title ?? 'Short Film 02',
      desc:
        props.feature2Description ??
        'Minimal visual storytelling shaped through pacing and space.',
      img: props.feature2ImageSrc || '/work/film/sf-02.jpg',
    },
    {
      title: props.feature3Title ?? 'Short Film 03',
      desc:
        props.feature3Description ??
        'Conceptual study balancing tone, rhythm, and composition.',
      img: props.feature3ImageSrc || '/work/film/sf-03.jpg',
    },
  ]

  return (
    <>
      <section className={`sfWrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* Header */}
          <div className="head">
            <span className="kicker">FILM</span>
            <h2 className="title">
              {props.heading1 ?? (
                <Fragment>
                  <span>Short Films</span>
                </Fragment>
              )}
            </h2>
            <p className="desc">
              {props.content1 ??
                'Narrative and conceptual short films shaped through atmosphere, restraint, and emotional tone.'}
            </p>
          </div>

          {/* Grid */}
          <div className="grid">
            {items.map((it, i) => (
              <div key={i} className="card">
                <img src={it.img} alt={it.title} className="img" />

                <div className="overlay">
                  <div className="overlayInner">
                    <h3 className="cardTitle">{it.title}</h3>
                    <p className="cardDesc">{it.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .sfWrap {
          position: relative;
        }

        /* subtle cinematic glow */
        .sfWrap::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            60% 50% at 50% 0%,
            rgba(37, 195, 226, 0.06),
            transparent
          );
        }

        .head {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 28px;
        }

        .kicker {
          letter-spacing: 0.28em;
          font-size: 11px;
          font-weight: 800;
          color: rgba(245, 244, 244, 0.7);
        }

        .title {
          margin: 10px 0 12px;
          font-size: 36px;
          letter-spacing: -0.02em;
          text-shadow: 0 14px 38px rgba(0, 0, 0, 0.35);
        }

        .desc {
          margin: 0;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.82);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.4);
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 4 / 3;
          display: block;
          transition: transform 0.4s ease;
        }

        .card:hover .img {
          transform: scale(1.08);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.75),
            rgba(0, 0, 0, 0.15),
            transparent
          );
          display: flex;
          align-items: flex-end;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card:hover .overlay {
          opacity: 1;
        }

        .overlayInner {
          padding: 16px;
        }

        .cardTitle {
          margin: 0;
          font-size: 15px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .cardDesc {
          margin: 6px 0 0;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(245, 244, 244, 0.75);
        }

        @media (max-width: 991px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .title {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  )
}

WorkFilmShortFilm.defaultProps = {
  rootClassName: '',
}

WorkFilmShortFilm.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  feature1Title: PropTypes.string,
  feature2Title: PropTypes.string,
  feature3Title: PropTypes.string,
  feature1Description: PropTypes.string,
  feature2Description: PropTypes.string,
  feature3Description: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default WorkFilmShortFilm