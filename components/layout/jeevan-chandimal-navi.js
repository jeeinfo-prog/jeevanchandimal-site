// components/layout/jeevan-chandimal-navi.js
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { readCart } from '../../lib/cart'

const NAV = {
  work: [
    { href: '/work-film', label: 'Film' },
    { href: '/work-audio', label: 'Audio' },
    { href: '/work-animation', label: 'Animation' },
    { href: '/work-photography', label: 'Photography' },
  ],
  services: [
    { href: '/services-film-production', label: 'Film Production' },
    { href: '/services-audio', label: 'Audio Production' },
    { href: '/services-animation', label: 'Animation & Motion' },
    { href: '/services-photography', label: 'Photography' },
  ],
}

function normalizeTier(v) {
  const x = String(v || '').trim().toLowerCase()
  if (x === 'basic') return 'BASIC'
  if (x === 'pro') return 'PRO'
  if (x === 'elite') return 'ELITE'
  // legacy values sometimes come as monthly/yearly/lifetime — don’t show those as badge
  return ''
}

export default function JeevanChandimalNavi(props) {
  const router = useRouter()

  const [mobileOpen, setMobileOpen] = useState(false)

  const [deskWorkOpen, setDeskWorkOpen] = useState(false)
  const [deskServicesOpen, setDeskServicesOpen] = useState(false)
  const [deskMembershipOpen, setDeskMembershipOpen] = useState(false)

  const [mWorkOpen, setMWorkOpen] = useState(false)
  const [mServicesOpen, setMServicesOpen] = useState(false)
  const [mMembershipOpen, setMMembershipOpen] = useState(false)

  const [memberTier, setMemberTier] = useState('')
  const [memberRemaining, setMemberRemaining] = useState(null) // ✅ countdown number
  const [userEmail, setUserEmail] = useState('')

  const [cartNum, setCartNum] = useState(0)

  const closeTimers = useRef({ work: null, services: null, membership: null })

  const closeAll = () => {
    setMobileOpen(false)
    setDeskWorkOpen(false)
    setDeskServicesOpen(false)
    setDeskMembershipOpen(false)
    setMWorkOpen(false)
    setMServicesOpen(false)
    setMMembershipOpen(false)
  }

  const cancelCloseTimer = (key) => {
    const t = closeTimers.current?.[key]
    if (t) clearTimeout(t)
    closeTimers.current[key] = null
  }

  const scheduleClose = (key) => {
    cancelCloseTimer(key)
    closeTimers.current[key] = setTimeout(() => {
      if (key === 'work') setDeskWorkOpen(false)
      if (key === 'services') setDeskServicesOpen(false)
      if (key === 'membership') setDeskMembershipOpen(false)
    }, 140)
  }

  useEffect(() => {
    if (!router?.events) return
    const onRoute = () => closeAll()
    router.events.on('routeChangeStart', onRoute)
    return () => router.events.off('routeChangeStart', onRoute)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.events])

  // ✅ Cart badge (no interval)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const getCount = () => {
      try {
        const cart = readCart()
        const count = Array.isArray(cart?.items)
          ? cart.items.reduce((n, it) => n + (Number(it.qty) || 1), 0)
          : 0
        return count
      } catch {
        return 0
      }
    }

    const refresh = () => setCartNum(getCount())
    refresh()

    const onStorage = (e) => {
      if (e?.key === 'jc_cart_v1') refresh()
      if (e?.key && String(e.key).includes('cart')) refresh()
      if (e?.key && String(e.key).includes('jc_cart')) refresh()
    }

    const onCustom = () => refresh()

    window.addEventListener('storage', onStorage)
    window.addEventListener('jc_cart_updated', onCustom)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('jc_cart_updated', onCustom)
    }
  }, [])

  // ✅ Membership status refresh (NO manual refresh needed) + ✅ countdown
  useEffect(() => {
    if (typeof window === 'undefined') return

    const email = window.localStorage.getItem('user_email') || ''
    setUserEmail(email)

    const cachedTier = normalizeTier(window.localStorage.getItem('member_tier') || '')
    if (cachedTier) setMemberTier(cachedTier)

    // ✅ try load cached remaining
    const cachedRemRaw = window.localStorage.getItem('member_remaining')
    if (cachedRemRaw !== null && cachedRemRaw !== undefined && cachedRemRaw !== '') {
      const n = Number(cachedRemRaw)
      if (Number.isFinite(n)) setMemberRemaining(n)
    }

    async function refreshMemberStatus() {
      const e = (window.localStorage.getItem('user_email') || '').trim().toLowerCase()
      if (!e) {
        setMemberTier('')
        setMemberRemaining(null)
        window.localStorage.removeItem('member_tier')
        window.localStorage.removeItem('member_remaining')
        return
      }

      try {
        // bust cache (prevents 304 UI-staleness)
        const url = `/api/member/status?email=${encodeURIComponent(e)}&t=${Date.now()}`
        const r = await fetch(url, { cache: 'no-store' })
        const d = await r.json().catch(() => ({}))

        // accept multiple shapes
        const isMember = !!(d?.member || d?.ok || d?.active)
        if (!isMember) {
          setMemberTier('')
          setMemberRemaining(null)
          window.localStorage.removeItem('member_tier')
          window.localStorage.removeItem('member_remaining')
          return
        }

        const tierRaw = d?.tier || d?.plan || d?.membership?.tier || d?.membership?.plan
        const tier = normalizeTier(tierRaw)

        if (tier) {
          setMemberTier(tier)
          window.localStorage.setItem('member_tier', tier)

          // ✅ countdown from API
          const remaining = Number(d?.remaining)
          if (Number.isFinite(remaining)) {
            setMemberRemaining(remaining)
            window.localStorage.setItem('member_remaining', String(remaining))
          } else {
            setMemberRemaining(null)
            window.localStorage.removeItem('member_remaining')
          }
        } else {
          setMemberTier('')
          setMemberRemaining(null)
          window.localStorage.removeItem('member_tier')
          window.localStorage.removeItem('member_remaining')
        }
      } catch {
        // keep cached badge if fetch fails
      }
    }

    // initial + route changes
    refreshMemberStatus()

    // refresh when tab becomes active
    const onFocus = () => refreshMemberStatus()
    const onVis = () => {
      if (document.visibilityState === 'visible') refreshMemberStatus()
    }
    // refresh when members page updates membership
    const onMemberUpdated = () => refreshMemberStatus()

    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('jc_member_updated', onMemberUpdated)

    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('jc_member_updated', onMemberUpdated)
    }
  }, [router.asPath])

  const logout = () => {
    try {
      window.localStorage.removeItem('user_email')
      window.localStorage.removeItem('member_tier')
      window.localStorage.removeItem('member_remaining')
    } catch {}
    setUserEmail('')
    setMemberTier('')
    setMemberRemaining(null)
    closeAll()
    router.push('/login')
  }

  const isActive = (href) => {
    if (!href) return false
    if (href === '/work') return router.pathname.startsWith('/work')
    if (href === '/services') return router.pathname.startsWith('/services')
    if (href === '/store') return router.pathname.startsWith('/store')
    if (href === '/cart') return router.pathname.startsWith('/cart')
    if (href === '/members') return router.pathname.startsWith('/members')
    if (href === '/memberships') return router.pathname.startsWith('/memberships')
    return router.pathname === href
  }

  const activeClass = (href) => (isActive(href) ? 'isActive' : '')
  const activeItemClass = (href) => (isActive(href) ? 'isActiveItem' : '')

  const onDropdownKey = (which) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (which === 'work') {
        setDeskWorkOpen((v) => {
          const next = !v
          if (next) {
            setDeskServicesOpen(false)
            setDeskMembershipOpen(false)
          }
          return next
        })
      } else if (which === 'services') {
        setDeskServicesOpen((v) => {
          const next = !v
          if (next) {
            setDeskWorkOpen(false)
            setDeskMembershipOpen(false)
          }
          return next
        })
      } else {
        setDeskMembershipOpen((v) => {
          const next = !v
          if (next) {
            setDeskWorkOpen(false)
            setDeskServicesOpen(false)
          }
          return next
        })
      }
    }
    if (e.key === 'Escape') {
      setDeskWorkOpen(false)
      setDeskServicesOpen(false)
      setDeskMembershipOpen(false)
    }
  }

  useEffect(() => {
    const onDoc = (e) => {
      const el = e.target
      if (!(el instanceof Element)) return
      if (el.closest?.('.navShell')) return
      setDeskWorkOpen(false)
      setDeskServicesOpen(false)
      setDeskMembershipOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const workItems = useMemo(() => NAV.work, [])
  const serviceItems = useMemo(() => NAV.services, [])

  return (
    <>
      <header className={`navWrap ${props.rootClassName || ''}`}>
        <div className="navShell">
          {/* left */}
          <Link href="/" legacyBehavior>
            <a className="brand" aria-label="Home">
              <img alt={props.logoAlt} src={props.logoSrc} className="brandLogo" />
            </a>
          </Link>

          {/* center desktop */}
          <nav className="navLinks" aria-label="Primary">
            <Link href="/" legacyBehavior>
              <a className={`navLink ${activeClass('/')}`}>Home</a>
            </Link>

            {/* Work dropdown */}
            <div
              className="drop"
              onMouseEnter={() => {
                cancelCloseTimer('work')
                setDeskWorkOpen(true)
                setDeskServicesOpen(false)
                setDeskMembershipOpen(false)
              }}
              onMouseLeave={() => scheduleClose('work')}
            >
              <div
                className={`dropToggle ${activeClass('/work')}`}
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded={deskWorkOpen ? 'true' : 'false'}
                onClick={() => {
                  setDeskWorkOpen((v) => !v)
                  setDeskServicesOpen(false)
                  setDeskMembershipOpen(false)
                }}
                onKeyDown={onDropdownKey('work')}
              >
                <Link href="/work" legacyBehavior>
                  <a className="dropLabel">Work</a>
                </Link>
                <span className={`chev ${deskWorkOpen ? 'open' : ''}`} aria-hidden="true">
                  ▾
                </span>
              </div>

              <div
                className={`menu ${deskWorkOpen ? 'show' : ''}`}
                role="menu"
                onMouseEnter={() => cancelCloseTimer('work')}
                onMouseLeave={() => scheduleClose('work')}
              >
                {workItems.map((it) => (
                  <Link href={it.href} key={it.href} legacyBehavior>
                    <a className={`menuItem ${activeItemClass(it.href)}`} role="menuitem">
                      {it.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            {/* Services dropdown */}
            <div
              className="drop"
              onMouseEnter={() => {
                cancelCloseTimer('services')
                setDeskServicesOpen(true)
                setDeskWorkOpen(false)
                setDeskMembershipOpen(false)
              }}
              onMouseLeave={() => scheduleClose('services')}
            >
              <div
                className={`dropToggle ${activeClass('/services')}`}
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded={deskServicesOpen ? 'true' : 'false'}
                onClick={() => {
                  setDeskServicesOpen((v) => !v)
                  setDeskWorkOpen(false)
                  setDeskMembershipOpen(false)
                }}
                onKeyDown={onDropdownKey('services')}
              >
                <Link href="/services" legacyBehavior>
                  <a className="dropLabel">Services</a>
                </Link>
                <span className={`chev ${deskServicesOpen ? 'open' : ''}`} aria-hidden="true">
                  ▾
                </span>
              </div>

              <div
                className={`menu ${deskServicesOpen ? 'show' : ''}`}
                role="menu"
                onMouseEnter={() => cancelCloseTimer('services')}
                onMouseLeave={() => scheduleClose('services')}
              >
                {serviceItems.map((it) => (
                  <Link href={it.href} key={it.href} legacyBehavior>
                    <a className={`menuItem ${activeItemClass(it.href)}`} role="menuitem">
                      {it.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/store" legacyBehavior>
              <a className={`navLink ${activeClass('/store')}`}>Store</a>
            </Link>

            {/* ✅ Membership dropdown (Option C) */}
            <div
              className="drop"
              onMouseEnter={() => {
                cancelCloseTimer('membership')
                setDeskMembershipOpen(true)
                setDeskWorkOpen(false)
                setDeskServicesOpen(false)
              }}
              onMouseLeave={() => scheduleClose('membership')}
            >
              <div
                className={`dropToggle ${activeClass('/memberships') || activeClass('/members')}`}
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded={deskMembershipOpen ? 'true' : 'false'}
                onClick={() => {
                  setDeskMembershipOpen((v) => !v)
                  setDeskWorkOpen(false)
                  setDeskServicesOpen(false)
                }}
                onKeyDown={onDropdownKey('membership')}
              >
                <Link href="/memberships" legacyBehavior>
                  <a className="dropLabel">Membership</a>
                </Link>
                <span className={`chev ${deskMembershipOpen ? 'open' : ''}`} aria-hidden="true">
                  ▾
                </span>
              </div>

              <div
                className={`menu ${deskMembershipOpen ? 'show' : ''}`}
                role="menu"
                onMouseEnter={() => cancelCloseTimer('membership')}
                onMouseLeave={() => scheduleClose('membership')}
              >
                <Link href="/memberships" legacyBehavior>
                  <a className={`menuItem ${activeItemClass('/memberships')}`} role="menuitem">
                    Membership Plans
                  </a>
                </Link>

                {userEmail ? (
                  <Link href="/members" legacyBehavior>
                    <a className={`menuItem ${activeItemClass('/members')}`} role="menuitem">
                      Member Downloads
                    </a>
                  </Link>
                ) : null}
              </div>
            </div>

            <Link href="/about" legacyBehavior>
              <a className={`navLink ${activeClass('/about')}`}>About</a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className={`navLink ${activeClass('/contact')}`}>Contact</a>
            </Link>
          </nav>

          {/* right */}
          <div className="navRight">
            <div className="rightGroup">
              <Link href="/cart" legacyBehavior>
                <a className={`pill pillLink ${activeClass('/cart')}`} aria-label="Cart">
                  <span className="pillText">Cart</span>
                  <span className="pillBadge" aria-label={`Cart items: ${cartNum}`}>
                    {cartNum}
                  </span>
                </a>
              </Link>

              {/* ✅ Tier badge + countdown */}
              {memberTier ? (
                <span className="pill pillAccent">
                  {memberTier}
                  {memberRemaining !== null ? (
                    <span
                      className="pillBadge"
                      aria-label={`Remaining downloads: ${memberRemaining}`}
                    >
                      {memberRemaining}
                    </span>
                  ) : null}
                </span>
              ) : null}

              {userEmail ? (
                <>
                  <span className="pill pillStatic" title={userEmail}>
                    {userEmail}
                  </span>
                  <button type="button" className="pill pillBtn" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" legacyBehavior>
                  <a className="pill pillLink" aria-label="Login">
                    Login
                  </a>
                </Link>
              )}
            </div>

            <button
              type="button"
              className="burger"
              aria-label="Open menu"
              onClick={() => {
                setMobileOpen(true)
                setMWorkOpen(false)
                setMServicesOpen(false)
                setMMembershipOpen(false)
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* MOBILE OVERLAY */}
        <div className={`mOverlay ${mobileOpen ? 'show' : ''}`} role="dialog" aria-modal="true">
          <div className="mPanel">
            <div className="mTop">
              <Link href="/" legacyBehavior>
                <a className="mBrand" onClick={closeAll} aria-label="Home">
                  <img alt={props.logoAlt} src={props.logoSrc} className="mLogo" />
                </a>
              </Link>

              <button type="button" className="mClose" onClick={closeAll} aria-label="Close menu">
                ✕
              </button>
            </div>

            <nav className="mLinks">
              <Link href="/" legacyBehavior>
                <a className={`mLink ${activeClass('/')}`} onClick={closeAll}>
                  Home
                </a>
              </Link>

              <Link href="/cart" legacyBehavior>
                <a className={`mLink ${activeClass('/cart')}`} onClick={closeAll}>
                  <span>Cart</span>
                  <span className="mCartBadge">{cartNum}</span>
                </a>
              </Link>

              <Link href="/work" legacyBehavior>
                <a
                  className={`mLink mDrop ${activeClass('/work')}`}
                  onClick={(e) => {
                    if (!mWorkOpen) {
                      e.preventDefault()
                      setMWorkOpen(true)
                      setMServicesOpen(false)
                      setMMembershipOpen(false)
                      return
                    }
                    closeAll()
                  }}
                >
                  <span>Work</span>
                  <span className={`mChev ${mWorkOpen ? 'open' : ''}`} aria-hidden="true">
                    ▾
                  </span>
                </a>
              </Link>
              {mWorkOpen && (
                <div className="mSub">
                  {workItems.map((it) => (
                    <Link href={it.href} key={it.href} legacyBehavior>
                      <a className={`mSubLink ${activeItemClass(it.href)}`} onClick={closeAll}>
                        {it.label}
                      </a>
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/services" legacyBehavior>
                <a
                  className={`mLink mDrop ${activeClass('/services')}`}
                  onClick={(e) => {
                    if (!mServicesOpen) {
                      e.preventDefault()
                      setMServicesOpen(true)
                      setMWorkOpen(false)
                      setMMembershipOpen(false)
                      return
                    }
                    closeAll()
                  }}
                >
                  <span>Services</span>
                  <span className={`mChev ${mServicesOpen ? 'open' : ''}`} aria-hidden="true">
                    ▾
                  </span>
                </a>
              </Link>
              {mServicesOpen && (
                <div className="mSub">
                  {serviceItems.map((it) => (
                    <Link href={it.href} key={it.href} legacyBehavior>
                      <a className={`mSubLink ${activeItemClass(it.href)}`} onClick={closeAll}>
                        {it.label}
                      </a>
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/store" legacyBehavior>
                <a className={`mLink ${activeClass('/store')}`} onClick={closeAll}>
                  Store
                </a>
              </Link>

              {/* ✅ Membership mobile dropdown */}
              <Link href="/memberships" legacyBehavior>
                <a
                  className={`mLink mDrop ${activeClass('/memberships') || activeClass('/members')}`}
                  onClick={(e) => {
                    if (!mMembershipOpen) {
                      e.preventDefault()
                      setMMembershipOpen(true)
                      setMWorkOpen(false)
                      setMServicesOpen(false)
                      return
                    }
                    closeAll()
                  }}
                >
                  <span>Membership</span>
                  <span className={`mChev ${mMembershipOpen ? 'open' : ''}`} aria-hidden="true">
                    ▾
                  </span>
                </a>
              </Link>
              {mMembershipOpen && (
                <div className="mSub">
                  <Link href="/memberships" legacyBehavior>
                    <a className={`mSubLink ${activeItemClass('/memberships')}`} onClick={closeAll}>
                      Membership Plans
                    </a>
                  </Link>

                  {userEmail ? (
                    <Link href="/members" legacyBehavior>
                      <a className={`mSubLink ${activeItemClass('/members')}`} onClick={closeAll}>
                        Member Downloads
                      </a>
                    </Link>
                  ) : null}
                </div>
              )}

              <Link href="/about" legacyBehavior>
                <a className={`mLink ${activeClass('/about')}`} onClick={closeAll}>
                  About
                </a>
              </Link>
              <Link href="/contact" legacyBehavior>
                <a className={`mLink ${activeClass('/contact')}`} onClick={closeAll}>
                  Contact
                </a>
              </Link>

              {memberTier ? (
                <div className="mBadge">
                  {memberTier}
                  {memberRemaining !== null ? ` • ${memberRemaining}` : ''}
                </div>
              ) : null}

              {userEmail ? (
                <button type="button" className="mLogout" onClick={logout}>
                  Logout
                </button>
              ) : (
                <Link href="/login" legacyBehavior>
                  <a className="mLink" onClick={closeAll}>
                    Login
                  </a>
                </Link>
              )}
            </nav>
          </div>

          <button type="button" className="mBackdrop" aria-label="Close menu" onClick={closeAll} />
        </div>
      </header>

      <style jsx>{`
        :global(:root) {
          /* ✅ Global fixed-nav height used by pages to offset content */
          --jc-nav-h: 70px;
        }

        @media (max-width: 520px) {
          :global(:root) {
            /* ✅ Slightly taller on small screens (spacing + wrapping safe) */
            --jc-nav-h: 78px;
          }
        }

        .navWrap {
          position: fixed;
          top: 0;
          z-index: 9999;
          width: 100%;
          background: rgba(34, 34, 34, 0.72);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(245, 244, 244, 0.08);
        }

        .navShell {
          max-width: var(--dl-layout-size-maxwidth);
          margin: 0 auto;
          padding: 12px 18px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 14px;
          position: relative;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          text-decoration: none !important;
        }
        .brandLogo {
          height: 44px;
          width: auto;
          display: block;
        }

        .navLinks {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 18px;
          min-width: 0;
        }

        .navLink,
        .dropLabel {
          height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          color: #f5f4f4;
          text-decoration: none !important;
          font-size: 14px;
          letter-spacing: 0.2px;
          opacity: 0.92;
          transition: opacity 0.15s, background 0.15s, color 0.15s;
          display: inline-flex;
          align-items: center;
          box-sizing: border-box;
        }

        .navLink:hover,
        .dropLabel:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
          color: #25c3e2 !important;
        }

        .isActive {
          height: 32px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.24), rgba(37, 195, 226, 0.1));
          border: 1px solid rgba(37, 195, 226, 0.22);
          color: #25c3e2 !important;
          opacity: 1;
          font-weight: 700;
          box-shadow: 0 8px 18px rgba(37, 195, 226, 0.08);
        }

        .drop {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .drop::after {
          content: '';
          position: absolute;
          left: 0;
          top: 100%;
          height: 14px;
          width: 100%;
        }

        .dropToggle {
          height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          outline: none;
        }

        .dropToggle:focus-visible {
          box-shadow: 0 0 0 2px rgba(37, 195, 226, 0.35);
        }

        .chev {
          width: 14px;
          height: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(245, 244, 244, 0.75);
          font-size: 12px;
          transform: rotate(-90deg);
          transition: transform 0.16s ease;
          margin-left: 2px;
        }
        .chev.open {
          transform: rotate(0deg);
        }

        .menu {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          min-width: 220px;
          background: rgba(18, 18, 18, 0.92);
          border: 1px solid rgba(245, 244, 244, 0.1);
          border-radius: 14px;
          padding: 8px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
          display: none;
          flex-direction: column;
          gap: 2px;
          animation: dropIn 160ms ease forwards;
          z-index: 99999;
          pointer-events: auto;
        }
        .menu.show {
          display: flex;
        }
        @keyframes dropIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .menuItem {
          color: #f5f4f4;
          text-decoration: none !important;
          font-size: 14px;
          padding: 10px 10px;
          border-radius: 10px;
          opacity: 0.92;
          transition: background 0.15s, opacity 0.15s, color 0.15s;
        }
        .menuItem:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
          color: #25c3e2 !important;
        }
        .menuItem.isActiveItem {
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.2), rgba(37, 195, 226, 0.08));
          border: 1px solid rgba(37, 195, 226, 0.18);
          color: #25c3e2 !important;
          opacity: 1;
          font-weight: 700;
        }

        .navRight {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .rightGroup {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          flex-wrap: nowrap;
          min-width: 0;
        }

        .pill {
          height: 32px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          border-radius: 999px;
          line-height: 1;
          font-size: 12px;
          letter-spacing: 0.2px;
          box-sizing: border-box;
          white-space: nowrap;
        }

        .pillLink {
          text-decoration: none !important;
          color: #f5f4f4;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(255, 255, 255, 0.03);
          opacity: 0.92;
          transition: opacity 0.15s, background 0.15s;
        }
        .pillLink:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
        }

        .pillBtn {
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(255, 255, 255, 0.03);
          color: #f5f4f4;
          cursor: pointer;
          opacity: 0.92;
          transition: opacity 0.15s, background 0.15s;
        }
        .pillBtn:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
        }

        .pillStatic {
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.03);
          color: #f5f4f4;
          opacity: 0.88;
          max-width: 220px;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pillAccent {
          border: 1px solid rgba(37, 195, 226, 0.55);
          background: rgba(37, 195, 226, 0.12);
          color: #25c3e2;
          font-weight: 900;
          letter-spacing: 1px;
          font-size: 11px;
        }

        .pillBadge {
          min-width: 16px;
          height: 16px;
          padding: 0 6px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
          border: 1px solid rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.14);
          color: #25c3e2;
        }

        @media (max-width: 520px) {
          .pillStatic {
            display: none;
          }
        }

        .burger {
          width: 44px;
          height: 42px;
          border: 1px solid rgba(245, 244, 244, 0.16);
          background: rgba(0, 0, 0, 0.18);
          border-radius: 14px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
        }
        .burger span {
          width: 18px;
          height: 2px;
          background: rgba(245, 244, 244, 0.9);
          border-radius: 2px;
        }

        /* mobile */
        .mOverlay {
          display: none;
        }
        .mOverlay.show {
          display: block;
          position: fixed;
          inset: 0;
          z-index: 10000;
        }
        .mBackdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.62);
          border: 0;
          padding: 0;
          margin: 0;
          cursor: pointer;
          z-index: 0;
        }
        .mPanel {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: min(420px, 92vw);
          background: #151515;
          border-left: 1px solid rgba(245, 244, 244, 0.1);
          box-shadow: -18px 0 40px rgba(0, 0, 0, 0.45);
          padding: 18px;
          display: flex;
          flex-direction: column;
          animation: slideIn 180ms ease forwards;
          z-index: 1;
        }
        @keyframes slideIn {
          from {
            transform: translateX(12px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .mTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .mBrand {
          display: inline-flex;
          align-items: center;
          text-decoration: none !important;
        }
        .mLogo {
          height: 40px;
        }
        .mClose {
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.04);
          color: #f5f4f4;
          width: 44px;
          height: 42px;
          border-radius: 14px;
          cursor: pointer;
          font-size: 18px;
        }

        .mLinks {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mLink {
          color: #f5f4f4;
          text-decoration: none !important;
          padding: 12px 12px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(245, 244, 244, 0.08);
          opacity: 0.92;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mLink:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.06);
        }

        .mChev {
          width: 14px;
          height: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transform: rotate(-90deg);
          transition: transform 0.16s ease;
        }
        .mChev.open {
          transform: rotate(0deg);
        }

        .mCartBadge {
          min-width: 22px;
          height: 22px;
          padding: 0 7px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          border: 1px solid rgba(37, 195, 226, 0.35);
          background: rgba(37, 195, 226, 0.14);
          color: #25c3e2;
        }

        .mSub {
          margin-top: -4px;
          margin-left: 10px;
          padding-left: 10px;
          border-left: 2px solid rgba(245, 244, 244, 0.12);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mSubLink {
          color: rgba(245, 244, 244, 0.92);
          text-decoration: none !important;
          padding: 10px 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(245, 244, 244, 0.06);
        }
        .mSubLink:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .mBadge {
          margin-top: 12px;
          align-self: flex-start;
          font-size: 11px;
          padding: 6px 12px;
          border: 1px solid rgba(37, 195, 226, 0.55);
          border-radius: 999px;
          letter-spacing: 1px;
          color: #25c3e2;
          font-weight: 900;
        }

        .mLogout {
          margin-top: 8px;
          border: 1px solid rgba(245, 244, 244, 0.14);
          background: rgba(255, 255, 255, 0.04);
          color: #f5f4f4;
          border-radius: 14px;
          padding: 12px 12px;
          cursor: pointer;
          text-align: left;
          opacity: 0.92;
        }
        .mLogout:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.07);
        }

        @media (min-width: 900px) {
          .navLinks {
            display: flex;
          }
          .burger {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

JeevanChandimalNavi.defaultProps = {
  rootClassName: '',
  logoAlt: 'Business Logo',
  logoSrc: '/JC/jc%20logo%20web%2004-1500h.png',
}

JeevanChandimalNavi.propTypes = {
  rootClassName: PropTypes.string,
  logoAlt: PropTypes.string,
  logoSrc: PropTypes.string,
}