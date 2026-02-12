import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

export default function StoreIndex() {
  const [query, setQuery] = React.useState('')
  const [currency, setCurrency] = React.useState('LKR') // LKR | USD

  const [photos, setPhotos] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

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

        // Normalize DB rows -> UI shape your store already expects
        const normalized = (data.photos || []).map((row) => {
          const orientation = 'photo' // optional: compute if you have width/height later
          return {
            id: row.id,
            title: row.title || 'Untitled', // if you don’t have title in DB, keep fallback
            tags: row.tags || [], // if you don’t have tags in DB, keep []
            orientation,
            thumbUrl: row.thumb_url,
            previewUrl: row.preview_url,
            created_at: row.created_at,
          }
        })

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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search (e.g. Sigiriya, night, portrait)…"
              aria-label="Search photos"
            />

            <div className="store-toggle" role="group" aria-label="Currency toggle">
              <button
                type="button"
                className={`store-toggle-btn ${currency === 'LKR' ? 'active' : ''}`}
                onClick={() => setCurrency('LKR')}
              >
                LKR
              </button>
              <button
                type="button"
                className={`store-toggle-btn ${currency === 'USD' ? 'active' : ''}`}
                onClick={() => setCurrency('USD')}
              >
                USD
              </button>
            </div>
          </div>
        </header>

        {/* Loading / Error */}
        {loading && <div className="empty">Loading photos…</div>}
        {!loading && error && <div className="empty">{error}</div>}

        {!loading && !error && (
          <>
            <section className="grid">
              {filtered.map((p) => (
                <Link key={p.id} href={`/store/${p.id}`}>
                  <a className="card">
                    <div className="thumb">
                      <img src={p.thumbUrl} alt={p.title} loading="lazy" />
                    </div>
                    <div className="meta">
                      <div className="meta-top">
                        <h3 className="name">{p.title}</h3>
                        <span className="pill">{p.orientation}</span>
                      </div>
                      <p className="tags">{(p.tags || []).slice(0, 3).join(' · ')}</p>

                      <p className="priceHint">
                        From <strong>{currency === 'LKR' ? 'LKR 2,500' : '$8'}</strong>
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
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
        .store-toggle {
          display: inline-flex;
          border: 1px solid rgba(245, 244, 244, 0.18);
          border-radius: 999px;
          overflow: hidden;
        }
        .store-toggle-btn {
          padding: 10px 14px;
          background: transparent;
          color: inherit;
          border: 0;
          cursor: pointer;
          opacity: 0.75;
          transition: opacity 180ms ease, background 180ms ease;
        }
        .store-toggle-btn:hover {
          opacity: 1;
        }
        .store-toggle-btn.active {
          opacity: 1;
          background: rgba(245, 244, 244, 0.12);
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
          transition: transform 180ms ease, border-color 180ms ease;
        }
        .card:hover {
          transform: translateY(-2px);
          border-color: rgba(245, 244, 244, 0.22);
        }
        .thumb {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
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
        .tags {
          margin: 8px 0 0;
          opacity: 0.7;
          font-size: 13px;
        }
        .priceHint {
          margin: 10px 0 0;
          font-size: 13px;
          opacity: 0.9;
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
