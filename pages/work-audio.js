import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import WorkAudioHero from '../components/work-audio-hero'
import AudioProduction from '../components/audio-production'
import SoundDesign2 from '../components/sound-design-2'
import Music from '../components/music'
import VoiceWork from '../components/voice-work'
import WorkAudioEndNote from '../components/work-audio-end-note'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const WorkAudio = (props) => {
  return (
    <>
      <div className="work-audio-container">
        <Head>
          <title>
            Work-Audio - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Work-Audio - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/work-audio"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="work-audio-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="work-audio-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="work-audio-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="work-audio-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="work-audio-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="work-audio-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="work-audio-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="work-audio-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="work-audio-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="work-audio-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="work-audio-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="work-audio-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="work-audio-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="work-audio-text23">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="work-audio-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="work-audio-text25">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="work-audio-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name1"
        ></JeevanChandimalNavi>
        <WorkAudioHero
          action3={
            <Fragment>
              <span className="work-audio-text27">Explore Work</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="work-audio-text28">
                Audio work shaped through texture, space, and emotional clarity.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-audio-text29">
                Sound designed to support story and presence.
              </span>
            </Fragment>
          }
          rootClassName="work-audio-heroroot-class-name"
        ></WorkAudioHero>
        <AudioProduction
          mainAction={
            <Fragment>
              <span className="work-audio-text30">Get Started</span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-audio-text31">Audio Production</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-audio-text32">Sound design</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-audio-text33">Music</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-audio-text34">Voice work</span>
            </Fragment>
          }
          secondaryAction={
            <Fragment>
              <span className="work-audio-text35">Learn More</span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="work-audio-text36">
                <span>
                  Sound is approached here as an emotional and spatial element —
                  something that shapes how a story is felt, not simply heard.
                  The work in this archive focuses on texture, rhythm, and
                  restraint, allowing silence and space to play an active role.
                </span>
                <br></br>
                <span>
                  This collection includes sound design, music, and voice-based
                  work created to support film, animation, and immersive visual
                  experiences.
                </span>
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-audio-text40">
                Tailored services to meet your unique needs.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-audio-text41">
                User-friendly interface for seamless navigation.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-audio-text42">
                Gain valuable insights with advanced analytics.
              </span>
            </Fragment>
          }
        ></AudioProduction>
        <SoundDesign2
          mainAction={
            <Fragment>
              <span className="work-audio-text43">Get Started</span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-audio-text44">Sound design</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-audio-text45">Customized Solutions</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-audio-text46">Intuitive Design</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-audio-text47">
                Powerful Analytics Tools
              </span>
            </Fragment>
          }
          secondaryAction={
            <Fragment>
              <span className="work-audio-text48">Learn More</span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="work-audio-text49">
                Atmospheric soundscapes and environmental design created to add
                depth and realism to visual narratives. Each piece is built with
                attention to space, layering, and emotional tone.
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-audio-text50">
                Tailored services to meet your unique needs and exceed
                expectations.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-audio-text51">
                User-friendly interfaces that enhance user experience and
                engagement.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-audio-text52">
                Gain valuable insights and make informed decisions with our
                advanced analytics.
              </span>
            </Fragment>
          }
        ></SoundDesign2>
        <Music
          mainAction={
            <Fragment>
              <span className="work-audio-text53">Get Started</span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="work-audio-text54">Music</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-audio-text55">Customized Solutions</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-audio-text56">Intuitive Design</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-audio-text57">
                Powerful Analytics Tools
              </span>
            </Fragment>
          }
          secondaryAction={
            <Fragment>
              <span className="work-audio-text58">Learn More</span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="work-audio-text59">
                Original musical compositions developed around mood and pacing.
                These works are created to support narrative flow, whether as
                subtle background elements or more present emotional drivers.
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-audio-text60">
                Tailored services to meet your unique needs and requirements.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-audio-text61">
                User-friendly interfaces and designs for seamless user
                experience.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-audio-text62">
                Gain valuable insights and data-driven decisions with our
                advanced analytics tools.
              </span>
            </Fragment>
          }
        ></Music>
        <VoiceWork
          content1={
            <Fragment>
              <span className="work-audio-text63">
                Voice-based audio created for film, narration, and visual
                storytelling. Clarity, tone, and emotional delivery are
                prioritized over performance excess.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="work-audio-text64">Voice Work</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="work-audio-text65">Film Production</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="work-audio-text66">Audio Production</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="work-audio-text67">
                Animation &amp; Graphics
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="work-audio-text68">
                Professional film production services tailored to your needs
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="work-audio-text69">
                High-quality audio production for various projects
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="work-audio-text70">
                Creative animation and graphics solutions to enhance your
                content
              </span>
            </Fragment>
          }
        ></VoiceWork>
        <WorkAudioEndNote
          content2={
            <Fragment>
              <span className="work-audio-text71">
                Each piece is presented with embedded audio players and
                supporting visuals, allowing sound to be experienced in context.
              </span>
            </Fragment>
          }
          heading2={
            <Fragment>
              <span className="work-audio-text72">Audio Production</span>
            </Fragment>
          }
        ></WorkAudioEndNote>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="work-audio-text73">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="work-audio-text74">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="work-audio-text75">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="work-audio-text76">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="work-audio-text77">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="work-audio-text78">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="work-audio-text79">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="work-audio-text80">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="work-audio-text81">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="work-audio-text82">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="work-audio-text83">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="work-audio-text84">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="work-audio-text85">Animation &amp; Motion</span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="work-audio-text86">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="work-audio-text87">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="work-audio-text88">Terms &amp; Conditions</span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="work-audio-text89">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="work-audio-text90">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name4"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .work-audio-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .work-audio-text10 {
            display: inline-block;
          }
          .work-audio-text11 {
            display: inline-block;
          }
          .work-audio-text12 {
            display: inline-block;
          }
          .work-audio-text13 {
            display: inline-block;
          }
          .work-audio-text14 {
            display: inline-block;
          }
          .work-audio-text15 {
            display: inline-block;
          }
          .work-audio-text16 {
            display: inline-block;
          }
          .work-audio-text17 {
            display: inline-block;
          }
          .work-audio-text18 {
            display: inline-block;
          }
          .work-audio-text19 {
            display: inline-block;
          }
          .work-audio-text20 {
            display: inline-block;
          }
          .work-audio-text21 {
            display: inline-block;
          }
          .work-audio-text22 {
            display: inline-block;
          }
          .work-audio-text23 {
            display: inline-block;
          }
          .work-audio-text24 {
            display: inline-block;
          }
          .work-audio-text25 {
            display: inline-block;
          }
          .work-audio-text26 {
            display: inline-block;
          }
          .work-audio-text27 {
            display: inline-block;
          }
          .work-audio-text28 {
            display: inline-block;
          }
          .work-audio-text29 {
            display: inline-block;
          }
          .work-audio-text30 {
            display: inline-block;
          }
          .work-audio-text31 {
            display: inline-block;
          }
          .work-audio-text32 {
            display: inline-block;
          }
          .work-audio-text33 {
            display: inline-block;
          }
          .work-audio-text34 {
            display: inline-block;
          }
          .work-audio-text35 {
            display: inline-block;
          }
          .work-audio-text36 {
            display: inline-block;
          }
          .work-audio-text40 {
            display: inline-block;
          }
          .work-audio-text41 {
            display: inline-block;
          }
          .work-audio-text42 {
            display: inline-block;
          }
          .work-audio-text43 {
            display: inline-block;
          }
          .work-audio-text44 {
            display: inline-block;
          }
          .work-audio-text45 {
            display: inline-block;
          }
          .work-audio-text46 {
            display: inline-block;
          }
          .work-audio-text47 {
            display: inline-block;
          }
          .work-audio-text48 {
            display: inline-block;
          }
          .work-audio-text49 {
            display: inline-block;
          }
          .work-audio-text50 {
            display: inline-block;
          }
          .work-audio-text51 {
            display: inline-block;
          }
          .work-audio-text52 {
            display: inline-block;
          }
          .work-audio-text53 {
            display: inline-block;
          }
          .work-audio-text54 {
            display: inline-block;
          }
          .work-audio-text55 {
            display: inline-block;
          }
          .work-audio-text56 {
            display: inline-block;
          }
          .work-audio-text57 {
            display: inline-block;
          }
          .work-audio-text58 {
            display: inline-block;
          }
          .work-audio-text59 {
            display: inline-block;
          }
          .work-audio-text60 {
            display: inline-block;
          }
          .work-audio-text61 {
            display: inline-block;
          }
          .work-audio-text62 {
            display: inline-block;
          }
          .work-audio-text63 {
            display: inline-block;
          }
          .work-audio-text64 {
            display: inline-block;
          }
          .work-audio-text65 {
            display: inline-block;
          }
          .work-audio-text66 {
            display: inline-block;
          }
          .work-audio-text67 {
            display: inline-block;
          }
          .work-audio-text68 {
            display: inline-block;
          }
          .work-audio-text69 {
            display: inline-block;
          }
          .work-audio-text70 {
            display: inline-block;
          }
          .work-audio-text71 {
            display: inline-block;
          }
          .work-audio-text72 {
            display: inline-block;
          }
          .work-audio-text73 {
            display: inline-block;
          }
          .work-audio-text74 {
            display: inline-block;
          }
          .work-audio-text75 {
            display: inline-block;
          }
          .work-audio-text76 {
            display: inline-block;
          }
          .work-audio-text77 {
            display: inline-block;
          }
          .work-audio-text78 {
            display: inline-block;
          }
          .work-audio-text79 {
            display: inline-block;
          }
          .work-audio-text80 {
            display: inline-block;
          }
          .work-audio-text81 {
            display: inline-block;
          }
          .work-audio-text82 {
            display: inline-block;
          }
          .work-audio-text83 {
            display: inline-block;
          }
          .work-audio-text84 {
            display: inline-block;
          }
          .work-audio-text85 {
            display: inline-block;
          }
          .work-audio-text86 {
            display: inline-block;
          }
          .work-audio-text87 {
            display: inline-block;
          }
          .work-audio-text88 {
            display: inline-block;
          }
          .work-audio-text89 {
            display: inline-block;
          }
          .work-audio-text90 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default WorkAudio
