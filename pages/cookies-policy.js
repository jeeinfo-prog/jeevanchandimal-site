import Head from 'next/head'
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function Cookies() {
  return (
    <>
      <Head>
        <title>Cookies Policy | Jeevan Chandimal</title>
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <h1>Cookies Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <p>
          This website uses cookies to improve user experience and analyze website traffic.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website.
        </p>

        <h2>How We Use Cookies</h2>
        <ul>
          <li>Website functionality</li>
          <li>Analytics</li>
          <li>Security</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>
          Payment processing is handled securely by PayHere. We do not store card details.
        </p>

        <h2>Managing Cookies</h2>
        <p>
          You can disable cookies in your browser settings if you prefer.
        </p>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
          line-height: 1.7;
        }
      `}</style>
    </>
  )
}
