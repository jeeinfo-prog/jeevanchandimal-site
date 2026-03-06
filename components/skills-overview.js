import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SkillsOverview = (props) => {
  const router = useRouter()
  const isActive = (path) => router.pathname === path

  return (
    <>
      <section className={`skills-overview-wrap thq-section-padding ${props.rootClassName || ''}`}>
        <div className="skills-overview-max thq-section-max-width">
          {/* Luxury cinematic title section */}
          <div className="skillsHeroCard">
            <div className="skillsHeroBg" aria-hidden="true">
              <div className="skillsHeroVignette" />
              <div className="skillsHeroGrain" />
            </div>

            <div className="skillsHeroInner">
              <div className="skillsHeroKickerRow">
                <span className="skillsHeroKicker">SKILLS</span>
                <span className="skillsHeroLine" />
              </div>

              <h2 className="skillsHeroTitle thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span>Skills Overview</span>
                  </Fragment>
                )}
              </h2>

              <p className="skillsHeroCopy thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span>
                      From concept to final delivery, I handle the full creative process — ensuring every
                      element works together as one voice.
                    </span>
                  </Fragment>
                )}
              </p>

              <div className="skillsHeroDivider" aria-hidden="true" />

              <div className="skillsHeroMeta thq-body-small">
                Visual • Motion • Audio • Direction • Story
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="skills-overview-thq-content-elm2">
            <div className="skills-overview-thq-row-elm">
              {/* VISUAL */}
              <Link href="/work-film" passHref legacyBehavior>
                <a className={`skillsCard menuItem ${isActive('/work-film') ? 'isActiveItem' : ''}`}>
                  <div className="imgWrap">
                    <img src={props.feature1ImageSrc} alt={props.feature1ImageAlt} className="cardImg" />
                    <div className="imgOverlay" />
                  </div>

                  <div className="skillsContent">
                    <h3 className="thq-heading-3">Visual</h3>
                    <span className="thq-body-small">
                      Cinematography · Photography · Color Grading · Visual Direction
                    </span>
                  </div>

                  <span className="hoverArrow">→</span>
                </a>
              </Link>

              {/* MOTION */}
              <Link href="/work-animation" passHref legacyBehavior>
                <a className={`skillsCard menuItem ${isActive('/work-animation') ? 'isActiveItem' : ''}`}>
                  <div className="imgWrap">
                    <img src={props.feature2ImageSrc} alt={props.feature2ImageAlt} className="cardImg" />
                    <div className="imgOverlay" />
                  </div>

                  <div className="skillsContent">
                    <h3 className="thq-heading-3">Motion</h3>
                    <span className="thq-body-small">
                      Editing · Animation · Motion Graphics · Visual Storytelling
                    </span>
                  </div>

                  <span className="hoverArrow">→</span>
                </a>
              </Link>

              {/* AUDIO */}
              <Link href="/work-audio" passHref legacyBehavior>
                <a className={`skillsCard menuItem ${isActive('/work-audio') ? 'isActiveItem' : ''}`}>
                  <div className="imgWrap">
                    <img src={props.feature3ImageSrc} alt={props.feature3ImageAlt} className="cardImg" />
                    <div className="imgOverlay" />
                  </div>

                  <div className="skillsContent">
                    <h3 className="thq-heading-3">Audio</h3>
                    <span className="thq-body-small">
                      Sound Design · Music Composition · Audio Post-Production
                    </span>
                  </div>

                  <span className="hoverArrow">→</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .skills-overview-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .skills-overview-max {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        /* cinematic title card */
        .skillsHeroCard {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.55);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .skillsHeroBg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .skillsHeroVignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              80% 70% at 50% 15%,
              rgba(255, 255, 255, 0.05),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.35) 50%,
              rgba(0, 0, 0, 0.82) 100%
            );
        }

        .skillsHeroGrain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .skillsHeroInner {
          position: relative;
          z-index: 1;
          padding: 32px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .skillsHeroKickerRow {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .skillsHeroKicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .skillsHeroLine {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.18),
            rgba(245, 244, 244, 0)
          );
        }

        .skillsHeroTitle {
          margin: 0;
          line-height: 1.15;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
        }

        .skillsHeroCopy {
          margin: 0;
          line-height: 1.8;
          color: rgba(245, 244, 244, 0.85);
          max-width: 70ch;
        }

        .skillsHeroDivider {
          width: 100%;
          height: 1px;
          margin-top: 8px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.12),
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0.12)
          );
        }

        .skillsHeroMeta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 12px;
        }

        /* cards section */
        .skills-overview-thq-content-elm2 {
          margin-top: 0;
        }

        .skills-overview-thq-row-elm {
          display: flex;
          gap: var(--dl-layout-space-twounits);
        }

        .skillsCard {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(245, 244, 244, 0.08);
          text-decoration: none !important;
          color: #f5f4f4;
          opacity: 0.92;
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            border-color 220ms ease,
            background 220ms ease;
        }

        .skillsCard:hover {
          transform: translateY(-3px) scale(1.01);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(37, 195, 226, 0.15);
          background: rgba(255, 255, 255, 0.03);
        }

        .menuItem:hover {
          color: #25c3e2 !important;
          opacity: 1;
        }

        .menuItem.isActiveItem {
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.2), rgba(37, 195, 226, 0.08));
          border: 1px solid rgba(37, 195, 226, 0.18);
          color: #25c3e2 !important;
          opacity: 1;
          font-weight: 700;
        }

        .imgWrap {
          position: relative;
          overflow: hidden;
        }

        .cardImg {
          width: 100%;
          height: auto;
          display: block;
          transform: scale(1.01);
          transition: transform 320ms ease, filter 320ms ease;
        }

        .skillsCard:hover .cardImg {
          transform: scale(1.05);
          filter: saturate(1.08) contrast(1.05);
        }

        .imgOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.45));
          opacity: 0.85;
          transition: opacity 320ms ease;
        }

        .skillsCard:hover .imgOverlay {
          opacity: 0.95;
        }

        .skillsContent {
          padding: 16px 18px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .hoverArrow {
          position: absolute;
          right: 16px;
          bottom: 16px;
          font-size: 18px;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 220ms ease;
          color: #25c3e2;
        }

        .skillsCard:hover .hoverArrow {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 767px) {
          .skills-overview-max {
            gap: 16px;
          }

          .skillsHeroInner {
            padding: 22px 16px 18px;
          }

          .skillsHeroLine {
            display: none;
          }

          .skillsHeroCopy {
            max-width: 62ch;
          }

          .skills-overview-thq-row-elm {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}

SkillsOverview.defaultProps = {
  heading1: undefined,
  content1: undefined,
  feature1ImageSrc: '/JC/jeeva%20chandimal%20-%201_0002_viveza%203-1400w.jpg',
  feature1ImageAlt: 'Visual work',
  feature2ImageSrc: '/JC/jeevan%20chandimal_0000_layer%2023-1400w.jpg',
  feature2ImageAlt: 'Motion work',
  feature3ImageSrc: '/JC/jeeva%20chandimal%20-%201_0004_layer%201-1400w.jpg',
  feature3ImageAlt: 'Audio work',
  rootClassName: '',
}

SkillsOverview.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature2ImageSrc: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default SkillsOverview