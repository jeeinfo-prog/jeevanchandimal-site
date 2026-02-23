// components/jeevan-chandimal-navi.js
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { readCart } from '../lib/cart'

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

// --- helpers ---
function isActivePath(router, href) {
  const asPath = (router.asPath || '').split('?')[0]
  if (asPath === href) return true
  if (href === '/') return asPath === '/'
  return asPath.startsWith(href + '/') || asPath.startsWith(href)
}

function safeEmailShort(email) {
  if (!email || typeof email !== 'string') return ''
  const [name, domain] = email.split('@')
  if (!domain) return email
  const dom = domain.length > 10 ? `${domain.slice(0, 9)}…` : domain
  const n = name.length > 12 ? `${name.slice(0, 11)}…` : name
  return `${n}@${dom}`
}

function ALink({ href, className, children, ...rest }) {
  return (
    <Link href={href} legacyBehavior>
      <a className={className} {...rest}>
        {children}
      </a>
    </Link>
  )
}

ALink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default function JeevanChandimalNavi({
  showMembershipPill = true,
  membershipHref = '/membership',
  brandHref = '/',
  brandImgSrc = '/logo.png',
  brandAlt = 'Jeevan Chandimal',
}) {
  const router = useRouter()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const load = () => {
      const em = window.localStorage.getItem('user_email') || ''
      setEmail(em)

      const cart = readCart()
      const count = Array.isArray(cart?.items)
        ? cart.items.reduce((n, it) => n + (Number(it.qty) || 1), 0)
        : 0
      setCartCount(count)
    }

    load()

    const onStorage = () => load()
    window.addEventListener('storage', onStorage)

    // Optional custom event if you dispatch it after cart changes
    const onCart = () => load()
    window.addEventListener('jc_cart_updated', onCart)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('jc_cart_updated', onCart)
    }
  }, [])

  useEffect(() => {
    const handle = () => setMobileOpen(false)
    if (router?.events?.on) router.events.on('routeChangeComplete', handle)
    return () => {
      if (router?.events?.off) router.events.off('routeChangeComplete', handle)
    }
  }, [router])

  const rightEmailLabel = useMemo(() => safeEmailShort(email), [email])

  const handleLogout = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('user_email')
        window.localStorage.removeItem('member_status')
        window.localStorage.removeItem('member_plan')
        window.localStorage.removeItem('member_expires_at')
        setEmail('')
      }
    } catch {}
    router.push('/')
  }

  const primaryLinks = [
    { href: '/store', label: 'Store' },
    { href: '/collections', label: 'Collections' },
  ]

  return (
    <>
      <header className="navWrap">
        <div className="navShell">
          {/* Brand */}
          <ALink href={brandHref} className="brand" aria-label="Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brandLogo" src={brandImgSrc} alt={brandAlt} />
          </ALink>

          {/* Desktop links */}
          <nav className="navLinks" aria-label="Primary">
            {primaryLinks.map((it) => {
              const active = isActivePath(router, it.href)
              return (
                <ALink key={it.href} href={it.href} className={`navLink ${active ? 'active' : ''}`}>
                  {it.label}
                </ALink>
              )
            })}

            <div className="navGroup">
              <span className="navGroupLabel">Work</span>
              <div className="navGroupMenu">
                {NAV.work.map((it) => {
                  const active = isActivePath(router, it.href)
                  return (
                    <ALink
                      key={it.href}
                      href={it.href}
                      className={`navDropLink ${active ? 'active' : ''}`}
                    >
                      {it.label}
                    </ALink>
                  )
                })}
              </div>
            </div>

            <div className="navGroup">
              <span className="navGroupLabel">Services</span>
              <div className="navGroupMenu">
                {NAV.services.map((it) => {
                  const active = isActivePath(router, it.href)
                  return (
                    <ALink
                      key={it.href}
                      href={it.href}
                      className={`navDropLink ${active ? 'active' : ''}`}
                    >
                      {it.label}
                    </ALink>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* Right pills */}
          <div className="rightPills">
            <ALink href="/cart" className="pillBase pillLink" aria-label="Cart">
              <span className="pillText">Cart</span>
              {cartCount > 0 ? <span className="pillBadge">{cartCount}</span> : null}
            </ALink>

            {showMembershipPill ? (
              <ALink href={membershipHref} className="pillBase pillLink pillAccent">
                <span className="pillText">MONTHLY</span>
              </ALink>
            ) : null}

            {email ? (
              <span className="pillBase pillStatic" title={email}>
                <span className="pillText">{rightEmailLabel}</span>
              </span>
            ) : null}

            {email ? (
              <button type="button" className="pillBase pillBtn" onClick={handleLogout}>
                <span className="pillText">Logout</span>
              </button>
            ) : (
              <ALink href="/login" className="pillBase pillLink">
                <span className="pillText">Login</span>
              </ALink>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="burger"
            aria-label="Menu"
            aria-expanded={mobileOpen ? 'true' : 'false'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="burgerLine" />
            <span className="burgerLine" />
            <span className="burgerLine" />
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen ? (
          <div className="mobileMenu" role="dialog" aria-label="Mobile menu">
            <div className="mobileInner">
              <div className="mobileSection">
                {primaryLinks.map((it) => {
                  const active = isActivePath(router, it.href)
                  return (
                    <ALink
                      key={it.href}
                      href={it.href}
                      className={`mobileLink ${active ? 'active' : ''}`}
                    >
                      {it.label}
                    </ALink>
                  )
                })}
              </div>

              <div className="mobileSection">
                <div className="mobileTitle">Work</div>
                {NAV.work.map((it) => {
                  const active = isActivePath(router, it.href)
                  return (
                    <ALink
                      key={it.href}
                      href={it.href}
                      className={`mobileLink ${active ? 'active' : ''}`}
                    >
                      {it.label}
                    </ALink>
                  )
                })}
              </div>

              <div className="mobileSection">
                <div className="mobileTitle">Services</div>
                {NAV.services.map((it) => {
                  const active = isActivePath(router, it.href)
                  return (
                    <ALink
                      key={it.href}
                      href={it.href}
                      className={`mobileLink ${active ? 'active' : ''}`}
                    >
                      {it.label}
                    </ALink>
                  )
                })}
              </div>

              <div className="mobileSection">
                <ALink href="/cart" className="mobileLink">
                  Cart {cartCount > 0 ? `(${cartCount})` : ''}
                </ALink>

                {showMembershipPill ? (
                  <ALink href={membershipHref} className="mobileLink">
                    MONTHLY
                  </ALink>
                ) : null}

                {email ? (
                  <>
                    <div className="mobileMeta" title={email}>
                      {email}
                    </div>
                    <button type="button" className="mobileBtn" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <ALink href="/login" className="mobileLink">
                    Login
                  </ALink>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <style jsx>{`
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
          max-width: var(--dl-layout-size-maxwidth, 1200px);
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
          gap: 14px;
          min-width: 0;
        }

        .navLink {
          color: rgba(255, 255, 255, 0.86);
          text-decoration: none;
          font-size: 14px;
          padding: 8px 10px;
          border-radius: 10px;
          transition: background 0.15s ease, color 0.15s ease;
          white-space: nowrap;
        }

        .navLink:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        /* Active highlight BLUE */
        .navLink.active {
          color: #4da3ff;
          background: rgba(77, 163, 255, 0.14);
        }

        .navGroup {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .navGroupLabel {
          color: rgba(255, 255, 255, 0.86);
          font-size: 14px;
          padding: 8px 10px;
          border-radius: 10px;
          cursor: default;
          user-select: none;
        }

        .navGroup:hover .navGroupLabel {
          background: rgba(255, 255, 255, 0.06);
        }

        .navGroupMenu {
          position: absolute;
          top: 42px;
          left: 0;
          min-width: 220px;
          padding: 8px;
          border-radius: 14px;
          background: rgba(18, 18, 18, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          display: none;
        }

        .navGroup:hover .navGroupMenu {
          display: block;
        }

        .navDropLink {
          display: block;
          padding: 10px 10px;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.86);
          text-decoration: none;
          font-size: 14px;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .navDropLink:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .navDropLink.active {
          color: #4da3ff;
          background: rgba(77, 163, 255, 0.14);
        }

        /* ========= RIGHT PILLS ========= */
        .rightPills {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          flex: 0 0 auto;
          margin-top: 1px; /* slight optical align */
        }

        .pillBase {
          height: 32px; /* ✅ reduced height */
          border-radius: 999px;
          padding: 0 12px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          line-height: 1;
          letter-spacing: 0.2px;
          white-space: nowrap;
          user-select: none;
          box-sizing: border-box;
        }

        .pillText {
          display: inline-flex;
          align-items: center;
          line-height: 1;
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
          line-height: 1;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .pillLink {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.88);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: background 0.15s ease, border-color 0.15s ease,
            transform 0.05s ease;
        }

        .pillBtn {
          appearance: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.88);
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease,
            transform 0.05s ease;
        }

        .pillStatic {
          color: rgba(255, 255, 255, 0.86);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 220px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pillLink:hover,
        .pillBtn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.16);
        }

        .pillLink:active,
        .pillBtn:active {
          transform: translateY(1px);
        }

        .pillAccent {
          background: rgba(77, 163, 255, 0.16);
          border-color: rgba(77, 163, 255, 0.22);
          color: #d8ecff;
        }

        .pillAccent:hover {
          background: rgba(77, 163, 255, 0.22);
          border-color: rgba(77, 163, 255, 0.28);
        }

        /* ========= MOBILE ========= */
        .burger {
          display: inline-flex;
          flex-direction: column;
          gap: 5px;
          width: 40px;
          height: 36px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.06);
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .burgerLine {
          width: 18px;
          height: 2px;
          background: rgba(255, 255, 255, 0.82);
          border-radius: 2px;
        }

        .mobileMenu {
          display: block;
          border-top: 1px solid rgba(245, 244, 244, 0.08);
          background: rgba(20, 20, 20, 0.9);
          backdrop-filter: blur(12px);
        }

        .mobileInner {
          max-width: var(--dl-layout-size-maxwidth, 1200px);
          margin: 0 auto;
          padding: 12px 18px 18px;
          display: grid;
          gap: 12px;
        }

        .mobileSection {
          padding: 10px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
        }

        .mobileTitle {
          font-size: 12px;
          opacity: 0.75;
          margin-bottom: 6px;
          letter-spacing: 0.2px;
        }

        .mobileLink {
          display: block;
          padding: 10px 10px;
          border-radius: 12px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.88);
          font-size: 14px;
        }

        .mobileLink:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .mobileLink.active {
          color: #4da3ff;
          background: rgba(77, 163, 255, 0.14);
        }

        .mobileMeta {
          padding: 10px 10px;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .mobileBtn {
          width: 100%;
          margin-top: 8px;
          height: 40px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
        }

        /* ========= RESPONSIVE ========= */
        @media (min-width: 980px) {
          .navLinks {
            display: flex;
          }
          .burger {
            display: none;
          }
          .mobileMenu {
            display: none;
          }
        }

        @media (max-width: 520px) {
          .pillStatic {
            max-width: 140px;
          }
        }
      `}</style>
    </>
  )
}

JeevanChandimalNavi.propTypes = {
  showMembershipPill: PropTypes.bool,
  membershipHref: PropTypes.string,
  brandHref: PropTypes.string,
  brandImgSrc: PropTypes.string,
  brandAlt: PropTypes.string,
}