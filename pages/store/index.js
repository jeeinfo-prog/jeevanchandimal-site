import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

export default function StoreIndex() {
  const router = useRouter()

  const [query, setQuery] = React.useState('')

  const [photos, setPhotos] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  // ✅ Read q or tag from URL on load
  React.useEffect(() => {
    if (!router.isReady) return
    const q = typeof router.query.q === 'string' ? router.query.q : ''
    const tag = typeof router.query.tag === 'string' ? router.query.tag : ''
    setQuery(q || tag || '')
  }, [router.isReady])

  React.useEffect(() => {
    let alive = true

    async function run() {
      try {
        setLoading(true)
        setError('')

        const r = await fetch('/api/store/photos')
        const data = await r.json()

        if (!alive) return

        if (!data?.ok) {
          setError(data?.error || 'Failed to load photos')
          setPhotos([])
          return
        }

        const normalized = (data.photos || []).map((row) => ({
          id: row.id,
          title: row.title || 'Untitled',
          tags: Array.isArray(row.tags) ? row.tags : [],
          orientation: 'photo',
          thumbUrl: row.thumb_url,
          previewUrl: row.preview_url,
          created_at: row.created_at,
        }))

        setPhotos(normalized)
      } catch (e) {
        if (!alive) return
        setError('Failed to load photos')
        setPhotos([])
      } finally {
        if (!alive) return
        setLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return photos

    return photos.filter((p) => {
      const haystack = `${p.title} ${(p.tags || []).join(' ')} ${p.orientation}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [query, photos])

  return (
    <>
      <Head>
        <title>Store | Jeevan Chandimal</title>
        <meta
          name="description"
          content="Browse and license high-quality photographs. Personal, Commercial, and Editorial licenses available."
        />
      </Head>

      <JeevanChandimalNavi />

      <main className="store-wrap">
        <header className="store-header">
          <div>
            <h1 className="store-title">Photo Store</h1>
            <p className="store-sub">
              License images in <strong>Personal</strong>, <strong>Commercial</strong>, or{' '}
              <strong>Editorial</strong>.
            </p>
          </div>

          <div className="store-controls">
            <input
              className="store-search"
              value={query}
              onChange={(e) => {
                const val = e.target.value
                setQuery(val)

                router.replace({ pathname: '/store', query: val ? { q: val } : {} }, undefined, {
                  shallow: true,
                })
              }}
              placeholder="Search (e.g. Sigiriya, night, portrait)…"
              aria-label="Search photos"
            />

            {/* ✅ Collections link near the search bar */}
            <Link href="/store/collections">
              <a className="collectionsLink">Browse Collections →</a>
            </Link>
          </div>
        </header>

        {loading && <div className="empty">Loading photos…</div>}
        {!loading && error && <div className="empty">{error}</div>}

        {/* ✅ Active filter banner */}
        {!loading && !error && query && (
          <div className="activeFilter">
            Showing results for <strong>{query}</strong>
            <button
              type="button"
              className="clearBtn"
              onClick={() => {
                setQuery('')
                router.replace('/store', undefined, { shallow: true })
              }}
            >
              ✕ Clear
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <section className="grid">
              {filtered.map((p) => {
                const firstTag = Array.isArray(p.tags) ? p.tags.find(Boolean) : ''
                return (
                  <Link key={p.id} href={`/store/${p.id}`}>
                    <a className="card">
                      <div className="thumb">
                        <img src={p.thumbUrl} alt={p.title} loading="lazy" />

                        {/* ✅ Getty-style hover overlay */}
                        <div className="overlay" aria-hidden="true">
                          <div className="overlayInner">
                            <div className="ovTitle">{p.title}</div>
                            <div className="ovMeta">
                              {firstTag ? `#${firstTag}` : 'View details'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="meta">
                        <div className="meta-top">
                          <h3 className="name">{p.title}</h3>
                          <span className="pill">{p.orientation}</span>
                        </div>

                        {/* ✅ clickable tag chips */}
                        <div className="tagRow">
                          {(p.tags || []).slice(0, 3).map((t) => (
                            <button
                              key={t}
                              type="button"
                              className="tagChip"
                              onClick={(e) => {
                                e.preventDefault()
                                router.replace(
                                  { pathname: '/store', query: { tag: t } },
                                  undefined,
                                  { shallow: true }
                                )
                                setQuery(t)
                              }}
                            >
                              {t}
                            </button>
                          ))}
                        </div>

                        {/* ✅ remove price hint completely (clean grid) */}
                      </div>
                    </a>
                  </Link>
                )
              })}
            </section>

            {filtered.length === 0 && (
              <div className="empty">
                No results for <strong>{query}</strong>
              </div>
            )}
          </>
        )}
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .store-wrap {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 20px 80px;
        }
        .store-header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-end;
          margin-bottom: 22px;
        }
        .store-title {
          margin: 0;
          font-size: 34px;
          line-height: 1.1;
        }
        .store-sub {
          margin: 10px 0 0;
          opacity: 0.85;
          line-height: 1.6;
        }
        .store-controls {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .store-search {
          min-width: 280px;
          padding: 12px 14px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(255, 255, 255, 0.02);
          color: inherit;
          outline: none;
        }
        .store-search::placeholder {
          opacity: 0.6;
        }

        .collectionsLink {
          text-decoration: none;
          font-size: 13px;
          opacity: 0.82;
          border: 1px solid rgba(245, 244, 244, 0.16);
          padding: 12px 14px;
          border-radius: 999px;
          transition: opacity 0.18s ease, border-color 0.18s ease,
            background 0.18s ease, transform 0.18s ease;
          background: rgba(255, 255, 255, 0.02);
          white-space: nowrap;
        }
        .collectionsLink:hover {
          opacity: 1;
          border-color: rgba(245, 244, 244, 0.35);
          background: rgba(245, 244, 244, 0.06);
          transform: translateY(-1px);
        }

        .activeFilter {
          margin-bottom: 14px;
          padding: 10px 14px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          opacity: 0.9;
        }
        .clearBtn {
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          font-size: 13px;
          opacity: 0.7;
        }
        .clearBtn:hover {
          opacity: 1;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .card {
          display: block;
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          transition: transform 0.18s ease, border-color 0.18s ease,
            box-shadow 0.18s ease;
          will-change: transform;
        }
        .card:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 244, 244, 0.3);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25);
        }

        .thumb {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          position: relative;
        }
        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
        .card:hover .thumb img {
          transform: scale(1.06);
        }

        /* ✅ Overlay */
        .overlay {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.18s ease, transform 0.18s ease;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0)
          );
          display: grid;
          align-items: end;
          pointer-events: none;
        }
        .card:hover .overlay {
          opacity: 1;
          transform: translateY(0);
        }
        .overlayInner {
          padding: 14px;
        }
        .ovTitle {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.25;
        }
        .ovMeta {
          margin-top: 6px;
          font-size: 12px;
          opacity: 0.85;
        }

        .meta {
          padding: 14px 14px 16px;
        }
        .meta-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
        }
        .name {
          margin: 0;
          font-size: 16px;
          line-height: 1.3;
        }
        .pill {
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          opacity: 0.85;
        }

        .tagRow {
          margin: 8px 0 0;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tagChip {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: transparent;
          color: inherit;
          cursor: pointer;
          opacity: 0.8;
        }
        .tagChip:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
        }

        .empty {
          margin-top: 28px;
          padding: 14px 16px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          opacity: 0.9;
        }

        @media (max-width: 991px) {
          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .store-header {
            flex-direction: column;
            align-items: stretch;
          }
          .store-controls {
            justify-content: flex-start;
          }
          .store-search {
            width: 100%;
            min-width: 0;
          }
          .collectionsLink {
            width: 100%;
            text-align: center;
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
