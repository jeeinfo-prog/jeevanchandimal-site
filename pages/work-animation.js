// pages/work-animation.js
import React from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import WorkAnimationHero from '../components/work-animation-hero'
import Animations from '../components/animations'
import Work2DAnimation from '../components/work-2d-animation'
import Work3DAnimation from '../components/work-3d-animation'
import WorkMotionGraphics from '../components/work-motion-graphics'
import WorkPresentationNote from '../components/work-presentation-note'
import AIAnimation from '../components/ai-animation'
import WorkAnimationEndNote from '../components/work-animation-end-note'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

export default function WorkAnimation() {
  const HERO_BG = '/work/animation/hero.jpg'

  return (
    <>
      <Head>
        <title>Work – Animation & Motion | Jeevan Chandimal</title>
        <meta
          name="description"
          content="Motion created with clarity, rhythm, and purpose. Animation and movement used to enhance visual storytelling."
        />
        <meta property="og:title" content="Work – Animation & Motion | Jeevan Chandimal" />
        <meta
          property="og:description"
          content="Motion created with clarity, rhythm, and purpose. Animation and movement used to enhance visual storytelling."
        />
        <meta property="og:image" content="https://www.jeevanchandimal.com/work/animation/og.jpg" />
        <link rel="canonical" href="https://www.jeevanchandimal.com/work-animation" />
      </Head>

      <div className="page">
        {/* Cinematic background */}
        <div className="heroBg" aria-hidden="true">
          <div className="heroBgImg" style={{ backgroundImage: `url(${HERO_BG})` }} />
          <div className="heroBgVignette" />
          <div className="heroBgGrain" />
        </div>

        <JeevanChandimalNavi />

        <main className="main">
          {/* HERO */}
          <section className="section heroSection">
            <WorkAnimationHero
              heading1="Motion created with clarity, rhythm, and purpose."
              content1="Animation and movement used to enhance visual storytelling."
              rootClassName="work-animation-heroroot-class-name"
            />
          </section>

          {/* OVERVIEW */}
          <section className="section">
            <Animations
              sectionTitle="Animation & Motion"
              sectionDescription={
                <>
                  <span>
                    This archive explores motion as a storytelling tool — where movement is guided
                    by rhythm, clarity, and intention. Animation is treated as a visual language,
                    used to enhance narrative rather than decorate it.
                  </span>
                  <br />
                  <span>
                    The work includes 2D, 3D, and motion graphic projects designed to integrate
                    seamlessly with film and photographic elements.
                  </span>
                </>
              }
              feature1Title="2D Animations"
              feature2Title="3D Animations"
              feature3Title="Motion graphics"
              feature1Description="Flat, illustrative animation with clean timing and controlled movement."
              feature2Description="Spatially coherent 3D work focused on form, light, and intention."
              feature3Description="Typography and graphic motion built for clarity, rhythm, and storytelling."
              mainAction="Get Started"
              secondaryAction="Learn More"
            />
          </section>

          {/* 2D */}
          <section className="section">
            <Work2DAnimation
              sectionTitle="2D Animation"
              sectionDescription="Flat and illustrative animation developed with structure and pacing in mind. Movement is clean, purposeful, and aligned with narrative flow."
              feature1Title="Concept & Story"
              feature2Title="Timing & Rhythm"
              feature3Title="Visual Cohesion"
              feature1Description="Movement designed around meaning, not decoration."
              feature2Description="Controlled pacing that supports edit and emotion."
              feature3Description="Designed to integrate seamlessly with film and photo."
              mainAction="Customized Solutions"
              secondaryAction="Dedicated Customer Support"
            />
          </section>

          {/* 3D */}
          <section className="section">
            <Work3DAnimation
              sectionTitle="3D Animation"
              sectionDescription="Three-dimensional motion work focused on spatial clarity and visual cohesion. These projects emphasize lighting, form, and controlled movement over spectacle."
              feature1Title="Lighting & Form"
              feature2Title="Spatial Clarity"
              feature3Title="Controlled Movement"
              feature1Description="A cinematic approach to light and surface."
              feature2Description="Readable scenes with intentional depth."
              feature3Description="Motion that supports the message."
              mainAction="Customized Solutions"
              secondaryAction="Dedicated Customer Support"
              rootClassName="work3d-animationroot-class-name"
            />
          </section>

          {/* Motion Graphics */}
          <section className="section">
            <WorkMotionGraphics
              sectionTitle="Motion Graphics"
              sectionDescription="Graphic motion designed to support storytelling, titles, and visual communication. Each piece prioritizes clarity, rhythm, and restraint."
              feature1Title="Titles & Identity"
              feature2Title="Information Design"
              feature3Title="Rhythm & Restraint"
              feature1Description="Typography-led motion that feels premium and cinematic."
              feature2Description="Clear visuals built to communicate quickly."
              feature3Description="Design that enhances film—never distracts."
              mainAction="Customized Solutions"
              secondaryAction="Dedicated Customer Support"
              rootClassName="work-motion-graphicsroot-class-name"
            />
          </section>

          {/* Presentation Note */}
          <section className="section">
            <WorkPresentationNote
              sectionTitle="Presentation Note"
              sectionDescription="Projects are shown as short looping previews, allowing motion to be experienced naturally without interruption."
              feature1Title="Looping Previews"
              feature2Title="Context First"
              feature3Title="Clean Presentation"
              feature1Description="Quick reads without breaking the flow."
              feature2Description="Motion shown as part of the story."
              feature3Description="Minimal UI so the work stays central."
              mainAction="Customized Solutions"
              secondaryAction="Dedicated Customer Support"
              rootClassName="work-presentation-noteroot-class-name"
            />
          </section>

          {/* AI */}
          <section className="section">
            <AIAnimation
              heading1="AI & Animation"
              content1="Exploration of AI-assisted motion workflows used with taste and restraint—supporting ideas, accelerating tests, and enhancing iteration without losing craft."
              action1="Get Started"
              action2="Learn More"
              rootClassName="ai-animationroot-class-name2"
            />
          </section>

          {/* END NOTE */}
          <section className="section">
            <WorkAnimationEndNote
              heading2="Animation & Motion"
              content2="When movement is shaped with intent, it becomes part of the story itself."
              rootClassName="work-animation-end-noteroot-class-name"
            />
          </section>

          <JeevanChandimalNewFooter rootClassName="jeevan-chandimal-new-footerroot-class-name10" />
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

        /* CINEMATIC BACKGROUND */

        .heroBg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;

          /* align background below navbar */
          top: var(--jc-nav-h);
        }

        .heroBgImg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: saturate(0.92) contrast(1.08) brightness(0.72);
          transform: scale(1.02);
        }

        .heroBgVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 60% at 50% 18%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              180deg,
              rgba(10, 10, 10, 0.22) 0%,
              rgba(10, 10, 10, 0.74) 55%,
              rgba(10, 10, 10, 0.94) 100%
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

        /* LAYOUT */

        .main {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          /* important: spacing handled globally */
          padding-top: 0;
        }

        .section {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .section :global(> *) {
          width: 100%;
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