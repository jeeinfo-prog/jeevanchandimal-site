import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import StoreSearchBar from '../components/store-search-bar'
import StoreCollection01 from '../components/store-collection-01'
import StoreImageCategories from '../components/store-image-categories'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const StoreCollection = (props) => {
  return (
    <>
      <div className="store-collection-container">
        <Head>
          <title>
            Store-Collection - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Store-Collection - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/store-collection"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="store-collection-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="store-collection-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="store-collection-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="store-collection-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="store-collection-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="store-collection-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="store-collection-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="store-collection-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="store-collection-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="store-collection-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="store-collection-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="store-collection-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="store-collection-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="store-collection-text23">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="store-collection-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="store-collection-text25">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="store-collection-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name22"
        ></JeevanChandimalNavi>
        <StoreSearchBar></StoreSearchBar>
        <StoreCollection01
          content1={
            <Fragment>
              <span className="store-collection-text27">
                Explore our diverse range of services through the images below.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="store-collection-text28">Our Collection</span>
            </Fragment>
          }
        ></StoreCollection01>
        <StoreImageCategories
          heading1={
            <Fragment>
              <span className="store-collection-text29">Categories</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="store-collection-text30">Travel</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="store-collection-text31">Wildlife</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="store-collection-text32">Landscape</span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="store-collection-text33">Travel</span>
            </Fragment>
          }
          feature5Title={
            <Fragment>
              <span className="store-collection-text34">Culture</span>
            </Fragment>
          }
          feature6Title={
            <Fragment>
              <span className="store-collection-text35">History</span>
            </Fragment>
          }
          feature7Title={
            <Fragment>
              <span className="store-collection-text36">People</span>
            </Fragment>
          }
          feature8Title={
            <Fragment>
              <span className="store-collection-text37">
                <span>
                  Black &amp; White
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <br></br>
              </span>
            </Fragment>
          }
          rootClassName="store-image-categoriesroot-class-name1"
          feature1Description={
            <Fragment>
              <span className="store-collection-text40">
                Quiet studies of the natural world, shaped by light, rhythm, and
                stillness.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="store-collection-text41">
                Patient observations of animals in their natural environments,
                captured with respect and restraint.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="store-collection-text42">
                Expansive scenes defined by scale, form, and atmospheric depth.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="store-collection-text43">
                Visual impressions of place, movement, and transition — shaped
                by environment and experience.
              </span>
            </Fragment>
          }
          feature5Description={
            <Fragment>
              <span className="store-collection-text44">
                Moments reflecting tradition, ritual, and everyday life within
                different communities.
              </span>
            </Fragment>
          }
          feature6Description={
            <Fragment>
              <span className="store-collection-text45">
                Visual traces of the past — architecture, places, and details
                that carry memory and time.
              </span>
            </Fragment>
          }
          feature7Description={
            <Fragment>
              <span className="store-collection-text46">
                Human presence captured with sensitivity, context, and emotional
                clarity.
              </span>
            </Fragment>
          }
          feature8Description={
            <Fragment>
              <span className="store-collection-text47">
                Timeless compositions focused on light, form, contrast, and
                texture.
              </span>
            </Fragment>
          }
        ></StoreImageCategories>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="store-collection-text48">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="store-collection-text49">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="store-collection-text50">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="store-collection-text51">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="store-collection-text52">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="store-collection-text53">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="store-collection-text54">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="store-collection-text55">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="store-collection-text56">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="store-collection-text57">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="store-collection-text58">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="store-collection-text59">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="store-collection-text60">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="store-collection-text61">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="store-collection-text62">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="store-collection-text63">
                Terms &amp; Conditions
              </span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="store-collection-text64">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="store-collection-text65">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name21"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .store-collection-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .store-collection-text10 {
            display: inline-block;
          }
          .store-collection-text11 {
            display: inline-block;
          }
          .store-collection-text12 {
            display: inline-block;
          }
          .store-collection-text13 {
            display: inline-block;
          }
          .store-collection-text14 {
            display: inline-block;
          }
          .store-collection-text15 {
            display: inline-block;
          }
          .store-collection-text16 {
            display: inline-block;
          }
          .store-collection-text17 {
            display: inline-block;
          }
          .store-collection-text18 {
            display: inline-block;
          }
          .store-collection-text19 {
            display: inline-block;
          }
          .store-collection-text20 {
            display: inline-block;
          }
          .store-collection-text21 {
            display: inline-block;
          }
          .store-collection-text22 {
            display: inline-block;
          }
          .store-collection-text23 {
            display: inline-block;
          }
          .store-collection-text24 {
            display: inline-block;
          }
          .store-collection-text25 {
            display: inline-block;
          }
          .store-collection-text26 {
            display: inline-block;
          }
          .store-collection-text27 {
            display: inline-block;
          }
          .store-collection-text28 {
            display: inline-block;
          }
          .store-collection-text29 {
            display: inline-block;
          }
          .store-collection-text30 {
            display: inline-block;
          }
          .store-collection-text31 {
            display: inline-block;
          }
          .store-collection-text32 {
            display: inline-block;
          }
          .store-collection-text33 {
            display: inline-block;
          }
          .store-collection-text34 {
            display: inline-block;
          }
          .store-collection-text35 {
            display: inline-block;
          }
          .store-collection-text36 {
            display: inline-block;
          }
          .store-collection-text37 {
            display: inline-block;
          }
          .store-collection-text40 {
            display: inline-block;
          }
          .store-collection-text41 {
            display: inline-block;
          }
          .store-collection-text42 {
            display: inline-block;
          }
          .store-collection-text43 {
            display: inline-block;
          }
          .store-collection-text44 {
            display: inline-block;
          }
          .store-collection-text45 {
            display: inline-block;
          }
          .store-collection-text46 {
            display: inline-block;
          }
          .store-collection-text47 {
            display: inline-block;
          }
          .store-collection-text48 {
            display: inline-block;
          }
          .store-collection-text49 {
            display: inline-block;
          }
          .store-collection-text50 {
            display: inline-block;
          }
          .store-collection-text51 {
            display: inline-block;
          }
          .store-collection-text52 {
            display: inline-block;
          }
          .store-collection-text53 {
            display: inline-block;
          }
          .store-collection-text54 {
            display: inline-block;
          }
          .store-collection-text55 {
            display: inline-block;
          }
          .store-collection-text56 {
            display: inline-block;
          }
          .store-collection-text57 {
            display: inline-block;
          }
          .store-collection-text58 {
            display: inline-block;
          }
          .store-collection-text59 {
            display: inline-block;
          }
          .store-collection-text60 {
            display: inline-block;
          }
          .store-collection-text61 {
            display: inline-block;
          }
          .store-collection-text62 {
            display: inline-block;
          }
          .store-collection-text63 {
            display: inline-block;
          }
          .store-collection-text64 {
            display: inline-block;
          }
          .store-collection-text65 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default StoreCollection
