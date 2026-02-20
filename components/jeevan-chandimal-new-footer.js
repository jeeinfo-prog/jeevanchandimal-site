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
      const toggle = dd.querySelector('[data-thq="thq-dropdown-toggle"]')

      if (!list) return

      const onToggle = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const willOpen = !list.classList.contains('teleport-show')
        closeAllExcept(list)

        if (willOpen) {
          list.classList.add('teleport-show')
          if (arrow) arrow.classList.add('teleport-rotate')
        } else {
          list.classList.remove('teleport-show')
          if (arrow) arrow.classList.remove('teleport-rotate')
        }
      }

      if (arrow) {
        arrow.style.cursor = 'pointer'
        arrow.addEventListener('click', onToggle)
        handlers.push(() => arrow.removeEventListener('click', onToggle))
      } else if (toggle) {
        const fallback = (e) => {
          const target = e.target
          if (target && target.closest && target.closest('a')) return
          onToggle(e)
        }
        toggle.style.cursor = 'pointer'
        toggle.addEventListener('click', fallback)
        handlers.push(() => toggle.removeEventListener('click', fallback))
      }
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
          {/* TOP ROW (logo + nav + socials) */}
          <div className="jcTop">
            <Link href="/">
              <a className="jcBrand" aria-label="Home">
                <img alt={props.logoAlt} src={props.logoSrc} className="jcLogo" />
              </a>
            </Link>

            <nav className="jcNav" aria-label="Footer navigation">
              <Link href="/">
                <a className="jcLink">
                  {props.link11 ?? (
                    <Fragment>
                      <span>Home</span>
                    </Fragment>
                  )}
                </a>
              </Link>

              {/* Work dropdown */}
              <div data-thq="thq-dropdown" className="jcDrop">
                <div data-thq="thq-dropdown-toggle" className="jcDropToggle">
                  <Link href="/work">
                    <a className="jcLink">
                      {props.text16 ?? (
                        <Fragment>
                          <span>Work</span>
                        </Fragment>
                      )}
                    </a>
                  </Link>

                  <div
                    data-thq="thq-dropdown-arrow"
                    className="jcArrow"
                    role="button"
                    aria-label="Toggle Work menu"
                    tabIndex={0}
                  >
                    <span className="jcArrowIcon" aria-hidden="true">▾</span>
                  </div>
                </div>

                <ul data-thq="thq-dropdown-list" className="jcMenu">
                  <li>
                    <Link href="/work-film">
                      <a className="jcMenuItem">
                        {props.text17 ?? <Fragment><span>Film</span></Fragment>}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/work-audio">
                      <a className="jcMenuItem">
                        {props.text18 ?? <Fragment><span>Audio</span></Fragment>}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/work-animation">
                      <a className="jcMenuItem">
                        {props.text19 ?? <Fragment><span>Animation</span></Fragment>}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/work-photography">
                      <a className="jcMenuItem">
                        {props.text191 ?? <Fragment><span>Photography</span></Fragment>}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services dropdown */}
              <div data-thq="thq-dropdown" className="jcDrop">
                <div data-thq="thq-dropdown-toggle" className="jcDropToggle">
                  <Link href="/services">
                    <a className="jcLink">
                      {props.text161 ?? (
                        <Fragment>
                          <span>Services</span>
                        </Fragment>
                      )}
                    </a>
                  </Link>

                  <div
                    data-thq="thq-dropdown-arrow"
                    className="jcArrow"
                    role="button"
                    aria-label="Toggle Services menu"
                    tabIndex={0}
                  >
                    <span className="jcArrowIcon" aria-hidden="true">▾</span>
                  </div>
                </div>

                <ul data-thq="thq-dropdown-list" className="jcMenu">
                  <li>
                    <Link href="/services-film-production">
                      <a className="jcMenuItem">
                        {props.text171 ?? <Fragment><span>Film Production</span></Fragment>}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-audio">
                      <a className="jcMenuItem">
                        {props.text181 ?? <Fragment><span>Audio Production</span></Fragment>}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-animation">
                      <a className="jcMenuItem">
                        {props.text192 ?? <Fragment><span>Animation &amp; Motion</span></Fragment>}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-photography">
                      <a className="jcMenuItem">
                        {props.text1911 ?? <Fragment><span>Photography</span></Fragment>}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <Link href="/store">
                <a className="jcLink">
                  {props.link41 ?? <Fragment><span>Store</span></Fragment>}
                </a>
              </Link>

              <Link href="/memberships">
                <a className="jcLink">
                  {props.link51 ?? <Fragment><span>Membership</span></Fragment>}
                </a>
              </Link>

              <Link href="/about">
                <a className="jcLink">
                  {props.link511 ?? <Fragment><span>About</span></Fragment>}
                </a>
              </Link>

              <Link href="/contact">
                <a className="jcLink">
                  {props.link5111 ?? <Fragment><span>Contact</span></Fragment>}
                </a>
              </Link>
            </nav>

            {/* Socials (same icons) */}
            <div className="jcSocial" aria-label="Social links">
              <svg width="56" height="56" viewBox="0 0 56 56" className="jcSocialIcon" aria-hidden="true">
                <path
                  d="M3 7.007A4.007 4.007 0 0 1 7.007 3h41.986A4.007 4.007 0 0 1 53 7.007v41.986A4.007 4.007 0 0 1 48.993 53H7.007A4.007 4.007 0 0 1 3 48.993zM37.28 51V31.842h6.486l.971-7.466H37.28v-4.767c0-2.162.605-3.635 3.732-3.635L45 15.972V9.294C44.31 9.204 41.943 9 39.189 9c-5.75 0-9.686 3.48-9.686 9.87v5.506H23v7.466h6.503V51z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>

              <svg width="24" height="24" viewBox="0 0 24 24" className="jcSocialIcon" aria-hidden="true">
                <path
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                  fill="currentColor"
                ></path>
              </svg>

              <svg width="24" height="24" viewBox="0 0 24 24" className="jcSocialIcon" aria-hidden="true">
                <path
                  d="M21.98 4.003a16.6 16.6 0 0 1-2.66 1.015a4.22 4.22 0 0 0-3.698-1.28a4.316 4.316 0 0 0-3.477 4.945a.4.4 0 0 0 0 .11a11.88 11.88 0 0 1-8.666-4.338a4.184 4.184 0 0 0 1.292 5.597a4.14 4.14 0 0 1-1.899-.519v.056a4.23 4.23 0 0 0 3.312 4.117c-.361.09-.732.135-1.104.133a3.7 3.7 0 0 1-.795-.066a4.23 4.23 0 0 0 3.919 2.914a8.47 8.47 0 0 1-5.2 1.788A8 8 0 0 1 2 18.42a11.73 11.73 0 0 0 6.425 1.888A11.855 11.855 0 0 0 20.457 8.374v-.54a4.55 4.55 0 0 0 1.524-3.831"
                  fill="currentColor"
                ></path>
              </svg>

              <svg width="24" height="24" viewBox="0 0 24 24" className="jcSocialIcon" aria-hidden="true">
                <path
                  d="M1 2.838A1.84 1.84 0 0 1 2.838 1H21.16A1.837 1.837 0 0 1 23 2.838V21.16A1.84 1.84 0 0 1 21.161 23H2.838A1.84 1.84 0 0 1 1 21.161zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634c3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8c-1.515 0-2.145 1.089-2.145 2.8v5.106H9.708zm-5.5 10.403h3.208V9.25H4.208zM7.875 5.812a2.063 2.063 0 1 1-4.125 0a2.063 2.063 0 0 1 4.125 0"
                  fill="currentColor"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>

              <svg width="432" height="384" viewBox="0 0 432 384" className="jcSocialIcon" aria-hidden="true">
                <path
                  d="M422 107q5 35 5 69v32l-5 69q-4 29-17 42q-14 14-42 18q-27 2-64.5 3t-61.5 1h-24q-111-1-145-4l-8-1l-13-2l-12.5-5l-13-10l-10-16.5L6 284l-2-7q-4-35-4-69v-32l4-69q4-29 17-42q14-15 43-18q27-2 64-3t61-1h24q90 0 150 4q28 3 42 18q4 4 7 9.5t5 11t3 10.5t2 8zm-151 88l14-7l-115-60v120z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="jcDivider" />

          {/* BOTTOM ROW (left aligned) */}
          <div className="jcBottom">
            <div className="jcBottomLeft">
              <span className="thq-body-small">© 2026 Jeevan Chandimal</span>
            </div>

            <div className="jcBottomRight">
              <Link href="/privacy-policy"><a className="thq-body-small legalLink">Privacy Policy</a></Link>
              <Link href="/terms-and-conditions"><a className="thq-body-small legalLink">Terms &amp; Conditions</a></Link>
              <Link href="/refund-policy"><a className="thq-body-small legalLink">Refund Policy</a></Link>
              <Link href="/cookies-policy"><a className="thq-body-small legalLink">Cookies Policy</a></Link>
            </div>
          </div>

          {/* last line LEFT aligned */}
          <div className="jcLastLine">
            <span className="thq-body-small jcLastText">
              Payments are processed securely via third-party gateways (e.g., PayHere). We do not store card details.
            </span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .jcFooter {
          width: 100%;
          padding: 42px 18px 34px;
          background: rgba(34, 34, 34, 0.92);
          border-top: 1px solid rgba(245, 244, 244, 0.08);
          backdrop-filter: blur(10px);
        }

        .jcInner {
          max-width: var(--dl-layout-size-maxwidth);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
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

        /* nav like navbar (clean text) */
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

        /* dropdown */
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
        }

        .jcArrowIcon {
          font-size: 12px;
          color: rgba(245, 244, 244, 0.85);
          transform: rotate(0deg);
          transition: transform 0.18s ease;
        }

        .teleport-rotate .jcArrowIcon {
          transform: rotate(180deg);
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

        /* socials right */
        .jcSocial {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          flex-wrap: wrap;
        }

        .jcSocialIcon {
          color: rgba(245, 244, 244, 0.85);
          opacity: 0.9;
          transition: transform 0.15s, color 0.15s, opacity 0.15s;
        }

        .jcSocialIcon:hover {
          color: #25c3e2;
          transform: translateY(-1px);
          opacity: 1;
        }

        .jcDivider {
          width: 100%;
          height: 1px;
          background: rgba(245, 244, 244, 0.1);
        }

        /* bottom line: LEFT aligned last line request */
        .jcBottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }

        .jcBottomLeft {
          color: rgba(245, 244, 244, 0.85);
        }

        .jcBottomRight {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
        }

        .legalLink {
          color: rgba(245, 244, 244, 0.85);
          text-decoration: none !important;
          opacity: 0.9;
          transition: opacity 0.15s, color 0.15s;
        }

        .legalLink:hover {
          color: #25c3e2;
          opacity: 1;
          text-decoration: underline !important;
          text-underline-offset: 3px;
        }

        .jcLastLine {
          display: flex;
          justify-content: flex-start; /* ✅ left align */
        }

        .jcLastText {
          opacity: 0.75;
          line-height: 1.6;
          text-align: left; /* ✅ left align */
          max-width: 920px;
        }

        @media (max-width: 991px) {
          .jcTop {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
          }
          .jcNav {
            justify-content: center;
          }
          .jcSocial {
            justify-content: center;
          }
          .jcMenu {
            left: 50%;
            transform: translateX(-50%);
          }
          .jcLastLine {
            justify-content: center;
          }
          .jcLastText {
            text-align: center;
          }
        }

        @media (max-width: 479px) {
          .jcNav {
            gap: 10px;
          }
          .jcMenu {
            min-width: 92vw;
          }
          .jcBottomRight {
            justify-content: center;
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