// pages/work-audio.js
import React from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import WorkAudioHero from '../components/work-audio-hero'
import AudioProduction from '../components/audio-production'
import SoundDesign2 from '../components/sound-design-2'
import Music from '../components/music'
import VoiceWork from '../components/voice-work'
import WorkAudioEndNote from '../components/work-audio-end-note'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

export default function WorkAudio() {
  const HERO_BG = '/work/audio/hero.jpg'

  return (
    <>
      <Head>
        <title>Work – Audio | Jeevan Chandimal</title>

        <meta
          name="description"
          content="Audio work shaped through texture, space, and emotional clarity. Sound designed to support story and presence."
        />

        <meta property="og:title" content="Work – Audio | Jeevan Chandimal" />

        <meta
          property="og:description"
          content="Audio work shaped through texture, space, and emotional clarity."
        />

        <meta
          property="og:image"
          content="https://www.jeevanchandimal.com/work/audio/og.jpg"
        />

        <link rel="canonical" href="https://www.jeevanchandimal.com/work-audio" />
      </Head>

      <div className="page">

        {/* CINEMATIC BACKGROUND */}
        <div className="heroBg" aria-hidden="true">
          <div
            className="heroBgImg"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          />
          <div className="heroBgVignette" />
          <div className="heroBgGrain" />
        </div>

        <JeevanChandimalNavi />

        <main className="main">

          {/* HERO */}
          <section className="section heroSection">
            <WorkAudioHero
              heading1="Sound designed to support story and presence."
              content1="Audio work shaped through texture, space, and emotional clarity."
              rootClassName="work-audio-heroroot-class-name"
            />
          </section>

          {/* AUDIO PRODUCTION */}
          <section className="section">
            <AudioProduction
              sectionTitle="Audio Production"
              sectionDescription={
                <>
                  <span>
                    Sound is approached here as an emotional and spatial element —
                    something that shapes how a story is felt, not simply heard.
                  </span>
                  <br />
                  <span>
                    This collection includes sound design, music, and voice-based
                    work created to support film, animation, and immersive visuals.
                  </span>
                </>
              }
              feature1Title="Sound design"
              feature2Title="Music"
              feature3Title="Voice work"
              feature1Description="Designed atmospheres and textures that deepen narrative presence."
              feature2Description="Original compositions shaped around mood and pacing."
              feature3Description="Voice work for narration, film, and storytelling."
              mainAction="Get Started"
              secondaryAction="Learn More"
            />
          </section>

          {/* SOUND DESIGN */}
          <section className="section">
            <SoundDesign2
              sectionTitle="Sound design"
              sectionDescription="Atmospheric soundscapes created to add depth and realism to visual narratives."
              feature1Title="Atmosphere & Space"
              feature2Title="Layering & Texture"
              feature3Title="Narrative Support"
              feature1Description="World-building sound that feels cinematic and grounded."
              feature2Description="Detailed sonic textures with controlled depth."
              feature3Description="Sound that guides emotion without overpowering visuals."
              mainAction="Get Started"
              secondaryAction="Learn More"
            />
          </section>

          {/* MUSIC */}
          <section className="section">
            <Music
              sectionTitle="Music"
              sectionDescription="Original compositions built around mood and pacing."
              feature1Title="Mood & Pacing"
              feature2Title="Minimal, Cinematic"
              feature3Title="Story First"
              feature1Description="Music that moves with the edit."
              feature2Description="Elegant themes that leave space for picture."
              feature3Description="Sound that supports narrative tone."
              mainAction="Get Started"
              secondaryAction="Learn More"
            />
          </section>

          {/* VOICE WORK */}
          <section className="section">
            <VoiceWork
              heading1="Voice Work"
              content1="Voice-based audio created for film, narration, and storytelling."
              feature1Title="Narration"
              feature2Title="Film / Documentary"
              feature3Title="Brand Voice"
              feature1Description="Clear narration with emotional precision."
              feature2Description="Voice that supports story beats."
              feature3Description="Warm, confident brand delivery."
            />
          </section>

          {/* END NOTE */}
          <section className="section">
            <WorkAudioEndNote
              heading2="Audio Production"
              content2="Each piece is presented with embedded audio players and supporting visuals."
            />
          </section>

          <JeevanChandimalNewFooter rootClassName="jeevan-chandimal-new-footerroot-class-name4" />

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

          filter: saturate(0.9) contrast(1.05) brightness(0.72);
          transform: scale(1.02);
        }

        .heroBgVignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              80% 60% at 50% 18%,
              rgba(0,0,0,0.1),
              rgba(0,0,0,0.78)
            ),
            linear-gradient(
              180deg,
              rgba(10,10,10,0.25) 0%,
              rgba(10,10,10,0.74) 55%,
              rgba(10,10,10,0.94) 100%
            );
        }

        .heroBgGrain {
          position: absolute;
          inset: 0;
          opacity: .08;
          mix-blend-mode: overlay;
          background-image:
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size:240px 240px;
        }

        /* LAYOUT */

        .main {
          position: relative;
          z-index: 1;

          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          /* spacing handled globally */
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