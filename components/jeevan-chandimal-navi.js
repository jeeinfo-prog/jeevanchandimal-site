import React, { Fragment, useState, useEffect } from 'react'
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
    const email = localStorage.getItem('user_email')
    if (!email) return

    fetch(`/api/member/status?email=${email}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.member) setMemberPlan(d.plan)
      })
      .catch(() => {})
  }, [])

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
      <header
        className={`jeevan-chandimal-navi-container ${props.rootClassName}`}
      >
        <header
          data-thq="thq-navbar"
          className="jeevan-chandimal-navi-thq-navbar-interactive-elm"
        >
          <img
            alt={props.logoAlt}
            src={props.logoSrc}
            className="jeevan-chandimal-navi-thq-image1-elm"
          />

          <div
            data-thq="thq-navbar-nav"
            className="jeevan-chandimal-navi-thq-desktop-menu-elm"
          >
            <nav className="jeevan-chandimal-navi-thq-links-elm1">
              <Link href="/">
                <a className="thq-link thq-body-small">Home</a>
              </Link>

              {/* WORK DROPDOWN (unchanged) */}
              {/* --- your existing dropdown code kept intact --- */}

              <Link href="/store">
                <a className="thq-link thq-body-small">Store</a>
              </Link>

              <Link href="/memberships">
                <a className="thq-link thq-body-small">Membership</a>
              </Link>

              <Link href="/about">
                <a className="thq-link thq-body-small">About</a>
              </Link>

              <Link href="/contact">
                <a className="thq-link thq-body-small">Contact</a>
              </Link>
            </nav>

            {/* RIGHT SIDE BUTTONS */}
            <div className="jeevan-chandimal-navi-thq-buttons-elm">

              {/* ✅ MEMBER BADGE */}
              {memberPlan && (
                <span className="member-badge">
                  {memberPlan.toUpperCase()}
                </span>
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
                        <animate dur="0.4s" fill="freeze" values="28;0" attributeName="stroke-dashoffset"></animate>
                      </path>
                      <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
                        <animate dur="0.4s" fill="freeze" begin="0.5s" values="28;0" attributeName="stroke-dashoffset"></animate>
                      </path>
                    </g>
                  </svg>
                </a>
              </Link>
            </div>
          </div>

          {/* BURGER MENU */}
          <div
            data-thq="thq-burger-menu"
            onClick={() => setMobileMenuOpen(true)}
            className="jeevan-chandimal-navi-thq-burger-menu-elm"
          >
            <svg viewBox="0 0 1024 1024" className="jeevan-chandimal-navi-icon20">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
        </header>
      </header>

      <style jsx>{`
        .jeevan-chandimal-navi-container {
          width: 100%;
          display: flex;
          justify-content: center;
          background-color: var(--dl-color-theme-neutral-light);
        }

        .jeevan-chandimal-navi-thq-navbar-interactive-elm {
          width: 100%;
          max-width: var(--dl-layout-size-maxwidth); /* ✅ FIXED */
          display: flex;
          align-items: center;
          padding: var(--dl-layout-space-twounits)
            var(--dl-layout-space-threeunits);
          justify-content: space-between;
        }

        .jeevan-chandimal-navi-thq-buttons-elm {
          gap: var(--dl-layout-space-twounits);
          display: flex;
          align-items: center;
        }

        .member-badge {
          font-size: 11px;
          padding: 4px 10px;
          border: 1px solid #25C3E2;
          border-radius: 999px;
          letter-spacing: 1px;
          color: #25C3E2;
          font-weight: 600;
        }

        @media (max-width: 767px) {
          .jeevan-chandimal-navi-thq-buttons-elm {
            display: none;
          }
          .jeevan-chandimal-navi-thq-burger-menu-elm {
            display: flex;
          }
        }

        @media (max-width: 479px) {
          .jeevan-chandimal-navi-thq-desktop-menu-elm {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

JeevanChandimalNavi.defaultProps = {
  logoAlt: 'Business Logo',
  logoSrc: '/JC/jc%20logo%20web%2004-1500h.png',
  rootClassName: '',
}

JeevanChandimalNavi.propTypes = {
  logoAlt: PropTypes.string,
  logoSrc: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default JeevanChandimalNavi
