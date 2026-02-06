import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const HomeIntro = (props) => {
  return (
    <>
      <div
        className={`home-intro-container thq-section-padding ${props.rootClassName} `}
      >
        <div className="home-intro-thq-max-width-elm thq-section-max-width">
          <div className="home-intro-thq-content-elm thq-flex-column">
            <h1>
              {props.heading ?? (
                <Fragment>
                  <span className="home-intro-text2">Introduction</span>
                </Fragment>
              )}
            </h1>
            <ul className="home-intro-ul thq-flex-column">
              <li className="list-item">
                <h3 className="home-intro-thq-heading2-elm thq-heading-3">
                  {props.heading2 ?? (
                    <Fragment>
                      <span className="home-intro-text8">Film Production</span>
                    </Fragment>
                  )}
                </h3>
                <p className="home-intro-thq-content2-elm thq-body-small">
                  {props.content2 ?? (
                    <Fragment>
                      <span className="home-intro-text3">
                        <span>
                          End-to-end visual production, built with cinematic
                          intent. 
                        </span>
                        <span>
                          Film, photography, sound, and animation - from concept
                          to final delivery.
                        </span>
                        <br></br>
                        <span>
                          Every project is approached as a complete visual
                          experience, shaped with care, restraint, and attention
                          to atmosphere.
                        </span>
                      </span>
                    </Fragment>
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .home-intro-container {
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-layout-space-fiveunits);
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .home-intro-thq-max-width-elm {
            width: 100%;
            display: flex;
            max-width: var(--dl-layout-size-maxwidth);
            align-items: center;
            flex-direction: column;
          }
          .home-intro-thq-content-elm {
            align-self: stretch;
            align-items: center;
          }
          .home-intro-ul {
            align-items: flex-start;
          }
          .home-intro-thq-heading2-elm {
            display: none;
          }
          .home-intro-thq-content2-elm {
            font-size: 18px;
            text-align: center;
          }
          .home-intro-text2 {
            display: inline-block;
          }
          .home-intro-text3 {
            display: inline-block;
          }
          .home-intro-text8 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

HomeIntro.defaultProps = {
  heading: undefined,
  content2: undefined,
  heading2: undefined,
  rootClassName: '',
}

HomeIntro.propTypes = {
  heading: PropTypes.element,
  content2: PropTypes.element,
  heading2: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default HomeIntro
