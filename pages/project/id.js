import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import ProjectDeatail from '../../components/project-deatail'

const Project = (props) => {
  return (
    <>
      <div className="project-container">
        <Head>
          <title>
            Project - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound. Cinematic work shaped with intention and restraint."
          />
          <meta
            property="og:title"
            content="Project - Jeevan Chandimal | Filmmaker &amp; Visual Storyteller"
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
            href="https://firm-these-stork-6nk3lv.teleporthq.app/project/id"
          />
        </Head>
        <ProjectDeatail
          feature1Title={
            <Fragment>
              <span className="project-text1">
                End-to-End Visual Production
              </span>
            </Fragment>
          }
          feature1Slogan={
            <Fragment>
              <span className="project-text2">
                Capturing Moments, Creating Stories
              </span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="project-text3">
                Experience the power of visual storytelling through our
                carefully crafted projects that bring clarity, mood, and
                narrative presence to life.
              </span>
            </Fragment>
          }
        ></ProjectDeatail>
      </div>
      <style jsx>
        {`
          .project-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .project-text1 {
            display: inline-block;
          }
          .project-text2 {
            display: inline-block;
          }
          .project-text3 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default Project
