import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkPresentationNote = (props) => {
  return (
    <>
      <section className={`wapnSection thq-section-padding ${props.rootClassName || ''}`}>
        {/* cinematic layers */}
        <div className="panel" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="wrap thq-section-max-width">
          <div className="noteCard">
            {/* left: image */}
            <div className="media" aria-hidden="true">
              <div
                className="mediaImg"
                style={{ backgroundImage: `url(${props.imageSrc})` }}
              />
              <div className="mediaOverlay" />
            </div>

            {/* right: content */}
            <div className="content">
              <div className="kickerRow">
                <div className="kicker">NOTE</div>
                <div className="rule" />
              </div>

              <h2 className="thq-heading-2 title">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span>Presentation Note</span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large desc">
                {props.sectionDescription ?? (
                  <Fragment>
                    <span>
                      Projects are shown as short looping previews, allowing motion to be
                      experienced naturally—without interruption.
                    </span>
                  </Fragment>
                )}
              </p>

              {/* compact “principles” list (replaces the old 3 feature cards) */}
              <div className="bullets">
                <div className="bullet">
                  <div className="dot" />
                  <div className="bulletText">
                    <div className="bulletTitle">
                      {props.feature1Title ?? (
                        <Fragment>
                          <span>Looped Previews</span>
                        </Fragment>
                      )}
                    </div>
                    <div className="thq-body-small muted">
                      {props.feature1Description ?? (
                        <Fragment>
                          <span>Short loops highlight timing, rhythm, and intent.</span>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bullet">
                  <div className="dot" />
                  <div className="bulletText">
                    <div className="bulletTitle">
                      {props.feature2Title ?? (
                        <Fragment>
                          <span>Context First</span>
                        </Fragment>
                      )}
                    </div>
                    <div className="thq-body-small muted">
                      {props.feature2Description ?? (
                        <Fragment>
                          <span>Motion is framed with supporting visuals and pacing.</span>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bullet">
                  <div className="dot" />
                  <div className="bulletText">
                    <div className="bulletTitle">
                      {props.feature3Title ?? (
                        <Fragment>
                          <span>Quiet Control</span>
                        </Fragment>
                      )}
                    </div>
                    <div className="thq-body-small muted">
                      {props.feature3Description ?? (
                        <Fragment>
                          <span>Clarity and restraint keep attention on the story.</span>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
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
          </div>

          {/* subtle footer line under card (cinematic separation) */}
          <div className="divider" aria-hidden="true" />
        </div>
      </section>

      <style jsx>{`
        .wapnSection {
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
              85% 65% at 50% 0%,
              rgba(255, 255, 255, 0.05),
              rgba(0, 0, 0, 0) 55%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.12) 0%,
              rgba(0, 0, 0, 0) 46%,
              rgba(0, 0, 0, 0.42) 100%
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
        }

        .noteCard {
          width: 100%;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          border-radius: 22px;
          overflow: hidden;
          background: rgba(15, 15, 15, 0.58);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.48);
          backdrop-filter: blur(10px);
        }

        .media {
          position: relative;
          min-height: 360px;
          background: rgba(0, 0, 0, 0.35);
        }

        .mediaImg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.02);
          filter: saturate(0.92) contrast(1.06) brightness(0.74);
        }

        .mediaOverlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              90% 70% at 50% 25%,
              rgba(0, 0, 0, 0.1),
              rgba(0, 0, 0, 0.66)
            ),
            linear-gradient(90deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7));
        }

        .content {
          padding: 22px 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kickerRow {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .kicker {
          width: fit-content;
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.68);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.25);
        }

        .rule {
          height: 1px;
          flex: 1;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.14),
            rgba(245, 244, 244, 0)
          );
        }

        .title {
          margin: 0;
          line-height: 1.08;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .desc {
          margin: 0;
          color: rgba(245, 244, 244, 0.84);
          line-height: 1.7;
          max-width: 56ch;
        }

        .bullets {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 4px;
        }

        .bullet {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 12px 12px;
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(245, 244, 244, 0.08);
        }

        .dot {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          margin-top: 6px;
          background: rgba(160, 196, 255, 0.9);
          box-shadow: 0 0 0 6px rgba(160, 196, 255, 0.12);
        }

        .bulletText {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .bulletTitle {
          font-weight: 600;
          letter-spacing: 0.01em;
          color: rgba(245, 244, 244, 0.92);
        }

        .muted {
          color: rgba(245, 244, 244, 0.74);
          line-height: 1.6;
        }

        .actions {
          display: flex;
          gap: 12px;
          margin-top: 4px;
          flex-wrap: wrap;
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

        .divider {
          width: 100%;
          height: 1px;
          margin-top: 16px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0),
            rgba(245, 244, 244, 0.14),
            rgba(245, 244, 244, 0)
          );
          opacity: 0.55;
        }

        @media (max-width: 991px) {
          .noteCard {
            grid-template-columns: 1fr;
          }
          .media {
            min-height: 300px;
          }
          .desc {
            max-width: none;
          }
        }

        @media (max-width: 479px) {
          .content {
            padding: 18px 16px 16px;
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

WorkPresentationNote.defaultProps = {
  rootClassName: '',

  sectionTitle: undefined,
  sectionDescription: undefined,

  // ✅ one cinematic image for the note (requested)
  imageSrc: '/work/animation/wapn-01.jpg',

  // keep these as text “principles” (not image cards)
  feature1Title: undefined,
  feature1Description: undefined,
  feature2Title: undefined,
  feature2Description: undefined,
  feature3Title: undefined,
  feature3Description: undefined,

  mainAction: undefined,
  secondaryAction: undefined,
}

WorkPresentationNote.propTypes = {
  rootClassName: PropTypes.string,

  sectionTitle: PropTypes.element,
  sectionDescription: PropTypes.element,

  // ✅ single image
  imageSrc: PropTypes.string,

  // text blocks
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature2Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature3Title: PropTypes.element,
  feature3Description: PropTypes.element,

  mainAction: PropTypes.element,
  secondaryAction: PropTypes.element,
}

export default WorkPresentationNote