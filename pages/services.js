import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import ServicesHero from '../components/services-hero'
import ServiceIntro from '../components/service-intro'
import OurServices from '../components/our-services'
import Process01 from '../components/process-01'
import ServicesFinalCTA from '../components/services-final-cta'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const Services = (props) => {
  return (
    <>
      <div className="services-container">
        <Head>
          <title>
            Services - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Services - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/services"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="services-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="services-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="services-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="services-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="services-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="services-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="services-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="services-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="services-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="services-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="services-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="services-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="services-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="services-text23">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="services-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="services-text25">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="services-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name10"
        ></JeevanChandimalNavi>
        <ServicesHero
          action3={
            <Fragment>
              <span className="services-text27">Explore Work</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="services-text28">
                Cinematic films crafted with intention - from concept
                development to final cut, built with atmosphere, rhythm, and
                narrative clarity.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-text29">
                End-to-end visual production, built with cinematic intent
              </span>
            </Fragment>
          }
          image1Src="https://images.unsplash.com/photo-1726181003887-d021b37b6122?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE0M3x8YnxlbnwwfHx8fDE3Njk1MzY3NTF8MA&amp;ixlib=rb-4.1.0&amp;w=1500"
        ></ServicesHero>
        <ServiceIntro
          content1={
            <Fragment>
              <span className="services-text30">
                I work across film, photography, sound, and animation — offering
                complete creative solutions from concept to final delivery. Each
                project is approached with care, precision, and a strong sense
                of atmosphere.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-text31">
                End-to-end visual production, built with cinematic intent.
              </span>
            </Fragment>
          }
        ></ServiceIntro>
        <OurServices
          sectionTitle={
            <Fragment>
              <span className="services-text32">Our Services</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="services-text33">Film Production</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="services-text34">Audio Production</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="services-text35">Animation &amp; Motion</span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="services-text36">Photography</span>
            </Fragment>
          }
          feature1Button={
            <Fragment>
              <span className="services-text37">View Work</span>
            </Fragment>
          }
          feature2Button={
            <Fragment>
              <span className="services-text38">Explore</span>
            </Fragment>
          }
          feature3Button={
            <Fragment>
              <span className="services-text39">Start a Project</span>
            </Fragment>
          }
          feature4Button={
            <Fragment>
              <span className="services-text40">See Portfolio</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="services-text41">
                Stories shaped through image, motion, &amp; sound.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="services-text42">
                Sound designed to complete the story.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="services-text43">
                Motion that supports narrative and mood.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="services-text44">
                Motion that supports narrative and mood.
              </span>
            </Fragment>
          }
        ></OurServices>
        <Process01
          feature3Title={
            <Fragment>
              <span className="services-text45">Observation Over Noise</span>
            </Fragment>
          }
          rootClassName="process01root-class-name"
          feature1Title2={
            <Fragment>
              <span className="services-text46">Process</span>
            </Fragment>
          }
          feature3Title1={
            <Fragment>
              <span className="services-text47">Craft &amp; Detail</span>
            </Fragment>
          }
          feature1Title11={
            <Fragment>
              <span className="services-text48">Concept First</span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="services-text49">
                I prefer quiet moments to forced gestures. Real presence over
                performance. Stillness often reveals more than motion.
              </span>
            </Fragment>
          }
          feature1Description2={
            <Fragment>
              <span className="services-text50">
                Every collaboration begins with intention. We define the
                atmosphere, the emotional direction, and the story before
                production begins.
              </span>
            </Fragment>
          }
          feature3Description1={
            <Fragment>
              <span className="services-text51">
                From lighting and composition to sound texture and pacing, every
                element is refined with care. Small decisions shape the final
                experience.
              </span>
            </Fragment>
          }
        ></Process01>
        <ServicesFinalCTA
          action2={
            <Fragment>
              <span className="services-text52">Create Together</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="services-text53">
                Let’s build something with atmosphere, clarity, and purpose.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-text54">Have a project in mind?</span>
            </Fragment>
          }
          rootClassName="services-final-ct-aroot-class-name"
        ></ServicesFinalCTA>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="services-text55">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="services-text56">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="services-text57">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="services-text58">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="services-text59">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="services-text60">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="services-text61">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="services-text62">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="services-text63">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="services-text64">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="services-text65">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="services-text66">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="services-text67">Animation &amp; Motion</span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="services-text68">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="services-text69">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="services-text70">Terms &amp; Conditions</span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="services-text71">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="services-text72">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name11"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .services-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .services-text10 {
            display: inline-block;
          }
          .services-text11 {
            display: inline-block;
          }
          .services-text12 {
            display: inline-block;
          }
          .services-text13 {
            display: inline-block;
          }
          .services-text14 {
            display: inline-block;
          }
          .services-text15 {
            display: inline-block;
          }
          .services-text16 {
            display: inline-block;
          }
          .services-text17 {
            display: inline-block;
          }
          .services-text18 {
            display: inline-block;
          }
          .services-text19 {
            display: inline-block;
          }
          .services-text20 {
            display: inline-block;
          }
          .services-text21 {
            display: inline-block;
          }
          .services-text22 {
            display: inline-block;
          }
          .services-text23 {
            display: inline-block;
          }
          .services-text24 {
            display: inline-block;
          }
          .services-text25 {
            display: inline-block;
          }
          .services-text26 {
            display: inline-block;
          }
          .services-text27 {
            display: inline-block;
          }
          .services-text28 {
            display: inline-block;
          }
          .services-text29 {
            display: inline-block;
          }
          .services-text30 {
            display: inline-block;
          }
          .services-text31 {
            display: inline-block;
          }
          .services-text32 {
            display: inline-block;
          }
          .services-text33 {
            display: inline-block;
          }
          .services-text34 {
            display: inline-block;
          }
          .services-text35 {
            display: inline-block;
          }
          .services-text36 {
            display: inline-block;
          }
          .services-text37 {
            display: inline-block;
          }
          .services-text38 {
            display: inline-block;
          }
          .services-text39 {
            display: inline-block;
          }
          .services-text40 {
            display: inline-block;
          }
          .services-text41 {
            display: inline-block;
          }
          .services-text42 {
            display: inline-block;
          }
          .services-text43 {
            display: inline-block;
          }
          .services-text44 {
            display: inline-block;
          }
          .services-text45 {
            display: inline-block;
          }
          .services-text46 {
            display: inline-block;
          }
          .services-text47 {
            display: inline-block;
          }
          .services-text48 {
            display: inline-block;
          }
          .services-text49 {
            display: inline-block;
          }
          .services-text50 {
            display: inline-block;
          }
          .services-text51 {
            display: inline-block;
          }
          .services-text52 {
            display: inline-block;
          }
          .services-text53 {
            display: inline-block;
          }
          .services-text54 {
            display: inline-block;
          }
          .services-text55 {
            display: inline-block;
          }
          .services-text56 {
            display: inline-block;
          }
          .services-text57 {
            display: inline-block;
          }
          .services-text58 {
            display: inline-block;
          }
          .services-text59 {
            display: inline-block;
          }
          .services-text60 {
            display: inline-block;
          }
          .services-text61 {
            display: inline-block;
          }
          .services-text62 {
            display: inline-block;
          }
          .services-text63 {
            display: inline-block;
          }
          .services-text64 {
            display: inline-block;
          }
          .services-text65 {
            display: inline-block;
          }
          .services-text66 {
            display: inline-block;
          }
          .services-text67 {
            display: inline-block;
          }
          .services-text68 {
            display: inline-block;
          }
          .services-text69 {
            display: inline-block;
          }
          .services-text70 {
            display: inline-block;
          }
          .services-text71 {
            display: inline-block;
          }
          .services-text72 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default Services
