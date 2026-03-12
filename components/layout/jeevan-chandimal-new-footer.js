// components/jeevan-chandimal-new-footer.js
import React, { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const JeevanChandimalNewFooter = (props) => {
  const footerRef = useRef(null)
  const router = useRouter()

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  const isActive = (href) => {
    const p = router?.pathname || ''
    if (href === '/') return p === '/'
    return p === href || p.startsWith(href + '/')
  }

  useEffect(() => {
    const root = footerRef.current
    if (!root) return

    const dropdowns = Array.from(root.querySelectorAll('[data-thq="thq-dropdown"]'))

    const closeAllExcept = (exceptList) => {
      dropdowns.forEach((dd) => {
        const list = dd.querySelector('[data-thq="thq-dropdown-list"]')
        const arrow = dd.querySelector('[data-thq="thq-dropdown-arrow"]')
        if (!list) return

        if (!exceptList || list !== exceptList) {
          list.classList.remove('teleport-show')
          arrow?.classList.remove('teleport-rotate')
        }
      })
    }

    const handlers = []

    dropdowns.forEach((dd) => {
      const list = dd.querySelector('[data-thq="thq-dropdown-list"]')
      const arrow = dd.querySelector('[data-thq="thq-dropdown-arrow"]')
      if (!list || !arrow) return

      const onToggle = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const willOpen = !list.classList.contains('teleport-show')
        closeAllExcept(list)

        if (willOpen) {
          list.classList.add('teleport-show')
          arrow.classList.add('teleport-rotate')
        } else {
          list.classList.remove('teleport-show')
          arrow.classList.remove('teleport-rotate')
        }
      }

      const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onToggle(e)
        }
      }

      arrow.addEventListener('click', onToggle)
      arrow.addEventListener('keydown', onKeyDown)

      handlers.push(() => {
        arrow.removeEventListener('click', onToggle)
        arrow.removeEventListener('keydown', onKeyDown)
      })
    })

    const onDocClick = (e) => {
      if (!root.contains(e.target)) closeAllExcept(null)
    }

    document.addEventListener('click', onDocClick)
    handlers.push(() => document.removeEventListener('click', onDocClick))

    return () => handlers.forEach((fn) => fn())
  }, [])

  const SocialLink = ({ href, label, children }) => {
    if (!href) return null
    return (
      <a
        className="jcSocialBtn"
        href={href}
        aria-label={label}
        title={label}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <footer ref={footerRef} className={`jcFooter ${props.rootClassName || ''}`}>
        <div className="jcGlow jcGlowOne" />
        <div className="jcGlow jcGlowTwo" />

        <div className="jcInner">
          <div className="jcTop">
            <div className="jcBrandWrap">
              <Link href="/">
                <a className="jcBrand" aria-label="Home">
                  <img alt={props.logoAlt} src={props.logoSrc} className="jcLogo" />
                </a>
              </Link>

              <div className="jcBrandText">
                <div className="jcEyebrow">Visual Storytelling</div>
                <p className="jcBrandDesc">
                  Cinematic filmmaking, photography, motion, and audio crafted with depth,
                  atmosphere, and intention.
                </p>
              </div>
            </div>

            <nav className="jcNav" aria-label="Footer navigation">
              <Link href="/">
                <a className={`jcLink ${isActive('/') ? 'isActive' : ''}`}>Home</a>
              </Link>

              <div data-thq="thq-dropdown" className="jcDrop">
                <div data-thq="thq-dropdown-toggle" className="jcDropToggle">
                  <Link href="/work">
                    <a className={`jcLink ${isActive('/work') ? 'isActive' : ''}`}>Work</a>
                  </Link>

                  <div
                    data-thq="thq-dropdown-arrow"
                    className="jcArrow"
                    role="button"
                    tabIndex={0}
                    aria-label="Toggle Work"
                  >
                    <svg viewBox="0 0 1024 1024" className="jcArrowSvg" aria-hidden="true">
                      <path d="M426 726v-428l214 214z" />
                    </svg>
                  </div>
                </div>

                <ul data-thq="thq-dropdown-list" className="jcMenu">
                  <li>
                    <Link href="/work-film">
                      <a className={`jcMenuItem ${isActive('/work-film') ? 'isActiveItem' : ''}`}>
                        Film
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/work-audio">
                      <a className={`jcMenuItem ${isActive('/work-audio') ? 'isActiveItem' : ''}`}>
                        Audio
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/work-animation">
                      <a className={`jcMenuItem ${isActive('/work-animation') ? 'isActiveItem' : ''}`}>
                        Animation
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/work-photography">
                      <a
                        className={`jcMenuItem ${isActive('/work-photography') ? 'isActiveItem' : ''}`}
                      >
                        Photography
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div data-thq="thq-dropdown" className="jcDrop">
                <div data-thq="thq-dropdown-toggle" className="jcDropToggle">
                  <Link href="/services">
                    <a className={`jcLink ${isActive('/services') ? 'isActive' : ''}`}>Services</a>
                  </Link>

                  <div
                    data-thq="thq-dropdown-arrow"
                    className="jcArrow"
                    role="button"
                    tabIndex={0}
                    aria-label="Toggle Services"
                  >
                    <svg viewBox="0 0 1024 1024" className="jcArrowSvg" aria-hidden="true">
                      <path d="M426 726v-428l214 214z" />
                    </svg>
                  </div>
                </div>

                <ul data-thq="thq-dropdown-list" className="jcMenu">
                  <li>
                    <Link href="/services-film-production">
                      <a
                        className={`jcMenuItem ${
                          isActive('/services-film-production') ? 'isActiveItem' : ''
                        }`}
                      >
                        Film Production
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-audio">
                      <a className={`jcMenuItem ${isActive('/services-audio') ? 'isActiveItem' : ''}`}>
                        Audio Production
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-animation">
                      <a
                        className={`jcMenuItem ${
                          isActive('/services-animation') ? 'isActiveItem' : ''
                        }`}
                      >
                        Animation &amp; Motion
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-photography">
                      <a
                        className={`jcMenuItem ${
                          isActive('/services-photography') ? 'isActiveItem' : ''
                        }`}
                      >
                        Photography
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <Link href="/store">
                <a className={`jcLink ${isActive('/store') ? 'isActive' : ''}`}>Store</a>
              </Link>

              <Link href="/memberships">
                <a className={`jcLink ${isActive('/memberships') ? 'isActive' : ''}`}>Membership</a>
              </Link>

              <Link href="/about">
                <a className={`jcLink ${isActive('/about') ? 'isActive' : ''}`}>About</a>
              </Link>

              <Link href="/contact">
                <a className={`jcLink ${isActive('/contact') ? 'isActive' : ''}`}>Contact</a>
              </Link>
            </nav>

            <div className="jcSocialWrap">
              <div className="jcSocialLabel">Connect</div>
              <div className="jcSocial" aria-label="Social links">
                <SocialLink href={props.facebookUrl} label="Facebook">
                  <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.6 1.7-1.6h1.4V4.8c-.2 0-1.2-.1-2.3-.1c-2.3 0-3.9 1.4-3.9 4V11H7.9v3h2.5v8h3.1z"
                    />
                  </svg>
                </SocialLink>

                <SocialLink href={props.instagramUrl} label="Instagram">
                  <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6zm5.2-.9a1.1 1.1 0 1 1 0 2.2a1.1 1.1 0 0 1 0-2.2z"
                    />
                  </svg>
                </SocialLink>

                <SocialLink href={props.xUrl} label="X">
                  <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M18.3 2H21l-6.9 7.9L22 22h-6.7l-5.2-6.8L4.2 22H2l7.4-8.5L2 2h6.9l4.7 6.2L18.3 2zm-1.2 18h1.5L7.7 3.9H6.1L17.1 20z"
                    />
                  </svg>
                </SocialLink>

                <SocialLink href={props.linkedinUrl} label="LinkedIn">
                  <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M6 6.8A2.4 2.4 0 1 1 6 2a2.4 2.4 0 0 1 0 4.8zM4.6 22V9H7.4v13H4.6zM9.3 9H12v1.8h.1c.4-.8 1.5-2 3.4-2c3 0 3.6 2 3.6 4.7V22h-2.8v-7.1c0-1.7 0-3.8-2.3-3.8c-2.3 0-2.7 1.8-2.7 3.7V22H9.3V9z"
                    />
                  </svg>
                </SocialLink>

                <SocialLink href={props.youtubeUrl} label="YouTube">
                  <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M21.8 8.1a3 3 0 0 0-2.1-2.1C17.9 5.5 12 5.5 12 5.5s-5.9 0-7.7.5A3 3 0 0 0 2.2 8.1A31.2 31.2 0 0 0 1.8 12c0 1.3.1 2.6.4 3.9a3 3 0 0 0 2.1 2.1c1.8.5 7.7.5 7.7.5s5.9 0 7.7-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.6.4-3.9c0-1.3-.1-2.6-.4-3.9zM10 15.2V8.8L15.5 12L10 15.2z"
                    />
                  </svg>
                </SocialLink>
              </div>
            </div>
          </div>

          <div className="jcDivider" />

          <div className="jcBottom">
            <div className="jcLegalLinks">
              <Link href="/privacy-policy">
                <a className="jcLegal">Privacy Policy</a>
              </Link>
              <Link href="/terms-and-conditions">
                <a className="jcLegal">Terms &amp; Conditions</a>
              </Link>
              <Link href="/refund-policy">
                <a className="jcLegal">Refund Policy</a>
              </Link>
              <Link href="/cookies-policy">
                <a className="jcLegal">Cookies Policy</a>
              </Link>
            </div>

            <div className="jcBottomMeta">
              <div className="jcCopy">© {currentYear} Jeevan Chandimal. All rights reserved.</div>
              <div className="jcLastLine">
                Payments are processed securely via trusted third-party gateways such as
                PayHere. We do not store card details.
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .jcFooter {
          position: relative;
          z-index: 30;
          width: 100%;
          overflow: visible;
          padding: 48px 20px 28px;
          background:
            radial-gradient(circle at top left, rgba(37, 195, 226, 0.08), transparent 32%),
            radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.04), transparent 28%),
            linear-gradient(180deg, rgba(20, 20, 20, 0.96), rgba(8, 8, 8, 0.98));
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(14px);
        }

        .jcGlow {
          position: absolute;
          pointer-events: none;
          border-radius: 999px;
          filter: blur(70px);
          opacity: 0.35;
        }

        .jcGlowOne {
          top: -30px;
          left: -60px;
          width: 180px;
          height: 180px;
          background: rgba(37, 195, 226, 0.08);
        }

        .jcGlowTwo {
          right: -40px;
          bottom: -40px;
          width: 160px;
          height: 160px;
          background: rgba(255, 255, 255, 0.04);
        }

        .jcInner {
          position: relative;
          max-width: var(--dl-layout-size-maxwidth);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .jcTop {
          display: grid;
          grid-template-columns: minmax(240px, 320px) 1fr minmax(180px, 240px);
          align-items: start;
          gap: 28px;
          padding-bottom: 70px;
        }

        .jcBrandWrap {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .jcBrand {
          display: inline-flex;
          align-items: center;
          text-decoration: none !important;
          width: fit-content;
        }

        .jcLogo {
          height: 48px;
          width: auto;
          display: block;
          filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.35));
        }

        .jcBrandText {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .jcEyebrow {
          color: rgba(255, 255, 255, 0.6);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .jcBrandDesc {
          margin: 0;
          color: rgba(245, 244, 244, 0.78);
          line-height: 1.7;
          font-size: 13px;
          max-width: 280px;
        }

        .jcNav {
          display: flex;
          align-items: center;
          justify-content: center;
          align-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .jcLink {
          height: 36px;
          padding: 0 14px;
          border-radius: 999px;
          color: rgba(245, 244, 244, 0.9);
          text-decoration: none !important;
          font-size: 14px;
          letter-spacing: 0.02em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          border: 1px solid transparent;
          background: transparent;
          transition:
            color 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease,
            opacity 0.2s ease;
        }

        .jcLink:hover {
          color: #25c3e2 !important;
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }

        .isActive {
          color: #25c3e2 !important;
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.18), rgba(37, 195, 226, 0.08));
          border: 1px solid rgba(37, 195, 226, 0.18);
          box-shadow: 0 10px 30px rgba(37, 195, 226, 0.08);
          font-weight: 600;
        }

        .jcDrop {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .jcDropToggle {
          height: 36px;
          padding: 0 10px 0 0;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .jcDropToggle:hover .jcLink {
          color: #25c3e2 !important;
        }

        .jcArrow {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: background 0.18s ease;
        }

        .jcArrow:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .jcArrowSvg {
          width: 15px;
          height: 15px;
          fill: rgba(245, 244, 244, 0.82);
          transition: transform 0.18s ease, fill 0.18s ease;
        }

        .jcDrop:hover .jcArrowSvg,
        .teleport-rotate .jcArrowSvg {
          transform: rotate(90deg);
          fill: #25c3e2;
        }

        .jcMenu {
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          min-width: 230px;
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 10px;
          margin: 0;
          list-style: none;
          background: rgba(10, 10, 10, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(12px);
          z-index: 999999;
        }

        .jcMenu::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: -12px;
          height: 12px;
        }

        .teleport-show {
          display: flex !important;
        }

        .jcMenuItem {
          display: block;
          padding: 11px 12px;
          border-radius: 12px;
          text-decoration: none !important;
          color: rgba(245, 244, 244, 0.9);
          font-size: 14px;
          border: 1px solid transparent;
          transition:
            background 0.18s ease,
            color 0.18s ease,
            border-color 0.18s ease,
            transform 0.18s ease;
        }

        .jcMenuItem:hover {
          color: #25c3e2 !important;
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          transform: translateX(1px);
        }

        .isActiveItem {
          color: #25c3e2 !important;
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.18), rgba(37, 195, 226, 0.08));
          border: 1px solid rgba(37, 195, 226, 0.15);
          font-weight: 600;
        }

        @media (min-width: 992px) {
          .jcDrop:hover .jcMenu,
          .jcDrop .jcMenu:hover {
            display: flex;
          }
        }

        .jcSocialWrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .jcSocialLabel {
          color: rgba(255, 255, 255, 0.6);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .jcSocial {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          flex-wrap: wrap;
        }

        .jcSocialBtn {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(245, 244, 244, 0.92);
          text-decoration: none !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
          transition:
            transform 0.18s ease,
            background 0.18s ease,
            border-color 0.18s ease,
            color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .jcSocialBtn:hover {
          transform: translateY(-2px);
          background: linear-gradient(180deg, rgba(37, 195, 226, 0.12), rgba(37, 195, 226, 0.06));
          border-color: rgba(37, 195, 226, 0.28);
          color: #25c3e2;
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
        }

        .jcSocialSvg {
          width: 18px;
          height: 18px;
        }

        .jcDivider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.12),
            rgba(255, 255, 255, 0)
          );
        }

        .jcBottom {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          text-align: center;
        }

        .jcLegalLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          align-items: center;
        }

        .jcLegal {
          color: rgba(245, 244, 244, 0.82);
          text-decoration: none !important;
          font-size: 13px;
          transition: color 0.18s ease, opacity 0.18s ease;
        }

        .jcLegal:hover {
          color: #25c3e2;
          opacity: 1;
        }

        .jcBottomMeta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }

        .jcCopy {
          color: rgba(245, 244, 244, 0.9);
          font-size: 13px;
          letter-spacing: 0.02em;
        }

        .jcLastLine {
          max-width: 860px;
          color: rgba(245, 244, 244, 0.65);
          line-height: 1.7;
          font-size: 12.5px;
        }

        @media (max-width: 991px) {
          .jcTop {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
            padding-bottom: 72px;
          }

          .jcBrandWrap {
            align-items: center;
          }

          .jcBrandDesc {
            max-width: 560px;
          }

          .jcSocialWrap {
            align-items: center;
          }

          .jcSocial {
            justify-content: center;
          }

          .jcMenu {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        @media (max-width: 767px) {
          .jcFooter {
            padding: 42px 16px 26px;
          }

          .jcNav {
            gap: 10px;
          }

          .jcLink {
            height: 34px;
            padding: 0 12px;
            font-size: 13px;
          }

          .jcDropToggle {
            height: 34px;
          }

          .jcLogo {
            height: 42px;
          }
        }

        @media (max-width: 479px) {
          .jcMenu {
            min-width: 92vw;
          }

          .jcLegalLinks {
            gap: 10px 12px;
          }

          .jcSocialBtn {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </>
  )
}

JeevanChandimalNewFooter.defaultProps = {
  logoSrc: '/JC/jc%20logo%20web%2004-1500h.png',
  logoAlt: 'Jeevan Chandimal Logo',
  rootClassName: '',
  facebookUrl: 'https://web.facebook.com/jeevan.chandimal.2025',
  instagramUrl: 'https://www.instagram.com/jeeinfo/?hl=en',
  xUrl: '',
  linkedinUrl: 'https://www.linkedin.com/in/jeevanchandimal/',
  youtubeUrl: 'https://www.youtube.com/@jeevanchandimal8145',
}

JeevanChandimalNewFooter.propTypes = {
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  rootClassName: PropTypes.string,
  facebookUrl: PropTypes.string,
  instagramUrl: PropTypes.string,
  xUrl: PropTypes.string,
  linkedinUrl: PropTypes.string,
  youtubeUrl: PropTypes.string,
}

export default JeevanChandimalNewFooter