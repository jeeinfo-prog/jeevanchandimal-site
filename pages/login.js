import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalSignIn from '../components/jeevan-chandimal-sign-in'
import JeevanChandimalSignUp from '../components/jeevan-chandimal-sign-up'

const Login = (props) => {
  return (
    <>
      <div className="login-container">
        <Head>
          <title>
            Login - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Login - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/login"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="login-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="login-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="login-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="login-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="login-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="login-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="login-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="login-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="login-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="login-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="login-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="login-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="login-text22">Film Production</span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="login-text23">Audio Production</span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="login-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="login-text25">Animation &amp; Motion</span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="login-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name18"
        ></JeevanChandimalNavi>
        <JeevanChandimalSignIn
          action1={
            <Fragment>
              <span className="login-text27">Sign In</span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="login-text28">
                Sign In to Access Your Account
              </span>
            </Fragment>
          }
        ></JeevanChandimalSignIn>
        <JeevanChandimalSignUp
          action1={
            <Fragment>
              <span className="login-text29">Sign Up Now</span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="login-text30">
                Join our platform to access a wide range of services tailored to
                meet your specific needs. Sign up now to get started!
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="login-text31">Sign Up for Our Services</span>
            </Fragment>
          }
        ></JeevanChandimalSignUp>
      </div>
      <style jsx>
        {`
          .login-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .login-text10 {
            display: inline-block;
          }
          .login-text11 {
            display: inline-block;
          }
          .login-text12 {
            display: inline-block;
          }
          .login-text13 {
            display: inline-block;
          }
          .login-text14 {
            display: inline-block;
          }
          .login-text15 {
            display: inline-block;
          }
          .login-text16 {
            display: inline-block;
          }
          .login-text17 {
            display: inline-block;
          }
          .login-text18 {
            display: inline-block;
          }
          .login-text19 {
            display: inline-block;
          }
          .login-text20 {
            display: inline-block;
          }
          .login-text21 {
            display: inline-block;
          }
          .login-text22 {
            display: inline-block;
          }
          .login-text23 {
            display: inline-block;
          }
          .login-text24 {
            display: inline-block;
          }
          .login-text25 {
            display: inline-block;
          }
          .login-text26 {
            display: inline-block;
          }
          .login-text27 {
            display: inline-block;
          }
          .login-text28 {
            display: inline-block;
          }
          .login-text29 {
            display: inline-block;
          }
          .login-text30 {
            display: inline-block;
          }
          .login-text31 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default Login
