import React, { useEffect, useRef } from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNew from '../components/jeevan-chandimal-new'
import MyStoryNew from '../components/my-story-new'
import ACinematicApproach from '../components/a-cinematic-approach'
import Process01 from '../components/process-01'
import TheWork from '../components/the-work'
import Collaboration from '../components/collaboration'
import Philosophy from '../components/philosophy'
import Availability from '../components/availability'
import SkillsOverview from '../components/skills-overview'
import BehindTheScenes01 from '../components/behind-the-scenes-01'
import ClosingStatement from '../components/closing-statement'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

const About = () => {
  const HERO_BG = '/about/abouthero.jpg'
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    let ticking = false

    const update = () => {
      const scroll = window.scrollY || window.pageYOffset
      const offset = scroll * 0.16
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
        <title>About | Jeevan Chandimal – Filmmaker & Visual Storyteller</title>

        <meta
          name="description"
          content="Jeevan Chandimal is a filmmaker and visual storyteller working across film, photography, sound, and motion. Cinematic work shaped by atmosphere, intention, and narrative depth."
        />

        <link rel="canonical" href="https://jeevanchandimal.com/about" />

        <meta
          property="og:title"
          content="About | Jeevan Chandimal – Filmmaker & Visual Storyteller"
        />
        <meta
          property="og:description"
          content="Filmmaker and visual storyteller crafting cinematic work across film, photography, sound, and motion."
        />
        <meta
          property="og:image"
          content="https://jeevanchandimal.com/og/about.jpg"
        />
        <meta property="og:url" content="https://jeevanchandimal.com/about" />
        <meta property="og:type" content="profile" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': 'https://jeevanchandimal.com/#person',
              name: 'Jeevan Chandimal',
              url: 'https://jeevanchandimal.com/about',
              image: 'https://jeevanchandimal.com/og/jeevan-chandimal.jpg',
              jobTitle: 'Filmmaker and Visual Storyteller',
              worksFor: {
                '@type': 'Organization',
                name: 'Jeevan Chandimal',
              },
              sameAs: [
                'https://www.instagram.com/yourprofile',
                'https://www.youtube.com/yourchannel',
                'https://www.linkedin.com/in/yourprofile',
              ],
              description:
                'Jeevan Chandimal is a filmmaker and visual storyteller working across film, photography, sound, and motion, crafting cinematic work shaped by atmosphere and intention.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'Sri Lanka',
              },
            }),
          }}
        />
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
          <div className="heroBgGlow" />
          <div className="heroBgGrain" />
        </div>

        <JeevanChandimalNavi />

        <main className="main">
          <section className="section heroSection">
            <JeevanChandimalNew />
          </section>

          <section className="section glassSection">
            <MyStoryNew />
          </section>

          <section className="section glassSection">
            <ACinematicApproach />
          </section>

          <section className="section glassSection">
            <Process01 />
          </section>

          <section className="section glassSection">
            <TheWork />
          </section>

          <section className="section glassSection">
            <Collaboration />
          </section>

          <section className="section glassSection">
            <Philosophy />
          </section>

          <section className="section glassSection">
            <Availability />
          </section>

          <section className="section glassSection">
            <SkillsOverview />
          </section>

          <section className="section glassSection">
            <BehindTheScenes01
              items={[
                {
                  id: 'b1',
                  src: '/about/bts-1.jpg',
                  alt: 'Behind the Scenes 1',
                  ratio: '1-1',
                },
                {
                  id: 'b2',
                  src: '/about/bts-2.jpg',
                  alt: 'Behind the Scenes 2',
                  ratio: '1-1',
                },
                {
                  id: 'b3',
                  src: '/about/bts-3.jpg',
                  alt: 'Behind the Scenes 3',
                  ratio: '4-3',
                },
                {
                  id: 'b4',
                  src: '/about/bts-4.jpg',
                  alt: 'Behind the Scenes 4',
                  ratio: '1-1',
                },
                {
                  id: 'b5',
                  src: '/about/bts-5.jpg',
                  alt: 'Behind the Scenes 5',
                  ratio: '4-3',
                },
                {
                  id: 'b6',
                  src: '/about/bts-6.jpg',
                  alt: 'Behind the Scenes 6',
                  ratio: '1-1',
                },
                {
                  id: 'b7',
                  src: '/about/bts-7.jpg',
                  alt: 'Behind the Scenes 7',
                  ratio: '1-1',
                },
              ]}
            />
          </section>

          <section className="section glassSection finalSection">
            <ClosingStatement />
          </section>

          <JeevanChandimalNewFooter />
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
          filter: saturate(0.92) contrast(1.05) brightness(0.74);
          transform: scale(1.04);
          will-change: transform;
        }

        .heroBgVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              82% 60% at 50% 18%,
              rgba(0, 0, 0, 0.08),
              rgba(0, 0, 0, 0.72)
            ),
            linear-gradient(
              180deg,
              rgba(8, 8, 8, 0.18) 0%,
              rgba(8, 8, 8, 0.56) 46%,
              rgba(8, 8, 8, 0.9) 100%
            );
        }

        .heroBgGlow {
          position: absolute;
          inset: -12%;
          background: radial-gradient(
            34% 26% at 50% 14%,
            rgba(115, 198, 255, 0.12),
            rgba(115, 198, 255, 0) 65%
          );
          filter: blur(18px);
          opacity: 0.95;
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
          padding-bottom: 28px;
        }

        .section {
          width: 100%;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .section :global(> *) {
          width: 100%;
        }

        .heroSection {
          padding-top: 0;
        }

        /* luxury cinematic wrappers */
        .glassSection {
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .glassSection::before {
          content: '';
          position: absolute;
          inset: 10px 22px;
          border-radius: 30px;
          border: 1px solid rgba(245, 244, 244, 0.07);
          background: linear-gradient(
            180deg,
            rgba(10, 10, 10, 0.22) 0%,
            rgba(10, 10, 10, 0.12) 50%,
            rgba(10, 10, 10, 0.18) 100%
          );
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.22);
          backdrop-filter: blur(8px);
          pointer-events: none;
          z-index: 0;
        }

        .glassSection :global(> *) {
          position: relative;
          z-index: 1;
        }

        .finalSection {
          padding-bottom: 20px;
        }

        :global(h1),
        :global(h2),
        :global(h3) {
          letter-spacing: -0.02em;
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.34);
        }

        :global(p) {
          line-height: 1.68;
        }

        @media (min-width: 1200px) {
          .heroBgImg {
            filter: saturate(0.95) contrast(1.08) brightness(0.72);
          }

          .glassSection::before {
            inset: 12px 42px;
          }
        }

        @media (max-width: 991px) {
          .glassSection::before {
            inset: 10px 14px;
            border-radius: 24px;
          }
        }

        @media (max-width: 767px) {
          .glassSection::before {
            inset: 8px 10px;
            border-radius: 22px;
          }

          .main {
            padding-bottom: 16px;
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

export default About