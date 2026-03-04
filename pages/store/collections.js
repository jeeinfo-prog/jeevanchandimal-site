// pages/store/collections.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import JeevanChandimalNavi from '../../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/layout/jeevan-chandimal-new-footer'

export default function StoreCollections() {
  const [loading, setLoading] = React.useState(true)
  const [collections, setCollections] = React.useState([])

  React.useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        const r = await fetch('/api/store/collections', { headers: { 'Cache-Control': 'no-store' } })
        const j = await r.json().catch(() => ({}))
        if (!alive) return
        setCollections(Array.isArray(j?.collections) ? j.collections : [])
      } finally {
        if (!alive) return
        setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <>
      <Head>
        <title>Collections | Store</title>
        <meta name="description" content="Browse collections of photographs by category." />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="top">
          <h1 className="h1">Collections</h1>
          <Link href="/store">
            <a className="link">Back to store</a>
          </Link>
        </div>

        {loading ? (
          <div className="state">Loading…</div>
        ) : collections.length === 0 ? (
          <div className="state">No collections yet.</div>
        ) : (
          <div className="grid">
            {collections.map((c) => (
              <Link key={c.slug} href={`/store/collection/${c.slug}`}>
                <a className="card">
                  <div
                    className="cover"
                    style={
                      c.cover
                        ? { backgroundImage: `url(${c.cover})` }
                        : undefined
                    }
                  />
                  <div className="meta">
                    <div className="title">{c.title}</div>
                    <div className="sub">#{c.tag}</div>
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
          align-items: baseline;
          gap: 16px;
          margin-bottom: 16px;
        }
        .h1 {
          margin: 0;
          font-size: 28px;
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
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .card {
          display: block;
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          transition: transform 0.18s ease, border-color 0.18s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 244, 244, 0.3);
        }
        .cover {
          height: 160px;
          background-size: cover;
          background-position: center;
          background-image: linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02));
        }
        .meta {
          padding: 12px 12px 14px;
        }
        .title {
          font-weight: 700;
          font-size: 16px;
        }
        .sub {
          margin-top: 6px;
          font-size: 12px;
          opacity: 0.75;
        }

        @media (max-width: 991px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 520px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
