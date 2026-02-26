// pages/store/index.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import JeevanChandimalNavi from '../../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../../components/jeevan-chandimal-new-footer'

import { addToCart } from '../../lib/cart'

const PLACEHOLDER = '/placeholder.png'

/* ================== currency defaults ================== */
const STORAGE_CCY_KEY = 'jc_currency_v1'
const STORAGE_FX_LOCK_KEY = 'jc_fx_lock_v1'
const DEFAULT_CURRENCY = 'USD'

function safeJsonParse(v, fallback) {
  try {
    return JSON.parse(v)
  } catch {
    return fallback
  }
}

function readCurrency() {
  if (typeof window === 'undefined') return DEFAULT_CURRENCY
  const raw = window.localStorage.getItem(STORAGE_CCY_KEY)
  const c = String(raw || '').trim().toUpperCase()
  return c === 'LKR' ? 'LKR' : 'USD'
}

function writeCurrency(ccy) {
  if (typeof window === 'undefined') return
  const c = String(ccy || '').trim().toUpperCase() === 'LKR' ? 'LKR' : 'USD'
  window.localStorage.setItem(STORAGE_CCY_KEY, c)
}

function round2(n) {
  const x = Number(n || 0)
  return Math.round(x * 100) / 100
}

function readUsdLkrRate() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_FX_LOCK_KEY)
  const lock = safeJsonParse(raw, null)

  // support a few shapes:
  // { usdLkr: 310.12, lockedAt: 123... }
  // { rate: 310.12, ... }
  // { usd_lkr: 310.12, ... }
  const v = lock?.usdLkr ?? lock?.rate ?? lock?.usd_lkr ?? null
  const n = Number(v)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

const PRICES = {
  LKR: {
    personal: { jpg: 2500, raw: 4000 },
    commercial: { jpg: 7500, raw: 10500 },
    editorial: { jpg: 4000, raw: 6000 },
  },
  USD: {
    personal: { jpg: 8, raw: 13 },
    commercial: { jpg: 25, raw: 35 },
    editorial: { jpg: 13, raw: 20 },
  },
}

function normalizeUrl(url, origin) {
  if (!url || typeof url !== 'string') return ''
  const u = url.trim()
  if (!u) return ''
  if (u.startsWith('http://') || u.startsWith('https://')) return u
  if (u.startsWith('/')) return `${origin}${u}`
  return u
}

function money(currency, amount) {
  const n = Number(amount || 0)
  if (currency === 'LKR') return `LKR ${Math.round(n).toLocaleString('en-LK')}`
  return `$${n}`
}

function getUnitPrice({ currency, license, format, usdLkrRate }) {
  const ccy = String(currency || '').toUpperCase() === 'LKR' ? 'LKR' : 'USD'
  const lic = String(license || '').trim().toLowerCase()
  const fmt = String(format || '').trim().toLowerCase()

  const baseUsd = PRICES?.USD?.[lic]?.[fmt] != null ? Number(PRICES.USD[lic][fmt]) : 0
  if (ccy === 'USD') return baseUsd

  // ✅ LKR adjusted from USD * rate (if available); fallback to static LKR table
  if (usdLkrRate != null && Number.isFinite(Number(usdLkrRate)) && Number(usdLkrRate) > 0) {
    return round2(baseUsd * Number(usdLkrRate))
  }

  const fallbackLkr = PRICES?.LKR?.[lic]?.[fmt] != null ? Number(PRICES.LKR[lic][fmt]) : 0
  return fallbackLkr
}

export default function StoreIndex() {
  const router = useRouter()

  const [query, setQuery] = React.useState('')
  const [photos, setPhotos] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [origin, setOrigin] = React.useState('') // ✅ for normalizing relative URLs

  // ✅ Default currency = USD (persisted)
  const [currency, setCurrency] = React.useState(DEFAULT_CURRENCY)

  // ✅ FX rate (optional) used to adjust LKR from USD
  const [usdLkrRate, setUsdLkrRate] = React.useState(null)

  // ✅ Member status (store-wide badge/CTA)
  const [member, setMember] = React.useState({
    loading: true,
    email: '',
    isMember: false,
    plan: '',
    end_date: null,
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    setOrigin(window.location.origin)
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const c = readCurrency()
    setCurrency(c)
    writeCurrency(c) // ensure stored (defaults to USD)
    setUsdLkrRate(readUsdLkrRate())
  }, [])

  // ✅ Check membership once (non-breaking)
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const savedEmail = String(window.localStorage.getItem('user_email') || '')
      .trim()
      .toLowerCase()

    if (!savedEmail) {
      setMember({ loading: false, email: '', isMember: false, plan: '', end_date: null })
      return
    }

    let alive = true

    async function check() {
      try {
        setMember({ loading: true, email: savedEmail, isMember: false, plan: '', end_date: null })

        const r = await fetch(`/api/member/status?email=${encodeURIComponent(savedEmail)}`, {
          headers: { 'Cache-Control': 'no-store' },
        })
        const j = await r.json().catch(() => null)

        if (!alive) return

        const ok = Boolean(j?.ok)
        const isMember = ok ? Boolean(j?.member) : false
        const plan = isMember ? String(j?.plan || '') : ''
        const end_date = isMember ? j?.end_date || null : null

        setMember({ loading: false, email: savedEmail, isMember, plan, end_date })
      } catch {
        if (!alive) return
        // ✅ fail-safe: store still works
        setMember({ loading: false, email: savedEmail, isMember: false, plan: '', end_date: null })
      }
    }

    check()
    return () => {
      alive = false
    }
  }, [])

  // ✅ Read q or tag from URL on load
  React.useEffect(() => {
    if (!router.isReady) return
    const q = typeof router.query.q === 'string' ? router.query.q : ''
    const tag = typeof router.query.tag === 'string' ? router.query.tag : ''
    setQuery(q || tag || '')
  }, [router.isReady, router.query.q, router.query.tag])

  React.useEffect(() => {
    let alive = true

    async function run() {
      try {
        setLoading(true)
        setError('')

        const r = await fetch('/api/store/photos', { headers: { 'Cache-Control': 'no-store' } })
        const data = await r.json().catch(() => null)

        if (!alive) return

        if (!r.ok || !data?.ok) {
          setError(data?.error || `Failed to load photos (${r.status})`)
          setPhotos([])
          return
        }

        const normalized = (data.photos || []).map((row) => {
          const thumbRaw = row.thumb_url || ''
          const previewRaw = row.preview_url || ''

          const thumbUrl = origin ? normalizeUrl(thumbRaw, origin) : thumbRaw
          const previewUrl = origin ? normalizeUrl(previewRaw, origin) : previewRaw

          return {
            id: row.id,
            title: row.title || 'Untitled',
            tags: Array.isArray(row.tags) ? row.tags : [],
            orientation: 'photo',
            thumbUrl,
            previewUrl,
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

    // only run once we know origin (so URLs normalize correctly)
    if (origin) run()

    return () => {
      alive = false
    }
  }, [origin])

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

            {/* ✅ Next-safe Link */}
            <Link href="/store/collections" legacyBehavior>
              <a className="collectionsLink">Browse Collections →</a>
            </Link>
          </div>
        </header>

        {/* ✅ Member Access bar (non-breaking) */}
        <div className="memberBar">
          <div className="memberLeft">
            <div className="memberTitle">Member Access</div>
            <div className="memberSub">
              {member.loading
                ? 'Checking membership…'
                : member.isMember
                ? `Active • ${member.plan ? `${member.plan} plan` : 'Member'}${
                    member.end_date ? ` • Ends ${new Date(member.end_date).toLocaleDateString()}` : ''
                  }`
                : member.email
                ? `No active membership for ${member.email}`
                : 'Add your membership email on the Membership page to unlock access.'}
            </div>
          </div>

          <div className="memberRight">
            {member.isMember ? (
              <>
                <Link href="/memberships" legacyBehavior>
                  <a className="memberBtnOutline">Manage Membership</a>
                </Link>
                <Link href="/license" legacyBehavior>
                  <a className="memberBtn">License Terms →</a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/memberships" legacyBehavior>
                  <a className="memberBtn">Get Membership →</a>
                </Link>
                <Link href="/license" legacyBehavior>
                  <a className="memberBtnOutline">View License</a>
                </Link>
              </>
            )}
          </div>
        </div>

        {loading && <div className="empty">Loading photos…</div>}
        {!loading && error && <div className="empty">{error}</div>}

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
                const imgSrc = p.thumbUrl || p.previewUrl || PLACEHOLDER

                return (
                  <Link key={p.id} href={`/store/${p.id}`} legacyBehavior>
                    <a className="card">
                      <div className="thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imgSrc}
                          alt={p.title}
                          loading="lazy"
                          onError={(e) => {
                            if (e.currentTarget.src.endsWith(PLACEHOLDER)) return
                            e.currentTarget.src = PLACEHOLDER
                          }}
                        />

                        <div className="overlay" aria-hidden="true">
                          <div className="overlayInner">
                            <div className="ovTitle">{p.title}</div>
                            <div className="ovMeta">{firstTag ? `#${firstTag}` : 'View details'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="meta">
                        <div className="meta-top">
                          <h3 className="name">{p.title}</h3>
                          <span className="pill">{p.orientation}</span>
                        </div>

                        <div className="tagRow">
                          {(p.tags || []).slice(0, 3).map((t) => (
                            <button
                              key={t}
                              type="button"
                              className="tagChip"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                router.replace({ pathname: '/store', query: { tag: t } }, undefined, {
                                  shallow: true,
                                })
                                setQuery(t)
                              }}
                            >
                              {t}
                            </button>
                          ))}
                        </div>

                        {/* ✅ Price hidden on store grid (premium feel) */}
                        <div className="hint">Licensing available • View details →</div>

                        {/* ✅ Add to Cart (compact) */}
                        <div
                          className="cartBox"
                          onClick={(e) => {
                            // stop Link navigation
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                        >
                          <CartMini
                            photo={p}
                            currency={currency}
                            setCurrency={(ccy) => {
                              setCurrency(ccy)
                              writeCurrency(ccy)
                            }}
                            usdLkrRate={usdLkrRate}
                          />
                        </div>
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
          transition: opacity 0.18s ease, border-color 0.18s ease, background 0.18s ease,
            transform 0.18s ease;
          background: rgba(255, 255, 255, 0.02);
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .collectionsLink:hover {
          opacity: 1;
          border-color: rgba(245, 244, 244, 0.35);
          background: rgba(245, 244, 244, 0.06);
          transform: translateY(-1px);
        }

        /* ✅ Member bar */
        .memberBar {
          margin: 14px 0 18px;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          padding: 14px 14px;
          display: flex;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
        }
        .memberTitle {
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.2px;
        }
        .memberSub {
          margin-top: 4px;
          font-size: 12px;
          opacity: 0.82;
          line-height: 1.45;
        }
        .memberRight {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .memberBtn,
        .memberBtnOutline {
          text-decoration: none;
          padding: 11px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          white-space: nowrap;
          transition: 0.2s ease;
        }
        .memberBtn {
          border: 1px solid rgba(37, 195, 226, 0.55);
          background: rgba(37, 195, 226, 0.08);
        }
        .memberBtn:hover {
          border-color: rgba(37, 195, 226, 0.75);
          box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.12);
        }
        .memberBtnOutline {
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(255, 255, 255, 0.02);
          color: inherit;
          opacity: 0.9;
        }
        .memberBtnOutline:hover {
          opacity: 1;
          border-color: rgba(245, 244, 244, 0.35);
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
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
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
          background: rgba(255, 255, 255, 0.03);
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

        .hint {
          margin-top: 10px;
          font-size: 12px;
          opacity: 0.78;
          line-height: 1.4;
        }

        .cartBox {
          margin-top: 12px;
          border-top: 1px solid rgba(245, 244, 244, 0.1);
          padding-top: 12px;
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
          }

          .memberBar {
            flex-direction: column;
            align-items: stretch;
          }
          .memberRight {
            justify-content: flex-start;
          }
          .memberBtn,
          .memberBtnOutline {
            width: 100%;
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

/* ---------------- small inline cart UI ---------------- */

function CartMini({ photo, currency, setCurrency, usdLkrRate }) {
  const [license, setLicense] = React.useState('personal')
  const [format, setFormat] = React.useState('jpg')
  const [msg, setMsg] = React.useState('')

  const ccy = String(currency || '').toUpperCase() === 'LKR' ? 'LKR' : 'USD'

  const unitPrice = getUnitPrice({
    currency: ccy,
    license,
    format,
    usdLkrRate,
  })

  function onAdd() {
    addToCart({
      photoId: photo.id,
      title: photo.title || '',
      thumbUrl: photo.thumbUrl || '',
      license,
      format,
      currency: ccy,
      unitPrice,
      qty: 1,
    })

    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new Event('jc_cart_updated'))
      } catch {}
    }

    setMsg('Added ✅')
    setTimeout(() => setMsg(''), 1000)
  }

  return (
    <div className="cm">
      <div className="row">
        <select className="sel" value={license} onChange={(e) => setLicense(e.target.value)}>
          <option value="personal">Personal</option>
          <option value="editorial">Editorial</option>
          <option value="commercial">Commercial</option>
        </select>

        <select className="sel" value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="jpg">JPG</option>
          <option value="raw">RAW</option>
        </select>

        <select
          className="sel"
          value={ccy}
          onChange={(e) => {
            const next = String(e.target.value || '').toUpperCase() === 'LKR' ? 'LKR' : 'USD'
            setCurrency(next) // persists via parent
          }}
        >
          <option value="USD">USD</option>
          <option value="LKR">LKR</option>
        </select>
      </div>

      <div className="row2">
        {/* ✅ No price on store grid */}
        <button
          className="btn"
          type="button"
          onClick={onAdd}
          title={`Add to cart • ${money(ccy, unitPrice)}`}
        >
          Add to cart
        </button>
        {msg ? <span className="msg">{msg}</span> : null}
      </div>

      <style jsx>{`
        .cm {
          display: grid;
          gap: 10px;
        }
        .row {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 0.9fr;
          gap: 8px;
        }
        .sel {
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(0, 0, 0, 0.28);
          color: #fff;
          outline: none;
          font-size: 12px;
        }
        .row2 {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .btn {
          width: 100%;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(0, 120, 255, 0.22);
          color: #fff;
          font-weight: 800;
          cursor: pointer;
          font-size: 12px;
          text-align: center;
        }
        .btn:hover {
          background: rgba(0, 120, 255, 0.28);
        }
        .msg {
          font-size: 12px;
          opacity: 0.85;
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}