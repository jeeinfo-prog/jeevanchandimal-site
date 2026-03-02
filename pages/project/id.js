// pages/project/[id].js
import React, { Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import ProjectDeatail from '../../components/project-deatail'

export default function Project() {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''

  // later you can fetch project by id
  const title = id ? `Project – ${id}` : 'Project'

  return (
    <>
      <div className="project-container">
        <Head>
          <title>{title} - Jeevan Chandimal | Filmmaker & Visual Storyteller</title>
          <meta
            name="description"
            content="Jeevan Chandimal is a filmmaker and visual storyteller crafting atmosphere through image, motion, and sound."
          />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="Cinematic work shaped with intention and restraint."
          />

          {/* ✅ canonical should match your real domain + dynamic id */}
          <link
            rel="canonical"
            href={`https://jeevanchandimal.com/project/${encodeURIComponent(id || '')}`}
          />
        </Head>

        <ProjectDeatail
          feature1Title={
            <Fragment>
              <span className="project-text1">End-to-End Visual Production</span>
            </Fragment>
          }
          feature1Slogan={
            <Fragment>
              <span className="project-text2">Capturing Moments, Creating Stories</span>
            </Fragment>
          }
          feature1Description={
            <Fragment>
              <span className="project-text3">
                Experience the power of visual storytelling through carefully crafted projects
                that bring clarity, mood, and narrative presence to life.
              </span>
            </Fragment>
          }
        />
      </div>

      <style jsx>{`
        .project-container {
          width: 100%;
          display: flex;
          min-height: 100vh;
          align-items: center;
          flex-direction: column;
        }
        .project-text1,
        .project-text2,
        .project-text3 {
          display: inline-block;
        }
      `}</style>
    </>
  )
}