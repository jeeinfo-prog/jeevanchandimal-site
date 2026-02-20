// components/jeevan-chandimal-new-footer.js
import React, { Fragment, useEffect, useRef } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const JeevanChandimalNewFooter = (props) => {
  const footerRef = useRef(null)

  useEffect(() => {
    const root = footerRef.current
    if (!root) return

    const dropdowns = Array.from(root.querySelectorAll('[data-thq="thq-dropdown"]'))

    const closeAllExcept = (exceptList) => {
      dropdowns.forEach((dd) => {
        const list = dd.querySelector('[data-thq="thq-dropdown-list"]')
        const arrow = dd.querySelector('[data-thq="thq-dropdown-arrow"]')
        if (list && list !== exceptList) {
          list.classList.remove('teleport-show')
          if (arrow) arrow.classList.remove('teleport-rotate')
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

      arrow.style.cursor = 'pointer'
      arrow.addEventListener('click', onToggle)
      handlers.push(() => arrow.removeEventListener('click', onToggle))
    })

    const onDocClick = (e) => {
      if (!root.contains(e.target)) closeAllExcept(null)
    }
    document.addEventListener('click', onDocClick)
    handlers.push(() => document.removeEventListener('click', onDocClick))

    return () => handlers.forEach((fn) => fn())
  }, [])

  return (
    <>
      <footer ref={footerRef} className={`jcFooter ${props.rootClassName || ''}`}>
        <div className="jcInner">
          {/* TOP ROW */}
          <div className="jcTop">
            <Link href="/">
              <a className="jcBrand" aria-label="Home">
                <img alt={props.logoAlt} src={props.logoSrc} className="jcLogo" />
              </a>
            </Link>

            <nav className="jcNav" aria-label="Footer navigation">
              <Link href="/"><a className="jcLink">Home</a></Link>

              {/* WORK */}
              <div data-thq="thq-dropdown" className="jcDrop">
                <div data-thq="thq-dropdown-toggle" className="jcDropToggle">
                  <Link href="/work"><a className="jcLink">Work</a></Link>
                  <div data-thq="thq-dropdown-arrow" className="jcArrow" role="button" tabIndex={0} aria-label="Toggle Work">
                    <svg viewBox="0 0 1024 1024" className="jcArrowSvg" aria-hidden="true">
                      <path d="M426 726v-428l214 214z"></path>
                    </svg>
                  </div>
                </div>

                <ul data-thq="thq-dropdown-list" className="jcMenu">
                  <li><Link href="/work-film"><a className="jcMenuItem">Film</a></Link></li>
                  <li><Link href="/work-audio"><a className="jcMenuItem">Audio</a></Link></li>
                  <li><Link href="/work-animation"><a className="jcMenuItem">Animation</a></Link></li>
                  <li><Link href="/work-photography"><a className="jcMenuItem">Photography</a></Link></li>
                </ul>
              </div>

              {/* SERVICES */}
              <div data-thq="thq-dropdown" className="jcDrop">
                <div data-thq="thq-dropdown-toggle" className="jcDropToggle">
                  <Link href="/services"><a className="jcLink">Services</a></Link>
                  <div data-thq="thq-dropdown-arrow" className="jcArrow" role="button" tabIndex={0} aria-label="Toggle Services">
                    <svg viewBox="0 0 1024 1024" className="jcArrowSvg" aria-hidden="true">
                      <path d="M426 726v-428l214 214z"></path>
                    </svg>
                  </div>
                </div>

                <ul data-thq="thq-dropdown-list" className="jcMenu">
                  <li><Link href="/services-film-production"><a className="jcMenuItem">Film Production</a></Link></li>
                  <li><Link href="/services-audio"><a className="jcMenuItem">Audio Production</a></Link></li>
                  <li><Link href="/services-animation"><a className="jcMenuItem">Animation &amp; Motion</a></Link></li>
                  <li><Link href="/services-photography"><a className="jcMenuItem">Photography</a></Link></li>
                </ul>
              </div>

              <Link href="/store"><a className="jcLink">Store</a></Link>
              <Link href="/memberships"><a className="jcLink">Membership</a></Link>
              <Link href="/about"><a className="jcLink">About</a></Link>
              <Link href="/contact"><a className="jcLink">Contact</a></Link>
            </nav>

            {/* SOCIAL ICONS (nice, same size) */}
            <div className="jcSocial" aria-label="Social links">
              {/* You can wrap each in <a href="..."> later when you have URLs */}
              <span className="jcSocialBtn" title="Facebook" aria-label="Facebook">
                <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89c1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"
                  />
                </svg>
              </span>

              <span className="jcSocialBtn" title="Instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6zm5.2-.9a1.1 1.1 0 1 1 0 2.2a1.1 1.1 0 0 1 0-2.2z"
                  />
                </svg>
              </span>

              <span className="jcSocialBtn" title="X" aria-label="X">
                <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M18.3 2H21l-6.9 7.9L22 22h-6.7l-5.2-6.8L4.2 22H2l7.4-8.5L2 2h6.9l4.7 6.2L18.3 2zm-1.2 18h1.5L7.7 3.9H6.1L17.1 20z"
                  />
                </svg>
              </span>

              <span className="jcSocialBtn" title="LinkedIn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.94 6.5A2.44 2.44 0 1 1 7 1.62a2.44 2.44 0 0 1-.06 4.88zM4.5 22V8.5H9V22H4.5zm7.5 0V8.5h4.3v1.9h.06c.6-1.1 2.06-2.3 4.24-2.3C22.6 8.1 24 10 24 13.1V22h-4.5v-7.5c0-1.8 0-4.1-2.5-4.1c-2.5 0-2.9 2-2.9 4V22H12z"
                  />
                </svg>
              </span>

              <span className="jcSocialBtn" title="YouTube" aria-label="YouTube">
                <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M21.8 8.1a3 3 0 0 0-2.1-2.1C17.9 5.5 12 5.5 12 5.5s-5.9 0-7.7.5A3 3 0 0 0 2.2 8.1A31.2 31.2 0 0 0 1.8 12c0 1.3.1 2.6.4 3.9a3 3 0 0 0 2.1 2.1c1.8.5 7.7.5 7.7.5s5.9 0 7.7-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.6.4-3.9c0-1.3-.1-2.6-.4-3.9zM10 15.2V8.8L15.5 12L10 15.2z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="jcDivider" />

          {/* CENTERED BOTTOM */}
          <div className="jcLegalWrap">
            <div className="jcLegalLinks">
              <Link href="/privacy-policy"><a className="jcLegal">Privacy Policy</a></Link>
              <Link href="/terms-and-conditions"><a className="jcLegal">Terms &amp; Conditions</a></Link>
              <Link href="/refund-policy"><a className="jcLegal">Refund Policy</a></Link>
              <Link href="/cookies-policy"><a className="jcLegal">Cookies Policy</a></Link>
            </div>

            <div className="jcCopy">
              <span className="thq-body-small">© 2026 Jeevan Chandimal</span>
            </div>

            <div className="jcLastLine">
              <span className="thq-body-small jcLastText">
                Payments are processed securely via third-party gateways (e.g., PayHere). We do not store card details.
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .jcFooter {
          width: 100%;
          padding: 34px 18px 26px;
          background: rgba(34, 34, 34, 0.92);
          border-top: 1px solid rgba(245, 244, 244, 0.08);
          backdrop-filter: blur(10px);
        }

        .jcInner {
          max-width: var(--dl-layout-size-maxwidth);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .jcTop {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 16px;
        }

        .jcBrand {
          display: inline-flex;
          align-items: center;
          text-decoration: none !important;
        }

        .jcLogo {
          height: 44px;
          width: auto;
          display: block;
        }

        /* nav like navbar */
        .jcNav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .jcLink {
          color: #f5f4f4;
          text-decoration: none !important;
          font-size: 14px;
          opacity: 0.9;
          padding: 10px 8px;
          border-radius: 10px;
          transition: opacity 0.15s, background 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .jcLink:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.06);
        }

        /* dropdown arrow & list */
        .jcDrop {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .jcDropToggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .jcArrow {
          width: 26px;
          height: 26px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.18);
          transition: background 0.15s, border-color 0.15s;
        }

        .jcArrow:hover {
          background: rgba(245, 244, 244, 0.06);
          border-color: rgba(245, 244, 244, 0.18);
        }

        .jcArrowSvg {
          width: 16px;
          height: 16px;
          fill: rgba(245, 244, 244, 0.85);
          transform: rotate(0deg);
          transition: transform 0.18s ease;
        }

        .teleport-rotate .jcArrowSvg {
          transform: rotate(90deg);
        }

        .jcMenu {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 0;
          min-width: 220px;
          display: none;
          flex-direction: column;
          gap: 2px;
          padding: 8px;
          margin: 0;
          list-style: none;
          background: rgba(18, 18, 18, 0.95);
          border: 1px solid rgba(245, 244, 244, 0.12);
          border-radius: 14px;
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.55);
          z-index: 9999;
        }

        .teleport-show {
          display: flex !important;
        }

        .jcMenuItem {
          color: #f5f4f4;
          text-decoration: none !important;
          font-size: 14px;
          padding: 10px 10px;
          border-radius: 10px;
          opacity: 0.92;
          transition: background 0.15s, opacity 0.15s;
          display: block;
        }

        .jcMenuItem:hover {
          opacity: 1;
          background: rgba(245, 244, 244, 0.08);
        }

        /* social (same size buttons) */
        .jcSocial {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          flex-wrap: wrap;
        }

        .jcSocialBtn {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(245, 244, 244, 0.12);
          background: rgba(0, 0, 0, 0.18);
          transition: background 0.15s, border-color 0.15s, transform 0.15s;
        }

        .jcSocialBtn:hover {
          background: rgba(245, 244, 244, 0.06);
          border-color: rgba(245, 244, 244, 0.18);
          transform: translateY(-1px);
        }

        .jcSocialSvg {
          width: 18px;
          height: 18px;
          color: rgba(245, 244, 244, 0.88);
        }

        .jcDivider {
          width: 100%;
          height: 1px;
          background: rgba(245, 244, 244, 0.1);
        }

        /* centered bottom */
        .jcLegalWrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
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
          color: rgba(245, 244, 244, 0.85);
          text-decoration: none !important;
          opacity: 0.9;
          transition: opacity 0.15s, color 0.15s;
          font-size: 13px;
        }

        .jcLegal:hover {
          color: #25c3e2;
          opacity: 1;
          text-decoration: underline !important;
          text-underline-offset: 3px;
        }

        .jcCopy {
          color: rgba(245, 244, 244, 0.85);
        }

        .jcLastLine {
          max-width: 900px;
        }

        .jcLastText {
          opacity: 0.75;
          line-height: 1.6;
        }

        @media (max-width: 991px) {
          .jcTop {
            grid-template-columns: 1fr;
            justify-items: center;
          }
          .jcSocial {
            justify-content: center;
          }
          .jcMenu {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        @media (max-width: 479px) {
          .jcMenu {
            min-width: 92vw;
          }
        }
      `}</style>
    </>
  )
}

JeevanChandimalNewFooter.defaultProps = {
  cookiesLink: undefined,
  link11: undefined,
  logoSrc: '/JC/jc%20logo%20web%2004-1500h.png',
  text181: undefined,
  text1911: undefined,
  text192: undefined,
  text19: undefined,
  link5111: undefined,
  rootClassName: '',
  link41: undefined,
  text18: undefined,
  termsLink: undefined,
  text161: undefined,
  text17: undefined,
  text191: undefined,
  text171: undefined,
  link511: undefined,
  privacyLink: undefined,
  link51: undefined,
  text16: undefined,
  logoAlt: 'Company Logo',
}

JeevanChandimalNewFooter.propTypes = {
  cookiesLink: PropTypes.element,
  link11: PropTypes.element,
  logoSrc: PropTypes.string,
  text181: PropTypes.element,
  text1911: PropTypes.element,
  text192: PropTypes.element,
  text19: PropTypes.element,
  link5111: PropTypes.element,
  rootClassName: PropTypes.string,
  link41: PropTypes.element,
  text18: PropTypes.element,
  termsLink: PropTypes.element,
  text161: PropTypes.element,
  text17: PropTypes.element,
  text191: PropTypes.element,
  text171: PropTypes.element,
  link511: PropTypes.element,
  privacyLink: PropTypes.element,
  link51: PropTypes.element,
  text16: PropTypes.element,
  logoAlt: PropTypes.string,
}

export default JeevanChandimalNewFooter