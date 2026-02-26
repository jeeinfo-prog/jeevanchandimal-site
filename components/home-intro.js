import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const HomeIntro = (props) => {
  return (
    <>
      <section className={`homeIntro thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* top line */}
          <div className="kickerRow">
            <span className="kicker">INTRODUCTION</span>
            <span className="dot" aria-hidden="true" />
            <span className="kickerSub">Cinematic intent · Quiet detail</span>
          </div>

          <div className="grid">
            {/* left */}
            <div className="left">
              <h2 className="title">
                {props.heading ?? (
                  <Fragment>
                    <span>Introduction</span>
                  </Fragment>
                )}
              </h2>

              <p className="lead">
                End-to-end visual production shaped with restraint — where image, motion, and sound
                become atmosphere.
              </p>

              <div className="chips" aria-label="Capabilities">
                <span className="chip">Film</span>
                <span className="chip">Photography</span>
                <span className="chip">Sound</span>
                <span className="chip">Animation</span>
              </div>
            </div>

            {/* right */}
            <div className="card">
              <div className="cardTop">
                <h3 className="cardTitle">
                  {props.heading2 ?? (
                    <Fragment>
                      <span>Film Production</span>
                    </Fragment>
                  )}
                </h3>

                <span className="badge">From concept to delivery</span>
              </div>

              <div className="rule" />

              <div className="body thq-body-small">
                {props.content2 ?? (
                  <Fragment>
                    <p className="p">
                      End-to-end visual production, built with cinematic intent — film, photography,
                      sound, and animation from concept to final delivery.
                    </p>
                    <p className="p">
                      Every project is approached as a complete visual experience, shaped with care,
                      restraint, and attention to atmosphere.
                    </p>
                  </Fragment>
                )}
              </div>

              <ul className="bullets" aria-label="Approach">
                <li>Concept-first collaboration</li>
                <li>Lighting · composition · pacing</li>
                <li>Sound texture + mood</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .homeIntro {
          width: 100%;
          position: relative;
        }

        .shell {
          width: 100%;
        }

        /* subtle luxury glass */
        .homeIntro::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              70% 60% at 50% 0%,
              rgba(37, 195, 226, 0.06),
              rgba(0, 0, 0, 0)
            ),
            linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0));
          opacity: 0.9;
        }

        .kickerRow {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 18px;
          opacity: 0.9;
          flex-wrap: wrap;
          text-align: center;
        }

        .kicker {
          letter-spacing: 0.28em;
          font-size: 11px;
          font-weight: 800;
          color: rgba(245, 244, 244, 0.82);
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(37, 195, 226, 0.65);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.1);
        }

        .kickerSub {
          font-size: 12px;
          color: rgba(245, 244, 244, 0.7);
          letter-spacing: 0.08em;
        }

        .grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 22px;
          align-items: stretch;
        }

        .left {
          padding: 10px 6px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          text-align: center;
        }

        .title {
          margin: 0;
          font-size: 38px;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #f5f4f4;
          text-shadow: 0 14px 38px rgba(0, 0, 0, 0.35);
        }

        .lead {
          margin: 0;
          max-width: 54ch;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(245, 244, 244, 0.82);
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 8px;
        }

        .chip {
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(245, 244, 244, 0.88);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .card {
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.52);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cardTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .cardTitle {
          margin: 0;
          font-size: 16px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.92);
        }

        .badge {
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.1);
          color: #25c3e2;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        .rule {
          height: 1px;
          width: 100%;
          background: linear-gradient(
            90deg,
            rgba(37, 195, 226, 0),
            rgba(37, 195, 226, 0.35),
            rgba(37, 195, 226, 0)
          );
          opacity: 0.9;
        }

        .body {
          color: rgba(245, 244, 244, 0.82);
          line-height: 1.75;
          font-size: 15px;
        }

        .p {
          margin: 0 0 10px;
        }

        .bullets {
          margin: 0;
          padding: 0 0 0 18px;
          display: grid;
          gap: 8px;
          color: rgba(245, 244, 244, 0.75);
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .title {
            font-size: 32px;
          }
          .card {
            padding: 16px;
          }
        }
      `}</style>
    </>
  )
}

HomeIntro.defaultProps = {
  heading: undefined,
  content2: undefined,
  heading2: undefined,
  rootClassName: '',
}

HomeIntro.propTypes = {
  heading: PropTypes.element,
  content2: PropTypes.element,
  heading2: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default HomeIntro