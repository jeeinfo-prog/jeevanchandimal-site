// components/LegalSeo.js
import Head from 'next/head'

export default function LegalSeo({ title, description, path }) {
  const SITE_URL = 'https://jeevanchandimal.com'
  const url = `${SITE_URL}${path}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}
