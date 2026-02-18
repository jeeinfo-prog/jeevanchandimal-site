import '../styles/style.css'

import Head from 'next/head'
import { GlobalProvider } from '../global-context'
import { NextIntlProvider } from 'next-intl'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

const SITE_URL = 'https://jeevanchandimal.com'

/**
 * Detect legal pages automatically
 * This avoids hardcoding every route
 */
function isLegalRoute(pathname) {
  if (!pathname) return false

  return (
    pathname === '/privacy-policy' ||
    pathname === '/terms-and-conditions' ||
    pathname === '/cookies-policy' ||
    pathname === '/refund-policy'
  )
}

/**
 * Global JSON-LD (WebSite)
 * Render once for SEO
 */
function GlobalStructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jeevan Chandimal',
    url: SITE_URL,
    publisher: {
      '@type': 'Person',
      name: 'Jeevan Chandimal',
      url: SITE_URL,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/store?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const showLegalLayout = isLegalRoute(router.pathname)

  return (
    <NextIntlProvider messages={pageProps?.messages}>
      <GlobalProvider>
        {/* Global SEO schema */}
        <GlobalStructuredData />

        {showLegalLayout ? (
          <>
            <JeevanChandimalNavi />
            <Component {...pageProps} />
            <JeevanChandimalNewFooter />
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </GlobalProvider>
    </NextIntlProvider>
  )
}
