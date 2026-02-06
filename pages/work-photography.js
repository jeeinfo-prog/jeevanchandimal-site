import React, { Fragment } from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import WorkPhotographyHero from '../components/work-photography-hero'
import WorkPhotographySection from '../components/work-photography'
import WorkCinematicGallery from '../components/work-cinematic-gallery'
import WorkPhotographyEditorial from '../components/work-photography-editorial'
import WorkPhotographyPersonalProjects from '../components/work-photography-personal-projects'
import WorkStockPreview from '../components/work-stock-preview'
import WorkPhotographyEndNote from '../components/work-photography-end-note'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const WorkPhotography = () => {
  return (
    <>
      <div className="work-photography-container">
        <Head>
          <title>
            Work-Photography - Jeevan Chandimal | Filmmaker & Visual Storyteller
          </title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound."
          />
        </Head>

        <JeevanChandimalNavi rootClassName="jeevan-chandimal-naviroot-class-name8" />

        <WorkPhotographyHero />

        {/* FIXED SECTION */}
        <WorkPhotographySection />

        <WorkCinematicGallery rootClassName="work-cinematic-galleryroot-class-name" />

        <WorkPhotographyEditorial />

        <WorkPhotographyPersonalProjects />

        <WorkStockPreview />

        <WorkPhotographyEndNote rootClassName="work-photography-end-noteroot-class-name" />

        <JeevanChandimalNewFooter rootClassName="jeevan-chandimal-new-footerroot-class-name9" />
      </div>

      <style jsx>{`
        .work-photography-container {
          width: 100%;
          display: flex;
          min-height: 100vh;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}

export default WorkPhotography
