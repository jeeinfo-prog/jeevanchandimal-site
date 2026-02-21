// components/jeevan-chandimal-navi.js
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

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

export default function JeevanChandimalNavi(props) {
  const router = useRouter()

  const [mobileOpen, setMobileOpen] = useState(false)

  const [deskWorkOpen, setDeskWorkOpen] = useState(false)
  const [deskServicesOpen, setDeskServicesOpen] = useState(false)

  const [mWorkOpen, setMWorkOpen] = useState(false)
  const [mServicesOpen, setMServicesOpen] = useState(false)

  const [memberPlan, setMemberPlan] = useState(null)

  const closeTimers = useRef({ work: null, services: null })

  const closeAll = () => {
    setMobileOpen(false)
    setDeskWorkOpen(false)
    setDeskServicesOpen(false)
    setMWorkOpen(false)
    setMServicesOpen(false)
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
    }, 140) // ✅ small delay removes flicker
  }

  useEffect(() => {
    if (!router?.events) return
    const onRoute = () => closeAll()
    router.events.on('routeChangeStart', onRoute)
    return () => router.events.off('routeChangeStart', onRoute)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.events])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const email = window.localStorage.getItem('user_email')
    const cachedPlan = window.localStorage.getItem('member_plan')
    if (cachedPlan) setMemberPlan(cachedPlan)

    if (!email) return
    fetch(`/api/member/status?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.member) {
          const plan = d?.plan || cachedPlan || 'member'
          setMemberPlan(plan)
          window.localStorage.setItem('member_plan', plan)
        } else {
          window.localStorage.removeItem('member_plan')
          setMemberPlan(null)
        }
      })
      .catch(() => {})
  }, [])

  const isActive = (href) => {
    if (router.pathname === href) return true
    if (href === '/work' && router.pathname.startsWith('/work')) return true
    if (href === '/services' && router.pathname.startsWith('/services')) return true
    return false
  }

  const activeClass = (href) => (isActive(href) ? 'isActive' : '')

  const onDropdownKey = (which) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (which === 'work') {
        setDeskWorkOpen((v) => {
          const next = !v
          if (next) setDeskServicesOpen(false)
          return next
        })
      } else {
        setDeskServicesOpen((v) => {
          const next = !v
          if (next) setDeskWorkOpen(false)
          return next
        })
      }
    }
    if (e.key === 'Escape') {
      setDeskWorkOpen(false)
      setDeskServicesOpen(false)
    }
  }

  // close desktop dropdowns if click outside
  useEffect(() => {
    const onDoc = (e) => {
      const el = e.target
      if (!(el instanceof Element)) return
      if (el.closest?.('.navShell')) return
      setDeskWorkOpen(false)
      setDeskServicesOpen(false)
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
          <Link href="/">
            <a className="brand" aria-label="Home">
              <img alt={props.logoAlt} src={props.logoSrc} className="brandLogo" />
            </a>
          </Link>

          {/* center desktop */}
          <nav className="navLinks" aria-label="Primary">
            <Link href="/">
              <a className={`navLink ${activeClass('/')}`}>Home</a>
            </Link>

            {/* Work dropdown */}
            <div
              className="drop"
              onMouseEnter={() => {
                cancelCloseTimer('work')
                setDeskWorkOpen(true)
                setDeskServicesOpen(false)
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
                }}
                onKeyDown={onDropdownKey('work')}
              >
                <Link href="/work">
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
                  <Link href={it.href} key={it.href}>
                    <a className="menuItem" role="menuitem">
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
                }}
                onKeyDown={onDropdownKey('services')}
              >
                <Link href="/services">
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
                  <Link href={it.href} key={it.href}>
                    <a className="menuItem" role="menuitem">
                      {it.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/store">
              <a className={`navLink ${activeClass('/store')}`}>Store</a>
            </Link>
            <Link href="/memberships">
              <a className={`navLink ${activeClass('/memberships')}`}>Membership</a>
            </Link>
            <Link href="/about">
              <a className={`navLink ${activeClass('/about')}`}>About</a>
            </Link>
            <Link href="/contact">
              <a className={`navLink ${activeClass('/contact')}`}>Contact</a>
            </Link>
          </nav>

          {/* right */}
          <div className="navRight">
            {memberPlan && <span className="badge">{String(memberPlan).toUpperCase()}</span>}

            <Link href="/login">
              <a className="iconBtn" aria-label="Login">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 21v-1c0-3.313 2.687-6 6-6h4c3.313 0 6 2.687 6 6v1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 11c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </Link>

            <button
              type="button"
              className="burger"
              aria-label="Open menu"
              onClick={() => {
                setMobileOpen(true)
                setMWorkOpen(false)
                setMServicesOpen(false)
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
              <Link href="/">
                <a className="mBrand" onClick={closeAll} aria-label="Home">
                  <img alt={props.logoAlt} src={props.logoSrc} className="mLogo" />
                </a>
              </Link>

              <button type="button" className="mClose" onClick={closeAll} aria-label="Close menu">
                ✕
              </button>
            </div>

            <nav className="mLinks">
              <Link href="/"><a className={`mLink ${activeClass('/')}`} onClick={closeAll}>Home</a></Link>

              {/* Work: first tap opens, second tap navigates */}
              <Link href="/work">
                <a
                  className={`mLink mDrop ${activeClass('/work')}`}
                  onClick={(e) => {
                    if (!mWorkOpen) {
                      e.preventDefault()
                      setMWorkOpen(true)
                      setMServicesOpen(false)
                      return
                    }
                    closeAll()
                  }}
                >
                  <span>Work</span>
                  <span className={`mChev ${mWorkOpen ? 'open' : ''}`} aria-hidden="true">▾</span>
                </a>
              </Link>
              {mWorkOpen && (
                <div className="mSub">
                  {workItems.map((it) => (
                    <Link href={it.href} key={it.href}>
                      <a className="mSubLink" onClick={closeAll}>{it.label}</a>
                    </Link>
                  ))}
                </div>
              )}

              {/* Services: first tap opens, second tap navigates */}
              <Link href="/services">
                <a
                  className={`mLink mDrop ${activeClass('/services')}`}
                  onClick={(e) => {
                    if (!mServicesOpen) {
                      e.preventDefault()
                      setMServicesOpen(true)
                      setMWorkOpen(false)
                      return
                    }
                    closeAll()
                  }}
                >
                  <span>Services</span>
                  <span className={`mChev ${mServicesOpen ? 'open' : ''}`} aria-hidden="true">▾</span>
                </a>
              </Link>
              {mServicesOpen && (
                <div className="mSub">
                  {serviceItems.map((it) => (
                    <Link href={it.href} key={it.href}>
                      <a className="mSubLink" onClick={closeAll}>{it.label}</a>
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/store"><a className={`mLink ${activeClass('/store')}`} onClick={closeAll}>Store</a></Link>
              <Link href="/memberships"><a className={`mLink ${activeClass('/memberships')}`} onClick={closeAll}>Membership</a></Link>
              <Link href="/about"><a className={`mLink ${activeClass('/about')}`} onClick={closeAll}>About</a></Link>
              <Link href="/contact"><a className={`mLink ${activeClass('/contact')}`} onClick={closeAll}>Contact</a></Link>

              {memberPlan && <div className="mBadge">{String(memberPlan).toUpperCase()}</div>}
            </nav>
          </div>

          {/* click outside to close */}
          <button type="button" className="mBackdrop" aria-label="Close menu" onClick={closeAll} />
        </div>
      </header>

      <style jsx>{`
        /* ========= THEME ========= */
        .navWrap {
          position: sticky;
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
          display: flex;
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

        /* ========= DESKTOP LINKS ========= */
        .navLinks {
          flex: 1;
          display: none;
          align-items: center;
          justify-content: center;
          gap: 18px;
        }

        .navLink,
        .dropLabel {
          color: #f5f4f4;
          text-decoration: none !important;
          font-size: 14px;
          letter-spacing: 0.2px;
          opacity: 0.92;
          padding: 10px 8px;
          border-radius: 10px;
          transition: opacity 0.15s, background 0.15s;
          display: inline-flex;
          align-items: center;
        }

        .navLink:hover,
        .dropLabel:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
        }

        .isActive {
          color: #25c3e2 !important;
          opacity: 1;
          background: rgba(37, 195, 226, 0.12);
          font-weight: 700;
        }

        /* ========= DROPDOWN ========= */
        .drop {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        /* ✅ hover bridge prevents flicker when moving into menu */
        .drop::after {
          content: '';
          position: absolute;
          left: 0;
          top: 100%;
          height: 14px;
          width: 100%;
        }

        .dropToggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0;
          border-radius: 12px;
          outline: none;
        }

        .dropToggle:focus-visible {
          box-shadow: 0 0 0 2px rgba(37, 195, 226, 0.35);
        }

        .chev {
          color: rgba(245, 244, 244, 0.75);
          font-size: 12px;
          transform: rotate(0deg);
          transition: transform 0.16s ease;
          padding-right: 8px;
        }

        .chev.open {
          transform: rotate(180deg);
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
          z-index: 99999;          /* ✅ clickable on top */
          pointer-events: auto;    /* ✅ clickable */
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
          transition: background 0.15s, opacity 0.15s;
        }

        .menuItem:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
        }

        /* ========= RIGHT ========= */
        .navRight {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .badge {
          font-size: 11px;
          padding: 4px 10px;
          border: 1px solid #25c3e2;
          border-radius: 999px;
          letter-spacing: 1px;
          color: #25c3e2;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
        }

        .iconBtn {
          color: #f5f4f4;
          opacity: 0.85;
          border-radius: 12px;
          padding: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none !important;
          transition: opacity 0.15s, background 0.15s;
        }

        .iconBtn:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
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

        /* ========= MOBILE ========= */
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
          z-index: 0; /* ✅ behind panel */
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
          z-index: 1; /* ✅ above backdrop */
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

        .mLink.isActive {
          color: #25c3e2 !important;
          background: rgba(37, 195, 226, 0.12);
          border-color: rgba(37, 195, 226, 0.18);
          opacity: 1;
          font-weight: 700;
        }

        .mChev {
          opacity: 0.8;
          transform: rotate(0deg);
          transition: transform 0.16s ease;
        }

        .mChev.open {
          transform: rotate(180deg);
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
          font-weight: 800;
        }

        /* ========= RESPONSIVE ========= */
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