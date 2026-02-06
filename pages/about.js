import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNew from '../components/jeevan-chandimal-new'
import MyStory from '../components/my-story'
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

const About = (props) => {
  return (
    <>
      <div className="about-container">
        <Head>
          <title>
            About - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="About - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
          />
          <meta
            property="og:description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound."
          />
          <meta
            property="og:image"
            content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/1e052279-2879-4d4a-b576-0d545df1baa9/f8b288cf-c33a-4971-b301-c944c3ca6c1f?org_if_sml=1&amp;force_format=original"
          />
          <link
            rel="canonical"
            href="https://firm-these-stork-6nk3lv.teleporthq.app/about"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="about-text100">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="about-text101">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="about-text102">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="about-text103">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="about-text104">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="about-text105">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="about-text106">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="about-text107">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="about-text108">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="about-text109">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="about-text110">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="about-text111">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="about-text112">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="about-text113">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="about-text114">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="about-text115">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="about-text116">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name3"
        ></JeevanChandimalNavi>
        <JeevanChandimalNew
          action3={
            <Fragment>
              <span className="about-text117">Get Started</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="about-text118">
                Where image, motion, and sound become atmosphere.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="about-text119">Jeevan Chandimal</span>
            </Fragment>
          }
          heading11={
            <Fragment>
              <span className="about-text120">
                Filmmaker · Visual Storyteller
              </span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-newroot-class-name"
        ></JeevanChandimalNew>
        <MyStory
          feature1Title={
            <Fragment>
              <span className="about-text121">My Story</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="about-text122">
                <span>
                  I began with photography, drawn to light, mood, and quiet
                  human moments. What started as capturing frames slowly
                  expanded into motion, then sound, then full visual worlds
                  Curiosity led the way - from still images to moving stories,
                  from visuals to the textures of audio.
                </span>
                <br></br>
                <br></br>
                <span>
                  Over time, that exploration shaped a multidisciplinary
                  approach. Today, every project I create blends visual
                  composition, motion, and sound into one cohesive language -
                  because powerful storytelling doesn’t live in just one medium.
                </span>
              </span>
            </Fragment>
          }
        ></MyStory>
        <MyStoryNew
          feature1Title={
            <Fragment>
              <span className="about-text127">My Story</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="about-text128">
                I’m Jeevan Chandimal - a filmmaker and visual storyteller
                working across film, photography, sound, and motion.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="about-text129">
                <span>I don’t approach projects as separate disciplines.</span>
                <br></br>
                <span>
                  Image, movement, and sound are treated as a single language -
                  developed together, shaped with intention, and refined through
                  atmosphere.
                </span>
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="about-text133">
                <span>
                  My work is built on stillness, observation, and control.
                </span>
                <br></br>
                <span>Before a frame is captured, the mood is defined.</span>
                <br></br>
                <span>Before a camera moves, the reason is clear.</span>
                <br></br>
                <span>Before sound is added, space is considered.</span>
              </span>
            </Fragment>
          }
          feature3Description1={
            <Fragment>
              <span className="about-text141">
                <span>Every project begins with a concept - not a format.</span>
                <br></br>
                <span>
                  Whether it becomes a film, a photograph, a sound-driven piece,
                  or a motion sequence, the foundation is always the same:
                  story, tone, and presence.
                </span>
              </span>
            </Fragment>
          }
        ></MyStoryNew>
        <ACinematicApproach
          feature1Title={
            <Fragment>
              <span className="about-text145">A Cinematic Approach</span>
            </Fragment>
          }
          rootClassName="a-cinematic-approachroot-class-name"
          feature1Description={
            <Fragment>
              <span className="about-text146">
                <span>
                  I work with a film-led mindset, even when the output is still
                  imagery or sound.
                </span>
                <br></br>
                <span>Lighting is treated as narrative.</span>
                <br></br>
                <span>Movement is deliberate, never decorative.</span>
                <br></br>
                <span>
                  Sound is designed to support emotion, not overwhelm it.
                </span>
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="about-text154">
                This approach allows each project to feel cohesive - not
                assembled.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="about-text155">
                <span>
                  Film, photography, audio, and animation are developed side by
                  side, not added in layers.
                </span>
                <br></br>
                <span>
                  The result is work that feels considered, restrained, and
                  immersive.
                </span>
              </span>
            </Fragment>
          }
        ></ACinematicApproach>
        <Process01
          feature3Title={
            <Fragment>
              <span className="about-text159">Observation Over Noise</span>
            </Fragment>
          }
          feature1Title2={
            <Fragment>
              <span className="about-text160">Process</span>
            </Fragment>
          }
          feature3Title1={
            <Fragment>
              <span className="about-text161">Craft &amp; Detail</span>
            </Fragment>
          }
          feature1Title11={
            <Fragment>
              <span className="about-text162">Concept First</span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="about-text163">
                I prefer quiet moments to forced gestures. Real presence over
                performance. Stillness often reveals more than motion.
              </span>
            </Fragment>
          }
          feature1Description2={
            <Fragment>
              <span className="about-text164">
                Every collaboration begins with intention. We define the
                atmosphere, the emotional direction, and the story before
                production begins.
              </span>
            </Fragment>
          }
          feature3Description1={
            <Fragment>
              <span className="about-text165">
                From lighting and composition to sound texture and pacing, every
                element is refined with care. Small decisions shape the final
                experience.
              </span>
            </Fragment>
          }
        ></Process01>
        <TheWork
          feature1Title={
            <Fragment>
              <span className="about-text166">The Work</span>
            </Fragment>
          }
          rootClassName="the-workroot-class-name"
          feature1Description={
            <Fragment>
              <span className="about-text167">
                My projects range across narrative film, documentary, commercial
                work, editorial photography, sound design, and motion pieces.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="about-text168">
                <span>Some are expansive.</span>
                <br></br>
                <span>Some are minimal.</span>
                <br></br>
                <span>All are approached as complete visual experiences.</span>
                <br></br>
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="about-text175">
                I work both independently and in collaboration, depending on the
                scale and needs of the project. Each production is built
                intentionally - with the right tools, the right pace, and the
                right team.
              </span>
            </Fragment>
          }
        ></TheWork>
        <Collaboration
          feature1Title={
            <Fragment>
              <span className="about-text176">Collaboration</span>
            </Fragment>
          }
          rootClassName="collaborationroot-class-name"
          feature1Description={
            <Fragment>
              <span className="about-text177">
                I work with individuals, brands, and agencies who value clarity,
                mood, and storytelling over volume.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="about-text178">
                Projects are selected carefully to ensure focus and quality at
                every stage — from concept through final delivery.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="about-text179">
                If you’re looking for work that feels cinematic, grounded, and
                thoughtfully crafted, we’re likely aligned.
              </span>
            </Fragment>
          }
        ></Collaboration>
        <Philosophy
          feature1Title={
            <Fragment>
              <span className="about-text180">Philosophy</span>
            </Fragment>
          }
          rootClassName="philosophyroot-class-name"
          feature1Description={
            <Fragment>
              <span className="about-text181">
                I work with individuals, brands, and agencies who value clarity,
                mood, and storytelling over volume.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="about-text182">
                Whether it’s a film, a photograph, or a soundscape, the goal is
                the same - create work that carries emotion, texture, and
                presence. Story over spectacle. Mood over noise. Meaning over
                excess.
              </span>
            </Fragment>
          }
        ></Philosophy>
        <Availability
          action1={
            <Fragment>
              <span className="about-text183">Get in Touch</span>
            </Fragment>
          }
          action2={
            <Fragment>
              <span className="about-text184">Contact Me</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="about-text185">
                If you’d like to collaborate or discuss an idea, feel free to
                reach out.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="about-text186">Availability</span>
            </Fragment>
          }
          heading11={
            <Fragment>
              <span className="about-text187">
                Available for select projects.
              </span>
            </Fragment>
          }
        ></Availability>
        <SkillsOverview
          content1={
            <Fragment>
              <span className="about-text188">
                From concept to final delivery, I handle the full creative
                process - ensuring every element works together as one voice.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="about-text189">Skills Overview</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="about-text190">Visual</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="about-text191">Motion</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="about-text192">Audio</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="about-text193">
                Cinematography · Photography · Color Grading · Visual Direction
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="about-text194">
                Editing · Animation · Motion Graphics · Visual Storytelling
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="about-text195">
                Sound Design · Music Composition · Audio Post-Production
              </span>
            </Fragment>
          }
        ></SkillsOverview>
        <BehindTheScenes01
          content1={
            <Fragment>
              <span className="about-text196">
                Most of the magic happens where the camera isn’t pointed -
                shaping light, building sound layers, refining motion frame by
                frame. The process is hands-on, detail-driven, and focused on
                turning ideas into crafted visual experiences.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="about-text197">Behind the Scenes</span>
            </Fragment>
          }
        ></BehindTheScenes01>
        <ClosingStatement
          feature1Title={
            <Fragment>
              <span className="about-text198">
                Let’s create something that lasts.
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="about-text199">
                I create work that lives beyond the screen - projects built with
                atmosphere, intention, and cinematic depth.
              </span>
            </Fragment>
          }
        ></ClosingStatement>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="about-text200">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="about-text201">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="about-text202">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="about-text203">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="about-text204">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="about-text205">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="about-text206">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="about-text207">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="about-text208">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="about-text209">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="about-text210">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="about-text211">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="about-text212">Animation &amp; Motion</span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="about-text213">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="about-text214">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="about-text215">Terms &amp; Conditions</span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="about-text216">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="about-text217">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name2"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .about-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .about-text100 {
            display: inline-block;
          }
          .about-text101 {
            display: inline-block;
          }
          .about-text102 {
            display: inline-block;
          }
          .about-text103 {
            display: inline-block;
          }
          .about-text104 {
            display: inline-block;
          }
          .about-text105 {
            display: inline-block;
          }
          .about-text106 {
            display: inline-block;
          }
          .about-text107 {
            display: inline-block;
          }
          .about-text108 {
            display: inline-block;
          }
          .about-text109 {
            display: inline-block;
          }
          .about-text110 {
            display: inline-block;
          }
          .about-text111 {
            display: inline-block;
          }
          .about-text112 {
            display: inline-block;
          }
          .about-text113 {
            display: inline-block;
          }
          .about-text114 {
            display: inline-block;
          }
          .about-text115 {
            display: inline-block;
          }
          .about-text116 {
            display: inline-block;
          }
          .about-text117 {
            display: inline-block;
          }
          .about-text118 {
            display: inline-block;
          }
          .about-text119 {
            display: inline-block;
          }
          .about-text120 {
            display: inline-block;
          }
          .about-text121 {
            display: inline-block;
          }
          .about-text122 {
            display: inline-block;
            text-align: left;
          }
          .about-text127 {
            display: inline-block;
          }
          .about-text128 {
            display: inline-block;
          }
          .about-text129 {
            display: inline-block;
          }
          .about-text133 {
            display: inline-block;
          }
          .about-text141 {
            display: inline-block;
          }
          .about-text145 {
            display: inline-block;
          }
          .about-text146 {
            display: inline-block;
          }
          .about-text154 {
            display: inline-block;
          }
          .about-text155 {
            display: inline-block;
          }
          .about-text159 {
            display: inline-block;
          }
          .about-text160 {
            display: inline-block;
          }
          .about-text161 {
            display: inline-block;
          }
          .about-text162 {
            display: inline-block;
          }
          .about-text163 {
            display: inline-block;
          }
          .about-text164 {
            display: inline-block;
          }
          .about-text165 {
            display: inline-block;
          }
          .about-text166 {
            display: inline-block;
          }
          .about-text167 {
            display: inline-block;
          }
          .about-text168 {
            display: inline-block;
          }
          .about-text175 {
            display: inline-block;
          }
          .about-text176 {
            display: inline-block;
          }
          .about-text177 {
            display: inline-block;
          }
          .about-text178 {
            display: inline-block;
          }
          .about-text179 {
            display: inline-block;
          }
          .about-text180 {
            display: inline-block;
          }
          .about-text181 {
            display: inline-block;
          }
          .about-text182 {
            display: inline-block;
          }
          .about-text183 {
            display: inline-block;
          }
          .about-text184 {
            display: inline-block;
          }
          .about-text185 {
            display: inline-block;
          }
          .about-text186 {
            display: inline-block;
          }
          .about-text187 {
            display: inline-block;
          }
          .about-text188 {
            display: inline-block;
          }
          .about-text189 {
            display: inline-block;
          }
          .about-text190 {
            display: inline-block;
          }
          .about-text191 {
            display: inline-block;
          }
          .about-text192 {
            display: inline-block;
          }
          .about-text193 {
            display: inline-block;
          }
          .about-text194 {
            display: inline-block;
          }
          .about-text195 {
            display: inline-block;
          }
          .about-text196 {
            display: inline-block;
          }
          .about-text197 {
            display: inline-block;
          }
          .about-text198 {
            display: inline-block;
          }
          .about-text199 {
            display: inline-block;
          }
          .about-text200 {
            display: inline-block;
          }
          .about-text201 {
            display: inline-block;
          }
          .about-text202 {
            display: inline-block;
          }
          .about-text203 {
            display: inline-block;
          }
          .about-text204 {
            display: inline-block;
          }
          .about-text205 {
            display: inline-block;
          }
          .about-text206 {
            display: inline-block;
          }
          .about-text207 {
            display: inline-block;
          }
          .about-text208 {
            display: inline-block;
          }
          .about-text209 {
            display: inline-block;
          }
          .about-text210 {
            display: inline-block;
          }
          .about-text211 {
            display: inline-block;
          }
          .about-text212 {
            display: inline-block;
          }
          .about-text213 {
            display: inline-block;
          }
          .about-text214 {
            display: inline-block;
          }
          .about-text215 {
            display: inline-block;
          }
          .about-text216 {
            display: inline-block;
          }
          .about-text217 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default About
