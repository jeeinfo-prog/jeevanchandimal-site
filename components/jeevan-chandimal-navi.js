// components/jeevan-chandimal-navi.js
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

const JeevanChandimalNavi = (props) => {
  const router = useRouter()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Desktop dropdown state
  const [dropdown1Open, setDropdown1Open] = useState(false)
  const [dropdown2Open, setDropdown2Open] = useState(false)

  // Mobile dropdown state
  const [mWorkOpen, setMWorkOpen] = useState(false)
  const [mServicesOpen, setMServicesOpen] = useState(false)

  // Membership badge
  const [memberPlan, setMemberPlan] = useState(null)

  /* ---------------- ACTIVE LINK ---------------- */
  const isActive = (href) => router.pathname === href

  /* ---------------- AUTO CLOSE ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    const handleRoute = () => {
      setMobileMenuOpen(false)
      setMWorkOpen(false)
      setMServicesOpen(false)
      setDropdown1Open(false)
      setDropdown2Open(false)
    }
    router.events.on('routeChangeComplete', handleRoute)
    return () => router.events.off('routeChangeComplete', handleRoute)
  }, [router.events])

  /* ---------------- MEMBERSHIP ---------------- */
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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMWorkOpen(false)
    setMServicesOpen(false)
  }

  /* ---------------- KEYBOARD SUPPORT ---------------- */
  const onDropdownKey = (e, type) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (type === 'work') {
        setDropdown1Open((v) => !v)
        setDropdown2Open(false)
      } else {
        setDropdown2Open((v) => !v)
        setDropdown1Open(false)
      }
    }
    if (e.key === 'Escape') {
      setDropdown1Open(false)
      setDropdown2Open(false)
    }
  }

  return (
    <>
      <header className={`jeevan-chandimal-navi-container ${props.rootClassName}`}>
        <header className="jeevan-chandimal-navi-thq-navbar-interactive-elm">
          <Link href="/">
            <a className="logoWrap" aria-label="Home">
              <img alt={props.logoAlt} src={props.logoSrc} className="jeevan-chandimal-navi-thq-image1-elm" />
            </a>
          </Link>

          {/* ================= DESKTOP ================= */}
          <div className="jeevan-chandimal-navi-thq-desktop-menu-elm">
            <nav className="jeevan-chandimal-navi-thq-links-elm1">
              <Link href="/">
                <a className={`thq-link thq-body-small ${isActive('/') ? 'activeLink' : ''}`}>Home</a>
              </Link>

              {/* WORK DROPDOWN */}
              <div
                className="jeevan-chandimal-navi-thq-dropdown1 list-item"
                onKeyDown={(e) => onDropdownKey(e, 'work')}
              >
                <div
                  className="jeevan-chandimal-navi-thq-dropdown-toggle-elm10"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setDropdown1Open((v) => !v)
                    setDropdown2Open(false)
                  }}
                >
                  <Link href="/work">
                    <a className={`thq-link thq-body-small ${isActive('/work') ? 'activeLink' : ''}`}>Work</a>
                  </Link>

                  <span className={`desktopChevron ${dropdown1Open ? 'open' : ''}`}>▶</span>
                </div>

                <ul className={`jeevan-chandimal-navi-thq-dropdown-list-elm1 ${dropdown1Open ? 'teleport-show' : ''}`}>
                  <li><Link href="/work-film"><a>Film</a></Link></li>
                  <li><Link href="/work-audio"><a>Audio</a></Link></li>
                  <li><Link href="/work-animation"><a>Animation</a></Link></li>
                  <li><Link href="/work-photography"><a>Photography</a></Link></li>
                </ul>
              </div>

              {/* SERVICES DROPDOWN */}
              <div
                className="jeevan-chandimal-navi-thq-dropdown2 list-item"
                onKeyDown={(e) => onDropdownKey(e, 'services')}
              >
                <div
                  className="jeevan-chandimal-navi-thq-dropdown-toggle-elm15"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setDropdown2Open((v) => !v)
                    setDropdown1Open(false)
                  }}
                >
                  <Link href="/services">
                    <a className={`thq-link thq-body-small ${isActive('/services') ? 'activeLink' : ''}`}>Services</a>
                  </Link>

                  <span className={`desktopChevron ${dropdown2Open ? 'open' : ''}`}>▶</span>
                </div>

                <ul className={`jeevan-chandimal-navi-thq-dropdown-list-elm2 ${dropdown2Open ? 'teleport-show' : ''}`}>
                  <li><Link href="/services-film-production"><a>Film Production</a></Link></li>
                  <li><Link href="/services-audio"><a>Audio Production</a></Link></li>
                  <li><Link href="/services-animation"><a>Animation & Motion</a></Link></li>
                  <li><Link href="/services-photography"><a>Photography</a></Link></li>
                </ul>
              </div>

              <Link href="/store"><a className={isActive('/store') ? 'activeLink' : ''}>Store</a></Link>
              <Link href="/memberships"><a className={isActive('/memberships') ? 'activeLink' : ''}>Membership</a></Link>
              <Link href="/about"><a className={isActive('/about') ? 'activeLink' : ''}>About</a></Link>
              <Link href="/contact"><a className={isActive('/contact') ? 'activeLink' : ''}>Contact</a></Link>
            </nav>

            <div className="jeevan-chandimal-navi-thq-buttons-elm">
              {memberPlan && <span className="member-badge">{String(memberPlan).toUpperCase()}</span>}
            </div>
          </div>

          {/* ================= BURGER ================= */}
          <div
            onClick={() => setMobileMenuOpen(true)}
            className="jeevan-chandimal-navi-thq-burger-menu-elm"
            role="button"
            tabIndex={0}
            aria-label="Open menu"
          >
            ☰
          </div>

          {/* ================= MOBILE ================= */}
          <div className={`jeevan-chandimal-navi-thq-mobile-menu-elm ${mobileMenuOpen ? 'teleport-show' : ''}`}>
            <div className="jeevan-chandimal-navi-thq-nav-elm">
              <button className="closeBtn" onClick={closeMobileMenu}>✕</button>

              <nav className="jeevan-chandimal-navi-thq-links-elm2">
                <Link href="/"><a onClick={closeMobileMenu} className={isActive('/') ? 'activeLink' : ''}>Home</a></Link>

                {/* WORK MOBILE */}
                <Link href="/work">
                  <a
                    className={`mobileDropLink ${isActive('/work') ? 'activeLink' : ''}`}
                    onClick={(e) => {
                      if (!mWorkOpen) {
                        e.preventDefault()
                        setMWorkOpen(true)
                        setMServicesOpen(false)
                      } else closeMobileMenu()
                    }}
                  >
                    Work <span className={`mobileChevron ${mWorkOpen ? 'open' : ''}`}>▶</span>
                  </a>
                </Link>

                {mWorkOpen && (
                  <div className="mobileSubLinks">
                    <Link href="/work-film"><a onClick={closeMobileMenu}>Film</a></Link>
                    <Link href="/work-audio"><a onClick={closeMobileMenu}>Audio</a></Link>
                    <Link href="/work-animation"><a onClick={closeMobileMenu}>Animation</a></Link>
                    <Link href="/work-photography"><a onClick={closeMobileMenu}>Photography</a></Link>
                  </div>
                )}

                {/* SERVICES MOBILE */}
                <Link href="/services">
                  <a
                    className={`mobileDropLink ${isActive('/services') ? 'activeLink' : ''}`}
                    onClick={(e) => {
                      if (!mServicesOpen) {
                        e.preventDefault()
                        setMServicesOpen(true)
                        setMWorkOpen(false)
                      } else closeMobileMenu()
                    }}
                  >
                    Services <span className={`mobileChevron ${mServicesOpen ? 'open' : ''}`}>▶</span>
                  </a>
                </Link>

                {mServicesOpen && (
                  <div className="mobileSubLinks">
                    <Link href="/services-film-production"><a onClick={closeMobileMenu}>Film Production</a></Link>
                    <Link href="/services-audio"><a onClick={closeMobileMenu}>Audio Production</a></Link>
                    <Link href="/services-animation"><a onClick={closeMobileMenu}>Animation & Motion</a></Link>
                    <Link href="/services-photography"><a onClick={closeMobileMenu}>Photography</a></Link>
                  </div>
                )}

                <Link href="/store"><a onClick={closeMobileMenu} className={isActive('/store') ? 'activeLink' : ''}>Store</a></Link>
                <Link href="/memberships"><a onClick={closeMobileMenu} className={isActive('/memberships') ? 'activeLink' : ''}>Membership</a></Link>
                <Link href="/about"><a onClick={closeMobileMenu} className={isActive('/about') ? 'activeLink' : ''}>About</a></Link>
                <Link href="/contact"><a onClick={closeMobileMenu} className={isActive('/contact') ? 'activeLink' : ''}>Contact</a></Link>
              </nav>
            </div>
          </div>
        </header>
      </header>

      <style jsx>{`
        .activeLink {
          color: #25c3e2;
          font-weight: 600;
        }

        .desktopChevron,
        .mobileChevron {
          margin-left: 6px;
          display: inline-block;
          transition: transform 0.2s;
          font-size: 12px;
        }

        .desktopChevron.open,
        .mobileChevron.open {
          transform: rotate(90deg);
        }

        .mobileSubLinks a {
          text-decoration: none !important;
          display: block;
          padding: 6px 0 6px 14px;
        }

        .mobileDropLink {
          text-decoration: none !important;
          display: block;
          padding: 10px 0;
        }

        .jeevan-chandimal-navi-thq-mobile-menu-elm {
          position: fixed;
          inset: 0;
          background: #fff;
          display: none;
          padding: 20px;
          z-index: 9999;
        }

        :global(.teleport-show) {
          display: block !important;
        }
      `}</style>
    </>
  )
}

JeevanChandimalNavi.propTypes = {
  rootClassName: PropTypes.string,
  logoAlt: PropTypes.string,
  logoSrc: PropTypes.string,
}

export default JeevanChandimalNavi