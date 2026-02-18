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

const T = (s) => <span>{s}</span>

const About = () => {
  return (
    <>
      <div className="about-container">
        <Head>
          <title>About - Jeevan Chandimal | Filmmaker & Visual Storyteller</title>

          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />

          <meta property="og:title" content="About - Jeevan Chandimal" />
          <meta
            property="og:description"
            content="Filmmaker and visual storyteller working across film, photography, sound, and motion."
          />
          <meta
            property="og:image"
            content="https://jeevanchandimal.com/og/about.jpg"
          />

          <link rel="canonical" href="https://jeevanchandimal.com/about" />
        </Head>

        {/* NAV */}
        <JeevanChandimalNavi
          link1={T('Home')}
          link2={T('Work')}
          link3={T('Services')}
          link4={T('Store')}
          link5={T('Membership')}
          link51={T('About')}
          link511={T('Contact')}
          text16={T('Work')}
          text17={T('Film')}
          text18={T('Audio')}
          text19={T('Animation')}
          text161={T('Services')}
          text171={T('Film Production')}
          text181={T('Audio Production')}
          text191={T('Photography')}
          text192={T('Animation & Motion')}
          rootClassName="jeevan-chandimal-naviroot-class-name3"
        />

        {/* HERO */}
        <JeevanChandimalNew
          action3={T('Get Started')}
          content1={T('Where image, motion, and sound become atmosphere.')}
          heading1={T('Jeevan Chandimal')}
          heading11={T('Filmmaker · Visual Storyteller')}
          rootClassName="jeevan-chandimal-newroot-class-name"
        />

        {/* STORY (kept the modern version only) */}
        <MyStoryNew
          feature1Title={T('My Story')}
          feature1Description={T(
            'I’m Jeevan Chandimal - a filmmaker and visual storyteller working across film, photography, sound, and motion.'
          )}
          feature2Description={T(
            'Image, movement, and sound are treated as a single language - developed together, shaped with intention, and refined through atmosphere.'
          )}
          feature3Description={T(
            'My work is built on stillness, observation, and control. Before a frame is captured, the mood is defined.'
          )}
          feature3Description1={T(
            'Every project begins with a concept - not a format. Story, tone, and presence come first.'
          )}
        />

        <ACinematicApproach
          feature1Title={T('A Cinematic Approach')}
          feature1Description={T(
            'Lighting is treated as narrative. Movement is deliberate, never decorative. Sound is designed to support emotion.'
          )}
          feature2Description={T(
            'Film, photography, audio, and animation are developed side by side, not added in layers.'
          )}
          feature3Description={T(
            'The result is work that feels considered, restrained, and immersive.'
          )}
          rootClassName="a-cinematic-approachroot-class-name"
        />

        <Process01
          feature1Title11={T('Concept First')}
          feature1Title2={T('Process')}
          feature3Title={T('Observation Over Noise')}
          feature3Title1={T('Craft & Detail')}
          feature1Description2={T(
            'Every collaboration begins with intention. We define atmosphere and emotional direction before production.'
          )}
          feature3Description={T(
            'I prefer quiet moments to forced gestures. Stillness often reveals more than motion.'
          )}
          feature3Description1={T(
            'From lighting and composition to sound texture and pacing, every element is refined with care.'
          )}
        />

        <TheWork
          feature1Title={T('The Work')}
          feature1Description={T(
            'Projects range across narrative film, documentary, commercial work, editorial photography, and sound design.'
          )}
          feature2Description={T(
            'Some are expansive. Some are minimal. All are approached as complete visual experiences.'
          )}
          feature3Description={T(
            'I work both independently and in collaboration, depending on the scale and needs of the project.'
          )}
          rootClassName="the-workroot-class-name"
        />

        <Collaboration
          feature1Title={T('Collaboration')}
          feature1Description={T(
            'I work with individuals, brands, and agencies who value clarity, mood, and storytelling over volume.'
          )}
          feature2Description={T(
            'Projects are selected carefully to ensure focus and quality at every stage.'
          )}
          feature3Description={T(
            'If you’re looking for work that feels cinematic, grounded, and thoughtfully crafted, we’re aligned.'
          )}
          rootClassName="collaborationroot-class-name"
        />

        <Philosophy
          feature1Title={T('Philosophy')}
          feature1Description={T(
            'Story over spectacle. Mood over noise. Meaning over excess.'
          )}
          feature2Description={T(
            'Whether film, photography, or sound, the goal is work that carries emotion, texture, and presence.'
          )}
          rootClassName="philosophyroot-class-name"
        />

        <Availability
          heading1={T('Availability')}
          heading11={T('Available for select projects.')}
          content1={T(
            'If you’d like to collaborate or discuss an idea, feel free to reach out.'
          )}
          action1={T('Get in Touch')}
          action2={T('Contact Me')}
        />

        <SkillsOverview
          heading1={T('Skills Overview')}
          content1={T(
            'From concept to final delivery, I handle the full creative process.'
          )}
          feature1Title={T('Visual')}
          feature1Description={T(
            'Cinematography · Photography · Color Grading · Visual Direction'
          )}
          feature2Title={T('Motion')}
          feature2Description={T(
            'Editing · Animation · Motion Graphics · Visual Storytelling'
          )}
          feature3Title={T('Audio')}
          feature3Description={T(
            'Sound Design · Music Composition · Audio Post-Production'
          )}
        />

        <BehindTheScenes01
          heading1={T('Behind the Scenes')}
          content1={T(
            'Most of the magic happens where the camera isn’t pointed - shaping light, building sound layers, refining motion frame by frame.'
          )}
        />

        <ClosingStatement
          feature1Title={T('Let’s create something that lasts.')}
          feature1Description={T(
            'Work built with atmosphere, intention, and cinematic depth.'
          )}
        />

        <JeevanChandimalNewFooter
          link11={T('Home')}
          link41={T('Store')}
          link51={T('Membership')}
          link511={T('About')}
          link5111={T('Contact')}
          text16={T('Work')}
          text17={T('Film')}
          text18={T('Audio')}
          text19={T('Animation')}
          text161={T('Services')}
          text171={T('Film Production')}
          text181={T('Audio Production')}
          text191={T('Photography')}
          text192={T('Animation & Motion')}
          termsLink={T('Terms & Conditions')}
          cookiesLink={T('Cookies Policy')}
          privacyLink={T('Privacy Policy')}
          rootClassName="jeevan-chandimal-new-footerroot-class-name2"
        />
      </div>

      <style jsx>{`
        .about-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
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
