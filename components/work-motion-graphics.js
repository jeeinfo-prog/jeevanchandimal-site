import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkMotionGraphics = (props) => {
  return (
    <>
      <section className={`wamgSection thq-section-padding ${props.rootClassName || ''}`}>
        {/* cinematic glass layer */}
        <div className="panel" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="wrap thq-section-max-width thq-flex-column">
          {/* header */}
          <header className="titleRow">
            <div className="titleCol">
              <div className="kicker">MG</div>
              <h2 className="thq-heading-2 title">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span>Motion Graphics</span>
                  </Fragment>
                )}
              </h2>
            </div>

            <p className="thq-body-large desc">
              {props.sectionDescription ?? (
                <Fragment>
                  <span>
                    Graphic motion designed to support storytelling, titles, and visual
                    communication. Each piece prioritizes clarity, rhythm, and restraint.
                  </span>
                </Fragment>
              )}
            </p>
          </header>

          {/* cards */}
          <div className="grid">
            {/* 1 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="img"
                  loading="lazy"
                />
                <div className="mediaOverlay" aria-hidden="true" />
              </div>
              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span>Titles &amp; Type</span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small cardText">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>Typography-led motion—readable, paced, and emotionally aligned.</span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>

            {/* 2 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="img"
                  loading="lazy"
                />
                <div className="mediaOverlay" aria-hidden="true" />
              </div>
              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span>Rhythm &amp; Cut</span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small cardText">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span>Motion shaped to the edit—beats that support story, not noise.</span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>

            {/* 3 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="img"
                  loading="lazy"
                />
                <div className="mediaOverlay" aria-hidden="true" />
              </div>
              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>Clarity &amp; Restraint</span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small cardText">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>Graphic language that stays precise—clean layouts, controlled energy.</span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>
          </div>

          {/* actions */}
          <div className="actions">
            <button className="btnPrimary thq-button-filled" type="button">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span>Customized Solutions</span>
                  </Fragment>
                )}
              </span>
            </button>

            <button className="btnGhost thq-button-outline" type="button">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span>Dedicated Customer Support</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .wamgSection {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
          overflow: hidden;
        }

        .panel {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              80% 65% at 50% 0%,
              rgba(255, 255, 255, 0.06),
              rgba(0, 0, 0, 0) 55%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.12) 0%,
              rgba(0, 0, 0, 0) 46%,
              rgba(0, 0, 0, 0.38) 100%
            );
        }

        .grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .wrap {
          width: 100%;
          position: relative;
          z-index: 1;
          gap: var(--dl-layout-space-threeunits);
          align-items: center;
        }

        .titleRow {
          width: 100%;
          max-width: 980px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 18px;
          align-items: end;
        }

        .titleCol {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .kicker {
          width: fit-content;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.68);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(10px);
        }

        .title {
          margin: 0;
          line-height: 1.08;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .desc {
          margin: 0;
          color: rgba(245, 244, 244, 0.82);
          line-height: 1.7;
        }

        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }

        .card {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(15, 15, 15, 0.55);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: 0 18px 55px rgba(0, 0, 0, 0.42);
          transform: translateY(0);
          transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(160, 196, 255, 0.22);
          box-shadow: 0 28px 75px rgba(0, 0, 0, 0.55);
        }

        .media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.35);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
          filter: saturate(0.92) contrast(1.05) brightness(0.78);
          transition: transform 420ms ease, filter 420ms ease;
          display: block;
        }

        .card:hover .img {
          transform: scale(1.08);
          filter: saturate(0.98) contrast(1.08) brightness(0.82);
        }

        .mediaOverlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              85% 65% at 50% 20%,
              rgba(0, 0, 0, 0.08),
              rgba(0, 0, 0, 0.62)
            ),
            linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.75));
        }

        .cardBody {
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cardTitle {
          margin: 0;
          line-height: 1.2;
        }

        .cardText {
          color: rgba(245, 244, 244, 0.78);
          line-height: 1.6;
        }

        .actions {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .btnPrimary {
          border-radius: 999px;
          padding: 10px 18px;
          background: linear-gradient(
            180deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0.06)
          );
          border: 1px solid rgba(245, 244, 244, 0.16);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
          transition: transform 200ms ease, border-color 200ms ease;
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
          border-color: rgba(160, 196, 255, 0.25);
        }

        .btnGhost {
          border-radius: 999px;
          padding: 10px 18px;
          background: rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(245, 244, 244, 0.14);
          backdrop-filter: blur(10px);
          transition: transform 200ms ease, border-color 200ms ease;
        }

        .btnGhost:hover {
          transform: translateY(-1px);
          border-color: rgba(245, 244, 244, 0.22);
        }

        @media (max-width: 991px) {
          .titleRow {
            grid-template-columns: 1fr;
            align-items: start;
            max-width: 920px;
          }
        }

        @media (max-width: 767px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 479px) {
          .wrap {
            gap: var(--dl-layout-space-oneandhalfunits);
          }
          .actions {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }
          .btnPrimary,
          .btnGhost {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}

WorkMotionGraphics.defaultProps = {
  rootClassName: '',

  sectionTitle: undefined,
  sectionDescription: undefined,

  feature1Title: undefined,
  feature1Description: undefined,
  feature1ImageAlt: 'Titles & Type',
  feature1ImageSrc: '/work/animation/wamg-01.jpg',

  feature2Title: undefined,
  feature2Description: undefined,
  feature2ImageAlt: 'Rhythm & Cut',
  feature2ImageSrc: '/work/animation/wamg-02.jpg',

  feature3Title: undefined,
  feature3Description: undefined,
  feature3ImageAlt: 'Clarity & Restraint',
  feature3ImageSrc: '/work/animation/wamg-03.jpg',

  mainAction: undefined,
  secondaryAction: undefined,
}

WorkMotionGraphics.propTypes = {
  rootClassName: PropTypes.string,

  sectionTitle: PropTypes.element,
  sectionDescription: PropTypes.element,

  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature1ImageSrc: PropTypes.string,

  feature2Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature2ImageAlt: PropTypes.string,
  feature2ImageSrc: PropTypes.string,

  feature3Title: PropTypes.element,
  feature3Description: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,

  mainAction: PropTypes.element,
  secondaryAction: PropTypes.element,
}

export default WorkMotionGraphics