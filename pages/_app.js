// pages/_app.js
import '../styles/style.css'

import { GlobalProvider } from '../global-context'
import { NextIntlProvider } from 'next-intl'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const LEGAL_ROUTES = [
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookies-policy',
    '/refund-policy',
  ]

  const isLegalPage = LEGAL_ROUTES.includes(router.pathname)

  return (
    <NextIntlProvider messages={pageProps?.messages}>
      <GlobalProvider>
        {isLegalPage ? (
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
