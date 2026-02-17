// pages/location/[slug].js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

/**
 * Location pages:
 * /location/batticaloa
 * /location/kandy
 * /location/ella
 *
 * This page ranks for:
 * "Batticaloa photography", "Kandy Sri Lanka photos", "Ella landscape photography", etc.
 *
 * Data source: /api/store/photos (published only)
 */

function toTitleCase(s) {
  return String(s || '')
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function safeJsonArray(v) {
  return Array.isArray(v) ? v : []
}

function cleanUrl(u) {
  const s = String(u || '')
  const v = s.replace(/\s+/g, '')
  return v || ''
}

export default function LocationPage() {
  const router = useRouter()
  const slug = typeof router.query.slug === 'string' ? router.query.slug : ''
  const locationTag = String(slug || '').trim().toLowerCase()

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [photos, setPhotos] = React.useState([])

  const prettyLocation = toTitleCase(locationTag)
  const canonicalUrl = `https://www.jeevanchandimal.com/location/${encodeURIComponent(
    locationTag
  )}`

  // SEO text (simple + keyword rich but natural)
  const seoTitle = prettyLocation
    ? `${prettyLocation} Photography | Jeevan Chandimal`
    : `Location Photography | Jeevan Chandimal`

  const seoDescription = prettyLocation
    ? `Explore ${prettyLocation} photography by Jeevan Chandimal. Browse professional images available for personal, editorial, and commercial licensing.`
    : `Explore location photography by Jeevan Chandimal. Browse professional images available for personal, editorial, and commercial licensing.`

  React.useEffect(() => {
    if (!router.isReady || !locationTag) return

    let alive = true

    async function load() {
      try {
        setLoading(true)
        setError('')
        setPhotos([])

        // Use your existing store API (already published only)
        const r = await fetch('/api/store/photos', {
          headers: { 'Cache-Control': 'no-store' },
        })

        const j = await r.json().catch(() => null)

        if (!alive) return

        if (!r.ok || !j?.ok) {
          setError(j?.error || 'Failed to load photos')
          setLoading(false)
          return
        }

        const list = safeJsonArray(j.photos)

        // Filter by tag == locationTag
        const filtered = list
          .filter((p) => {
            const tags = safeJsonArray(p?.tags).map((t) =>
              String(t || '').toLowerCase()
            )
            return tags.includes(locationTag)
          })
          .map((p) => ({
            id: p.id,
            title: p.title || 'Untitled',
            description: p.description || '',
            tags: safeJsonArray(p.tags),
            thumbUrl: cleanUrl(p.thumb_url),
            previewUrl: cleanUrl(p.preview_url),
          }))

        setPhotos(filtered)
        setLoading(false)
      } catch (e) {
        console.error(e)
        if (!alive) return
        setError('Failed to load photos')
        setLoading(false)
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [router.isReady, locationTag])

  // For internal linking to collections if you also use /collections/[tag]
  const collectionsUrl = `/collections/${encodeURIComponent(locationTag)}`
  const storeTagUrl = `/store?tag=${encodeURIComponent(locationTag)}`

  // JSON-LD: CollectionPage with ItemList
  const jsonLd =
    locationTag && photos.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${prettyLocation} Photography`,
          description: seoDescription,
          url: canonicalUrl,
          isPartOf: {
            '@type': 'WebSite',
            name: 'Jeevan Chandimal',
            url: 'https://www.jeevanchandimal.com',
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: photos.slice(0, 50).map((p, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              url: `https://www.jeevanchandimal.com/store/${p.id}`,
              name: p.title,
            })),
          },
        }
      : null

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />

        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="top">
          <Link href="/store">
            <a className="back">← Back to store</a>
          </Link>

          <div className="chips">
            <Link href={storeTagUrl}>
              <a className="chip">Store tag view</a>
            </Link>
            <Link href={collectionsUrl}>
              <a className="chip">Collections</a>
            </Link>
          </div>
        </div>

        <header className="hero">
          <h1 className="h1">{prettyLocation || 'Location'} Photography</h1>
          <p className="lead">{seoDescription}</p>

          <div className="hintRow">
            <span className="hint">
              Tip: Use keywords like “{prettyLocation} sunset”, “{prettyLocation}{' '}
              nature”, “{prettyLocation} Sri Lanka”.
            </span>
          </div>
        </header>

        {loading && <div className="state">Loading…</div>}
        {!loading && error && <div className="state">❌ {error}</div>}

        {!loading && !error && (
          <>
            {photos.length === 0 ? (
              <div className="empty">
                <h2>No photos found yet for “{prettyLocation}”.</h2>
                <p>
                  Try the store page or explore other locations and collections.
                </p>
                <div className="emptyActions">
                  <Link href="/store">
                    <a className="btn">Browse store</a>
                  </Link>
                  <Link href="/collections">
                    <a className="btn ghost">Browse collections</a>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="countRow">
                  <div className="count">
                    {photos.length} photo{photos.length === 1 ? '' : 's'} in{' '}
                    {prettyLocation}
                  </div>
                  <div className="note">
                    All images are available for licensing.
                  </div>
                </div>

                <section className="grid">
                  {photos.map((p) => (
                    <Link key={p.id} href={`/store/${p.id}`}>
                      <a className="card">
                        <div className="thumb">
                          <img
                            src={p.thumbUrl || p.previewUrl}
                            alt={p.title}
                            loading="lazy"
                            onError={(e) => {
                              if (p.previewUrl && e.currentTarget.src !== p.previewUrl) {
                                e.currentTarget.src = p.previewUrl
                              }
                            }}
                          />
                        </div>

                        <div className="meta">
                          <div className="name">{p.title}</div>
                          <div className="tags">
                            {p.tags?.slice(0, 2).map((t) => (
                              <span className="tag" key={t}>
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </section>

                {/* Internal linking block (SEO booster) */}
                <section className="seoBlock">
                  <h2>More {prettyLocation} photos</h2>
                  <p>
                    Browse more work from {prettyLocation} and discover similar
                    photography across Sri Lanka. These pages help Google connect
                    your images to real locations and keywords.
                  </p>

                  <div className="seoLinks">
                    <Link href={storeTagUrl}>
                      <a className="seoLink">View {prettyLocation} in Store</a>
                    </Link>
                    <Link href={collectionsUrl}>
                      <a className="seoLink">View {prettyLocation} Collection</a>
                    </Link>
                    <Link href="/collections/sri-lanka">
                      <a className="seoLink">Sri Lanka Collection</a>
                    </Link>
                    <Link href="/collections/nature">
                      <a className="seoLink">Nature Collection</a>
                    </Link>
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .wrap {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px 90px;
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .back {
          text-decoration: none;
          opacity: 0.8;
        }
        .back:hover {
          opacity: 1;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .chips {
          display: inline-flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .chip {
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(245, 244, 244, 0.16);
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 12px;
          opacity: 0.85;
          background: rgba(255, 255, 255, 0.02);
        }
        .chip:hover {
          opacity: 1;
          border-color: rgba(245, 244, 244, 0.35);
        }

        .hero {
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
          padding: 18px;
          margin-bottom: 16px;
        }

        .h1 {
          margin: 0;
          font-size: 28px;
          line-height: 1.2;
        }

        .lead {
          margin: 10px 0 0;
          opacity: 0.78;
          line-height: 1.6;
          max-width: 72ch;
        }

        .hintRow {
          margin-top: 12px;
        }

        .hint {
          display: inline-block;
          font-size: 12px;
          opacity: 0.7;
          border: 1px dashed rgba(245, 244, 244, 0.16);
          border-radius: 12px;
          padding: 10px 12px;
        }

        .state {
          margin: 18px 0;
          padding: 14px 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          opacity: 0.95;
        }

        .countRow {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          margin: 8px 0 14px;
        }

        .count {
          font-size: 14px;
          opacity: 0.9;
        }
        .note {
          font-size: 12px;
          opacity: 0.7;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .card {
          display: block;
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(245, 244, 244, 0.1);
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          transition: transform 0.18s ease, border-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 244, 244, 0.35);
          box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25);
        }

        .thumb img {
          width: 100%;
          display: block;
          aspect-ratio: 16/10;
          object-fit: cover;
          transform: scale(1);
          transition: transform 0.35s ease;
        }
        .card:hover .thumb img {
          transform: scale(1.06);
        }

        .meta {
          padding: 10px 12px 12px;
        }

        .name {
          font-size: 13px;
          line-height: 1.3;
          opacity: 0.95;
        }

        .tags {
          margin-top: 8px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag {
          font-size: 12px;
          opacity: 0.7;
          border: 1px solid rgba(245, 244, 244, 0.14);
          border-radius: 999px;
          padding: 4px 8px;
        }

        .seoBlock {
          margin-top: 18px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
          padding: 16px;
        }

        .seoBlock h2 {
          margin: 0;
          font-size: 18px;
        }

        .seoBlock p {
          margin: 10px 0 0;
          opacity: 0.78;
          line-height: 1.65;
          max-width: 75ch;
        }

        .seoLinks {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .seoLink {
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(245, 244, 244, 0.16);
          border-radius: 999px;
          padding: 10px 12px;
          font-size: 12px;
          opacity: 0.85;
          background: rgba(0, 0, 0, 0.18);
        }
        .seoLink:hover {
          opacity: 1;
          border-color: rgba(245, 244, 244, 0.35);
        }

        .empty {
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
          padding: 18px;
        }

        .empty h2 {
          margin: 0;
          font-size: 18px;
        }

        .empty p {
          margin: 10px 0 0;
          opacity: 0.78;
          line-height: 1.6;
        }

        .emptyActions {
          margin-top: 14px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-block;
          text-decoration: none;
          border-radius: 999px;
          padding: 12px 14px;
          background: #f5f4f4;
          color: #222;
          font-weight: 700;
          border: 0;
        }
        .btn.ghost {
          background: transparent;
          color: inherit;
          border: 1px solid rgba(245, 244, 244, 0.18);
          font-weight: 600;
          opacity: 0.9;
        }

        @media (max-width: 991px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 680px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .countRow {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  )
}
