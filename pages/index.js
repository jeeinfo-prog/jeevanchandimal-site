import React, { Fragment } from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import HomePageHero from '../components/home-page-hero'
import HomeIntro from '../components/home-intro'
import SelectedWork from '../components/selected-work'
import HomeWork01 from '../components/home-work-01'
import Process01 from '../components/process-01'
import HomeFinalCTA from '../components/home-final-cta'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const Home = () => {
  return (
    <>
      <div className="home-container">
        <Head>
          <title>Jeevan Chandimal | Filmmaker & Visual Storyteller</title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />

          {/* Canonical (IMPORTANT: use your real domain) */}
          <link rel="canonical" href="https://jeevanchandimal.com/" />

          {/* Open Graph */}
          <meta
            property="og:title"
            content="Jeevan Chandimal | Filmmaker & Visual Storyteller"
          />
          <meta
            property="og:description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound."
          />
          <meta
            property="og:image"
            content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/1e052279-2879-4d4a-b576-0d545df1baa9/f8b288cf-c33a-4971-b301-c944c3ca6c1f?org_if_sml=1&force_format=original"
          />
          <meta property="og:url" content="https://jeevanchandimal.com/" />
          <meta property="og:type" content="website" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Jeevan Chandimal | Filmmaker & Visual Storyteller"
          />
          <meta
            name="twitter:description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound."
          />
          <meta
            name="twitter:image"
            content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/1e052279-2879-4d4a-b576-0d545df1baa9/f8b288cf-c33a-4971-b301-c944c3ca6c1f?org_if_sml=1&force_format=original"
          />
        </Head>

        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="home-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="home-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="home-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="home-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="home-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="home-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="home-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="home-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="home-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="home-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="home-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="home-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="home-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="home-text23">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="home-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="home-text25">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="home-text26">Photography</span>
            </Fragment>
          }
        ></JeevanChandimalNavi>

        <HomePageHero
          action3={
            <Fragment>
              <span className="home-text27">Explore Work</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="home-text28">
                Where image, motion, and sound become atmosphere.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="home-text29">Jeevan Chandimal</span>
            </Fragment>
          }
          heading11={
            <Fragment>
              <span className="home-text30">Filmmaker · Visual Storyteller</span>
            </Fragment>
          }
        ></HomePageHero>

        <HomeIntro
          heading={
            <Fragment>
              <span className="home-text31">Introduction</span>
            </Fragment>
          }
          content2={
            <Fragment>
              <span className="home-text32">
                <span>End-to-end visual production, built with cinematic intent.</span>
                <span>
                  Film, photography, sound, and animation - from concept to final
                  delivery.
                </span>
                <br></br>
                <span>
                  Every project is approached as a complete visual experience,
                  shaped with care, restraint, and attention to atmosphere.
                </span>
              </span>
            </Fragment>
          }
          heading2={
            <Fragment>
              <span className="home-text37">Film Production</span>
            </Fragment>
          }
          rootClassName="home-introroot-class-name"
        ></HomeIntro>

        <SelectedWork
          sectionTitle={
            <Fragment>
              <span className="home-text38">Selected Work</span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="home-text39">
                A curated selection of projects across film, photography, sound,
                and motion - each created with clarity, mood, and narrative
                presence.
              </span>
            </Fragment>
          }
        ></SelectedWork>

        <HomeWork01
          feature1Title={
            <Fragment>
              <span className="home-text40">Film Production</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="home-text41">Audio Production</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="home-text42">Animation</span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="home-text43">Photography</span>
            </Fragment>
          }
          rootClassName="home-work01root-class-name1"
          feature1Button={
            <Fragment>
              <span className="home-text44">Learn More</span>
            </Fragment>
          }
          feature2Button={
            <Fragment>
              <span className="home-text45">Discover Now</span>
            </Fragment>
          }
          feature3Button={
            <Fragment>
              <span className="home-text46">Get Support</span>
            </Fragment>
          }
          feature4Button={
            <Fragment>
              <span className="home-text47">Customize Your Experience</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="home-text48">
                Stories shaped through image, motion, and sound.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="home-text49">
                Sound designed to support emotion and presence.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="home-text50">
                Movement crafted with clarity, rhythm, and intent.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="home-text51">
                Still imagery with cinematic depth and atmosphere.
              </span>
            </Fragment>
          }
        ></HomeWork01>

        <Process01
          feature3Title={
            <Fragment>
              <span className="home-text52">Observation Over Noise</span>
            </Fragment>
          }
          rootClassName="process01root-class-name1"
          feature1Title2={
            <Fragment>
              <span className="home-text53">Process</span>
            </Fragment>
          }
          feature3Title1={
            <Fragment>
              <span className="home-text54">Craft &amp; Detail</span>
            </Fragment>
          }
          feature1Title11={
            <Fragment>
              <span className="home-text55">Concept First</span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="home-text56">
                I prefer quiet moments to forced gestures. Real presence over
                performance. Stillness often reveals more than motion.
              </span>
            </Fragment>
          }
          feature1Description2={
            <Fragment>
              <span className="home-text57">
                Every collaboration begins with intention. We define the
                atmosphere, the emotional direction, and the story before
                production begins.
              </span>
            </Fragment>
          }
          feature3Description1={
            <Fragment>
              <span className="home-text58">
                From lighting and composition to sound texture and pacing, every
                element is refined with care. Small decisions shape the final
                experience.
              </span>
            </Fragment>
          }
        ></Process01>

        <HomeFinalCTA
          action2={
            <Fragment>
              <span className="home-text59">Create Together</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="home-text60">
                Let’s create something with clarity, depth, and cinematic
                presence.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="home-text61">Have a project in mind?</span>
            </Fragment>
          }
          rootClassName="home-final-ct-aroot-class-name"
        ></HomeFinalCTA>

        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="home-text62">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="home-text63">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="home-text64">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="home-text65">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="home-text66">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="home-text67">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="home-text68">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="home-text69">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="home-text70">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="home-text71">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="home-text72">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="home-text73">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="home-text74">Animation &amp; Motion</span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="home-text75">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="home-text76">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="home-text77">Terms &amp; Conditions</span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="home-text78">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="home-text79">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name1"
        ></JeevanChandimalNewFooter>
      </div>

      <style jsx>
        {`
          .home-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .home-text10,
          .home-text11,
          .home-text12,
          .home-text13,
          .home-text14,
          .home-text15,
          .home-text16,
          .home-text17,
          .home-text18,
          .home-text19,
          .home-text20,
          .home-text21,
          .home-text22,
          .home-text23,
          .home-text24,
          .home-text25,
          .home-text26,
          .home-text27,
          .home-text28,
          .home-text29,
          .home-text30,
          .home-text31,
          .home-text32,
          .home-text37,
          .home-text38,
          .home-text39,
          .home-text40,
          .home-text41,
          .home-text42,
          .home-text43,
          .home-text44,
          .home-text45,
          .home-text46,
          .home-text47,
          .home-text48,
          .home-text49,
          .home-text50,
          .home-text51,
          .home-text52,
          .home-text53,
          .home-text54,
          .home-text55,
          .home-text56,
          .home-text57,
          .home-text58,
          .home-text59,
          .home-text60,
          .home-text61,
          .home-text62,
          .home-text63,
          .home-text64,
          .home-text65,
          .home-text66,
          .home-text67,
          .home-text68,
          .home-text69,
          .home-text70,
          .home-text71,
          .home-text72,
          .home-text73,
          .home-text74,
          .home-text75,
          .home-text76,
          .home-text77,
          .home-text78,
          .home-text79 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default Home
