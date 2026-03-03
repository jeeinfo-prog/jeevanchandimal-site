// pages/services-photography.js
import React, { Fragment } from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import ServicePhotographyHero from '../components/service-photography-hero'
import IntroductionPhotographyServices from '../components/introduction-photography-services'
import SelectedPhotography from '../components/selected-photography'
import WhatIDoPhotographyServices from '../components/what-i-do-photography-services'
import HowIApproachPhotography from '../components/how-i-approach-photography'
import WhoItsForPhotography from '../components/who-its-for-photography'
import PhotographyServicesFinalCTA from '../components/photography-services-final-cta'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function ServicesPhotography() {
  // ✅ Background image in /public/services/heroser.jpg
  const HERO_BG = '/services/heroser.jpg'

  return (
    <>
      <Head>
        <title>
          Services-Photography - Jeevan Chandimal | Filmmaker & Visual Storyteller
        </title>
        <meta
          name="description"
          content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
        />
        <meta
          property="og:title"
          content="Services-Photography - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
        />
        <meta
          property="og:description"
          content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound."
        />
        <meta
          property="og:image"
          content="https://www.jeevanchandimal.com/services/og.jpg"
        />
        <link
          rel="canonical"
          href="https://www.jeevanchandimal.com/services-photography"
        />
      </Head>

      <div className="page">
        {/* ✅ Cinematic background */}
        <div className="heroBg" aria-hidden="true">
          <div
            className="heroBgImg"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          />
          <div className="heroBgVignette" />
          <div className="heroBgGrain" />
          <div className="heroBgGlow" />
        </div>

        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="t">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="t">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="t">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="t">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="t">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="t">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="t">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="t">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="t">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="t">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="t">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="t">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="t">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="t">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="t">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="t">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="t">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name19"
        />

        <main className="main">
          {/* ✅ HERO (PLACED LIKE work-photography.js: section -> block -> component) */}
          <section className="section">
            <div className="block">
              <ServicePhotographyHero
                action3={
                  <Fragment>
                    <span className="t">Explore Work</span>
                  </Fragment>
                }
                content1={
                  <Fragment>
                    <span className="t">
                      Photography approached as storytelling — crafted with cinematic
                      intent and emotional clarity.
                    </span>
                  </Fragment>
                }
                heading1={
                  <Fragment>
                    <span className="t">
                      Still imagery shaped by light, mood, and atmosphere.
                    </span>
                  </Fragment>
                }
                rootClassName="service-photography-heroroot-class-name"
              />
            </div>
          </section>

          {/* INTRO */}
          <section className="section">
            <IntroductionPhotographyServices
              feature1Title={
                <Fragment>
                  <span className="t">Introduction</span>
                </Fragment>
              }
              rootClassName="introduction-photography-servicesroot-class-name"
              feature1Description={
                <Fragment>
                  <span className="t">
                    <span>
                      Photography is where my visual language began. I approach still
                      images the same way I approach film — with attention to light,
                      composition, and the feeling a moment carries.
                    </span>
                    <br />
                    <span>
                      Each photograph is created to stand on its own, while also fitting
                      naturally into larger visual narratives for editorial, commercial,
                      and artistic use.
                    </span>
                  </span>
                </Fragment>
              }
            />
          </section>

          {/* SELECTED PHOTOGRAPHY */}
          <section className="section">
            <SelectedPhotography
              content1={
                <Fragment>
                  <span className="t">
                    A curated selection of editorial, cinematic, and fine-art photography —
                    focused on atmosphere, texture, and detail.
                  </span>
                </Fragment>
              }
              heading1={
                <Fragment>
                  <span className="t">Selected Photography</span>
                </Fragment>
              }
              rootClassName="selected-photographyroot-class-name"
            />
          </section>

          {/* WHAT I DO */}
          <section className="section">
            <WhatIDoPhotographyServices
              sectionTitle={
                <Fragment>
                  <span className="t">What I Do</span>
                </Fragment>
              }
              feature1Title={
                <Fragment>
                  <span className="t">Cinematic &amp; Editorial Photography</span>
                </Fragment>
              }
              feature2Title={
                <Fragment>
                  <span className="t">Nature &amp; Wildlife</span>
                </Fragment>
              }
              feature3Title={
                <Fragment>
                  <span className="t">Landscape &amp; Travel</span>
                </Fragment>
              }
              feature4Title={
                <Fragment>
                  <span className="t">Black &amp; White Fine Art</span>
                </Fragment>
              }
              rootClassName="what-i-do-photography-servicesroot-class-name"
              feature1Button={
                <Fragment>
                  <span className="t">Learn More</span>
                </Fragment>
              }
              feature2Button={
                <Fragment>
                  <span className="t">Discover More</span>
                </Fragment>
              }
              feature3Button={
                <Fragment>
                  <span className="t">Explore Now</span>
                </Fragment>
              }
              feature4Button={
                <Fragment>
                  <span className="t">View Portfolio</span>
                </Fragment>
              }
              feature1Description={
                <Fragment>
                  <span className="t">
                    Story-driven imagery created with intention and visual depth.
                  </span>
                </Fragment>
              }
              feature2Description={
                <Fragment>
                  <span className="t">
                    Quiet, patient observations of the natural world, captured with
                    respect and realism.
                  </span>
                </Fragment>
              }
              feature3Description={
                <Fragment>
                  <span className="t">
                    Expansive scenes that convey scale, mood, and a sense of place.
                  </span>
                </Fragment>
              }
              feature4Description={
                <Fragment>
                  <span className="t">
                    Timeless compositions focused on light, form, and emotion.
                  </span>
                </Fragment>
              }
            />
          </section>

          {/* HOW I APPROACH */}
          <section className="section">
            <HowIApproachPhotography
              feature1Title={
                <Fragment>
                  <span className="t">How I Approach Photography</span>
                </Fragment>
              }
              rootClassName="how-i-approach-photographyroot-class-name"
              feature1Description={
                <Fragment>
                  <span className="t">
                    <span>
                      I look for moments that feel honest and unforced. Light, timing,
                      and stillness matter more than spectacle.
                    </span>
                    <br />
                    <span>
                      Whether working in controlled environments or in the field, the
                      goal is always the same — to create images that feel considered,
                      immersive, and lasting.
                    </span>
                  </span>
                </Fragment>
              }
            />
          </section>

          {/* WHO IT'S FOR */}
          <section className="section">
            <WhoItsForPhotography
              content1={
                <Fragment>
                  <span className="t">
                    I work with brands, agencies, filmmakers, and individuals who value
                    craft, atmosphere, and intentional storytelling — and who see film as
                    more than just content.
                  </span>
                </Fragment>
              }
              heading1={
                <Fragment>
                  <span className="t">Who It’s For</span>
                </Fragment>
              }
              rootClassName="who-its-for-photographyroot-class-name"
            />
          </section>

          {/* FINAL CTA */}
          <section className="section">
            <PhotographyServicesFinalCTA
              action2={
                <Fragment>
                  <span className="t">Create Together</span>
                </Fragment>
              }
              content1={
                <Fragment>
                  <span className="t">
                    Let’s create something with clarity, atmosphere, and purpose.
                  </span>
                </Fragment>
              }
              heading1={
                <Fragment>
                  <span className="t">
                    Looking for imagery with depth and intention?
                  </span>
                </Fragment>
              }
              rootClassName="photography-services-final-ct-aroot-class-name"
            />
          </section>

          <JeevanChandimalNewFooter rootClassName="jeevan-chandimal-new-footerroot-class-name18" />
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
          filter: saturate(0.95) contrast(1.06) brightness(0.78);
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
              rgba(10, 10, 10, 0.68) 55%,
              rgba(10, 10, 10, 0.92) 100%
            );
        }

        .heroBgGlow {
          position: absolute;
          inset: -18%;
          background: radial-gradient(
            40% 32% at 22% 28%,
            rgba(37, 195, 226, 0.12),
            rgba(37, 195, 226, 0) 62%
          );
          filter: blur(14px);
          opacity: 0.9;
        }

        .heroBgGrain {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        /* ========= LAYOUT (match work-photography.js rhythm) ========= */
        .main {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 72px; /* ✅ space for sticky nav */
        }

        .section {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* ✅ this is what makes the hero “sit” correctly under nav */
        .block {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .section :global(> *) {
          width: 100%;
        }

        .t {
          display: inline-block;
        }

        @media (min-width: 1200px) {
          .heroBgImg {
            filter: saturate(0.98) contrast(1.08) brightness(0.76);
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