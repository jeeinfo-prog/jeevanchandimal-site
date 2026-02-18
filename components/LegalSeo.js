import Head from 'next/head'

const SITE_URL = 'https://jeevanchandimal.com'
const DEFAULT_OG = `${SITE_URL}/og-default.jpg` // optional (put a real image in /public)

export default function LegalSeo({
  title,
  description,
  path, // e.g. "/privacy-policy"
  noindex = false,
  dateModified, // optional ISO string
}) {
  const canonical = `${SITE_URL}${path}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Jeevan Chandimal',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Jeevan Chandimal',
      url: SITE_URL,
    },
    ...(dateModified ? { dateModified } : {}),
  }

  return (
    <Head>
      {/* Title + Description */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph */}
      <meta property="og:site_name" content="Jeevan Chandimal" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_OG} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}
