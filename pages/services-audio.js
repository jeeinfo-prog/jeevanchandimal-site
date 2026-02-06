import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import ServiceAudioHero from '../components/service-audio-hero'
import IntroductionAudioServices from '../components/introduction-audio-services'
import SelectedAudioWork from '../components/selected-audio-work'
import WhatIDoAudioServices from '../components/what-i-do-audio-services'
import HowIApproachAudio from '../components/how-i-approach-audio'
import WhoItsForAudio from '../components/who-its-for-audio'
import ServicesAudioFinalCTA from '../components/services-audio-final-cta'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const ServicesAudio = (props) => {
  return (
    <>
      <div className="services-audio-container">
        <Head>
          <title>
            Services-Audio - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Services-Audio - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/services-audio"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="services-audio-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="services-audio-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="services-audio-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="services-audio-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="services-audio-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="services-audio-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="services-audio-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="services-audio-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="services-audio-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="services-audio-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="services-audio-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="services-audio-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="services-audio-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="services-audio-text23">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="services-audio-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="services-audio-text25">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="services-audio-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name20"
        ></JeevanChandimalNavi>
        <ServiceAudioHero
          action3={
            <Fragment>
              <span className="services-audio-text27">Listen to Work</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="services-audio-text28">
                <span>
                  Audio treated as a storytelling layer - not an afterthought.
                </span>
                <br></br>
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-audio-text31">
                <span>Sound designed to deepen emotion and presence.</span>
                <br></br>
              </span>
            </Fragment>
          }
          rootClassName="service-audio-heroroot-class-name"
        ></ServiceAudioHero>
        <IntroductionAudioServices
          feature1Title={
            <Fragment>
              <span className="services-audio-text34">Introduction</span>
            </Fragment>
          }
          rootClassName="introduction-audio-servicesroot-class-name"
          feature1Description={
            <Fragment>
              <span className="services-audio-text35">
                <span>
                  Sound shapes how a story is felt. I approach audio with the
                  same care as image and motion, focusing on texture, space, and
                  emotional impact.
                </span>
                <br></br>
                <span>
                  From subtle atmospheres to full compositions, audio is crafted
                  to support narrative, rhythm, and cinematic flow.
                </span>
              </span>
            </Fragment>
          }
        ></IntroductionAudioServices>
        <SelectedAudioWork
          content1={
            <Fragment>
              <span className="services-audio-text39">
                <span>
                  A selection of sound design and music created for film, visual
                  projects, and immersive experiences.
                </span>
                <br></br>
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-audio-text42">Selected Audio Work</span>
            </Fragment>
          }
          rootClassName="selected-audio-workroot-class-name"
        ></SelectedAudioWork>
        <WhatIDoAudioServices
          sectionTitle={
            <Fragment>
              <span className="services-audio-text43">What I Do</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="services-audio-text44">Sound Design</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="services-audio-text45">
                <span>Music Composition</span>
                <br></br>
              </span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="services-audio-text48">
                Audio Post-Production
              </span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="services-audio-text49">
                <span>Film &amp; Visual Audio</span>
                <br></br>
              </span>
            </Fragment>
          }
          rootClassName="what-i-do-audio-servicesroot-class-name"
          feature1Button={
            <Fragment>
              <span className="services-audio-text52">Learn More</span>
            </Fragment>
          }
          feature2Button={
            <Fragment>
              <span className="services-audio-text53">Discover More</span>
            </Fragment>
          }
          feature3Button={
            <Fragment>
              <span className="services-audio-text54">Explore Now</span>
            </Fragment>
          }
          feature4Button={
            <Fragment>
              <span className="services-audio-text55">View Portfolio</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="services-audio-text56">
                Atmospheric soundscapes that add depth and realism to visual
                stories.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="services-audio-text57">
                <span>
                  Original compositions built around mood, pacing, and emotional
                  tone.
                </span>
                <br></br>
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="services-audio-text60">
                Editing, mixing, and refinement for clarity, balance, and
                impact.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="services-audio-text61">
                Sound created specifically to complement cinematic visuals.
              </span>
            </Fragment>
          }
        ></WhatIDoAudioServices>
        <HowIApproachAudio
          feature1Title={
            <Fragment>
              <span className="services-audio-text62">
                How I Approach Audio
              </span>
            </Fragment>
          }
          rootClassName="how-i-approach-audioroot-class-name"
          feature1Description={
            <Fragment>
              <span className="services-audio-text63">
                <span>
                  I listen before I design. Silence, space, and restraint are as
                  important as sound itself.
                </span>
                <br></br>
                <span>
                  Every layer is shaped to feel intentional — enhancing the
                  story without overpowering it.
                </span>
              </span>
            </Fragment>
          }
        ></HowIApproachAudio>
        <WhoItsForAudio
          content1={
            <Fragment>
              <span className="services-audio-text67">
                I collaborate with filmmakers, visual artists, and studios who
                understand the power of sound in storytelling.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-audio-text68">Who It’s For</span>
            </Fragment>
          }
          rootClassName="who-its-for-audioroot-class-name"
        ></WhoItsForAudio>
        <ServicesAudioFinalCTA
          action2={
            <Fragment>
              <span className="services-audio-text69">Create Together</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="services-audio-text70">
                Let’s shape it with depth, texture, and emotional clarity.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-audio-text71">
                Have a story that needs sound?
              </span>
            </Fragment>
          }
          rootClassName="services-audio-final-ct-aroot-class-name"
        ></ServicesAudioFinalCTA>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="services-audio-text72">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="services-audio-text73">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="services-audio-text74">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="services-audio-text75">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="services-audio-text76">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="services-audio-text77">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="services-audio-text78">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="services-audio-text79">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="services-audio-text80">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="services-audio-text81">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="services-audio-text82">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="services-audio-text83">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="services-audio-text84">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="services-audio-text85">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="services-audio-text86">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="services-audio-text87">
                Terms &amp; Conditions
              </span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="services-audio-text88">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="services-audio-text89">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name19"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .services-audio-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .services-audio-text10 {
            display: inline-block;
          }
          .services-audio-text11 {
            display: inline-block;
          }
          .services-audio-text12 {
            display: inline-block;
          }
          .services-audio-text13 {
            display: inline-block;
          }
          .services-audio-text14 {
            display: inline-block;
          }
          .services-audio-text15 {
            display: inline-block;
          }
          .services-audio-text16 {
            display: inline-block;
          }
          .services-audio-text17 {
            display: inline-block;
          }
          .services-audio-text18 {
            display: inline-block;
          }
          .services-audio-text19 {
            display: inline-block;
          }
          .services-audio-text20 {
            display: inline-block;
          }
          .services-audio-text21 {
            display: inline-block;
          }
          .services-audio-text22 {
            display: inline-block;
          }
          .services-audio-text23 {
            display: inline-block;
          }
          .services-audio-text24 {
            display: inline-block;
          }
          .services-audio-text25 {
            display: inline-block;
          }
          .services-audio-text26 {
            display: inline-block;
          }
          .services-audio-text27 {
            display: inline-block;
          }
          .services-audio-text28 {
            display: inline-block;
          }
          .services-audio-text31 {
            display: inline-block;
          }
          .services-audio-text34 {
            display: inline-block;
          }
          .services-audio-text35 {
            display: inline-block;
          }
          .services-audio-text39 {
            display: inline-block;
          }
          .services-audio-text42 {
            display: inline-block;
          }
          .services-audio-text43 {
            display: inline-block;
          }
          .services-audio-text44 {
            display: inline-block;
          }
          .services-audio-text45 {
            display: inline-block;
          }
          .services-audio-text48 {
            display: inline-block;
          }
          .services-audio-text49 {
            display: inline-block;
          }
          .services-audio-text52 {
            display: inline-block;
          }
          .services-audio-text53 {
            display: inline-block;
          }
          .services-audio-text54 {
            display: inline-block;
          }
          .services-audio-text55 {
            display: inline-block;
          }
          .services-audio-text56 {
            display: inline-block;
          }
          .services-audio-text57 {
            display: inline-block;
          }
          .services-audio-text60 {
            display: inline-block;
          }
          .services-audio-text61 {
            display: inline-block;
          }
          .services-audio-text62 {
            display: inline-block;
          }
          .services-audio-text63 {
            display: inline-block;
          }
          .services-audio-text67 {
            display: inline-block;
          }
          .services-audio-text68 {
            display: inline-block;
          }
          .services-audio-text69 {
            display: inline-block;
          }
          .services-audio-text70 {
            display: inline-block;
          }
          .services-audio-text71 {
            display: inline-block;
          }
          .services-audio-text72 {
            display: inline-block;
          }
          .services-audio-text73 {
            display: inline-block;
          }
          .services-audio-text74 {
            display: inline-block;
          }
          .services-audio-text75 {
            display: inline-block;
          }
          .services-audio-text76 {
            display: inline-block;
          }
          .services-audio-text77 {
            display: inline-block;
          }
          .services-audio-text78 {
            display: inline-block;
          }
          .services-audio-text79 {
            display: inline-block;
          }
          .services-audio-text80 {
            display: inline-block;
          }
          .services-audio-text81 {
            display: inline-block;
          }
          .services-audio-text82 {
            display: inline-block;
          }
          .services-audio-text83 {
            display: inline-block;
          }
          .services-audio-text84 {
            display: inline-block;
          }
          .services-audio-text85 {
            display: inline-block;
          }
          .services-audio-text86 {
            display: inline-block;
          }
          .services-audio-text87 {
            display: inline-block;
          }
          .services-audio-text88 {
            display: inline-block;
          }
          .services-audio-text89 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default ServicesAudio
