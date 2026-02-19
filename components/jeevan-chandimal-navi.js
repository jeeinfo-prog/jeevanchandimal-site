// components/jeevan-chandimal-navi.js
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const JeevanChandimalNavi = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdown1Open, setDropdown1Open] = useState(false) // Work
  const [dropdown2Open, setDropdown2Open] = useState(false) // Services

  // ✅ Membership badge state
  const [memberPlan, setMemberPlan] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1) Try email from localStorage
    const email = window.localStorage.getItem('user_email')

    // 2) Fallback: allow storing plan directly (set on membership success page)
    const cachedPlan = window.localStorage.getItem('member_plan')
    if (cachedPlan && !memberPlan) {
      setMemberPlan(cachedPlan)
    }

    if (!email) return

    fetch(`/api/member/status?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.member) {
          const plan = d?.plan || cachedPlan || 'member'
          setMemberPlan(plan)
          // cache it so badge still shows next time
          window.localStorage.setItem('member_plan', plan)
        } else {
          // if not member, ensure it's cleared
          window.localStorage.removeItem('member_plan')
          setMemberPlan(null)
        }
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleDropdown1 = (e) => {
    // Allow clicking the link to navigate; clicking elsewhere toggles the menu
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
              <img
                alt={props.logoAlt}
                src={props.logoSrc}
                className="jeevan-chandimal-navi-thq-image1-elm"
              />
            </a>
          </Link>

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

              {/* ✅ WORK DROPDOWN (now styled same as Services) */}
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

                  <div data-thq="thq-dropdown-arrow" className="jeevan-chandimal-navi-thq-dropdown-arrow-elm1">
                    <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon10" aria-hidden="true">
                      <path d="M426 726v-428l214 214z"></path>
                    </svg>
                  </div>
                </div>

                <ul
                  data-thq="thq-dropdown-list"
                  className={`jeevan-chandimal-navi-thq-dropdown-list-elm1 ${dropdown1Open ? 'teleport-show' : ''}`}
                >
                  <li data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown-elm1 list-item">
                    <div data-thq="thq-dropdown-toggle" className="jeevan-chandimal-navi-thq-dropdown-toggle-elm11">
                      <Link href="/work-film">
                        <a className="jeevan-chandimal-navi-link12 thq-link thq-body-small">
                          {props.text17 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text14">Film</span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown-elm2 list-item">
                    <div data-thq="thq-dropdown-toggle" className="jeevan-chandimal-navi-thq-dropdown-toggle-elm12">
                      <Link href="/work-audio">
                        <a className="jeevan-chandimal-navi-link13 thq-link thq-body-small">
                          {props.text18 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text11">Audio</span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown-elm3 list-item">
                    <div data-thq="thq-dropdown-toggle" className="jeevan-chandimal-navi-thq-dropdown-toggle-elm13">
                      <Link href="/work-animation">
                        <a className="jeevan-chandimal-navi-link14 thq-link thq-body-small">
                          {props.text19 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text17">Animation</span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown-elm4 list-item">
                    <div data-thq="thq-dropdown-toggle" className="jeevan-chandimal-navi-thq-dropdown-toggle-elm14">
                      <Link href="/work-photography">
                        <a className="jeevan-chandimal-navi-link15 thq-link thq-body-small">
                          {props.text191 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text20">Photography</span>
                            </Fragment>
                          )}
                        </a>
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

                  <div data-thq="thq-dropdown-arrow" className="jeevan-chandimal-navi-thq-dropdown-arrow-elm2">
                    <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon12" aria-hidden="true">
                      <path d="M426 726v-428l214 214z"></path>
                    </svg>
                  </div>
                </div>

                <ul
                  data-thq="thq-dropdown-list"
                  className={`jeevan-chandimal-navi-thq-dropdown-list-elm2 ${dropdown2Open ? 'teleport-show' : ''}`}
                >
                  <li data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown-elm5 list-item">
                    <div data-thq="thq-dropdown-toggle" className="jeevan-chandimal-navi-thq-dropdown-toggle-elm16">
                      <Link href="/services-film-production">
                        <a className="jeevan-chandimal-navi-link17 thq-link thq-body-small">
                          {props.text171 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text21">Film Production</span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown-elm6 list-item">
                    <div data-thq="thq-dropdown-toggle" className="jeevan-chandimal-navi-thq-dropdown-toggle-elm17">
                      <Link href="/services-audio">
                        <a className="jeevan-chandimal-navi-link18 thq-link thq-body-small">
                          {props.text181 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text24">Audio Production</span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown-elm7 list-item">
                    <div data-thq="thq-dropdown-toggle" className="jeevan-chandimal-navi-thq-dropdown-toggle-elm18">
                      <Link href="/services-animation">
                        <a className="jeevan-chandimal-navi-link19 thq-link thq-body-small">
                          {props.text192 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text10">Animation &amp; Motion</span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li data-thq="thq-dropdown" className="jeevan-chandimal-navi-thq-dropdown-elm8 list-item">
                    <div data-thq="thq-dropdown-toggle" className="jeevan-chandimal-navi-thq-dropdown-toggle-elm19">
                      <Link href="/services-photography">
                        <a className="jeevan-chandimal-navi-link20 thq-link thq-body-small">
                          {props.text1911 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text15">Photography</span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>

              <Link href="/store">
                <a className="jeevan-chandimal-navi-link21 thq-link thq-body-small">
                  {props.link4 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-navi-text25">Store</span>
                    </Fragment>
                  )}
                </a>
              </Link>

              <Link href="/memberships">
                <a className="jeevan-chandimal-navi-link22 thq-link thq-body-small">
                  {props.link5 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-navi-text16">Membership</span>
                    </Fragment>
                  )}
                </a>
              </Link>

              <Link href="/about">
                <a className="jeevan-chandimal-navi-link23 thq-link thq-body-small">
                  {props.link51 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-navi-text22">About</span>
                    </Fragment>
                  )}
                </a>
              </Link>

              <Link href="/contact">
                <a className="jeevan-chandimal-navi-link24 thq-link thq-body-small">
                  {props.link511 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-navi-text26">Contact</span>
                    </Fragment>
                  )}
                </a>
              </Link>
            </nav>

            {/* RIGHT SIDE */}
            <div className="jeevan-chandimal-navi-thq-buttons-elm">
              {memberPlan && (
                <span className="member-badge">{String(memberPlan).toUpperCase()}</span>
              )}

              <Link href="/login">
                <a className="jeevan-chandimal-navi-link25" aria-label="Login">
                  <svg width="24" height="24" viewBox="0 0 24 24" className="jeevan-chandimal-navi-icon14">
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="28"
                      strokeDashoffset="28"
                    >
                      <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
                        <animate dur="0.4s" fill="freeze" values="28;0" attributeName="stroke-dashoffset" />
                      </path>
                      <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
                        <animate
                          dur="0.4s"
                          fill="freeze"
                          begin="0.5s"
                          values="28;0"
                          attributeName="stroke-dashoffset"
                        />
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
          <div
            data-thq="thq-mobile-menu"
            className={`jeevan-chandimal-navi-thq-mobile-menu-elm ${mobileMenuOpen ? 'teleport-show' : ''}`}
          >
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
                <Link href="/"><a className="thq-link thq-body-small">Home</a></Link>
                <Link href="/work"><a className="thq-link thq-body-small">Work</a></Link>
                <Link href="/services"><a className="thq-link thq-body-small">Services</a></Link>
                <Link href="/store"><a className="thq-link thq-body-small">Store</a></Link>
                <Link href="/memberships"><a className="thq-link thq-body-small">Membership</a></Link>
                <Link href="/about"><a className="thq-link thq-body-small">About</a></Link>
                <Link href="/contact"><a className="thq-link thq-body-small">Contact</a></Link>
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

        .jeevan-chandimal-navi-link10,
        .jeevan-chandimal-navi-link11,
        .jeevan-chandimal-navi-link16,
        .jeevan-chandimal-navi-link21,
        .jeevan-chandimal-navi-link22,
        .jeevan-chandimal-navi-link23,
        .jeevan-chandimal-navi-link24 {
          text-decoration: none;
        }

        .jeevan-chandimal-navi-thq-dropdown1,
        .jeevan-chandimal-navi-thq-dropdown2 {
          cursor: pointer;
          display: inline-block;
          position: relative;
          border-radius: var(--dl-layout-radius-radius2);
        }

        /* ✅ Make Work + Services toggles consistent */
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

        /* Dropdown list base */
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

        /* ✅ This is what Teleport expects */
        :global(.teleport-show) {
          display: flex !important;
        }

        .jeevan-chandimal-navi-thq-dropdown-toggle-elm11,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm12,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm13,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm14,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm16,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm17,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm18,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm19 {
          fill: #595959;
          color: #595959;
          width: 100%;
          display: inline-flex;
          transition: 0.3s;
          align-items: center;
          padding: var(--dl-layout-space-halfunit) var(--dl-layout-space-unit);
          border-radius: var(--dl-layout-radius-radius4);
        }

        .jeevan-chandimal-navi-thq-dropdown-toggle-elm11:hover,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm12:hover,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm13:hover,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm14:hover,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm16:hover,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm17:hover,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm18:hover,
        .jeevan-chandimal-navi-thq-dropdown-toggle-elm19:hover {
          fill: #fff;
          color: #fff;
          background-color: #595959;
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
  text192: undefined,
  text18: undefined,
  rootClassName: '',
  text16: undefined,
  logoAlt: 'Business Logo',
  link3: undefined,
  text17: undefined,
  text1911: undefined,
  link5: undefined,
  link1Url: 'https://www.teleporthq.io',
  text19: undefined,
  link4Url: 'https://www.teleporthq.io',
  link2: undefined,
  logoSrc: '/JC/jc%20logo%20web%2004-1500h.png',
  text161: undefined,
  text191: undefined,
  text171: undefined,
  link51: undefined,
  link1: undefined,
  link3Url: 'https://www.teleporthq.io',
  link2Url: 'https://www.teleporthq.io',
  link5Url: 'https://www.teleporthq.io',
  text181: undefined,
  link4: undefined,
  link511: undefined,
}

JeevanChandimalNavi.propTypes = {
  text192: PropTypes.element,
  text18: PropTypes.element,
  rootClassName: PropTypes.string,
  text16: PropTypes.element,
  logoAlt: PropTypes.string,
  link3: PropTypes.element,
  text17: PropTypes.element,
  text1911: PropTypes.element,
  link5: PropTypes.element,
  link1Url: PropTypes.string,
  text19: PropTypes.element,
  link4Url: PropTypes.string,
  link2: PropTypes.element,
  logoSrc: PropTypes.string,
  text161: PropTypes.element,
  text191: PropTypes.element,
  text171: PropTypes.element,
  link51: PropTypes.element,
  link1: PropTypes.element,
  link3Url: PropTypes.string,
  link2Url: PropTypes.string,
  link5Url: PropTypes.string,
  text181: PropTypes.element,
  link4: PropTypes.element,
  link511: PropTypes.element,
}

export default JeevanChandimalNavi
