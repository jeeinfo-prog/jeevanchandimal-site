// components/jeevan-chandimal-navi.js
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { readCart } from '../lib/cart' // ✅ safer than importing cartCount

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
  const [userEmail, setUserEmail] = useState('')

  // ✅ Cart count
  const [cartNum, setCartNum] = useState(0)

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
    }, 140)
  }

  // Close menus on route change
  useEffect(() => {
    if (!router?.events) return
    const onRoute = () => closeAll()
    router.events.on('routeChangeStart', onRoute)
    return () => router.events.off('routeChangeStart', onRoute)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.events])

  // ✅ Keep cart badge updated (same-tab + other tabs) — NO INTERVAL
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

  // Read local user + member plan
  useEffect(() => {
    if (typeof window === 'undefined') return

    const email = window.localStorage.getItem('user_email') || ''
    setUserEmail(email)

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
  }, [router.asPath])

  const logout = () => {
    try {
      window.localStorage.removeItem('user_email')
      window.localStorage.removeItem('member_plan')
    } catch (e) {}
    setUserEmail('')
    setMemberPlan(null)
    closeAll()
    router.push('/login')
  }

  // Parent + child active highlight
  const isActive = (href) => {
    if (!href) return false
    if (href === '/work') return router.pathname.startsWith('/work')
    if (href === '/services') return router.pathname.startsWith('/services')
    if (href === '/store') return router.pathname.startsWith('/store')
    if (href === '/cart') return router.pathname.startsWith('/cart')
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

  // Close desktop dropdowns if click outside
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
            <Link href="/memberships" legacyBehavior>
              <a className={`navLink ${activeClass('/memberships')}`}>Membership</a>
            </Link>
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

              {memberPlan ? (
                <span className="pill pillAccent">{String(memberPlan).toUpperCase()}</span>
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
              <Link href="/memberships" legacyBehavior>
                <a className={`mLink ${activeClass('/memberships')}`} onClick={closeAll}>
                  Membership
                </a>
              </Link>
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

              {memberPlan && <div className="mBadge">{String(memberPlan).toUpperCase()}</div>}

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

/* ✅ GRID LAYOUT: left / center / right */
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

/* ========= DESKTOP LINKS ========= */
.navLinks {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-width: 0;
}

/* ✅ pill shape like Login/Logout */
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
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  transition: background 0.18s ease, color 0.18s ease, opacity 0.18s ease;
}

/* ✅ hover = BLUE text */
.navLink:hover,
.dropLabel:hover {
  opacity: 1;
  background: rgba(245, 244, 244, 0.06);
  color: #25c3e2 !important;
}

/* ✅ active pill */
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

/* ========= DROPDOWN ========= */
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

/* ✅ Work/Services whole pill */
.dropToggle {
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  outline: none;
}

/* hover on container also turns text blue */
.dropToggle:hover .dropLabel {
  color: #25c3e2 !important;
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

/* ========= DROPDOWN MENU ========= */
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

/* ========= RIGHT ========= */
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

/* pill system */
.pill {
  height: 32px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 12px;
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

/* ========= MOBILE (unchanged) ========= */
.mOverlay {
  display: none;
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