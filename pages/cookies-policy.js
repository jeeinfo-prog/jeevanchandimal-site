import Head from 'next/head'

export default function Cookies() {
  return (
    <>
      <Head>
        <title>Cookies Policy | Jeevan Chandimal</title>
        <meta
          name="description"
          content="Cookies Policy explaining how JeevanChandimal.com uses cookies for functionality, analytics, and security."
        />
        <link rel="canonical" href="https://jeevanchandimal.com/cookies-policy" />
      </Head>

      <main className="wrap">
        <h1>Cookies Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <p>
          This website uses cookies to improve user experience and analyze website traffic.
        </p>

        <h2>What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit a website.</p>

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
        <p>You can disable cookies in your browser settings if you prefer.</p>
      </main>

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 20px 100px;
          line-height: 1.7;
        }
      `}</style>
    </>
  )
}
