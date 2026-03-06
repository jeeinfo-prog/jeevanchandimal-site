import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Work2DAnimation = (props) => {
  return (
    <>
      <section className="wa2dSection thq-section-padding">
        <div className="panel" aria-hidden="true" />

        <div className="wrap thq-section-max-width thq-flex-column">

          {/* Curved cinematic title box */}
          <header className="titleShell">

            <div className="titleBg" aria-hidden="true">
              <div className="titleVignette" />
              <div className="titleGlow" />
              <div className="titleGrain" />
            </div>

            <div className="titleInner">

              <div className="titleCol">

                <div className="kickerRow">
                  <span className="kicker">2D</span>
                  <span className="kickerLine" />
                </div>

                <h2 className="thq-heading-2 title">
                  {props.sectionTitle ?? (
                    <Fragment>
                      <span>2D Animation</span>
                    </Fragment>
                  )}
                </h2>

                <div className="titleDivider" />

                <div className="titleMeta thq-body-small">
                  Rhythm • Structure • Clarity
                </div>

              </div>

              <p className="thq-body-large desc">
                {props.sectionDescription ?? (
                  <Fragment>
                    <span>
                      Flat and illustrative animation developed with structure
                      and pacing in mind. Movement is clean, purposeful,
                      and aligned with narrative flow.
                    </span>
                  </Fragment>
                )}
              </p>

            </div>
          </header>

          {/* Cards */}
          <div className="grid">

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
                      <span>Concept & Story</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span>
                        Movement designed around meaning—clear beats,
                        clean intention.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>

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
                      <span>Timing & Rhythm</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span>
                        Controlled pacing that supports edit,
                        tone, and emotion.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>

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
                      <span>Visual Cohesion</span>
                    </Fragment>
                  )}
                </h3>

                <span className="thq-body-small cardText">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span>
                        Design that integrates with film and photography—
                        never distracts.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </article>

          </div>

          {/* Buttons */}
          <div className="actions">

            <button className="btnPrimary thq-button-filled">
              <span className="thq-body-small">
                {props.mainAction ?? (
                  <Fragment>
                    <span>Customized Solutions</span>
                  </Fragment>
                )}
              </span>
            </button>

            <button className="btnGhost thq-button-outline">
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

.wa2dSection{
width:100%;
position:relative;
display:flex;
align-items:center;
flex-direction:column;
overflow:hidden;
}

.panel{
position:absolute;
inset:0;
pointer-events:none;
background:
radial-gradient(
80% 65% at 50% 0%,
rgba(255,255,255,.05),
rgba(0,0,0,0) 55%
),
linear-gradient(
180deg,
rgba(0,0,0,.12) 0%,
rgba(0,0,0,0) 46%,
rgba(0,0,0,.28) 100%
);
}

.wrap{
width:100%;
position:relative;
z-index:1;
gap:var(--dl-layout-space-threeunits);
align-items:center;
}

.titleShell{
width:100%;
position:relative;
overflow:hidden;
border-radius:36px;
border:1px solid rgba(245,244,244,.1);
background:rgba(12,12,12,.56);
box-shadow:0 30px 110px rgba(0,0,0,.58);
backdrop-filter:blur(10px);
}

.titleBg{
position:absolute;
inset:0;
pointer-events:none;
border-radius:inherit;
}

.titleVignette{
position:absolute;
inset:0;
border-radius:inherit;
background:
radial-gradient(
72% 62% at 18% 18%,
rgba(255,255,255,.06),
rgba(255,255,255,0) 58%
),
linear-gradient(
135deg,
rgba(255,255,255,.03) 0%,
rgba(0,0,0,.18) 46%,
rgba(0,0,0,.5) 100%
);
}

.titleGlow{
position:absolute;
inset:-20%;
border-radius:inherit;
background:
radial-gradient(
38% 34% at 18% 24%,
rgba(160,196,255,.14),
rgba(160,196,255,0) 65%
);
filter:blur(22px);
opacity:.95;
}

.titleGrain{
position:absolute;
inset:0;
border-radius:inherit;
opacity:.06;
mix-blend-mode:overlay;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
background-size:240px 240px;
}

.titleInner{
width:100%;
max-width:980px;
position:relative;
z-index:1;
display:grid;
grid-template-columns:1fr 1.1fr;
gap:22px;
align-items:end;
padding:30px 28px 24px;
}

.titleCol{
display:flex;
flex-direction:column;
gap:10px;
}

.kickerRow{
display:flex;
align-items:center;
gap:10px;
}

.kicker{
font-size:12px;
letter-spacing:.24em;
text-transform:uppercase;
color:rgba(245,244,244,.72);
padding:6px 10px;
border-radius:999px;
border:1px solid rgba(245,244,244,.12);
background:rgba(0,0,0,.22);
}

.kickerLine{
flex:1;
height:1px;
background:linear-gradient(
90deg,
rgba(245,244,244,.18),
rgba(245,244,244,0)
);
}

.title{
margin:0;
line-height:1.08;
text-shadow:0 14px 40px rgba(0,0,0,.55);
}

.desc{
margin:0;
color:rgba(245,244,244,.84);
line-height:1.7;
}

.titleDivider{
width:100%;
height:1px;
background:linear-gradient(
90deg,
rgba(245,244,244,.14),
rgba(245,244,244,.04),
rgba(245,244,244,0)
);
}

.titleMeta{
color:rgba(245,244,244,.6);
letter-spacing:.12em;
text-transform:uppercase;
font-size:12px;
}

.grid{
width:100%;
display:grid;
grid-template-columns:repeat(3,minmax(0,1fr));
gap:18px;
}

.card{
border-radius:20px;
overflow:hidden;
background:rgba(15,15,15,.55);
border:1px solid rgba(245,244,244,.1);
box-shadow:0 18px 55px rgba(0,0,0,.42);
transition:transform .25s ease;
}

.card:hover{
transform:translateY(-4px);
}

.media{
aspect-ratio:4/3;
overflow:hidden;
}

.img{
width:100%;
height:100%;
object-fit:cover;
transition:transform .4s ease;
}

.card:hover .img{
transform:scale(1.08);
}

.cardBody{
padding:16px;
display:flex;
flex-direction:column;
gap:8px;
}

.cardText{
color:rgba(245,244,244,.78);
}

.actions{
width:100%;
display:flex;
justify-content:center;
gap:12px;
}

`}</style>
    </>
  )
}

Work2DAnimation.defaultProps = {
sectionTitle: undefined,
sectionDescription: undefined,
feature1ImageAlt:'Concept & Story',
feature1ImageSrc:'/work/animation/wa2d-01.jpg',
feature2ImageAlt:'Timing & Rhythm',
feature2ImageSrc:'/work/animation/wa2d-02.jpg',
feature3ImageAlt:'Visual Cohesion',
feature3ImageSrc:'/work/animation/wa2d-03.jpg'
}

Work2DAnimation.propTypes = {
sectionTitle:PropTypes.element,
sectionDescription:PropTypes.element
}

export default Work2DAnimation