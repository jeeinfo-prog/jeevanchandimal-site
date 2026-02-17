import Head from 'next/head'
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Jeevan Chandimal</title>
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Information We Collect</h2>
        <p>Name, email, billing details, and transaction data for order processing.</p>

        <h2>How We Use Data</h2>
        <ul>
          <li>Process payments via PayHere</li>
          <li>Send download links and receipts</li>
          <li>Provide customer support</li>
        </ul>

        <h2>Payment Security</h2>
        <p>All payments are processed securely through PayHere. We do not store card details.</p>

        <h2>Data Sharing</h2>
        <p>We do not sell or share personal data except with payment and email providers.</p>

        <h2>Cookies</h2>
        <p>This site may use cookies for analytics and user experience.</p>

        <h2>Your Rights</h2>
        <p>You may request access or deletion of your data via support@jeevanchandimal.com.</p>
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
