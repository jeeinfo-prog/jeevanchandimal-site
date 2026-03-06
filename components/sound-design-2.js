import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const SoundDesign2 = (props) => {
  return (
    <>
      <section className="sdSection thq-section-padding">
        <div className="panel" aria-hidden="true" />

        <div className="wrap thq-section-max-width thq-flex-column">

          {/* Premium Cinematic Header */}
          <header className="titleShell">

            <div className="titleBg" aria-hidden="true">
              <div className="titleVignette"/>
              <div className="titleGlow"/>
              <div className="titleGrain"/>
            </div>

            <div className="titleBlock">

              <div className="kickerRow">
                <span className="kicker">SOUND</span>
                <span className="kickerLine"/>
              </div>

              <h2 className="thq-heading-2 title">
                {props.sectionTitle ?? (
                  <Fragment>
                    <span>Sound Design</span>
                  </Fragment>
                )}
              </h2>

              <p className="thq-body-large desc">
                {props.sectionDescription ?? (
                  <Fragment>
                    <span>
                      Atmospheric soundscapes and environmental design created
                      to add depth and realism to visual narratives. Each piece
                      is built with attention to space, layering, and emotional
                      tone.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="titleDivider"/>

              <div className="titleMeta thq-body-small">
                Atmosphere • Texture • Emotion
              </div>

            </div>
          </header>


          {/* Cards */}
          <div className="grid thq-grid-auto-300">

            {/* Card 1 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature1ImageAlt}
                  src={props.feature1ImageSrc}
                  className="img"
                  loading="lazy"
                />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span>Atmosphere & Space</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>
                        Environmental depth, believable spaces, and cinematic presence.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>


            {/* Card 2 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature2ImageAlt}
                  src={props.feature2ImageSrc}
                  className="img"
                  loading="lazy"
                />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span>Layering & Texture</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span>
                        Detail-rich sound design with clean separation and controlled dynamics.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>


            {/* Card 3 */}
            <article className="card">
              <div className="media">
                <img
                  alt={props.feature3ImageAlt}
                  src={props.feature3ImageSrc}
                  className="img"
                  loading="lazy"
                />
              </div>

              <div className="cardBody">
                <h3 className="thq-heading-3 cardTitle">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span>Story-Driven Restraint</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>
                        Sound that supports emotion without overwhelming the frame.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>

          </div>


          {/* Buttons */}
          <div className="actions">
            <button className="btnPrimary" type="button">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span>Get Started</span>
                  </Fragment>
                )}
              </span>
            </button>

            <button className="btnGhost" type="button">
              <span className="thq-body-small">
                {props.secondaryAction ?? (
                  <Fragment>
                    <span>Learn More</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>

        </div>
      </section>

      <style jsx>{`

        .sdSection{
          width:100%;
          position:relative;
          display:flex;
          flex-direction:column;
          align-items:center;
          overflow:hidden;
        }

        .panel{
          position:absolute;
          inset:0;
          pointer-events:none;
          background:
          radial-gradient(70% 60% at 50% 0%, rgba(255,255,255,0.05), transparent 55%),
          linear-gradient(180deg, rgba(255,255,255,0.02), transparent 42%, rgba(0,0,0,0.28));
        }

        .wrap{
          width:100%;
          gap:var(--dl-layout-space-threeunits);
          position:relative;
          z-index:1;
        }


        /* HEADER */

        .titleShell{
          width:100%;
          border-radius:22px;
          border:1px solid rgba(245,244,244,0.1);
          background:rgba(12,12,12,0.55);
          box-shadow:0 30px 110px rgba(0,0,0,0.6);
          backdrop-filter:blur(10px);
          overflow:hidden;
          position:relative;
        }

        .titleBg{
          position:absolute;
          inset:0;
          pointer-events:none;
        }

        .titleVignette{
          position:absolute;
          inset:0;
          background:
          radial-gradient(65% 55% at 20% 20%, rgba(255,255,255,0.07), transparent),
          linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.75));
        }

        .titleGlow{
          position:absolute;
          inset:-20%;
          background:
          radial-gradient(40% 35% at 20% 20%, rgba(160,196,255,0.16), transparent 65%);
          filter:blur(20px);
        }

        .titleGrain{
          position:absolute;
          inset:0;
          opacity:0.06;
          mix-blend-mode:overlay;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
        }

        .titleBlock{
          padding:40px 34px;
          position:relative;
          z-index:1;
          display:flex;
          flex-direction:column;
          align-items:flex-start;
          text-align:left;
          gap:12px;
          max-width:880px;
        }

        .kickerRow{
          display:flex;
          gap:10px;
          align-items:center;
          width:100%;
        }

        .kicker{
          font-size:12px;
          letter-spacing:.22em;
          text-transform:uppercase;
          padding:6px 10px;
          border-radius:999px;
          border:1px solid rgba(245,244,244,0.12);
          background:rgba(0,0,0,0.25);
          color:rgba(245,244,244,0.72);
        }

        .kickerLine{
          flex:1;
          height:1px;
          background:linear-gradient(90deg, rgba(245,244,244,0.18), transparent);
        }

        .title{
          margin:0;
          line-height:1.08;
          text-shadow:0 14px 40px rgba(0,0,0,0.55);
        }

        .desc{
          margin:0;
          max-width:60ch;
          color:rgba(245,244,244,0.85);
          line-height:1.75;
        }

        .titleDivider{
          width:100%;
          max-width:420px;
          height:1px;
          background:linear-gradient(90deg, rgba(245,244,244,0.18), transparent);
        }

        .titleMeta{
          letter-spacing:.14em;
          text-transform:uppercase;
          color:rgba(245,244,244,0.6);
          font-size:12px;
        }


        /* CARDS */

        .grid{
          width:100%;
          gap:18px;
        }

        .card{
          border-radius:20px;
          overflow:hidden;
          background:rgba(15,15,15,0.55);
          border:1px solid rgba(245,244,244,0.1);
          box-shadow:0 18px 55px rgba(0,0,0,0.42);
          transition:all .25s ease;
        }

        .card:hover{
          transform:translateY(-4px);
          box-shadow:0 28px 75px rgba(0,0,0,0.55);
        }

        .media{
          width:100%;
          aspect-ratio:4/3;
          overflow:hidden;
        }

        .img{
          width:100%;
          height:100%;
          object-fit:cover;
          transform:scale(1.02);
          transition:transform .4s ease;
        }

        .card:hover .img{
          transform:scale(1.06);
        }

        .cardBody{
          padding:16px 16px 18px;
          display:flex;
          flex-direction:column;
          gap:8px;
        }

        .cardText{
          color:rgba(245,244,244,0.78);
          line-height:1.6;
        }


        /* BUTTONS */

        .actions{
          width:100%;
          display:flex;
          justify-content:center;
          gap:12px;
        }

        .btnPrimary{
          border-radius:999px;
          padding:10px 18px;
          border:1px solid rgba(245,244,244,0.16);
          background:linear-gradient(180deg, rgba(245,244,244,0.18), rgba(245,244,244,0.06));
          backdrop-filter:blur(10px);
        }

        .btnGhost{
          border-radius:999px;
          padding:10px 18px;
          border:1px solid rgba(245,244,244,0.14);
          background:rgba(0,0,0,0.18);
        }

        @media(max-width:767px){
          .titleBlock{
            padding:26px 20px;
          }
        }

      `}</style>
    </>
  )
}

SoundDesign2.defaultProps = {
  sectionTitle: undefined,
  sectionDescription: undefined,

  feature1Title: undefined,
  feature1Description: undefined,
  feature1ImageAlt: 'Atmosphere & Space',
  feature1ImageSrc: '/work/audio/wasd-01.jpg',

  feature2Title: undefined,
  feature2Description: undefined,
  feature2ImageAlt: 'Layering & Texture',
  feature2ImageSrc: '/work/audio/wasd-02.jpg',

  feature3Title: undefined,
  feature3Description: undefined,
  feature3ImageAlt: 'Story-Driven Restraint',
  feature3ImageSrc: '/work/audio/wasd-03.jpg',

  mainAction: undefined,
  secondaryAction: undefined,
}

SoundDesign2.propTypes = {
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

export default SoundDesign2