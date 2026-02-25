import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SkillsOverview = (props) => {
  const router = useRouter()
  const isActive = (path) => router.pathname === path

  return (
    <>
      <div className="skills-overview-thq-layout300-elm thq-section-padding">
        <div className="skills-overview-thq-max-width-elm thq-section-max-width">
          <div className="skills-overview-thq-section-title-elm">
            <div className="skills-overview-thq-content-elm1">
              <h2 className="skills-overview-thq-text-elm1 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span>Skills Overview</span>
                  </Fragment>
                )}
              </h2>

              <span className="skills-overview-thq-text-elm2 thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span>
                      From concept to final delivery, I handle the full creative process — ensuring every element works
                      together as one voice.
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>

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
      </div>

      <style jsx>{`
        /* 🔧 reduced gap between text and cards */
        .skills-overview-thq-content-elm2 {
          margin-top: var(--dl-layout-space-oneandhalfunits);
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
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease,
            background 220ms ease;
        }

        /* hover lift + cyan glow */
        .skillsCard:hover {
          transform: translateY(-3px) scale(1.01);
          border-color: rgba(37, 195, 226, 0.28);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(37, 195, 226, 0.15);
          background: rgba(255, 255, 255, 0.03);
        }

        /* blue text on hover */
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

        /* hover arrow */
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
          .skills-overview-thq-row-elm {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}

SkillsOverview.defaultProps = {
  feature1ImageSrc: '/JC/jeeva%20chandimal%20-%201_0002_viveza%203-1400w.jpg',
  feature2ImageSrc: '/JC/jeevan%20chandimal_0000_layer%2023-1400w.jpg',
  feature3ImageSrc: '/JC/jeeva%20chandimal%20-%201_0004_layer%201-1400w.jpg',
}

export default SkillsOverview