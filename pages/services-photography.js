import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import ServicePhotographyHero from '../components/service-photography-hero'
import IntroductionPhotographyServices from '../components/introduction-photography-services'
import SelectedPhotography from '../components/selected-photography'
import WhatIDoPhotographyServices from '../components/what-i-do-photography-services'
import HowIApproachPhotography from '../components/how-i-approach-photography'
import WhoItsForPhotography from '../components/who-its-for-photography'
import PhotographyServicesFinalCTA from '../components/photography-services-final-cta'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const ServicesPhotography = (props) => {
  return (
    <>
      <div className="services-photography-container">
        <Head>
          <title>
            Services-Photography - Jeevan Chandimal | Filmmaker & Visual
            Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Services-Photography - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/services-photography"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="services-photography-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="services-photography-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="services-photography-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="services-photography-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="services-photography-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="services-photography-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="services-photography-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="services-photography-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="services-photography-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="services-photography-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="services-photography-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="services-photography-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="services-photography-text22">
                Film Production
              </span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="services-photography-text23">
                Audio Production
              </span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="services-photography-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="services-photography-text25">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="services-photography-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name19"
        ></JeevanChandimalNavi>
        <ServicePhotographyHero
          action3={
            <Fragment>
              <span className="services-photography-text27">Explore Work</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="services-photography-text28">
                Photography approached as storytelling - crafted with cinematic
                intent and emotional clarity.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-photography-text29">
                <span>
                  Still imagery shaped by light, mood, and atmosphere.
                </span>
                <br></br>
              </span>
            </Fragment>
          }
          rootClassName="service-photography-heroroot-class-name"
        ></ServicePhotographyHero>
        <IntroductionPhotographyServices
          feature1Title={
            <Fragment>
              <span className="services-photography-text32">Introduction</span>
            </Fragment>
          }
          rootClassName="introduction-photography-servicesroot-class-name"
          feature1Description={
            <Fragment>
              <span className="services-photography-text33">
                <span>
                  Photography is where my visual language began. I approach
                  still images the same way I approach film — with attention to
                  light, composition, and the feeling a moment carries.
                </span>
                <br></br>
                <span>
                  Each photograph is created to stand on its own, while also
                  fitting naturally into larger visual narratives for editorial,
                  commercial, and artistic use.
                </span>
              </span>
            </Fragment>
          }
        ></IntroductionPhotographyServices>
        <SelectedPhotography
          content1={
            <Fragment>
              <span className="services-photography-text37">
                A curated selection of editorial, cinematic, and fine-art
                photography — focused on atmosphere, texture, and detail.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-photography-text38">
                Selected Photography
              </span>
            </Fragment>
          }
          rootClassName="selected-photographyroot-class-name"
        ></SelectedPhotography>
        <WhatIDoPhotographyServices
          sectionTitle={
            <Fragment>
              <span className="services-photography-text39">What I Do</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="services-photography-text40">
                Cinematic &amp; Editorial Photography
              </span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="services-photography-text41">
                Nature &amp; Wildlife
              </span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="services-photography-text42">
                Landscape &amp; Travel
              </span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="services-photography-text43">
                Black &amp; White Fine Art
              </span>
            </Fragment>
          }
          rootClassName="what-i-do-photography-servicesroot-class-name"
          feature1Button={
            <Fragment>
              <span className="services-photography-text44">Learn More</span>
            </Fragment>
          }
          feature2Button={
            <Fragment>
              <span className="services-photography-text45">Discover More</span>
            </Fragment>
          }
          feature3Button={
            <Fragment>
              <span className="services-photography-text46">Explore Now</span>
            </Fragment>
          }
          feature4Button={
            <Fragment>
              <span className="services-photography-text47">
                View Portfolio
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="services-photography-text48">
                Story-driven imagery created with intention and visual depth.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="services-photography-text49">
                Quiet, patient observations of the natural world, captured with
                respect and realism.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="services-photography-text50">
                Expansive scenes that convey scale, mood, and a sense of place.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="services-photography-text51">
                Timeless compositions focused on light, form, and emotion.
              </span>
            </Fragment>
          }
        ></WhatIDoPhotographyServices>
        <HowIApproachPhotography
          feature1Title={
            <Fragment>
              <span className="services-photography-text52">
                How I Approach Photography
              </span>
            </Fragment>
          }
          rootClassName="how-i-approach-photographyroot-class-name"
          feature1Description={
            <Fragment>
              <span className="services-photography-text53">
                <span>
                  I look for moments that feel honest and unforced. Light,
                  timing, and stillness matter more than spectacle.
                </span>
                <br></br>
                <span>
                  Whether working in controlled environments or in the field,
                  the goal is always the same — to create images that feel
                  considered, immersive, and lasting.
                </span>
              </span>
            </Fragment>
          }
        ></HowIApproachPhotography>
        <WhoItsForPhotography
          content1={
            <Fragment>
              <span className="services-photography-text57">
                I work with brands, agencies, filmmakers, and individuals who
                value craft, atmosphere, and intentional storytelling — and who
                see film as more than just content.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-photography-text58">Who It’s For</span>
            </Fragment>
          }
          rootClassName="who-its-for-photographyroot-class-name"
        ></WhoItsForPhotography>
        <PhotographyServicesFinalCTA
          action2={
            <Fragment>
              <span className="services-photography-text59">
                Create Together
              </span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="services-photography-text60">
                Let’s create something with clarity, atmosphere, and purpose.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="services-photography-text61">
                Looking for imagery with depth and intention?
              </span>
            </Fragment>
          }
          rootClassName="photography-services-final-ct-aroot-class-name"
        ></PhotographyServicesFinalCTA>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="services-photography-text62">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="services-photography-text63">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="services-photography-text64">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="services-photography-text65">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="services-photography-text66">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="services-photography-text67">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="services-photography-text68">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="services-photography-text69">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="services-photography-text70">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="services-photography-text71">
                Film Production
              </span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="services-photography-text72">
                Audio Production
              </span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="services-photography-text73">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="services-photography-text74">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="services-photography-text75">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="services-photography-text76">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="services-photography-text77">
                Terms &amp; Conditions
              </span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="services-photography-text78">
                Cookies Policy
              </span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="services-photography-text79">
                Privacy Policy
              </span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name18"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .services-photography-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .services-photography-text10 {
            display: inline-block;
          }
          .services-photography-text11 {
            display: inline-block;
          }
          .services-photography-text12 {
            display: inline-block;
          }
          .services-photography-text13 {
            display: inline-block;
          }
          .services-photography-text14 {
            display: inline-block;
          }
          .services-photography-text15 {
            display: inline-block;
          }
          .services-photography-text16 {
            display: inline-block;
          }
          .services-photography-text17 {
            display: inline-block;
          }
          .services-photography-text18 {
            display: inline-block;
          }
          .services-photography-text19 {
            display: inline-block;
          }
          .services-photography-text20 {
            display: inline-block;
          }
          .services-photography-text21 {
            display: inline-block;
          }
          .services-photography-text22 {
            display: inline-block;
          }
          .services-photography-text23 {
            display: inline-block;
          }
          .services-photography-text24 {
            display: inline-block;
          }
          .services-photography-text25 {
            display: inline-block;
          }
          .services-photography-text26 {
            display: inline-block;
          }
          .services-photography-text27 {
            display: inline-block;
          }
          .services-photography-text28 {
            display: inline-block;
          }
          .services-photography-text29 {
            display: inline-block;
          }
          .services-photography-text32 {
            display: inline-block;
          }
          .services-photography-text33 {
            display: inline-block;
          }
          .services-photography-text37 {
            display: inline-block;
          }
          .services-photography-text38 {
            display: inline-block;
          }
          .services-photography-text39 {
            display: inline-block;
          }
          .services-photography-text40 {
            display: inline-block;
          }
          .services-photography-text41 {
            display: inline-block;
          }
          .services-photography-text42 {
            display: inline-block;
          }
          .services-photography-text43 {
            display: inline-block;
          }
          .services-photography-text44 {
            display: inline-block;
          }
          .services-photography-text45 {
            display: inline-block;
          }
          .services-photography-text46 {
            display: inline-block;
          }
          .services-photography-text47 {
            display: inline-block;
          }
          .services-photography-text48 {
            display: inline-block;
          }
          .services-photography-text49 {
            display: inline-block;
          }
          .services-photography-text50 {
            display: inline-block;
          }
          .services-photography-text51 {
            display: inline-block;
          }
          .services-photography-text52 {
            display: inline-block;
          }
          .services-photography-text53 {
            display: inline-block;
          }
          .services-photography-text57 {
            display: inline-block;
          }
          .services-photography-text58 {
            display: inline-block;
          }
          .services-photography-text59 {
            display: inline-block;
          }
          .services-photography-text60 {
            display: inline-block;
          }
          .services-photography-text61 {
            display: inline-block;
          }
          .services-photography-text62 {
            display: inline-block;
          }
          .services-photography-text63 {
            display: inline-block;
          }
          .services-photography-text64 {
            display: inline-block;
          }
          .services-photography-text65 {
            display: inline-block;
          }
          .services-photography-text66 {
            display: inline-block;
          }
          .services-photography-text67 {
            display: inline-block;
          }
          .services-photography-text68 {
            display: inline-block;
          }
          .services-photography-text69 {
            display: inline-block;
          }
          .services-photography-text70 {
            display: inline-block;
          }
          .services-photography-text71 {
            display: inline-block;
          }
          .services-photography-text72 {
            display: inline-block;
          }
          .services-photography-text73 {
            display: inline-block;
          }
          .services-photography-text74 {
            display: inline-block;
          }
          .services-photography-text75 {
            display: inline-block;
          }
          .services-photography-text76 {
            display: inline-block;
          }
          .services-photography-text77 {
            display: inline-block;
          }
          .services-photography-text78 {
            display: inline-block;
          }
          .services-photography-text79 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default ServicesPhotography
