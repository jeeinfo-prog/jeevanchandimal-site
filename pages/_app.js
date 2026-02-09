import '../styles/style.css'

import { GlobalProvider } from '../global-context'
import { NextIntlProvider } from 'next-intl'

// ✅ Adjust these paths only if your components folder is different
import JeevanChandimalNewHeader from '../components/jeevan-chandimal-new-header'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <NextIntlProvider messages={pageProps?.messages}>
      <GlobalProvider>
        <JeevanChandimalNewHeader />
        <Component {...pageProps} />
        <JeevanChandimalNewFooter />
      </GlobalProvider>
    </NextIntlProvider>
  )
}
