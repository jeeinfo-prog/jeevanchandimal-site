import React, { Fragment, useRef } from "react"
import PropTypes from "prop-types"

const ContactOffice = (props) => {

  const card1 = useRef(null)
  const card2 = useRef(null)

  const handleMove = (e, ref) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (y - 0.5) * 8
    const rotateY = (x - 0.5) * -8

    ref.current.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const resetMove = (ref) => {
    if (!ref.current) return
    ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)"
  }

  const maps =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "No. 99, Sunethradevi Road, Kohuwala, Sri Lanka"
    )

  return (
    <>
      <section className={`co-wrap ${props.rootClassName || ""}`}>

        {/* HEADER */}

        <div className="co-head">

          <div className="co-kickerRow">
            <span className="co-kicker">VISIT</span>
            <span className="co-line"/>
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


        {/* CINEMATIC IMAGE PANELS */}

        <div className="co-gallery">

          <div
            className="co-imageCard"
            ref={card1}
            onMouseMove={(e)=>handleMove(e,card1)}
            onMouseLeave={()=>resetMove(card1)}
          >
            <img
              src={props.location1ImgSrc}
              alt={props.location1ImgAlt}
              className="co-image"
            />

            <div className="co-light"/>
          </div>


          <div
            className="co-imageCard"
            ref={card2}
            onMouseMove={(e)=>handleMove(e,card2)}
            onMouseLeave={()=>resetMove(card2)}
          >
            <img
              src={props.location2ImgSrc}
              alt={props.location2ImgAlt}
              className="co-image"
            />

            <div className="co-light"/>
          </div>

        </div>


        {/* LOCATION CARDS */}

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
                  <span>
                    No. 99, Sunethradevi Road, Kohuwala, Sri Lanka.
                  </span>
                </Fragment>
              )}
            </p>

            <a
              href={maps}
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
                  <span>
                    No. 99, Sunethradevi Road, Kohuwala, Sri Lanka.
                  </span>
                </Fragment>
              )}
            </p>

            <a
              href={maps}
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

      .co-wrap{
        width:100%;
        display:flex;
        flex-direction:column;
        gap:34px;
      }

      .co-head{
        display:flex;
        flex-direction:column;
        align-items:center;
        text-align:center;
        gap:12px;
      }

      .co-kickerRow{
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:12px;
      }

      .co-kicker{
        font-size:12px;
        letter-spacing:.24em;
        text-transform:uppercase;
        color:rgba(245,244,244,.7);
        padding:6px 12px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,.15);
        background:rgba(0,0,0,.3);
      }

      .co-line{
        flex:1;
        height:1px;
        background:linear-gradient(
          90deg,
          rgba(255,255,255,.18),
          rgba(255,255,255,0)
        );
      }

      .co-title{
        margin:0;
        color:#f5f4f4;
        text-shadow:0 24px 70px rgba(0,0,0,.65);
      }

      .co-copy{
        margin:0;
        color:rgba(245,244,244,.8);
        line-height:1.8;
        max-width:64ch;
      }


      /* IMAGE PANELS */

      .co-gallery{
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:24px;
      }

      .co-imageCard{

        position:relative;

        overflow:hidden;

        border-radius:28px;

        border:1px solid rgba(255,255,255,.08);

        background:rgba(255,255,255,.02);

        transition:transform .4s ease;

        box-shadow:
        0 30px 80px rgba(0,0,0,.55);

      }

      .co-image{
        width:100%;
        height:340px;
        object-fit:cover;
        transition:transform .6s ease;
      }

      .co-light{

        position:absolute;
        inset:0;

        background:
        radial-gradient(
          60% 60% at 50% 30%,
          rgba(255,255,255,.08),
          rgba(0,0,0,.6)
        );

        pointer-events:none;
      }



      /* LOCATION CARDS */

      .co-locations{
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:24px;
      }

      .co-locationCard{

        padding:28px 24px;

        border-radius:26px;

        backdrop-filter:blur(12px);

        border:1px solid rgba(255,255,255,.08);

        background:
        linear-gradient(
          180deg,
          rgba(255,255,255,.04),
          rgba(255,255,255,.015)
        );

        box-shadow:
        0 22px 60px rgba(0,0,0,.45);

        display:flex;
        flex-direction:column;
        gap:14px;

        transition:all .25s ease;

      }

      .co-locationCard:hover{

        transform:translateY(-4px);

        border-color:rgba(37,195,226,.25);

      }

      .co-badge{

        width:fit-content;

        padding:8px 12px;

        font-size:11px;

        letter-spacing:.18em;

        text-transform:uppercase;

        border-radius:999px;

        color:#25c3e2;

        background:
        linear-gradient(
          180deg,
          rgba(37,195,226,.2),
          rgba(37,195,226,.06)
        );

        border:1px solid rgba(37,195,226,.2);

      }

      .co-locationTitle{
        margin:0;
        color:#f5f4f4;
      }

      .co-locationCopy{
        margin:0;
        color:rgba(245,244,244,.8);
        line-height:1.8;
      }

      .co-button{

        margin-top:10px;

        width:fit-content;

        font-size:12px;

        letter-spacing:.14em;

        text-transform:uppercase;

        text-decoration:none;

        padding:10px 16px;

        border-radius:999px;

        border:1px solid rgba(255,255,255,.12);

        color:#f5f4f4;

        background:rgba(0,0,0,.35);

        transition:all .2s ease;

      }

      .co-button:hover{

        color:#25c3e2;

        border-color:rgba(37,195,226,.4);

        transform:translateY(-1px);

      }

      @media (max-width:767px){

        .co-line{display:none}

        .co-gallery,
        .co-locations{
          grid-template-columns:1fr;
        }

      }

      `}</style>
    </>
  )
}

ContactOffice.propTypes={
  heading1:PropTypes.element,
  content1:PropTypes.element,
  location1:PropTypes.element,
  location2:PropTypes.element,
  location1Description:PropTypes.element,
  location2Description:PropTypes.element,
  rootClassName:PropTypes.string,
  location1ImgSrc:PropTypes.string,
  location1ImgAlt:PropTypes.string,
  location2ImgSrc:PropTypes.string,
  location2ImgAlt:PropTypes.string
}

export default ContactOffice