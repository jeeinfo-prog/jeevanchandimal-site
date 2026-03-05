// components/LegalSchema.js
import Head from 'next/head'

export default function LegalSchema({ title, path }) {
  const SITE_URL = 'https://jeevanchandimal.com'
  const url = `${SITE_URL}${path}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Jeevan Chandimal',
      url: SITE_URL,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: url,
        },
      ],
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  )
}
