// pages/members.js
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

import JeevanChandimalNavi from '../components/jeevan-chandimal-navi'
import JeevanChandimalNewFooter from '../components/jeevan-chandimal-new-footer'

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY')
  return createClient(url, anon)
}

function normalizeEmail(v) {
  return String(v || '').trim().toLowerCase()
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
}

function fmtTier(t) {
  const x = String(t || '').toLowerCase()
  if (x === 'basic') return 'Basic'
  if (x === 'pro') return 'Pro'
  if (x === 'elite') return 'Elite'
  return 'Member'
}

function normalizeTierUpper(v) {
  const x = String(v || '').trim().toLowerCase()
  if (x === 'basic') return 'BASIC'
  if (x === 'pro') return 'PRO'
  if (x === 'elite') return 'ELITE'
  return ''
}

function useRevealOnScroll() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!els.length) return
    els.forEach((el) => el.classList.add('revealInit'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealIn')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function Members() {
  useRevealOnScroll()

  const supabase = React.useMemo(() => getSupabaseClient(), [])

  const [email, setEmail] = React.useState('')
  const [sendingLink, setSendingLink] = React.useState(false)
  const [checking, setChecking] = React.useState(false)
  const [error, setError] = React.useState('')

  const [session, setSession] = React.useState(null)
  const [member, setMember] = React.useState(null)

  const [photos, setPhotos] = React.useState([])
  const [photosLoading, setPhotosLoading] = React.useState(false)

  const [query, setQuery] = React.useState('')
  const [downloadingId, setDownloadingId] = React.useState('')
  const [format, setFormat] = React.useState('jpg') // jpg | raw (elite only)

  const canRaw = String(member?.tier || '').toLowerCase() === 'elite'
  React.useEffect(() => {
    if (!canRaw && format === 'raw') setFormat('jpg')
  }, [canRaw, format])

  // Load session + listen changes
  React.useEffect(() => {
    let alive = true

    async function init() {
      const { data } = await supabase.auth.getSession()
      if (!alive) return
      setSession(data?.session || null)

      // Prefill email from session if available
      const em = data?.session?.user?.email
      if (em) setEmail(String(em))
    }

    init()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess || null)
      const em = sess?.user?.email
      if (em) setEmail(String(em))
      if (!sess) {
        setMember(null)
        setPhotos([])
      }
    })

    return () => {
      alive = false
      sub?.subscription?.unsubscribe?.()
    }
  }, [supabase])

  async function sendMagicLink() {
    try {
      setError('')
      const clean = normalizeEmail(email)
      if (!isValidEmail(clean)) {
        setError('Enter a valid email address.')
        return
      }

      setSendingLink(true)

      const redirectTo =
        (typeof window !== 'undefined' ? window.location.origin : '') + '/members'

      const { error: e } = await supabase.auth.signInWithOtp({
        email: clean,
        options: { emailRedirectTo: redirectTo },
      })

      if (e) {
        setError(e.message || 'Failed to send magic link.')
        return
      }

      setError('Magic link sent — check your inbox.')
    } catch (e) {
      setError(e?.message || 'Something went wrong.')
    } finally {
      setSendingLink(false)
    }
  }

  async function signOut() {
    try {
      setError('')
      await supabase.auth.signOut()
    } catch (e) {
      setError(e?.message || 'Sign out failed.')
    }
  }

  async function authedFetch(path, opts = {}) {
    const accessToken = session?.access_token
    if (!accessToken) throw new Error('Not authenticated')

    const headers = {
      ...(opts.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      'Cache-Control': 'no-store',
    }

    return fetch(path, { ...opts, headers, cache: 'no-store' })
  }

  async function refreshMemberStatus() {
    setChecking(true)
    setError('')

    try {
      const r = await authedFetch('/api/member/status?t=' + Date.now())
      const d = await r.json().catch(() => ({}))

      if (!r.ok || !d?.ok) {
        setMember(null)
        setError(d?.error || 'Failed to check membership.')
        return
      }

      if (!d.member) {
        setMember({ ok: false })
        return
      }

      const next = {
        ok: true,
        tier: d.tier || 'pro',
        used: Number(d.used ?? 0),
        limit: Number(d.limit ?? 0),
        remaining: Number(d.remaining ?? 0),
      }

      setMember(next)

      // ✅ Update nav badge (no refresh)
      try {
        const tierUpper = normalizeTierUpper(next.tier)
        if (tierUpper) window.localStorage.setItem('member_tier', tierUpper)
        if (Number.isFinite(Number(next.remaining))) {
          window.localStorage.setItem('member_remaining', String(Number(next.remaining)))
        } else {
          window.localStorage.removeItem('member_remaining')
        }
        window.dispatchEvent(new Event('jc_member_updated'))
      } catch {}

      await loadLibrary()
    } catch (e) {
      setMember(null)
      setError(e?.message || 'Something went wrong.')
    } finally {
      setChecking(false)
    }
  }

  async function loadLibrary() {
    try {
      setPhotosLoading(true)
      const r = await fetch('/api/store/photos?t=' + Date.now(), { cache: 'no-store' })
      const j = await r.json().catch(() => null)
      const list = Array.isArray(j?.photos) ? j.photos : []
      setPhotos(list)
    } catch {
      setPhotos([])
    } finally {
      setPhotosLoading(false)
    }
  }

  React.useEffect(() => {
    // Auto-refresh status when session becomes available
    if (session?.access_token) refreshMemberStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.access_token])

  const filteredPhotos = React.useMemo(() => {
    const q = String(query || '').trim().toLowerCase()
    if (!q) return photos
    return (photos || []).filter((p) => {
      const t = String(p?.title || '').toLowerCase()
      const tags = Array.isArray(p?.tags) ? p.tags.join(' ').toLowerCase() : ''
      return t.includes(q) || tags.includes(q)
    })
  }, [photos, query])

  async function downloadPhoto(photo) {
    try {
      setError('')
      if (!session?.access_token) {
        setError('Please sign in first.')
        return
      }

      const pid = String(photo?.id || '').trim()
      if (!pid) {
        setError('Missing photo id.')
        return
      }

      setDownloadingId(pid)

      const r = await authedFetch('/api/member/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId: pid, format }),
      })

      const j = await r.json().catch(() => ({}))

      if (!r.ok || !j?.ok) {
        setError(j?.error || 'Download failed.')
        return
      }

      // Update meter immediately
      setMember((prev) => {
        if (!prev?.ok) return prev
        const nextTier = j?.tier || prev.tier
        const nextUsed = Number(j?.used ?? prev.used ?? 0)
        const nextLimit = Number(j?.limit ?? prev.limit ?? 0)
        const nextRemaining = Number(j?.remaining ?? Math.max(0, nextLimit - nextUsed))
        return { ...prev, tier: nextTier, used: nextUsed, limit: nextLimit, remaining: nextRemaining }
      })

      // Update nav badge
      try {
        const tierUpper = normalizeTierUpper(j?.tier || member?.tier)
        if (tierUpper) window.localStorage.setItem('member_tier', tierUpper)
        if (Number.isFinite(Number(j?.remaining))) {
          window.localStorage.setItem('member_remaining', String(Number(j.remaining)))
        }
        window.dispatchEvent(new Event('jc_member_updated'))
      } catch {}

      if (j?.url) window.location.href = j.url
    } catch (e) {
      setError(e?.message || 'Something went wrong.')
    } finally {
      setDownloadingId('')
    }
  }

  return (
    <>
      <Head>
        <title>Members — Jeevan Chandimal</title>
        <meta name="description" content="Secure member downloads and archive access." />
      </Head>

      <JeevanChandimalNavi />

      <main className="page thq-section-padding">
        <div className="thq-section-max-width">
          <section className="hero" data-reveal>
            <h1 className="thq-heading-1 center">Member Downloads</h1>
            <p className="thq-body-large center sub">
              Secure access via magic link. No password, no email spoofing.
            </p>

            <div className="accessCard">
              {!session ? (
                <>
                  <div className="row">
                    <label className="label">Email</label>
                    <div className="inputRow">
                      <input
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        inputMode="email"
                      />
                      <button
                        type="button"
                        className="thq-button-filled btn"
                        onClick={sendMagicLink}
                        disabled={sendingLink}
                      >
                        {sendingLink ? 'Sending…' : 'Send magic link'}
                      </button>
                    </div>

                    <p className="hint">
                      You’ll receive an email with a sign-in link. Open it and you’ll land back here automatically.
                    </p>

                    {error ? <p className="err">{error}</p> : null}
                  </div>

                  <div className="rightLinks">
                    <Link href="/memberships" className="linkBtn subtle">
                      Membership
                    </Link>
                    <Link href="/store" className="linkBtn">
                      Browse Store
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="signedRow">
                      <div className="pill">
                        <span className="pillDot" />
                        <span className="pillText">
                          Signed in as <strong>{session.user?.email}</strong>
                        </span>
                      </div>

                      <div className="signedActions">
                        <button type="button" className="thq-button-outline smallBtn" onClick={refreshMemberStatus} disabled={checking}>
                          {checking ? 'Refreshing…' : 'Refresh'}
                        </button>
                        <button type="button" className="thq-button-outline smallBtn" onClick={signOut}>
                          Sign out
                        </button>
                      </div>
                    </div>

                    {error ? <p className="err">{error}</p> : null}
                  </div>

                  <div className="meterRow">
                    <div className="pill">
                      <span className="pillDot" />
                      <span className="pillText">
                        {member?.ok ? `${fmtTier(member.tier)} active` : member ? 'No active membership' : 'Checking…'}
                      </span>
                    </div>

                    <div className="meter">
                      <div className="meterTop">
                        <span className="meterLabel">Monthly usage</span>
                        <span className="meterValue">
                          {member?.ok ? `${member.used}/${member.limit} used` : '—'}
                        </span>
                      </div>

                      <div className="bar">
                        <div
                          className="fill"
                          style={{
                            width:
                              member?.ok && member.limit > 0
                                ? `${Math.min(100, (Number(member.used || 0) / Number(member.limit || 1)) * 100)}%`
                                : '0%',
                          }}
                        />
                      </div>

                      <div className="meterBottom">
                        <span className="muted">{member?.ok ? `${member.remaining} remaining` : '—'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="controls">
                    <div className="searchWrap">
                      <input
                        className="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search the archive…"
                      />
                    </div>

                    <div className="formatWrap">
                      <span className="labelSmall">Format</span>
                      <div className="togglePills" role="tablist" aria-label="Format toggle">
                        <button
                          type="button"
                          className={`pillBtn ${format === 'jpg' ? 'active' : ''}`}
                          onClick={() => setFormat('jpg')}
                        >
                          JPG <span className="pillArrow">→</span>
                        </button>
                        <button
                          type="button"
                          className={`pillBtn ${format === 'raw' ? 'active' : ''} ${!canRaw ? 'disabled' : ''}`}
                          onClick={() => {
                            if (!canRaw) return
                            setFormat('raw')
                          }}
                          title={!canRaw ? 'RAW is available for Elite members' : 'RAW ZIP'}
                        >
                          RAW <span className="pillArrow">→</span>
                        </button>
                      </div>
                    </div>

                    <div className="rightLinks">
                      <Link href="/store" className="linkBtn">
                        Browse Store
                      </Link>
                      <Link href="/memberships" className="linkBtn subtle">
                        Membership
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          {session ? (
            <section className="library" data-reveal>
              <div className="libHead">
                <h2 className="thq-heading-2">Archive</h2>
                <p className="thq-body-small muted">
                  Tip: Use search and click download. (Elite can choose RAW.)
                </p>
              </div>

              {photosLoading ? (
                <div className="skeletonGrid">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div className="skCard" key={i} />
                  ))}
                </div>
              ) : filteredPhotos.length === 0 ? (
                <div className="emptyCard">
                  <h3 className="thq-heading-3">No items loaded</h3>
                  <p className="thq-body-small muted">Click “Try Load Again”.</p>
                  <div className="emptyActions">
                    <Link href="/store" className="thq-button-filled">
                      Go to Store
                    </Link>
                    <button type="button" className="thq-button-outline" onClick={loadLibrary}>
                      Try Load Again
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid">
                  {filteredPhotos.map((p) => {
                    const id = String(p?.id || '')
                    const title = String(p?.title || 'Photo')
                    const thumb = p?.thumb_url || p?.preview_url || ''
                    const canDownload = !!member?.ok

                    return (
                      <div className="card" key={id}>
                        <div className="thumb">
                          {thumb ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={thumb} alt={title} />
                          ) : (
                            <div className="thumbFallback">Preview</div>
                          )}
                        </div>

                        <div className="cardBody">
                          <div className="cardTop">
                            <div className="title">{title}</div>
                            <div className="tags">
                              {Array.isArray(p?.tags) &&
                                p.tags.slice(0, 3).map((t) => (
                                  <span className="tag" key={t}>
                                    {t}
                                  </span>
                                ))}
                            </div>
                          </div>

                          <div className="cardActions">
                            <Link href={`/store/${encodeURIComponent(id)}`} className="thq-button-outline smallBtn">
                              View
                            </Link>

                            <button
                              type="button"
                              className="thq-button-filled smallBtn"
                              onClick={() => downloadPhoto(p)}
                              disabled={!canDownload || downloadingId === id}
                              title={!canDownload ? 'No active membership' : 'Download'}
                            >
                              {downloadingId === id ? 'Preparing…' : 'Download'}
                            </button>
                          </div>

                          {!member?.ok ? (
                            <p className="hint">No active membership found for this account.</p>
                          ) : null}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          ) : null}

          <section className="support" data-reveal>
            <div className="ctaCard subtle">
              <h3>Need help?</h3>
              <p className="muted">If you have any issues with membership access or downloads, use the contact page.</p>
              <Link href="/contact" className="thq-button-filled">
                Contact
              </Link>
            </div>
          </section>
        </div>
      </main>

      <JeevanChandimalNewFooter />

      <style jsx>{`
        .center { text-align: center; }
        .muted { opacity: 0.85; }

        .revealInit { opacity: 0; transform: translateY(12px); transition: opacity 600ms ease, transform 600ms ease; }
        .revealIn { opacity: 1; transform: translateY(0); }

        .hero { display: grid; justify-items: center; gap: 16px; }
        .sub { max-width: 760px; line-height: 1.7; }

        .accessCard {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          border-radius: 18px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          padding: 18px;
          display: grid;
          gap: 16px;
        }

        .row { display: grid; gap: 10px; width: 100%; }
        .label { font-size: 13px; opacity: 0.9; }

        .inputRow { display: grid; grid-template-columns: 1fr auto; gap: 10px; width: 100%; }

        .input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(245, 244, 244, 0.18);
          background: rgba(0, 0, 0, 0.2);
          color: #f5f4f4;
          padding: 12px 14px;
          outline: none;
        }
        .input:focus { border-color: rgba(37, 195, 226, 0.65); box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.12); }

        .btn { border-radius: 12px; padding: 12px 16px; min-width: 160px; }
        .err { margin: 0; font-size: 13px; color: #ffb3b3; }
        .hint { margin: 0; font-size: 12px; opacity: 0.8; line-height: 1.6; }

        .signedRow { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
        .signedActions { display: inline-flex; gap: 10px; flex-wrap: wrap; }

        .meterRow { display: grid; grid-template-columns: auto 1fr; gap: 14px; align-items: center; }

        .pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 999px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(0, 0, 0, 0.18);
          white-space: nowrap;
        }
        .pillDot { width: 10px; height: 10px; border-radius: 999px; background: rgba(37, 195, 226, 0.9); box-shadow: 0 0 12px rgba(37, 195, 226, 0.35); }
        .pillText { font-size: 12px; font-weight: 800; opacity: 0.92; }

        .meter { display: grid; gap: 8px; }
        .meterTop { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .meterLabel { font-size: 12px; opacity: 0.85; }
        .meterValue { font-size: 12px; font-weight: 800; opacity: 0.9; }
        .bar { width: 100%; height: 10px; border-radius: 999px; border: 1px solid rgba(245, 244, 244, 0.12); background: rgba(0, 0, 0, 0.22); overflow: hidden; }
        .fill { height: 100%; border-radius: 999px; background: rgba(37, 195, 226, 0.75); box-shadow: 0 0 18px rgba(37, 195, 226, 0.25); transition: width 240ms ease; }
        .meterBottom { display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 12px; }

        .controls { display: grid; grid-template-columns: 1fr auto auto; gap: 12px; align-items: center; }
        .search { width: 100%; border-radius: 12px; border: 1px solid rgba(245, 244, 244, 0.16); background: rgba(0,0,0,0.2); color: #f5f4f4; padding: 12px 14px; outline: none; }
        .search:focus { border-color: rgba(37, 195, 226, 0.65); box-shadow: 0 0 0 4px rgba(37, 195, 226, 0.1); }

        .formatWrap { display: grid; gap: 6px; justify-items: end; }
        .labelSmall { font-size: 12px; opacity: 0.85; }
        .togglePills { display: inline-flex; gap: 10px; }

        .pillBtn {
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(255, 255, 255, 0.02);
          color: inherit;
          border-radius: 999px;
          padding: 10px 12px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 800;
          opacity: 0.86;
          transition: 0.18s ease;
        }
        .pillBtn:hover { opacity: 1; border-color: rgba(37, 195, 226, 0.55); box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.1); }
        .pillBtn.active { border-color: rgba(37, 195, 226, 0.7); background: rgba(37, 195, 226, 0.08); opacity: 1; }
        .pillBtn.disabled { opacity: 0.45; cursor: not-allowed; }
        .pillArrow { opacity: 0; transform: translateX(-4px); transition: 0.18s ease; }
        .pillBtn:hover .pillArrow, .pillBtn.active .pillArrow { opacity: 1; transform: translateX(0); }

        .rightLinks { display: inline-flex; gap: 10px; justify-content: end; flex-wrap: wrap; }
        .linkBtn { border: 1px solid rgba(245, 244, 244, 0.16); background: rgba(0, 0, 0, 0.18); color: inherit; border-radius: 999px; padding: 10px 12px; font-size: 12px; font-weight: 800; opacity: 0.88; transition: 0.18s ease; text-decoration: none; }
        .linkBtn:hover { opacity: 1; border-color: rgba(37, 195, 226, 0.55); box-shadow: 0 0 0 3px rgba(37, 195, 226, 0.1); }
        .linkBtn.subtle { background: rgba(255, 255, 255, 0.02); }

        .library { margin-top: var(--dl-layout-space-fiveunits); display: grid; gap: 14px; }
        .libHead { display: grid; gap: 6px; max-width: 980px; margin: 0 auto; width: 100%; }

        .grid { width: 100%; max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
        .card { border-radius: 18px; border: 1px solid rgba(245, 244, 244, 0.12); background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(8px); overflow: hidden; display: flex; flex-direction: column; transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease; }
        .card:hover { transform: translateY(-4px); border-color: rgba(245, 244, 244, 0.3); box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25); }

        .thumb { width: 100%; aspect-ratio: 16 / 10; background: rgba(0,0,0,0.22); display: grid; place-items: center; overflow: hidden; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .thumbFallback { font-size: 12px; opacity: 0.75; }

        .cardBody { padding: 14px; display: grid; gap: 12px; }
        .title { font-size: 13px; font-weight: 900; opacity: 0.95; line-height: 1.35; }
        .tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag { font-size: 11px; opacity: 0.85; padding: 6px 10px; border-radius: 999px; border: 1px solid rgba(245, 244, 244, 0.14); background: rgba(0,0,0,0.18); }

        .cardActions { display: flex; gap: 10px; justify-content: space-between; align-items: center; }
        .smallBtn { padding: 10px 12px; border-radius: 12px; font-size: 12px; }

        .skeletonGrid { width: 100%; max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
        .skCard { border-radius: 18px; border: 1px solid rgba(245, 244, 244, 0.1); background: rgba(255, 255, 255, 0.02); height: 220px; position: relative; overflow: hidden; }
        .skCard:before {
          content: '';
          position: absolute; inset: 0;
          transform: translateX(-40%);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0) 100%);
          animation: shimmer 1.2s infinite;
        }
        @keyframes shimmer { 0% { transform: translateX(-40%); } 100% { transform: translateX(140%); } }

        .emptyCard { width: 100%; max-width: 980px; margin: 0 auto; border-radius: 18px; border: 1px solid rgba(245, 244, 244, 0.14); background: rgba(255,255,255,0.02); padding: 18px; display: grid; gap: 10px; text-align: center; }
        .emptyActions { display: inline-flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 6px; }

        .support { margin-top: var(--dl-layout-space-fiveunits); }
        .ctaCard { width: 100%; max-width: 980px; margin: 0 auto; border-radius: 18px; border: 1px solid rgba(245, 244, 244, 0.14); background: rgba(255,255,255,0.02); padding: 22px 18px; text-align: center; display: grid; gap: 10px; }
        .ctaCard.subtle { border-color: rgba(245, 244, 244, 0.14); background: rgba(255,255,255,0.02); }
        .ctaCard h3 { margin: 0; font-size: 18px; }
        .ctaCard p { margin: 0; line-height: 1.7; }

        @media (max-width: 1100px) {
          .grid, .skeletonGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .controls { grid-template-columns: 1fr; }
          .formatWrap { justify-items: start; }
          .rightLinks { justify-content: start; }
          .meterRow { grid-template-columns: 1fr; }
        }
        @media (max-width: 760px) {
          .grid, .skeletonGrid { grid-template-columns: 1fr; }
          .inputRow { grid-template-columns: 1fr; }
          .btn { width: 100%; }
        }
      `}</style>
    </>
  )
}