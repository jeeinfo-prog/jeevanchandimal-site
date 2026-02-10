import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import StoreHero from '../components/store-hero'
import StoreIntro from '../components/store-intro'
import StorePricing from '../components/store-pricing'
import StoreImageCategories from '../components/store-image-categories'
import StoreImagePresentationNote01 from '../components/store-image-presentation-note-01'
import StoreLicensingSimplified1 from '../components/store-licensing-simplified1'
import StoreWhyThisCollection from '../components/store-why-this-collection'
import StoreFinalCTA from '../components/store-final-cta'
import StoreSearchBar from '../components/store-search-bar'
import StoreCollection01 from '../components/store-collection-01'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const Store = (props) => {
  return (
    <>
      <div className="store-container">
        <Head>
          <title>
            Store - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Store - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/store"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="store-text100">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="store-text101">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="store-text102">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="store-text103">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="store-text104">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="store-text105">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="store-text106">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="store-text107">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="store-text108">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="store-text109">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="store-text110">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="store-text111">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="store-text112">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="store-text113">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="store-text114">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="store-text115">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="store-text116">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name15"
        ></JeevanChandimalNavi>
        <StoreHero
          action3={
            <Fragment>
              <span className="store-text117">Contact us</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="store-text118">
                A curated collection of photographs created with atmosphere,
                restraint, and cinematic intent — available for creative use
                through individual licensing or membership access.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="store-text119">
                Cinematic imagery, available for licensing.
              </span>
            </Fragment>
          }
        ></StoreHero>
        <StoreIntro
          content1={
            <Fragment>
              <span className="store-text120">
                <span>
                  Each image in this collection is captured with intention,
                  shaped by light, mood, and narrative presence.
                </span>
                <br></br>
                <span>
                  The store offers carefully selected visuals for filmmakers,
                  brands, designers, and storytellers who value depth over
                  volume — imagery designed to support meaningful work.
                </span>
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="store-text124">
                This is not a stock library.
              </span>
            </Fragment>
          }
          rootClassName="store-introroot-class-name"
        ></StoreIntro>
        <StorePricing
          heading1={
            <Fragment>
              <span className="store-text125">
                Ways to Access the Collection
              </span>
            </Fragment>
          }
          plan1Price={
            <Fragment>
              <span className="store-text126">License Individual Images</span>
            </Fragment>
          }
          plan2Price={
            <Fragment>
              <span className="store-text127">Membership Access</span>
            </Fragment>
          }
          plan1Action={
            <Fragment>
              <span className="store-text128">Get Started</span>
            </Fragment>
          }
          plan1Yearly={
            <Fragment>
              <span className="store-text129">
                Select and license single images for specific projects,
                campaigns, or editorial use.
              </span>
            </Fragment>
          }
          plan2Action={
            <Fragment>
              <span className="store-text130">Contact Us</span>
            </Fragment>
          }
          plan2Yearly={
            <Fragment>
              <span className="store-text131">
                Unlock broader access through curated membership plans, offering
                flexible usage and ongoing additions to the archive.
              </span>
            </Fragment>
          }
          plan1Feature1={
            <Fragment>
              <span className="store-text132">
                Up to 2 hours of filming or photography
              </span>
            </Fragment>
          }
          plan1Feature2={
            <Fragment>
              <span className="store-text133">Basic editing included</span>
            </Fragment>
          }
          plan1Feature3={
            <Fragment>
              <span className="store-text134">
                Additional hours at $100/hour
              </span>
            </Fragment>
          }
          plan2Feature1={
            <Fragment>
              <span className="store-text135">
                Up to 8 hours of filming or photography
              </span>
            </Fragment>
          }
          plan2Feature2={
            <Fragment>
              <span className="store-text136">
                Advanced editing and color grading included
              </span>
            </Fragment>
          }
          plan2Feature3={
            <Fragment>
              <span className="store-text137">
                Custom sound design and music composition
              </span>
            </Fragment>
          }
          plan2Feature4={
            <Fragment>
              <span className="store-text138">
                Professional animation services available
              </span>
            </Fragment>
          }
          plan2Feature5={
            <Fragment>
              <span className="store-text139">
                Priority scheduling and dedicated support
              </span>
            </Fragment>
          }
        ></StorePricing>
        <StoreImageCategories
          heading1={
            <Fragment>
              <span className="store-text140">Categories</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="store-text141">Travel</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="store-text142">Wildlife</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="store-text143">Landscape</span>
            </Fragment>
          }
          feature4Title={
            <Fragment>
              <span className="store-text144">Travel</span>
            </Fragment>
          }
          feature5Title={
            <Fragment>
              <span className="store-text145">Culture</span>
            </Fragment>
          }
          feature6Title={
            <Fragment>
              <span className="store-text146">History</span>
            </Fragment>
          }
          feature7Title={
            <Fragment>
              <span className="store-text147">People</span>
            </Fragment>
          }
          feature8Title={
            <Fragment>
              <span className="store-text148">
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
          rootClassName="store-image-categoriesroot-class-name"
          feature1Description={
            <Fragment>
              <span className="store-text151">
                Quiet studies of the natural world, shaped by light, rhythm, and
                stillness.
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="store-text152">
                Patient observations of animals in their natural environments,
                captured with respect and restraint.
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="store-text153">
                Expansive scenes defined by scale, form, and atmospheric depth.
              </span>
            </Fragment>
          }
          feature4Description={
            <Fragment>
              <span className="store-text154">
                Visual impressions of place, movement, and transition — shaped
                by environment and experience.
              </span>
            </Fragment>
          }
          feature5Description={
            <Fragment>
              <span className="store-text155">
                Moments reflecting tradition, ritual, and everyday life within
                different communities.
              </span>
            </Fragment>
          }
          feature6Description={
            <Fragment>
              <span className="store-text156">
                Visual traces of the past — architecture, places, and details
                that carry memory and time.
              </span>
            </Fragment>
          }
          feature7Description={
            <Fragment>
              <span className="store-text157">
                Human presence captured with sensitivity, context, and emotional
                clarity.
              </span>
            </Fragment>
          }
          feature8Description={
            <Fragment>
              <span className="store-text158">
                Timeless compositions focused on light, form, contrast, and
                texture.
              </span>
            </Fragment>
          }
        ></StoreImageCategories>
        <StoreImagePresentationNote01
          mainAction={
            <Fragment>
              <span className="store-text159">Customized Visual Solutions</span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="store-text160">
                Each image is presented with:
              </span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="store-text161">High-resolution previews</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="store-text162">Clear licensing options</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="store-text163">
                Usage details based on selection
              </span>
            </Fragment>
          }
          secondaryAction={
            <Fragment>
              <span className="store-text164">View Portfolio</span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="store-text165">
                Downloads are delivered in professionally graded, high-quality
                formats suitable for creative and commercial use.
              </span>
            </Fragment>
          }
        ></StoreImagePresentationNote01>
        <StoreLicensingSimplified1
          feature1Title={
            <Fragment>
              <span className="store-text166">Licensing Simplified</span>
            </Fragment>
          }
          feature1Action1={
            <Fragment>
              <span className="store-text167">View Full License</span>
            </Fragment>
          }
          feature1Action2={
            <Fragment>
              <span className="store-text168">Get Started Today</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="store-text169">
                <span>All images are licensed, not sold.</span>
                <br></br>
                <span>
                  Usage depends on the selected license or membership tier.
                </span>
                <br></br>
                <span>
                  Reselling, redistribution, or re-uploading images is not
                  permitted.
                </span>
              </span>
            </Fragment>
          }
        ></StoreLicensingSimplified1>
        <StoreWhyThisCollection
          content1={
            <Fragment>
              <span className="store-text175">
                This archive is built slowly and intentionally — prioritizing
                quality, coherence, and atmosphere over volume. New work is
                added regularly, reflecting ongoing journeys, projects, and
                visual exploration.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="store-text176">Why This Collection</span>
            </Fragment>
          }
          rootClassName="store-why-this-collectionroot-class-name"
        ></StoreWhyThisCollection>
        <StoreFinalCTA
          action2={
            <Fragment>
              <span className="store-text177">Browse the Collection</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="store-text178">
                Let’s find the right visual for your story.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="store-text179">
                Looking for imagery with depth and intention?
              </span>
            </Fragment>
          }
          rootClassName="store-final-ct-aroot-class-name"
        ></StoreFinalCTA>
        <StoreSearchBar></StoreSearchBar>
        <StoreCollection01
          content1={
            <Fragment>
              <span className="store-text180">
                Explore our diverse range of services through the images below.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="store-text181">Our Collection</span>
            </Fragment>
          }
        ></StoreCollection01>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="store-text182">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="store-text183">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="store-text184">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="store-text185">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="store-text186">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="store-text187">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="store-text188">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="store-text189">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="store-text190">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="store-text191">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="store-text192">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="store-text193">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="store-text194">Animation &amp; Motion</span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="store-text195">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="store-text196">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="store-text197">Terms &amp; Conditions</span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="store-text198">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="store-text199">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name16"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .store-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .store-text100 {
            display: inline-block;
          }
          .store-text101 {
            display: inline-block;
          }
          .store-text102 {
            display: inline-block;
          }
          .store-text103 {
            display: inline-block;
          }
          .store-text104 {
            display: inline-block;
          }
          .store-text105 {
            display: inline-block;
          }
          .store-text106 {
            display: inline-block;
          }
          .store-text107 {
            display: inline-block;
          }
          .store-text108 {
            display: inline-block;
          }
          .store-text109 {
            display: inline-block;
          }
          .store-text110 {
            display: inline-block;
          }
          .store-text111 {
            display: inline-block;
          }
          .store-text112 {
            display: inline-block;
          }
          .store-text113 {
            display: inline-block;
          }
          .store-text114 {
            display: inline-block;
          }
          .store-text115 {
            display: inline-block;
          }
          .store-text116 {
            display: inline-block;
          }
          .store-text117 {
            display: inline-block;
          }
          .store-text118 {
            display: inline-block;
          }
          .store-text119 {
            display: inline-block;
          }
          .store-text120 {
            display: inline-block;
          }
          .store-text124 {
            display: inline-block;
          }
          .store-text125 {
            display: inline-block;
          }
          .store-text126 {
            display: inline-block;
          }
          .store-text127 {
            display: inline-block;
          }
          .store-text128 {
            display: inline-block;
          }
          .store-text129 {
            display: inline-block;
          }
          .store-text130 {
            display: inline-block;
          }
          .store-text131 {
            display: inline-block;
          }
          .store-text132 {
            display: inline-block;
          }
          .store-text133 {
            display: inline-block;
          }
          .store-text134 {
            display: inline-block;
          }
          .store-text135 {
            display: inline-block;
          }
          .store-text136 {
            display: inline-block;
          }
          .store-text137 {
            display: inline-block;
          }
          .store-text138 {
            display: inline-block;
          }
          .store-text139 {
            display: inline-block;
          }
          .store-text140 {
            display: inline-block;
          }
          .store-text141 {
            display: inline-block;
          }
          .store-text142 {
            display: inline-block;
          }
          .store-text143 {
            display: inline-block;
          }
          .store-text144 {
            display: inline-block;
          }
          .store-text145 {
            display: inline-block;
          }
          .store-text146 {
            display: inline-block;
          }
          .store-text147 {
            display: inline-block;
          }
          .store-text148 {
            display: inline-block;
          }
          .store-text151 {
            display: inline-block;
          }
          .store-text152 {
            display: inline-block;
          }
          .store-text153 {
            display: inline-block;
          }
          .store-text154 {
            display: inline-block;
          }
          .store-text155 {
            display: inline-block;
          }
          .store-text156 {
            display: inline-block;
          }
          .store-text157 {
            display: inline-block;
          }
          .store-text158 {
            display: inline-block;
          }
          .store-text159 {
            display: inline-block;
          }
          .store-text160 {
            display: inline-block;
          }
          .store-text161 {
            display: inline-block;
          }
          .store-text162 {
            display: inline-block;
          }
          .store-text163 {
            display: inline-block;
          }
          .store-text164 {
            display: inline-block;
          }
          .store-text165 {
            display: inline-block;
          }
          .store-text166 {
            display: inline-block;
          }
          .store-text167 {
            display: inline-block;
          }
          .store-text168 {
            display: inline-block;
          }
          .store-text169 {
            display: inline-block;
          }
          .store-text175 {
            display: inline-block;
          }
          .store-text176 {
            display: inline-block;
          }
          .store-text177 {
            display: inline-block;
          }
          .store-text178 {
            display: inline-block;
          }
          .store-text179 {
            display: inline-block;
          }
          .store-text180 {
            display: inline-block;
          }
          .store-text181 {
            display: inline-block;
          }
          .store-text182 {
            display: inline-block;
          }
          .store-text183 {
            display: inline-block;
          }
          .store-text184 {
            display: inline-block;
          }
          .store-text185 {
            display: inline-block;
          }
          .store-text186 {
            display: inline-block;
          }
          .store-text187 {
            display: inline-block;
          }
          .store-text188 {
            display: inline-block;
          }
          .store-text189 {
            display: inline-block;
          }
          .store-text190 {
            display: inline-block;
          }
          .store-text191 {
            display: inline-block;
          }
          .store-text192 {
            display: inline-block;
          }
          .store-text193 {
            display: inline-block;
          }
          .store-text194 {
            display: inline-block;
          }
          .store-text195 {
            display: inline-block;
          }
          .store-text196 {
            display: inline-block;
          }
          .store-text197 {
            display: inline-block;
          }
          .store-text198 {
            display: inline-block;
          }
          .store-text199 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default Store
