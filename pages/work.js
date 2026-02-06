import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import WorkHero from '../components/work-hero'
import HomeWork01 from '../components/home-work-01'
import Photography from '../components/photography'
import FilmVideoProduction from '../components/film-video-production'
import AIAnimation from '../components/ai-animation'
import SoundDesign from '../components/sound-design'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const Work = (props) => {
  return (
    <>
      <div className="work-container">
        <Head>
          <title>
            Work - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Work - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/work"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="work-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="work-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="work-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="work-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="work-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="work-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="work-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="work-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="work-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="work-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="work-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="work-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="work-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="work-text23">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="work-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="work-text25">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="work-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name7"
        ></JeevanChandimalNavi>
        <WorkHero
          action3={
            <Fragment>
              <span className="work-text27">Explore Work</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="work-text28">
                Explore each discipline as a focused body of work.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-text29">
                Selected work across film, photography, sound, and motion.
              </span>
            </Fragment>
          }
          rootClassName="work-heroroot-class-name"
        ></WorkHero>
        <HomeWork01
          feature1Title={
            <Fragment>
              <span className="work-text30">Film Production</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-text31">Audio Production</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-text32">Animation &amp; Motion</span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="work-text33">Photography</span>
            </Fragment>
          }
          rootClassName="home-work01root-class-name"
          feature1Button={
            <Fragment>
              <span className="work-text34">Learn More</span>
            </Fragment>
          }
          feature2Button={
            <Fragment>
              <span className="work-text35">Discover Now</span>
            </Fragment>
          }
          feature3Button={
            <Fragment>
              <span className="work-text36">Get Support</span>
            </Fragment>
          }
          feature4Button={
            <Fragment>
              <span className="work-text37">Customize Your Experience</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-text38">
                Stories shaped through image, motion, and sound.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-text39">
                Sound designed to support emotion and presence.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-text40">
                Movement crafted with clarity, rhythm, and intent.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="work-text41">
                Still imagery with cinematic depth and atmosphere.
              </span>
            </Fragment>
          }
        ></HomeWork01>
        <Photography
          content1={
            <Fragment>
              <span className="work-text42">
                Explore our Photography projects and see how we bring stories to
                life on screen.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-text43">Photography</span>
            </Fragment>
          }
        ></Photography>
        <FilmVideoProduction rootClassName="film-video-productionroot-class-name1"></FilmVideoProduction>
        <AIAnimation
          action1={
            <Fragment>
              <span className="work-text44">Get Started</span>
            </Fragment>
          }
          action2={
            <Fragment>
              <span className="work-text45">Learn More</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="work-text46">
                Explore our range of services including film production, audio
                production, animation &amp; graphics, and photography. We offer
                customized experiences tailored to your specific needs with
                dedicated customer support.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-text47">AI &amp; Animation</span>
            </Fragment>
          }
          rootClassName="ai-animationroot-class-name1"
        ></AIAnimation>
        <SoundDesign
          action1={
            <Fragment>
              <span className="work-text48">Explore Services</span>
            </Fragment>
          }
          action2={
            <Fragment>
              <span className="work-text49">Learn More</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="work-text50">
                Expert soundtrack composition, sound design and audio
                post-production for film, TV, and digital media. We bring your
                vision to life with professional and creative audio solutions.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-text51">Sound design</span>
            </Fragment>
          }
        ></SoundDesign>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="work-text52">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="work-text53">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="work-text54">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="work-text55">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="work-text56">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="work-text57">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="work-text58">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="work-text59">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="work-text60">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="work-text61">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="work-text62">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="work-text63">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="work-text64">Animation &amp; Motion</span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="work-text65">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="work-text66">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="work-text67">Terms &amp; Conditions</span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="work-text68">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="work-text69">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name8"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .work-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .work-text10 {
            display: inline-block;
          }
          .work-text11 {
            display: inline-block;
          }
          .work-text12 {
            display: inline-block;
          }
          .work-text13 {
            display: inline-block;
          }
          .work-text14 {
            display: inline-block;
          }
          .work-text15 {
            display: inline-block;
          }
          .work-text16 {
            display: inline-block;
          }
          .work-text17 {
            display: inline-block;
          }
          .work-text18 {
            display: inline-block;
          }
          .work-text19 {
            display: inline-block;
          }
          .work-text20 {
            display: inline-block;
          }
          .work-text21 {
            display: inline-block;
          }
          .work-text22 {
            display: inline-block;
          }
          .work-text23 {
            display: inline-block;
          }
          .work-text24 {
            display: inline-block;
          }
          .work-text25 {
            display: inline-block;
          }
          .work-text26 {
            display: inline-block;
          }
          .work-text27 {
            display: inline-block;
          }
          .work-text28 {
            display: inline-block;
          }
          .work-text29 {
            display: inline-block;
          }
          .work-text30 {
            display: inline-block;
          }
          .work-text31 {
            display: inline-block;
          }
          .work-text32 {
            display: inline-block;
          }
          .work-text33 {
            display: inline-block;
          }
          .work-text34 {
            display: inline-block;
          }
          .work-text35 {
            display: inline-block;
          }
          .work-text36 {
            display: inline-block;
          }
          .work-text37 {
            display: inline-block;
          }
          .work-text38 {
            display: inline-block;
          }
          .work-text39 {
            display: inline-block;
          }
          .work-text40 {
            display: inline-block;
          }
          .work-text41 {
            display: inline-block;
          }
          .work-text42 {
            display: inline-block;
          }
          .work-text43 {
            display: inline-block;
          }
          .work-text44 {
            display: inline-block;
          }
          .work-text45 {
            display: inline-block;
          }
          .work-text46 {
            display: inline-block;
          }
          .work-text47 {
            display: inline-block;
          }
          .work-text48 {
            display: inline-block;
          }
          .work-text49 {
            display: inline-block;
          }
          .work-text50 {
            display: inline-block;
          }
          .work-text51 {
            display: inline-block;
          }
          .work-text52 {
            display: inline-block;
          }
          .work-text53 {
            display: inline-block;
          }
          .work-text54 {
            display: inline-block;
          }
          .work-text55 {
            display: inline-block;
          }
          .work-text56 {
            display: inline-block;
          }
          .work-text57 {
            display: inline-block;
          }
          .work-text58 {
            display: inline-block;
          }
          .work-text59 {
            display: inline-block;
          }
          .work-text60 {
            display: inline-block;
          }
          .work-text61 {
            display: inline-block;
          }
          .work-text62 {
            display: inline-block;
          }
          .work-text63 {
            display: inline-block;
          }
          .work-text64 {
            display: inline-block;
          }
          .work-text65 {
            display: inline-block;
          }
          .work-text66 {
            display: inline-block;
          }
          .work-text67 {
            display: inline-block;
          }
          .work-text68 {
            display: inline-block;
          }
          .work-text69 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default Work
