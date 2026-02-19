// components/jeevan-chandimal-navi.js
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const JeevanChandimalNavi = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdown1Open, setDropdown1Open] = useState(false)
  const [dropdown2Open, setDropdown2Open] = useState(false)

  // ✅ Membership state
  const [memberPlan, setMemberPlan] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const email = window.localStorage.getItem('user_email')
    if (!email) return

    fetch(`/api/member/status?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.member) setMemberPlan(d.plan || 'member')
      })
      .catch(() => {})
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
      <header
        className={`jeevan-chandimal-navi-container ${props.rootClassName} `}
      >
        <header
          data-thq="thq-navbar"
          className="jeevan-chandimal-navi-thq-navbar-interactive-elm"
        >
          <Link href="/" aria-label="Home">
            <a className="jeevan-chandimal-navi-logoLink">
              <img
                alt={props.logoAlt}
                src={props.logoSrc}
                className="jeevan-chandimal-navi-thq-image1-elm"
              />
            </a>
          </Link>

          <div
            data-thq="thq-navbar-nav"
            className="jeevan-chandimal-navi-thq-desktop-menu-elm"
          >
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

              {/* WORK */}
              <div
                data-thq="thq-dropdown"
                className="jeevan-chandimal-navi-thq-dropdown1 list-item"
              >
                <div
                  data-thq="thq-dropdown-toggle"
                  onClick={toggleDropdown1}
                  className="jeevan-chandimal-navi-thq-dropdown-toggle-elm10"
                >
                  <Link href="/work">
                    <a className="jeevan-chandimal-navi-link11 thq-link thq-body-small">
                      {props.text16 ?? (
                        <Fragment>
                          <span className="jeevan-chandimal-navi-text12">
                            Work
                          </span>
                        </Fragment>
                      )}
                    </a>
                  </Link>
                  <div
                    data-thq="thq-dropdown-arrow"
                    className="jeevan-chandimal-navi-thq-dropdown-arrow-elm1"
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      className="jeevan-chandimal-navi-icon10"
                    >
                      <path d="M426 726v-428l214 214z"></path>
                    </svg>
                  </div>
                </div>

                <ul
                  data-thq="thq-dropdown-list"
                  className={`jeevan-chandimal-navi-thq-dropdown-list-elm1 ${
                    dropdown1Open ? 'teleport-show' : ''
                  }`}
                >
                  <li
                    data-thq="thq-dropdown"
                    className="jeevan-chandimal-navi-thq-dropdown-elm1 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-navi-thq-dropdown-toggle-elm11"
                    >
                      <Link href="/work-film">
                        <a className="jeevan-chandimal-navi-link12 thq-link thq-body-small">
                          {props.text17 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text14">
                                Film
                              </span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li
                    data-thq="thq-dropdown"
                    className="jeevan-chandimal-navi-thq-dropdown-elm2 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-navi-thq-dropdown-toggle-elm12"
                    >
                      <Link href="/work-audio">
                        <a className="jeevan-chandimal-navi-link13 thq-link thq-body-small">
                          {props.text18 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text11">
                                Audio
                              </span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li
                    data-thq="thq-dropdown"
                    className="jeevan-chandimal-navi-thq-dropdown-elm3 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-navi-thq-dropdown-toggle-elm13"
                    >
                      <Link href="/work-animation">
                        <a className="jeevan-chandimal-navi-link14 thq-link thq-body-small">
                          {props.text19 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text17">
                                Animation
                              </span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li
                    data-thq="thq-dropdown"
                    className="jeevan-chandimal-navi-thq-dropdown-elm4 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-navi-thq-dropdown-toggle-elm14"
                    >
                      <Link href="/work-photography">
                        <a className="jeevan-chandimal-navi-link15 thq-link thq-body-small">
                          {props.text191 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text20">
                                Photography
                              </span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>

              {/* SERVICES */}
              <div
                data-thq="thq-dropdown"
                className="jeevan-chandimal-navi-thq-dropdown2 list-item"
              >
                <div
                  data-thq="thq-dropdown-toggle"
                  className="jeevan-chandimal-navi-thq-dropdown-toggle-elm15"
                  onClick={toggleDropdown2}
                >
                  <Link href="/services">
                    <a className="jeevan-chandimal-navi-link16 thq-link thq-body-small">
                      {props.text161 ?? (
                        <Fragment>
                          <span className="jeevan-chandimal-navi-text19">
                            Services
                          </span>
                        </Fragment>
                      )}
                    </a>
                  </Link>
                  <div
                    data-thq="thq-dropdown-arrow"
                    className="jeevan-chandimal-navi-thq-dropdown-arrow-elm2"
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      className="jeevan-chandimal-navi-icon12"
                    >
                      <path d="M426 726v-428l214 214z"></path>
                    </svg>
                  </div>
                </div>

                <ul
                  data-thq="thq-dropdown-list"
                  className={`jeevan-chandimal-navi-thq-dropdown-list-elm2 ${
                    dropdown2Open ? 'teleport-show' : ''
                  }`}
                >
                  <li
                    data-thq="thq-dropdown"
                    className="jeevan-chandimal-navi-thq-dropdown-elm5 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-navi-thq-dropdown-toggle-elm16"
                    >
                      <Link href="/services-film-production">
                        <a className="jeevan-chandimal-navi-link17 thq-link thq-body-small">
                          {props.text171 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text21">
                                Film Production
                              </span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li
                    data-thq="thq-dropdown"
                    className="jeevan-chandimal-navi-thq-dropdown-elm6 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-navi-thq-dropdown-toggle-elm17"
                    >
                      <Link href="/services-audio">
                        <a className="jeevan-chandimal-navi-link18 thq-link thq-body-small">
                          {props.text181 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text24">
                                Audio Production
                              </span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li
                    data-thq="thq-dropdown"
                    className="jeevan-chandimal-navi-thq-dropdown-elm7 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-navi-thq-dropdown-toggle-elm18"
                    >
                      <Link href="/services-animation">
                        <a className="jeevan-chandimal-navi-link19 thq-link thq-body-small">
                          {props.text192 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text10">
                                Animation &amp; Motion
                              </span>
                            </Fragment>
                          )}
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li
                    data-thq="thq-dropdown"
                    className="jeevan-chandimal-navi-thq-dropdown-elm8 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-navi-thq-dropdown-toggle-elm19"
                    >
                      <Link href="/services-photography">
                        <a className="jeevan-chandimal-navi-link20 thq-link thq-body-small">
                          {props.text1911 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-navi-text15">
                                Photography
                              </span>
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
                      <span className="jeevan-chandimal-navi-text16">
                        Membership
                      </span>
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
                      <span className="jeevan-chandimal-navi-text26">
                        Contact
                      </span>
                    </Fragment>
                  )}
                </a>
              </Link>
            </nav>

            <div className="jeevan-chandimal-navi-thq-buttons-elm">
              {/* ✅ MEMBER BADGE */}
              {memberPlan && (
                <span className="member-badge">{String(memberPlan).toUpperCase()}</span>
              )}

              <Link href="/login">
                <a className="jeevan-chandimal-navi-link25">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="jeevan-chandimal-navi-icon14 thq-link thq-body-small"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="28"
                      strokeDashoffset="28"
                    >
                      <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
                        <animate
                          dur="0.4s"
                          fill="freeze"
                          values="28;0"
                          attributeName="stroke-dashoffset"
                        ></animate>
                      </path>
                      <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
                        <animate
                          dur="0.4s"
                          fill="freeze"
                          begin="0.5s"
                          values="28;0"
                          attributeName="stroke-dashoffset"
                        ></animate>
                      </path>
                    </g>
                  </svg>
                </a>
              </Link>
            </div>
          </div>

          <div
            data-thq="thq-burger-menu"
            onClick={() => setMobileMenuOpen(true)}
            className="jeevan-chandimal-navi-thq-burger-menu-elm"
          >
            <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon20">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z" />
            </svg>
          </div>

          <div
            data-thq="thq-mobile-menu"
            className={`jeevan-chandimal-navi-thq-mobile-menu-elm ${
              mobileMenuOpen ? 'teleport-show' : ''
            }`}
          >
            <div className="jeevan-chandimal-navi-thq-nav-elm">
              <div className="jeevan-chandimal-navi-thq-top-elm">
                <img
                  alt={props.logoAlt}
                  src={props.logoSrc}
                  className="jeevan-chandimal-navi-thq-logo-elm"
                />
                <div
                  data-thq="thq-close-menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="jeevan-chandimal-navi-thq-close-menu-elm"
                >
                  <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon22">
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
            </div>

            <div className="jeevan-chandimal-navi-thq-icon-group-elm">
              <svg viewBox="0 0 950.8571428571428 1024" className="thq-icon-small">
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg viewBox="0 0 877.7142857142857 1024" className="thq-icon-small">
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286 25.143-50.286 33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg viewBox="0 0 602.2582857142856 1024" className="thq-icon-small">
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </header>
      </header>

      <style jsx>
        {`
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
            padding-top: var(--dl-layout-space-twounits);
            padding-left: var(--dl-layout-space-threeunits);
            padding-right: var(--dl-layout-space-threeunits);
            padding-bottom: var(--dl-layout-space-twounits);
            justify-content: space-between;
          }
          .jeevan-chandimal-navi-thq-image1-elm {
            height: 3rem;
            transition: 0.3s;
          }

          .jeevan-chandimal-navi-thq-desktop-menu-elm {
            flex: 1;
            display: flex;
            justify-content: space-between;
          }
          .jeevan-chandimal-navi-thq-links-elm1 {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
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
          }

          /* ✅ Make TeleportHQ show classes work */
          :global(.teleport-show) {
            display: flex !important;
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
        `}
      </style>
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
  link2Url: PropTypes.string,
  link5Url: PropTypes.string,
  text181: PropTypes.element,
  link4: PropTypes.element,
  link511: PropTypes.element,
}

export default JeevanChandimalNavi
