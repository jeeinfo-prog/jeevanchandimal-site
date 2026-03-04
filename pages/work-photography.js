// pages/work-photography.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import WorkPhotographyHero from '../components/work-photography-hero'
import WorkPhotographySection from '../components/work-photography'
import WorkCinematicGallery from '../components/work-cinematic-gallery'
import WorkPhotographyEditorial from '../components/work-photography-editorial'
import WorkPhotographyPersonalProjects from '../components/work-photography-personal-projects'
import WorkStockPreview from '../components/work-stock-preview'
import WorkPhotographyEndNote from '../components/work-photography-end-note'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

export default function WorkPhotography() {
  // ✅ Swap later: /public/work/photography/hero.jpg (or keep as is)
  const HERO_BG = '/work/photography/hero.jpg'

  return (
    <>
      <Head>
        <title>Photography — Jeevan Chandimal | Cinematic Visual Storyteller</title>
        <meta
          name="description"
          content="Cinematic photography shaped with intention—editorial, commercial, and personal projects. Atmosphere, light, and restraint."
        />
        <meta property="og:title" content="Photography — Jeevan Chandimal" />
        <meta
          property="og:description"
          content="Cinematic photography shaped with intention—editorial, commercial, and personal projects."
        />
        <meta property="og:image" content="https://www.jeevanchandimal.com/work/og-photography.jpg" />
        <link rel="canonical" href="https://www.jeevanchandimal.com/work-photography" />
      </Head>

      <div className="page">
        {/* ✅ Cinematic background (same luxury theme as index) */}
        <div className="heroBg" aria-hidden="true">
          <div className="heroBgImg" style={{ backgroundImage: `url(${HERO_BG})` }} />
          <div className="heroBgVignette" />
          <div className="heroBgGrain" />
        </div>

        <JeevanChandimalNavi />

        <main className="main">
          
          {/* HERO (your existing component) */}
          <section className="section">
            <div className="block">
              <WorkPhotographyHero />
            </div>
          </section>

          {/* TOP INTRO (adds structure + luxury spacing) */}
          <section className="section topIntro">
            <div className="panel thq-section-max-width">
              <div className="kicker">Work</div>
              <h1 className="title">Photography</h1>
              <p className="lead">
                Still frames with the same discipline as motion—light, texture, and silence.
                Editorial, commercial, and personal work shaped for a cinematic finish.
              </p>

              <div className="actions">
                <a href="#gallery" className="btnPrimary">
                  View gallery <span aria-hidden="true">→</span>
                </a>

                <Link href="/store" legacyBehavior>
                  <a className="btnGhost">
                    License images <span aria-hidden="true">→</span>
                  </a>
                </Link>
              </div>

              <div className="metaRow">
                <div className="metaPill">Cinematic grading</div>
                <div className="metaPill">Editorial + commercial</div>
                <div className="metaPill">Sri Lanka & abroad</div>
              </div>
            </div>
          </section>

          
          {/* SECTION (your fixed section) */}
          <section className="section">
            <div className="block">
              <WorkPhotographySection />
            </div>
          </section>

          {/* GALLERY (anchor + framing) */}
          <section className="section" id="gallery">
            <div className="block">
              <div className="sectionHead thq-section-max-width">
                <h2 className="h2">Selected frames</h2>
                <p className="p">
                  A distilled set of images—atmosphere first. If you need a full deck,{' '}
                  <Link href="/contact">request a private selection</Link>.
                </p>
              </div>

              <WorkCinematicGallery rootClassName="work-cinematic-galleryroot-class-name" />
            </div>
          </section>

          {/* EDITORIAL */}
          <section className="section">
            <div className="block">
              <div className="sectionHead thq-section-max-width">
                <h2 className="h2">Editorial</h2>
                <p className="p">
                  Stories, portraits, and environments—built around mood, context, and restraint.
                </p>
              </div>

              <WorkPhotographyEditorial />
            </div>
          </section>

          {/* PERSONAL PROJECTS */}
          <section className="section">
            <div className="block">
              <div className="sectionHead thq-section-max-width">
                <h2 className="h2">Personal projects</h2>
                <p className="p">
                  Long-form explorations—light studies, travel diaries, and quiet observations.
                </p>
              </div>

              <WorkPhotographyPersonalProjects />
            </div>
          </section>

          {/* STOCK / STORE PREVIEW */}
          <section className="section">
            <div className="block">
              <div className="ctaStrip thq-section-max-width">
                <div className="ctaText">
                  <div className="ctaKicker">Licensing</div>
                  <div className="ctaTitle">Need images for a project?</div>
                  <div className="ctaSub">
                    Browse the archive, license instantly, and download in high resolution.
                  </div>
                </div>
                <div className="ctaActions">
                  <Link href="/store" legacyBehavior>
                    <a className="btnPrimary">
                      Go to store <span aria-hidden="true">→</span>
                    </a>
                  </Link>
                  <Link href="/memberships" legacyBehavior>
                    <a className="btnGhost">
                      Membership <span aria-hidden="true">→</span>
                    </a>
                  </Link>
                </div>
              </div>

              <WorkStockPreview />
            </div>
          </section>

          {/* END NOTE */}
          <section className="section">
            <div className="block">
              <WorkPhotographyEndNote rootClassName="work-photography-end-noteroot-class-name" />
            </div>
          </section>

          <JeevanChandimalNewFooter rootClassName="jeevan-chandimal-new-footerroot-class-name9" />
        </main>
      </div>

      <style jsx>{`
        :global(html),
        :global(body) {
          height: 100%;
        }
        :global(body) {
          overflow-x: hidden;
        }

        .page {
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          overflow-y: visible;
          background: #0b0b0b;
          color: #f5f4f4;
        }

        /* ========= CINEMATIC BACKGROUND ========= */
        .heroBg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .heroBgImg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: saturate(0.9) contrast(1.06) brightness(0.72);
          transform: scale(1.02);
        }

        .heroBgVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 60% at 50% 20%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0.72)
            ),
            linear-gradient(
              180deg,
              rgba(10, 10, 10, 0.2) 0%,
              rgba(10, 10, 10, 0.74) 55%,
              rgba(10, 10, 10, 0.92) 100%
            );
        }

        .heroBgGrain {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        /* ========= LAYOUT ========= */
        .main {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 72px; /* space for sticky nav */
        }

        .section {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .block {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ========= TOP INTRO PANEL ========= */
        .topIntro {
          padding-top: 10px;
        }

        .panel {
          width: 100%;
          margin: 0 auto;
          padding: 26px 18px 18px;
          border-radius: 22px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.75;
          margin-bottom: 10px;
        }

        .title {
          margin: 0;
          font-size: 38px;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }

        .lead {
          margin: 12px 0 0;
          max-width: 880px;
          opacity: 0.9;
          line-height: 1.75;
          font-size: 15px;
        }

        .actions {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .metaRow {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          opacity: 0.92;
        }

        .metaPill {
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.03);
          font-size: 12px;
        }

        /* ========= SECTION HEAD ========= */
        .sectionHead {
          width: 100%;
          margin: 0 auto;
          padding: 0 18px;
        }

        .h2 {
          margin: 0;
          font-size: 22px;
          letter-spacing: -0.01em;
        }

        .p {
          margin: 10px 0 0;
          opacity: 0.88;
          line-height: 1.7;
          max-width: 920px;
        }

        /* ========= CTA STRIP ========= */
        .ctaStrip {
          width: 100%;
          margin: 0 auto;
          padding: 18px 18px;
          border-radius: 20px;
          border: 1px solid rgba(37, 195, 226, 0.38);
          background: rgba(37, 195, 226, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          backdrop-filter: blur(10px);
        }

        .ctaKicker {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.85;
          margin-bottom: 6px;
        }

        .ctaTitle {
          font-weight: 800;
          font-size: 16px;
        }

        .ctaSub {
          margin-top: 6px;
          opacity: 0.88;
          line-height: 1.6;
          font-size: 13px;
        }

        .ctaActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* ========= BUTTONS ========= */
        .btnPrimary,
        .btnGhost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 800;
          text-decoration: none;
          border: 1px solid rgba(245, 244, 244, 0.16);
          cursor: pointer;
          color: inherit;
          transition: 0.18s ease;
        }

        .btnPrimary {
          border-color: rgba(37, 195, 226, 0.55);
          background: rgba(37, 195, 226, 0.16);
        }
        .btnPrimary:hover {
          background: rgba(37, 195, 226, 0.24);
          box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.12);
          transform: translateY(-1px);
        }

        .btnGhost {
          background: rgba(255, 255, 255, 0.03);
        }
        .btnGhost:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-1px);
        }

        @media (max-width: 760px) {
          .title {
            font-size: 30px;
          }
          .panel {
            border-radius: 18px;
          }
          .ctaStrip {
            border-radius: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .heroBgImg {
            transform: none;
          }
          .btnPrimary:hover,
          .btnGhost:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  )
}