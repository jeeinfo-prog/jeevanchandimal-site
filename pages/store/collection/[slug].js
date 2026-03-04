// pages/store/collection/[slug].js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../../components/layout/jeevan-chandimal-new-footer'

function safeArr(v) {
  return Array.isArray(v) ? v : []
}

export default function CollectionDetail() {
  const router = useRouter()
  const slug = typeof router.query.slug === 'string' ? router.query.slug : ''

  const [loading, setLoading] = React.useState(true)
  const [collection, setCollection] = React.useState(null)
  const [photos, setPhotos] = React.useState([])

  React.useEffect(() => {
    if (!router.isReady || !slug) return

    let alive = true
    ;(async () => {
      try {
        setLoading(true)

        // load collections
        const cResp = await fetch('/api/store/collections', { headers: { 'Cache-Control': 'no-store' } })
        const cJson = await cResp.json().catch(() => ({}))
        const list = safeArr(cJson?.collections)
        const found = list.find((x) => x.slug === slug) || null

        if (!alive) return
        setCollection(found)

        if (!found?.tag) {
          setPhotos([])
          return
        }

        const pResp = await fetch(
          `/api/store/collection-photos?tag=${encodeURIComponent(found.tag)}&limit=48`,
          { headers: { 'Cache-Control': 'no-store' } }
        )
        const pJson = await pResp.json().catch(() => ({}))

        if (!alive) return
        setPhotos(safeArr(pJson?.photos))
      } finally {
        if (!alive) return
        setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [router.isReady, slug])

  const title = collection?.title ? `${collection.title} | Store` : 'Collection | Store'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Browse photographs in this collection." />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="top">
          <div>
            <Link href="/store/collections">
              <a className="back">← Collections</a>
            </Link>
            <h1 className="h1">{collection?.title || 'Collection'}</h1>
            <div className="sub">{collection?.tag ? `#${collection.tag}` : ''}</div>
          </div>
          <Link href="/store">
            <a className="link">Store</a>
          </Link>
        </div>

        {loading ? (
          <div className="state">Loading…</div>
        ) : !collection ? (
          <div className="state">Collection not found.</div>
        ) : photos.length === 0 ? (
          <div className="state">No photos yet in this collection.</div>
        ) : (
          <div className="grid">
            {photos.map((p) => (
              <Link key={p.id} href={`/store/${p.id}`}>
                <a className="card">
                  <div className="thumb">
                    <img src={p.thumb_url} alt={p.title || 'Photo'} loading="lazy" />
                    <div className="wm" />
                  </div>
                  <div className="meta">
                    <div className="name">{p.title || 'Untitled'}</div>
                    <div className="tag">
                      {Array.isArray(p.tags) && p.tags[0] ? `#${p.tags[0]}` : 'Photo'}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
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
          align-items: flex-start;
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
        .h1 {
          margin: 10px 0 0;
          font-size: 28px;
        }
        .sub {
          margin-top: 6px;
          opacity: 0.75;
          font-size: 13px;
        }
        .link {
          text-decoration: none;
          opacity: 0.8;
        }
        .link:hover {
          opacity: 1;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .state {
          margin: 18px 0;
          padding: 14px 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          opacity: 0.95;
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
          transition: transform 0.18s ease;
        }
        .card:hover {
          transform: translateY(-4px);
        }
        .thumb {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(245, 244, 244, 0.12);
        }
        .thumb img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
        .card:hover .thumb img {
          transform: scale(1.06);
        }
        .wm {
          position: absolute;
          inset: 0;
          background-image: url('/watermark-logo/watermark-logo.png');
          background-repeat: repeat;
          background-size: 140px;
          opacity: 0.08;
          pointer-events: none;
          transform: rotate(-12deg);
        }
        .meta {
          margin-top: 8px;
        }
        .name {
          font-size: 13px;
          opacity: 0.95;
          line-height: 1.3;
        }
        .tag {
          margin-top: 4px;
          font-size: 12px;
          opacity: 0.7;
        }

        @media (max-width: 991px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 520px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  )
}
