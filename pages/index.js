import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

// ⛔️ DO NOT import header or footer here

// ✅ Import ONLY page sections/components
import Hero from '../components/hero'
import Services from '../components/services'
import Work from '../components/work'
import About from '../components/about'
import Contact from '../components/contact'

const Home = (props) => {
  const t = useTranslations()

  return (
    <>
      {/* ✅ Page content ONLY */}
      <Hero />
      <Services />
      <Work />
      <About />
      <Contact />
    </>
  )
}

Home.defaultProps = {}
Home.propTypes = {}

export default Home
