// pages/services-photography.js
import React, { Fragment } from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import ServicePhotographyHero from '../components/service-photography-hero'
import IntroductionPhotographyServices from '../components/introduction-photography-services'
import SelectedPhotography from '../components/selected-photography'
import WhatIDoPhotographyServices from '../components/what-i-do-photography-services'
import HowIApproachPhotography from '../components/how-i-approach-photography'
import WhoItsForPhotography from '../components/who-its-for-photography'
import PhotographyServicesFinalCTA from '../components/photography-services-final-cta'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

export default function ServicesPhotography() {

  const HERO_BG = '/services/heroser.jpg'

  return (
    <>
      <Head>
        <title>
          Services-Photography - Jeevan Chandimal | Filmmaker & Visual Storyteller
        </title>

        <meta
          name="description"
          content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound."
        />

        <meta
          property="og:title"
          content="Services-Photography - Jeevan Chandimal"
        />

        <meta
          property="og:description"
          content="Cinematic photography services shaped with intention and restraint."
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

        {/* Cinematic Background */}
        <div className="heroBg" aria-hidden="true">
          <div
            className="heroBgImg"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          />
          <div className="heroBgVignette" />
          <div className="heroBgGrain" />
          <div className="heroBgGlow" />
        </div>

        <JeevanChandimalNavi rootClassName="jeevan-chandimal-naviroot-class-name19" />

        <main className="main">

          {/* HERO */}
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
                      Photography approached as storytelling — crafted with cinematic intent.
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
              feature1Title={<Fragment><span className="t">Introduction</span></Fragment>}
              rootClassName="introduction-photography-servicesroot-class-name"
              feature1Description={
                <Fragment>
                  <span className="t">
                    Photography is where my visual language began. I approach still
                    images the same way I approach film — with attention to light,
                    composition, and atmosphere.
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
                    A curated selection of editorial, cinematic, and fine-art photography.
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
              sectionTitle={<Fragment><span className="t">What I Do</span></Fragment>}
              rootClassName="what-i-do-photography-servicesroot-class-name"
            />
          </section>

          {/* APPROACH */}
          <section className="section">
            <HowIApproachPhotography
              rootClassName="how-i-approach-photographyroot-class-name"
            />
          </section>

          {/* WHO IT'S FOR */}
          <section className="section">
            <WhoItsForPhotography
              heading1={<Fragment><span className="t">Who It’s For</span></Fragment>}
              rootClassName="who-its-for-photographyroot-class-name"
            />
          </section>

          {/* FINAL CTA */}
          <section className="section">
            <PhotographyServicesFinalCTA
              rootClassName="photography-services-final-ct-aroot-class-name"
            />
          </section>

          <JeevanChandimalNewFooter rootClassName="jeevan-chandimal-new-footerroot-class-name18" />

        </main>
      </div>

      <style jsx>{`

        :global(html),
        :global(body){
          height:100%;
        }

        :global(body){
          overflow-x:hidden;
        }

        .page{
          width:100%;
          min-height:100vh;
          position:relative;
          overflow-x:hidden;
          overflow-y:visible;
          background:#0b0b0b;
          color:#f5f4f4;
        }

        /* Cinematic background */

        .heroBg{
          position:fixed;
          inset:0;
          z-index:0;
          pointer-events:none;

          /* align background under navbar */
          top:var(--jc-nav-h);
        }

        .heroBgImg{
          position:absolute;
          inset:0;
          background-size:cover;
          background-position:center;
          background-repeat:no-repeat;
          filter:saturate(.95) contrast(1.06) brightness(.78);
          transform:scale(1.02);
        }

        .heroBgVignette{
          position:absolute;
          inset:0;
          background:
            radial-gradient(
              80% 60% at 50% 20%,
              rgba(0,0,0,.12),
              rgba(0,0,0,.72)
            ),
            linear-gradient(
              180deg,
              rgba(10,10,10,.2) 0%,
              rgba(10,10,10,.68) 55%,
              rgba(10,10,10,.92) 100%
            );
        }

        .heroBgGlow{
          position:absolute;
          inset:-18%;
          background:radial-gradient(
            40% 32% at 22% 28%,
            rgba(37,195,226,.12),
            rgba(37,195,226,0) 62%
          );
          filter:blur(14px);
          opacity:.9;
        }

        .heroBgGrain{
          position:absolute;
          inset:0;
          opacity:.08;
          mix-blend-mode:overlay;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size:240px 240px;
        }

        /* Layout */

        .main{
          position:relative;
          z-index:1;
          width:100%;
          display:flex;
          flex-direction:column;
          align-items:center;

          /* spacing handled globally */
          padding-top:0;
        }

        .section{
          width:100%;
          display:flex;
          justify-content:center;
        }

        .block{
          width:100%;
          display:flex;
          flex-direction:column;
          gap:18px;
        }

        .section :global(> *){
          width:100%;
        }

        .t{
          display:inline-block;
        }

        @media (prefers-reduced-motion:reduce){
          .heroBgImg{
            transform:none;
          }
        }

      `}</style>
    </>
  )
}