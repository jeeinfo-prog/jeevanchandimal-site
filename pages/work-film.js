import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import WorkFilmHero from '../components/work-film-hero'
import FilmCategories from '../components/film-categories'
import FilmProductionText from '../components/film-production-text'
import WorkFilmProduction from '../components/work-film-production'
import WorkFilmCommercial from '../components/work-film-commercial'
import WorkFilmDocumentries from '../components/work-film-documentries'
import WorkFilmMusicVideo from '../components/work-film-music-video'
import WorkFilmShortFilm from '../components/work-film-short-film'
import SelectedFilmWork from '../components/selected-film-work'
import WorkFilmEndNote from '../components/work-film-end-note'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const WorkFilm = (props) => {
  return (
    <>
      <div className="work-film-container">
        <Head>
          <title>
            Work-Film - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Work-Film - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/work-film"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="work-film-text100">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="work-film-text101">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="work-film-text102">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="work-film-text103">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="work-film-text104">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="work-film-text105">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="work-film-text106">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="work-film-text107">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="work-film-text108">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="work-film-text109">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="work-film-text110">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="work-film-text111">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="work-film-text112">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="work-film-text113">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="work-film-text114">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="work-film-text115">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="work-film-text116">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name"
        ></JeevanChandimalNavi>
        <WorkFilmHero
          action3={
            <Fragment>
              <span className="work-film-text117">Explore Work</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="work-film-text118">
                Narrative-driven films where image, motion, and sound come
                together.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-film-text119">
                Cinematic work shaped by story, mood, and intention.
              </span>
            </Fragment>
          }
        ></WorkFilmHero>
        <FilmCategories
          feature1Title={
            <Fragment>
              <span className="work-film-text120">
                <span>Commercial</span>
                <br></br>
              </span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-film-text123">Documentary</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-film-text124">Music Videos</span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="work-film-text125">Short Films</span>
            </Fragment>
          }
          feature1Button={
            <Fragment>
              <span className="work-film-text126">Learn More</span>
            </Fragment>
          }
          feature2Button={
            <Fragment>
              <span className="work-film-text127">Discover More</span>
            </Fragment>
          }
          feature3Button={
            <Fragment>
              <span className="work-film-text128">Explore Now</span>
            </Fragment>
          }
          feature4Button={
            <Fragment>
              <span className="work-film-text129">See Portfolio</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-film-text130">
                Professional film production services tailored to your needs.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-film-text131">
                Customized audio production solutions for your projects.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-film-text132">
                Expertise in character animation and stunning graphics for your
                content.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="work-film-text133">
                Professional photography services to capture your moments
                beautifully.
              </span>
            </Fragment>
          }
        ></FilmCategories>
        <FilmProductionText
          feature1Title={
            <Fragment>
              <span className="work-film-text134">Film Production</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-film-text135">
                <span>
                  This collection presents cinematic work shaped through story,
                  atmosphere, and visual restraint. Each film is approached as a
                  complete narrative experience, where image, movement, sound,
                  and silence are treated as equal elements.
                </span>
                <br></br>
                <span>
                  The work spans commercial, documentary, short-form, and
                  music-driven storytelling. While formats vary, every project
                  is guided by the same intent — to create films that feel
                  grounded, purposeful, and emotionally present.
                </span>
              </span>
            </Fragment>
          }
        ></FilmProductionText>
        <WorkFilmProduction
          feature1Title={
            <Fragment>
              <span className="work-film-text139">Customized Solutions</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-film-text140">
                Experienced Professionals
              </span>
            </Fragment>
          }
          feature1Slogan={
            <Fragment>
              <span className="work-film-text141">Tailored to Your Needs</span>
            </Fragment>
          }
          feature2Slogan={
            <Fragment>
              <span className="work-film-text142">Experts in Every Field</span>
            </Fragment>
          }
          feature2Action2={
            <Fragment>
              <span className="work-film-text143">Secondary action</span>
            </Fragment>
          }
          feature1MainAction={
            <Fragment>
              <span className="work-film-text144">Explore Services</span>
            </Fragment>
          }
          feature2MainAction={
            <Fragment>
              <span className="work-film-text145">Meet Our Team</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-film-text146">
                We offer customized solutions for film, audio, animation, and
                photography services to meet your specific requirements.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-film-text147">
                Our team consists of experienced professionals in film
                production, audio production, animation &amp; graphics, and
                photography, ensuring high-quality results.
              </span>
            </Fragment>
          }
          feature1SecondaryAction={
            <Fragment>
              <span className="work-film-text148">Secondary action</span>
            </Fragment>
          }
        ></WorkFilmProduction>
        <WorkFilmCommercial
          text={
            <Fragment>
              <span className="work-film-text149">
                <span>
                  Brand-led films created with cinematic language rather than
                  advertising conventions. These projects focus on mood,
                  clarity, and narrative presence, translating brand identity
                  into visual stories that feel natural and considered.
                </span>
                <br></br>
                <span>
                  Each commercial is crafted to connect emotionally while
                  maintaining visual integrity across platforms.
                </span>
              </span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-film-text153">Commercial</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-film-text154">Commercial 01</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-film-text155">Commercial 02</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-film-text156">Commercial 03</span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="work-film-text157">Commercial 04</span>
            </Fragment>
          }
          feature1Button={
            <Fragment>
              <span className="work-film-text158">Learn More</span>
            </Fragment>
          }
          feature2Button={
            <Fragment>
              <span className="work-film-text159">Learn More</span>
            </Fragment>
          }
          feature3Button={
            <Fragment>
              <span className="work-film-text160">Learn More</span>
            </Fragment>
          }
          feature4Button={
            <Fragment>
              <span className="work-film-text161">Learn More</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-film-text162">
                Professional film production services tailored to your needs.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-film-text163">
                High-quality audio production services for your projects.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-film-text164">
                Creative animation and graphics solutions to enhance your
                content.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="work-film-text165">
                Professional photography services to capture your special
                moments.
              </span>
            </Fragment>
          }
        ></WorkFilmCommercial>
        <WorkFilmDocumentries
          content1={
            <Fragment>
              <span className="work-film-text166">
                <span>
                  Observational and story-driven documentary work rooted in
                  authenticity. These films prioritize real moments, human
                  presence, and environmental context, allowing stories to
                  unfold without forced direction.
                </span>
                <br></br>
                <span>
                  The emphasis is on patience, trust, and visual honesty.
                </span>
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-film-text170">Documentary</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-film-text171">Film Production</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-film-text172">Audio Production</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-film-text173">
                Animation &amp; Graphics
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-film-text174">
                Professional film production services tailored to your needs.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-film-text175">
                High-quality audio production services for a captivating sound
                experience.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-film-text176">
                Creative animation and graphics services to bring your ideas to
                life.
              </span>
            </Fragment>
          }
        ></WorkFilmDocumentries>
        <WorkFilmMusicVideo
          content1={
            <Fragment>
              <span className="work-film-text177">
                Music-driven visual pieces where rhythm, movement, and image
                work together as a unified experience. Each video is shaped to
                support the sound while maintaining cinematic structure and
                restraint.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-film-text178">Music Video</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-film-text179">Song 01</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-film-text180">Song 02</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-film-text181">Song 03</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-film-text182">
                Professional film production services tailored to your needs.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-film-text183">
                High-quality audio production services for a variety of
                projects.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-film-text184">
                Customized animation and graphics services to bring your ideas
                to life.
              </span>
            </Fragment>
          }
        ></WorkFilmMusicVideo>
        <WorkFilmShortFilm
          content1={
            <Fragment>
              <span className="work-film-text185">
                Narrative and conceptual short films developed around
                atmosphere, pacing, and emotional tone. These works explore
                character, space, and silence as storytelling tools, often
                blurring the line between narrative and visual study.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-film-text186">Short Films</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-film-text187">Film Production</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-film-text188">Audio Production</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-film-text189">Animation</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-film-text190">
                Professional film production services tailored to your needs.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-film-text191">
                High-quality audio production for a captivating auditory
                experience.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-film-text192">
                Bring your ideas to life with our expert animation services.
              </span>
            </Fragment>
          }
        ></WorkFilmShortFilm>
        <SelectedFilmWork
          content1={
            <Fragment>
              <span className="work-film-text193">
                A curated selection of commercial, documentary, and narrative
                projects — each built with atmosphere, clarity, and purpose.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-film-text194">Selected Film Work</span>
            </Fragment>
          }
        ></SelectedFilmWork>
        <WorkFilmEndNote
          content2={
            <Fragment>
              <span className="work-film-text195">
                Each project opens into a dedicated case study, presenting the
                film as a complete visual work.
              </span>
            </Fragment>
          }
          heading2={
            <Fragment>
              <span className="work-film-text196">Film Production</span>
            </Fragment>
          }
          rootClassName="work-film-end-noteroot-class-name"
        ></WorkFilmEndNote>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="work-film-text197">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="work-film-text198">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="work-film-text199">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="work-film-text200">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="work-film-text201">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="work-film-text202">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="work-film-text203">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="work-film-text204">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="work-film-text205">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="work-film-text206">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="work-film-text207">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="work-film-text208">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="work-film-text209">Animation &amp; Motion</span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="work-film-text210">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="work-film-text211">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="work-film-text212">Terms &amp; Conditions</span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="work-film-text213">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="work-film-text214">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name3"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .work-film-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .work-film-text100 {
            display: inline-block;
          }
          .work-film-text101 {
            display: inline-block;
          }
          .work-film-text102 {
            display: inline-block;
          }
          .work-film-text103 {
            display: inline-block;
          }
          .work-film-text104 {
            display: inline-block;
          }
          .work-film-text105 {
            display: inline-block;
          }
          .work-film-text106 {
            display: inline-block;
          }
          .work-film-text107 {
            display: inline-block;
          }
          .work-film-text108 {
            display: inline-block;
          }
          .work-film-text109 {
            display: inline-block;
          }
          .work-film-text110 {
            display: inline-block;
          }
          .work-film-text111 {
            display: inline-block;
          }
          .work-film-text112 {
            display: inline-block;
          }
          .work-film-text113 {
            display: inline-block;
          }
          .work-film-text114 {
            display: inline-block;
          }
          .work-film-text115 {
            display: inline-block;
          }
          .work-film-text116 {
            display: inline-block;
          }
          .work-film-text117 {
            display: inline-block;
          }
          .work-film-text118 {
            display: inline-block;
          }
          .work-film-text119 {
            display: inline-block;
          }
          .work-film-text120 {
            display: inline-block;
          }
          .work-film-text123 {
            display: inline-block;
          }
          .work-film-text124 {
            display: inline-block;
          }
          .work-film-text125 {
            display: inline-block;
          }
          .work-film-text126 {
            display: inline-block;
          }
          .work-film-text127 {
            display: inline-block;
          }
          .work-film-text128 {
            display: inline-block;
          }
          .work-film-text129 {
            display: inline-block;
          }
          .work-film-text130 {
            display: inline-block;
          }
          .work-film-text131 {
            display: inline-block;
          }
          .work-film-text132 {
            display: inline-block;
          }
          .work-film-text133 {
            display: inline-block;
          }
          .work-film-text134 {
            display: inline-block;
          }
          .work-film-text135 {
            display: inline-block;
          }
          .work-film-text139 {
            display: inline-block;
          }
          .work-film-text140 {
            display: inline-block;
          }
          .work-film-text141 {
            display: inline-block;
          }
          .work-film-text142 {
            display: inline-block;
          }
          .work-film-text143 {
            display: inline-block;
          }
          .work-film-text144 {
            display: inline-block;
          }
          .work-film-text145 {
            display: inline-block;
          }
          .work-film-text146 {
            display: inline-block;
          }
          .work-film-text147 {
            display: inline-block;
          }
          .work-film-text148 {
            display: inline-block;
          }
          .work-film-text149 {
            display: inline-block;
          }
          .work-film-text153 {
            display: inline-block;
          }
          .work-film-text154 {
            display: inline-block;
          }
          .work-film-text155 {
            display: inline-block;
          }
          .work-film-text156 {
            display: inline-block;
          }
          .work-film-text157 {
            display: inline-block;
          }
          .work-film-text158 {
            display: inline-block;
          }
          .work-film-text159 {
            display: inline-block;
          }
          .work-film-text160 {
            display: inline-block;
          }
          .work-film-text161 {
            display: inline-block;
          }
          .work-film-text162 {
            display: inline-block;
          }
          .work-film-text163 {
            display: inline-block;
          }
          .work-film-text164 {
            display: inline-block;
          }
          .work-film-text165 {
            display: inline-block;
          }
          .work-film-text166 {
            display: inline-block;
          }
          .work-film-text170 {
            display: inline-block;
          }
          .work-film-text171 {
            display: inline-block;
          }
          .work-film-text172 {
            display: inline-block;
          }
          .work-film-text173 {
            display: inline-block;
          }
          .work-film-text174 {
            display: inline-block;
          }
          .work-film-text175 {
            display: inline-block;
          }
          .work-film-text176 {
            display: inline-block;
          }
          .work-film-text177 {
            display: inline-block;
          }
          .work-film-text178 {
            display: inline-block;
          }
          .work-film-text179 {
            display: inline-block;
          }
          .work-film-text180 {
            display: inline-block;
          }
          .work-film-text181 {
            display: inline-block;
          }
          .work-film-text182 {
            display: inline-block;
          }
          .work-film-text183 {
            display: inline-block;
          }
          .work-film-text184 {
            display: inline-block;
          }
          .work-film-text185 {
            display: inline-block;
          }
          .work-film-text186 {
            display: inline-block;
          }
          .work-film-text187 {
            display: inline-block;
          }
          .work-film-text188 {
            display: inline-block;
          }
          .work-film-text189 {
            display: inline-block;
          }
          .work-film-text190 {
            display: inline-block;
          }
          .work-film-text191 {
            display: inline-block;
          }
          .work-film-text192 {
            display: inline-block;
          }
          .work-film-text193 {
            display: inline-block;
          }
          .work-film-text194 {
            display: inline-block;
          }
          .work-film-text195 {
            display: inline-block;
          }
          .work-film-text196 {
            display: inline-block;
          }
          .work-film-text197 {
            display: inline-block;
          }
          .work-film-text198 {
            display: inline-block;
          }
          .work-film-text199 {
            display: inline-block;
          }
          .work-film-text200 {
            display: inline-block;
          }
          .work-film-text201 {
            display: inline-block;
          }
          .work-film-text202 {
            display: inline-block;
          }
          .work-film-text203 {
            display: inline-block;
          }
          .work-film-text204 {
            display: inline-block;
          }
          .work-film-text205 {
            display: inline-block;
          }
          .work-film-text206 {
            display: inline-block;
          }
          .work-film-text207 {
            display: inline-block;
          }
          .work-film-text208 {
            display: inline-block;
          }
          .work-film-text209 {
            display: inline-block;
          }
          .work-film-text210 {
            display: inline-block;
          }
          .work-film-text211 {
            display: inline-block;
          }
          .work-film-text212 {
            display: inline-block;
          }
          .work-film-text213 {
            display: inline-block;
          }
          .work-film-text214 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default WorkFilm
