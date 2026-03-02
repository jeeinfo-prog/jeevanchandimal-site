import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WhatIDoPhotographyServices = (props) => {
  const Feature = ({
    img,
    alt,
    title,
    desc,
    btn,
  }) => (
    <div className="card">
      <div className="imgWrap">
        <img src={img} alt={alt} />
        <div className="imgVignette" />
      </div>

      <div className="cardInner">
        <h3 className="thq-heading-3 title">{title}</h3>
        <p className="thq-body-small desc">{desc}</p>

        <button className="btn">
          <span className="thq-body-small">{btn}</span>
          <svg viewBox="0 0 1024 1024" className="icon">
            <path d="M426 256l256 256-256 256-60-60 196-196-196-196z" />
          </svg>
        </button>
      </div>
    </div>
  )

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* header */}
          <div className="head">
            <div className="kickerRow">
              <span className="kicker">PHOTOGRAPHY</span>
              <span className="kickerLine" />
            </div>

            <h2 className="thq-heading-2 titleMain">
              {props.sectionTitle ?? <span>What I Do</span>}
            </h2>
          </div>

          {/* grid */}
          <div className="grid">
            <Feature
              img={props.feature1ImageSrc}
              alt={props.feature1ImageAlt}
              title={
                props.feature1Title ?? (
                  <span>Cinematic &amp; Editorial Photography</span>
                )
              }
              desc={
                props.feature1Description ?? (
                  <span>
                    Story-driven imagery created with intention and visual depth.
                  </span>
                )
              }
              btn={props.feature1Button ?? <span>Learn More</span>}
            />

            <Feature
              img={props.feature2ImageSrc}
              alt={props.feature2ImageAlt}
              title={props.feature2Title ?? <span>Nature &amp; Wildlife</span>}
              desc={
                props.feature2Description ?? (
                  <span>
                    Quiet, patient observations of the natural world.
                  </span>
                )
              }
              btn={props.feature2Button ?? <span>Discover More</span>}
            />

            <Feature
              img={props.feature3ImageSrc}
              alt={props.feature3ImageAlt}
              title={props.feature3Title ?? <span>Landscape &amp; Travel</span>}
              desc={
                props.feature3Description ?? (
                  <span>
                    Expansive scenes that convey scale, mood, and place.
                  </span>
                )
              }
              btn={props.feature3Button ?? <span>Explore Now</span>}
            />

            <Feature
              img={props.feature4ImageSrc}
              alt={props.feature4ImageAlt}
              title={
                props.feature4Title ?? (
                  <span>Black &amp; White Fine Art</span>
                )
              }
              desc={
                props.feature4Description ?? (
                  <span>
                    Timeless compositions focused on light, form, and emotion.
                  </span>
                )
              }
              btn={props.feature4Button ?? <span>View Portfolio</span>}
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          width: 100%;
        }

        .shell {
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        .head {
          max-width: 820px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .kickerRow {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
        }

        .kickerLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .titleMain {
          margin: 0;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
        }

        .card {
          grid-column: span 6;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          backdrop-filter: blur(10px);
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.45);
          transition: transform 0.2s ease, border-color 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(120, 166, 255, 0.35);
        }

        .imgWrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .imgWrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
          transition: transform 0.3s ease;
        }

        .card:hover img {
          transform: scale(1.08);
        }

        .imgVignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.6)
          );
        }

        .cardInner {
          padding: 18px 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .title {
          margin: 0;
        }

        .desc {
          margin: 0;
          color: rgba(245, 244, 244, 0.8);
        }

        .btn {
          margin-top: 6px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .icon {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 991px) {
          .card {
            grid-column: span 12;
          }
        }
      `}</style>
    </>
  )
}

WhatIDoPhotographyServices.defaultProps = {
  rootClassName: '',
}

WhatIDoPhotographyServices.propTypes = {
  rootClassName: PropTypes.string,
}

export default WhatIDoPhotographyServices