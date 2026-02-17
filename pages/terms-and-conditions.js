import Head from 'next/head'
import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Jeevan Chandimal</title>
        <meta name="robots" content="index, follow" />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <h1>Terms & Conditions</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Introduction</h2>
        <p>
          This website, https://jeevanchandimal.com, is operated by Jeevan Chandimal.
          By purchasing any content from this website, you agree to these Terms.
        </p>

        <h2>2. Nature of Products</h2>
        <p>All products are digital photographs delivered electronically. No physical items will be shipped.</p>

        <h2>3. Licensing</h2>
        <ul>
          <li><strong>Personal</strong> – Non-commercial use only</li>
          <li><strong>Editorial</strong> – Blogs, news, documentaries (no advertising)</li>
          <li><strong>Commercial</strong> – Advertising, branding, and business use</li>
        </ul>
        <p>Copyright remains with Jeevan Chandimal. Files may not be resold or redistributed.</p>

        <h2>4. Delivery</h2>
        <p>A secure download link will be emailed after successful payment.</p>

        <h2>5. Pricing</h2>
        <p>Prices are displayed in LKR and/or USD and may change without notice.</p>

        <h2>6. Prohibited Use</h2>
        <ul>
          <li>No resale as stock</li>
          <li>No claiming authorship</li>
          <li>No illegal or defamatory use</li>
        </ul>

        <h2>7. Governing Law</h2>
        <p>These terms are governed by the laws of Sri Lanka.</p>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
          line-height: 1.7;
        }
        h1 { margin-bottom: 10px; }
        h2 { margin-top: 28px; }
      `}</style>
    </>
  )
}
