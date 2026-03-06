import React, { Fragment } from 'react'
import Head from 'next/head'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import ContactFormFinal from '../components/contact-form-final'
import ContactJC from '../components/contact-jc'
import ContactOffice from '../components/contact-office'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

const Contact = () => {
  return (
    <>
      <div className="contact-container">
        <Head>
          <title>Contact - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller</title>
          <meta
            name="description"
            content="Get in touch with Jeevan Chandimal for film, photography, motion, and audio collaborations. Cinematic work shaped with intention, mood, and restraint."
          />
          <meta
            property="og:title"
            content="Contact - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
          />
          <meta
            property="og:description"
            content="Get in touch with Jeevan Chandimal for film, photography, motion, and audio collaborations."
          />
          <meta
            property="og:image"
            content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/1e052279-2879-4d4a-b576-0d545df1baa9/f8b288cf-c33a-4971-b301-c944c3ca6c1f?org_if_sml=1&force_format=original"
          />
          <link rel="canonical" href="https://firm-these-stork-6nk3lv.teleporthq.app/contact" />
        </Head>

        <div className="page-bg" aria-hidden="true">
          <div className="page-vignette" />
          <div className="page-glow page-glow1" />
          <div className="page-glow page-glow2" />
          <div className="page-grain" />
        </div>

        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="contact-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="contact-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="contact-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="contact-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="contact-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="contact-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="contact-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="contact-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="contact-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="contact-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="contact-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="contact-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="contact-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="contact-text23">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="contact-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="contact-text25">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="contact-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name4"
        />

        <main className="contact-main">
          <section className="contact-hero thq-section-padding">
            <div className="contact-hero-max thq-section-max-width">
              <div className="contact-hero-card">
                <div className="contact-hero-card-bg" aria-hidden="true">
                  <div className="contact-hero-card-vignette" />
                  <div className="contact-hero-card-grain" />
                </div>

                <div className="contact-hero-inner">
                  <div className="contact-kicker-row">
                    <span className="contact-kicker">CONTACT</span>
                    <span className="contact-kicker-line" />
                  </div>

                  <h1 className="contact-hero-title">
                    Let’s build something with mood, clarity, and intention.
                  </h1>

                  <p className="contact-hero-copy">
                    Whether it’s a film, a visual campaign, photography, motion, or sound-led work,
                    this is the place to start the conversation.
                  </p>

                  <div className="contact-hero-divider" aria-hidden="true" />

                  <div className="contact-hero-meta">
                    Film • Photography • Motion • Audio • Direction
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-shell thq-section-padding">
            <div className="section-max thq-section-max-width">
              <div className="section-card section-card-form">
                <ContactFormFinal
                  videoSrc="/JC/jeevan%20chandimal%20logo.mp4"
                  action={
                    <Fragment>
                      <span className="contact-text27">Submit</span>
                    </Fragment>
                  }
                  content1={
                    <Fragment>
                      <span className="contact-text28">
                        Do not hesitate to contact us. We look forward to hearing from you!
                      </span>
                    </Fragment>
                  }
                  content2={
                    <Fragment>
                      <span className="contact-text29">Get in touch with us</span>
                    </Fragment>
                  }
                  heading1={
                    <Fragment>
                      <span className="contact-text30">Contact us</span>
                    </Fragment>
                  }
                />
              </div>
            </div>
          </section>

          <section className="section-shell section-shell-tight">
            <div className="section-max thq-section-max-width">
              <div className="section-card section-card-narrow">
                <ContactJC
                  link1={
                    <Fragment>
                      <span className="contact-text31">Start Call</span>
                    </Fragment>
                  }
                  email1={
                    <Fragment>
                      <span className="contact-text32">Start new chat</span>
                    </Fragment>
                  }
                  phone1={
                    <Fragment>
                      <span className="contact-text33">New mail</span>
                    </Fragment>
                  }
                  address1={
                    <Fragment>
                      <span className="contact-text34">Kohuwala, Srilanka.</span>
                    </Fragment>
                  }
                  content1={
                    <Fragment>
                      <span className="contact-text35">Watsapp :+94 711735735</span>
                    </Fragment>
                  }
                  content2={
                    <Fragment>
                      <span className="contact-text36">+94 769771394</span>
                    </Fragment>
                  }
                  content3={
                    <Fragment>
                      <span className="contact-text37">info@jeevanchandimal.com</span>
                    </Fragment>
                  }
                  content4={
                    <Fragment>
                      <span className="contact-text38">No. 99, Sunethradevi Road,</span>
                    </Fragment>
                  }
                  heading1={
                    <Fragment>
                      <span className="contact-text39">Direct Contact</span>
                    </Fragment>
                  }
                  heading2={
                    <Fragment>
                      <span className="contact-text40">Phone</span>
                    </Fragment>
                  }
                  heading3={
                    <Fragment>
                      <span className="contact-text41">Email</span>
                    </Fragment>
                  }
                  heading4={
                    <Fragment>
                      <span className="contact-text42">Address</span>
                    </Fragment>
                  }
                />
              </div>
            </div>
          </section>

          <section className="section-shell section-shell-tight section-shell-last">
            <div className="section-max thq-section-max-width">
              <div className="section-card section-card-narrow">
                <ContactOffice
                  content1={
                    <Fragment>
                      <span className="contact-text43">
                        For inquiries and appointments, please visit us at our headquarters.
                      </span>
                    </Fragment>
                  }
                  heading1={
                    <Fragment>
                      <span className="contact-text44">Visit the Space</span>
                    </Fragment>
                  }
                  location1={
                    <Fragment>
                      <span className="contact-text45">Office</span>
                    </Fragment>
                  }
                  location2={
                    <Fragment>
                      <span className="contact-text46">Studio</span>
                    </Fragment>
                  }
                  location1Description={
                    <Fragment>
                      <span className="contact-text47">No. 99, Sunethradevi Road, Kohuwala.</span>
                    </Fragment>
                  }
                  location2Description={
                    <Fragment>
                      <span className="contact-text48">
                        No. 99, Sunethradevi Road, Kohuwala, Sri Lanka.
                      </span>
                    </Fragment>
                  }
                />
              </div>
            </div>
          </section>
        </main>

        <JeevanChandimalNewFooter
          link11={
            <Fragment>
              <span className="contact-text49">Home</span>
            </Fragment>
          }
          link41={
            <Fragment>
              <span className="contact-text50">Store</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="contact-text51">Membership</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="contact-text52">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="contact-text53">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="contact-text54">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="contact-text55">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="contact-text56">About</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="contact-text57">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="contact-text58">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="contact-text59">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="contact-text60">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="contact-text61">Animation &amp; Motion</span>
            </Fragment>
          }
          link5111={
            <Fragment>
              <span className="contact-text62">Contact</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="contact-text63">Photography</span>
            </Fragment>
          }
          termsLink={
            <Fragment>
              <span className="contact-text64">Terms &amp; Conditions</span>
            </Fragment>
          }
          cookiesLink={
            <Fragment>
              <span className="contact-text65">Cookies Policy</span>
            </Fragment>
          }
          privacyLink={
            <Fragment>
              <span className="contact-text66">Privacy Policy</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-new-footerroot-class-name7"
        />
      </div>

      <style jsx>{`
        .contact-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          position: relative;
          overflow: hidden;
          align-items: center;
          flex-direction: column;
          background:
            radial-gradient(circle at top, rgba(37, 195, 226, 0.08), transparent 28%),
            linear-gradient(180deg, #060606 0%, #0a0a0a 42%, #080808 100%);
        }

        .page-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .page-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              90% 70% at 50% 0%,
              rgba(255, 255, 255, 0.03),
              rgba(0, 0, 0, 0.64)
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.12) 0%,
              rgba(0, 0, 0, 0.42) 42%,
              rgba(0, 0, 0, 0.72) 100%
            );
        }

        .page-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(80px);
          opacity: 0.22;
        }

        .page-glow1 {
          top: 120px;
          left: -60px;
          width: 280px;
          height: 280px;
          background: rgba(37, 195, 226, 0.18);
        }

        .page-glow2 {
          top: 560px;
          right: -80px;
          width: 320px;
          height: 320px;
          background: rgba(255, 255, 255, 0.06);
        }

        .page-grain {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .contact-main {
          width: 100%;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .contact-hero {
          width: 100%;
          padding-top: calc(var(--dl-layout-space-fiveunits) + 40px);
          padding-bottom: var(--dl-layout-space-threeunits);
          display: flex;
          justify-content: center;
        }

        .contact-hero-max {
          width: 100%;
        }

        .contact-hero-card {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(12, 12, 12, 0.52);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.52);
          backdrop-filter: blur(12px);
        }

        .contact-hero-card-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .contact-hero-card-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              80% 72% at 50% 14%,
              rgba(255, 255, 255, 0.05),
              rgba(0, 0, 0, 0.78)
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.35) 50%,
              rgba(0, 0, 0, 0.82) 100%
            );
        }

        .contact-hero-card-grain {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        .contact-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 920px;
          margin: 0 auto;
          padding: 38px 32px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
        }

        .contact-kicker-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .contact-kicker {
          font-size: 12px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(245, 244, 244, 0.72);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.22);
        }

        .contact-kicker-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(245, 244, 244, 0.18), rgba(245, 244, 244, 0));
        }

        .contact-hero-title {
          margin: 0;
          color: #f5f4f4;
          font-size: clamp(32px, 5vw, 58px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          text-shadow: 0 16px 42px rgba(0, 0, 0, 0.55);
          max-width: 12ch;
        }

        .contact-hero-copy {
          margin: 0;
          max-width: 64ch;
          font-size: 16px;
          line-height: 1.85;
          color: rgba(245, 244, 244, 0.84);
        }

        .contact-hero-divider {
          width: 100%;
          height: 1px;
          margin-top: 8px;
          background: linear-gradient(
            90deg,
            rgba(245, 244, 244, 0.12),
            rgba(245, 244, 244, 0.04),
            rgba(245, 244, 244, 0.12)
          );
        }

        .contact-hero-meta {
          color: rgba(245, 244, 244, 0.6);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .section-shell {
          width: 100%;
          position: relative;
          z-index: 1;
          padding-top: 0;
          padding-bottom: var(--dl-layout-space-threeunits);
          display: flex;
          justify-content: center;
        }

        .section-shell-tight {
          padding-bottom: var(--dl-layout-space-twounits);
        }

        .section-shell-last {
          padding-bottom: var(--dl-layout-space-fiveunits);
        }

        .section-max {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .section-card {
          width: 100%;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(245, 244, 244, 0.08);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.028),
            rgba(255, 255, 255, 0.016)
          );
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.34);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .section-card-form {
          max-width: 1180px;
        }

        .section-card-narrow {
  max-width: 1180px;
  width: 100%;
}

        .section-card :global(.thq-section-padding) {
          padding-top: 32px !important;
          padding-bottom: 32px !important;
          padding-left: 32px !important;
          padding-right: 32px !important;
        }

        .section-card :global(.thq-section-max-width) {
          max-width: 100% !important;
          width: 100% !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .section-card :global(.cjc-wrap),
.section-card :global(.co-wrap) {
  width: 100% !important;
  max-width: 1180px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

        .section-card :global(.cff-wrap) {
          width: 100% !important;
          max-width: 100% !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .section-card :global(.cjc-head),
        .section-card :global(.co-head),
        .section-card :global(.cjc-grid),
        .section-card :global(.co-gallery),
        .section-card :global(.co-locations) {
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .contact-text10,
        .contact-text11,
        .contact-text12,
        .contact-text13,
        .contact-text14,
        .contact-text15,
        .contact-text16,
        .contact-text17,
        .contact-text18,
        .contact-text19,
        .contact-text20,
        .contact-text21,
        .contact-text22,
        .contact-text23,
        .contact-text24,
        .contact-text25,
        .contact-text26,
        .contact-text27,
        .contact-text28,
        .contact-text29,
        .contact-text30,
        .contact-text31,
        .contact-text32,
        .contact-text33,
        .contact-text34,
        .contact-text35,
        .contact-text36,
        .contact-text37,
        .contact-text38,
        .contact-text39,
        .contact-text40,
        .contact-text41,
        .contact-text42,
        .contact-text43,
        .contact-text44,
        .contact-text45,
        .contact-text46,
        .contact-text47,
        .contact-text48,
        .contact-text49,
        .contact-text50,
        .contact-text51,
        .contact-text52,
        .contact-text53,
        .contact-text54,
        .contact-text55,
        .contact-text56,
        .contact-text57,
        .contact-text58,
        .contact-text59,
        .contact-text60,
        .contact-text61,
        .contact-text62,
        .contact-text63,
        .contact-text64,
        .contact-text65,
        .contact-text66 {
          display: inline-block;
        }

        @media (max-width: 991px) {
          .contact-hero {
            padding-top: calc(var(--dl-layout-space-fourunits) + 36px);
          }

          .contact-hero-inner {
            padding: 30px 24px 24px;
          }

          .section-card-narrow {
            max-width: 100%;
          }

          .section-card :global(.cjc-wrap),
          .section-card :global(.co-wrap) {
            max-width: 100% !important;
          }
        }

        @media (max-width: 767px) {
          .contact-hero {
            padding-top: calc(var(--dl-layout-space-threeunits) + 36px);
            padding-bottom: var(--dl-layout-space-twounits);
          }

          .contact-kicker-line {
            display: none;
          }

          .contact-hero-inner {
            padding: 24px 16px 20px;
          }

          .contact-hero-title {
            max-width: 100%;
          }

          .contact-hero-copy {
            max-width: 60ch;
          }

          .section-card {
            border-radius: 18px;
          }

          .section-card :global(.thq-section-padding) {
            padding-top: 22px !important;
            padding-bottom: 22px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </>
  )
}

export default Contact