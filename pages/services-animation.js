import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import ServiceAnimationHero from '../components/service-animation-hero'
import IntroductionAnimationServices from '../components/introduction-animation-services'
import SelectedMotionWork from '../components/selected-motion-work'
import WhatIDoAnimationServices from '../components/what-i-do-animation-services'
import HowIApproachMotion from '../components/how-i-approach-motion'
import WhoItsForAnimation from '../components/who-its-for-animation'
import ServicesAnimationFinalCTA from '../components/services-animation-final-cta'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const ServicesAnimation = (props) => {
  return (
    <>
      <div className="services-animation-container">
        <Head>
          <title>
            Services-Animation - Jeevan Chandimal | Filmmaker & Visual
            Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Services-Animation - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/services-animation"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="services-animation-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="services-animation-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="services-animation-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="services-animation-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="services-animation-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="services-animation-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="services-animation-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="services-animation-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="services-animation-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="services-animation-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="services-animation-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="services-animation-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="services-animation-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="services-animation-text23">
                Audio Production
              </span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="services-animation-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="services-animation-text25">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="services-animation-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name21"
        ></JeevanChandimalNavi>
        <ServiceAnimationHero
          action3={
            <Fragment>
              <span className="services-animation-text27">
                View Motion Work
              </span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="services-animation-text28">
                <span>
                  Animation and movement used to support story - not distract
                  from it.
                </span>
                <br></br>
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-animation-text31">
                Motion designed with clarity, rhythm, and intent.
              </span>
            </Fragment>
          }
          rootClassName="service-animation-heroroot-class-name"
        ></ServiceAnimationHero>
        <IntroductionAnimationServices
          feature1Title={
            <Fragment>
              <span className="services-animation-text32">Introduction</span>
            </Fragment>
          }
          rootClassName="introduction-animation-servicesroot-class-name"
          feature1Description={
            <Fragment>
              <span className="services-animation-text33">
                <span>
                  Motion is an extension of visual storytelling. I use animation
                  and motion design to add clarity, structure, and rhythm to
                  ideas - always in service of the narrative.
                </span>
                <br></br>
                <span>
                  The focus is on purpose and restraint, creating movement that
                  feels natural and cinematic.
                </span>
              </span>
            </Fragment>
          }
        ></IntroductionAnimationServices>
        <SelectedMotionWork
          content1={
            <Fragment>
              <span className="services-animation-text37">
                A selection of motion and animation projects created to support
                film, brands, and visual narratives.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-animation-text38">
                Selected Motion Work
              </span>
            </Fragment>
          }
          rootClassName="selected-motion-workroot-class-name"
        ></SelectedMotionWork>
        <WhatIDoAnimationServices
          sectionTitle={
            <Fragment>
              <span className="services-animation-text39">What I Do</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="services-animation-text40">Motion Graphics</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="services-animation-text41">
                2D &amp; 3D Animation
              </span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="services-animation-text42">Title Sequences</span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="services-animation-text43">
                Visual Story Support
              </span>
            </Fragment>
          }
          rootClassName="what-i-do-animation-servicesroot-class-name"
          feature1Button={
            <Fragment>
              <span className="services-animation-text44">Learn More</span>
            </Fragment>
          }
          feature2Button={
            <Fragment>
              <span className="services-animation-text45">Discover More</span>
            </Fragment>
          }
          feature3Button={
            <Fragment>
              <span className="services-animation-text46">Explore Now</span>
            </Fragment>
          }
          feature4Button={
            <Fragment>
              <span className="services-animation-text47">View Portfolio</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="services-animation-text48">
                Clean, purposeful motion that enhances visual communication.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="services-animation-text49">
                Animated elements built with structure, pacing, and clarity.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="services-animation-text50">
                Opening visuals designed to set tone and atmosphere.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="services-animation-text51">
                Motion elements that integrate seamlessly with film and
                photography.
              </span>
            </Fragment>
          }
        ></WhatIDoAnimationServices>
        <HowIApproachMotion
          feature1Title={
            <Fragment>
              <span className="services-animation-text52">
                How I Approach Motion
              </span>
            </Fragment>
          }
          rootClassName="how-i-approach-motionroot-class-name"
          feature1Description={
            <Fragment>
              <span className="services-animation-text53">
                <span>
                  Every movement has intention. Timing, rhythm, and simplicity
                  guide each decision.
                </span>
                <br></br>
                <span>
                  Animation is used to strengthen the story — never to overwhelm
                  it.
                </span>
              </span>
            </Fragment>
          }
        ></HowIApproachMotion>
        <WhoItsForAnimation
          content1={
            <Fragment>
              <span className="services-animation-text57">
                I work with filmmakers, brands, and creatives who value
                thoughtful motion and refined visual language.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-animation-text58">Who It’s For</span>
            </Fragment>
          }
          rootClassName="who-its-for-animationroot-class-name"
        ></WhoItsForAnimation>
        <ServicesAnimationFinalCTA
          action2={
            <Fragment>
              <span className="services-animation-text59">Create Together</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="services-animation-text60">
                Let’s bring it to life with clarity, rhythm, and visual intent.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-animation-text61">
                Have a story that needs movement?
              </span>
            </Fragment>
          }
          rootClassName="services-animation-final-ct-aroot-class-name"
        ></ServicesAnimationFinalCTA>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="services-animation-text62">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="services-animation-text63">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="services-animation-text64">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="services-animation-text65">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="services-animation-text66">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="services-animation-text67">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="services-animation-text68">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="services-animation-text69">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="services-animation-text70">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="services-animation-text71">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="services-animation-text72">
                Audio Production
              </span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="services-animation-text73">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="services-animation-text74">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="services-animation-text75">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="services-animation-text76">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="services-animation-text77">
                Terms &amp; Conditions
              </span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="services-animation-text78">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="services-animation-text79">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name20"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .services-animation-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .services-animation-text10 {
            display: inline-block;
          }
          .services-animation-text11 {
            display: inline-block;
          }
          .services-animation-text12 {
            display: inline-block;
          }
          .services-animation-text13 {
            display: inline-block;
          }
          .services-animation-text14 {
            display: inline-block;
          }
          .services-animation-text15 {
            display: inline-block;
          }
          .services-animation-text16 {
            display: inline-block;
          }
          .services-animation-text17 {
            display: inline-block;
          }
          .services-animation-text18 {
            display: inline-block;
          }
          .services-animation-text19 {
            display: inline-block;
          }
          .services-animation-text20 {
            display: inline-block;
          }
          .services-animation-text21 {
            display: inline-block;
          }
          .services-animation-text22 {
            display: inline-block;
          }
          .services-animation-text23 {
            display: inline-block;
          }
          .services-animation-text24 {
            display: inline-block;
          }
          .services-animation-text25 {
            display: inline-block;
          }
          .services-animation-text26 {
            display: inline-block;
          }
          .services-animation-text27 {
            display: inline-block;
          }
          .services-animation-text28 {
            display: inline-block;
          }
          .services-animation-text31 {
            display: inline-block;
          }
          .services-animation-text32 {
            display: inline-block;
          }
          .services-animation-text33 {
            display: inline-block;
          }
          .services-animation-text37 {
            display: inline-block;
          }
          .services-animation-text38 {
            display: inline-block;
          }
          .services-animation-text39 {
            display: inline-block;
          }
          .services-animation-text40 {
            display: inline-block;
          }
          .services-animation-text41 {
            display: inline-block;
          }
          .services-animation-text42 {
            display: inline-block;
          }
          .services-animation-text43 {
            display: inline-block;
          }
          .services-animation-text44 {
            display: inline-block;
          }
          .services-animation-text45 {
            display: inline-block;
          }
          .services-animation-text46 {
            display: inline-block;
          }
          .services-animation-text47 {
            display: inline-block;
          }
          .services-animation-text48 {
            display: inline-block;
          }
          .services-animation-text49 {
            display: inline-block;
          }
          .services-animation-text50 {
            display: inline-block;
          }
          .services-animation-text51 {
            display: inline-block;
          }
          .services-animation-text52 {
            display: inline-block;
          }
          .services-animation-text53 {
            display: inline-block;
          }
          .services-animation-text57 {
            display: inline-block;
          }
          .services-animation-text58 {
            display: inline-block;
          }
          .services-animation-text59 {
            display: inline-block;
          }
          .services-animation-text60 {
            display: inline-block;
          }
          .services-animation-text61 {
            display: inline-block;
          }
          .services-animation-text62 {
            display: inline-block;
          }
          .services-animation-text63 {
            display: inline-block;
          }
          .services-animation-text64 {
            display: inline-block;
          }
          .services-animation-text65 {
            display: inline-block;
          }
          .services-animation-text66 {
            display: inline-block;
          }
          .services-animation-text67 {
            display: inline-block;
          }
          .services-animation-text68 {
            display: inline-block;
          }
          .services-animation-text69 {
            display: inline-block;
          }
          .services-animation-text70 {
            display: inline-block;
          }
          .services-animation-text71 {
            display: inline-block;
          }
          .services-animation-text72 {
            display: inline-block;
          }
          .services-animation-text73 {
            display: inline-block;
          }
          .services-animation-text74 {
            display: inline-block;
          }
          .services-animation-text75 {
            display: inline-block;
          }
          .services-animation-text76 {
            display: inline-block;
          }
          .services-animation-text77 {
            display: inline-block;
          }
          .services-animation-text78 {
            display: inline-block;
          }
          .services-animation-text79 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default ServicesAnimation
