import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import WorkPhotographyHero from '../components/work-photography-hero'
import WorkPhotography from '../components/work-photography'
import WorkCinematicGallery from '../components/work-cinematic-gallery'
import WorkPhotographyEditorial from '../components/work-photography-editorial'
import WorkPhotographyPersonalProjects from '../components/work-photography-personal-projects'
import WorkStockPreview from '../components/work-stock-preview'
import WorkPhotographyEndNote from '../components/work-photography-end-note'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const WorkPhotography = (props) => {
  return (
    <>
      <div className="work-photography-container">
        <Head>
          <title>
            Work-Photography - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Work-Photography - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/work-photography"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="work-photography-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="work-photography-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="work-photography-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="work-photography-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="work-photography-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="work-photography-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="work-photography-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="work-photography-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="work-photography-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="work-photography-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="work-photography-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="work-photography-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="work-photography-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="work-photography-text23">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="work-photography-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="work-photography-text25">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="work-photography-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name8"
        ></JeevanChandimalNavi>
        <WorkPhotographyHero
          action3={
            <Fragment>
              <span className="work-photography-text27">Explore Work</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="work-photography-text28">
                A collection of photographs created with cinematic depth and
                restraint.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-photography-text29">
                Still imagery guided by light, atmosphere, and emotion.
              </span>
            </Fragment>
          }
        ></WorkPhotographyHero>
        <WorkPhotography
          text={
            <Fragment>
              <span className="work-photography-text30">
                <span>
                  This archive brings together photographic work shaped by
                  light, atmosphere, and quiet observation. Each image is
                  created with a cinematic sensibility — focused on mood,
                  texture, and the emotional weight of a moment.
                </span>
                <br></br>
                <span>
                  The collection spans personal exploration, editorial
                  storytelling, and curated imagery available for licensing,
                  presented as distinct but connected bodies of work.
                </span>
              </span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-photography-text34">Photography</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-photography-text35">Cinematic gallery</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-photography-text36">Editorial</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-photography-text37">Personal projects</span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="work-photography-text38">Stock previews</span>
            </Fragment>
          }
          feature1Button={
            <Fragment>
              <span className="work-photography-text39">Learn More</span>
            </Fragment>
          }
          feature2Button={
            <Fragment>
              <span className="work-photography-text40">Discover More</span>
            </Fragment>
          }
          feature3Button={
            <Fragment>
              <span className="work-photography-text41">Explore Now</span>
            </Fragment>
          }
          feature4Button={
            <Fragment>
              <span className="work-photography-text42">View Portfolio</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-photography-text43">
                Professional film production services tailored to your needs.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-photography-text44">
                High-quality audio production services for your projects.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-photography-text45">
                Creative animation and graphics solutions to enhance your
                content.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="work-photography-text46">
                Professional photography services to capture your special
                moments.
              </span>
            </Fragment>
          }
        ></WorkPhotography>
        <WorkCinematicGallery
          content1={
            <Fragment>
              <span className="work-photography-text47">
                A curated selection of photographs presented as standalone
                visual studies. These images focus on atmosphere, composition,
                and tonal depth, allowing each frame to exist without
                explanation.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-photography-text48">Cinematic Gallery</span>
            </Fragment>
          }
          rootClassName="work-cinematic-galleryroot-class-name"
        ></WorkCinematicGallery>
        <WorkPhotographyEditorial
          slogan={
            <Fragment>
              <span className="work-photography-text49">
                Explore our key features
              </span>
            </Fragment>
          }
          mainAction={
            <Fragment>
              <span className="work-photography-text50">Learn More</span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-photography-text51">Editorial</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-photography-text52">
                Customized Solutions
              </span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-photography-text53">Powerful Tools</span>
            </Fragment>
          }
          secondaryAction={
            <Fragment>
              <span className="work-photography-text54">Get Started</span>
            </Fragment>
          }
          featureDescription={
            <Fragment>
              <span className="work-photography-text55">
                Photography created for narrative and contextual use — images
                that support stories, publications, and visual essays. The focus
                remains on authenticity, environment, and visual coherence.
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-photography-text56">
                Tailored services to meet your specific needs
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-photography-text57">
                Intuitive design, analytics tools, AI &amp; animations
              </span>
            </Fragment>
          }
        ></WorkPhotographyEditorial>
        <WorkPhotographyPersonalProjects
          content1={
            <Fragment>
              <span className="work-photography-text58">
                Independent photographic work developed through exploration and
                long-form observation. These projects reflect ongoing personal
                interests in nature, landscape, and human presence within space.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-photography-text59">Personal projects</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-photography-text60">Intuitive Design</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-photography-text61">
                Powerful Analytics Tools
              </span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-photography-text62">
                AI &amp; Animations
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-photography-text63">
                We prioritize user experience with our intuitive and
                user-friendly designs.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-photography-text64">
                Gain valuable insights and make informed decisions with our
                advanced analytics tools.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-photography-text65">
                Incorporate cutting-edge AI and animations to enhance your
                projects and captivate your audience.
              </span>
            </Fragment>
          }
        ></WorkPhotographyPersonalProjects>
        <WorkStockPreview
          content1={
            <Fragment>
              <span className="work-photography-text66">
                A selection of images available for licensing, presented as
                visual previews rather than a commercial catalog. Each image
                links to the store for usage details, while maintaining
                consistency with the overall photographic language.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-photography-text67">Stock Preview</span>
            </Fragment>
          }
        ></WorkStockPreview>
        <WorkPhotographyEndNote
          content2={
            <Fragment>
              <span className="work-photography-text68">
                Every image is created with intention — whether as art,
                narrative support, or licensed visual material.
              </span>
            </Fragment>
          }
          heading2={
            <Fragment>
              <span className="work-photography-text69">Photography</span>
            </Fragment>
          }
          rootClassName="work-photography-end-noteroot-class-name"
        ></WorkPhotographyEndNote>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="work-photography-text70">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="work-photography-text71">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="work-photography-text72">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="work-photography-text73">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="work-photography-text74">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="work-photography-text75">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="work-photography-text76">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="work-photography-text77">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="work-photography-text78">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="work-photography-text79">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="work-photography-text80">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="work-photography-text81">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="work-photography-text82">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="work-photography-text83">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="work-photography-text84">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="work-photography-text85">
                Terms &amp; Conditions
              </span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="work-photography-text86">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="work-photography-text87">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name9"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .work-photography-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .work-photography-text10 {
            display: inline-block;
          }
          .work-photography-text11 {
            display: inline-block;
          }
          .work-photography-text12 {
            display: inline-block;
          }
          .work-photography-text13 {
            display: inline-block;
          }
          .work-photography-text14 {
            display: inline-block;
          }
          .work-photography-text15 {
            display: inline-block;
          }
          .work-photography-text16 {
            display: inline-block;
          }
          .work-photography-text17 {
            display: inline-block;
          }
          .work-photography-text18 {
            display: inline-block;
          }
          .work-photography-text19 {
            display: inline-block;
          }
          .work-photography-text20 {
            display: inline-block;
          }
          .work-photography-text21 {
            display: inline-block;
          }
          .work-photography-text22 {
            display: inline-block;
          }
          .work-photography-text23 {
            display: inline-block;
          }
          .work-photography-text24 {
            display: inline-block;
          }
          .work-photography-text25 {
            display: inline-block;
          }
          .work-photography-text26 {
            display: inline-block;
          }
          .work-photography-text27 {
            display: inline-block;
          }
          .work-photography-text28 {
            display: inline-block;
          }
          .work-photography-text29 {
            display: inline-block;
          }
          .work-photography-text30 {
            display: inline-block;
          }
          .work-photography-text34 {
            display: inline-block;
          }
          .work-photography-text35 {
            display: inline-block;
          }
          .work-photography-text36 {
            display: inline-block;
          }
          .work-photography-text37 {
            display: inline-block;
          }
          .work-photography-text38 {
            display: inline-block;
          }
          .work-photography-text39 {
            display: inline-block;
          }
          .work-photography-text40 {
            display: inline-block;
          }
          .work-photography-text41 {
            display: inline-block;
          }
          .work-photography-text42 {
            display: inline-block;
          }
          .work-photography-text43 {
            display: inline-block;
          }
          .work-photography-text44 {
            display: inline-block;
          }
          .work-photography-text45 {
            display: inline-block;
          }
          .work-photography-text46 {
            display: inline-block;
          }
          .work-photography-text47 {
            display: inline-block;
          }
          .work-photography-text48 {
            display: inline-block;
          }
          .work-photography-text49 {
            display: inline-block;
          }
          .work-photography-text50 {
            display: inline-block;
          }
          .work-photography-text51 {
            display: inline-block;
          }
          .work-photography-text52 {
            display: inline-block;
          }
          .work-photography-text53 {
            display: inline-block;
          }
          .work-photography-text54 {
            display: inline-block;
          }
          .work-photography-text55 {
            display: inline-block;
          }
          .work-photography-text56 {
            display: inline-block;
          }
          .work-photography-text57 {
            display: inline-block;
          }
          .work-photography-text58 {
            display: inline-block;
          }
          .work-photography-text59 {
            display: inline-block;
          }
          .work-photography-text60 {
            display: inline-block;
          }
          .work-photography-text61 {
            display: inline-block;
          }
          .work-photography-text62 {
            display: inline-block;
          }
          .work-photography-text63 {
            display: inline-block;
          }
          .work-photography-text64 {
            display: inline-block;
          }
          .work-photography-text65 {
            display: inline-block;
          }
          .work-photography-text66 {
            display: inline-block;
          }
          .work-photography-text67 {
            display: inline-block;
          }
          .work-photography-text68 {
            display: inline-block;
          }
          .work-photography-text69 {
            display: inline-block;
          }
          .work-photography-text70 {
            display: inline-block;
          }
          .work-photography-text71 {
            display: inline-block;
          }
          .work-photography-text72 {
            display: inline-block;
          }
          .work-photography-text73 {
            display: inline-block;
          }
          .work-photography-text74 {
            display: inline-block;
          }
          .work-photography-text75 {
            display: inline-block;
          }
          .work-photography-text76 {
            display: inline-block;
          }
          .work-photography-text77 {
            display: inline-block;
          }
          .work-photography-text78 {
            display: inline-block;
          }
          .work-photography-text79 {
            display: inline-block;
          }
          .work-photography-text80 {
            display: inline-block;
          }
          .work-photography-text81 {
            display: inline-block;
          }
          .work-photography-text82 {
            display: inline-block;
          }
          .work-photography-text83 {
            display: inline-block;
          }
          .work-photography-text84 {
            display: inline-block;
          }
          .work-photography-text85 {
            display: inline-block;
          }
          .work-photography-text86 {
            display: inline-block;
          }
          .work-photography-text87 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default WorkPhotography
