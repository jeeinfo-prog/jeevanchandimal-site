import '../styles/style.css'

import { GlobalProvider } from '../global-context'
import { NextIntlProvider } from 'next-intl'
import { useRouter } from 'next/router'

// ✅ Your real header + footer components
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // ✅ Only add global header/footer for these pages
  const LEGAL_ROUTES = ['/privacy-policy', '/terms-and-conditions', '/cookies-policy']
  const useGlobalLayout = LEGAL_ROUTES.includes(router.pathname)

  return (
    <NextIntlProvider messages={pageProps?.messages}>
      <GlobalProvider>
        {useGlobalLayout ? (
          <>
            <JeevanChandimalNavi />
            <Component {...pageProps} />
            <JeevanChandimalNewFooter />
          </>
        ) : (
          // ✅ Other pages already have their own header/footer inside the page components
          <Component {...pageProps} />
        )}
      </GlobalProvider>
    </NextIntlProvider>
  )
}
