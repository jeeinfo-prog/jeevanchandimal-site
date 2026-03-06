// pages/services-audio.js
import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import ServiceAudioHero from '../components/service-audio-hero'
import IntroductionAudioServices from '../components/introduction-audio-services'
import SelectedAudioWork from '../components/selected-audio-work'
import WhatIDoAudioServices from '../components/what-i-do-audio-services'
import HowIApproachAudio from '../components/how-i-approach-audio'
import WhoItsForAudio from '../components/who-its-for-audio'
import ServicesAudioFinalCTA from '../components/services-audio-final-cta'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

const ServicesAudio = (props) => {
  // keep (even if unused) to match your setup
  useTranslations?.()

  return (
    <>
      <div className="page">
        <Head>
          <title>Services-Audio - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller</title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Services-Audio - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
          />
          <meta
            property="og:description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound."
          />
          <meta
            property="og:image"
            content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/1e052279-2879-4d4a-b576-0d545df1baa9/f8b288cf-c33a-4971-b301-c944c3ca6c1f?org_if_sml=1&amp;force_format=original"
          />
          <link rel="canonical" href="https://www.jeevanchandimal.com/services-audio" />
        </Head>

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
          rootClassName="jeevan-chandimal-naviroot-class-name20"
        />

        {/* ✅ THIS is the important part: ensures hero starts BELOW the nav */}
        <div className="navSpacer" aria-hidden="true" />

        <main className="main">
          {/* HERO */}
          <section className="section">
            <div className="block heroBlock">
              <ServiceAudioHero
                action3={
                  <Fragment>
                    <span className="t">Listen to Work</span>
                  </Fragment>
                }
                content1={
                  <Fragment>
                    <span className="t">
                      <span>Audio treated as a storytelling layer - not an afterthought.</span>
                      <br />
                    </span>
                  </Fragment>
                }
                heading1={
                  <Fragment>
                    <span className="t">
                      <span>Sound designed to deepen emotion and presence.</span>
                      <br />
                    </span>
                  </Fragment>
                }
                rootClassName="service-audio-heroroot-class-name"
              />
            </div>
          </section>

          {/* INTRO */}
          <section className="section">
            <IntroductionAudioServices
              feature1Title={
                <Fragment>
                  <span className="t">Introduction</span>
                </Fragment>
              }
              rootClassName="introduction-audio-servicesroot-class-name"
              feature1Description={
                <Fragment>
                  <span className="t">
                    <span>
                      Sound shapes how a story is felt. I approach audio with the same care as image
                      and motion, focusing on texture, space, and emotional impact.
                    </span>
                    <br />
                    <span>
                      From subtle atmospheres to full compositions, audio is crafted to support
                      narrative, rhythm, and cinematic flow.
                    </span>
                  </span>
                </Fragment>
              }
            />
          </section>

          {/* SELECTED AUDIO WORK */}
          <section className="section">
            <SelectedAudioWork
              content1={
                <Fragment>
                  <span className="t">
                    <span>
                      A selection of sound design and music created for film, visual projects, and
                      immersive experiences.
                    </span>
                    <br />
                  </span>
                </Fragment>
              }
              heading1={
                <Fragment>
                  <span className="t">Selected Audio Work</span>
                </Fragment>
              }
              rootClassName="selected-audio-workroot-class-name"
            />
          </section>

          {/* WHAT I DO */}
          <section className="section">
            <WhatIDoAudioServices
              sectionTitle={
                <Fragment>
                  <span className="t">What I Do</span>
                </Fragment>
              }
              feature1Title={
                <Fragment>
                  <span className="t">Sound Design</span>
                </Fragment>
              }
              feature2Title={
                <Fragment>
                  <span className="t">
                    <span>Music Composition</span>
                    <br />
                  </span>
                </Fragment>
              }
              feature3Title={
                <Fragment>
                  <span className="t">Audio Post-Production</span>
                </Fragment>
              }
              feature4Title={
                <Fragment>
                  <span className="t">
                    <span>Film &amp; Visual Audio</span>
                    <br />
                  </span>
                </Fragment>
              }
              rootClassName="what-i-do-audio-servicesroot-class-name"
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
                    Atmospheric soundscapes that add depth and realism to visual stories.
                  </span>
                </Fragment>
              }
              feature2Description={
                <Fragment>
                  <span className="t">
                    <span>
                      Original compositions built around mood, pacing, and emotional tone.
                    </span>
                    <br />
                  </span>
                </Fragment>
              }
              feature3Description={
                <Fragment>
                  <span className="t">Editing, mixing, and refinement for clarity, balance, and impact.</span>
                </Fragment>
              }
              feature4Description={
                <Fragment>
                  <span className="t">Sound created specifically to complement cinematic visuals.</span>
                </Fragment>
              }
            />
          </section>

          {/* HOW I APPROACH */}
          <section className="section">
            <HowIApproachAudio
              feature1Title={
                <Fragment>
                  <span className="t">How I Approach Audio</span>
                </Fragment>
              }
              rootClassName="how-i-approach-audioroot-class-name"
              feature1Description={
                <Fragment>
                  <span className="t">
                    <span>
                      I listen before I design. Silence, space, and restraint are as important as
                      sound itself.
                    </span>
                    <br />
                    <span>
                      Every layer is shaped to feel intentional — enhancing the story without
                      overpowering it.
                    </span>
                  </span>
                </Fragment>
              }
            />
          </section>

          {/* WHO IT'S FOR */}
          <section className="section">
            <WhoItsForAudio
              content1={
                <Fragment>
                  <span className="t">
                    I collaborate with filmmakers, visual artists, and studios who understand the
                    power of sound in storytelling.
                  </span>
                </Fragment>
              }
              heading1={
                <Fragment>
                  <span className="t">Who It’s For</span>
                </Fragment>
              }
              rootClassName="who-its-for-audioroot-class-name"
            />
          </section>

          {/* FINAL CTA */}
          <section className="section">
            <ServicesAudioFinalCTA
              action2={
                <Fragment>
                  <span className="t">Create Together</span>
                </Fragment>
              }
              content1={
                <Fragment>
                  <span className="t">Let’s shape it with depth, texture, and emotional clarity.</span>
                </Fragment>
              }
              heading1={
                <Fragment>
                  <span className="t">Have a story that needs sound?</span>
                </Fragment>
              }
              rootClassName="services-audio-final-ct-aroot-class-name"
            />
          </section>

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
            rootClassName="jeevan-chandimal-new-footerroot-class-name19"
          />
        </main>
      </div>

      <style jsx>{`
        :global(html),
        :global(body) {
          height: 100%;
          margin: 0;
          padding: 0;
        }

        :global(body) {
          overflow-x: hidden;
          background: #0b0b0b;
        }

        .page {
          width: 100%;
          min-height: 100vh;
          position: relative;
          background: #0b0b0b;
          color: #f5f4f4;
          overflow-x: hidden;
          overflow-y: visible;
        }

        /* ✅ the key: create physical space for a fixed/sticky nav */
        .navSpacer {
          height: var(--jc-nav-h, 72px);
          width: 100%;
          flex: 0 0 auto;
        }

        .main {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 0;
        }

        .section {
          width: 100%;
          display: flex;
          justify-content: center;
          margin: 0;
          padding: 0;
        }

        .block {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin: 0;
          padding: 0;
        }

        .heroBlock {
          margin-top: 0;
        }

        .t {
          display: inline-block;
        }
      `}</style>
    </>
  )
}

export default ServicesAudio