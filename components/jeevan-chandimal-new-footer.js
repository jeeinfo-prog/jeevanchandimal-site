import React, { Fragment, useEffect, useRef } from 'react'
import Link from 'next/link'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const JeevanChandimalNewFooter = (props) => {
  

const footerRef = useRef(null)

useEffect(() => {
  const root = footerRef.current
  if (!root) return

  const dropdowns = Array.from(root.querySelectorAll('[data-thq="thq-dropdown"]'))

  const closeAllExcept = (exceptList) => {
    dropdowns.forEach((dd) => {
      const list = dd.querySelector('[data-thq="thq-dropdown-list"]')
      if (list && list !== exceptList) {
        list.classList.remove('teleport-show')
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
      // Allow clicking the link text to navigate; only the arrow toggles.
      e.preventDefault()
      e.stopPropagation()

      const willOpen = !list.classList.contains('teleport-show')
      closeAllExcept(list)
      if (willOpen) list.classList.add('teleport-show')
      else list.classList.remove('teleport-show')
    }

    if (arrow) {
      arrow.style.cursor = 'pointer'
      arrow.addEventListener('click', onToggle)
      handlers.push(() => arrow.removeEventListener('click', onToggle))
    } else if (toggle) {
      // Fallback: toggle container click (but don't block link navigation)
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
    // click outside closes all
    if (!root.contains(e.target)) {
      closeAllExcept(null)
    }
  }
  document.addEventListener('click', onDocClick)
  handlers.push(() => document.removeEventListener('click', onDocClick))

  return () => {
    handlers.forEach((fn) => fn())
  }
}, [])

return (
    <>
      <footer
        ref={footerRef}
        className={`jeevan-chandimal-new-footer-thq-footer4-elm thq-section-padding ${props.rootClassName} `}
      >
        <div className="jeevan-chandimal-new-footer-thq-max-width-elm thq-section-max-width">
          <div className="jeevan-chandimal-new-footer-thq-content-elm">
            <div className="jeevan-chandimal-new-footer-thq-logo-elm">
              <img
                alt={props.logoAlt}
                src={props.logoSrc}
                className="jeevan-chandimal-new-footer-thq-image1-elm"
              />
            </div>
            <nav className="jeevan-chandimal-new-footer-thq-links-elm">
              <Link href="/">
                <a className="jeevan-chandimal-new-footer-link10 thq-link thq-body-small">
                  {props.link11 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-new-footer-text11">
                        Home
                      </span>
                    </Fragment>
                  )}
                </a>
              </Link>
              <div
                data-thq="thq-dropdown"
                className="jeevan-chandimal-new-footer-thq-dropdown1 list-item"
              >
                <div
                  data-thq="thq-dropdown-toggle"
                  className="jeevan-chandimal-new-footer-thq-dropdown-toggle-elm10"
                >
                  <Link href="/work">
                    <a className="jeevan-chandimal-new-footer-link11 thq-link thq-body-small">
                      {props.text16 ?? (
                        <Fragment>
                          <span className="jeevan-chandimal-new-footer-text27">
                            Work
                          </span>
                        </Fragment>
                      )}
                    </a>
                  </Link>
                  <div
                    data-thq="thq-dropdown-arrow"
                    className="jeevan-chandimal-new-footer-thq-dropdown-arrow-elm1"
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      className="jeevan-chandimal-new-footer-icon10"
                    >
                      <path d="M426 726v-428l214 214z"></path>
                    </svg>
                  </div>
                </div>
                <ul
                  data-thq="thq-dropdown-list"
                  className="jeevan-chandimal-new-footer-thq-dropdown-list-elm1"
                >
                  <li
                    data-thq="thq-dropdown"
                    className="jeevan-chandimal-new-footer-thq-dropdown-elm1 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-new-footer-thq-dropdown-toggle-elm11"
                    >
                      <Link href="/work-film">
                        <a className="jeevan-chandimal-new-footer-link12 thq-link thq-body-small">
                          {props.text17 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-new-footer-text21">
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
                    className="jeevan-chandimal-new-footer-thq-dropdown-elm2 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-new-footer-thq-dropdown-toggle-elm12"
                    >
                      <Link href="/work-audio">
                        <a className="jeevan-chandimal-new-footer-link13 thq-link thq-body-small">
                          {props.text18 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-new-footer-text18">
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
                    className="jeevan-chandimal-new-footer-thq-dropdown-elm3 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-new-footer-thq-dropdown-toggle-elm13"
                    >
                      <Link href="/work-animation">
                        <a className="jeevan-chandimal-new-footer-link14 thq-link thq-body-small">
                          {props.text19 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-new-footer-text15">
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
                    className="jeevan-chandimal-new-footer-thq-dropdown-elm4 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-new-footer-thq-dropdown-toggle-elm14"
                    >
                      <Link href="/work-photography">
                        <a className="jeevan-chandimal-new-footer-link15 thq-link thq-body-small">
                          {props.text191 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-new-footer-text22">
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
              <div
                data-thq="thq-dropdown"
                className="jeevan-chandimal-new-footer-thq-dropdown2 list-item"
              >
                <div
                  data-thq="thq-dropdown-toggle"
                  className="jeevan-chandimal-new-footer-thq-dropdown-toggle-elm15"
                >
                  <Link href="/services">
                    <a className="jeevan-chandimal-new-footer-link16 thq-link thq-body-small">
                      {props.text161 ?? (
                        <Fragment>
                          <span className="jeevan-chandimal-new-footer-text20">
                            Services
                          </span>
                        </Fragment>
                      )}
                    </a>
                  </Link>
                  <div
                    data-thq="thq-dropdown-arrow"
                    className="jeevan-chandimal-new-footer-thq-dropdown-arrow-elm2"
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      className="jeevan-chandimal-new-footer-icon12"
                    >
                      <path d="M426 726v-428l214 214z"></path>
                    </svg>
                  </div>
                </div>
                <ul
                  data-thq="thq-dropdown-list"
                  className="jeevan-chandimal-new-footer-thq-dropdown-list-elm2"
                >
                  <li
                    data-thq="thq-dropdown"
                    className="jeevan-chandimal-new-footer-thq-dropdown-elm5 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-new-footer-thq-dropdown-toggle-elm16"
                    >
                      <Link href="/services-film-production">
                        <a className="jeevan-chandimal-new-footer-link17 thq-link thq-body-small">
                          {props.text171 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-new-footer-text23">
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
                    className="jeevan-chandimal-new-footer-thq-dropdown-elm6 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-new-footer-thq-dropdown-toggle-elm17"
                    >
                      <Link href="/services-audio">
                        <a className="jeevan-chandimal-new-footer-link18 thq-link thq-body-small">
                          {props.text181 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-new-footer-text12">
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
                    className="jeevan-chandimal-new-footer-thq-dropdown-elm7 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-new-footer-thq-dropdown-toggle-elm18"
                    >
                      <Link href="/services-animation">
                        <a className="jeevan-chandimal-new-footer-link19 thq-link thq-body-small">
                          {props.text192 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-new-footer-text14">
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
                    className="jeevan-chandimal-new-footer-thq-dropdown-elm8 list-item"
                  >
                    <div
                      data-thq="thq-dropdown-toggle"
                      className="jeevan-chandimal-new-footer-thq-dropdown-toggle-elm19"
                    >
                      <Link href="/services-photography">
                        <a className="jeevan-chandimal-new-footer-link20 thq-link thq-body-small">
                          {props.text1911 ?? (
                            <Fragment>
                              <span className="jeevan-chandimal-new-footer-text13">
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
                <a className="jeevan-chandimal-new-footer-link21 thq-link thq-body-small">
                  {props.link41 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-new-footer-text17">
                        Store
                      </span>
                    </Fragment>
                  )}
                </a>
              </Link>
              <Link href="/memberships">
                <a className="jeevan-chandimal-new-footer-link22 thq-link thq-body-small">
                  {props.link51 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-new-footer-text26">
                        Membership
                      </span>
                    </Fragment>
                  )}
                </a>
              </Link>
              <Link href="/about">
                <a className="jeevan-chandimal-new-footer-link23 thq-link thq-body-small">
                  {props.link511 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-new-footer-text24">
                        About
                      </span>
                    </Fragment>
                  )}
                </a>
              </Link>
              <Link href="/contact">
                <a className="jeevan-chandimal-new-footer-link24 thq-link thq-body-small">
                  {props.link5111 ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-new-footer-text16">
                        Contact
                      </span>
                    </Fragment>
                  )}
                </a>
              </Link>
            </nav>
            <div className="jeevan-chandimal-new-footer-thq-social-links-elm">
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                className="jeevan-chandimal-new-footer-icon14 thq-link thq-icon-small"
              >
                <path
                  d="M3 7.007A4.007 4.007 0 0 1 7.007 3h41.986A4.007 4.007 0 0 1 53 7.007v41.986A4.007 4.007 0 0 1 48.993 53H7.007A4.007 4.007 0 0 1 3 48.993zM37.28 51V31.842h6.486l.971-7.466H37.28v-4.767c0-2.162.605-3.635 3.732-3.635L45 15.972V9.294C44.31 9.204 41.943 9 39.189 9c-5.75 0-9.686 3.48-9.686 9.87v5.506H23v7.466h6.503V51z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="jeevan-chandimal-new-footer-icon16 thq-link thq-icon-small"
              >
                <path
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="jeevan-chandimal-new-footer-icon18 thq-link thq-icon-small"
              >
                <path
                  d="M21.98 4.003a16.6 16.6 0 0 1-2.66 1.015a4.22 4.22 0 0 0-3.698-1.28a4.316 4.316 0 0 0-3.477 4.945a.4.4 0 0 0 0 .11a11.88 11.88 0 0 1-8.666-4.338a4.184 4.184 0 0 0 1.292 5.597a4.14 4.14 0 0 1-1.899-.519v.056a4.23 4.23 0 0 0 3.312 4.117c-.361.09-.732.135-1.104.133a3.7 3.7 0 0 1-.795-.066a4.23 4.23 0 0 0 3.919 2.914a8.47 8.47 0 0 1-5.2 1.788A8 8 0 0 1 2 18.42a11.73 11.73 0 0 0 6.425 1.888A11.855 11.855 0 0 0 20.457 8.374v-.54a4.55 4.55 0 0 0 1.524-3.831"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="jeevan-chandimal-new-footer-icon20 thq-link thq-icon-small"
              >
                <path
                  d="M1 2.838A1.84 1.84 0 0 1 2.838 1H21.16A1.837 1.837 0 0 1 23 2.838V21.16A1.84 1.84 0 0 1 21.161 23H2.838A1.84 1.84 0 0 1 1 21.161zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634c3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8c-1.515 0-2.145 1.089-2.145 2.8v5.106H9.708zm-5.5 10.403h3.208V9.25H4.208zM7.875 5.812a2.063 2.063 0 1 1-4.125 0a2.063 2.063 0 0 1 4.125 0"
                  fill="currentColor"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <svg
                width="432"
                height="384"
                viewBox="0 0 432 384"
                className="jeevan-chandimal-new-footer-icon22 thq-link thq-icon-small"
              >
                <path
                  d="M422 107q5 35 5 69v32l-5 69q-4 29-17 42q-14 14-42 18q-27 2-64.5 3t-61.5 1h-24q-111-1-145-4l-8-1l-13-2l-12.5-5l-13-10l-10-16.5L6 284l-2-7q-4-35-4-69v-32l4-69q4-29 17-42q14-15 43-18q27-2 64-3t61-1h24q90 0 150 4q28 3 42 18q4 4 7 9.5t5 11t3 10.5t2 8zm-151 88l14-7l-115-60v120z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <div className="jeevan-chandimal-new-footer-thq-credits-elm">
            <div className="thq-divider-horizontal"></div>
            <div className="jeevan-chandimal-new-footer-thq-row-elm">
              <div className="jeevan-chandimal-new-footer-thq-footer-links-elm">
                <span className="thq-body-small">© 2026 Jeevan Chandimal</span>
                <span className="thq-body-small">
                  {props.privacyLink ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-new-footer-text25">
                        Privacy Policy
                      </span>
                    </Fragment>
                  )}
                </span>
                <span className="thq-body-small">
                  {props.termsLink ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-new-footer-text19">
                        Terms &amp; Conditions
                      </span>
                    </Fragment>
                  )}
                </span>
                <span className="thq-body-small">
                  {props.cookiesLink ?? (
                    <Fragment>
                      <span className="jeevan-chandimal-new-footer-text10">
                        Cookies Policy
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <style jsx>
        {`
          .jeevan-chandimal-new-footer-thq-footer4-elm {
            gap: 80px;
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            padding-top: 160px;
            padding-left: var(--dl-layout-space-fiveunits);
            padding-right: var(--dl-layout-space-fiveunits);
            flex-direction: column;
            padding-bottom: var(--dl-layout-space-fiveunits);
            justify-content: center;
          }
          .jeevan-chandimal-new-footer-thq-max-width-elm {
            gap: var(--dl-layout-space-threeunits);
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .jeevan-chandimal-new-footer-thq-content-elm {
            gap: 32px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            justify-content: center;
          }
          .jeevan-chandimal-new-footer-thq-logo-elm {
            gap: 24px;
            width: auto;
            display: flex;
            overflow: hidden;
            flex-grow: 1;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .jeevan-chandimal-new-footer-thq-image1-elm {
            height: 2rem;
          }
          .jeevan-chandimal-new-footer-thq-links-elm {
            gap: var(--dl-layout-space-twounits);
            flex: 1;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: center;
          }
          .jeevan-chandimal-new-footer-link10 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-dropdown1 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-layout-radius-radius2);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm10 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: 4px;
            border-radius: var(--dl-layout-radius-radius2);
            padding-right: var(--dl-layout-space-halfunit);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .jeevan-chandimal-new-footer-link11 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-arrow-elm1 {
            transition: 0.3s;
          }
          .jeevan-chandimal-new-footer-icon10 {
            width: 18px;
            height: 18px;
            transition: 0.3s;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-list-elm1 {
            width: max-content;
            bottom: 100%;
            display: none;
            z-index: 100;
            position: absolute;
            min-width: 100%;
            transition: 0.3s;
            align-items: stretch;
            border-color: #d9d9d9;
            border-width: 1px;
            border-radius: var(--dl-layout-radius-radius4);
            flex-direction: column;
            list-style-type: none;
            list-style-position: inside;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-elm1 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-layout-radius-radius2);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm11 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-unit);
            border-radius: var(--dl-layout-radius-radius4);
            padding-right: var(--dl-layout-space-unit);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm11:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .jeevan-chandimal-new-footer-link12 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-elm2 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-layout-radius-radius2);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm12 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-unit);
            border-radius: var(--dl-layout-radius-radius4);
            padding-right: var(--dl-layout-space-unit);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm12:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .jeevan-chandimal-new-footer-link13 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-elm3 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-layout-radius-radius2);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm13 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-unit);
            border-radius: var(--dl-layout-radius-radius4);
            padding-right: var(--dl-layout-space-unit);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm13:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .jeevan-chandimal-new-footer-link14 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-elm4 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-layout-radius-radius2);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm14 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-unit);
            border-radius: var(--dl-layout-radius-radius4);
            padding-right: var(--dl-layout-space-unit);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm14:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .jeevan-chandimal-new-footer-link15 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-dropdown2 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-layout-radius-radius2);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm15 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: 4px;
            border-radius: var(--dl-layout-radius-radius2);
            padding-right: 4px;
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .jeevan-chandimal-new-footer-link16 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-arrow-elm2 {
            transition: 0.3s;
          }
          .jeevan-chandimal-new-footer-icon12 {
            width: 18px;
            height: 18px;
            transition: 0.3s;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-list-elm2 {
            width: max-content;
            bottom: 100%;
            display: none;
            z-index: 100;
            position: absolute;
            min-width: 100%;
            transition: 0.3s;
            align-items: stretch;
            border-color: #d9d9d9;
            border-width: 1px;
            border-radius: var(--dl-layout-radius-radius4);
            flex-direction: column;
            list-style-type: none;
            list-style-position: inside;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-elm5 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-layout-radius-radius2);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm16 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-unit);
            border-radius: var(--dl-layout-radius-radius4);
            padding-right: var(--dl-layout-space-unit);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm16:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .jeevan-chandimal-new-footer-link17 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-elm6 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-layout-radius-radius2);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm17 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-unit);
            border-radius: var(--dl-layout-radius-radius4);
            padding-right: var(--dl-layout-space-unit);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm17:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .jeevan-chandimal-new-footer-link18 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-elm7 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-layout-radius-radius2);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm18 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-unit);
            border-radius: var(--dl-layout-radius-radius4);
            padding-right: var(--dl-layout-space-unit);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm18:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .jeevan-chandimal-new-footer-link19 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-dropdown-elm8 {
            cursor: pointer;
            display: inline-block;
            position: relative;
            border-radius: var(--dl-layout-radius-radius2);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm19 {
            fill: #595959;
            color: #595959;
            width: 100%;
            display: inline-flex;
            transition: 0.3s;
            align-items: center;
            padding-top: var(--dl-layout-space-halfunit);
            padding-left: var(--dl-layout-space-unit);
            border-radius: var(--dl-layout-radius-radius4);
            padding-right: var(--dl-layout-space-unit);
            padding-bottom: var(--dl-layout-space-halfunit);
          }
          .jeevan-chandimal-new-footer-thq-dropdown-toggle-elm19:hover {
            fill: #fff;
            color: #fff;
            background-color: #595959;
          }
          .jeevan-chandimal-new-footer-link20 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-link21 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-link22 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-link23 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-link24 {
            text-decoration: none;
          }
          .jeevan-chandimal-new-footer-thq-social-links-elm {
            gap: var(--dl-layout-space-unit);
            width: 348px;
            height: auto;
            display: flex;
            align-self: stretch;
            align-items: center;
            justify-content: flex-end;
          }
          .jeevan-chandimal-new-footer-icon14 {
            transition: 0.3s;
          }
          .jeevan-chandimal-new-footer-icon14:hover {
            color: var(--dl-color-theme-primary2);
          }
          .jeevan-chandimal-new-footer-icon16 {
            transition: 0.3s;
          }
          .jeevan-chandimal-new-footer-icon16:hover {
            color: var(--dl-color-theme-primary2);
          }
          .jeevan-chandimal-new-footer-icon18 {
            transition: 0.3s;
          }
          .jeevan-chandimal-new-footer-icon18:hover {
            color: var(--dl-color-theme-primary2);
          }
          .jeevan-chandimal-new-footer-icon20 {
            transition: 0.3s;
          }
          .jeevan-chandimal-new-footer-icon20:hover {
            color: var(--dl-color-theme-primary2);
          }
          .jeevan-chandimal-new-footer-icon22 {
            transition: 0.3s;
          }
          .jeevan-chandimal-new-footer-icon22:hover {
            color: var(--dl-color-theme-primary2);
          }
          .jeevan-chandimal-new-footer-thq-credits-elm {
            gap: var(--dl-layout-space-twounits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .jeevan-chandimal-new-footer-thq-row-elm {
            gap: 24px;
            display: flex;
            align-items: flex-start;
          }
          .jeevan-chandimal-new-footer-thq-footer-links-elm {
            gap: var(--dl-layout-space-oneandhalfunits);
            display: flex;
            align-items: flex-start;
          }
          .jeevan-chandimal-new-footer-text10 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text11 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text12 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text13 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text14 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text15 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text16 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text17 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text18 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text19 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text20 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text21 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text22 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text23 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text24 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text25 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text26 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footer-text27 {
            display: inline-block;
          }
          .jeevan-chandimal-new-footerroot-class-name {
            padding-top: 160px;
          }

          @media (max-width: 991px) {
            .jeevan-chandimal-new-footer-thq-logo-elm {
              width: auto;
            }
          }
          @media (max-width: 767px) {
            .jeevan-chandimal-new-footer-thq-content-elm {
              flex-direction: column;
            }
            .jeevan-chandimal-new-footer-thq-row-elm {
              flex-direction: column;
            }
            .jeevan-chandimal-new-footer-thq-footer-links-elm {
              align-items: center;
              flex-direction: column;
              justify-content: center;
            }
          }
          @media (max-width: 479px) {
            .jeevan-chandimal-new-footer-thq-max-width-elm {
              gap: var(--dl-layout-space-oneandhalfunits);
            }
            .jeevan-chandimal-new-footer-thq-content-elm {
              width: 100%;
            }
          }
        `}
      </style>
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