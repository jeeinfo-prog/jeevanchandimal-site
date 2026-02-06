import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import ServiceFilmHero from '../components/service-film-hero'
import IntroductionFilmServices from '../components/introduction-film-services'
import SelectedFilmWork from '../components/selected-film-work'
import WhatIDoFilmServices from '../components/what-i-do-film-services'
import HowIApproachFilm from '../components/how-i-approach-film'
import ServiceFilmProcess from '../components/service-film-process'
import WhoItsForFilm from '../components/who-its-for-film'
import ServicesFilmFinalCTA from '../components/services-film-final-cta'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const ServicesFilmProduction = (props) => {
  return (
    <>
      <div className="services-film-production-container">
        <Head>
          <title>
            Services-Film-Production - Jeevan Chandimal | Filmmaker & Visual
            Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Services-Film-Production - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/services-film-production"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="services-film-production-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="services-film-production-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="services-film-production-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="services-film-production-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="services-film-production-text14">
                Membership
              </span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="services-film-production-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="services-film-production-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="services-film-production-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="services-film-production-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="services-film-production-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="services-film-production-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="services-film-production-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="services-film-production-text22">
                Film Production
              </span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="services-film-production-text23">
                Audio Production
              </span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="services-film-production-text24">
                Photography
              </span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="services-film-production-text25">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="services-film-production-text26">
                Photography
              </span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name11"
        ></JeevanChandimalNavi>
        <ServiceFilmHero
          action3={
            <Fragment>
              <span className="services-film-production-text27">
                Create Together
              </span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="services-film-production-text28">
                Film-led visual production where image, motion, and sound work
                as one - from concept to final delivery.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-film-production-text29">
                Cinematic films crafted with story, mood, and precision.
              </span>
            </Fragment>
          }
        ></ServiceFilmHero>
        <IntroductionFilmServices
          feature1Title={
            <Fragment>
              <span className="services-film-production-text30">
                Introduction
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="services-film-production-text31">
                <span>
                  I offer end-to-end film production shaped by cinematic intent.
                  Every project is approached as a complete visual experience -
                  carefully composed, emotionally grounded, and refined through
                  sound, movement, and pacing.
                </span>
                <br></br>
                <span>
                  From early concept development to final cut, I work across the
                  full filmmaking process to create films that feel intentional,
                  immersive, and lasting.
                </span>
              </span>
            </Fragment>
          }
        ></IntroductionFilmServices>
        <SelectedFilmWork
          content1={
            <Fragment>
              <span className="services-film-production-text35">
                A curated selection of commercial, documentary, and narrative
                projects — each built with atmosphere, clarity, and purpose.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-film-production-text36">
                Sample Projects
              </span>
            </Fragment>
          }
          rootClassName="selected-film-workroot-class-name"
        ></SelectedFilmWork>
        <WhatIDoFilmServices
          sectionTitle={
            <Fragment>
              <span className="services-film-production-text37">What I Do</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="services-film-production-text38">
                Commercials &amp; Brand Films
              </span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="services-film-production-text39">
                Documentary Films
              </span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="services-film-production-text40">
                Short Films &amp; Visual Stories
              </span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="services-film-production-text41">
                Post-Production &amp; Finishing
              </span>
            </Fragment>
          }
          feature1Button={
            <Fragment>
              <span className="services-film-production-text42">
                Learn More
              </span>
            </Fragment>
          }
          feature2Button={
            <Fragment>
              <span className="services-film-production-text43">
                Discover More
              </span>
            </Fragment>
          }
          feature3Button={
            <Fragment>
              <span className="services-film-production-text44">
                Explore Now
              </span>
            </Fragment>
          }
          feature4Button={
            <Fragment>
              <span className="services-film-production-text45">
                View Portfolio
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="services-film-production-text46">
                Narrative-driven films that translate brand identity into
                cinematic storytelling.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="services-film-production-text47">
                Observational, story-led documentaries focused on authenticity
                and human moments.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="services-film-production-text48">
                Conceptual and narrative films built around mood, rhythm, and
                emotion.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="services-film-production-text49">
                Editing, sound, and color grading shaped to complete the
                cinematic experience.
              </span>
            </Fragment>
          }
        ></WhatIDoFilmServices>
        <HowIApproachFilm
          feature1Title={
            <Fragment>
              <span className="services-film-production-text50">
                How I Approach Film
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="services-film-production-text51">
                <span>
                  Story comes first. Before cameras, equipment, or timelines,
                  the focus is always on meaning, mood, and visual language.
                </span>
                <br></br>
                <span>
                  I treat film as a layered experience — where composition,
                  movement, sound, and silence work together. Every choice is
                  made to serve the story, not the spectacle.
                </span>
              </span>
            </Fragment>
          }
        ></HowIApproachFilm>
        <ServiceFilmProcess
          feature3Title={
            <Fragment>
              <span className="services-film-production-text55">
                Visual Direction
              </span>
            </Fragment>
          }
          rootClassName="service-film-processroot-class-name"
          feature1Title2={
            <Fragment>
              <span className="services-film-production-text56">Process</span>
            </Fragment>
          }
          feature3Title1={
            <Fragment>
              <span className="services-film-production-text57">
                Production &amp; Post
              </span>
            </Fragment>
          }
          feature1Title11={
            <Fragment>
              <span className="services-film-production-text58">
                Discovery &amp; Concept
              </span>
            </Fragment>
          }
          feature3Title11={
            <Fragment>
              <span className="services-film-production-text59">
                Final Delivery
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="services-film-production-text60">
                Shaping the look, rhythm, and cinematic language of the film.
              </span>
            </Fragment>
          }
          feature1Description2={
            <Fragment>
              <span className="services-film-production-text61">
                Understanding the idea, intention, and emotional direction of
                the project.
              </span>
            </Fragment>
          }
          feature3Description1={
            <Fragment>
              <span className="services-film-production-text62">
                Careful execution through filming, editing, sound design, and
                grading.
              </span>
            </Fragment>
          }
          feature3Description11={
            <Fragment>
              <span className="services-film-production-text63">
                A refined, complete film ready for its intended audience and
                platform.
              </span>
            </Fragment>
          }
        ></ServiceFilmProcess>
        <WhoItsForFilm
          content1={
            <Fragment>
              <span className="services-film-production-text64">
                I work with brands, agencies, filmmakers, and individuals who
                value craft, atmosphere, and intentional storytelling — and who
                see film as more than just content.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-film-production-text65">
                Who It’s For
              </span>
            </Fragment>
          }
        ></WhoItsForFilm>
        <ServicesFilmFinalCTA
          action2={
            <Fragment>
              <span className="services-film-production-text66">
                Create Together
              </span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="services-film-production-text67">
                Let’s create something with clarity, depth, and cinematic
                presence.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-film-production-text68">
                Have a project in mind?
              </span>
            </Fragment>
          }
        ></ServicesFilmFinalCTA>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="services-film-production-text69">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="services-film-production-text70">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="services-film-production-text71">
                Membership
              </span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="services-film-production-text72">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="services-film-production-text73">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="services-film-production-text74">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="services-film-production-text75">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="services-film-production-text76">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="services-film-production-text77">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="services-film-production-text78">
                Film Production
              </span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="services-film-production-text79">
                Audio Production
              </span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="services-film-production-text80">
                Photography
              </span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="services-film-production-text81">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="services-film-production-text82">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="services-film-production-text83">
                Photography
              </span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="services-film-production-text84">
                Terms &amp; Conditions
              </span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="services-film-production-text85">
                Cookies Policy
              </span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="services-film-production-text86">
                Privacy Policy
              </span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name12"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .services-film-production-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .services-film-production-text10 {
            display: inline-block;
          }
          .services-film-production-text11 {
            display: inline-block;
          }
          .services-film-production-text12 {
            display: inline-block;
          }
          .services-film-production-text13 {
            display: inline-block;
          }
          .services-film-production-text14 {
            display: inline-block;
          }
          .services-film-production-text15 {
            display: inline-block;
          }
          .services-film-production-text16 {
            display: inline-block;
          }
          .services-film-production-text17 {
            display: inline-block;
          }
          .services-film-production-text18 {
            display: inline-block;
          }
          .services-film-production-text19 {
            display: inline-block;
          }
          .services-film-production-text20 {
            display: inline-block;
          }
          .services-film-production-text21 {
            display: inline-block;
          }
          .services-film-production-text22 {
            display: inline-block;
          }
          .services-film-production-text23 {
            display: inline-block;
          }
          .services-film-production-text24 {
            display: inline-block;
          }
          .services-film-production-text25 {
            display: inline-block;
          }
          .services-film-production-text26 {
            display: inline-block;
          }
          .services-film-production-text27 {
            display: inline-block;
          }
          .services-film-production-text28 {
            display: inline-block;
          }
          .services-film-production-text29 {
            display: inline-block;
          }
          .services-film-production-text30 {
            display: inline-block;
          }
          .services-film-production-text31 {
            display: inline-block;
          }
          .services-film-production-text35 {
            display: inline-block;
          }
          .services-film-production-text36 {
            display: inline-block;
          }
          .services-film-production-text37 {
            display: inline-block;
          }
          .services-film-production-text38 {
            display: inline-block;
          }
          .services-film-production-text39 {
            display: inline-block;
          }
          .services-film-production-text40 {
            display: inline-block;
          }
          .services-film-production-text41 {
            display: inline-block;
          }
          .services-film-production-text42 {
            display: inline-block;
          }
          .services-film-production-text43 {
            display: inline-block;
          }
          .services-film-production-text44 {
            display: inline-block;
          }
          .services-film-production-text45 {
            display: inline-block;
          }
          .services-film-production-text46 {
            display: inline-block;
          }
          .services-film-production-text47 {
            display: inline-block;
          }
          .services-film-production-text48 {
            display: inline-block;
          }
          .services-film-production-text49 {
            display: inline-block;
          }
          .services-film-production-text50 {
            display: inline-block;
          }
          .services-film-production-text51 {
            display: inline-block;
          }
          .services-film-production-text55 {
            display: inline-block;
          }
          .services-film-production-text56 {
            display: inline-block;
          }
          .services-film-production-text57 {
            display: inline-block;
          }
          .services-film-production-text58 {
            display: inline-block;
          }
          .services-film-production-text59 {
            display: inline-block;
          }
          .services-film-production-text60 {
            display: inline-block;
          }
          .services-film-production-text61 {
            display: inline-block;
          }
          .services-film-production-text62 {
            display: inline-block;
          }
          .services-film-production-text63 {
            display: inline-block;
          }
          .services-film-production-text64 {
            display: inline-block;
          }
          .services-film-production-text65 {
            display: inline-block;
          }
          .services-film-production-text66 {
            display: inline-block;
          }
          .services-film-production-text67 {
            display: inline-block;
          }
          .services-film-production-text68 {
            display: inline-block;
          }
          .services-film-production-text69 {
            display: inline-block;
          }
          .services-film-production-text70 {
            display: inline-block;
          }
          .services-film-production-text71 {
            display: inline-block;
          }
          .services-film-production-text72 {
            display: inline-block;
          }
          .services-film-production-text73 {
            display: inline-block;
          }
          .services-film-production-text74 {
            display: inline-block;
          }
          .services-film-production-text75 {
            display: inline-block;
          }
          .services-film-production-text76 {
            display: inline-block;
          }
          .services-film-production-text77 {
            display: inline-block;
          }
          .services-film-production-text78 {
            display: inline-block;
          }
          .services-film-production-text79 {
            display: inline-block;
          }
          .services-film-production-text80 {
            display: inline-block;
          }
          .services-film-production-text81 {
            display: inline-block;
          }
          .services-film-production-text82 {
            display: inline-block;
          }
          .services-film-production-text83 {
            display: inline-block;
          }
          .services-film-production-text84 {
            display: inline-block;
          }
          .services-film-production-text85 {
            display: inline-block;
          }
          .services-film-production-text86 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default ServicesFilmProduction
