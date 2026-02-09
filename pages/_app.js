import '../styles/style.css'

import { GlobalProvider } from '../global-context'
import { NextIntlProvider } from 'next-intl'

// ✅ Correct layout components
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <NextIntlProvider messages={pageProps?.messages}>
      <GlobalProvider>
        <JeevanChandimalNavi />
        <Component {...pageProps} />
        <JeevanChandimalNewFooter />
      </GlobalProvider>
    </NextIntlProvider>
  )
}
