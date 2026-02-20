// components/jeevan-chandimal-new-footer.js
import React, { useEffect, useRef } from 'react'
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

            <nav className="jcNav">
              <Link href="/"><a className="jcLink">Home</a></Link>

              {/* WORK */}
              <div data-thq="thq-dropdown" className="jcDrop">
                <div data-thq="thq-dropdown-toggle" className="jcDropToggle">
                  <Link href="/work"><a className="jcLink">Work</a></Link>
                  <div data-thq="thq-dropdown-arrow" className="jcArrow" role="button" tabIndex={0}>
                    <svg viewBox="0 0 1024 1024" className="jcArrowSvg"><path d="M426 726v-428l214 214z"/></svg>
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
                  <div data-thq="thq-dropdown-arrow" className="jcArrow" role="button" tabIndex={0}>
                    <svg viewBox="0 0 1024 1024" className="jcArrowSvg"><path d="M426 726v-428l214 214z"/></svg>
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

            {/* SOCIAL */}
            <div className="jcSocial">
              {['facebook','instagram','x','linkedin','youtube'].map((name) => (
                <span key={name} className="jcSocialBtn" aria-label={name}></span>
              ))}
            </div>
          </div>

          <div className="jcDivider" />

          {/* CENTERED LEGAL */}
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
          background: rgba(34,34,34,0.92);
          border-top: 1px solid rgba(245,244,244,0.08);
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
          padding-bottom: 64px; /* space for dropdown */
        }

        .jcLogo { height: 44px; }

        .jcNav {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .jcLink {
          color: #f5f4f4;
          text-decoration: none;
          font-size: 14px;
          opacity: .9;
          padding: 10px 8px;
          border-radius: 10px;
        }
        .jcLink:hover { background: rgba(245,244,244,.06); }

        .jcDrop { position: relative; display: inline-flex; }

        .jcArrow {
          width: 26px; height: 26px;
          display: inline-flex;
          align-items: center; justify-content: center;
          border: 1px solid rgba(245,244,244,.12);
          border-radius: 10px;
          margin-left: 4px;
        }

        .jcArrowSvg { width: 16px; height: 16px; fill: rgba(245,244,244,.85); transition: transform .18s; }
        .teleport-rotate .jcArrowSvg { transform: rotate(90deg); }

        .jcMenu {
          position: absolute;
          top: calc(100% + 10px); /* open DOWN */
          left: 0;
          min-width: 220px;
          display: none;
          flex-direction: column;
          padding: 8px;
          background: rgba(18,18,18,.95);
          border: 1px solid rgba(245,244,244,.12);
          border-radius: 14px;
          z-index: 999999;
        }

        .teleport-show { display: flex !important; }

        .jcMenuItem {
          color: #f5f4f4;
          text-decoration: none;
          padding: 10px;
          border-radius: 10px;
        }
        .jcMenuItem:hover { background: rgba(245,244,244,.08); }

        .jcSocial { display: flex; gap: 10px; }
        .jcSocialBtn {
          width: 36px; height: 36px;
          border: 1px solid rgba(245,244,244,.12);
          border-radius: 12px;
          background: rgba(0,0,0,.18);
        }

        .jcDivider { height: 1px; background: rgba(245,244,244,.1); }

        .jcLegalWrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        .jcLegalLinks { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }

        .jcLegal {
          color: rgba(245,244,244,.85);
          text-decoration: none;
          font-size: 13px;
        }
        .jcLegal:hover { color: #25c3e2; text-decoration: underline; }

        .jcCopy { color: rgba(245,244,244,.85); }

        .jcLastLine {
          opacity: .75;
          max-width: 900px;
          line-height: 1.6;
        }

        @media (max-width: 991px) {
          .jcTop { grid-template-columns: 1fr; justify-items: center; }
        }
      `}</style>
    </>
  )
}

JeevanChandimalNewFooter.defaultProps = {
  logoSrc: '/JC/jc%20logo%20web%2004-1500h.png',
  logoAlt: 'Company Logo',
  rootClassName: '',
}

JeevanChandimalNewFooter.propTypes = {
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default JeevanChandimalNewFooter