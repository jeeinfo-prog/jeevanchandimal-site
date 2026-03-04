import React, { Fragment } from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import WorkHero from '../components/work-hero'
import HomeWork01 from '../components/home-work-01'
import Photography from '../components/photography'
import FilmVideoProduction from '../components/film-video-production'
import AIAnimation from '../components/ai-animation'
import SoundDesign from '../components/sound-design'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

const Work = () => {
  return (
    <>
      <div className="work-container">
        {/* ✅ cinematic overlays */}
        <div className="topVignette" />
        <div className="grain" />

        <Head>
          <title>Work - Jeevan Chandimal | Filmmaker & Visual Storyteller</title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
        </Head>

        <JeevanChandimalNavi rootClassName="jeevan-chandimal-naviroot-class-name7" />

        <WorkHero
          action3={<Fragment><span className="work-text27">Explore Work</span></Fragment>}
          content1={<Fragment><span className="work-text28">Explore each discipline as a focused body of work.</span></Fragment>}
          heading1={<Fragment><span className="work-text29">Selected work across film, photography, sound, and motion.</span></Fragment>}
          rootClassName="work-heroroot-class-name"
        />

        <HomeWork01
          feature1Title={<Fragment><span className="work-text30">Film Production</span></Fragment>}
          feature2Title={<Fragment><span className="work-text31">Audio Production</span></Fragment>}
          feature3Title={<Fragment><span className="work-text32">Animation &amp; Motion</span></Fragment>}
          feature4Title={<Fragment><span className="work-text33">Photography</span></Fragment>}
          feature1Button={<Fragment><span className="work-text34">Learn More</span></Fragment>}
          feature2Button={<Fragment><span className="work-text35">Discover Now</span></Fragment>}
          feature3Button={<Fragment><span className="work-text36">Get Support</span></Fragment>}
          feature4Button={<Fragment><span className="work-text37">Customize Your Experience</span></Fragment>}
          feature1Description={<Fragment><span className="work-text38">Stories shaped through image, motion, and sound.</span></Fragment>}
          feature2Description={<Fragment><span className="work-text39">Sound designed to support emotion and presence.</span></Fragment>}
          feature3Description={<Fragment><span className="work-text40">Movement crafted with clarity, rhythm, and intent.</span></Fragment>}
          feature4Description={<Fragment><span className="work-text41">Still imagery with cinematic depth and atmosphere.</span></Fragment>}
          rootClassName="home-work01root-class-name"
        />

        <Photography
          content1={<Fragment><span className="work-text42">Explore our Photography projects and see how we bring stories to life on screen.</span></Fragment>}
          heading1={<Fragment><span className="work-text43">Photography</span></Fragment>}
        />

        <FilmVideoProduction rootClassName="film-video-productionroot-class-name1" />

        <AIAnimation
          action1={<Fragment><span className="work-text44">Get Started</span></Fragment>}
          action2={<Fragment><span className="work-text45">Learn More</span></Fragment>}
          content1={<Fragment><span className="work-text46">Explore our range of services including film production, audio production, animation &amp; graphics, and photography.</span></Fragment>}
          heading1={<Fragment><span className="work-text47">AI &amp; Animation</span></Fragment>}
          rootClassName="ai-animationroot-class-name1"
        />

        <SoundDesign
          action1={<Fragment><span className="work-text48">Explore Services</span></Fragment>}
          action2={<Fragment><span className="work-text49">Learn More</span></Fragment>}
          content1={<Fragment><span className="work-text50">Expert soundtrack composition, sound design and audio post-production for film, TV, and digital media.</span></Fragment>}
          heading1={<Fragment><span className="work-text51">Sound design</span></Fragment>}
        />

        <JeevanChandimalNewFooter rootClassName="jeevan-chandimal-new-footerroot-class-name8" />
      </div>

      <style jsx>{`
        .work-container {
          width: 100%;
          display: flex;
          min-height: 100vh;
          flex-direction: column;
          background: #0a0a0a;
          position: relative;
          overflow: hidden;
        }

        /* ================= CINEMATIC BACKGROUND ================= */

        .work-container:before {
          content: '';
          position: fixed;
          inset: -20% -10% auto -10%;
          height: 60vh;
          background: radial-gradient(
            900px circle at 20% 10%,
            rgba(120, 166, 255, 0.08),
            transparent 60%
          );
          pointer-events: none;
          z-index: 0;
        }

        .work-container:after {
          content: '';
          position: fixed;
          inset: auto -10% -20% -10%;
          height: 60vh;
          background: radial-gradient(
            900px circle at 80% 90%,
            rgba(120, 166, 255, 0.06),
            transparent 60%
          );
          pointer-events: none;
          z-index: 0;
        }

        .topVignette {
          position: fixed;
          inset: 0 0 auto 0;
          height: 140px;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0)
          );
          pointer-events: none;
          z-index: 2;
        }

        .grain {
          position: fixed;
          inset: 0;
          opacity: 0.05;
          mix-blend-mode: overlay;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
          z-index: 1;
        }

        /* ================= SECTION RHYTHM ================= */

        .work-container :global(section) {
          position: relative;
          margin-top: 18px;
          z-index: 2;
        }

        .work-container :global(section):not(:first-of-type)::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0.12),
            rgba(245, 244, 244, 0.04)
          );
          opacity: 0.6;
        }

        /* keep text spans working */
        .work-container span {
          display: inline-block;
        }
      `}</style>
    </>
  )
}

export default Work