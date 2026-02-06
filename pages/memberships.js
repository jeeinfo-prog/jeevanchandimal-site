import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import MembershipHero from '../components/membership-hero'
import MembershipPhilosophy from '../components/membership-philosophy'
import MembershipLevel from '../components/membership-level'
import WhatYouGet from '../components/what-you-get'
import StoreLicensingSimplified1 from '../components/store-licensing-simplified1'
import MembershipCreator from '../components/membership-creator'
import MembershipPricing from '../components/membership-pricing'
import HowItWorks from '../components/how-it-works'
import MembershipFAQ01 from '../components/membership-faq-01'
import MembershipFAQ02 from '../components/membership-faq-02'
import MembershipFAQ03 from '../components/membership-faq-03'
import MembershipCTA from '../components/membership-cta'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const Memberships = (props) => {
  return (
    <>
      <div className="memberships-container">
        <Head>
          <title>
            Memberships - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Memberships - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/memberships"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="memberships-text100">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="memberships-text101">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="memberships-text102">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="memberships-text103">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="memberships-text104">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="memberships-text105">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="memberships-text106">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="memberships-text107">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="memberships-text108">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="memberships-text109">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="memberships-text110">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="memberships-text111">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="memberships-text112">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="memberships-text113">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="memberships-text114">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="memberships-text115">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="memberships-text116">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name16"
        ></JeevanChandimalNavi>
        <MembershipHero
          action3={
            <Fragment>
              <span className="memberships-text117">Join Membership</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="memberships-text118">
                <span>
                  Jeevan Chandimal Membership grants access to a carefully
                  maintained archive of cinematic imagery,
                </span>
                <br></br>
                <span>
                  created and curated with the discipline of film — not the
                  habits of stock.
                </span>
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="memberships-text122">
                A Private Cinematic Library
              </span>
            </Fragment>
          }
          heading11={
            <Fragment>
              <span className="memberships-text123">Nothing excessive.</span>
            </Fragment>
          }
          heading111={
            <Fragment>
              <span className="memberships-text124">
                <span>
                  Built for creators who understand that visuals are not
                  decoration -
                </span>
                <br></br>
                <span>they are presence.</span>
              </span>
            </Fragment>
          }
          heading112={
            <Fragment>
              <span className="memberships-text128">
                <span>Nothing accidental.</span>
                <br></br>
              </span>
            </Fragment>
          }
          heading1121={
            <Fragment>
              <span className="memberships-text131">
                Only work that endures.
              </span>
            </Fragment>
          }
        ></MembershipHero>
        <MembershipPhilosophy
          mainAction={
            <Fragment>
              <span className="memberships-text132">View Our Portfolio</span>
            </Fragment>
          }
          sectionTitle={
            <Fragment>
              <span className="memberships-text133">THE PHILOSOPHY</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="memberships-text134">
                Each visual exists for a reason:
              </span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="memberships-text135">
                <span>You don’t search endlessly.</span>
                <br></br>
              </span>
            </Fragment>
          }
          secondaryAction={
            <Fragment>
              <span className="memberships-text138">
                Contact Us for a Quote
              </span>
            </Fragment>
          }
          featureDescription={
            <Fragment>
              <span className="memberships-text139">
                We offer film production, audio production, animation, and
                photography services to meet all your visual production needs.
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="memberships-text140">
                <span> To hold mood</span>
                <br></br>
                <span>To support narrative</span>
                <br></br>
                <span>To elevate the frame</span>
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="memberships-text146">
                You select with certainty.
              </span>
            </Fragment>
          }
        ></MembershipPhilosophy>
        <MembershipLevel
          sectionTitle={
            <Fragment>
              <span className="memberships-text147">MEMBERSHIP LEVELS</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="memberships-text148">ESSENTIAL</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="memberships-text149">SIGNATURE</span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="memberships-text150">PRIVATE ACCESS</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="memberships-text151">
                <span>A foundation for refined visual language.</span>
                <br></br>
                <span>
                  Access to a rotating selection of cinematic photography and
                  atmospheric imagery, professionally graded and prepared for
                  serious creative use.
                </span>
                <br></br>
                <span>
                  Designed for individual creators and small studios shaping
                  their visual identity.
                </span>
              </span>
            </Fragment>
          }
          feature2Description={
            <Fragment>
              <span className="memberships-text157">
                <span>Expanded access for elevated work.</span>
                <br></br>
                <span>
                  Includes the complete Essential library, alongside broader
                  cinematic environments, priority access to new releases, and
                  extended commercial usage.
                </span>
                <br></br>
                <span>
                  Created for studios and brands producing work at scale —
                  without compromise.
                </span>
              </span>
            </Fragment>
          }
          feature3Description={
            <Fragment>
              <span className="memberships-text163">
                <span>Invitation-based.</span>
                <br></br>
                <span>
                  Full access to the Signature library, plus exclusive
                  collections reserved for private members. Early releases,
                  limited visuals, and priority consideration for direct
                  collaboration.
                </span>
                <br></br>
                <span>Membership is intentionally limited.</span>
              </span>
            </Fragment>
          }
        ></MembershipLevel>
        <WhatYouGet
          count1={
            <Fragment>
              <span className="memberships-text169">Feature</span>
            </Fragment>
          }
          count2={
            <Fragment>
              <span className="memberships-text170">Description</span>
            </Fragment>
          }
          feature1={
            <Fragment>
              <span className="memberships-text171">Icon</span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="memberships-text172">THE COLLECTION</span>
            </Fragment>
          }
          feature21={
            <Fragment>
              <span className="memberships-text173">Cinematic Photography</span>
            </Fragment>
          }
          subtitle1={
            <Fragment>
              <span className="memberships-text174">
                Every piece is curated to stand alone - yet belong together.
              </span>
            </Fragment>
          }
          feature211={
            <Fragment>
              <span className="memberships-text175">
                Frame-worthy shots with a filmic touch
              </span>
            </Fragment>
          }
          feature212={
            <Fragment>
              <span className="memberships-text176">
                Nature &amp; Wildlife Visuals
              </span>
            </Fragment>
          }
          feature2111={
            <Fragment>
              <span className="memberships-text177">
                Authentic moments from the wild, captured with patience and
                precision.
              </span>
            </Fragment>
          }
          feature2121={
            <Fragment>
              <span className="memberships-text178">
                Landscape &amp; Travel Atmospheres
              </span>
            </Fragment>
          }
          feature21111={
            <Fragment>
              <span className="memberships-text179">
                Expansive scenes that carry mood, scale, and a sense of place.
              </span>
            </Fragment>
          }
          feature21211={
            <Fragment>
              <span className="memberships-text180">
                Black &amp; White Fine Art
              </span>
            </Fragment>
          }
          feature211111={
            <Fragment>
              <span className="memberships-text181">
                Timeless compositions focused on light, texture, and emotion.
              </span>
            </Fragment>
          }
          feature212111={
            <Fragment>
              <span className="memberships-text182">
                Film-grade color and texture
              </span>
            </Fragment>
          }
          feature2111111={
            <Fragment>
              <span className="memberships-text183">
                Carefully color-graded visuals, ready for creative use.
              </span>
            </Fragment>
          }
          feature2121111={
            <Fragment>
              <span className="memberships-text184">
                High Resolution master files
              </span>
            </Fragment>
          }
          feature21111111={
            <Fragment>
              <span className="memberships-text185">
                Detailed, print-quality files suitable for professional
                projects.
              </span>
            </Fragment>
          }
          featureCategory1={
            <Fragment>
              <span className="memberships-text186">Standard Features</span>
            </Fragment>
          }
        ></WhatYouGet>
        <StoreLicensingSimplified1
          feature1Title={
            <Fragment>
              <span className="memberships-text187">Licensing Simplified</span>
            </Fragment>
          }
          rootClassName="store-licensing-simplified1root-class-name"
          feature1Action1={
            <Fragment>
              <span className="memberships-text188">View Full License</span>
            </Fragment>
          }
          feature1Action2={
            <Fragment>
              <span className="memberships-text189">Get Started Today</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="memberships-text190">
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
        <MembershipCreator
          sectionTitle={
            <Fragment>
              <span className="memberships-text196">INTENDED FOR</span>
            </Fragment>
          }
          feature1Title={
            <Fragment>
              <span className="memberships-text197">Restraint over excess</span>
            </Fragment>
          }
          feature2Title={
            <Fragment>
              <span className="memberships-text198">
                Timelessness over trends
              </span>
            </Fragment>
          }
          feature3Title={
            <Fragment>
              <span className="memberships-text199">
                Craft over convenience
              </span>
            </Fragment>
          }
          sectionDescription={
            <Fragment>
              <span className="memberships-text200">
                Creators, studios, and brands who value:
              </span>
            </Fragment>
          }
          sectionDescription1={
            <Fragment>
              <span className="memberships-text201">
                If you recognize this tone, you belong here.
              </span>
            </Fragment>
          }
        ></MembershipCreator>
        <MembershipPricing
          plan1={
            <Fragment>
              <span className="memberships-text202">ESSENTIAL</span>
            </Fragment>
          }
          plan2={
            <Fragment>
              <span className="memberships-text203">SIGNATURE</span>
            </Fragment>
          }
          plan3={
            <Fragment>
              <span className="memberships-text204">PRIVATE ACCESS</span>
            </Fragment>
          }
          plan11={
            <Fragment>
              <span className="memberships-text205">Basic plan</span>
            </Fragment>
          }
          plan21={
            <Fragment>
              <span className="memberships-text206">Business plan</span>
            </Fragment>
          }
          plan31={
            <Fragment>
              <span className="memberships-text207">Enterprise plan</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="memberships-text208">
                Choose the perfect plan for you
              </span>
            </Fragment>
          }
          content2={
            <Fragment>
              <span className="memberships-text209">
                <span>Choose the level of access that matches </span>
                <span>the way you work.</span>
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="memberships-text212">MEMBERSHIP OPTIONS</span>
            </Fragment>
          }
          plan1Price={
            <Fragment>
              <span className="memberships-text213">$39 / month</span>
            </Fragment>
          }
          plan2Price={
            <Fragment>
              <span className="memberships-text214">$119 / month</span>
            </Fragment>
          }
          plan1Action={
            <Fragment>
              <span className="memberships-text215">Proceed to Membership</span>
            </Fragment>
          }
          plan1Price1={
            <Fragment>
              <span className="memberships-text216">$199</span>
            </Fragment>
          }
          plan1Yearly={
            <Fragment>
              <span className="memberships-text217">or $390 / year</span>
            </Fragment>
          }
          plan2Action={
            <Fragment>
              <span className="memberships-text218">Proceed to Membership</span>
            </Fragment>
          }
          plan2Price1={
            <Fragment>
              <span className="memberships-text219">$299/yr</span>
            </Fragment>
          }
          plan2Yearly={
            <Fragment>
              <span className="memberships-text220">or $1,190 / year</span>
            </Fragment>
          }
          plan3Action={
            <Fragment>
              <span className="memberships-text221">Proceed to Membership</span>
            </Fragment>
          }
          plan3Price1={
            <Fragment>
              <span className="memberships-text222">$499/yr</span>
            </Fragment>
          }
          plan1Action1={
            <Fragment>
              <span className="memberships-text223">Contact Us</span>
            </Fragment>
          }
          plan1Yearly1={
            <Fragment>
              <span className="memberships-text224">$1999</span>
            </Fragment>
          }
          plan2Action1={
            <Fragment>
              <span className="memberships-text225">Get started</span>
            </Fragment>
          }
          plan2Yearly1={
            <Fragment>
              <span className="memberships-text226">or $29 monthly</span>
            </Fragment>
          }
          plan3Action1={
            <Fragment>
              <span className="memberships-text227">Get started</span>
            </Fragment>
          }
          plan3Yearly1={
            <Fragment>
              <span className="memberships-text228">or $49 monthly</span>
            </Fragment>
          }
          plan1Feature1={
            <Fragment>
              <span className="memberships-text229">
                A refined starting point.
              </span>
            </Fragment>
          }
          plan2Feature1={
            <Fragment>
              <span className="memberships-text230">
                For expanded continuity and scale.
              </span>
            </Fragment>
          }
          plan2Feature2={
            <Fragment>
              <span className="memberships-text231">
                <span>
                  Broader access to the complete Essential collection,
                </span>
                <br></br>
                <span>with extended environments, priority releases,</span>
                <br></br>
                <span>and expanded commercial usage.</span>
              </span>
            </Fragment>
          }
          plan3Feature1={
            <Fragment>
              <span className="memberships-text237">Invitation only.</span>
            </Fragment>
          }
          plan3Feature2={
            <Fragment>
              <span className="memberships-text238">
                <span>Full access to Signature,</span>
                <br></br>
                <span>
                  alongside private collections not publicly available.
                </span>
                <br></br>
              </span>
            </Fragment>
          }
          plan3Feature3={
            <Fragment>
              <span className="memberships-text243">
                <span>Early releases.</span>
                <br></br>
                <span>Limited materials.</span>
                <br></br>
                <span>Priority collaboration consideration.</span>
              </span>
            </Fragment>
          }
          plan3Feature4={
            <Fragment>
              <span className="memberships-text249">By invitation</span>
            </Fragment>
          }
          plan3Feature5={
            <Fragment>
              <span className="memberships-text250">
                Request access to be considered.
              </span>
            </Fragment>
          }
          plan1Feature11={
            <Fragment>
              <span className="memberships-text251">Customized Solutions</span>
            </Fragment>
          }
          plan1Feature21={
            <Fragment>
              <span className="memberships-text252">
                Dedicated Customer Support
              </span>
            </Fragment>
          }
          plan1Feature31={
            <Fragment>
              <span className="memberships-text253">
                Powerful Analytics Tools
              </span>
            </Fragment>
          }
          plan1Feature34={
            <Fragment>
              <span className="memberships-text254">
                <span>
                  Access to a rotating selection of cinematic imagery,
                </span>
                <br></br>
                <span>prepared for professional creative use.</span>
              </span>
            </Fragment>
          }
          plan1Feature35={
            <Fragment>
              <span className="memberships-text258">
                <span>Best suited for individual creators</span>
                <br></br>
                <span>and small studios establishing visual language.</span>
              </span>
            </Fragment>
          }
          plan2Feature11={
            <Fragment>
              <span className="memberships-text262">
                Feature text goes here
              </span>
            </Fragment>
          }
          plan2Feature21={
            <Fragment>
              <span className="memberships-text263">
                Feature text goes here
              </span>
            </Fragment>
          }
          plan2Feature31={
            <Fragment>
              <span className="memberships-text264">
                Feature text goes here
              </span>
            </Fragment>
          }
          plan2Feature32={
            <Fragment>
              <span className="memberships-text265">
                <span>Designed for studios and brands</span>
                <br></br>
                <span>working across multiple projects.</span>
              </span>
            </Fragment>
          }
          plan2Feature41={
            <Fragment>
              <span className="memberships-text269">
                Feature text goes here
              </span>
            </Fragment>
          }
          plan3Feature11={
            <Fragment>
              <span className="memberships-text270">
                Feature text goes here
              </span>
            </Fragment>
          }
          plan3Feature21={
            <Fragment>
              <span className="memberships-text271">
                Feature text goes here
              </span>
            </Fragment>
          }
          plan3Feature31={
            <Fragment>
              <span className="memberships-text272">
                Feature text goes here
              </span>
            </Fragment>
          }
          plan3Feature41={
            <Fragment>
              <span className="memberships-text273">
                Feature text goes here
              </span>
            </Fragment>
          }
          plan3Feature51={
            <Fragment>
              <span className="memberships-text274">
                Feature text goes here
              </span>
            </Fragment>
          }
          plan3Feature53={
            <Fragment>
              <span className="memberships-text275">.</span>
            </Fragment>
          }
        ></MembershipPricing>
        <HowItWorks
          content2={
            <Fragment>
              <span className="memberships-text276">
                Select the plan that fits your creative needs and level of
                usage.
              </span>
            </Fragment>
          }
          content3={
            <Fragment>
              <span className="memberships-text277">
                Your account opens immediately, unlocking the full image library
                included in your plan.
              </span>
            </Fragment>
          }
          content4={
            <Fragment>
              <span className="memberships-text278">
                Browse the collection and download high-resolution visuals for
                your projects.
              </span>
            </Fragment>
          }
          content5={
            <Fragment>
              <span className="memberships-text279">
                Use the imagery to build films, campaigns, designs, and stories
                with cinematic depth.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="memberships-text280">How It Works</span>
            </Fragment>
          }
          heading2={
            <Fragment>
              <span className="memberships-text281">
                Choose Your Membership
              </span>
            </Fragment>
          }
          heading3={
            <Fragment>
              <span className="memberships-text282">Get Instant Access</span>
            </Fragment>
          }
          heading4={
            <Fragment>
              <span className="memberships-text283">
                Download What Inspires You
              </span>
            </Fragment>
          }
          heading5={
            <Fragment>
              <span className="memberships-text284">Create Without Limits</span>
            </Fragment>
          }
        ></HowItWorks>
        <MembershipFAQ01
          content1={
            <Fragment>
              <span className="memberships-text285">
                We offer customized solutions for film production, audio
                production, animation, and photography. From concept to final
                delivery, we focus on cinematic intent and attention to detail.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="memberships-text286">
                Frequently Asked Questions
              </span>
            </Fragment>
          }
          faq1Question={
            <Fragment>
              <span className="memberships-text287">
                What does the membership include?
              </span>
            </Fragment>
          }
          faq2Question={
            <Fragment>
              <span className="memberships-text288">
                How can I use the images?
              </span>
            </Fragment>
          }
          faq3Question={
            <Fragment>
              <span className="memberships-text289">
                Are the images sold exclusively?
              </span>
            </Fragment>
          }
          faq4Question={
            <Fragment>
              <span className="memberships-text290">
                Can I use the images for client work?
              </span>
            </Fragment>
          }
          faq1Question1={
            <Fragment>
              <span className="memberships-text291">
                Is there a limit to how many images I can download?
              </span>
            </Fragment>
          }
        ></MembershipFAQ01>
        <MembershipFAQ02
          faq1Question={
            <Fragment>
              <span className="memberships-text292">
                Do downloads expire if I cancel my membership?
              </span>
            </Fragment>
          }
          faq2Question={
            <Fragment>
              <span className="memberships-text293">
                Can I cancel my membership anytime?
              </span>
            </Fragment>
          }
          faq3Question={
            <Fragment>
              <span className="memberships-text294">Do you offer refunds?</span>
            </Fragment>
          }
          faq4Question={
            <Fragment>
              <span className="memberships-text295">
                Are high-resolution files included?
              </span>
            </Fragment>
          }
          faq1Question1={
            <Fragment>
              <span className="memberships-text296">
                How often is new content added?
              </span>
            </Fragment>
          }
        ></MembershipFAQ02>
        <MembershipFAQ03
          action={
            <Fragment>
              <span className="memberships-text297">Contact</span>
            </Fragment>
          }
          content2={
            <Fragment>
              <span className="memberships-text298">
                Jeevan Chandimal is a filmmaker and visual storyteller who
                specializes in creating visual stories with atmosphere and
                emotional clarity.
              </span>
            </Fragment>
          }
          heading2={
            <Fragment>
              <span className="memberships-text299">
                Still have a question?
              </span>
            </Fragment>
          }
          faq1Question={
            <Fragment>
              <span className="memberships-text300">
                What if I need a custom license or special usage?
              </span>
            </Fragment>
          }
          faq2Question={
            <Fragment>
              <span className="memberships-text301">
                Can I upgrade or change my membership plan later?
              </span>
            </Fragment>
          }
        ></MembershipFAQ03>
        <MembershipCTA
          action1={
            <Fragment>
              <span className="memberships-text302">Join Membership</span>
            </Fragment>
          }
          action2={
            <Fragment>
              <span className="memberships-text303">View Plans</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="memberships-text304">
                <span>Build with intention.</span>
                <br></br>
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="memberships-text307">
                Create with restraint.
              </span>
            </Fragment>
          }
        ></MembershipCTA>
        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="memberships-text308">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="memberships-text309">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="memberships-text310">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="memberships-text311">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="memberships-text312">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="memberships-text313">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="memberships-text314">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="memberships-text315">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="memberships-text316">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="memberships-text317">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="memberships-text318">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="memberships-text319">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="memberships-text320">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="memberships-text321">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="memberships-text322">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="memberships-text323">
                Terms &amp; Conditions
              </span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="memberships-text324">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="memberships-text325">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name17"
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .memberships-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .memberships-text100 {
            display: inline-block;
          }
          .memberships-text101 {
            display: inline-block;
          }
          .memberships-text102 {
            display: inline-block;
          }
          .memberships-text103 {
            display: inline-block;
          }
          .memberships-text104 {
            display: inline-block;
          }
          .memberships-text105 {
            display: inline-block;
          }
          .memberships-text106 {
            display: inline-block;
          }
          .memberships-text107 {
            display: inline-block;
          }
          .memberships-text108 {
            display: inline-block;
          }
          .memberships-text109 {
            display: inline-block;
          }
          .memberships-text110 {
            display: inline-block;
          }
          .memberships-text111 {
            display: inline-block;
          }
          .memberships-text112 {
            display: inline-block;
          }
          .memberships-text113 {
            display: inline-block;
          }
          .memberships-text114 {
            display: inline-block;
          }
          .memberships-text115 {
            display: inline-block;
          }
          .memberships-text116 {
            display: inline-block;
          }
          .memberships-text117 {
            display: inline-block;
          }
          .memberships-text118 {
            display: inline-block;
          }
          .memberships-text122 {
            display: inline-block;
          }
          .memberships-text123 {
            display: inline-block;
          }
          .memberships-text124 {
            display: inline-block;
          }
          .memberships-text128 {
            display: inline-block;
          }
          .memberships-text131 {
            display: inline-block;
          }
          .memberships-text132 {
            display: inline-block;
          }
          .memberships-text133 {
            display: inline-block;
          }
          .memberships-text134 {
            display: inline-block;
          }
          .memberships-text135 {
            display: inline-block;
          }
          .memberships-text138 {
            display: inline-block;
          }
          .memberships-text139 {
            display: inline-block;
          }
          .memberships-text140 {
            display: inline-block;
          }
          .memberships-text146 {
            display: inline-block;
          }
          .memberships-text147 {
            display: inline-block;
          }
          .memberships-text148 {
            display: inline-block;
          }
          .memberships-text149 {
            display: inline-block;
          }
          .memberships-text150 {
            display: inline-block;
          }
          .memberships-text151 {
            display: inline-block;
          }
          .memberships-text157 {
            display: inline-block;
          }
          .memberships-text163 {
            display: inline-block;
          }
          .memberships-text169 {
            display: inline-block;
          }
          .memberships-text170 {
            display: inline-block;
          }
          .memberships-text171 {
            display: inline-block;
          }
          .memberships-text172 {
            display: inline-block;
          }
          .memberships-text173 {
            display: inline-block;
          }
          .memberships-text174 {
            display: inline-block;
          }
          .memberships-text175 {
            display: inline-block;
          }
          .memberships-text176 {
            display: inline-block;
          }
          .memberships-text177 {
            display: inline-block;
          }
          .memberships-text178 {
            display: inline-block;
          }
          .memberships-text179 {
            display: inline-block;
          }
          .memberships-text180 {
            display: inline-block;
          }
          .memberships-text181 {
            display: inline-block;
          }
          .memberships-text182 {
            display: inline-block;
          }
          .memberships-text183 {
            display: inline-block;
          }
          .memberships-text184 {
            display: inline-block;
          }
          .memberships-text185 {
            display: inline-block;
          }
          .memberships-text186 {
            display: inline-block;
          }
          .memberships-text187 {
            display: inline-block;
          }
          .memberships-text188 {
            display: inline-block;
          }
          .memberships-text189 {
            display: inline-block;
          }
          .memberships-text190 {
            display: inline-block;
          }
          .memberships-text196 {
            display: inline-block;
          }
          .memberships-text197 {
            display: inline-block;
          }
          .memberships-text198 {
            display: inline-block;
          }
          .memberships-text199 {
            display: inline-block;
          }
          .memberships-text200 {
            display: inline-block;
          }
          .memberships-text201 {
            display: inline-block;
          }
          .memberships-text202 {
            display: inline-block;
          }
          .memberships-text203 {
            display: inline-block;
          }
          .memberships-text204 {
            display: inline-block;
          }
          .memberships-text205 {
            display: inline-block;
          }
          .memberships-text206 {
            display: inline-block;
          }
          .memberships-text207 {
            display: inline-block;
          }
          .memberships-text208 {
            display: inline-block;
          }
          .memberships-text209 {
            display: inline-block;
          }
          .memberships-text212 {
            display: inline-block;
          }
          .memberships-text213 {
            display: inline-block;
          }
          .memberships-text214 {
            display: inline-block;
          }
          .memberships-text215 {
            display: inline-block;
          }
          .memberships-text216 {
            display: inline-block;
          }
          .memberships-text217 {
            display: inline-block;
          }
          .memberships-text218 {
            display: inline-block;
          }
          .memberships-text219 {
            display: inline-block;
          }
          .memberships-text220 {
            display: inline-block;
          }
          .memberships-text221 {
            display: inline-block;
          }
          .memberships-text222 {
            display: inline-block;
          }
          .memberships-text223 {
            display: inline-block;
          }
          .memberships-text224 {
            display: inline-block;
          }
          .memberships-text225 {
            display: inline-block;
          }
          .memberships-text226 {
            display: inline-block;
          }
          .memberships-text227 {
            display: inline-block;
          }
          .memberships-text228 {
            display: inline-block;
          }
          .memberships-text229 {
            display: inline-block;
          }
          .memberships-text230 {
            display: inline-block;
          }
          .memberships-text231 {
            display: inline-block;
          }
          .memberships-text237 {
            display: inline-block;
          }
          .memberships-text238 {
            display: inline-block;
          }
          .memberships-text243 {
            display: inline-block;
          }
          .memberships-text249 {
            display: inline-block;
          }
          .memberships-text250 {
            display: inline-block;
          }
          .memberships-text251 {
            display: inline-block;
          }
          .memberships-text252 {
            display: inline-block;
          }
          .memberships-text253 {
            display: inline-block;
          }
          .memberships-text254 {
            display: inline-block;
          }
          .memberships-text258 {
            display: inline-block;
          }
          .memberships-text262 {
            display: inline-block;
          }
          .memberships-text263 {
            display: inline-block;
          }
          .memberships-text264 {
            display: inline-block;
          }
          .memberships-text265 {
            display: inline-block;
          }
          .memberships-text269 {
            display: inline-block;
          }
          .memberships-text270 {
            display: inline-block;
          }
          .memberships-text271 {
            display: inline-block;
          }
          .memberships-text272 {
            display: inline-block;
          }
          .memberships-text273 {
            display: inline-block;
          }
          .memberships-text274 {
            display: inline-block;
          }
          .memberships-text275 {
            display: inline-block;
          }
          .memberships-text276 {
            display: inline-block;
          }
          .memberships-text277 {
            display: inline-block;
          }
          .memberships-text278 {
            display: inline-block;
          }
          .memberships-text279 {
            display: inline-block;
          }
          .memberships-text280 {
            display: inline-block;
          }
          .memberships-text281 {
            display: inline-block;
          }
          .memberships-text282 {
            display: inline-block;
          }
          .memberships-text283 {
            display: inline-block;
          }
          .memberships-text284 {
            display: inline-block;
          }
          .memberships-text285 {
            display: inline-block;
          }
          .memberships-text286 {
            display: inline-block;
          }
          .memberships-text287 {
            display: inline-block;
          }
          .memberships-text288 {
            display: inline-block;
          }
          .memberships-text289 {
            display: inline-block;
          }
          .memberships-text290 {
            display: inline-block;
          }
          .memberships-text291 {
            display: inline-block;
          }
          .memberships-text292 {
            display: inline-block;
          }
          .memberships-text293 {
            display: inline-block;
          }
          .memberships-text294 {
            display: inline-block;
          }
          .memberships-text295 {
            display: inline-block;
          }
          .memberships-text296 {
            display: inline-block;
          }
          .memberships-text297 {
            display: inline-block;
          }
          .memberships-text298 {
            display: inline-block;
          }
          .memberships-text299 {
            display: inline-block;
          }
          .memberships-text300 {
            display: inline-block;
          }
          .memberships-text301 {
            display: inline-block;
          }
          .memberships-text302 {
            display: inline-block;
          }
          .memberships-text303 {
            display: inline-block;
          }
          .memberships-text304 {
            display: inline-block;
          }
          .memberships-text307 {
            display: inline-block;
          }
          .memberships-text308 {
            display: inline-block;
          }
          .memberships-text309 {
            display: inline-block;
          }
          .memberships-text310 {
            display: inline-block;
          }
          .memberships-text311 {
            display: inline-block;
          }
          .memberships-text312 {
            display: inline-block;
          }
          .memberships-text313 {
            display: inline-block;
          }
          .memberships-text314 {
            display: inline-block;
          }
          .memberships-text315 {
            display: inline-block;
          }
          .memberships-text316 {
            display: inline-block;
          }
          .memberships-text317 {
            display: inline-block;
          }
          .memberships-text318 {
            display: inline-block;
          }
          .memberships-text319 {
            display: inline-block;
          }
          .memberships-text320 {
            display: inline-block;
          }
          .memberships-text321 {
            display: inline-block;
          }
          .memberships-text322 {
            display: inline-block;
          }
          .memberships-text323 {
            display: inline-block;
          }
          .memberships-text324 {
            display: inline-block;
          }
          .memberships-text325 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default Memberships
