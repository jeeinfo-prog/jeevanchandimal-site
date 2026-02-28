// components/work-film-production.js
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WorkFilmProduction = (props) => {
  const introTitleNode =
    props.introTitle ?? (
      <Fragment>
        <span>Film Production</span>
      </Fragment>
    )

  const introDescNode =
    props.introDescription ?? (
      <Fragment>
        <span>
          <span>
            This collection presents cinematic work shaped through story,
            atmosphere, and visual restraint. Each film is approached as a
            complete narrative experience, where image, movement, sound, and
            silence are treated as equal elements.
          </span>
          <br />
          <br />
          <span>
            The work spans commercial, documentary, short-form, and music-driven
            storytelling. While formats vary, every project is guided by the
            same intent — to create films that feel grounded, purposeful, and
            emotionally present.
          </span>
        </span>
      </Fragment>
    )

  const f1SloganNode =
    props.feature1Slogan ?? (
      <Fragment>
        <span>Tailored to Your Needs</span>
      </Fragment>
    )

  const f1TitleNode =
    props.feature1Title ?? (
      <Fragment>
        <span>Customized Solutions</span>
      </Fragment>
    )

  const f1DescNode =
    props.feature1Description ?? (
      <Fragment>
        <span>
          We craft production solutions around your story, timeline, and
          creative direction—keeping the process clean, calm, and cinematic.
        </span>
      </Fragment>
    )

  const f1MainActionNode =
    props.feature1MainAction ?? (
      <Fragment>
        <span>Explore Services</span>
      </Fragment>
    )

  const f1SecondaryActionNode =
    props.feature1SecondaryAction ?? (
      <Fragment>
        <span>Contact</span>
      </Fragment>
    )

  const f2SloganNode =
    props.feature2Slogan ?? (
      <Fragment>
        <span>Experts in Every Field</span>
      </Fragment>
    )

  const f2TitleNode =
    props.feature2Title ?? (
      <Fragment>
        <span>Experienced Professionals</span>
      </Fragment>
    )

  const f2DescNode =
    props.feature2Description ?? (
      <Fragment>
        <span>
          A focused team across directing, camera, sound, and post—delivering
          high-quality results with visual restraint and emotional clarity.
        </span>
      </Fragment>
    )

  const f2MainActionNode =
    props.feature2MainAction ?? (
      <Fragment>
        <span>Meet Our Team</span>
      </Fragment>
    )

  const f2SecondaryActionNode =
    props.feature2Action2 ?? (
      <Fragment>
        <span>Contact</span>
      </Fragment>
    )

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* ---------- Intro ---------- */}
          <header className="intro">
            <div className="kicker">FILM COLLECTION</div>
            <h2 className="introTitle thq-heading-2">{introTitleNode}</h2>
            <p className="introDesc thq-body-large">{introDescNode}</p>
          </header>

          {/* ---------- Cards ---------- */}
          <div className="grid">
            {/* Card 1 */}
            <article className="card">
              <div className="media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={props.feature1ImageSrc}
                  alt={props.feature1ImageAlt}
                  className="img"
                  loading="lazy"
                />
                <div className="shade" />
                <div className="badge">Production</div>
              </div>

              <div className="body">
                <div className="overTitle thq-body-small">{f1SloganNode}</div>
                <h3 className="title thq-heading-3">{f1TitleNode}</h3>
                <p className="desc thq-body-small">{f1DescNode}</p>

                <div className="actions">
                  <a href={props.feature1MainHref} className="cineBtnPrimary">
                    {f1MainActionNode}
                  </a>
                  <a href={props.feature1SecondaryHref} className="cineBtnOutline">
                    {f1SecondaryActionNode}
                  </a>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="card">
              <div className="media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={props.feature2ImageSrc}
                  alt={props.feature2ImageAlt}
                  className="img"
                  loading="lazy"
                />
                <div className="shade" />
                <div className="badge">Crew</div>
              </div>

              <div className="body">
                <div className="overTitle thq-body-small">{f2SloganNode}</div>
                <h3 className="title thq-heading-3">{f2TitleNode}</h3>
                <p className="desc thq-body-small">{f2DescNode}</p>

                <div className="actions">
                  <a href={props.feature2MainHref} className="cineBtnPrimary">
                    {f2MainActionNode}
                  </a>
                  <a href={props.feature2SecondaryHref} className="cineBtnOutline">
                    {f2SecondaryActionNode}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .shell {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ---------- Intro ---------- */
        .intro {
          max-width: 980px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kicker {
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          opacity: 0.72;
        }

        .introTitle {
          margin: 0;
          letter-spacing: -0.2px;
        }

        .introDesc {
          margin: 0;
          opacity: 0.86;
          line-height: 1.75;
        }

        /* ---------- Grid ---------- */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 18px;
          margin-top: 10px;
        }

        .card {
          grid-column: span 6;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.35);
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.55);
        }

        .media {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.25);
        }

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.78) contrast(1.06) saturate(0.95);
          transform: scale(1.02);
          transition: transform 0.35s ease, filter 0.35s ease;
        }

        .card:hover .img {
          transform: scale(1.08);
          filter: brightness(0.9) contrast(1.06) saturate(1.02);
        }

        .shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.05),
            rgba(0, 0, 0, 0.62)
          );
        }

        .badge {
          position: absolute;
          left: 12px;
          top: 12px;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.38);
          backdrop-filter: blur(10px);
          font-size: 12px;
          letter-spacing: 0.2px;
          opacity: 0.92;
        }

        .body {
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
        }

        .overTitle {
          opacity: 0.78;
          letter-spacing: 0.2px;
        }

        .title {
          margin: 0;
        }

        .desc {
          margin: 0;
          opacity: 0.86;
          line-height: 1.7;
        }

        .actions {
          margin-top: 6px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        /* ---------- Buttons (luxury cinematic) ---------- */
        .cineBtnPrimary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(37, 195, 226, 0.65);
          background: rgba(37, 195, 226, 0.18);
          color: #f5f4f4;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.22s ease;
          backdrop-filter: blur(6px);
        }

        .cineBtnPrimary:hover {
          background: rgba(37, 195, 226, 0.28);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.16), 0 0 18px rgba(37, 195, 226, 0.25);
          transform: translateY(-1px);
        }

        .cineBtnOutline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.24);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(245, 244, 244, 0.88);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.22s ease;
          backdrop-filter: blur(6px);
        }

        .cineBtnOutline:hover {
          border-color: rgba(37, 195, 226, 0.55);
          color: #f5f4f4;
          box-shadow: 0 0 16px rgba(37, 195, 226, 0.18);
          transform: translateY(-1px);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 991px) {
          .intro {
            text-align: left;
            margin: 0;
          }
          .card {
            grid-column: span 12;
          }
        }

        @media (max-width: 479px) {
          .actions {
            flex-direction: column;
            align-items: stretch;
          }
          .cineBtnPrimary,
          .cineBtnOutline {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}

WorkFilmProduction.defaultProps = {
  rootClassName: '',

  // ✅ public/work/film/wfp-01.jpg -> "/work/film/wfp-01.jpg"
  feature1ImageSrc: '/work/film/wfp-01.jpg',
  feature1ImageAlt: 'Film production image 01',

  // ✅ public/work/film/wfp-02.jpg -> "/work/film/wfp-02.jpg"
  feature2ImageSrc: '/work/film/wfp-02.jpg',
  feature2ImageAlt: 'Film production image 02',

  introTitle: undefined,
  introDescription: undefined,

  feature1Slogan: undefined,
  feature1Title: undefined,
  feature1Description: undefined,
  feature1MainAction: undefined,
  feature1SecondaryAction: undefined,
  feature1MainHref: '/services-film-production',
  feature1SecondaryHref: '/contact',

  feature2Slogan: undefined,
  feature2Title: undefined,
  feature2Description: undefined,
  feature2MainAction: undefined,
  feature2Action2: undefined,
  feature2MainHref: '/about',
  feature2SecondaryHref: '/contact',
}

WorkFilmProduction.propTypes = {
  rootClassName: PropTypes.string,

  introTitle: PropTypes.element,
  introDescription: PropTypes.element,

  feature1ImageSrc: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature1Slogan: PropTypes.element,
  feature1Title: PropTypes.element,
  feature1Description: PropTypes.element,
  feature1MainAction: PropTypes.element,
  feature1SecondaryAction: PropTypes.element,
  feature1MainHref: PropTypes.string,
  feature1SecondaryHref: PropTypes.string,

  feature2ImageSrc: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature2Slogan: PropTypes.element,
  feature2Title: PropTypes.element,
  feature2Description: PropTypes.element,
  feature2MainAction: PropTypes.element,
  feature2Action2: PropTypes.element,
  feature2MainHref: PropTypes.string,
  feature2SecondaryHref: PropTypes.string,
}

export default WorkFilmProduction