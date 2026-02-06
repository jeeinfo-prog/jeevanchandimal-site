import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import ContactFormFinal from '../components/contact-form-final'
import ContactJC from '../components/contact-jc'
import ContactOffice from '../components/contact-office'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const Contact = (props) => {
  return (
    <>
      <div className="contact-container">
        <Head>
          <title>
            Contact - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Contact - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/contact"
          />
        </Head>
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
        ></JeevanChandimalNavi>
        <ContactFormFinal
          action={
            <Fragment>
              <span className="contact-text27">Submit</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="contact-text28">
                Do not hesitate to contact us. We look forward to hearing from
                you!
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
        ></ContactFormFinal>
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
              <span className="contact-text38">
                No. 99, Sunethradevi Road,
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="contact-text39">Contact Us</span>
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
        ></ContactJC>
        <ContactOffice
          content1={
            <Fragment>
              <span className="contact-text43">
                For inquiries and appointments, please visit us at our
                headquarters.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="contact-text44">Contact Us</span>
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
              <span className="contact-text47">No. 99, Sunethradevi Road,</span>
            </Fragment>
          }
          location2Description={
            <Fragment>
              <span className="contact-text48">
                No. 99, Sunethradevi Road, Kohuwala, Sri Lanka.
              </span>
            </Fragment>
          }
        ></ContactOffice>
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
        ></JeevanChandimalNewFooter>
      </div>
      <style jsx>
        {`
          .contact-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .contact-text10 {
            display: inline-block;
          }
          .contact-text11 {
            display: inline-block;
          }
          .contact-text12 {
            display: inline-block;
          }
          .contact-text13 {
            display: inline-block;
          }
          .contact-text14 {
            display: inline-block;
          }
          .contact-text15 {
            display: inline-block;
          }
          .contact-text16 {
            display: inline-block;
          }
          .contact-text17 {
            display: inline-block;
          }
          .contact-text18 {
            display: inline-block;
          }
          .contact-text19 {
            display: inline-block;
          }
          .contact-text20 {
            display: inline-block;
          }
          .contact-text21 {
            display: inline-block;
          }
          .contact-text22 {
            display: inline-block;
          }
          .contact-text23 {
            display: inline-block;
          }
          .contact-text24 {
            display: inline-block;
          }
          .contact-text25 {
            display: inline-block;
          }
          .contact-text26 {
            display: inline-block;
          }
          .contact-text27 {
            display: inline-block;
          }
          .contact-text28 {
            display: inline-block;
          }
          .contact-text29 {
            display: inline-block;
          }
          .contact-text30 {
            display: inline-block;
          }
          .contact-text31 {
            display: inline-block;
          }
          .contact-text32 {
            display: inline-block;
          }
          .contact-text33 {
            display: inline-block;
          }
          .contact-text34 {
            display: inline-block;
          }
          .contact-text35 {
            display: inline-block;
          }
          .contact-text36 {
            display: inline-block;
          }
          .contact-text37 {
            display: inline-block;
          }
          .contact-text38 {
            display: inline-block;
          }
          .contact-text39 {
            display: inline-block;
          }
          .contact-text40 {
            display: inline-block;
          }
          .contact-text41 {
            display: inline-block;
          }
          .contact-text42 {
            display: inline-block;
          }
          .contact-text43 {
            display: inline-block;
          }
          .contact-text44 {
            display: inline-block;
          }
          .contact-text45 {
            display: inline-block;
          }
          .contact-text46 {
            display: inline-block;
          }
          .contact-text47 {
            display: inline-block;
          }
          .contact-text48 {
            display: inline-block;
          }
          .contact-text49 {
            display: inline-block;
          }
          .contact-text50 {
            display: inline-block;
          }
          .contact-text51 {
            display: inline-block;
          }
          .contact-text52 {
            display: inline-block;
          }
          .contact-text53 {
            display: inline-block;
          }
          .contact-text54 {
            display: inline-block;
          }
          .contact-text55 {
            display: inline-block;
          }
          .contact-text56 {
            display: inline-block;
          }
          .contact-text57 {
            display: inline-block;
          }
          .contact-text58 {
            display: inline-block;
          }
          .contact-text59 {
            display: inline-block;
          }
          .contact-text60 {
            display: inline-block;
          }
          .contact-text61 {
            display: inline-block;
          }
          .contact-text62 {
            display: inline-block;
          }
          .contact-text63 {
            display: inline-block;
          }
          .contact-text64 {
            display: inline-block;
          }
          .contact-text65 {
            display: inline-block;
          }
          .contact-text66 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default Contact
