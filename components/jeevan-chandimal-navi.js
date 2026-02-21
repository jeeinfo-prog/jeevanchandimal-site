// components/jeevan-chandimal-navi.js
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const JeevanChandimalNavi = (props) => {
  const router = useRouter()
  const navRef = useRef(null)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdown1Open, setDropdown1Open] = useState(false) // Work
  const [dropdown2Open, setDropdown2Open] = useState(false) // Services

  // ✅ Membership badge state
  const [memberPlan, setMemberPlan] = useState(null)

  const isActive = (href) => {
    const p = router?.pathname || ''
    if (href === '/') return p === '/'
    return p === href || p.startsWith(href + '/')
  }

  // ✅ close mobile menu on route change
  useEffect(() => {
    const handleRoute = () => {
      setMobileMenuOpen(false)
      setDropdown1Open(false)
      setDropdown2Open(false)
    }
    router?.events?.on('routeChangeComplete', handleRoute)
    return () => router?.events?.off('routeChangeComplete', handleRoute)
  }, [router])

  // ✅ Click outside closes dropdowns (desktop)
  useEffect(() => {
    const root = navRef.current
    if (!root) return

    const onDocClick = (e) => {
      if (!root.contains(e.target)) {
        setDropdown1Open(false)
        setDropdown2Open(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  // ✅ Membership check
  useEffect(() => {
    if (typeof window === 'undefined') return

    const email = window.localStorage.getItem('user_email')
    const cachedPlan = window.localStorage.getItem('member_plan')

    if (cachedPlan && !memberPlan) setMemberPlan(cachedPlan)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleDropdown1 = (e) => {
    // if clicking the link text, allow navigation
    if (e?.target?.closest && e.target.closest('a')) return
    setDropdown1Open((v) => {
      const next = !v
      if (next) setDropdown2Open(false)
      return next
    })
  }

  const toggleDropdown2 = (e) => {
    if (e?.target?.closest && e.target.closest('a')) return
    setDropdown2Open((v) => {
      const next = !v
      if (next) setDropdown1Open(false)
      return next
    })
  }

  const onKeyToggle = (which) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (which === 1) toggleDropdown1(e)
      if (which === 2) toggleDropdown2(e)
    }
    if (e.key === 'Escape') {
      setDropdown1Open(false)
      setDropdown2Open(false)
    }
  }

  return (
    <>
      <header ref={navRef} className={`jeevan-chandimal-navi-container ${props.rootClassName}`}>
        <header data-thq="thq-navbar" className="jeevan-chandimal-navi-thq-navbar-interactive-elm">
          <Link href="/">
            <a className="logoWrap" aria-label="Home">
              <img alt={props.logoAlt} src={props.logoSrc} className="jeevan-chandimal-navi-thq-image1-elm" />
            </a>
          </Link>

          <div data-thq="thq-navbar-nav" className="jeevan-chandimal-navi-thq-desktop-menu-elm">
            <nav className="jeevan-chandimal-navi-thq-links-elm1">
              <Link href="/">
                <a className={`navLink ${isActive('/') ? 'isActive' : ''}`}>Home</a>
              </Link>

              {/* WORK */}
              <div data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown1 list-item">
                <div
                  data-thq="thq-dropdown-toggle"
                  onClick={toggleDropdown1}
                  onKeyDown={onKeyToggle(1)}
                  className="jeevan-chandimal-navi-thq-dropdown-toggle-elm10"
                  role="button"
                  tabIndex={0}
                  aria-haspopup="menu"
                  aria-expanded={dropdown1Open ? 'true' : 'false'}
                >
                  <Link href="/work">
                    <a className={`navLink ${isActive('/work') ? 'isActive' : ''}`}>Work</a>
                  </Link>

                  <div data-thq="thq-dropdown-arrow" className="jeevan-chandimal-navi-thq-dropdown-arrow-elm1">
                    <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon10" aria-hidden="true">
                      <path d="M426 726v-428l214 214z" />
                    </svg>
                  </div>
                </div>

                <ul
                  data-thq="thq-dropdown-list"
                  className={`jeevan-chandimal-navi-thq-dropdown-list-elm1 ${dropdown1Open ? 'teleport-show' : ''}`}
                >
                  <li className="list-item">
                    <Link href="/work-film"><a className="dropLink">Film</a></Link>
                  </li>
                  <li className="list-item">
                    <Link href="/work-audio"><a className="dropLink">Audio</a></Link>
                  </li>
                  <li className="list-item">
                    <Link href="/work-animation"><a className="dropLink">Animation</a></Link>
                  </li>
                  <li className="list-item">
                    <Link href="/work-photography"><a className="dropLink">Photography</a></Link>
                  </li>
                </ul>
              </div>

              {/* SERVICES */}
              <div data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown2 list-item">
                <div
                  data-thq="thq-dropdown-toggle"
                  onClick={toggleDropdown2}
                  onKeyDown={onKeyToggle(2)}
                  className="jeevan-chandimal-navi-thq-dropdown-toggle-elm15"
                  role="button"
                  tabIndex={0}
                  aria-haspopup="menu"
                  aria-expanded={dropdown2Open ? 'true' : 'false'}
                >
                  <Link href="/services">
                    <a className={`navLink ${isActive('/services') ? 'isActive' : ''}`}>Services</a>
                  </Link>

                  <div data-thq="thq-dropdown-arrow" className="jeevan-chandimal-navi-thq-dropdown-arrow-elm2">
                    <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon12" aria-hidden="true">
                      <path d="M426 726v-428l214 214z" />
                    </svg>
                  </div>
                </div>

                <ul
                  data-thq="thq-dropdown-list"
                  className={`jeevan-chandimal-navi-thq-dropdown-list-elm2 ${dropdown2Open ? 'teleport-show' : ''}`}
                >
                  <li className="list-item">
                    <Link href="/services-film-production"><a className="dropLink">Film Production</a></Link>
                  </li>
                  <li className="list-item">
                    <Link href="/services-audio"><a className="dropLink">Audio Production</a></Link>
                  </li>
                  <li className="list-item">
                    <Link href="/services-animation"><a className="dropLink">Animation &amp; Motion</a></Link>
                  </li>
                  <li className="list-item">
                    <Link href="/services-photography"><a className="dropLink">Photography</a></Link>
                  </li>
                </ul>
              </div>

              <Link href="/store"><a className={`navLink ${isActive('/store') ? 'isActive' : ''}`}>Store</a></Link>
              <Link href="/memberships"><a className={`navLink ${isActive('/memberships') ? 'isActive' : ''}`}>Membership</a></Link>
              <Link href="/about"><a className={`navLink ${isActive('/about') ? 'isActive' : ''}`}>About</a></Link>
              <Link href="/contact"><a className={`navLink ${isActive('/contact') ? 'isActive' : ''}`}>Contact</a></Link>
            </nav>

            {/* RIGHT SIDE */}
            <div className="jeevan-chandimal-navi-thq-buttons-elm">
              {memberPlan && <span className="member-badge">{String(memberPlan).toUpperCase()}</span>}

              <Link href="/login">
                <a className="jeevan-chandimal-navi-link25" aria-label="Login">
                  <svg width="24" height="24" viewBox="0 0 24 24" className="jeevan-chandimal-navi-icon14">
                    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="28" strokeDashoffset="28">
                      <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
                        <animate dur="0.4s" fill="freeze" values="28;0" attributeName="stroke-dashoffset" />
                      </path>
                      <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
                        <animate dur="0.4s" fill="freeze" begin="0.5s" values="28;0" attributeName="stroke-dashoffset" />
                      </path>
                    </g>
                  </svg>
                </a>
              </Link>
            </div>
          </div>

          {/* BURGER */}
          <div
            data-thq="thq-burger-menu"
            onClick={() => setMobileMenuOpen(true)}
            className="jeevan-chandimal-navi-thq-burger-menu-elm"
            role="button"
            tabIndex={0}
            aria-label="Open menu"
          >
            <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon20" aria-hidden="true">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z" />
            </svg>
          </div>

          {/* MOBILE MENU */}
          <div data-thq="thq-mobile-menu" className={`jeevan-chandimal-navi-thq-mobile-menu-elm ${mobileMenuOpen ? 'teleport-show' : ''}`}>
            <div className="jeevan-chandimal-navi-thq-nav-elm">
              <div className="jeevan-chandimal-navi-thq-top-elm">
                <Link href="/">
                  <a className="logoWrap" aria-label="Home">
                    <img alt={props.logoAlt} src={props.logoSrc} className="jeevan-chandimal-navi-thq-logo-elm" />
                  </a>
                </Link>

                <div
                  data-thq="thq-close-menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="jeevan-chandimal-navi-thq-close-menu-elm"
                  role="button"
                  tabIndex={0}
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon22" aria-hidden="true">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" />
                  </svg>
                </div>
              </div>

              <nav className="jeevan-chandimal-navi-thq-links-elm2">
                <Link href="/"><a className={`thq-link thq-body-small ${isActive('/') ? 'mActive' : ''}`}>Home</a></Link>
                <Link href="/work"><a className={`thq-link thq-body-small ${isActive('/work') ? 'mActive' : ''}`}>Work</a></Link>
                <Link href="/services"><a className={`thq-link thq-body-small ${isActive('/services') ? 'mActive' : ''}`}>Services</a></Link>
                <Link href="/store"><a className={`thq-link thq-body-small ${isActive('/store') ? 'mActive' : ''}`}>Store</a></Link>
                <Link href="/memberships"><a className={`thq-link thq-body-small ${isActive('/memberships') ? 'mActive' : ''}`}>Membership</a></Link>
                <Link href="/about"><a className={`thq-link thq-body-small ${isActive('/about') ? 'mActive' : ''}`}>About</a></Link>
                <Link href="/contact"><a className={`thq-link thq-body-small ${isActive('/contact') ? 'mActive' : ''}`}>Contact</a></Link>
              </nav>

              {memberPlan && <div className="member-badge mobileBadge">{String(memberPlan).toUpperCase()}</div>}
            </div>
          </div>
        </header>
      </header>

      <style jsx>{`
        .jeevan-chandimal-navi-container {
          width: 100%;
          display: flex;
          position: relative;
          justify-content: center;
          background-color: var(--dl-color-theme-neutral-light);
        }

        .jeevan-chandimal-navi-thq-navbar-interactive-elm {
          width: 100%;
          display: flex;
          max-width: var(--dl-layout-size-maxwidth);
          align-items: center;
          padding: var(--dl-layout-space-twounits) var(--dl-layout-space-threeunits);
          justify-content: space-between;
        }

        .logoWrap {
          display: inline-flex;
          align-items: center;
        }

        .jeevan-chandimal-navi-thq-image1-elm {
          height: 3rem;
          transition: 0.3s;
        }

        .jeevan-chandimal-navi-thq-desktop-menu-elm {
          flex: 1;
          display: flex;
          justify-content: space-between;
          margin-left: var(--dl-layout-space-twounits);
        }

        .jeevan-chandimal-navi-thq-links-elm1 {
          gap: var(--dl-layout-space-twounits);
          flex: 1;
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: center;
        }

        .navLink {
          text-decoration: none;
          color: rgba(245, 244, 244, 0.9);
          padding: 10px 10px;
          border-radius: 12px;
          transition: background 0.15s, color 0.15s, opacity 0.15s;
          opacity: 0.9;
          display: inline-flex;
          align-items: center;
        }

        .navLink:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
        }

        /* ✅ Active page = cyan text */
        .isActive {
          color: #25c3e2;
          opacity: 1;
        }

        .mActive {
          color: #25c3e2;
        }

        .jeevan-chandimal-navi-thq-dropdown1,
        .jeevan-chandimal-navi-thq-dropdown2 {
          cursor: pointer;
          display: inline-block;
          position: relative;
          border-radius: var(--dl-layout-radius-radius2);
        }

        .jeevan-chandimal-navi-thq-dropdown-toggle-elm10,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm15 {
          width: 100%;
          display: inline-flex;
          align-items: center;
          padding-top: var(--dl-layout-space-halfunit);
          padding-left: 4px;
          padding-right: 4px;
          padding-bottom: var(--dl-layout-space-halfunit);
          border-radius: var(--dl-layout-radius-radius2);
          gap: 6px;
        }

        .jeevan-chandimal-navi-thq-dropdown-arrow-elm1,
        .jeevan-chandimal-navi-thq-dropdown-arrow-elm2 {
          display: inline-flex;
          align-items: center;
          transition: 0.3s;
        }

        .jeevan-chandimal-navi-icon10,
        .jeevan-chandimal-navi-icon12 {
          width: 18px;
          height: 18px;
          transition: 0.3s;
        }

        .jeevan-chandimal-navi-thq-dropdown-list-elm1,
        .jeevan-chandimal-navi-thq-dropdown-list-elm2 {
          left: 0%;
          width: max-content;
          display: none;
          z-index: 100;
          position: absolute;
          min-width: 100%;
          align-items: stretch;
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          flex-direction: column;
          list-style-type: none;
          padding: 6px;
          background: rgba(18, 18, 18, 0.95);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.55);
        }

        :global(.teleport-show) {
          display: flex !important;
        }

        .dropLink {
          width: 100%;
          display: inline-flex;
          align-items: center;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          color: rgba(245, 244, 244, 0.92);
          transition: background 0.15s, color 0.15s, opacity 0.15s;
          opacity: 0.92;
        }

        .dropLink:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
          color: #fff;
        }

        .jeevan-chandimal-navi-thq-buttons-elm {
          gap: var(--dl-layout-space-twounits);
          display: flex;
          align-items: center;
          flex-direction: row;
        }

        .member-badge {
          font-size: 11px;
          padding: 4px 10px;
          border: 1px solid #25c3e2;
          border-radius: 999px;
          letter-spacing: 1px;
          color: #25c3e2;
          font-weight: 600;
          line-height: 1;
          white-space: nowrap;
        }

        .mobileBadge {
          margin-top: var(--dl-layout-space-unit);
          display: inline-flex;
          align-self: flex-start;
        }

        .jeevan-chandimal-navi-link25 {
          display: contents;
        }

        .jeevan-chandimal-navi-icon14 {
          transition: 0.3s;
          text-decoration: none;
        }

        .jeevan-chandimal-navi-icon14:hover {
          color: var(--dl-color-theme-primary2);
        }

        .jeevan-chandimal-navi-thq-burger-menu-elm {
          display: none;
        }

        .jeevan-chandimal-navi-icon20 {
          width: var(--dl-layout-size-xsmall);
          height: var(--dl-layout-size-xsmall);
        }

        .jeevan-chandimal-navi-thq-mobile-menu-elm {
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100vh;
          display: none;
          padding: var(--dl-layout-space-twounits);
          z-index: 100;
          position: absolute;
          flex-direction: column;
          justify-content: space-between;
          background-color: var(--dl-color-theme-neutral-light);
        }

        @media (max-width: 767px) {
          .jeevan-chandimal-navi-thq-navbar-interactive-elm {
            padding-left: var(--dl-layout-space-twounits);
            padding-right: var(--dl-layout-space-twounits);
          }
          .jeevan-chandimal-navi-thq-buttons-elm {
            display: none;
          }
          .jeevan-chandimal-navi-thq-burger-menu-elm {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        @media (max-width: 479px) {
          .jeevan-chandimal-navi-thq-navbar-interactive-elm {
            padding: var(--dl-layout-space-unit);
          }
          .jeevan-chandimal-navi-thq-desktop-menu-elm {
            display: none;
          }
          .jeevan-chandimal-navi-thq-mobile-menu-elm {
            padding: var(--dl-layout-space-unit);
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

export default JeevanChandimalNavi