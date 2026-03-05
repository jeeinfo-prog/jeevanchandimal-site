// pages/index.js
import React, { useEffect, useRef } from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import HomePageHero from '../components/home-page-hero'
import HomeIntro from '../components/home-intro'
import SelectedWork from '../components/selected-work'
import HomeWork01 from '../components/home-work-01'
import Process01 from '../components/process-01'
import HomeFinalCTA from '../components/home-final-cta'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

export default function Home() {
  const HERO_BG = '/home/hero.jpg'

  const heroRef = useRef(null)

  /* 🎬 subtle cinematic parallax */
  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    let ticking = false

    const update = () => {
      const scroll = window.scrollY || window.pageYOffset
      const offset = scroll * 0.18
      el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Head>
        <title>Jeevan Chandimal | Filmmaker & Visual Storyteller</title>

        <meta
          name="description"
          content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound."
        />

        <meta property="og:title" content="Jeevan Chandimal | Filmmaker & Visual Storyteller" />

        <meta
          property="og:description"
          content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound."
        />

        <meta property="og:image" content="https://www.jeevanchandimal.com/home/og.jpg" />

        <link rel="canonical" href="https://www.jeevanchandimal.com/" />
      </Head>

      <div className="page">

        {/* CINEMATIC HERO BACKGROUND */}
        <div className="heroBg" aria-hidden="true">
          <div
            ref={heroRef}
            className="heroBgImg"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          />
          <div className="heroBgVignette" />
          <div className="heroBgGrain" />
        </div>

        <JeevanChandimalNavi />

        <main className="main">

          <section className="section heroSection">
            <HomePageHero />
          </section>

          <section className="section">
            <HomeIntro rootClassName="home-introroot-class-name" />
          </section>

          <section className="section">
            <SelectedWork />
          </section>

          <section className="section">
            <HomeWork01 rootClassName="home-work01root-class-name1" />
          </section>

          <section className="section">
            <Process01 rootClassName="process01root-class-name1" />
          </section>

          <section className="section">
            <HomeFinalCTA rootClassName="home-final-ct-aroot-class-name" />
          </section>

          <JeevanChandimalNewFooter rootClassName="jeevan-chandimal-new-footerroot-class-name1" />

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
          filter: saturate(.92) contrast(1.05) brightness(.78);
          transform: scale(1.04);
          will-change: transform;
        }

        .heroBgVignette {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              80% 60% at 50% 20%,
              rgba(0,0,0,0.12),
              rgba(0,0,0,0.72)
            ),
            linear-gradient(
              180deg,
              rgba(10,10,10,0.25) 0%,
              rgba(10,10,10,0.72) 55%,
              rgba(10,10,10,0.92) 100%
            );
        }

        .heroBgGrain {
          position: absolute;
          inset: 0;
          opacity: .08;
          mix-blend-mode: overlay;

          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");

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
        }

        .section {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .section :global(> *) {
          width: 100%;
        }

        /* cinematic tuning */

        @media (min-width: 1200px) {
          .heroBgImg {
            filter: saturate(.95) contrast(1.08) brightness(.76);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .heroBgImg {
            transform: none !important;
          }
        }

      `}</style>
    </>
  )
}