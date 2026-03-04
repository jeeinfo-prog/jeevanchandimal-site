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
  // ✅ Swap later with your own image in /public/work/audio/
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
          content="Audio work shaped through texture, space, and emotional clarity. Sound designed to support story and presence."
        />
        {/* ✅ Replace with your hosted OG image later */}
        <meta property="og:image" content="https://www.jeevanchandimal.com/work/audio/og.jpg" />
        <link rel="canonical" href="https://www.jeevanchandimal.com/work-audio" />
      </Head>

      <div className="page">
        {/* ✅ Cinematic background */}
        <div className="heroBg" aria-hidden="true">
          <div className="heroBgImg" style={{ backgroundImage: `url(${HERO_BG})` }} />
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
                    Sound is approached here as an emotional and spatial element — something that
                    shapes how a story is felt, not simply heard. The work in this archive focuses
                    on texture, rhythm, and restraint, allowing silence and space to play an active
                    role.
                  </span>
                  <br />
                  <span>
                    This collection includes sound design, music, and voice-based work created to
                    support film, animation, and immersive visual experiences.
                  </span>
                </>
              }
              feature1Title="Sound design"
              feature2Title="Music"
              feature3Title="Voice work"
              feature1Description="Designed atmospheres, textures, and environments that deepen narrative presence."
              feature2Description="Original compositions shaped around mood, pacing, and emotional rhythm."
              feature3Description="Voice-led work for narration, film, and storytelling—clean, controlled, intentional."
              mainAction="Get Started"
              secondaryAction="Learn More"
            />
          </section>

          {/* SOUND DESIGN */}
          <section className="section">
            <SoundDesign2
              sectionTitle="Sound design"
              sectionDescription="Atmospheric soundscapes and environmental design created to add depth and realism to visual narratives. Each piece is built with attention to space, layering, and emotional tone."
              feature1Title="Atmosphere & Space"
              feature2Title="Layering & Texture"
              feature3Title="Narrative Support"
              feature1Description="World-building sound that feels lived-in, cinematic, and grounded."
              feature2Description="Detailed sonic texture with clean separation and controlled depth."
              feature3Description="Sound that guides emotion without overpowering the visual story."
              mainAction="Get Started"
              secondaryAction="Learn More"
            />
          </section>

          {/* MUSIC */}
          <section className="section">
            <Music
              sectionTitle="Music"
              sectionDescription="Original musical compositions developed around mood and pacing. These works are created to support narrative flow, whether as subtle background elements or more present emotional drivers."
              feature1Title="Mood & Pacing"
              feature2Title="Minimal, Cinematic"
              feature3Title="Story First"
              feature1Description="Compositions built to move with the edit—not fight it."
              feature2Description="Elegant, restrained themes that leave space for picture."
              feature3Description="Music that supports meaning, tone, and intention."
              mainAction="Get Started"
              secondaryAction="Learn More"
            />
          </section>

          {/* VOICE WORK */}
          <section className="section">
            <VoiceWork
              heading1="Voice Work"
              content1="Voice-based audio created for film, narration, and visual storytelling. Clarity, tone, and emotional delivery are prioritized over performance excess."
              feature1Title="Narration"
              feature2Title="Film / Doc"
              feature3Title="Brand Voice"
              feature1Description="Clear, controlled narration with emotional precision."
              feature2Description="Voice that supports story beats, character, and pacing."
              feature3Description="Brand-forward delivery—warm, confident, minimal."
            />
          </section>

          {/* END NOTE */}
          <section className="section">
            <WorkAudioEndNote
              heading2="Audio Production"
              content2="Each piece is presented with embedded audio players and supporting visuals, allowing sound to be experienced in context."
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

          /* allow sticky navbar */
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

          /* slightly cooler/darker for audio page */
          filter: saturate(0.9) contrast(1.05) brightness(0.72);
          transform: scale(1.02);
        }

        .heroBgVignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              80% 60% at 50% 18%,
              rgba(0, 0, 0, 0.1),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              180deg,
              rgba(10, 10, 10, 0.25) 0%,
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

        /* ========= LAYOUT ========= */
        .main {
          position: relative;
          z-index: 1;

          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          padding-top: 72px; /* space for navbar */
        }

        .section {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .section :global(> *) {
          width: 100%;
        }

        @media (min-width: 1200px) {
          .heroBgImg {
            filter: saturate(0.95) contrast(1.06) brightness(0.7);
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