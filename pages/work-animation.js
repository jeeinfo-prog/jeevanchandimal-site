import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import WorkAnimationHero from '../components/work-animation-hero'
import Animations from '../components/animations'
import Work2DAnimation from '../components/work-2d-animation'
import Work3DAnimation from '../components/work-3d-animation'
import WorkMotionGraphics from '../components/work-motion-graphics'
import WorkPresentationNote from '../components/work-presentation-note'
import AIAnimation from '../components/ai-animation'
import WorkAnimationEndNote from '../components/work-animation-end-note'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const WorkAnimation = (props) => {
  return (
    <>
      <div className="work-animation-container">
        <Head>
          <title>
            Work-Animation - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Work-Animation - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/work-animation"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="work-animation-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="work-animation-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="work-animation-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="work-animation-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="work-animation-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="work-animation-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="work-animation-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="work-animation-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="work-animation-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="work-animation-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="work-animation-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="work-animation-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="work-animation-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="work-animation-text23">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="work-animation-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="work-animation-text25">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="work-animation-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name9"
        ></JeevanChandimalNavi>
        <WorkAnimationHero
          action3={
            <Fragment>
              <span className="work-animation-text27">Explore Work</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="work-animation-text28">
                Animation and movement used to enhance visual storytelling.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-animation-text29">
                Motion created with clarity, rhythm, and purpose.
              </span>
            </Fragment>
          }
          rootClassName="work-animation-heroroot-class-name"
        ></WorkAnimationHero>
        <Animations
          mainAction={
            <Fragment>
              <span className="work-animation-text30">Get Started</span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-animation-text31">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-animation-text32">2D Animations</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-animation-text33">3D Animations</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-animation-text34">Motion graphics</span>
            </Fragment>
          }
          secondaryAction={
            <Fragment>
              <span className="work-animation-text35">Learn More</span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="work-animation-text36">
                <span>
                  This archive explores motion as a storytelling tool — where
                  movement is guided by rhythm, clarity, and intention.
                  Animation is treated as a visual language, used to enhance
                  narrative rather than decorate it.
                </span>
                <br></br>
                <span>
                  The work includes 2D, 3D, and motion graphic projects designed
                  to integrate seamlessly with film and photographic elements.
                </span>
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-animation-text40">
                Utilize cutting-edge AI technology and captivating animations to
                enhance your projects.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-animation-text41">
                Gain valuable insights and track performance with our advanced
                analytics tools.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-animation-text42">
                Receive personalized assistance and support from our team every
                step of the way.
              </span>
            </Fragment>
          }
        ></Animations>
        <Work2DAnimation
          mainAction={
            <Fragment>
              <span className="work-animation-text43">
                Customized Solutions
              </span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-animation-text44">2D Animation</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-animation-text45">Film Production</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-animation-text46">Audio Production</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-animation-text47">
                Animation &amp; Graphics
              </span>
            </Fragment>
          }
          secondaryAction={
            <Fragment>
              <span className="work-animation-text48">
                Dedicated Customer Support
              </span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="work-animation-text49">
                Flat and illustrative animation developed with structure and
                pacing in mind. Movement is clean, purposeful, and aligned with
                narrative flow.
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-animation-text50">
                Professional film production services tailored to bring your
                stories to life.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-animation-text51">
                High-quality audio production for a captivating auditory
                experience.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-animation-text52">
                Innovative animation and graphics solutions to enhance visual
                storytelling.
              </span>
            </Fragment>
          }
        ></Work2DAnimation>
        <Work3DAnimation
          mainAction={
            <Fragment>
              <span className="work-animation-text53">
                Customized Solutions
              </span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-animation-text54">3D Animation</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-animation-text55">Film Production</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-animation-text56">Audio Production</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-animation-text57">
                Animation &amp; Graphics
              </span>
            </Fragment>
          }
          rootClassName="work3d-animationroot-class-name"
          secondaryAction={
            <Fragment>
              <span className="work-animation-text58">
                Dedicated Customer Support
              </span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="work-animation-text59">
                Three-dimensional motion work focused on spatial clarity and
                visual cohesion. These projects emphasize lighting, form, and
                controlled movement over spectacle.
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-animation-text60">
                Professional film production services tailored to bring your
                stories to life.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-animation-text61">
                High-quality audio production for a captivating auditory
                experience.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-animation-text62">
                Innovative animation and graphics solutions to enhance visual
                storytelling.
              </span>
            </Fragment>
          }
        ></Work3DAnimation>
        <WorkMotionGraphics
          mainAction={
            <Fragment>
              <span className="work-animation-text63">
                Customized Solutions
              </span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-animation-text64">Motion Graphics</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-animation-text65">Film Production</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-animation-text66">Audio Production</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-animation-text67">
                Animation &amp; Graphics
              </span>
            </Fragment>
          }
          rootClassName="work-motion-graphicsroot-class-name"
          secondaryAction={
            <Fragment>
              <span className="work-animation-text68">
                Dedicated Customer Support
              </span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="work-animation-text69">
                Graphic motion designed to support storytelling, titles, and
                visual communication. Each piece prioritizes clarity, rhythm,
                and restraint.
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-animation-text70">
                Professional film production services tailored to bring your
                stories to life.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-animation-text71">
                High-quality audio production for a captivating auditory
                experience.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-animation-text72">
                Innovative animation and graphics solutions to enhance visual
                storytelling.
              </span>
            </Fragment>
          }
        ></WorkMotionGraphics>
        <WorkPresentationNote
          mainAction={
            <Fragment>
              <span className="work-animation-text73">
                Customized Solutions
              </span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-animation-text74">Presentation Note</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-animation-text75">Film Production</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-animation-text76">Audio Production</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-animation-text77">
                Animation &amp; Graphics
              </span>
            </Fragment>
          }
          rootClassName="work-presentation-noteroot-class-name"
          secondaryAction={
            <Fragment>
              <span className="work-animation-text78">
                Dedicated Customer Support
              </span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="work-animation-text79">
                Projects are shown as short looping previews, allowing motion to
                be experienced naturally without interruption.
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-animation-text80">
                Professional film production services tailored to bring your
                stories to life.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-animation-text81">
                High-quality audio production for a captivating auditory
                experience.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-animation-text82">
                Innovative animation and graphics solutions to enhance visual
                storytelling.
              </span>
            </Fragment>
          }
        ></WorkPresentationNote>
        <AIAnimation
          action1={
            <Fragment>
              <span className="work-animation-text83">Get Started</span>
            </Fragment>
          }
          action2={
            <Fragment>
              <span className="work-animation-text84">Learn More</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="work-animation-text85">
                Explore our range of services including film production, audio
                production, animation &amp; graphics, and photography. We offer
                customized experiences tailored to your specific needs with
                dedicated customer support.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-animation-text86">AI &amp; Animation</span>
            </Fragment>
          }
          rootClassName="ai-animationroot-class-name2"
        ></AIAnimation>
        <WorkAnimationEndNote
          content2={
            <Fragment>
              <span className="work-animation-text87">
                When movement is shaped with intent, it becomes part of the
                story itself.
              </span>
            </Fragment>
          }
          heading2={
            <Fragment>
              <span className="work-animation-text88">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          rootClassName="work-animation-end-noteroot-class-name"
        ></WorkAnimationEndNote>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="work-animation-text89">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="work-animation-text90">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="work-animation-text91">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="work-animation-text92">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="work-animation-text93">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="work-animation-text94">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="work-animation-text95">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="work-animation-text96">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="work-animation-text97">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="work-animation-text98">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="work-animation-text99">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="work-animation-text100">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="work-animation-text101">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="work-animation-text102">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="work-animation-text103">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="work-animation-text104">
                Terms &amp; Conditions
              </span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="work-animation-text105">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="work-animation-text106">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name10"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .work-animation-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .work-animation-text10 {
            display: inline-block;
          }
          .work-animation-text11 {
            display: inline-block;
          }
          .work-animation-text12 {
            display: inline-block;
          }
          .work-animation-text13 {
            display: inline-block;
          }
          .work-animation-text14 {
            display: inline-block;
          }
          .work-animation-text15 {
            display: inline-block;
          }
          .work-animation-text16 {
            display: inline-block;
          }
          .work-animation-text17 {
            display: inline-block;
          }
          .work-animation-text18 {
            display: inline-block;
          }
          .work-animation-text19 {
            display: inline-block;
          }
          .work-animation-text20 {
            display: inline-block;
          }
          .work-animation-text21 {
            display: inline-block;
          }
          .work-animation-text22 {
            display: inline-block;
          }
          .work-animation-text23 {
            display: inline-block;
          }
          .work-animation-text24 {
            display: inline-block;
          }
          .work-animation-text25 {
            display: inline-block;
          }
          .work-animation-text26 {
            display: inline-block;
          }
          .work-animation-text27 {
            display: inline-block;
          }
          .work-animation-text28 {
            display: inline-block;
          }
          .work-animation-text29 {
            display: inline-block;
          }
          .work-animation-text30 {
            display: inline-block;
          }
          .work-animation-text31 {
            display: inline-block;
          }
          .work-animation-text32 {
            display: inline-block;
          }
          .work-animation-text33 {
            display: inline-block;
          }
          .work-animation-text34 {
            display: inline-block;
          }
          .work-animation-text35 {
            display: inline-block;
          }
          .work-animation-text36 {
            display: inline-block;
          }
          .work-animation-text40 {
            display: inline-block;
          }
          .work-animation-text41 {
            display: inline-block;
          }
          .work-animation-text42 {
            display: inline-block;
          }
          .work-animation-text43 {
            display: inline-block;
          }
          .work-animation-text44 {
            display: inline-block;
          }
          .work-animation-text45 {
            display: inline-block;
          }
          .work-animation-text46 {
            display: inline-block;
          }
          .work-animation-text47 {
            display: inline-block;
          }
          .work-animation-text48 {
            display: inline-block;
          }
          .work-animation-text49 {
            display: inline-block;
          }
          .work-animation-text50 {
            display: inline-block;
          }
          .work-animation-text51 {
            display: inline-block;
          }
          .work-animation-text52 {
            display: inline-block;
          }
          .work-animation-text53 {
            display: inline-block;
          }
          .work-animation-text54 {
            display: inline-block;
          }
          .work-animation-text55 {
            display: inline-block;
          }
          .work-animation-text56 {
            display: inline-block;
          }
          .work-animation-text57 {
            display: inline-block;
          }
          .work-animation-text58 {
            display: inline-block;
          }
          .work-animation-text59 {
            display: inline-block;
          }
          .work-animation-text60 {
            display: inline-block;
          }
          .work-animation-text61 {
            display: inline-block;
          }
          .work-animation-text62 {
            display: inline-block;
          }
          .work-animation-text63 {
            display: inline-block;
          }
          .work-animation-text64 {
            display: inline-block;
          }
          .work-animation-text65 {
            display: inline-block;
          }
          .work-animation-text66 {
            display: inline-block;
          }
          .work-animation-text67 {
            display: inline-block;
          }
          .work-animation-text68 {
            display: inline-block;
          }
          .work-animation-text69 {
            display: inline-block;
          }
          .work-animation-text70 {
            display: inline-block;
          }
          .work-animation-text71 {
            display: inline-block;
          }
          .work-animation-text72 {
            display: inline-block;
          }
          .work-animation-text73 {
            display: inline-block;
          }
          .work-animation-text74 {
            display: inline-block;
          }
          .work-animation-text75 {
            display: inline-block;
          }
          .work-animation-text76 {
            display: inline-block;
          }
          .work-animation-text77 {
            display: inline-block;
          }
          .work-animation-text78 {
            display: inline-block;
          }
          .work-animation-text79 {
            display: inline-block;
          }
          .work-animation-text80 {
            display: inline-block;
          }
          .work-animation-text81 {
            display: inline-block;
          }
          .work-animation-text82 {
            display: inline-block;
          }
          .work-animation-text83 {
            display: inline-block;
          }
          .work-animation-text84 {
            display: inline-block;
          }
          .work-animation-text85 {
            display: inline-block;
          }
          .work-animation-text86 {
            display: inline-block;
          }
          .work-animation-text87 {
            display: inline-block;
          }
          .work-animation-text88 {
            display: inline-block;
          }
          .work-animation-text89 {
            display: inline-block;
          }
          .work-animation-text90 {
            display: inline-block;
          }
          .work-animation-text91 {
            display: inline-block;
          }
          .work-animation-text92 {
            display: inline-block;
          }
          .work-animation-text93 {
            display: inline-block;
          }
          .work-animation-text94 {
            display: inline-block;
          }
          .work-animation-text95 {
            display: inline-block;
          }
          .work-animation-text96 {
            display: inline-block;
          }
          .work-animation-text97 {
            display: inline-block;
          }
          .work-animation-text98 {
            display: inline-block;
          }
          .work-animation-text99 {
            display: inline-block;
          }
          .work-animation-text100 {
            display: inline-block;
          }
          .work-animation-text101 {
            display: inline-block;
          }
          .work-animation-text102 {
            display: inline-block;
          }
          .work-animation-text103 {
            display: inline-block;
          }
          .work-animation-text104 {
            display: inline-block;
          }
          .work-animation-text105 {
            display: inline-block;
          }
          .work-animation-text106 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default WorkAnimation
