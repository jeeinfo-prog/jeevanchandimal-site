// components/jeevan-chandimal-new-footer.js
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const JeevanChandimalNewFooter = (props) => {
  const footerRef = useRef(null)
  const router = useRouter()

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

        // ✅ close everything when exceptList is null, otherwise close others
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

  const SocialLink = ({ href, label, children }) => {
    if (!href) return null // ✅ hide icon if no URL
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
        <div className="jcInner">
          {/* TOP ROW */}
          <div className="jcTop">
            <Link href="/">
              <a className="jcBrand" aria-label="Home">
                <img alt={props.logoAlt} src={props.logoSrc} className="jcLogo" />
              </a>
            </Link>

            <nav className="jcNav" aria-label="Footer navigation">
              <Link href="/">
                <a className={`jcLink ${isActive('/') ? 'isActive' : ''}`}>Home</a>
              </Link>

              {/* WORK */}
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
                      <a className={`jcMenuItem ${isActive('/work-film') ? 'isActiveItem' : ''}`}>Film</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/work-audio">
                      <a className={`jcMenuItem ${isActive('/work-audio') ? 'isActiveItem' : ''}`}>Audio</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/work-animation">
                      <a className={`jcMenuItem ${isActive('/work-animation') ? 'isActiveItem' : ''}`}>Animation</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/work-photography">
                      <a className={`jcMenuItem ${isActive('/work-photography') ? 'isActiveItem' : ''}`}>Photography</a>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* SERVICES */}
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
                      <a className={`jcMenuItem ${isActive('/services-film-production') ? 'isActiveItem' : ''}`}>
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
                      <a className={`jcMenuItem ${isActive('/services-animation') ? 'isActiveItem' : ''}`}>
                        Animation &amp; Motion
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-photography">
                      <a className={`jcMenuItem ${isActive('/services-photography') ? 'isActiveItem' : ''}`}>
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

            {/* SOCIAL ICONS */}
            <div className="jcSocial" aria-label="Social links">
              <SocialLink href={props.facebookUrl} label="Facebook">
                <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
  <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v3h2v8h3v-8h2.5l.5-3H12V7a1 1 0 0 1 1-1h2z" />
</svg>
              </SocialLink>

              <SocialLink href={props.instagramUrl} label="Instagram">
                <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
  <circle cx="12" cy="12" r="4" />
  <circle cx="17" cy="7" r="1" />
</svg>
              </SocialLink>

              <SocialLink href={props.xUrl} label="X">
                <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
  <path d="M4 4l7 8-7 8h2l6-7 6 7h2l-7-8 7-8h-2l-6 7-6-7z" />
</svg>
              </SocialLink>

              <SocialLink href={props.linkedinUrl} label="LinkedIn">
                <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2" />
  <rect x="2" y="9" width="4" height="12" />
  <circle cx="4" cy="4" r="2" />
</svg>
              </SocialLink>

              <SocialLink href={props.youtubeUrl} label="YouTube">
                <svg viewBox="0 0 24 24" className="jcSocialSvg" aria-hidden="true">
  <path d="M22 12s0-3.5-.5-5a2 2 0 0 0-1.4-1.4C18.5 5 12 5 12 5s-6.5 0-8.1.6A2 2 0 0 0 2.5 7c-.5 1.5-.5 5-.5 5s0 3.5.5 5a2 2 0 0 0 1.4 1.4C5.5 19 12 19 12 19s6.5 0 8.1-.6a2 2 0 0 0 1.4-1.4c.5-1.5.5-5 .5-5z" />
  <polygon points="10 9 15 12 10 15 10 9" />
</svg>
              </SocialLink>
            </div>
          </div>

          <div className="jcDivider" />

          <div className="jcLegalWrap">
            <div className="jcLegalLinks">
              <Link href="/privacy-policy"><a className="jcLegal">Privacy Policy</a></Link>
              <Link href="/terms-and-conditions"><a className="jcLegal">Terms &amp; Conditions</a></Link>
              <Link href="/refund-policy"><a className="jcLegal">Refund Policy</a></Link>
              <Link href="/cookies-policy"><a className="jcLegal">Cookies Policy</a></Link>
            </div>

            <div className="jcCopy">© 2026 Jeevan Chandimal</div>

            <div className="jcLastLine">
              Payments are processed securely via third-party gateways (e.g., PayHere). We do not store card details.
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
          position: relative;
          z-index: 30;
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
          padding-bottom: 64px; /* ✅ reserve dropdown space */
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

        .jcNav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

/* ✅ footer middle links = pill like navbar/login buttons */
.jcLink {
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
  gap: 6px;
  box-sizing: border-box;
  transition: background 0.18s ease, color 0.18s ease, opacity 0.18s ease, border-color 0.18s ease;
}

.jcLink:hover {
  opacity: 1;
  background: rgba(245, 244, 244, 0.06);
  color: #25c3e2 !important; /* ✅ hover = blue text */
}

/* ✅ footer active pill highlight (same style as navbar) */
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


        .jcDrop {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        /* ✅ Work/Services toggle wrapper pill */
.jcDropToggle {
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* ✅ hovering anywhere on the toggle makes Work/Services text blue */
.jcDropToggle:hover .jcLink {
  color: #25c3e2 !important;
}

        /* ✅ Arrow border removed + background matched */
  .jcArrow {
  width: 26px;
  height: 26px;
  border-radius: 99px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
}

.jcArrowSvg {
  width: 16px;
  height: 16px;
  fill: rgba(245, 244, 244, 0.85);
  transition: transform 0.18s ease;
}

        .teleport-rotate .jcArrowSvg {
          transform: rotate(90deg);
        }

        .jcMenu {
  position: absolute;
  top: calc(100% + 10px);
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
  z-index: 999999;
}

/* ✅ hover bridge (paste THIS right after .jcMenu) */
.jcMenu::before {
  content: "";
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
  color: #f5f4f4;
  text-decoration: none !important;
  font-size: 14px;
  padding: 10px 10px;
  border-radius: 10px;
  opacity: 0.92;
  transition: background 0.15s, opacity 0.15s, color 0.15s, border-color 0.15s;
  display: block;
  border: 1px solid transparent;
}

/* ✅ hover = blue text */
.jcMenuItem:hover {
  opacity: 1;
  background: rgba(245, 244, 244, 0.08);
  color: #25c3e2 !important;
}

/* ✅ active = same blue + highlight */
.isActiveItem {
  background: linear-gradient(180deg, rgba(37, 195, 226, 0.2), rgba(37, 195, 226, 0.08));
  border: 1px solid rgba(37, 195, 226, 0.18);
  color: #25c3e2 !important;
  opacity: 1;
  font-weight: 700;
}

@media (min-width: 992px) {
  .jcDrop:hover .jcMenu,
  .jcDrop .jcMenu:hover {
    display: flex;
  }

  .jcDrop:hover .jcArrowSvg {
    transform: rotate(90deg);
  }
}

        /* SOCIAL ICONS — stroke version (hover always works) */
.jcSocial {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.jcSocialBtn {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(245, 244, 244, 0.08);
  color: rgba(245, 244, 244, 0.88);
  transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.jcSocialSvg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.jcSocialBtn:hover {
  transform: translateY(-1px);
  color: #25c3e2 !important;
  background: rgba(37, 195, 226, 0.08);
  border-color: rgba(37, 195, 226, 0.28);
}

        .jcDivider {
          width: 100%;
          height: 1px;
          background: rgba(245, 244, 244, 0.1);
        }

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
          font-size: 13px;
        }

        .jcLastLine {
          opacity: 0.75;
          max-width: 900px;
          line-height: 1.6;
          font-size: 13px;
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
  logoSrc: '/JC/jc%20logo%20web%2004-1500h.png',
  logoAlt: 'Company Logo',
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