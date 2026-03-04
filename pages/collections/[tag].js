// pages/collections/[tag].js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/layout/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/layout/jeevan-chandimal-new-footer'

async function safeJson(resp) {
  const text = await resp.text()
  try {
    return { json: JSON.parse(text), text }
  } catch {
    return { json: null, text }
  }
}

function titleCase(s) {
  return String(s || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ')
}

export default function CollectionTagPage() {
  const router = useRouter()
  const tag = typeof router.query.tag === 'string' ? router.query.tag : ''
  const page = Math.max(1, parseInt(String(router.query.page || '1'), 10) || 1)
  const limit = 24

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [photos, setPhotos] = React.useState([])

  React.useEffect(() => {
    if (!router.isReady || !tag) return

    let alive = true

    async function run() {
      try {
        setLoading(true)
        setError('')
        setPhotos([])

        const r = await fetch(
          `/api/store/collection-photos?tag=${encodeURIComponent(tag)}&limit=${limit}&offset=${(page - 1) * limit}`,
          { headers: { 'Cache-Control': 'no-store' } }
        )

        const { json, text } = await safeJson(r)
        if (!alive) return

        if (!r.ok || !json?.ok) {
          setError(json?.error || text || 'Failed to load collection')
          setLoading(false)
          return
        }

        setPhotos(Array.isArray(json?.photos) ? json.photos : [])
        setLoading(false)
      } catch {
        if (!alive) return
        setError('Failed to load collection')
        setLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [router.isReady, tag, page])

  const prettyTag = titleCase(tag)
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://jeevanchandimal.com').replace(/\/$/, '')
  const canonical = `${siteUrl}/collections/${encodeURIComponent(tag)}`

  return (
    <>
      <Head>
        <title>{prettyTag ? `${prettyTag} Photos | Collections` : 'Collections'}</title>
        <meta
          name="description"
          content={`Browse ${prettyTag} photographs by Jeevan Chandimal. License and download premium images.`}
        />
        <link rel="canonical" href={canonical} />
      </Head>

      <JeevanChandimalNavi />

      <main className="wrap">
        <div className="top">
          <div>
            <Link href="/collections">
              <a className="back">← Back to collections</a>
            </Link>
            <h1 className="h1">{prettyTag}</h1>
            <p className="sub">Premium photographs tagged “{tag}”.</p>
          </div>

          <div className="actions">
            <Link href="/store">
              <a className="btnGhost">All photos</a>
            </Link>
          </div>
        </div>

        {loading && <div className="state">Loading…</div>}
        {!loading && error && <div className="state">❌ {error}</div>}

        {!loading && !error && (
          <>
            {photos.length === 0 ? (
              <div className="empty">
                <div className="emptyTitle">No photos in this collection yet</div>
                <div className="emptySub">
                  Add the tag <code>{tag}</code> to photos in Admin Upload, then refresh.
                </div>
                <Link href="/admin/upload">
                  <a className="btnPrimary">Go to Admin Upload</a>
                </Link>
              </div>
            ) : (
              <div className="grid">
                {photos.map((p) => (
                  <Link key={p.id} href={`/store/${p.id}`}>
                    <a className="card">
                      <div className="thumb">
                        <img
                          src={p.thumb_url}
                          alt={p.title || 'Photo'}
                          loading="lazy"
                          onError={(e) => {
                            if (p.preview_url && e.currentTarget.src !== p.preview_url) {
                              e.currentTarget.src = p.preview_url
                              return
                            }
                          }}
                        />
                        <div className="wm" />
                      </div>

                      <div className="meta">
                        <div className="name">{p.title || 'Untitled'}</div>
                        <div className="tagline">
                          {Array.isArray(p.tags) && p.tags[0] ? `#${p.tags[0]}` : 'Photo'}
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination (simple) */}
            <div className="pager">
              <Link href={`/collections/${encodeURIComponent(tag)}?page=${Math.max(1, page - 1)}`}>
                <a className={`btnGhost ${page <= 1 ? 'disabled' : ''}`} aria-disabled={page <= 1}>
                  ← Prev
                </a>
              </Link>

              <div className="pageNum">Page {page}</div>

              <Link href={`/collections/${encodeURIComponent(tag)}?page=${page + 1}`}>
                <a className={`btnGhost ${photos.length < limit ? 'disabled' : ''}`} aria-disabled={photos.length < limit}>
                  Next →
                </a>
              </Link>
            </div>
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
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
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
          letter-spacing: -0.2px;
        }

        .sub {
          margin: 8px 0 0;
          opacity: 0.75;
          line-height: 1.6;
        }

        .actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .state {
          margin: 18px 0;
          padding: 14px 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          opacity: 0.95;
          background: rgba(255, 255, 255, 0.02);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-top: 12px;
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
          border: 1px solid rgba(245, 244, 244, 0.1);
          background: rgba(255, 255, 255, 0.02);
        }

        .thumb img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
          -webkit-user-drag: none;
          user-select: none;
          -webkit-touch-callout: none;
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
          pointer-events: none;
          transform: rotate(-12deg);
          opacity: 0.08;
        }

        .meta {
          margin-top: 8px;
        }

        .name {
          font-size: 13px;
          line-height: 1.3;
          opacity: 0.95;
        }

        .tagline {
          margin-top: 4px;
          font-size: 12px;
          opacity: 0.7;
        }

        .pager {
          margin-top: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 16px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.02);
        }

        .pageNum {
          font-size: 12px;
          opacity: 0.8;
        }

        .btnGhost {
          display: inline-block;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.04);
          text-decoration: none;
          color: inherit;
          font-size: 12px;
          font-weight: 700;
        }
        .btnGhost:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .btnGhost.disabled {
          opacity: 0.45;
          pointer-events: none;
        }

        .btnPrimary {
          display: inline-block;
          padding: 12px 16px;
          border-radius: 999px;
          background: #f5f4f4;
          color: #222;
          text-decoration: none;
          font-weight: 800;
          margin-top: 12px;
        }

        .empty {
          margin-top: 16px;
          padding: 18px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
        }
        .emptyTitle {
          font-weight: 800;
          font-size: 16px;
        }
        .emptySub {
          margin-top: 8px;
          opacity: 0.75;
          line-height: 1.6;
          font-size: 13px;
        }
        code {
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 6px;
          border-radius: 8px;
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
