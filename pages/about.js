import React from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
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
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const About = () => {
  return (
    <>
      <Head>
        <title>About | Jeevan Chandimal – Filmmaker & Visual Storyteller</title>

        <meta
          name="description"
          content="Jeevan Chandimal is a filmmaker and visual storyteller working across film, photography, sound, and motion. Cinematic work shaped by atmosphere, intention, and narrative depth."
        />

        {/* Canonical */}
        <link rel="canonical" href="https://jeevanchandimal.com/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About | Jeevan Chandimal – Filmmaker & Visual Storyteller" />
        <meta
          property="og:description"
          content="Filmmaker and visual storyteller crafting cinematic work across film, photography, sound, and motion."
        />
        <meta property="og:image" content="https://jeevanchandimal.com/og/about.jpg" />
        <meta property="og:url" content="https://jeevanchandimal.com/about" />
        <meta property="og:type" content="profile" />

        {/* Person Schema */}
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

      <div className="about-container">
        <JeevanChandimalNavi />

        <main>
          <JeevanChandimalNew />

          <MyStoryNew />

          <ACinematicApproach />

          <Process01 />

          <TheWork />

          <Collaboration />

          <Philosophy />

          <Availability />

          <SkillsOverview />

          {/* ✅ BTS CINEMATIC: put images in public/about/bts-1.jpg ... bts-7.jpg */}
          <BehindTheScenes01
            items={[
              { id: 'b1', src: '/about/bts-1.jpg', alt: 'Behind the Scenes 1', ratio: '1-1' },
              { id: 'b2', src: '/about/bts-2.jpg', alt: 'Behind the Scenes 2', ratio: '1-1' },
              { id: 'b3', src: '/about/bts-3.jpg', alt: 'Behind the Scenes 3', ratio: '4-3' },
              { id: 'b4', src: '/about/bts-4.jpg', alt: 'Behind the Scenes 4', ratio: '1-1' },
              { id: 'b5', src: '/about/bts-5.jpg', alt: 'Behind the Scenes 5', ratio: '4-3' },
              { id: 'b6', src: '/about/bts-6.jpg', alt: 'Behind the Scenes 6', ratio: '1-1' },
              { id: 'b7', src: '/about/bts-7.jpg', alt: 'Behind the Scenes 7', ratio: '1-1' },
            ]}
          />

          <ClosingStatement />
        </main>

        <JeevanChandimalNewFooter />
      </div>

      <style jsx>{`
        .about-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        main {
          width: 100%;
        }

        :global(h1, h2, h3) {
          letter-spacing: -0.02em;
        }

        :global(p) {
          line-height: 1.65;
        }
      `}</style>
    </>
  )
}

export default About