import React, { Fragment } from 'react'
import Head from 'next/head'

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
      <div className="spPage">
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

        {/* ===== cinematic background layer ===== */}
        <div className="spBg" aria-hidden="true">
          <div className="spVignette" />
          <div className="spGlow" />
          <div className="spGrain" />
        </div>

        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="t">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="t">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="t">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="t">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="t">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="t">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="t">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="t">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="t">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="t">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="t">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="t">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="t">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="t">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="t">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="t">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="t">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name19"
        />

        {/* ===== content frame (luxury) ===== */}
        <main className="spMain">
          <div className="spRail">
            <ServicePhotographyHero
              action3={
                <Fragment>
                  <span className="t">Explore Work</span>
                </Fragment>
              }
              content1={
                <Fragment>
                  <span className="t">
                    Photography approached as storytelling - crafted with
                    cinematic intent and emotional clarity.
                  </span>
                </Fragment>
              }
              heading1={
                <Fragment>
                  <span className="t">
                    <span>Still imagery shaped by light, mood, and atmosphere.</span>
                    <br />
                  </span>
                </Fragment>
              }
              rootClassName="service-photography-heroroot-class-name"
            />

            {/* ===== sections wrapper: same rhythm + subtle dividers ===== */}
            <section className="spStack">
              <div className="spSection">
                <IntroductionPhotographyServices
                  feature1Title={
                    <Fragment>
                      <span className="t">Introduction</span>
                    </Fragment>
                  }
                  rootClassName="introduction-photography-servicesroot-class-name"
                  feature1Description={
                    <Fragment>
                      <span className="t">
                        <span>
                          Photography is where my visual language began. I
                          approach still images the same way I approach film —
                          with attention to light, composition, and the feeling
                          a moment carries.
                        </span>
                        <br />
                        <span>
                          Each photograph is created to stand on its own, while
                          also fitting naturally into larger visual narratives
                          for editorial, commercial, and artistic use.
                        </span>
                      </span>
                    </Fragment>
                  }
                />
              </div>

              <div className="spDivider" aria-hidden="true" />

              <div className="spSection">
                <SelectedPhotography
                  content1={
                    <Fragment>
                      <span className="t">
                        A curated selection of editorial, cinematic, and fine-art
                        photography — focused on atmosphere, texture, and detail.
                      </span>
                    </Fragment>
                  }
                  heading1={
                    <Fragment>
                      <span className="t">Selected Photography</span>
                    </Fragment>
                  }
                  rootClassName="selected-photographyroot-class-name"
                />
              </div>

              <div className="spDivider" aria-hidden="true" />

              <div className="spSection">
                <WhatIDoPhotographyServices
                  sectionTitle={
                    <Fragment>
                      <span className="t">What I Do</span>
                    </Fragment>
                  }
                  feature1Title={
                    <Fragment>
                      <span className="t">Cinematic &amp; Editorial Photography</span>
                    </Fragment>
                  }
                  feature2Title={
                    <Fragment>
                      <span className="t">Nature &amp; Wildlife</span>
                    </Fragment>
                  }
                  feature3Title={
                    <Fragment>
                      <span className="t">Landscape &amp; Travel</span>
                    </Fragment>
                  }
                  feature4Title={
                    <Fragment>
                      <span className="t">Black &amp; White Fine Art</span>
                    </Fragment>
                  }
                  rootClassName="what-i-do-photography-servicesroot-class-name"
                  feature1Button={
                    <Fragment>
                      <span className="t">Learn More</span>
                    </Fragment>
                  }
                  feature2Button={
                    <Fragment>
                      <span className="t">Discover More</span>
                    </Fragment>
                  }
                  feature3Button={
                    <Fragment>
                      <span className="t">Explore Now</span>
                    </Fragment>
                  }
                  feature4Button={
                    <Fragment>
                      <span className="t">View Portfolio</span>
                    </Fragment>
                  }
                  feature1Description={
                    <Fragment>
                      <span className="t">
                        Story-driven imagery created with intention and visual depth.
                      </span>
                    </Fragment>
                  }
                  feature2Description={
                    <Fragment>
                      <span className="t">
                        Quiet, patient observations of the natural world, captured with
                        respect and realism.
                      </span>
                    </Fragment>
                  }
                  feature3Description={
                    <Fragment>
                      <span className="t">
                        Expansive scenes that convey scale, mood, and a sense of place.
                      </span>
                    </Fragment>
                  }
                  feature4Description={
                    <Fragment>
                      <span className="t">
                        Timeless compositions focused on light, form, and emotion.
                      </span>
                    </Fragment>
                  }
                />
              </div>

              <div className="spDivider" aria-hidden="true" />

              <div className="spSection">
                <HowIApproachPhotography
                  feature1Title={
                    <Fragment>
                      <span className="t">How I Approach Photography</span>
                    </Fragment>
                  }
                  rootClassName="how-i-approach-photographyroot-class-name"
                  feature1Description={
                    <Fragment>
                      <span className="t">
                        <span>
                          I look for moments that feel honest and unforced.
                          Light, timing, and stillness matter more than spectacle.
                        </span>
                        <br />
                        <span>
                          Whether working in controlled environments or in the
                          field, the goal is always the same — to create images
                          that feel considered, immersive, and lasting.
                        </span>
                      </span>
                    </Fragment>
                  }
                />
              </div>

              <div className="spDivider" aria-hidden="true" />

              <div className="spSection">
                <WhoItsForPhotography
                  content1={
                    <Fragment>
                      <span className="t">
                        I work with brands, agencies, filmmakers, and individuals who
                        value craft, atmosphere, and intentional storytelling — and who
                        see film as more than just content.
                      </span>
                    </Fragment>
                  }
                  heading1={
                    <Fragment>
                      <span className="t">Who It’s For</span>
                    </Fragment>
                  }
                  rootClassName="who-its-for-photographyroot-class-name"
                />
              </div>

              <div className="spDivider" aria-hidden="true" />

              <div className="spSection">
                <PhotographyServicesFinalCTA
                  action2={
                    <Fragment>
                      <span className="t">Create Together</span>
                    </Fragment>
                  }
                  content1={
                    <Fragment>
                      <span className="t">
                        Let’s create something with clarity, atmosphere, and purpose.
                      </span>
                    </Fragment>
                  }
                  heading1={
                    <Fragment>
                      <span className="t">
                        Looking for imagery with depth and intention?
                      </span>
                    </Fragment>
                  }
                  rootClassName="photography-services-final-ct-aroot-class-name"
                />
              </div>
            </section>
          </div>
        </main>

        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="t">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="t">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="t">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="t">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="t">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="t">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="t">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="t">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="t">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="t">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="t">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="t">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="t">Animation &amp; Motion</span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="t">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="t">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="t">Terms &amp; Conditions</span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="t">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="t">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name18"
        />
      </div>

      <style jsx>{`
        .spPage {
          width: 100%;
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          background: #0b0b0c; /* base */
        }

        /* cinematic background layer */
        .spBg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .spVignette {
          position: absolute;
          inset: -10%;
          background: radial-gradient(
              70% 60% at 30% 20%,
              rgba(255, 255, 255, 0.04),
              rgba(0, 0, 0, 0.86)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.25) 55%,
              rgba(0, 0, 0, 0.78) 100%
            );
          opacity: 0.9;
        }

        .spGlow {
          position: absolute;
          inset: -20%;
          background: radial-gradient(
            40% 32% at 22% 28%,
            rgba(37, 195, 226, 0.12),
            rgba(37, 195, 226, 0) 62%
          );
          filter: blur(12px);
          opacity: 0.9;
        }

        .spGrain {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 260px 260px;
        }

        /* content always above bg */
        .spPage :global(*) {
          position: relative;
          z-index: 1;
        }

        /* main area */
        .spMain {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* rail gives premium “framed” feel */
        .spRail {
          width: 100%;
          max-width: 1180px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* stack of sections with consistent rhythm */
        .spStack {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 22px;
          padding: 6px 0 10px;
        }

        .spSection {
          width: 100%;
        }

        /* subtle thin divider like SoundDesign */
        .spDivider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.12),
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0.12)
          );
          opacity: 0.9;
        }

        .t {
          display: inline-block;
        }

        @media (max-width: 767px) {
          .spRail {
            max-width: 100%;
          }
          .spStack {
            gap: 18px;
          }
        }
      `}</style>
    </>
  )
}

export default ServicesPhotography