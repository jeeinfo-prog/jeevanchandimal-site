import React, { Fragment } from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import WorkFilmHero from '../components/work-film-hero'
import FilmCategories from '../components/film-categories'
import WorkFilmProduction from '../components/work-film-production'
import WorkFilmCommercial from '../components/work-film-commercial'
import WorkFilmDocumentries from '../components/work-film-documentries'
import WorkFilmMusicVideo from '../components/work-film-music-video'
import WorkFilmShortFilm from '../components/work-film-short-film'
import SelectedFilmWork from '../components/selected-film-work'
import WorkFilmEndNote from '../components/work-film-end-note'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

function getSiteUrl() {
  const v = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL
  if (!v) return 'https://www.jeevanchandimal.com'
  return String(v).replace(/\/+$/, '')
}

const WorkFilm = () => {
  const siteUrl = getSiteUrl()

  return (
    <>
      <div className="work-film-container">
        <Head>
          <title>Work Film — Jeevan Chandimal | Filmmaker & Visual Storyteller</title>

          <meta
            name="description"
            content="Cinematic film work by Jeevan Chandimal — commercial, documentary, music video, and short-form storytelling shaped by atmosphere and intention."
          />

          <meta property="og:title" content="Work Film — Jeevan Chandimal" />
          <meta
            property="og:description"
            content="Narrative-driven cinematic films where image, motion, and sound are treated as equal elements."
          />

          <meta property="og:image" content={`${siteUrl}/work/film/wf-01.jpg`} />
          <link rel="canonical" href={`${siteUrl}/work-film`} />
        </Head>

        <JeevanChandimalNavi rootClassName="jeevan-chandimal-naviroot-class-name" />

        {/* HERO (wf-01) */}
        <WorkFilmHero
          bgImage="/work/film/wf-01.jpg"
          action3={
            <Fragment>
              <span>Explore Work</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span>Narrative-driven films where image, motion, and sound come together.</span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span>Cinematic work shaped by story, mood, and intention.</span>
            </Fragment>
          }
        />

        {/* Categories + intro stay clean (no heavy backgrounds) */}
        <div className="cleanSection">
          <FilmCategories />
        </div>

        <div className="cleanSection">
          <WorkFilmProduction />
        </div>

        {/* COMMERCIAL (wf-02) */}
        <section className="backdropSection" style={{ backgroundImage: 'url(/work/film/wf-02.jpg)' }}>
          <div className="backdropOverlay" />
          <div className="backdropInner">
            <WorkFilmCommercial />
          </div>
        </section>

        {/* DOCUMENTARY (wf-03) */}
        <section className="backdropSection" style={{ backgroundImage: 'url(/work/film/wf-03.jpg)' }}>
          <div className="backdropOverlay" />
          <div className="backdropInner">
            <WorkFilmDocumentries />
          </div>
        </section>

        {/* MUSIC VIDEO (wf-04) */}
        <section className="backdropSection" style={{ backgroundImage: 'url(/work/film/wf-04.jpg)' }}>
          <div className="backdropOverlay" />
          <div className="backdropInner">
            <WorkFilmMusicVideo />
          </div>
        </section>

        {/* SHORT FILMS (wf-05) */}
        <section className="backdropSection" style={{ backgroundImage: 'url(/work/film/wf-05.jpg)' }}>
          <div className="backdropOverlay" />
          <div className="backdropInner">
            <WorkFilmShortFilm />
          </div>
        </section>

        {/* SELECTED WORK (wf-06) */}
        <section className="backdropSection" style={{ backgroundImage: 'url(/work/film/wf-06.jpg)' }}>
          <div className="backdropOverlay soft" />
          <div className="backdropInner">
            <SelectedFilmWork />
          </div>
        </section>

        <div className="cleanSection">
          <WorkFilmEndNote rootClassName="work-film-end-noteroot-class-name" />
        </div>

        <JeevanChandimalNewFooter rootClassName="jeevan-chandimal-new-footerroot-class-name3" />
      </div>

      <style jsx>{`
        .work-film-container {
          width: 100%;
          display: flex;
          min-height: 100vh;
          flex-direction: column;
        }

        /* Clean spacing between sections */
        .cleanSection {
          width: 100%;
        }

        /* Cinematic backdrop wrapper for sections */
        .backdropSection {
          width: 100%;
          position: relative;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-top: 1px solid rgba(245, 244, 244, 0.06);
          border-bottom: 1px solid rgba(245, 244, 244, 0.06);
        }

        .backdropOverlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.78)
          );
        }

        .backdropOverlay.soft {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.45),
            rgba(0, 0, 0, 0.72)
          );
        }

        .backdropInner {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        /* Optional: subtle vignette glow */
        .backdropSection::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            900px circle at 50% 30%,
            rgba(120, 166, 255, 0.08),
            transparent 60%
          );
          opacity: 0.9;
        }
      `}</style>
    </>
  )
}

export default WorkFilm