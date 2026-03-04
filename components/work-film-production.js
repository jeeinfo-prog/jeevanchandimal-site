// components/work-film-production.js
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const WorkFilmProduction = (props) => {
  const introTitleNode =
    props.introTitle ?? (
      <Fragment>
        <span className="titleText">Film Production</span>
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
          We craft production solutions around your story, timeline, and creative
          direction—keeping the process clean, calm, and cinematic.
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

  const hero =
    props.heroImageSrc || props.feature1ImageSrc || '/work/film/wfp-01.jpg'

  return (
    <>
      <section className={`wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="shell thq-section-max-width">
          {/* ===== CINEMATIC HERO (title + prop text) ===== */}
          <div className="heroCard">
            <div className="heroBg" aria-hidden="true">
              <div className="heroImg" style={{ backgroundImage: `url(${hero})` }} />
              <div className="heroVignette" />
              <div className="heroGlow" />
              <div className="heroGrain" />
            </div>

            <div className="heroInner">
              <div className="kickerRow">
                <span className="kicker">FILM COLLECTION</span>
                <span className="dot" aria-hidden="true" />
                <span className="kickerSub">Production · Crew · Post</span>
              </div>

              <h2 className="thq-heading-2 heroTitle">{introTitleNode}</h2>
              <p className="thq-body-large heroDesc">{introDescNode}</p>

              <div className="micro thq-body-small">
                Calm process • Cinematic restraint • Premium finish
              </div>
            </div>
          </div>

          {/* ===== CARDS ===== */}
          <div className="grid">
            <ServiceCard
              badge="Production"
              img={props.feature1ImageSrc}
              alt={props.feature1ImageAlt}
              over={f1SloganNode}
              title={f1TitleNode}
              desc={f1DescNode}
              mainHref={props.feature1MainHref}
              mainLabel={f1MainActionNode}
              secondaryHref={props.feature1SecondaryHref}
              secondaryLabel={f1SecondaryActionNode}
            />

            <ServiceCard
              badge="Crew"
              img={props.feature2ImageSrc}
              alt={props.feature2ImageAlt}
              over={f2SloganNode}
              title={f2TitleNode}
              desc={f2DescNode}
              mainHref={props.feature2MainHref}
              mainLabel={f2MainActionNode}
              secondaryHref={props.feature2SecondaryHref}
              secondaryLabel={f2SecondaryActionNode}
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* subtle luxury glass / cyan ambience */
        .wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              70% 60% at 50% 0%,
              rgba(37, 195, 226, 0.06),
              rgba(0, 0, 0, 0)
            ),
            linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
          opacity: 0.95;
        }

        .shell {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ================= HERO CARD ================= */
        .heroCard {
          position: relative;
          width: 100%;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }

        .heroBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .heroImg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.03);
          filter: saturate(0.94) contrast(1.1) brightness(0.66);
        }

        .heroVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              90% 70% at 50% 18%,
              rgba(0, 0, 0, 0.06),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.85) 0%,
              rgba(0, 0, 0, 0.42) 55%,
              rgba(0, 0, 0, 0.85) 100%
            );
        }

        .heroGlow {
          position: absolute;
          inset: -40px -60px auto -60px;
          height: 180px;
          background: radial-gradient(
            60% 70% at 50% 50%,
            rgba(37, 195, 226, 0.12),
            rgba(37, 195, 226, 0)
          );
          opacity: 0.9;
          filter: blur(2px);
        }

        .heroGrain {
          position: absolute;
          inset: 0;
          opacity: 0.085;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .heroInner {
          position: relative;
          z-index: 1;
          padding: 26px 24px 20px;
          max-width: 980px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kickerRow {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          opacity: 0.92;
        }

        .kicker {
          letter-spacing: 0.28em;
          font-size: 11px;
          font-weight: 900;
          color: rgba(245, 244, 244, 0.82);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
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

        .titleText {
          display: inline-block;
          letter-spacing: 0.2px;
        }

        .heroTitle {
          margin: 0;
          line-height: 1.08;
          color: #f5f4f4;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
        }

        .heroDesc {
          margin: 0;
          opacity: 0.88;
          line-height: 1.75;
          color: rgba(245, 244, 244, 0.84);
          max-width: 78ch;
        }

        .micro {
          margin-top: 4px;
          color: rgba(245, 244, 244, 0.62);
        }

        /* ================= GRID ================= */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 18px;
          margin-top: 6px;
        }

        @media (max-width: 991px) {
          .heroInner {
            padding: 20px 16px 16px;
          }
          .grid {
            gap: 14px;
          }
        }
      `}</style>
    </>
  )
}

function ServiceCard({
  badge,
  img,
  alt,
  over,
  title,
  desc,
  mainHref,
  mainLabel,
  secondaryHref,
  secondaryLabel,
}) {
  const LinkOrA = ({ href, className, children, ariaLabel }) => {
    const isInternal = typeof href === 'string' && href.startsWith('/')
    if (!href) return null
    if (isInternal) {
      return (
        <Link href={href} legacyBehavior>
          <a className={className} aria-label={ariaLabel}>
            {children}
          </a>
        </Link>
      )
    }
    return (
      <a className={className} href={href} aria-label={ariaLabel} rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <>
      <article className="card">
        <div className="media">
          {/* ✅ Curved inner image box */}
          <div className="frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img" src={img} alt={alt || badge} loading="lazy" />
            <div className="shade" aria-hidden="true" />
            <div className="innerStroke" aria-hidden="true" />

            <div className="badge">{badge}</div>
          </div>
        </div>

        <div className="body">
          <div className="overTitle thq-body-small">{over}</div>
          <h3 className="title thq-heading-3">{title}</h3>
          <p className="desc thq-body-small">{desc}</p>

          <div className="actions">
            <LinkOrA href={mainHref} className="cineBtnPrimary" ariaLabel={`${badge} primary action`}>
              {mainLabel}
            </LinkOrA>
            <LinkOrA
              href={secondaryHref}
              className="cineBtnOutline"
              ariaLabel={`${badge} secondary action`}
            >
              {secondaryLabel}
            </LinkOrA>
          </div>
        </div>
      </article>

      <style jsx>{`
        .card {
          grid-column: span 6;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(12, 12, 12, 0.42);
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.35);
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.55);
        }

        .media {
          padding: 14px 14px 0;
        }

        .frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 18px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
          transform: translateZ(0);
        }

        .img {
          position: absolute;
          inset: 0;
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

        .innerStroke {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 18px;
          box-shadow: inset 0 0 0 1px rgba(245, 244, 244, 0.08);
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
          white-space: nowrap;
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
          white-space: nowrap;
        }

        .cineBtnOutline:hover {
          border-color: rgba(37, 195, 226, 0.55);
          color: #f5f4f4;
          box-shadow: 0 0 16px rgba(37, 195, 226, 0.18);
          transform: translateY(-1px);
        }

        @media (max-width: 991px) {
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

  // ✅ optional hero override
  heroImageSrc: '/work/film/wfp-01.jpg',

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

  heroImageSrc: PropTypes.string,

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