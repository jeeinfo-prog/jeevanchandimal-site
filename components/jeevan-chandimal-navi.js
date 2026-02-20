// components/jeevan-chandimal-navi.js
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const JeevanChandimalNavi = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Desktop dropdown state (click fallback)
  const [dropdown1Open, setDropdown1Open] = useState(false) // Work
  const [dropdown2Open, setDropdown2Open] = useState(false) // Services

  // Mobile dropdown state
  const [mWorkOpen, setMWorkOpen] = useState(false)
  const [mServicesOpen, setMServicesOpen] = useState(false)

  // ✅ Membership badge state
  const [memberPlan, setMemberPlan] = useState(null)

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
    setDropdown1Open(false)
    setDropdown2Open(false)
  }

  const toggleDropdown1 = (e) => {
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

  return (
    <>
      <header className={`jeevan-chandimal-navi-container ${props.rootClassName}`}>
        <header data-thq="thq-navbar" className="jeevan-chandimal-navi-thq-navbar-interactive-elm">
          <Link href="/">
            <a className="logoWrap" aria-label="Home">
              <img alt={props.logoAlt} src={props.logoSrc} className="jeevan-chandimal-navi-thq-image1-elm" />
            </a>
          </Link>

          {/* DESKTOP */}
          <div data-thq="thq-navbar-nav" className="jeevan-chandimal-navi-thq-desktop-menu-elm">
            <nav className="jeevan-chandimal-navi-thq-links-elm1">
              <Link href="/">
                <a className="jeevan-chandimal-navi-link10 thq-link thq-body-small">
                  {props.link1 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-navi-text23">Home</span>
                    </Fragment>
                  )}
                </a>
              </Link>

              {/* WORK DROPDOWN */}
              <div data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown1 list-item">
                <div
                  data-thq="thq-dropdown-toggle"
                  onClick={toggleDropdown1}
                  className="jeevan-chandimal-navi-thq-dropdown-toggle-elm10"
                  role="button"
                  tabIndex={0}
                >
                  <Link href="/work">
                    <a className="jeevan-chandimal-navi-link11 thq-link thq-body-small">
                      {props.text16 ?? (
                        <Fragment>
                          <span className="jeevan-chandimal-navi-text12">Work</span>
                        </Fragment>
                      )}
                    </a>
                  </Link>

                  <div
                    data-thq="thq-dropdown-arrow"
                    className={`jeevan-chandimal-navi-thq-dropdown-arrow-elm1 ${dropdown1Open ? 'open' : ''}`}
                  >
                    <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon10" aria-hidden="true">
                      <path d="M426 726v-428l214 214z"></path>
                    </svg>
                  </div>
                </div>

                <ul
                  data-thq="thq-dropdown-list"
                  className={`jeevan-chandimal-navi-thq-dropdown-list-elm1 ${dropdown1Open ? 'teleport-show' : ''}`}
                >
                  <li className="list-item">
                    <div className="jeevan-chandimal-navi-thq-dropdown-toggle-elm11">
                      <Link href="/work-film">
                        <a className="thq-link thq-body-small">Film</a>
                      </Link>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="jeevan-chandimal-navi-thq-dropdown-toggle-elm12">
                      <Link href="/work-audio">
                        <a className="thq-link thq-body-small">Audio</a>
                      </Link>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="jeevan-chandimal-navi-thq-dropdown-toggle-elm13">
                      <Link href="/work-animation">
                        <a className="thq-link thq-body-small">Animation</a>
                      </Link>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="jeevan-chandimal-navi-thq-dropdown-toggle-elm14">
                      <Link href="/work-photography">
                        <a className="thq-link thq-body-small">Photography</a>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>

              {/* SERVICES DROPDOWN */}
              <div data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown2 list-item">
                <div
                  data-thq="thq-dropdown-toggle"
                  className="jeevan-chandimal-navi-thq-dropdown-toggle-elm15"
                  onClick={toggleDropdown2}
                  role="button"
                  tabIndex={0}
                >
                  <Link href="/services">
                    <a className="jeevan-chandimal-navi-link16 thq-link thq-body-small">
                      {props.text161 ?? (
                        <Fragment>
                          <span className="jeevan-chandimal-navi-text19">Services</span>
                        </Fragment>
                      )}
                    </a>
                  </Link>

                  <div
                    data-thq="thq-dropdown-arrow"
                    className={`jeevan-chandimal-navi-thq-dropdown-arrow-elm2 ${dropdown2Open ? 'open' : ''}`}
                  >
                    <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon12" aria-hidden="true">
                      <path d="M426 726v-428l214 214z"></path>
                    </svg>
                  </div>
                </div>

                <ul
                  data-thq="thq-dropdown-list"
                  className={`jeevan-chandimal-navi-thq-dropdown-list-elm2 ${dropdown2Open ? 'teleport-show' : ''}`}
                >
                  <li className="list-item">
                    <div className="jeevan-chandimal-navi-thq-dropdown-toggle-elm16">
                      <Link href="/services-film-production">
                        <a className="thq-link thq-body-small">Film Production</a>
                      </Link>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="jeevan-chandimal-navi-thq-dropdown-toggle-elm17">
                      <Link href="/services-audio">
                        <a className="thq-link thq-body-small">Audio Production</a>
                      </Link>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="jeevan-chandimal-navi-thq-dropdown-toggle-elm18">
                      <Link href="/services-animation">
                        <a className="thq-link thq-body-small">Animation &amp; Motion</a>
                      </Link>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="jeevan-chandimal-navi-thq-dropdown-toggle-elm19">
                      <Link href="/services-photography">
                        <a className="thq-link thq-body-small">Photography</a>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>

              <Link href="/store"><a className="jeevan-chandimal-navi-link21 thq-link thq-body-small">Store</a></Link>
              <Link href="/memberships"><a className="jeevan-chandimal-navi-link22 thq-link thq-body-small">Membership</a></Link>
              <Link href="/about"><a className="jeevan-chandimal-navi-link23 thq-link thq-body-small">About</a></Link>
              <Link href="/contact"><a className="jeevan-chandimal-navi-link24 thq-link thq-body-small">Contact</a></Link>
            </nav>

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
            onClick={() => {
              setMobileMenuOpen(true)
              setDropdown1Open(false)
              setDropdown2Open(false)
              setMWorkOpen(false)
              setMServicesOpen(false)
            }}
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
          <div
            data-thq="thq-mobile-menu"
            className={`jeevan-chandimal-navi-thq-mobile-menu-elm ${mobileMenuOpen ? 'teleport-show' : ''}`}
            onClick={closeMobileMenu}
            role="dialog"
            aria-modal="true"
          >
            <div className="jeevan-chandimal-navi-thq-nav-elm" onClick={(e) => e.stopPropagation()}>
              <div className="jeevan-chandimal-navi-thq-top-elm">
                <Link href="/">
                  <a className="logoWrap" aria-label="Home" onClick={closeMobileMenu}>
                    <img alt={props.logoAlt} src={props.logoSrc} className="jeevan-chandimal-navi-thq-logo-elm" />
                  </a>
                </Link>

                <button type="button" onClick={closeMobileMenu} className="closeBtn" aria-label="Close menu">
                  <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon22" aria-hidden="true">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" />
                  </svg>
                </button>
              </div>

              <nav className="jeevan-chandimal-navi-thq-links-elm2">
                <Link href="/"><a onClick={closeMobileMenu} className="thq-link thq-body-small">Home</a></Link>

                {/* MOBILE WORK DROPDOWN */}
                <button
                  type="button"
                  className="mobileDropToggle"
                  onClick={() => {
                    setMWorkOpen((v) => !v)
                    if (!mWorkOpen) setMServicesOpen(false)
                  }}
                >
                  <span>Work</span>
                  <span className={`mobileArrow ${mWorkOpen ? 'open' : ''}`}>▾</span>
                </button>
                {mWorkOpen && (
                  <div className="mobileSubLinks">
                    <Link href="/work-film"><a onClick={closeMobileMenu}>Film</a></Link>
                    <Link href="/work-audio"><a onClick={closeMobileMenu}>Audio</a></Link>
                    <Link href="/work-animation"><a onClick={closeMobileMenu}>Animation</a></Link>
                    <Link href="/work-photography"><a onClick={closeMobileMenu}>Photography</a></Link>
                  </div>
                )}

                {/* MOBILE SERVICES DROPDOWN */}
                <button
                  type="button"
                  className="mobileDropToggle"
                  onClick={() => {
                    setMServicesOpen((v) => !v)
                    if (!mServicesOpen) setMWorkOpen(false)
                  }}
                >
                  <span>Services</span>
                  <span className={`mobileArrow ${mServicesOpen ? 'open' : ''}`}>▾</span>
                </button>
                {mServicesOpen && (
                  <div className="mobileSubLinks">
                    <Link href="/services-film-production"><a onClick={closeMobileMenu}>Film Production</a></Link>
                    <Link href="/services-audio"><a onClick={closeMobileMenu}>Audio Production</a></Link>
                    <Link href="/services-animation"><a onClick={closeMobileMenu}>Animation &amp; Motion</a></Link>
                    <Link href="/services-photography"><a onClick={closeMobileMenu}>Photography</a></Link>
                  </div>
                )}

                <Link href="/store"><a onClick={closeMobileMenu} className="thq-link thq-body-small">Store</a></Link>
                <Link href="/memberships"><a onClick={closeMobileMenu} className="thq-link thq-body-small">Membership</a></Link>
                <Link href="/about"><a onClick={closeMobileMenu} className="thq-link thq-body-small">About</a></Link>
                <Link href="/contact"><a onClick={closeMobileMenu} className="thq-link thq-body-small">Contact</a></Link>
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

        .jeevan-chandimal-navi-thq-dropdown1,
        .jeevan-chandimal-navi-thq-dropdown2 {
          cursor: pointer;
          display: inline-block;
          position: relative;
          border-radius: var(--dl-layout-radius-radius2);
        }

        .jeevan-chandimal-navi-thq-dropdown-toggle-elm10,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm15 {
          fill: #595959;
          color: #595959;
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

        .jeevan-chandimal-navi-icon10,
        .jeevan-chandimal-navi-icon12 {
          width: 18px;
          height: 18px;
          transition: transform 0.2s;
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
          border-color: #d9d9d9;
          border-width: 1px;
          border-style: solid;
          border-radius: var(--dl-layout-radius-radius4);
          flex-direction: column;
          list-style-type: none;
          list-style-position: inside;
          padding: 6px;
          background: var(--dl-color-theme-neutral-light);
        }

        :global(.teleport-show) {
          display: flex !important;
        }

        /* Desktop hover dropdown */
        @media (min-width: 768px) {
          .jeevan-chandimal-navi-thq-dropdown1:hover .jeevan-chandimal-navi-thq-dropdown-list-elm1 {
            display: flex;
          }
          .jeevan-chandimal-navi-thq-dropdown2:hover .jeevan-chandimal-navi-thq-dropdown-list-elm2 {
            display: flex;
          }

          .jeevan-chandimal-navi-thq-dropdown1:hover .jeevan-chandimal-navi-icon10,
          .jeevan-chandimal-navi-thq-dropdown-arrow-elm1.open .jeevan-chandimal-navi-icon10 {
            transform: rotate(90deg);
          }

          .jeevan-chandimal-navi-thq-dropdown2:hover .jeevan-chandimal-navi-icon12,
          .jeevan-chandimal-navi-thq-dropdown-arrow-elm2.open .jeevan-chandimal-navi-icon12 {
            transform: rotate(90deg);
          }
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

        .jeevan-chandimal-navi-thq-burger-menu-elm {
          display: none;
        }

        .jeevan-chandimal-navi-icon20 {
          width: var(--dl-layout-size-xsmall);
          height: var(--dl-layout-size-xsmall);
        }

        /* Mobile menu overlay */
        .jeevan-chandimal-navi-thq-mobile-menu-elm {
          inset: 0;
          width: 100%;
          height: 100vh;
          display: none;
          padding: var(--dl-layout-space-twounits);
          z-index: 9999;
          position: fixed;
          flex-direction: column;
          justify-content: flex-start;
          background-color: var(--dl-color-theme-neutral-light);
          overflow: auto;
        }

        .jeevan-chandimal-navi-thq-nav-elm {
          width: 100%;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }

        .jeevan-chandimal-navi-thq-top-elm {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .closeBtn {
          border: 0;
          padding: 8px;
          background: transparent;
          color: inherit;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .jeevan-chandimal-navi-icon22 {
          width: 30px;
          height: 30px;
        }

        .jeevan-chandimal-navi-thq-links-elm2 {
          margin-top: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .jeevan-chandimal-navi-thq-links-elm2 :global(a) {
          display: block;
          padding: 10px 0;
          font-size: 18px;
          text-decoration: none;
        }

        /* Mobile dropdown buttons */
        .mobileDropToggle {
          width: 100%;
          border: 0;
          background: transparent;
          color: inherit;
          text-align: left;
          padding: 10px 0;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .mobileArrow {
          transition: transform 0.18s;
          font-size: 16px;
          opacity: 0.8;
        }

        .mobileArrow.open {
          transform: rotate(180deg);
        }

        .mobileSubLinks {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 6px 0 10px 14px;
          border-left: 2px solid rgba(0, 0, 0, 0.12);
          margin-top: -6px;
        }

        .mobileSubLinks :global(a) {
          font-size: 16px;
          padding: 6px 0;
        }

        @media (max-width: 767px) {
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
  link1: undefined,
  link4: undefined,
  link5: undefined,
  link51: undefined,
  link511: undefined,
  text16: undefined,
  text161: undefined,
}

JeevanChandimalNavi.propTypes = {
  rootClassName: PropTypes.string,
  logoAlt: PropTypes.string,
  logoSrc: PropTypes.string,
  link1: PropTypes.element,
  link4: PropTypes.element,
  link5: PropTypes.element,
  link51: PropTypes.element,
  link511: PropTypes.element,
  text16: PropTypes.element,
  text161: PropTypes.element,
}

export default JeevanChandimalNavi