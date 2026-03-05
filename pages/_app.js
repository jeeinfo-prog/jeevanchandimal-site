// pages/_app.js

import '../styles/style.css'

import Head from 'next/head'
import { GlobalProvider } from '../global-context'
import { NextIntlProvider } from 'next-intl'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/layout/jeevan-chandimal-new-footer'

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
        {/* ✅ Global meta + structured data */}
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

        {/* ✅ Global navbar spacing fix */}
        <style jsx global>{`
          :root {
            --jc-nav-h: 70px;
          }

          body {
            padding-top: var(--jc-nav-h);
          }

          @media (max-width: 900px) {
            :root {
              --jc-nav-h: 78px;
            }
          }
        `}</style>

        {/* ✅ Legal pages only show nav + footer */}
        {isLegalPage && <JeevanChandimalNavi />}

        <Component {...pageProps} />

        {isLegalPage && <JeevanChandimalNewFooter />}
      </GlobalProvider>
    </NextIntlProvider>
  )
}