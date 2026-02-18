import '../styles/style.css'

import Head from 'next/head'
import { GlobalProvider } from '../global-context'
import { NextIntlProvider } from 'next-intl'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const LEGAL_ROUTES = new Set([
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookies-policy',
    '/refund-policy',
  ])

  const isLegalPage = LEGAL_ROUTES.has(router.pathname)

  return (
    <NextIntlProvider messages={pageProps?.messages}>
      <GlobalProvider>
        {/* ✅ Site-wide structured data */}
        <Head>
          {/* Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Jeevan Chandimal',
                url: 'https://jeevanchandimal.com',
                logo: 'https://jeevanchandimal.com/logo.png',
              }),
            }}
          />

          {/* Website */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Jeevan Chandimal',
                url: 'https://jeevanchandimal.com',
              }),
            }}
          />
        </Head>

        {/* ✅ Legal layout injection */}
        {isLegalPage && <JeevanChandimalNavi />}

        <Component {...pageProps} />

        {isLegalPage && <JeevanChandimalNewFooter />}
      </GlobalProvider>
    </NextIntlProvider>
  )
}
