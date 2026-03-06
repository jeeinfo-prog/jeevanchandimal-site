// pages/services-animation.js
import React from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import ServiceAnimationHero from '../components/service-animation-hero'
import IntroductionAnimationServices from '../components/introduction-animation-services'
import SelectedMotionWork from '../components/selected-motion-work'
import WhatIDoAnimationServices from '../components/what-i-do-animation-services'
import HowIApproachMotion from '../components/how-i-approach-motion'
import WhoItsForAnimation from '../components/who-its-for-animation'
import ServicesAnimationFinalCTA from '../components/services-animation-final-cta'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

export default function ServicesAnimation() {
  // ✅ Replace later with your own image in /public/services/animation/
  // Example: /public/services/animation/heroani.jpg
  const HERO_BG = '/services/animation/heroani.jpg'

  return (
    <>
      <Head>
        <title>
          Animation &amp; Motion - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller
        </title>
        <meta
          name="description"
          content="Animation and movement used to support story — not distract from it. Motion designed with clarity, rhythm, and intent."
        />
        <meta
          property="og:title"
          content="Animation &amp; Motion - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
        />
        <meta
          property="og:description"
          content="Motion designed with clarity, rhythm, and intent — crafted to support narrative with purpose and restraint."
        />
        <meta
          property="og:image"
          content="https://www.jeevanchandimal.com/services/animation/og.jpg"
        />
        <link rel="canonical" href="https://www.jeevanchandimal.com/services-animation" />
      </Head>

      <div className="page">
        {/* ✅ Cinematic background (swap image later in /public/services/animation/) */}
        <div className="heroBg" aria-hidden="true">
          <div className="heroBgImg" style={{ backgroundImage: `url(${HERO_BG})` }} />
          <div className="heroBgVignette" />
          <div className="heroBgGrain" />
        </div>

        <JeevanChandimalNavi rootClassName="jeevan-chandimal-naviroot-class-name21" />

        <main className="main">
          {/* ✅ HERO */}
          <section className="section heroSection">
            <div className="block heroBlock">
              <ServiceAnimationHero
                heading1="Motion designed with clarity, rhythm, and intent."
                content1={
                  <>
                    <span>
                      Animation and movement used to support story — not distract from it.
                    </span>
                    <br />
                  </>
                }
                action3="View Motion Work"
                rootClassName="service-animation-heroroot-class-name"
              />
            </div>
          </section>

          {/* INTRO */}
          <section className="section">
            <IntroductionAnimationServices
              feature1Title="Introduction"
              feature1Description={
                <>
                  <span>
                    Motion is an extension of visual storytelling. I use animation and motion
                    design to add clarity, structure, and rhythm to ideas — always in service of
                    the narrative.
                  </span>
                  <br />
                  <span>
                    The focus is on purpose and restraint, creating movement that feels natural
                    and cinematic.
                  </span>
                </>
              }
              rootClassName="introduction-animation-servicesroot-class-name"
            />
          </section>

          {/* SELECTED WORK */}
          <section className="section">
            <SelectedMotionWork
              heading1="Selected Motion Work"
              content1="A selection of motion and animation projects created to support film, brands, and visual narratives."
              rootClassName="selected-motion-workroot-class-name"
            />
          </section>

          {/* WHAT I DO */}
          <section className="section">
            <WhatIDoAnimationServices
              sectionTitle="What I Do"
              feature1Title="Motion Graphics"
              feature2Title="2D & 3D Animation"
              feature3Title="Title Sequences"
              feature4Title="Visual Story Support"
              feature1Description="Clean, purposeful motion that enhances visual communication."
              feature2Description="Animated elements built with structure, pacing, and clarity."
              feature3Description="Opening visuals designed to set tone and atmosphere."
              feature4Description="Motion elements that integrate seamlessly with film and photography."
              feature1Button="Learn More"
              feature2Button="Discover More"
              feature3Button="Explore Now"
              feature4Button="View Portfolio"
              rootClassName="what-i-do-animation-servicesroot-class-name"
            />
          </section>

          {/* APPROACH */}
          <section className="section">
            <HowIApproachMotion
              feature1Title="How I Approach Motion"
              feature1Description={
                <>
                  <span>
                    Every movement has intention. Timing, rhythm, and simplicity guide each
                    decision.
                  </span>
                  <br />
                  <span>Animation is used to strengthen the story — never to overwhelm it.</span>
                </>
              }
              rootClassName="how-i-approach-motionroot-class-name"
            />
          </section>

          {/* WHO IT'S FOR */}
          <section className="section">
            <WhoItsForAnimation
              heading1="Who It’s For"
              content1="I work with filmmakers, brands, and creatives who value thoughtful motion and refined visual language."
              rootClassName="who-its-for-animationroot-class-name"
            />
          </section>

          {/* FINAL CTA */}
          <section className="section">
            <ServicesAnimationFinalCTA
              heading1="Have a story that needs movement?"
              content1="Let’s bring it to life with clarity, rhythm, and visual intent."
              action2="Create Together"
              rootClassName="services-animation-final-ct-aroot-class-name"
            />
          </section>

          <JeevanChandimalNewFooter rootClassName="jeevan-chandimal-new-footerroot-class-name20" />
        </main>
      </div>

      <style jsx>{`
        :global(html),
        :global(body) {
          height: 100%;
          margin: 0;
          padding: 0;
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
          filter: saturate(0.9) contrast(1.05) brightness(0.75);
          transform: scale(1.02);
        }

        .heroBgVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 60% at 50% 18%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0.74)
            ),
            linear-gradient(
              180deg,
              rgba(10, 10, 10, 0.25) 0%,
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

          /* ✅ hero stays below nav but overlaps to kill 1–2px seam */
          padding-top: calc(var(--jc-nav-h, 72px) - 2px);
          margin-top: 0;
        }

        .section {
          width: 100%;
          display: flex;
          justify-content: center;
          margin: 0;
          padding: 0;
        }

        .section :global(> *) {
          width: 100%;
        }

        .block {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin: 0;
          padding: 0;
        }

        /* ✅ lock hero to the top of main (no extra spacing) */
        .heroSection {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }

        .heroBlock {
          margin-top: 0;
          padding-top: 0;
        }

        /* ✅ if the seam is coming from nav bottom border/shadow */
        :global(.jeevan-chandimal-naviroot-class-name21) {
          margin-bottom: 0 !important;
          border-bottom: 0 !important;
          box-shadow: none !important;
        }

        /* ========= REMOVE HERO CORNER CURVES ========= */
        :global(.service-animation-heroroot-class-name),
        :global(.service-animation-heroroot-class-name *),
        :global(.service-animation-heroroot-class-name .thq-section-max-width),
        :global(.service-animation-heroroot-class-name .thq-card),
        :global(.service-animation-heroroot-class-name .thq-hero),
        :global(.service-animation-heroroot-class-name .hero),
        :global(.service-animation-heroroot-class-name .container),
        :global(.service-animation-heroroot-class-name .content) {
          border-radius: 0 !important;
        }

        :global(.service-animation-heroroot-class-name) {
          overflow: visible !important;
        }

        @media (min-width: 1200px) {
          .heroBgImg {
            filter: saturate(0.95) contrast(1.07) brightness(0.73);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .heroBgImg {
            transform: none;
          }
        }
      `}</style>
    </>
  )
}