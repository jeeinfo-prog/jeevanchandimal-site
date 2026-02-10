import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import IndividualPhoto from '../components/individual-photo'
import SimilerImages from '../components/similer-images'

const StoreIndividualPhoto = (props) => {
  return (
    <>
      <div className="store-individual-photo-container">
        <Head>
          <title>
            Store-Individual-photo - Jeevan Chandimal | Filmmaker & Visual
            Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Store-Individual-photo - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/store-individual-photo"
          />
        </Head>
        <JeevanChandimalNavi
          link1={
            <Fragment>
              <span className="store-individual-photo-text10">Home</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="store-individual-photo-text11">Work</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="store-individual-photo-text12">Services</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="store-individual-photo-text13">Store</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="store-individual-photo-text14">Membership</span>
            </Fragment>
          }
          link51={
            <Fragment>
              <span className="store-individual-photo-text15">About</span>
            </Fragment>
          }
          text16={
            <Fragment>
              <span className="store-individual-photo-text16">Work</span>
            </Fragment>
          }
          text17={
            <Fragment>
              <span className="store-individual-photo-text17">Film</span>
            </Fragment>
          }
          text18={
            <Fragment>
              <span className="store-individual-photo-text18">Audio</span>
            </Fragment>
          }
          text19={
            <Fragment>
              <span className="store-individual-photo-text19">Animation</span>
            </Fragment>
          }
          link511={
            <Fragment>
              <span className="store-individual-photo-text20">Contact</span>
            </Fragment>
          }
          text161={
            <Fragment>
              <span className="store-individual-photo-text21">Services</span>
            </Fragment>
          }
          text171={
            <Fragment>
              <span className="store-individual-photo-text22">
                Film Production
              </span>
            </Fragment>
          }
          text181={
            <Fragment>
              <span className="store-individual-photo-text23">
                Audio Production
              </span>
            </Fragment>
          }
          text191={
            <Fragment>
              <span className="store-individual-photo-text24">Photography</span>
            </Fragment>
          }
          text192={
            <Fragment>
              <span className="store-individual-photo-text25">
                Animation &amp; Motion
              </span>
            </Fragment>
          }
          text1911={
            <Fragment>
              <span className="store-individual-photo-text26">Photography</span>
            </Fragment>
          }
          rootClassName="jeevan-chandimal-naviroot-class-name17"
        ></JeevanChandimalNavi>
        <IndividualPhoto
          text3={
            <Fragment>
              <span className="store-individual-photo-text27">
                <span>IMAGE DETAILS</span>
                <br></br>
                <span>Contributor:Joana Kruse</span>
                <br></br>
                <span>File size:76.5 MB (3.8 MB Compressed download)</span>
                <br></br>
                <span>
                  Releases:Model - no | Property - noDo I need a release?
                </span>
                <br></br>
                <span>
                  Dimensions:6333 x 4222 px | 53.6 x 35.7 cm | 21.1 x 14.1
                  inches | 300dpi
                </span>
                <br></br>
                <span>Date taken:30 November 2019</span>
                <br></br>
                <span>Location:Cuba</span>
                <br></br>
              </span>
            </Fragment>
          }
        ></IndividualPhoto>
        <SimilerImages
          content1={
            <Fragment>
              <span className="store-individual-photo-text42">
                Explore our diverse range of services through the images below.
              </span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="store-individual-photo-text43">
                Similer Images
              </span>
            </Fragment>
          }
        ></SimilerImages>
      </div>
      <style jsx>
        {`
          .store-individual-photo-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .store-individual-photo-text10 {
            display: inline-block;
          }
          .store-individual-photo-text11 {
            display: inline-block;
          }
          .store-individual-photo-text12 {
            display: inline-block;
          }
          .store-individual-photo-text13 {
            display: inline-block;
          }
          .store-individual-photo-text14 {
            display: inline-block;
          }
          .store-individual-photo-text15 {
            display: inline-block;
          }
          .store-individual-photo-text16 {
            display: inline-block;
          }
          .store-individual-photo-text17 {
            display: inline-block;
          }
          .store-individual-photo-text18 {
            display: inline-block;
          }
          .store-individual-photo-text19 {
            display: inline-block;
          }
          .store-individual-photo-text20 {
            display: inline-block;
          }
          .store-individual-photo-text21 {
            display: inline-block;
          }
          .store-individual-photo-text22 {
            display: inline-block;
          }
          .store-individual-photo-text23 {
            display: inline-block;
          }
          .store-individual-photo-text24 {
            display: inline-block;
          }
          .store-individual-photo-text25 {
            display: inline-block;
          }
          .store-individual-photo-text26 {
            display: inline-block;
          }
          .store-individual-photo-text27 {
            display: inline-block;
            align-self: flex-start;
            font-weight: 400;
          }
          .store-individual-photo-text42 {
            display: inline-block;
          }
          .store-individual-photo-text43 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default StoreIndividualPhoto
